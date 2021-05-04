import { Flag } from '../class/flag';
import { FixedInterval } from '../intervals/fixed';
import { ICloneable, IEquatable, ISupportCopyFrom, SimpleConverter } from '../types';
import { IOffsets, IPoint, IRectangle, ISize } from './interfaces';
import { Point } from './point';
import { Size } from './size';
export declare class Rectangle implements IRectangle, IEquatable<Rectangle>, ICloneable<Rectangle>, ISupportCopyFrom<Rectangle> {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
    createRectangle(): Rectangle;
    createSize(): Size;
    createPosition(): Point;
    createVerticalInterval(): FixedInterval;
    createHorizontalInterval(): FixedInterval;
    static fromGeometry(point: IPoint, size: ISize): Rectangle;
    static fromPoints(pointA: IPoint, pointB: IPoint): Rectangle;
    static fromPositions(x1: number, y1: number, x2: number, y2: number): Rectangle;
    static fromCenter(center: Point, minRadius: number): Rectangle;
    isCollapsed(): boolean;
    isEmpty(): boolean;
    toString(): string;
    setPosition(pos: IPoint): this;
    setSize(size: ISize): this;
    setGeomerty(rect: IRectangle): this;
    moveRectangle(offsetX: number, offsetY: number): this;
    moveRectangleByPoint(offset: IPoint): this;
    resize(deltaX: number, deltaY: number): this;
    nonNegativeSize(): this;
    multiply(multiplierX: number, multiplierY: number): this;
    equals(obj: IRectangle): boolean;
    clone(): Rectangle;
    copyFrom(obj: IRectangle): void;
    containsPoint(point: IPoint): boolean;
    containsRectangle(rectangle: Rectangle): boolean;
    inflate(deltaX: number, deltaY?: number): this;
    applyOffsetsInside(offsets: IOffsets): this;
    applyNormalizedOffsetsInside(offsets: IOffsets): this;
    applyOffsetsOutside(offsets: IOffsets): this;
    applyConverter(converter: SimpleConverter<number>): this;
    static getHorizIntersection(objA: IRectangle, objB: IRectangle): FixedInterval | null;
    static getVertIntersection(objA: IRectangle, objB: IRectangle): FixedInterval | null;
    static getIntersection(objA: IRectangle, objB: IRectangle): Rectangle | null;
    static getHorNonCollapsedIntersection(objA: Rectangle, objB: Rectangle): FixedInterval | null;
    static getVertNonCollapsedIntersection(objA: Rectangle, objB: Rectangle): FixedInterval | null;
    static getNonCollapsedIntersection(objA: Rectangle, objB: Rectangle): Rectangle | null;
    static areIntersected(rectA: IRectangle, rectB: IRectangle): boolean;
    static union(rectA: IRectangle, rectB: IRectangle): Rectangle;
    static equals(a: IRectangle, b: IRectangle): boolean;
    static center(rect: IRectangle): Point;
    static containsPoint(rect: IRectangle, point: IPoint): boolean;
    readonly right: number;
    readonly bottom: number;
    readonly center: Point;
}
export declare enum HitTestDeviation {
    None = 0,
    Top = 1,
    Bottom = 2,
    Left = 4,
    Right = 8
}
export declare class RectangleDeviation {
    initRectangle: Rectangle;
    initPoint: Point;
    deviation: Flag;
    offsetToInside: Point;
    insidePoint: Point;
    constructor(initRectangle: Rectangle, initPoint: Point);
    calcDeviation(): this;
    calcAdditionalParams(): this;
}
//# sourceMappingURL=rectangle.d.ts.map
