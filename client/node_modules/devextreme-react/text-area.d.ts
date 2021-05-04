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

import dxTextArea, { IOptions } from "devextreme/ui/text_area";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
interface ITextAreaOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class TextArea extends BaseComponent<ITextAreaOptions> {
    get instance(): dxTextArea;
    protected _WidgetClass: typeof dxTextArea;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
}
export default TextArea;
export { TextArea, ITextAreaOptions };
