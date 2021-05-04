import { ICloneable, IEquatable, ISupportCopyFrom } from '../types';
import { ConstInterval } from './const';
import { MutableInterval } from './mutable';
import { IReproducibleInterval } from './reproducible';
export declare class FixedInterval extends MutableInterval implements IEquatable<FixedInterval>, ICloneable<FixedInterval>, ISupportCopyFrom<FixedInterval>, IReproducibleInterval<FixedInterval> {
    start: number;
    length: number;
    constructor(start: number, length: number);
    copyFrom(obj: FixedInterval): void;
    equals(obj: FixedInterval): boolean;
    clone(): FixedInterval;
    makeByStartEnd(start: number, end: number): FixedInterval;
    makeByStartLength(start: number, length: number): FixedInterval;
    makeByLengthEnd(length: number, end: number): FixedInterval;
    static fromPositions(start: number, end: number): FixedInterval;
    static makeByConstInterval(interval: ConstInterval): FixedInterval;
    expand(interval: FixedInterval): this;
    end: number;
    readonly center: number;
}
//# sourceMappingURL=fixed.d.ts.map
