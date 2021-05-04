/**
 * DevExtreme (ui/file_manager/ui.file_manager.breadcrumbs.js)
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
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _ui2 = _interopRequireDefault(require("../menu/ui.menu"));

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
var FILE_MANAGER_BREADCRUMBS_CLASS = "dx-filemanager-breadcrumbs";
var FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-parent-folder-item";
var FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-separator-item";
var FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + "-path-separator-item";
var FileManagerBreadcrumbs = function(_Widget) {
    _inheritsLoose(FileManagerBreadcrumbs, _Widget);

    function FileManagerBreadcrumbs() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = FileManagerBreadcrumbs.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._currentDirectory = null
    };
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this._initActions();
        if (this._currentDirectory) {
            this._renderMenu()
        }
        this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS)
    };
    _proto.setCurrentDirectory = function(directory) {
        if (!this._areDirsEqual(this._currentDirectory, directory)) {
            this._currentDirectory = directory;
            this.repaint()
        }
    };
    _proto._renderMenu = function() {
        var $menu = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._menu = this._createComponent($menu, _ui2.default, {
            dataSource: this._getMenuItems(),
            onItemClick: this._onItemClick.bind(this),
            onItemRendered: this._onItemRendered.bind(this)
        })
    };
    _proto._getMenuItems = function() {
        var dirLine = this._getParentDirsLine();
        var result = [{
            icon: "arrowup",
            directory: this._currentDirectory.parentDirectory,
            isPathItem: true,
            cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
        }, {
            text: "\xa0",
            cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
        }];
        dirLine.forEach(function(dir, index) {
            result.push({
                text: dir.getDisplayName(),
                directory: dir,
                isPathItem: true
            });
            if (index !== dirLine.length - 1) {
                result.push({
                    icon: "spinnext",
                    cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
                })
            }
        });
        return result
    };
    _proto._onItemClick = function(_ref) {
        var itemData = _ref.itemData;
        if (!itemData.isPathItem) {
            return
        }
        var newDir = itemData.directory;
        if (!this._areDirsEqual(newDir, this._currentDirectory)) {
            this._raiseCurrentDirectoryChanged(newDir)
        }
    };
    _proto._onItemRendered = function(_ref2) {
        var itemElement = _ref2.itemElement,
            itemData = _ref2.itemData;
        if (itemData.cssClass) {
            (0, _renderer.default)(itemElement).addClass(itemData.cssClass)
        }
    };
    _proto._getParentDirsLine = function() {
        var currentDirectory = this._currentDirectory;
        var result = [];
        while (currentDirectory) {
            result.unshift(currentDirectory);
            currentDirectory = currentDirectory.parentDirectory
        }
        return result
    };
    _proto._areDirsEqual = function(dir1, dir2) {
        return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key
    };
    _proto._initActions = function() {
        this._actions = {
            onCurrentDirectoryChanging: this._createActionByOption("onCurrentDirectoryChanging")
        }
    };
    _proto._raiseCurrentDirectoryChanged = function(currentDirectory) {
        this._actions.onCurrentDirectoryChanging({
            currentDirectory: currentDirectory
        })
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            rootFolderDisplayName: "Files",
            onCurrentDirectoryChanging: null
        })
    };
    _proto._optionChanged = function(args) {
        var name = args.name;
        switch (name) {
            case "rootFolderDisplayName":
                this.repaint();
                break;
            case "onCurrentDirectoryChanging":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    return FileManagerBreadcrumbs
}(_ui.default);
var _default = FileManagerBreadcrumbs;
exports.default = _default;
module.exports = exports.default;
