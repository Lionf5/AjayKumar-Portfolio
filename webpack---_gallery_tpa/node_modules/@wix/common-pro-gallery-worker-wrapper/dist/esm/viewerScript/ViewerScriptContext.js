import SentryReporter from '../utils/SentryReporter';
var Context = /** @class */ (function() {
    function Context(SENTRY_DSN) {
        this.context = null;
        this.sentryReporter = new SentryReporter(SENTRY_DSN);
    }
    Context.prototype.setContext = function(context) {
        this.context = context;
    };
    Context.prototype.initSentry = function(initAppParam, scopedGlobalSdkApis, platformServices) {
        this.sentryReporter.init(initAppParam, scopedGlobalSdkApis, platformServices);
    };
    Context.prototype.getSentry = function() {
        return this.sentryReporter;
    };
    Context.prototype.getContext = function() {
        return this.context;
    };
    return Context;
}());
export default Context;
//# sourceMappingURL=ViewerScriptContext.js.map