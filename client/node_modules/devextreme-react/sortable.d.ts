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
import dxSortable, { IOptions } from "devextreme/ui/sortable";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ISortableOptions extends IOptions, IHtmlOptions {
    dragRender?: (...params: any) => React.ReactNode;
    dragComponent?: React.ComponentType<any>;
    dragKeyFn?: (data: any) => string;
}
declare class Sortable extends BaseComponent<ISortableOptions> {
    get instance(): dxSortable;
    protected _WidgetClass: typeof dxSortable;
    protected independentEvents: string[];
    protected _expectedChildren: {
        cursorOffset: {
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
interface ICursorOffsetProps {
    x?: any;
    y?: any;
}
declare class CursorOffset extends NestedOption<ICursorOffsetProps> {
    static OptionName: string;
}
export default Sortable;
export { Sortable, ISortableOptions, CursorOffset, ICursorOffsetProps };
