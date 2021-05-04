export declare class Stack<T> {
    private list;
    private _count;
    last: T | undefined;
    push(val: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    getPrevious(): T;
    readonly count: number;
}
//# sourceMappingURL=stack.d.ts.map
