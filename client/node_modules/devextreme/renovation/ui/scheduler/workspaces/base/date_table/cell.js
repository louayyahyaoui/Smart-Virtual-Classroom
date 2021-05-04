/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/date_table/cell.js)
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
exports.DateTableCellBase = DateTableCellBase;
exports.DateTableCellBaseProps = exports.viewFunction = void 0;
var _cell = require("../cell");
var _combine_classes = require("../../../../../utils/combine_classes");
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
var viewFunction = function(viewModel) {
    return Preact.h(_cell.CellBase, _extends({}, viewModel.restAttributes, {
        isFirstGroupCell: viewModel.props.isFirstGroupCell,
        isLastGroupCell: viewModel.props.isLastGroupCell,
        contentTemplate: viewModel.props.dataCellTemplate,
        contentTemplateProps: viewModel.dataCellTemplateProps,
        className: viewModel.classes
    }), viewModel.props.children)
};
exports.viewFunction = viewFunction;
var DateTableCellBaseProps = _objectSpread({}, _cell.CellBaseProps);
exports.DateTableCellBaseProps = DateTableCellBaseProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};

function DateTableCellBase(props) {
    var __classes = (0, _hooks.useCallback)(function() {
        var allDay = props.allDay,
            className = props.className;
        return (0, _combine_classes.combineClasses)(_defineProperty({
            "dx-scheduler-cell-sizes-horizontal": true,
            "dx-scheduler-cell-sizes-vertical": !allDay,
            "dx-scheduler-date-table-cell": !allDay
        }, className, true))
    }, [props.allDay, props.className]);
    var __dataCellTemplateProps = (0, _hooks.useCallback)(function() {
        var allDay = props.allDay,
            endDate = props.endDate,
            groupIndex = props.groupIndex,
            groups = props.groups,
            index = props.index,
            startDate = props.startDate,
            text = props.text;
        return {
            data: {
                startDate: startDate,
                endDate: endDate,
                groups: groups,
                groupIndex: groups ? groupIndex : void 0,
                text: text || "",
                allDay: allDay || void 0
            },
            index: index
        }
    }, [props.allDay, props.endDate, props.groupIndex, props.groups, props.index, props.startDate, props.text]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.allDay, props.children, props.className, props.contentTemplate, props.contentTemplateProps, props.dataCellTemplate, props.endDate, props.groupIndex, props.groups, props.index, props.isFirstGroupCell, props.isLastGroupCell, props.startDate, props.text, _objectWithoutProperties(props, ["allDay", "children", "className", "contentTemplate", "contentTemplateProps", "dataCellTemplate", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            dataCellTemplate: getTemplate(props.dataCellTemplate),
            contentTemplate: getTemplate(props.contentTemplate)
        }),
        classes: __classes(),
        dataCellTemplateProps: __dataCellTemplateProps(),
        restAttributes: __restAttributes()
    })
}
DateTableCellBase.defaultProps = _objectSpread({}, DateTableCellBaseProps);
