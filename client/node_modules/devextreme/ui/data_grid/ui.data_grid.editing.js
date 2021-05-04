/**
 * DevExtreme (ui/data_grid/ui.data_grid.editing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
require("./ui.data_grid.editor_factory");
var _uiData_grid2 = _interopRequireDefault(require("./ui.data_grid.core"));
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.editing"));
var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
_uiData_grid2.default.registerModule("editing", (0, _extend.extend)(true, {}, _uiGrid_core.default, {
    extenders: {
        controllers: {
            data: {
                _changeRowExpandCore: function(key) {
                    var editingController = this._editingController;
                    if (Array.isArray(key)) {
                        editingController && editingController.refresh()
                    }
                    return this.callBase.apply(this, arguments)
                }
            }
        }
    }
}));
