/**
 * DevExtreme (events/contextmenu.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.name = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _support = require("../core/utils/support");
var _devices = _interopRequireDefault(require("../core/devices"));
var _class = _interopRequireDefault(require("../core/class"));
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));
var _index = require("./utils/index");
var _hold = _interopRequireDefault(require("./hold"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var CONTEXTMENU_NAMESPACE = "dxContexMenu";
var CONTEXTMENU_NAMESPACED_EVENT_NAME = (0, _index.addNamespace)("contextmenu", CONTEXTMENU_NAMESPACE);
var HOLD_NAMESPACED_EVENT_NAME = (0, _index.addNamespace)(_hold.default.name, CONTEXTMENU_NAMESPACE);
var CONTEXTMENU_EVENT_NAME = "dxcontextmenu";
var ContextMenu = _class.default.inherit({
    setup: function(element) {
        var $element = (0, _renderer.default)(element);
        _events_engine.default.on($element, CONTEXTMENU_NAMESPACED_EVENT_NAME, this._contextMenuHandler.bind(this));
        if (_support.touch || _devices.default.isSimulator()) {
            _events_engine.default.on($element, HOLD_NAMESPACED_EVENT_NAME, this._holdHandler.bind(this))
        }
    },
    _holdHandler: function(e) {
        if ((0, _index.isMouseEvent)(e) && !_devices.default.isSimulator()) {
            return
        }
        this._fireContextMenu(e)
    },
    _contextMenuHandler: function(e) {
        this._fireContextMenu(e)
    },
    _fireContextMenu: function(e) {
        return (0, _index.fireEvent)({
            type: CONTEXTMENU_EVENT_NAME,
            originalEvent: e
        })
    },
    teardown: function(element) {
        _events_engine.default.off(element, "." + CONTEXTMENU_NAMESPACE)
    }
});
(0, _event_registrator.default)(CONTEXTMENU_EVENT_NAME, new ContextMenu);
var name = CONTEXTMENU_EVENT_NAME;
exports.name = name;
