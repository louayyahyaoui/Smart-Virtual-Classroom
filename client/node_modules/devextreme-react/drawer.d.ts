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
import dxDrawer, { IOptions } from "devextreme/ui/drawer";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IDrawerOptions extends IOptions, IHtmlOptions {
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
    defaultOpened?: any;
    onOpenedChange?: (value: any) => void;
}
declare class Drawer extends BaseComponent<IDrawerOptions> {
    get instance(): dxDrawer;
    protected _WidgetClass: typeof dxDrawer;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultOpened: string;
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default Drawer;
export { Drawer, IDrawerOptions };
