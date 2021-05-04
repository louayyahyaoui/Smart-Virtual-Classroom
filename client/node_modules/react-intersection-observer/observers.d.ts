import { ObserverInstanceCallback } from './index';
/**
 * Convert the options to a string Id, based on the values.
 * Ensures we can reuse the same observer when observing elements with the same options.
 * @param options
 */
export declare function optionsToId(options: IntersectionObserverInit): string;
export declare function observe(element: Element, callback: ObserverInstanceCallback, options?: IntersectionObserverInit): () => void;
