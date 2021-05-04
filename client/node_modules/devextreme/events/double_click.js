/**
 * DevExtreme (events/double_click.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.name = void 0;
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _dom = require("../core/utils/dom");
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _class = _interopRequireDefault(require("../core/class"));
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));
var _click = require("./click");
var _index = require("./utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DBLCLICK_EVENT_NAME = "dxdblclick";
exports.name = DBLCLICK_EVENT_NAME;
var DBLCLICK_NAMESPACE = "dxDblClick";
var NAMESPACED_CLICK_EVENT = (0, _index.addNamespace)(_click.name, DBLCLICK_NAMESPACE);
var DBLCLICK_TIMEOUT = 300;
var DblClick = _class.default.inherit({
    ctor: function() {
        this._handlerCount = 0;
        this._forgetLastClick()
    },
    _forgetLastClick: function() {
        this._firstClickTarget = null;
        this._lastClickTimeStamp = -DBLCLICK_TIMEOUT
    },
    add: function() {
        if (this._handlerCount <= 0) {
            _events_engine.default.on(_dom_adapter.default.getDocument(), NAMESPACED_CLICK_EVENT, this._clickHandler.bind(this))
        }
        this._handlerCount++
    },
    _clickHandler: function(e) {
        var timeStamp = e.timeStamp || Date.now();
        var timeBetweenClicks = timeStamp - this._lastClickTimeStamp;
        var isSimulated = timeBetweenClicks < 0;
        var isDouble = !isSimulated && timeBetweenClicks < DBLCLICK_TIMEOUT;
        if (isDouble) {
            (0, _index.fireEvent)({
                type: DBLCLICK_EVENT_NAME,
                target: (0, _dom.closestCommonParent)(this._firstClickTarget, e.target),
                originalEvent: e
            });
            this._forgetLastClick()
        } else {
            this._firstClickTarget = e.target;
            this._lastClickTimeStamp = timeStamp
        }
    },
    remove: function() {
        this._handlerCount--;
        if (this._handlerCount <= 0) {
            this._forgetLastClick();
            _events_engine.default.off(_dom_adapter.default.getDocument(), NAMESPACED_CLICK_EVENT)
        }
    }
});
(0, _event_registrator.default)(DBLCLICK_EVENT_NAME, new DblClick);
