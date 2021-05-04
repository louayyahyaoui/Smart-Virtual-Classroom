/**
 * DevExtreme (renovation/ui/scheduler/appointment_tooltip/appointment_list.js)
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
exports.AppointmentList = AppointmentList;
exports.AppointmentListProps = exports.viewFunction = void 0;
var _noop = _interopRequireDefault(require("../../../utils/noop"));
var _list = require("../../list");
var _item_layout = require("./item_layout");
var _get_current_appointment = _interopRequireDefault(require("./utils/get_current_appointment"));
var _default_functions = require("./utils/default_functions");
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
    return Preact.h(_list.List, _extends({
        itemTemplate: function(_ref) {
            var index = _ref.index,
                item = _ref.item;
            return Preact.h(_item_layout.TooltipItemLayout, {
                item: item,
                index: index,
                onDelete: viewModel.props.checkAndDeleteAppointment,
                onHide: viewModel.props.onHide,
                itemContentTemplate: viewModel.props.itemContentTemplate,
                getTextAndFormatDate: viewModel.props.getTextAndFormatDate,
                singleAppointment: viewModel.props.getSingleAppointmentData(item.data, viewModel.props.target),
                showDeleteButton: viewModel.props.isEditingAllowed && !item.data.disabled
            })
        },
        dataSource: viewModel.props.appointments,
        focusStateEnabled: viewModel.props.focusStateEnabled,
        onItemClick: viewModel.onItemClick
    }, viewModel.restAttributes))
};
exports.viewFunction = viewFunction;
var AppointmentListProps = {
    isEditingAllowed: true,
    focusStateEnabled: false,
    showAppointmentPopup: _noop.default,
    onHide: _noop.default,
    checkAndDeleteAppointment: _noop.default,
    getTextAndFormatDate: _default_functions.defaultGetTextAndFormatDate,
    getSingleAppointmentData: _default_functions.defaultGetSingleAppointment
};
exports.AppointmentListProps = AppointmentListProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};

function AppointmentList(props) {
    var __onItemClick = (0, _hooks.useCallback)(function() {
        return function(_ref2) {
            var itemData = _ref2.itemData;
            var showAppointmentPopup = props.showAppointmentPopup;
            showAppointmentPopup(itemData.data, false, (0, _get_current_appointment.default)(itemData))
        }
    }, [props.showAppointmentPopup]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.appointments, props.checkAndDeleteAppointment, props.focusStateEnabled, props.getSingleAppointmentData, props.getTextAndFormatDate, props.isEditingAllowed, props.itemContentTemplate, props.onHide, props.showAppointmentPopup, props.target, _objectWithoutProperties(props, ["appointments", "checkAndDeleteAppointment", "focusStateEnabled", "getSingleAppointmentData", "getTextAndFormatDate", "isEditingAllowed", "itemContentTemplate", "onHide", "showAppointmentPopup", "target"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            itemContentTemplate: getTemplate(props.itemContentTemplate)
        }),
        onItemClick: __onItemClick(),
        restAttributes: __restAttributes()
    })
}
AppointmentList.defaultProps = _objectSpread({}, AppointmentListProps);
