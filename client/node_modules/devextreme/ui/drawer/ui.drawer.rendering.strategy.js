/**
 * DevExtreme (ui/drawer/ui.drawer.rendering.strategy.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiDrawer = require("./ui.drawer.animation");
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DrawerStrategy = function() {
    function DrawerStrategy(drawer) {
        this._drawer = drawer
    }
    var _proto = DrawerStrategy.prototype;
    _proto.getDrawerInstance = function() {
        return this._drawer
    };
    _proto.renderPanelContent = function(whenPanelContentRendered) {
        var drawer = this.getDrawerInstance();
        var template = drawer._getTemplate(drawer.option("template"));
        if (template) {
            template.render({
                container: drawer.content(),
                onRendered: function() {
                    whenPanelContentRendered.resolve()
                }
            })
        }
    };
    _proto.renderPosition = function(isDrawerOpened, animate) {
        this._prepareAnimationDeferreds(animate);
        var config = this._getPositionRenderingConfig(isDrawerOpened);
        if (this._useDefaultAnimation()) {
            this._defaultPositionRendering(config, isDrawerOpened, animate)
        } else {
            var revealMode = this.getDrawerInstance().option("revealMode");
            if ("slide" === revealMode) {
                this._slidePositionRendering(config, isDrawerOpened, animate)
            } else {
                if ("expand" === revealMode) {
                    this._expandPositionRendering(config, isDrawerOpened, animate)
                }
            }
        }
    };
    _proto._prepareAnimationDeferreds = function(animate) {
        var drawer = this.getDrawerInstance();
        this._contentAnimation = new _deferred.Deferred;
        this._panelAnimation = new _deferred.Deferred;
        this._shaderAnimation = new _deferred.Deferred;
        drawer._animations.push(this._contentAnimation, this._panelAnimation, this._shaderAnimation);
        if (animate) {
            _deferred.when.apply(_renderer.default, drawer._animations).done(function() {
                drawer._animationCompleteHandler()
            })
        } else {
            drawer.resizeViewContent()
        }
    };
    _proto._getPositionRenderingConfig = function(isDrawerOpened) {
        var drawer = this.getDrawerInstance();
        return {
            direction: drawer.calcTargetPosition(),
            $panel: (0, _renderer.default)(drawer.content()),
            $content: (0, _renderer.default)(drawer.viewContent()),
            defaultAnimationConfig: this._defaultAnimationConfig(),
            size: this._getPanelSize(isDrawerOpened)
        }
    };
    _proto._useDefaultAnimation = function() {
        return false
    };
    _proto._elementsAnimationCompleteHandler = function() {
        this._contentAnimation.resolve();
        this._panelAnimation.resolve()
    };
    _proto._defaultAnimationConfig = function() {
        var _this = this;
        return {
            complete: function() {
                _this._elementsAnimationCompleteHandler()
            }
        }
    };
    _proto._getPanelOffset = function(isDrawerOpened) {
        var drawer = this.getDrawerInstance();
        var size = drawer.isHorizontalDirection() ? drawer.getRealPanelWidth() : drawer.getRealPanelHeight();
        if (isDrawerOpened) {
            return -(size - drawer.getMaxSize())
        } else {
            return -(size - drawer.getMinSize())
        }
    };
    _proto._getPanelSize = function(isDrawerOpened) {
        return isDrawerOpened ? this.getDrawerInstance().getMaxSize() : this.getDrawerInstance().getMinSize()
    };
    _proto.renderShaderVisibility = function(isShaderVisible, animate, duration) {
        var _this2 = this;
        var drawer = this.getDrawerInstance();
        var fadeConfig = isShaderVisible ? {
            from: 0,
            to: 1
        } : {
            from: 1,
            to: 0
        };
        if (animate) {
            _uiDrawer.animation.fade((0, _renderer.default)(drawer._$shader), fadeConfig, duration, function() {
                _this2._drawer._toggleShaderVisibility(isShaderVisible);
                _this2._shaderAnimation.resolve()
            })
        } else {
            drawer._toggleShaderVisibility(isShaderVisible);
            drawer._$shader.css("opacity", fadeConfig.to)
        }
    };
    _proto.getPanelContent = function() {
        return (0, _renderer.default)(this.getDrawerInstance().content())
    };
    _proto.setPanelSize = function(calcFromRealPanelSize) {
        this.refreshPanelElementSize(calcFromRealPanelSize)
    };
    _proto.refreshPanelElementSize = function(calcFromRealPanelSize) {
        var drawer = this.getDrawerInstance();
        var panelSize = this._getPanelSize(drawer.option("opened"));
        if (drawer.isHorizontalDirection()) {
            (0, _renderer.default)(drawer.content()).width(calcFromRealPanelSize ? drawer.getRealPanelWidth() : panelSize)
        } else {
            (0, _renderer.default)(drawer.content()).height(calcFromRealPanelSize ? drawer.getRealPanelHeight() : panelSize)
        }
    };
    _proto.isViewContentFirst = function() {
        return false
    };
    _proto.onPanelContentRendered = function() {};
    return DrawerStrategy
}();
var _default = DrawerStrategy;
exports.default = _default;
module.exports = exports.default;
