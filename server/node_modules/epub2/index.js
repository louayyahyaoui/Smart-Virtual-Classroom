"use strict";
/**
 * Created by user on 2018/2/1/001.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const libEPub = require("./epub");
const Promise = require("bluebird");
const path = require("path");
// @ts-ignore
__export(require("./epub"));
class EPub extends libEPub {
    static createAsync(epubfile, imagewebroot, chapterwebroot, ...argv) {
        const self = this;
        const p = self.libPromise;
        return new p(function (resolve, reject) {
            const epub = self.create(epubfile, imagewebroot, chapterwebroot, ...argv);
            const cb_err = function (err) {
                err.epub = epub;
                return reject(err);
            };
            epub.on('error', cb_err);
            epub.on('end', function (err) {
                if (err) {
                    cb_err(err);
                }
                else {
                    resolve(this);
                }
            });
            epub.parse();
        });
    }
    _p_method_cb(method, options = {}, ...argv) {
        const self = this;
        const p = this._getStatic().libPromise;
        return Promise.fromCallback(method.bind(self, argv), options);
    }
    getChapterAsync(chapterId) {
        return this._p_method_cb(this.getChapter, null, chapterId);
    }
    getChapterRawAsync(chapterId) {
        return this._p_method_cb(this.getChapterRaw, null, chapterId);
    }
    getFileAsync(id) {
        return this._p_method_cb(this.getFile, {
            multiArgs: true,
        }, id);
    }
    getImageAsync(id) {
        return this._p_method_cb(this.getImage, {
            multiArgs: true,
        }, id);
    }
    listImage() {
        const epub = this;
        const mimes = [
            'image/jpeg',
        ];
        const exts = [
            'jpg',
            'png',
            'gif',
            'webp',
            'tif',
            'bmp',
        ];
        return Object.keys(epub.manifest)
            .reduce(function (a, id) {
            let elem = epub.manifest[id];
            let mime = elem['media-type'] || elem.mediaType;
            if (mimes.includes(mime) || mime.indexOf('image') == 0 || exts.includes(path.extname(elem.href))) {
                a.push(elem);
            }
            return a;
        }, []);
    }
}
exports.EPub = EPub;
(function (EPub) {
    EPub.xml2jsOptions = Object.assign({}, libEPub.xml2jsOptions, {
        normalize: null,
    });
    /**
     * allow change Promise class
     * @type {PromiseConstructor}
     */
    EPub.libPromise = Promise;
})(EPub = exports.EPub || (exports.EPub = {}));
exports.default = EPub;
