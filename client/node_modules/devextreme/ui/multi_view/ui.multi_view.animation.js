/**
 * DevExtreme (ui/multi_view/ui.multi_view.animation.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.animation = exports._translator = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _translator2 = require("../../animation/translator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _translator = {
    move: function($element, position) {
        (0, _translator2.move)($element, {
            left: position
        })
    }
};
exports._translator = _translator;
var animation = {
    moveTo: function($element, position, duration, completeAction) {
        _fx.default.animate($element, {
            type: "slide",
            to: {
                left: position
            },
            duration: duration,
            complete: completeAction
        })
    },
    complete: function($element) {
        _fx.default.stop($element, true)
    }
};
exports.animation = animation;
