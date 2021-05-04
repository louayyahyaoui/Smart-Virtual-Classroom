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
exports.ShowSubmenuMode = exports.ShowFirstSubmenuMode = exports.Show = exports.Item = exports.Hide = exports.Delay = exports.Animation = exports.Menu = void 0;
var menu_1 = require("devextreme/ui/menu");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = menu_1.default;
        _this.subscribableOptions = ["items", "selectedItem"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemContextMenu", "onItemRendered", "onOptionChanged", "onSelectionChanged", "onSubmenuHidden", "onSubmenuHiding", "onSubmenuShowing", "onSubmenuShown"];
        _this._defaults = {
            defaultItems: "items",
            defaultSelectedItem: "selectedItem"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            item: { optionName: "items", isCollectionItem: true },
            showFirstSubmenuMode: { optionName: "showFirstSubmenuMode", isCollectionItem: false },
            showSubmenuMode: { optionName: "showSubmenuMode", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Menu.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Menu;
}(component_1.Component));
exports.Menu = Menu;
Menu.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    adaptivityEnabled: PropTypes.bool,
    animation: PropTypes.object,
    cssClass: PropTypes.string,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
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
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hideSubmenuOnMouseLeave: PropTypes.bool,
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    items: PropTypes.array,
    itemsExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onItemContextMenu: PropTypes.func,
    onItemRendered: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onSubmenuHidden: PropTypes.func,
    onSubmenuHiding: PropTypes.func,
    onSubmenuShowing: PropTypes.func,
    onSubmenuShown: PropTypes.func,
    orientation: PropTypes.oneOf([
        "horizontal",
        "vertical"
    ]),
    rtlEnabled: PropTypes.bool,
    selectByClick: PropTypes.bool,
    selectedExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    selectedItem: PropTypes.object,
    selectionMode: PropTypes.oneOf([
        "none",
        "single"
    ]),
    showFirstSubmenuMode: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([
            "onClick",
            "onHover"
        ])
    ]),
    showSubmenuMode: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([
            "onClick",
            "onHover"
        ])
    ]),
    submenuDirection: PropTypes.oneOf([
        "auto",
        "leftOrTop",
        "rightOrBottom"
    ]),
    tabIndex: PropTypes.number,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.OptionName = "animation";
    Animation.ExpectedChildren = {
        hide: { optionName: "hide", isCollectionItem: false },
        show: { optionName: "show", isCollectionItem: false }
    };
    return Animation;
}(nested_option_1.default));
exports.Animation = Animation;
var Delay = /** @class */ (function (_super) {
    __extends(Delay, _super);
    function Delay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Delay.OptionName = "delay";
    return Delay;
}(nested_option_1.default));
exports.Delay = Delay;
var Hide = /** @class */ (function (_super) {
    __extends(Hide, _super);
    function Hide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hide.OptionName = "hide";
    return Hide;
}(nested_option_1.default));
exports.Hide = Hide;
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
var Show = /** @class */ (function (_super) {
    __extends(Show, _super);
    function Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Show.OptionName = "show";
    return Show;
}(nested_option_1.default));
exports.Show = Show;
var ShowFirstSubmenuMode = /** @class */ (function (_super) {
    __extends(ShowFirstSubmenuMode, _super);
    function ShowFirstSubmenuMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowFirstSubmenuMode.OptionName = "showFirstSubmenuMode";
    ShowFirstSubmenuMode.ExpectedChildren = {
        delay: { optionName: "delay", isCollectionItem: false }
    };
    return ShowFirstSubmenuMode;
}(nested_option_1.default));
exports.ShowFirstSubmenuMode = ShowFirstSubmenuMode;
var ShowSubmenuMode = /** @class */ (function (_super) {
    __extends(ShowSubmenuMode, _super);
    function ShowSubmenuMode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowSubmenuMode.OptionName = "showSubmenuMode";
    ShowSubmenuMode.ExpectedChildren = {
        delay: { optionName: "delay", isCollectionItem: false }
    };
    return ShowSubmenuMode;
}(nested_option_1.default));
exports.ShowSubmenuMode = ShowSubmenuMode;
exports.default = Menu;
