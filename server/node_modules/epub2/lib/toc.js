"use strict";
/**
 * Created by user on 2018/3/18/018.
 */
Object.defineProperty(exports, "__esModule", { value: true });
function fixToc(epub) {
    let manifest_keys = Object.keys(epub.manifest);
    epub.toc.forEach(function (toc, idx) {
        if (!epub.manifest[toc.id]) {
            for (let k of manifest_keys) {
                let row = epub.manifest[k];
                if ((row.href == toc.href) || (row.href.replace(/#.+$/g, '') == toc.href.replace(/#.+$/g, ''))) {
                    toc.id = k;
                }
            }
        }
    });
    return epub;
}
exports.fixToc = fixToc;
const self = require("./toc");
exports.default = self;
