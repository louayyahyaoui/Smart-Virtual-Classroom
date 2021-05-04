/**
 * DevExtreme (ui/file_uploader.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _guid = _interopRequireDefault(require("../core/guid"));
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _callbacks = _interopRequireDefault(require("../core/utils/callbacks"));
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _extend = require("../core/utils/extend");
var _array = require("../core/utils/array");
var _deferred = require("../core/utils/deferred");
var _ajax = _interopRequireDefault(require("../core/utils/ajax"));
var _editor = _interopRequireDefault(require("./editor/editor"));
var _button = _interopRequireDefault(require("./button"));
var _progress_bar = _interopRequireDefault(require("./progress_bar"));
var _browser = _interopRequireDefault(require("../core/utils/browser"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _index = require("../events/utils/index");
var _click = require("../events/click");
var _message = _interopRequireDefault(require("../localization/message"));
var _themes = require("./themes");

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
var window = (0, _window.getWindow)();
var FILEUPLOADER_CLASS = "dx-fileuploader";
var FILEUPLOADER_EMPTY_CLASS = "dx-fileuploader-empty";
var FILEUPLOADER_SHOW_FILE_LIST_CLASS = "dx-fileuploader-show-file-list";
var FILEUPLOADER_DRAGOVER_CLASS = "dx-fileuploader-dragover";
var FILEUPLOADER_WRAPPER_CLASS = "dx-fileuploader-wrapper";
var FILEUPLOADER_CONTAINER_CLASS = "dx-fileuploader-container";
var FILEUPLOADER_CONTENT_CLASS = "dx-fileuploader-content";
var FILEUPLOADER_INPUT_WRAPPER_CLASS = "dx-fileuploader-input-wrapper";
var FILEUPLOADER_INPUT_CONTAINER_CLASS = "dx-fileuploader-input-container";
var FILEUPLOADER_INPUT_LABEL_CLASS = "dx-fileuploader-input-label";
var FILEUPLOADER_INPUT_CLASS = "dx-fileuploader-input";
var FILEUPLOADER_FILES_CONTAINER_CLASS = "dx-fileuploader-files-container";
var FILEUPLOADER_FILE_CONTAINER_CLASS = "dx-fileuploader-file-container";
var FILEUPLOADER_FILE_INFO_CLASS = "dx-fileuploader-file-info";
var FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS = "dx-fileuploader-file-status-message";
var FILEUPLOADER_FILE_CLASS = "dx-fileuploader-file";
var FILEUPLOADER_FILE_NAME_CLASS = "dx-fileuploader-file-name";
var FILEUPLOADER_FILE_SIZE_CLASS = "dx-fileuploader-file-size";
var FILEUPLOADER_BUTTON_CLASS = "dx-fileuploader-button";
var FILEUPLOADER_BUTTON_CONTAINER_CLASS = "dx-fileuploader-button-container";
var FILEUPLOADER_CANCEL_BUTTON_CLASS = "dx-fileuploader-cancel-button";
var FILEUPLOADER_UPLOAD_BUTTON_CLASS = "dx-fileuploader-upload-button";
var FILEUPLOADER_INVALID_CLASS = "dx-fileuploader-invalid";
var FILEUPLOADER_AFTER_LOAD_DELAY = 400;
var FILEUPLOADER_CHUNK_META_DATA_NAME = "chunkMetadata";
var renderFileUploaderInput = function() {
    return (0, _renderer.default)("<input>").attr("type", "file")
};
var isFormDataSupported = function() {
    return !!window.FormData
};
var FileUploader = function(_Editor) {
    _inheritsLoose(FileUploader, _Editor);

    function FileUploader() {
        return _Editor.apply(this, arguments) || this
    }
    var _proto = FileUploader.prototype;
    _proto._supportedKeys = function() {
        var _this = this;
        var click = function(e) {
            e.preventDefault();
            var $selectButton = _this._selectButton.$element();
            _events_engine.default.trigger($selectButton, _click.name)
        };
        return (0, _extend.extend)(_Editor.prototype._supportedKeys.call(this), {
            space: click,
            enter: click
        })
    };
    _proto._setOptionsByReference = function() {
        _Editor.prototype._setOptionsByReference.call(this);
        (0, _extend.extend)(this._optionsByReference, {
            value: true
        })
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Editor.prototype._getDefaultOptions.call(this), {
            chunkSize: 0,
            value: [],
            selectButtonText: _message.default.format("dxFileUploader-selectFile"),
            uploadButtonText: _message.default.format("dxFileUploader-upload"),
            labelText: _message.default.format("dxFileUploader-dropFile"),
            name: "files[]",
            multiple: false,
            accept: "",
            uploadUrl: "/",
            allowCanceling: true,
            showFileList: true,
            progress: 0,
            dialogTrigger: void 0,
            dropZone: void 0,
            readyToUploadMessage: _message.default.format("dxFileUploader-readyToUpload"),
            uploadedMessage: _message.default.format("dxFileUploader-uploaded"),
            uploadFailedMessage: _message.default.format("dxFileUploader-uploadFailedMessage"),
            uploadAbortedMessage: _message.default.format("dxFileUploader-uploadAbortedMessage"),
            uploadMode: "instantly",
            uploadMethod: "POST",
            uploadHeaders: {},
            uploadCustomData: {},
            onBeforeSend: null,
            onUploadStarted: null,
            onUploaded: null,
            onFilesUploaded: null,
            onProgress: null,
            onUploadError: null,
            onUploadAborted: null,
            onDropZoneEnter: null,
            onDropZoneLeave: null,
            allowedFileExtensions: [],
            maxFileSize: 0,
            minFileSize: 0,
            inputAttr: {},
            invalidFileExtensionMessage: _message.default.format("dxFileUploader-invalidFileExtension"),
            invalidMaxFileSizeMessage: _message.default.format("dxFileUploader-invalidMaxFileSize"),
            invalidMinFileSizeMessage: _message.default.format("dxFileUploader-invalidMinFileSize"),
            extendSelection: true,
            validationMessageMode: "always",
            uploadFile: null,
            uploadChunk: null,
            abortUpload: null,
            validationMessageOffset: {
                h: 0,
                v: 0
            },
            useNativeInputClick: false,
            useDragOver: true,
            nativeDropSupported: true,
            _uploadButtonType: "normal"
        })
    };
    _proto._defaultOptionsRules = function() {
        return _Editor.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: [{
                platform: "android"
            }],
            options: {
                validationMessageOffset: {
                    v: 0
                }
            }
        }, {
            device: function() {
                return "desktop" !== _devices.default.real().deviceType
            },
            options: {
                useDragOver: false
            }
        }, {
            device: function() {
                return !isFormDataSupported()
            },
            options: {
                uploadMode: "useForm"
            }
        }, {
            device: function() {
                return _browser.default.msie || "desktop" !== _devices.default.real().deviceType
            },
            options: {
                nativeDropSupported: false
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                _uploadButtonType: "default"
            }
        }])
    };
    _proto._initOptions = function(options) {
        var isLabelTextDefined = "labelText" in options;
        _Editor.prototype._initOptions.call(this, options);
        if (!isLabelTextDefined && !this._shouldDragOverBeRendered()) {
            this.option("labelText", "")
        }
    };
    _proto._init = function() {
        _Editor.prototype._init.call(this);
        this._initFileInput();
        this._initLabel();
        this._setUploadStrategy();
        this._createFiles();
        this._createBeforeSendAction();
        this._createUploadStartedAction();
        this._createUploadedAction();
        this._createFilesUploadedAction();
        this._createProgressAction();
        this._createUploadErrorAction();
        this._createUploadAbortedAction();
        this._createDropZoneEnterAction();
        this._createDropZoneLeaveAction()
    };
    _proto._setUploadStrategy = function() {
        var strategy = null;
        if (this.option("chunkSize") > 0) {
            var uploadChunk = this.option("uploadChunk");
            strategy = uploadChunk && (0, _type.isFunction)(uploadChunk) ? new CustomChunksFileUploadStrategy(this) : new DefaultChunksFileUploadStrategy(this)
        } else {
            var uploadFile = this.option("uploadFile");
            strategy = uploadFile && (0, _type.isFunction)(uploadFile) ? new CustomWholeFileUploadStrategy(this) : new DefaultWholeFileUploadStrategy(this)
        }
        this._uploadStrategy = strategy
    };
    _proto._initFileInput = function() {
        var _this2 = this;
        this._isCustomClickEvent = false;
        if (!this._$fileInput) {
            this._$fileInput = renderFileUploaderInput();
            _events_engine.default.on(this._$fileInput, "change", this._inputChangeHandler.bind(this));
            _events_engine.default.on(this._$fileInput, "click", function(e) {
                e.stopPropagation();
                return _this2.option("useNativeInputClick") || _this2._isCustomClickEvent
            })
        }
        this._$fileInput.prop({
            multiple: this.option("multiple"),
            accept: this.option("accept"),
            tabIndex: -1
        })
    };
    _proto._inputChangeHandler = function() {
        if (this._doPreventInputChange) {
            return
        }
        var fileName = this._$fileInput.val().replace(/^.*\\/, "");
        var files = this._$fileInput.prop("files");
        if (files && !files.length && "useForm" !== this.option("uploadMode")) {
            return
        }
        var value = files ? this._getFiles(files) : [{
            name: fileName
        }];
        this._changeValue(value);
        if ("instantly" === this.option("uploadMode")) {
            this._uploadFiles()
        }
    };
    _proto._shouldFileListBeExtended = function() {
        return "useForm" !== this.option("uploadMode") && this.option("extendSelection") && this.option("multiple")
    };
    _proto._removeDuplicates = function(files, value) {
        var result = [];
        for (var i = 0; i < value.length; i++) {
            if (!this._isFileInArray(files, value[i])) {
                result.push(value[i])
            }
        }
        return result
    };
    _proto._isFileInArray = function(files, file) {
        for (var i = 0; i < files.length; i++) {
            var item = files[i];
            if (item.size === file.size && item.name === file.name) {
                return true
            }
        }
        return false
    };
    _proto._changeValue = function(value) {
        var files = this._shouldFileListBeExtended() ? this.option("value").slice() : [];
        if ("instantly" !== this.option("uploadMode")) {
            value = this._removeDuplicates(files, value)
        }
        this.option("value", files.concat(value))
    };
    _proto._getFiles = function(fileList) {
        var values = [];
        (0, _iterator.each)(fileList, function(_, value) {
            return values.push(value)
        });
        return values
    };
    _proto._getFile = function(fileData) {
        var targetFileValue = (0, _type.isNumeric)(fileData) ? this.option("value")[fileData] : fileData;
        return this._files.filter(function(file) {
            return file.value === targetFileValue
        })[0]
    };
    _proto._initLabel = function() {
        if (!this._$inputLabel) {
            this._$inputLabel = (0, _renderer.default)("<div>")
        }
        this._updateInputLabelText()
    };
    _proto._updateInputLabelText = function() {
        var correctedValue = this._isInteractionDisabled() ? "" : this.option("labelText");
        this._$inputLabel.text(correctedValue)
    };
    _proto._focusTarget = function() {
        return this.$element().find("." + FILEUPLOADER_BUTTON_CLASS)
    };
    _proto._getSubmitElement = function() {
        return this._$fileInput
    };
    _proto._initMarkup = function() {
        _Editor.prototype._initMarkup.call(this);
        this.$element().addClass(FILEUPLOADER_CLASS);
        this._renderWrapper();
        this._renderInputWrapper();
        this._renderSelectButton();
        this._renderInputContainer();
        this._renderUploadButton();
        this._preventRecreatingFiles = true
    };
    _proto._render = function() {
        this._preventRecreatingFiles = false;
        this._attachDragEventHandlers(this._$inputWrapper);
        this._attachDragEventHandlers(this.option("dropZone"));
        this._renderFiles();
        _Editor.prototype._render.call(this)
    };
    _proto._createFileProgressBar = function(file) {
        file.progressBar = this._createProgressBar(file.value.size);
        file.progressBar.$element().appendTo(file.$file);
        this._initStatusMessage(file);
        this._ensureCancelButtonInitialized(file)
    };
    _proto._setStatusMessage = function(file, message) {
        var _this3 = this;
        setTimeout(function() {
            if (_this3.option("showFileList")) {
                if (file.$statusMessage) {
                    file.$statusMessage.text(message);
                    file.$statusMessage.css("display", "");
                    file.progressBar.$element().remove()
                }
            }
        }, FILEUPLOADER_AFTER_LOAD_DELAY)
    };
    _proto._getUploadAbortedStatusMessage = function() {
        return "instantly" === this.option("uploadMode") ? this.option("uploadAbortedMessage") : this.option("readyToUploadMessage")
    };
    _proto._createFiles = function() {
        var _this4 = this;
        var value = this.option("value");
        if (this._files && (0 === value.length || !this._shouldFileListBeExtended())) {
            this._preventFilesUploading(this._files);
            this._files = null
        }
        if (!this._files) {
            this._files = []
        }(0, _iterator.each)(value.slice(this._files.length), function(_, value) {
            var file = _this4._createFile(value);
            _this4._validateFile(file);
            _this4._files.push(file)
        })
    };
    _proto._preventFilesUploading = function(files) {
        var _this5 = this;
        files.forEach(function(file) {
            return _this5._uploadStrategy.abortUpload(file)
        })
    };
    _proto._validateFile = function(file) {
        file.isValidFileExtension = this._validateFileExtension(file);
        file.isValidMinSize = this._validateMinFileSize(file);
        file.isValidMaxSize = this._validateMaxFileSize(file)
    };
    _proto._validateFileExtension = function(file) {
        var allowedExtensions = this.option("allowedFileExtensions");
        var fileExtension = file.value.name.substring(file.value.name.lastIndexOf(".")).toLowerCase();
        if (0 === allowedExtensions.length) {
            return true
        }
        for (var i = 0; i < allowedExtensions.length; i++) {
            if (fileExtension === allowedExtensions[i].toLowerCase()) {
                return true
            }
        }
        return false
    };
    _proto._validateMaxFileSize = function(file) {
        var fileSize = file.value.size;
        var maxFileSize = this.option("maxFileSize");
        return maxFileSize > 0 ? fileSize <= maxFileSize : true
    };
    _proto._validateMinFileSize = function(file) {
        var fileSize = file.value.size;
        var minFileSize = this.option("minFileSize");
        return minFileSize > 0 ? fileSize >= minFileSize : true
    };
    _proto._createBeforeSendAction = function() {
        this._beforeSendAction = this._createActionByOption("onBeforeSend", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createUploadStartedAction = function() {
        this._uploadStartedAction = this._createActionByOption("onUploadStarted", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createUploadedAction = function() {
        this._uploadedAction = this._createActionByOption("onUploaded", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createFilesUploadedAction = function() {
        this._filesUploadedAction = this._createActionByOption("onFilesUploaded", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createProgressAction = function() {
        this._progressAction = this._createActionByOption("onProgress", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createUploadAbortedAction = function() {
        this._uploadAbortedAction = this._createActionByOption("onUploadAborted", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createUploadErrorAction = function() {
        this._uploadErrorAction = this._createActionByOption("onUploadError", {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._createDropZoneEnterAction = function() {
        this._dropZoneEnterAction = this._createActionByOption("onDropZoneEnter")
    };
    _proto._createDropZoneLeaveAction = function() {
        this._dropZoneLeaveAction = this._createActionByOption("onDropZoneLeave")
    };
    _proto._createFile = function(value) {
        return {
            value: value,
            loadedSize: 0,
            onProgress: (0, _callbacks.default)(),
            onAbort: (0, _callbacks.default)(),
            onLoad: (0, _callbacks.default)(),
            onError: (0, _callbacks.default)(),
            onLoadStart: (0, _callbacks.default)(),
            isValidFileExtension: true,
            isValidMaxSize: true,
            isValidMinSize: true,
            isValid: function() {
                return this.isValidFileExtension && this.isValidMaxSize && this.isValidMinSize
            },
            isInitialized: false
        }
    };
    _proto._resetFileState = function(file) {
        file.isAborted = false;
        file.uploadStarted = false;
        file.isStartLoad = false;
        file.loadedSize = 0;
        file.chunksData = void 0;
        file.request = void 0
    };
    _proto._renderFiles = function() {
        var _this$_validationMess, _this6 = this;
        var value = this.option("value");
        if (!this._$filesContainer) {
            this._$filesContainer = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILES_CONTAINER_CLASS).appendTo(this._$content)
        } else {
            if (!this._shouldFileListBeExtended() || 0 === value.length) {
                this._$filesContainer.empty()
            }
        }
        var showFileList = this.option("showFileList");
        if (showFileList) {
            (0, _iterator.each)(this._files, function(_, file) {
                if (!file.$file) {
                    _this6._renderFile(file)
                }
            })
        }
        this.$element().toggleClass(FILEUPLOADER_SHOW_FILE_LIST_CLASS, showFileList);
        this._toggleFileUploaderEmptyClassName();
        this._updateFileNameMaxWidth();
        null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess ? void 0 : _this$_validationMess.repaint()
    };
    _proto._renderFile = function(file) {
        var value = file.value;
        var $fileContainer = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILE_CONTAINER_CLASS).appendTo(this._$filesContainer);
        this._renderFileButtons(file, $fileContainer);
        file.$file = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILE_CLASS).appendTo($fileContainer);
        var $fileInfo = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILE_INFO_CLASS).appendTo(file.$file);
        file.$statusMessage = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).appendTo(file.$file);
        (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILE_NAME_CLASS).text(value.name).appendTo($fileInfo);
        if ((0, _type.isDefined)(value.size)) {
            (0, _renderer.default)("<div>").addClass(FILEUPLOADER_FILE_SIZE_CLASS).text(this._getFileSize(value.size)).appendTo($fileInfo)
        }
        if (file.isValid()) {
            file.$statusMessage.text(this.option("readyToUploadMessage"))
        } else {
            if (!file.isValidFileExtension) {
                file.$statusMessage.append(this._createValidationElement("invalidFileExtensionMessage"))
            }
            if (!file.isValidMaxSize) {
                file.$statusMessage.append(this._createValidationElement("invalidMaxFileSizeMessage"))
            }
            if (!file.isValidMinSize) {
                file.$statusMessage.append(this._createValidationElement("invalidMinFileSizeMessage"))
            }
            $fileContainer.addClass(FILEUPLOADER_INVALID_CLASS)
        }
    };
    _proto._createValidationElement = function(key) {
        return (0, _renderer.default)("<span>").text(this.option(key))
    };
    _proto._updateFileNameMaxWidth = function() {
        var cancelButtonsCount = this.option("allowCanceling") && "useForm" !== this.option("uploadMode") ? 1 : 0;
        var uploadButtonsCount = "useButtons" === this.option("uploadMode") ? 1 : 0;
        var filesContainerWidth = this._$filesContainer.find("." + FILEUPLOADER_FILE_CONTAINER_CLASS).first().width() || this._$filesContainer.width();
        var $buttonContainer = this._$filesContainer.find("." + FILEUPLOADER_BUTTON_CONTAINER_CLASS).eq(0);
        var buttonsWidth = $buttonContainer.width() * (cancelButtonsCount + uploadButtonsCount);
        var $fileSize = this._$filesContainer.find("." + FILEUPLOADER_FILE_SIZE_CLASS).eq(0);
        var prevFileSize = $fileSize.text();
        $fileSize.text("1000 Mb");
        var fileSizeWidth = $fileSize.width();
        $fileSize.text(prevFileSize);
        this._$filesContainer.find("." + FILEUPLOADER_FILE_NAME_CLASS).css("maxWidth", filesContainerWidth - buttonsWidth - fileSizeWidth)
    };
    _proto._renderFileButtons = function(file, $container) {
        var $cancelButton = this._getCancelButton(file);
        $cancelButton && $container.append($cancelButton);
        var $uploadButton = this._getUploadButton(file);
        $uploadButton && $container.append($uploadButton)
    };
    _proto._getCancelButton = function(file) {
        var _this7 = this;
        if ("useForm" === this.option("uploadMode")) {
            return null
        }
        file.cancelButton = this._createComponent((0, _renderer.default)("<div>").addClass(FILEUPLOADER_BUTTON_CLASS + " " + FILEUPLOADER_CANCEL_BUTTON_CLASS), _button.default, {
            onClick: function() {
                return _this7._removeFile(file)
            },
            icon: "close",
            visible: this.option("allowCanceling"),
            disabled: this.option("readOnly"),
            integrationOptions: {}
        });
        return (0, _renderer.default)("<div>").addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.cancelButton.$element())
    };
    _proto._getUploadButton = function(file) {
        var _this8 = this;
        if (!file.isValid() || "useButtons" !== this.option("uploadMode")) {
            return null
        }
        file.uploadButton = this._createComponent((0, _renderer.default)("<div>").addClass(FILEUPLOADER_BUTTON_CLASS + " " + FILEUPLOADER_UPLOAD_BUTTON_CLASS), _button.default, {
            onClick: function() {
                return _this8._uploadFile(file)
            },
            icon: "upload"
        });
        file.onLoadStart.add(function() {
            return file.uploadButton.option({
                visible: false,
                disabled: true
            })
        });
        file.onAbort.add(function() {
            return file.uploadButton.option({
                visible: true,
                disabled: false
            })
        });
        return (0, _renderer.default)("<div>").addClass(FILEUPLOADER_BUTTON_CONTAINER_CLASS).append(file.uploadButton.$element())
    };
    _proto._removeFile = function(file) {
        var _file$$file;
        null === (_file$$file = file.$file) || void 0 === _file$$file ? void 0 : _file$$file.parent().remove();
        this._files.splice((0, _array.inArray)(file, this._files), 1);
        var value = this.option("value").slice();
        value.splice((0, _array.inArray)(file.value, value), 1);
        this._preventRecreatingFiles = true;
        this.option("value", value);
        this._preventRecreatingFiles = false;
        this._toggleFileUploaderEmptyClassName();
        this._doPreventInputChange = true;
        this._$fileInput.val("");
        this._doPreventInputChange = false
    };
    _proto.removeFile = function(fileData) {
        if ("useForm" === this.option("uploadMode") || !(0, _type.isDefined)(fileData)) {
            return
        }
        var file = this._getFile(fileData);
        if (file) {
            if (file.uploadStarted) {
                this._preventFilesUploading([file])
            }
            this._removeFile(file)
        }
    };
    _proto._toggleFileUploaderEmptyClassName = function() {
        this.$element().toggleClass(FILEUPLOADER_EMPTY_CLASS, !this._files.length || this._hasInvalidFile(this._files))
    };
    _proto._hasInvalidFile = function(files) {
        for (var i = 0; i < files.length; i++) {
            if (!files[i].isValid()) {
                return true
            }
        }
        return false
    };
    _proto._getFileSize = function(size) {
        var i = 0;
        var labels = [_message.default.format("dxFileUploader-bytes"), _message.default.format("dxFileUploader-kb"), _message.default.format("dxFileUploader-Mb"), _message.default.format("dxFileUploader-Gb")];
        var count = labels.length - 1;
        while (i < count && size >= 1024) {
            size /= 1024;
            i++
        }
        return Math.round(size) + " " + labels[i]
    };
    _proto._renderSelectButton = function() {
        var $button = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_BUTTON_CLASS).appendTo(this._$inputWrapper);
        this._selectButton = this._createComponent($button, _button.default, {
            text: this.option("selectButtonText"),
            focusStateEnabled: false,
            integrationOptions: {},
            disabled: this.option("readOnly")
        });
        this._selectFileDialogHandler = this._selectButtonClickHandler.bind(this);
        if ("desktop" === _devices.default.real().deviceType) {
            this._selectButton.option("onClick", this._selectFileDialogHandler)
        } else {
            this._attachSelectFileDialogHandler(this._selectButton.$element())
        }
        this._attachSelectFileDialogHandler(this.option("dialogTrigger"))
    };
    _proto._selectButtonClickHandler = function() {
        if (this.option("useNativeInputClick")) {
            return
        }
        if (this._isInteractionDisabled()) {
            return false
        }
        this._isCustomClickEvent = true;
        _events_engine.default.trigger(this._$fileInput, "click");
        this._isCustomClickEvent = false
    };
    _proto._attachSelectFileDialogHandler = function(target) {
        if (!(0, _type.isDefined)(target)) {
            return
        }
        this._detachSelectFileDialogHandler(target);
        _events_engine.default.on((0, _renderer.default)(target), "click", this._selectFileDialogHandler)
    };
    _proto._detachSelectFileDialogHandler = function(target) {
        if (!(0, _type.isDefined)(target)) {
            return
        }
        _events_engine.default.off((0, _renderer.default)(target), "click", this._selectFileDialogHandler)
    };
    _proto._renderUploadButton = function() {
        if ("useButtons" !== this.option("uploadMode")) {
            return
        }
        var $uploadButton = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_BUTTON_CLASS).addClass(FILEUPLOADER_UPLOAD_BUTTON_CLASS).appendTo(this._$content);
        this._uploadButton = this._createComponent($uploadButton, _button.default, {
            text: this.option("uploadButtonText"),
            onClick: this._uploadButtonClickHandler.bind(this),
            type: this.option("_uploadButtonType"),
            integrationOptions: {}
        })
    };
    _proto._uploadButtonClickHandler = function() {
        this._uploadFiles()
    };
    _proto._shouldDragOverBeRendered = function() {
        return !this.option("readOnly") && ("useForm" !== this.option("uploadMode") || this.option("nativeDropSupported"))
    };
    _proto._isInteractionDisabled = function() {
        return this.option("readOnly") || this.option("disabled")
    };
    _proto._renderInputContainer = function() {
        this._$inputContainer = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_INPUT_CONTAINER_CLASS).appendTo(this._$inputWrapper);
        this._$fileInput.addClass(FILEUPLOADER_INPUT_CLASS);
        this._renderInput();
        var labelId = "dx-fileuploader-input-label-".concat(new _guid.default);
        this._$inputLabel.attr("id", labelId).addClass(FILEUPLOADER_INPUT_LABEL_CLASS).appendTo(this._$inputContainer);
        this.setAria("labelledby", labelId, this._$fileInput)
    };
    _proto._renderInput = function() {
        if (this.option("useNativeInputClick")) {
            this._selectButton.option("template", this._selectButtonInputTemplate.bind(this))
        } else {
            this._$fileInput.appendTo(this._$inputContainer);
            this._selectButton.option("template", "content")
        }
        this._applyInputAttributes(this.option("inputAttr"))
    };
    _proto._selectButtonInputTemplate = function(data, content) {
        var $content = (0, _renderer.default)(content);
        var $text = (0, _renderer.default)("<span>").addClass("dx-button-text").text(data.text);
        $content.append($text).append(this._$fileInput);
        return $content
    };
    _proto._renderInputWrapper = function() {
        this._$inputWrapper = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_INPUT_WRAPPER_CLASS).appendTo(this._$content)
    };
    _proto._detachDragEventHandlers = function(target) {
        if (!(0, _type.isDefined)(target)) {
            return
        }
        _events_engine.default.off((0, _renderer.default)(target), (0, _index.addNamespace)("", this.NAME))
    };
    _proto._attachDragEventHandlers = function(target) {
        var isCustomTarget = target !== this._$inputWrapper;
        if (!(0, _type.isDefined)(target) || !this._shouldDragOverBeRendered()) {
            return
        }
        this._detachDragEventHandlers(target);
        target = (0, _renderer.default)(target);
        this._dragEventsTargets = [];
        _events_engine.default.on(target, (0, _index.addNamespace)("dragenter", this.NAME), this._dragEnterHandler.bind(this, isCustomTarget));
        _events_engine.default.on(target, (0, _index.addNamespace)("dragover", this.NAME), this._dragOverHandler.bind(this));
        _events_engine.default.on(target, (0, _index.addNamespace)("dragleave", this.NAME), this._dragLeaveHandler.bind(this, isCustomTarget));
        _events_engine.default.on(target, (0, _index.addNamespace)("drop", this.NAME), this._dropHandler.bind(this, isCustomTarget))
    };
    _proto._applyInputAttributes = function(customAttributes) {
        this._$fileInput.attr(customAttributes)
    };
    _proto._useInputForDrop = function() {
        return this.option("nativeDropSupported") && "useForm" === this.option("uploadMode")
    };
    _proto._dragEnterHandler = function(isCustomTarget, e) {
        if (this.option("disabled")) {
            return false
        }
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        this._tryToggleDropZoneActive(true, isCustomTarget, e);
        this._updateEventTargets(e)
    };
    _proto._dragOverHandler = function(e) {
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        e.originalEvent.dataTransfer.dropEffect = "copy"
    };
    _proto._dragLeaveHandler = function(isCustomTarget, e) {
        if (!this._useInputForDrop()) {
            e.preventDefault()
        }
        this._updateEventTargets(e);
        this._tryToggleDropZoneActive(false, isCustomTarget, e)
    };
    _proto._updateEventTargets = function(e) {
        var targetIndex = this._dragEventsTargets.indexOf(e.target);
        var isTargetExists = targetIndex !== -1;
        if ("dragenter" === e.type) {
            !isTargetExists && this._dragEventsTargets.push(e.target)
        } else {
            isTargetExists && this._dragEventsTargets.splice(targetIndex, 1)
        }
    };
    _proto._tryToggleDropZoneActive = function(active, isCustom, event) {
        var classAction = active ? "addClass" : "removeClass";
        var mouseAction = active ? "_dropZoneEnterAction" : "_dropZoneLeaveAction";
        if (!this._dragEventsTargets.length) {
            this[mouseAction]({
                event: event,
                dropZoneElement: event.currentTarget
            });
            if (!isCustom) {
                this.$element()[classAction](FILEUPLOADER_DRAGOVER_CLASS)
            }
        }
    };
    _proto._dropHandler = function(isCustomTarget, e) {
        this._dragEventsTargets = [];
        if (!isCustomTarget) {
            this.$element().removeClass(FILEUPLOADER_DRAGOVER_CLASS)
        }
        if (this._useInputForDrop() || isCustomTarget && this._isInteractionDisabled()) {
            return
        }
        e.preventDefault();
        var fileList = e.originalEvent.dataTransfer.files;
        var files = this._getFiles(fileList);
        if (!this.option("multiple") && files.length > 1) {
            return
        }
        this._changeValue(this._filterFiles(files));
        if ("instantly" === this.option("uploadMode")) {
            this._uploadFiles()
        }
    };
    _proto._handleAllFilesUploaded = function() {
        var areAllFilesLoaded = this._files.every(function(file) {
            return !file.isValid() || file._isError || file._isLoaded || file.isAborted
        });
        if (areAllFilesLoaded) {
            this._filesUploadedAction()
        }
    };
    _proto._filterFiles = function(files) {
        if (!files.length) {
            return files
        }
        var accept = this.option("accept");
        if (!accept.length) {
            return files
        }
        var result = [];
        var allowedTypes = this._getAllowedFileTypes(accept);
        for (var i = 0, n = files.length; i < n; i++) {
            if (this._isFileTypeAllowed(files[i], allowedTypes)) {
                result.push(files[i])
            }
        }
        return result
    };
    _proto._getAllowedFileTypes = function(acceptSting) {
        if (!acceptSting.length) {
            return []
        }
        return acceptSting.split(",").map(function(item) {
            return item.trim()
        })
    };
    _proto._isFileTypeAllowed = function(file, allowedTypes) {
        for (var i = 0, n = allowedTypes.length; i < n; i++) {
            var allowedType = allowedTypes[i];
            if ("." === allowedType[0]) {
                allowedType = allowedType.replace(".", "\\.");
                if (file.name.match(new RegExp(allowedType + "$", "i"))) {
                    return true
                }
            } else {
                allowedType = allowedType.replace("*", "");
                if (file.type.match(new RegExp(allowedType, "i"))) {
                    return true
                }
            }
        }
        return false
    };
    _proto._renderWrapper = function() {
        var $wrapper = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_WRAPPER_CLASS).appendTo(this.$element());
        var $container = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_CONTAINER_CLASS).appendTo($wrapper);
        this._$content = (0, _renderer.default)("<div>").addClass(FILEUPLOADER_CONTENT_CLASS).appendTo($container)
    };
    _proto._clean = function() {
        this._$fileInput.detach();
        delete this._$filesContainer;
        if (this._files) {
            this._files.forEach(function(file) {
                file.$file = null;
                file.$statusMessage = null
            })
        }
        _Editor.prototype._clean.call(this)
    };
    _proto.abortUpload = function(fileData) {
        if ("useForm" === this.option("uploadMode")) {
            return
        }
        if ((0, _type.isDefined)(fileData)) {
            var file = this._getFile(fileData);
            if (file) {
                this._preventFilesUploading([file])
            }
        } else {
            this._preventFilesUploading(this._files)
        }
    };
    _proto.upload = function(fileData) {
        if ("useForm" === this.option("uploadMode")) {
            return
        }
        if ((0, _type.isDefined)(fileData)) {
            var file = this._getFile(fileData);
            if (file && isFormDataSupported()) {
                this._uploadFile(file)
            }
        } else {
            this._uploadFiles()
        }
    };
    _proto._uploadFiles = function() {
        var _this9 = this;
        if (isFormDataSupported()) {
            (0, _iterator.each)(this._files, function(_, file) {
                return _this9._uploadFile(file)
            })
        }
    };
    _proto._uploadFile = function(file) {
        this._uploadStrategy.upload(file)
    };
    _proto._updateProgressBar = function(file, loadedFileData) {
        file.progressBar && file.progressBar.option({
            value: loadedFileData.loaded,
            showStatus: true
        });
        this._progressAction({
            file: file.value,
            segmentSize: loadedFileData.currentSegmentSize,
            bytesLoaded: loadedFileData.loaded,
            bytesTotal: loadedFileData.total,
            event: loadedFileData.event,
            request: file.request
        })
    };
    _proto._updateTotalProgress = function(totalFilesSize, totalLoadedFilesSize) {
        var progress = totalFilesSize ? this._getProgressValue(totalLoadedFilesSize / totalFilesSize) : 0;
        this.option("progress", progress);
        this._setLoadedSize(totalLoadedFilesSize)
    };
    _proto._getProgressValue = function(ratio) {
        return Math.floor(100 * ratio)
    };
    _proto._initStatusMessage = function(file) {
        file.$statusMessage.css("display", "none")
    };
    _proto._ensureCancelButtonInitialized = function(file) {
        var _this10 = this;
        if (file.isInitialized) {
            return
        }
        file.cancelButton.option("onClick", function() {
            _this10._preventFilesUploading([file]);
            _this10._removeFile(file)
        });
        var hideCancelButton = function() {
            setTimeout(function() {
                file.cancelButton.option({
                    visible: false
                })
            }, FILEUPLOADER_AFTER_LOAD_DELAY)
        };
        file.onLoad.add(hideCancelButton);
        file.onError.add(hideCancelButton)
    };
    _proto._createProgressBar = function(fileSize) {
        var _this11 = this;
        return this._createComponent((0, _renderer.default)("<div>"), _progress_bar.default, {
            value: void 0,
            min: 0,
            max: fileSize,
            statusFormat: function(ratio) {
                return _this11._getProgressValue(ratio) + "%"
            },
            showStatus: false,
            statusPosition: "right"
        })
    };
    _proto._getTotalFilesSize = function() {
        var _this12 = this;
        if (!this._totalFilesSize) {
            this._totalFilesSize = 0;
            (0, _iterator.each)(this._files, function(_, file) {
                _this12._totalFilesSize += file.value.size
            })
        }
        return this._totalFilesSize
    };
    _proto._getTotalLoadedFilesSize = function() {
        var _this13 = this;
        if (!this._totalLoadedFilesSize) {
            this._totalLoadedFilesSize = 0;
            (0, _iterator.each)(this._files, function(_, file) {
                _this13._totalLoadedFilesSize += file.loadedSize
            })
        }
        return this._totalLoadedFilesSize
    };
    _proto._setLoadedSize = function(value) {
        this._totalLoadedFilesSize = value
    };
    _proto._recalculateProgress = function() {
        this._totalFilesSize = 0;
        this._totalLoadedFilesSize = 0;
        this._updateTotalProgress(this._getTotalFilesSize(), this._getTotalLoadedFilesSize())
    };
    _proto._updateReadOnlyState = function() {
        var readOnly = this.option("readOnly");
        this._selectButton.option("disabled", readOnly);
        this._files.forEach(function(file) {
            var _file$cancelButton;
            return null === (_file$cancelButton = file.cancelButton) || void 0 === _file$cancelButton ? void 0 : _file$cancelButton.option("disabled", readOnly)
        });
        this._updateInputLabelText();
        this._attachDragEventHandlers(this._$inputWrapper)
    };
    _proto._optionChanged = function(args) {
        var name = args.name,
            value = args.value,
            previousValue = args.previousValue;
        switch (name) {
            case "height":
            case "width":
                this._updateFileNameMaxWidth();
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "value":
                !value.length && this._$fileInput.val("");
                if (!this._preventRecreatingFiles) {
                    this._createFiles();
                    this._renderFiles()
                }
                this._recalculateProgress();
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "name":
                this._initFileInput();
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "accept":
                this._initFileInput();
                break;
            case "multiple":
                this._initFileInput();
                if (!args.value) {
                    this.reset()
                }
                break;
            case "readOnly":
                this._updateReadOnlyState();
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "selectButtonText":
                this._selectButton.option("text", value);
                break;
            case "uploadButtonText":
                this._uploadButton && this._uploadButton.option("text", value);
                break;
            case "_uploadButtonType":
                this._uploadButton && this._uploadButton.option("type", value);
                break;
            case "dialogTrigger":
                this._detachSelectFileDialogHandler(previousValue);
                this._attachSelectFileDialogHandler(value);
                break;
            case "dropZone":
                this._detachDragEventHandlers(previousValue);
                this._attachDragEventHandlers(value);
                break;
            case "maxFileSize":
            case "minFileSize":
            case "allowedFileExtensions":
            case "invalidFileExtensionMessage":
            case "invalidMaxFileSizeMessage":
            case "invalidMinFileSizeMessage":
            case "readyToUploadMessage":
            case "uploadedMessage":
            case "uploadFailedMessage":
            case "uploadAbortedMessage":
                this._invalidate();
                break;
            case "labelText":
                this._updateInputLabelText();
                break;
            case "showFileList":
                if (!this._preventRecreatingFiles) {
                    this._renderFiles()
                }
                break;
            case "uploadFile":
            case "uploadChunk":
            case "chunkSize":
                this._setUploadStrategy();
                break;
            case "abortUpload":
            case "uploadUrl":
            case "progress":
            case "uploadMethod":
            case "uploadHeaders":
            case "uploadCustomData":
            case "extendSelection":
                break;
            case "allowCanceling":
            case "uploadMode":
                this.reset();
                this._invalidate();
                break;
            case "onBeforeSend":
                this._createBeforeSendAction();
                break;
            case "onUploadStarted":
                this._createUploadStartedAction();
                break;
            case "onUploaded":
                this._createUploadedAction();
                break;
            case "onFilesUploaded":
                this._createFilesUploadedAction();
                break;
            case "onProgress":
                this._createProgressAction();
                break;
            case "onUploadError":
                this._createUploadErrorAction();
                break;
            case "onUploadAborted":
                this._createUploadAbortedAction();
                break;
            case "onDropZoneEnter":
                this._createDropZoneEnterAction();
                break;
            case "onDropZoneLeave":
                this._createDropZoneLeaveAction();
                break;
            case "useNativeInputClick":
                this._renderInput();
                break;
            case "useDragOver":
                this._attachDragEventHandlers(this._$inputWrapper);
                break;
            case "nativeDropSupported":
                this._invalidate();
                break;
            case "inputAttr":
                this._applyInputAttributes(this.option(name));
                break;
            default:
                _Editor.prototype._optionChanged.call(this, args)
        }
    };
    _proto.reset = function() {
        this.option("value", [])
    };
    return FileUploader
}(_editor.default);
var FileBlobReader = function() {
    function FileBlobReader(file, chunkSize) {
        this.file = file;
        this.chunkSize = chunkSize;
        this.index = 0
    }
    var _proto2 = FileBlobReader.prototype;
    _proto2.read = function() {
        if (!this.file) {
            return null
        }
        var result = this.createBlobResult(this.file, this.index, this.chunkSize);
        if (result.isCompleted) {
            this.file = null
        }
        this.index++;
        return result
    };
    _proto2.createBlobResult = function(file, index, chunkSize) {
        var currentPosition = index * chunkSize;
        return {
            blob: this.sliceFile(file, currentPosition, chunkSize),
            index: index,
            isCompleted: currentPosition + chunkSize >= file.size
        }
    };
    _proto2.sliceFile = function(file, startPos, length) {
        if (file.slice) {
            return file.slice(startPos, startPos + length)
        }
        if (file.webkitSlice) {
            return file.webkitSlice(startPos, startPos + length)
        }
        return null
    };
    return FileBlobReader
}();
var FileUploadStrategyBase = function() {
    function FileUploadStrategyBase(fileUploader) {
        this.fileUploader = fileUploader
    }
    var _proto3 = FileUploadStrategyBase.prototype;
    _proto3.upload = function(file) {
        if (file.isInitialized && file.isAborted) {
            this.fileUploader._resetFileState(file)
        }
        if (file.isValid() && !file.uploadStarted) {
            this._prepareFileBeforeUpload(file);
            this._uploadCore(file)
        }
    };
    _proto3.abortUpload = function abortUpload(file) {
        var _this14 = this;
        if (file._isError || file._isLoaded || file.isAborted) {
            return
        }
        file.isAborted = true;
        file.request && file.request.abort();
        if (this._isCustomCallback("abortUpload")) {
            var abortUpload = this.fileUploader.option("abortUpload");
            var arg = this._createUploadArgument(file);
            var deferred = null;
            try {
                var result = abortUpload(file.value, arg);
                deferred = (0, _deferred.fromPromise)(result)
            } catch (error) {
                deferred = (new _deferred.Deferred).reject(error).promise()
            }
            deferred.done(function() {
                return file.onAbort.fire()
            }).fail(function(error) {
                return _this14._handleFileError(file, error)
            })
        }
    };
    _proto3._beforeSend = function(xhr, file) {
        var arg = this._createUploadArgument(file);
        this.fileUploader._beforeSendAction({
            request: xhr,
            file: file.value,
            uploadInfo: arg
        });
        file.request = xhr
    };
    _proto3._createUploadArgument = function(file) {};
    _proto3._uploadCore = function(file) {};
    _proto3._isCustomCallback = function(name) {
        var callback = this.fileUploader.option(name);
        return callback && (0, _type.isFunction)(callback)
    };
    _proto3._handleFileError = function(file, error) {
        file._isError = true;
        file.onError.fire(error)
    };
    _proto3._prepareFileBeforeUpload = function(file) {
        if (file.$file) {
            var _file$progressBar;
            null === (_file$progressBar = file.progressBar) || void 0 === _file$progressBar ? void 0 : _file$progressBar.dispose();
            this.fileUploader._createFileProgressBar(file)
        }
        if (file.isInitialized) {
            return
        }
        file.onLoadStart.add(this._onUploadStarted.bind(this, file));
        file.onLoad.add(this._onLoadedHandler.bind(this, file));
        file.onError.add(this._onErrorHandler.bind(this, file));
        file.onAbort.add(this._onAbortHandler.bind(this, file));
        file.onProgress.add(this._onProgressHandler.bind(this, file));
        file.isInitialized = true
    };
    _proto3._isStatusError = function(status) {
        return 400 <= status && status < 500 || 500 <= status && status < 600
    };
    _proto3._onUploadStarted = function(file, e) {
        file.uploadStarted = true;
        this.fileUploader._uploadStartedAction({
            file: file.value,
            event: e,
            request: file.request
        })
    };
    _proto3._onAbortHandler = function(file, e) {
        var args = {
            file: file.value,
            event: e,
            request: file.request,
            message: this.fileUploader._getUploadAbortedStatusMessage()
        };
        this.fileUploader._uploadAbortedAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    };
    _proto3._onErrorHandler = function(file, error) {
        var args = {
            file: file.value,
            event: void 0,
            request: file.request,
            error: error,
            message: this.fileUploader.option("uploadFailedMessage")
        };
        this.fileUploader._uploadErrorAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    };
    _proto3._onLoadedHandler = function(file, e) {
        var args = {
            file: file.value,
            event: e,
            request: file.request,
            message: this.fileUploader.option("uploadedMessage")
        };
        file._isLoaded = true;
        this.fileUploader._uploadedAction(args);
        this.fileUploader._setStatusMessage(file, args.message);
        this.fileUploader._handleAllFilesUploaded()
    };
    _proto3._onProgressHandler = function(file, e) {
        if (file) {
            var totalFilesSize = this.fileUploader._getTotalFilesSize();
            var totalLoadedFilesSize = this.fileUploader._getTotalLoadedFilesSize();
            var loadedSize = Math.min(e.loaded, file.value.size);
            var segmentSize = loadedSize - file.loadedSize;
            file.loadedSize = loadedSize;
            this.fileUploader._updateTotalProgress(totalFilesSize, totalLoadedFilesSize + segmentSize);
            this.fileUploader._updateProgressBar(file, this._getLoadedData(loadedSize, e.total, segmentSize, e))
        }
    };
    _proto3._getLoadedData = function(loaded, total, currentSegmentSize, event) {
        return {
            loaded: loaded,
            total: total,
            currentSegmentSize: currentSegmentSize
        }
    };
    _proto3._extendFormData = function(formData) {
        var formDataEntries = this.fileUploader.option("uploadCustomData");
        for (var entryName in formDataEntries) {
            if (Object.prototype.hasOwnProperty.call(formDataEntries, entryName) && (0, _type.isDefined)(formDataEntries[entryName])) {
                formData.append(entryName, formDataEntries[entryName])
            }
        }
    };
    return FileUploadStrategyBase
}();
var ChunksFileUploadStrategyBase = function(_FileUploadStrategyBa) {
    _inheritsLoose(ChunksFileUploadStrategyBase, _FileUploadStrategyBa);

    function ChunksFileUploadStrategyBase(fileUploader) {
        var _this15;
        _this15 = _FileUploadStrategyBa.call(this, fileUploader) || this;
        _this15.chunkSize = _this15.fileUploader.option("chunkSize");
        return _this15
    }
    var _proto4 = ChunksFileUploadStrategyBase.prototype;
    _proto4._uploadCore = function(file) {
        var realFile = file.value;
        var chunksData = {
            name: realFile.name,
            loadedBytes: 0,
            type: realFile.type,
            blobReader: new FileBlobReader(realFile, this.chunkSize),
            guid: new _guid.default,
            fileSize: realFile.size,
            count: Math.ceil(realFile.size / this.chunkSize),
            customData: {}
        };
        file.chunksData = chunksData;
        this._sendChunk(file, chunksData)
    };
    _proto4._sendChunk = function(file, chunksData) {
        var _this16 = this;
        var chunk = chunksData.blobReader.read();
        chunksData.currentChunk = chunk;
        if (chunk) {
            this._sendChunkCore(file, chunksData, chunk).done(function() {
                if (file.isAborted) {
                    return
                }
                chunksData.loadedBytes += chunk.blob.size;
                file.onProgress.fire({
                    loaded: chunksData.loadedBytes,
                    total: file.value.size
                });
                if (chunk.isCompleted) {
                    file.onLoad.fire()
                }
                setTimeout(function() {
                    return _this16._sendChunk(file, chunksData)
                })
            }).fail(function(error) {
                if (_this16._shouldHandleError(error)) {
                    _this16._handleFileError(file, error)
                }
            })
        }
    };
    _proto4._sendChunkCore = function(file, chunksData, chunk) {};
    _proto4._shouldHandleError = function(error) {};
    _proto4._tryRaiseStartLoad = function(file) {
        if (!file.isStartLoad) {
            file.isStartLoad = true;
            file.onLoadStart.fire()
        }
    };
    _proto4._getEvent = function(e) {
        return null
    };
    _proto4._createUploadArgument = function(file) {
        return this._createChunksInfo(file.chunksData)
    };
    _proto4._createChunksInfo = function(chunksData) {
        return {
            bytesUploaded: chunksData.loadedBytes,
            chunkCount: chunksData.count,
            customData: chunksData.customData,
            chunkBlob: chunksData.currentChunk.blob,
            chunkIndex: chunksData.currentChunk.index
        }
    };
    return ChunksFileUploadStrategyBase
}(FileUploadStrategyBase);
var DefaultChunksFileUploadStrategy = function(_ChunksFileUploadStra) {
    _inheritsLoose(DefaultChunksFileUploadStrategy, _ChunksFileUploadStra);

    function DefaultChunksFileUploadStrategy() {
        return _ChunksFileUploadStra.apply(this, arguments) || this
    }
    var _proto5 = DefaultChunksFileUploadStrategy.prototype;
    _proto5._sendChunkCore = function(file, chunksData, chunk) {
        var _this17 = this;
        return _ajax.default.sendRequest({
            url: this.fileUploader.option("uploadUrl"),
            method: this.fileUploader.option("uploadMethod"),
            headers: this.fileUploader.option("uploadHeaders"),
            beforeSend: function(xhr) {
                return _this17._beforeSend(xhr, file)
            },
            upload: {
                onloadstart: function() {
                    return _this17._tryRaiseStartLoad(file)
                },
                onabort: function() {
                    return file.onAbort.fire()
                }
            },
            data: this._createFormData({
                fileName: chunksData.name,
                blobName: this.fileUploader.option("name"),
                blob: chunk.blob,
                index: chunk.index,
                count: chunksData.count,
                type: chunksData.type,
                guid: chunksData.guid,
                size: chunksData.fileSize
            })
        })
    };
    _proto5._shouldHandleError = function(e) {
        return this._isStatusError(e.status)
    };
    _proto5._createFormData = function(options) {
        var formData = new window.FormData;
        formData.append(options.blobName, options.blob);
        formData.append(FILEUPLOADER_CHUNK_META_DATA_NAME, JSON.stringify({
            FileName: options.fileName,
            Index: options.index,
            TotalCount: options.count,
            FileSize: options.size,
            FileType: options.type,
            FileGuid: options.guid
        }));
        this._extendFormData(formData);
        return formData
    };
    return DefaultChunksFileUploadStrategy
}(ChunksFileUploadStrategyBase);
var CustomChunksFileUploadStrategy = function(_ChunksFileUploadStra2) {
    _inheritsLoose(CustomChunksFileUploadStrategy, _ChunksFileUploadStra2);

    function CustomChunksFileUploadStrategy() {
        return _ChunksFileUploadStra2.apply(this, arguments) || this
    }
    var _proto6 = CustomChunksFileUploadStrategy.prototype;
    _proto6._sendChunkCore = function(file, chunksData) {
        this._tryRaiseStartLoad(file);
        var chunksInfo = this._createChunksInfo(chunksData);
        var uploadChunk = this.fileUploader.option("uploadChunk");
        try {
            var result = uploadChunk(file.value, chunksInfo);
            return (0, _deferred.fromPromise)(result)
        } catch (error) {
            return (new _deferred.Deferred).reject(error).promise()
        }
    };
    _proto6._shouldHandleError = function(e) {
        return true
    };
    return CustomChunksFileUploadStrategy
}(ChunksFileUploadStrategyBase);
var WholeFileUploadStrategyBase = function(_FileUploadStrategyBa2) {
    _inheritsLoose(WholeFileUploadStrategyBase, _FileUploadStrategyBa2);

    function WholeFileUploadStrategyBase() {
        return _FileUploadStrategyBa2.apply(this, arguments) || this
    }
    var _proto7 = WholeFileUploadStrategyBase.prototype;
    _proto7._uploadCore = function(file) {
        var _this18 = this;
        file.loadedSize = 0;
        this._uploadFile(file).done(function() {
            if (!file.isAborted) {
                file.onLoad.fire()
            }
        }).fail(function(error) {
            if (_this18._shouldHandleError(file, error)) {
                _this18._handleFileError(file, error)
            }
        })
    };
    _proto7._uploadFile = function(file) {};
    _proto7._shouldHandleError = function(file, e) {};
    _proto7._handleProgress = function(file, e) {
        if (file._isError) {
            return
        }
        file._isProgressStarted = true;
        file.onProgress.fire(e)
    };
    _proto7._getLoadedData = function(loaded, total, segmentSize, event) {
        var result = _FileUploadStrategyBa2.prototype._getLoadedData.call(this, loaded, total, segmentSize, event);
        result.event = event;
        return result
    };
    return WholeFileUploadStrategyBase
}(FileUploadStrategyBase);
var DefaultWholeFileUploadStrategy = function(_WholeFileUploadStrat) {
    _inheritsLoose(DefaultWholeFileUploadStrategy, _WholeFileUploadStrat);

    function DefaultWholeFileUploadStrategy() {
        return _WholeFileUploadStrat.apply(this, arguments) || this
    }
    var _proto8 = DefaultWholeFileUploadStrategy.prototype;
    _proto8._uploadFile = function(file) {
        var _this19 = this;
        return _ajax.default.sendRequest({
            url: this.fileUploader.option("uploadUrl"),
            method: this.fileUploader.option("uploadMethod"),
            headers: this.fileUploader.option("uploadHeaders"),
            beforeSend: function(xhr) {
                return _this19._beforeSend(xhr, file)
            },
            upload: {
                onprogress: function(e) {
                    return _this19._handleProgress(file, e)
                },
                onloadstart: function() {
                    return file.onLoadStart.fire()
                },
                onabort: function() {
                    return file.onAbort.fire()
                }
            },
            data: this._createFormData(this.fileUploader.option("name"), file.value)
        })
    };
    _proto8._shouldHandleError = function(file, e) {
        return this._isStatusError(e.status) || !file._isProgressStarted
    };
    _proto8._createFormData = function(fieldName, fieldValue) {
        var formData = new window.FormData;
        formData.append(fieldName, fieldValue, fieldValue.name);
        this._extendFormData(formData);
        return formData
    };
    return DefaultWholeFileUploadStrategy
}(WholeFileUploadStrategyBase);
var CustomWholeFileUploadStrategy = function(_WholeFileUploadStrat2) {
    _inheritsLoose(CustomWholeFileUploadStrategy, _WholeFileUploadStrat2);

    function CustomWholeFileUploadStrategy() {
        return _WholeFileUploadStrat2.apply(this, arguments) || this
    }
    var _proto9 = CustomWholeFileUploadStrategy.prototype;
    _proto9._uploadFile = function(file) {
        var _this20 = this;
        file.onLoadStart.fire();
        var progressCallback = function(loadedBytes) {
            var arg = {
                loaded: loadedBytes,
                total: file.size
            };
            _this20._handleProgress(file, arg)
        };
        var uploadFile = this.fileUploader.option("uploadFile");
        try {
            var result = uploadFile(file.value, progressCallback);
            return (0, _deferred.fromPromise)(result)
        } catch (error) {
            return (new _deferred.Deferred).reject(error).promise()
        }
    };
    _proto9._shouldHandleError = function(file, e) {
        return true
    };
    return CustomWholeFileUploadStrategy
}(WholeFileUploadStrategyBase);
(0, _component_registrator.default)("dxFileUploader", FileUploader);
var _default = FileUploader;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
