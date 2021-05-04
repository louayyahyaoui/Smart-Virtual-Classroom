/**
* DevExtreme (core/component.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
  dxElement
} from './element';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface ComponentOptions<T = Component> {
  /**
   * A function that is executed before the UI component is disposed of.
   */
  onDisposing?: ((e: { component?: T }) => any);
  /**
   * A function used in JavaScript frameworks to save the UI component instance.
   */
  onInitialized?: ((e: { component?: T, element?: dxElement }) => any);
  /**
   * A function that is executed after a UI component property is changed.
   */
  onOptionChanged?: ((e: { component?: T, name?: string, fullName?: string, value?: any }) => any);
}
/**
 * A base class for all components and UI components.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export default class Component {
  constructor(options?: ComponentOptions);
  /**
   * 
   */
  beginUpdate(): void;
  /**
   * 
   */
  endUpdate(): void;
  /**
   * 
   */
  instance(): this;
  /**
   * Detaches all event handlers from a single event.
   */
  off(eventName: string): this;
  /**
   * Detaches a particular event handler from a single event.
   */
  off(eventName: string, eventHandler: Function): this;
  /**
   * Subscribes to an event.
   */
  on(eventName: string, eventHandler: Function): this;
  /**
   * Subscribes to events.
   */
  on(events: any): this;
  /**
   * 
   */
  option(): any;
  /**
   * 
   */
  option(optionName: string): any;
  /**
   * 
   */
  option(optionName: string, optionValue: any): void;
  /**
   * 
   */
  option(options: any): void;
  /**
   * 
   */
  resetOption(optionName: string): void;

  _createActionByOption(optionName: string, config: object): Function;
  _dispose(): void;
  _getDefaultOptions(): object;
  _init(): void;
  _optionChanged(args: { name: string; value: unknown }): void;
}
