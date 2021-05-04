import { ConstInterval } from '../const';
export declare class SparseIntervalsMapIterator<T extends ConstInterval, ObjT> {
    private valMap;
    private sparseIntervals;
    position: number;
    object: ObjT;
    interval: T;
    intervalIndex: number;
    posInInterval: number;
    constructor(intervals: T[], valMap: Record<number, ObjT>);
    moveToNextPosition(): boolean;
    moveToNextInterval(): boolean;
    readonly numIntervals: number;
}
//# sourceMappingURL=map-iterator.d.ts.map
