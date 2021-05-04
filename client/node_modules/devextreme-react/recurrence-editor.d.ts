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

import dxRecurrenceEditor, { IOptions } from "devextreme/ui/recurrence_editor";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface IRecurrenceEditorOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class RecurrenceEditor extends BaseComponent<IRecurrenceEditorOptions> {
    get instance(): dxRecurrenceEditor;
    protected _WidgetClass: typeof dxRecurrenceEditor;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
}
export default RecurrenceEditor;
export { RecurrenceEditor, IRecurrenceEditorOptions };
