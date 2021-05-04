export declare class Initializer {
    set<TProp extends Exclude<keyof this, 'set'>>(property: TProp, value: this[TProp]): this;
}
export declare function Initialize<TOptions>(options: TOptions): {
    set: <TProperty extends keyof TOptions>(property: TProperty, value: TOptions[TProperty]) => {
        set: any;
        result: TOptions;
    };
    result: TOptions;
};
//# sourceMappingURL=initializer.d.ts.map
