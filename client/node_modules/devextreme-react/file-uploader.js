/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploader = void 0;
var file_uploader_1 = require("devextreme/ui/file_uploader");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var FileUploader = /** @class */ (function (_super) {
    __extends(FileUploader, _super);
    function FileUploader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = file_uploader_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onBeforeSend", "onContentReady", "onDisposing", "onDropZoneEnter", "onDropZoneLeave", "onFilesUploaded", "onInitialized", "onOptionChanged", "onProgress", "onUploadAborted", "onUploaded", "onUploadError", "onUploadStarted", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value"
        };
        return _this;
    }
    Object.defineProperty(FileUploader.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return FileUploader;
}(component_1.Component));
exports.FileUploader = FileUploader;
FileUploader.propTypes = {
    abortUpload: PropTypes.func,
    accept: PropTypes.string,
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowCanceling: PropTypes.bool,
    allowedFileExtensions: PropTypes.array,
    chunkSize: PropTypes.number,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    inputAttr: PropTypes.object,
    invalidFileExtensionMessage: PropTypes.string,
    invalidMaxFileSizeMessage: PropTypes.string,
    invalidMinFileSizeMessage: PropTypes.string,
    isValid: PropTypes.bool,
    labelText: PropTypes.string,
    maxFileSize: PropTypes.number,
    minFileSize: PropTypes.number,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onBeforeSend: PropTypes.func,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onDropZoneEnter: PropTypes.func,
    onDropZoneLeave: PropTypes.func,
    onFilesUploaded: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onProgress: PropTypes.func,
    onUploadAborted: PropTypes.func,
    onUploaded: PropTypes.func,
    onUploadError: PropTypes.func,
    onUploadStarted: PropTypes.func,
    onValueChanged: PropTypes.func,
    progress: PropTypes.number,
    readOnly: PropTypes.bool,
    readyToUploadMessage: PropTypes.string,
    rtlEnabled: PropTypes.bool,
    selectButtonText: PropTypes.string,
    showFileList: PropTypes.bool,
    tabIndex: PropTypes.number,
    uploadAbortedMessage: PropTypes.string,
    uploadButtonText: PropTypes.string,
    uploadChunk: PropTypes.func,
    uploadCustomData: PropTypes.object,
    uploadedMessage: PropTypes.string,
    uploadFailedMessage: PropTypes.string,
    uploadFile: PropTypes.func,
    uploadHeaders: PropTypes.object,
    uploadMethod: PropTypes.oneOf([
        "POST",
        "PUT"
    ]),
    uploadMode: PropTypes.oneOf([
        "instantly",
        "useButtons",
        "useForm"
    ]),
    uploadUrl: PropTypes.string,
    validationError: PropTypes.object,
    validationErrors: PropTypes.array,
    validationStatus: PropTypes.oneOf([
        "valid",
        "invalid",
        "pending"
    ]),
    value: PropTypes.array,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = FileUploader;
