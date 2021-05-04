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
exports.TextArea = void 0;
var text_area_1 = require("devextreme/ui/text_area");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = text_area_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onChange", "onContentReady", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onOptionChanged", "onPaste", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value"
        };
        return _this;
    }
    Object.defineProperty(TextArea.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return TextArea;
}(component_1.Component));
exports.TextArea = TextArea;
TextArea.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    autoResizeEnabled: PropTypes.bool,
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
    maxHeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    maxLength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    minHeight: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
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
    spellcheck: PropTypes.bool,
    stylingMode: PropTypes.oneOf([
        "outlined",
        "underlined",
        "filled"
    ]),
    tabIndex: PropTypes.number,
    text: PropTypes.string,
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
exports.default = TextArea;
