/**
 * DevExtreme (ui/html_editor/modules/widget_collector.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../../../core/utils/iterator");
var WidgetCollector = function() {
    function WidgetCollector() {
        this._collection = []
    }
    var _proto = WidgetCollector.prototype;
    _proto.clear = function() {
        this._collection = []
    };
    _proto.add = function(name, instance) {
        this._collection.push({
            name: name,
            instance: instance
        })
    };
    _proto.getByName = function(widgetName) {
        var widget = null;
        (0, _iterator.each)(this._collection, function(index, _ref) {
            var name = _ref.name,
                instance = _ref.instance;
            if (name === widgetName) {
                widget = instance;
                return false
            }
        });
        return widget
    };
    _proto.each = function(handler) {
        this._collection.forEach(function(_ref2) {
            var name = _ref2.name,
                instance = _ref2.instance;
            return instance && handler(name, instance)
        })
    };
    return WidgetCollector
}();
exports.default = WidgetCollector;
module.exports = exports.default;
