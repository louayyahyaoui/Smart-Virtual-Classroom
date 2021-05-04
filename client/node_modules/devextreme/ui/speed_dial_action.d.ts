/**
* DevExtreme (ui/speed_dial_action.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSpeedDialActionOptions extends WidgetOptions<dxSpeedDialAction> {
    /**
     * Specifies the icon the FAB or speed dial action button displays.
     */
    icon?: string;
    /**
     * Allows you to reorder action buttons in the speed dial menu.
     */
    index?: number;
    /**
     * Specifies the text label displayed inside the FAB or near the speed dial action button.
     */
    label?: string;
    /**
     * A function that is executed when the FAB or speed dial action button is clicked or tapped.
     */
    onClick?: ((e: { event?: event, component?: dxSpeedDialAction, element?: dxElement, actionElement?: dxElement }) => any);
    /**
     * A function that is executed when the UI component's content is ready and each time the content is changed.
     */
    onContentReady?: ((e: { component?: dxSpeedDialAction, element?: dxElement, model?: any, actionElement?: dxElement }) => any);
    /**
     * Allows you to hide the FAB from the view or the action from the speed dial menu.
     */
    visible?: boolean;
}
/**
 * The SpeedDialAction is a button that performs a custom action. It can be represented by a Floating Action Button (FAB) or a button in a speed dial menu opened with the FAB.
 */
export default class dxSpeedDialAction extends Widget {
    constructor(element: Element, options?: dxSpeedDialActionOptions)
    constructor(element: JQuery, options?: dxSpeedDialActionOptions)
}

declare global {
interface JQuery {
    dxSpeedDialAction(): JQuery;
    dxSpeedDialAction(options: "instance"): dxSpeedDialAction;
    dxSpeedDialAction(options: string): any;
    dxSpeedDialAction(options: string, ...params: any[]): any;
    dxSpeedDialAction(options: dxSpeedDialActionOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSpeedDialActionOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSpeedDialActionOptions;