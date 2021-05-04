/**
 * DevExtreme (ui/tree_list/ui.tree_list.core.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.modules"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _default = (0, _extend.extend)({}, _uiGrid_core.default, {
    modules: [],
    foreachNodes: function(nodes, callBack, ignoreHasChildren) {
        for (var i = 0; i < nodes.length; i++) {
            if (false !== callBack(nodes[i]) && (ignoreHasChildren || nodes[i].hasChildren) && nodes[i].children.length) {
                this.foreachNodes(nodes[i].children, callBack, ignoreHasChildren)
            }
        }
    }
});
exports.default = _default;
module.exports = exports.default;
