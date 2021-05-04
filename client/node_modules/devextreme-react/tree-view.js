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
exports.SearchEditorOptions = exports.Options = exports.Item = exports.Button = exports.TreeView = void 0;
var tree_view_1 = require("devextreme/ui/tree_view");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    function TreeView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = tree_view_1.default;
        _this.subscribableOptions = ["items"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemCollapsed", "onItemContextMenu", "onItemExpanded", "onItemHold", "onItemRendered", "onItemSelectionChanged", "onOptionChanged", "onSelectAllValueChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultItems: "items"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true },
            searchEditorOptions: { optionName: "searchEditorOptions", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(TreeView.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return TreeView;
}(component_1.Component));
exports.TreeView = TreeView;
TreeView.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    animationEnabled: PropTypes.bool,
    createChildren: PropTypes.func,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    dataStructure: PropTypes.oneOf([
        "plain",
        "tree"
    ]),
    disabled: PropTypes.bool,
    disabledExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    displayExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    elementAttr: PropTypes.object,
    expandAllEnabled: PropTypes.bool,
    expandedExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    expandEvent: PropTypes.oneOf([
        "dblclick",
        "click"
    ]),
    expandNodesRecursive: PropTypes.bool,
    focusStateEnabled: PropTypes.bool,
    hasItemsExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    itemHoldTimeout: PropTypes.number,
    items: PropTypes.array,
    itemsExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    keyExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    noDataText: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.func,
    onItemCollapsed: PropTypes.func,
    onItemContextMenu: PropTypes.func,
    onItemExpanded: PropTypes.func,
    onItemHold: PropTypes.func,
    onItemRendered: PropTypes.func,
    onItemSelectionChanged: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectAllValueChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    parentIdExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    rtlEnabled: PropTypes.bool,
    scrollDirection: PropTypes.oneOf([
        "both",
        "horizontal",
        "vertical"
    ]),
    searchEditorOptions: PropTypes.object,
    searchEnabled: PropTypes.bool,
    searchExpr: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        PropTypes.string
    ]),
    searchMode: PropTypes.oneOf([
        "contains",
        "startswith",
        "equals"
    ]),
    searchTimeout: PropTypes.number,
    searchValue: PropTypes.string,
    selectAllText: PropTypes.string,
    selectByClick: PropTypes.bool,
    selectedExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    selectionMode: PropTypes.oneOf([
        "multiple",
        "single"
    ]),
    selectNodesRecursive: PropTypes.bool,
    showCheckBoxesMode: PropTypes.oneOf([
        "none",
        "normal",
        "selectAll"
    ]),
    tabIndex: PropTypes.number,
    virtualModeEnabled: PropTypes.bool,
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
var SearchEditorOptions = /** @class */ (function (_super) {
    __extends(SearchEditorOptions, _super);
    function SearchEditorOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchEditorOptions.OptionName = "searchEditorOptions";
    SearchEditorOptions.DefaultsProps = {
        defaultValue: "value"
    };
    SearchEditorOptions.ExpectedChildren = {
        button: { optionName: "buttons", isCollectionItem: true }
    };
    return SearchEditorOptions;
}(nested_option_1.default));
exports.SearchEditorOptions = SearchEditorOptions;
exports.default = TreeView;
