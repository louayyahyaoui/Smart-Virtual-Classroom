/**
 * DevExtreme (ui/file_manager/ui.file_manager.editing.js)
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
var _deferred = require("../../core/utils/deferred");
var _iterator = require("../../core/utils/iterator");
var _string = require("../../core/utils/string");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiFile_manager = _interopRequireDefault(require("./ui.file_manager.dialog_manager"));
var _uiFile_manager2 = _interopRequireDefault(require("./ui.file_manager.file_uploader"));
var _uiFile_manager3 = require("./ui.file_manager.messages");

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

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
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
var FileManagerEditingControl = function(_Widget) {
    _inheritsLoose(FileManagerEditingControl, _Widget);

    function FileManagerEditingControl() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = FileManagerEditingControl.prototype;
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this._initActions();
        this._controller = this.option("controller");
        this._controller.on("EditActionStarting", this._onEditActionStarting.bind(this));
        this._controller.on("EditActionResultAcquired", this._onEditActionResultAcquired.bind(this));
        this._controller.on("EditActionItemError", this._onEditActionItemError.bind(this));
        this._controller.on("EditActionError", this._onEditActionError.bind(this));
        this._controller.on("CompleteEditActionItem", this._onCompleteEditActionItem.bind(this));
        this._controller.on("CompleteEditAction", this._onCompleteEditAction.bind(this));
        this._model = this.option("model");
        this._uploadOperationInfoMap = {};
        this._dialogManager = new _uiFile_manager.default(this.$element(), {
            chooseDirectoryDialog: {
                provider: this._controller._fileProvider,
                getDirectories: this._controller.getDirectories.bind(this._controller),
                getCurrentDirectory: this._controller.getCurrentDirectory.bind(this._controller)
            },
            onDialogClosed: this._onDialogClosed.bind(this)
        });
        this._fileUploader = this._createFileUploader();
        this._createMetadataMap()
    };
    _proto._initNotificationControl = function(notificationControl) {
        var _this = this;
        this._notificationControl = notificationControl;
        this._notificationControl.option({
            onOperationCanceled: function(_ref) {
                var info = _ref.info;
                return _this._onCancelUploadSession(info)
            },
            onOperationItemCanceled: function(_ref2) {
                var item = _ref2.item,
                    itemIndex = _ref2.itemIndex;
                return _this._onCancelFileUpload(item, itemIndex)
            }
        })
    };
    _proto._getFileUploaderComponent = function() {
        return _uiFile_manager2.default
    };
    _proto._createFileUploader = function() {
        var _this2 = this;
        var $fileUploader = (0, _renderer.default)("<div>").appendTo(this.$element());
        return this._createComponent($fileUploader, this._getFileUploaderComponent(), {
            getController: this._getFileUploaderController.bind(this),
            dropZonePlaceholderContainer: this.option("uploadDropZonePlaceholderContainer"),
            onUploadSessionStarted: function(e) {
                return _this2._onUploadSessionStarted(e)
            },
            onUploadProgress: function(e) {
                return _this2._onUploadProgress(e)
            }
        })
    };
    _proto.setUploaderDropZone = function($element) {
        this._fileUploader.option("dropZone", $element)
    };
    _proto._getFileUploaderController = function() {
        var _this3 = this;
        var uploadDirectory = this.uploadDirectoryInfo.fileItem;
        return {
            chunkSize: this._controller.getFileUploadChunkSize(),
            uploadFileChunk: function(fileData, chunksInfo) {
                return _this3._controller.uploadFileChunk(fileData, chunksInfo, uploadDirectory)
            },
            abortFileUpload: function(fileData, chunksInfo) {
                return _this3._controller.abortFileUpload(fileData, chunksInfo, uploadDirectory)
            }
        }
    };
    _proto._createMetadataMap = function() {
        var _this4 = this;
        this._metadataMap = {
            create: {
                action: function(arg) {
                    return _this4._tryCreate(arg)
                },
                affectsAllItems: true,
                singleItemProcessingMessage: _message.default.format("dxFileManager-editingCreateSingleItemProcessingMessage"),
                singleItemSuccessMessage: _message.default.format("dxFileManager-editingCreateSingleItemSuccessMessage"),
                singleItemErrorMessage: _message.default.format("dxFileManager-editingCreateSingleItemErrorMessage"),
                commonErrorMessage: _message.default.format("dxFileManager-editingCreateCommonErrorMessage")
            },
            rename: {
                action: function(arg) {
                    return _this4._tryRename(arg)
                },
                singleItemProcessingMessage: _message.default.format("dxFileManager-editingRenameSingleItemProcessingMessage"),
                singleItemSuccessMessage: _message.default.format("dxFileManager-editingRenameSingleItemSuccessMessage"),
                singleItemErrorMessage: _message.default.format("dxFileManager-editingRenameSingleItemErrorMessage"),
                commonErrorMessage: _message.default.format("dxFileManager-editingRenameCommonErrorMessage")
            },
            "delete": {
                action: function(arg) {
                    return _this4._tryDelete(arg)
                },
                singleItemProcessingMessage: _message.default.format("dxFileManager-editingDeleteSingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _message.default.format("dxFileManager-editingDeleteMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _message.default.format("dxFileManager-editingDeleteSingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _message.default.format("dxFileManager-editingDeleteMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _message.default.format("dxFileManager-editingDeleteSingleItemErrorMessage"),
                multipleItemsErrorMessage: _message.default.format("dxFileManager-editingDeleteMultipleItemsErrorMessage"),
                commonErrorMessage: _message.default.format("dxFileManager-editingDeleteCommonErrorMessage")
            },
            move: {
                action: function(arg) {
                    return _this4._tryMove(arg)
                },
                singleItemProcessingMessage: _message.default.format("dxFileManager-editingMoveSingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _message.default.format("dxFileManager-editingMoveMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _message.default.format("dxFileManager-editingMoveSingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _message.default.format("dxFileManager-editingMoveMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _message.default.format("dxFileManager-editingMoveSingleItemErrorMessage"),
                multipleItemsErrorMessage: _message.default.format("dxFileManager-editingMoveMultipleItemsErrorMessage"),
                commonErrorMessage: _message.default.format("dxFileManager-editingMoveCommonErrorMessage")
            },
            copy: {
                action: function(arg) {
                    return _this4._tryCopy(arg)
                },
                singleItemProcessingMessage: _message.default.format("dxFileManager-editingCopySingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _message.default.format("dxFileManager-editingCopyMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _message.default.format("dxFileManager-editingCopySingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _message.default.format("dxFileManager-editingCopyMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _message.default.format("dxFileManager-editingCopySingleItemErrorMessage"),
                multipleItemsErrorMessage: _message.default.format("dxFileManager-editingCopyMultipleItemsErrorMessage"),
                commonErrorMessage: _message.default.format("dxFileManager-editingCopyCommonErrorMessage")
            },
            upload: {
                action: function(arg) {
                    return _this4._tryUpload(arg)
                },
                allowCancel: true,
                allowItemProgress: true,
                singleItemProcessingMessage: _message.default.format("dxFileManager-editingUploadSingleItemProcessingMessage"),
                multipleItemsProcessingMessage: _message.default.format("dxFileManager-editingUploadMultipleItemsProcessingMessage"),
                singleItemSuccessMessage: _message.default.format("dxFileManager-editingUploadSingleItemSuccessMessage"),
                multipleItemsSuccessMessage: _message.default.format("dxFileManager-editingUploadMultipleItemsSuccessMessage"),
                singleItemErrorMessage: _message.default.format("dxFileManager-editingUploadSingleItemErrorMessage"),
                multipleItemsErrorMessage: _message.default.format("dxFileManager-editingUploadMultipleItemsErrorMessage"),
                canceledMessage: _message.default.format("dxFileManager-editingUploadCanceledMessage")
            },
            download: {
                action: function(arg) {
                    return _this4._download(arg)
                }
            },
            getItemContent: {
                action: function(arg) {
                    return _this4._getItemContent(arg)
                }
            },
            getItems: {
                singleItemProcessingMessage: "",
                singleItemErrorMessage: _message.default.format("dxFileManager-errorDirectoryOpenFailed"),
                commonErrorMessage: _message.default.format("dxFileManager-errorDirectoryOpenFailed")
            }
        }
    };
    _proto.getCommandActions = function() {
        var _this5 = this;
        var result = {};
        (0, _iterator.each)(this._metadataMap, function(name) {
            if (Object.prototype.hasOwnProperty.call(_this5._metadataMap, name)) {
                result[name] = function(arg) {
                    return _this5._executeAction(name, arg)
                }
            }
        });
        return result
    };
    _proto._executeAction = function(actionName, arg) {
        var actionMetadata = this._metadataMap[actionName];
        return actionMetadata ? actionMetadata.action(arg) : null
    };
    _proto._onCancelUploadSession = function(info) {
        this._fileUploader.cancelUpload(info.uploadSessionId)
    };
    _proto._onCancelFileUpload = function(item, itemIndex) {
        this._fileUploader.cancelFileUpload(item.info.uploadSessionId, itemIndex)
    };
    _proto._onUploadProgress = function(_ref3) {
        var sessionId = _ref3.sessionId,
            fileIndex = _ref3.fileIndex,
            commonValue = _ref3.commonValue,
            fileValue = _ref3.fileValue;
        var operationInfo = this._uploadOperationInfoMap[sessionId];
        this._notificationControl.updateOperationItemProgress(operationInfo, fileIndex, 100 * fileValue, 100 * commonValue)
    };
    _proto._onUploadSessionStarted = function(_ref4) {
        var sessionInfo = _ref4.sessionInfo;
        this._controller.processUploadSession(sessionInfo, this.uploadDirectoryInfo)
    };
    _proto._onEditActionStarting = function(actionInfo) {
        var actionMetadata = this._metadataMap[actionInfo.name];
        var context = new FileManagerActionContext(actionMetadata, actionInfo.itemInfos, actionInfo.directory);
        var operationInfo = this._notificationControl.addOperation(context.processingMessage, actionMetadata.allowCancel, !actionMetadata.allowItemProgress);
        (0, _extend.extend)(actionInfo.customData, {
            context: context,
            operationInfo: operationInfo
        });
        switch (actionInfo.name) {
            case "upload":
                var sessionId = actionInfo.customData.sessionInfo.sessionId;
                operationInfo.uploadSessionId = sessionId;
                this._uploadOperationInfoMap[sessionId] = operationInfo;
                break;
            case "rename":
                actionInfo.customData.context.itemNewName = actionInfo.customData.itemNewName
        }
    };
    _proto._onEditActionResultAcquired = function(actionInfo) {
        var _this6 = this;
        var _actionInfo$customDat = actionInfo.customData,
            context = _actionInfo$customDat.context,
            operationInfo = _actionInfo$customDat.operationInfo;
        context.singleRequest = actionInfo.singleRequest;
        var details = context.itemInfos.map(function(itemInfo) {
            return _this6._getItemProgressDisplayInfo(itemInfo)
        });
        this._notificationControl.addOperationDetails(operationInfo, details, context.actionMetadata.allowCancel)
    };
    _proto._onEditActionError = function(actionInfo, errorInfo) {
        var _actionInfo$customDat2 = actionInfo.customData,
            context = _actionInfo$customDat2.context,
            operationInfo = _actionInfo$customDat2.operationInfo;
        context.singleRequest = actionInfo.singleRequest;
        this._handleActionError(operationInfo, context, errorInfo);
        this._completeAction(operationInfo, context)
    };
    _proto._onEditActionItemError = function(actionInfo, errorInfo) {
        var _actionInfo$customDat3 = actionInfo.customData,
            context = _actionInfo$customDat3.context,
            operationInfo = _actionInfo$customDat3.operationInfo;
        this._handleActionError(operationInfo, context, errorInfo)
    };
    _proto._onCompleteEditActionItem = function(actionInfo, info) {
        var _actionInfo$customDat4 = actionInfo.customData,
            context = _actionInfo$customDat4.context,
            operationInfo = _actionInfo$customDat4.operationInfo;
        if (!info.result || !info.result.canceled) {
            context.completeOperationItem(info.index);
            this._notificationControl.completeOperationItem(operationInfo, info.index, context.commonProgress)
        }
    };
    _proto._onCompleteEditAction = function(actionInfo) {
        var _actionInfo$customDat5 = actionInfo.customData,
            context = _actionInfo$customDat5.context,
            operationInfo = _actionInfo$customDat5.operationInfo;
        this._completeAction(operationInfo, context);
        if ("upload" === actionInfo.name) {
            delete this._uploadOperationInfoMap[actionInfo.customData.sessionInfo.sessionId]
        }
    };
    _proto._tryCreate = function(parentDirectories) {
        var _this7 = this;
        var parentDirectoryInfo = parentDirectories && parentDirectories[0] || this._getCurrentDirectory();
        var newDirName = _message.default.format("dxFileManager-newDirectoryName");
        return this._showDialog(this._dialogManager.getCreateItemDialog(), newDirName).then(function(_ref5) {
            var name = _ref5.name;
            return _this7._controller.createDirectory(parentDirectoryInfo, name)
        })
    };
    _proto._tryRename = function(itemInfos) {
        var _this8 = this;
        var itemInfo = itemInfos && itemInfos[0] || this._model.getMultipleSelectedItems()[0];
        return this._showDialog(this._dialogManager.getRenameItemDialog(), itemInfo.fileItem.name).then(function(_ref6) {
            var name = _ref6.name;
            return _this8._controller.renameItem(itemInfo, name)
        })
    };
    _proto._tryDelete = function(itemInfos) {
        var _this9 = this;
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        var itemName = itemInfos[0].fileItem.name;
        var itemCount = itemInfos.length;
        return this._showDialog(this._dialogManager.getDeleteItemDialog(), {
            itemName: itemName,
            itemCount: itemCount
        }).then(function() {
            return _this9._controller.deleteItems(itemInfos)
        })
    };
    _proto._tryMove = function(itemInfos) {
        var _this10 = this;
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        return this._showDialog(this._dialogManager.getMoveDialog(itemInfos)).then(function(_ref7) {
            var folder = _ref7.folder;
            return _this10._controller.moveItems(itemInfos, folder)
        })
    };
    _proto._tryCopy = function(itemInfos) {
        var _this11 = this;
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        return this._showDialog(this._dialogManager.getCopyDialog(itemInfos)).then(function(_ref8) {
            var folder = _ref8.folder;
            return _this11._controller.copyItems(itemInfos, folder)
        })
    };
    _proto._tryUpload = function(destinationFolder) {
        this._uploadDirectoryInfo = null === destinationFolder || void 0 === destinationFolder ? void 0 : destinationFolder[0];
        this._fileUploader.tryUpload()
    };
    _proto._download = function(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        return this._controller.downloadItems(itemInfos)
    };
    _proto._getItemContent = function(itemInfos) {
        itemInfos = itemInfos || this._model.getMultipleSelectedItems();
        return this._controller.getItemContent(itemInfos)
    };
    _proto._completeAction = function(operationInfo, context) {
        this._notificationControl.completeOperation(operationInfo, context.completionMessage, !context.success, context.statusText);
        if (context.hasModifiedItems()) {
            this._raiseOnSuccess(context.onlyFiles)
        }
    };
    _proto._handleActionError = function(operationInfo, context, errorInfo) {
        operationInfo.hasError = true;
        if (context.singleRequest) {
            this._handleSingleRequestActionError(operationInfo, context, errorInfo)
        } else {
            this._handleMultipleRequestActionError(operationInfo, context, errorInfo)
        }
    };
    _proto._handleSingleRequestActionError = function(operationInfo, context, errorInfo) {
        var itemInfo = context.getItemForSingleRequestError();
        var itemName = context.itemNewName;
        var errorText = this._getErrorText(errorInfo, itemInfo, itemName);
        context.processSingleRequestError(errorText);
        var operationErrorInfo = this._getOperationErrorInfo(context);
        this._notificationControl.completeSingleOperationWithError(operationInfo, operationErrorInfo);
        if (context.multipleItems) {
            this._raiseOnSuccess(context.onlyFiles)
        }
    };
    _proto._handleMultipleRequestActionError = function(operationInfo, context, errorInfo) {
        var itemInfo = context.getItemForMultipleRequestError(errorInfo.index);
        var errorText = this._getErrorText(errorInfo, itemInfo);
        context.processMultipleRequestError(errorInfo.index, errorText);
        var operationErrorInfo = this._getOperationErrorInfo(context);
        this._notificationControl.addOperationDetailsError(operationInfo, operationErrorInfo)
    };
    _proto._getOperationErrorInfo = function(context) {
        var detailError = context.errorState.currentDetailError;
        return {
            commonErrorText: context.errorState.commonErrorText,
            item: detailError.itemInfo ? this._getItemProgressDisplayInfo(detailError.itemInfo) : null,
            itemIndex: detailError.itemIndex,
            detailErrorText: detailError.errorText
        }
    };
    _proto._getErrorText = function(errorInfo, itemInfo, itemName) {
        itemName = itemName || (null === itemInfo || void 0 === itemInfo ? void 0 : itemInfo.fileItem.name);
        var errorText = errorInfo.errorText || _uiFile_manager3.FileManagerMessages.get(errorInfo.errorId, itemName);
        var errorArgs = {
            fileSystemItem: null === itemInfo || void 0 === itemInfo ? void 0 : itemInfo.fileItem,
            errorCode: errorInfo.errorId,
            errorText: errorText
        };
        this._raiseOnError(errorArgs);
        return errorArgs.errorText
    };
    _proto._getItemProgressDisplayInfo = function(itemInfo) {
        return {
            commonText: itemInfo.fileItem.name,
            imageUrl: this._getItemThumbnail(itemInfo)
        }
    };
    _proto._showDialog = function(dialog, dialogArgument) {
        this._dialogDeferred = new _deferred.Deferred;
        dialog.show(dialogArgument);
        return this._dialogDeferred.promise()
    };
    _proto._onDialogClosed = function(e) {
        var result = e.dialogResult;
        if (result) {
            this._dialogDeferred.resolve(result)
        } else {
            this._dialogDeferred.reject()
        }
    };
    _proto._getItemThumbnail = function(item) {
        var itemThumbnailGetter = this.option("getItemThumbnail");
        if (!itemThumbnailGetter) {
            return null
        }
        var info = itemThumbnailGetter(item);
        return info ? info.thumbnail : null
    };
    _proto._initActions = function() {
        this._actions = {
            onSuccess: this._createActionByOption("onSuccess"),
            onError: this._createActionByOption("onError"),
            onCreating: this._createActionByOption("onCreating")
        }
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            model: {
                getMultipleSelectedItems: null
            },
            notificationControl: null,
            getItemThumbnail: null,
            onSuccess: null,
            onError: null,
            onCreating: null
        })
    };
    _proto._optionChanged = function(args) {
        var name = args.name;
        switch (name) {
            case "model":
                this.repaint();
                break;
            case "notificationControl":
                this._initNotificationControl(args.value);
                break;
            case "getItemThumbnail":
                break;
            case "uploadDropZonePlaceholderContainer":
                this._fileUploader.option("dropZonePlaceholderContainer", args.value);
                break;
            case "onSuccess":
            case "onError":
            case "onCreating":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._raiseOnSuccess = function(updatedOnlyFiles) {
        this._actions.onSuccess({
            updatedOnlyFiles: updatedOnlyFiles
        })
    };
    _proto._raiseOnError = function(args) {
        this._actions.onError(args)
    };
    _proto._getCurrentDirectory = function() {
        return this._controller.getCurrentDirectory()
    };
    _createClass(FileManagerEditingControl, [{
        key: "uploadDirectoryInfo",
        get: function() {
            return this._uploadDirectoryInfo || this._getCurrentDirectory()
        }
    }]);
    return FileManagerEditingControl
}(_ui.default);
var FileManagerActionContext = function() {
    function FileManagerActionContext(actionMetadata, itemInfos, directoryInfo) {
        this._actionMetadata = actionMetadata;
        this._itemInfos = itemInfos;
        this._onlyFiles = !this._actionMetadata.affectsAllItems && this._itemInfos.every(function(info) {
            return !info.fileItem.isDirectory
        });
        this._items = this._itemInfos.map(function(itemInfo) {
            return itemInfo.fileItem
        });
        this._multipleItems = this._items.length > 1;
        this._location = directoryInfo.getDisplayName();
        this._singleRequest = true;
        this._completedItems = [];
        this._commonProgress = 0;
        this._errorState = {
            failedCount: 0
        };
        this._itemNewName = ""
    }
    var _proto2 = FileManagerActionContext.prototype;
    _proto2.completeOperationItem = function(itemIndex) {
        if (this._singleRequest) {
            this._completedItems = _toConsumableArray(this._items)
        } else {
            var item = this._items[itemIndex];
            this._completedItems.push(item)
        }
        if (!this._actionMetadata.allowItemProgress) {
            this._commonProgress = this._completedItems.length / this._items.length * 100
        }
    };
    _proto2.processSingleRequestError = function(errorText) {
        this._errorState.failedCount = 1;
        this._errorState.commonErrorText = this._multipleItems ? this._actionMetadata.commonErrorMessage : this._actionMetadata.singleItemErrorMessage;
        var itemIndex = this._multipleItems ? -1 : 1;
        var itemInfo = this.getItemForSingleRequestError();
        this._setCurrentDetailError(itemIndex, itemInfo, errorText)
    };
    _proto2.processMultipleRequestError = function(itemIndex, errorText) {
        this._errorState.failedCount++;
        this._errorState.commonErrorText = this._errorState.failedCount > 1 ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._errorState.failedCount) : this._actionMetadata.singleItemErrorMessage;
        var itemInfo = this.getItemForMultipleRequestError(itemIndex);
        this._setCurrentDetailError(itemIndex, itemInfo, errorText)
    };
    _proto2.hasModifiedItems = function() {
        return this._hasCompletedItems() || this._singleRequest && !this.success && this._multipleItems
    };
    _proto2.getItemForSingleRequestError = function() {
        return this._multipleItems ? null : this._itemInfos[0]
    };
    _proto2.getItemForMultipleRequestError = function(itemIndex) {
        return this._itemInfos[itemIndex]
    };
    _proto2._setCurrentDetailError = function(itemIndex, itemInfo, errorText) {
        this._errorState.currentDetailError = {
            itemIndex: itemIndex,
            itemInfo: itemInfo,
            errorText: errorText
        }
    };
    _proto2._hasCompletedItems = function() {
        return this._completedItems.length > 0
    };
    _createClass(FileManagerActionContext, [{
        key: "actionMetadata",
        get: function() {
            return this._actionMetadata
        }
    }, {
        key: "itemInfos",
        get: function() {
            return this._itemInfos
        }
    }, {
        key: "itemNewName",
        get: function() {
            return this._itemNewName
        },
        set: function(value) {
            this._itemNewName = value
        }
    }, {
        key: "errorState",
        get: function() {
            return this._errorState
        }
    }, {
        key: "singleRequest",
        get: function() {
            return this._singleRequest
        },
        set: function(value) {
            this._singleRequest = value
        }
    }, {
        key: "multipleItems",
        get: function() {
            return this._multipleItems
        }
    }, {
        key: "onlyFiles",
        get: function() {
            return this._onlyFiles
        }
    }, {
        key: "processingMessage",
        get: function() {
            return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsProcessingMessage, this._items.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemProcessingMessage, this._location)
        }
    }, {
        key: "successMessage",
        get: function() {
            if (this._hasCompletedItems()) {
                return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsSuccessMessage, this._completedItems.length, this._location) : (0, _string.format)(this._actionMetadata.singleItemSuccessMessage, this._location)
            } else {
                return this._multipleItems ? (0, _string.format)(this._actionMetadata.multipleItemsErrorMessage, this._items.length) : this._actionMetadata.singleItemErrorMessage
            }
        }
    }, {
        key: "completionMessage",
        get: function() {
            return this.success ? this.successMessage : this.errorState.commonErrorText
        }
    }, {
        key: "statusText",
        get: function() {
            return this.success && !this._hasCompletedItems() ? this._actionMetadata.canceledMessage : void 0
        }
    }, {
        key: "commonProgress",
        get: function() {
            return this._commonProgress
        }
    }, {
        key: "success",
        get: function() {
            return !this._errorState.failedCount
        }
    }]);
    return FileManagerActionContext
}();
var _default = FileManagerEditingControl;
exports.default = _default;
module.exports = exports.default;
