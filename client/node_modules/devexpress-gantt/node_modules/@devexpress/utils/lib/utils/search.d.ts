export declare class SearchUtils {
    static binaryIndexOf<T>(array: T[], comparer: (a: T) => number, minIndex?: number, maxIndex?: number): number;
    static normedBinaryIndexOf<T>(array: T[], comparer: (a: T) => number, minIndex?: number, maxIndex?: number): number;
    static binaryIndexNormalizator(index: number): number;
    static normedInterpolationIndexOf<T>(array: T[], getValue: (obj: T) => number, toFind: number, lowIndex?: number, highIndex?: number): number;
}
//# sourceMappingURL=search.d.ts.map
