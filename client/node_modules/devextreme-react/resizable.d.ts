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

import dxResizable, { IOptions } from "devextreme/ui/resizable";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IResizableOptions extends IOptions, IHtmlOptions {
    defaultHeight?: any;
    defaultWidth?: any;
    onHeightChange?: (value: any) => void;
    onWidthChange?: (value: any) => void;
}
declare class Resizable extends BaseComponent<IResizableOptions> {
    get instance(): dxResizable;
    protected _WidgetClass: typeof dxResizable;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultHeight: string;
        defaultWidth: string;
    };
}
export default Resizable;
export { Resizable, IResizableOptions };
