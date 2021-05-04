/**
 * DevExtreme (ui/date_box/ui.date_box.strategy.native.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _common = require("../../core/utils/common");
var _uiDate_box = _interopRequireDefault(require("./ui.date_box.strategy"));
var _support = require("../../core/utils/support");
var _array = require("../../core/utils/array");
var _ui = _interopRequireDefault(require("./ui.date_utils"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _extend = require("../../core/utils/extend");
var _devices = _interopRequireDefault(require("../../core/devices"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var NativeStrategy = _uiDate_box.default.inherit({
    NAME: "Native",
    popupConfig: function(_popupConfig) {
        return (0, _extend.extend)({}, _popupConfig, {
            width: "auto"
        })
    },
    getParsedText: function(text, format) {
        if (!text) {
            return null
        }
        if ("datetime" === this.dateBox.option("type")) {
            return new Date(text.replace(/-/g, "/").replace("T", " ").split(".")[0])
        }
        if (this._isTextInput()) {
            return this.callBase(text, format)
        } else {
            return _ui.default.fromStandardDateFormat(text)
        }
    },
    _isTextInput: function() {
        return "text" === this.dateBox._input().prop("type")
    },
    renderPopupContent: _common.noop,
    _getWidgetName: _common.noop,
    _getWidgetOptions: _common.noop,
    _getDateBoxType: function() {
        var type = this.dateBox.option("type");
        if ((0, _array.inArray)(type, _ui.default.SUPPORTED_FORMATS) === -1) {
            type = "date"
        } else {
            if ("datetime" === type && !(0, _support.inputType)(type)) {
                type = "datetime-local"
            }
        }
        return type
    },
    customizeButtons: function() {
        var dropDownButton = this.dateBox.getButton("dropDown");
        if (_devices.default.real().android && dropDownButton) {
            dropDownButton.on("click", function() {
                this.dateBox._input().get(0).click()
            }.bind(this))
        }
    },
    getDefaultOptions: function() {
        return {
            mode: this._getDateBoxType()
        }
    },
    getDisplayFormat: function(displayFormat) {
        var type = this._getDateBoxType();
        return displayFormat || _ui.default.FORMATS_MAP[type]
    },
    renderInputMinMax: function($input) {
        $input.attr({
            min: _date_serialization.default.serializeDate(this.dateBox.dateOption("min"), "yyyy-MM-dd"),
            max: _date_serialization.default.serializeDate(this.dateBox.dateOption("max"), "yyyy-MM-dd")
        })
    }
});
var _default = NativeStrategy;
exports.default = _default;
module.exports = exports.default;
