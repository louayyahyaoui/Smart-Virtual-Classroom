/**
 * DevExtreme (renovation/ui/pager/pages/large.js)
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
exports.PagesLarge = PagesLarge;
exports.viewFunction = void 0;
var _page = require("./page");
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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var PAGER_PAGE_SEPARATOR_CLASS = "dx-separator";
var viewFunction = function(_ref) {
    var pages = _ref.pages;
    var PagesMarkup = pages.map(function(_ref2) {
        var key = _ref2.key,
            pageProps = _ref2.pageProps;
        return pageProps ? Preact.h(_page.Page, {
            key: key,
            index: pageProps.index,
            selected: pageProps.selected,
            onClick: pageProps.onClick
        }) : Preact.h("div", {
            key: key,
            className: PAGER_PAGE_SEPARATOR_CLASS
        }, ". . .")
    });
    return Preact.h(Preact.Fragment, null, PagesMarkup)
};
exports.viewFunction = viewFunction;
var PAGES_LIMITER = 4;

function getDelimiterType(startIndex, slidingWindowSize, pageCount) {
    if (1 === startIndex) {
        return "high"
    }
    if (startIndex + slidingWindowSize === pageCount - 1) {
        return "low"
    }
    return "both"
}

function createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter) {
    var pageIndexes = [];
    var indexesForReuse = [];
    switch (delimiter) {
        case "none":
            pageIndexes = _toConsumableArray(slidingWindowIndexes);
            break;
        case "both":
            pageIndexes = [0, "low"].concat(_toConsumableArray(slidingWindowIndexes), ["high", pageCount - 1]);
            indexesForReuse = slidingWindowIndexes.slice(1, -1);
            break;
        case "high":
            pageIndexes = [0].concat(_toConsumableArray(slidingWindowIndexes), ["high", pageCount - 1]);
            indexesForReuse = slidingWindowIndexes.slice(0, -1);
            break;
        case "low":
            pageIndexes = [0, "low"].concat(_toConsumableArray(slidingWindowIndexes), [pageCount - 1]);
            indexesForReuse = slidingWindowIndexes.slice(1)
    }
    return {
        slidingWindowIndexes: slidingWindowIndexes,
        indexesForReuse: indexesForReuse,
        pageIndexes: pageIndexes
    }
}

function createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter) {
    var slidingWindowIndexes = [];
    for (var i = 0; i < slidingWindowSize; i += 1) {
        slidingWindowIndexes.push(i + startIndex)
    }
    return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter)
}
var PagesLargePropsType = {
    maxPagesCount: _pager_props.default.maxPagesCount,
    pageCount: _pager_props.default.pageCount,
    defaultPageIndex: _pager_props.default.pageIndex
};

function PagesLarge(props) {
    var __slidingWindowStateRef = (0, _hooks.useRef)();
    var _useState = (0, _hooks.useState)(function() {
            return void 0 !== props.pageIndex ? props.pageIndex : props.defaultPageIndex
        }),
        _useState2 = _slicedToArray(_useState, 2),
        __state_pageIndex = _useState2[0];
    _useState2[1];
    var config = (0, _hooks.useContext)(_config_context.ConfigContext);
    var __slidingWindowState = (0, _hooks.useCallback)(function() {
        var slidingWindowState = __slidingWindowStateRef.current;
        if (!slidingWindowState) {
            return {
                indexesForReuse: [],
                slidingWindowIndexes: []
            }
        }
        return slidingWindowState
    }, []);
    var __canReuseSlidingWindow = (0, _hooks.useCallback)(function(currentPageCount, pageIndex) {
        var _slidingWindowState = __slidingWindowState(),
            indexesForReuse = _slidingWindowState.indexesForReuse;
        var currentPageNotExistInIndexes = indexesForReuse.indexOf(currentPageCount) === -1;
        var pageIndexExistInIndexes = indexesForReuse.indexOf(pageIndex) !== -1;
        return currentPageNotExistInIndexes && pageIndexExistInIndexes
    }, []);
    var __generatePageIndexes = (0, _hooks.useCallback)(function() {
        var pageCount = props.pageCount;
        var startIndex = 0;
        var _slidingWindowState2 = __slidingWindowState(),
            slidingWindowIndexes = _slidingWindowState2.slidingWindowIndexes;
        if ((void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) === slidingWindowIndexes[0]) {
            startIndex = (void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) - 1
        } else {
            if ((void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) === slidingWindowIndexes[slidingWindowIndexes.length - 1]) {
                startIndex = (void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) + 2 - PAGES_LIMITER
            } else {
                if ((void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) < PAGES_LIMITER) {
                    startIndex = 1
                } else {
                    if ((void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) >= pageCount - PAGES_LIMITER) {
                        startIndex = pageCount - PAGES_LIMITER - 1
                    } else {
                        startIndex = (void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) - 1
                    }
                }
            }
        }
        var slidingWindowSize = PAGES_LIMITER;
        var delimiter = getDelimiterType(startIndex, slidingWindowSize, pageCount);
        var _createPageIndexes = createPageIndexes(startIndex, slidingWindowSize, pageCount, delimiter),
            pageIndexes = _createPageIndexes.pageIndexes,
            slidingWindowState = _objectWithoutProperties(_createPageIndexes, ["pageIndexes"]);
        __slidingWindowStateRef.current = slidingWindowState;
        return pageIndexes
    }, [props.pageCount, props.pageIndex, __state_pageIndex]);
    var __isSlidingWindowMode = (0, _hooks.useCallback)(function() {
        var maxPagesCount = props.maxPagesCount,
            pageCount = props.pageCount;
        return pageCount <= PAGES_LIMITER || pageCount <= maxPagesCount
    }, [props.maxPagesCount, props.pageCount]);
    var __onPageClick = (0, _hooks.useCallback)(function(pageIndex) {
        var _props$pageIndexChang;
        null === (_props$pageIndexChang = props.pageIndexChange) || void 0 === _props$pageIndexChang ? void 0 : _props$pageIndexChang.call(props, pageIndex)
    }, [props.pageIndexChange]);
    var __pageIndexes = (0, _hooks.useCallback)(function() {
        var pageCount = props.pageCount;
        if (__isSlidingWindowMode()) {
            return createPageIndexes(0, pageCount, pageCount, "none").pageIndexes
        }
        if (__canReuseSlidingWindow(pageCount, void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex)) {
            var _slidingWindowState3 = __slidingWindowState(),
                slidingWindowIndexes = _slidingWindowState3.slidingWindowIndexes;
            var delimiter = getDelimiterType(slidingWindowIndexes[0], PAGES_LIMITER, pageCount);
            return createPageIndexesBySlidingWindowIndexes(slidingWindowIndexes, pageCount, delimiter).pageIndexes
        }
        return __generatePageIndexes()
    }, [props.pageCount, props.maxPagesCount, props.pageIndex, __state_pageIndex]);
    var __pages = (0, _hooks.useCallback)(function() {
        var createPage = function(index) {
            var pagerProps = "low" === index || "high" === index ? null : {
                index: index,
                onClick: function() {
                    return __onPageClick(index)
                },
                selected: (void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex) === index
            };
            return {
                key: index.toString(),
                pageProps: pagerProps
            }
        };
        var rtlPageIndexes = null !== config && void 0 !== config && config.rtlEnabled ? _toConsumableArray(__pageIndexes()).reverse() : __pageIndexes();
        return rtlPageIndexes.map(function(index) {
            return createPage(index)
        })
    }, [props.pageIndex, __state_pageIndex, props.pageIndexChange, config, props.pageCount, props.maxPagesCount]);
    var __restAttributes = (0, _hooks.useCallback)(function() {
        var _props$pageIndex = _objectSpread(_objectSpread({}, props), {}, {
                pageIndex: void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex
            }),
            restProps = (_props$pageIndex.defaultPageIndex, _props$pageIndex.maxPagesCount, _props$pageIndex.pageCount, _props$pageIndex.pageIndex, _props$pageIndex.pageIndexChange, _objectWithoutProperties(_props$pageIndex, ["defaultPageIndex", "maxPagesCount", "pageCount", "pageIndex", "pageIndexChange"]));
        return restProps
    }, [props, __state_pageIndex]);
    return viewFunction({
        props: _objectSpread(_objectSpread({}, props), {}, {
            pageIndex: void 0 !== props.pageIndex ? props.pageIndex : __state_pageIndex
        }),
        slidingWindowStateRef: __slidingWindowStateRef,
        config: config,
        pageIndexes: __pageIndexes(),
        pages: __pages(),
        restAttributes: __restAttributes()
    })
}
PagesLarge.defaultProps = _objectSpread({}, PagesLargePropsType);
