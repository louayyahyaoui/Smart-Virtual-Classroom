/**
 * DevExtreme (renovation/ui/list.js)
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
exports.List = List;
exports.ListProps = exports.viewFunction = void 0;
var _widget = require("./common/widget");
var _list = _interopRequireDefault(require("../../ui/list"));
var _dom_component_wrapper = require("./common/dom_component_wrapper");
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
var viewFunction = function(_ref) {
    var _ref$props = _ref.props,
        rootElementRef = _ref$props.rootElementRef,
        componentProps = _objectWithoutProperties(_ref$props, ["rootElementRef"]),
        restAttributes = _ref.restAttributes;
    return Preact.h(_dom_component_wrapper.DomComponentWrapper, _extends({
        rootElementRef: rootElementRef,
        componentType: _list.default,
        componentProps: componentProps
    }, restAttributes))
};
exports.viewFunction = viewFunction;
var ListProps = _objectSpread({}, _widget.WidgetProps);
exports.ListProps = ListProps;

function List(props) {
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$rootElementRef2;
        var _props$rootElementRef = _objectSpread(_objectSpread({}, props), {}, {
                rootElementRef: null === (_props$rootElementRef2 = props.rootElementRef) || void 0 === _props$rootElementRef2 ? void 0 : _props$rootElementRef2.current
            }),
            restProps = (_props$rootElementRef._feedbackHideTimeout, _props$rootElementRef._feedbackShowTimeout, _props$rootElementRef.accessKey, _props$rootElementRef.activeStateEnabled, _props$rootElementRef.activeStateUnit, _props$rootElementRef.aria, _props$rootElementRef.children, _props$rootElementRef.className, _props$rootElementRef.classes, _props$rootElementRef.dataSource, _props$rootElementRef.disabled, _props$rootElementRef.focusStateEnabled, _props$rootElementRef.height, _props$rootElementRef.hint, _props$rootElementRef.hoverStateEnabled, _props$rootElementRef.itemTemplate, _props$rootElementRef.name, _props$rootElementRef.onActive, _props$rootElementRef.onClick, _props$rootElementRef.onContentReady, _props$rootElementRef.onDimensionChanged, _props$rootElementRef.onFocusIn, _props$rootElementRef.onFocusOut, _props$rootElementRef.onInactive, _props$rootElementRef.onItemClick, _props$rootElementRef.onKeyDown, _props$rootElementRef.onKeyboardHandled, _props$rootElementRef.onVisibilityChange, _props$rootElementRef.rootElementRef, _props$rootElementRef.rtlEnabled, _props$rootElementRef.tabIndex, _props$rootElementRef.visible, _props$rootElementRef.width, _objectWithoutProperties(_props$rootElementRef, ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "dataSource", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "itemTemplate", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onInactive", "onItemClick", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"]));
        return restProps
    }, [props]);
    return viewFunction({
        props: _objectSpread({}, props),
        restAttributes: __restAttributes()
    })
}
List.defaultProps = _objectSpread({}, ListProps);
