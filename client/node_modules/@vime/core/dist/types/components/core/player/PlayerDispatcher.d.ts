import { WritableProps } from './PlayerProps';
export declare const STATE_CHANGE_EVENT = "vmStateChange";
export declare type StateChange<T = WritableProps, P extends keyof T = keyof T> = {
  by: HTMLElement;
  prop: P;
  value: T[P];
};
export declare type Dispatcher = <P extends keyof WritableProps>(prop: P, value: WritableProps[P]) => void;
/**
 * Creates a dispatcher on the given `ref`, to send updates to the closest ancestor player via
 * the custom `vmStateChange` event.
 *
 * @param ref An element to dispatch the state change events from.
 */
export declare const createDispatcher: (ref: any) => Dispatcher;
