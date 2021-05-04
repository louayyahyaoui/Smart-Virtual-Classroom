export interface DeferredPromise<T> {
  promise: Promise<T>;
  resolve: (value?: T) => void;
  reject: (reason?: any) => void;
}
export declare const deferredPromise: <T = any>() => DeferredPromise<T>;
export interface CancellablePromise<T> extends Promise<T> {
  cancel: () => void;
}
export declare const makeCancellablePromise: <T>(promise: Promise<T>) => CancellablePromise<T>;
