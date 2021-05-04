import { PlayerProps } from '../core/player/PlayerProps';
import { AdapterHost } from './MediaProvider';
import { Provider } from './Provider';
import { ProviderWritableProps } from './ProviderProps';
export declare const PROVIDER_CACHE_KEY: unique symbol;
export declare const PROVIDER_CONNECT_EVENT = "vmMediaProviderConnect";
export declare const PROVIDER_DISCONNECT_EVENT = "vmMediaProviderDisconnect";
export declare type ProviderCache = Map<keyof ProviderWritableProps, any>;
export declare type ProviderConnectEventDetail = AdapterHost;
export interface ProviderHost extends ProviderWritableProps {
  [PROVIDER_CACHE_KEY]?: ProviderCache;
  ready: boolean;
  currentProvider?: Provider;
  logger?: PlayerProps['logger'];
  provider?: AdapterHost;
  onProviderDisconnect?: () => void;
}
export declare function withProviderHost(connector: ProviderHost): void;
export declare function withProviderConnect(ref: any): void;
