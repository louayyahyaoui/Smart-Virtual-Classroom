import { IRectangle } from './interfaces';
import { Point } from './point';
import { Segment } from './segment';
import { PolygonalChain } from './polygonal-chain';
export declare class Polygon<T extends Point = Point> extends PolygonalChain<T> {
    static fromRectangle(rect: IRectangle): Polygon<Point>;
    getEdge(edgeIndex: number): Segment;
    static collision<T1 extends Point, T2 extends Point>(a: Polygon<T1>, b: Polygon<T2>): CollisionResult;
    readonly numEdges: number;
}
export declare enum CollisionResult {
    None = 0,
    Intersect = 1,
    Contact = 2
}
//# sourceMappingURL=polygon.d.ts.map
