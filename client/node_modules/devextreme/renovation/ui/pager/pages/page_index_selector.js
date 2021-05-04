/**
 * DevExtreme (renovation/ui/pager/pages/page_index_selector.js)
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
exports.PageIndexSelector = PageIndexSelector;
exports.PageIndexSelectorProps = exports.viewFunction = exports.PAGER_BUTTON_DISABLE_CLASS = void 0;
var _light_button = require("../common/light_button");
var _large = require("./large");
var _small = require("./small");
var _pager_props = _interopRequireDefault(require("../common/pager_props"));
var _config_context = require("../../common/config_context");
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
var PAGER_NAVIGATE_BUTTON = "dx-navigate-button";
var PAGER_PREV_BUTTON_CLASS = "dx-prev-button";
var PAGER_NEXT_BUTTON_CLASS = "dx-next-button";
var PAGER_BUTTON_DISABLE_CLASS = "dx-button-disable";
exports.PAGER_BUTTON_DISABLE_CLASS = PAGER_BUTTON_DISABLE_CLASS;
var nextButtonClassName = "".concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_NEXT_BUTTON_CLASS);
var prevButtonClassName = "".concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_PREV_BUTTON_CLASS);
var nextButtonDisabledClassName = "".concat(PAGER_BUTTON_DISABLE_CLASS, " ").concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_NEXT_BUTTON_CLASS);
var prevButtonDisabledClassName = "".concat(PAGER_BUTTON_DISABLE_CLASS, " ").concat(PAGER_NAVIGATE_BUTTON, " ").concat(PAGER_PREV_BUTTON_CLASS);
var viewFunction = function(_ref) {
    var navigateToNextPage = _ref.navigateToNextPage,
        navigateToPrevPage = _ref.navigateToPrevPage,
        nextClassName = _ref.nextClassName,
        pageIndexChange = _ref.pageIndexChange,
        prevClassName = _ref.prevClassName,
        _ref$props = _ref.props,
        isLargeDisplayMode = _ref$props.isLargeDisplayMode,
        maxPagesCount = _ref$props.maxPagesCount,
        pageCount = _ref$props.pageCount,
        pageIndex = _ref$props.pageIndex,
        pagesCountText = _ref$props.pagesCountText,
        renderNextButton = _ref.renderNextButton,
        renderPrevButton = _ref.renderPrevButton;
    return Preact.h(Preact.Fragment, null, renderPrevButton && Preact.h(_light_button.LightButton, {
        className: prevClassName,
        label: "Previous page",
        onClick: navigateToPrevPage
    }), isLargeDisplayMode && Preact.h(_large.PagesLarge, {
        maxPagesCount: maxPagesCount,
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange
    }), !isLargeDisplayMode && Preact.h(_small.PagesSmall, {
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange,
        pagesCountText: pagesCountText
    }), renderNextButton && Preact.h(_light_button.LightButton, {
        className: nextClassName,
        label: "Next page",
        onClick: navigateToNextPage
    }))
};
exports.viewFunction = viewFunction;

function getIncrement(direction) {
    return "next" === direction ? 1 : -1
}
var PageIndexSelectorProps = {
    isLargeDisplayMode: true
};
exports.PageIndexSelectorProps = PageIndexSelectorProps;
var PageIndexSelectorPropsType = {
    maxPagesCount: _pager_props.default.maxPagesCount,
    pageCount: _pager_props.default.pageCount,
    hasKnownLastPage: _pager_props.default.hasKnownLastPage,
    showNavigationButtons: _pager_props.default.showNavigationButtons,
    totalCount: _pager_props.default.totalCount,
    isLargeDisplayMode: PageIndexSelectorProps.isLargeDisplayMode,
    defaultPageIndex: _pager_props.default.pageIndex
};

function PageIndexSelector(props) {
    var _useState = (0, _hooks.useState)(function() {
            return void 0 !== props.pageIndex ? props.pageIndex : props.defaultPageIndex
        }),
        _useState2 = _slicedToArray(_useState, 2),
        __state_pageIndex = _useState2[0],
        __state_setPageIndex = _useState2[1];
    var config = (0, _hooks.useContext)(_config_context.ConfigContext);
    var __getNextDirection = (0, _hooks.useCallback)(function() {
        return !(null !== config && void 0 !== config && config.rtlEnabled) ? "next" : "prev"
    }, [config]);
    var __getPrevDirection = (0, _hooks.useCallback)(function() {
        return !(null !== config && void 0 !== config && config.rtlEnabled) ? "prev" : "next"
    }, [config]);
    var __canNavigateToPage = (0, _hooks.useCallback)(function(pageIndex) {
        if (!props.hasKnownLastPage) {
            return pageIndex >= 0
        }
        return pageIndex >= 0 && pageIndex <= props.pageCount - 1
    }, [props.hasKnownLastPage, props.pageCount]);
    var __getNextPageIndex = (0, _hooks.useCallback)(function(direction) {
        return (void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) + getIncrement(direction)
    }, [props.pageIndex, __state_pageIndex]);
    var __canNavigateTo = (0, _hooks.useCallback)(function(direction) {
        return __canNavigateToPage(__getNextPageIndex(direction))
    }, [props.hasKnownLastPage, props.pageCount, props.pageIndex, __state_pageIndex]);
    var __navigateToPage = (0, _hooks.useCallback)(function(direction) {
        __pageIndexChange(__getNextPageIndex(direction))
    }, [props.hasKnownLastPage, props.pageCount, props.pageIndexChange, props.pageIndex, __state_pageIndex]);
    var __renderPrevButton = (0, _hooks.useCallback)(function() {
        var isLargeDisplayMode = props.isLargeDisplayMode,
            showNavigationButtons = props.showNavigationButtons;
        return !isLargeDisplayMode || showNavigationButtons
    }, [props.isLargeDisplayMode, props.showNavigationButtons]);
    var __renderNextButton = (0, _hooks.useCallback)(function() {
        return __renderPrevButton() || !props.hasKnownLastPage
    }, [props.isLargeDisplayMode, props.showNavigationButtons, props.hasKnownLastPage]);
    var __nextClassName = (0, _hooks.useCallback)(function() {
        var direction = __getNextDirection();
        var canNavigate = __canNavigateTo(direction);
        return canNavigate ? nextButtonClassName : nextButtonDisabledClassName
    }, [config, props.hasKnownLastPage, props.pageCount, props.pageIndex, __state_pageIndex]);
    var __prevClassName = (0, _hooks.useCallback)(function() {
        var direction = __getPrevDirection();
        var canNavigate = __canNavigateTo(direction);
        return canNavigate ? prevButtonClassName : prevButtonDisabledClassName
    }, [config, props.hasKnownLastPage, props.pageCount, props.pageIndex, __state_pageIndex]);
    var __pageIndexChange = (0, _hooks.useCallback)(function(pageIndex) {
        if (__canNavigateToPage(pageIndex)) {
            var _props$pageIndexChang;
            __state_setPageIndex(function(__state_pageIndex) {
                return pageIndex
            }), null === (_props$pageIndexChang = props.pageIndexChange) || void 0 === _props$pageIndexChang ? void 0 : _props$pageIndexChang.call(props, pageIndex)
        }
    }, [props.hasKnownLastPage, props.pageCount, props.pageIndexChange]);
    var __navigateToNextPage = (0, _hooks.useCallback)(function() {
        __navigateToPage(__getNextDirection())
    }, [props.hasKnownLastPage, props.pageCount, props.pageIndexChange, props.pageIndex, __state_pageIndex, config]);
    var __navigateToPrevPage = (0, _hooks.useCallback)(function() {
        __navigateToPage(__getPrevDirection())
    }, [props.hasKnownLastPage, props.pageCount, props.pageIndexChange, props.pageIndex, __state_pageIndex, config]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$pageIndex = _objectSpread(_objectSpread({}, props), {}, {
                pageIndex: void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex
            }),
            restProps = (_props$pageIndex.defaultPageIndex, _props$pageIndex.hasKnownLastPage, _props$pageIndex.isLargeDisplayMode, _props$pageIndex.maxPagesCount, _props$pageIndex.pageCount, _props$pageIndex.pageIndex, _props$pageIndex.pageIndexChange, _props$pageIndex.pagesCountText, _props$pageIndex.showNavigationButtons, _props$pageIndex.totalCount, _objectWithoutProperties(_props$pageIndex, ["defaultPageIndex", "hasKnownLastPage", "isLargeDisplayMode", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText", "showNavigationButtons", "totalCount"]));
        return restProps
    }, [props, __state_pageIndex]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            pageIndex: void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex
        }),
        config: config,
        renderPrevButton: __renderPrevButton(),
        renderNextButton: __renderNextButton(),
        nextClassName: __nextClassName(),
        prevClassName: __prevClassName(),
        pageIndexChange: __pageIndexChange,
        navigateToNextPage: __navigateToNextPage,
        navigateToPrevPage: __navigateToPrevPage,
        restAttributes: __restAttributes()
    })
}
PageIndexSelector.defaultProps = _objectSpread({}, PageIndexSelectorPropsType);
