import { ConstInterval } from './const';
export declare abstract class MutableInterval extends ConstInterval {
    abstract expand(interval: ConstInterval): this;
    normalizeLength(): this;
    start: number;
    length: number;
    end: number;
}
//# sourceMappingURL=mutable.d.ts.map
