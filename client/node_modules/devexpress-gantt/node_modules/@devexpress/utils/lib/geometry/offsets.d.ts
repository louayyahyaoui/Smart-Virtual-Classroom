import { IEquatable, ISupportConverting, ISupportCopyFrom, SimpleConverter } from '../types';
import { IOffsets } from './interfaces';
export declare class Offsets implements IEquatable<Offsets>, ISupportCopyFrom<Offsets>, ISupportConverting<number>, IOffsets {
    left: number;
    right: number;
    top: number;
    bottom: number;
    static empty(): Offsets;
    constructor(left: number, right: number, top: number, bottom: number);
    static fromNumber(offset: number): Offsets;
    static fromOffsets(offsets: IOffsets): Offsets;
    static fromSide(horizontal: number, vertical: number): Offsets;
    normalize(): this;
    toString(): string;
    isEmpty(): boolean;
    offset(offset: IOffsets): this;
    multiply(mult: number): this;
    multiply(multHoriz: number, multVert: number): this;
    multiply(multLeft: number, multRight: number, multTop: number, multBottom: number): this;
    clone(): Offsets;
    copyFrom(obj: IOffsets): void;
    equals(obj: IOffsets): boolean;
    applyConverter(converter: SimpleConverter): this;
    readonly horizontal: number;
    readonly vertical: number;
}
//# sourceMappingURL=offsets.d.ts.map
