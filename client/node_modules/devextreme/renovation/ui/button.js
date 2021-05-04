/**
 * DevExtreme (renovation/ui/button.js)
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
exports.Button = exports.defaultOptionRules = exports.ButtonProps = exports.viewFunction = void 0;
var _utils = require("../../core/options/utils");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _noop = _interopRequireDefault(require("../utils/noop"));
var _themes = require("../../ui/themes");
var _short = require("../../events/short");
var _combine_classes = require("../utils/combine_classes");
var _icon = require("../../core/utils/icon");
var _icon2 = require("./common/icon");
var _ink_ripple = require("./common/ink_ripple");
var _widget = require("./common/widget");
var _base_props = _interopRequireDefault(require("../utils/base_props"));
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
var stylingModes = ["outlined", "text", "contained"];
var getCssClasses = function(model) {
    var _classesMap;
    var icon = model.icon,
        iconPosition = model.iconPosition,
        stylingMode = model.stylingMode,
        text = model.text,
        type = model.type;
    var isValidStylingMode = stylingMode && stylingModes.indexOf(stylingMode) !== -1;
    var classesMap = (_classesMap = {
        "dx-button": true
    }, _defineProperty(_classesMap, "dx-button-mode-".concat(isValidStylingMode ? stylingMode : "contained"), true), _defineProperty(_classesMap, "dx-button-".concat(type || "normal"), true), _defineProperty(_classesMap, "dx-button-has-text", !!text), _defineProperty(_classesMap, "dx-button-has-icon", !!icon), _defineProperty(_classesMap, "dx-button-icon-right", "left" !== iconPosition), _classesMap);
    return (0, _combine_classes.combineClasses)(classesMap)
};
var viewFunction = function(viewModel) {
    var _viewModel$props = viewModel.props,
        children = _viewModel$props.children,
        icon = _viewModel$props.icon,
        iconPosition = _viewModel$props.iconPosition,
        ButtonTemplate = _viewModel$props.template,
        text = _viewModel$props.text;
    var renderText = !viewModel.props.template && !children && text;
    var isIconLeft = "left" === iconPosition;
    var iconComponent = !viewModel.props.template && !children && viewModel.iconSource && Preact.h(_icon2.Icon, {
        source: viewModel.iconSource,
        position: iconPosition
    });
    return Preact.h(_widget.Widget, _extends({
        ref: viewModel.widgetRef,
        accessKey: viewModel.props.accessKey,
        activeStateEnabled: viewModel.props.activeStateEnabled,
        aria: viewModel.aria,
        classes: viewModel.cssClasses,
        disabled: viewModel.props.disabled,
        focusStateEnabled: viewModel.props.focusStateEnabled,
        height: viewModel.props.height,
        hint: viewModel.props.hint,
        hoverStateEnabled: viewModel.props.hoverStateEnabled,
        onActive: viewModel.onActive,
        onContentReady: viewModel.props.onContentReady,
        onClick: viewModel.onWidgetClick,
        onInactive: viewModel.onInactive,
        onKeyDown: viewModel.onWidgetKeyDown,
        rtlEnabled: viewModel.props.rtlEnabled,
        tabIndex: viewModel.props.tabIndex,
        visible: viewModel.props.visible,
        width: viewModel.props.width
    }, viewModel.restAttributes), Preact.h("div", {
        className: "dx-button-content",
        ref: viewModel.contentRef
    }, viewModel.props.template && ButtonTemplate({
        data: {
            icon: icon,
            text: text
        }
    }), !viewModel.props.template && children, isIconLeft && iconComponent, renderText && Preact.h("span", {
        className: "dx-button-text"
    }, text), !isIconLeft && iconComponent, viewModel.props.useSubmitBehavior && Preact.h("input", {
        ref: viewModel.submitInputRef,
        type: "submit",
        tabIndex: -1,
        className: "dx-button-submit-input"
    }), viewModel.props.useInkRipple && Preact.h(_ink_ripple.InkRipple, {
        config: viewModel.inkRippleConfig,
        ref: viewModel.inkRippleRef
    })))
};
exports.viewFunction = viewFunction;
var ButtonProps = _objectSpread(_objectSpread({}, _base_props.default), {}, {
    activeStateEnabled: true,
    hoverStateEnabled: true,
    icon: "",
    iconPosition: "left",
    onClick: _noop.default,
    onSubmit: _noop.default,
    text: "",
    useInkRipple: false,
    useSubmitBehavior: false,
    validationGroup: void 0
});
exports.ButtonProps = ButtonProps;
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
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};
var Button = (0, _compat.forwardRef)(function(props, ref) {
    var __contentRef = (0, _hooks.useRef)();
    var __submitInputRef = (0, _hooks.useRef)();
    var __inkRippleRef = (0, _hooks.useRef)();
    var __widgetRef = (0, _hooks.useRef)();
    var __onActive = (0, _hooks.useCallback)(function(event) {
        var useInkRipple = props.useInkRipple;
        useInkRipple && __inkRippleRef.current.showWave({
            element: __contentRef.current,
            event: event
        })
    }, [props.useInkRipple]);
    var __onInactive = (0, _hooks.useCallback)(function(event) {
        var useInkRipple = props.useInkRipple;
        useInkRipple && __inkRippleRef.current.hideWave({
            element: __contentRef.current,
            event: event
        })
    }, [props.useInkRipple]);
    var __onWidgetClick = (0, _hooks.useCallback)(function(event) {
        var onClick = props.onClick,
            useSubmitBehavior = props.useSubmitBehavior,
            validationGroup = props.validationGroup;
        null === onClick || void 0 === onClick ? void 0 : onClick({
            event: event,
            validationGroup: validationGroup
        });
        useSubmitBehavior && __submitInputRef.current.click()
    }, [props.onClick, props.useSubmitBehavior, props.validationGroup]);
    var __onWidgetKeyDown = (0, _hooks.useCallback)(function(options) {
        var onKeyDown = props.onKeyDown;
        var keyName = options.keyName,
            originalEvent = options.originalEvent,
            which = options.which;
        var result = null === onKeyDown || void 0 === onKeyDown ? void 0 : onKeyDown(options);
        if (null !== result && void 0 !== result && result.cancel) {
            return result
        }
        if ("space" === keyName || "space" === which || "enter" === keyName || "enter" === which) {
            originalEvent.preventDefault();
            __onWidgetClick(originalEvent)
        }
        return
    }, [props.onKeyDown, props.onClick, props.useSubmitBehavior, props.validationGroup]);
    var __aria = (0, _hooks.useCallback)(function() {
        var icon = props.icon,
            text = props.text;
        var label = text || icon;
        if (!text && icon && "image" === (0, _icon.getImageSourceType)(icon)) {
            label = icon.indexOf("base64") === -1 ? icon.replace(/.+\/([^.]+)\..+$/, "$1") : "Base64"
        }
        return _objectSpread({
            role: "button"
        }, label ? {
            label: label
        } : {})
    }, [props.icon, props.text]);
    var __cssClasses = (0, _hooks.useCallback)(function() {
        return getCssClasses(props)
    }, [props]);
    var __iconSource = (0, _hooks.useCallback)(function() {
        var icon = props.icon,
            type = props.type;
        return icon || "back" === type ? icon || "back" : ""
    }, [props.icon, props.type]);
    var __inkRippleConfig = (0, _hooks.useCallback)(function() {
        var icon = props.icon,
            text = props.text,
            type = props.type;
        return !text && icon || "back" === type ? {
            isCentered: true,
            useHoldAnimation: false,
            waveSizeCoefficient: 1
        } : {}
    }, [props.icon, props.text, props.type]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.accessKey, props.activeStateEnabled, props.children, props.disabled, props.focusStateEnabled, props.height, props.hint, props.hoverStateEnabled, props.icon, props.iconPosition, props.onClick, props.onContentReady, props.onKeyDown, props.onSubmit, props.pressed, props.rtlEnabled, props.stylingMode, props.tabIndex, props.template, props.text, props.type, props.useInkRipple, props.useSubmitBehavior, props.validationGroup, props.visible, props.width, _objectWithoutProperties(props, ["accessKey", "activeStateEnabled", "children", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "icon", "iconPosition", "onClick", "onContentReady", "onKeyDown", "onSubmit", "pressed", "rtlEnabled", "stylingMode", "tabIndex", "template", "text", "type", "useInkRipple", "useSubmitBehavior", "validationGroup", "visible", "width"]));
        return restProps
    }, [props]);
    var __focus = (0, _hooks.useCallback)(function() {
        __widgetRef.current.focus()
    }, []);
    (0, _hooks.useEffect)(function() {
        var onContentReady = props.onContentReady;
        null === onContentReady || void 0 === onContentReady ? void 0 : onContentReady({
            element: __contentRef.current.parentNode
        })
    }, [props.onContentReady]);
    (0, _hooks.useEffect)(function() {
        var namespace = "UIFeedback";
        var onSubmit = props.onSubmit,
            useSubmitBehavior = props.useSubmitBehavior;
        if (useSubmitBehavior && onSubmit) {
            _short.click.on(__submitInputRef.current, function(event) {
                return onSubmit({
                    event: event,
                    submitInput: __submitInputRef.current
                })
            }, {
                namespace: namespace
            });
            return function() {
                return _short.click.off(__submitInputRef.current, {
                    namespace: namespace
                })
            }
        }
        return
    }, [props.onSubmit, props.useSubmitBehavior]);
    (0, _hooks.useImperativeHandle)(ref, function() {
        return {
            focus: __focus
        }
    }, [__focus]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            template: getTemplate(props.template)
        }),
        contentRef: __contentRef,
        submitInputRef: __submitInputRef,
        inkRippleRef: __inkRippleRef,
        widgetRef: __widgetRef,
        onActive: __onActive,
        onInactive: __onInactive,
        onWidgetClick: __onWidgetClick,
        onWidgetKeyDown: __onWidgetKeyDown,
        aria: __aria(),
        cssClasses: __cssClasses(),
        iconSource: __iconSource(),
        inkRippleConfig: __inkRippleConfig(),
        restAttributes: __restAttributes()
    })
});
exports.Button = Button;

function __createDefaultProps() {
    return _objectSpread(_objectSpread({}, ButtonProps), (0, _utils.convertRulesToOptions)(defaultOptionRules))
}
Button.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    Button.defaultProps = _objectSpread(_objectSpread({}, __createDefaultProps()), (0, _utils.convertRulesToOptions)(__defaultOptionRules))
}
