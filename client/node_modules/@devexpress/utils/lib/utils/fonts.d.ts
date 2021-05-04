export interface IFontFaceDescriptors {
    style?: 'normal' | 'italic' | string;
    weight?: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | string | number;
    stretch?: string;
    unicodeRange?: string;
    variant?: string;
    featureSettings?: string;
    variationSettings?: string;
    display?: string;
}
export interface IFontFace extends IFontFaceDescriptors {
    family: string;
    readonly status: 'unloaded' | 'loading' | 'loaded' | 'error';
}
export declare function fontWebApiAvailable(): boolean;
export declare function afterFontsLoaded(callback: () => void): void;
export declare function loadFont(fontFamily: string, source: string | ArrayBuffer, fontFaceDescriptors: IFontFaceDescriptors, callback: (error: string | null) => void): void;
export declare function addFontToDocument(loadedFace: Record<string, unknown>): void;
export declare function checkFont(fontFamily: IFontFace, text?: string): boolean;
//# sourceMappingURL=fonts.d.ts.map
