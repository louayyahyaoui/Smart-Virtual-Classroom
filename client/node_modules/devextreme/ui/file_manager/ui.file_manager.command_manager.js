/**
 * DevExtreme (ui/file_manager/ui.file_manager.command_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.FileManagerCommandManager = void 0;
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _message = _interopRequireDefault(require("../../localization/message"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FileManagerCommandManager = function() {
    function FileManagerCommandManager(permissions) {
        this._actions = {};
        this._permissions = permissions || {};
        this._initCommands()
    }
    var _proto = FileManagerCommandManager.prototype;
    _proto._initCommands = function() {
        var _this = this;
        this._commands = [{
            name: "create",
            text: _message.default.format("dxFileManager-commandCreate"),
            icon: "newfolder",
            enabled: this._permissions.create,
            noFileItemRequired: true
        }, {
            name: "rename",
            text: _message.default.format("dxFileManager-commandRename"),
            icon: "rename",
            enabled: this._permissions.rename,
            isSingleFileItemCommand: true
        }, {
            name: "move",
            text: _message.default.format("dxFileManager-commandMove"),
            icon: "movetofolder",
            enabled: this._permissions.move
        }, {
            name: "copy",
            text: _message.default.format("dxFileManager-commandCopy"),
            icon: "copy",
            enabled: this._permissions.copy
        }, {
            name: "delete",
            text: _message.default.format("dxFileManager-commandDelete"),
            icon: "trash",
            enabled: this._permissions.delete
        }, {
            name: "download",
            text: _message.default.format("dxFileManager-commandDownload"),
            icon: "download",
            enabled: this._permissions.download
        }, {
            name: "upload",
            text: _message.default.format("dxFileManager-commandUpload"),
            icon: "upload",
            enabled: this._permissions.upload,
            noFileItemRequired: true
        }, {
            name: "refresh",
            text: _message.default.format("dxFileManager-commandRefresh"),
            icon: "dx-filemanager-i dx-filemanager-i-refresh",
            enabled: true,
            noFileItemRequired: true
        }, {
            name: "thumbnails",
            text: _message.default.format("dxFileManager-commandThumbnails"),
            icon: "mediumiconslayout",
            enabled: true,
            noFileItemRequired: true
        }, {
            name: "details",
            text: _message.default.format("dxFileManager-commandDetails"),
            icon: "detailslayout",
            enabled: true,
            noFileItemRequired: true
        }, {
            name: "clearSelection",
            text: _message.default.format("dxFileManager-commandClearSelection"),
            icon: "remove",
            enabled: true
        }, {
            name: "showNavPane",
            hint: _message.default.format("dxFileManager-commandShowNavPane"),
            icon: "menu",
            enabled: false,
            noFileItemRequired: true
        }];
        this._commandMap = {};
        this._commands.forEach(function(command) {
            _this._commandMap[command.name] = command
        })
    };
    _proto.registerActions = function(actions) {
        this._actions = (0, _extend.extend)(this._actions, actions)
    };
    _proto.executeCommand = function(command, arg) {
        var commandName = (0, _type.isString)(command) ? command : command.name;
        var action = this._actions[commandName];
        if (action) {
            return action(arg)
        }
    };
    _proto.setCommandEnabled = function(commandName, enabled) {
        var command = this.getCommandByName(commandName);
        if (command) {
            command.enabled = enabled
        }
    };
    _proto.getCommandByName = function(name) {
        return this._commandMap[name]
    };
    _proto.isCommandAvailable = function(commandName, itemInfos) {
        var command = this.getCommandByName(commandName);
        if (!command || !command.enabled) {
            return false
        }
        if (command.noFileItemRequired) {
            return true
        }
        var itemsLength = itemInfos && itemInfos.length || 0;
        if (0 === itemsLength || itemInfos.some(function(item) {
                return item.fileItem.isRoot() || item.fileItem.isParentFolder
            })) {
            return false
        }
        if ("download" === commandName) {
            return itemInfos.every(function(itemInfo) {
                return !itemInfo.fileItem.isDirectory
            })
        }
        return !command.isSingleFileItemCommand || 1 === itemsLength
    };
    return FileManagerCommandManager
}();
exports.FileManagerCommandManager = FileManagerCommandManager;
