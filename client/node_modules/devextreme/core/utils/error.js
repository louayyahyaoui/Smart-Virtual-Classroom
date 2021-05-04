/**
 * DevExtreme (core/utils/error.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = _default;
var _extend = require("./extend");
var _console = require("./console");
var _string = require("./string");
var _version = _interopRequireDefault(require("../version"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ERROR_URL = "http://js.devexpress.com/error/" + _version.default.split(".").slice(0, 2).join("_") + "/";

function _default(baseErrors, errors) {
    var exports = {
        ERROR_MESSAGES: (0, _extend.extend)(errors, baseErrors),
        Error: function() {
            return makeError([].slice.call(arguments))
        },
        log: function(id) {
            var method = "log";
            if (/^E\d+$/.test(id)) {
                method = "error"
            } else {
                if (/^W\d+$/.test(id)) {
                    method = "warn"
                }
            }
            _console.logger[method]("log" === method ? id : combineMessage([].slice.call(arguments)))
        }
    };

    function combineMessage(args) {
        var id = args[0];
        args = args.slice(1);
        return formatMessage(id, formatDetails(id, args))
    }

    function formatDetails(id, args) {
        args = [exports.ERROR_MESSAGES[id]].concat(args);
        return _string.format.apply(this, args).replace(/\.*\s*?$/, "")
    }

    function formatMessage(id, details) {
        return _string.format.apply(this, ["{0} - {1}. See:\n{2}", id, details, getErrorUrl(id)])
    }

    function makeError(args) {
        var id = args[0];
        args = args.slice(1);
        var details = formatDetails(id, args);
        var url = getErrorUrl(id);
        var message = formatMessage(id, details);
        return (0, _extend.extend)(new Error(message), {
            __id: id,
            __details: details,
            url: url
        })
    }

    function getErrorUrl(id) {
        return ERROR_URL + id
    }
    return exports
}
module.exports = exports.default;
