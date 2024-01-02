import {
    default as WindowMock
} from './window.mock';
var WindowWrapper = /** @class */ (function() {
    function WindowWrapper() {
        this.reset();
    }
    WindowWrapper.prototype.windowIsAvailable = function() {
        try {
            return typeof window !== 'undefined';
        } catch (e) {
            return false;
        }
    };
    WindowWrapper.prototype.reset = function() {
        this.isMock = !this.windowIsAvailable();
        this.window = this.isMock ? WindowMock : window;
        if (this.isMock) {
            this.window.mockInstanceId = Math.floor(Math.random() * 100000);
        }
    };
    return WindowWrapper;
}());
var windowWrapper = new WindowWrapper();
var _window = windowWrapper.window;
export default _window;
export {
    windowWrapper
};
//# sourceMappingURL=windowWrapper.js.map