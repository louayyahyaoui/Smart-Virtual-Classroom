/**
 * DevExtreme (ui/text_area.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _common = require("../core/utils/common");
var _window = require("../core/utils/window");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _type = require("../core/utils/type");
var _index = require("../events/utils/index");
var _pointer = _interopRequireDefault(require("../events/pointer"));
var _uiEventsEmitterGesture = _interopRequireDefault(require("../ui/scroll_view/ui.events.emitter.gesture.scroll"));
var _size = require("../core/utils/size");
var _utils = require("./text_box/utils.scroll");
var _text_box = _interopRequireDefault(require("./text_box"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TEXTAREA_CLASS = "dx-textarea";
var TEXTEDITOR_INPUT_CLASS = "dx-texteditor-input";
var TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE = "dx-texteditor-input-auto-resize";
var TextArea = _text_box.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            spellcheck: true,
            minHeight: void 0,
            maxHeight: void 0,
            autoResizeEnabled: false
        })
    },
    _initMarkup: function() {
        this.$element().addClass(TEXTAREA_CLASS);
        this.callBase();
        this.setAria("multiline", "true")
    },
    _renderContentImpl: function() {
        this._updateInputHeight();
        this.callBase()
    },
    _renderInput: function() {
        this.callBase();
        this._renderScrollHandler()
    },
    _createInput: function() {
        var $input = (0, _renderer.default)("<textarea>");
        this._applyInputAttributes($input, this.option("inputAttr"));
        this._updateInputAutoResizeAppearance($input);
        return $input
    },
    _applyInputAttributes: function($input, customAttributes) {
        $input.attr(customAttributes).addClass(TEXTEDITOR_INPUT_CLASS)
    },
    _renderScrollHandler: function() {
        this._eventY = 0;
        var $input = this._input();
        var initScrollData = (0, _utils.prepareScrollData)($input, true);
        _events_engine.default.on($input, (0, _index.addNamespace)(_uiEventsEmitterGesture.default.init, this.NAME), initScrollData, _common.noop);
        _events_engine.default.on($input, (0, _index.addNamespace)(_pointer.default.down, this.NAME), this._pointerDownHandler.bind(this));
        _events_engine.default.on($input, (0, _index.addNamespace)(_pointer.default.move, this.NAME), this._pointerMoveHandler.bind(this))
    },
    _pointerDownHandler: function(e) {
        this._eventY = (0, _index.eventData)(e).y
    },
    _pointerMoveHandler: function(e) {
        var currentEventY = (0, _index.eventData)(e).y;
        var delta = this._eventY - currentEventY;
        if ((0, _utils.allowScroll)(this._input(), delta)) {
            e.isScrollingEvent = true;
            e.stopPropagation()
        }
        this._eventY = currentEventY
    },
    _renderDimensions: function() {
        var $element = this.$element();
        var element = $element.get(0);
        var width = this._getOptionValue("width", element);
        var height = this._getOptionValue("height", element);
        var minHeight = this.option("minHeight");
        var maxHeight = this.option("maxHeight");
        $element.css({
            minHeight: void 0 !== minHeight ? minHeight : "",
            maxHeight: void 0 !== maxHeight ? maxHeight : "",
            width: width,
            height: height
        })
    },
    _resetDimensions: function() {
        this.$element().css({
            height: "",
            minHeight: "",
            maxHeight: ""
        })
    },
    _renderEvents: function() {
        if (this.option("autoResizeEnabled")) {
            _events_engine.default.on(this._input(), (0, _index.addNamespace)("input paste", this.NAME), this._updateInputHeight.bind(this))
        }
        this.callBase()
    },
    _refreshEvents: function() {
        _events_engine.default.off(this._input(), (0, _index.addNamespace)("input paste", this.NAME));
        this.callBase()
    },
    _getHeightDifference: function($input) {
        return (0, _size.getVerticalOffsets)(this._$element.get(0), false) + (0, _size.getVerticalOffsets)(this._$textEditorContainer.get(0), false) + (0, _size.getVerticalOffsets)(this._$textEditorInputContainer.get(0), false) + (0, _size.getElementBoxParams)("height", (0, _window.getWindow)().getComputedStyle($input.get(0))).margin
    },
    _updateInputHeight: function() {
        var $input = this._input();
        var autoHeightResizing = void 0 === this.option("height") && this.option("autoResizeEnabled");
        if (!autoHeightResizing) {
            $input.css("height", "");
            return
        } else {
            this._resetDimensions();
            this._$element.css("height", this._$element.outerHeight())
        }
        $input.css("height", 0);
        var heightDifference = this._getHeightDifference($input);
        this._renderDimensions();
        var minHeight = this._getBoundaryHeight("minHeight");
        var maxHeight = this._getBoundaryHeight("maxHeight");
        var inputHeight = $input[0].scrollHeight;
        if (void 0 !== minHeight) {
            inputHeight = Math.max(inputHeight, minHeight - heightDifference)
        }
        if (void 0 !== maxHeight) {
            var adjustedMaxHeight = maxHeight - heightDifference;
            var needScroll = inputHeight > adjustedMaxHeight;
            inputHeight = Math.min(inputHeight, adjustedMaxHeight);
            this._updateInputAutoResizeAppearance($input, !needScroll)
        }
        $input.css("height", inputHeight);
        if (autoHeightResizing) {
            this._$element.css("height", "auto")
        }
    },
    _getBoundaryHeight: function(optionName) {
        var boundaryValue = this.option(optionName);
        if ((0, _type.isDefined)(boundaryValue)) {
            return "number" === typeof boundaryValue ? boundaryValue : (0, _size.parseHeight)(boundaryValue, this._$textEditorContainer.get(0))
        }
    },
    _renderInputType: _common.noop,
    _visibilityChanged: function(visible) {
        if (visible) {
            this._updateInputHeight()
        }
    },
    _updateInputAutoResizeAppearance: function($input, isAutoResizeEnabled) {
        if ($input) {
            var autoResizeEnabled = (0, _common.ensureDefined)(isAutoResizeEnabled, this.option("autoResizeEnabled"));
            $input.toggleClass(TEXTEDITOR_INPUT_CLASS_AUTO_RESIZE, autoResizeEnabled)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "autoResizeEnabled":
                this._updateInputAutoResizeAppearance(this._input(), args.value);
                this._refreshEvents();
                this._updateInputHeight();
                break;
            case "value":
            case "height":
                this.callBase(args);
                this._updateInputHeight();
                break;
            case "minHeight":
            case "maxHeight":
                this._renderDimensions();
                this._updateInputHeight();
                break;
            case "visible":
                this.callBase(args);
                args.value && this._updateInputHeight();
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxTextArea", TextArea);
var _default = TextArea;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
