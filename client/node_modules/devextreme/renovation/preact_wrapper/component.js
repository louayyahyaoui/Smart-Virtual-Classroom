/**
 * DevExtreme (renovation/preact_wrapper/component.js)
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
exports.default = void 0;
var Preact = _interopRequireWildcard(require("preact"));
var _hooks = require("preact/hooks");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _dom_component = _interopRequireDefault(require("../../core/dom_component"));
var _extend = require("../../core/utils/extend");
var _utils = require("./utils");
var _element = require("../../core/element");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

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

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var setDefaultOptionValue = function(options, defaultValueGetter) {
    return function(name) {
        if (options.hasOwnProperty(name) && void 0 === options[name]) {
            options[name] = defaultValueGetter(name)
        }
    }
};
var PreactWrapper = function(_DOMComponent) {
    _inheritsLoose(PreactWrapper, _DOMComponent);

    function PreactWrapper() {
        return _DOMComponent.apply(this, arguments) || this
    }
    var _proto = PreactWrapper.prototype;
    _proto._getDefaultOptions = function() {
        var _this = this;
        return (0, _extend.extend)(true, _DOMComponent.prototype._getDefaultOptions.call(this), this._viewComponent.defaultProps, this._propsInfo.twoWay.reduce(function(options, _ref) {
            var _objectSpread2;
            var _ref2 = _slicedToArray(_ref, 3),
                name = _ref2[0],
                defaultValue = _ref2[1],
                eventName = _ref2[2];
            return _objectSpread(_objectSpread({}, options), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, name, defaultValue), _defineProperty(_objectSpread2, eventName, function(value) {
                return _this.option(name, value)
            }), _objectSpread2))
        }, {}))
    };
    _proto._initMarkup = function() {
        var props = this.getProps();
        if (this._shouldRefresh) {
            this._shouldRefresh = false;
            this._renderPreact(_objectSpread(_objectSpread({}, props), {}, {
                width: null,
                height: null,
                style: "",
                className: "",
                children: null
            }))
        }
        this._renderPreact(props)
    };
    _proto._renderPreact = function(props) {
        var containerNode = this.$element()[0];
        if (!containerNode.parentNode) {
            this._documentFragment.appendChild(containerNode)
        }
        Preact.render(Preact.h(this._viewComponent, props), containerNode, this._preactReplaced ? void 0 : containerNode);
        this._preactReplaced = true;
        if (containerNode.parentNode === this._documentFragment) {
            this._documentFragment.removeChild(containerNode)
        }
    };
    _proto._render = function() {};
    _proto._dispose = function() {
        Preact.render(null, this.$element()[0]);
        _DOMComponent.prototype._dispose.call(this)
    };
    _proto._patchOptionValues = function(options) {
        var _this2 = this;
        var _this$_propsInfo = this._propsInfo,
            allowNull = _this$_propsInfo.allowNull,
            elements = _this$_propsInfo.elements,
            twoWay = _this$_propsInfo.twoWay;
        var defaultProps = this._viewComponent.defaultProps;
        allowNull.forEach(setDefaultOptionValue(options, function() {
            return null
        }));
        Object.keys(defaultProps).forEach(setDefaultOptionValue(options, function(name) {
            return defaultProps[name]
        }));
        twoWay.forEach(function(_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                name = _ref4[0],
                defaultValue = _ref4[1];
            return setDefaultOptionValue(options, function() {
                return defaultValue
            })(name)
        });
        elements.forEach(function(name) {
            if (name in options) {
                options[name] = _this2._patchElementParam(options[name])
            }
        });
        return options
    };
    _proto.getProps = function() {
        var options = this._patchOptionValues(_objectSpread(_objectSpread({}, this.option()), {}, {
            ref: this._viewRef,
            children: this._extractDefaultSlot()
        }));
        return _objectSpread(_objectSpread(_objectSpread(_objectSpread({}, options), this.elementAttr), options.elementAttr), {}, {
            className: [].concat(_toConsumableArray((this.elementAttr.class || "").split(" ")), _toConsumableArray((options.elementAttr.class || "").split(" "))).filter(function(c, i, a) {
                return c && a.indexOf(c) === i
            }).join(" ").trim(),
            "class": ""
        }, this._actionsMap)
    };
    _proto._getActionConfigs = function() {
        return {}
    };
    _proto._init = function() {
        var _this3 = this;
        _DOMComponent.prototype._init.call(this);
        this._documentFragment = _dom_adapter.default.createDocumentFragment();
        this._actionsMap = {};
        Object.keys(this._getActionConfigs()).forEach(function(name) {
            return _this3._addAction(name)
        });
        this._viewRef = Preact.createRef();
        this._supportedKeys = function() {
            return {}
        }
    };
    _proto._addAction = function(event, action) {
        if (!action) {
            var actionByOption = this._createActionByOption(event, this._getActionConfigs()[event]);
            action = function(actArgs) {
                Object.keys(actArgs).forEach(function(name) {
                    if (_dom_adapter.default.isNode(actArgs[name])) {
                        actArgs[name] = (0, _element.getPublicElement)((0, _renderer.default)(actArgs[name]))
                    }
                });
                return actionByOption(actArgs)
            }
        }
        this._actionsMap[event] = action
    };
    _proto._optionChanged = function(option) {
        var _ref5 = option || {},
            name = _ref5.name;
        if (name && this._getActionConfigs()[name]) {
            this._addAction(name)
        }
        _DOMComponent.prototype._optionChanged.call(this, option);
        this._invalidate()
    };
    _proto._extractDefaultSlot = function() {
        var _this4 = this;
        if (this.option("_hasAnonymousTemplateContent")) {
            var dummyDivRefCallback = function(dummyDivRef) {
                if (dummyDivRef) {
                    var parentNode = dummyDivRef.parentNode;
                    parentNode.removeChild(dummyDivRef);
                    _this4._getTemplate(_this4._templateManager.anonymousTemplateName).render({
                        container: (0, _element.getPublicElement)((0, _renderer.default)(parentNode)),
                        transclude: true
                    })
                }
            };
            return Preact.h(Preact.Fragment, {}, Preact.h("div", {
                style: {
                    display: "none"
                },
                ref: dummyDivRefCallback
            }))
        }
        return null
    };
    _proto._createTemplateComponent = function(props, templateOption) {
        if (!templateOption) {
            return
        }
        var template = this._getTemplate(templateOption);
        return function(_ref6) {
            var data = _ref6.data,
                index = _ref6.index;
            var dummyDivRef = (0, _hooks.useRef)();
            (0, _hooks.useLayoutEffect)(function() {
                var parentNode = dummyDivRef.current.parentNode;
                parentNode.removeChild(dummyDivRef.current);
                var $parent = (0, _renderer.default)(parentNode);
                var $children = $parent.contents();
                Object.keys(data).forEach(function(name) {
                    if (_dom_adapter.default.isNode(data[name])) {
                        data[name] = (0, _element.getPublicElement)((0, _renderer.default)(data[name]))
                    }
                });
                var $template = (0, _renderer.default)(template.render(_objectSpread({
                    container: (0, _element.getPublicElement)($parent),
                    model: data
                }, isFinite(index) ? {
                    index: index
                } : {})));
                if ($template.hasClass(TEMPLATE_WRAPPER_CLASS)) {
                    (0, _utils.wrapElement)($parent, $template)
                }
                var $newChildren = $parent.contents();
                return function() {
                    (0, _utils.removeDifferentElements)($children, $newChildren)
                }
            }, Object.keys(props).map(function(key) {
                return props[key]
            }));
            return Preact.h(Preact.Fragment, {}, Preact.h("div", {
                style: {
                    display: "none"
                },
                ref: dummyDivRef
            }))
        }
    };
    _proto._wrapKeyDownHandler = function(handler) {
        var _this5 = this;
        return function(options) {
            var keyName = options.keyName,
                originalEvent = options.originalEvent,
                which = options.which;
            var keys = _this5._supportedKeys();
            var func = keys[keyName] || keys[which];
            if (void 0 !== func) {
                var _handler = func.bind(_this5);
                var result = _handler(originalEvent, options);
                if (!result) {
                    originalEvent.cancel = true;
                    return originalEvent
                }
            }
            return null === handler || void 0 === handler ? void 0 : handler(originalEvent, options)
        }
    };
    _proto._toPublicElement = function(element) {
        return (0, _element.getPublicElement)((0, _renderer.default)(element))
    };
    _proto._patchElementParam = function(value) {
        var _result, _result2;
        var result;
        try {
            result = (0, _renderer.default)(value)
        } catch (error) {
            return value
        }
        result = null === (_result = result) || void 0 === _result ? void 0 : _result.get(0);
        return null !== (_result2 = result) && void 0 !== _result2 && _result2.nodeType ? result : value
    };
    _proto.repaint = function() {
        this._shouldRefresh = true;
        this._refresh()
    };
    _proto.registerKeyHandler = function(key, handler) {
        var currentKeys = this._supportedKeys();
        this._supportedKeys = function() {
            return _objectSpread(_objectSpread({}, currentKeys), {}, _defineProperty({}, key, handler))
        }
    };
    _proto.setAria = function() {
        throw new Error('"setAria" method is deprecated, use "aria" property instead')
    };
    _createClass(PreactWrapper, [{
        key: "viewRef",
        get: function() {
            return this._viewRef.current
        }
    }, {
        key: "elementAttr",
        get: function() {
            var _this$_storedClasses;
            if (!this._elementAttr) {
                var attributes = this.$element()[0].attributes;
                this._elementAttr = _objectSpread({}, Object.keys(attributes).reduce(function(a, key) {
                    if (attributes[key].specified) {
                        a[attributes[key].name] = attributes[key].value
                    }
                    return a
                }, {}))
            }
            var elemStyle = this.$element()[0].style;
            var style = {};
            for (var i = 0; i < elemStyle.length; i++) {
                style[elemStyle[i]] = elemStyle.getPropertyValue(elemStyle[i])
            }
            this._elementAttr.style = style;
            var cssClass = this.$element()[0].getAttribute("class") || "";
            this._storedClasses = null !== (_this$_storedClasses = this._storedClasses) && void 0 !== _this$_storedClasses ? _this$_storedClasses : cssClass.split(" ").filter(function(name) {
                return 0 === name.indexOf("dx-")
            }).join(" ");
            this._elementAttr.class = cssClass.split(" ").filter(function(name) {
                return 0 !== name.indexOf("dx-")
            }).concat(this._storedClasses).join(" ").trim();
            return this._elementAttr
        }
    }]);
    return PreactWrapper
}(_dom_component.default);
exports.default = PreactWrapper;
PreactWrapper.IS_RENOVATED_WIDGET = false;
PreactWrapper.IS_RENOVATED_WIDGET = true;
module.exports = exports.default;
