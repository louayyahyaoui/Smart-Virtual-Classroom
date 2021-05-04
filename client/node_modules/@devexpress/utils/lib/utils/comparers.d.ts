import { IEquatable } from '../types';
export declare class Comparers {
    static number(a: number, b: number): number;
    static string(a: string, b: string): number;
    static stringIgnoreCase(a: string, b: string): number;
}
export declare class Equals {
    static simpleType<T extends number | boolean | string>(a: T, b: T): boolean;
    static object<T extends IEquatable<T>>(a: T, b: T): boolean;
}
//# sourceMappingURL=comparers.d.ts.map
