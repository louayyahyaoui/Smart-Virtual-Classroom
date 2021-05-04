import { ConstInterval } from '../const';
import { SparseIntervals } from './intervals';
export declare class SparseIntervalsIterator<T extends ConstInterval> {
    index: number;
    private sparseIntervals;
    private curr;
    private intervalIndex;
    private posInInterval;
    constructor(sparseIntervals: SparseIntervals<T>);
    moveNext(): boolean;
    movePrev(): boolean;
    protected initObject(): void;
    readonly isStarted: boolean;
}
//# sourceMappingURL=iterator.d.ts.map
