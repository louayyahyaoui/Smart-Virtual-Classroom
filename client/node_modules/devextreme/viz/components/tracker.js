/**
 * DevExtreme (viz/components/tracker.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Tracker = Tracker;
var _index = require("../../events/utils/index");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _click = require("../../events/click");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var downPointerEventName = _pointer.default.down;
var movePointerEventName = _pointer.default.move;

function Tracker(parameters) {
    this._initHandlers(parameters)
}
Tracker.prototype = {
    constructor: Tracker,
    _initHandlers: function(parameters) {
        var document = _dom_adapter.default.getDocument();
        parameters.getCoords = function(e) {
            var data = (0, _index.eventData)(e);
            var offset = parameters.widget._renderer.getRootOffset();
            return [data.x - offset.left, data.y - offset.top]
        };
        parameters.root.on(_click.name, clickHandler);
        parameters.root.on(downPointerEventName, downHandler);
        _events_engine.default.on(document, downPointerEventName, downHandler);
        _events_engine.default.on(document, movePointerEventName, moveHandler);
        this._disposeHandlers = function() {
            parameters.root.off(_click.name, clickHandler);
            parameters.root.off(downPointerEventName, downHandler);
            _events_engine.default.off(document, downPointerEventName, downHandler);
            _events_engine.default.off(document, movePointerEventName, moveHandler)
        };

        function clickHandler(e) {
            processClick(e, parameters)
        }
        var isRootDown = false;

        function downHandler(e) {
            if (isRootDown) {
                isRootDown = false
            } else {
                if (void 0 !== parameters.getData(e)) {
                    isRootDown = true
                }
                moveHandler(e)
            }
        }

        function moveHandler(e) {
            processHover(e, parameters);
            parameters.widget._getOption("tooltip").enabled && processTooltip(e, parameters)
        }
    },
    dispose: function() {
        this._disposeHandlers()
    }
};

function processClick(e, params) {
    var id = params.getData(e);
    if (id >= 0) {
        params.click({
            node: params.getNode(id),
            coords: params.getCoords(e),
            event: e
        })
    }
}

function processHover(e, params) {
    var id = params.getData(e);
    if (id >= 0) {
        params.getNode(id).setHover()
    } else {
        params.widget.clearHover()
    }
}

function processTooltip(e, params) {
    var id = params.getData(e, true);
    var coords;
    if (id >= 0) {
        coords = (0, _index.eventData)(e);
        params.getNode(id).showTooltip([coords.x, coords.y])
    } else {
        params.widget.hideTooltip()
    }
}
