import { ICloneable, IEquatable, ISupportConverting, ISupportCopyFrom } from '../types';
import { Offsets } from './offsets';
export declare class Margins extends Offsets implements IEquatable<Margins>, ICloneable<Margins>, ISupportCopyFrom<Margins>, ISupportConverting<number> {
    static empty(): Margins;
    clone(): Margins;
}
//# sourceMappingURL=margins.d.ts.map
