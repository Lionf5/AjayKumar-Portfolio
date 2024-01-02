import WixMock from './Wix.mock';
var WixSdkWrapper = /** @class */ (function() {
    function WixSdkWrapper() {
        this.init();
    }
    WixSdkWrapper.prototype.wixSdkIsAvailable = function() {
        try {
            return (typeof window !== 'undefined' &&
                typeof window.Wix !== 'undefined' &&
                typeof window.Wix.Utils.getCompId === 'function'); // getCompId function is only available is the TPA version of the sdk
        } catch (e) {
            return false;
        }
    };
    WixSdkWrapper.prototype.init = function() {
        try {
            if (this.wixSdkIsAvailable()) {
                // Wix Sdk is on the window
                Object.assign(this, WixMock, window.Wix);
                this.isMock = false;
            } else {
                Object.assign(this, WixMock);
                this.isMock = true;
            }
        } catch (e) {
            Object.assign(this, WixMock);
            this.isMock = true;
        }
    };
    return WixSdkWrapper;
}());
export default new WixSdkWrapper();
//# sourceMappingURL=WixSdkWrapper.js.map