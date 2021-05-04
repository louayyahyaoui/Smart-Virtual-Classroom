/**
 * DevExtreme (ui/notify.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _action = _interopRequireDefault(require("../core/action"));
var _view_port = require("../core/utils/view_port");
var _extend = require("../core/utils/extend");
var _type = require("../core/utils/type");
var _toast = _interopRequireDefault(require("./toast"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var $notify = null;
var notify = function(message, type, displayTime) {
    var options = (0, _type.isPlainObject)(message) ? message : {
        message: message
    };
    var userHiddenAction = options.onHidden;
    (0, _extend.extend)(options, {
        type: type,
        displayTime: displayTime,
        onHidden: function(args) {
            (0, _renderer.default)(args.element).remove();
            new _action.default(userHiddenAction, {
                context: args.model
            }).execute(arguments)
        }
    });
    $notify = (0, _renderer.default)("<div>").appendTo((0, _view_port.value)());
    new _toast.default($notify, options).show()
};
var _default = notify;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
