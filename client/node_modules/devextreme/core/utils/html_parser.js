/**
 * DevExtreme (core/utils/html_parser.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isTablePart = exports.parseHTML = void 0;
var _array = require("./array");
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var isTagName = /<([a-z][^/\0>\x20\t\r\n\f]+)/i;
var tagWrappers = {
    "default": {
        tagsCount: 0,
        startTags: "",
        endTags: ""
    },
    thead: {
        tagsCount: 1,
        startTags: "<table>",
        endTags: "</table>"
    },
    td: {
        tagsCount: 3,
        startTags: "<table><tbody><tr>",
        endTags: "</tr></tbody></table>"
    },
    col: {
        tagsCount: 2,
        startTags: "<table><colgroup>",
        endTags: "</colgroup></table>"
    },
    tr: {
        tagsCount: 2,
        startTags: "<table><tbody>",
        endTags: "</tbody></table>"
    }
};
tagWrappers.tbody = tagWrappers.colgroup = tagWrappers.caption = tagWrappers.tfoot = tagWrappers.thead;
tagWrappers.th = tagWrappers.td;
var parseHTML = function(html) {
    if ("string" !== typeof html) {
        return null
    }
    var fragment = _dom_adapter.default.createDocumentFragment();
    var container = fragment.appendChild(_dom_adapter.default.createElement("div"));
    var tags = isTagName.exec(html);
    var firstRootTag = tags && tags[1].toLowerCase();
    var tagWrapper = tagWrappers[firstRootTag] || tagWrappers.default;
    container.innerHTML = tagWrapper.startTags + html + tagWrapper.endTags;
    for (var i = 0; i < tagWrapper.tagsCount; i++) {
        container = container.lastChild
    }
    return (0, _array.merge)([], container.childNodes)
};
exports.parseHTML = parseHTML;
var isTablePart = function(html) {
    var tags = isTagName.exec(html);
    return tags && tags[1] in tagWrappers
};
exports.isTablePart = isTablePart;
