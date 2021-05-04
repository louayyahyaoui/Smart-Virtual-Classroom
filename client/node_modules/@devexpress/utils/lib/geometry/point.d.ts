import { ICloneable, IEquatable, ISupportConverting, ISupportCopyFrom, SimpleConverter } from '../types';
import { IPoint } from './interfaces';
export declare type Offset = Point;
export declare class Point implements IPoint, ICloneable<Point>, ISupportCopyFrom<Point>, IEquatable<Point>, ISupportConverting<number> {
    x: number;
    y: number;
    static zero(): Point;
    constructor(x: number, y: number);
    static fromNumber(num: number): Point;
    isZero(): boolean;
    toString(): string;
    copyFrom(obj: Point): void;
    clone(): Point;
    equals(obj: IPoint): boolean;
    offset(offsetX: number, offsetY: number): this;
    offsetByPoint(offset: IPoint): this;
    multiply(multiplierX: number, multiplierY: number): this;
    negative(): this;
    applyConverter(converter: SimpleConverter): this;
    static plus(a: IPoint, b: IPoint): Point;
    static minus(a: IPoint, b: IPoint): Point;
    static xComparer(a: IPoint, b: IPoint): number;
    static yComparer(a: IPoint, b: IPoint): number;
    static equals(a: IPoint, b: IPoint): boolean;
}
//# sourceMappingURL=point.d.ts.map
