/**
 * DevExtreme (ui/data_grid/ui.data_grid.header_panel.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.HeaderPanel = void 0;
var _uiData_grid = _interopRequireDefault(require("./ui.data_grid.core"));
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.header_panel"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var HeaderPanel = _uiGrid_core.default.views.headerPanel;
exports.HeaderPanel = HeaderPanel;
_uiData_grid.default.registerModule("headerPanel", _uiGrid_core.default);
