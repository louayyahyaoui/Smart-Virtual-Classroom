/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/date_table/table_body.js)
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
exports.DateTableBody = DateTableBody;
exports.DateTableBodyProps = exports.viewFunction = void 0;
var _row = require("../row");
var _utils = require("../../utils");
var _layout_props = require("../layout_props");
var _table_body = require("./all_day_panel/table_body");
var _cell = require("../../month/date_table/cell");
var _cell2 = require("./cell");
var Preact = _interopRequireWildcard(require("preact"));
var _hooks = require("preact/hooks");

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
var viewFunction = function(_ref) {
    var Cell = _ref.cell,
        props = _ref.props;
    var dataCellTemplate = props.dataCellTemplate,
        viewData = props.viewData;
    return Preact.h(Preact.Fragment, null, viewData.groupedData.map(function(_ref2, index) {
        var allDayPanel = _ref2.allDayPanel,
            dateTable = _ref2.dateTable,
            groupIndex = _ref2.groupIndex;
        return Preact.h(Preact.Fragment, {
            key: (0, _utils.getKeyByGroup)(groupIndex)
        }, (0, _utils.getIsGroupedAllDayPanel)(viewData, index) && Preact.h(_table_body.AllDayPanelTableBody, {
            viewData: allDayPanel,
            dataCellTemplate: dataCellTemplate,
            isVerticalGroupOrientation: true
        }), dateTable.map(function(cellsRow) {
            return Preact.h(_row.Row, {
                className: "dx-scheduler-date-table-row",
                key: cellsRow[0].key
            }, cellsRow.map(function(_ref3) {
                var endDate = _ref3.endDate,
                    cellGroupIndex = _ref3.groupIndex,
                    groups = _ref3.groups,
                    cellIndex = _ref3.index,
                    isFirstGroupCell = _ref3.isFirstGroupCell,
                    isLastGroupCell = _ref3.isLastGroupCell,
                    key = _ref3.key,
                    startDate = _ref3.startDate;
                return Preact.h(Cell, {
                    isFirstGroupCell: isFirstGroupCell,
                    isLastGroupCell: isLastGroupCell,
                    startDate: startDate,
                    endDate: endDate,
                    groups: groups,
                    groupIndex: cellGroupIndex,
                    index: cellIndex,
                    dataCellTemplate: dataCellTemplate,
                    key: key
                })
            }))
        }))
    }))
};
exports.viewFunction = viewFunction;
var DateTableBodyProps = _objectSpread({}, _layout_props.LayoutProps);
exports.DateTableBodyProps = DateTableBodyProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};

function DateTableBody(props) {
    var __cell = (0, _hooks.useCallback)(function() {
        var viewType = props.viewType;
        return "month" === viewType ? _cell.MonthDateTableCell : _cell2.DateTableCellBase
    }, [props.viewType]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.dataCellTemplate, props.groupOrientation, props.viewData, props.viewType, _objectWithoutProperties(props, ["dataCellTemplate", "groupOrientation", "viewData", "viewType"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            dataCellTemplate: getTemplate(props.dataCellTemplate)
        }),
        cell: __cell(),
        restAttributes: __restAttributes()
    })
}
DateTableBody.defaultProps = _objectSpread({}, DateTableBodyProps);
