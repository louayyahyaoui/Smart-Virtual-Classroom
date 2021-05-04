/**
 * DevExtreme (core/utils/scroll_rtl_behavior.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _call_once = _interopRequireDefault(require("./call_once"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getScrollRtlBehavior = (0, _call_once.default)(function() {
    var document = _dom_adapter.default.getDocument();
    document.body.insertAdjacentHTML("beforeend", "<div style='direction: rtl;\n       position: absolute; left: 0; top: -1; overflow: hidden; width: 1px;\n       height: 1px;'><div style='width: 2px; height: 1px;'></div></div>");
    var scroller = document.body.lastElementChild;
    var initiallyPositive = scroller.scrollLeft > 0;
    scroller.scrollLeft = -1;
    var hasNegative = scroller.scrollLeft < 0;
    var result = {
        decreasing: hasNegative || initiallyPositive,
        positive: !hasNegative
    };
    document.body.removeChild(scroller);
    return result
});
var _default = getScrollRtlBehavior;
exports.default = _default;
module.exports = exports.default;
