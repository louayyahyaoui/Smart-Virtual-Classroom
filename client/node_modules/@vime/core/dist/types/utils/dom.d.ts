/**
 * Listen to an event on the given DOM node. Returns a callback to remove the event listener.
 */
export declare function listen<T extends Event | UIEvent>(node: EventTarget, event: string, handler: (event: T) => void, options?: boolean | AddEventListenerOptions | EventListenerOptions): () => void;
export declare function fireEventAndRetry<T>(el: HTMLElement, event: CustomEvent<T>, onFail?: () => void, interval?: number, maxRetries?: number): () => void;
export declare const findShadowRoot: (el: Node) => ShadowRoot | null;
export declare const isColliding: (a: HTMLElement, b: HTMLElement, translateAx?: number, translateAy?: number, translateBx?: number, translateBy?: number) => boolean;
export declare const buildNoAncestorSelector: (root: string, ancestor: string, selector: string, depth: number) => string;
