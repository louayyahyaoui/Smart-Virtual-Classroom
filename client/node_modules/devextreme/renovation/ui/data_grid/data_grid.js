/**
 * DevExtreme (renovation/ui/data_grid/data_grid.js)
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
exports.DataGrid = exports.viewFunction = void 0;
var _ui = _interopRequireDefault(require("../../../ui/data_grid/ui.data_grid"));
var _props = require("./props");
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var Preact = _interopRequireWildcard(require("preact"));
var _hooks = require("preact/hooks");
var _compat = require("preact/compat");

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

function _objectWithoutProperties(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
}

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) {
        return
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
                break
            }
        }
    } catch (err) {
        _d = true;
        _e = err
    } finally {
        try {
            if (!_n && null != _i.return) {
                _i.return()
            }
        } finally {
            if (_d) {
                throw _e
            }
        }
    }
    return _arr
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
}

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
var viewFunction = function(_ref) {
    var domComponentRef = _ref.domComponentRef,
        props = _ref.props,
        restAttributes = _ref.restAttributes;
    return Preact.h(_dom_component_wrapper.DomComponentWrapper, _extends({
        ref: domComponentRef,
        componentType: _ui.default,
        componentProps: props
    }, restAttributes))
};
exports.viewFunction = viewFunction;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};
var DataGrid = (0, _compat.forwardRef)(function(props, ref) {
    var __domComponentRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(function() {
            return void 0 !== props.filterValue ? props.filterValue : props.defaultFilterValue
        }),
        _useState2 = _slicedToArray(_useState, 2),
        __state_filterValue = _useState2[0];
    _useState2[1];
    var _useState3 = (0, _hooks.useState)(function() {
            return void 0 !== props.focusedColumnIndex ? props.focusedColumnIndex : props.defaultFocusedColumnIndex
        }),
        _useState4 = _slicedToArray(_useState3, 2),
        __state_focusedColumnIndex = _useState4[0];
    _useState4[1];
    var _useState5 = (0, _hooks.useState)(function() {
            return void 0 !== props.focusedRowIndex ? props.focusedRowIndex : props.defaultFocusedRowIndex
        }),
        _useState6 = _slicedToArray(_useState5, 2),
        __state_focusedRowIndex = _useState6[0];
    _useState6[1];
    var _useState7 = (0, _hooks.useState)(function() {
            return void 0 !== props.focusedRowKey ? props.focusedRowKey : props.defaultFocusedRowKey
        }),
        _useState8 = _slicedToArray(_useState7, 2),
        __state_focusedRowKey = _useState8[0];
    _useState8[1];
    var _useState9 = (0, _hooks.useState)(function() {
            return void 0 !== props.selectedRowKeys ? props.selectedRowKeys : props.defaultSelectedRowKeys
        }),
        _useState10 = _slicedToArray(_useState9, 2),
        __state_selectedRowKeys = _useState10[0];
    _useState10[1];
    var _useState11 = (0, _hooks.useState)(function() {
            return void 0 !== props.selectionFilter ? props.selectionFilter : props.defaultSelectionFilter
        }),
        _useState12 = _slicedToArray(_useState11, 2),
        __state_selectionFilter = _useState12[0];
    _useState12[1];
    var __instance = (0, _hooks.useCallback)(function() {
        return __domComponentRef.current.getInstance()
    }, []);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$rootElementRef;
        var _props$filterValue$fo = _objectSpread(_objectSpread({}, props), {}, {
                filterValue: void 0 !== props.filterValue ? props.filterValue : __state_filterValue,
                focusedColumnIndex: void 0 !== props.focusedColumnIndex ? props.focusedColumnIndex : __state_focusedColumnIndex,
                focusedRowIndex: void 0 !== props.focusedRowIndex ? props.focusedRowIndex : __state_focusedRowIndex,
                focusedRowKey: void 0 !== props.focusedRowKey ? props.focusedRowKey : __state_focusedRowKey,
                selectedRowKeys: void 0 !== props.selectedRowKeys ? props.selectedRowKeys : __state_selectedRowKeys,
                selectionFilter: void 0 !== props.selectionFilter ? props.selectionFilter : __state_selectionFilter,
                rootElementRef: null === (_props$rootElementRef = props.rootElementRef) || void 0 === _props$rootElementRef ? void 0 : _props$rootElementRef.current
            }),
            restProps = (_props$filterValue$fo._feedbackHideTimeout, _props$filterValue$fo._feedbackShowTimeout, _props$filterValue$fo.accessKey, _props$filterValue$fo.activeStateEnabled, _props$filterValue$fo.activeStateUnit, _props$filterValue$fo.allowColumnReordering, _props$filterValue$fo.allowColumnResizing, _props$filterValue$fo.aria, _props$filterValue$fo.autoNavigateToFocusedRow, _props$filterValue$fo.cacheEnabled, _props$filterValue$fo.cellHintEnabled, _props$filterValue$fo.children, _props$filterValue$fo.className, _props$filterValue$fo.classes, _props$filterValue$fo.columnAutoWidth, _props$filterValue$fo.columnChooser, _props$filterValue$fo.columnFixing, _props$filterValue$fo.columnHidingEnabled, _props$filterValue$fo.columnMinWidth, _props$filterValue$fo.columnResizingMode, _props$filterValue$fo.columnWidth, _props$filterValue$fo.columns, _props$filterValue$fo.customizeColumns, _props$filterValue$fo.customizeExportData, _props$filterValue$fo.dataSource, _props$filterValue$fo.dateSerializationFormat, _props$filterValue$fo.defaultFilterValue, _props$filterValue$fo.defaultFocusedColumnIndex, _props$filterValue$fo.defaultFocusedRowIndex, _props$filterValue$fo.defaultFocusedRowKey, _props$filterValue$fo.defaultSelectedRowKeys, _props$filterValue$fo.defaultSelectionFilter, _props$filterValue$fo.disabled, _props$filterValue$fo.editing, _props$filterValue$fo.errorRowEnabled, _props$filterValue$fo.export, _props$filterValue$fo.filterBuilder, _props$filterValue$fo.filterBuilderPopup, _props$filterValue$fo.filterPanel, _props$filterValue$fo.filterRow, _props$filterValue$fo.filterSyncEnabled, _props$filterValue$fo.filterValue, _props$filterValue$fo.filterValueChange, _props$filterValue$fo.focusStateEnabled, _props$filterValue$fo.focusedColumnIndex, _props$filterValue$fo.focusedColumnIndexChange, _props$filterValue$fo.focusedRowEnabled, _props$filterValue$fo.focusedRowIndex, _props$filterValue$fo.focusedRowIndexChange, _props$filterValue$fo.focusedRowKey, _props$filterValue$fo.focusedRowKeyChange, _props$filterValue$fo.groupPanel, _props$filterValue$fo.grouping, _props$filterValue$fo.headerFilter, _props$filterValue$fo.height, _props$filterValue$fo.highlightChanges, _props$filterValue$fo.hint, _props$filterValue$fo.hoverStateEnabled, _props$filterValue$fo.keyExpr, _props$filterValue$fo.keyboardNavigation, _props$filterValue$fo.loadPanel, _props$filterValue$fo.masterDetail, _props$filterValue$fo.name, _props$filterValue$fo.noDataText, _props$filterValue$fo.onActive, _props$filterValue$fo.onAdaptiveDetailRowPreparing, _props$filterValue$fo.onCellClick, _props$filterValue$fo.onCellDblClick, _props$filterValue$fo.onCellHoverChanged, _props$filterValue$fo.onCellPrepared, _props$filterValue$fo.onClick, _props$filterValue$fo.onContentReady, _props$filterValue$fo.onContextMenuPreparing, _props$filterValue$fo.onDataErrorOccurred, _props$filterValue$fo.onDimensionChanged, _props$filterValue$fo.onEditingStart, _props$filterValue$fo.onEditorPrepared, _props$filterValue$fo.onEditorPreparing, _props$filterValue$fo.onExported, _props$filterValue$fo.onExporting, _props$filterValue$fo.onFileSaving, _props$filterValue$fo.onFocusIn, _props$filterValue$fo.onFocusOut, _props$filterValue$fo.onFocusedCellChanged, _props$filterValue$fo.onFocusedCellChanging, _props$filterValue$fo.onFocusedRowChanged, _props$filterValue$fo.onFocusedRowChanging, _props$filterValue$fo.onInactive, _props$filterValue$fo.onInitNewRow, _props$filterValue$fo.onKeyDown, _props$filterValue$fo.onKeyboardHandled, _props$filterValue$fo.onRowClick, _props$filterValue$fo.onRowCollapsed, _props$filterValue$fo.onRowCollapsing, _props$filterValue$fo.onRowDblClick, _props$filterValue$fo.onRowExpanded, _props$filterValue$fo.onRowExpanding, _props$filterValue$fo.onRowInserted, _props$filterValue$fo.onRowInserting, _props$filterValue$fo.onRowPrepared, _props$filterValue$fo.onRowRemoved, _props$filterValue$fo.onRowRemoving, _props$filterValue$fo.onRowUpdated, _props$filterValue$fo.onRowUpdating, _props$filterValue$fo.onRowValidating, _props$filterValue$fo.onSelectionChanged, _props$filterValue$fo.onToolbarPreparing, _props$filterValue$fo.onVisibilityChange, _props$filterValue$fo.pager, _props$filterValue$fo.paging, _props$filterValue$fo.remoteOperations, _props$filterValue$fo.renderAsync, _props$filterValue$fo.repaintChangesOnly, _props$filterValue$fo.rootElementRef, _props$filterValue$fo.rowAlternationEnabled, _props$filterValue$fo.rowDragging, _props$filterValue$fo.rowTemplate, _props$filterValue$fo.rtlEnabled, _props$filterValue$fo.scrolling, _props$filterValue$fo.searchPanel, _props$filterValue$fo.selectedRowKeys, _props$filterValue$fo.selectedRowKeysChange, _props$filterValue$fo.selection, _props$filterValue$fo.selectionFilter, _props$filterValue$fo.selectionFilterChange, _props$filterValue$fo.showBorders, _props$filterValue$fo.showColumnHeaders, _props$filterValue$fo.showColumnLines, _props$filterValue$fo.showRowLines, _props$filterValue$fo.sortByGroupSummaryInfo, _props$filterValue$fo.sorting, _props$filterValue$fo.stateStoring, _props$filterValue$fo.summary, _props$filterValue$fo.tabIndex, _props$filterValue$fo.twoWayBindingEnabled, _props$filterValue$fo.visible, _props$filterValue$fo.width, _props$filterValue$fo.wordWrapEnabled, _objectWithoutProperties(_props$filterValue$fo, ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "allowColumnReordering", "allowColumnResizing", "aria", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "children", "className", "classes", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "columns", "customizeColumns", "customizeExportData", "dataSource", "dateSerializationFormat", "defaultFilterValue", "defaultFocusedColumnIndex", "defaultFocusedRowIndex", "defaultFocusedRowKey", "defaultSelectedRowKeys", "defaultSelectionFilter", "disabled", "editing", "errorRowEnabled", "export", "filterBuilder", "filterBuilderPopup", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "filterValueChange", "focusStateEnabled", "focusedColumnIndex", "focusedColumnIndexChange", "focusedRowEnabled", "focusedRowIndex", "focusedRowIndexChange", "focusedRowKey", "focusedRowKeyChange", "groupPanel", "grouping", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "keyExpr", "keyboardNavigation", "loadPanel", "masterDetail", "name", "noDataText", "onActive", "onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onClick", "onContentReady", "onContextMenuPreparing", "onDataErrorOccurred", "onDimensionChanged", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusIn", "onFocusOut", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInactive", "onInitNewRow", "onKeyDown", "onKeyboardHandled", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSelectionChanged", "onToolbarPreparing", "onVisibilityChange", "pager", "paging", "remoteOperations", "renderAsync", "repaintChangesOnly", "rootElementRef", "rowAlternationEnabled", "rowDragging", "rowTemplate", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selectedRowKeysChange", "selection", "selectionFilter", "selectionFilterChange", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sortByGroupSummaryInfo", "sorting", "stateStoring", "summary", "tabIndex", "twoWayBindingEnabled", "visible", "width", "wordWrapEnabled"]));
        return restProps
    }, [props, __state_filterValue, __state_focusedColumnIndex, __state_focusedRowIndex, __state_focusedRowKey, __state_selectedRowKeys, __state_selectionFilter]);
    var __beginCustomLoading = (0, _hooks.useCallback)(function(messageText) {
        var _instance;
        return null === (_instance = __instance()) || void 0 === _instance ? void 0 : _instance.beginCustomLoading(messageText)
    }, []);
    var __byKey = (0, _hooks.useCallback)(function(key) {
        var _instance2;
        return null === (_instance2 = __instance()) || void 0 === _instance2 ? void 0 : _instance2.byKey(key)
    }, []);
    var __cancelEditData = (0, _hooks.useCallback)(function() {
        var _instance3;
        return null === (_instance3 = __instance()) || void 0 === _instance3 ? void 0 : _instance3.cancelEditData()
    }, []);
    var __cellValue = (0, _hooks.useCallback)(function(rowIndex, dataField, value) {
        var _instance4;
        return null === (_instance4 = __instance()) || void 0 === _instance4 ? void 0 : _instance4.cellValue(rowIndex, dataField, value)
    }, []);
    var __clearFilter = (0, _hooks.useCallback)(function(filterName) {
        var _instance5;
        return null === (_instance5 = __instance()) || void 0 === _instance5 ? void 0 : _instance5.clearFilter(filterName)
    }, []);
    var __clearSelection = (0, _hooks.useCallback)(function() {
        var _instance6;
        return null === (_instance6 = __instance()) || void 0 === _instance6 ? void 0 : _instance6.clearSelection()
    }, []);
    var __clearSorting = (0, _hooks.useCallback)(function() {
        var _instance7;
        return null === (_instance7 = __instance()) || void 0 === _instance7 ? void 0 : _instance7.clearSorting()
    }, []);
    var __closeEditCell = (0, _hooks.useCallback)(function() {
        var _instance8;
        return null === (_instance8 = __instance()) || void 0 === _instance8 ? void 0 : _instance8.closeEditCell()
    }, []);
    var __collapseAdaptiveDetailRow = (0, _hooks.useCallback)(function() {
        var _instance9;
        return null === (_instance9 = __instance()) || void 0 === _instance9 ? void 0 : _instance9.collapseAdaptiveDetailRow()
    }, []);
    var __columnCount = (0, _hooks.useCallback)(function() {
        var _instance10;
        return null === (_instance10 = __instance()) || void 0 === _instance10 ? void 0 : _instance10.columnCount()
    }, []);
    var __columnOption = (0, _hooks.useCallback)(function(id, optionName, optionValue) {
        var _instance11;
        return null === (_instance11 = __instance()) || void 0 === _instance11 ? void 0 : _instance11.columnOption(id, optionName, optionValue)
    }, []);
    var __deleteColumn = (0, _hooks.useCallback)(function(id) {
        var _instance12;
        return null === (_instance12 = __instance()) || void 0 === _instance12 ? void 0 : _instance12.deleteColumn(id)
    }, []);
    var __deleteRow = (0, _hooks.useCallback)(function(rowIndex) {
        var _instance13;
        return null === (_instance13 = __instance()) || void 0 === _instance13 ? void 0 : _instance13.deleteRow(rowIndex)
    }, []);
    var __deselectAll = (0, _hooks.useCallback)(function() {
        var _instance14;
        return null === (_instance14 = __instance()) || void 0 === _instance14 ? void 0 : _instance14.deselectAll()
    }, []);
    var __deselectRows = (0, _hooks.useCallback)(function(keys) {
        var _instance15;
        return null === (_instance15 = __instance()) || void 0 === _instance15 ? void 0 : _instance15.deselectRows(keys)
    }, []);
    var __editCell = (0, _hooks.useCallback)(function(rowIndex, dataField) {
        var _instance16;
        return null === (_instance16 = __instance()) || void 0 === _instance16 ? void 0 : _instance16.editCell(rowIndex, dataField)
    }, []);
    var __editRow = (0, _hooks.useCallback)(function(rowIndex) {
        var _instance17;
        return null === (_instance17 = __instance()) || void 0 === _instance17 ? void 0 : _instance17.editRow(rowIndex)
    }, []);
    var __endCustomLoading = (0, _hooks.useCallback)(function() {
        var _instance18;
        return null === (_instance18 = __instance()) || void 0 === _instance18 ? void 0 : _instance18.endCustomLoading()
    }, []);
    var __expandAdaptiveDetailRow = (0, _hooks.useCallback)(function(key) {
        var _instance19;
        return null === (_instance19 = __instance()) || void 0 === _instance19 ? void 0 : _instance19.expandAdaptiveDetailRow(key)
    }, []);
    var __filter = (0, _hooks.useCallback)(function(filterExpr) {
        var _instance20;
        return null === (_instance20 = __instance()) || void 0 === _instance20 ? void 0 : _instance20.filter(filterExpr)
    }, []);
    var __focus = (0, _hooks.useCallback)(function(element) {
        var _instance21;
        return null === (_instance21 = __instance()) || void 0 === _instance21 ? void 0 : _instance21.focus(element)
    }, []);
    var __getCellElement = (0, _hooks.useCallback)(function(rowIndex, dataField) {
        var _instance22;
        return null === (_instance22 = __instance()) || void 0 === _instance22 ? void 0 : _instance22.getCellElement(rowIndex, dataField)
    }, []);
    var __getCombinedFilter = (0, _hooks.useCallback)(function(returnDataField) {
        var _instance23;
        return null === (_instance23 = __instance()) || void 0 === _instance23 ? void 0 : _instance23.getCombinedFilter(returnDataField)
    }, []);
    var __getDataSource = (0, _hooks.useCallback)(function() {
        var _instance24;
        return null === (_instance24 = __instance()) || void 0 === _instance24 ? void 0 : _instance24.getDataSource()
    }, []);
    var __getKeyByRowIndex = (0, _hooks.useCallback)(function(rowIndex) {
        var _instance25;
        return null === (_instance25 = __instance()) || void 0 === _instance25 ? void 0 : _instance25.getKeyByRowIndex(rowIndex)
    }, []);
    var __getRowElement = (0, _hooks.useCallback)(function(rowIndex) {
        var _instance26;
        return null === (_instance26 = __instance()) || void 0 === _instance26 ? void 0 : _instance26.getRowElement(rowIndex)
    }, []);
    var __getRowIndexByKey = (0, _hooks.useCallback)(function(key) {
        var _instance27;
        return null === (_instance27 = __instance()) || void 0 === _instance27 ? void 0 : _instance27.getRowIndexByKey(key)
    }, []);
    var __getScrollable = (0, _hooks.useCallback)(function() {
        var _instance28;
        return null === (_instance28 = __instance()) || void 0 === _instance28 ? void 0 : _instance28.getScrollable()
    }, []);
    var __getVisibleColumnIndex = (0, _hooks.useCallback)(function(id) {
        var _instance29;
        return null === (_instance29 = __instance()) || void 0 === _instance29 ? void 0 : _instance29.getVisibleColumnIndex(id)
    }, []);
    var __hasEditData = (0, _hooks.useCallback)(function() {
        var _instance30;
        return null === (_instance30 = __instance()) || void 0 === _instance30 ? void 0 : _instance30.hasEditData()
    }, []);
    var __hideColumnChooser = (0, _hooks.useCallback)(function() {
        var _instance31;
        return null === (_instance31 = __instance()) || void 0 === _instance31 ? void 0 : _instance31.hideColumnChooser()
    }, []);
    var __isAdaptiveDetailRowExpanded = (0, _hooks.useCallback)(function(key) {
        var _instance32;
        return null === (_instance32 = __instance()) || void 0 === _instance32 ? void 0 : _instance32.isAdaptiveDetailRowExpanded(key)
    }, []);
    var __isRowFocused = (0, _hooks.useCallback)(function(key) {
        var _instance33;
        return null === (_instance33 = __instance()) || void 0 === _instance33 ? void 0 : _instance33.isRowFocused(key)
    }, []);
    var __isRowSelected = (0, _hooks.useCallback)(function(key) {
        var _instance34;
        return null === (_instance34 = __instance()) || void 0 === _instance34 ? void 0 : _instance34.isRowSelected(key)
    }, []);
    var __keyOf = (0, _hooks.useCallback)(function(obj) {
        var _instance35;
        return null === (_instance35 = __instance()) || void 0 === _instance35 ? void 0 : _instance35.keyOf(obj)
    }, []);
    var __navigateToRow = (0, _hooks.useCallback)(function(key) {
        var _instance36;
        return null === (_instance36 = __instance()) || void 0 === _instance36 ? void 0 : _instance36.navigateToRow(key)
    }, []);
    var __pageCount = (0, _hooks.useCallback)(function() {
        var _instance37;
        return null === (_instance37 = __instance()) || void 0 === _instance37 ? void 0 : _instance37.pageCount()
    }, []);
    var __pageIndex = (0, _hooks.useCallback)(function(newIndex) {
        var _instance38;
        return null === (_instance38 = __instance()) || void 0 === _instance38 ? void 0 : _instance38.pageIndex(newIndex)
    }, []);
    var __pageSize = (0, _hooks.useCallback)(function(value) {
        var _instance39;
        return null === (_instance39 = __instance()) || void 0 === _instance39 ? void 0 : _instance39.pageSize(value)
    }, []);
    var __refresh = (0, _hooks.useCallback)(function(changesOnly) {
        var _instance40;
        return null === (_instance40 = __instance()) || void 0 === _instance40 ? void 0 : _instance40.refresh(changesOnly)
    }, []);
    var __repaintRows = (0, _hooks.useCallback)(function(rowIndexes) {
        var _instance41;
        return null === (_instance41 = __instance()) || void 0 === _instance41 ? void 0 : _instance41.repaintRows(rowIndexes)
    }, []);
    var __saveEditData = (0, _hooks.useCallback)(function() {
        var _instance42;
        return null === (_instance42 = __instance()) || void 0 === _instance42 ? void 0 : _instance42.saveEditData()
    }, []);
    var __searchByText = (0, _hooks.useCallback)(function(text) {
        var _instance43;
        return null === (_instance43 = __instance()) || void 0 === _instance43 ? void 0 : _instance43.searchByText(text)
    }, []);
    var __selectAll = (0, _hooks.useCallback)(function() {
        var _instance44;
        return null === (_instance44 = __instance()) || void 0 === _instance44 ? void 0 : _instance44.selectAll()
    }, []);
    var __selectRows = (0, _hooks.useCallback)(function(keys, preserve) {
        var _instance45;
        return null === (_instance45 = __instance()) || void 0 === _instance45 ? void 0 : _instance45.selectRows(keys, preserve)
    }, []);
    var __selectRowsByIndexes = (0, _hooks.useCallback)(function(indexes) {
        var _instance46;
        return null === (_instance46 = __instance()) || void 0 === _instance46 ? void 0 : _instance46.selectRowsByIndexes(indexes)
    }, []);
    var __showColumnChooser = (0, _hooks.useCallback)(function() {
        var _instance47;
        return null === (_instance47 = __instance()) || void 0 === _instance47 ? void 0 : _instance47.showColumnChooser()
    }, []);
    var __undeleteRow = (0, _hooks.useCallback)(function(rowIndex) {
        var _instance48;
        return null === (_instance48 = __instance()) || void 0 === _instance48 ? void 0 : _instance48.undeleteRow(rowIndex)
    }, []);
    var __updateDimensions = (0, _hooks.useCallback)(function() {
        var _instance49;
        return null === (_instance49 = __instance()) || void 0 === _instance49 ? void 0 : _instance49.updateDimensions()
    }, []);
    var __addColumn = (0, _hooks.useCallback)(function(columnOptions) {
        var _instance50;
        return null === (_instance50 = __instance()) || void 0 === _instance50 ? void 0 : _instance50.addColumn(columnOptions)
    }, []);
    var __addRow = (0, _hooks.useCallback)(function() {
        var _instance51;
        return null === (_instance51 = __instance()) || void 0 === _instance51 ? void 0 : _instance51.addRow()
    }, []);
    var __clearGrouping = (0, _hooks.useCallback)(function() {
        var _instance52;
        return null === (_instance52 = __instance()) || void 0 === _instance52 ? void 0 : _instance52.clearGrouping()
    }, []);
    var __collapseAll = (0, _hooks.useCallback)(function(groupIndex) {
        var _instance53;
        return null === (_instance53 = __instance()) || void 0 === _instance53 ? void 0 : _instance53.collapseAll(groupIndex)
    }, []);
    var __collapseRow = (0, _hooks.useCallback)(function(key) {
        var _instance54;
        return null === (_instance54 = __instance()) || void 0 === _instance54 ? void 0 : _instance54.collapseRow(key)
    }, []);
    var __expandAll = (0, _hooks.useCallback)(function(groupIndex) {
        var _instance55;
        return null === (_instance55 = __instance()) || void 0 === _instance55 ? void 0 : _instance55.expandAll(groupIndex)
    }, []);
    var __expandRow = (0, _hooks.useCallback)(function(key) {
        var _instance56;
        return null === (_instance56 = __instance()) || void 0 === _instance56 ? void 0 : _instance56.expandRow(key)
    }, []);
    var __exportToExcel = (0, _hooks.useCallback)(function(selectionOnly) {
        var _instance57;
        return null === (_instance57 = __instance()) || void 0 === _instance57 ? void 0 : _instance57.exportToExcel(selectionOnly)
    }, []);
    var __getSelectedRowKeys = (0, _hooks.useCallback)(function() {
        var _instance58;
        return null === (_instance58 = __instance()) || void 0 === _instance58 ? void 0 : _instance58.getSelectedRowKeys()
    }, []);
    var __getSelectedRowsData = (0, _hooks.useCallback)(function() {
        var _instance59;
        return null === (_instance59 = __instance()) || void 0 === _instance59 ? void 0 : _instance59.getSelectedRowsData()
    }, []);
    var __getTotalSummaryValue = (0, _hooks.useCallback)(function(summaryItemName) {
        var _instance60;
        return null === (_instance60 = __instance()) || void 0 === _instance60 ? void 0 : _instance60.getTotalSummaryValue(summaryItemName)
    }, []);
    var __getVisibleColumns = (0, _hooks.useCallback)(function(headerLevel) {
        var _instance61;
        return null === (_instance61 = __instance()) || void 0 === _instance61 ? void 0 : _instance61.getVisibleColumns(headerLevel)
    }, []);
    var __getVisibleRows = (0, _hooks.useCallback)(function() {
        var _instance62;
        return null === (_instance62 = __instance()) || void 0 === _instance62 ? void 0 : _instance62.getVisibleRows()
    }, []);
    var __isRowExpanded = (0, _hooks.useCallback)(function(key) {
        var _instance63;
        return null === (_instance63 = __instance()) || void 0 === _instance63 ? void 0 : _instance63.isRowExpanded(key)
    }, []);
    var __totalCount = (0, _hooks.useCallback)(function() {
        var _instance64;
        return null === (_instance64 = __instance()) || void 0 === _instance64 ? void 0 : _instance64.totalCount()
    }, []);
    var __getController = (0, _hooks.useCallback)(function(name) {
        var _instance65;
        return null === (_instance65 = __instance()) || void 0 === _instance65 ? void 0 : _instance65.getController(name)
    }, []);
    (0, _hooks.useImperativeHandle)(ref, function() {
        return {
            beginCustomLoading: __beginCustomLoading,
            byKey: __byKey,
            cancelEditData: __cancelEditData,
            cellValue: __cellValue,
            clearFilter: __clearFilter,
            clearSelection: __clearSelection,
            clearSorting: __clearSorting,
            closeEditCell: __closeEditCell,
            collapseAdaptiveDetailRow: __collapseAdaptiveDetailRow,
            columnCount: __columnCount,
            columnOption: __columnOption,
            deleteColumn: __deleteColumn,
            deleteRow: __deleteRow,
            deselectAll: __deselectAll,
            deselectRows: __deselectRows,
            editCell: __editCell,
            editRow: __editRow,
            endCustomLoading: __endCustomLoading,
            expandAdaptiveDetailRow: __expandAdaptiveDetailRow,
            filter: __filter,
            focus: __focus,
            getCellElement: __getCellElement,
            getCombinedFilter: __getCombinedFilter,
            getDataSource: __getDataSource,
            getKeyByRowIndex: __getKeyByRowIndex,
            getRowElement: __getRowElement,
            getRowIndexByKey: __getRowIndexByKey,
            getScrollable: __getScrollable,
            getVisibleColumnIndex: __getVisibleColumnIndex,
            hasEditData: __hasEditData,
            hideColumnChooser: __hideColumnChooser,
            isAdaptiveDetailRowExpanded: __isAdaptiveDetailRowExpanded,
            isRowFocused: __isRowFocused,
            isRowSelected: __isRowSelected,
            keyOf: __keyOf,
            navigateToRow: __navigateToRow,
            pageCount: __pageCount,
            pageIndex: __pageIndex,
            pageSize: __pageSize,
            refresh: __refresh,
            repaintRows: __repaintRows,
            saveEditData: __saveEditData,
            searchByText: __searchByText,
            selectAll: __selectAll,
            selectRows: __selectRows,
            selectRowsByIndexes: __selectRowsByIndexes,
            showColumnChooser: __showColumnChooser,
            undeleteRow: __undeleteRow,
            updateDimensions: __updateDimensions,
            addColumn: __addColumn,
            addRow: __addRow,
            clearGrouping: __clearGrouping,
            collapseAll: __collapseAll,
            collapseRow: __collapseRow,
            expandAll: __expandAll,
            expandRow: __expandRow,
            exportToExcel: __exportToExcel,
            getSelectedRowKeys: __getSelectedRowKeys,
            getSelectedRowsData: __getSelectedRowsData,
            getTotalSummaryValue: __getTotalSummaryValue,
            getVisibleColumns: __getVisibleColumns,
            getVisibleRows: __getVisibleRows,
            isRowExpanded: __isRowExpanded,
            totalCount: __totalCount,
            getController: __getController
        }
    }, [__beginCustomLoading, __byKey, __cancelEditData, __cellValue, __clearFilter, __clearSelection, __clearSorting, __closeEditCell, __collapseAdaptiveDetailRow, __columnCount, __columnOption, __deleteColumn, __deleteRow, __deselectAll, __deselectRows, __editCell, __editRow, __endCustomLoading, __expandAdaptiveDetailRow, __filter, __focus, __getCellElement, __getCombinedFilter, __getDataSource, __getKeyByRowIndex, __getRowElement, __getRowIndexByKey, __getScrollable, __getVisibleColumnIndex, __hasEditData, __hideColumnChooser, __isAdaptiveDetailRowExpanded, __isRowFocused, __isRowSelected, __keyOf, __navigateToRow, __pageCount, __pageIndex, __pageSize, __refresh, __repaintRows, __saveEditData, __searchByText, __selectAll, __selectRows, __selectRowsByIndexes, __showColumnChooser, __undeleteRow, __updateDimensions, __addColumn, __addRow, __clearGrouping, __collapseAll, __collapseRow, __expandAll, __expandRow, __exportToExcel, __getSelectedRowKeys, __getSelectedRowsData, __getTotalSummaryValue, __getVisibleColumns, __getVisibleRows, __isRowExpanded, __totalCount, __getController]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            filterValue: void 0 !== props.filterValue ? props.filterValue : __state_filterValue,
            focusedColumnIndex: void 0 !== props.focusedColumnIndex ? props.focusedColumnIndex : __state_focusedColumnIndex,
            focusedRowIndex: void 0 !== props.focusedRowIndex ? props.focusedRowIndex : __state_focusedRowIndex,
            focusedRowKey: void 0 !== props.focusedRowKey ? props.focusedRowKey : __state_focusedRowKey,
            selectedRowKeys: void 0 !== props.selectedRowKeys ? props.selectedRowKeys : __state_selectedRowKeys,
            selectionFilter: void 0 !== props.selectionFilter ? props.selectionFilter : __state_selectionFilter,
            rowTemplate: getTemplate(props.rowTemplate)
        }),
        domComponentRef: __domComponentRef,
        instance: __instance(),
        restAttributes: __restAttributes()
    })
});
exports.DataGrid = DataGrid;
DataGrid.defaultProps = _objectSpread({}, _props.DataGridProps);
