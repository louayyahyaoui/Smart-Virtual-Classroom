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
exports.SearchEditorOptions = exports.Options = exports.MenuItem = exports.ItemDragging = exports.Item = exports.CursorOffset = exports.Button = exports.List = void 0;
var list_1 = require("devextreme/ui/list");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = list_1.default;
        _this.subscribableOptions = ["items", "selectedItemKeys", "selectedItems"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onGroupRendered", "onInitialized", "onItemClick", "onItemContextMenu", "onItemDeleted", "onItemDeleting", "onItemHold", "onItemRendered", "onItemReordered", "onItemSwipe", "onOptionChanged", "onPageLoading", "onPullRefresh", "onScroll", "onSelectAllValueChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultItems: "items",
            defaultSelectedItemKeys: "selectedItemKeys",
            defaultSelectedItems: "selectedItems"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true },
            itemDragging: { optionName: "itemDragging", isCollectionItem: false },
            menuItem: { optionName: "menuItems", isCollectionItem: true },
            searchEditorOptions: { optionName: "searchEditorOptions", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "groupTemplate",
                render: "groupRender",
                component: "groupComponent",
                keyFn: "groupKeyFn"
            }, {
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(List.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return List;
}(component_1.Component));
exports.List = List;
List.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowItemDeleting: PropTypes.bool,
    bounceEnabled: PropTypes.bool,
    collapsibleGroups: PropTypes.bool,
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
    grouped: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    indicateLoading: PropTypes.bool,
    itemDeleteMode: PropTypes.oneOf([
        "context",
        "slideButton",
        "slideItem",
        "static",
        "swipe",
        "toggle"
    ]),
    itemDragging: PropTypes.object,
    itemHoldTimeout: PropTypes.number,
    items: PropTypes.array,
    keyExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    menuItems: PropTypes.array,
    menuMode: PropTypes.oneOf([
        "context",
        "slide"
    ]),
    nextButtonText: PropTypes.string,
    noDataText: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onGroupRendered: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onItemContextMenu: PropTypes.func,
    onItemDeleted: PropTypes.func,
    onItemDeleting: PropTypes.func,
    onItemHold: PropTypes.func,
    onItemRendered: PropTypes.func,
    onItemReordered: PropTypes.func,
    onItemSwipe: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onPageLoading: PropTypes.func,
    onPullRefresh: PropTypes.func,
    onScroll: PropTypes.func,
    onSelectAllValueChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    pageLoadingText: PropTypes.string,
    pageLoadMode: PropTypes.oneOf([
        "nextButton",
        "scrollBottom"
    ]),
    pulledDownText: PropTypes.string,
    pullingDownText: PropTypes.string,
    pullRefreshEnabled: PropTypes.bool,
    refreshingText: PropTypes.string,
    repaintChangesOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    scrollByContent: PropTypes.bool,
    scrollByThumb: PropTypes.bool,
    scrollingEnabled: PropTypes.bool,
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
    selectAllMode: PropTypes.oneOf([
        "allPages",
        "page"
    ]),
    selectedItemKeys: PropTypes.array,
    selectedItems: PropTypes.array,
    selectionMode: PropTypes.oneOf([
        "all",
        "multiple",
        "none",
        "single"
    ]),
    showScrollbar: PropTypes.oneOf([
        "always",
        "never",
        "onHover",
        "onScroll"
    ]),
    showSelectionControls: PropTypes.bool,
    tabIndex: PropTypes.number,
    useNativeScrolling: PropTypes.bool,
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
var CursorOffset = /** @class */ (function (_super) {
    __extends(CursorOffset, _super);
    function CursorOffset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CursorOffset.OptionName = "cursorOffset";
    return CursorOffset;
}(nested_option_1.default));
exports.CursorOffset = CursorOffset;
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
var ItemDragging = /** @class */ (function (_super) {
    __extends(ItemDragging, _super);
    function ItemDragging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemDragging.OptionName = "itemDragging";
    ItemDragging.ExpectedChildren = {
        cursorOffset: { optionName: "cursorOffset", isCollectionItem: false }
    };
    ItemDragging.TemplateProps = [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent",
            keyFn: "contentKeyFn"
        }, {
            tmplOption: "dragTemplate",
            render: "dragRender",
            component: "dragComponent",
            keyFn: "dragKeyFn"
        }];
    return ItemDragging;
}(nested_option_1.default));
exports.ItemDragging = ItemDragging;
var MenuItem = /** @class */ (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MenuItem.OptionName = "menuItems";
    MenuItem.IsCollectionItem = true;
    return MenuItem;
}(nested_option_1.default));
exports.MenuItem = MenuItem;
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
exports.default = List;
