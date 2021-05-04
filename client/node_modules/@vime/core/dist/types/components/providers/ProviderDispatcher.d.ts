import { ProviderWritableProps } from './ProviderProps';
export declare const PROVIDER_CHANGE_EVENT = "vmProviderChange";
export declare type ProviderDispatcher = <P extends keyof ProviderWritableProps>(prop: P, value: ProviderWritableProps[P]) => void;
/**
 * Creates a dispatcher on the given `ref`, to send updates to the closest ancestor player via
 * the custom `vmProviderChange` event.
 *
 * @param ref A component reference to dispatch the state change events from.
 */
export declare const createProviderDispatcher: (ref: any) => ProviderDispatcher;
