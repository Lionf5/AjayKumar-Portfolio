var SentryReporter = /** @class */ (function() {
    function SentryReporter(SENTRY_DSN) {
        this.SENTRY_DSN = SENTRY_DSN;
        this.sentry = null;
    }
    SentryReporter.prototype.init = function(initAppParam, scopedGlobalSdkApis, platformServices) {
        // this.platformServices = platformServices;
        var context = {
            id: initAppParam.instanceId,
            url: scopedGlobalSdkApis.location.baseUrl,
        };
        var SENTRY_DSN = this.SENTRY_DSN;
        this.sentry = platformServices.monitoring.createMonitor(SENTRY_DSN, function(data) {
            data.environment = 'Worker';
            return data;
        });
        this.sentry.setUserContext(context);
    };
    SentryReporter.prototype.report = function(e) {
        if (this.sentry) {
            this.sentry.captureException(e);
        } else {
            console.error('SentryReporter: trying to report before init', e);
        }
    };
    return SentryReporter;
}());
export default SentryReporter;
//# sourceMappingURL=SentryReporter.js.map