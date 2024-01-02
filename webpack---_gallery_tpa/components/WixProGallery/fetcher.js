import {
    Utils
} from '@wix/common-pro-gallery-worker-wrapper';
import {
    serverItemsToProGallery
} from '@wix/pro-gallery-items-formatter';
import {
    AppSettings,
    Consts,
    experimentsWrapper,
} from '@wix/photography-client-lib';

import {
    GALLERY_CONSTS
} from 'pro-gallery-lib';

export class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.reject = (...args) => {
                this.isPending = false;
                reject(...args);
            };
            this.resolve = (...args) => {
                this.isPending = false;
                resolve(...args);
            };
            this.isPending = true;
        });
    }
}
export default class Fetcher {
    constructor({
        context,
        controllerConfig,
        reportBiLog,
        SSRWorkerLog,
        withWarmupData,
    }) {
        this.SSRWorkerLog = SSRWorkerLog;
        this.withWarmupData = withWarmupData;
        this.ITEMS_BATCH_SIZE = 25;
        this.controllerConfig = controllerConfig;
        this.wixCodeApi = controllerConfig.wixCodeApi;
        this.viewMode = Utils.parseViewMode(this.wixCodeApi.window.viewMode);
        this.context = context.getContext();
        this.baseUrl = Utils.getBaseUrl(this.wixCodeApi, this.viewMode);
        this.appSettingsBaseUrl =
            this.viewMode === GALLERY_CONSTS.viewMode.PREVIEW ||
            this.viewMode === GALLERY_CONSTS.viewMode.EDIT ?
            '' :
            this.baseUrl; // to debug locally, for PREVIEW sometimes need to put 'https://editor.wix.com',
        this.SSRWorkerLog.push('appSettingsBaseUrl: ' + this.appSettingsBaseUrl);

        this.compId = controllerConfig.compId;
        this.externalId =
            controllerConfig.config.externalId ||
            '00000000-0000-0000-0000-000000000000'; // externalId of a new site before publish in Preview is "", so we protect here undefined and ""
        this.instance = controllerConfig.appParams.instance;
        this.instanceId = controllerConfig.appParams.instanceId;
        this.appSettings = new AppSettings(
            this.compId,
            this.instance,
            this.viewMode,
            this.appSettingsBaseUrl,
        );
        this.reportBiLog = reportBiLog;
        this.initDataSavedState();
    }

    isSSR() {
        return this.wixCodeApi.window.rendering.env === 'backend';
    }

    shouldFallbackToV1() {
        return !experimentsWrapper.getExperimentBoolean(
            'specs.pro-gallery.removeFallbackToV1',
        );
    }
    setAppSettings(appSettings) {
        Object.assign(this, { ...appSettings
        });
        this.appSettingsData = appSettings;
        this.SSRWorkerLog.push(
            'FLOW received appSettings and the gallery Id is: ',
            appSettings.galleryId,
        );
    }

    fetchSettings() {
        if (!this.appSettingsFetchingPromise ? .isPending) {
            this.appSettingsFetchingPromise = new Deferred();
            this.SSRWorkerLog.push('FLOW trying to get settings from appSettings');
            this.withWarmupData(
                () => this.appSettings.get(this.dataSavedState),
                'appSettings',
            ).then((appSettings) => {
                if (appSettings && appSettings.galleryId) {
                    this.setAppSettings(appSettings);
                    this.appSettingsFetchingPromise.resolve(appSettings);
                } else {
                    this.appSettingsFetchingPromise.resolve(null);
                    if (!this.isSSR()) {
                        const biData = {
                            compId: this.compId,
                            errorType: 'no_appSettings.galleryId',
                        };
                        this.reportBiLog('proGalleryErrorUou', biData);
                    }
                }
            });
        } else {
            this.SSRWorkerLog.push('appSettings is already fetching');
        }
        return this.appSettingsFetchingPromise.promise;
    }

    async fetchGalleryId() {
        if (this.galleryId) {
            return;
        }
        const settings = await this.fetchSettings();
        if (!settings) {
            console.error('could not get galleryId for pro gallery');
        }
        return;
    }

    async getGalleryDataFromServer({
        from,
        batchSize = this.ITEMS_BATCH_SIZE
    }) {
        this.SSRWorkerLog.push('Fn getGalleryDataFromServer', 'from: ', from);
        await Utils.verifyExperiments(this.scopedGlobalSdkApis); // make sure experiments were requestd and are ready before proceeding
        try {
            return await this.getDataFromServer({
                from,
                batchSize,
            });
        } catch (e) {
            if (this.shouldFallbackToV1()) {
                console.error('failed to fetch from V2 server, fetching form V1', e);
                const galleryData = await this.TO_BE_REMOVED_getDataFromFallbackServer({
                    from,
                    batchSize,
                });
                this.TO_BE_REMOVED_setGalleryData({
                    galleryData
                });

                const {
                    items,
                    totalItemsCount
                } = galleryData.pageResponse;
                return {
                    items,
                    totalItemsCount
                };
            } else {
                throw new Error(
                    'Could not get items for gallery comp:' +
                    this.compId +
                    ' galleryId: ' +
                    this.galleryId,
                );
            }
        }
    }

    TO_BE_REMOVED_addSsrUrlParams(url) {
        return (url += this.isSSR() ?
            '&petri_ovr=specs.SkipCachePopulationSpec:true' :
            '');
    }

    async TO_BE_REMOVED_getDataFromFallbackServer({
        from,
        batchSize
    }) {
        const to = from + batchSize;
        const requestUrl = this.TO_BE_REMOVED_addSsrUrlParams(
            `${this.baseUrl}/_api/pro-gallery-webapp/v1/gallery/${this.instanceId}/items/from/${from}/to/${to}?compId=${this.compId}&externalId=${this.externalId}`,
        );
        this.SSRWorkerLog.push(
            'trying to get items from the fallback server ',
            requestUrl,
        );
        return this.fetchNonPlatformizedServerData({
            requestUrl,
            multilingualHeader: this.getMultiLangHeader(),
        });
    }

    async fetchNonPlatformizedServerData({
        requestUrl,
        multilingualHeader
    }) {
        const response = await fetch(requestUrl, {
            headers: {
                'x-wix-linguist': multilingualHeader,
            },
        });
        const data = await response.json();
        return data;
    }

    async getDataFromServer({
        from,
        batchSize
    }) {
        await this.fetchGalleryId();
        if (!this.galleryId) {
            throw new Error(
                'no galleryId, can not fetch items from pro gallery server',
            );
        }

        const siteRevision = this.getSiteRevisionNumber();

        let requestUrl = `${this.baseUrl}/pro-gallery-webapp/v1/galleries/${
      this.galleryId
    }?offset=${from}&limit=${batchSize}&externalId=${this.externalId}&state=${
      this.dataSavedState
    }&lang=${this.getLangQuery()}`;

        if (siteRevision) {
            requestUrl += `&htmlSiteRevision=${siteRevision}`;
        }

        const data = await this.fetchPlatformizedData({
            requestUrl,
            multilingualHeader: this.getMultiLangHeader(),
        });
        const gallery = data ? .gallery;
        this.setGalleryData({
            gallery,
            settings: this.appSettingsData
        });
        return {
            items: serverItemsToProGallery(gallery.items),
            totalItemsCount: gallery.totalItemsCount,
        };
    }

    getSiteRevisionNumber() {
        try {
            const queryParams = this.wixCodeApi.location.query;

            if (
                this.dataSavedState === Consts.dataSavedState.PUBLISHED &&
                queryParams ? .rc === 'test-site'
            ) {
                return this.wixCodeApi.site ? .revision;
            } else {
                return '';
            }
        } catch (e) {
            return '';
        }
    }

    async fetchPlatformizedData({
        requestUrl,
        multilingualHeader
    }) {
        const response = await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.instance,
                'x-wix-linguist': multilingualHeader,
            },
        });
        const data = await response.json();
        return data;
    }

    initDataSavedState() {
        if (
            this.viewMode === GALLERY_CONSTS.viewMode.PREVIEW ||
            this.viewMode === GALLERY_CONSTS.viewMode.EDIT
        ) {
            // encode instance only when needed (in preview or editor only), too have for live site.
            const encodedInstance = this.instance.substring(
                this.instance.indexOf('.') + 1,
            );
            const isDemoMode = JSON.parse(atob(encodedInstance)).demoMode;
            this.dataSavedState = isDemoMode ?
                Consts.dataSavedState.PUBLISHED :
                Consts.dataSavedState.SAVED;
        } else {
            this.dataSavedState = Consts.dataSavedState.PUBLISHED;
        }
    }

    getMultiLangFields() {
        const currentShortLang =
            this.wixCodeApi.window.multilingual.currentLanguage;
        const currentLang =
            this.wixCodeApi.window.multilingual.siteLanguages.filter(
                (lang) => lang.languageCode === currentShortLang,
            );
        if (currentLang.length > 0) {
            return {
                isPrimaryLanguage: currentLang[0].isPrimaryLanguage,
                lang: currentShortLang,
                locale: currentLang[0].locale,
            };
        }

        return null;
    }

    getMultiLangHeader() {
        const fields = this.getMultiLangFields();
        const header = fields ?
            `${fields.lang}|${
          fields.locale
        }|${fields.isPrimaryLanguage.toString()}|${this.instanceId}` :
            '';
        this.SSRWorkerLog.push('Multilingual header: ' + header);
        return header;
    }

    getLangQuery() {
        const fields = this.getMultiLangFields();
        const query = fields ? `${fields.lang}${fields.locale}` : '';
        return query;
    }

    setGalleryData({
        gallery,
        settings
    }) {
        const {
            created: dateCreated
        } = gallery;
        this.dateCreated = dateCreated;
        this.setSettings(settings);
    }

    TO_BE_REMOVED_setGalleryData({
        galleryData
    }) {
        if (galleryData && galleryData.galleryId) {
            const {
                galleryId,
                dateCreated
            } = galleryData;
            const {
                settings
            } = galleryData.pageResponse;
            this.setGalleryId(galleryId);
            this.setDateCreated(dateCreated);
            this.setSettings(settings);
            return {
                galleryId,
                dateCreated,
                settings: this.settings
            };
        }
    }

    setGalleryId(galleryId) {
        this.galleryId = galleryId;
    }

    setDateCreated(dateCreated) {
        this.dateCreated = dateCreated;
    }

    setSettings(settings) {
        const parseSettings = (_settings) => {
            if (typeof _settings === 'string') {
                try {
                    return JSON.parse(_settings);
                } catch (e) {
                    console.error('Failed parse settting', e);
                    return _settings;
                }
            }
            return _settings;
        };
        const prevSettings = parseSettings(this.settings);
        const nextSettings = parseSettings(settings);
        this.settings = { ...prevSettings,
            ...nextSettings
        };
    }

    async getItemByIdFromServer(itemId) {
        await this.fetchGalleryId();
        const requestUrl = `${this.baseUrl}/pro-gallery-webapp/v1/galleries/${this.galleryId}/items/${itemId}?state=${this.dataSavedState}`;
        this.SSRWorkerLog.push(
            'trying to get Direct fullscreen item from the server ',
            requestUrl,
        );
        const data = await this.fetchPlatformizedData({
            requestUrl,
            multilingualHeader: this.getMultiLangHeader(),
        });
        return data ? .item ? serverItemsToProGallery([data ? .item])[0] : {};
    }
}