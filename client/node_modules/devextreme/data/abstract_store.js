/**
 * DevExtreme (data/abstract_store.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../core/class"));
var _events_strategy = require("../core/events_strategy");
var _iterator = require("../core/utils/iterator");
var _errors = _interopRequireDefault(require("./errors"));
var _utils = _interopRequireDefault(require("./utils"));
var _data = require("../core/utils/data");
var _store_helper = _interopRequireDefault(require("./store_helper"));
var _deferred = require("../core/utils/deferred");
var _common = require("../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var abstract = _class.default.abstract;
var queryByOptions = _store_helper.default.queryByOptions;
var storeImpl = {};
var Store = _class.default.inherit({
    ctor: function(options) {
        var that = this;
        options = options || {};
        this._eventsStrategy = new _events_strategy.EventsStrategy(this);
        (0, _iterator.each)(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], function(_, optionName) {
            if (optionName in options) {
                that.on(optionName.slice(2).toLowerCase(), options[optionName])
            }
        });
        this._key = options.key;
        this._errorHandler = options.errorHandler;
        this._useDefaultSearch = true
    },
    _customLoadOptions: function() {
        return null
    },
    key: function() {
        return this._key
    },
    keyOf: function(obj) {
        if (!this._keyGetter) {
            this._keyGetter = (0, _data.compileGetter)(this.key())
        }
        return this._keyGetter(obj)
    },
    _requireKey: function() {
        if (!this.key()) {
            throw _errors.default.errors.Error("E4005")
        }
    },
    load: function(options) {
        var that = this;
        options = options || {};
        this._eventsStrategy.fireEvent("loading", [options]);
        return this._withLock(this._loadImpl(options)).done(function(result) {
            that._eventsStrategy.fireEvent("loaded", [result, options])
        })
    },
    _loadImpl: function(options) {
        return queryByOptions(this.createQuery(options), options).enumerate()
    },
    _withLock: function(task) {
        var result = new _deferred.Deferred;
        task.done(function() {
            var that = this;
            var args = arguments;
            _utils.default.processRequestResultLock.promise().done(function() {
                result.resolveWith(that, args)
            })
        }).fail(function() {
            result.rejectWith(this, arguments)
        });
        return result
    },
    createQuery: abstract,
    totalCount: function(options) {
        return this._totalCountImpl(options)
    },
    _totalCountImpl: function(options) {
        return queryByOptions(this.createQuery(options), options, true).count()
    },
    byKey: function(key, extraOptions) {
        return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)))
    },
    _byKeyImpl: abstract,
    insert: function(values) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("inserting", [values]);
        return that._addFailHandlers(that._insertImpl(values).done(function(callbackValues, callbackKey) {
            that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
            that._eventsStrategy.fireEvent("modified")
        }))
    },
    _insertImpl: abstract,
    update: function(key, values) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("updating", [key, values]);
        return that._addFailHandlers(that._updateImpl(key, values).done(function() {
            that._eventsStrategy.fireEvent("updated", [key, values]);
            that._eventsStrategy.fireEvent("modified")
        }))
    },
    _updateImpl: abstract,
    push: function(changes) {
        var _this = this;
        var beforePushArgs = {
            changes: changes,
            waitFor: []
        };
        this._eventsStrategy.fireEvent("beforePush", [beforePushArgs]);
        _deferred.when.apply(void 0, _toConsumableArray(beforePushArgs.waitFor)).done(function() {
            _this._pushImpl(changes);
            _this._eventsStrategy.fireEvent("push", [changes])
        })
    },
    _pushImpl: _common.noop,
    remove: function(key) {
        var that = this;
        that._eventsStrategy.fireEvent("modifying");
        that._eventsStrategy.fireEvent("removing", [key]);
        return that._addFailHandlers(that._removeImpl(key).done(function(callbackKey) {
            that._eventsStrategy.fireEvent("removed", [callbackKey]);
            that._eventsStrategy.fireEvent("modified")
        }))
    },
    _removeImpl: abstract,
    _addFailHandlers: function(deferred) {
        return deferred.fail(this._errorHandler).fail(_errors.default._errorHandler)
    },
    on: function(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off: function(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});
Store.create = function(alias, options) {
    if (!(alias in storeImpl)) {
        throw _errors.default.errors.Error("E4020", alias)
    }
    return new storeImpl[alias](options)
};
Store.registerClass = function(type, alias) {
    if (alias) {
        storeImpl[alias] = type
    }
    return type
};
Store.inherit = function(inheritor) {
    return function(members, alias) {
        var type = inheritor.apply(this, [members]);
        Store.registerClass(type, alias);
        return type
    }
}(Store.inherit);
var _default = Store;
exports.default = _default;
module.exports = exports.default;
