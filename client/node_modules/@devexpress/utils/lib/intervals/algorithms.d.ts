import { ConstInterval } from './const';
import { FixedInterval } from './fixed';
import { MutableInterval } from './mutable';
import { IReproducibleInterval } from './reproducible';
import { SparseIntervals } from './sparse/intervals';
export declare class IntervalAlgorithms {
    static oneConstainsOtherArraysOfInterval(mergedIntervalsA: FixedInterval[], intervalsB: FixedInterval[]): boolean;
    static getIntersection<T extends ConstInterval>(intervalA: T & IReproducibleInterval<T>, intervalB: T): T | null;
    static getIntersectionTemplate<ResultIntervalT extends ConstInterval, TemplateT extends IReproducibleInterval<ResultIntervalT>>(intervalA: ConstInterval, intervalB: ConstInterval, template: TemplateT): ResultIntervalT | null;
    static getIntersectionNonNullLength<T extends ConstInterval>(intervalA: T & IReproducibleInterval<T>, intervalB: ConstInterval): T | null;
    static getIntersectionNonNullLengthTemplate<ResultIntervalT extends ConstInterval, TemplateT extends IReproducibleInterval<ResultIntervalT>>(intervalA: ConstInterval, intervalB: ConstInterval, template: TemplateT): ResultIntervalT | null;
    static getIntersectionsTwoArraysOfInterval<T extends MutableInterval>(intervalsA: (T & IReproducibleInterval<T>)[], intervalsB: ConstInterval[]): T[];
    static getIntersectionsTwoArraysOfIntervalTemplate<ResultIntervalT extends MutableInterval, TemplateT extends IReproducibleInterval<ResultIntervalT>>(intervalsA: ConstInterval[], intervalsB: ConstInterval[], template: TemplateT): ResultIntervalT[];
    static getAffectedObjects<T extends MutableInterval, TObj extends {
        interval: T;
    }>(objects: TObj[], intervals: (T & IReproducibleInterval<T>)[], getFirstIndex?: (start: number, objects: TObj[]) => number, conflictResolver?: (objectInterval: ConstInterval, touchingIntervalLength: number, touchPoint: number) => boolean): SparseIntervals<T>;
    static getAffectedObjectsTemplate<ResultIntervalT extends MutableInterval, TemplateT extends IReproducibleInterval<ResultIntervalT>, TObj extends {
        interval: ConstInterval;
    }>(objects: TObj[], intervals: ConstInterval[], template: TemplateT, getFirstIndex?: (start: number, objects: TObj[]) => number, conflictResolver?: (objectInterval: ConstInterval, touchingIntervalLength: number, touchPoint: number) => boolean): SparseIntervals<ResultIntervalT>;
    static handleAffectedObjects<IntervalT extends ConstInterval, TObj extends {
        interval: ConstInterval;
    }>(objects: TObj[], intervals: IntervalT[], callback: (obj: TObj, index: number, interval: IntervalT, intersection: ConstInterval) => void, getFirstIndex?: (start: number, objects: TObj[]) => number): void;
    static getMergedIntervals<T extends ConstInterval>(intervals: (T & IReproducibleInterval<T>)[], needSort: boolean): T[];
    static getMergedIntervalsTemplate<ResultIntervalT extends ConstInterval>(intervals: ConstInterval[], needSort: boolean, template: IReproducibleInterval<ResultIntervalT>): ResultIntervalT[];
    static reflectIntervals<T extends ConstInterval>(intervals: T[], bounds: (T & IReproducibleInterval<T>)): T[];
    static reflectIntervalsTemplate<ResultT extends ConstInterval>(intervals: ConstInterval[], bounds: ConstInterval, template: IReproducibleInterval<ResultT>): ResultT[];
    static reflectionOfPointOnInterval(value: number, valInterval: FixedInterval, targetInterval: FixedInterval): number;
}
//# sourceMappingURL=algorithms.d.ts.map
