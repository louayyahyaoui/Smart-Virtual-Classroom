/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/table.js)
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
exports.Table = Table;
exports.TableProps = exports.viewFunction = void 0;
var _utils = require("../utils");
var _virtualRow = require("./virtual-row");
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
    var hasBottomVirtualRow = _ref.hasBottomVirtualRow,
        hasTopVirtualRow = _ref.hasTopVirtualRow,
        _ref$props = _ref.props,
        bottomVirtualRowHeight = _ref$props.bottomVirtualRowHeight,
        children = _ref$props.children,
        className = _ref$props.className,
        topVirtualRowHeight = _ref$props.topVirtualRowHeight,
        virtualCellsCount = _ref$props.virtualCellsCount,
        restAttributes = _ref.restAttributes,
        style = _ref.style;
    return Preact.h("table", _extends({}, restAttributes, {
        className: className,
        style: style
    }), Preact.h("tbody", null, hasTopVirtualRow && hasBottomVirtualRow && Preact.h(Preact.Fragment, null, Preact.h(_virtualRow.VirtualRow, {
        height: topVirtualRowHeight,
        cellsCount: virtualCellsCount
    }), children, Preact.h(_virtualRow.VirtualRow, {
        height: bottomVirtualRowHeight,
        cellsCount: virtualCellsCount
    })), hasTopVirtualRow && !hasBottomVirtualRow && Preact.h(Preact.Fragment, null, Preact.h(_virtualRow.VirtualRow, {
        height: topVirtualRowHeight,
        cellsCount: virtualCellsCount
    }), children), !hasTopVirtualRow && hasBottomVirtualRow && Preact.h(Preact.Fragment, null, children, Preact.h(_virtualRow.VirtualRow, {
        height: bottomVirtualRowHeight,
        cellsCount: virtualCellsCount
    })), !hasTopVirtualRow && !hasBottomVirtualRow && Preact.h(Preact.Fragment, null, children)))
};
exports.viewFunction = viewFunction;
var TableProps = {
    className: "",
    topVirtualRowHeight: 0,
    bottomVirtualRowHeight: 0,
    virtualCellsCount: 0,
    isVirtual: false
};
exports.TableProps = TableProps;

function Table(props) {
    var __style = (0, _hooks.useCallback)(function() {
        var height = props.height;
        var _restAttributes = __restAttributes(),
            style = _restAttributes.style;
        return (0, _utils.addHeightToStyle)(height, style)
    }, [props.height]);
    var __hasTopVirtualRow = (0, _hooks.useCallback)(function() {
        var isVirtual = props.isVirtual,
            topVirtualRowHeight = props.topVirtualRowHeight;
        return !!isVirtual && !!topVirtualRowHeight
    }, [props.isVirtual, props.topVirtualRowHeight]);
    var __hasBottomVirtualRow = (0, _hooks.useCallback)(function() {
        var bottomVirtualRowHeight = props.bottomVirtualRowHeight,
            isVirtual = props.isVirtual;
        return !!isVirtual && !!bottomVirtualRowHeight
    }, [props.bottomVirtualRowHeight, props.isVirtual]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.bottomVirtualRowHeight, props.children, props.className, props.height, props.isVirtual, props.topVirtualRowHeight, props.virtualCellsCount, _objectWithoutProperties(props, ["bottomVirtualRowHeight", "children", "className", "height", "isVirtual", "topVirtualRowHeight", "virtualCellsCount"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread({}, props),
        style: __style(),
        hasTopVirtualRow: __hasTopVirtualRow(),
        hasBottomVirtualRow: __hasBottomVirtualRow(),
        restAttributes: __restAttributes()
    })
}
Table.defaultProps = _objectSpread({}, TableProps);
