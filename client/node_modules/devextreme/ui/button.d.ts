/**
* DevExtreme (ui/button.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import {
    event
} from '../events/index';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxButtonOptions extends WidgetOptions<dxButton> {
    /**
     * A Boolean value specifying whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies the icon to be displayed on the button.
     */
    icon?: string;
    /**
     * A function that is executed when the Button is clicked or tapped.
     */
    onClick?: ((e: { component?: dxButton, element?: dxElement, model?: any, event?: event, validationGroup?: any }) => any);
    /**
     * Specifies how the button is styled.
     */
    stylingMode?: 'text' | 'outlined' | 'contained';
    /**
     * Specifies a custom template for the Button UI component.
     */
    template?: template | ((buttonData: { text?: string, icon?: string }, contentElement: dxElement) => string | Element | JQuery);
    /**
     * The text displayed on the button.
     */
    text?: string;
    /**
     * Specifies the button type.
     */
    type?: 'back' | 'danger' | 'default' | 'normal' | 'success';
    /**
     * Specifies whether the button submits an HTML form.
     */
    useSubmitBehavior?: boolean;
    /**
     * Specifies the name of the validation group to be accessed in the click event handler.
     */
    validationGroup?: string;
}
/**
 * The Button UI component is a simple button that performs specified commands when a user clicks it.
 */
export default class dxButton extends Widget {
    constructor(element: Element, options?: dxButtonOptions)
    constructor(element: JQuery, options?: dxButtonOptions)
}

declare global {
interface JQuery {
    dxButton(): JQuery;
    dxButton(options: "instance"): dxButton;
    dxButton(options: string): any;
    dxButton(options: string, ...params: any[]): any;
    dxButton(options: dxButtonOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxButtonOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxButtonOptions;
