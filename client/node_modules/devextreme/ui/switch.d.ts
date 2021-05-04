/**
* DevExtreme (ui/switch.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions
} from './editor/editor';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSwitchOptions extends EditorOptions<dxSwitch> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
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
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies the text displayed when the UI component is switched off.
     */
    switchedOffText?: string;
    /**
     * Specifies the text displayed when the UI component is switched on.
     */
    switchedOnText?: string;
    /**
     * A Boolean value specifying whether the current switch state is 'On' or 'Off'.
     */
    value?: boolean;
}
/**
 * The Switch is a UI component that can be in two states: 'On' and 'Off'.
 */
export default class dxSwitch extends Editor {
    constructor(element: Element, options?: dxSwitchOptions)
    constructor(element: JQuery, options?: dxSwitchOptions)
}

declare global {
interface JQuery {
    dxSwitch(): JQuery;
    dxSwitch(options: "instance"): dxSwitch;
    dxSwitch(options: string): any;
    dxSwitch(options: string, ...params: any[]): any;
    dxSwitch(options: dxSwitchOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSwitchOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSwitchOptions;