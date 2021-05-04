/**
 * DevExtreme (ui/diagram/diagram.bar.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _diagram = require("./diagram.importer");
var DiagramBar = function() {
    function DiagramBar(owner) {
        var _getDiagram = (0, _diagram.getDiagram)(),
            EventDispatcher = _getDiagram.EventDispatcher;
        this.onChanged = new EventDispatcher;
        this._owner = owner
    }
    var _proto = DiagramBar.prototype;
    _proto.raiseBarCommandExecuted = function(key, parameter) {
        this.onChanged.raise("notifyBarCommandExecuted", parseInt(key), parameter)
    };
    _proto.getCommandKeys = function() {
        throw "Not Implemented"
    };
    _proto.setItemValue = function(key, value) {};
    _proto.setItemEnabled = function(key, enabled) {};
    _proto.setItemVisible = function(key, enabled) {};
    _proto.setEnabled = function(enabled) {};
    _proto.setItemSubItems = function(key, items) {};
    _proto.isVisible = function() {
        return true
    };
    _proto._getKeys = function(items) {
        var _this = this;
        var keys = items.reduce(function(commands, item) {
            if (void 0 !== item.command) {
                commands.push(item.command)
            }
            if (item.items) {
                commands = commands.concat(_this._getKeys(item.items))
            }
            return commands
        }, []);
        return keys
    };
    return DiagramBar
}();
var _default = DiagramBar;
exports.default = _default;
module.exports = exports.default;
