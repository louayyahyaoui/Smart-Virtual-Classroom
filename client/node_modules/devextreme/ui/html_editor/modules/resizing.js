/**
 * DevExtreme (ui/html_editor/modules/resizing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _click = require("../../../events/click");
var _index = require("../../../events/utils/index");
var _translator = require("../../../animation/translator");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _resizable = _interopRequireDefault(require("../../resizable"));
var _position = require("../../../core/utils/position");
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DX_RESIZE_FRAME_CLASS = "dx-resize-frame";
var DX_TOUCH_DEVICE_CLASS = "dx-touch-device";
var MODULE_NAMESPACE = "dxHtmlResizingModule";
var KEYDOWN_EVENT = (0, _index.addNamespace)("keydown", MODULE_NAMESPACE);
var SCROLL_EVENT = (0, _index.addNamespace)("scroll", MODULE_NAMESPACE);
var MOUSEDOWN_EVENT = (0, _index.addNamespace)("mousedown", MODULE_NAMESPACE);
var FRAME_PADDING = 1;
var ResizingModule = function() {
    function ResizingModule(quill, options) {
        this.quill = quill;
        this.editorInstance = options.editorInstance;
        this.allowedTargets = options.allowedTargets || ["image"];
        this.enabled = !!options.enabled;
        this._hideFrameWithContext = this.hideFrame.bind(this);
        this._framePositionChangedHandler = this._prepareFramePositionChangedHandler();
        if (this.enabled) {
            this._attachEvents();
            this._createResizeFrame()
        }
    }
    var _proto = ResizingModule.prototype;
    _proto._attachEvents = function() {
        _events_engine.default.on(this.quill.root, (0, _index.addNamespace)(_click.name, MODULE_NAMESPACE), this._clickHandler.bind(this));
        _events_engine.default.on(this.quill.root, SCROLL_EVENT, this._framePositionChangedHandler);
        this.editorInstance.on("focusOut", this._hideFrameWithContext);
        this.quill.on("text-change", this._framePositionChangedHandler)
    };
    _proto._detachEvents = function() {
        _events_engine.default.off(this.quill.root, MODULE_NAMESPACE);
        this.editorInstance.off("focusOut", this._hideFrameWithContext);
        this.quill.off("text-change", this._framePositionChangedHandler)
    };
    _proto._clickHandler = function(e) {
        if (this._isAllowedTarget(e.target)) {
            if (this._$target === e.target) {
                return
            }
            this._$target = e.target;
            this.updateFramePosition();
            this.showFrame();
            this._adjustSelection()
        } else {
            if (this._$target) {
                this.hideFrame()
            }
        }
    };
    _proto._prepareFramePositionChangedHandler = function(e) {
        var _this = this;
        return function() {
            if (_this._$target) {
                _this.updateFramePosition()
            }
        }
    };
    _proto._adjustSelection = function() {
        if (!this.quill.getSelection()) {
            this.quill.setSelection(0, 0)
        }
    };
    _proto._isAllowedTarget = function(targetElement) {
        return this._isImage(targetElement)
    };
    _proto._isImage = function(targetElement) {
        return this.allowedTargets.indexOf("image") !== -1 && "IMG" === targetElement.tagName.toUpperCase()
    };
    _proto.showFrame = function() {
        this._$resizeFrame.show();
        _events_engine.default.on(this.quill.root, KEYDOWN_EVENT, this._handleFrameKeyDown.bind(this))
    };
    _proto._handleFrameKeyDown = function(e) {
        var keyName = (0, _index.normalizeKeyName)(e);
        if ("del" === keyName || "backspace" === keyName) {
            this._deleteImage()
        }
        this.hideFrame()
    };
    _proto.hideFrame = function() {
        this._$target = null;
        this._$resizeFrame.hide();
        _events_engine.default.off(this.quill.root, KEYDOWN_EVENT)
    };
    _proto.updateFramePosition = function() {
        var _getBoundingRect = (0, _position.getBoundingRect)(this._$target),
            height = _getBoundingRect.height,
            width = _getBoundingRect.width,
            targetTop = _getBoundingRect.top,
            targetLeft = _getBoundingRect.left;
        var _getBoundingRect2 = (0, _position.getBoundingRect)(this.quill.root),
            containerTop = _getBoundingRect2.top,
            containerLeft = _getBoundingRect2.left;
        var borderWidth = this._getBorderWidth();
        this._$resizeFrame.css({
            height: height,
            width: width,
            padding: FRAME_PADDING,
            top: targetTop - containerTop - borderWidth - FRAME_PADDING,
            left: targetLeft - containerLeft - borderWidth - FRAME_PADDING
        });
        (0, _translator.move)(this._$resizeFrame, {
            left: 0,
            top: 0
        })
    };
    _proto._getBorderWidth = function() {
        return parseInt(this._$resizeFrame.css("borderTopWidth"))
    };
    _proto._createResizeFrame = function() {
        var _this2 = this;
        if (this._$resizeFrame) {
            return
        }
        var _devices$current = _devices.default.current(),
            deviceType = _devices$current.deviceType;
        this._$resizeFrame = (0, _renderer.default)("<div>").addClass(DX_RESIZE_FRAME_CLASS).toggleClass(DX_TOUCH_DEVICE_CLASS, "desktop" !== deviceType).appendTo(this.editorInstance._getQuillContainer()).hide();
        _events_engine.default.on(this._$resizeFrame, MOUSEDOWN_EVENT, function(e) {
            e.preventDefault()
        });
        this.editorInstance._createComponent(this._$resizeFrame, _resizable.default, {
            onResize: function(e) {
                if (!_this2._$target) {
                    return
                }
                var correction = 2 * (FRAME_PADDING + _this2._getBorderWidth());
                (0, _renderer.default)(_this2._$target).attr({
                    height: e.height - correction,
                    width: e.width - correction
                });
                _this2.updateFramePosition()
            }
        })
    };
    _proto._deleteImage = function() {
        if (this._isAllowedTarget(this._$target)) {
            _devextremeQuill.default.find(this._$target).deleteAt(0)
        }
    };
    _proto.option = function(_option, value) {
        var _this3 = this;
        if ("mediaResizing" === _option) {
            Object.keys(value).forEach(function(optionName) {
                return _this3.option(optionName, value[optionName])
            });
            return
        }
        if ("enabled" === _option) {
            this.enabled = value;
            value ? this._attachEvents() : this._detachEvents()
        } else {
            if ("allowedTargets" === _option && Array.isArray(value)) {
                this.allowedTargets = value
            }
        }
    };
    _proto.clean = function() {
        this._detachEvents();
        this._$resizeFrame.remove();
        this._$resizeFrame = void 0
    };
    return ResizingModule
}();
exports.default = ResizingModule;
module.exports = exports.default;
