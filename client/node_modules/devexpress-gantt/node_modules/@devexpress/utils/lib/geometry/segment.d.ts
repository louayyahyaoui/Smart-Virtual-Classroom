import { IPoint, IRectangle } from './interfaces';
import { Point } from './point';
export declare class Segment<T extends Point = Point> {
    startPoint: T;
    endPoint: T;
    constructor(startPoint: T, endPoint: T);
    isIntersected<AnotherT extends Point>(segment: Segment<AnotherT>): boolean;
    containsPoint(point: IPoint, accuracy?: number): boolean;
    isIntersectedByRect(rect: IRectangle): boolean;
    private intersectCore;
    readonly length: number;
    readonly xLength: number;
    readonly yLength: number;
    readonly center: Point;
}
//# sourceMappingURL=segment.d.ts.map
