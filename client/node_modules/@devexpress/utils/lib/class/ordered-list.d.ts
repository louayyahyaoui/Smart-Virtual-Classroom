import { CmpFunc } from '../types';
export declare class OrderedList<T> {
    list: T[];
    private comparer;
    constructor(comparer: CmpFunc<T>);
    add(elem: T): this;
    sort(): void;
    findIndex(elem: T): number;
    findElement(elem: T): T | null;
}
//# sourceMappingURL=ordered-list.d.ts.map
