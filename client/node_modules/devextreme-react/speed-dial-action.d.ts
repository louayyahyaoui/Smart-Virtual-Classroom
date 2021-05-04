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

import dxSpeedDialAction, { IOptions } from "devextreme/ui/speed_dial_action";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface ISpeedDialActionOptions extends IOptions, IHtmlOptions {
}
declare class SpeedDialAction extends BaseComponent<ISpeedDialActionOptions> {
    get instance(): dxSpeedDialAction;
    protected _WidgetClass: typeof dxSpeedDialAction;
    protected independentEvents: string[];
}
export default SpeedDialAction;
export { SpeedDialAction, ISpeedDialActionOptions };
