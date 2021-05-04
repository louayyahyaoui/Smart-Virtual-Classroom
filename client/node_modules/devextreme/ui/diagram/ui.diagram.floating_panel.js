/**
 * DevExtreme (ui/diagram/ui.diagram.floating_panel.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _popup = _interopRequireDefault(require("../popup"));
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.panel"));

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
var DIAGRAM_MOBILE_POPUP_CLASS = "dx-diagram-mobile-popup";
var DiagramFloatingPanel = function(_DiagramPanel) {
    _inheritsLoose(DiagramFloatingPanel, _DiagramPanel);

    function DiagramFloatingPanel() {
        return _DiagramPanel.apply(this, arguments) || this
    }
    var _proto = DiagramFloatingPanel.prototype;
    _proto._init = function() {
        _DiagramPanel.prototype._init.call(this);
        this._createOnVisibilityChangingAction();
        this._createOnVisibilityChangedAction()
    };
    _proto.isVisible = function() {
        return this.option("isVisible")
    };
    _proto.isMobileView = function() {
        return this.option("isMobileView")
    };
    _proto._initMarkup = function() {
        _DiagramPanel.prototype._initMarkup.call(this);
        var $parent = this.$element();
        var $popupElement = (0, _renderer.default)("<div>").addClass(this._getPopupClass()).addClass(this.isMobileView() && DIAGRAM_MOBILE_POPUP_CLASS).appendTo($parent);
        this._popup = this._createComponent($popupElement, _popup.default, this._getPopupOptions());
        this._updatePopupVisible()
    };
    _proto.show = function() {
        this.option("isVisible", true)
    };
    _proto.hide = function() {
        this.option("isVisible", false)
    };
    _proto.toggle = function() {
        this.option("isVisible", !this.isVisible())
    };
    _proto.repaint = function() {
        this._popup.repaint()
    };
    _proto._getPopupContent = function() {
        return this._popup.content()
    };
    _proto._getPopupTitle = function() {
        var $content = (0, _renderer.default)(this._getPopupContent());
        return $content.parent().find(".dx-popup-title")
    };
    _proto._getPointerUpElements = function() {
        return [this._getPopupContent(), this._getPopupTitle()]
    };
    _proto._getVerticalPaddingsAndBorders = function() {
        var $content = (0, _renderer.default)(this._getPopupContent());
        return $content.outerHeight() - $content.height()
    };
    _proto._getHorizontalPaddingsAndBorders = function() {
        var $content = (0, _renderer.default)(this._getPopupContent());
        return $content.outerWidth() - $content.width()
    };
    _proto._getPopupClass = function() {
        return ""
    };
    _proto._getPopupWidth = function() {
        return this.option("width") || "auto"
    };
    _proto._getPopupMaxWidth = function() {
        return this.option("maxWidth")
    };
    _proto._getPopupMinWidth = function() {
        return this.option("minWidth")
    };
    _proto._getPopupHeight = function() {
        return this.option("height") || "auto"
    };
    _proto._getPopupMaxHeight = function() {
        return this.option("maxHeight")
    };
    _proto._getPopupMinHeight = function() {
        return this.option("minHeight")
    };
    _proto._getPopupPosition = function() {
        return {}
    };
    _proto._getPopupContainer = function() {
        return this.option("container")
    };
    _proto._getPopupSlideAnimationObject = function(properties) {
        return (0, _extend.extend)({
            type: "slide",
            start: function() {
                (0, _renderer.default)("body").css("overflow", "hidden")
            },
            complete: function() {
                (0, _renderer.default)("body").css("overflow", "")
            }
        }, properties)
    };
    _proto._getPopupAnimation = function() {
        return {
            hide: {
                type: "fadeOut"
            },
            show: {
                type: "fadeIn"
            }
        }
    };
    _proto._getPopupOptions = function() {
        var _this = this;
        var that = this;
        return {
            animation: (0, _window.hasWindow)() ? this._getPopupAnimation() : null,
            shading: false,
            showTitle: false,
            focusStateEnabled: false,
            container: this._getPopupContainer(),
            width: this._getPopupWidth(),
            height: this._getPopupHeight(),
            maxWidth: this._getPopupMaxWidth(),
            maxHeight: this._getPopupMaxHeight(),
            minWidth: this._getPopupMinWidth(),
            minHeight: this._getPopupMinHeight(),
            position: this._getPopupPosition(),
            onContentReady: function() {
                that._renderPopupContent(that._popup.content())
            },
            onShowing: function() {
                _this._onVisibilityChangingAction({
                    visible: true,
                    component: _this
                })
            },
            onShown: function() {
                _this.option("isVisible", true);
                _this._onVisibilityChangedAction({
                    visible: true,
                    component: _this
                })
            },
            onHiding: function() {
                _this._onVisibilityChangingAction({
                    visible: false,
                    component: _this
                })
            },
            onHidden: function() {
                _this.option("isVisible", false);
                _this._onVisibilityChangedAction({
                    visible: false,
                    component: _this
                })
            }
        }
    };
    _proto._renderPopupContent = function($parent) {};
    _proto._updatePopupVisible = function() {
        this._popup.option("visible", this.isVisible())
    };
    _proto._createOnVisibilityChangingAction = function() {
        this._onVisibilityChangingAction = this._createActionByOption("onVisibilityChanging")
    };
    _proto._createOnVisibilityChangedAction = function() {
        this._onVisibilityChangedAction = this._createActionByOption("onVisibilityChanged")
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "onVisibilityChanging":
                this._createOnVisibilityChangingAction();
                break;
            case "onVisibilityChanged":
                this._createOnVisibilityChangedAction();
                break;
            case "container":
                this._popup.option("container", this._getPopupContainer());
                break;
            case "width":
                this._popup.option("width", this._getPopupWidth());
                break;
            case "height":
                this._popup.option("height", this._getPopupHeight());
                break;
            case "maxWidth":
                this._popup.option("maxWidth", this._getPopupMaxWidth());
                break;
            case "maxHeight":
                this._popup.option("maxHeight", this._getPopupMaxHeight());
                break;
            case "minWidth":
                this._popup.option("minWidth", this._getPopupMinWidth());
                break;
            case "minHeight":
                this._popup.option("minHeight", this._getPopupMinHeight());
                break;
            case "isMobileView":
                this._invalidate();
                break;
            case "isVisible":
                this._updatePopupVisible();
                break;
            default:
                _DiagramPanel.prototype._optionChanged.call(this, args)
        }
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_DiagramPanel.prototype._getDefaultOptions.call(this), {
            isVisible: true,
            isMobileView: false,
            offsetX: 0,
            offsetY: 0
        })
    };
    return DiagramFloatingPanel
}(_uiDiagram.default);
var _default = DiagramFloatingPanel;
exports.default = _default;
module.exports = exports.default;
