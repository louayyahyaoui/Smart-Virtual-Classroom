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
exports.ValidationRule = exports.Validation = exports.ToolbarItem = exports.Toolbar = exports.Tasks = exports.StripLine = exports.StringLengthRule = exports.Resources = exports.ResourceAssignments = exports.RequiredRule = exports.RangeRule = exports.PatternRule = exports.NumericRule = exports.Lookup = exports.Label = exports.Item = exports.HeaderFilter = exports.FormItem = exports.Format = exports.EmailRule = exports.Editing = exports.Dependencies = exports.CustomRule = exports.ContextMenuItem = exports.ContextMenu = exports.CompareRule = exports.Column = exports.Button = exports.AsyncRule = exports.Gantt = void 0;
var gantt_1 = require("devextreme/ui/gantt");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Gantt = /** @class */ (function (_super) {
    __extends(Gantt, _super);
    function Gantt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = gantt_1.default;
        _this.independentEvents = ["onContentReady", "onContextMenuPreparing", "onCustomCommand", "onDependencyDeleted", "onDependencyDeleting", "onDependencyInserted", "onDependencyInserting", "onDisposing", "onInitialized", "onOptionChanged", "onResourceAssigned", "onResourceAssigning", "onResourceDeleted", "onResourceDeleting", "onResourceInserted", "onResourceInserting", "onResourceUnassigned", "onResourceUnassigning", "onSelectionChanged", "onTaskClick", "onTaskDblClick", "onTaskDeleted", "onTaskDeleting", "onTaskEditDialogShowing", "onTaskInserted", "onTaskInserting", "onTaskMoving", "onTaskUpdated", "onTaskUpdating"];
        _this._expectedChildren = {
            column: { optionName: "columns", isCollectionItem: true },
            contextMenu: { optionName: "contextMenu", isCollectionItem: false },
            dependencies: { optionName: "dependencies", isCollectionItem: false },
            editing: { optionName: "editing", isCollectionItem: false },
            resourceAssignments: { optionName: "resourceAssignments", isCollectionItem: false },
            resources: { optionName: "resources", isCollectionItem: false },
            stripLine: { optionName: "stripLines", isCollectionItem: true },
            tasks: { optionName: "tasks", isCollectionItem: false },
            toolbar: { optionName: "toolbar", isCollectionItem: false },
            validation: { optionName: "validation", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "taskTooltipContentTemplate",
                render: "taskTooltipContentRender",
                component: "taskTooltipContentComponent",
                keyFn: "taskTooltipContentKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Gantt.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Gantt;
}(component_1.Component));
exports.Gantt = Gantt;
Gantt.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowSelection: PropTypes.bool,
    columns: PropTypes.array,
    contextMenu: PropTypes.object,
    dependencies: PropTypes.object,
    disabled: PropTypes.bool,
    editing: PropTypes.object,
    elementAttr: PropTypes.object,
    firstDayOfWeek: PropTypes.oneOf([
        0,
        1,
        2,
        3,
        4,
        5,
        6
    ]),
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    onContentReady: PropTypes.func,
    onContextMenuPreparing: PropTypes.func,
    onCustomCommand: PropTypes.func,
    onDependencyDeleted: PropTypes.func,
    onDependencyDeleting: PropTypes.func,
    onDependencyInserted: PropTypes.func,
    onDependencyInserting: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onResourceAssigned: PropTypes.func,
    onResourceAssigning: PropTypes.func,
    onResourceDeleted: PropTypes.func,
    onResourceDeleting: PropTypes.func,
    onResourceInserted: PropTypes.func,
    onResourceInserting: PropTypes.func,
    onResourceUnassigned: PropTypes.func,
    onResourceUnassigning: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onTaskClick: PropTypes.func,
    onTaskDblClick: PropTypes.func,
    onTaskDeleted: PropTypes.func,
    onTaskDeleting: PropTypes.func,
    onTaskEditDialogShowing: PropTypes.func,
    onTaskInserted: PropTypes.func,
    onTaskInserting: PropTypes.func,
    onTaskMoving: PropTypes.func,
    onTaskUpdated: PropTypes.func,
    onTaskUpdating: PropTypes.func,
    resourceAssignments: PropTypes.object,
    resources: PropTypes.object,
    scaleType: PropTypes.oneOf([
        "auto",
        "minutes",
        "hours",
        "days",
        "weeks",
        "months",
        "quarters",
        "years"
    ]),
    showResources: PropTypes.bool,
    showRowLines: PropTypes.bool,
    stripLines: PropTypes.array,
    tabIndex: PropTypes.number,
    taskListWidth: PropTypes.number,
    tasks: PropTypes.object,
    taskTitlePosition: PropTypes.oneOf([
        "inside",
        "outside",
        "none"
    ]),
    toolbar: PropTypes.object,
    validation: PropTypes.object,
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
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.OptionName = "buttons";
    Button.IsCollectionItem = true;
    Button.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Button;
}(nested_option_1.default));
exports.Button = Button;
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Column.OptionName = "columns";
    Column.IsCollectionItem = true;
    Column.DefaultsProps = {
        defaultFilterValue: "filterValue",
        defaultFilterValues: "filterValues",
        defaultSelectedFilterOperation: "selectedFilterOperation",
        defaultSortIndex: "sortIndex",
        defaultSortOrder: "sortOrder",
        defaultVisible: "visible",
        defaultVisibleIndex: "visibleIndex"
    };
    Column.ExpectedChildren = {
        AsyncRule: { optionName: "validationRules", isCollectionItem: true },
        button: { optionName: "buttons", isCollectionItem: true },
        CompareRule: { optionName: "validationRules", isCollectionItem: true },
        CustomRule: { optionName: "validationRules", isCollectionItem: true },
        EmailRule: { optionName: "validationRules", isCollectionItem: true },
        format: { optionName: "format", isCollectionItem: false },
        formItem: { optionName: "formItem", isCollectionItem: false },
        headerFilter: { optionName: "headerFilter", isCollectionItem: false },
        lookup: { optionName: "lookup", isCollectionItem: false },
        NumericRule: { optionName: "validationRules", isCollectionItem: true },
        PatternRule: { optionName: "validationRules", isCollectionItem: true },
        RangeRule: { optionName: "validationRules", isCollectionItem: true },
        RequiredRule: { optionName: "validationRules", isCollectionItem: true },
        StringLengthRule: { optionName: "validationRules", isCollectionItem: true },
        validationRule: { optionName: "validationRules", isCollectionItem: true }
    };
    Column.TemplateProps = [{
            tmplOption: "cellTemplate",
            render: "cellRender",
            component: "cellComponent",
            keyFn: "cellKeyFn"
        }, {
            tmplOption: "editCellTemplate",
            render: "editCellRender",
            component: "editCellComponent",
            keyFn: "editCellKeyFn"
        }, {
            tmplOption: "headerCellTemplate",
            render: "headerCellRender",
            component: "headerCellComponent",
            keyFn: "headerCellKeyFn"
        }];
    return Column;
}(nested_option_1.default));
exports.Column = Column;
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
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenu.OptionName = "contextMenu";
    ContextMenu.ExpectedChildren = {
        contextMenuItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true }
    };
    return ContextMenu;
}(nested_option_1.default));
exports.ContextMenu = ContextMenu;
var ContextMenuItem = /** @class */ (function (_super) {
    __extends(ContextMenuItem, _super);
    function ContextMenuItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenuItem.OptionName = "items";
    ContextMenuItem.IsCollectionItem = true;
    ContextMenuItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return ContextMenuItem;
}(nested_option_1.default));
exports.ContextMenuItem = ContextMenuItem;
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
var Dependencies = /** @class */ (function (_super) {
    __extends(Dependencies, _super);
    function Dependencies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dependencies.OptionName = "dependencies";
    return Dependencies;
}(nested_option_1.default));
exports.Dependencies = Dependencies;
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editing.OptionName = "editing";
    return Editing;
}(nested_option_1.default));
exports.Editing = Editing;
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
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Format.OptionName = "format";
    return Format;
}(nested_option_1.default));
exports.Format = Format;
var FormItem = /** @class */ (function (_super) {
    __extends(FormItem, _super);
    function FormItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormItem.OptionName = "formItem";
    FormItem.ExpectedChildren = {
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
    FormItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return FormItem;
}(nested_option_1.default));
exports.FormItem = FormItem;
var HeaderFilter = /** @class */ (function (_super) {
    __extends(HeaderFilter, _super);
    function HeaderFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderFilter.OptionName = "headerFilter";
    return HeaderFilter;
}(nested_option_1.default));
exports.HeaderFilter = HeaderFilter;
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
        }, {
            tmplOption: "menuItemTemplate",
            render: "menuItemRender",
            component: "menuItemComponent",
            keyFn: "menuItemKeyFn"
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
var Lookup = /** @class */ (function (_super) {
    __extends(Lookup, _super);
    function Lookup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lookup.OptionName = "lookup";
    return Lookup;
}(nested_option_1.default));
exports.Lookup = Lookup;
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
var ResourceAssignments = /** @class */ (function (_super) {
    __extends(ResourceAssignments, _super);
    function ResourceAssignments() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ResourceAssignments.OptionName = "resourceAssignments";
    return ResourceAssignments;
}(nested_option_1.default));
exports.ResourceAssignments = ResourceAssignments;
var Resources = /** @class */ (function (_super) {
    __extends(Resources, _super);
    function Resources() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resources.OptionName = "resources";
    return Resources;
}(nested_option_1.default));
exports.Resources = Resources;
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
var StripLine = /** @class */ (function (_super) {
    __extends(StripLine, _super);
    function StripLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripLine.OptionName = "stripLines";
    StripLine.IsCollectionItem = true;
    return StripLine;
}(nested_option_1.default));
exports.StripLine = StripLine;
var Tasks = /** @class */ (function (_super) {
    __extends(Tasks, _super);
    function Tasks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tasks.OptionName = "tasks";
    return Tasks;
}(nested_option_1.default));
exports.Tasks = Tasks;
var Toolbar = /** @class */ (function (_super) {
    __extends(Toolbar, _super);
    function Toolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbar.OptionName = "toolbar";
    Toolbar.ExpectedChildren = {
        item: { optionName: "items", isCollectionItem: true },
        toolbarItem: { optionName: "items", isCollectionItem: true }
    };
    return Toolbar;
}(nested_option_1.default));
exports.Toolbar = Toolbar;
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItem.OptionName = "items";
    ToolbarItem.IsCollectionItem = true;
    ToolbarItem.TemplateProps = [{
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
    return ToolbarItem;
}(nested_option_1.default));
exports.ToolbarItem = ToolbarItem;
var Validation = /** @class */ (function (_super) {
    __extends(Validation, _super);
    function Validation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Validation.OptionName = "validation";
    return Validation;
}(nested_option_1.default));
exports.Validation = Validation;
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
exports.default = Gantt;
