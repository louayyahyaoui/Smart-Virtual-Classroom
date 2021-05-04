import { MutableInterval } from '../mutable';
import { IReproducibleInterval } from '../reproducible';
import { SparseIntervals } from './intervals';
export declare class SparseIntervalsCollector<IntervalT extends MutableInterval, TemplateT extends IReproducibleInterval<IntervalT>> {
    private intervals;
    private curr;
    private template;
    constructor(template: TemplateT);
    add(index: number): void;
    getIntervals(): SparseIntervals<IntervalT>;
}
//# sourceMappingURL=collector.d.ts.map
