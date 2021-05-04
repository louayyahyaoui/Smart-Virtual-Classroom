/**
 * DevExtreme (integration/knockout/event_registrator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _knockout = _interopRequireDefault(require("knockout"));
var _type = require("../../core/utils/type");
var _event_registrator_callbacks = _interopRequireDefault(require("../../events/core/event_registrator_callbacks"));
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_knockout.default) {
    _event_registrator_callbacks.default.add(function(name) {
        var koBindingEventName = (0, _index.addNamespace)(name, name + "Binding");
        _knockout.default.bindingHandlers[name] = {
            update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
                var $element = (0, _renderer.default)(element);
                var unwrappedValue = _knockout.default.utils.unwrapObservable(valueAccessor());
                var eventSource = unwrappedValue.execute ? unwrappedValue.execute : unwrappedValue;
                _events_engine.default.off($element, koBindingEventName);
                _events_engine.default.on($element, koBindingEventName, (0, _type.isPlainObject)(unwrappedValue) ? unwrappedValue : {}, function(e) {
                    eventSource.call(viewModel, viewModel, e)
                })
            }
        }
    })
}
