/**
 * DevExtreme (ui/collection/item.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _class = _interopRequireDefault(require("../../core/class"));
var _iterator = require("../../core/utils/iterator");
var _public_component = require("../../core/utils/public_component");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var ITEM_CONTENT_PLACEHOLDER_CLASS = "dx-item-content-placeholder";
var forcibleWatcher = function(watchMethod, fn, callback) {
    var filteredCallback = function() {
        var oldValue;
        return function(value) {
            if (oldValue !== value) {
                callback(value, oldValue);
                oldValue = value
            }
        }
    }();
    return {
        dispose: watchMethod(fn, filteredCallback),
        force: function() {
            filteredCallback(fn())
        }
    }
};
var CollectionItem = _class.default.inherit({
    ctor: function($element, options, rawData) {
        this._$element = $element;
        this._options = options;
        this._rawData = rawData;
        (0, _public_component.attachInstanceToElement)($element, this, this._dispose);
        this._render()
    },
    _render: function() {
        var $placeholder = (0, _renderer.default)("<div>").addClass(ITEM_CONTENT_PLACEHOLDER_CLASS);
        this._$element.append($placeholder);
        this._watchers = [];
        this._renderWatchers()
    },
    _renderWatchers: function() {
        this._startWatcher("disabled", this._renderDisabled.bind(this));
        this._startWatcher("visible", this._renderVisible.bind(this))
    },
    _startWatcher: function(field, render) {
        var rawData = this._rawData;
        var exprGetter = this._options.fieldGetter(field);
        var watcher = forcibleWatcher(this._options.watchMethod(), function() {
            return exprGetter(rawData)
        }, function(value, oldValue) {
            this._dirty = true;
            render(value, oldValue)
        }.bind(this));
        this._watchers.push(watcher)
    },
    setDataField: function() {
        this._dirty = false;
        (0, _iterator.each)(this._watchers, function(_, watcher) {
            watcher.force()
        });
        if (this._dirty) {
            return true
        }
    },
    _renderDisabled: function(value, oldValue) {
        this._$element.toggleClass(DISABLED_STATE_CLASS, !!value);
        this._updateOwnerFocus(value)
    },
    _updateOwnerFocus: function(isDisabled) {
        var ownerComponent = this._options.owner;
        if (ownerComponent && isDisabled) {
            ownerComponent._resetItemFocus(this._$element)
        }
    },
    _renderVisible: function(value, oldValue) {
        this._$element.toggleClass(INVISIBLE_STATE_CLASS, void 0 !== value && !value)
    },
    _dispose: function() {
        (0, _iterator.each)(this._watchers, function(_, watcher) {
            watcher.dispose()
        })
    }
});
CollectionItem.getInstance = function($element) {
    return (0, _public_component.getInstanceByElement)($element, this)
};
var _default = CollectionItem;
exports.default = _default;
module.exports = exports.default;
