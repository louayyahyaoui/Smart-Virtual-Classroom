/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog.name_editor.js)
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
var _text_box = _interopRequireDefault(require("../text_box"));
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
var FILE_MANAGER_DIALOG_NAME_EDITOR = "dx-filemanager-dialog-name-editor";
var FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP = "dx-filemanager-dialog-name-editor-popup";
var FileManagerNameEditorDialog = function(_FileManagerDialogBas) {
    _inheritsLoose(FileManagerNameEditorDialog, _FileManagerDialogBas);

    function FileManagerNameEditorDialog() {
        return _FileManagerDialogBas.apply(this, arguments) || this
    }
    var _proto = FileManagerNameEditorDialog.prototype;
    _proto.show = function(name) {
        name = name || "";
        if (this._nameTextBox) {
            this._nameTextBox.option("value", name)
        } else {
            this._initialNameValue = name
        }
        _FileManagerDialogBas.prototype.show.call(this)
    };
    _proto._onPopupShown = function() {
        if (!this._nameTextBox) {
            return
        }
        var $textBoxInput = this._nameTextBox._input();
        $textBoxInput.length && $textBoxInput[0].select();
        this._nameTextBox.focus()
    };
    _proto._getDialogOptions = function() {
        return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDialogOptions.call(this), {
            title: this.option("title"),
            buttonText: this.option("buttonText"),
            contentCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR,
            popupCssClass: FILE_MANAGER_DIALOG_NAME_EDITOR_POPUP
        })
    };
    _proto._createContentTemplate = function(element) {
        _FileManagerDialogBas.prototype._createContentTemplate.call(this, element);
        this._nameTextBox = this._createComponent((0, _renderer.default)("<div>"), _text_box.default, {
            value: this._initialNameValue,
            onEnterKey: this._applyDialogChanges.bind(this)
        });
        this._$contentElement.append(this._nameTextBox.$element())
    };
    _proto._getDialogResult = function() {
        var nameValue = this._nameTextBox.option("value");
        return nameValue ? {
            name: nameValue
        } : null
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDefaultOptions.call(this), {
            title: "",
            buttonText: ""
        })
    };
    return FileManagerNameEditorDialog
}(_uiFile_managerDialog.default);
var _default = FileManagerNameEditorDialog;
exports.default = _default;
module.exports = exports.default;
