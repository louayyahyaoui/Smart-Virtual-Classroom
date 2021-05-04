export declare class FileUtils {
    static loadJavascriptFile(srcUri: string, callback: () => void): {
        htmlScriptElement: HTMLScriptElement;
    };
    static startDownloadFileLocal(content: File | Blob | ArrayBuffer | string, fileName: string): void;
    static createFile(fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
    static isFile(file: unknown): file is File;
}
//# sourceMappingURL=file.d.ts.map
