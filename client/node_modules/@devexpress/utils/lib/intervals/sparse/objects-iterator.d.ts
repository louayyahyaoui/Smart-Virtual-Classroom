import { ConstInterval } from '../const';
import { SparseIntervals } from './intervals';
import { SparseIntervalsIterator } from './iterator';
export declare class SparseObjectsIterator<T extends ConstInterval, ObjT> extends SparseIntervalsIterator<T> {
    objects: ObjT[];
    obj: ObjT;
    constructor(sparseIntervals: SparseIntervals<T>, objects: ObjT[]);
    protected initObject(): void;
}
//# sourceMappingURL=objects-iterator.d.ts.map
