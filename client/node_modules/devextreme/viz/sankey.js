/**
 * DevExtreme (viz/sankey.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _sankey = _interopRequireDefault(require("./sankey/sankey"));
var _tooltip = require("./sankey/tooltip");
var _export = require("./core/export");
var _title = require("./core/title");
var _tracker = require("./sankey/tracker");
var _tooltip2 = require("./core/tooltip");
var _loading_indicator = require("./core/loading_indicator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
_sankey.default.addPlugin(_export.plugin);
_sankey.default.addPlugin(_title.plugin);
_sankey.default.addPlugin(_tracker.plugin);
_sankey.default.addPlugin(_loading_indicator.plugin);
_sankey.default.addPlugin(_tooltip2.plugin);
(0, _tooltip.setTooltipCustomOptions)(_sankey.default);
var _default = _sankey.default;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
