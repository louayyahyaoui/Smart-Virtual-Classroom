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
exports.Row = exports.Location = exports.Item = exports.Col = exports.ResponsiveBox = void 0;
var responsive_box_1 = require("devextreme/ui/responsive_box");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var ResponsiveBox = /** @class */ (function (_super) {
    __extends(ResponsiveBox, _super);
    function ResponsiveBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = responsive_box_1.default;
        _this.subscribableOptions = ["items"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemContextMenu", "onItemHold", "onItemRendered", "onOptionChanged"];
        _this._defaults = {
            defaultItems: "items"
        };
        _this._expectedChildren = {
            col: { optionName: "cols", isCollectionItem: true },
            item: { optionName: "items", isCollectionItem: true },
            row: { optionName: "rows", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(ResponsiveBox.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return ResponsiveBox;
}(component_1.Component));
exports.ResponsiveBox = ResponsiveBox;
ResponsiveBox.propTypes = {
    cols: PropTypes.array,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hoverStateEnabled: PropTypes.bool,
    itemHoldTimeout: PropTypes.number,
    items: PropTypes.array,
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
    onOptionChanged: PropTypes.func,
    rows: PropTypes.array,
    rtlEnabled: PropTypes.bool,
    screenByWidth: PropTypes.func,
    singleColumnScreen: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Col = /** @class */ (function (_super) {
    __extends(Col, _super);
    function Col() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Col.OptionName = "cols";
    Col.IsCollectionItem = true;
    return Col;
}(nested_option_1.default));
exports.Col = Col;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    Item.ExpectedChildren = {
        location: { optionName: "location", isCollectionItem: true }
    };
    Item.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Location.OptionName = "location";
    Location.IsCollectionItem = true;
    return Location;
}(nested_option_1.default));
exports.Location = Location;
var Row = /** @class */ (function (_super) {
    __extends(Row, _super);
    function Row() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Row.OptionName = "rows";
    Row.IsCollectionItem = true;
    return Row;
}(nested_option_1.default));
exports.Row = Row;
exports.default = ResponsiveBox;
