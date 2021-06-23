"use strict";
/**
 * Created by user on 2018/2/1/001.
 */
Object.defineProperty(exports, "__esModule", { value: true });
try {
    // zipfile is an optional dependency:
    exports.ZipFile = require("zipfile").ZipFile;
}
catch (err) {
    // Mock zipfile using pure-JS adm-zip:
    const AdmZip = require('adm-zip');
    // @ts-ignore
    exports.ZipFile = (class {
        constructor(filename) {
            this.admZip = new AdmZip(filename);
            this.names = this.admZip.getEntries().map(function (zipEntry) {
                return zipEntry.entryName;
            });
        }
        readFile(name, cb) {
            this.admZip.readFileAsync(this.admZip.getEntry(name), function (buffer, error) {
                // `error` is bogus right now, so let's just drop it.
                // see https://github.com/cthackers/adm-zip/pull/88
                return cb(null, buffer);
            });
        }
        get count() {
            return this.names.length;
        }
    });
}
exports.default = exports.ZipFile;
