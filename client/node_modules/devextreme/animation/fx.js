/**
 * DevExtreme (animation/fx.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _errors = _interopRequireDefault(require("../core/errors"));
var _element = require("../core/element");
var _extend = require("../core/utils/extend");
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _translator = require("./translator");
var _easing = require("./easing");
var _frame = require("./frame");
var _support = require("../core/utils/support");
var _position = _interopRequireDefault(require("./position"));
var _remove_event = _interopRequireDefault(require("../core/remove_event"));
var _index = require("../events/utils/index");
var _deferred = require("../core/utils/deferred");
var _common = require("../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

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
var window = (0, _window.getWindow)();
var removeEventName = (0, _index.addNamespace)(_remove_event.default, "dxFX");
var RELATIVE_VALUE_REGEX = /^([+-])=(.*)/i;
var ANIM_DATA_KEY = "dxAnimData";
var ANIM_QUEUE_KEY = "dxAnimQueue";
var TRANSFORM_PROP = "transform";
var TransitionAnimationStrategy = {
    initAnimation: function($element, config) {
        $element.css({
            transitionProperty: "none"
        });
        if ("string" === typeof config.from) {
            $element.addClass(config.from)
        } else {
            setProps($element, config.from)
        }
        var that = this;
        var deferred = new _deferred.Deferred;
        var cleanupWhen = config.cleanupWhen;
        config.transitionAnimation = {
            deferred: deferred,
            finish: function() {
                that._finishTransition($element);
                if (cleanupWhen) {
                    (0, _deferred.when)(deferred, cleanupWhen).always(function() {
                        that._cleanup($element, config)
                    })
                } else {
                    that._cleanup($element, config)
                }
                deferred.resolveWith($element, [config, $element])
            }
        };
        this._completeAnimationCallback($element, config).done(function() {
            config.transitionAnimation.finish()
        }).fail(function() {
            deferred.rejectWith($element, [config, $element])
        });
        if (!config.duration) {
            config.transitionAnimation.finish()
        }
        $element.css("transform")
    },
    animate: function($element, config) {
        this._startAnimation($element, config);
        return config.transitionAnimation.deferred.promise()
    },
    _completeAnimationCallback: function($element, config) {
        var that = this;
        var startTime = Date.now() + config.delay;
        var deferred = new _deferred.Deferred;
        var transitionEndFired = new _deferred.Deferred;
        var simulatedTransitionEndFired = new _deferred.Deferred;
        var simulatedEndEventTimer;
        var transitionEndEventFullName = (0, _support.transitionEndEventName)() + ".dxFX";
        config.transitionAnimation.cleanup = function() {
            clearTimeout(simulatedEndEventTimer);
            clearTimeout(waitForJSCompleteTimer);
            _events_engine.default.off($element, transitionEndEventFullName);
            _events_engine.default.off($element, removeEventName)
        };
        _events_engine.default.one($element, transitionEndEventFullName, function() {
            if (Date.now() - startTime >= config.duration) {
                transitionEndFired.reject()
            }
        });
        _events_engine.default.off($element, removeEventName);
        _events_engine.default.on($element, removeEventName, function() {
            that.stop($element, config);
            deferred.reject()
        });
        var waitForJSCompleteTimer = setTimeout(function() {
            simulatedEndEventTimer = setTimeout(function() {
                simulatedTransitionEndFired.reject()
            }, config.duration + config.delay + fx._simulatedTransitionEndDelay);
            (0, _deferred.when)(transitionEndFired, simulatedTransitionEndFired).fail(function() {
                deferred.resolve()
            }.bind(this))
        });
        return deferred.promise()
    },
    _startAnimation: function($element, config) {
        $element.css({
            transitionProperty: "all",
            transitionDelay: config.delay + "ms",
            transitionDuration: config.duration + "ms",
            transitionTimingFunction: config.easing
        });
        if ("string" === typeof config.to) {
            $element[0].className += " " + config.to
        } else {
            if (config.to) {
                setProps($element, config.to)
            }
        }
    },
    _finishTransition: function($element) {
        $element.css("transition", "none")
    },
    _cleanup: function($element, config) {
        config.transitionAnimation.cleanup();
        if ("string" === typeof config.from) {
            $element.removeClass(config.from);
            $element.removeClass(config.to)
        }
    },
    stop: function($element, config, jumpToEnd) {
        if (!config) {
            return
        }
        if (jumpToEnd) {
            config.transitionAnimation.finish()
        } else {
            if ((0, _type.isPlainObject)(config.to)) {
                (0, _iterator.each)(config.to, function(key) {
                    $element.css(key, $element.css(key))
                })
            }
            this._finishTransition($element);
            this._cleanup($element, config)
        }
    }
};
var FrameAnimationStrategy = {
    initAnimation: function($element, config) {
        setProps($element, config.from)
    },
    animate: function($element, config) {
        var deferred = new _deferred.Deferred;
        var that = this;
        if (!config) {
            return deferred.reject().promise()
        }(0, _iterator.each)(config.to, function(prop) {
            if (void 0 === config.from[prop]) {
                config.from[prop] = that._normalizeValue($element.css(prop))
            }
        });
        if (config.to[TRANSFORM_PROP]) {
            config.from[TRANSFORM_PROP] = that._parseTransform(config.from[TRANSFORM_PROP]);
            config.to[TRANSFORM_PROP] = that._parseTransform(config.to[TRANSFORM_PROP])
        }
        config.frameAnimation = {
            to: config.to,
            from: config.from,
            currentValue: config.from,
            easing: (0, _easing.convertTransitionTimingFuncToEasing)(config.easing),
            duration: config.duration,
            startTime: (new Date).valueOf(),
            finish: function() {
                this.currentValue = this.to;
                this.draw();
                (0, _frame.cancelAnimationFrame)(config.frameAnimation.animationFrameId);
                deferred.resolve()
            },
            draw: function() {
                if (config.draw) {
                    config.draw(this.currentValue);
                    return
                }
                var currentValue = (0, _extend.extend)({}, this.currentValue);
                if (currentValue[TRANSFORM_PROP]) {
                    currentValue[TRANSFORM_PROP] = (0, _iterator.map)(currentValue[TRANSFORM_PROP], function(value, prop) {
                        if ("translate" === prop) {
                            return (0, _translator.getTranslateCss)(value)
                        } else {
                            if ("scale" === prop) {
                                return "scale(" + value + ")"
                            } else {
                                if ("rotate" === prop.substr(0, prop.length - 1)) {
                                    return prop + "(" + value + "deg)"
                                }
                            }
                        }
                    }).join(" ")
                }
                $element.css(currentValue)
            }
        };
        if (config.delay) {
            config.frameAnimation.startTime += config.delay;
            config.frameAnimation.delayTimeout = setTimeout(function() {
                that._startAnimation($element, config)
            }, config.delay)
        } else {
            that._startAnimation($element, config)
        }
        return deferred.promise()
    },
    _startAnimation: function($element, config) {
        _events_engine.default.off($element, removeEventName);
        _events_engine.default.on($element, removeEventName, function() {
            if (config.frameAnimation) {
                (0, _frame.cancelAnimationFrame)(config.frameAnimation.animationFrameId)
            }
        });
        this._animationStep($element, config)
    },
    _parseTransform: function(transformString) {
        var result = {};
        (0, _iterator.each)(transformString.match(/\w+\d*\w*\([^)]*\)\s*/g), function(i, part) {
            var translateData = (0, _translator.parseTranslate)(part);
            var scaleData = part.match(/scale\((.+?)\)/);
            var rotateData = part.match(/(rotate.)\((.+)deg\)/);
            if (translateData) {
                result.translate = translateData
            }
            if (scaleData && scaleData[1]) {
                result.scale = parseFloat(scaleData[1])
            }
            if (rotateData && rotateData[1]) {
                result[rotateData[1]] = parseFloat(rotateData[2])
            }
        });
        return result
    },
    stop: function($element, config, jumpToEnd) {
        var frameAnimation = config && config.frameAnimation;
        if (!frameAnimation) {
            return
        }(0, _frame.cancelAnimationFrame)(frameAnimation.animationFrameId);
        clearTimeout(frameAnimation.delayTimeout);
        if (jumpToEnd) {
            frameAnimation.finish()
        }
        delete config.frameAnimation
    },
    _animationStep: function($element, config) {
        var frameAnimation = config && config.frameAnimation;
        if (!frameAnimation) {
            return
        }
        var now = (new Date).valueOf();
        if (now >= frameAnimation.startTime + frameAnimation.duration) {
            frameAnimation.finish();
            return
        }
        frameAnimation.currentValue = this._calcStepValue(frameAnimation, now - frameAnimation.startTime);
        frameAnimation.draw();
        var that = this;
        frameAnimation.animationFrameId = (0, _frame.requestAnimationFrame)(function() {
            that._animationStep($element, config)
        })
    },
    _calcStepValue: function(frameAnimation, currentDuration) {
        var calcValueRecursively = function calcValueRecursively(from, to) {
            var result = Array.isArray(to) ? [] : {};
            var calcEasedValue = function(propName) {
                var x = currentDuration / frameAnimation.duration;
                var t = currentDuration;
                var b = 1 * from[propName];
                var c = to[propName] - from[propName];
                var d = frameAnimation.duration;
                return (0, _easing.getEasing)(frameAnimation.easing)(x, t, b, c, d)
            };
            (0, _iterator.each)(to, function(propName, endPropValue) {
                if ("string" === typeof endPropValue && false === parseFloat(endPropValue, 10)) {
                    return true
                }
                result[propName] = "object" === _typeof(endPropValue) ? calcValueRecursively(from[propName], endPropValue) : calcEasedValue(propName)
            });
            return result
        };
        return calcValueRecursively(frameAnimation.from, frameAnimation.to)
    },
    _normalizeValue: function(value) {
        var numericValue = parseFloat(value, 10);
        if (false === numericValue) {
            return value
        }
        return numericValue
    }
};
var FallbackToNoAnimationStrategy = {
    initAnimation: function() {},
    animate: function() {
        return (new _deferred.Deferred).resolve().promise()
    },
    stop: _common.noop,
    isSynchronous: true
};
var getAnimationStrategy = function(config) {
    config = config || {};
    var animationStrategies = {
        transition: (0, _support.transition)() ? TransitionAnimationStrategy : FrameAnimationStrategy,
        frame: FrameAnimationStrategy,
        noAnimation: FallbackToNoAnimationStrategy
    };
    var strategy = config.strategy || "transition";
    if ("css" === config.type && !(0, _support.transition)()) {
        strategy = "noAnimation"
    }
    return animationStrategies[strategy]
};
var baseConfigValidator = function(config, animationType, validate, typeMessage) {
    (0, _iterator.each)(["from", "to"], function() {
        if (!validate(config[this])) {
            throw _errors.default.Error("E0010", animationType, this, typeMessage)
        }
    })
};
var isObjectConfigValidator = function(config, animationType) {
    return baseConfigValidator(config, animationType, function(target) {
        return (0, _type.isPlainObject)(target)
    }, "a plain object")
};
var isStringConfigValidator = function(config, animationType) {
    return baseConfigValidator(config, animationType, function(target) {
        return "string" === typeof target
    }, "a string")
};
var CustomAnimationConfigurator = {
    setup: function() {}
};
var CssAnimationConfigurator = {
    validateConfig: function(config) {
        isStringConfigValidator(config, "css")
    },
    setup: function() {}
};
var positionAliases = {
    top: {
        my: "bottom center",
        at: "top center"
    },
    bottom: {
        my: "top center",
        at: "bottom center"
    },
    right: {
        my: "left center",
        at: "right center"
    },
    left: {
        my: "right center",
        at: "left center"
    }
};
var SlideAnimationConfigurator = {
    validateConfig: function(config) {
        isObjectConfigValidator(config, "slide")
    },
    setup: function($element, config) {
        var location = (0, _translator.locate)($element);
        if ("slide" !== config.type) {
            var positioningConfig = "slideIn" === config.type ? config.from : config.to;
            positioningConfig.position = (0, _extend.extend)({
                of: window
            }, positionAliases[config.direction]);
            setupPosition($element, positioningConfig)
        }
        this._setUpConfig(location, config.from);
        this._setUpConfig(location, config.to);
        (0, _translator.clearCache)($element)
    },
    _setUpConfig: function(location, config) {
        config.left = "left" in config ? config.left : "+=0";
        config.top = "top" in config ? config.top : "+=0";
        this._initNewPosition(location, config)
    },
    _initNewPosition: function(location, config) {
        var position = {
            left: config.left,
            top: config.top
        };
        delete config.left;
        delete config.top;
        var relativeValue = this._getRelativeValue(position.left);
        if (void 0 !== relativeValue) {
            position.left = relativeValue + location.left
        } else {
            config.left = 0
        }
        relativeValue = this._getRelativeValue(position.top);
        if (void 0 !== relativeValue) {
            position.top = relativeValue + location.top
        } else {
            config.top = 0
        }
        config[TRANSFORM_PROP] = (0, _translator.getTranslateCss)({
            x: position.left,
            y: position.top
        })
    },
    _getRelativeValue: function(value) {
        var relativeValue;
        if ("string" === typeof value && (relativeValue = RELATIVE_VALUE_REGEX.exec(value))) {
            return parseInt(relativeValue[1] + "1") * relativeValue[2]
        }
    }
};
var FadeAnimationConfigurator = {
    setup: function($element, config) {
        var from = config.from;
        var fromOpacity = (0, _type.isPlainObject)(from) ? config.skipElementInitialStyles ? 0 : $element.css("opacity") : String(from);
        var toOpacity;
        switch (config.type) {
            case "fadeIn":
                toOpacity = 1;
                break;
            case "fadeOut":
                toOpacity = 0;
                break;
            default:
                toOpacity = String(config.to)
        }
        config.from = {
            visibility: "visible",
            opacity: fromOpacity
        };
        config.to = {
            opacity: toOpacity
        }
    }
};
var PopAnimationConfigurator = {
    validateConfig: function(config) {
        isObjectConfigValidator(config, "pop")
    },
    setup: function($element, config) {
        var from = config.from;
        var to = config.to;
        var fromOpacity = "opacity" in from ? from.opacity : $element.css("opacity");
        var toOpacity = "opacity" in to ? to.opacity : 1;
        var fromScale = "scale" in from ? from.scale : 0;
        var toScale = "scale" in to ? to.scale : 1;
        config.from = {
            opacity: fromOpacity
        };
        var translate = (0, _translator.getTranslate)($element);
        config.from[TRANSFORM_PROP] = this._getCssTransform(translate, fromScale);
        config.to = {
            opacity: toOpacity
        };
        config.to[TRANSFORM_PROP] = this._getCssTransform(translate, toScale)
    },
    _getCssTransform: function(translate, scale) {
        return (0, _translator.getTranslateCss)(translate) + "scale(" + scale + ")"
    }
};
var animationConfigurators = {
    custom: CustomAnimationConfigurator,
    slide: SlideAnimationConfigurator,
    slideIn: SlideAnimationConfigurator,
    slideOut: SlideAnimationConfigurator,
    fade: FadeAnimationConfigurator,
    fadeIn: FadeAnimationConfigurator,
    fadeOut: FadeAnimationConfigurator,
    pop: PopAnimationConfigurator,
    css: CssAnimationConfigurator
};
var getAnimationConfigurator = function(config) {
    var result = animationConfigurators[config.type];
    if (!result) {
        throw _errors.default.Error("E0011", config.type)
    }
    return result
};
var defaultJSConfig = {
    type: "custom",
    from: {},
    to: {},
    duration: 400,
    start: _common.noop,
    complete: _common.noop,
    easing: "ease",
    delay: 0
};
var defaultCssConfig = {
    duration: 400,
    easing: "ease",
    delay: 0
};

function setupAnimationOnElement() {
    var animation = this;
    var $element = animation.element;
    var config = animation.config;
    setupPosition($element, config.from);
    setupPosition($element, config.to);
    animation.configurator.setup($element, config);
    $element.data(ANIM_DATA_KEY, animation);
    if (fx.off) {
        config.duration = 0;
        config.delay = 0
    }
    animation.strategy.initAnimation($element, config);
    if (config.start) {
        var element = (0, _element.getPublicElement)($element);
        config.start.apply(this, [element, config])
    }
}
var onElementAnimationComplete = function(animation) {
    var $element = animation.element;
    var config = animation.config;
    $element.removeData(ANIM_DATA_KEY);
    if (config.complete) {
        var element = (0, _element.getPublicElement)($element);
        config.complete.apply(this, [element, config])
    }
    animation.deferred.resolveWith(this, [$element, config])
};
var startAnimationOnElement = function() {
    var animation = this;
    var $element = animation.element;
    var config = animation.config;
    animation.isStarted = true;
    return animation.strategy.animate($element, config).done(function() {
        onElementAnimationComplete(animation)
    }).fail(function() {
        animation.deferred.rejectWith(this, [$element, config])
    })
};
var stopAnimationOnElement = function(jumpToEnd) {
    var animation = this;
    var $element = animation.element;
    var config = animation.config;
    clearTimeout(animation.startTimeout);
    if (!animation.isStarted) {
        animation.start()
    }
    animation.strategy.stop($element, config, jumpToEnd)
};
var scopedRemoveEvent = (0, _index.addNamespace)(_remove_event.default, "dxFXStartAnimation");
var subscribeToRemoveEvent = function(animation) {
    _events_engine.default.off(animation.element, scopedRemoveEvent);
    _events_engine.default.on(animation.element, scopedRemoveEvent, function() {
        fx.stop(animation.element)
    });
    animation.deferred.always(function() {
        _events_engine.default.off(animation.element, scopedRemoveEvent)
    })
};
var createAnimation = function(element, initialConfig) {
    var defaultConfig = "css" === initialConfig.type ? defaultCssConfig : defaultJSConfig;
    var config = (0, _extend.extend)(true, {}, defaultConfig, initialConfig);
    var configurator = getAnimationConfigurator(config);
    var strategy = getAnimationStrategy(config);
    var animation = {
        element: (0, _renderer.default)(element),
        config: config,
        configurator: configurator,
        strategy: strategy,
        isSynchronous: strategy.isSynchronous,
        setup: setupAnimationOnElement,
        start: startAnimationOnElement,
        stop: stopAnimationOnElement,
        deferred: new _deferred.Deferred
    };
    if ((0, _type.isFunction)(configurator.validateConfig)) {
        configurator.validateConfig(config)
    }
    subscribeToRemoveEvent(animation);
    return animation
};
var animate = function(element, config) {
    var $element = (0, _renderer.default)(element);
    if (!$element.length) {
        return (new _deferred.Deferred).resolve().promise()
    }
    var animation = createAnimation($element, config);
    pushInAnimationQueue($element, animation);
    return animation.deferred.promise()
};

function pushInAnimationQueue($element, animation) {
    var queueData = getAnimQueueData($element);
    writeAnimQueueData($element, queueData);
    queueData.push(animation);
    if (!isAnimating($element)) {
        shiftFromAnimationQueue($element, queueData)
    }
}

function getAnimQueueData($element) {
    return $element.data(ANIM_QUEUE_KEY) || []
}

function writeAnimQueueData($element, queueData) {
    $element.data(ANIM_QUEUE_KEY, queueData)
}
var destroyAnimQueueData = function($element) {
    $element.removeData(ANIM_QUEUE_KEY)
};

function isAnimating($element) {
    return !!$element.data(ANIM_DATA_KEY)
}

function shiftFromAnimationQueue($element, queueData) {
    queueData = getAnimQueueData($element);
    if (!queueData.length) {
        return
    }
    var animation = queueData.shift();
    if (0 === queueData.length) {
        destroyAnimQueueData($element)
    }
    executeAnimation(animation).done(function() {
        if (!isAnimating($element)) {
            shiftFromAnimationQueue($element)
        }
    })
}

function executeAnimation(animation) {
    animation.setup();
    if (fx.off || animation.isSynchronous) {
        animation.start()
    } else {
        animation.startTimeout = setTimeout(function() {
            animation.start()
        })
    }
    return animation.deferred.promise()
}

function setupPosition($element, config) {
    if (!config || !config.position) {
        return
    }
    var win = (0, _renderer.default)(window);
    var left = 0;
    var top = 0;
    var position = _position.default.calculate($element, config.position);
    var offset = $element.offset();
    var currentPosition = $element.position();
    if (currentPosition.top > offset.top) {
        top = win.scrollTop()
    }
    if (currentPosition.left > offset.left) {
        left = win.scrollLeft()
    }(0, _extend.extend)(config, {
        left: position.h.location - offset.left + currentPosition.left - left,
        top: position.v.location - offset.top + currentPosition.top - top
    });
    delete config.position
}

function setProps($element, props) {
    (0, _iterator.each)(props, function(key, value) {
        try {
            $element.css(key, (0, _type.isFunction)(value) ? value() : value)
        } catch (e) {}
    })
}
var stop = function(element, jumpToEnd) {
    var $element = (0, _renderer.default)(element);
    var queueData = getAnimQueueData($element);
    (0, _iterator.each)(queueData, function(_, animation) {
        animation.config.delay = 0;
        animation.config.duration = 0;
        animation.isSynchronous = true
    });
    if (!isAnimating($element)) {
        shiftFromAnimationQueue($element, queueData)
    }
    var animation = $element.data(ANIM_DATA_KEY);
    if (animation) {
        animation.stop(jumpToEnd)
    }
    $element.removeData(ANIM_DATA_KEY);
    destroyAnimQueueData($element)
};
var fx = {
    off: false,
    animationTypes: animationConfigurators,
    animate: animate,
    createAnimation: createAnimation,
    isAnimating: isAnimating,
    stop: stop,
    _simulatedTransitionEndDelay: 100
};
var _default = fx;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
