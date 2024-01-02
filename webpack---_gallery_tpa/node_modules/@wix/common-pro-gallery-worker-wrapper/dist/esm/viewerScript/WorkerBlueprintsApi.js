var WorkerBlueprintsApi = /** @class */ (function() {
    function WorkerBlueprintsApi(_a) {
        var getMoreItems = _a.getMoreItems,
            getItems = _a.getItems,
            getContainer = _a.getContainer,
            getOptions = _a.getOptions,
            onBlueprintReady = _a.onBlueprintReady,
            getTotalItemsCount = _a.getTotalItemsCount,
            createBlueprintImp = _a.createBlueprintImp;
        this.getMoreItems = getMoreItems || (function() {});
        this.getItems = getItems || (function() {});
        this.getOptions = getOptions || (function() {});
        this.getContainer = getContainer || (function() {});
        this.getTotalItemsCount = getTotalItemsCount || (function() {});
        this.onBlueprintReadyCallback = onBlueprintReady || (function() {});
        this.createBlueprintImp = createBlueprintImp;
    }
    WorkerBlueprintsApi.prototype.updateFunctions = function(_a) {
        var getMoreItems = _a.getMoreItems,
            getItems = _a.getItems,
            getContainer = _a.getContainer,
            getOptions = _a.getOptions,
            onBlueprintReady = _a.onBlueprintReady,
            getTotalItemsCount = _a.getTotalItemsCount,
            createBlueprintImp = _a.createBlueprintImp;
        this.getMoreItems = getMoreItems || (function() {});
        this.getItems = getItems || (function() {});
        this.getOptions = getOptions || (function() {});
        this.getContainer = getContainer || (function() {});
        this.getTotalItemsCount = getTotalItemsCount || (function() {});
        this.onBlueprintReadyCallback = onBlueprintReady || (function() {});
        this.createBlueprintImp = createBlueprintImp;
    };
    WorkerBlueprintsApi.prototype.fetchMoreItems = function(currentItemLength) {
        this.getMoreItems(currentItemLength);
    };
    WorkerBlueprintsApi.prototype.fetchItems = function() {
        return this.getItems();
    };
    WorkerBlueprintsApi.prototype.fetchOptions = function() {
        return this.getOptions();
    };
    WorkerBlueprintsApi.prototype.fetchContainer = function() {
        return this.getContainer();
    };
    WorkerBlueprintsApi.prototype.onBlueprintReady = function(_a) {
        var blueprint = _a.blueprint,
            blueprintChanged = _a.blueprintChanged;
        this.onBlueprintReadyCallback(blueprint, blueprintChanged);
    };
    WorkerBlueprintsApi.prototype.isUsingCustomInfoElements = function() {
        return true;
    };
    return WorkerBlueprintsApi;
}());
export default WorkerBlueprintsApi;
//# sourceMappingURL=WorkerBlueprintsApi.js.map