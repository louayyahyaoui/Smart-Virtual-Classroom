/**
 * DevExtreme (bundles/modules/file_management.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _core = _interopRequireDefault(require("./core"));
var _file_system_item = _interopRequireDefault(require("../../file_management/file_system_item"));
var _object_provider = _interopRequireDefault(require("../../file_management/object_provider"));
var _remote_provider = _interopRequireDefault(require("../../file_management/remote_provider"));
var _custom_provider = _interopRequireDefault(require("../../file_management/custom_provider"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
module.exports = _core.default.fileManagement = _core.default.fileManagement || {};
_core.default.fileManagement.FileSystemItem = _file_system_item.default;
_core.default.fileManagement.ObjectFileSystemProvider = _object_provider.default;
_core.default.fileManagement.RemoteFileSystemProvider = _remote_provider.default;
_core.default.fileManagement.CustomFileSystemProvider = _custom_provider.default;
