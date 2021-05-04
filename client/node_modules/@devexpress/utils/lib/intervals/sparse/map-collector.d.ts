import { CmpFunc } from '../../types';
import { MutableInterval } from '../mutable';
import { IReproducibleInterval } from '../reproducible';
import { SparseIntervalsMapIterator } from './map-iterator';
export declare class SparseIntervalsMapCollector<IntervalT extends MutableInterval, TemplateT extends IReproducibleInterval<IntervalT>, ObjT> {
    private valMap;
    private intervals;
    private curr;
    private currVal;
    private cmp;
    private template;
    constructor(cmp: CmpFunc<ObjT>, template: TemplateT);
    add(index: number, value: ObjT): void;
    getIterator(): SparseIntervalsMapIterator<IntervalT, ObjT>;
}
//# sourceMappingURL=map-collector.d.ts.map
