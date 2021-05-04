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

/// <reference types="react" />
import dxDataGrid, { IOptions } from "devextreme/ui/data_grid";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IDataGridOptions extends IOptions, IHtmlOptions {
    rowRender?: (...params: any) => React.ReactNode;
    rowComponent?: React.ComponentType<any>;
    rowKeyFn?: (data: any) => string;
    defaultColumns?: any;
    defaultEditing?: any;
    defaultFilterPanel?: any;
    defaultFilterValue?: any;
    defaultFocusedColumnIndex?: any;
    defaultFocusedRowIndex?: any;
    defaultFocusedRowKey?: any;
    defaultPaging?: any;
    defaultSearchPanel?: any;
    defaultSelectedRowKeys?: any;
    defaultSelectionFilter?: any;
    onColumnsChange?: (value: any) => void;
    onEditingChange?: (value: any) => void;
    onFilterPanelChange?: (value: any) => void;
    onFilterValueChange?: (value: any) => void;
    onFocusedColumnIndexChange?: (value: any) => void;
    onFocusedRowIndexChange?: (value: any) => void;
    onFocusedRowKeyChange?: (value: any) => void;
    onPagingChange?: (value: any) => void;
    onSearchPanelChange?: (value: any) => void;
    onSelectedRowKeysChange?: (value: any) => void;
    onSelectionFilterChange?: (value: any) => void;
}
declare class DataGrid extends BaseComponent<IDataGridOptions> {
    get instance(): dxDataGrid;
    protected _WidgetClass: typeof dxDataGrid;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultColumns: string;
        defaultEditing: string;
        defaultFilterPanel: string;
        defaultFilterValue: string;
        defaultFocusedColumnIndex: string;
        defaultFocusedRowIndex: string;
        defaultFocusedRowKey: string;
        defaultPaging: string;
        defaultSearchPanel: string;
        defaultSelectedRowKeys: string;
        defaultSelectionFilter: string;
    };
    protected _expectedChildren: {
        column: {
            optionName: string;
            isCollectionItem: boolean;
        };
        columnChooser: {
            optionName: string;
            isCollectionItem: boolean;
        };
        columnFixing: {
            optionName: string;
            isCollectionItem: boolean;
        };
        dataGridHeaderFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        editing: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        filterBuilder: {
            optionName: string;
            isCollectionItem: boolean;
        };
        filterBuilderPopup: {
            optionName: string;
            isCollectionItem: boolean;
        };
        filterPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        filterRow: {
            optionName: string;
            isCollectionItem: boolean;
        };
        grouping: {
            optionName: string;
            isCollectionItem: boolean;
        };
        groupPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        headerFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        keyboardNavigation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        loadPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        masterDetail: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pager: {
            optionName: string;
            isCollectionItem: boolean;
        };
        paging: {
            optionName: string;
            isCollectionItem: boolean;
        };
        remoteOperations: {
            optionName: string;
            isCollectionItem: boolean;
        };
        rowDragging: {
            optionName: string;
            isCollectionItem: boolean;
        };
        scrolling: {
            optionName: string;
            isCollectionItem: boolean;
        };
        searchPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        selection: {
            optionName: string;
            isCollectionItem: boolean;
        };
        sortByGroupSummaryInfo: {
            optionName: string;
            isCollectionItem: boolean;
        };
        sorting: {
            optionName: string;
            isCollectionItem: boolean;
        };
        stateStoring: {
            optionName: string;
            isCollectionItem: boolean;
        };
        summary: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IAnimationProps {
    hide?: any;
    show?: any;
}
declare class Animation extends NestedOption<IAnimationProps> {
    static OptionName: string;
    static ExpectedChildren: {
        hide: {
            optionName: string;
            isCollectionItem: boolean;
        };
        show: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IAsyncRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    reevaluate?: any;
    type?: any;
    validationCallback?: any;
}
declare class AsyncRule extends NestedOption<IAsyncRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IAtProps {
    x?: any;
    y?: any;
}
declare class At extends NestedOption<IAtProps> {
    static OptionName: string;
}
interface IBoundaryOffsetProps {
    x?: any;
    y?: any;
}
declare class BoundaryOffset extends NestedOption<IBoundaryOffsetProps> {
    static OptionName: string;
}
interface IButtonProps {
    cssClass?: any;
    hint?: any;
    icon?: any;
    name?: any;
    onClick?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Button extends NestedOption<IButtonProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IColCountByScreenProps {
    lg?: any;
    md?: any;
    sm?: any;
    xs?: any;
}
declare class ColCountByScreen extends NestedOption<IColCountByScreenProps> {
    static OptionName: string;
}
interface ICollisionProps {
    x?: any;
    y?: any;
}
declare class Collision extends NestedOption<ICollisionProps> {
    static OptionName: string;
}
interface IColumnProps {
    alignment?: any;
    allowEditing?: any;
    allowExporting?: any;
    allowFiltering?: any;
    allowFixing?: any;
    allowGrouping?: any;
    allowHeaderFiltering?: any;
    allowHiding?: any;
    allowReordering?: any;
    allowResizing?: any;
    allowSearch?: any;
    allowSorting?: any;
    autoExpandGroup?: any;
    buttons?: any;
    calculateCellValue?: any;
    calculateDisplayValue?: any;
    calculateFilterExpression?: any;
    calculateGroupValue?: any;
    calculateSortValue?: any;
    caption?: any;
    cellTemplate?: any;
    columns?: any;
    cssClass?: any;
    customizeText?: any;
    dataField?: any;
    dataType?: any;
    editCellTemplate?: any;
    editorOptions?: any;
    encodeHtml?: any;
    falseText?: any;
    filterOperations?: any;
    filterType?: any;
    filterValue?: any;
    filterValues?: any;
    fixed?: any;
    fixedPosition?: any;
    format?: any;
    formItem?: any;
    groupCellTemplate?: any;
    grouped?: any;
    groupIndex?: any;
    headerCellTemplate?: any;
    headerFilter?: {
        allowSearch?: any;
        dataSource?: any;
        groupInterval?: any;
        height?: any;
        searchMode?: any;
        width?: any;
    };
    hidingPriority?: any;
    isBand?: any;
    lookup?: {
        allowClearing?: any;
        dataSource?: any;
        displayExpr?: any;
        valueExpr?: any;
    };
    minWidth?: any;
    name?: any;
    ownerBand?: any;
    renderAsync?: any;
    resized?: any;
    selectedFilterOperation?: any;
    setCellValue?: any;
    showEditorAlways?: any;
    showInColumnChooser?: any;
    showWhenGrouped?: any;
    sortIndex?: any;
    sortingMethod?: any;
    sortOrder?: any;
    trueText?: any;
    type?: any;
    validationRules?: any;
    visible?: any;
    visibleIndex?: any;
    width?: any;
    defaultFilterValue?: any;
    onFilterValueChange?: (value: any) => void;
    defaultFilterValues?: any;
    onFilterValuesChange?: (value: any) => void;
    defaultGroupIndex?: any;
    onGroupIndexChange?: (value: any) => void;
    defaultSelectedFilterOperation?: any;
    onSelectedFilterOperationChange?: (value: any) => void;
    defaultSortIndex?: any;
    onSortIndexChange?: (value: any) => void;
    defaultSortOrder?: any;
    onSortOrderChange?: (value: any) => void;
    defaultVisible?: any;
    onVisibleChange?: (value: any) => void;
    defaultVisibleIndex?: any;
    onVisibleIndexChange?: (value: any) => void;
    cellRender?: (...params: any) => React.ReactNode;
    cellComponent?: React.ComponentType<any>;
    cellKeyFn?: (data: any) => string;
    editCellRender?: (...params: any) => React.ReactNode;
    editCellComponent?: React.ComponentType<any>;
    editCellKeyFn?: (data: any) => string;
    groupCellRender?: (...params: any) => React.ReactNode;
    groupCellComponent?: React.ComponentType<any>;
    groupCellKeyFn?: (data: any) => string;
    headerCellRender?: (...params: any) => React.ReactNode;
    headerCellComponent?: React.ComponentType<any>;
    headerCellKeyFn?: (data: any) => string;
}
declare class Column extends NestedOption<IColumnProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static DefaultsProps: {
        defaultFilterValue: string;
        defaultFilterValues: string;
        defaultGroupIndex: string;
        defaultSelectedFilterOperation: string;
        defaultSortIndex: string;
        defaultSortOrder: string;
        defaultVisible: string;
        defaultVisibleIndex: string;
    };
    static ExpectedChildren: {
        AsyncRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        button: {
            optionName: string;
            isCollectionItem: boolean;
        };
        columnHeaderFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        columnLookup: {
            optionName: string;
            isCollectionItem: boolean;
        };
        CompareRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        CustomRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        EmailRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
        formItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        headerFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        lookup: {
            optionName: string;
            isCollectionItem: boolean;
        };
        NumericRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        PatternRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        RangeRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        RequiredRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        StringLengthRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        validationRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IColumnChooserProps {
    allowSearch?: any;
    emptyPanelText?: any;
    enabled?: any;
    height?: any;
    mode?: any;
    searchTimeout?: any;
    title?: any;
    width?: any;
}
declare class ColumnChooser extends NestedOption<IColumnChooserProps> {
    static OptionName: string;
}
interface IColumnFixingProps {
    enabled?: any;
    texts?: {
        fix?: any;
        leftPosition?: any;
        rightPosition?: any;
        unfix?: any;
    };
}
declare class ColumnFixing extends NestedOption<IColumnFixingProps> {
    static OptionName: string;
    static ExpectedChildren: {
        columnFixingTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IColumnFixingTextsProps {
    fix?: any;
    leftPosition?: any;
    rightPosition?: any;
    unfix?: any;
}
declare class ColumnFixingTexts extends NestedOption<IColumnFixingTextsProps> {
    static OptionName: string;
}
interface IColumnHeaderFilterProps {
    allowSearch?: any;
    dataSource?: any;
    groupInterval?: any;
    height?: any;
    searchMode?: any;
    width?: any;
}
declare class ColumnHeaderFilter extends NestedOption<IColumnHeaderFilterProps> {
    static OptionName: string;
}
interface IColumnLookupProps {
    allowClearing?: any;
    dataSource?: any;
    displayExpr?: any;
    valueExpr?: any;
}
declare class ColumnLookup extends NestedOption<IColumnLookupProps> {
    static OptionName: string;
}
interface ICompareRuleProps {
    comparisonTarget?: any;
    comparisonType?: any;
    ignoreEmptyValue?: any;
    message?: any;
    reevaluate?: any;
    type?: any;
}
declare class CompareRule extends NestedOption<ICompareRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface ICursorOffsetProps {
    x?: any;
    y?: any;
}
declare class CursorOffset extends NestedOption<ICursorOffsetProps> {
    static OptionName: string;
}
interface ICustomOperationProps {
    calculateFilterExpression?: any;
    caption?: any;
    customizeText?: any;
    dataTypes?: any;
    editorTemplate?: any;
    hasValue?: any;
    icon?: any;
    name?: any;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
    editorKeyFn?: (data: any) => string;
}
declare class CustomOperation extends NestedOption<ICustomOperationProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface ICustomRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    reevaluate?: any;
    type?: any;
    validationCallback?: any;
}
declare class CustomRule extends NestedOption<ICustomRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IDataGridHeaderFilterProps {
    allowSearch?: any;
    height?: any;
    searchTimeout?: any;
    texts?: {
        cancel?: any;
        emptyValue?: any;
        ok?: any;
    };
    visible?: any;
    width?: any;
}
declare class DataGridHeaderFilter extends NestedOption<IDataGridHeaderFilterProps> {
    static OptionName: string;
    static ExpectedChildren: {
        dataGridHeaderFilterTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IDataGridHeaderFilterTextsProps {
    cancel?: any;
    emptyValue?: any;
    ok?: any;
}
declare class DataGridHeaderFilterTexts extends NestedOption<IDataGridHeaderFilterTextsProps> {
    static OptionName: string;
}
interface IEditingProps {
    allowAdding?: any;
    allowDeleting?: any;
    allowUpdating?: any;
    changes?: any;
    confirmDelete?: any;
    editColumnName?: any;
    editRowKey?: any;
    form?: any;
    mode?: any;
    popup?: any;
    refreshMode?: any;
    selectTextOnEditStart?: any;
    startEditAction?: any;
    texts?: {
        addRow?: any;
        cancelAllChanges?: any;
        cancelRowChanges?: any;
        confirmDeleteMessage?: any;
        confirmDeleteTitle?: any;
        deleteRow?: any;
        editRow?: any;
        saveAllChanges?: any;
        saveRowChanges?: any;
        undeleteRow?: any;
        validationCancelChanges?: any;
    };
    useIcons?: any;
    defaultChanges?: any;
    onChangesChange?: (value: any) => void;
    defaultEditColumnName?: any;
    onEditColumnNameChange?: (value: any) => void;
    defaultEditRowKey?: any;
    onEditRowKeyChange?: (value: any) => void;
}
declare class Editing extends NestedOption<IEditingProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultChanges: string;
        defaultEditColumnName: string;
        defaultEditRowKey: string;
    };
    static ExpectedChildren: {
        editingTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        form: {
            optionName: string;
            isCollectionItem: boolean;
        };
        popup: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IEditingTextsProps {
    addRow?: any;
    cancelAllChanges?: any;
    cancelRowChanges?: any;
    confirmDeleteMessage?: any;
    confirmDeleteTitle?: any;
    deleteRow?: any;
    editRow?: any;
    saveAllChanges?: any;
    saveRowChanges?: any;
    undeleteRow?: any;
    validationCancelChanges?: any;
}
declare class EditingTexts extends NestedOption<IEditingTextsProps> {
    static OptionName: string;
}
interface IEmailRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    type?: any;
}
declare class EmailRule extends NestedOption<IEmailRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IExportProps {
    allowExportSelectedData?: any;
    customizeExcelCell?: any;
    enabled?: any;
    excelFilterEnabled?: any;
    excelWrapTextEnabled?: any;
    fileName?: any;
    ignoreExcelErrors?: any;
    proxyUrl?: any;
    texts?: {
        exportAll?: any;
        exportSelectedRows?: any;
        exportTo?: any;
    };
}
declare class Export extends NestedOption<IExportProps> {
    static OptionName: string;
    static ExpectedChildren: {
        exportTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IExportTextsProps {
    exportAll?: any;
    exportSelectedRows?: any;
    exportTo?: any;
}
declare class ExportTexts extends NestedOption<IExportTextsProps> {
    static OptionName: string;
}
interface IFieldProps {
    calculateFilterExpression?: any;
    caption?: any;
    customizeText?: any;
    dataField?: any;
    dataType?: any;
    defaultFilterOperation?: any;
    editorOptions?: any;
    editorTemplate?: any;
    falseText?: any;
    filterOperations?: any;
    format?: any;
    lookup?: {
        allowClearing?: any;
        dataSource?: any;
        displayExpr?: any;
        valueExpr?: any;
    };
    name?: any;
    trueText?: any;
    editorRender?: (...params: any) => React.ReactNode;
    editorComponent?: React.ComponentType<any>;
    editorKeyFn?: (data: any) => string;
}
declare class Field extends NestedOption<IFieldProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        fieldLookup: {
            optionName: string;
            isCollectionItem: boolean;
        };
        format: {
            optionName: string;
            isCollectionItem: boolean;
        };
        lookup: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IFieldLookupProps {
    allowClearing?: any;
    dataSource?: any;
    displayExpr?: any;
    valueExpr?: any;
}
declare class FieldLookup extends NestedOption<IFieldLookupProps> {
    static OptionName: string;
}
interface IFilterBuilderProps {
    accessKey?: any;
    activeStateEnabled?: any;
    allowHierarchicalFields?: any;
    bindingOptions?: any;
    customOperations?: any;
    defaultGroupOperation?: any;
    disabled?: any;
    elementAttr?: any;
    fields?: any;
    filterOperationDescriptions?: {
        between?: any;
        contains?: any;
        endsWith?: any;
        equal?: any;
        greaterThan?: any;
        greaterThanOrEqual?: any;
        isBlank?: any;
        isNotBlank?: any;
        lessThan?: any;
        lessThanOrEqual?: any;
        notContains?: any;
        notEqual?: any;
        startsWith?: any;
    };
    focusStateEnabled?: any;
    groupOperationDescriptions?: {
        and?: any;
        notAnd?: any;
        notOr?: any;
        or?: any;
    };
    groupOperations?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    maxGroupLevel?: any;
    onContentReady?: any;
    onDisposing?: any;
    onEditorPrepared?: any;
    onEditorPreparing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    onValueChanged?: any;
    rtlEnabled?: any;
    tabIndex?: any;
    value?: any;
    visible?: any;
    width?: any;
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class FilterBuilder extends NestedOption<IFilterBuilderProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultValue: string;
    };
    static ExpectedChildren: {
        customOperation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        field: {
            optionName: string;
            isCollectionItem: boolean;
        };
        filterOperationDescriptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
        groupOperationDescriptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFilterBuilderPopupProps {
    accessKey?: any;
    activeStateEnabled?: any;
    animation?: {
        hide?: any;
        show?: any;
    };
    bindingOptions?: any;
    closeOnOutsideClick?: any;
    container?: any;
    contentTemplate?: any;
    deferRendering?: any;
    disabled?: any;
    dragEnabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    fullScreen?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    maxHeight?: any;
    maxWidth?: any;
    minHeight?: any;
    minWidth?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onHidden?: any;
    onHiding?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    onResize?: any;
    onResizeEnd?: any;
    onResizeStart?: any;
    onShowing?: any;
    onShown?: any;
    onTitleRendered?: any;
    position?: any;
    resizeEnabled?: any;
    rtlEnabled?: any;
    shading?: any;
    shadingColor?: any;
    showCloseButton?: any;
    showTitle?: any;
    tabIndex?: any;
    title?: any;
    titleTemplate?: any;
    toolbarItems?: {
        disabled?: any;
        html?: any;
        location?: any;
        options?: any;
        template?: any;
        text?: any;
        toolbar?: any;
        visible?: any;
        widget?: any;
    }[];
    visible?: any;
    width?: any;
    defaultHeight?: any;
    onHeightChange?: (value: any) => void;
    defaultPosition?: any;
    onPositionChange?: (value: any) => void;
    defaultVisible?: any;
    onVisibleChange?: (value: any) => void;
    defaultWidth?: any;
    onWidthChange?: (value: any) => void;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
    titleKeyFn?: (data: any) => string;
}
declare class FilterBuilderPopup extends NestedOption<IFilterBuilderPopupProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultHeight: string;
        defaultPosition: string;
        defaultVisible: string;
        defaultWidth: string;
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IFilterOperationDescriptionsProps {
    between?: any;
    contains?: any;
    endsWith?: any;
    equal?: any;
    greaterThan?: any;
    greaterThanOrEqual?: any;
    isBlank?: any;
    isNotBlank?: any;
    lessThan?: any;
    lessThanOrEqual?: any;
    notContains?: any;
    notEqual?: any;
    startsWith?: any;
}
declare class FilterOperationDescriptions extends NestedOption<IFilterOperationDescriptionsProps> {
    static OptionName: string;
}
interface IFilterPanelProps {
    customizeText?: any;
    filterEnabled?: any;
    texts?: {
        clearFilter?: any;
        createFilter?: any;
        filterEnabledHint?: any;
    };
    visible?: any;
    defaultFilterEnabled?: any;
    onFilterEnabledChange?: (value: any) => void;
}
declare class FilterPanel extends NestedOption<IFilterPanelProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultFilterEnabled: string;
    };
    static ExpectedChildren: {
        filterPanelTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFilterPanelTextsProps {
    clearFilter?: any;
    createFilter?: any;
    filterEnabledHint?: any;
}
declare class FilterPanelTexts extends NestedOption<IFilterPanelTextsProps> {
    static OptionName: string;
}
interface IFilterRowProps {
    applyFilter?: any;
    applyFilterText?: any;
    betweenEndText?: any;
    betweenStartText?: any;
    operationDescriptions?: {
        between?: any;
        contains?: any;
        endsWith?: any;
        equal?: any;
        greaterThan?: any;
        greaterThanOrEqual?: any;
        lessThan?: any;
        lessThanOrEqual?: any;
        notContains?: any;
        notEqual?: any;
        startsWith?: any;
    };
    resetOperationText?: any;
    showAllText?: any;
    showOperationChooser?: any;
    visible?: any;
}
declare class FilterRow extends NestedOption<IFilterRowProps> {
    static OptionName: string;
    static ExpectedChildren: {
        operationDescriptions: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFormProps {
    accessKey?: any;
    activeStateEnabled?: any;
    alignItemLabels?: any;
    alignItemLabelsInAllGroups?: any;
    bindingOptions?: any;
    colCount?: any;
    colCountByScreen?: {
        lg?: any;
        md?: any;
        sm?: any;
        xs?: any;
    };
    customizeItem?: any;
    disabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    formData?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    items?: any;
    labelLocation?: any;
    minColWidth?: any;
    onContentReady?: any;
    onDisposing?: any;
    onEditorEnterKey?: any;
    onFieldDataChanged?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    optionalMark?: any;
    readOnly?: any;
    requiredMark?: any;
    requiredMessage?: any;
    rtlEnabled?: any;
    screenByWidth?: any;
    scrollingEnabled?: any;
    showColonAfterLabel?: any;
    showOptionalMark?: any;
    showRequiredMark?: any;
    showValidationSummary?: any;
    tabIndex?: any;
    validationGroup?: any;
    visible?: any;
    width?: any;
    defaultFormData?: any;
    onFormDataChange?: (value: any) => void;
}
declare class Form extends NestedOption<IFormProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultFormData: string;
    };
    static ExpectedChildren: {
        colCountByScreen: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFormatProps {
    currency?: any;
    formatter?: any;
    parser?: any;
    precision?: any;
    type?: any;
}
declare class Format extends NestedOption<IFormatProps> {
    static OptionName: string;
}
interface IFormItemProps {
    colSpan?: any;
    cssClass?: any;
    dataField?: any;
    editorOptions?: any;
    editorType?: any;
    helpText?: any;
    isRequired?: any;
    itemType?: any;
    label?: {
        alignment?: any;
        location?: any;
        showColon?: any;
        text?: any;
        visible?: any;
    };
    name?: any;
    template?: any;
    validationRules?: any;
    visible?: any;
    visibleIndex?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class FormItem extends NestedOption<IFormItemProps> {
    static OptionName: string;
    static ExpectedChildren: {
        AsyncRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        CompareRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        CustomRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        EmailRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        label: {
            optionName: string;
            isCollectionItem: boolean;
        };
        NumericRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        PatternRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        RangeRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        RequiredRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        StringLengthRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
        validationRule: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IGroupingProps {
    allowCollapsing?: any;
    autoExpandAll?: any;
    contextMenuEnabled?: any;
    expandMode?: any;
    texts?: {
        groupByThisColumn?: any;
        groupContinuedMessage?: any;
        groupContinuesMessage?: any;
        ungroup?: any;
        ungroupAll?: any;
    };
}
declare class Grouping extends NestedOption<IGroupingProps> {
    static OptionName: string;
    static ExpectedChildren: {
        groupingTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IGroupingTextsProps {
    groupByThisColumn?: any;
    groupContinuedMessage?: any;
    groupContinuesMessage?: any;
    ungroup?: any;
    ungroupAll?: any;
}
declare class GroupingTexts extends NestedOption<IGroupingTextsProps> {
    static OptionName: string;
}
interface IGroupItemProps {
    alignByColumn?: any;
    column?: any;
    customizeText?: any;
    displayFormat?: any;
    name?: any;
    showInColumn?: any;
    showInGroupFooter?: any;
    skipEmptyValues?: any;
    summaryType?: any;
    valueFormat?: any;
}
declare class GroupItem extends NestedOption<IGroupItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        valueFormat: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IGroupOperationDescriptionsProps {
    and?: any;
    notAnd?: any;
    notOr?: any;
    or?: any;
}
declare class GroupOperationDescriptions extends NestedOption<IGroupOperationDescriptionsProps> {
    static OptionName: string;
}
interface IGroupPanelProps {
    allowColumnDragging?: any;
    emptyPanelText?: any;
    visible?: any;
}
declare class GroupPanel extends NestedOption<IGroupPanelProps> {
    static OptionName: string;
}
interface IHeaderFilterProps {
    allowSearch?: any;
    dataSource?: any;
    groupInterval?: any;
    height?: any;
    searchMode?: any;
    width?: any;
    searchTimeout?: any;
    texts?: {
        cancel?: any;
        emptyValue?: any;
        ok?: any;
    };
    visible?: any;
}
declare class HeaderFilter extends NestedOption<IHeaderFilterProps> {
    static OptionName: string;
}
interface IHideProps {
    complete?: any;
    delay?: any;
    direction?: any;
    duration?: any;
    easing?: any;
    from?: any;
    staggerDelay?: any;
    start?: any;
    to?: any;
    type?: any;
}
declare class Hide extends NestedOption<IHideProps> {
    static OptionName: string;
}
interface IKeyboardNavigationProps {
    editOnKeyPress?: any;
    enabled?: any;
    enterKeyAction?: any;
    enterKeyDirection?: any;
}
declare class KeyboardNavigation extends NestedOption<IKeyboardNavigationProps> {
    static OptionName: string;
}
interface ILabelProps {
    alignment?: any;
    location?: any;
    showColon?: any;
    text?: any;
    visible?: any;
}
declare class Label extends NestedOption<ILabelProps> {
    static OptionName: string;
}
interface ILoadPanelProps {
    enabled?: any;
    height?: any;
    indicatorSrc?: any;
    shading?: any;
    shadingColor?: any;
    showIndicator?: any;
    showPane?: any;
    text?: any;
    width?: any;
}
declare class LoadPanel extends NestedOption<ILoadPanelProps> {
    static OptionName: string;
}
interface ILookupProps {
    allowClearing?: any;
    dataSource?: any;
    displayExpr?: any;
    valueExpr?: any;
}
declare class Lookup extends NestedOption<ILookupProps> {
    static OptionName: string;
}
interface IMasterDetailProps {
    autoExpandAll?: any;
    enabled?: any;
    template?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class MasterDetail extends NestedOption<IMasterDetailProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IMyProps {
    x?: any;
    y?: any;
}
declare class My extends NestedOption<IMyProps> {
    static OptionName: string;
}
interface INumericRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    type?: any;
}
declare class NumericRule extends NestedOption<INumericRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IOffsetProps {
    x?: any;
    y?: any;
}
declare class Offset extends NestedOption<IOffsetProps> {
    static OptionName: string;
}
interface IOperationDescriptionsProps {
    between?: any;
    contains?: any;
    endsWith?: any;
    equal?: any;
    greaterThan?: any;
    greaterThanOrEqual?: any;
    lessThan?: any;
    lessThanOrEqual?: any;
    notContains?: any;
    notEqual?: any;
    startsWith?: any;
}
declare class OperationDescriptions extends NestedOption<IOperationDescriptionsProps> {
    static OptionName: string;
}
interface IPagerProps {
    allowedPageSizes?: any;
    infoText?: any;
    showInfo?: any;
    showNavigationButtons?: any;
    showPageSizeSelector?: any;
    visible?: any;
}
declare class Pager extends NestedOption<IPagerProps> {
    static OptionName: string;
}
interface IPagingProps {
    enabled?: any;
    pageIndex?: any;
    pageSize?: any;
    defaultPageIndex?: any;
    onPageIndexChange?: (value: any) => void;
    defaultPageSize?: any;
    onPageSizeChange?: (value: any) => void;
}
declare class Paging extends NestedOption<IPagingProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultPageIndex: string;
        defaultPageSize: string;
    };
}
interface IPatternRuleProps {
    ignoreEmptyValue?: any;
    message?: any;
    pattern?: any;
    type?: any;
}
declare class PatternRule extends NestedOption<IPatternRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IPopupProps {
    accessKey?: any;
    activeStateEnabled?: any;
    animation?: {
        hide?: any;
        show?: any;
    };
    bindingOptions?: any;
    closeOnOutsideClick?: any;
    container?: any;
    contentTemplate?: any;
    deferRendering?: any;
    disabled?: any;
    dragEnabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    fullScreen?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    maxHeight?: any;
    maxWidth?: any;
    minHeight?: any;
    minWidth?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onHidden?: any;
    onHiding?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    onResize?: any;
    onResizeEnd?: any;
    onResizeStart?: any;
    onShowing?: any;
    onShown?: any;
    onTitleRendered?: any;
    position?: any;
    resizeEnabled?: any;
    rtlEnabled?: any;
    shading?: any;
    shadingColor?: any;
    showCloseButton?: any;
    showTitle?: any;
    tabIndex?: any;
    title?: any;
    titleTemplate?: any;
    toolbarItems?: {
        disabled?: any;
        html?: any;
        location?: any;
        options?: any;
        template?: any;
        text?: any;
        toolbar?: any;
        visible?: any;
        widget?: any;
    }[];
    visible?: any;
    width?: any;
    defaultHeight?: any;
    onHeightChange?: (value: any) => void;
    defaultPosition?: any;
    onPositionChange?: (value: any) => void;
    defaultVisible?: any;
    onVisibleChange?: (value: any) => void;
    defaultWidth?: any;
    onWidthChange?: (value: any) => void;
    contentRender?: (...params: any) => React.ReactNode;
    contentComponent?: React.ComponentType<any>;
    contentKeyFn?: (data: any) => string;
    titleRender?: (...params: any) => React.ReactNode;
    titleComponent?: React.ComponentType<any>;
    titleKeyFn?: (data: any) => string;
}
declare class Popup extends NestedOption<IPopupProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultHeight: string;
        defaultPosition: string;
        defaultVisible: string;
        defaultWidth: string;
    };
    static ExpectedChildren: {
        animation: {
            optionName: string;
            isCollectionItem: boolean;
        };
        position: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbarItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IPositionProps {
    at?: {
        x?: any;
        y?: any;
    };
    boundary?: any;
    boundaryOffset?: {
        x?: any;
        y?: any;
    };
    collision?: {
        x?: any;
        y?: any;
    };
    my?: {
        x?: any;
        y?: any;
    };
    of?: any;
    offset?: {
        x?: any;
        y?: any;
    };
}
declare class Position extends NestedOption<IPositionProps> {
    static OptionName: string;
    static ExpectedChildren: {
        at: {
            optionName: string;
            isCollectionItem: boolean;
        };
        boundaryOffset: {
            optionName: string;
            isCollectionItem: boolean;
        };
        collision: {
            optionName: string;
            isCollectionItem: boolean;
        };
        my: {
            optionName: string;
            isCollectionItem: boolean;
        };
        offset: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IRangeRuleProps {
    ignoreEmptyValue?: any;
    max?: any;
    message?: any;
    min?: any;
    reevaluate?: any;
    type?: any;
}
declare class RangeRule extends NestedOption<IRangeRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IRemoteOperationsProps {
    filtering?: any;
    grouping?: any;
    groupPaging?: any;
    paging?: any;
    sorting?: any;
    summary?: any;
}
declare class RemoteOperations extends NestedOption<IRemoteOperationsProps> {
    static OptionName: string;
}
interface IRequiredRuleProps {
    message?: any;
    trim?: any;
    type?: any;
}
declare class RequiredRule extends NestedOption<IRequiredRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IRowDraggingProps {
    allowDropInsideItem?: any;
    allowReordering?: any;
    autoScroll?: any;
    boundary?: any;
    container?: any;
    cursorOffset?: {
        x?: any;
        y?: any;
    };
    data?: any;
    dragDirection?: any;
    dragTemplate?: any;
    dropFeedbackMode?: any;
    filter?: any;
    group?: any;
    handle?: any;
    onAdd?: any;
    onDragChange?: any;
    onDragEnd?: any;
    onDragMove?: any;
    onDragStart?: any;
    onRemove?: any;
    onReorder?: any;
    scrollSensitivity?: any;
    scrollSpeed?: any;
    showDragIcons?: any;
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
    dragKeyFn?: (data: any) => string;
}
declare class RowDragging extends NestedOption<IRowDraggingProps> {
    static OptionName: string;
    static ExpectedChildren: {
        cursorOffset: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IScrollingProps {
    columnRenderingMode?: any;
    mode?: any;
    preloadEnabled?: any;
    rowRenderingMode?: any;
    scrollByContent?: any;
    scrollByThumb?: any;
    showScrollbar?: any;
    useNative?: any;
}
declare class Scrolling extends NestedOption<IScrollingProps> {
    static OptionName: string;
}
interface ISearchPanelProps {
    highlightCaseSensitive?: any;
    highlightSearchText?: any;
    placeholder?: any;
    searchVisibleColumnsOnly?: any;
    text?: any;
    visible?: any;
    width?: any;
    defaultText?: any;
    onTextChange?: (value: any) => void;
}
declare class SearchPanel extends NestedOption<ISearchPanelProps> {
    static OptionName: string;
    static DefaultsProps: {
        defaultText: string;
    };
}
interface ISelectionProps {
    allowSelectAll?: any;
    deferred?: any;
    maxFilterLengthInRequest?: any;
    mode?: any;
    selectAllMode?: any;
    showCheckBoxesMode?: any;
}
declare class Selection extends NestedOption<ISelectionProps> {
    static OptionName: string;
}
interface IShowProps {
    complete?: any;
    delay?: any;
    direction?: any;
    duration?: any;
    easing?: any;
    from?: any;
    staggerDelay?: any;
    start?: any;
    to?: any;
    type?: any;
}
declare class Show extends NestedOption<IShowProps> {
    static OptionName: string;
}
interface ISortByGroupSummaryInfoProps {
    groupColumn?: any;
    sortOrder?: any;
    summaryItem?: any;
}
declare class SortByGroupSummaryInfo extends NestedOption<ISortByGroupSummaryInfoProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface ISortingProps {
    ascendingText?: any;
    clearText?: any;
    descendingText?: any;
    mode?: any;
    showSortIndexes?: any;
}
declare class Sorting extends NestedOption<ISortingProps> {
    static OptionName: string;
}
interface IStateStoringProps {
    customLoad?: any;
    customSave?: any;
    enabled?: any;
    savingTimeout?: any;
    storageKey?: any;
    type?: any;
}
declare class StateStoring extends NestedOption<IStateStoringProps> {
    static OptionName: string;
}
interface IStringLengthRuleProps {
    ignoreEmptyValue?: any;
    max?: any;
    message?: any;
    min?: any;
    trim?: any;
    type?: any;
}
declare class StringLengthRule extends NestedOption<IStringLengthRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface ISummaryProps {
    calculateCustomSummary?: any;
    groupItems?: {
        alignByColumn?: any;
        column?: any;
        customizeText?: any;
        displayFormat?: any;
        name?: any;
        showInColumn?: any;
        showInGroupFooter?: any;
        skipEmptyValues?: any;
        summaryType?: any;
        valueFormat?: any;
    }[];
    recalculateWhileEditing?: any;
    skipEmptyValues?: any;
    texts?: {
        avg?: any;
        avgOtherColumn?: any;
        count?: any;
        max?: any;
        maxOtherColumn?: any;
        min?: any;
        minOtherColumn?: any;
        sum?: any;
        sumOtherColumn?: any;
    };
    totalItems?: {
        alignment?: any;
        column?: any;
        cssClass?: any;
        customizeText?: any;
        displayFormat?: any;
        name?: any;
        showInColumn?: any;
        skipEmptyValues?: any;
        summaryType?: any;
        valueFormat?: any;
    }[];
}
declare class Summary extends NestedOption<ISummaryProps> {
    static OptionName: string;
    static ExpectedChildren: {
        groupItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
        summaryTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        totalItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ISummaryTextsProps {
    avg?: any;
    avgOtherColumn?: any;
    count?: any;
    max?: any;
    maxOtherColumn?: any;
    min?: any;
    minOtherColumn?: any;
    sum?: any;
    sumOtherColumn?: any;
}
declare class SummaryTexts extends NestedOption<ISummaryTextsProps> {
    static OptionName: string;
}
interface ITextsProps {
    addRow?: any;
    cancelAllChanges?: any;
    cancelRowChanges?: any;
    confirmDeleteMessage?: any;
    confirmDeleteTitle?: any;
    deleteRow?: any;
    editRow?: any;
    saveAllChanges?: any;
    saveRowChanges?: any;
    undeleteRow?: any;
    validationCancelChanges?: any;
    exportAll?: any;
    exportSelectedRows?: any;
    exportTo?: any;
    groupByThisColumn?: any;
    groupContinuedMessage?: any;
    groupContinuesMessage?: any;
    ungroup?: any;
    ungroupAll?: any;
    avg?: any;
    avgOtherColumn?: any;
    count?: any;
    max?: any;
    maxOtherColumn?: any;
    min?: any;
    minOtherColumn?: any;
    sum?: any;
    sumOtherColumn?: any;
    fix?: any;
    leftPosition?: any;
    rightPosition?: any;
    unfix?: any;
    clearFilter?: any;
    createFilter?: any;
    filterEnabledHint?: any;
    cancel?: any;
    emptyValue?: any;
    ok?: any;
}
declare class Texts extends NestedOption<ITextsProps> {
    static OptionName: string;
}
interface IToolbarItemProps {
    disabled?: any;
    html?: any;
    location?: any;
    options?: any;
    template?: any;
    text?: any;
    toolbar?: any;
    visible?: any;
    widget?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class ToolbarItem extends NestedOption<IToolbarItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface ITotalItemProps {
    alignment?: any;
    column?: any;
    cssClass?: any;
    customizeText?: any;
    displayFormat?: any;
    name?: any;
    showInColumn?: any;
    skipEmptyValues?: any;
    summaryType?: any;
    valueFormat?: any;
}
declare class TotalItem extends NestedOption<ITotalItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        valueFormat: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IValidationRuleProps {
    message?: any;
    trim?: any;
    type?: any;
    ignoreEmptyValue?: any;
    max?: any;
    min?: any;
    reevaluate?: any;
    validationCallback?: any;
    comparisonTarget?: any;
    comparisonType?: any;
    pattern?: any;
}
declare class ValidationRule extends NestedOption<IValidationRuleProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static PredefinedProps: {
        type: string;
    };
}
interface IValueFormatProps {
    currency?: any;
    formatter?: any;
    parser?: any;
    precision?: any;
    type?: any;
}
declare class ValueFormat extends NestedOption<IValueFormatProps> {
    static OptionName: string;
}
export default DataGrid;
export { DataGrid, IDataGridOptions, Animation, IAnimationProps, AsyncRule, IAsyncRuleProps, At, IAtProps, BoundaryOffset, IBoundaryOffsetProps, Button, IButtonProps, ColCountByScreen, IColCountByScreenProps, Collision, ICollisionProps, Column, IColumnProps, ColumnChooser, IColumnChooserProps, ColumnFixing, IColumnFixingProps, ColumnFixingTexts, IColumnFixingTextsProps, ColumnHeaderFilter, IColumnHeaderFilterProps, ColumnLookup, IColumnLookupProps, CompareRule, ICompareRuleProps, CursorOffset, ICursorOffsetProps, CustomOperation, ICustomOperationProps, CustomRule, ICustomRuleProps, DataGridHeaderFilter, IDataGridHeaderFilterProps, DataGridHeaderFilterTexts, IDataGridHeaderFilterTextsProps, Editing, IEditingProps, EditingTexts, IEditingTextsProps, EmailRule, IEmailRuleProps, Export, IExportProps, ExportTexts, IExportTextsProps, Field, IFieldProps, FieldLookup, IFieldLookupProps, FilterBuilder, IFilterBuilderProps, FilterBuilderPopup, IFilterBuilderPopupProps, FilterOperationDescriptions, IFilterOperationDescriptionsProps, FilterPanel, IFilterPanelProps, FilterPanelTexts, IFilterPanelTextsProps, FilterRow, IFilterRowProps, Form, IFormProps, Format, IFormatProps, FormItem, IFormItemProps, Grouping, IGroupingProps, GroupingTexts, IGroupingTextsProps, GroupItem, IGroupItemProps, GroupOperationDescriptions, IGroupOperationDescriptionsProps, GroupPanel, IGroupPanelProps, HeaderFilter, IHeaderFilterProps, Hide, IHideProps, KeyboardNavigation, IKeyboardNavigationProps, Label, ILabelProps, LoadPanel, ILoadPanelProps, Lookup, ILookupProps, MasterDetail, IMasterDetailProps, My, IMyProps, NumericRule, INumericRuleProps, Offset, IOffsetProps, OperationDescriptions, IOperationDescriptionsProps, Pager, IPagerProps, Paging, IPagingProps, PatternRule, IPatternRuleProps, Popup, IPopupProps, Position, IPositionProps, RangeRule, IRangeRuleProps, RemoteOperations, IRemoteOperationsProps, RequiredRule, IRequiredRuleProps, RowDragging, IRowDraggingProps, Scrolling, IScrollingProps, SearchPanel, ISearchPanelProps, Selection, ISelectionProps, Show, IShowProps, SortByGroupSummaryInfo, ISortByGroupSummaryInfoProps, Sorting, ISortingProps, StateStoring, IStateStoringProps, StringLengthRule, IStringLengthRuleProps, Summary, ISummaryProps, SummaryTexts, ISummaryTextsProps, Texts, ITextsProps, ToolbarItem, IToolbarItemProps, TotalItem, ITotalItemProps, ValidationRule, IValidationRuleProps, ValueFormat, IValueFormatProps };
