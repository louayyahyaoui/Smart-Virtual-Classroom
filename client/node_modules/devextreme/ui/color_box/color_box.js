/**
 * DevExtreme (ui/color_box/color_box.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _color = _interopRequireDefault(require("../../color"));
var _color_view = _interopRequireDefault(require("./color_view"));
var _extend = require("../../core/utils/extend");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../drop_down_editor/ui.drop_down_editor"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var COLOR_BOX_CLASS = "dx-colorbox";
var COLOR_BOX_INPUT_CLASS = COLOR_BOX_CLASS + "-input";
var COLOR_BOX_INPUT_CONTAINER_CLASS = COLOR_BOX_INPUT_CLASS + "-container";
var COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS = COLOR_BOX_CLASS + "-color-result-preview";
var COLOR_BOX_COLOR_IS_NOT_DEFINED = COLOR_BOX_CLASS + "-color-is-not-defined";
var COLOR_BOX_OVERLAY_CLASS = COLOR_BOX_CLASS + "-overlay";
var COLOR_BOX_CONTAINER_CELL_CLASS = "dx-colorview-container-cell";
var COLOR_BOX_BUTTON_CELL_CLASS = "dx-colorview-button-cell";
var COLOR_BOX_BUTTONS_CONTAINER_CLASS = "dx-colorview-buttons-container";
var COLOR_BOX_APPLY_BUTTON_CLASS = "dx-colorview-apply-button";
var COLOR_BOX_CANCEL_BUTTON_CLASS = "dx-colorview-cancel-button";
var colorEditorPrototype = _color_view.default.prototype;
var colorUtils = {
    makeTransparentBackground: colorEditorPrototype._makeTransparentBackground.bind(colorEditorPrototype),
    makeRgba: colorEditorPrototype._makeRgba.bind(colorEditorPrototype)
};
var ColorBox = _ui.default.inherit({
    _supportedKeys: function() {
        var arrowHandler = function(e) {
            e.stopPropagation();
            if (this.option("opened")) {
                e.preventDefault();
                return true
            }
        };
        var upArrowHandler = function(e) {
            if (!this.option("opened")) {
                e.preventDefault();
                return false
            }
            if (e.altKey) {
                this.close();
                return false
            }
            return true
        };
        var downArrowHandler = function(e) {
            if (!this.option("opened") && !e.altKey) {
                e.preventDefault();
                return false
            }
            if (!this.option("opened") && e.altKey) {
                this._validatedOpening();
                return false
            }
            return true
        };
        return (0, _extend.extend)(this.callBase(), {
            tab: function(e) {
                if (this.option("opened")) {
                    e.preventDefault();
                    this._colorView._rgbInputs[0].focus()
                }
            },
            enter: this._enterKeyHandler,
            leftArrow: arrowHandler,
            rightArrow: arrowHandler,
            upArrow: upArrowHandler,
            downArrow: downArrowHandler
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            editAlphaChannel: false,
            applyValueMode: "useButtons",
            keyStep: 1,
            fieldTemplate: null,
            buttonsLocation: "bottom after"
        })
    },
    _popupHidingHandler: function() {
        this.callBase();
        if ("useButtons" === this.option("applyValueMode")) {
            this._updateColorViewValue(this.option("value"))
        }
    },
    _popupConfig: function() {
        return (0, _extend.extend)(this.callBase(), {
            width: ""
        })
    },
    _contentReadyHandler: function() {
        this._createColorView();
        this._addPopupBottomClasses()
    },
    _addPopupBottomClasses: function() {
        var $popupBottom = this._popup.bottomToolbar();
        if ($popupBottom) {
            $popupBottom.addClass(COLOR_BOX_CONTAINER_CELL_CLASS).addClass(COLOR_BOX_BUTTON_CELL_CLASS).find(".dx-toolbar-items-container").addClass(COLOR_BOX_BUTTONS_CONTAINER_CLASS);
            $popupBottom.find(".dx-popup-done").addClass(COLOR_BOX_APPLY_BUTTON_CLASS);
            $popupBottom.find(".dx-popup-cancel").addClass(COLOR_BOX_CANCEL_BUTTON_CLASS)
        }
    },
    _createColorView: function() {
        this._popup.overlayContent().addClass(COLOR_BOX_OVERLAY_CLASS);
        var $colorView = (0, _renderer.default)("<div>").appendTo(this._popup.$content());
        this._colorView = this._createComponent($colorView, _color_view.default, this._colorViewConfig());
        this._colorView.registerKeyHandler("escape", this._escapeHandler.bind(this));
        _events_engine.default.on($colorView, "focus", function() {
            this.focus()
        }.bind(this))
    },
    _escapeHandler: function() {
        this.close();
        this.focus()
    },
    _applyNewColor: function(value) {
        this.option("value", value);
        if (value) {
            colorUtils.makeTransparentBackground(this._$colorResultPreview, value)
        }
        if (this._colorViewEnterKeyPressed) {
            this.close();
            this._colorViewEnterKeyPressed = false
        }
    },
    _colorViewConfig: function() {
        var that = this;
        return {
            value: that.option("value"),
            matchValue: that.option("value"),
            editAlphaChannel: that.option("editAlphaChannel"),
            applyValueMode: that.option("applyValueMode"),
            focusStateEnabled: that.option("focusStateEnabled"),
            stylingMode: this.option("stylingMode"),
            onEnterKeyPressed: function(_ref) {
                var event = _ref.event;
                that._colorViewEnterKeyPressed = true;
                if (that._colorView.option("value") !== that.option("value")) {
                    that._saveValueChangeEvent(event);
                    that._applyNewColor(that._colorView.option("value"));
                    that.close()
                }
            },
            onValueChanged: function(_ref2) {
                var event = _ref2.event,
                    value = _ref2.value,
                    previousValue = _ref2.previousValue;
                if (colorUtils.makeRgba(value) === previousValue) {
                    return
                }
                var instantlyMode = "instantly" === that.option("applyValueMode");
                if (!instantlyMode && !that._colorViewEnterKeyPressed) {
                    return
                }
                if (event) {
                    that._saveValueChangeEvent(event)
                }
                that._applyNewColor(value)
            }
        }
    },
    _enterKeyHandler: function(e) {
        var newValue = this._input().val();
        var value = this.option("value");
        var oldValue = this.option("editAlphaChannel") ? colorUtils.makeRgba(value) : value;
        if (!newValue) {
            return false
        }
        var color = new _color.default(newValue);
        if (color.colorIsInvalid) {
            this._input().val(oldValue);
            return
        }
        if (newValue !== oldValue) {
            this._applyColorFromInput(newValue);
            this._saveValueChangeEvent(e);
            this.option("value", this.option("editAlphaChannel") ? colorUtils.makeRgba(newValue) : newValue)
        }
        if (this._colorView) {
            var colorViewValue = this._colorView.option("value");
            if (value !== colorViewValue) {
                this._saveValueChangeEvent(e);
                this.option("value", colorViewValue)
            }
        }
        this.close();
        return false
    },
    _applyButtonHandler: function(e) {
        this._saveValueChangeEvent(e.event);
        this._applyNewColor(this._colorView.option("value"));
        this.callBase()
    },
    _cancelButtonHandler: function() {
        this._resetInputValue();
        this.callBase()
    },
    _getKeyboardListeners: function() {
        return this.callBase().concat([this._colorView])
    },
    _init: function() {
        this.callBase()
    },
    _initMarkup: function() {
        this.$element().addClass(COLOR_BOX_CLASS);
        this.callBase()
    },
    _renderInput: function() {
        this.callBase();
        this._input().addClass(COLOR_BOX_INPUT_CLASS);
        this._renderColorPreview()
    },
    _renderColorPreview: function() {
        this.$element().wrapInner((0, _renderer.default)("<div>").addClass(COLOR_BOX_INPUT_CONTAINER_CLASS));
        this._$colorBoxInputContainer = this.$element().children().eq(0);
        this._$colorResultPreview = (0, _renderer.default)("<div>").addClass(COLOR_BOX_COLOR_RESULT_PREVIEW_CLASS).appendTo(this._$textEditorInputContainer);
        if (!this.option("value")) {
            this._$colorBoxInputContainer.addClass(COLOR_BOX_COLOR_IS_NOT_DEFINED)
        } else {
            colorUtils.makeTransparentBackground(this._$colorResultPreview, this.option("value"))
        }
    },
    _renderValue: function() {
        var value = this.option("value");
        this.option("text", this.option("editAlphaChannel") ? colorUtils.makeRgba(value) : value);
        return this.callBase()
    },
    _resetInputValue: function() {
        var $input = this._input();
        var value = this.option("value");
        $input.val(value);
        this._updateColorViewValue(value)
    },
    _updateColorViewValue: function(value) {
        if (this._colorView) {
            this._colorView.option({
                value: value,
                matchValue: value
            })
        }
    },
    _valueChangeEventHandler: function(e) {
        var value = this._input().val();
        if (value) {
            value = this._applyColorFromInput(value);
            this._updateColorViewValue(value)
        }
        this.callBase(e, value)
    },
    _applyColorFromInput: function(value) {
        var newColor = new _color.default(value);
        if (newColor.colorIsInvalid) {
            this._resetInputValue();
            value = this.option("value")
        }
        return value
    },
    _optionChanged: function(args) {
        var value = args.value;
        var name = args.name;
        switch (name) {
            case "value":
                this._$colorBoxInputContainer.toggleClass(COLOR_BOX_COLOR_IS_NOT_DEFINED, !value);
                if (value) {
                    colorUtils.makeTransparentBackground(this._$colorResultPreview, value)
                } else {
                    this._$colorResultPreview.removeAttr("style")
                }
                this._updateColorViewValue(value);
                this.callBase(args);
                break;
            case "applyButtonText":
            case "cancelButtonText":
                this.callBase(args);
                this._popup && this._addPopupBottomClasses();
                break;
            case "editAlphaChannel":
            case "keyStep":
                if (this._colorView) {
                    this._colorView.option(name, value)
                }
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxColorBox", ColorBox);
var _default = ColorBox;
exports.default = _default;
module.exports = exports.default;
