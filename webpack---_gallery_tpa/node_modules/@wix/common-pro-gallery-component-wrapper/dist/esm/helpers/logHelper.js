import {
    __assign
} from "tslib";
import {
    utils
} from '../utils/webUtils';
var LogHelper = /** @class */ (function() {
    function LogHelper(galleryWrapper, props, SENTRY_DSN) {
        var _this = this;
        this.onAppLoaded = function() {
            if (utils.isVerbose()) {
                console.log('[APP LOAD DEBUG] galleryWrapper -> logHandler -> onAppLoaded');
            }
            try {
                if (!utils.isSSR()) {
                    // this is not happening only once as the tryToReportAppLoaded is handling the timings and is protecting of it to happen only once.
                    if (utils.isVerbose()) {
                        console.log('[APP LOAD DEBUG] galleryWrapper -> logHandler -> onAppLoaded -> tryToReportAppLoaded is gonne be called');
                        console.log('[APP LOAD DEBUG] galleryWrapper -> logHandler -> onAppLoaded -> this.galleryWrapperProps', _this.galleryWrapperProps);
                    }
                    if (_this.galleryWrapperProps.tryToReportAppLoaded) {
                        _this.galleryWrapperProps.tryToReportAppLoaded();
                    }
                }
                if (!_this.appLoadBiReported) {
                    if (_this.galleryWrapperProps.appLoadBI &&
                        typeof _this.galleryWrapperProps.appLoadBI.loaded === 'function') {
                        _this.galleryWrapperProps.appLoadBI.loaded();
                        _this.appLoadBiReported = true;
                    } else {
                        var err = 'Cannot report AppLoaded, appLoadBI.loaded function is not defined';
                        console.error(err);
                        _this.captureMessage(err);
                    }
                }
            } catch (e) {
                console.error('Could not report appLoaded', e);
            }
        };
        this.galleryWrapper = galleryWrapper;
        this.galleryWrapperProps = props;
        this.update = this.update.bind(this);
        this.onAppLoaded = this.onAppLoaded.bind(this);
        this.reportBiEvent = this.reportBiEvent.bind(this);
        this.SENTRY_DSN = SENTRY_DSN;
        this.reportBiLog =
            props && props.reportBiLog ? props.reportBiLog : function() {};
    }
    LogHelper.prototype.update = function(props) {
        if (!this.galleryWrapperProps.reportBiLog && props.reportBiLog) {
            this.reportBiLog = props.reportBiLog;
        }
        this.galleryWrapperProps = props;
    };
    LogHelper.prototype.reportBiEvent = function(eventName, eventData, origin) {
        switch (eventName) {
            case 'onDownloadButtonClicked':
            case 'downloadTextItem':
                this.reportBiLog('download', {
                    origin: origin,
                });
                break;
            case 'onBuyNowClicked':
                this.reportBiLog('buyBuyNowClick');
                break;
            case 'onPGCustomButtonClicked':
                this.reportBiLog('proGalleryClickOnCustomButton', {
                    action: eventData.options.itemClick,
                    button_text: eventData.options.customButtonText,
                });
                break;
            case 'onItemClicked':
                this.reportBiLog('galleryClickOnItem', {
                    action: eventData.options.itemClick,
                    mediaType: eventData.type,
                    layout: utils.getGalleryLayoutName(eventData.options.galleryLayout),
                });
                break;
            case 'onThumbnailClicked':
                this.reportBiLog('galleryClickOnItem', {
                    action: 'thumbnail',
                    mediaType: undefined,
                    layout: utils.getGalleryLayoutName(eventData.options.galleryLayout),
                });
                break;
            case 'love':
                this.reportBiLog('love', {
                    origin: origin,
                });
                break;
            case 'share':
                this.reportBiLog('share', {
                    origin: origin,
                    platform: eventData.network,
                });
                break;
            case 'info': // Share icon (that opens the social-share popup) clicked
                this.reportBiLog('info', {
                    origin: origin,
                });
                break;
            case 'item_expanded':
                this.reportBiLog('galleryItemExpanded', {
                    mediaType: eventData.type,
                });
                break;
            case 'gallery_rendered':
                var options = this.galleryWrapper.siteHelper.getPGOptions();
                var _a = this.galleryWrapper.itemsHelper.pgItemsProps(),
                    items = _a.items,
                    totalItemsCount = _a.totalItemsCount;
                var galleryItemsSource = this.galleryWrapperProps.galleryItemsSource;
                var layoutDetails = {
                    layoutType: Number(options.galleryLayout) !== -2 &&
                        Number(options.designedPresetId) === -1 ?
                        'custom' :
                        'presets',
                    customLayoutID: Number(options.galleryLayout) === -2 ?
                        null :
                        Number(options.galleryLayout),
                    presetLayoutID: Number(options.designedPresetId) === -1 ?
                        null :
                        Number(options.designedPresetId),
                };
                // const whyNotLean = notEligibleReasons({ items, styles }) || []; 'notEligibleReasons' should be imported from 'lean-gallery' package
                // galleryRendered = 508 biEvent
                this.reportBiLog('galleryRendered', __assign({
                    styleParams: JSON.stringify(options),
                    numberOfItems: totalItemsCount,
                    isLean: false,
                    notLeanReason: null,
                    itemSource: galleryItemsSource
                }, layoutDetails));
                break;
            case 'migratedLoveData':
                this.reportBiLog('migratedLoveData', {
                    gallery_id: eventData.galleryId,
                    migration_status: eventData.migrationStatus,
                });
                break;
            default:
                break;
        }
    };
    LogHelper.prototype.captureMessage = function(str) {
        var SENTRY_DSN = this.SENTRY_DSN;
        var options = {
            dsn: SENTRY_DSN,
            config: {
                environment: 'Native Component'
            },
        };
        try {
            this.galleryWrapperProps.raven.config(options.dsn, options.config);
            this.galleryWrapperProps.raven.captureMessage(str);
        } catch (e) {
            //
        }
    };
    return LogHelper;
}());
export default LogHelper;
//# sourceMappingURL=logHelper.js.map