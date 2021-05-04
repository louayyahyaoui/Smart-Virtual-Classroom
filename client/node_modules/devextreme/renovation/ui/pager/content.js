/**
 * DevExtreme (renovation/ui/pager/content.js)
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
exports.PagerContent = PagerContent;
exports.PagerContentProps = exports.viewFunction = void 0;
var _info = require("./info");
var _page_index_selector = require("./pages/page_index_selector");
var _selector = require("./page_size/selector");
var _consts = require("./common/consts");
var _pager_props = _interopRequireDefault(require("./common/pager_props"));
var _combine_classes = require("../../utils/combine_classes");
var _widget = require("../common/widget");
var _accessibility = require("../../../ui/shared/accessibility");
var _keyboard_action_context = require("./common/keyboard_action_context");
var _noop = _interopRequireDefault(require("../../utils/noop"));
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
var viewFunction = function(_ref) {
    var classes = _ref.classes,
        infoVisible = _ref.infoVisible,
        isLargeDisplayMode = _ref.isLargeDisplayMode,
        pagesContainerVisibility = _ref.pagesContainerVisibility,
        pagesContainerVisible = _ref.pagesContainerVisible,
        _ref$props = _ref.props,
        hasKnownLastPage = _ref$props.hasKnownLastPage,
        infoText = _ref$props.infoText,
        infoTextRef = _ref$props.infoTextRef,
        maxPagesCount = _ref$props.maxPagesCount,
        pageCount = _ref$props.pageCount,
        pageIndex = _ref$props.pageIndex,
        pageIndexChange = _ref$props.pageIndexChange,
        pageSize = _ref$props.pageSize,
        pageSizeChange = _ref$props.pageSizeChange,
        pageSizes = _ref$props.pageSizes,
        pageSizesRef = _ref$props.pageSizesRef,
        pagesCountText = _ref$props.pagesCountText,
        pagesRef = _ref$props.pagesRef,
        rtlEnabled = _ref$props.rtlEnabled,
        showNavigationButtons = _ref$props.showNavigationButtons,
        showPageSizes = _ref$props.showPageSizes,
        totalCount = _ref$props.totalCount,
        restAttributes = _ref.restAttributes,
        widgetRootElementRef = _ref.widgetRootElementRef;
    return Preact.h(_widget.Widget, _extends({
        rootElementRef: widgetRootElementRef,
        rtlEnabled: rtlEnabled,
        classes: classes
    }, restAttributes), showPageSizes && Preact.h(_selector.PageSizeSelector, {
        rootElementRef: pageSizesRef,
        isLargeDisplayMode: isLargeDisplayMode,
        pageSize: pageSize,
        pageSizeChange: pageSizeChange,
        pageSizes: pageSizes
    }), pagesContainerVisible && Preact.h("div", {
        ref: pagesRef,
        className: _consts.PAGER_PAGES_CLASS,
        style: {
            visibility: pagesContainerVisibility
        }
    }, infoVisible && Preact.h(_info.InfoText, {
        rootElementRef: infoTextRef,
        infoText: infoText,
        pageCount: pageCount,
        pageIndex: pageIndex,
        totalCount: totalCount
    }), Preact.h(_page_index_selector.PageIndexSelector, {
        hasKnownLastPage: hasKnownLastPage,
        isLargeDisplayMode: isLargeDisplayMode,
        maxPagesCount: maxPagesCount,
        pageCount: pageCount,
        pageIndex: pageIndex,
        pageIndexChange: pageIndexChange,
        pagesCountText: pagesCountText,
        showNavigationButtons: showNavigationButtons,
        totalCount: totalCount
    })))
};
exports.viewFunction = viewFunction;
var PagerContentProps = _objectSpread(_objectSpread({}, _pager_props.default), {}, {
    infoTextVisible: true,
    isLargeDisplayMode: true
});
exports.PagerContentProps = PagerContentProps;

function PagerContent(props) {
    var __widgetRootElementRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(function() {
            return void 0 !== props.pageIndex ? props.pageIndex : props.defaultPageIndex
        }),
        _useState2 = _slicedToArray(_useState, 2),
        __state_pageIndex = _useState2[0];
    _useState2[1];
    var _useState3 = (0, _hooks.useState)(function() {
            return void 0 !== props.pageSize ? props.pageSize : props.defaultPageSize
        }),
        _useState4 = _slicedToArray(_useState3, 2),
        __state_pageSize = _useState4[0];
    _useState4[1];
    var __keyboardAction = (0, _hooks.useCallback)(function() {
        return {
            registerKeyboardAction: function(element, action) {
                var fakePagerInstance = {
                    option: function() {
                        return false
                    },
                    element: function() {
                        return __widgetRootElementRef.current
                    },
                    _createActionByOption: function() {
                        return _noop.default
                    }
                };
                return (0, _accessibility.registerKeyboardAction)("pager", fakePagerInstance, element, void 0, action)
            }
        }
    }, []);
    var __infoVisible = (0, _hooks.useCallback)(function() {
        var infoTextVisible = props.infoTextVisible,
            showInfo = props.showInfo;
        return showInfo && infoTextVisible && __isLargeDisplayMode()
    }, [props.infoTextVisible, props.showInfo, props.displayMode, props.lightModeEnabled, props.isLargeDisplayMode]);
    var __normalizedDisplayMode = (0, _hooks.useCallback)(function() {
        var displayMode = props.displayMode,
            lightModeEnabled = props.lightModeEnabled;
        if ("adaptive" === displayMode && void 0 !== lightModeEnabled) {
            return lightModeEnabled ? "compact" : "full"
        }
        return displayMode
    }, [props.displayMode, props.lightModeEnabled]);
    var __pagesContainerVisible = (0, _hooks.useCallback)(function() {
        return !!props.pagesNavigatorVisible && props.pageCount > 0
    }, [props.pagesNavigatorVisible, props.pageCount]);
    var __pagesContainerVisibility = (0, _hooks.useCallback)(function() {
        if ("auto" === props.pagesNavigatorVisible && 1 === props.pageCount && props.hasKnownLastPage) {
            return "hidden"
        }
        return
    }, [props.pagesNavigatorVisible, props.pageCount, props.hasKnownLastPage]);
    var __isLargeDisplayMode = (0, _hooks.useCallback)(function() {
        var displayMode = __normalizedDisplayMode();
        var result = false;
        if ("adaptive" === displayMode) {
            result = props.isLargeDisplayMode
        } else {
            result = "full" === displayMode
        }
        return result
    }, [props.displayMode, props.lightModeEnabled, props.isLargeDisplayMode]);
    var __classes = (0, _hooks.useCallback)(function() {
        var _classesMap;
        var classesMap = (_classesMap = {}, _defineProperty(_classesMap, "".concat(props.className), !!props.className), _defineProperty(_classesMap, _consts.PAGER_CLASS, true), _defineProperty(_classesMap, _consts.LIGHT_MODE_CLASS, !__isLargeDisplayMode()), _classesMap);
        return (0, _combine_classes.combineClasses)(classesMap)
    }, [props.className, props.displayMode, props.lightModeEnabled, props.isLargeDisplayMode]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$rootElementRef2, _props$pageSizesRef, _props$pagesRef, _props$infoTextRef;
        var _props$rootElementRef = _objectSpread(_objectSpread({}, props), {}, {
                rootElementRef: null === (_props$rootElementRef2 = props.rootElementRef) || void 0 === _props$rootElementRef2 ? void 0 : _props$rootElementRef2.current,
                pageSizesRef: null === (_props$pageSizesRef = props.pageSizesRef) || void 0 === _props$pageSizesRef ? void 0 : _props$pageSizesRef.current,
                pagesRef: null === (_props$pagesRef = props.pagesRef) || void 0 === _props$pagesRef ? void 0 : _props$pagesRef.current,
                infoTextRef: null === (_props$infoTextRef = props.infoTextRef) || void 0 === _props$infoTextRef ? void 0 : _props$infoTextRef.current,
                pageIndex: void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex,
                pageSize: void 0 !== props.pageSize ? props.pageSize : __state_pageSize
            }),
            restProps = (_props$rootElementRef.className, _props$rootElementRef.defaultPageIndex, _props$rootElementRef.defaultPageSize, _props$rootElementRef.displayMode, _props$rootElementRef.gridCompatibility, _props$rootElementRef.hasKnownLastPage, _props$rootElementRef.infoText, _props$rootElementRef.infoTextRef, _props$rootElementRef.infoTextVisible, _props$rootElementRef.isLargeDisplayMode, _props$rootElementRef.lightModeEnabled, _props$rootElementRef.maxPagesCount, _props$rootElementRef.pageCount, _props$rootElementRef.pageIndex, _props$rootElementRef.pageIndexChange, _props$rootElementRef.pageSize, _props$rootElementRef.pageSizeChange, _props$rootElementRef.pageSizes, _props$rootElementRef.pageSizesRef, _props$rootElementRef.pagesCountText, _props$rootElementRef.pagesNavigatorVisible, _props$rootElementRef.pagesRef, _props$rootElementRef.rootElementRef, _props$rootElementRef.rtlEnabled, _props$rootElementRef.showInfo, _props$rootElementRef.showNavigationButtons, _props$rootElementRef.showPageSizes, _props$rootElementRef.totalCount, _props$rootElementRef.visible, _objectWithoutProperties(_props$rootElementRef, ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "infoTextRef", "infoTextVisible", "isLargeDisplayMode", "lightModeEnabled", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pageSizesRef", "pagesCountText", "pagesNavigatorVisible", "pagesRef", "rootElementRef", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"]));
        return restProps
    }, [props, __state_pageIndex, __state_pageSize]);
    (0, _hooks.useEffect)(function() {
        if (props.rootElementRef) {
            props.rootElementRef.current = __widgetRootElementRef.current
        }
    }, []);
    return Preact.h(_keyboard_action_context.KeyboardActionContext.Provider, {
        value: __keyboardAction()
    }, viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            pageIndex: void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex,
            pageSize: void 0 !== props.pageSize ? props.pageSize : __state_pageSize
        }),
        widgetRootElementRef: __widgetRootElementRef,
        keyboardAction: __keyboardAction(),
        infoVisible: __infoVisible(),
        pagesContainerVisible: __pagesContainerVisible(),
        pagesContainerVisibility: __pagesContainerVisibility(),
        isLargeDisplayMode: __isLargeDisplayMode(),
        classes: __classes(),
        restAttributes: __restAttributes()
    }))
}
PagerContent.defaultProps = _objectSpread({}, PagerContentProps);
