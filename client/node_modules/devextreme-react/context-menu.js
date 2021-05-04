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
exports.ShowSubmenuMode = exports.ShowEvent = exports.Show = exports.Position = exports.Offset = exports.My = exports.Item = exports.Hide = exports.Delay = exports.Collision = exports.BoundaryOffset = exports.At = exports.Animation = exports.ContextMenu = void 0;
var context_menu_1 = require("devextreme/ui/context_menu");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = context_menu_1.default;
        _this.subscribableOptions = ["items", "selectedItem", "visible"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onItemClick", "onItemContextMenu", "onItemRendered", "onOptionChanged", "onPositioning", "onSelectionChanged", "onShowing", "onShown"];
        _this._defaults = {
            defaultItems: "items",
            defaultSelectedItem: "selectedItem",
            defaultVisible: "visible"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            item: { optionName: "items", isCollectionItem: true },
            position: { optionName: "position", isCollectionItem: false },
            showEvent: { optionName: "showEvent", isCollectionItem: false },
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
    Object.defineProperty(ContextMenu.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return ContextMenu;
}(component_1.Component));
exports.ContextMenu = ContextMenu;
ContextMenu.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    animation: PropTypes.object,
    closeOnOutsideClick: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
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
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    items: PropTypes.array,
    itemsExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onHidden: PropTypes.func,
    onHiding: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onItemContextMenu: PropTypes.func,
    onItemRendered: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onPositioning: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onShowing: PropTypes.func,
    onShown: PropTypes.func,
    position: PropTypes.object,
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
    showEvent: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
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
        "left",
        "right"
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
var At = /** @class */ (function (_super) {
    __extends(At, _super);
    function At() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    At.OptionName = "at";
    return At;
}(nested_option_1.default));
exports.At = At;
var BoundaryOffset = /** @class */ (function (_super) {
    __extends(BoundaryOffset, _super);
    function BoundaryOffset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundaryOffset.OptionName = "boundaryOffset";
    return BoundaryOffset;
}(nested_option_1.default));
exports.BoundaryOffset = BoundaryOffset;
var Collision = /** @class */ (function (_super) {
    __extends(Collision, _super);
    function Collision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collision.OptionName = "collision";
    return Collision;
}(nested_option_1.default));
exports.Collision = Collision;
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
var My = /** @class */ (function (_super) {
    __extends(My, _super);
    function My() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    My.OptionName = "my";
    return My;
}(nested_option_1.default));
exports.My = My;
var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Offset.OptionName = "offset";
    return Offset;
}(nested_option_1.default));
exports.Offset = Offset;
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Position.OptionName = "position";
    Position.ExpectedChildren = {
        at: { optionName: "at", isCollectionItem: false },
        boundaryOffset: { optionName: "boundaryOffset", isCollectionItem: false },
        collision: { optionName: "collision", isCollectionItem: false },
        my: { optionName: "my", isCollectionItem: false },
        offset: { optionName: "offset", isCollectionItem: false }
    };
    return Position;
}(nested_option_1.default));
exports.Position = Position;
var Show = /** @class */ (function (_super) {
    __extends(Show, _super);
    function Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Show.OptionName = "show";
    return Show;
}(nested_option_1.default));
exports.Show = Show;
var ShowEvent = /** @class */ (function (_super) {
    __extends(ShowEvent, _super);
    function ShowEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowEvent.OptionName = "showEvent";
    return ShowEvent;
}(nested_option_1.default));
exports.ShowEvent = ShowEvent;
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
exports.default = ContextMenu;
