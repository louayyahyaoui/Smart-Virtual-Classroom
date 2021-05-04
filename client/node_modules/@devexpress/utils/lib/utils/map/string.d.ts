import { ExtendedMax, ExtendedMin, ExtendedMinMax, MinMax } from '../../class/min-max';
import { CmpFunc, ICloneable } from '../../types';
export declare class StringMapUtils {
    static forEach<TValue>(map: Record<string, TValue>, callback: (element: TValue, key: string) => void): void;
    static map<TValue, TRes>(map: Record<string, TValue>, callback: (element: TValue, key: string) => TRes): Record<string, TRes>;
    static reducedMap<T, TRes>(map: Record<string, T>, callback: (currVal: T, key: string) => TRes | null): Record<string, TRes>;
    static clear<T>(map: Record<string, T>): void;
    static shallowCopy<T>(map: Record<string, T>): Record<string, T>;
    static deepCopy<T extends ICloneable<T>>(map: Record<string, T>): Record<string, T>;
    static isEmpty<T>(map: Record<string, T>): boolean;
    static accumulate<T, TAcc>(map: Record<string, T>, initAccValue: TAcc, callback: (acc: TAcc, currVal: T, key: string) => TAcc): TAcc;
    static keyBy<T>(map: Record<string, T>, callback: (element: T, key: string) => boolean): string | null;
    static elementBy<T>(map: Record<string, T>, callback: (element: T, key: string) => boolean): T | null;
    static containsBy<T>(map: Record<string, T>, callback: (element: T, key: string) => boolean): boolean;
    static toList<T>(map: Record<string, T>): T[];
    static toListBy<T, TRes>(map: Record<string, T>, callback: (elem: T, key: string) => TRes, maxElements?: number): TRes[];
    static anyOf<T, TRes>(map: Record<string, T>, callback: (currVal: T, key: string) => TRes | null): TRes | null;
    static unsafeAnyOf<T, TRes>(map: Record<string, T>, callback: (currVal: T, key: string) => TRes | null | undefined): TRes | null;
    static allOf<T>(map: Record<string, T>, callback: (currVal: T, key: string) => boolean): boolean;
    static mapLength<T>(map: Record<string, T>): number;
    static min<T>(map: Record<string, T>, getValue: (val: T, key: string) => number): T | null;
    static max<T>(map: Record<string, T>, getValue: (val: T, key: string) => number): T | null;
    static minMax<T>(map: Record<string, T>, getValue: (val: T, key: string) => number): MinMax<T> | null;
    static minExtended<T>(map: Record<string, T>, getValue: (val: T, key: string) => number): ExtendedMin<T> | null;
    static maxExtended<T>(map: Record<string, T>, getValue: (val: T, key: string) => number): ExtendedMax<T> | null;
    static minMaxExtended<T>(map: Record<string, T>, getValue: (val: T, key: string) => number): ExtendedMinMax<T> | null;
    static maxByCmp<T>(map: Record<string, T>, cmp: CmpFunc<T>): T | null;
    static minByCmp<T>(map: Record<string, T>, cmp: CmpFunc<T>): T | null;
}
//# sourceMappingURL=string.d.ts.map
