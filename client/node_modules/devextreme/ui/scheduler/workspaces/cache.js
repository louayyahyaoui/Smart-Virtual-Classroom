/**
 * DevExtreme (ui/scheduler/workspaces/cache.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.cache = exports.Cache = void 0;
var _type = require("../../../core/utils/type");

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var Cache = function() {
    function Cache() {
        this._init()
    }
    var _proto = Cache.prototype;
    _proto._init = function() {
        this._cache = new Map
    };
    _proto.clear = function() {
        this._init()
    };
    _proto.get = function(name, callback) {
        if (!this._cache.has(name) && callback) {
            this.set(name, callback())
        }
        return this._cache.get(name)
    };
    _proto.set = function(name, value) {
        (0, _type.isDefined)(value) && this._cache.set(name, value)
    };
    _createClass(Cache, [{
        key: "size",
        get: function() {
            return this._cache.size
        }
    }]);
    return Cache
}();
exports.Cache = Cache;
var cache = new Cache;
exports.cache = cache;
