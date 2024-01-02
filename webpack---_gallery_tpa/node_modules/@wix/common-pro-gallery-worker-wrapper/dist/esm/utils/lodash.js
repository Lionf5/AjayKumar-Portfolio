var _this = this;
export var pick = function(obj, keys) {
    var res = {};
    Object.entries(obj || {}).forEach(function(_a) {
        var key = _a[0],
            val = _a[1];
        if (keys.indexOf(key) >= 0) {
            res[key] = val;
        }
    });
    return res;
};
export var throttle = function(callback, limit) {
    var wait = false;
    var callAfterWait = false;
    return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!wait) {
            callAfterWait = false;
            callback.apply(_this, args);
            wait = true;
            setTimeout(function() {
                callAfterWait && callback.apply(_this, args);
                wait = false;
            }, limit);
        } else {
            callAfterWait = true;
        }
    };
};
export var debounce = function(callback, wait) {
    var timeout;
    return function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            callback.apply(_this, args);
        }, wait);
    };
};
export var get = function(obj, path, defaultValue) {
    var result = String.prototype.split
        .call(path, /[,[\].]+?/)
        .filter(Boolean)
        .reduce(function(res, key) {
            return (res !== null && res !== undefined ? res[key] : res);
        }, obj);
    return result === undefined || result === obj ? defaultValue : result;
};
export var isFunction = function(something) {
    return typeof something === 'function';
};
export var isEqual = function(obj1, obj2) {
    try {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    } catch (e) {
        return false;
    }
};
export var isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
//# sourceMappingURL=lodash.js.map