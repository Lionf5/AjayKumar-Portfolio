import VersionManagerCore from './versionManager.js';
import {
    renderUtils
} from '../utils/renderUtils';
import Wix from '../sdk/WixSdkWrapper';
import featuresList from './featuresList';
import _ from 'lodash';
import {
    parse
} from 'query-string';
import {
    baseUtils
} from '../utils/baseUtils';
import window from '../sdk/windowWrapper';
var getManualUpdatesData = function() {
    var workerWindow = renderUtils.getWorkerWindow();
    var manualUpdates;
    if (workerWindow) {
        var workerWindowData = renderUtils.getGalleryDataFromWorker();
        manualUpdates = _.get(workerWindowData, 'window.gallerySettings.upgrades');
    }
    if (!manualUpdates) {
        manualUpdates = _.get(renderUtils.getGallerySettingsFromWindow(), 'upgrades');
    }
    return manualUpdates;
};
var ProGalleryVersionManager = /** @class */ (function() {
    function ProGalleryVersionManager(dateCreated, features) {
        this.dateCreated = dateCreated;
        this.features = features;
        this.versionManager = new VersionManagerCore(features, dateCreated, getManualUpdatesData());
    }
    ProGalleryVersionManager.prototype.update = function(dateCreated, manualUpdates) {
        this.dateCreated = dateCreated || this.dateCreated;
        this.versionManager.update(this.dateCreated, manualUpdates || getManualUpdatesData());
    };
    ProGalleryVersionManager.prototype.setDateCreated = function(dateCreated) {
        this.dateCreated = dateCreated;
        this.versionManager = new VersionManagerCore(this.features, this.dateCreated);
    };
    ProGalleryVersionManager.prototype.getFeaturesWithNewerVersions = function(upgrades) {
        var manualUpdates = getManualUpdatesData();
        var featuresWithNewerVersions = this.versionManager.getFeaturesWithNewerVersions(upgrades || manualUpdates);
        return _.isEmpty(featuresWithNewerVersions) ?
            null :
            featuresWithNewerVersions;
    };
    ProGalleryVersionManager.prototype.getVersion = function(featureName) {
        return this.versionManager.getVersion(featureName);
    };
    ProGalleryVersionManager.prototype.getFeature = function(featureName) {
        return this.versionManager.getFeature(featureName);
    };
    return ProGalleryVersionManager;
}());
// If this is a template gallery, always use the lates version
var dateCreated;
var urlParams;
try {
    dateCreated = window.dateCreated;
    urlParams = parse(window.location.search);
    if (Wix.Utils.getDemoMode()) {
        dateCreated = new Date().toString();
    }
} catch (e) {
    dateCreated = {};
    urlParams = '';
}
// For QA - when adding 'features_upgrade' to the debugApp, the gallery will load with the oldest features.
var debugApp = _.get(urlParams, 'debugApp');
if (debugApp && debugApp.indexOf('features_upgrade') > -1) {
    dateCreated = null;
}
var getPgVersionManager = function(dateCreatedTicks, currFeaturesList) {
    if (baseUtils && baseUtils.isDev()) {
        if (!window.proGalleryVersionManager) {
            var proGalleryVersionManager = new ProGalleryVersionManager(dateCreatedTicks, currFeaturesList);
            window.proGalleryVersionManager = proGalleryVersionManager;
        }
        return window.proGalleryVersionManager;
    }
    return new ProGalleryVersionManager(dateCreatedTicks, currFeaturesList);
};
var dateCreatedTicks = renderUtils.getDateCreatedTicksFromStr(dateCreated);
var pgVersionManager = getPgVersionManager(dateCreatedTicks, featuresList);
export {
    ProGalleryVersionManager,
    pgVersionManager,
    VersionManagerCore,
    featuresList,
};
//# sourceMappingURL=proGalleryVersionManager.js.map