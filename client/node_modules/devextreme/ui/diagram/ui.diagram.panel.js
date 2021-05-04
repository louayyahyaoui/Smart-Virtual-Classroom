/**
 * DevExtreme (ui/diagram/ui.diagram.panel.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var POINTERUP_EVENT_NAME = (0, _index.addNamespace)(_pointer.default.up, "dxDiagramPanel");
var PREVENT_REFOCUS_SELECTOR = ".dx-textbox";
var DiagramPanel = function(_Widget) {
    _inheritsLoose(DiagramPanel, _Widget);

    function DiagramPanel() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = DiagramPanel.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._createOnPointerUpAction()
    };
    _proto._render = function() {
        _Widget.prototype._render.call(this);
        this._attachPointerUpEvent()
    };
    _proto._getPointerUpElements = function() {
        return [this.$element()]
    };
    _proto._attachPointerUpEvent = function() {
        var _this = this;
        var elements = this._getPointerUpElements();
        elements.forEach(function(element) {
            _events_engine.default.off(element, POINTERUP_EVENT_NAME);
            _events_engine.default.on(element, POINTERUP_EVENT_NAME, function(e) {
                if (!(0, _renderer.default)(e.target).closest(PREVENT_REFOCUS_SELECTOR).length) {
                    _this._onPointerUpAction()
                }
            })
        })
    };
    _proto._createOnPointerUpAction = function() {
        this._onPointerUpAction = this._createActionByOption("onPointerUp")
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "onPointerUp":
                this._createOnPointerUpAction();
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    return DiagramPanel
}(_ui.default);
var _default = DiagramPanel;
exports.default = _default;
module.exports = exports.default;
