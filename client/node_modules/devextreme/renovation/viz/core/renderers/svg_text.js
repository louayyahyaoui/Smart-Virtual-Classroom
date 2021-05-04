/**
 * DevExtreme (renovation/viz/core/renderers/svg_text.js)
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
exports.TextSvgElement = TextSvgElement;
exports.TextSvgElementProps = exports.viewFunction = void 0;
var _base_graphics_props = _interopRequireDefault(require("./base_graphics_props"));
var _utils = require("./utils");
var _type = require("../../../../core/utils/type");
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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
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
var KEY_STROKE = "stroke";
var viewFunction = function(_ref) {
    var isStroked = _ref.isStroked,
        _ref$props = _ref.props,
        fill = _ref$props.fill,
        opacity = _ref$props.opacity,
        stroke = _ref$props.stroke,
        strokeOpacity = _ref$props.strokeOpacity,
        strokeWidth = _ref$props.strokeWidth,
        text = _ref$props.text,
        x = _ref$props.x,
        y = _ref$props.y,
        styles = _ref.styles,
        textAnchor = _ref.textAnchor,
        textItems = _ref.textItems,
        textRef = _ref.textRef;
    var texts = textItems || [];
    return Preact.h("text", {
        ref: textRef,
        x: x,
        y: y,
        style: styles,
        textAnchor: textAnchor,
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth,
        strokeOpacity: strokeOpacity,
        opacity: opacity
    }, texts.length && isStroked && texts.map(function(_ref2, index) {
        var className = _ref2.className,
            style = _ref2.style,
            value = _ref2.value;
        return Preact.h("tspan", {
            key: index,
            style: style,
            className: className
        }, value)
    }), texts.length && texts.map(function(_ref3, index) {
        var className = _ref3.className,
            style = _ref3.style,
            value = _ref3.value;
        return Preact.h("tspan", {
            key: index,
            style: style,
            className: className
        }, value)
    }), !texts.length && text)
};
exports.viewFunction = viewFunction;
var TextSvgElementProps = _objectSpread(_objectSpread({}, _base_graphics_props.default), {}, {
    text: "",
    x: 0,
    y: 0,
    align: "center",
    encodeHtml: true,
    rtl: false
});
exports.TextSvgElementProps = TextSvgElementProps;

function TextSvgElement(props) {
    var __textRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(function() {
            return void 0 !== props.sharp ? props.sharp : props.defaultSharp
        }),
        _useState2 = _slicedToArray(_useState, 2),
        __state_sharp = _useState2[0];
    _useState2[1];
    var __styles = (0, _hooks.useCallback)(function() {
        var style = props.styles || {};
        return _objectSpread({
            whiteSpace: "pre"
        }, style)
    }, [props.styles]);
    var __textItems = (0, _hooks.useCallback)(function() {
        var items;
        var parsedHtml;
        var text = props.text;
        if (!text) {
            return
        }
        if (!props.encodeHtml && (/<[a-z][\s\S]*>/i.test(text) || text.indexOf("&") !== -1)) {
            parsedHtml = (0, _utils.removeExtraAttrs)(text);
            items = (0, _utils.parseHTML)(parsedHtml)
        } else {
            if (/\n/g.test(text)) {
                items = (0, _utils.parseMultiline)(text)
            } else {
                if (__isStroked()) {
                    items = [{
                        value: text.trim(),
                        height: 0
                    }]
                }
            }
        }
        return items
    }, [props.text, props.encodeHtml, props.stroke, props.strokeWidth]);
    var __isStroked = (0, _hooks.useCallback)(function() {
        return (0, _type.isDefined)(props.stroke) && (0, _type.isDefined)(props.strokeWidth)
    }, [props.stroke, props.strokeWidth]);
    var __textAnchor = (0, _hooks.useCallback)(function() {
        return (0, _utils.convertAlignmentToAnchor)(props.align, props.rtl)
    }, [props.align, props.rtl]);
    var __parseTspanElements = (0, _hooks.useCallback)(function(texts) {
        var items = _toConsumableArray(texts);
        var textElements = __textRef.current.children;
        var strokeLength = !__isStroked() ? 0 : items.length;
        for (var i = 0; i < textElements.length; i++) {
            if (i < strokeLength) {
                items[i].stroke = textElements[i]
            } else {
                items[i % items.length].tspan = textElements[i]
            }
        }
        return items
    }, [props.stroke, props.strokeWidth]);
    var __alignTextNodes = (0, _hooks.useCallback)(function(items) {
        var alignment = props.textsAlignment;
        if (!items || !alignment || "center" === alignment) {
            return
        }
        var direction = "left" === alignment ? -1 : 1;
        var maxTextWidth = Math.max.apply(Math, _toConsumableArray(items.map(function(t) {
            return (0, _utils.getTextWidth)(t)
        })));
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var textWidth = (0, _utils.getTextWidth)(item);
            if (0 !== maxTextWidth && maxTextWidth !== textWidth) {
                (0, _utils.setTextNodeAttribute)(item, "dx", direction * (Math.round((maxTextWidth - textWidth) / 2 * 10) / 10))
            }
        }
    }, [props.textsAlignment]);
    var __locateTextNodes = (0, _hooks.useCallback)(function(items) {
        var styles = props.styles,
            x = props.x,
            y = props.y;
        var lineHeight = (0, _utils.getLineHeight)(styles || {});
        var item = items[0];
        (0, _utils.setTextNodeAttribute)(item, "x", x);
        (0, _utils.setTextNodeAttribute)(item, "y", y);
        for (var i = 1, ii = items.length; i < ii; ++i) {
            item = items[i];
            if (item.height >= 0) {
                (0, _utils.setTextNodeAttribute)(item, "x", x);
                var height = (0, _utils.getItemLineHeight)(item, lineHeight);
                (0, _utils.setTextNodeAttribute)(item, "dy", height)
            }
        }
    }, [props.styles, props.x, props.y]);
    var __strokeTextNodes = (0, _hooks.useCallback)(function(items) {
        if (!__isStroked()) {
            return
        }
        var stroke = props.stroke,
            strokeWidth = props.strokeWidth;
        var strokeOpacity = props.strokeOpacity || 1;
        var tspan;
        for (var i = 0, ii = items.length; i < ii; ++i) {
            tspan = items[i].stroke;
            tspan.setAttribute(KEY_STROKE, stroke);
            tspan.setAttribute("stroke-width", strokeWidth.toString());
            tspan.setAttribute("stroke-opacity", strokeOpacity.toString());
            tspan.setAttribute("stroke-linejoin", "round")
        }
    }, [props.stroke, props.strokeWidth, props.strokeOpacity]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$sharp = _objectSpread(_objectSpread({}, props), {}, {
                sharp: void 0 !== props.sharp ? props.sharp : __state_sharp
            }),
            restProps = (_props$sharp.align, _props$sharp.dashStyle, _props$sharp.defaultSharp, _props$sharp.encodeHtml, _props$sharp.fill, _props$sharp.opacity, _props$sharp.rotate, _props$sharp.rotateX, _props$sharp.rotateY, _props$sharp.rtl, _props$sharp.scaleX, _props$sharp.scaleY, _props$sharp.sharp, _props$sharp.sharpChange, _props$sharp.sharpDirection, _props$sharp.stroke, _props$sharp.strokeOpacity, _props$sharp.strokeWidth, _props$sharp.styles, _props$sharp.text, _props$sharp.textsAlignment, _props$sharp.translateX, _props$sharp.translateY, _props$sharp.x, _props$sharp.y, _objectWithoutProperties(_props$sharp, ["align", "dashStyle", "defaultSharp", "encodeHtml", "fill", "opacity", "rotate", "rotateX", "rotateY", "rtl", "scaleX", "scaleY", "sharp", "sharpChange", "sharpDirection", "stroke", "strokeOpacity", "strokeWidth", "styles", "text", "textsAlignment", "translateX", "translateY", "x", "y"]));
        return restProps
    }, [props, __state_sharp]);
    (0, _hooks.useEffect)(function() {
        var texts = __textItems();
        if (texts) {
            var items = __parseTspanElements(texts);
            __alignTextNodes(items);
            (0, _utils.applyGraphicProps)(__textRef.current, _objectSpread(_objectSpread({}, props), {}, {
                sharp: void 0 !== props.sharp ? props.sharp : __state_sharp
            }), props.x, props.y);
            if (void 0 !== props.x || void 0 !== props.y) {
                __locateTextNodes(items)
            }
            __strokeTextNodes(items)
        }
    }, [props, __state_sharp]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            sharp: void 0 !== props.sharp ? props.sharp : __state_sharp
        }),
        textRef: __textRef,
        styles: __styles(),
        textItems: __textItems(),
        isStroked: __isStroked(),
        textAnchor: __textAnchor(),
        parseTspanElements: __parseTspanElements,
        alignTextNodes: __alignTextNodes,
        locateTextNodes: __locateTextNodes,
        strokeTextNodes: __strokeTextNodes,
        restAttributes: __restAttributes()
    })
}
TextSvgElement.defaultProps = _objectSpread({}, TextSvgElementProps);
