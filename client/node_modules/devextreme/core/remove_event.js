/**
 * DevExtreme (core/remove_event.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("./renderer"));
var _element_data = require("./element_data");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _event_registrator = _interopRequireDefault(require("../events/core/event_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var eventName = "dxremove";
var eventPropName = "dxRemoveEvent";
(0, _element_data.beforeCleanData)(function(elements) {
    elements = [].slice.call(elements);
    for (var i = 0; i < elements.length; i++) {
        var $element = (0, _renderer.default)(elements[i]);
        if ($element.prop(eventPropName)) {
            $element[0][eventPropName] = null;
            _events_engine.default.triggerHandler($element, eventName)
        }
    }
});
(0, _event_registrator.default)(eventName, {
    noBubble: true,
    setup: function(element) {
        (0, _renderer.default)(element).prop(eventPropName, true)
    }
});
var _default = eventName;
exports.default = _default;
module.exports = exports.default;
