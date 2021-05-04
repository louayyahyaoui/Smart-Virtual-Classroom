/**
 * DevExtreme (core/utils/public_component.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.attachInstanceToElement = attachInstanceToElement;
exports.getInstanceByElement = getInstanceByElement;
exports.name = void 0;
var _element_data = require("../../core/element_data");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _weak_map = _interopRequireDefault(require("../polyfills/weak_map"));
var _type = require("./type");
var _remove_event = _interopRequireDefault(require("../remove_event"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COMPONENT_NAMES_DATA_KEY = "dxComponents";
var ANONYMOUS_COMPONENT_DATA_KEY = "dxPrivateComponent";
var componentNames = new _weak_map.default;
var nextAnonymousComponent = 0;
var getName = function(componentClass, newName) {
    if ((0, _type.isDefined)(newName)) {
        componentNames.set(componentClass, newName);
        return
    }
    if (!componentNames.has(componentClass)) {
        var generatedName = ANONYMOUS_COMPONENT_DATA_KEY + nextAnonymousComponent++;
        componentNames.set(componentClass, generatedName);
        return generatedName
    }
    return componentNames.get(componentClass)
};
exports.name = getName;

function attachInstanceToElement($element, componentInstance, disposeFn) {
    var data = (0, _element_data.data)($element.get(0));
    var name = getName(componentInstance.constructor);
    data[name] = componentInstance;
    if (disposeFn) {
        _events_engine.default.one($element, _remove_event.default, function() {
            disposeFn.call(componentInstance)
        })
    }
    if (!data[COMPONENT_NAMES_DATA_KEY]) {
        data[COMPONENT_NAMES_DATA_KEY] = []
    }
    data[COMPONENT_NAMES_DATA_KEY].push(name)
}

function getInstanceByElement($element, componentClass) {
    var name = getName(componentClass);
    return (0, _element_data.data)($element.get(0), name)
}
