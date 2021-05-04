/**
 * DevExtreme (ui/drawer/ui.drawer.animation.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.animation = void 0;
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _inflector = require("../../core/utils/inflector");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var animation = {
    moveTo: function(config) {
        var $element = config.$element;
        var position = config.position;
        var direction = config.direction || "left";
        var toConfig = {};
        var animationType;
        switch (direction) {
            case "right":
                toConfig.transform = "translate(" + position + "px, 0px)";
                animationType = "custom";
                break;
            case "left":
                toConfig.left = position;
                animationType = "slide";
                break;
            case "top":
            case "bottom":
                toConfig.top = position;
                animationType = "slide"
        }
        _fx.default.animate($element, {
            type: animationType,
            to: toConfig,
            duration: config.duration,
            complete: config.complete
        })
    },
    margin: function margin(config) {
        var $element = config.$element;
        var margin = config.margin;
        var direction = config.direction || "left";
        var toConfig = {};
        toConfig["margin" + (0, _inflector.camelize)(direction, true)] = margin;
        _fx.default.animate($element, {
            to: toConfig,
            duration: config.duration,
            complete: config.complete
        })
    },
    fade: function($element, config, duration, completeAction) {
        _fx.default.animate($element, {
            type: "fade",
            to: config.to,
            from: config.from,
            duration: duration,
            complete: completeAction
        })
    },
    size: function size(config) {
        var $element = config.$element;
        var size = config.size;
        var direction = config.direction || "left";
        var marginTop = config.marginTop || 0;
        var duration = config.duration;
        var toConfig = {};
        if ("right" === direction || "left" === direction) {
            toConfig.width = size
        } else {
            toConfig.height = size
        }
        if ("bottom" === direction) {
            toConfig.marginTop = marginTop
        }
        _fx.default.animate($element, {
            to: toConfig,
            duration: duration,
            complete: config.complete
        })
    },
    complete: function($element) {
        _fx.default.stop($element, true)
    }
};
exports.animation = animation;
