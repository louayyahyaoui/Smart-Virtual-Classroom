/**
 * DevExtreme (renovation/ui/common/widget.js)
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
exports.Widget = exports.WidgetProps = exports.viewFunction = void 0;
require("../../../events/click");
require("../../../events/hover");
var _short = require("../../../events/short");
var _config = _interopRequireDefault(require("../../../core/config"));
var _combine_classes = require("../../utils/combine_classes");
var _extend = require("../../../core/utils/extend");
var _selectors = require("../../../ui/widget/selectors");
var _index = require("../../../events/utils/index");
var _style = require("../../../core/utils/style");
var _base_props = _interopRequireDefault(require("../../utils/base_props"));
var _config_context = require("./config_context");
var _config_provider = require("./config_provider");
var _type = require("../../../core/utils/type");
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
var getAria = function(args) {
    return Object.keys(args).reduce(function(r, key) {
        if (args[key]) {
            return _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, "role" === key || "id" === key ? key : "aria-".concat(key), String(args[key])))
        }
        return r
    }, {})
};
var getCssClasses = function(model) {
    var _classesMap;
    var isFocusable = !!model.focusStateEnabled && !model.disabled;
    var isHoverable = !!model.hoverStateEnabled && !model.disabled;
    var classesMap = (_classesMap = {
        "dx-widget": true
    }, _defineProperty(_classesMap, String(model.classes), !!model.classes), _defineProperty(_classesMap, String(model.className), !!model.className), _defineProperty(_classesMap, "dx-state-disabled", !!model.disabled), _defineProperty(_classesMap, "dx-state-invisible", !model.visible), _defineProperty(_classesMap, "dx-state-focused", !!model.focused && isFocusable), _defineProperty(_classesMap, "dx-state-active", !!model.active), _defineProperty(_classesMap, "dx-state-hover", !!model.hovered && isHoverable && !model.active), _defineProperty(_classesMap, "dx-rtl", !!model.rtlEnabled), _defineProperty(_classesMap, "dx-visibility-change-handler", !!model.onVisibilityChange), _classesMap);
    return (0, _combine_classes.combineClasses)(classesMap)
};
var viewFunction = function(viewModel) {
    var widget = Preact.h("div", _extends({
        ref: viewModel.widgetRef
    }, viewModel.attributes, {
        tabIndex: viewModel.tabIndex,
        title: viewModel.props.hint,
        hidden: !viewModel.props.visible,
        className: viewModel.cssClasses,
        style: viewModel.styles
    }), viewModel.props.children);
    return viewModel.shouldRenderConfigProvider ? Preact.h(_config_provider.ConfigProvider, {
        rtlEnabled: viewModel.rtlEnabled
    }, widget) : widget
};
exports.viewFunction = viewFunction;
var WidgetProps = _objectSpread(_objectSpread({}, _base_props.default), {}, {
    _feedbackHideTimeout: 400,
    _feedbackShowTimeout: 30,
    aria: {},
    classes: "",
    className: "",
    name: ""
});
exports.WidgetProps = WidgetProps;
var Widget = (0, _compat.forwardRef)(function(props, ref) {
    var __widgetRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(false),
        _useState2 = _slicedToArray(_useState, 2),
        __state_active = _useState2[0],
        __state_setActive = _useState2[1];
    var _useState3 = (0, _hooks.useState)(false),
        _useState4 = _slicedToArray(_useState3, 2),
        __state_focused = _useState4[0],
        __state_setFocused = _useState4[1];
    var _useState5 = (0, _hooks.useState)(false),
        _useState6 = _slicedToArray(_useState5, 2),
        __state_hovered = _useState6[0],
        __state_setHovered = _useState6[1];
    var config = (0, _hooks.useContext)(_config_context.ConfigContext);
    var __shouldRenderConfigProvider = (0, _hooks.useCallback)(function() {
        var isPropDefined = (0, _type.isDefined)(props.rtlEnabled);
        var onlyGlobalDefined = (0, _type.isDefined)((0, _config.default)().rtlEnabled) && !isPropDefined && !(0, _type.isDefined)(null === config || void 0 === config ? void 0 : config.rtlEnabled);
        return isPropDefined && props.rtlEnabled !== (null === config || void 0 === config ? void 0 : config.rtlEnabled) || onlyGlobalDefined
    }, [props.rtlEnabled, config]);
    var __rtlEnabled = (0, _hooks.useCallback)(function() {
        if (void 0 !== props.rtlEnabled) {
            return props.rtlEnabled
        }
        if (void 0 !== (null === config || void 0 === config ? void 0 : config.rtlEnabled)) {
            return config.rtlEnabled
        }
        return (0, _config.default)().rtlEnabled
    }, [props.rtlEnabled, config]);
    var __attributes = (0, _hooks.useCallback)(function() {
        var aria = props.aria,
            disabled = props.disabled,
            focusStateEnabled = props.focusStateEnabled,
            visible = props.visible;
        var accessKey = focusStateEnabled && !disabled && props.accessKey;
        return _objectSpread(_objectSpread({}, (0, _extend.extend)({}, __restAttributes(), accessKey && {
            accessKey: accessKey
        })), getAria(_objectSpread(_objectSpread({}, aria), {}, {
            disabled: disabled,
            hidden: !visible
        })))
    }, [props.aria, props.disabled, props.focusStateEnabled, props.visible, props.accessKey, props]);
    var __styles = (0, _hooks.useCallback)(function() {
        var height = props.height,
            width = props.width;
        var style = __restAttributes().style || {};
        var computedWidth = (0, _style.normalizeStyleProp)("width", "function" === typeof width ? width() : width);
        var computedHeight = (0, _style.normalizeStyleProp)("height", "function" === typeof height ? height() : height);
        return _objectSpread(_objectSpread({}, style), {}, {
            height: null !== computedHeight && void 0 !== computedHeight ? computedHeight : style.height,
            width: null !== computedWidth && void 0 !== computedWidth ? computedWidth : style.width
        })
    }, [props.height, props.width, props]);
    var __cssClasses = (0, _hooks.useCallback)(function() {
        var className = props.className,
            classes = props.classes,
            disabled = props.disabled,
            focusStateEnabled = props.focusStateEnabled,
            hoverStateEnabled = props.hoverStateEnabled,
            onVisibilityChange = props.onVisibilityChange,
            visible = props.visible;
        return getCssClasses({
            active: __state_active,
            focused: __state_focused,
            hovered: __state_hovered,
            className: className,
            classes: classes,
            disabled: disabled,
            focusStateEnabled: focusStateEnabled,
            hoverStateEnabled: hoverStateEnabled,
            onVisibilityChange: onVisibilityChange,
            rtlEnabled: __rtlEnabled(),
            visible: visible
        })
    }, [props.className, props.classes, props.disabled, props.focusStateEnabled, props.hoverStateEnabled, props.onVisibilityChange, props.visible, __state_active, __state_focused, __state_hovered, props.rtlEnabled, config]);
    var __tabIndex = (0, _hooks.useCallback)(function() {
        var disabled = props.disabled,
            focusStateEnabled = props.focusStateEnabled,
            tabIndex = props.tabIndex;
        var isFocusable = focusStateEnabled && !disabled;
        return isFocusable ? tabIndex : void 0
    }, [props.disabled, props.focusStateEnabled, props.tabIndex]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$rootElementRef2;
        var _props$rootElementRef = _objectSpread(_objectSpread({}, props), {}, {
                rootElementRef: null === (_props$rootElementRef2 = props.rootElementRef) || void 0 === _props$rootElementRef2 ? void 0 : _props$rootElementRef2.current
            }),
            restProps = (_props$rootElementRef._feedbackHideTimeout, _props$rootElementRef._feedbackShowTimeout, _props$rootElementRef.accessKey, _props$rootElementRef.activeStateEnabled, _props$rootElementRef.activeStateUnit, _props$rootElementRef.aria, _props$rootElementRef.children, _props$rootElementRef.className, _props$rootElementRef.classes, _props$rootElementRef.disabled, _props$rootElementRef.focusStateEnabled, _props$rootElementRef.height, _props$rootElementRef.hint, _props$rootElementRef.hoverStateEnabled, _props$rootElementRef.name, _props$rootElementRef.onActive, _props$rootElementRef.onClick, _props$rootElementRef.onContentReady, _props$rootElementRef.onDimensionChanged, _props$rootElementRef.onFocusIn, _props$rootElementRef.onFocusOut, _props$rootElementRef.onInactive, _props$rootElementRef.onKeyDown, _props$rootElementRef.onKeyboardHandled, _props$rootElementRef.onVisibilityChange, _props$rootElementRef.rootElementRef, _props$rootElementRef.rtlEnabled, _props$rootElementRef.tabIndex, _props$rootElementRef.visible, _props$rootElementRef.width, _objectWithoutProperties(_props$rootElementRef, ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "aria", "children", "className", "classes", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"]));
        return restProps
    }, [props]);
    var __focus = (0, _hooks.useCallback)(function() {
        _short.focus.trigger(__widgetRef.current)
    }, []);
    (0, _hooks.useEffect)(function() {
        if (props.rootElementRef) {
            props.rootElementRef.current = __widgetRef.current
        }
    }, []);
    (0, _hooks.useEffect)(function() {
        var namespace = "UIFeedback";
        var accessKey = props.accessKey,
            disabled = props.disabled,
            focusStateEnabled = props.focusStateEnabled;
        var isFocusable = focusStateEnabled && !disabled;
        var canBeFocusedByKey = isFocusable && accessKey;
        if (canBeFocusedByKey) {
            _short.dxClick.on(__widgetRef.current, function(e) {
                if ((0, _index.isFakeClickEvent)(e)) {
                    e.stopImmediatePropagation();
                    __state_setFocused(function(__state_focused) {
                        return true
                    })
                }
            }, {
                namespace: namespace
            });
            return function() {
                return _short.dxClick.off(__widgetRef.current, {
                    namespace: namespace
                })
            }
        }
        return
    }, [props.accessKey, props.disabled, props.focusStateEnabled]);
    (0, _hooks.useEffect)(function() {
        var _feedbackHideTimeout = props._feedbackHideTimeout,
            _feedbackShowTimeout = props._feedbackShowTimeout,
            activeStateEnabled = props.activeStateEnabled,
            activeStateUnit = props.activeStateUnit,
            disabled = props.disabled,
            onActive = props.onActive,
            onInactive = props.onInactive;
        var selector = activeStateUnit;
        var namespace = "UIFeedback";
        if (activeStateEnabled && !disabled) {
            _short.active.on(__widgetRef.current, function(_ref) {
                var event = _ref.event;
                __state_setActive(function(__state_active) {
                    return true
                });
                null === onActive || void 0 === onActive ? void 0 : onActive(event)
            }, function(_ref2) {
                var event = _ref2.event;
                __state_setActive(function(__state_active) {
                    return false
                });
                null === onInactive || void 0 === onInactive ? void 0 : onInactive(event)
            }, {
                hideTimeout: _feedbackHideTimeout,
                namespace: namespace,
                selector: selector,
                showTimeout: _feedbackShowTimeout
            });
            return function() {
                return _short.active.off(__widgetRef.current, {
                    selector: selector,
                    namespace: namespace
                })
            }
        }
        return
    }, [props._feedbackHideTimeout, props._feedbackShowTimeout, props.activeStateEnabled, props.activeStateUnit, props.disabled, props.onActive, props.onInactive]);
    (0, _hooks.useEffect)(function() {
        var disabled = props.disabled,
            name = props.name,
            onClick = props.onClick;
        var namespace = name;
        if (onClick && !disabled) {
            _short.dxClick.on(__widgetRef.current, onClick, {
                namespace: namespace
            });
            return function() {
                return _short.dxClick.off(__widgetRef.current, {
                    namespace: namespace
                })
            }
        }
        return
    }, [props.disabled, props.name, props.onClick]);
    (0, _hooks.useEffect)(function() {
        var disabled = props.disabled,
            focusStateEnabled = props.focusStateEnabled,
            name = props.name,
            onFocusIn = props.onFocusIn,
            onFocusOut = props.onFocusOut;
        var namespace = "".concat(name, "Focus");
        var isFocusable = focusStateEnabled && !disabled;
        if (isFocusable) {
            _short.focus.on(__widgetRef.current, function(e) {
                if (!e.isDefaultPrevented()) {
                    __state_setFocused(function(__state_focused) {
                        return true
                    });
                    null === onFocusIn || void 0 === onFocusIn ? void 0 : onFocusIn(e)
                }
            }, function(e) {
                if (!e.isDefaultPrevented()) {
                    __state_setFocused(function(__state_focused) {
                        return false
                    });
                    null === onFocusOut || void 0 === onFocusOut ? void 0 : onFocusOut(e)
                }
            }, {
                isFocusable: _selectors.focusable,
                namespace: namespace
            });
            return function() {
                return _short.focus.off(__widgetRef.current, {
                    namespace: namespace
                })
            }
        }
        return
    }, [props.disabled, props.focusStateEnabled, props.name, props.onFocusIn, props.onFocusOut]);
    (0, _hooks.useEffect)(function() {
        var namespace = "UIFeedback";
        var activeStateUnit = props.activeStateUnit,
            disabled = props.disabled,
            hoverStateEnabled = props.hoverStateEnabled;
        var selector = activeStateUnit;
        var isHoverable = hoverStateEnabled && !disabled;
        if (isHoverable) {
            _short.hover.on(__widgetRef.current, function() {
                !__state_active && __state_setHovered(function(__state_hovered) {
                    return true
                })
            }, function() {
                __state_setHovered(function(__state_hovered) {
                    return false
                })
            }, {
                selector: selector,
                namespace: namespace
            });
            return function() {
                return _short.hover.off(__widgetRef.current, {
                    selector: selector,
                    namespace: namespace
                })
            }
        }
        return
    }, [props.activeStateUnit, props.disabled, props.hoverStateEnabled, __state_active]);
    (0, _hooks.useEffect)(function() {
        var onKeyDown = props.onKeyDown;
        if (onKeyDown) {
            var id = _short.keyboard.on(__widgetRef.current, __widgetRef.current, function(e) {
                return onKeyDown(e)
            });
            return function() {
                return _short.keyboard.off(id)
            }
        }
        return
    }, [props.onKeyDown]);
    (0, _hooks.useEffect)(function() {
        var namespace = "".concat(props.name, "VisibilityChange");
        var onDimensionChanged = props.onDimensionChanged;
        if (onDimensionChanged) {
            _short.resize.on(__widgetRef.current, onDimensionChanged, {
                namespace: namespace
            });
            return function() {
                return _short.resize.off(__widgetRef.current, {
                    namespace: namespace
                })
            }
        }
        return
    }, [props.name, props.onDimensionChanged]);
    (0, _hooks.useEffect)(function() {
        var name = props.name,
            onVisibilityChange = props.onVisibilityChange;
        var namespace = "".concat(name, "VisibilityChange");
        if (onVisibilityChange) {
            _short.visibility.on(__widgetRef.current, function() {
                return onVisibilityChange(true)
            }, function() {
                return onVisibilityChange(false)
            }, {
                namespace: namespace
            });
            return function() {
                return _short.visibility.off(__widgetRef.current, {
                    namespace: namespace
                })
            }
        }
        return
    }, [props.name, props.onVisibilityChange]);
    (0, _hooks.useImperativeHandle)(ref, function() {
        return {
            focus: __focus
        }
    }, [__focus]);
    return viewFunction({
        props: _objectSpread({}, props),
        active: __state_active,
        focused: __state_focused,
        hovered: __state_hovered,
        widgetRef: __widgetRef,
        config: config,
        shouldRenderConfigProvider: __shouldRenderConfigProvider(),
        rtlEnabled: __rtlEnabled(),
        attributes: __attributes(),
        styles: __styles(),
        cssClasses: __cssClasses(),
        tabIndex: __tabIndex(),
        restAttributes: __restAttributes()
    })
});
exports.Widget = Widget;
Widget.defaultProps = _objectSpread({}, WidgetProps);
