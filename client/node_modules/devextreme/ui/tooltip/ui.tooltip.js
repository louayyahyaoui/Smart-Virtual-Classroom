/**
 * DevExtreme (ui/tooltip/ui.tooltip.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.show = show;
exports.hide = hide;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _tooltip = _interopRequireDefault(require("./tooltip"));
var _extend = require("../../core/utils/extend");
var _deferred = require("../../core/utils/deferred");
var _view_port = require("../../core/utils/view_port");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var tooltip = null;
var removeTooltipElement = null;
var createTooltip = function(options) {
    options = (0, _extend.extend)({
        position: "top"
    }, options);
    var content = options.content;
    delete options.content;
    var $tooltip = (0, _renderer.default)("<div>").html(content).appendTo((0, _view_port.value)());
    removeTooltipElement = function() {
        $tooltip.remove()
    };
    tooltip = new _tooltip.default($tooltip, options)
};
var removeTooltip = function() {
    if (!tooltip) {
        return
    }
    removeTooltipElement();
    tooltip = null
};

function show(options) {
    removeTooltip();
    createTooltip(options);
    return tooltip.show()
}

function hide() {
    if (!tooltip) {
        return (new _deferred.Deferred).resolve()
    }
    return tooltip.hide().done(removeTooltip).promise()
}
