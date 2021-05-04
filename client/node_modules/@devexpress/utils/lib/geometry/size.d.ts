import { ICloneable, IEquatable, ISupportCopyFrom, SimpleConverter } from '../types';
import { ISize } from './interfaces';
export declare class Size implements ISize, ICloneable<Size>, ISupportCopyFrom<Size>, IEquatable<ISize> {
    width: number;
    height: number;
    static empty(): Size;
    constructor(width: number, height: number);
    static fromNumber(num: number): Size;
    static initByCommonAction(action: (directAdp: (s: ISize) => number, reverseAdp: (s: ISize) => number) => number): Size;
    isEmpty(): boolean;
    toString(): string;
    nonNegativeSize(): this;
    offset(offsetWidth: number, offsetHeight: number): this;
    multiply(multiplierW: number, multiplierH: number): this;
    equals(obj: ISize): boolean;
    clone(): Size;
    copyFrom(obj: Size): void;
    applyConverter(conv: SimpleConverter): this;
    static equals(a: ISize, b: ISize): boolean;
}
//# sourceMappingURL=size.d.ts.map
