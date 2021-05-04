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
exports.Variables = exports.Toolbar = exports.Mention = exports.MediaResizing = exports.Item = exports.HtmlEditor = void 0;
var html_editor_1 = require("devextreme/ui/html_editor");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var HtmlEditor = /** @class */ (function (_super) {
    __extends(HtmlEditor, _super);
    function HtmlEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = html_editor_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onFocusIn", "onFocusOut", "onInitialized", "onOptionChanged", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value"
        };
        _this._expectedChildren = {
            mediaResizing: { optionName: "mediaResizing", isCollectionItem: false },
            mention: { optionName: "mentions", isCollectionItem: true },
            toolbar: { optionName: "toolbar", isCollectionItem: false },
            variables: { optionName: "variables", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(HtmlEditor.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return HtmlEditor;
}(component_1.Component));
exports.HtmlEditor = HtmlEditor;
HtmlEditor.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    customizeModules: PropTypes.func,
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
    isValid: PropTypes.bool,
    mediaResizing: PropTypes.object,
    mentions: PropTypes.array,
    name: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onFocusIn: PropTypes.func,
    onFocusOut: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onValueChanged: PropTypes.func,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    toolbar: PropTypes.object,
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
    valueType: PropTypes.oneOf([
        "html",
        "markdown"
    ]),
    variables: PropTypes.object,
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
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent",
            keyFn: "menuItemKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
var MediaResizing = /** @class */ (function (_super) {
    __extends(MediaResizing, _super);
    function MediaResizing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MediaResizing.OptionName = "mediaResizing";
    return MediaResizing;
}(nested_option_1.default));
exports.MediaResizing = MediaResizing;
var Mention = /** @class */ (function (_super) {
    __extends(Mention, _super);
    function Mention() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Mention.OptionName = "mentions";
    Mention.IsCollectionItem = true;
    Mention.TemplateProps = [{
            tmplOption: "itemTemplate",
            render: "itemRender",
            component: "itemComponent",
            keyFn: "itemKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Mention;
}(nested_option_1.default));
exports.Mention = Mention;
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.OptionName = "toolbar";
    Toolbar.ExpectedChildren = {
        item: { optionName: "items", isCollectionItem: true }
    };
    return Toolbar;
}(nested_option_1.default));
exports.Toolbar = Toolbar;
var Variables = /** @class */ (function (_super) {
    __extends(Variables, _super);
    function Variables() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Variables.OptionName = "variables";
    return Variables;
}(nested_option_1.default));
exports.Variables = Variables;
exports.default = HtmlEditor;
