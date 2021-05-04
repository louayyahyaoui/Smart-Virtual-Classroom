/**
 * DevExtreme (ui/validation_message.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _overlay = _interopRequireDefault(require("./overlay"));
var _extend = require("../core/utils/extend");
var _string = require("../core/utils/string");
var _position = require("../core/utils/position");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var INVALID_MESSAGE = "dx-invalid-message";
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var INVALID_MESSAGE_ALWAYS = "dx-invalid-message-always";
var INVALID_MESSAGE_CONTENT = "dx-invalid-message-content";
var VALIDATION_MESSAGE_MIN_WIDTH = 100;
var ValidationMessage = _overlay.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            integrationOptions: {},
            templatesRenderAsynchronously: false,
            shading: false,
            width: "auto",
            height: "auto",
            closeOnOutsideClick: false,
            closeOnTargetScroll: false,
            animation: null,
            visible: true,
            propagateOutsideClick: true,
            _checkParentVisibility: false,
            rtlEnabled: false,
            contentTemplate: this._renderInnerHtml,
            maxWidth: "100%",
            mode: "auto",
            validationErrors: void 0,
            positionRequest: void 0,
            describedElement: void 0,
            boundary: void 0,
            offset: {
                h: 0,
                v: 0
            }
        })
    },
    _init: function() {
        this.callBase();
        this.updateMaxWidth();
        this._updatePosition()
    },
    _initMarkup: function() {
        this.callBase();
        this.$element().addClass(INVALID_MESSAGE);
        this._wrapper().addClass(INVALID_MESSAGE);
        this._toggleModeClass();
        this._updateContentId()
    },
    _updateContentId: function() {
        var describedElement = this.option("describedElement") || this.option("container");
        var contentId = (0, _renderer.default)(describedElement).attr("aria-describedby");
        this.$content().addClass(INVALID_MESSAGE_CONTENT).attr("id", contentId)
    },
    _renderInnerHtml: function(element) {
        var $element = element && (0, _renderer.default)(element);
        var validationErrors = this.option("validationErrors") || [];
        var validationErrorMessage = "";
        validationErrors.forEach(function(err) {
            var separator = validationErrorMessage ? "<br />" : "";
            validationErrorMessage += separator + (0, _string.encodeHtml)((null === err || void 0 === err ? void 0 : err.message) || "")
        });
        null === $element || void 0 === $element ? void 0 : $element.html(validationErrorMessage)
    },
    _toggleModeClass: function() {
        var mode = this.option("mode");
        this._wrapper().toggleClass(INVALID_MESSAGE_AUTO, "auto" === mode).toggleClass(INVALID_MESSAGE_ALWAYS, "always" === mode)
    },
    updateMaxWidth: function() {
        var _target$outerWidth;
        var target = this.option("target");
        var targetWidth = (null === target || void 0 === target ? void 0 : null === (_target$outerWidth = target.outerWidth) || void 0 === _target$outerWidth ? void 0 : _target$outerWidth.call(target)) || (0, _renderer.default)(target).outerWidth();
        var maxWidth = "100%";
        if (targetWidth) {
            maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH)
        }
        this.option({
            maxWidth: maxWidth
        })
    },
    _updatePosition: function() {
        var _this$option = this.option(),
            positionRequest = _this$option.positionRequest,
            rtlEnabled = _this$option.rtlEnabled,
            offset = _this$option.offset,
            boundary = _this$option.boundary;
        var positionSide = (0, _position.getDefaultAlignment)(rtlEnabled);
        var verticalPositions = "below" === positionRequest ? [" top", " bottom"] : [" bottom", " top"];
        if (rtlEnabled) {
            offset.h = -offset.h
        }
        if ("below" !== positionRequest) {
            offset.v = -offset.v
        }
        this.option("position", {
            offset: offset,
            boundary: boundary,
            my: positionSide + verticalPositions[0],
            at: positionSide + verticalPositions[1],
            collision: "none flip"
        })
    },
    _optionChanged: function(args) {
        var name = args.name,
            value = args.value;
        switch (name) {
            case "target":
                this.updateMaxWidth();
                this.callBase(args);
                break;
            case "boundary":
                this.option("position.boundary", value);
                break;
            case "mode":
                this._toggleModeClass(value);
                break;
            case "rtlEnabled":
            case "offset":
            case "positionRequest":
                this._updatePosition();
                break;
            case "validationErrors":
                this._renderInnerHtml(this.$content());
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxValidationMessage", ValidationMessage);
var _default = ValidationMessage;
exports.default = _default;
module.exports = exports.default;
