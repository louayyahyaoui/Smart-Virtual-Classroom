import { ICloneable, IEquatable, ISupportCopyFrom } from '../types';
import { ConstInterval } from './const';
import { MutableInterval } from './mutable';
import { IReproducibleInterval } from './reproducible';
export declare class BoundaryInterval extends MutableInterval implements IEquatable<BoundaryInterval>, ICloneable<BoundaryInterval>, ISupportCopyFrom<BoundaryInterval>, IReproducibleInterval<BoundaryInterval> {
    start: number;
    end: number;
    constructor(start: number, end: number);
    static normalized(pointA: number, pointB: number): BoundaryInterval;
    copyFrom(obj: BoundaryInterval): void;
    equals(obj: BoundaryInterval): boolean;
    clone(): BoundaryInterval;
    makeByStartEnd(start: number, end: number): BoundaryInterval;
    makeByStartLength(start: number, length: number): BoundaryInterval;
    makeByLengthEnd(length: number, end: number): BoundaryInterval;
    static makeByConstInterval(interval: ConstInterval): BoundaryInterval;
    expand(interval: BoundaryInterval): this;
    length: number;
    readonly center: number;
}
//# sourceMappingURL=boundary.d.ts.map
