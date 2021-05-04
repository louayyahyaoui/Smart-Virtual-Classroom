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
exports.ToolbarItem = exports.Show = exports.Position = exports.Options = exports.Offset = exports.My = exports.Item = exports.Hide = exports.DropDownOptions = exports.Collision = exports.Button = exports.BoundaryOffset = exports.At = exports.Animation = exports.SelectBox = void 0;
var select_box_1 = require("devextreme/ui/select_box");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var SelectBox = /** @class */ (function (_super) {
    __extends(SelectBox, _super);
    function SelectBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = select_box_1.default;
        _this.subscribableOptions = ["opened", "value"];
        _this.independentEvents = ["onChange", "onClosed", "onContentReady", "onCopy", "onCustomItemCreating", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onItemClick", "onKeyDown", "onKeyUp", "onOpened", "onOptionChanged", "onPaste", "onSelectionChanged", "onValueChanged"];
        _this._defaults = {
            defaultOpened: "opened",
            defaultValue: "value"
        };
        _this._expectedChildren = {
            button: { optionName: "buttons", isCollectionItem: true },
            dropDownOptions: { optionName: "dropDownOptions", isCollectionItem: false },
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "dropDownButtonTemplate",
                render: "dropDownButtonRender",
                component: "dropDownButtonComponent",
                keyFn: "dropDownButtonKeyFn"
            }, {
                tmplOption: "fieldTemplate",
                render: "fieldRender",
                component: "fieldComponent",
                keyFn: "fieldKeyFn"
            }, {
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
    Object.defineProperty(SelectBox.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return SelectBox;
}(component_1.Component));
exports.SelectBox = SelectBox;
SelectBox.propTypes = {
    acceptCustomValue: PropTypes.bool,
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    buttons: PropTypes.array,
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
    displayValue: PropTypes.string,
    dropDownOptions: PropTypes.object,
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
    inputAttr: PropTypes.object,
    isValid: PropTypes.bool,
    items: PropTypes.array,
    maxLength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    minSearchLength: PropTypes.number,
    name: PropTypes.string,
    noDataText: PropTypes.string,
    onChange: PropTypes.func,
    onClosed: PropTypes.func,
    onContentReady: PropTypes.func,
    onCopy: PropTypes.func,
    onCustomItemCreating: PropTypes.func,
    onCut: PropTypes.func,
    onDisposing: PropTypes.func,
    onEnterKey: PropTypes.func,
    onFocusIn: PropTypes.func,
    onFocusOut: PropTypes.func,
    onInitialized: PropTypes.func,
    onInput: PropTypes.func,
    onItemClick: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onOpened: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onPaste: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onValueChanged: PropTypes.func,
    opened: PropTypes.bool,
    openOnFieldClick: PropTypes.bool,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    searchEnabled: PropTypes.bool,
    searchExpr: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        PropTypes.string
    ]),
    searchMode: PropTypes.oneOf([
        "contains",
        "startswith"
    ]),
    searchTimeout: PropTypes.number,
    showClearButton: PropTypes.bool,
    showDataBeforeSearch: PropTypes.bool,
    showDropDownButton: PropTypes.bool,
    showSelectionControls: PropTypes.bool,
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
    valueChangeEvent: PropTypes.string,
    valueExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
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
exports.default = SelectBox;
