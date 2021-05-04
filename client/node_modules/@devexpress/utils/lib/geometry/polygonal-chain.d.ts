import { ExtendedMinMax } from '../class/min-max';
import { IPoint } from './interfaces';
import { Point } from './point';
import { Rectangle } from './rectangle';
import { Segment } from './segment';
import { Vector } from './vector';
export declare class PolygonalChain<T extends Point = Point> {
    points: T[];
    constructor(points: T[]);
    getSegment(edgeIndex: number): Segment;
    rotateAround(point: IPoint, angle: number, rightSC?: boolean, byClockwise?: boolean): this;
    changeCoordinateCenterTo(p: IPoint): this;
    projection(axis: Vector): ExtendedMinMax<T>;
    readonly bounds: Rectangle;
}
//# sourceMappingURL=polygonal-chain.d.ts.map
