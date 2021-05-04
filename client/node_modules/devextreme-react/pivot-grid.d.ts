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

import dxPivotGrid, { IOptions } from "devextreme/ui/pivot_grid";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IPivotGridOptions extends IOptions, IHtmlOptions {
}
declare class PivotGrid extends BaseComponent<IPivotGridOptions> {
    get instance(): dxPivotGrid;
    protected _WidgetClass: typeof dxPivotGrid;
    protected independentEvents: string[];
    protected _expectedChildren: {
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        fieldChooser: {
            optionName: string;
            isCollectionItem: boolean;
        };
        fieldPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        headerFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        loadPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pivotGridTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        scrolling: {
            optionName: string;
            isCollectionItem: boolean;
        };
        stateStoring: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IExportProps {
    enabled?: any;
    fileName?: any;
    ignoreExcelErrors?: any;
    proxyUrl?: any;
}
declare class Export extends NestedOption<IExportProps> {
    static OptionName: string;
}
interface IFieldChooserProps {
    allowSearch?: any;
    applyChangesMode?: any;
    enabled?: any;
    height?: any;
    layout?: any;
    searchTimeout?: any;
    texts?: {
        allFields?: any;
        columnFields?: any;
        dataFields?: any;
        filterFields?: any;
        rowFields?: any;
    };
    title?: any;
    width?: any;
}
declare class FieldChooser extends NestedOption<IFieldChooserProps> {
    static OptionName: string;
    static ExpectedChildren: {
        fieldChooserTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFieldChooserTextsProps {
    allFields?: any;
    columnFields?: any;
    dataFields?: any;
    filterFields?: any;
    rowFields?: any;
}
declare class FieldChooserTexts extends NestedOption<IFieldChooserTextsProps> {
    static OptionName: string;
}
interface IFieldPanelProps {
    allowFieldDragging?: any;
    showColumnFields?: any;
    showDataFields?: any;
    showFilterFields?: any;
    showRowFields?: any;
    texts?: {
        columnFieldArea?: any;
        dataFieldArea?: any;
        filterFieldArea?: any;
        rowFieldArea?: any;
    };
    visible?: any;
}
declare class FieldPanel extends NestedOption<IFieldPanelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        fieldPanelTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IFieldPanelTextsProps {
    columnFieldArea?: any;
    dataFieldArea?: any;
    filterFieldArea?: any;
    rowFieldArea?: any;
}
declare class FieldPanelTexts extends NestedOption<IFieldPanelTextsProps> {
    static OptionName: string;
}
interface IHeaderFilterProps {
    allowSearch?: any;
    height?: any;
    searchTimeout?: any;
    showRelevantValues?: any;
    texts?: {
        cancel?: any;
        emptyValue?: any;
        ok?: any;
    };
    width?: any;
}
declare class HeaderFilter extends NestedOption<IHeaderFilterProps> {
    static OptionName: string;
    static ExpectedChildren: {
        headerFilterTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IHeaderFilterTextsProps {
    cancel?: any;
    emptyValue?: any;
    ok?: any;
}
declare class HeaderFilterTexts extends NestedOption<IHeaderFilterTextsProps> {
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
interface IPivotGridTextsProps {
    collapseAll?: any;
    dataNotAvailable?: any;
    expandAll?: any;
    exportToExcel?: any;
    grandTotal?: any;
    noData?: any;
    removeAllSorting?: any;
    showFieldChooser?: any;
    sortColumnBySummary?: any;
    sortRowBySummary?: any;
    total?: any;
}
declare class PivotGridTexts extends NestedOption<IPivotGridTextsProps> {
    static OptionName: string;
}
interface IScrollingProps {
    mode?: any;
    useNative?: any;
}
declare class Scrolling extends NestedOption<IScrollingProps> {
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
interface ITextsProps {
    allFields?: any;
    columnFields?: any;
    dataFields?: any;
    filterFields?: any;
    rowFields?: any;
    columnFieldArea?: any;
    dataFieldArea?: any;
    filterFieldArea?: any;
    rowFieldArea?: any;
    cancel?: any;
    emptyValue?: any;
    ok?: any;
    collapseAll?: any;
    dataNotAvailable?: any;
    expandAll?: any;
    exportToExcel?: any;
    grandTotal?: any;
    noData?: any;
    removeAllSorting?: any;
    showFieldChooser?: any;
    sortColumnBySummary?: any;
    sortRowBySummary?: any;
    total?: any;
}
declare class Texts extends NestedOption<ITextsProps> {
    static OptionName: string;
}
export default PivotGrid;
export { PivotGrid, IPivotGridOptions, Export, IExportProps, FieldChooser, IFieldChooserProps, FieldChooserTexts, IFieldChooserTextsProps, FieldPanel, IFieldPanelProps, FieldPanelTexts, IFieldPanelTextsProps, HeaderFilter, IHeaderFilterProps, HeaderFilterTexts, IHeaderFilterTextsProps, LoadPanel, ILoadPanelProps, PivotGridTexts, IPivotGridTextsProps, Scrolling, IScrollingProps, StateStoring, IStateStoringProps, Texts, ITextsProps };
