/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog.delete_item.js)
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
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _uiFile_managerDialog = _interopRequireDefault(require("./ui.file_manager.dialog.js"));

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
var FILE_MANAGER_DIALOG_DELETE_ITEM = "dx-filemanager-dialog-delete-item";
var FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP = "dx-filemanager-dialog-delete-item-popup";
var FileManagerDeleteItemDialog = function(_FileManagerDialogBas) {
    _inheritsLoose(FileManagerDeleteItemDialog, _FileManagerDialogBas);

    function FileManagerDeleteItemDialog() {
        return _FileManagerDialogBas.apply(this, arguments) || this
    }
    var _proto = FileManagerDeleteItemDialog.prototype;
    _proto.show = function(_ref) {
        var itemName = _ref.itemName,
            itemCount = _ref.itemCount;
        var text = 1 === itemCount ? _message.default.format("dxFileManager-dialogDeleteItemSingleItemConfirmation", itemName) : _message.default.format("dxFileManager-dialogDeleteItemMultipleItemsConfirmation", itemCount);
        if (this._$text) {
            this._$text.text(text)
        } else {
            this._initialText = text
        }
        _FileManagerDialogBas.prototype.show.call(this)
    };
    _proto._getDialogOptions = function() {
        return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDialogOptions.call(this), {
            title: _message.default.format("dxFileManager-dialogDeleteItemTitle"),
            buttonText: _message.default.format("dxFileManager-dialogDeleteItemButtonText"),
            contentCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM,
            popupCssClass: FILE_MANAGER_DIALOG_DELETE_ITEM_POPUP,
            height: "auto",
            maxHeight: "80vh"
        })
    };
    _proto._createContentTemplate = function(element) {
        _FileManagerDialogBas.prototype._createContentTemplate.call(this, element);
        this._$text = (0, _renderer.default)("<div>").text(this._initialText).appendTo(this._$contentElement);
        this._createComponent(this._$contentElement, _scroll_view.default, {
            width: "100%",
            height: "100%"
        })
    };
    _proto._getDialogResult = function() {
        return {}
    };
    return FileManagerDeleteItemDialog
}(_uiFile_managerDialog.default);
var _default = FileManagerDeleteItemDialog;
exports.default = _default;
module.exports = exports.default;
