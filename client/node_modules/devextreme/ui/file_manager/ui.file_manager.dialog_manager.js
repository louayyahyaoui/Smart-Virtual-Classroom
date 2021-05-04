/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _message = _interopRequireDefault(require("../../localization/message"));
var _uiFile_managerDialog = _interopRequireDefault(require("./ui.file_manager.dialog.name_editor"));
var _uiFile_managerDialog2 = _interopRequireDefault(require("./ui.file_manager.dialog.folder_chooser"));
var _uiFile_managerDialog3 = _interopRequireDefault(require("./ui.file_manager.dialog.delete_item"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FileManagerDialogManager = function() {
    function FileManagerDialogManager($element, options) {
        this._$element = $element;
        this._options = options;
        var $chooseFolderDialog = (0, _renderer.default)("<div>").appendTo(this._$element);
        this._chooseDirectoryDialog = new _uiFile_managerDialog2.default($chooseFolderDialog, (0, _extend.extend)(this._options.chooseDirectoryDialog, {
            onClosed: this._options.onDialogClosed
        }));
        var $renameDialog = (0, _renderer.default)("<div>").appendTo(this._$element);
        this._renameItemDialog = new _uiFile_managerDialog.default($renameDialog, {
            title: _message.default.format("dxFileManager-dialogRenameItemTitle"),
            buttonText: _message.default.format("dxFileManager-dialogRenameItemButtonText"),
            onClosed: this._options.onDialogClosed
        });
        var $createDialog = (0, _renderer.default)("<div>").appendTo(this._$element);
        this._createItemDialog = new _uiFile_managerDialog.default($createDialog, {
            title: _message.default.format("dxFileManager-dialogCreateDirectoryTitle"),
            buttonText: _message.default.format("dxFileManager-dialogCreateDirectoryButtonText"),
            onClosed: this._options.onDialogClosed
        });
        var $deleteItemDialog = (0, _renderer.default)("<div>").appendTo(this._$element);
        this._deleteItemDialog = new _uiFile_managerDialog3.default($deleteItemDialog, {
            onClosed: this._options.onDialogClosed
        })
    }
    var _proto = FileManagerDialogManager.prototype;
    _proto.getCopyDialog = function(targetItemInfos) {
        this._chooseDirectoryDialog.switchToCopyDialog(targetItemInfos);
        return this._chooseDirectoryDialog
    };
    _proto.getMoveDialog = function(targetItemInfos) {
        this._chooseDirectoryDialog.switchToMoveDialog(targetItemInfos);
        return this._chooseDirectoryDialog
    };
    _proto.getRenameItemDialog = function() {
        return this._renameItemDialog
    };
    _proto.getCreateItemDialog = function() {
        return this._createItemDialog
    };
    _proto.getDeleteItemDialog = function() {
        return this._deleteItemDialog
    };
    return FileManagerDialogManager
}();
var _default = FileManagerDialogManager;
exports.default = _default;
module.exports = exports.default;
