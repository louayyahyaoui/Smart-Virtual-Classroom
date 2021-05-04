/**
 * DevExtreme (ui/validation/default_adapter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DefaultAdapter = _class.default.inherit({
    ctor: function(editor, validator) {
        var _this = this;
        this.editor = editor;
        this.validator = validator;
        this.validationRequestsCallbacks = [];
        var handler = function(args) {
            _this.validationRequestsCallbacks.forEach(function(item) {
                return item(args)
            })
        };
        editor.validationRequest.add(handler);
        editor.on("disposing", function() {
            editor.validationRequest.remove(handler)
        })
    },
    getValue: function() {
        return this.editor.option("value")
    },
    getCurrentValidationError: function() {
        return this.editor.option("validationError")
    },
    bypass: function() {
        return this.editor.option("disabled")
    },
    applyValidationResults: function(params) {
        this.editor.option({
            validationErrors: params.brokenRules,
            validationStatus: params.status
        })
    },
    reset: function() {
        this.editor.reset()
    },
    focus: function() {
        this.editor.focus()
    }
});
var _default = DefaultAdapter;
exports.default = _default;
module.exports = exports.default;
