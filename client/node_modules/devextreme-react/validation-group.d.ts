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

import dxValidationGroup, { IOptions } from "devextreme/ui/validation_group";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IValidationGroupOptions extends IOptions, IHtmlOptions {
}
declare class ValidationGroup extends BaseComponent<IValidationGroupOptions> {
    get instance(): dxValidationGroup;
    protected _WidgetClass: typeof dxValidationGroup;
    protected independentEvents: string[];
}
export default ValidationGroup;
export { ValidationGroup, IValidationGroupOptions };
