import { ICloneable, IEquatable, ISupportConverting, ISupportCopyFrom } from '../types';
import { Offsets } from './offsets';
export declare class Paddings extends Offsets implements IEquatable<Paddings>, ICloneable<Paddings>, ISupportCopyFrom<Paddings>, ISupportConverting<number> {
    static empty(): Paddings;
    clone(): Paddings;
}
//# sourceMappingURL=paddings.d.ts.map
