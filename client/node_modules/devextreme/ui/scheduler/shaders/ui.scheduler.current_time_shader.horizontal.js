/**
 * DevExtreme (ui/scheduler/shaders/ui.scheduler.current_time_shader.horizontal.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _position = require("../../../core/utils/position");
var _uiScheduler = _interopRequireDefault(require("../shaders/ui.scheduler.current_time_shader"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var HorizontalCurrentTimeShader = function(_CurrentTimeShader) {
    _inheritsLoose(HorizontalCurrentTimeShader, _CurrentTimeShader);

    function HorizontalCurrentTimeShader() {
        return _CurrentTimeShader.apply(this, arguments) || this
    }
    var _proto = HorizontalCurrentTimeShader.prototype;
    _proto.renderShader = function() {
        var groupCount = this._workSpace._isHorizontalGroupedWorkSpace() ? this._workSpace._getGroupCount() : 1;
        for (var i = 0; i < groupCount; i++) {
            var isFirstShader = 0 === i;
            var $shader = isFirstShader ? this._$shader : this.createShader();
            this.applyShaderMargin($shader);
            if (this._workSpace.isGroupedByDate()) {
                this._customizeGroupedByDateShader($shader, i)
            } else {
                this._customizeShader($shader, i)
            }!isFirstShader && this._shader.push($shader)
        }
    };
    _proto._customizeShader = function($shader, groupIndex) {
        var shaderWidth = this._workSpace.getIndicationWidth();
        this._applyShaderWidth($shader, shaderWidth);
        if (groupIndex >= 1) {
            var workSpace = this._workSpace;
            var indicationWidth = workSpace._getCellCount() * workSpace.getCellWidth();
            $shader.css("left", indicationWidth)
        } else {
            $shader.css("left", 0)
        }
    };
    _proto._applyShaderWidth = function($shader, width) {
        var maxWidth = (0, _position.getBoundingRect)(this._$container.get(0)).width;
        if (width > maxWidth) {
            width = maxWidth
        }
        if (width > 0) {
            $shader.width(width)
        }
    };
    _proto._customizeGroupedByDateShader = function($shader, groupIndex) {
        var cellCount = this._workSpace.getIndicationCellCount();
        var integerPart = Math.floor(cellCount);
        var fractionPart = cellCount - integerPart;
        var isFirstShaderPart = 0 === groupIndex;
        var workSpace = this._workSpace;
        var shaderWidth = isFirstShaderPart ? workSpace.getIndicationWidth() : fractionPart * workSpace.getCellWidth();
        var shaderLeft;
        this._applyShaderWidth($shader, shaderWidth);
        if (isFirstShaderPart) {
            shaderLeft = workSpace._getCellCount() * workSpace.getCellWidth() * groupIndex
        } else {
            shaderLeft = workSpace.getCellWidth() * integerPart * workSpace._getGroupCount() + groupIndex * workSpace.getCellWidth()
        }
        $shader.css("left", shaderLeft)
    };
    return HorizontalCurrentTimeShader
}(_uiScheduler.default);
var _default = HorizontalCurrentTimeShader;
exports.default = _default;
module.exports = exports.default;
