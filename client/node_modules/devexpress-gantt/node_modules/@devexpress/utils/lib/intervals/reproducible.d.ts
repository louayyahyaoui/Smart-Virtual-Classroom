import { ConstInterval } from './const';
export interface IReproducibleInterval<T extends ConstInterval> {
    makeByStartEnd(start: number, end: number): T;
    makeByStartLength(start: number, length: number): T;
    makeByLengthEnd(length: number, end: number): T;
}
//# sourceMappingURL=reproducible.d.ts.map
