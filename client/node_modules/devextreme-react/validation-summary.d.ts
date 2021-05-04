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
import dxValidationSummary, { IOptions } from "devextreme/ui/validation_summary";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IValidationSummaryOptions extends IOptions, IHtmlOptions {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    onItemsChange?: (value: any) => void;
}
declare class ValidationSummary extends BaseComponent<IValidationSummaryOptions> {
    get instance(): dxValidationSummary;
    protected _WidgetClass: typeof dxValidationSummary;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
    };
    protected _expectedChildren: {
        item: {
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
interface IItemProps {
    disabled?: any;
    html?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Item extends NestedOption<IItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default ValidationSummary;
export { ValidationSummary, IValidationSummaryOptions, Item, IItemProps };
