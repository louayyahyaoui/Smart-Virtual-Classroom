/**
 * DevExtreme (events/pointer/observer.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _iterator = require("../../core/utils/iterator");
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var addEventsListener = function(events, handler) {
    _ready_callbacks.default.add(function() {
        events.split(" ").forEach(function(event) {
            _dom_adapter.default.listen(_dom_adapter.default.getDocument(), event, handler, true)
        })
    })
};
var Observer = function(eventMap, pointerEquals, onPointerAdding) {
    onPointerAdding = onPointerAdding || function() {};
    var pointers = [];
    var getPointerIndex = function(e) {
        var index = -1;
        (0, _iterator.each)(pointers, function(i, pointer) {
            if (!pointerEquals(e, pointer)) {
                return true
            }
            index = i;
            return false
        });
        return index
    };
    var addPointer = function(e) {
        if (getPointerIndex(e) === -1) {
            onPointerAdding(e);
            pointers.push(e)
        }
    };
    var removePointer = function(e) {
        var index = getPointerIndex(e);
        if (index > -1) {
            pointers.splice(index, 1)
        }
    };
    var updatePointer = function(e) {
        pointers[getPointerIndex(e)] = e
    };
    addEventsListener(eventMap.dxpointerdown, addPointer);
    addEventsListener(eventMap.dxpointermove, updatePointer);
    addEventsListener(eventMap.dxpointerup, removePointer);
    addEventsListener(eventMap.dxpointercancel, removePointer);
    this.pointers = function() {
        return pointers
    };
    this.reset = function() {
        pointers = []
    }
};
var _default = Observer;
exports.default = _default;
module.exports = exports.default;
