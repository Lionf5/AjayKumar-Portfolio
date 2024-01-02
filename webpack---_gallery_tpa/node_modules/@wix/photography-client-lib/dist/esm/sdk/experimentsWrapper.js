import {
    __assign
} from "tslib";
import window from './windowWrapper';
import {
    baseUtils
} from '../utils/baseUtils';
var ExperimentsWrapper = /** @class */ (function() {
    function ExperimentsWrapper() {
        this.getExperiment = this.getExperiment.bind(this);
        this.getExperiments = this.getExperiments.bind(this);
        this.setExperiments = this.setExperiments.bind(this);
        this.getExperimentBoolean = this.getExperimentBoolean.bind(this);
        this._experiments = Object.assign({}, __assign({}, window.petri));
        this.experimentsAreReady = Object.keys(this._experiments) > 0;
        this.onExperimentReadyCb = [];
    }
    ExperimentsWrapper.prototype.setExperiments = function(_experiments) {
        if (!_experiments) {
            return;
        }
        try {
            Object.assign(this._experiments, __assign({}, _experiments));
            if (baseUtils.isDev()) {
                window.petri = this._experiments;
            }
            this.triggerExperimentsReady();
            // resolve the promise
            this.experimentsAreReady = true;
        } catch (e) {
            console.error('Could not set experiments', e);
        }
    };
    Object.defineProperty(ExperimentsWrapper.prototype, "experiments", {
        get: function() {
            return this.getExperiments();
        },
        enumerable: false,
        configurable: true
    });
    ExperimentsWrapper.prototype.getExperiments = function() {
        // todo - this is a temp fix for development
        if (baseUtils.isDev()) {
            return __assign(__assign({}, this._experiments), window.petri);
        }
        return this._experiments;
    };
    ExperimentsWrapper.prototype.getExperiment = function(experiment) {
        return this.experiments[experiment];
    };
    ExperimentsWrapper.prototype.getExperimentBoolean = function(experiment) {
        return (this.getExperiment(experiment) === 'true' ||
            this.getExperiment(experiment) === true);
    };
    Object.defineProperty(ExperimentsWrapper.prototype, "isReady", {
        get: function() {
            return this.experimentsAreReady || Object.keys(this._experiments) > 0;
        },
        enumerable: false,
        configurable: true
    });
    ExperimentsWrapper.prototype.triggerExperimentsReady = function() {
        var _this = this;
        try {
            this.onExperimentReadyCb.forEach(function(cb) {
                return cb(_this.experiments);
            });
        } catch (e) {
            console.error('Could not trigger experiments callback', e);
        }
    };
    ExperimentsWrapper.prototype.onExperimentsReady = function(callback) {
        if (typeof callback === 'function') {
            if (this.isReady) {
                callback(this.experiments);
            } else {
                this.onExperimentReadyCb.push(callback);
            }
        }
    };
    return ExperimentsWrapper;
}());
var getExperimentsWrapper = function() {
    if (baseUtils.isDev()) {
        if (!window.proGalleryExperimentsWrapper) {
            var experimentsWrapper_1 = new ExperimentsWrapper();
            window.proGalleryExperimentsWrapper = experimentsWrapper_1;
        }
        return window.proGalleryExperimentsWrapper;
    }
    return new ExperimentsWrapper();
};
var experimentsWrapper = getExperimentsWrapper();
export default experimentsWrapper.getExperiment;
export {
    experimentsWrapper
};
//# sourceMappingURL=experimentsWrapper.js.map