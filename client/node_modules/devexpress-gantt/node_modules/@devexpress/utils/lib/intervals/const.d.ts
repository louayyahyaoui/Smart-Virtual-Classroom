export declare abstract class ConstInterval {
    isNormalized(): boolean;
    isCollapsed(): boolean;
    equals(obj: ConstInterval): boolean;
    static isCollapsed(intervals: ConstInterval[]): boolean;
    containsInterval(interval: ConstInterval): boolean;
    containsIntervalWithoutEnd(interval: ConstInterval): boolean;
    contains(pos: number): boolean;
    containsWithIntervalEnd(val: number): boolean;
    containsWithoutIntervalEndAndStart(pos: number): boolean;
    readonly start: number;
    readonly length: number;
    readonly end: number;
    readonly center: number;
}
//# sourceMappingURL=const.d.ts.map
