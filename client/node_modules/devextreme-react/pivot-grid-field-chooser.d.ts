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

import dxPivotGridFieldChooser, { IOptions } from "devextreme/ui/pivot_grid_field_chooser";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IPivotGridFieldChooserOptions extends IOptions, IHtmlOptions {
}
declare class PivotGridFieldChooser extends BaseComponent<IPivotGridFieldChooserOptions> {
    get instance(): dxPivotGridFieldChooser;
    protected _WidgetClass: typeof dxPivotGridFieldChooser;
    protected independentEvents: string[];
    protected _expectedChildren: {
        headerFilter: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pivotGridFieldChooserTexts: {
            optionName: string;
            isCollectionItem: boolean;
        };
        texts: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
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
interface IPivotGridFieldChooserTextsProps {
    allFields?: any;
    columnFields?: any;
    dataFields?: any;
    filterFields?: any;
    rowFields?: any;
}
declare class PivotGridFieldChooserTexts extends NestedOption<IPivotGridFieldChooserTextsProps> {
    static OptionName: string;
}
interface ITextsProps {
    cancel?: any;
    emptyValue?: any;
    ok?: any;
    allFields?: any;
    columnFields?: any;
    dataFields?: any;
    filterFields?: any;
    rowFields?: any;
}
declare class Texts extends NestedOption<ITextsProps> {
    static OptionName: string;
}
export default PivotGridFieldChooser;
export { PivotGridFieldChooser, IPivotGridFieldChooserOptions, HeaderFilter, IHeaderFilterProps, HeaderFilterTexts, IHeaderFilterTextsProps, PivotGridFieldChooserTexts, IPivotGridFieldChooserTextsProps, Texts, ITextsProps };
