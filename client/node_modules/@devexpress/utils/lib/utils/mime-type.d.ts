export declare const OpenXmlMimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
export declare const RtfMimeType = "application/rtf";
export declare const PlainTextMimeType = "text/plain";
export declare const DocmMimeType = "application/vnd.ms-word.document.macroEnabled.12";
export declare const ImagePngMimeType = "image/png";
export declare const ImageGifMimeType = "image/gif";
export declare const ImageJpegMimeType = "image/jpeg";
export declare const ImagePjpegMimeType = "image/pjpeg";
export declare const ImageSvgMimeType = "image/svg+xml";
export declare const ImageTiffMimeType = "image/tiff";
export declare const ImageIcoMimeType = "image/vnd.microsoft.icon";
export declare const ImageWbmpMimeType = "image/vnd.wap.wbmp";
export declare const ImageWebpMimeType = "image/webp";
export declare enum DxMimeType {
    Unknown = 0,
    OpenXml = 1,
    Rtf = 2,
    PlainText = 3,
    Docm = 4,
    Png = 5,
    Gif = 6,
    Jpeg = 7,
    Pjpeg = 8,
    Svg = 9,
    Tiff = 10,
    Ico = 11,
    Wbmp = 12,
    Webp = 13
}
export declare class MimeTypeUtils {
    static stringTypeToTypeMap: Record<string, DxMimeType | undefined>;
    static typeToStringTypeMap: Record<DxMimeType, string | undefined>;
    static typeToExtensionMap: Record<DxMimeType, string | undefined>;
    static extensionToTypeMap: Record<string, DxMimeType | undefined>;
    static stringTypeToExtension(mimeTypeAsStr: string): string;
    static typeToExtension(mimeType: DxMimeType): string;
    static extensionToType(extension: string): DxMimeType;
    static typeToStringType(mimeType: DxMimeType): string;
    static stringTypeToType(mimeTypeAsStr: string): DxMimeType;
}
//# sourceMappingURL=mime-type.d.ts.map
