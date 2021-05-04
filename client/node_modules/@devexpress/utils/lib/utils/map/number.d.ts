import { CmpFunc, ICloneable } from '../../types';
import { MinMax, ExtendedMin, ExtendedMax, ExtendedMinMax } from '../../class/min-max';
export declare class NumberMapUtils {
    static forEach<TValue>(map: Record<number, TValue>, callback: (element: TValue, key: number) => void): void;
    static map<TValue, TRes>(map: Record<number, TValue>, callback: (element: TValue, key: number) => TRes): Record<number, TRes>;
    static reducedMap<T, TRes>(map: Record<number, T>, callback: (currVal: T, key: number) => TRes | null): Record<number, TRes>;
    static clear<T>(map: Record<number, T>): void;
    static shallowCopy<T>(map: Record<number, T>): Record<number, T>;
    static deepCopy<T extends ICloneable<T>>(map: Record<number, T>): Record<number, T>;
    static isEmpty<T>(map: Record<number, T>): boolean;
    static accumulate<T, TAcc>(map: Record<number, T>, initAccValue: TAcc, callback: (acc: TAcc, currVal: T, key: number) => TAcc): TAcc;
    static keyBy<T>(map: Record<number, T>, callback: (element: T, key: number) => boolean): number | null;
    static elementBy<T>(map: Record<number, T>, callback: (element: T, key: number) => boolean): T | null;
    static containsBy<T>(map: Record<number, T>, callback: (element: T, key: number) => boolean): boolean;
    static toList<T>(map: Record<number, T>): T[];
    static toListBy<T, TRes>(map: Record<number, T>, callback: (elem: T, key: number) => TRes, maxElements?: number): TRes[];
    static anyOf<T, TRes>(map: Record<number, T>, callback: (currVal: T, key: number) => TRes | null): TRes | null;
    static unsafeAnyOf<T, TRes>(map: Record<number, T>, callback: (currVal: T, key: number) => TRes | null | undefined): TRes | null;
    static allOf<T>(map: Record<number, T>, callback: (currVal: T, key: number) => boolean): boolean;
    static mapLength<T>(map: Record<number, T>): number;
    static min<T>(map: Record<number, T>, getValue: (val: T, key: number) => number): T | null;
    static max<T>(map: Record<number, T>, getValue: (val: T, key: number) => number): T | null;
    static minMax<T>(map: Record<number, T>, getValue: (val: T, key: number) => number): MinMax<T> | null;
    static minExtended<T>(map: Record<number, T>, getValue: (val: T, key: number) => number): ExtendedMin<T> | null;
    static maxExtended<T>(map: Record<number, T>, getValue: (val: T, key: number) => number): ExtendedMax<T> | null;
    static minMaxExtended<T>(map: Record<number, T>, getValue: (val: T, key: number) => number): ExtendedMinMax<T> | null;
    static maxByCmp<T>(map: Record<number, T>, cmp: CmpFunc<T>): T | null;
    static minByCmp<T>(map: Record<number, T>, cmp: CmpFunc<T>): T | null;
}
//# sourceMappingURL=number.d.ts.map
