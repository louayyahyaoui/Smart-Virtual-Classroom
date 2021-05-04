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
exports.Item = exports.Accordion = void 0;
var accordion_1 = require("devextreme/ui/accordion");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = accordion_1.default;
        _this.subscribableOptions = ["items", "selectedIndex", "selectedItem", "selectedItemKeys", "selectedItems"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemContextMenu", "onItemHold", "onItemRendered", "onItemTitleClick", "onOptionChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultItems: "items",
            defaultSelectedIndex: "selectedIndex",
            defaultSelectedItem: "selectedItem",
            defaultSelectedItemKeys: "selectedItemKeys",
            defaultSelectedItems: "selectedItems"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }, {
                tmplOption: "itemTitleTemplate",
                render: "itemTitleRender",
                component: "itemTitleComponent",
                keyFn: "itemTitleKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Accordion.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Accordion;
}(component_1.Component));
exports.Accordion = Accordion;
Accordion.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    animationDuration: PropTypes.number,
    collapsible: PropTypes.bool,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    deferRendering: PropTypes.bool,
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
    itemHoldTimeout: PropTypes.number,
    items: PropTypes.array,
    keyExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    multiple: PropTypes.bool,
    noDataText: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onItemContextMenu: PropTypes.func,
    onItemHold: PropTypes.func,
    onItemRendered: PropTypes.func,
    onItemTitleClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    repaintChangesOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    selectedIndex: PropTypes.number,
    selectedItem: PropTypes.object,
    selectedItemKeys: PropTypes.array,
    selectedItems: PropTypes.array,
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
exports.default = Accordion;
