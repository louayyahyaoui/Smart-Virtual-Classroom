import { ICloneable } from '../types';
export declare class Flag implements ICloneable<Flag> {
    private value;
    constructor(initValue?: number);
    get(enumVal: number): boolean;
    set(enumVal: number, newValue: boolean): this;
    add(value: number): void;
    anyOf(...flags: number[]): boolean;
    getValue(): number;
    clone(): Flag;
}
//# sourceMappingURL=flag.d.ts.map
