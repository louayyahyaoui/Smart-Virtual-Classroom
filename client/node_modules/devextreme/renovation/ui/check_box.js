/**
 * DevExtreme (renovation/ui/check_box.js)
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
exports.defaultOptions = defaultOptions;
exports.CheckBox = exports.defaultOptionRules = exports.CheckBoxProps = exports.viewFunction = void 0;
var _utils = require("../../core/options/utils");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _ink_ripple = require("./common/ink_ripple");
var _widget = require("./common/widget");
var _themes = require("../../ui/themes");
var _base_props = _interopRequireDefault(require("../utils/base_props"));
var _combine_classes = require("../utils/combine_classes");
var _noop = _interopRequireDefault(require("../utils/noop"));
var _validation_message = require("./validation_message");
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
var getCssClasses = function(model) {
    var isValid = model.isValid,
        readOnly = model.readOnly,
        text = model.text,
        value = model.value;
    var checked = value;
    var indeterminate = null === checked;
    var classesMap = {
        "dx-checkbox": true,
        "dx-state-readonly": !!readOnly,
        "dx-checkbox-checked": !!checked,
        "dx-checkbox-has-text": !!text,
        "dx-invalid": !isValid,
        "dx-checkbox-indeterminate": indeterminate
    };
    return (0, _combine_classes.combineClasses)(classesMap)
};
var inkRippleConfig = {
    waveSizeCoefficient: 2.5,
    useHoldAnimation: false,
    wavesNumber: 2,
    isCentered: true
};
var viewFunction = function(viewModel) {
    var _viewModel$props = viewModel.props,
        name = _viewModel$props.name,
        text = _viewModel$props.text;
    return Preact.h(_widget.Widget, _extends({
        ref: viewModel.widgetRef,
        rootElementRef: viewModel.target,
        accessKey: viewModel.props.accessKey,
        activeStateEnabled: viewModel.props.activeStateEnabled,
        classes: viewModel.cssClasses,
        disabled: viewModel.props.disabled,
        focusStateEnabled: viewModel.props.focusStateEnabled,
        height: viewModel.props.height,
        hint: viewModel.props.hint,
        hoverStateEnabled: viewModel.props.hoverStateEnabled,
        onActive: viewModel.onActive,
        onFocusIn: viewModel.onFocusIn,
        onFocusOut: viewModel.onFocusOut,
        aria: viewModel.aria,
        onContentReady: viewModel.props.onContentReady,
        onClick: viewModel.onWidgetClick,
        onInactive: viewModel.onInactive,
        onKeyDown: viewModel.onWidgetKeyDown,
        rtlEnabled: viewModel.props.rtlEnabled,
        tabIndex: viewModel.props.tabIndex,
        visible: viewModel.props.visible,
        width: viewModel.props.width
    }, viewModel.restAttributes), Preact.h("input", _extends({
        ref: viewModel.inputRef,
        type: "hidden",
        value: "".concat(viewModel.props.value)
    }, name && {
        name: name
    })), Preact.h("div", {
        className: "dx-checkbox-container"
    }, Preact.h("span", {
        className: "dx-checkbox-icon",
        ref: viewModel.iconRef
    }), text && Preact.h("span", {
        className: "dx-checkbox-text"
    }, text)), viewModel.props.useInkRipple && Preact.h(_ink_ripple.InkRipple, {
        config: inkRippleConfig,
        ref: viewModel.inkRippleRef
    }), viewModel.rendered && viewModel.shouldShowValidationMessage && Preact.h(_validation_message.ValidationMessage, {
        validationErrors: viewModel.validationErrors,
        mode: viewModel.props.validationMessageMode,
        positionRequest: "below",
        rtlEnabled: viewModel.props.rtlEnabled,
        target: viewModel.target,
        boundary: viewModel.target,
        container: viewModel.target
    }))
};
exports.viewFunction = viewFunction;
var CheckBoxProps = _objectSpread(_objectSpread({}, _base_props.default), {}, {
    activeStateEnabled: true,
    hoverStateEnabled: true,
    validationError: null,
    validationErrors: null,
    text: "",
    validationMessageMode: "auto",
    validationStatus: "valid",
    name: "",
    readOnly: false,
    isValid: true,
    useInkRipple: false,
    saveValueChangeEvent: _noop.default,
    defaultValue: false,
    valueChange: function() {}
});
exports.CheckBoxProps = CheckBoxProps;
var defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
    device: function() {
        return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
    },
    options: {
        focusStateEnabled: true
    }
}, {
    device: function() {
        return (0, _themes.isMaterial)((0, _themes.current)())
    },
    options: {
        useInkRipple: true
    }
}]);
exports.defaultOptionRules = defaultOptionRules;
var CheckBox = (0, _compat.forwardRef)(function(props, ref) {
    var __iconRef = (0, _hooks.useRef)();
    var __inputRef = (0, _hooks.useRef)();
    var __target = (0, _hooks.useRef)();
    var __inkRippleRef = (0, _hooks.useRef)();
    var __widgetRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(function() {
            return void 0 !== props.value ? props.value : props.defaultValue
        }),
        _useState2 = _slicedToArray(_useState, 2),
        __state_value = _useState2[0],
        __state_setValue = _useState2[1];
    var _useState3 = (0, _hooks.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        __state_rendered = _useState4[0],
        __state_setRendered = _useState4[1];
    var __onActive = (0, _hooks.useCallback)(function(event) {
        __wave(event, "showWave", 1)
    }, [props.useInkRipple]);
    var __onInactive = (0, _hooks.useCallback)(function(event) {
        __wave(event, "hideWave", 1)
    }, [props.useInkRipple]);
    var __onFocusIn = (0, _hooks.useCallback)(function(event) {
        var onFocusIn = props.onFocusIn;
        __wave(event, "showWave", 0);
        null === onFocusIn || void 0 === onFocusIn ? void 0 : onFocusIn(event)
    }, [props.onFocusIn, props.useInkRipple]);
    var __onFocusOut = (0, _hooks.useCallback)(function(event) {
        __wave(event, "hideWave", 0)
    }, [props.useInkRipple]);
    var __onWidgetClick = (0, _hooks.useCallback)(function(event) {
        var readOnly = props.readOnly,
            saveValueChangeEvent = props.saveValueChangeEvent;
        if (!readOnly) {
            null === saveValueChangeEvent || void 0 === saveValueChangeEvent ? void 0 : saveValueChangeEvent(event);
            __state_setValue(function(__state_value) {
                return !(void 0 !== props.value ? props.value : __state_value)
            }), props.valueChange(!(void 0 !== props.value ? props.value : __state_value))
        }
    }, [props.readOnly, props.saveValueChangeEvent, props.value, __state_value, props.valueChange]);
    var __onWidgetKeyDown = (0, _hooks.useCallback)(function(options) {
        var onKeyDown = props.onKeyDown;
        var keyName = options.keyName,
            originalEvent = options.originalEvent,
            which = options.which;
        var result = null === onKeyDown || void 0 === onKeyDown ? void 0 : onKeyDown(options);
        if (null !== result && void 0 !== result && result.cancel) {
            return result
        }
        if ("space" === keyName || "space" === which) {
            originalEvent.preventDefault();
            __onWidgetClick(originalEvent)
        }
        return
    }, [props.onKeyDown, props.readOnly, props.saveValueChangeEvent, props.value, __state_value, props.valueChange]);
    var __cssClasses = (0, _hooks.useCallback)(function() {
        return getCssClasses(_objectSpread(_objectSpread({}, props), {}, {
            value: void 0 !== props.value ? props.value : __state_value
        }))
    }, [props, __state_value]);
    var __shouldShowValidationMessage = (0, _hooks.useCallback)(function() {
        var _validationErrors;
        var isValid = props.isValid,
            validationStatus = props.validationStatus;
        return !isValid && "invalid" === validationStatus && !!(null !== (_validationErrors = __validationErrors()) && void 0 !== _validationErrors && _validationErrors.length)
    }, [props.isValid, props.validationStatus, props.validationError, props.validationErrors]);
    var __aria = (0, _hooks.useCallback)(function() {
        var isValid = props.isValid,
            readOnly = props.readOnly;
        var checked = !!(void 0 !== props.value ? props.value : __state_value);
        var indeterminate = null === (void 0 !== props.value ? props.value : __state_value);
        return {
            role: "checkbox",
            checked: indeterminate ? "mixed" : "".concat(checked),
            readonly: readOnly ? "true" : "false",
            invalid: !isValid ? "true" : "false",
            describedby: __shouldShowValidationMessage() ? "dx-".concat(new _guid.default) : void 0
        }
    }, [props.isValid, props.readOnly, props.value, __state_value, props.validationStatus, props.validationError, props.validationErrors]);
    var __validationErrors = (0, _hooks.useCallback)(function() {
        var validationError = props.validationError,
            validationErrors = props.validationErrors;
        var allValidationErrors = validationErrors;
        if (!allValidationErrors && validationError) {
            allValidationErrors = [validationError]
        }
        return allValidationErrors
    }, [props.validationError, props.validationErrors]);
    var __wave = (0, _hooks.useCallback)(function(event, type, waveId) {
        var useInkRipple = props.useInkRipple;
        useInkRipple && __inkRippleRef.current[type]({
            element: __iconRef.current,
            event: event,
            wave: waveId
        })
    }, [props.useInkRipple]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$value = _objectSpread(_objectSpread({}, props), {}, {
                value: void 0 !== props.value ? props.value : __state_value
            }),
            restProps = (_props$value.accessKey, _props$value.activeStateEnabled, _props$value.defaultValue, _props$value.disabled, _props$value.focusStateEnabled, _props$value.height, _props$value.hint, _props$value.hoverStateEnabled, _props$value.isValid, _props$value.name, _props$value.onClick, _props$value.onContentReady, _props$value.onFocusIn, _props$value.onKeyDown, _props$value.readOnly, _props$value.rtlEnabled, _props$value.saveValueChangeEvent, _props$value.tabIndex, _props$value.text, _props$value.useInkRipple, _props$value.validationError, _props$value.validationErrors, _props$value.validationMessageMode, _props$value.validationStatus, _props$value.value, _props$value.valueChange, _props$value.visible, _props$value.width, _objectWithoutProperties(_props$value, ["accessKey", "activeStateEnabled", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "isValid", "name", "onClick", "onContentReady", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "useInkRipple", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"]));
        return restProps
    }, [props, __state_value]);
    var __focus = (0, _hooks.useCallback)(function() {
        __widgetRef.current.focus()
    }, []);
    (0, _hooks.useEffect)(function() {
        __state_setRendered(function(__state_rendered) {
            return true
        })
    }, []);
    (0, _hooks.useEffect)(function() {
        var onContentReady = props.onContentReady;
        null === onContentReady || void 0 === onContentReady ? void 0 : onContentReady({})
    }, [props.onContentReady]);
    (0, _hooks.useImperativeHandle)(ref, function() {
        return {
            focus: __focus
        }
    }, [__focus]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            value: void 0 !== props.value ? props.value : __state_value
        }),
        rendered: __state_rendered,
        iconRef: __iconRef,
        inputRef: __inputRef,
        target: __target,
        inkRippleRef: __inkRippleRef,
        widgetRef: __widgetRef,
        onActive: __onActive,
        onInactive: __onInactive,
        onFocusIn: __onFocusIn,
        onFocusOut: __onFocusOut,
        onWidgetClick: __onWidgetClick,
        onWidgetKeyDown: __onWidgetKeyDown,
        cssClasses: __cssClasses(),
        shouldShowValidationMessage: __shouldShowValidationMessage(),
        aria: __aria(),
        validationErrors: __validationErrors(),
        wave: __wave,
        restAttributes: __restAttributes()
    })
});
exports.CheckBox = CheckBox;

function __processTwoWayProps(defaultProps) {
    var twoWayProps = ["value"];
    return Object.keys(defaultProps).reduce(function(props, propName) {
        var propValue = defaultProps[propName];
        var defaultPropName = twoWayProps.some(function(p) {
            return p === propName
        }) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
        props[defaultPropName] = propValue;
        return props
    }, {})
}

function __createDefaultProps() {
    return _objectSpread(_objectSpread({}, CheckBoxProps), __processTwoWayProps((0, _utils.convertRulesToOptions)(defaultOptionRules)))
}
CheckBox.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    CheckBox.defaultProps = _objectSpread(_objectSpread({}, __createDefaultProps()), __processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)))
}
