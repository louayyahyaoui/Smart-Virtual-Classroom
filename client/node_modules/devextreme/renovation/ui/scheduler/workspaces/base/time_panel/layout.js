/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/time_panel/layout.js)
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
exports.TimePanelTableLayout = TimePanelTableLayout;
exports.TimePanelTableLayoutProps = exports.viewFunction = void 0;
var _row = require("../row");
var _cell = require("./cell");
var _cell2 = require("../cell");
var _utils = require("../../utils");
var _table = require("../table");
var _layout_props = require("../layout_props");
var _title = require("../date_table/all_day_panel/title");
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
    var bottomVirtualRowHeight = _ref.bottomVirtualRowHeight,
        isVerticalGrouping = _ref.isVerticalGroupOrientation,
        isVirtual = _ref.isVirtual,
        props = _ref.props,
        restAttributes = _ref.restAttributes,
        topVirtualRowHeight = _ref.topVirtualRowHeight;
    var timeCellTemplate = props.timeCellTemplate,
        viewData = props.viewData;
    return Preact.h(_table.Table, _extends({}, restAttributes, {
        isVirtual: isVirtual,
        topVirtualRowHeight: topVirtualRowHeight,
        bottomVirtualRowHeight: bottomVirtualRowHeight,
        virtualCellsCount: 1,
        className: "dx-scheduler-time-panel"
    }), viewData.groupedData.map(function(_ref2, index) {
        var dateTable = _ref2.dateTable,
            groupIndex = _ref2.groupIndex;
        return Preact.h(Preact.Fragment, {
            key: (0, _utils.getKeyByGroup)(groupIndex)
        }, (0, _utils.getIsGroupedAllDayPanel)(viewData, index) && Preact.h(_row.Row, null, Preact.h(_cell2.CellBase, {
            className: "dx-scheduler-time-panel-title-cell"
        }, Preact.h(_title.AllDayPanelTitle, null))), dateTable.map(function(cellsRow) {
            var cellCountInGroupRow = viewData.cellCountInGroupRow;
            var _cellsRow$ = cellsRow[0],
                groups = _cellsRow$.groups,
                cellIndex = _cellsRow$.index,
                isFirstGroupCell = _cellsRow$.isFirstGroupCell,
                isLastGroupCell = _cellsRow$.isLastGroupCell,
                key = _cellsRow$.key,
                startDate = _cellsRow$.startDate,
                text = _cellsRow$.text;
            return Preact.h(_row.Row, {
                className: "dx-scheduler-time-panel-row",
                key: key
            }, Preact.h(_cell.TimePanelCell, {
                startDate: startDate,
                text: text,
                groups: isVerticalGrouping ? groups : void 0,
                groupIndex: isVerticalGrouping ? groupIndex : void 0,
                isFirstGroupCell: isVerticalGrouping && isFirstGroupCell,
                isLastGroupCell: isVerticalGrouping && isLastGroupCell,
                index: Math.floor(cellIndex / cellCountInGroupRow),
                timeCellTemplate: timeCellTemplate
            }))
        }))
    }))
};
exports.viewFunction = viewFunction;
var TimePanelTableLayoutProps = _objectSpread(_objectSpread({}, _layout_props.LayoutProps), {}, {
    className: "",
    allDayPanelVisible: false
});
exports.TimePanelTableLayoutProps = TimePanelTableLayoutProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};

function TimePanelTableLayout(props) {
    var __isVirtual = (0, _hooks.useCallback)(function() {
        var viewData = props.viewData;
        return !!viewData.isVirtual
    }, [props.viewData]);
    var __topVirtualRowHeight = (0, _hooks.useCallback)(function() {
        return props.viewData.topVirtualRowHeight || 0
    }, [props.viewData]);
    var __bottomVirtualRowHeight = (0, _hooks.useCallback)(function() {
        return props.viewData.bottomVirtualRowHeight || 0
    }, [props.viewData]);
    var __isVerticalGroupOrientation = (0, _hooks.useCallback)(function() {
        var groupOrientation = props.groupOrientation;
        return (0, _utils.isVerticalGroupOrientation)(groupOrientation)
    }, [props.groupOrientation]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.allDayPanelVisible, props.className, props.dataCellTemplate, props.groupOrientation, props.timeCellTemplate, props.viewData, _objectWithoutProperties(props, ["allDayPanelVisible", "className", "dataCellTemplate", "groupOrientation", "timeCellTemplate", "viewData"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            timeCellTemplate: getTemplate(props.timeCellTemplate),
            dataCellTemplate: getTemplate(props.dataCellTemplate)
        }),
        isVirtual: __isVirtual(),
        topVirtualRowHeight: __topVirtualRowHeight(),
        bottomVirtualRowHeight: __bottomVirtualRowHeight(),
        isVerticalGroupOrientation: __isVerticalGroupOrientation(),
        restAttributes: __restAttributes()
    })
}
TimePanelTableLayout.defaultProps = _objectSpread({}, TimePanelTableLayoutProps);
