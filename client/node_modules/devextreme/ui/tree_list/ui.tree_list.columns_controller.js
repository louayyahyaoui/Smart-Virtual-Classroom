/**
 * DevExtreme (ui/tree_list/ui.tree_list.columns_controller.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.ColumnsController = void 0;
var _type = require("../../core/utils/type");
var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.columns_controller"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ColumnsController = _uiGrid_core.default.controllers.columns.inherit(function() {
    return {
        _getFirstItems: function(dataSourceAdapter) {
            return this.callBase(dataSourceAdapter).map(function(node) {
                return node.data
            })
        },
        getFirstDataColumnIndex: function() {
            var visibleColumns = this.getVisibleColumns();
            var visibleColumnsLength = visibleColumns.length;
            var firstDataColumnIndex = 0;
            for (var i = 0; i <= visibleColumnsLength - 1; i++) {
                if (!(0, _type.isDefined)(visibleColumns[i].command)) {
                    firstDataColumnIndex = visibleColumns[i].index;
                    break
                }
            }
            return firstDataColumnIndex
        }
    }
}());
exports.ColumnsController = ColumnsController;
_uiTree_list.default.registerModule("columns", {
    defaultOptions: _uiGrid_core.default.defaultOptions,
    controllers: {
        columns: ColumnsController
    }
});
