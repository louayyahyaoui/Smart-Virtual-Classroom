export declare type Color = number;
export declare class ColorUtils {
    static readonly DARK_COLOR: any;
    static readonly LIGHT_COLOR: any;
    static getAlpha(color: Color): number;
    static getRed(color: Color): number;
    static getGreen(color: Color): number;
    static getBlue(color: Color): number;
    static redPartToString(color: Color): string;
    static greenPartToString(color: Color): string;
    static bluePartToString(color: Color): string;
    static fromArgbNumber(alpha: number, red: number, green: number, blue: number): Color;
    static fromRgbaString(color: string, alpha?: number): Color | null;
    static fromHashString(hash: string, alpha?: number): Color | null;
    static fromColorName(color: string, alpha?: number): Color | null;
    static fromString(color: string, alpha?: number): Color | null;
    static colorToHash(color: Color): string;
    static stringToHash(color: string): string | null;
    static isHashColorString(color: string): boolean;
    static isKnownColorName(color: string): boolean;
    static isGray(color: number): boolean;
    static colorNames: Record<string, string>;
}
//# sourceMappingURL=color.d.ts.map
