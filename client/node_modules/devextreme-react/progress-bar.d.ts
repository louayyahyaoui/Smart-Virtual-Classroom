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

import dxProgressBar, { IOptions } from "devextreme/ui/progress_bar";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IProgressBarOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class ProgressBar extends BaseComponent<IProgressBarOptions> {
    get instance(): dxProgressBar;
    protected _WidgetClass: typeof dxProgressBar;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
}
export default ProgressBar;
export { ProgressBar, IProgressBarOptions };
