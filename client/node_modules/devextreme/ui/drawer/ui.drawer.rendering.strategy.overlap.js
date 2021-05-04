/**
 * DevExtreme (ui/drawer/ui.drawer.rendering.strategy.overlap.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiDrawer = require("./ui.drawer.animation");
var _uiDrawerRendering = _interopRequireDefault(require("./ui.drawer.rendering.strategy"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _translator = require("../../animation/translator");
var _overlay = _interopRequireDefault(require("../overlay"));
var _common = require("../../core/utils/common");
var _extend = require("../../core/utils/extend");
var _inflector = require("../../core/utils/inflector");

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
var OverlapStrategy = function(_DrawerStrategy) {
    _inheritsLoose(OverlapStrategy, _DrawerStrategy);

    function OverlapStrategy() {
        return _DrawerStrategy.apply(this, arguments) || this
    }
    var _proto = OverlapStrategy.prototype;
    _proto.renderPanelContent = function(whenPanelContentRendered) {
        var _this = this;
        delete this._initialPosition;
        var drawer = this.getDrawerInstance();
        var _drawer$option = drawer.option(),
            opened = _drawer$option.opened,
            minSize = _drawer$option.minSize;
        drawer._overlay = drawer._createComponent(drawer.content(), _overlay.default, {
            shading: false,
            container: drawer.getOverlayTarget(),
            position: this._getOverlayPosition(),
            width: opened ? "auto" : minSize || 0,
            height: "100%",
            templatesRenderAsynchronously: drawer.option("templatesRenderAsynchronously"),
            animation: {
                show: {
                    duration: 0
                }
            },
            onPositioned: function(e) {
                this._fixOverlayPosition(e.component.$content())
            }.bind(this),
            contentTemplate: drawer.option("template"),
            onContentReady: function(args) {
                whenPanelContentRendered.resolve();
                _this._processOverlayZIndex(args.component.content())
            },
            visible: true,
            propagateOutsideClick: true
        })
    };
    _proto._fixOverlayPosition = function($overlayContent) {
        var position = (0, _common.ensureDefined)(this._initialPosition, {
            left: 0,
            top: 0
        });
        (0, _translator.move)($overlayContent, position);
        if ("right" === this.getDrawerInstance().calcTargetPosition()) {
            $overlayContent.css("left", "auto")
        }
        if ("bottom" === this.getDrawerInstance().calcTargetPosition()) {
            $overlayContent.css("top", "auto");
            $overlayContent.css("bottom", "0px")
        }
    };
    _proto._getOverlayPosition = function() {
        var drawer = this.getDrawerInstance();
        var panelPosition = drawer.calcTargetPosition();
        var result = {};
        switch (panelPosition) {
            case "left":
                result = {
                    my: "top left",
                    at: "top left"
                };
                break;
            case "right":
                result = {
                    my: drawer.option("rtlEnabled") ? "top left" : "top right",
                    at: "top right"
                };
                break;
            case "top":
            case "bottom":
                result = {
                    my: panelPosition,
                    at: panelPosition
                }
        }
        result.of = drawer.getOverlayTarget();
        return result
    };
    _proto.refreshPanelElementSize = function(calcFromRealPanelSize) {
        var drawer = this.getDrawerInstance();
        var overlay = drawer.getOverlay();
        if (drawer.isHorizontalDirection()) {
            overlay.option("height", "100%");
            overlay.option("width", calcFromRealPanelSize ? drawer.getRealPanelWidth() : this._getPanelSize(drawer.option("opened")))
        } else {
            overlay.option("width", overlay.option("container").width());
            overlay.option("height", calcFromRealPanelSize ? drawer.getRealPanelHeight() : this._getPanelSize(drawer.option("opened")))
        }
    };
    _proto.onPanelContentRendered = function() {
        this._updateViewContentStyles()
    };
    _proto._updateViewContentStyles = function() {
        var drawer = this.getDrawerInstance();
        (0, _renderer.default)(drawer.viewContent()).css("padding" + (0, _inflector.camelize)(drawer.calcTargetPosition(), true), drawer.option("minSize"));
        (0, _renderer.default)(drawer.viewContent()).css("transform", "inherit")
    };
    _proto._slidePositionRendering = function(config, _, animate) {
        var drawer = this.getDrawerInstance();
        this._initialPosition = drawer.isHorizontalDirection() ? {
            left: config.panelOffset
        } : {
            top: config.panelOffset
        };
        var position = drawer.calcTargetPosition();
        this._updateViewContentStyles();
        if (animate) {
            var animationConfig = (0, _extend.extend)(config.defaultAnimationConfig, {
                $element: config.$panel,
                position: config.panelOffset,
                duration: drawer.option("animationDuration"),
                direction: position
            });
            _uiDrawer.animation.moveTo(animationConfig)
        } else {
            if (drawer.isHorizontalDirection()) {
                (0, _translator.move)(config.$panel, {
                    left: config.panelOffset
                })
            } else {
                (0, _translator.move)(config.$panel, {
                    top: config.panelOffset
                })
            }
        }
    };
    _proto._expandPositionRendering = function(config, _, animate) {
        var drawer = this.getDrawerInstance();
        this._initialPosition = {
            left: 0
        };
        var position = drawer.calcTargetPosition();
        this._updateViewContentStyles();
        (0, _translator.move)(config.$panelOverlayContent, {
            left: 0
        });
        if (animate) {
            var animationConfig = (0, _extend.extend)(config.defaultAnimationConfig, {
                $element: config.$panelOverlayContent,
                size: config.size,
                duration: drawer.option("animationDuration"),
                direction: position,
                marginTop: config.marginTop
            });
            _uiDrawer.animation.size(animationConfig)
        } else {
            if (drawer.isHorizontalDirection()) {
                (0, _renderer.default)(config.$panelOverlayContent).css("width", config.size)
            } else {
                (0, _renderer.default)(config.$panelOverlayContent).css("height", config.size);
                if ("bottom" === position) {
                    (0, _renderer.default)(config.$panelOverlayContent).css("marginTop", config.marginTop)
                }
            }
        }
    };
    _proto._getPositionRenderingConfig = function(isDrawerOpened) {
        var drawer = this.getDrawerInstance();
        var config = _DrawerStrategy.prototype._getPositionRenderingConfig.call(this, isDrawerOpened);
        return (0, _extend.extend)(config, {
            panelOffset: this._getPanelOffset(isDrawerOpened) * this.getDrawerInstance()._getPositionCorrection(),
            $panelOverlayContent: drawer.getOverlay().$content(),
            marginTop: drawer.getRealPanelHeight() - config.size
        })
    };
    _proto.getPanelContent = function() {
        return (0, _renderer.default)(this.getDrawerInstance().getOverlay().content())
    };
    _proto._processOverlayZIndex = function($element) {
        var styles = (0, _renderer.default)($element).get(0).style;
        var zIndex = styles.zIndex || 1;
        this.getDrawerInstance().setZIndex(zIndex)
    };
    _proto.isViewContentFirst = function(position) {
        return "right" === position || "bottom" === position
    };
    return OverlapStrategy
}(_uiDrawerRendering.default);
var _default = OverlapStrategy;
exports.default = _default;
module.exports = exports.default;
