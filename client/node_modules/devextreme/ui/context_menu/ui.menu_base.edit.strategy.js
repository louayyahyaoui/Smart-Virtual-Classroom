/**
 * DevExtreme (ui/context_menu/ui.menu_base.edit.strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _iterator = require("../../core/utils/iterator");
var _uiCollection_widgetEditStrategy = _interopRequireDefault(require("../collection/ui.collection_widget.edit.strategy.plain"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var MenuBaseEditStrategy = function(_PlainEditStrategy) {
    _inheritsLoose(MenuBaseEditStrategy, _PlainEditStrategy);

    function MenuBaseEditStrategy() {
        return _PlainEditStrategy.apply(this, arguments) || this
    }
    var _proto = MenuBaseEditStrategy.prototype;
    _proto._getPlainItems = function() {
        return (0, _iterator.map)(this._collectionWidget.option("items"), function getMenuItems(item) {
            return item.items ? [item].concat((0, _iterator.map)(item.items, getMenuItems)) : item
        })
    };
    _proto._stringifyItem = function(item) {
        var _this = this;
        return JSON.stringify(item, function(key, value) {
            if ("template" === key) {
                return _this._getTemplateString(value)
            }
            return value
        })
    };
    _proto._getTemplateString = function(template) {
        var result;
        if ("object" === _typeof(template)) {
            result = (0, _renderer.default)(template).text()
        } else {
            result = template.toString()
        }
        return result
    };
    return MenuBaseEditStrategy
}(_uiCollection_widgetEditStrategy.default);
var _default = MenuBaseEditStrategy;
exports.default = _default;
module.exports = exports.default;
