var __assign = (this && this.__assign) || function() {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s)
                if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import {
    getProcessedCssWithConfig,
    getStaticCssWithConfig
} from './standalone';
export function getProcessedCss(styles, options, defaults) {
    var injectedData = '__789632__INJECTED_DATA_PLACEHOLDER';
    var processedCssConfig = __assign(__assign({
        defaults: defaults
    }, injectedData), {
        compilationHash: '__789632__'
    });
    return getProcessedCssWithConfig(processedCssConfig, styles, options);
}
export function getStaticCss(options) {
    var injectedData = '__789632__INJECTED_STATIC_DATA_PLACEHOLDER';
    var cssConfig = __assign(__assign({}, injectedData), {
        compilationHash: '__789632__'
    });
    return getStaticCssWithConfig(cssConfig, options);
}
//# sourceMappingURL=main.js.map