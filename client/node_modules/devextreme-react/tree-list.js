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
exports.ValidationRule = exports.TreeListHeaderFilterTexts = exports.TreeListHeaderFilter = exports.ToolbarItem = exports.Texts = exports.TabPanelOptionsItem = exports.TabPanelOptions = exports.TabbedItem = exports.Tab = exports.StringLengthRule = exports.StateStoring = exports.Sorting = exports.SimpleItem = exports.Show = exports.Selection = exports.SearchPanel = exports.Scrolling = exports.RowDragging = exports.RequiredRule = exports.RemoteOperations = exports.RangeRule = exports.Position = exports.Popup = exports.PatternRule = exports.Paging = exports.Pager = exports.OperationDescriptions = exports.Offset = exports.NumericRule = exports.My = exports.Lookup = exports.LoadPanel = exports.Label = exports.KeyboardNavigation = exports.Item = exports.Hide = exports.HeaderFilter = exports.GroupOperationDescriptions = exports.GroupItem = exports.FormItem = exports.Format = exports.Form = exports.FilterRow = exports.FilterPanelTexts = exports.FilterPanel = exports.FilterOperationDescriptions = exports.FilterBuilderPopup = exports.FilterBuilder = exports.FieldLookup = exports.Field = exports.EmptyItem = exports.EmailRule = exports.EditingTexts = exports.Editing = exports.CustomRule = exports.CustomOperation = exports.CursorOffset = exports.CompareRule = exports.ColumnLookup = exports.ColumnHeaderFilter = exports.ColumnFixingTexts = exports.ColumnFixing = exports.ColumnChooser = exports.Column = exports.Collision = exports.ColCountByScreen = exports.ButtonOptions = exports.ButtonItem = exports.Button = exports.BoundaryOffset = exports.At = exports.AsyncRule = exports.Animation = exports.TreeList = void 0;
var tree_list_1 = require("devextreme/ui/tree_list");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var TreeList = /** @class */ (function (_super) {
    __extends(TreeList, _super);
    function TreeList() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = tree_list_1.default;
        _this.subscribableOptions = ["columns", "editing", "editing.changes", "editing.editColumnName", "editing.editRowKey", "expandedRowKeys", "filterPanel", "filterPanel.filterEnabled", "filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "paging", "paging.pageIndex", "paging.pageSize", "searchPanel", "searchPanel.text", "selectedRowKeys"];
        _this.independentEvents = ["onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDisposing", "onEditCanceled", "onEditCanceling", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitialized", "onInitNewRow", "onKeyDown", "onNodesInitialized", "onOptionChanged", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing"];
        _this._defaults = {
            defaultColumns: "columns",
            defaultEditing: "editing",
            defaultExpandedRowKeys: "expandedRowKeys",
            defaultFilterPanel: "filterPanel",
            defaultFilterValue: "filterValue",
            defaultFocusedColumnIndex: "focusedColumnIndex",
            defaultFocusedRowIndex: "focusedRowIndex",
            defaultFocusedRowKey: "focusedRowKey",
            defaultPaging: "paging",
            defaultSearchPanel: "searchPanel",
            defaultSelectedRowKeys: "selectedRowKeys"
        };
        _this._expectedChildren = {
            column: { optionName: "columns", isCollectionItem: true },
            columnChooser: { optionName: "columnChooser", isCollectionItem: false },
            columnFixing: { optionName: "columnFixing", isCollectionItem: false },
            editing: { optionName: "editing", isCollectionItem: false },
            filterBuilder: { optionName: "filterBuilder", isCollectionItem: false },
            filterBuilderPopup: { optionName: "filterBuilderPopup", isCollectionItem: false },
            filterPanel: { optionName: "filterPanel", isCollectionItem: false },
            filterRow: { optionName: "filterRow", isCollectionItem: false },
            headerFilter: { optionName: "headerFilter", isCollectionItem: false },
            keyboardNavigation: { optionName: "keyboardNavigation", isCollectionItem: false },
            loadPanel: { optionName: "loadPanel", isCollectionItem: false },
            pager: { optionName: "pager", isCollectionItem: false },
            paging: { optionName: "paging", isCollectionItem: false },
            remoteOperations: { optionName: "remoteOperations", isCollectionItem: false },
            rowDragging: { optionName: "rowDragging", isCollectionItem: false },
            scrolling: { optionName: "scrolling", isCollectionItem: false },
            searchPanel: { optionName: "searchPanel", isCollectionItem: false },
            selection: { optionName: "selection", isCollectionItem: false },
            sorting: { optionName: "sorting", isCollectionItem: false },
            stateStoring: { optionName: "stateStoring", isCollectionItem: false },
            treeListHeaderFilter: { optionName: "headerFilter", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(TreeList.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return TreeList;
}(component_1.Component));
exports.TreeList = TreeList;
TreeList.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowColumnReordering: PropTypes.bool,
    allowColumnResizing: PropTypes.bool,
    autoExpandAll: PropTypes.bool,
    autoNavigateToFocusedRow: PropTypes.bool,
    cacheEnabled: PropTypes.bool,
    cellHintEnabled: PropTypes.bool,
    columnAutoWidth: PropTypes.bool,
    columnChooser: PropTypes.object,
    columnFixing: PropTypes.object,
    columnHidingEnabled: PropTypes.bool,
    columnMinWidth: PropTypes.number,
    columnResizingMode: PropTypes.oneOf([
        "nextColumn",
        "widget"
    ]),
    columns: PropTypes.array,
    columnWidth: PropTypes.number,
    customizeColumns: PropTypes.func,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    dataStructure: PropTypes.oneOf([
        "plain",
        "tree"
    ]),
    dateSerializationFormat: PropTypes.string,
    disabled: PropTypes.bool,
    editing: PropTypes.object,
    elementAttr: PropTypes.object,
    errorRowEnabled: PropTypes.bool,
    expandedRowKeys: PropTypes.array,
    expandNodesOnFiltering: PropTypes.bool,
    filterBuilder: PropTypes.object,
    filterBuilderPopup: PropTypes.object,
    filterMode: PropTypes.oneOf([
        "fullBranch",
        "withAncestors",
        "matchOnly"
    ]),
    filterPanel: PropTypes.object,
    filterRow: PropTypes.object,
    filterSyncEnabled: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            "auto"
        ])
    ]),
    filterValue: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        PropTypes.string
    ]),
    focusedColumnIndex: PropTypes.number,
    focusedRowEnabled: PropTypes.bool,
    focusedRowIndex: PropTypes.number,
    focusStateEnabled: PropTypes.bool,
    hasItemsExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    headerFilter: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    highlightChanges: PropTypes.bool,
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    itemsExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    keyboardNavigation: PropTypes.object,
    keyExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    loadPanel: PropTypes.object,
    noDataText: PropTypes.string,
    onAdaptiveDetailRowPreparing: PropTypes.func,
    onCellClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onCellDblClick: PropTypes.func,
    onCellHoverChanged: PropTypes.func,
    onCellPrepared: PropTypes.func,
    onContentReady: PropTypes.func,
    onContextMenuPreparing: PropTypes.func,
    onDataErrorOccurred: PropTypes.func,
    onDisposing: PropTypes.func,
    onEditCanceled: PropTypes.func,
    onEditCanceling: PropTypes.func,
    onEditingStart: PropTypes.func,
    onEditorPrepared: PropTypes.func,
    onEditorPreparing: PropTypes.func,
    onFocusedCellChanged: PropTypes.func,
    onFocusedCellChanging: PropTypes.func,
    onFocusedRowChanged: PropTypes.func,
    onFocusedRowChanging: PropTypes.func,
    onInitialized: PropTypes.func,
    onInitNewRow: PropTypes.func,
    onKeyDown: PropTypes.func,
    onNodesInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onRowClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onRowCollapsed: PropTypes.func,
    onRowCollapsing: PropTypes.func,
    onRowDblClick: PropTypes.func,
    onRowExpanded: PropTypes.func,
    onRowExpanding: PropTypes.func,
    onRowInserted: PropTypes.func,
    onRowInserting: PropTypes.func,
    onRowPrepared: PropTypes.func,
    onRowRemoved: PropTypes.func,
    onRowRemoving: PropTypes.func,
    onRowUpdated: PropTypes.func,
    onRowUpdating: PropTypes.func,
    onRowValidating: PropTypes.func,
    onSaved: PropTypes.func,
    onSaving: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onToolbarPreparing: PropTypes.func,
    pager: PropTypes.object,
    paging: PropTypes.object,
    parentIdExpr: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    remoteOperations: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([
            "auto"
        ])
    ]),
    renderAsync: PropTypes.bool,
    repaintChangesOnly: PropTypes.bool,
    rowAlternationEnabled: PropTypes.bool,
    rowDragging: PropTypes.object,
    rtlEnabled: PropTypes.bool,
    scrolling: PropTypes.object,
    searchPanel: PropTypes.object,
    selectedRowKeys: PropTypes.array,
    selection: PropTypes.object,
    showBorders: PropTypes.bool,
    showColumnHeaders: PropTypes.bool,
    showColumnLines: PropTypes.bool,
    showRowLines: PropTypes.bool,
    sorting: PropTypes.object,
    stateStoring: PropTypes.object,
    tabIndex: PropTypes.number,
    twoWayBindingEnabled: PropTypes.bool,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    wordWrapEnabled: PropTypes.bool
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
    Button.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Button;
}(nested_option_1.default));
exports.Button = Button;
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
var Collision = /** @class */ (function (_super) {
    __extends(Collision, _super);
    function Collision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collision.OptionName = "collision";
    return Collision;
}(nested_option_1.default));
exports.Collision = Collision;
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
        columnHeaderFilter: { optionName: "headerFilter", isCollectionItem: false },
        columnLookup: { optionName: "lookup", isCollectionItem: false },
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
var ColumnChooser = /** @class */ (function (_super) {
    __extends(ColumnChooser, _super);
    function ColumnChooser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnChooser.OptionName = "columnChooser";
    return ColumnChooser;
}(nested_option_1.default));
exports.ColumnChooser = ColumnChooser;
var ColumnFixing = /** @class */ (function (_super) {
    __extends(ColumnFixing, _super);
    function ColumnFixing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnFixing.OptionName = "columnFixing";
    ColumnFixing.ExpectedChildren = {
        columnFixingTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    };
    return ColumnFixing;
}(nested_option_1.default));
exports.ColumnFixing = ColumnFixing;
var ColumnFixingTexts = /** @class */ (function (_super) {
    __extends(ColumnFixingTexts, _super);
    function ColumnFixingTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnFixingTexts.OptionName = "texts";
    return ColumnFixingTexts;
}(nested_option_1.default));
exports.ColumnFixingTexts = ColumnFixingTexts;
var ColumnHeaderFilter = /** @class */ (function (_super) {
    __extends(ColumnHeaderFilter, _super);
    function ColumnHeaderFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnHeaderFilter.OptionName = "headerFilter";
    return ColumnHeaderFilter;
}(nested_option_1.default));
exports.ColumnHeaderFilter = ColumnHeaderFilter;
var ColumnLookup = /** @class */ (function (_super) {
    __extends(ColumnLookup, _super);
    function ColumnLookup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ColumnLookup.OptionName = "lookup";
    return ColumnLookup;
}(nested_option_1.default));
exports.ColumnLookup = ColumnLookup;
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
var CursorOffset = /** @class */ (function (_super) {
    __extends(CursorOffset, _super);
    function CursorOffset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CursorOffset.OptionName = "cursorOffset";
    return CursorOffset;
}(nested_option_1.default));
exports.CursorOffset = CursorOffset;
var CustomOperation = /** @class */ (function (_super) {
    __extends(CustomOperation, _super);
    function CustomOperation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomOperation.OptionName = "customOperations";
    CustomOperation.IsCollectionItem = true;
    CustomOperation.TemplateProps = [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent",
            keyFn: "editorKeyFn"
        }];
    return CustomOperation;
}(nested_option_1.default));
exports.CustomOperation = CustomOperation;
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
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editing.OptionName = "editing";
    Editing.DefaultsProps = {
        defaultChanges: "changes",
        defaultEditColumnName: "editColumnName",
        defaultEditRowKey: "editRowKey"
    };
    Editing.ExpectedChildren = {
        editingTexts: { optionName: "texts", isCollectionItem: false },
        form: { optionName: "form", isCollectionItem: false },
        popup: { optionName: "popup", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    };
    return Editing;
}(nested_option_1.default));
exports.Editing = Editing;
var EditingTexts = /** @class */ (function (_super) {
    __extends(EditingTexts, _super);
    function EditingTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditingTexts.OptionName = "texts";
    return EditingTexts;
}(nested_option_1.default));
exports.EditingTexts = EditingTexts;
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
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.OptionName = "fields";
    Field.IsCollectionItem = true;
    Field.ExpectedChildren = {
        fieldLookup: { optionName: "lookup", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        lookup: { optionName: "lookup", isCollectionItem: false }
    };
    Field.TemplateProps = [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent",
            keyFn: "editorKeyFn"
        }];
    return Field;
}(nested_option_1.default));
exports.Field = Field;
var FieldLookup = /** @class */ (function (_super) {
    __extends(FieldLookup, _super);
    function FieldLookup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldLookup.OptionName = "lookup";
    return FieldLookup;
}(nested_option_1.default));
exports.FieldLookup = FieldLookup;
var FilterBuilder = /** @class */ (function (_super) {
    __extends(FilterBuilder, _super);
    function FilterBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterBuilder.OptionName = "filterBuilder";
    FilterBuilder.DefaultsProps = {
        defaultValue: "value"
    };
    FilterBuilder.ExpectedChildren = {
        customOperation: { optionName: "customOperations", isCollectionItem: true },
        field: { optionName: "fields", isCollectionItem: true },
        filterOperationDescriptions: { optionName: "filterOperationDescriptions", isCollectionItem: false },
        groupOperationDescriptions: { optionName: "groupOperationDescriptions", isCollectionItem: false }
    };
    return FilterBuilder;
}(nested_option_1.default));
exports.FilterBuilder = FilterBuilder;
var FilterBuilderPopup = /** @class */ (function (_super) {
    __extends(FilterBuilderPopup, _super);
    function FilterBuilderPopup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterBuilderPopup.OptionName = "filterBuilderPopup";
    FilterBuilderPopup.DefaultsProps = {
        defaultHeight: "height",
        defaultPosition: "position",
        defaultVisible: "visible",
        defaultWidth: "width"
    };
    FilterBuilderPopup.TemplateProps = [{
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
    return FilterBuilderPopup;
}(nested_option_1.default));
exports.FilterBuilderPopup = FilterBuilderPopup;
var FilterOperationDescriptions = /** @class */ (function (_super) {
    __extends(FilterOperationDescriptions, _super);
    function FilterOperationDescriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterOperationDescriptions.OptionName = "filterOperationDescriptions";
    return FilterOperationDescriptions;
}(nested_option_1.default));
exports.FilterOperationDescriptions = FilterOperationDescriptions;
var FilterPanel = /** @class */ (function (_super) {
    __extends(FilterPanel, _super);
    function FilterPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterPanel.OptionName = "filterPanel";
    FilterPanel.DefaultsProps = {
        defaultFilterEnabled: "filterEnabled"
    };
    FilterPanel.ExpectedChildren = {
        filterPanelTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    };
    return FilterPanel;
}(nested_option_1.default));
exports.FilterPanel = FilterPanel;
var FilterPanelTexts = /** @class */ (function (_super) {
    __extends(FilterPanelTexts, _super);
    function FilterPanelTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterPanelTexts.OptionName = "texts";
    return FilterPanelTexts;
}(nested_option_1.default));
exports.FilterPanelTexts = FilterPanelTexts;
var FilterRow = /** @class */ (function (_super) {
    __extends(FilterRow, _super);
    function FilterRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterRow.OptionName = "filterRow";
    FilterRow.ExpectedChildren = {
        operationDescriptions: { optionName: "operationDescriptions", isCollectionItem: false }
    };
    return FilterRow;
}(nested_option_1.default));
exports.FilterRow = FilterRow;
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    function Form() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Form.OptionName = "form";
    Form.DefaultsProps = {
        defaultFormData: "formData"
    };
    Form.ExpectedChildren = {
        ButtonItem: { optionName: "items", isCollectionItem: true },
        colCountByScreen: { optionName: "colCountByScreen", isCollectionItem: false },
        EmptyItem: { optionName: "items", isCollectionItem: true },
        GroupItem: { optionName: "items", isCollectionItem: true },
        item: { optionName: "items", isCollectionItem: true },
        SimpleItem: { optionName: "items", isCollectionItem: true },
        TabbedItem: { optionName: "items", isCollectionItem: true }
    };
    return Form;
}(nested_option_1.default));
exports.Form = Form;
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
var GroupOperationDescriptions = /** @class */ (function (_super) {
    __extends(GroupOperationDescriptions, _super);
    function GroupOperationDescriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupOperationDescriptions.OptionName = "groupOperationDescriptions";
    return GroupOperationDescriptions;
}(nested_option_1.default));
exports.GroupOperationDescriptions = GroupOperationDescriptions;
var HeaderFilter = /** @class */ (function (_super) {
    __extends(HeaderFilter, _super);
    function HeaderFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderFilter.OptionName = "headerFilter";
    return HeaderFilter;
}(nested_option_1.default));
exports.HeaderFilter = HeaderFilter;
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
var KeyboardNavigation = /** @class */ (function (_super) {
    __extends(KeyboardNavigation, _super);
    function KeyboardNavigation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KeyboardNavigation.OptionName = "keyboardNavigation";
    return KeyboardNavigation;
}(nested_option_1.default));
exports.KeyboardNavigation = KeyboardNavigation;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var LoadPanel = /** @class */ (function (_super) {
    __extends(LoadPanel, _super);
    function LoadPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadPanel.OptionName = "loadPanel";
    return LoadPanel;
}(nested_option_1.default));
exports.LoadPanel = LoadPanel;
var Lookup = /** @class */ (function (_super) {
    __extends(Lookup, _super);
    function Lookup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lookup.OptionName = "lookup";
    return Lookup;
}(nested_option_1.default));
exports.Lookup = Lookup;
var My = /** @class */ (function (_super) {
    __extends(My, _super);
    function My() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    My.OptionName = "my";
    return My;
}(nested_option_1.default));
exports.My = My;
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
var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Offset.OptionName = "offset";
    return Offset;
}(nested_option_1.default));
exports.Offset = Offset;
var OperationDescriptions = /** @class */ (function (_super) {
    __extends(OperationDescriptions, _super);
    function OperationDescriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OperationDescriptions.OptionName = "operationDescriptions";
    return OperationDescriptions;
}(nested_option_1.default));
exports.OperationDescriptions = OperationDescriptions;
var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pager.OptionName = "pager";
    return Pager;
}(nested_option_1.default));
exports.Pager = Pager;
var Paging = /** @class */ (function (_super) {
    __extends(Paging, _super);
    function Paging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Paging.OptionName = "paging";
    Paging.DefaultsProps = {
        defaultPageIndex: "pageIndex",
        defaultPageSize: "pageSize"
    };
    return Paging;
}(nested_option_1.default));
exports.Paging = Paging;
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
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Popup.OptionName = "popup";
    Popup.DefaultsProps = {
        defaultHeight: "height",
        defaultPosition: "position",
        defaultVisible: "visible",
        defaultWidth: "width"
    };
    Popup.ExpectedChildren = {
        animation: { optionName: "animation", isCollectionItem: false },
        position: { optionName: "position", isCollectionItem: false },
        toolbarItem: { optionName: "toolbarItems", isCollectionItem: true }
    };
    Popup.TemplateProps = [{
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
    return Popup;
}(nested_option_1.default));
exports.Popup = Popup;
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
var RemoteOperations = /** @class */ (function (_super) {
    __extends(RemoteOperations, _super);
    function RemoteOperations() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RemoteOperations.OptionName = "remoteOperations";
    return RemoteOperations;
}(nested_option_1.default));
exports.RemoteOperations = RemoteOperations;
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
var RowDragging = /** @class */ (function (_super) {
    __extends(RowDragging, _super);
    function RowDragging() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RowDragging.OptionName = "rowDragging";
    RowDragging.ExpectedChildren = {
        cursorOffset: { optionName: "cursorOffset", isCollectionItem: false }
    };
    RowDragging.TemplateProps = [{
            tmplOption: "dragTemplate",
            render: "dragRender",
            component: "dragComponent",
            keyFn: "dragKeyFn"
        }];
    return RowDragging;
}(nested_option_1.default));
exports.RowDragging = RowDragging;
var Scrolling = /** @class */ (function (_super) {
    __extends(Scrolling, _super);
    function Scrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scrolling.OptionName = "scrolling";
    return Scrolling;
}(nested_option_1.default));
exports.Scrolling = Scrolling;
var SearchPanel = /** @class */ (function (_super) {
    __extends(SearchPanel, _super);
    function SearchPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SearchPanel.OptionName = "searchPanel";
    SearchPanel.DefaultsProps = {
        defaultText: "text"
    };
    return SearchPanel;
}(nested_option_1.default));
exports.SearchPanel = SearchPanel;
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selection.OptionName = "selection";
    return Selection;
}(nested_option_1.default));
exports.Selection = Selection;
var Show = /** @class */ (function (_super) {
    __extends(Show, _super);
    function Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Show.OptionName = "show";
    return Show;
}(nested_option_1.default));
exports.Show = Show;
var SimpleItem = /** @class */ (function (_super) {
    __extends(SimpleItem, _super);
    function SimpleItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimpleItem.OptionName = "items";
    SimpleItem.IsCollectionItem = true;
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
var Sorting = /** @class */ (function (_super) {
    __extends(Sorting, _super);
    function Sorting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sorting.OptionName = "sorting";
    return Sorting;
}(nested_option_1.default));
exports.Sorting = Sorting;
var StateStoring = /** @class */ (function (_super) {
    __extends(StateStoring, _super);
    function StateStoring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StateStoring.OptionName = "stateStoring";
    return StateStoring;
}(nested_option_1.default));
exports.StateStoring = StateStoring;
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
var Texts = /** @class */ (function (_super) {
    __extends(Texts, _super);
    function Texts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Texts.OptionName = "texts";
    return Texts;
}(nested_option_1.default));
exports.Texts = Texts;
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
var TreeListHeaderFilter = /** @class */ (function (_super) {
    __extends(TreeListHeaderFilter, _super);
    function TreeListHeaderFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeListHeaderFilter.OptionName = "headerFilter";
    TreeListHeaderFilter.ExpectedChildren = {
        texts: { optionName: "texts", isCollectionItem: false },
        treeListHeaderFilterTexts: { optionName: "texts", isCollectionItem: false }
    };
    return TreeListHeaderFilter;
}(nested_option_1.default));
exports.TreeListHeaderFilter = TreeListHeaderFilter;
var TreeListHeaderFilterTexts = /** @class */ (function (_super) {
    __extends(TreeListHeaderFilterTexts, _super);
    function TreeListHeaderFilterTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeListHeaderFilterTexts.OptionName = "texts";
    return TreeListHeaderFilterTexts;
}(nested_option_1.default));
exports.TreeListHeaderFilterTexts = TreeListHeaderFilterTexts;
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
exports.default = TreeList;
