/**
 * DevExtreme (events/utils/event_nodes_disposing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.unsubscribeNodesDisposing = exports.subscribeNodesDisposing = void 0;
var _events_engine = _interopRequireDefault(require("../core/events_engine"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var REMOVE_EVENT_NAME = "dxremove";

function nodesByEvent(event) {
    return event && [event.target, event.delegateTarget, event.relatedTarget, event.currentTarget].filter(function(node) {
        return !!node
    })
}
var subscribeNodesDisposing = function(event, callback) {
    _events_engine.default.one(nodesByEvent(event), REMOVE_EVENT_NAME, callback)
};
exports.subscribeNodesDisposing = subscribeNodesDisposing;
var unsubscribeNodesDisposing = function(event, callback) {
    _events_engine.default.off(nodesByEvent(event), REMOVE_EVENT_NAME, callback)
};
exports.unsubscribeNodesDisposing = unsubscribeNodesDisposing;
