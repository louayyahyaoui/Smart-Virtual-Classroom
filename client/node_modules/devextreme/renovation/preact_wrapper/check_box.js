/**
 * DevExtreme (renovation/preact_wrapper/check_box.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _editor = _interopRequireDefault(require("./editor"));

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
var CheckBox = function(_Editor) {
    _inheritsLoose(CheckBox, _Editor);

    function CheckBox() {
        return _Editor.apply(this, arguments) || this
    }
    var _proto = CheckBox.prototype;
    _proto._optionChanged = function(option) {
        var _this$_valueChangeAct;
        var _ref = option || {},
            name = _ref.name,
            previousValue = _ref.previousValue,
            value = _ref.value;
        switch (name) {
            case "value":
                null === (_this$_valueChangeAct = this._valueChangeAction) || void 0 === _this$_valueChangeAct ? void 0 : _this$_valueChangeAct.call(this, {
                    element: this.$element(),
                    previousValue: previousValue,
                    value: value,
                    event: this._valueChangeEventInstance
                });
                this._valueChangeEventInstance = null;
                _Editor.prototype._optionChanged.call(this, option);
                break;
            case "onValueChanged":
                this._valueChangeAction = this._createActionByOption("onValueChanged", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                break;
            default:
                _Editor.prototype._optionChanged.call(this, option)
        }
        this._invalidate()
    };
    return CheckBox
}(_editor.default);
exports.default = CheckBox;
module.exports = exports.default;
