/**
 * DevExtreme (ui/tree_list/ui.tree_list.grid_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.grid_view"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var GridView = _uiGrid_core.default.views.gridView.inherit(function() {
    return {
        _getWidgetAriaLabel: function() {
            return "dxTreeList-ariaTreeList"
        },
        _getTableRoleName: function() {
            return "treegrid"
        }
    }
}());
_uiTree_list.default.registerModule("gridView", {
    defaultOptions: _uiGrid_core.default.defaultOptions,
    controllers: _uiGrid_core.default.controllers,
    views: {
        gridView: GridView
    },
    extenders: {
        controllers: {
            resizing: {
                _toggleBestFitMode: function(isBestFit) {
                    this.callBase(isBestFit);
                    if (!this.option("legacyRendering")) {
                        var $rowsTable = this._rowsView.getTableElement();
                        $rowsTable.find(".dx-treelist-cell-expandable").toggleClass(this.addWidgetPrefix("best-fit"), isBestFit)
                    }
                }
            }
        }
    }
});
