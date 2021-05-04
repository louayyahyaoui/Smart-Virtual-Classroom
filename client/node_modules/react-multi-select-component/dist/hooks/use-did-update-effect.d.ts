/**
 * similar to `useEffect` but gets triggered only when value changes
 * @param fn executable function on dependency updates
 * @param inputs dependency array
 */
export declare function useDidUpdateEffect(fn: any, inputs: any): void;
