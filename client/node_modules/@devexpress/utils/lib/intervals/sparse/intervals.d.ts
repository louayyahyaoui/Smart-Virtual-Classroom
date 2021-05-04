import { ConstInterval } from '../const';
import { SparseIntervalsIterator } from './iterator';
import { SparseObjectsIterator } from './objects-iterator';
export declare class SparseIntervals<T extends ConstInterval> {
    private list;
    private _count;
    private _numIntervals;
    constructor(list?: T[]);
    getInterval(index: number): T;
    getNativeIterator(): SparseIntervalsIterator<T>;
    getObjectsIterator<ObjT extends any>(objects: ObjT[]): SparseObjectsIterator<T, ObjT>;
    readonly count: number;
    readonly numIntervals: number;
}
//# sourceMappingURL=intervals.d.ts.map
