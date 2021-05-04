/**
 * DevExtreme (data/local_store.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _window = require("../core/utils/window");
var _class = _interopRequireDefault(require("../core/class"));
var _errors = _interopRequireDefault(require("./errors"));
var _array_store = _interopRequireDefault(require("./array_store"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var abstract = _class.default.abstract;
var LocalStoreBackend = _class.default.inherit({
    ctor: function(store, storeOptions) {
        this._store = store;
        this._dirty = !!storeOptions.data;
        this.save();
        var immediate = this._immediate = storeOptions.immediate;
        var flushInterval = Math.max(100, storeOptions.flushInterval || 1e4);
        if (!immediate) {
            var saveProxy = this.save.bind(this);
            setInterval(saveProxy, flushInterval);
            _events_engine.default.on(window, "beforeunload", saveProxy);
            if (window.cordova) {
                _dom_adapter.default.listen(_dom_adapter.default.getDocument(), "pause", saveProxy, false)
            }
        }
    },
    notifyChanged: function() {
        this._dirty = true;
        if (this._immediate) {
            this.save()
        }
    },
    load: function() {
        this._store._array = this._loadImpl();
        this._dirty = false
    },
    save: function() {
        if (!this._dirty) {
            return
        }
        this._saveImpl(this._store._array);
        this._dirty = false
    },
    _loadImpl: abstract,
    _saveImpl: abstract
});
var DomLocalStoreBackend = LocalStoreBackend.inherit({
    ctor: function(store, storeOptions) {
        var name = storeOptions.name;
        if (!name) {
            throw _errors.default.errors.Error("E4013")
        }
        this._key = "dx-data-localStore-" + name;
        this.callBase(store, storeOptions)
    },
    _loadImpl: function() {
        var raw = window.localStorage.getItem(this._key);
        if (raw) {
            return JSON.parse(raw)
        }
        return []
    },
    _saveImpl: function(array) {
        if (!array.length) {
            window.localStorage.removeItem(this._key)
        } else {
            window.localStorage.setItem(this._key, JSON.stringify(array))
        }
    }
});
var localStoreBackends = {
    dom: DomLocalStoreBackend
};
var LocalStore = _array_store.default.inherit({
    ctor: function(options) {
        if ("string" === typeof options) {
            options = {
                name: options
            }
        } else {
            options = options || {}
        }
        this.callBase(options);
        this._backend = new localStoreBackends[options.backend || "dom"](this, options);
        this._backend.load()
    },
    clear: function() {
        this.callBase();
        this._backend.notifyChanged()
    },
    _insertImpl: function(values) {
        var b = this._backend;
        return this.callBase(values).done(b.notifyChanged.bind(b))
    },
    _updateImpl: function(key, values) {
        var b = this._backend;
        return this.callBase(key, values).done(b.notifyChanged.bind(b))
    },
    _removeImpl: function(key) {
        var b = this._backend;
        return this.callBase(key).done(b.notifyChanged.bind(b))
    }
}, "local");
var _default = LocalStore;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
