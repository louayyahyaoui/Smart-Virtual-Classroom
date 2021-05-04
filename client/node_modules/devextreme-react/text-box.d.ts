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
import dxTextBox, { IOptions } from "devextreme/ui/text_box";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ITextBoxOptions extends IOptions, IHtmlOptions {
    defaultValue?: any;
    onValueChange?: (value: any) => void;
}
declare class TextBox extends BaseComponent<ITextBoxOptions> {
    get instance(): dxTextBox;
    protected _WidgetClass: typeof dxTextBox;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultValue: string;
    };
    protected _expectedChildren: {
        button: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IButtonProps {
    location?: any;
    name?: any;
    options?: any;
}
declare class Button extends NestedOption<IButtonProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        options: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IOptionsProps {
    accessKey?: any;
    activeStateEnabled?: any;
    bindingOptions?: any;
    disabled?: any;
    elementAttr?: any;
    focusStateEnabled?: any;
    height?: any;
    hint?: any;
    hoverStateEnabled?: any;
    icon?: any;
    onClick?: any;
    onContentReady?: any;
    onDisposing?: any;
    onFocusIn?: any;
    onFocusOut?: any;
    onInitialized?: any;
    onOptionChanged?: any;
    rtlEnabled?: any;
    stylingMode?: any;
    tabIndex?: any;
    template?: any;
    text?: any;
    type?: any;
    useSubmitBehavior?: any;
    validationGroup?: any;
    visible?: any;
    width?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Options extends NestedOption<IOptionsProps> {
    static OptionName: string;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default TextBox;
export { TextBox, ITextBoxOptions, Button, IButtonProps, Options, IOptionsProps };
