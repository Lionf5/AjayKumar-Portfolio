var modelCache = {};
var _document = typeof document !== 'undefined' ?
    document :
    {
        addEventListener: function() {},
        removeEventListener: function() {},
    };
var WixMock = {
    closeWindow: function() {},
    addEventListener: function(event, callback) {
        _document.addEventListener(event, callback);
    },
    removeEventListener: function(event, callback) {
        _document.removeEventListener(event, callback);
    },
    stylesMock: {
        fonts: {
            testKey: {
                cssFontFamily: '1111'
            }
        },
        numbers: {},
        colors: {},
        booleans: {},
    },
    colorMock: {
        colors: {
            testColorKey: 'color-1'
        }
    },
    getBoundingRectAndOffsets: function(callback) {
        callback({
            offsets: {
                x: 0,
                y: 0,
            },
        });
    },
    getCurrentPageId: function(callback) {
        callback('');
    },
    Utils: {
        navigateToSection: function() {},
        getOrigCompId: function() {},
        getCompId: function() {
            return null;
        },
        getViewMode: function() {},
        getDemoMode: function() {},
        getInstance: function() {
            return null;
        },
        getInstanceValue: function() {
            return null;
        },
        getInstanceId: function() {
            return null;
        },
        getBusinessId: function() {
            return '';
        },
        isOverEditor: function() {
            return false;
        },
        getSectionUrl: function(sectionIdentifier, callback) {
            setTimeout(function() {
                callback('https://mock_section_url');
            }, 0);
        },
        getSiteOwnerId: function() {
            return '';
        },
        getUid: function() {
            return '';
        },
        Media: {
            getResizedImageUrl: function(relativeUrl, width, height) {
                return ('/images/test-' + relativeUrl + '-' + width + '-' + height + '.jpg');
            },
        },
    },
    setHeight: function() {},
    UI: {
        create: function() {
            return {};
        },
        initialize: function() {},
        onChange: function(key, func) {
            _document.addEventListener(key, function() {
                func(modelCache[key]);
            });
        },
        get: function(key) {
            return modelCache[key];
        },
        set: function(key, val) {
            modelCache[key] = val;
        },
        modelCache: modelCache,
    },
    Styles: {
        getColorByreference: function() {
            return {
                value: '#123456'
            };
        },
        getSiteColors: function() {
            var arr = [];
            for (var i = 0; i < 31; i++) {
                arr[i] = i;
            }
            return arr;
        },
        getStyleParams: function(callbackFunc) {
            if (callbackFunc) {
                return callbackFunc(WixMock.stylesMock);
            } else {
                return WixMock.stylesMock;
            }
        },
        getStyleParamsByStyleId: function(styleId, pageId, callbackFunc) {
            if (callbackFunc) {
                return callbackFunc(WixMock.stylesMock);
            } else {
                return WixMock.stylesMock;
            }
        },
        restoreParam: function() {
            WixMock.stylesMock = {
                fonts: {
                    testKey: {
                        cssFontFamily: '1111'
                    }
                },
                numbers: {},
                colors: {},
                booleans: {},
            };
        },
        setFontParam: function(key, value, callback) {
            WixMock.stylesMock.fonts[key] = {
                cssFontFamily: value.value.cssFontFamily,
            };
            if (callback) {
                callback();
            }
        },
        setColorParam: function(key, value, callback) {
            WixMock.colorMock.colors[key] = value;
            if (callback) {
                callback();
            }
        },
        getSiteTextPresets: function() {
            return {
                Title: {
                    editorKey: 'font_0',
                    fontFamily: 'fontFamilyTitle',
                    lineHeight: '1.4em',
                    size: '40px',
                    style: 'normal',
                    value: 'value',
                    weight: 'normal',
                },
            };
        },
        getEditorFonts: function() {
            return [{
                    language: 'hebrew',
                    fonts: [{
                        cssFontFamily: 'fontFamilyTitle0',
                        fontFamily: 'fontFamilyTitle0',
                        genericFamily: 'cursive0',
                        permissions: 'all0',
                        provider: 'google0',
                        spriteIndex: 132,
                    }, ],
                },
                {
                    language: 'latin',
                    fonts: [{
                        cssFontFamily: 'fontFamilyTitle',
                        fontFamily: 'fontFamilyTitle',
                        genericFamily: 'cursive',
                        permissions: 'all',
                        provider: 'google',
                        spriteIndex: 154,
                    }, ],
                },
                {
                    language: 'arabic',
                    fonts: [{
                        cssFontFamily: 'fontFamilyTitleArabic',
                        fontFamily: 'fontFamilyTitleArabic',
                        genericFamily: 'cursiveArabic',
                        permissions: 'allArabic',
                        provider: 'googleArabic',
                        spriteIndex: 160,
                    }, ],
                },
            ];
        },
        getStyleId: function(callback) {
            callback('mock-style-id');
        },
    },
    Settings: {
        openModal: function(url, width, height, name, callback) {
            callback();
        },
        triggerSettingsUpdatedEvent: function() {},
        getSiteInfo: function(callback) {
            return callback({
                baseUrl: 'www.test.boost.co.il'
            });
        },
        getDashboardAppUrl: function(func) {
            func.call();
        },
        refreshApp: function() {
            return '';
        },
        setExternalId: function() {},
        addComponent: function() {},
        MediaType: {
            IMAGE: 'photos',
            BACKGROUND: 'backgrounds',
            AUDIO: 'audio',
            DOCUMENT: 'documents',
            SWF: 'swf',
            SECURE_MUSIC: 'secure_music',
            VIDEO: 'video',
            SHAPE: 'shape',
            MUSIC: 'music',
            CLIPART: 'clipart',
            BG_VIDEO: 'bg_video',
            ICON_DOCUMENT: 'icon_document',
            ICON_SOCIAL: 'bg_social',
            ICON_FAVICON: 'bg_favicon',
            MUSIC_PRO: 'secure_music',
            IMAGE_PRO: 'secure_picture',
            FLASH: 'swf',
            BG_IMAGE: 'backgrounds',
        },
    },
    Events: {
        PUBLIC_DATA_CHANGED: 'PUBLIC_DATA_CHANGED',
        SETTINGS_UPDATED: 'SETTINGS_UPDATED',
        EDIT_MODE_CHANGE: 'EDIT_MODE_CHANGE',
        STYLE_PARAMS_CHANGE: 'STYLE_PARAMS_CHANGE',
        THEME_CHANGE: 'THEME_CHANGE',
        PAGE_NAVIGATION_IN: 'PAGE_NAVIGATION_IN',
        PAGE_NAVIGATION_OUT: 'PAGE_NAVIGATION_OUT',
    },
    Theme: {
        BARE: 'bare',
    },
    scrollTo: function() {},
    scrollBy: function() {},
    getSiteInfo: function() {},
    Data: {
        Public: {
            get: function(key, jsonObj, callback) {
                callback({
                    pg: 1
                });
            },
        },
    },
    Features: {
        isSupported: function() {
            // isSupported: function (feature, callback){
            // callback(true);
        },
        Types: {
            ADD_COMPONENT: 'ADD_COMPONENT',
        },
    },
    PubSub: {
        subscribe: function() {},
        publish: function() {},
    },
    getSitePages: function(callback) {
        if (typeof callback === 'function') {
            callback([]);
        }
    },
    replaceSectionState: function() {},
    Performance: {
        applicationLoaded: function() {},
        applicationLoadingStep: function() {},
    },
    Activities: {
        postActivity: function() {},
        Type: {
            SOCIAL_TRACK: 'SOCIAL_TRACK',
        },
    },
};
export default WixMock;
//# sourceMappingURL=Wix.mock.js.map