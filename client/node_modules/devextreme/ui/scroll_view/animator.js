/**
 * DevExtreme (ui/scroll_view/animator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _common = require("../../core/utils/common");
var _class = _interopRequireDefault(require("../../core/class"));
var _frame = require("../../animation/frame");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _class.default.abstract;
var Animator = _class.default.inherit({
    ctor: function() {
        this._finished = true;
        this._stopped = false;
        this._proxiedStepCore = this._stepCore.bind(this)
    },
    start: function() {
        this._stopped = false;
        this._finished = false;
        this._stepCore()
    },
    stop: function() {
        this._stopped = true;
        (0, _frame.cancelAnimationFrame)(this._stepAnimationFrame)
    },
    _stepCore: function() {
        if (this._isStopped()) {
            this._stop();
            return
        }
        if (this._isFinished()) {
            this._finished = true;
            this._complete();
            return
        }
        this._step();
        this._stepAnimationFrame = (0, _frame.requestAnimationFrame)(this._proxiedStepCore)
    },
    _step: abstract,
    _isFinished: _common.noop,
    _stop: _common.noop,
    _complete: _common.noop,
    _isStopped: function() {
        return this._stopped
    },
    inProgress: function() {
        return !(this._stopped || this._finished)
    }
});
var _default = Animator;
exports.default = _default;
module.exports = exports.default;
