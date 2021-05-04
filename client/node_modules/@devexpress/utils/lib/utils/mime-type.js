"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenXmlMimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
exports.RtfMimeType = 'application/rtf';
exports.PlainTextMimeType = 'text/plain';
exports.DocmMimeType = 'application/vnd.ms-word.document.macroEnabled.12';
exports.ImagePngMimeType = 'image/png';
exports.ImageGifMimeType = 'image/gif';
exports.ImageJpegMimeType = 'image/jpeg';
exports.ImagePjpegMimeType = 'image/pjpeg';
exports.ImageSvgMimeType = 'image/svg+xml';
exports.ImageTiffMimeType = 'image/tiff';
exports.ImageIcoMimeType = 'image/vnd.microsoft.icon';
exports.ImageWbmpMimeType = 'image/vnd.wap.wbmp';
exports.ImageWebpMimeType = 'image/webp';
var DxMimeType;
(function (DxMimeType) {
    DxMimeType[DxMimeType["Unknown"] = 0] = "Unknown";
    DxMimeType[DxMimeType["OpenXml"] = 1] = "OpenXml";
    DxMimeType[DxMimeType["Rtf"] = 2] = "Rtf";
    DxMimeType[DxMimeType["PlainText"] = 3] = "PlainText";
    DxMimeType[DxMimeType["Docm"] = 4] = "Docm";
    DxMimeType[DxMimeType["Png"] = 5] = "Png";
    DxMimeType[DxMimeType["Gif"] = 6] = "Gif";
    DxMimeType[DxMimeType["Jpeg"] = 7] = "Jpeg";
    DxMimeType[DxMimeType["Pjpeg"] = 8] = "Pjpeg";
    DxMimeType[DxMimeType["Svg"] = 9] = "Svg";
    DxMimeType[DxMimeType["Tiff"] = 10] = "Tiff";
    DxMimeType[DxMimeType["Ico"] = 11] = "Ico";
    DxMimeType[DxMimeType["Wbmp"] = 12] = "Wbmp";
    DxMimeType[DxMimeType["Webp"] = 13] = "Webp";
})(DxMimeType = exports.DxMimeType || (exports.DxMimeType = {}));
var MimeTypeUtils = (function () {
    function MimeTypeUtils() {
    }
    MimeTypeUtils.stringTypeToExtension = function (mimeTypeAsStr) {
        var mimeType = MimeTypeUtils.stringTypeToTypeMap[mimeTypeAsStr];
        return mimeType === undefined ? '' : MimeTypeUtils.typeToExtensionMap[mimeType];
    };
    MimeTypeUtils.typeToExtension = function (mimeType) {
        var ext = MimeTypeUtils.typeToExtensionMap[mimeType];
        return ext !== null && ext !== void 0 ? ext : '';
    };
    MimeTypeUtils.extensionToType = function (extension) {
        extension = extension.toLowerCase();
        if (extension[0] !== '.')
            extension += '.';
        var mimeType = MimeTypeUtils.extensionToTypeMap[extension];
        return mimeType !== null && mimeType !== void 0 ? mimeType : DxMimeType.Unknown;
    };
    MimeTypeUtils.typeToStringType = function (mimeType) {
        var str = MimeTypeUtils.typeToStringTypeMap[mimeType];
        return str !== null && str !== void 0 ? str : '';
    };
    MimeTypeUtils.stringTypeToType = function (mimeTypeAsStr) {
        var mimeType = MimeTypeUtils.stringTypeToTypeMap[mimeTypeAsStr];
        return mimeType === undefined ? DxMimeType.Unknown : mimeType;
    };
    MimeTypeUtils.stringTypeToTypeMap = (_a = {},
        _a[exports.OpenXmlMimeType] = DxMimeType.OpenXml,
        _a[exports.RtfMimeType] = DxMimeType.Rtf,
        _a[exports.PlainTextMimeType] = DxMimeType.PlainText,
        _a[exports.DocmMimeType] = DxMimeType.Docm,
        _a[exports.ImagePngMimeType] = DxMimeType.Png,
        _a[exports.ImageGifMimeType] = DxMimeType.Gif,
        _a[exports.ImageJpegMimeType] = DxMimeType.Jpeg,
        _a[exports.ImagePjpegMimeType] = DxMimeType.Pjpeg,
        _a[exports.ImageSvgMimeType] = DxMimeType.Svg,
        _a[exports.ImageTiffMimeType] = DxMimeType.Tiff,
        _a[exports.ImageIcoMimeType] = DxMimeType.Ico,
        _a[exports.ImageWbmpMimeType] = DxMimeType.Wbmp,
        _a[exports.ImageWebpMimeType] = DxMimeType.Webp,
        _a);
    MimeTypeUtils.typeToStringTypeMap = (_b = {},
        _b[DxMimeType.Unknown] = undefined,
        _b[DxMimeType.OpenXml] = exports.OpenXmlMimeType,
        _b[DxMimeType.Rtf] = exports.RtfMimeType,
        _b[DxMimeType.PlainText] = exports.PlainTextMimeType,
        _b[DxMimeType.Docm] = exports.DocmMimeType,
        _b[DxMimeType.Png] = exports.ImagePngMimeType,
        _b[DxMimeType.Gif] = exports.ImageGifMimeType,
        _b[DxMimeType.Jpeg] = exports.ImageJpegMimeType,
        _b[DxMimeType.Pjpeg] = exports.ImagePjpegMimeType,
        _b[DxMimeType.Svg] = exports.ImageSvgMimeType,
        _b[DxMimeType.Tiff] = exports.ImageTiffMimeType,
        _b[DxMimeType.Ico] = exports.ImageIcoMimeType,
        _b[DxMimeType.Wbmp] = exports.ImageWbmpMimeType,
        _b[DxMimeType.Webp] = exports.ImageWebpMimeType,
        _b);
    MimeTypeUtils.typeToExtensionMap = (_c = {},
        _c[DxMimeType.Unknown] = undefined,
        _c[DxMimeType.OpenXml] = '.docx',
        _c[DxMimeType.Rtf] = '.rtf',
        _c[DxMimeType.PlainText] = '.txt',
        _c[DxMimeType.Docm] = '.docm',
        _c[DxMimeType.Png] = '.png',
        _c[DxMimeType.Gif] = '.gif',
        _c[DxMimeType.Jpeg] = '.jpeg',
        _c[DxMimeType.Pjpeg] = '.pjpeg',
        _c[DxMimeType.Svg] = '.svg',
        _c[DxMimeType.Tiff] = '.tiff',
        _c[DxMimeType.Ico] = '.ico',
        _c[DxMimeType.Wbmp] = '.wbmp',
        _c[DxMimeType.Webp] = '.webp',
        _c);
    MimeTypeUtils.extensionToTypeMap = {
        '.docx': DxMimeType.OpenXml,
        '.rtf': DxMimeType.Rtf,
        '.txt': DxMimeType.PlainText,
        '.docm': DxMimeType.Docm,
        '.png': DxMimeType.Png,
        '.gif': DxMimeType.Gif,
        '.jpeg': DxMimeType.Jpeg,
        '.pjpeg': DxMimeType.Pjpeg,
        '.svg': DxMimeType.Svg,
        '.tiff': DxMimeType.Tiff,
        '.ico': DxMimeType.Ico,
        '.wbmp': DxMimeType.Wbmp,
        '.webp': DxMimeType.Webp,
    };
    return MimeTypeUtils;
}());
exports.MimeTypeUtils = MimeTypeUtils;
