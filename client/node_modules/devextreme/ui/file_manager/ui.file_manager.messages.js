/**
 * DevExtreme (ui/file_manager/ui.file_manager.messages.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "ErrorCode", {
    enumerable: true,
    get: function() {
        return _errors.default
    }
});
exports.FileManagerMessages = void 0;
var _message = _interopRequireDefault(require("../../localization/message"));
var _errors = _interopRequireDefault(require("../../file_management/errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FileManagerMessages = {
    get: function(errorId, args) {
        switch (errorId) {
            case _errors.default.NoAccess:
                return _message.default.format("dxFileManager-errorNoAccess");
            case _errors.default.FileExists:
                return _message.default.format("dxFileManager-errorFileExistsFormat", args);
            case _errors.default.FileNotFound:
                return _message.default.format("dxFileManager-errorFileNotFoundFormat", args);
            case _errors.default.DirectoryExists:
                return _message.default.format("dxFileManager-errorDirectoryExistsFormat", args);
            case _errors.default.DirectoryNotFound:
                return _message.default.format("dxFileManager-errorDirectoryNotFoundFormat", args);
            case _errors.default.WrongFileExtension:
                return _message.default.format("dxFileManager-errorWrongFileExtension");
            case _errors.default.MaxFileSizeExceeded:
                return _message.default.format("dxFileManager-errorMaxFileSizeExceeded");
            case _errors.default.InvalidSymbols:
                return _message.default.format("dxFileManager-errorInvalidSymbols")
        }
        return _message.default.format("dxFileManager-errorDefault")
    }
};
exports.FileManagerMessages = FileManagerMessages;
