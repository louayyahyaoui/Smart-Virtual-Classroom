/**
 * DevExtreme (ui/file_manager/ui.file_manager.dialog.folder_chooser.js)
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
var _uiFile_manager = require("./ui.file_manager.common");
var _uiFile_managerDialog = _interopRequireDefault(require("./ui.file_manager.dialog.js"));
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.files_tree_view"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
var FILE_MANAGER_DIALOG_FOLDER_CHOOSER = "dx-filemanager-dialog-folder-chooser";
var FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP = "dx-filemanager-dialog-folder-chooser-popup";
var FileManagerFolderChooserDialog = function(_FileManagerDialogBas) {
    _inheritsLoose(FileManagerFolderChooserDialog, _FileManagerDialogBas);

    function FileManagerFolderChooserDialog() {
        return _FileManagerDialogBas.apply(this, arguments) || this
    }
    var _proto = FileManagerFolderChooserDialog.prototype;
    _proto.show = function() {
        var _this$_filesTreeView;
        this._resetDialogSelectedDirectory();
        null === (_this$_filesTreeView = this._filesTreeView) || void 0 === _this$_filesTreeView ? void 0 : _this$_filesTreeView.refresh();
        _FileManagerDialogBas.prototype.show.call(this)
    };
    _proto.switchToCopyDialog = function(targetItemInfos) {
        this._targetItemInfos = targetItemInfos;
        this._setTitle(_message.default.format("dxFileManager-dialogDirectoryChooserCopyTitle"));
        this._setButtonText(_message.default.format("dxFileManager-dialogDirectoryChooserCopyButtonText"))
    };
    _proto.switchToMoveDialog = function(targetItemInfos) {
        this._targetItemInfos = targetItemInfos;
        this._setTitle(_message.default.format("dxFileManager-dialogDirectoryChooserMoveTitle"));
        this._setButtonText(_message.default.format("dxFileManager-dialogDirectoryChooserMoveButtonText"))
    };
    _proto._getDialogOptions = function() {
        return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDialogOptions.call(this), {
            contentCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER,
            popupCssClass: FILE_MANAGER_DIALOG_FOLDER_CHOOSER_POPUP
        })
    };
    _proto._createContentTemplate = function(element) {
        var _this = this;
        _FileManagerDialogBas.prototype._createContentTemplate.call(this, element);
        this._filesTreeView = this._createComponent((0, _renderer.default)("<div>"), _uiFile_manager2.default, {
            getDirectories: this.option("getDirectories"),
            getCurrentDirectory: function() {
                return _this._getDialogSelectedDirectory()
            },
            onDirectoryClick: function(e) {
                return _this._onFilesTreeViewDirectoryClick(e)
            },
            onFilesTreeViewContentReady: function() {
                return _this._toggleUnavailableLocationsDisabled(true)
            }
        });
        this._$contentElement.append(this._filesTreeView.$element())
    };
    _proto._getDialogResult = function() {
        var result = this._getDialogSelectedDirectory();
        return result ? {
            folder: result
        } : result
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_FileManagerDialogBas.prototype._getDefaultOptions.call(this), {
            getItems: null
        })
    };
    _proto._getDialogSelectedDirectory = function() {
        return this._selectedDirectoryInfo
    };
    _proto._resetDialogSelectedDirectory = function() {
        this._selectedDirectoryInfo = null
    };
    _proto._onFilesTreeViewDirectoryClick = function(_ref) {
        var itemData = _ref.itemData;
        this._selectedDirectoryInfo = itemData;
        this._filesTreeView.updateCurrentDirectory()
    };
    _proto._onPopupShown = function() {
        this._toggleUnavailableLocationsDisabled(true);
        _FileManagerDialogBas.prototype._onPopupShown.call(this)
    };
    _proto._onPopupHidden = function() {
        this._toggleUnavailableLocationsDisabled(false);
        _FileManagerDialogBas.prototype._onPopupHidden.call(this)
    };
    _proto._toggleUnavailableLocationsDisabled = function(isDisabled) {
        var _this2 = this;
        if (!this._filesTreeView) {
            return
        }
        var locations = this._getLocationsToProcess(isDisabled);
        this._filesTreeView.toggleDirectoryExpandedStateRecursive(locations.locationsToExpand[0], isDisabled).then(function() {
            return _this2._filesTreeView.toggleDirectoryLineExpandedState(locations.locationsToCollapse, !isDisabled).then(function() {
                return locations.locationKeysToDisable.forEach(function(key) {
                    return _this2._filesTreeView.toggleNodeDisabledState(key, isDisabled)
                })
            })
        })
    };
    _proto._getLocationsToProcess = function(isDisabled) {
        var _expandMap$keys;
        var expandLocations = {};
        var collapseLocations = {};
        this._targetItemInfos.forEach(function(itemInfo) {
            if (itemInfo.parentDirectory) {
                expandLocations[itemInfo.parentDirectory.getInternalKey()] = itemInfo.parentDirectory
            }
            if (itemInfo.fileItem.isDirectory) {
                collapseLocations[itemInfo.getInternalKey()] = itemInfo
            }
        });
        var expandMap = (0, _uiFile_manager.getMapFromObject)(expandLocations);
        var collapseMap = (0, _uiFile_manager.getMapFromObject)(collapseLocations);
        return {
            locationsToExpand: isDisabled ? expandMap.values : [],
            locationsToCollapse: isDisabled ? collapseMap.values : [],
            locationKeysToDisable: (_expandMap$keys = expandMap.keys).concat.apply(_expandMap$keys, _toConsumableArray(collapseMap.keys))
        }
    };
    return FileManagerFolderChooserDialog
}(_uiFile_managerDialog.default);
var _default = FileManagerFolderChooserDialog;
exports.default = _default;
module.exports = exports.default;
