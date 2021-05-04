/**
* DevExtreme (events/core/events_engine.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type EventsEngineType = {
    on: (element, eventName, handler) => void;
    off: (element, eventName, handler) => void;
    set: (eventEngine) => void;
};
declare const eventsEngine: EventsEngineType;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export declare function set(eventEngine): void;
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default eventsEngine;
