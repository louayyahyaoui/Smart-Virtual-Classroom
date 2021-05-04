/**
 * DevExtreme (renovation/ui/pager/resizable_container.js)
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
exports.calculateAdaptivityProps = calculateAdaptivityProps;
exports.ResizableContainer = ResizableContainer;
exports.ResizableContainerProps = exports.viewFunction = void 0;
var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));
var _get_element_width = require("./utils/get_element_width");
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
var viewFunction = function(_ref) {
    var infoTextRef = _ref.infoTextRef,
        infoTextVisible = _ref.infoTextVisible,
        isLargeDisplayMode = _ref.isLargeDisplayMode,
        pageSizesRef = _ref.pageSizesRef,
        pagesRef = _ref.pagesRef,
        parentRef = _ref.parentRef,
        _ref$props = _ref.props,
        Content = _ref$props.contentTemplate,
        pagerProps = _ref$props.pagerProps,
        restAttributes = _ref.restAttributes;
    return Content(_objectSpread({
        rootElementRef: parentRef,
        pageSizesRef: pageSizesRef,
        infoTextRef: infoTextRef,
        pagesRef: pagesRef,
        infoTextVisible: infoTextVisible,
        isLargeDisplayMode: isLargeDisplayMode
    }, _objectSpread(_objectSpread({}, pagerProps), restAttributes)))
};
exports.viewFunction = viewFunction;

function calculateAdaptivityProps(_ref2) {
    var infoWidth = _ref2.info,
        pageSizesWidth = _ref2.pageSizes,
        pagesWidth = _ref2.pages,
        parentWidth = _ref2.parent;
    var minimalWidth = pageSizesWidth + pagesWidth + infoWidth;
    var infoTextVisible = parentWidth - minimalWidth > 0;
    var isLargeDisplayMode = parentWidth - (pageSizesWidth + pagesWidth) > 0;
    return {
        infoTextVisible: infoTextVisible,
        isLargeDisplayMode: isLargeDisplayMode
    }
}

function getElementsWidth(_ref3) {
    var info = _ref3.info,
        pageSizes = _ref3.pageSizes,
        pages = _ref3.pages,
        parent = _ref3.parent;
    var parentWidth = (0, _get_element_width.getElementWidth)(parent);
    var pageSizesWidth = (0, _get_element_width.getElementWidth)(pageSizes);
    var infoWidth = (0, _get_element_width.getElementWidth)(info);
    var pagesHtmlWidth = (0, _get_element_width.getElementWidth)(pages);
    return {
        parent: parentWidth,
        pageSizes: pageSizesWidth,
        info: infoWidth + (0, _get_element_width.getElementStyle)("marginLeft", info) + (0, _get_element_width.getElementStyle)("marginRight", info),
        pages: pagesHtmlWidth - infoWidth
    }
}
var ResizableContainerProps = {};
exports.ResizableContainerProps = ResizableContainerProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return Preact.h(TemplateProp, _extends({}, props))
    } : TemplateProp)
};

function ResizableContainer(props) {
    var __elementsWidth = (0, _hooks.useRef)();
    var __parentRef = (0, _hooks.useRef)();
    var __pageSizesRef = (0, _hooks.useRef)();
    var __infoTextRef = (0, _hooks.useRef)();
    var __pagesRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(true),
        _useState2 = _slicedToArray(_useState, 2),
        __state_infoTextVisible = _useState2[0],
        __state_setInfoTextVisible = _useState2[1];
    var _useState3 = (0, _hooks.useState)(true),
        _useState4 = _slicedToArray(_useState3, 2),
        __state_isLargeDisplayMode = _useState4[0],
        __state_setIsLargeDisplayMode = _useState4[1];
    var __updateElementsWidth = (0, _hooks.useCallback)(function(_ref4) {
        var info = _ref4.info,
            pageSizes = _ref4.pageSizes,
            pages = _ref4.pages;
        __elementsWidth.current = {
            info: info,
            pageSizes: pageSizes,
            pages: pages
        }
    }, []);
    var __updateChildrenProps = (0, _hooks.useCallback)(function() {
        var currentElementsWidth = getElementsWidth({
            parent: __parentRef.current,
            pageSizes: __pageSizesRef.current,
            info: __infoTextRef.current,
            pages: __pagesRef.current
        });
        var isEmpty = void 0 === __elementsWidth.current;
        if (isEmpty) {
            var current = calculateAdaptivityProps(currentElementsWidth);
            __updateElementsWidth(currentElementsWidth);
            __state_setInfoTextVisible(function(__state_infoTextVisible) {
                return current.infoTextVisible
            });
            __state_setIsLargeDisplayMode(function(__state_isLargeDisplayMode) {
                return current.isLargeDisplayMode
            })
        } else {
            if (__state_isLargeDisplayMode) {
                __elementsWidth.current.pageSizes = currentElementsWidth.pageSizes;
                __elementsWidth.current.pages = currentElementsWidth.pages
            }
            if (__state_infoTextVisible) {
                __elementsWidth.current.info = currentElementsWidth.info
            }
            var _current = calculateAdaptivityProps(_objectSpread({
                parent: currentElementsWidth.parent
            }, __elementsWidth.current));
            __state_setInfoTextVisible(function(__state_infoTextVisible) {
                return _current.infoTextVisible
            });
            __state_setIsLargeDisplayMode(function(__state_isLargeDisplayMode) {
                return _current.isLargeDisplayMode
            })
        }
    }, [__pageSizesRef.current, __infoTextRef.current, __pagesRef.current, __state_isLargeDisplayMode, __state_infoTextVisible]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var restProps = (props.contentTemplate, props.pagerProps, _objectWithoutProperties(props, ["contentTemplate", "pagerProps"]));
        return restProps
    }, [props]);
    (0, _hooks.useEffect)(function() {
        var callback = function() {
            return __updateChildrenProps()
        };
        _resize_callbacks.default.add(callback);
        return function() {
            _resize_callbacks.default.remove(callback)
        }
    }, [__pageSizesRef.current, __infoTextRef.current, __pagesRef.current, __state_isLargeDisplayMode, __state_infoTextVisible]);
    (0, _hooks.useEffect)(function() {
        var parentWidth = (0, _get_element_width.getElementWidth)(__parentRef.current);
        if (parentWidth > 0) {
            __updateChildrenProps()
        }
    }, [__pageSizesRef.current, __infoTextRef.current, __pagesRef.current, __state_infoTextVisible, __state_isLargeDisplayMode, props.pagerProps, props.contentTemplate]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            contentTemplate: getTemplate(props.contentTemplate)
        }),
        infoTextVisible: __state_infoTextVisible,
        isLargeDisplayMode: __state_isLargeDisplayMode,
        elementsWidth: __elementsWidth,
        parentRef: __parentRef,
        pageSizesRef: __pageSizesRef,
        infoTextRef: __infoTextRef,
        pagesRef: __pagesRef,
        updateElementsWidth: __updateElementsWidth,
        updateChildrenProps: __updateChildrenProps,
        restAttributes: __restAttributes()
    })
}
ResizableContainer.defaultProps = _objectSpread({}, ResizableContainerProps);
