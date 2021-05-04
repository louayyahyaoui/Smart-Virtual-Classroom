/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Options = exports.Button = exports.TextBox = void 0;
var text_box_1 = require("devextreme/ui/text_box");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = text_box_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onChange", "onContentReady", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onOptionChanged", "onPaste", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value"
        };
        _this._expectedChildren = {
            button: { optionName: "buttons", isCollectionItem: true }
        };
        return _this;
    }
    Object.defineProperty(TextBox.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return TextBox;
}(component_1.Component));
exports.TextBox = TextBox;
TextBox.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    buttons: PropTypes.array,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    inputAttr: PropTypes.object,
    isValid: PropTypes.bool,
    mask: PropTypes.string,
    maskChar: PropTypes.string,
    maskInvalidMessage: PropTypes.string,
    maskRules: PropTypes.object,
    maxLength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    mode: PropTypes.oneOf([
        "email",
        "password",
        "search",
        "tel",
        "text",
        "url"
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onContentReady: PropTypes.func,
    onCopy: PropTypes.func,
    onCut: PropTypes.func,
    onDisposing: PropTypes.func,
    onEnterKey: PropTypes.func,
    onFocusIn: PropTypes.func,
    onFocusOut: PropTypes.func,
    onInitialized: PropTypes.func,
    onInput: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onPaste: PropTypes.func,
    onValueChanged: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    showClearButton: PropTypes.bool,
    showMaskMode: PropTypes.oneOf([
        "always",
        "onFocus"
    ]),
    spellcheck: PropTypes.bool,
    stylingMode: PropTypes.oneOf([
        "outlined",
        "underlined",
        "filled"
    ]),
    tabIndex: PropTypes.number,
    text: PropTypes.string,
    useMaskedValue: PropTypes.bool,
    validationError: PropTypes.object,
    validationErrors: PropTypes.array,
    validationMessageMode: PropTypes.oneOf([
        "always",
        "auto"
    ]),
    validationStatus: PropTypes.oneOf([
        "valid",
        "invalid",
        "pending"
    ]),
    value: PropTypes.string,
    valueChangeEvent: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.OptionName = "buttons";
    Button.IsCollectionItem = true;
    Button.ExpectedChildren = {
        options: { optionName: "options", isCollectionItem: false }
    };
    return Button;
}(nested_option_1.default));
exports.Button = Button;
var Options = /** @class */ (function (_super) {
    __extends(Options, _super);
    function Options() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Options.OptionName = "options";
    Options.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Options;
}(nested_option_1.default));
exports.Options = Options;
exports.default = TextBox;
