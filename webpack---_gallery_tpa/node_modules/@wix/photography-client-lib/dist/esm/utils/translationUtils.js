import {
    __assign
} from "tslib";
import window from '../sdk/windowWrapper';
var TranslationUtil = /** @class */ (function() {
    function TranslationUtil() {
        this._translations = Object.assign({}, __assign({}, window.translations));
    }
    TranslationUtil.prototype.setTranslations = function(translations) {
        Object.assign(this._translations, __assign({}, translations));
    };
    Object.defineProperty(TranslationUtil.prototype, "translations", {
        get: function() {
            return this._translations;
        },
        enumerable: false,
        configurable: true
    });
    TranslationUtil.prototype.getByKey = function(strKey) {
        try {
            var strValue = null;
            if (this.translations) {
                strValue = this.translations[strKey] || window.translations[strKey];
            }
            if (!strValue) {
                strValue = strKey;
            }
            if (window) {
                if (window.isClientDev) {
                    strValue = strKey;
                }
                if (window.unescape) {
                    strValue = window.unescape(strValue); // for chars that come from babel like &#39;
                }
            }
            return strValue;
        } catch (e) {
            return strKey;
        }
    };
    return TranslationUtil;
}());
export default new TranslationUtil();
//# sourceMappingURL=translationUtils.js.map