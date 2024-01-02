import {
    __assign
} from "tslib";
import {
    wixCodeItemsToProGallery,
    proGalleryItemsToWixCode,
    proGalleryItemToWixCode,
} from '@wix/pro-gallery-items-formatter';
var WixCodeApi = /** @class */ (function() {
    function WixCodeApi() {
        this.generateApi = this.generateApi.bind(this);
        this.onCurrentItemChanged = this.onCurrentItemChanged.bind(this);
        this.onItemClicked = this.onItemClicked.bind(this);
        this.setStyleParams = this.setStyleParams.bind(this);
        this.setClickCallback = this.setClickCallback.bind(this);
        this.setItemChangedCallback = this.setItemChangedCallback.bind(this);
        this.manualStyleParams = {};
        this.itemClickedCallbacks = [];
        this.itemChangedCallbacks = [];
        this.clickedIdx = -1;
    }
    WixCodeApi.prototype.setClickCallback = function(callback) {
        if (typeof callback === 'function') {
            this.itemClickedCallbacks.push(callback);
        }
    };
    WixCodeApi.prototype.onItemClicked = function(item) {
        var event = {
            target: this.api,
            type: 'itemClicked',
            itemIndex: item.idx,
            item: proGalleryItemToWixCode(item.dto),
        };
        // activate open callbacks
        try {
            for (var i = 0; i < this.itemClickedCallbacks.length; i++) {
                var callback = this.itemClickedCallbacks[i];
                if (typeof callback === 'function') {
                    callback(event);
                }
            }
        } catch (e) {
            console.warn('Gallery failed to activate onItemClicked callbacks', e);
        }
    };
    WixCodeApi.prototype.setItemChangedCallback = function(callback) {
        if (typeof callback === 'function') {
            this.itemChangedCallbacks.push(callback);
        }
    };
    WixCodeApi.prototype.onCurrentItemChanged = function(item) {
        try {
            var _item = {
                event: {
                    action: 'imageChanged',
                    id: item.id,
                    imageIndex: item.idx,
                    item: proGalleryItemToWixCode(item),
                },
            };
            for (var i = 0; i < this.itemChangedCallbacks.length; i++) {
                var callback = this.itemChangedCallbacks[i];
                if (typeof callback === 'function') {
                    callback(_item.event);
                }
            }
        } catch (e) {
            //
        }
    };
    WixCodeApi.prototype.setStyleParams = function(styleParams, existingManualStyleParams) {
        var mapStyleParams = function(_styleParams) {
            var mappedStyleParams = existingManualStyleParams;
            var keys = Object.keys(__assign({}, _styleParams));
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                mappedStyleParams[key] = mapStyleParam(key, _styleParams[key]);
            }
            return mappedStyleParams;
        };
        var mapStyleParam = function(key, val) {
            var newVal;
            switch (key) {
                case 'itemClick':
                    switch (val) {
                        default:
                            case 'none':
                            case 'disabled':
                            newVal = 'nothing';
                        break;
                        case 'expand':
                                case 'zoomMode':
                                newVal = 'expand';
                            break;
                        case 'fullscreen':
                                newVal = 'fullscreen';
                            break;
                        case 'link':
                                case 'goToLink':
                                newVal = 'link';
                            break;
                    }
                    break;
                default:
                    {
                        newVal = val;
                    }
            }
            return newVal;
        };
        try {
            this.manualStyleParams = mapStyleParams(styleParams);
            return this.manualStyleParams;
        } catch (e) {
            console.error('Failed to set styleParams', e);
            return {};
        }
    };
    WixCodeApi.prototype.generateCartApi = function(func) {
        return {
            get type() {
                return '$w.Cart';
            },
            set options(data) {
                func(data);
            },
        };
    };
    WixCodeApi.prototype.generateApi = function(_a) {
        var proGalleryStore = _a.proGalleryStore,
            setNewStyleParams = _a.setNewStyleParams,
            setClickedIdx = _a.setClickedIdx,
            _b = _a.setNewSettings,
            setNewSettings = _b === void 0 ? function() {} : _b,
            setManualDimensions = _a.setManualDimensions;
        var _c = this,
            setStyleParams = _c.setStyleParams,
            manualStyleParams = _c.manualStyleParams,
            setClickCallback = _c.setClickCallback,
            setItemChangedCallback = _c.setItemChangedCallback;
        return (this.api = {
            set dimensions(dimensions) {
                if (!dimensions) {
                    console.error('set manual dimensions called with no input');
                    return;
                }
                var _dimensions = __assign(__assign(__assign(__assign(__assign({}, proGalleryStore.dimensions), (dimensions.width > 0 && {
                    width: Number(dimensions.width),
                })), (dimensions.width === '' && {
                    width: '',
                })), (dimensions.height > 0 && {
                    height: Number(dimensions.height),
                })), (dimensions.height = '' && {
                    height: '',
                }));
                setManualDimensions(_dimensions);
            },
            get dimensions() {
                return proGalleryStore.dimensions;
            },
            get type() {
                return '$w.Gallery';
            },
            get galleryCapabilities() {
                return {
                    isPlayable: false,
                    hasCurrentItem: false,
                    hasNavigationButtons: false,
                    supportsAllMediaTypes: true,
                };
            },
            set items(images) {
                proGalleryStore.itemsSrc = 'Velo';
                proGalleryStore.setAllWixCodeItems(wixCodeItemsToProGallery(images));
                proGalleryStore.totalItemsCount =
                    proGalleryStore.allWixCodeItems.length;
                proGalleryStore.loadInitialWixCodeItems();
            },
            get items() {
                return proGalleryItemsToWixCode(proGalleryStore.getItems());
            },
            onItemClicked: function(callback) {
                return setClickCallback(callback);
            },
            onCurrentItemChanged: function(callback) {
                return setItemChangedCallback(callback);
            },
            expandItem: function(itemIdx) {
                setClickedIdx(itemIdx);
            },
            set clickAction(action) {
                proGalleryStore._clickAction = action;
                setStyleParams({
                    itemClick: action
                }, manualStyleParams); // action is: 'none' / 'expand' / 'link' /'fullscreen'
                setNewStyleParams(manualStyleParams);
            },
            get clickAction() {
                if (proGalleryStore._clickAction) {
                    return proGalleryStore._clickAction;
                }
                return '';
            },
            set showNavigationButtons(value) {
                proGalleryStore._showArrows = value;
                setStyleParams({
                    showArrows: value
                }, manualStyleParams); // value should be boolean
                setNewStyleParams(manualStyleParams);
            },
            get showNavigationButtons() {
                if (proGalleryStore._showArrows) {
                    return proGalleryStore._showArrows;
                }
                return '';
            },
            get options() {
                return {
                    styleParams: manualStyleParams,
                    settings: proGalleryStore.settings,
                };
            },
            set options(_a) {
                var styleParams = _a.styleParams,
                    settings = _a.settings;
                styleParams && setNewStyleParams(setStyleParams(styleParams, {})); // setting styleParams via options is removing previous manualy set styleParams
                settings && setNewSettings(settings);
            },
            toJSON: function() {
                return ({
                    items: proGalleryStore.getItems(),
                    clickAction: manualStyleParams.itemClick,
                    showNavigationButtons: manualStyleParams.showArrows,
                });
            },
        });
    };
    return WixCodeApi;
}());
export default WixCodeApi;
//# sourceMappingURL=wixCodeApi.js.map