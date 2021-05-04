/**
 * DevExtreme (ui/grid_core/ui.grid_core.editing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _window = require("../../core/utils/window");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _click = require("../../events/click");
var _double_click = require("../../events/double_click");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _uiGrid_core2 = _interopRequireDefault(require("./ui.grid_core.utils"));
var _array_utils = require("../../data/array_utils");
var _index = require("../../events/utils/index");
var _dialog = require("../dialog");
var _message = _interopRequireDefault(require("../../localization/message"));
var _button = _interopRequireDefault(require("../button"));
var _popup = _interopRequireDefault(require("../popup"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _form = _interopRequireDefault(require("../form"));
var _hold = _interopRequireDefault(require("../../events/hold"));
var _deferred = require("../../core/utils/deferred");
var _common = require("../../core/utils/common");
var iconUtils = _interopRequireWildcard(require("../../core/utils/icon"));
var _ui = _interopRequireDefault(require("../scroll_view/ui.scrollable"));

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else {
            if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                })
            }
        }
    }
    return target
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
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
var EDIT_FORM_CLASS = "edit-form";
var EDIT_FORM_ITEM_CLASS = "edit-form-item";
var FOCUS_OVERLAY_CLASS = "focus-overlay";
var READONLY_CLASS = "readonly";
var EDIT_POPUP_CLASS = "edit-popup";
var FORM_BUTTONS_CONTAINER_CLASS = "form-buttons-container";
var ADD_ROW_BUTTON_CLASS = "addrow-button";
var DROPDOWN_EDITOR_OVERLAY_CLASS = "dx-dropdowneditor-overlay";
var LINK_CLASS = "dx-link";
var EDITOR_CELL_CLASS = "dx-editor-cell";
var ROW_SELECTED = "dx-selection";
var EDIT_ROW = "dx-edit-row";
var EDIT_BUTTON_CLASS = "dx-edit-button";
var COMMAND_EDIT_CLASS = "dx-command-edit";
var COMMAND_EDIT_WITH_ICONS_CLASS = COMMAND_EDIT_CLASS + "-with-icons";
var SCROLLABLE_CONTAINER_CLASS = "dx-scrollable-container";
var BUTTON_CLASS = "dx-button";
var INSERT_INDEX = "__DX_INSERT_INDEX__";
var ROW_CLASS = "dx-row";
var ROW_REMOVED = "dx-row-removed";
var ROW_INSERTED = "dx-row-inserted";
var ROW_MODIFIED = "dx-row-modified";
var CELL_MODIFIED = "dx-cell-modified";
var EDITING_NAMESPACE = "dxDataGridEditing";
var DATA_ROW_CLASS = "dx-data-row";
var CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
var EDITORS_INPUT_SELECTOR = "input:not([type='hidden'])";
var FOCUSABLE_ELEMENT_SELECTOR = "[tabindex], " + EDITORS_INPUT_SELECTOR;
var EDIT_MODE_BATCH = "batch";
var EDIT_MODE_ROW = "row";
var EDIT_MODE_CELL = "cell";
var EDIT_MODE_FORM = "form";
var EDIT_MODE_POPUP = "popup";
var DATA_EDIT_DATA_INSERT_TYPE = "insert";
var DATA_EDIT_DATA_UPDATE_TYPE = "update";
var DATA_EDIT_DATA_REMOVE_TYPE = "remove";
var DEFAULT_START_EDIT_ACTION = "click";
var EDIT_MODES = [EDIT_MODE_BATCH, EDIT_MODE_ROW, EDIT_MODE_CELL, EDIT_MODE_FORM, EDIT_MODE_POPUP];
var ROW_BASED_MODES = [EDIT_MODE_ROW, EDIT_MODE_FORM, EDIT_MODE_POPUP];
var CELL_BASED_MODES = [EDIT_MODE_BATCH, EDIT_MODE_CELL];
var FORM_BASED_MODES = [EDIT_MODE_FORM, EDIT_MODE_POPUP];
var MODES_WITH_DELAYED_FOCUS = [EDIT_MODE_ROW, EDIT_MODE_FORM];
var TARGET_COMPONENT_NAME = "targetComponent";
var EDIT_LINK_CLASS = {
    save: "dx-link-save",
    cancel: "dx-link-cancel",
    edit: "dx-link-edit",
    undelete: "dx-link-undelete",
    "delete": "dx-link-delete",
    add: "dx-link-add"
};
var EDIT_ICON_CLASS = {
    save: "save",
    cancel: "revert",
    edit: "edit",
    undelete: "revert",
    "delete": "trash",
    add: "add"
};
var METHOD_NAMES = {
    edit: "editRow",
    "delete": "deleteRow",
    undelete: "undeleteRow",
    save: "saveEditData",
    cancel: "cancelEditData",
    add: "addRowByRowIndex"
};
var ACTION_OPTION_NAMES = {
    add: "allowAdding",
    edit: "allowUpdating",
    "delete": "allowDeleting"
};
var BUTTON_NAMES = ["edit", "save", "cancel", "delete", "undelete"];
var EDITING_POPUP_OPTION_NAME = "editing.popup";
var EDITING_CHANGES_OPTION_NAME = "editing.changes";
var EDITING_EDITROWKEY_OPTION_NAME = "editing.editRowKey";
var EDITING_EDITCOLUMNNAME_OPTION_NAME = "editing.editColumnName";
var createFailureHandler = function(deferred) {
    return function(arg) {
        var error = arg instanceof Error ? arg : new Error(arg && String(arg) || "Unknown error");
        deferred.reject(error)
    }
};
var _getEditMode = function(that) {
    var editMode = that.option("editing.mode");
    if (EDIT_MODES.indexOf(editMode) !== -1) {
        return editMode
    }
    return EDIT_MODE_ROW
};
var _isRowEditMode = function(that) {
    var editMode = _getEditMode(that);
    return ROW_BASED_MODES.indexOf(editMode) !== -1
};
var isEditingCell = function(isEditRow, cellOptions) {
    return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing
};
var isEditingOrShowEditorAlwaysDataCell = function(isEditRow, cellOptions) {
    var isCommandCell = !!cellOptions.column.command;
    var isEditing = isEditingCell(isEditRow, cellOptions);
    var isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
    return "data" === cellOptions.rowType && isEditorCell
};
var EditingController = _uiGrid_core.default.ViewController.inherit(function() {
    var getDefaultEditorTemplate = function(that) {
        return function(container, options) {
            var $editor = (0, _renderer.default)("<div>").appendTo(container);
            that.getController("editorFactory").createEditor($editor, (0, _extend.extend)({}, options.column, {
                value: options.value,
                setValue: options.setValue,
                row: options.row,
                parentType: "dataRow",
                width: null,
                readOnly: !options.setValue,
                isOnForm: options.isOnForm,
                id: options.id
            }))
        }
    };
    var getEditingTexts = function(options) {
        var editingTexts = options.component.option("editing.texts") || {};
        return {
            save: editingTexts.saveRowChanges,
            cancel: editingTexts.cancelRowChanges,
            edit: editingTexts.editRow,
            undelete: editingTexts.undeleteRow,
            "delete": editingTexts.deleteRow,
            add: editingTexts.addRowToNode
        }
    };
    var getButtonIndex = function(buttons, name) {
        var result = -1;
        buttons.some(function(button, index) {
            if (getButtonName(button) === name) {
                result = index;
                return true
            }
        });
        return result
    };

    function getButtonName(button) {
        return (0, _type.isObject)(button) ? button.name : button
    }
    var getEditorType = function(item) {
        var column = item.column;
        return item.isCustomEditorType ? item.editorType : column.formItem && column.formItem.editorType
    };
    var forEachFormItems = function forEachFormItems(items, callBack) {
        items.forEach(function(item) {
            if (item.items || item.tabs) {
                forEachFormItems(item.items || item.tabs, callBack)
            } else {
                callBack(item)
            }
        })
    };
    return {
        init: function() {
            var that = this;
            that._columnsController = that.getController("columns");
            that._dataController = that.getController("data");
            that._rowsView = that.getView("rowsView");
            that._editForm = null;
            that._updateEditFormDeferred = null;
            that._lastOperation = null;
            if (that._deferreds) {
                that._deferreds.forEach(function(d) {
                    return d.reject("cancel")
                })
            }
            that._deferreds = [];
            if (!that._dataChangedHandler) {
                that._dataChangedHandler = that._handleDataChanged.bind(that);
                that._dataController.changed.add(that._dataChangedHandler)
            }
            if (!that._saveEditorHandler) {
                that.createAction("onInitNewRow", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onRowInserting", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onRowInserted", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onEditingStart", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onRowUpdating", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onRowUpdated", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onRowRemoving", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onRowRemoved", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onSaved", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onSaving", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onEditCanceling", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                that.createAction("onEditCanceled", {
                    excludeValidators: ["disabled", "readOnly"]
                });
                var $pointerDownTarget;
                var isResizing;
                that._pointerUpEditorHandler = function() {
                    var _that$getController;
                    isResizing = null === (_that$getController = that.getController("columnsResizer")) || void 0 === _that$getController ? void 0 : _that$getController.isResizing()
                };
                that._pointerDownEditorHandler = function(e) {
                    return $pointerDownTarget = (0, _renderer.default)(e.target)
                };
                that._saveEditorHandler = that.createAction(function(e) {
                    var event = e.event;
                    var $target = (0, _renderer.default)(event.target);
                    var targetComponent = event[TARGET_COMPONENT_NAME];
                    if ($pointerDownTarget && $pointerDownTarget.is("input") && !$pointerDownTarget.is($target)) {
                        return
                    }

                    function checkEditorPopup($element) {
                        return $element && !!$element.closest(".".concat(DROPDOWN_EDITOR_OVERLAY_CLASS)).length
                    }
                    if (!_isRowEditMode(that) && !that._editCellInProgress) {
                        var isEditorPopup = checkEditorPopup($target) || checkEditorPopup(null === targetComponent || void 0 === targetComponent ? void 0 : targetComponent.$element());
                        var isDomElement = !!$target.closest((0, _window.getWindow)().document).length;
                        var isAnotherComponent = targetComponent && !targetComponent._disposed && targetComponent !== that.component;
                        var isAddRowButton = !!$target.closest(".".concat(that.addWidgetPrefix(ADD_ROW_BUTTON_CLASS))).length;
                        var isFocusOverlay = $target.hasClass(that.addWidgetPrefix(FOCUS_OVERLAY_CLASS));
                        var isCellEditMode = _getEditMode(that) === EDIT_MODE_CELL;
                        if (!isResizing && !isEditorPopup && !isFocusOverlay && !(isAddRowButton && isCellEditMode && that.isEditing()) && (isDomElement || isAnotherComponent)) {
                            that._closeEditItem.bind(that)($target)
                        }
                    }
                });
                _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.up, that._pointerUpEditorHandler);
                _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.down, that._pointerDownEditorHandler);
                _events_engine.default.on(_dom_adapter.default.getDocument(), _click.name, that._saveEditorHandler)
            }
            that._updateEditColumn();
            that._updateEditButtons();
            if (!this._internalState) {
                this._internalState = []
            }
            this.component._optionsByReference[EDITING_EDITROWKEY_OPTION_NAME] = true;
            this.component._optionsByReference[EDITING_CHANGES_OPTION_NAME] = true
        },
        getChanges: function() {
            return this.option(EDITING_CHANGES_OPTION_NAME)
        },
        resetChanges: function() {
            var changes = this.getChanges();
            var needReset = null === changes || void 0 === changes ? void 0 : changes.length;
            if (needReset) {
                this._silentOption(EDITING_CHANGES_OPTION_NAME, [])
            }
        },
        _getInternalData: function(key) {
            return this._internalState.filter(function(item) {
                return item.key === key
            })[0]
        },
        _addInternalData: function(params) {
            var internalData = this._getInternalData(params.key);
            if (internalData) {
                return (0, _extend.extend)(internalData, params)
            }
            this._internalState.push(params);
            return params
        },
        _getOldData: function(key) {
            var _this$_getInternalDat;
            return null === (_this$_getInternalDat = this._getInternalData(key)) || void 0 === _this$_getInternalDat ? void 0 : _this$_getInternalDat.oldData
        },
        getUpdatedData: function(data) {
            var key = this._dataController.keyOf(data);
            var changes = this.getChanges();
            var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);
            if (changes[editIndex]) {
                return (0, _array_utils.createObjectWithChanges)(data, changes[editIndex].data)
            }
            return data
        },
        getInsertedData: function() {
            return this.getChanges().filter(function(change) {
                return change.data && change.type === DATA_EDIT_DATA_INSERT_TYPE
            }).map(function(change) {
                return change.data
            })
        },
        getRemovedData: function() {
            var _this = this;
            return this.getChanges().filter(function(change) {
                return _this._getOldData(change.key) && change.type === DATA_EDIT_DATA_REMOVE_TYPE
            }).map(function(change) {
                return _this._getOldData(change.key)
            })
        },
        _fireDataErrorOccurred: function(arg) {
            if ("cancel" === arg) {
                return
            }
            var $popupContent = this.getPopupContent();
            this._dataController.dataErrorOccurred.fire(arg, $popupContent)
        },
        _needToCloseEditableCell: function($targetElement) {
            var $element = this.component.$element();
            var result = this.isEditing();
            var isCurrentComponentElement = !$element || !!$targetElement.closest($element).length;
            if (isCurrentComponentElement) {
                var isDataRow = $targetElement.closest("." + DATA_ROW_CLASS).length;
                if (isDataRow) {
                    var rowsView = this.getView("rowsView");
                    var $targetCell = $targetElement.closest("." + ROW_CLASS + "> td");
                    var rowIndex = rowsView.getRowIndex($targetCell.parent());
                    var columnIndex = rowsView.getCellElements(rowIndex).index($targetCell);
                    var visibleColumns = this._columnsController.getVisibleColumns();
                    var allowEditing = visibleColumns[columnIndex] && visibleColumns[columnIndex].allowEditing;
                    result = result && !allowEditing && !this.isEditCell(rowIndex, columnIndex)
                }
            }
            return result
        },
        _closeEditItem: function($targetElement) {
            if (this._needToCloseEditableCell($targetElement)) {
                this.closeEditCell()
            }
        },
        _handleDataChanged: function(args) {
            var editForm = this._editForm;
            if ("refresh" === args.changeType && _getEditMode(this) === EDIT_MODE_POPUP && editForm && editForm.option("visible")) {
                this._repaintEditPopup()
            }
        },
        _isDefaultButtonVisible: function(button, options) {
            var result = true;
            var isRowMode = _isRowEditMode(this);
            var isBatchMode = _getEditMode(this) === EDIT_MODE_BATCH;
            var isEditRow = options.row && options.row.rowIndex === this._getVisibleEditRowIndex() && isRowMode;
            switch (button.name) {
                case "edit":
                    result = !isEditRow && this.allowUpdating(options) && isRowMode;
                    break;
                case "save":
                case "cancel":
                    result = isEditRow;
                    break;
                case "delete":
                    result = !isEditRow && this.allowDeleting(options) && (!isBatchMode || !options.row.removed);
                    break;
                case "undelete":
                    result = isBatchMode && this.allowDeleting(options) && options.row.removed
            }
            return result
        },
        _isButtonVisible: function(button, options) {
            var visible = button.visible;
            if (!(0, _type.isDefined)(visible)) {
                return this._isDefaultButtonVisible(button, options)
            }
            return (0, _type.isFunction)(visible) ? visible.call(button, {
                component: options.component,
                row: options.row,
                column: options.column
            }) : visible
        },
        _getButtonConfig: function(button, options) {
            var _this2 = this;
            var config = (0, _type.isObject)(button) ? button : {};
            var buttonName = getButtonName(button);
            var editingTexts = getEditingTexts(options);
            var methodName = METHOD_NAMES[buttonName];
            var editingOptions = this.option("editing");
            var actionName = ACTION_OPTION_NAMES[buttonName];
            var allowAction = actionName ? editingOptions[actionName] : true;
            return (0, _extend.extend)({
                name: buttonName,
                text: editingTexts[buttonName],
                cssClass: EDIT_LINK_CLASS[buttonName],
                onClick: function(e) {
                    var event = e.event;
                    event.stopPropagation();
                    event.preventDefault();
                    setTimeout(function() {
                        options.row && allowAction && _this2[methodName] && _this2[methodName](options.row.rowIndex)
                    })
                }
            }, config)
        },
        _getEditingButtons: function(options) {
            var _this3 = this;
            var buttonIndex;
            var haveCustomButtons = !!options.column.buttons;
            var buttons = (options.column.buttons || []).slice();
            if (haveCustomButtons) {
                buttonIndex = getButtonIndex(buttons, "edit");
                if (buttonIndex >= 0) {
                    if (getButtonIndex(buttons, "save") < 0) {
                        buttons.splice(buttonIndex + 1, 0, "save")
                    }
                    if (getButtonIndex(buttons, "cancel") < 0) {
                        buttons.splice(getButtonIndex(buttons, "save") + 1, 0, "cancel")
                    }
                }
                buttonIndex = getButtonIndex(buttons, "delete");
                if (buttonIndex >= 0 && getButtonIndex(buttons, "undelete") < 0) {
                    buttons.splice(buttonIndex + 1, 0, "undelete")
                }
            } else {
                buttons = BUTTON_NAMES.slice()
            }
            return buttons.map(function(button) {
                return _this3._getButtonConfig(button, options)
            })
        },
        _renderEditingButtons: function($container, buttons, options) {
            var _this4 = this;
            buttons.forEach(function(button) {
                if (_this4._isButtonVisible(button, options)) {
                    _this4._createButton($container, button, options)
                }
            })
        },
        _getEditCommandCellTemplate: function() {
            var _this5 = this;
            return function(container, options) {
                var $container = (0, _renderer.default)(container);
                if ("data" === options.rowType) {
                    var buttons = _this5._getEditingButtons(options);
                    _this5._renderEditingButtons($container, buttons, options);
                    options.watch && options.watch(function() {
                        return buttons.map(function(button) {
                            return _this5._isButtonVisible(button, options)
                        })
                    }, function() {
                        $container.empty();
                        _this5._renderEditingButtons($container, buttons, options)
                    })
                } else {
                    _uiGrid_core2.default.setEmptyText($container)
                }
            }
        },
        isRowEditMode: function() {
            return _isRowEditMode(this)
        },
        isFormEditMode: function() {
            var editMode = _getEditMode(this);
            return FORM_BASED_MODES.indexOf(editMode) !== -1
        },
        isCellOrBatchEditMode: function() {
            var editMode = this.getEditMode();
            return CELL_BASED_MODES.indexOf(editMode) !== -1
        },
        getEditMode: function() {
            return _getEditMode(this)
        },
        getFirstEditableColumnIndex: function() {
            var columnsController = this.getController("columns");
            var firstFormItem = this._firstFormItem;
            var columnIndex;
            if (_getEditMode(this) === EDIT_MODE_FORM && firstFormItem) {
                var editRowKey = this.option(EDITING_EDITROWKEY_OPTION_NAME);
                var editRowIndex = this._dataController.getRowIndexByKey(editRowKey);
                var $editFormElements = this._rowsView.getCellElements(editRowIndex);
                columnIndex = this._rowsView._getEditFormEditorVisibleIndex($editFormElements, firstFormItem.column)
            } else {
                var visibleColumns = columnsController.getVisibleColumns();
                (0, _iterator.each)(visibleColumns, function(index, column) {
                    if (column.allowEditing) {
                        columnIndex = index;
                        return false
                    }
                })
            }
            return columnIndex
        },
        getFirstEditableCellInRow: function(rowIndex) {
            var rowsView = this.getView("rowsView");
            return rowsView && rowsView._getCellElement(rowIndex ? rowIndex : 0, this.getFirstEditableColumnIndex())
        },
        getFocusedCellInRow: function(rowIndex) {
            return this.getFirstEditableCellInRow(rowIndex)
        },
        getIndexByKey: function(key, items) {
            return _uiGrid_core2.default.getIndexByKey(key, items)
        },
        hasChanges: function(rowIndex) {
            var changes = this.getChanges();
            var result = false;
            for (var i = 0; i < (null === changes || void 0 === changes ? void 0 : changes.length); i++) {
                if (changes[i].type && (!(0, _type.isDefined)(rowIndex) || this._dataController.getRowIndexByKey(changes[i].key) === rowIndex)) {
                    result = true;
                    break
                }
            }
            return result
        },
        dispose: function() {
            this.callBase();
            clearTimeout(this._inputFocusTimeoutID);
            _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.up, this._pointerUpEditorHandler);
            _events_engine.default.off(_dom_adapter.default.getDocument(), _pointer.default.down, this._pointerDownEditorHandler);
            _events_engine.default.off(_dom_adapter.default.getDocument(), _click.name, this._saveEditorHandler)
        },
        optionChanged: function(args) {
            if ("editing" === args.name) {
                var fullName = args.fullName;
                var editPopup = this._editPopup;
                if (fullName && 0 === fullName.indexOf(EDITING_POPUP_OPTION_NAME)) {
                    if (editPopup) {
                        var popupOptionName = fullName.slice(EDITING_POPUP_OPTION_NAME.length + 1);
                        if (popupOptionName) {
                            editPopup.option(popupOptionName, args.value)
                        } else {
                            editPopup.option(args.value)
                        }
                    }
                } else {
                    if (editPopup && editPopup.option("visible") && 0 === fullName.indexOf("editing.form")) {
                        this._repaintEditPopup()
                    } else {
                        if (fullName === EDITING_EDITROWKEY_OPTION_NAME) {
                            this._handleEditRowKeyChange(args)
                        } else {
                            if (fullName === EDITING_EDITCOLUMNNAME_OPTION_NAME) {
                                this._handleEditColumnNameChange(args)
                            } else {
                                if (fullName === EDITING_CHANGES_OPTION_NAME) {
                                    this._handleChangesChange(args)
                                } else {
                                    this.init();
                                    this.resetChanges();
                                    this._resetEditColumnName();
                                    this._resetEditRowKey()
                                }
                            }
                        }
                    }
                }
                args.handled = true
            } else {
                this.callBase(args)
            }
        },
        _handleEditRowKeyChange: function(args) {
            var rowIndex = this._dataController.getRowIndexByKey(args.value);
            var oldRowIndexCorrection = this._getEditRowIndexCorrection();
            var oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;
            var columnIndex = this._getVisibleEditColumnIndex();
            if (!this.isCellOrBatchEditMode()) {
                if ((0, _type.isDefined)(args.value)) {
                    if (args.value !== args.previousValue) {
                        this._editRowFromOptionChanged(rowIndex, oldRowIndex)
                    }
                } else {
                    this.cancelEditData()
                }
            } else {
                if ((0, _type.isDefined)(args.value) && args.value !== args.previousValue) {
                    this._editCellFromOptionChanged(columnIndex, columnIndex, oldRowIndex)
                }
            }
        },
        _handleEditColumnNameChange: function(args) {
            var oldRowIndex = this._getVisibleEditRowIndex(args.previousValue);
            if (this.isCellOrBatchEditMode() && oldRowIndex !== -1 && (0, _type.isDefined)(args.value) && args.value !== args.previousValue) {
                var columnIndex = this._columnsController.getVisibleColumnIndex(args.value);
                var oldColumnIndex = this._columnsController.getVisibleColumnIndex(args.previousValue);
                this._editCellFromOptionChanged(columnIndex, oldColumnIndex, oldRowIndex)
            }
        },
        _handleChangesChange: function(args) {
            var dataController = this._dataController;
            if (!args.value.length && !args.previousValue.length) {
                return
            }
            dataController.updateItems({
                repaintChangesOnly: true
            })
        },
        _editCellFromOptionChanged: function(columnIndex, oldColumnIndex, oldRowIndex) {
            var _this6 = this;
            var columns = this._columnsController.getVisibleColumns();
            if (columnIndex > -1) {
                (0, _common.deferRender)(function() {
                    _this6._repaintEditCell(columns[columnIndex], columns[oldColumnIndex], oldRowIndex)
                })
            }
        },
        publicMethods: function() {
            return ["addRow", "deleteRow", "undeleteRow", "editRow", "editCell", "closeEditCell", "saveEditData", "cancelEditData", "hasEditData"]
        },
        refresh: function(isPageChanged) {
            var editMode = _getEditMode(this);
            var needResetIndexes = editMode === EDIT_MODE_BATCH || isPageChanged && "virtual" !== this.option("scrolling.mode");
            if (!(0, _type.isDefined)(this._pageIndex)) {
                return
            }
            if (!this.isCellOrBatchEditMode()) {
                this.resetChanges();
                this.init();
                if ((0, _type.isDefined)(this.option(EDITING_EDITROWKEY_OPTION_NAME))) {
                    this._resetEditRowKey()
                }
            } else {
                if (needResetIndexes) {
                    this._resetEditColumnName();
                    this._resetEditRowKey()
                }
            }
        },
        isEditing: function() {
            var isEditRowKeyDefined = (0, _type.isDefined)(this.option(EDITING_EDITROWKEY_OPTION_NAME));
            var isEditColumnNameDefined = (0, _type.isDefined)(this.option(EDITING_EDITCOLUMNNAME_OPTION_NAME));
            if (this.isCellOrBatchEditMode()) {
                return isEditRowKeyDefined && isEditColumnNameDefined
            }
            return isEditRowKeyDefined
        },
        isEditRow: function(rowIndex) {
            var editMode = _getEditMode(this);
            return this._getVisibleEditRowIndex() === rowIndex && ROW_BASED_MODES.indexOf(editMode) !== -1
        },
        _setEditRowKey: function(value, silent) {
            if (silent) {
                this._silentOption(EDITING_EDITROWKEY_OPTION_NAME, value)
            } else {
                this.option(EDITING_EDITROWKEY_OPTION_NAME, value)
            }
        },
        _setEditRowKeyByIndex: function(rowIndex, silent) {
            var key = this._dataController.getKeyByRowIndex(rowIndex);
            if (void 0 === key) {
                this._dataController.fireError("E1043");
                return
            }
            this._setEditRowKey(key, silent)
        },
        getEditRowIndex: function() {
            return this._getVisibleEditRowIndex()
        },
        getEditFormRowIndex: function() {
            var editMode = _getEditMode(this);
            return editMode === EDIT_MODE_FORM || editMode === EDIT_MODE_POPUP ? this._getVisibleEditRowIndex() : -1
        },
        isEditCell: function(visibleRowIndex, columnIndex) {
            return this._getVisibleEditRowIndex() === visibleRowIndex && this._getVisibleEditColumnIndex() === columnIndex
        },
        getPopupContent: function() {
            var editMode = _getEditMode(this);
            var popupVisible = this._editPopup && this._editPopup.option("visible");
            if (editMode === EDIT_MODE_POPUP && popupVisible) {
                return this._$popupContent
            }
        },
        getEditForm: function() {
            return this._editForm
        },
        _needInsertItem: function(change, changeType) {
            var that = this;
            var dataSource = that._dataController.dataSource();
            var scrollingMode = that.option("scrolling.mode");
            var pageIndex = dataSource.pageIndex();
            var beginPageIndex = dataSource.beginPageIndex ? dataSource.beginPageIndex() : pageIndex;
            var endPageIndex = dataSource.endPageIndex ? dataSource.endPageIndex() : pageIndex;
            if ("standard" !== scrollingMode) {
                switch (changeType) {
                    case "append":
                        return change.key.pageIndex === endPageIndex;
                    case "prepend":
                        return change.key.pageIndex === beginPageIndex;
                    case "refresh":
                        change.key.rowIndex = 0;
                        change.key.dataRowIndex = 0;
                        change.key.pageIndex = 0;
                        break;
                    default:
                        return change.key.pageIndex >= beginPageIndex && change.key.pageIndex <= endPageIndex
                }
            }
            return change.key.pageIndex === pageIndex
        },
        _generateNewItem: function(key) {
            var item = {
                key: key
            };
            if (key && key[INSERT_INDEX]) {
                item[INSERT_INDEX] = key[INSERT_INDEX]
            }
            return item
        },
        _getLoadedRowIndexByInsertKey: function(items, change, key) {
            var dataController = this._dataController;
            var loadedRowIndexOffset = dataController.getRowIndexOffset(true);
            var loadedRowIndex = key.dataRowIndex - loadedRowIndexOffset;
            if ("append" === change.changeType) {
                loadedRowIndex -= dataController.items(true).length;
                if (change.removeCount) {
                    loadedRowIndex += change.removeCount
                }
            }
            for (var i = 0; i < loadedRowIndex; i++) {
                if (items[i] && items[i][INSERT_INDEX]) {
                    loadedRowIndex++
                }
            }
            return loadedRowIndex
        },
        processItems: function(items, e) {
            var _this7 = this;
            var changeType = e.changeType;
            this.update(changeType);
            var changes = this.getChanges();
            changes.forEach(function(change) {
                var key = change.key;
                if ((0, _type.isDefined)(key) && change.type === DATA_EDIT_DATA_INSERT_TYPE) {
                    var loadedRowIndex = _this7._getLoadedRowIndexByInsertKey(items, e, key);
                    var item = _this7._generateNewItem(key);
                    if (loadedRowIndex >= 0 && _this7._needInsertItem(change, changeType, items, item)) {
                        items.splice(key.dataRowIndex ? loadedRowIndex : 0, 0, item)
                    }
                }
            });
            return items
        },
        processDataItem: function(item, options, generateDataValues) {
            var columns = options.visibleColumns;
            var key = item.data[INSERT_INDEX] ? item.data.key : item.key;
            var changes = this.getChanges();
            var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);
            item.isEditing = false;
            if (editIndex >= 0) {
                var editMode = _getEditMode(this);
                var _changes$editIndex = changes[editIndex],
                    data = _changes$editIndex.data,
                    type = _changes$editIndex.type;
                switch (type) {
                    case DATA_EDIT_DATA_INSERT_TYPE:
                        if (editMode === EDIT_MODE_POPUP) {
                            item.visible = false
                        }
                        item.isNewRow = true;
                        item.key = key;
                        item.data = data;
                        break;
                    case DATA_EDIT_DATA_UPDATE_TYPE:
                        item.modified = true;
                        item.oldData = item.data;
                        item.data = (0, _array_utils.createObjectWithChanges)(item.data, data);
                        item.modifiedValues = generateDataValues(data, columns, true);
                        break;
                    case DATA_EDIT_DATA_REMOVE_TYPE:
                        if (editMode === EDIT_MODE_BATCH) {
                            item.data = (0, _array_utils.createObjectWithChanges)(item.data, data)
                        }
                        item.removed = true
                }
            }
        },
        _initNewRow: function(options) {
            var _this8 = this;
            this.executeAction("onInitNewRow", options);
            if (options.promise) {
                var deferred = new _deferred.Deferred;
                (0, _deferred.when)((0, _deferred.fromPromise)(options.promise)).done(deferred.resolve).fail(createFailureHandler(deferred)).fail(function(arg) {
                    return _this8._fireDataErrorOccurred(arg)
                });
                return deferred
            }
        },
        _getInsertKey: function(parentKey) {
            var that = this;
            var dataController = that._dataController;
            var rows = dataController.items();
            var editMode = _getEditMode(that);
            var insertKey = {
                parentKey: parentKey,
                pageIndex: dataController.pageIndex(),
                rowIndex: that._getInsertRowIndex(parentKey)
            };
            var row = rows[insertKey.rowIndex];
            if (row && (!row.isEditing && "detail" === row.rowType || "detailAdaptive" === row.rowType)) {
                insertKey.rowIndex++
            }
            insertKey.dataRowIndex = dataController.getRowIndexOffset() + rows.filter(function(row, index) {
                return index < insertKey.rowIndex && ("data" === row.rowType && !row.isNewRow || "group" === row.rowType)
            }).length;
            if (editMode !== EDIT_MODE_BATCH) {
                this._setEditRowKey(insertKey, true)
            }
            insertKey[INSERT_INDEX] = that._getInsertIndex();
            return insertKey
        },
        _getInsertRowIndex: function(parentKey) {
            var that = this;
            var rowsView = that.getView("rowsView");
            var parentRowIndex = that._dataController.getRowIndexByKey(parentKey);
            if (parentRowIndex >= 0) {
                return parentRowIndex + 1
            }
            if (rowsView) {
                return rowsView.getTopVisibleItemIndex(true)
            }
            return 0
        },
        _getInsertIndex: function() {
            var maxInsertIndex = 0;
            this.getChanges().forEach(function(editItem) {
                if (editItem.type === DATA_EDIT_DATA_INSERT_TYPE && editItem.key[INSERT_INDEX] > maxInsertIndex) {
                    maxInsertIndex = editItem.key[INSERT_INDEX]
                }
            });
            return maxInsertIndex + 1
        },
        addRow: function(parentKey) {
            var that = this;
            var dataController = that._dataController;
            var store = dataController.store();
            var key = store && store.key();
            var param = {
                data: {}
            };
            var editMode = _getEditMode(that);
            var oldEditRowIndex = that._getVisibleEditRowIndex();
            var deferred = new _deferred.Deferred;
            if (!store) {
                dataController.fireError("E1052", this.component.NAME);
                return deferred.reject()
            }
            if (editMode === EDIT_MODE_CELL && that.hasChanges()) {
                that.saveEditData().done(function() {
                    if (!that.hasChanges()) {
                        that.addRow(parentKey).done(deferred.resolve).fail(deferred.reject)
                    } else {
                        deferred.reject("cancel")
                    }
                });
                return deferred.promise()
            }
            that.refresh();
            if (!that._allowRowAdding()) {
                return deferred.reject("cancel")
            }
            if (!key) {
                param.data.__KEY__ = String(new _guid.default)
            }(0, _deferred.when)(that._initNewRow(param, parentKey)).done(function() {
                if (that._allowRowAdding()) {
                    that._addRowCore(param.data, parentKey, oldEditRowIndex);
                    deferred.resolve()
                } else {
                    deferred.reject("cancel")
                }
            }).fail(deferred.reject);
            return deferred.promise()
        },
        _allowRowAdding: function() {
            var that = this;
            var editMode = _getEditMode(that);
            var insertIndex = that._getInsertIndex();
            if (editMode !== EDIT_MODE_BATCH && insertIndex > 1) {
                return false
            }
            return true
        },
        _addRowCore: function(data, parentKey, initialOldEditRowIndex) {
            var that = this;
            var oldEditRowIndex = that._getVisibleEditRowIndex();
            var insertKey = that._getInsertKey(parentKey);
            var editMode = _getEditMode(that);
            that._addChange({
                key: insertKey,
                data: data,
                type: DATA_EDIT_DATA_INSERT_TYPE
            });
            that._dataController.updateItems({
                changeType: "update",
                rowIndices: [initialOldEditRowIndex, oldEditRowIndex, insertKey.rowIndex]
            });
            if (editMode === EDIT_MODE_POPUP) {
                that._showEditPopup(insertKey.rowIndex)
            } else {
                that._focusFirstEditableCellInRow(insertKey.rowIndex)
            }
            that._afterInsertRow({
                key: insertKey,
                data: data
            })
        },
        _focusFirstEditableCellInRow: function(rowIndex) {
            var that = this;
            var $firstCell = that.getFirstEditableCellInRow(rowIndex);
            that._editCellInProgress = true;
            that._delayedInputFocus($firstCell, function() {
                that._editCellInProgress = false;
                var $cell = that.getFirstEditableCellInRow(rowIndex);
                var eventToTrigger = "dblClick" === that.option("editing.startEditAction") ? _double_click.name : _click.name;
                $cell && _events_engine.default.trigger($cell, eventToTrigger)
            })
        },
        _isEditingStart: function(options) {
            this.executeAction("onEditingStart", options);
            return options.cancel
        },
        _beforeEditCell: function(rowIndex, columnIndex, item) {
            var that = this;
            if (_getEditMode(that) === EDIT_MODE_CELL && !item.isNewRow && that.hasChanges()) {
                var d = new _deferred.Deferred;
                that.saveEditData().always(function() {
                    d.resolve(that.hasChanges())
                });
                return d
            }
        },
        _beforeUpdateItems: function() {},
        _getVisibleEditColumnIndex: function() {
            var editColumnName = this.option(EDITING_EDITCOLUMNNAME_OPTION_NAME);
            if (!(0, _type.isDefined)(editColumnName)) {
                return -1
            }
            return this._columnsController.getVisibleColumnIndex(editColumnName)
        },
        _setEditColumnNameByIndex: function(index, silent) {
            var _visibleColumns$index;
            var visibleColumns = this._columnsController.getVisibleColumns();
            this._setEditColumnName(null === (_visibleColumns$index = visibleColumns[index]) || void 0 === _visibleColumns$index ? void 0 : _visibleColumns$index.name, silent)
        },
        _setEditColumnName: function(name, silent) {
            if (silent) {
                this._silentOption(EDITING_EDITCOLUMNNAME_OPTION_NAME, name)
            } else {
                this.option(EDITING_EDITCOLUMNNAME_OPTION_NAME, name)
            }
        },
        _resetEditColumnName: function() {
            this._setEditColumnName(null, true)
        },
        _getEditColumn: function() {
            var editColumnName = this.option(EDITING_EDITCOLUMNNAME_OPTION_NAME);
            return this._getColumnByName(editColumnName)
        },
        _getColumnByName: function(name) {
            var visibleColumns = this._columnsController.getVisibleColumns();
            var editColumn;
            (0, _type.isDefined)(name) && visibleColumns.some(function(column) {
                if (column.name === name) {
                    editColumn = column;
                    return true
                }
            });
            return editColumn
        },
        _getVisibleEditRowIndex: function(columnName) {
            var dataController = this._dataController;
            var editRowKey = this.option(EDITING_EDITROWKEY_OPTION_NAME);
            var rowIndex = dataController.getRowIndexByKey(editRowKey);
            if (rowIndex === -1) {
                return rowIndex
            }
            return rowIndex + this._getEditRowIndexCorrection(columnName)
        },
        _getEditRowIndexCorrection: function(columnName) {
            var editColumn = columnName ? this._getColumnByName(columnName) : this._getEditColumn();
            var isColumnHidden = "adaptiveHidden" === (null === editColumn || void 0 === editColumn ? void 0 : editColumn.visibleWidth);
            return isColumnHidden ? 1 : 0
        },
        _resetEditRowKey: function() {
            this._setEditRowKey(null, true)
        },
        _resetEditIndices: function() {
            this._resetEditColumnName();
            this._resetEditRowKey()
        },
        editRow: function(rowIndex) {
            var dataController = this._dataController;
            var items = dataController.items();
            var item = items[rowIndex];
            var params = {
                data: item && item.data,
                cancel: false
            };
            var oldRowIndex = this._getVisibleEditRowIndex();
            if (!item) {
                return
            }
            if (rowIndex === oldRowIndex) {
                return true
            }
            if (void 0 === item.key) {
                this._dataController.fireError("E1043");
                return
            }
            if (!item.isNewRow) {
                params.key = item.key
            }
            if (this._isEditingStart(params)) {
                return
            }
            this.resetChanges();
            this.init();
            this._resetEditColumnName();
            this._pageIndex = dataController.pageIndex();
            this._addInternalData({
                key: item.key,
                oldData: item.data
            });
            this._setEditRowKey(item.key)
        },
        _editRowFromOptionChanged: function(rowIndex, oldRowIndex) {
            var rowIndices = [oldRowIndex, rowIndex];
            var editMode = _getEditMode(this);
            this._beforeUpdateItems(rowIndices, rowIndex, oldRowIndex);
            if (editMode === EDIT_MODE_POPUP) {
                this._showEditPopup(rowIndex)
            } else {
                this._needFocusEditor = true;
                this._dataController.updateItems({
                    changeType: "update",
                    rowIndices: rowIndices
                })
            }
        },
        _focusEditorIfNeed: function() {
            var _this9 = this;
            var editMode = _getEditMode(this);
            if (this._needFocusEditor) {
                if (MODES_WITH_DELAYED_FOCUS.indexOf(editMode) !== -1) {
                    var $editingCell = this.getFocusedCellInRow(this._getVisibleEditRowIndex());
                    this._delayedInputFocus($editingCell, function() {
                        $editingCell && _this9.component.focus($editingCell)
                    })
                } else {
                    if (CELL_BASED_MODES.indexOf(editMode) !== -1) {
                        var _this$_rowsView;
                        var editColumnIndex = this._getVisibleEditColumnIndex();
                        var $cell = null === (_this$_rowsView = this._rowsView) || void 0 === _this$_rowsView ? void 0 : _this$_rowsView._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex);
                        if ($cell && !$cell.find(":focus").length) {
                            this._focusEditingCell(function() {
                                _this9._editCellInProgress = false
                            }, $cell, true)
                        } else {
                            this._editCellInProgress = false
                        }
                    }
                }
                this._needFocusEditor = false
            }
        },
        _showEditPopup: function(rowIndex, repaintForm) {
            var that = this;
            var isMobileDevice = "desktop" !== _devices.default.current().deviceType;
            var popupOptions = (0, _extend.extend)({
                showTitle: false,
                fullScreen: isMobileDevice,
                toolbarItems: [{
                    toolbar: "bottom",
                    location: "after",
                    widget: "dxButton",
                    options: that._getSaveButtonConfig()
                }, {
                    toolbar: "bottom",
                    location: "after",
                    widget: "dxButton",
                    options: that._getCancelButtonConfig()
                }],
                contentTemplate: that._getPopupEditFormTemplate(rowIndex)
            }, that.option(EDITING_POPUP_OPTION_NAME));
            if (!that._editPopup) {
                var $popupContainer = (0, _renderer.default)("<div>").appendTo(that.component.$element()).addClass(that.addWidgetPrefix(EDIT_POPUP_CLASS));
                that._editPopup = that._createComponent($popupContainer, _popup.default, {});
                that._editPopup.on("hiding", that._getEditPopupHiddenHandler());
                that._editPopup.on("shown", function(e) {
                    _events_engine.default.trigger(e.component.$content().find(FOCUSABLE_ELEMENT_SELECTOR).not("." + SCROLLABLE_CONTAINER_CLASS).first(), "focus");
                    if (repaintForm) {
                        that._editForm && that._editForm.repaint()
                    }
                })
            }
            that._editPopup.option(popupOptions);
            that._editPopup.show()
        },
        _repaintEditPopup: function() {
            var rowIndex = this._getVisibleEditRowIndex();
            if (this._editPopup && this._editPopup.option("visible") && rowIndex >= 0) {
                var defaultAnimation = this._editPopup.option("animation");
                this._editPopup.option("animation", null);
                this._showEditPopup(rowIndex, true);
                this._editPopup.option("animation", defaultAnimation)
            }
        },
        _getEditPopupHiddenHandler: function() {
            var that = this;
            return function(e) {
                if (that.isEditing()) {
                    that.cancelEditData()
                }
            }
        },
        _getPopupEditFormTemplate: function(rowIndex) {
            var that = this;
            var row = that.component.getVisibleRows()[rowIndex];
            var templateOptions = {
                row: row,
                rowType: row.rowType,
                key: row.key
            };
            return function(container) {
                var formTemplate = that.getEditFormTemplate();
                var scrollable = that._createComponent((0, _renderer.default)("<div>").appendTo(container), _ui.default);
                that._$popupContent = scrollable.$content();
                formTemplate(that._$popupContent, templateOptions, true)
            }
        },
        _getSaveButtonConfig: function() {
            return {
                text: this.option("editing.texts.saveRowChanges"),
                onClick: this.saveEditData.bind(this)
            }
        },
        _getCancelButtonConfig: function() {
            return {
                text: this.option("editing.texts.cancelRowChanges"),
                onClick: this.cancelEditData.bind(this)
            }
        },
        _removeInternalData: function(key) {
            var internalData = this._getInternalData(key);
            var index = this._internalState.indexOf(internalData);
            if (index > -1) {
                this._internalState.splice(index, 1)
            }
        },
        _removeChange: function(index) {
            if (index >= 0) {
                var changes = _toConsumableArray(this.getChanges());
                var key = changes[index].key;
                this._removeInternalData(key);
                changes.splice(index, 1);
                this._silentOption(EDITING_CHANGES_OPTION_NAME, changes);
                if ((0, _common.equalByValue)(this.option(EDITING_EDITROWKEY_OPTION_NAME), key)) {
                    this._resetEditIndices()
                }
            }
        },
        executeOperation: function(deferred, func) {
            var _this10 = this;
            this._lastOperation && this._lastOperation.reject();
            this._lastOperation = deferred;
            this.waitForDeferredOperations().done(function() {
                if ("rejected" === deferred.state()) {
                    return
                }
                func();
                _this10._lastOperation = null
            }).fail(function() {
                deferred.reject();
                _this10._lastOperation = null
            })
        },
        waitForDeferredOperations: function() {
            return _deferred.when.apply(void 0, _toConsumableArray(this._deferreds))
        },
        editCell: function(rowIndex, columnIndex) {
            return this._editCell({
                rowIndex: rowIndex,
                columnIndex: columnIndex
            })
        },
        _editCell: function(options) {
            var _this11 = this;
            var d = new _deferred.Deferred;
            var coreResult;
            this.executeOperation(d, function() {
                coreResult = _this11._editCellCore(options);
                (0, _deferred.when)(coreResult).done(d.resolve).fail(d.reject)
            });
            return void 0 !== coreResult ? coreResult : d.promise()
        },
        _getNormalizedEditCellOptions: function(_ref) {
            var oldColumnIndex = _ref.oldColumnIndex,
                oldRowIndex = _ref.oldRowIndex,
                columnIndex = _ref.columnIndex,
                rowIndex = _ref.rowIndex;
            var columnsController = this._columnsController;
            var visibleColumns = columnsController.getVisibleColumns();
            var items = this._dataController.items();
            var item = items[rowIndex];
            var oldColumn;
            if ((0, _type.isDefined)(oldColumnIndex)) {
                oldColumn = visibleColumns[oldColumnIndex]
            } else {
                oldColumn = this._getEditColumn()
            }
            if (!(0, _type.isDefined)(oldRowIndex)) {
                oldRowIndex = this._getVisibleEditRowIndex()
            }
            if ((0, _type.isString)(columnIndex)) {
                columnIndex = columnsController.columnOption(columnIndex, "index");
                columnIndex = columnsController.getVisibleIndex(columnIndex)
            }
            var column = visibleColumns[columnIndex];
            return {
                oldColumn: oldColumn,
                columnIndex: columnIndex,
                oldRowIndex: oldRowIndex,
                rowIndex: rowIndex,
                column: column,
                item: item
            }
        },
        _editCellCore: function(options) {
            var _this12 = this;
            var dataController = this._dataController;
            var isEditByOptionChanged = (0, _type.isDefined)(options.oldColumnIndex) || (0, _type.isDefined)(options.oldRowIndex);
            var _this$_getNormalizedE = this._getNormalizedEditCellOptions(options),
                columnIndex = _this$_getNormalizedE.columnIndex,
                rowIndex = _this$_getNormalizedE.rowIndex,
                column = _this$_getNormalizedE.column,
                item = _this$_getNormalizedE.item;
            var params = {
                data: null === item || void 0 === item ? void 0 : item.data,
                cancel: false,
                column: column
            };
            if (void 0 === item.key) {
                this._dataController.fireError("E1043");
                return
            }
            if (column && item && ("data" === item.rowType || "detailAdaptive" === item.rowType) && !item.removed && !_isRowEditMode(this)) {
                if (!isEditByOptionChanged && this.isEditCell(rowIndex, columnIndex)) {
                    return true
                }
                var editRowIndex = rowIndex + dataController.getRowIndexOffset();
                return (0, _deferred.when)(this._beforeEditCell(rowIndex, columnIndex, item)).done(function(cancel) {
                    if (cancel) {
                        return
                    }
                    if (!_this12._prepareEditCell(params, item, columnIndex, editRowIndex)) {
                        _this12._processCanceledEditingCell()
                    }
                })
            }
            return false
        },
        _processCanceledEditingCell: function() {},
        _prepareEditCell: function(params, item, editColumnIndex, editRowIndex) {
            if (!item.isNewRow) {
                params.key = item.key
            }
            if (this._isEditingStart(params)) {
                return false
            }
            this._pageIndex = this._dataController.pageIndex();
            this._setEditRowKey(item.key);
            this._setEditColumnNameByIndex(editColumnIndex);
            if (!params.column.showEditorAlways) {
                this._addInternalData({
                    key: item.key,
                    oldData: item.data
                })
            }
            return true
        },
        _repaintEditCell: function(column, oldColumn, oldEditRowIndex) {
            this._needFocusEditor = true;
            if (!column || !column.showEditorAlways || oldColumn && !oldColumn.showEditorAlways) {
                this._editCellInProgress = true;
                this.getController("editorFactory").loseFocus();
                this._dataController.updateItems({
                    changeType: "update",
                    rowIndices: [oldEditRowIndex, this._getVisibleEditRowIndex()]
                })
            } else {
                if (column !== oldColumn) {
                    this._dataController.updateItems({
                        changeType: "update",
                        rowIndices: []
                    })
                }
            }
        },
        _delayedInputFocus: function($cell, beforeFocusCallback, callBeforeFocusCallbackAlways) {
            var that = this;

            function inputFocus() {
                if (beforeFocusCallback) {
                    beforeFocusCallback()
                }
                if ($cell) {
                    var $focusableElement = $cell.find(FOCUSABLE_ELEMENT_SELECTOR).first();
                    _uiGrid_core2.default.focusAndSelectElement(that, $focusableElement)
                }
                that._beforeFocusCallback = null
            }
            if (_devices.default.real().ios || _devices.default.real().android) {
                inputFocus()
            } else {
                if (that._beforeFocusCallback) {
                    that._beforeFocusCallback()
                }
                clearTimeout(that._inputFocusTimeoutID);
                if (callBeforeFocusCallbackAlways) {
                    that._beforeFocusCallback = beforeFocusCallback
                }
                that._inputFocusTimeoutID = setTimeout(inputFocus)
            }
        },
        _focusEditingCell: function(beforeFocusCallback, $editCell, callBeforeFocusCallbackAlways) {
            var that = this;
            var rowsView = that.getView("rowsView");
            var editColumnIndex = this._getVisibleEditColumnIndex();
            $editCell = $editCell || rowsView && rowsView._getCellElement(that._getVisibleEditRowIndex(), editColumnIndex);
            that._delayedInputFocus($editCell, beforeFocusCallback, callBeforeFocusCallbackAlways)
        },
        deleteRow: function(rowIndex) {
            var _this13 = this;
            if ("cell" === this.option("editing.mode") && this.isEditing()) {
                var isNewRow = this._dataController.items()[rowIndex].isNewRow;
                var rowKey = this._dataController.getKeyByRowIndex(rowIndex);
                this.closeEditCell(null, isNewRow).always(function() {
                    rowIndex = _this13._dataController.getRowIndexByKey(rowKey);
                    _this13._checkAndDeleteRow(rowIndex)
                })
            } else {
                this._checkAndDeleteRow(rowIndex)
            }
        },
        _checkAndDeleteRow: function(rowIndex) {
            var that = this;
            var editingOptions = that.option("editing");
            var editingTexts = editingOptions && editingOptions.texts;
            var isBatchMode = editingOptions && editingOptions.mode === EDIT_MODE_BATCH;
            var confirmDelete = editingOptions && editingOptions.confirmDelete;
            var confirmDeleteMessage = editingTexts && editingTexts.confirmDeleteMessage;
            var item = that._dataController.items()[rowIndex];
            var allowDeleting = isBatchMode || !that.isEditing() || item.isNewRow;
            if (item && allowDeleting) {
                if (isBatchMode || !confirmDelete || !confirmDeleteMessage) {
                    that._deleteRowCore(rowIndex)
                } else {
                    var confirmDeleteTitle = editingTexts && editingTexts.confirmDeleteTitle;
                    var showDialogTitle = (0, _type.isDefined)(confirmDeleteTitle) && confirmDeleteTitle.length > 0;
                    (0, _dialog.confirm)(confirmDeleteMessage, confirmDeleteTitle, showDialogTitle).done(function(confirmResult) {
                        if (confirmResult) {
                            that._deleteRowCore(rowIndex)
                        }
                    })
                }
            }
        },
        _deleteRowCore: function(rowIndex) {
            var dataController = this._dataController;
            var item = dataController.items()[rowIndex];
            var key = item && item.key;
            var oldEditRowIndex = this._getVisibleEditRowIndex();
            var isBatchMode = this.option("editing.mode") === EDIT_MODE_BATCH;
            this.refresh();
            var changes = this.getChanges();
            var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);
            if (editIndex >= 0) {
                if (changes[editIndex].type === DATA_EDIT_DATA_INSERT_TYPE) {
                    this._removeChange(editIndex)
                } else {
                    this._addChange({
                        key: key,
                        type: DATA_EDIT_DATA_REMOVE_TYPE
                    })
                }
            } else {
                this._addChange({
                    key: key,
                    oldData: item.data,
                    type: DATA_EDIT_DATA_REMOVE_TYPE
                })
            }
            if (isBatchMode) {
                dataController.updateItems({
                    changeType: "update",
                    rowIndices: [oldEditRowIndex, rowIndex]
                })
            } else {
                this.saveEditData()
            }
        },
        undeleteRow: function(rowIndex) {
            var that = this;
            var dataController = that._dataController;
            var item = dataController.items()[rowIndex];
            var oldEditRowIndex = that._getVisibleEditRowIndex();
            var key = item && item.key;
            var changes = this.getChanges();
            if (item) {
                var editIndex = _uiGrid_core2.default.getIndexByKey(key, changes);
                if (editIndex >= 0) {
                    var data = changes[editIndex].data;
                    if ((0, _type.isEmptyObject)(data)) {
                        that._removeChange(editIndex)
                    } else {
                        that._addChange({
                            key: key,
                            type: DATA_EDIT_DATA_UPDATE_TYPE
                        })
                    }
                    dataController.updateItems({
                        changeType: "update",
                        rowIndices: [oldEditRowIndex, rowIndex]
                    })
                }
            }
        },
        _fireOnSaving: function() {
            var _this14 = this;
            var onSavingParams = {
                cancel: false,
                promise: null,
                changes: _toConsumableArray(this.getChanges())
            };
            this.executeAction("onSaving", onSavingParams);
            var d = new _deferred.Deferred;
            (0, _deferred.when)((0, _deferred.fromPromise)(onSavingParams.promise)).done(function() {
                d.resolve(onSavingParams)
            }).fail(function(arg) {
                createFailureHandler(d);
                _this14._fireDataErrorOccurred(arg);
                d.resolve({
                    cancel: true
                })
            });
            return d
        },
        _executeEditingAction: function(actionName, params, func) {
            if (this.component._disposed) {
                return null
            }
            var deferred = new _deferred.Deferred;
            this.executeAction(actionName, params);
            (0, _deferred.when)((0, _deferred.fromPromise)(params.cancel)).done(function(cancel) {
                if (cancel) {
                    setTimeout(function() {
                        deferred.resolve("cancel")
                    })
                } else {
                    func(params).done(deferred.resolve).fail(createFailureHandler(deferred))
                }
            }).fail(createFailureHandler(deferred));
            return deferred
        },
        _processChanges: function(deferreds, results, dataChanges, changes) {
            var _this15 = this;
            var store = this._dataController.store();
            (0, _iterator.each)(changes, function(index, change) {
                var oldData = _this15._getOldData(change.key);
                var data = change.data,
                    type = change.type;
                var changeCopy = _objectSpread({}, change);
                var deferred;
                var params;
                if (_this15._beforeSaveEditData(change, index)) {
                    return
                }
                switch (type) {
                    case DATA_EDIT_DATA_REMOVE_TYPE:
                        params = {
                            data: oldData,
                            key: change.key,
                            cancel: false
                        };
                        deferred = _this15._executeEditingAction("onRowRemoving", params, function() {
                            return store.remove(change.key).done(function(key) {
                                dataChanges.push({
                                    type: "remove",
                                    key: key
                                })
                            })
                        });
                        break;
                    case DATA_EDIT_DATA_INSERT_TYPE:
                        params = {
                            data: data,
                            cancel: false
                        };
                        deferred = _this15._executeEditingAction("onRowInserting", params, function() {
                            return store.insert(params.data).done(function(data, key) {
                                if ((0, _type.isDefined)(key)) {
                                    changeCopy.key = key
                                }
                                if (data && (0, _type.isObject)(data) && data !== params.data) {
                                    changeCopy.data = data
                                }
                                dataChanges.push({
                                    type: "insert",
                                    data: data,
                                    index: 0
                                })
                            })
                        });
                        break;
                    case DATA_EDIT_DATA_UPDATE_TYPE:
                        params = {
                            newData: data,
                            oldData: oldData,
                            key: change.key,
                            cancel: false
                        };
                        deferred = _this15._executeEditingAction("onRowUpdating", params, function() {
                            return store.update(change.key, params.newData).done(function(data, key) {
                                if (data && (0, _type.isObject)(data) && data !== params.newData) {
                                    changeCopy.data = data
                                }
                                dataChanges.push({
                                    type: "update",
                                    key: key,
                                    data: data
                                })
                            })
                        })
                }
                changes[index] = changeCopy;
                if (deferred) {
                    var doneDeferred = new _deferred.Deferred;
                    deferred.always(function(data) {
                        results.push({
                            key: change.key,
                            result: data
                        })
                    }).always(doneDeferred.resolve);
                    deferreds.push(doneDeferred.promise())
                }
            })
        },
        _processSaveEditDataResult: function(results) {
            var that = this;
            var hasSavedData = false;
            var editMode = _getEditMode(that);
            var changes = _toConsumableArray(this.getChanges());
            var changesLength = changes.length;
            for (var i = 0; i < results.length; i++) {
                var arg = results[i].result;
                var cancel = "cancel" === arg;
                var editIndex = _uiGrid_core2.default.getIndexByKey(results[i].key, changes);
                var change = changes[editIndex];
                var isError = arg && arg instanceof Error;
                if (isError) {
                    if (change) {
                        this._addInternalData({
                            key: change.key,
                            error: arg
                        })
                    }
                    that._fireDataErrorOccurred(arg);
                    if (editMode !== EDIT_MODE_BATCH) {
                        if ((null === change || void 0 === change ? void 0 : change.type) === DATA_EDIT_DATA_REMOVE_TYPE) {
                            if (editIndex >= 0) {
                                changes.splice(editIndex, 1)
                            }
                        }
                        break
                    }
                } else {
                    if (!cancel || !change || editMode !== EDIT_MODE_BATCH && change.type === DATA_EDIT_DATA_REMOVE_TYPE) {
                        if (editIndex >= 0) {
                            changes.splice(editIndex, 1)
                        }
                        hasSavedData = !cancel
                    }
                }
            }
            if (changes.length < changesLength) {
                this._silentOption(EDITING_CHANGES_OPTION_NAME, changes)
            }
            return hasSavedData
        },
        _fireSaveEditDataEvents: function(changes) {
            var that = this;
            (0, _iterator.each)(changes, function(_, _ref2) {
                var data = _ref2.data,
                    key = _ref2.key,
                    type = _ref2.type;
                var internalData = that._addInternalData({
                    key: key
                });
                var params = {
                    key: key,
                    data: data
                };
                if (internalData.error) {
                    params.error = internalData.error
                }
                switch (type) {
                    case DATA_EDIT_DATA_REMOVE_TYPE:
                        that.executeAction("onRowRemoved", (0, _extend.extend)({}, params, {
                            data: internalData.oldData
                        }));
                        break;
                    case DATA_EDIT_DATA_INSERT_TYPE:
                        that.executeAction("onRowInserted", params);
                        break;
                    case DATA_EDIT_DATA_UPDATE_TYPE:
                        that.executeAction("onRowUpdated", params)
                }
            });
            this.executeAction("onSaved", {
                changes: changes
            })
        },
        saveEditData: function() {
            var _this16 = this;
            var deferred = new _deferred.Deferred;
            this.waitForDeferredOperations().done(function() {
                if (_this16.isSaving()) {
                    _this16._resolveAfterSave(deferred);
                    return
                }(0, _deferred.when)(_this16._beforeSaveEditData()).done(function(cancel) {
                    if (cancel) {
                        _this16._resolveAfterSave(deferred, {
                            cancel: cancel
                        });
                        return
                    }
                    _this16._saving = true;
                    _this16._saveEditDataInner().always(function() {
                        _this16._saving = false
                    }).done(deferred.resolve).fail(deferred.reject)
                }).fail(deferred.reject)
            }).fail(deferred.reject);
            return deferred.promise()
        },
        _resolveAfterSave: function(deferred) {
            var _ref3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                cancel = _ref3.cancel,
                error = _ref3.error;
            (0, _deferred.when)(this._afterSaveEditData(cancel)).done(function() {
                deferred.resolve(error)
            }).fail(deferred.reject)
        },
        _saveEditDataInner: function() {
            var _this17 = this;
            var results = [];
            var deferreds = [];
            var dataChanges = [];
            var dataController = this._dataController;
            var dataSource = dataController.dataSource();
            var result = new _deferred.Deferred;
            (0, _deferred.when)(this._fireOnSaving()).done(function(_ref4) {
                var cancel = _ref4.cancel,
                    changes = _ref4.changes;
                if (cancel) {
                    return result.resolve().promise()
                }
                _this17._processChanges(deferreds, results, dataChanges, changes);
                if (deferreds.length) {
                    null === dataSource || void 0 === dataSource ? void 0 : dataSource.beginLoading();
                    _deferred.when.apply(void 0, deferreds).done(function() {
                        if (_this17._processSaveEditDataResult(results)) {
                            _this17._endSaving(dataChanges, changes, result)
                        } else {
                            null === dataSource || void 0 === dataSource ? void 0 : dataSource.endLoading();
                            result.resolve()
                        }
                    }).fail(function(error) {
                        null === dataSource || void 0 === dataSource ? void 0 : dataSource.endLoading();
                        result.resolve(error)
                    });
                    return result.always(function() {
                        _this17._focusEditingCell()
                    }).promise()
                }
                _this17._cancelSaving(result)
            }).fail(result.reject);
            return result.promise()
        },
        _resetModifiedClassCells: function(changes) {
            var _this18 = this;
            var editMode = _getEditMode(this);
            if (editMode === EDIT_MODE_BATCH) {
                var columnsCount = this._columnsController.getVisibleColumns().length;
                changes.forEach(function(_ref5) {
                    var key = _ref5.key;
                    var rowIndex = _this18._dataController.getRowIndexByKey(key);
                    if (rowIndex !== -1) {
                        for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                            _this18._rowsView._getCellElement(rowIndex, columnIndex).removeClass(CELL_MODIFIED)
                        }
                    }
                })
            }
        },
        _endSaving: function(dataChanges, changes, deferred) {
            var _changes$;
            var editMode = _getEditMode(this);
            var dataSource = this._dataController.dataSource();
            if (editMode !== EDIT_MODE_CELL) {
                this._resetModifiedClassCells(changes);
                this._resetEditIndices()
            } else {
                if ("update" !== (null === (_changes$ = changes[0]) || void 0 === _changes$ ? void 0 : _changes$.type)) {
                    this._resetEditIndices()
                }
            }
            if (editMode === EDIT_MODE_POPUP && this._editPopup) {
                this._editPopup.hide()
            }
            null === dataSource || void 0 === dataSource ? void 0 : dataSource.endLoading();
            this._refreshDataAfterSave(dataChanges, changes, deferred)
        },
        _cancelSaving: function(result) {
            var editMode = _getEditMode(this);
            var dataController = this._dataController;
            if (_isRowEditMode(this)) {
                if (!this.hasChanges()) {
                    this._cancelEditDataCore()
                }
            } else {
                if (this.isCellOrBatchEditMode()) {
                    if (editMode !== EDIT_MODE_CELL) {
                        this._resetEditIndices()
                    }
                    dataController.updateItems()
                } else {
                    this._focusEditingCell()
                }
            }
            this.executeAction("onSaved", {
                changes: []
            });
            this._resolveAfterSave(result)
        },
        _refreshDataAfterSave: function(dataChanges, changes, deferred) {
            var _this19 = this;
            var dataController = this._dataController;
            var refreshMode = this.option("editing.refreshMode");
            var isFullRefresh = "reshape" !== refreshMode && "repaint" !== refreshMode;
            if (!isFullRefresh) {
                dataController.push(dataChanges)
            }(0, _deferred.when)(dataController.refresh({
                selection: isFullRefresh,
                reload: isFullRefresh,
                load: "reshape" === refreshMode,
                changesOnly: this.option("repaintChangesOnly")
            })).always(function() {
                _this19._fireSaveEditDataEvents(changes)
            }).done(function() {
                _this19._resolveAfterSave(deferred)
            }).fail(function(error) {
                _this19._resolveAfterSave(deferred, {
                    error: error
                })
            })
        },
        isSaving: function() {
            return this._saving
        },
        _updateEditColumn: function() {
            var that = this;
            var isEditColumnVisible = that._isEditColumnVisible();
            var useIcons = that.option("editing.useIcons");
            var cssClass = COMMAND_EDIT_CLASS + (useIcons ? " " + COMMAND_EDIT_WITH_ICONS_CLASS : "");
            that._columnsController.addCommandColumn({
                type: "buttons",
                command: "edit",
                visible: isEditColumnVisible,
                cssClass: cssClass,
                width: "auto",
                alignment: "center",
                cellTemplate: that._getEditCommandCellTemplate(),
                fixedPosition: "right"
            });
            that._columnsController.columnOption("command:edit", {
                visible: isEditColumnVisible,
                cssClass: cssClass
            })
        },
        _isEditColumnVisible: function() {
            var that = this;
            var editingOptions = that.option("editing");
            if (editingOptions) {
                var editMode = _getEditMode(that);
                var isVisibleWithCurrentEditMode = false;
                switch (editMode) {
                    case EDIT_MODE_ROW:
                        isVisibleWithCurrentEditMode = editingOptions.allowUpdating || editingOptions.allowAdding;
                        break;
                    case EDIT_MODE_FORM:
                    case EDIT_MODE_POPUP:
                        isVisibleWithCurrentEditMode = editingOptions.allowUpdating
                }
                return editingOptions.allowDeleting || isVisibleWithCurrentEditMode
            }
        },
        _updateEditButtons: function() {
            var that = this;
            var headerPanel = that.getView("headerPanel");
            var hasChanges = that.hasChanges();
            if (headerPanel) {
                headerPanel.setToolbarItemDisabled("saveButton", !hasChanges);
                headerPanel.setToolbarItemDisabled("revertButton", !hasChanges)
            }
        },
        _applyModified: function($element) {
            $element && $element.addClass(CELL_MODIFIED)
        },
        _beforeCloseEditCellInBatchMode: function() {},
        cancelEditData: function() {
            var changes = this.getChanges();
            var params = {
                cancel: false,
                changes: changes
            };
            this.executeAction("onEditCanceling", params);
            if (!params.cancel) {
                this._cancelEditDataCore();
                this.executeAction("onEditCanceled", {
                    changes: changes
                })
            }
        },
        _cancelEditDataCore: function() {
            var editMode = _getEditMode(this);
            var rowIndex = this._getVisibleEditRowIndex();
            var dataController = this._dataController;
            this._beforeCancelEditData();
            this.init();
            this.resetChanges();
            this._resetEditColumnName();
            this._resetEditRowKey();
            if (ROW_BASED_MODES.indexOf(editMode) !== -1 && rowIndex >= 0) {
                dataController.updateItems({
                    changeType: "update",
                    rowIndices: [rowIndex, rowIndex + 1]
                })
            } else {
                dataController.updateItems({
                    repaintChangesOnly: this.option("repaintChangesOnly")
                })
            }
            if (editMode === EDIT_MODE_POPUP) {
                this._hideEditPopup()
            }
        },
        _hideEditPopup: function() {
            this._editPopup && this._editPopup.option("visible", false)
        },
        hasEditData: function() {
            return this.hasChanges()
        },
        closeEditCell: function(isError, withoutSaveEditData) {
            var _this20 = this;
            var that = this;
            var result = (0, _deferred.when)();
            var oldEditRowIndex = that._getVisibleEditRowIndex();
            if (!_isRowEditMode(that)) {
                var deferred = new _deferred.Deferred;
                result = new _deferred.Deferred;
                this.executeOperation(deferred, function() {
                    _this20._closeEditCellCore(isError, oldEditRowIndex, withoutSaveEditData).always(result.resolve)
                })
            }
            return result.promise()
        },
        _closeEditCellCore: function(isError, oldEditRowIndex, withoutSaveEditData) {
            var _this21 = this;
            var editMode = _getEditMode(this);
            var dataController = this._dataController;
            var deferred = new _deferred.Deferred;
            var promise = deferred.promise();
            if (editMode === EDIT_MODE_CELL && this.hasChanges()) {
                if (!withoutSaveEditData) {
                    this.saveEditData().done(function(error) {
                        if (!_this21.hasChanges()) {
                            _this21.closeEditCell(!!error).always(deferred.resolve);
                            return
                        }
                        deferred.resolve()
                    });
                    return promise
                }
            } else {
                if (oldEditRowIndex >= 0) {
                    var rowIndices = [oldEditRowIndex];
                    this._resetEditRowKey();
                    this._resetEditColumnName();
                    this._beforeCloseEditCellInBatchMode(rowIndices);
                    if (!isError) {
                        dataController.updateItems({
                            changeType: "update",
                            rowIndices: rowIndices
                        })
                    }
                }
            }
            deferred.resolve();
            return promise
        },
        update: function(changeType) {
            var that = this;
            var dataController = that._dataController;
            if (dataController && that._pageIndex !== dataController.pageIndex()) {
                if ("refresh" === changeType) {
                    that.refresh(true)
                }
                that._pageIndex = dataController.pageIndex()
            }
            that._updateEditButtons()
        },
        _getRowIndicesForCascadeUpdating: function(row, skipCurrentRow) {
            return skipCurrentRow ? [] : [row.rowIndex]
        },
        addDeferred: function(deferred) {
            var _this22 = this;
            if (this._deferreds.indexOf(deferred) < 0) {
                this._deferreds.push(deferred);
                deferred.always(function() {
                    var index = _this22._deferreds.indexOf(deferred);
                    if (index >= 0) {
                        _this22._deferreds.splice(index, 1)
                    }
                })
            }
        },
        _prepareChange: function(options, value, text) {
            var _options$row;
            var that = this;
            var newData = {};
            var oldData = null === (_options$row = options.row) || void 0 === _options$row ? void 0 : _options$row.data;
            var rowKey = options.key;
            var $cellElement = (0, _renderer.default)(options.cellElement);
            var editMode = _getEditMode(that);
            var deferred = new _deferred.Deferred;
            if (void 0 !== rowKey) {
                if (editMode === EDIT_MODE_BATCH) {
                    that._applyModified($cellElement, options)
                }
                options.value = value;
                var setCellValueResult = (0, _deferred.fromPromise)(options.column.setCellValue(newData, value, (0, _extend.extend)(true, {}, oldData), text));
                setCellValueResult.done(function() {
                    deferred.resolve({
                        data: newData,
                        key: rowKey,
                        oldData: oldData,
                        type: DATA_EDIT_DATA_UPDATE_TYPE
                    })
                }).fail(createFailureHandler(deferred)).fail(function(arg) {
                    return that._fireDataErrorOccurred(arg)
                });
                if ((0, _type.isDefined)(text) && options.column.displayValueMap) {
                    options.column.displayValueMap[value] = text
                }
                that._updateRowValues(options);
                that.addDeferred(deferred)
            }
            return deferred
        },
        _updateRowValues: function(options) {
            if (options.values) {
                var dataController = this._dataController;
                var rowIndex = dataController.getRowIndexByKey(options.key);
                var row = dataController.getVisibleRows()[rowIndex];
                if (row) {
                    options.values = row.values
                }
                options.values[options.columnIndex] = options.value
            }
        },
        updateFieldValue: function(options, value, text, forceUpdateRow) {
            var _this23 = this;
            var rowKey = options.key;
            var deferred = new _deferred.Deferred;
            if (void 0 === rowKey) {
                this._dataController.fireError("E1043")
            }
            if (options.column.setCellValue) {
                this._prepareChange(options, value, text).done(function(params) {
                    (0, _deferred.when)(_this23._applyChange(options, params, forceUpdateRow)).always(function() {
                        deferred.resolve()
                    })
                })
            } else {
                deferred.resolve()
            }
            return deferred.promise()
        },
        _focusPreviousEditingCellIfNeed: function(options) {
            var that = this;
            if (that.hasEditData() && !that.isEditCell(options.rowIndex, options.columnIndex)) {
                that._focusEditingCell();
                that._updateEditRow(options.row, true);
                return true
            }
        },
        _needUpdateRow: function(column) {
            var visibleColumns = this._columnsController.getVisibleColumns();
            if (!column) {
                column = this._getEditColumn()
            }
            var isCustomSetCellValue = column && column.setCellValue !== column.defaultSetCellValue;
            var isCustomCalculateCellValue = visibleColumns.some(function(visibleColumn) {
                return visibleColumn.calculateCellValue !== visibleColumn.defaultCalculateCellValue
            });
            return isCustomSetCellValue || isCustomCalculateCellValue
        },
        _applyChange: function(options, params, forceUpdateRow) {
            var that = this;
            var editMode = _getEditMode(that);
            var isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
            var showEditorAlways = options.column.showEditorAlways;
            var isUpdateInCellMode = editMode === EDIT_MODE_CELL && options.row && !options.row.isNewRow;
            var focusPreviousEditingCell = showEditorAlways && !forceUpdateRow && isUpdateInCellMode && that.hasEditData() && !that.isEditCell(options.rowIndex, options.columnIndex);
            if (focusPreviousEditingCell) {
                that._focusEditingCell();
                that._updateEditRow(options.row, true, isCustomSetCellValue);
                return
            }
            that._addChange(params, options.row);
            that._updateEditButtons();
            if (showEditorAlways && !forceUpdateRow) {
                if (isUpdateInCellMode) {
                    that._setEditRowKey(options.row.key, true);
                    that._setEditColumnNameByIndex(options.columnIndex, true);
                    return that.saveEditData()
                } else {
                    if (editMode === EDIT_MODE_BATCH) {
                        forceUpdateRow = that._needUpdateRow(options.column)
                    }
                }
            }
            var row = options.row;
            if (row) {
                if (forceUpdateRow || isCustomSetCellValue) {
                    that._updateEditRow(row, forceUpdateRow, isCustomSetCellValue)
                } else {
                    if (row.update) {
                        row.update()
                    }
                }
            }
        },
        _updateEditRowCore: function(row, skipCurrentRow, isCustomSetCellValue) {
            var that = this;
            var editForm = that._editForm;
            var editMode = _getEditMode(that);
            if (editMode === EDIT_MODE_POPUP) {
                if (that.option("repaintChangesOnly")) {
                    row.update && row.update(row)
                } else {
                    if (editForm) {
                        that._updateEditFormDeferred = (new _deferred.Deferred).done(function() {
                            return editForm.repaint()
                        });
                        if (!that._updateLockCount) {
                            that._updateEditFormDeferred.resolve()
                        }
                    }
                }
            } else {
                that._dataController.updateItems({
                    changeType: "update",
                    rowIndices: that._getRowIndicesForCascadeUpdating(row, skipCurrentRow)
                })
            }
        },
        _endUpdateCore: function() {
            this._updateEditFormDeferred && this._updateEditFormDeferred.resolve()
        },
        _updateEditRow: function(row, forceUpdateRow, isCustomSetCellValue) {
            var that = this;
            if (forceUpdateRow || !_isRowEditMode(that)) {
                that._updateEditRowCore(row, !forceUpdateRow, isCustomSetCellValue);
                if (!forceUpdateRow) {
                    that._focusEditingCell()
                }
            } else {
                var deferred = new _deferred.Deferred;
                that.addDeferred(deferred);
                setTimeout(function() {
                    var $focusedElement = (0, _renderer.default)(_dom_adapter.default.getActiveElement());
                    var columnIndex = that._rowsView.getCellIndex($focusedElement, row.rowIndex);
                    var focusedElement = $focusedElement.get(0);
                    var selectionRange = _uiGrid_core2.default.getSelectionRange(focusedElement);
                    that._updateEditRowCore(row, false, isCustomSetCellValue);
                    if (columnIndex >= 0) {
                        var $focusedItem = that._rowsView._getCellElement(row.rowIndex, columnIndex);
                        that._delayedInputFocus($focusedItem, function() {
                            setTimeout(function() {
                                focusedElement = _dom_adapter.default.getActiveElement();
                                if (selectionRange.selectionStart >= 0) {
                                    _uiGrid_core2.default.setSelectionRange(focusedElement, selectionRange)
                                }
                            })
                        })
                    }
                    deferred.resolve()
                })
            }
        },
        _addChange: function(options, row) {
            var changes = _toConsumableArray(this.getChanges());
            var index = _uiGrid_core2.default.getIndexByKey(options.key, changes);
            if (index < 0) {
                index = changes.length;
                this._addInternalData({
                    key: options.key,
                    oldData: options.oldData
                });
                delete options.oldData;
                changes.push(options)
            }
            var change = _objectSpread({}, changes[index]);
            if (change) {
                if (options.data) {
                    change.data = (0, _array_utils.createObjectWithChanges)(change.data, options.data)
                }
                if ((!change.type || !options.data) && options.type) {
                    change.type = options.type;
                }
                if (row) {
                    row.oldData = this._getOldData(row.key);
                    row.data = (0, _array_utils.createObjectWithChanges)(row.data, options.data)
                }
            }
            changes[index] = change;
            this._silentOption(EDITING_CHANGES_OPTION_NAME, changes);
            return index
        },
        _getFormEditItemTemplate: function(cellOptions, column) {
            return column.editCellTemplate || getDefaultEditorTemplate(this)
        },
        renderFormEditTemplate: function(detailCellOptions, item, form, container, isReadOnly) {
            var that = this;
            var $container = (0, _renderer.default)(container);
            var column = item.column;
            var editorType = getEditorType(item);
            var rowData = null === detailCellOptions || void 0 === detailCellOptions ? void 0 : detailCellOptions.row.data;
            var cellOptions = (0, _extend.extend)({}, detailCellOptions, {
                data: rowData,
                cellElement: null,
                isOnForm: true,
                item: item,
                column: (0, _extend.extend)({}, column, {
                    editorType: editorType,
                    editorOptions: item.editorOptions
                }),
                id: form.getItemID(item.name || item.dataField),
                columnIndex: column.index,
                setValue: !isReadOnly && column.allowEditing && function(value) {
                    that.updateFieldValue(cellOptions, value)
                }
            });
            cellOptions.value = column.calculateCellValue(rowData);
            var template = that._getFormEditItemTemplate.bind(that)(cellOptions, column);
            that._rowsView.renderTemplate($container, template, cellOptions, !!$container.closest((0, _window.getWindow)().document).length).done(function() {
                that._rowsView._updateCell($container, cellOptions)
            });
            return cellOptions
        },
        getFormEditorTemplate: function(cellOptions, item) {
            var that = this;
            var column = this.component.columnOption(item.dataField);
            return function(options, container) {
                var $container = (0, _renderer.default)(container);
                cellOptions.row.watch && cellOptions.row.watch(function() {
                    return column.selector(cellOptions.row.data)
                }, function() {
                    var _validator;
                    var $editorElement = $container.find(".dx-widget").first();
                    var validator = $editorElement.data("dxValidator");
                    var validatorOptions = null === (_validator = validator) || void 0 === _validator ? void 0 : _validator.option();
                    $container.contents().remove();
                    cellOptions = that.renderFormEditTemplate.bind(that)(cellOptions, item, options.component, $container);
                    $editorElement = $container.find(".dx-widget").first();
                    validator = $editorElement.data("dxValidator");
                    if (validatorOptions && !validator) {
                        $editorElement.dxValidator({
                            validationRules: validatorOptions.validationRules,
                            validationGroup: validatorOptions.validationGroup,
                            dataGetter: validatorOptions.dataGetter
                        })
                    }
                });
                cellOptions = that.renderFormEditTemplate.bind(that)(cellOptions, item, options.component, $container)
            }
        },
        getEditFormOptions: function(detailOptions) {
            var userCustomizeItem = this.option("editing.form.customizeItem");
            var editFormItemClass = this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS);
            var items = this.option("editing.form.items");
            var isCustomEditorType = {};
            var that = this;
            if (!items) {
                var columns = this.getController("columns").getColumns();
                items = [];
                (0, _iterator.each)(columns, function(_, column) {
                    if (!column.isBand && !column.type) {
                        items.push({
                            column: column,
                            name: column.name,
                            dataField: column.dataField
                        })
                    }
                })
            } else {
                forEachFormItems(items, function(item) {
                    var itemId = (null === item || void 0 === item ? void 0 : item.name) || (null === item || void 0 === item ? void 0 : item.dataField);
                    if (itemId) {
                        isCustomEditorType[itemId] = !!item.editorType
                    }
                })
            }
            return {
                items: items,
                formID: "dx-" + new _guid.default,
                customizeItem: function(item) {
                    var column;
                    var itemId = item.name || item.dataField;
                    if (item.column || itemId) {
                        column = item.column || that._columnsController.columnOption(item.name ? "name:" + item.name : "dataField:" + item.dataField)
                    }
                    if (column) {
                        item.label = item.label || {};
                        item.label.text = item.label.text || column.caption;
                        item.template = item.template || that.getFormEditorTemplate(detailOptions, item);
                        item.column = column;
                        item.isCustomEditorType = isCustomEditorType[itemId];
                        if (column.formItem) {
                            (0, _extend.extend)(item, column.formItem)
                        }
                        if (void 0 === item.isRequired && column.validationRules) {
                            item.isRequired = column.validationRules.some(function(rule) {
                                return "required" === rule.type
                            });
                            item.validationRules = []
                        }
                        var itemVisible = (0, _type.isDefined)(item.visible) ? item.visible : true;
                        if (!that._firstFormItem && itemVisible) {
                            that._firstFormItem = item
                        }
                    }
                    userCustomizeItem && userCustomizeItem.call(this, item);
                    item.cssClass = (0, _type.isString)(item.cssClass) ? item.cssClass + " " + editFormItemClass : editFormItemClass
                }
            }
        },
        getEditFormTemplate: function() {
            var that = this;
            return function($container, detailOptions, renderFormOnly) {
                var editFormOptions = that.option("editing.form");
                var baseEditFormOptions = that.getEditFormOptions(detailOptions);
                that._firstFormItem = void 0;
                that._editForm = that._createComponent((0, _renderer.default)("<div>").appendTo($container), _form.default, (0, _extend.extend)({}, editFormOptions, baseEditFormOptions));
                if (!renderFormOnly) {
                    var $buttonsContainer = (0, _renderer.default)("<div>").addClass(that.addWidgetPrefix(FORM_BUTTONS_CONTAINER_CLASS)).appendTo($container);
                    that._createComponent((0, _renderer.default)("<div>").appendTo($buttonsContainer), _button.default, that._getSaveButtonConfig());
                    that._createComponent((0, _renderer.default)("<div>").appendTo($buttonsContainer), _button.default, that._getCancelButtonConfig())
                }
                that._editForm.on("contentReady", function() {
                    that._editPopup && that._editPopup.repaint()
                })
            }
        },
        getColumnTemplate: function(options) {
            var that = this;
            var column = options.column;
            var rowIndex = options.row && options.row.rowIndex;
            var template;
            var isRowMode = _isRowEditMode(that);
            var isRowEditing = that.isEditRow(rowIndex);
            var isCellEditing = that.isEditCell(rowIndex, options.columnIndex);
            var editingStartOptions;
            if ((column.showEditorAlways || column.setCellValue && (isRowEditing && column.allowEditing || isCellEditing)) && ("data" === options.rowType || "detailAdaptive" === options.rowType) && !column.command) {
                var allowUpdating = that.allowUpdating(options);
                if (((allowUpdating || isRowEditing) && column.allowEditing || isCellEditing) && (isRowMode && isRowEditing || !isRowMode)) {
                    if (column.showEditorAlways && !isRowMode) {
                        editingStartOptions = {
                            cancel: false,
                            key: options.row.isNewRow ? void 0 : options.row.key,
                            data: options.row.data,
                            column: column
                        };
                        that._isEditingStart(editingStartOptions)
                    }
                    if (!editingStartOptions || !editingStartOptions.cancel) {
                        options.setValue = function(value, text) {
                            that.updateFieldValue(options, value, text)
                        }
                    }
                }
                template = column.editCellTemplate || getDefaultEditorTemplate(that)
            } else {
                if ("detail" === column.command && "detail" === options.rowType && isRowEditing) {
                    template = that.getEditFormTemplate(options)
                }
            }
            return template
        },
        _createButton: function($container, button, options) {
            var that = this;
            var icon = EDIT_ICON_CLASS[button.name];
            var useIcons = that.option("editing.useIcons");
            var $button = (0, _renderer.default)("<a>").attr("href", "#").addClass(LINK_CLASS).addClass(button.cssClass);
            if (button.template) {
                that._rowsView.renderTemplate($container, button.template, options, true)
            } else {
                if (useIcons && icon || button.icon) {
                    icon = button.icon || icon;
                    var iconType = iconUtils.getImageSourceType(icon);
                    if ("image" === iconType || "svg" === iconType) {
                        $button = iconUtils.getImageContainer(icon).addClass(button.cssClass)
                    } else {
                        $button.addClass("dx-icon" + ("dxIcon" === iconType ? "-" : " ") + icon).attr("title", button.text)
                    }
                    $button.addClass("dx-link-icon");
                    $container.addClass(COMMAND_EDIT_WITH_ICONS_CLASS);
                    var localizationName = this.getButtonLocalizationNames()[button.name];
                    localizationName && $button.attr("aria-label", _message.default.format(localizationName))
                } else {
                    $button.text(button.text)
                }
                if ((0, _type.isDefined)(button.hint)) {
                    $button.attr("title", button.hint)
                }
                _events_engine.default.on($button, (0, _index.addNamespace)("click", EDITING_NAMESPACE), that.createAction(function(e) {
                    button.onClick.call(button, (0, _extend.extend)({}, e, {
                        row: options.row,
                        column: options.column
                    }));
                    e.event.preventDefault();
                    e.event.stopPropagation()
                }));
                $container.append($button, "&nbsp;")
            }
        },
        getButtonLocalizationNames: function() {
            return {
                edit: "dxDataGrid-editingEditRow",
                save: "dxDataGrid-editingSaveRowChanges",
                "delete": "dxDataGrid-editingDeleteRow",
                undelete: "dxDataGrid-editingUndeleteRow",
                cancel: "dxDataGrid-editingCancelRowChanges"
            }
        },
        prepareEditButtons: function(headerPanel) {
            var that = this;
            var editingOptions = that.option("editing") || {};
            var editingTexts = that.option("editing.texts") || {};
            var titleButtonTextByClassNames = {
                revert: editingTexts.cancelAllChanges,
                save: editingTexts.saveAllChanges,
                addRow: editingTexts.addRow
            };
            var classNameButtonByNames = {
                revert: "cancel",
                save: "save",
                addRow: "addrow"
            };
            var buttonItems = [];
            var prepareButtonItem = function(name, methodName, sortIndex) {
                var className = classNameButtonByNames[name];
                var onInitialized = function(e) {
                    (0, _renderer.default)(e.element).addClass(headerPanel._getToolbarButtonClass(EDIT_BUTTON_CLASS + " " + that.addWidgetPrefix(className) + "-button"))
                };
                var hintText = titleButtonTextByClassNames[name];
                var isButtonDisabled = ("save" === className || "cancel" === className) && !that.hasChanges();
                return {
                    widget: "dxButton",
                    options: {
                        onInitialized: onInitialized,
                        icon: "edit-button-" + className,
                        disabled: isButtonDisabled,
                        onClick: function() {
                            setTimeout(function() {
                                that[methodName]()
                            })
                        },
                        text: hintText,
                        hint: hintText
                    },
                    showText: "inMenu",
                    name: name + "Button",
                    location: "after",
                    locateInMenu: "auto",
                    sortIndex: sortIndex
                }
            };
            if (editingOptions.allowAdding) {
                buttonItems.push(prepareButtonItem("addRow", "addRow", 20))
            }
            if ((editingOptions.allowUpdating || editingOptions.allowAdding || editingOptions.allowDeleting) && _getEditMode(that) === EDIT_MODE_BATCH) {
                buttonItems.push(prepareButtonItem("save", "saveEditData", 21));
                buttonItems.push(prepareButtonItem("revert", "cancelEditData", 22))
            }
            return buttonItems
        },
        highlightDataCell: function($cell, parameters) {
            var cellModified = this.isCellModified(parameters);
            cellModified && parameters.column.setCellValue && $cell.addClass(CELL_MODIFIED)
        },
        _afterInsertRow: function() {},
        _beforeSaveEditData: function(change) {
            if (change && !(0, _type.isDefined)(change.key) && (0, _type.isDefined)(change.type)) {
                return true
            }
        },
        _afterSaveEditData: function() {},
        _beforeCancelEditData: function() {},
        _allowEditAction: function(actionName, options) {
            var allowEditAction = this.option("editing." + actionName);
            if ((0, _type.isFunction)(allowEditAction)) {
                allowEditAction = allowEditAction({
                    component: this.component,
                    row: options.row
                })
            }
            return allowEditAction
        },
        allowUpdating: function(options, eventName) {
            var startEditAction = this.option("editing.startEditAction") || DEFAULT_START_EDIT_ACTION;
            var needCallback = arguments.length > 1 ? startEditAction === eventName || "down" === eventName : true;
            return needCallback && this._allowEditAction("allowUpdating", options)
        },
        allowDeleting: function(options) {
            return this._allowEditAction("allowDeleting", options)
        },
        isCellModified: function(parameters) {
            var columnIndex = parameters.columnIndex;
            var modifiedValues = parameters.row && (parameters.row.isNewRow ? parameters.row.values : parameters.row.modifiedValues);
            return !!modifiedValues && void 0 !== modifiedValues[columnIndex]
        }
    }
}());
var _default = {
    defaultOptions: function() {
        return {
            editing: {
                mode: "row",
                refreshMode: "full",
                allowAdding: false,
                allowUpdating: false,
                allowDeleting: false,
                useIcons: false,
                selectTextOnEditStart: false,
                confirmDelete: true,
                texts: {
                    editRow: _message.default.format("dxDataGrid-editingEditRow"),
                    saveAllChanges: _message.default.format("dxDataGrid-editingSaveAllChanges"),
                    saveRowChanges: _message.default.format("dxDataGrid-editingSaveRowChanges"),
                    cancelAllChanges: _message.default.format("dxDataGrid-editingCancelAllChanges"),
                    cancelRowChanges: _message.default.format("dxDataGrid-editingCancelRowChanges"),
                    addRow: _message.default.format("dxDataGrid-editingAddRow"),
                    deleteRow: _message.default.format("dxDataGrid-editingDeleteRow"),
                    undeleteRow: _message.default.format("dxDataGrid-editingUndeleteRow"),
                    confirmDeleteMessage: _message.default.format("dxDataGrid-editingConfirmDeleteMessage"),
                    confirmDeleteTitle: ""
                },
                form: {
                    colCount: 2
                },
                popup: {},
                startEditAction: "click",
                editRowKey: null,
                editColumnName: null,
                changes: []
            }
        }
    },
    controllers: {
        editing: EditingController
    },
    extenders: {
        controllers: {
            data: {
                init: function() {
                    this._editingController = this.getController("editing");
                    this.callBase()
                },
                reload: function(full, repaintChangesOnly) {
                    !repaintChangesOnly && this._editingController.refresh();
                    return this.callBase.apply(this, arguments)
                },
                repaintRows: function() {
                    if (this.getController("editing").isSaving()) {
                        return
                    }
                    return this.callBase.apply(this, arguments)
                },
                _updateEditRow: function(items) {
                    var editingController = this._editingController;
                    var editRowKey = this.option(EDITING_EDITROWKEY_OPTION_NAME);
                    var editRowIndex = _uiGrid_core2.default.getIndexByKey(editRowKey, items);
                    var editItem = items[editRowIndex];
                    if (editItem) {
                        editItem.isEditing = true;
                        if (editingController.getEditMode() === EDIT_MODE_FORM) {
                            editItem.rowType = "detail"
                        }
                    }
                },
                _updateItemsCore: function(change) {
                    this.callBase(change);
                    this._updateEditRow(this.items())
                },
                _applyChangeUpdate: function(change) {
                    this._updateEditRow(change.items);
                    this.callBase(change)
                },
                _applyChangesOnly: function(change) {
                    this._updateEditRow(change.items);
                    this.callBase(change)
                },
                _processItems: function(items, change) {
                    items = this._editingController.processItems(items, change);
                    return this.callBase(items, change)
                },
                _processDataItem: function(dataItem, options) {
                    this._editingController.processDataItem(dataItem, options, this.generateDataValues);
                    return this.callBase(dataItem, options)
                },
                _processItem: function(item, options) {
                    item = this.callBase(item, options);
                    if (item.isNewRow) {
                        options.dataIndex--;
                        delete item.dataIndex
                    }
                    return item
                },
                _getChangedColumnIndices: function(oldItem, newItem, rowIndex, isLiveUpdate) {
                    var editingController = this.getController("editing");
                    var isRowEditMode = editingController.isRowEditMode();
                    if (oldItem.isNewRow !== newItem.isNewRow || oldItem.removed !== newItem.removed || isRowEditMode && oldItem.isEditing !== newItem.isEditing) {
                        return
                    }
                    return this.callBase.apply(this, arguments)
                },
                _isCellChanged: function(oldRow, newRow, visibleRowIndex, columnIndex, isLiveUpdate) {
                    var editingController = this.getController("editing");
                    var cell = oldRow.cells && oldRow.cells[columnIndex];
                    var isEditing = editingController && editingController.isEditCell(visibleRowIndex, columnIndex);
                    if (isLiveUpdate && isEditing) {
                        return false
                    }
                    if (cell && cell.column && !cell.column.showEditorAlways && cell.isEditing !== isEditing) {
                        return true
                    }
                    return this.callBase.apply(this, arguments)
                }
            }
        },
        views: {
            rowsView: {
                init: function() {
                    this.callBase();
                    this._editingController = this.getController("editing")
                },
                getCellElements: function(rowIndex) {
                    var $cellElements = this.callBase(rowIndex);
                    var editingController = this._editingController;
                    var editForm = editingController.getEditForm();
                    var editFormRowIndex = editingController.getEditFormRowIndex();
                    if (editFormRowIndex === rowIndex && $cellElements && editForm) {
                        return editForm.$element().find("." + this.addWidgetPrefix(EDIT_FORM_ITEM_CLASS) + ", ." + BUTTON_CLASS)
                    }
                    return $cellElements
                },
                getCellIndex: function($cell, rowIndex) {
                    if (!$cell.is("td") && rowIndex >= 0) {
                        var $cellElements = this.getCellElements(rowIndex);
                        var cellIndex = -1;
                        (0, _iterator.each)($cellElements, function(index, cellElement) {
                            if ((0, _renderer.default)(cellElement).find($cell).length) {
                                cellIndex = index
                            }
                        });
                        return cellIndex
                    }
                    return this.callBase.apply(this, arguments)
                },
                _getVisibleColumnIndex: function($cells, rowIndex, columnIdentifier) {
                    var editFormRowIndex = this._editingController.getEditFormRowIndex();
                    if (editFormRowIndex === rowIndex && (0, _type.isString)(columnIdentifier)) {
                        var column = this._columnsController.columnOption(columnIdentifier);
                        return this._getEditFormEditorVisibleIndex($cells, column)
                    }
                    return this.callBase.apply(this, arguments)
                },
                _getEditFormEditorVisibleIndex: function($cells, column) {
                    var visibleIndex = -1;
                    (0, _iterator.each)($cells, function(index, cellElement) {
                        var item = (0, _renderer.default)(cellElement).find(".dx-field-item-content").data("dx-form-item");
                        if (item && item.column && column && item.column.index === column.index) {
                            visibleIndex = index;
                            return false
                        }
                    });
                    return visibleIndex
                },
                publicMethods: function() {
                    return this.callBase().concat(["cellValue"])
                },
                _getCellTemplate: function(options) {
                    var that = this;
                    var template = that._editingController.getColumnTemplate(options);
                    return template || that.callBase(options)
                },
                _isNativeClick: function() {
                    return (_devices.default.real().ios || _devices.default.real().android) && this.option("editing.allowUpdating")
                },
                _createTable: function() {
                    var that = this;
                    var $table = that.callBase.apply(that, arguments);
                    if (!_isRowEditMode(that) && that.option("editing.allowUpdating")) {
                        _events_engine.default.on($table, (0, _index.addNamespace)(_hold.default.name, "dxDataGridRowsView"), "td:not(." + EDITOR_CELL_CLASS + ")", that.createAction(function() {
                            var editingController = that._editingController;
                            if (editingController.isEditing()) {
                                editingController.closeEditCell()
                            }
                        }))
                    }
                    return $table
                },
                _createRow: function(row) {
                    var $row = this.callBase(row);
                    if (row) {
                        var editingController = this._editingController;
                        var isEditRow = editingController.isEditRow(row.rowIndex);
                        var isRowRemoved = !!row.removed;
                        var isRowInserted = !!row.isNewRow;
                        var isRowModified = !!row.modified;
                        if (_getEditMode(this) === EDIT_MODE_BATCH) {
                            isRowRemoved && $row.addClass(ROW_REMOVED)
                        } else {
                            isEditRow && $row.addClass(EDIT_ROW)
                        }
                        isRowInserted && $row.addClass(ROW_INSERTED);
                        isRowModified && $row.addClass(ROW_MODIFIED);
                        if (isEditRow || isRowInserted || isRowRemoved) {
                            $row.removeClass(ROW_SELECTED)
                        }
                        if (isEditRow && "detail" === row.rowType) {
                            $row.addClass(this.addWidgetPrefix(EDIT_FORM_CLASS))
                        }
                    }
                    return $row
                },
                _getColumnIndexByElement: function($element) {
                    var $tableElement = $element.closest("table");
                    var $tableElements = this.getTableElements();
                    while ($tableElement.length && !$tableElements.filter($tableElement).length) {
                        $element = $tableElement.closest("td");
                        $tableElement = $element.closest("table")
                    }
                    return this._getColumnIndexByElementCore($element)
                },
                _getColumnIndexByElementCore: function($element) {
                    var $targetElement = $element.closest("." + ROW_CLASS + "> td:not(.dx-master-detail-cell)");
                    return this.getCellIndex($targetElement)
                },
                _editCellByClick: function(e, eventName) {
                    var that = this;
                    var editingController = that._editingController;
                    var $targetElement = (0, _renderer.default)(e.event.target);
                    var columnIndex = that._getColumnIndexByElement($targetElement);
                    var row = that._dataController.items()[e.rowIndex];
                    var allowUpdating = editingController.allowUpdating({
                        row: row
                    }, eventName) || row && row.isNewRow;
                    var column = that._columnsController.getVisibleColumns()[columnIndex];
                    var allowEditing = allowUpdating && column && (column.allowEditing || editingController.isEditCell(e.rowIndex, columnIndex));
                    var startEditAction = that.option("editing.startEditAction") || "click";
                    if ("down" === eventName) {
                        return column && column.showEditorAlways && allowEditing && editingController.editCell(e.rowIndex, columnIndex)
                    }
                    if ("click" === eventName && "dblClick" === startEditAction && !editingController.isEditCell(e.rowIndex, columnIndex)) {
                        editingController.closeEditCell()
                    }
                    if (allowEditing && eventName === startEditAction) {
                        return editingController.editCell(e.rowIndex, columnIndex) || editingController.isEditRow(e.rowIndex)
                    }
                },
                _rowPointerDown: function(e) {
                    var _this24 = this;
                    this._pointerDownTimeout = setTimeout(function() {
                        _this24._editCellByClick(e, "down")
                    })
                },
                _rowClick: function(e) {
                    var isEditForm = (0, _renderer.default)(e.rowElement).hasClass(this.addWidgetPrefix(EDIT_FORM_CLASS));
                    e.event[TARGET_COMPONENT_NAME] = this.component;
                    if (!this._editCellByClick(e, "click") && !isEditForm) {
                        this.callBase.apply(this, arguments)
                    }
                },
                _rowDblClick: function(e) {
                    if (!this._editCellByClick(e, "dblClick")) {
                        this.callBase.apply(this, arguments)
                    }
                },
                _cellPrepared: function($cell, parameters) {
                    var editingController = this._editingController;
                    var isCommandCell = !!parameters.column.command;
                    var isEditableCell = parameters.setValue;
                    var isEditRow = editingController.isEditRow(parameters.rowIndex);
                    var isEditing = isEditingCell(isEditRow, parameters);
                    if (isEditingOrShowEditorAlwaysDataCell(isEditRow, parameters)) {
                        var alignment = parameters.column.alignment;
                        $cell.toggleClass(this.addWidgetPrefix(READONLY_CLASS), !isEditableCell).toggleClass(CELL_FOCUS_DISABLED_CLASS, !isEditableCell);
                        if (alignment) {
                            $cell.find(EDITORS_INPUT_SELECTOR).first().css("textAlign", alignment)
                        }
                    }
                    if (isEditing) {
                        this._editCellPrepared($cell)
                    }
                    if (parameters.column && !isCommandCell) {
                        editingController.highlightDataCell($cell, parameters)
                    }
                    this.callBase.apply(this, arguments)
                },
                _editCellPrepared: function($cell) {},
                _formItemPrepared: function() {},
                _isFormItem: function(parameters) {
                    var isDetailRow = "detail" === parameters.rowType || "detailAdaptive" === parameters.rowType;
                    var isPopupEditing = "data" === parameters.rowType && "popup" === _getEditMode(this);
                    return (isDetailRow || isPopupEditing) && parameters.item
                },
                _updateCell: function($cell, parameters) {
                    if (this._isFormItem(parameters)) {
                        this._formItemPrepared(parameters, $cell)
                    } else {
                        this.callBase($cell, parameters)
                    }
                },
                _update: function(change) {
                    this.callBase(change);
                    if ("updateSelection" === change.changeType) {
                        this.getTableElements().children("tbody").children("." + EDIT_ROW).removeClass(ROW_SELECTED)
                    }
                },
                _getCellOptions: function(options) {
                    var cellOptions = this.callBase(options);
                    cellOptions.isEditing = this._editingController.isEditCell(cellOptions.rowIndex, cellOptions.columnIndex);
                    return cellOptions
                },
                _createCell: function(options) {
                    var $cell = this.callBase(options);
                    var isEditRow = this._editingController.isEditRow(options.rowIndex);
                    isEditingOrShowEditorAlwaysDataCell(isEditRow, options) && $cell.addClass(EDITOR_CELL_CLASS);
                    return $cell
                },
                _renderCellContent: function($cell, options) {
                    if ("data" === options.rowType && _getEditMode(this) === EDIT_MODE_POPUP && false === options.row.visible) {
                        return
                    }
                    this.callBase.apply(this, arguments)
                },
                cellValue: function(rowIndex, columnIdentifier, value, text) {
                    var cellOptions = this.getCellOptions(rowIndex, columnIdentifier);
                    if (cellOptions) {
                        if (void 0 === value) {
                            return cellOptions.value
                        } else {
                            this._editingController.updateFieldValue(cellOptions, value, text, true)
                        }
                    }
                },
                dispose: function() {
                    this.callBase.apply(this, arguments);
                    clearTimeout(this._pointerDownTimeout)
                },
                _renderCore: function() {
                    this.callBase.apply(this, arguments);
                    this._editingController._focusEditorIfNeed()
                }
            },
            headerPanel: {
                _getToolbarItems: function() {
                    var items = this.callBase();
                    var editButtonItems = this.getController("editing").prepareEditButtons(this);
                    return editButtonItems.concat(items)
                },
                optionChanged: function(args) {
                    var fullName = args.fullName;
                    switch (args.name) {
                        case "editing":
                            var excludedOptions = [EDITING_POPUP_OPTION_NAME, EDITING_CHANGES_OPTION_NAME, EDITING_EDITCOLUMNNAME_OPTION_NAME, EDITING_EDITROWKEY_OPTION_NAME];
                            var shouldInvalidate = fullName && !excludedOptions.some(function(optionName) {
                                return optionName === fullName
                            });
                            shouldInvalidate && this._invalidate();
                            this.callBase(args);
                            break;
                        default:
                            this.callBase(args)
                    }
                },
                isVisible: function() {
                    var that = this;
                    var editingOptions = that.getController("editing").option("editing");
                    return that.callBase() || editingOptions && (editingOptions.allowAdding || (editingOptions.allowUpdating || editingOptions.allowDeleting) && editingOptions.mode === EDIT_MODE_BATCH)
                }
            }
        }
    }
};
exports.default = _default;
module.exports = exports.default;
