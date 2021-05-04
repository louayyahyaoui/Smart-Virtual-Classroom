/**
 * DevExtreme (integration/knockout/components.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _knockout = _interopRequireDefault(require("knockout"));
var _icon = require("../../core/utils/icon");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_knockout.default) {
    _knockout.default.bindingHandlers.dxControlsDescendantBindings = {
        init: function(_, valueAccessor) {
            return {
                controlsDescendantBindings: _knockout.default.unwrap(valueAccessor())
            }
        }
    };
    _knockout.default.bindingHandlers.dxIcon = {
        init: function(element, valueAccessor) {
            var options = _knockout.default.utils.unwrapObservable(valueAccessor()) || {};
            var iconElement = (0, _icon.getImageContainer)(options);
            _knockout.default.virtualElements.emptyNode(element);
            if (iconElement) {
                _knockout.default.virtualElements.prepend(element, iconElement.get(0))
            }
        },
        update: function(element, valueAccessor) {
            var options = _knockout.default.utils.unwrapObservable(valueAccessor()) || {};
            var iconElement = (0, _icon.getImageContainer)(options);
            _knockout.default.virtualElements.emptyNode(element);
            if (iconElement) {
                _knockout.default.virtualElements.prepend(element, iconElement.get(0))
            }
        }
    };
    _knockout.default.virtualElements.allowedBindings.dxIcon = true
}
