/**
* DevExtreme (core/dom_component.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Component, {
    ComponentOptions
} from './component';

import {
    Device
} from './devices';

import {
    dxElement
} from './element';

import { TemplateManager } from './template_manager';
import { FunctionTemplate } from './templates/function_template';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface DOMComponentOptions<T = DOMComponent> extends ComponentOptions<T> {
    /**
     * 
     */
    bindingOptions?: any;
    /**
     * Specifies the global attributes to be attached to the UI component's container element.
     */
    elementAttr?: any;
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * A function that is executed before the UI component is disposed of.
     */
    onDisposing?: ((e: { component?: T, element?: dxElement, model?: any }) => any);
    /**
     * A function that is executed after a UI component property is changed.
     */
    onOptionChanged?: ((e: { component?: T, element?: dxElement, model?: any, name?: string, fullName?: string, value?: any }) => any);
    /**
     * Switches the UI component to a right-to-left representation.
     */
    rtlEnabled?: boolean;
    /**
     * Specifies the UI component's width.
     */
    width?: number | string | (() => number | string);
}
/**
 * A base class for all components.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class DOMComponent extends Component {
    constructor(element: Element | JQuery, options?: DOMComponentOptions);
    /**
     * Specifies the device-dependent default configuration properties for this component.
     */
    static defaultOptions(rule: { device?: Device | Array<Device> | Function, options?: any }): void;
    /**
     * Disposes of all the resources allocated to the widget instance.
     */
    dispose(): void;
    /**
     * Gets the root UI component element.
     */
    element(): dxElement;
    /**
     * Gets the instance of a UI component found using its DOM node.
     */
    static getInstance(element: Element | JQuery): DOMComponent;

    $element(): Element | JQuery;
    _getTemplate(template: unknown): FunctionTemplate;
    _invalidate(): void;
    _refresh(): void;
    _templateManager: TemplateManager;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = DOMComponentOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = DOMComponentOptions;