/**
 * DevExtreme (ui/scheduler/tooltip_strategies/mobileTooltipStrategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.MobileTooltipStrategy = void 0;
var _overlay = _interopRequireDefault(require("../../overlay"));
var _tooltipStrategyBase = require("./tooltipStrategyBase");
var _window = require("../../../core/utils/window");
var _renderer = _interopRequireDefault(require("../../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var SLIDE_PANEL_CLASS_NAME = "dx-scheduler-overlay-panel";
var MAX_TABLET_OVERLAY_HEIGHT_FACTOR = .9;
var MAX_HEIGHT = {
    PHONE: 250,
    TABLET: "90%",
    DEFAULT: "auto"
};
var MAX_WIDTH = {
    PHONE: "100%",
    TABLET: "80%"
};
var animationConfig = {
    show: {
        type: "slide",
        duration: 300,
        from: {
            position: {
                my: "top",
                at: "bottom",
                of: (0, _window.getWindow)()
            }
        },
        to: {
            position: {
                my: "center",
                at: "center",
                of: (0, _window.getWindow)()
            }
        }
    },
    hide: {
        type: "slide",
        duration: 300,
        to: {
            position: {
                my: "top",
                at: "bottom",
                of: (0, _window.getWindow)()
            }
        },
        from: {
            position: {
                my: "center",
                at: "center",
                of: (0, _window.getWindow)()
            }
        }
    }
};
var createPhoneDeviceConfig = function(listHeight) {
    return {
        shading: false,
        width: MAX_WIDTH.PHONE,
        height: listHeight > MAX_HEIGHT.PHONE ? MAX_HEIGHT.PHONE : MAX_HEIGHT.DEFAULT,
        position: {
            my: "bottom",
            at: "bottom",
            of: (0, _window.getWindow)()
        }
    }
};
var createTabletDeviceConfig = function(listHeight) {
    var currentMaxHeight = (0, _renderer.default)((0, _window.getWindow)()).height() * MAX_TABLET_OVERLAY_HEIGHT_FACTOR;
    return {
        shading: true,
        width: MAX_WIDTH.TABLET,
        height: listHeight > currentMaxHeight ? MAX_HEIGHT.TABLET : MAX_HEIGHT.DEFAULT,
        position: {
            my: "center",
            at: "center",
            of: (0, _window.getWindow)()
        }
    }
};
var MobileTooltipStrategy = function(_TooltipStrategyBase) {
    _inheritsLoose(MobileTooltipStrategy, _TooltipStrategyBase);

    function MobileTooltipStrategy() {
        return _TooltipStrategyBase.apply(this, arguments) || this
    }
    var _proto = MobileTooltipStrategy.prototype;
    _proto._shouldUseTarget = function() {
        return false
    };
    _proto._onShowing = function() {
        var isTabletWidth = (0, _renderer.default)((0, _window.getWindow)()).width() > 700;
        this._tooltip.option("height", MAX_HEIGHT.DEFAULT);
        var listHeight = this._list.$element().outerHeight();
        this._tooltip.option(isTabletWidth ? createTabletDeviceConfig(listHeight) : createPhoneDeviceConfig(listHeight))
    };
    _proto._createTooltip = function(target, dataList) {
        var _this = this;
        var element = this._createTooltipElement(SLIDE_PANEL_CLASS_NAME);
        return this._options.createComponent(element, _overlay.default, {
            target: (0, _window.getWindow)(),
            closeOnOutsideClick: true,
            animation: animationConfig,
            onShowing: function() {
                return _this._onShowing()
            },
            onShown: this._onShown.bind(this),
            contentTemplate: this._getContentTemplate(dataList)
        })
    };
    return MobileTooltipStrategy
}(_tooltipStrategyBase.TooltipStrategyBase);
exports.MobileTooltipStrategy = MobileTooltipStrategy;
