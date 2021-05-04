/**
* DevExtreme (events/index.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

/**
 * Describes dxEvent, a counterpart of the jQuery.Event to be used without jQuery.
 */
export class dxEvent {
    /**
     * The DOM element within the current event propagation stage.
     */
    currentTarget: Element;
    /**
     * Data passed to the event handler.
     */
    data: any;
    /**
     * The DOM element to which the currently-called event handler was attached.
     */
    delegateTarget: Element;
    /**
     * The DOM element that initiated the event.
     */
    target: Element;
    /**
     * Checks if the preventDefault() method was called on this event object.
     */
    isDefaultPrevented(): boolean;
    /**
     * Checks if the stopImmediatePropagation() method was called on this event object.
     */
    isImmediatePropagationStopped(): boolean;
    /**
     * Checks if the stopPropagation() method was called on this event object.
     */
    isPropagationStopped(): boolean;
    /**
     * Prevents the event's default action from triggering.
     */
    preventDefault(): void;
    /**
     * Stops the event's propagation up the DOM tree, preventing the rest of the handlers from being executed.
     */
    stopImmediatePropagation(): void;
    /**
     * Stops the event's propagation up the DOM tree, keeping parent handlers unnotified of the event.
     */
    stopPropagation(): void;
}

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type event = dxEvent | JQueryEventObject;

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function eventsHandler(event: dxEvent, extraParameters: any): boolean;

/**
 * Detaches all handlers from the specified elements.
 */
export function off(element: Element | Array<Element>): void;

/**
 * Detaches all handlers of the specified event from the specified elements.
 */
export function off(element: Element | Array<Element>, eventName: string): void;

/**
 * Detaches an event handler from the specified elements.
 */
export function off(element: Element | Array<Element>, eventName: string, handler: Function): void;

/**
 * Detaches all event handlers of the specified type attached using the on(element, eventName, selector, data, handler) or on(element, eventName, selector, handler) method.
 */
export function off(element: Element | Array<Element>, eventName: string, selector: string): void;

/**
 * Detaches the specified event handler attached using the on(element, eventName, selector, data, handler) or on(element, eventName, selector, handler) method.
 */
export function off(element: Element | Array<Element>, eventName: string, selector: string, handler: Function): void;

/**
 * Attaches an event handler to the specified elements. Allows you to pass custom data to the handler.
 */
export function on(element: Element | Array<Element>, eventName: string, data: any, handler: Function): void;

/**
 * Attaches an event handler to the specified elements.
 */
export function on(element: Element | Array<Element>, eventName: string, handler: Function): void;

/**
 * Attaches an event handler to the specified elements' descendants. Allows you to pass custom data to the handler.
 */
export function on(element: Element | Array<Element>, eventName: string, selector: string, data: any, handler: Function): void;

/**
 * Attaches an event handler to the specified elements' descendants.
 */
export function on(element: Element | Array<Element>, eventName: string, selector: string, handler: Function): void;

/**
 * Attaches an event handler that is executed only once to the specified elements. Allows you to pass custom data to the handler.
 */
export function one(element: Element | Array<Element>, eventName: string, data: any, handler: Function): void;

/**
 * Attaches an event handler that is executed only once to the specified elements.
 */
export function one(element: Element | Array<Element>, eventName: string, handler: Function): void;

/**
 * Attaches an event handler that is executed only once to the specified elements' descendants. Allows you to pass custom data to the handler.
 */
export function one(element: Element | Array<Element>, eventName: string, selector: string, data: any, handler: Function): void;

/**
 * Attaches an event handler that is executed only once to the specified elements' descendants.
 */
export function one(element: Element | Array<Element>, eventName: string, selector: string, handler: Function): void;

/**
 * Triggers an event for the specified elements.
 */
export function trigger(element: Element | Array<Element>, event: string | event): void;

/**
 * Triggers an event for the specified elements. Allows you to pass custom parameters to event handlers.
 */
export function trigger(element: Element | Array<Element>, event: string | event, extraParameters: any): void;

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function triggerHandler(element: Element | Array<Element>, event: string | event): void;

/**
 * 
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export function triggerHandler(element: Element | Array<Element>, event: string | event, extraParameters: any): void;
