export declare type EqualFunc<T> = (a: T, b: T) => boolean;
export declare type CmpFunc<T> = (a: T, b: T) => number;
export declare type SimpleConverter<T = number> = (value: T) => T;
export interface ICloneable<T> {
    clone(): T;
}
export interface ISupportCopyFrom<T> {
    copyFrom(obj: T): void;
}
export interface IDisposable {
    dispose(): any;
}
export interface IEquatable<T> {
    equals(obj: T): boolean;
}
export interface ISupportConverting<T> {
    applyConverter(converter: SimpleConverter<T>): this;
}
//# sourceMappingURL=types.d.ts.map
