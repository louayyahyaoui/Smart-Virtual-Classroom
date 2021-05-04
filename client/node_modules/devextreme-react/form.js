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
exports.ValidationRule = exports.TabPanelOptionsItem = exports.TabPanelOptions = exports.TabbedItem = exports.Tab = exports.StringLengthRule = exports.SimpleItem = exports.RequiredRule = exports.RangeRule = exports.PatternRule = exports.NumericRule = exports.Label = exports.Item = exports.GroupItem = exports.EmptyItem = exports.EmailRule = exports.CustomRule = exports.CompareRule = exports.ColCountByScreen = exports.ButtonOptions = exports.ButtonItem = exports.AsyncRule = exports.Form = void 0;
var form_1 = require("devextreme/ui/form");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = form_1.default;
        _this.subscribableOptions = ["formData"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onEditorEnterKey", "onFieldDataChanged", "onInitialized", "onOptionChanged"];
        _this._defaults = {
            defaultFormData: "formData"
        };
        _this._expectedChildren = {
            ButtonItem: { optionName: "items", isCollectionItem: true },
            colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false },
            EmptyItem: { optionName: "items", isCollectionItem: true },
            GroupItem: { optionName: "items", isCollectionItem: true },
            item: { optionName: "items", isCollectionItem: true },
            SimpleItem: { optionName: "items", isCollectionItem: true },
            TabbedItem: { optionName: "items", isCollectionItem: true }
        };
        return _this;
    }
    Object.defineProperty(Form.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Form;
}(component_1.Component));
exports.Form = Form;
Form.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    alignItemLabels: PropTypes.bool,
    alignItemLabelsInAllGroups: PropTypes.bool,
    colCount: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([
            "auto"
        ])
    ]),
    colCountByScreen: PropTypes.object,
    customizeItem: PropTypes.func,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    formData: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    items: PropTypes.array,
    labelLocation: PropTypes.oneOf([
        "left",
        "right",
        "top"
    ]),
    minColWidth: PropTypes.number,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onEditorEnterKey: PropTypes.func,
    onFieldDataChanged: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    optionalMark: PropTypes.string,
    readOnly: PropTypes.bool,
    requiredMark: PropTypes.string,
    requiredMessage: PropTypes.string,
    rtlEnabled: PropTypes.bool,
    screenByWidth: PropTypes.func,
    scrollingEnabled: PropTypes.bool,
    showColonAfterLabel: PropTypes.bool,
    showOptionalMark: PropTypes.bool,
    showRequiredMark: PropTypes.bool,
    showValidationSummary: PropTypes.bool,
    tabIndex: PropTypes.number,
    validationGroup: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var AsyncRule = /** @class */ (function (_super) {
    __extends(AsyncRule, _super);
    function AsyncRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncRule.OptionName = "validationRules";
    AsyncRule.IsCollectionItem = true;
    AsyncRule.PredefinedProps = {
        type: "async"
    };
    return AsyncRule;
}(nested_option_1.default));
exports.AsyncRule = AsyncRule;
var ButtonItem = /** @class */ (function (_super) {
    __extends(ButtonItem, _super);
    function ButtonItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonItem.OptionName = "items";
    ButtonItem.IsCollectionItem = true;
    ButtonItem.ExpectedChildren = {
        buttonOptions: { optionName: "buttonOptions", isCollectionItem: false }
    };
    ButtonItem.PredefinedProps = {
        itemType: "button"
    };
    return ButtonItem;
}(nested_option_1.default));
exports.ButtonItem = ButtonItem;
var ButtonOptions = /** @class */ (function (_super) {
    __extends(ButtonOptions, _super);
    function ButtonOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonOptions.OptionName = "buttonOptions";
    ButtonOptions.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return ButtonOptions;
}(nested_option_1.default));
exports.ButtonOptions = ButtonOptions;
var ColCountByScreen = /** @class */ (function (_super) {
    __extends(ColCountByScreen, _super);
    function ColCountByScreen() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColCountByScreen.OptionName = "colCountByScreen";
    return ColCountByScreen;
}(nested_option_1.default));
exports.ColCountByScreen = ColCountByScreen;
var CompareRule = /** @class */ (function (_super) {
    __extends(CompareRule, _super);
    function CompareRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompareRule.OptionName = "validationRules";
    CompareRule.IsCollectionItem = true;
    CompareRule.PredefinedProps = {
        type: "compare"
    };
    return CompareRule;
}(nested_option_1.default));
exports.CompareRule = CompareRule;
var CustomRule = /** @class */ (function (_super) {
    __extends(CustomRule, _super);
    function CustomRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomRule.OptionName = "validationRules";
    CustomRule.IsCollectionItem = true;
    CustomRule.PredefinedProps = {
        type: "custom"
    };
    return CustomRule;
}(nested_option_1.default));
exports.CustomRule = CustomRule;
var EmailRule = /** @class */ (function (_super) {
    __extends(EmailRule, _super);
    function EmailRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailRule.OptionName = "validationRules";
    EmailRule.IsCollectionItem = true;
    EmailRule.PredefinedProps = {
        type: "email"
    };
    return EmailRule;
}(nested_option_1.default));
exports.EmailRule = EmailRule;
var EmptyItem = /** @class */ (function (_super) {
    __extends(EmptyItem, _super);
    function EmptyItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyItem.OptionName = "items";
    EmptyItem.IsCollectionItem = true;
    EmptyItem.PredefinedProps = {
        itemType: "empty"
    };
    return EmptyItem;
}(nested_option_1.default));
exports.EmptyItem = EmptyItem;
var GroupItem = /** @class */ (function (_super) {
    __extends(GroupItem, _super);
    function GroupItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupItem.OptionName = "items";
    GroupItem.IsCollectionItem = true;
    GroupItem.ExpectedChildren = {
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false }
    };
    GroupItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    GroupItem.PredefinedProps = {
        itemType: "group"
    };
    return GroupItem;
}(nested_option_1.default));
exports.GroupItem = GroupItem;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    Item.TemplateProps = [{
            tmplOption: "tabTemplate",
            render: "tabRender",
            component: "tabComponent",
            keyFn: "tabKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var NumericRule = /** @class */ (function (_super) {
    __extends(NumericRule, _super);
    function NumericRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericRule.OptionName = "validationRules";
    NumericRule.IsCollectionItem = true;
    NumericRule.PredefinedProps = {
        type: "numeric"
    };
    return NumericRule;
}(nested_option_1.default));
exports.NumericRule = NumericRule;
var PatternRule = /** @class */ (function (_super) {
    __extends(PatternRule, _super);
    function PatternRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PatternRule.OptionName = "validationRules";
    PatternRule.IsCollectionItem = true;
    PatternRule.PredefinedProps = {
        type: "pattern"
    };
    return PatternRule;
}(nested_option_1.default));
exports.PatternRule = PatternRule;
var RangeRule = /** @class */ (function (_super) {
    __extends(RangeRule, _super);
    function RangeRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeRule.OptionName = "validationRules";
    RangeRule.IsCollectionItem = true;
    RangeRule.PredefinedProps = {
        type: "range"
    };
    return RangeRule;
}(nested_option_1.default));
exports.RangeRule = RangeRule;
var RequiredRule = /** @class */ (function (_super) {
    __extends(RequiredRule, _super);
    function RequiredRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequiredRule.OptionName = "validationRules";
    RequiredRule.IsCollectionItem = true;
    RequiredRule.PredefinedProps = {
        type: "required"
    };
    return RequiredRule;
}(nested_option_1.default));
exports.RequiredRule = RequiredRule;
var SimpleItem = /** @class */ (function (_super) {
    __extends(SimpleItem, _super);
    function SimpleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleItem.OptionName = "items";
    SimpleItem.IsCollectionItem = true;
    SimpleItem.ExpectedChildren = {
        AsyncRule: { optionName: "validationRules", isCollectionItem: true },
        CompareRule: { optionName: "validationRules", isCollectionItem: true },
        CustomRule: { optionName: "validationRules", isCollectionItem: true },
        EmailRule: { optionName: "validationRules", isCollectionItem: true },
        label: { optionName: "label", isCollectionItem: false },
        NumericRule: { optionName: "validationRules", isCollectionItem: true },
        PatternRule: { optionName: "validationRules", isCollectionItem: true },
        RangeRule: { optionName: "validationRules", isCollectionItem: true },
        RequiredRule: { optionName: "validationRules", isCollectionItem: true },
        StringLengthRule: { optionName: "validationRules", isCollectionItem: true },
        validationRule: { optionName: "validationRules", isCollectionItem: true }
    };
    SimpleItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    SimpleItem.PredefinedProps = {
        itemType: "simple"
    };
    return SimpleItem;
}(nested_option_1.default));
exports.SimpleItem = SimpleItem;
var StringLengthRule = /** @class */ (function (_super) {
    __extends(StringLengthRule, _super);
    function StringLengthRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringLengthRule.OptionName = "validationRules";
    StringLengthRule.IsCollectionItem = true;
    StringLengthRule.PredefinedProps = {
        type: "stringLength"
    };
    return StringLengthRule;
}(nested_option_1.default));
exports.StringLengthRule = StringLengthRule;
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.OptionName = "tabs";
    Tab.IsCollectionItem = true;
    Tab.ExpectedChildren = {
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false }
    };
    Tab.TemplateProps = [{
            tmplOption: "tabTemplate",
            render: "tabRender",
            component: "tabComponent",
            keyFn: "tabKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Tab;
}(nested_option_1.default));
exports.Tab = Tab;
var TabbedItem = /** @class */ (function (_super) {
    __extends(TabbedItem, _super);
    function TabbedItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabbedItem.OptionName = "items";
    TabbedItem.IsCollectionItem = true;
    TabbedItem.ExpectedChildren = {
        tab: { optionName: "tabs", isCollectionItem: true },
        tabPanelOptions: { optionName: "tabPanelOptions", isCollectionItem: false }
    };
    TabbedItem.PredefinedProps = {
        itemType: "tabbed"
    };
    return TabbedItem;
}(nested_option_1.default));
exports.TabbedItem = TabbedItem;
var TabPanelOptions = /** @class */ (function (_super) {
    __extends(TabPanelOptions, _super);
    function TabPanelOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabPanelOptions.OptionName = "tabPanelOptions";
    TabPanelOptions.DefaultsProps = {
        defaultItems: "items",
        defaultSelectedIndex: "selectedIndex",
        defaultSelectedItem: "selectedItem",
        defaultSelectedItemKeys: "selectedItemKeys",
        defaultSelectedItems: "selectedItems"
    };
    TabPanelOptions.ExpectedChildren = {
        item: { optionName: "items", isCollectionItem: true },
        tabPanelOptionsItem: { optionName: "items", isCollectionItem: true }
    };
    TabPanelOptions.TemplateProps = [{
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
    return TabPanelOptions;
}(nested_option_1.default));
exports.TabPanelOptions = TabPanelOptions;
var TabPanelOptionsItem = /** @class */ (function (_super) {
    __extends(TabPanelOptionsItem, _super);
    function TabPanelOptionsItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabPanelOptionsItem.OptionName = "items";
    TabPanelOptionsItem.IsCollectionItem = true;
    TabPanelOptionsItem.TemplateProps = [{
            tmplOption: "tabTemplate",
            render: "tabRender",
            component: "tabComponent",
            keyFn: "tabKeyFn"
        }, {
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return TabPanelOptionsItem;
}(nested_option_1.default));
exports.TabPanelOptionsItem = TabPanelOptionsItem;
var ValidationRule = /** @class */ (function (_super) {
    __extends(ValidationRule, _super);
    function ValidationRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidationRule.OptionName = "validationRules";
    ValidationRule.IsCollectionItem = true;
    ValidationRule.PredefinedProps = {
        type: "required"
    };
    return ValidationRule;
}(nested_option_1.default));
exports.ValidationRule = ValidationRule;
exports.default = Form;
