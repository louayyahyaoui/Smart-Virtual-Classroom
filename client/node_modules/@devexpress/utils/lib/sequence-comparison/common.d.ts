export declare enum SesType {
    Delete = -1,
    Common = 0,
    Add = 1
}
export interface ISequenceComparatorItertor<T> {
    length: number;
    getComparer(): ((a: T, b: T) => boolean);
    getByIndex(index: number): T;
}
export declare class SesElem<T> {
    elem: T;
    type: SesType;
    constructor(elem: T, type: SesType);
    toString(): string;
}
export declare class SequenceComparator<T> {
    editDistance: number | null;
    lcs: string;
    ses: SesElem<T>[];
    private readonly reverse;
    private readonly offset;
    private readonly path;
    private readonly pathposi;
    private readonly comparer;
    private a;
    private b;
    private m;
    private n;
    constructor(a: ISequenceComparatorItertor<T>, b: ISequenceComparatorItertor<T>);
    calculate(): SesElem<T>[];
    toString(): string;
    protected snake(k: number, p: number, pp: number): number;
    protected recordSeq(epc: PathElem[]): void;
}
declare class PathElem {
    x: number;
    y: number;
    k: number | null;
    constructor(x: number, y: number, k: number | null);
}
export {};
//# sourceMappingURL=common.d.ts.map
