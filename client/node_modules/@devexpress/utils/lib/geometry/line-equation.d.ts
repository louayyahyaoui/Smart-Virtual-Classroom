import { IPoint } from './interfaces';
import { Point } from './point';
export declare class LineEquation {
    private aParam;
    private bParam;
    private cParam;
    constructor(aParam: number, bParam: number, cParam: number);
    equals(obj: LineEquation): boolean;
    getIntersection(equation: LineEquation): Point | null;
    static fromPoints(pointA: IPoint, pointB: IPoint): LineEquation;
    static getIntersection(a: LineEquation, b: LineEquation): Point | null;
    static equals(a: LineEquation, b: LineEquation): boolean;
}
//# sourceMappingURL=line-equation.d.ts.map
