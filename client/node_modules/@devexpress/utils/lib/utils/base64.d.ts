import { DxMimeType } from './mime-type';
export declare class Base64Utils {
    static dataUrl: RegExp;
    static normalizeToDataUrl(base64: string, mimeType: string): string;
    static prependByDataUrl(base64: string, mimeType: string): string;
    static checkPrependDataUrl(base64: string): boolean;
    static deleteDataUrlPrefix(base64DataUrl: string): string;
    static getUint8Array(base64: string): Uint8Array;
    static fromArrayBuffer(buffer: ArrayBuffer): string;
    static getFileFromBase64(base64: string, fileName?: string, options?: FilePropertyBag): File;
    static getMimeTypeAsString(base64: string): string | null;
    static getKnownMimeType(base64: string): DxMimeType;
    static fromBlobAsArrayBuffer(blob: Blob, callback: (base64: string) => void): void;
    static fromBlobAsDataUrl(blob: Blob, callback: (base64: string) => void): void;
}
//# sourceMappingURL=base64.d.ts.map
