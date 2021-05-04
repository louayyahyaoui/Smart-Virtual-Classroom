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
exports.Item = exports.RadioGroup = void 0;
var radio_group_1 = require("devextreme/ui/radio_group");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var RadioGroup = /** @class */ (function (_super) {
    __extends(RadioGroup, _super);
    function RadioGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = radio_group_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onOptionChanged", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(RadioGroup.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return RadioGroup;
}(component_1.Component));
exports.RadioGroup = RadioGroup;
RadioGroup.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    displayExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    isValid: PropTypes.bool,
    items: PropTypes.array,
    layout: PropTypes.oneOf([
        "horizontal",
        "vertical"
    ]),
    name: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onValueChanged: PropTypes.func,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
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
    valueExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    Item.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
exports.default = RadioGroup;
