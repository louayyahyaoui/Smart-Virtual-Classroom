"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fontWebApiAvailable() {
    return document.fonts && document.fonts.ready && document.fonts.ready.then;
}
exports.fontWebApiAvailable = fontWebApiAvailable;
function afterFontsLoaded(callback) {
    document.fonts.ready.then(callback);
}
exports.afterFontsLoaded = afterFontsLoaded;
function loadFont(fontFamily, source, fontFaceDescriptors, callback) {
    var font = new (window.FontFace)(fontFamily, source, fontFaceDescriptors);
    font.load().then(function (loadedFace) {
        addFontToDocument(loadedFace);
        callback(null);
    }).catch(function (error) {
        return callback(error);
    });
}
exports.loadFont = loadFont;
function addFontToDocument(loadedFace) {
    document.fonts.add(loadedFace);
}
exports.addFontToDocument = addFontToDocument;
function checkFont(fontFamily, text) {
    if (text === void 0) { text = 'b'; }
    return document.fonts.check("12px '" + fontFamily + "'", text);
}
exports.checkFont = checkFont;
