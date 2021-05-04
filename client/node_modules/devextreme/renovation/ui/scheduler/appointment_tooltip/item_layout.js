/**
 * DevExtreme (renovation/ui/scheduler/appointment_tooltip/item_layout.js)
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
exports.TooltipItemLayout = TooltipItemLayout;
exports.TooltipItemLayoutProps = exports.viewFunction = void 0;
var _noop = _interopRequireDefault(require("../../../utils/noop"));
var _marker = require("./marker");
var _button = require("../../button");
var _item_content = require("./item_content");
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
    var useTemplate = !!viewModel.props.itemContentTemplate;
    return Preact.h(Preact.Fragment, null, useTemplate && viewModel.props.itemContentTemplate({
        model: {
            appointmentData: viewModel.props.item.data,
            targetedAppointmentData: viewModel.currentAppointment
        },
        index: viewModel.props.index
    }), !useTemplate && Preact.h("div", _extends({
        className: "dx-tooltip-appointment-item ".concat(viewModel.props.className)
    }, viewModel.restAttributes), Preact.h(_marker.Marker, {
        color: viewModel.props.item.color
    }), Preact.h(_item_content.TooltipItemContent, {
        text: viewModel.formattedContent.text,
        formattedDate: viewModel.formattedContent.formatDate
    }), viewModel.props.showDeleteButton && Preact.h("div", {
        className: "dx-tooltip-appointment-item-delete-button-container"
    }, Preact.h(_button.Button, {
        className: "dx-tooltip-appointment-item-delete-button",
        icon: "trash",
        stylingMode: "text",
        onClick: viewModel.onDeleteButtonClick
    }))))
};
exports.viewFunction = viewFunction;
var TooltipItemLayoutProps = {
    className: "",
    item: {
        data: {}
    },
    showDeleteButton: true,
    onDelete: _noop.default,
    onHide: _noop.default,
    getTextAndFormatDate: _default_functions.defaultGetTextAndFormatDate
};
exports.TooltipItemLayoutProps = TooltipItemLayoutProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};

function TooltipItemLayout(props) {
    var __currentAppointment = (0, _hooks.useCallback)(function() {
        var item = props.item;
        return (0, _get_current_appointment.default)(item)
    }, [props.item]);
    var __onDeleteButtonClick = (0, _hooks.useCallback)(function() {
        var item = props.item,
            onDelete = props.onDelete,
            onHide = props.onHide,
            singleAppointment = props.singleAppointment;
        return function(e) {
            onHide();
            e.event.stopPropagation();
            onDelete(item.data, singleAppointment)
        }
    }, [props.item, props.onDelete, props.onHide, props.singleAppointment]);
    var __formattedContent = (0, _hooks.useCallback)(function() {
        var getTextAndFormatDate = props.getTextAndFormatDate,
            item = props.item;
        var data = item.data;
        return getTextAndFormatDate(data, __currentAppointment())
    }, [props.getTextAndFormatDate, props.item]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.className, props.getTextAndFormatDate, props.index, props.item, props.itemContentTemplate, props.onDelete, props.onHide, props.showDeleteButton, props.singleAppointment, _objectWithoutProperties(props, ["className", "getTextAndFormatDate", "index", "item", "itemContentTemplate", "onDelete", "onHide", "showDeleteButton", "singleAppointment"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            itemContentTemplate: getTemplate(props.itemContentTemplate)
        }),
        currentAppointment: __currentAppointment(),
        onDeleteButtonClick: __onDeleteButtonClick(),
        formattedContent: __formattedContent(),
        restAttributes: __restAttributes()
    })
}
TooltipItemLayout.defaultProps = _objectSpread({}, TooltipItemLayoutProps);
