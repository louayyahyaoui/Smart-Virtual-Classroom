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
exports.ToolbarItem = exports.Show = exports.Position = exports.Offset = exports.My = exports.Item = exports.Hide = exports.DropDownOptions = exports.Collision = exports.BoundaryOffset = exports.At = exports.Animation = exports.DropDownButton = void 0;
var drop_down_button_1 = require("devextreme/ui/drop_down_button");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var DropDownButton = /** @class */ (function (_super) {
    __extends(DropDownButton, _super);
    function DropDownButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = drop_down_button_1.default;
        _this.independentEvents = ["onButtonClick", "onContentReady", "onDisposing", "onInitialized", "onItemClick", "onOptionChanged", "onSelectionChanged"];
        _this._expectedChildren = {
            dropDownOptions: { optionName: "dropDownOptions", isCollectionItem: false },
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "dropDownContentTemplate",
                render: "dropDownContentRender",
                component: "dropDownContentComponent",
                keyFn: "dropDownContentKeyFn"
            }, {
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(DropDownButton.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return DropDownButton;
}(component_1.Component));
exports.DropDownButton = DropDownButton;
DropDownButton.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    deferRendering: PropTypes.bool,
    disabled: PropTypes.bool,
    displayExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    dropDownOptions: PropTypes.object,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    icon: PropTypes.string,
    items: PropTypes.array,
    keyExpr: PropTypes.string,
    noDataText: PropTypes.string,
    onButtonClick: PropTypes.oneOfType([
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
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    opened: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    selectedItem: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object,
        PropTypes.string
    ]),
    selectedItemKey: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    showArrowIcon: PropTypes.bool,
    splitButton: PropTypes.bool,
    stylingMode: PropTypes.oneOf([
        "text",
        "outlined",
        "contained"
    ]),
    tabIndex: PropTypes.number,
    text: PropTypes.string,
    useSelectMode: PropTypes.bool,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    wrapItemText: PropTypes.bool
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
var DropDownOptions = /** @class */ (function (_super) {
    __extends(DropDownOptions, _super);
    function DropDownOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropDownOptions.OptionName = "dropDownOptions";
    DropDownOptions.DefaultsProps = {
        defaultHeight: "height",
        defaultPosition: "position",
        defaultVisible: "visible",
        defaultWidth: "width"
    };
    DropDownOptions.ExpectedChildren = {
        animation: { optionName: "animation", isCollectionItem: false },
        position: { optionName: "position", isCollectionItem: false },
        toolbarItem: { optionName: "toolbarItems", isCollectionItem: true }
    };
    DropDownOptions.TemplateProps = [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent",
            keyFn: "contentKeyFn"
        }, {
            tmplOption: "titleTemplate",
            render: "titleRender",
            component: "titleComponent",
            keyFn: "titleKeyFn"
        }];
    return DropDownOptions;
}(nested_option_1.default));
exports.DropDownOptions = DropDownOptions;
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
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItem.OptionName = "toolbarItems";
    ToolbarItem.IsCollectionItem = true;
    ToolbarItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return ToolbarItem;
}(nested_option_1.default));
exports.ToolbarItem = ToolbarItem;
exports.default = DropDownButton;
