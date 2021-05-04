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
exports.Item = exports.ButtonGroup = void 0;
var button_group_1 = require("devextreme/ui/button_group");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var ButtonGroup = /** @class */ (function (_super) {
    __extends(ButtonGroup, _super);
    function ButtonGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = button_group_1.default;
        _this.subscribableOptions = ["selectedItemKeys", "selectedItems"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onOptionChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultSelectedItemKeys: "selectedItemKeys",
            defaultSelectedItems: "selectedItems"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "buttonTemplate",
                render: "buttonRender",
                component: "buttonComponent",
                keyFn: "buttonKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(ButtonGroup.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return ButtonGroup;
}(component_1.Component));
exports.ButtonGroup = ButtonGroup;
ButtonGroup.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
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
    items: PropTypes.array,
    keyExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    selectedItemKeys: PropTypes.array,
    selectedItems: PropTypes.array,
    selectionMode: PropTypes.oneOf([
        "multiple",
        "single"
    ]),
    stylingMode: PropTypes.oneOf([
        "text",
        "outlined",
        "contained"
    ]),
    tabIndex: PropTypes.number,
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
exports.default = ButtonGroup;
