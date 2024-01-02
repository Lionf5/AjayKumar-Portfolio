import {
    baseUtils
} from '../utils/baseUtils';
import _ from 'lodash';
var minDate = -8640000000000000;
var VersionManager = /** @class */ (function() {
    function VersionManager(features, dateCreated, manualUpdates) {
        if (features === void 0) {
            features = {};
        }
        if (dateCreated === void 0) {
            dateCreated = minDate;
        }
        if (manualUpdates === void 0) {
            manualUpdates = {};
        }
        this.features = features;
        this.update(dateCreated, manualUpdates);
    }
    VersionManager.prototype.update = function(dateCreated, manualUpdates) {
        if (manualUpdates === void 0) {
            manualUpdates = {};
        }
        this.dateCreated = dateCreated || this.dateCreated;
        this.manualUpdates = manualUpdates;
    };
    VersionManager.prototype.getFeature = function(featureName) {
        var featureVersions = this.features[featureName];
        if (!featureVersions) {
            return;
        }
        var manualUpdate = this.manualUpdates[featureName];
        var manualUpdateDateStr = _.get(manualUpdate, 'date') || manualUpdate;
        var manualUpdateDate = manualUpdateDateStr ?
            baseUtils.getDateCreatedTicksFromStr(manualUpdateDateStr) :
            null;
        for (var i = featureVersions.length - 1; i >= 0; i--) {
            var versionDate = manualUpdateDate || this.dateCreated;
            if (versionDate >= featureVersions[i].dateFrom) {
                return featureVersions[i];
            }
        }
    };
    VersionManager.prototype.getVersion = function(featureName) {
        var feature = this.getFeature(featureName);
        return feature ? feature.version : VersionManager.Versions.min;
    };
    VersionManager.prototype.getFeaturesWithNewerVersions = function(manualUpdates) {
        var _this = this;
        if (manualUpdates === void 0) {
            manualUpdates = {};
        }
        var featuresWithNewerVersions = {};
        var isStore = baseUtils.isStoreGallery();
        Object.keys(this.features).forEach(function(featureName) {
            var featureLatest = _.last(_this.features[featureName]);
            var featureManualUpdate = manualUpdates[featureName];
            var featureManualUpdateDate = featureManualUpdate ?
                baseUtils.getDateCreatedTicksFromStr(_.get(featureManualUpdate, 'date') || featureManualUpdate) :
                null;
            var isAFutureFeature = featureLatest.dateFrom > Date.parse(new Date());
            var shouldAffectProGallry = typeof featureLatest.affectsProGallery === 'undefined' ||
                (featureLatest.affectsProGallery && !isStore);
            var shouldAffectArtStore = typeof featureLatest.affectsArtStore === 'undefined' ||
                (featureLatest.affectsArtStore && isStore);
            var shouldAffect = isStore ?
                shouldAffectArtStore :
                shouldAffectProGallry;
            var featureHasNewerVersion = featureLatest.dateFrom > (featureManualUpdateDate || _this.dateCreated);
            var featureNeedsToUpgrade = !isAFutureFeature && featureHasNewerVersion && shouldAffect;
            if (featureNeedsToUpgrade && !featureLatest.ignoreUserManuaUpdate) {
                featuresWithNewerVersions[featureName] = featureLatest;
            }
        });
        return featuresWithNewerVersions;
    };
    return VersionManager;
}());
export default VersionManager;
VersionManager.Versions = {
    min: 'min',
};
//# sourceMappingURL=versionManager.js.map