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

import dxLoadIndicator, { IOptions } from "devextreme/ui/load_indicator";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface ILoadIndicatorOptions extends IOptions, IHtmlOptions {
}
declare class LoadIndicator extends BaseComponent<ILoadIndicatorOptions> {
    get instance(): dxLoadIndicator;
    protected _WidgetClass: typeof dxLoadIndicator;
    protected independentEvents: string[];
}
export default LoadIndicator;
export { LoadIndicator, ILoadIndicatorOptions };
