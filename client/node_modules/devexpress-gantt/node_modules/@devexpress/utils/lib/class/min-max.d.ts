export declare class MinMax<T> {
    minElement: T;
    maxElement: T;
    constructor(minElement: T, maxElement: T);
}
export declare class MinMaxNumber extends MinMax<number> {
    readonly length: number;
}
export declare class ExtendedMin<T> {
    minElement: T;
    minValue: number;
    constructor(minElement: T, minValue: number);
}
export declare class ExtendedMax<T> {
    maxElement: T;
    maxValue: number;
    constructor(maxElement: T, maxValue: number);
}
export declare class ExtendedMinMax<T> extends MinMax<T> {
    minValue: number;
    maxValue: number;
    constructor(minElement: T, minValue: number, maxElement: T, maxValue: number);
}
//# sourceMappingURL=min-max.d.ts.map
