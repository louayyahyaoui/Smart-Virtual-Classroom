/**
 * DevExtreme (ui/data_grid/ui.data_grid.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _console = require("../../core/utils/console");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiData_grid = _interopRequireDefault(require("./ui.data_grid.core"));
var _themes = require("../themes");
require("./ui.data_grid.column_headers");
require("./ui.data_grid.columns_controller");
require("./ui.data_grid.data_controller");
require("./ui.data_grid.sorting");
require("./ui.data_grid.rows");
require("./ui.data_grid.context_menu");
require("./ui.data_grid.error_handling");
require("./ui.data_grid.grid_view");
require("./ui.data_grid.header_panel");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DATAGRID_ROW_SELECTOR = ".dx-row";
var DATAGRID_DEPRECATED_TEMPLATE_WARNING = "Specifying grid templates with the jQuery selector name is now deprecated. Use the DOM Node or the jQuery object that references this selector instead.";
_uiData_grid.default.registerModulesOrder(["stateStoring", "columns", "selection", "editorFactory", "columnChooser", "grouping", "editing", "masterDetail", "validating", "adaptivity", "data", "virtualScrolling", "columnHeaders", "filterRow", "headerPanel", "headerFilter", "sorting", "search", "rows", "pager", "columnsResizingReordering", "contextMenu", "keyboardNavigation", "errorHandling", "summary", "columnFixing", "export", "gridView"]);
var DataGrid = _ui.default.inherit({
    _activeStateUnit: DATAGRID_ROW_SELECTOR,
    _getDefaultOptions: function() {
        var that = this;
        var result = that.callBase();
        (0, _iterator.each)(_uiData_grid.default.modules, function() {
            if ((0, _type.isFunction)(this.defaultOptions)) {
                (0, _extend.extend)(true, result, this.defaultOptions())
            }
        });
        return result
    },
    _setDeprecatedOptions: function() {
        this.callBase();
        (0, _extend.extend)(this._deprecatedOptions, {
            useKeyboard: {
                since: "19.2",
                alias: "keyboardNavigation.enabled"
            }
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                showRowLines: true
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                showRowLines: true,
                showColumnLines: false,
                headerFilter: {
                    height: 315
                },
                editing: {
                    useIcons: true
                }
            }
        }, {
            device: function() {
                return _browser.default.webkit
            },
            options: {
                loadingTimeout: 30,
                loadPanel: {
                    animation: {
                        show: {
                            easing: "cubic-bezier(1, 0, 1, 0)",
                            duration: 500,
                            from: {
                                opacity: 0
                            },
                            to: {
                                opacity: 1
                            }
                        }
                    }
                }
            }
        }, {
            device: function(_device) {
                return "desktop" !== _device.deviceType
            },
            options: {
                grouping: {
                    expandMode: "rowClick"
                }
            }
        }])
    },
    _init: function() {
        var that = this;
        that.callBase();
        _uiData_grid.default.processModules(that, _uiData_grid.default);
        _uiData_grid.default.callModuleItemsMethod(that, "init")
    },
    _clean: _common.noop,
    _optionChanged: function(args) {
        var that = this;
        _uiData_grid.default.callModuleItemsMethod(that, "optionChanged", [args]);
        if (!args.handled) {
            that.callBase(args)
        }
    },
    _dimensionChanged: function() {
        this.updateDimensions(true)
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this.updateDimensions()
        }
    },
    _initMarkup: function() {
        this.callBase.apply(this, arguments);
        this.getView("gridView").render(this.$element())
    },
    _renderContentImpl: function() {
        this.getView("gridView").update()
    },
    _renderContent: function() {
        var that = this;
        (0, _common.deferRender)(function() {
            that._renderContentImpl()
        })
    },
    _getTemplate: function(templateName) {
        var template = templateName;
        if ((0, _type.isString)(template) && "#" === template[0]) {
            template = (0, _renderer.default)(templateName);
            _console.logger.warn(DATAGRID_DEPRECATED_TEMPLATE_WARNING)
        }
        return this.callBase(template)
    },
    _dispose: function() {
        var that = this;
        that.callBase();
        _uiData_grid.default.callModuleItemsMethod(that, "dispose")
    },
    isReady: function() {
        return this.getController("data").isReady()
    },
    beginUpdate: function() {
        var that = this;
        that.callBase();
        _uiData_grid.default.callModuleItemsMethod(that, "beginUpdate")
    },
    endUpdate: function() {
        var that = this;
        _uiData_grid.default.callModuleItemsMethod(that, "endUpdate");
        that.callBase()
    },
    getController: function(name) {
        return this._controllers[name]
    },
    getView: function(name) {
        return this._views[name]
    },
    focus: function(element) {
        this.getController("keyboardNavigation").focus(element)
    }
});
DataGrid.registerModule = _uiData_grid.default.registerModule.bind(_uiData_grid.default);
(0, _component_registrator.default)("dxDataGrid", DataGrid);
var _default = DataGrid;
exports.default = _default;
module.exports = exports.default;
