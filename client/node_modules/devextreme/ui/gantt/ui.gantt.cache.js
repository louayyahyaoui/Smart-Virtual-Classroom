/**
 * DevExtreme (ui/gantt/ui.gantt.cache.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GanttDataCache = void 0;
var _extend = require("../../core/utils/extend");
var GanttDataCache = function() {
    function GanttDataCache() {
        this._cache = {};
        this._timers = {}
    }
    var _proto = GanttDataCache.prototype;
    _proto.saveData = function(key, data, keyExpireCallback) {
        if (data) {
            this._clearTimer(key);
            var storage = this._getCache(key, true);
            (0, _extend.extendFromObject)(storage, data, true);
            if (keyExpireCallback) {
                this._setExpireTimer(key, keyExpireCallback)
            }
        }
    };
    _proto.pullDataFromCache = function(key, target) {
        var data = this._getCache(key);
        if (data) {
            (0, _extend.extendFromObject)(target, data)
        }
        this._onKeyExpired(key)
    };
    _proto.hasData = function(key) {
        return !!this._cache[key]
    };
    _proto._getCache = function(key, forceCreate) {
        if (!this._cache[key] && forceCreate) {
            this._cache[key] = {}
        }
        return this._cache[key]
    };
    _proto._setExpireTimer = function(key, callback) {
        var _this = this;
        this._timers[key] = setTimeout(function() {
            callback(key, _this._getCache(key));
            _this._onKeyExpired(key)
        }, 200)
    };
    _proto._onKeyExpired = function(key) {
        this._clearCache(key);
        this._clearTimer(key)
    };
    _proto._clearCache = function(key) {
        delete this._cache[key]
    };
    _proto._clearTimer = function(key) {
        var timers = this._timers;
        if (timers && timers[key]) {
            clearTimeout(timers[key]);
            delete timers[key]
        }
    };
    return GanttDataCache
}();
exports.GanttDataCache = GanttDataCache;
