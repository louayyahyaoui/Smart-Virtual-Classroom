import { ISequenceComparatorItertor, SesType } from './common';
export declare class StringSequenceComparator {
    editDistance: number | null;
    lcs: string;
    ses: StringSesElem[];
    private readonly reverse;
    private readonly offset;
    private readonly path;
    private readonly pathposi;
    private a;
    private b;
    private m;
    private n;
    constructor(a: string, b: string);
    calculate(): StringSesElem[];
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
export declare class StringSesElem {
    elem: string;
    type: SesType;
    constructor(elem: string, type: SesType);
    toString(): string;
}
export declare class StringSequenceComparatorItertor implements ISequenceComparatorItertor<string> {
    str: string;
    constructor(str: string);
    getComparer(): ((a: string, b: string) => boolean);
    getByIndex(index: number): string;
    readonly length: number;
}
export {};
//# sourceMappingURL=string.d.ts.map
