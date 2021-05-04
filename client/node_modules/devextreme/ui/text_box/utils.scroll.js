/**
 * DevExtreme (ui/text_box/utils.scroll.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.prepareScrollData = exports.allowScroll = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var allowScroll = function(container, delta, shiftKey) {
    var $container = (0, _renderer.default)(container);
    var scrollTopPos = shiftKey ? $container.scrollLeft() : $container.scrollTop();
    var prop = shiftKey ? "Width" : "Height";
    var scrollBottomPos = $container.prop("scroll".concat(prop)) - $container.prop("client".concat(prop)) - scrollTopPos;
    if (0 === scrollTopPos && 0 === scrollBottomPos) {
        return false
    }
    var isScrollFromTop = 0 === scrollTopPos && delta >= 0;
    var isScrollFromBottom = 0 === scrollBottomPos && delta <= 0;
    var isScrollFromMiddle = scrollTopPos > 0 && scrollBottomPos > 0;
    if (isScrollFromTop || isScrollFromBottom || isScrollFromMiddle) {
        return true
    }
};
exports.allowScroll = allowScroll;
var prepareScrollData = function(container, validateTarget) {
    var $container = (0, _renderer.default)(container);
    var isCorrectTarget = function(eventTarget) {
        return validateTarget ? (0, _renderer.default)(eventTarget).is(container) : true
    };
    return {
        validate: function(e) {
            if ((0, _index.isDxMouseWheelEvent)(e) && isCorrectTarget(e.target)) {
                if (allowScroll($container, -e.delta, e.shiftKey)) {
                    e._needSkipEvent = true;
                    return true
                }
                return false
            }
        }
    }
};
exports.prepareScrollData = prepareScrollData;
