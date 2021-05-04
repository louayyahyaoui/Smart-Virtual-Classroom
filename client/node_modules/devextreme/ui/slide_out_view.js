/**
 * DevExtreme (ui/slide_out_view.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _common = require("../core/utils/common");
var _click = require("../events/click");
var _translator = require("../animation/translator");
var _element = require("../core/element");
var _hide_callback = require("../mobile/hide_callback");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _ui = _interopRequireDefault(require("./widget/ui.widget"));
var _swipeable = _interopRequireDefault(require("../events/gesture/swipeable"));
var _empty_template = require("../core/templates/empty_template");
var _deferred = require("../core/utils/deferred");
var _window = require("../core/utils/window");
var _uiSlide_out_view = require("./slide_out_view/ui.slide_out_view.animation");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var SLIDEOUTVIEW_CLASS = "dx-slideoutview";
var SLIDEOUTVIEW_WRAPPER_CLASS = "dx-slideoutview-wrapper";
var SLIDEOUTVIEW_MENU_CONTENT_CLASS = "dx-slideoutview-menu-content";
var SLIDEOUTVIEW_CONTENT_CLASS = "dx-slideoutview-content";
var SLIDEOUTVIEW_SHIELD_CLASS = "dx-slideoutview-shield";
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var ANONYMOUS_TEMPLATE_NAME = "content";
var SlideOutView = _ui.default.inherit({
    ctor: function(element, options) {
        this.callBase(element, options);
        this._logDeprecatedComponentWarning("20.1", "dxDrawer")
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            menuPosition: "normal",
            menuVisible: false,
            swipeEnabled: true,
            menuTemplate: "menu",
            contentTemplate: "content",
            contentOffset: 45
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                android: true
            },
            options: {
                contentOffset: 54
            }
        }, {
            device: function(_device) {
                return "generic" === _device.platform && "desktop" !== _device.deviceType
            },
            options: {
                contentOffset: 56
            }
        }, {
            device: {
                win: true,
                phone: false
            },
            options: {
                contentOffset: 76
            }
        }])
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(SLIDEOUTVIEW_CLASS);
        this._whenAnimationComplete = void 0;
        this._whenMenuRendered = void 0;
        this._initHideTopOverlayHandler()
    },
    _initHideTopOverlayHandler: function() {
        this._hideMenuHandler = this.hideMenu.bind(this)
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            menu: new _empty_template.EmptyTemplate,
            content: new _empty_template.EmptyTemplate
        });
        this.callBase()
    },
    _initMarkup: function() {
        var _this = this;
        this.callBase();
        this._renderMarkup();
        this._whenMenuRendered = new _deferred.Deferred;
        var menuTemplate = this._getTemplate(this.option("menuTemplate"));
        menuTemplate && menuTemplate.render({
            container: this.menuContent(),
            onRendered: function() {
                _this._whenMenuRendered.resolve()
            }
        });
        var contentTemplateOption = this.option("contentTemplate");
        var contentTemplate = this._getTemplate(contentTemplateOption);
        var transclude = this._templateManager.anonymousTemplateName === contentTemplateOption;
        contentTemplate && contentTemplate.render({
            container: this.content(),
            noModel: true,
            transclude: transclude
        });
        this._renderShield();
        this._toggleMenuPositionClass()
    },
    _render: function() {
        var _this2 = this;
        this.callBase();
        this._whenMenuRendered.always(function() {
            _this2._initSwipeHandlers();
            _this2._dimensionChanged()
        })
    },
    _renderMarkup: function() {
        var $wrapper = (0, _renderer.default)("<div>").addClass(SLIDEOUTVIEW_WRAPPER_CLASS);
        this._$menu = (0, _renderer.default)("<div>").addClass(SLIDEOUTVIEW_MENU_CONTENT_CLASS);
        this._$container = (0, _renderer.default)("<div>").addClass(SLIDEOUTVIEW_CONTENT_CLASS);
        $wrapper.append(this._$menu);
        $wrapper.append(this._$container);
        this.$element().append($wrapper);
        _events_engine.default.on(this._$container, "MSPointerDown", _common.noop)
    },
    _renderShield: function() {
        this._$shield = this._$shield || (0, _renderer.default)("<div>").addClass(SLIDEOUTVIEW_SHIELD_CLASS);
        this._$shield.appendTo(this.content());
        _events_engine.default.off(this._$shield, _click.name);
        _events_engine.default.on(this._$shield, _click.name, this.hideMenu.bind(this));
        this._toggleShieldVisibility(this.option("menuVisible"))
    },
    _initSwipeHandlers: function() {
        this._createComponent((0, _renderer.default)(this.content()), _swipeable.default, {
            disabled: !this.option("swipeEnabled"),
            elastic: false,
            itemSizeFunc: this._getMenuWidth.bind(this),
            onStart: this._swipeStartHandler.bind(this),
            onUpdated: this._swipeUpdateHandler.bind(this),
            onEnd: this._swipeEndHandler.bind(this)
        })
    },
    _isRightMenuPosition: function() {
        var invertedPosition = "inverted" === this.option("menuPosition");
        var rtl = this.option("rtlEnabled");
        return rtl && !invertedPosition || !rtl && invertedPosition
    },
    _swipeStartHandler: function(e) {
        _uiSlide_out_view.animation.complete((0, _renderer.default)(this.content()));
        var event = e.event;
        var menuVisible = this.option("menuVisible");
        var rtl = this._isRightMenuPosition();
        event.maxLeftOffset = +(rtl ? !menuVisible : menuVisible);
        event.maxRightOffset = +(rtl ? menuVisible : !menuVisible);
        this._toggleShieldVisibility(true)
    },
    _swipeUpdateHandler: function(e) {
        var event = e.event;
        var offset = this.option("menuVisible") ? event.offset + 1 * this._getRTLSignCorrection() : event.offset;
        offset *= this._getRTLSignCorrection();
        this._renderPosition(offset, false)
    },
    _swipeEndHandler: function(e) {
        var targetOffset = e.event.targetOffset * this._getRTLSignCorrection() + this.option("menuVisible");
        var menuVisible = 0 !== targetOffset;
        if (this.option("menuVisible") === menuVisible) {
            this._renderPosition(this.option("menuVisible"), true)
        } else {
            this.option("menuVisible", menuVisible)
        }
    },
    _toggleMenuPositionClass: function() {
        var left = SLIDEOUTVIEW_CLASS + "-left";
        var right = SLIDEOUTVIEW_CLASS + "-right";
        var menuPosition = this._isRightMenuPosition() ? "right" : "left";
        this._$menu.removeClass(left + " " + right);
        this._$menu.addClass(SLIDEOUTVIEW_CLASS + "-" + menuPosition)
    },
    _renderPosition: function(offset, animate) {
        if (!(0, _window.hasWindow)()) {
            return
        }
        var pos = this._calculatePixelOffset(offset) * this._getRTLSignCorrection();
        this._toggleHideMenuCallback(offset);
        if (animate) {
            this._toggleShieldVisibility(true);
            _uiSlide_out_view.animation.moveTo((0, _renderer.default)(this.content()), pos, this._animationCompleteHandler.bind(this))
        } else {
            (0, _translator.move)((0, _renderer.default)(this.content()), {
                left: pos
            })
        }
    },
    _calculatePixelOffset: function(offset) {
        offset = offset || 0;
        return offset * this._getMenuWidth()
    },
    _getMenuWidth: function() {
        if (!this._menuWidth) {
            var maxMenuWidth = this.$element().width() - this.option("contentOffset");
            var menuContent = (0, _renderer.default)(this.menuContent());
            menuContent.css("maxWidth", maxMenuWidth < 0 ? 0 : maxMenuWidth);
            var currentMenuWidth = menuContent.width();
            this._menuWidth = Math.min(currentMenuWidth, maxMenuWidth)
        }
        return this._menuWidth
    },
    _animationCompleteHandler: function() {
        this._toggleShieldVisibility(this.option("menuVisible"));
        if (this._whenAnimationComplete) {
            this._whenAnimationComplete.resolveWith(this)
        }
    },
    _toggleHideMenuCallback: function(subscribe) {
        if (subscribe) {
            _hide_callback.hideCallback.add(this._hideMenuHandler)
        } else {
            _hide_callback.hideCallback.remove(this._hideMenuHandler)
        }
    },
    _getRTLSignCorrection: function() {
        return this._isRightMenuPosition() ? -1 : 1
    },
    _dispose: function() {
        _uiSlide_out_view.animation.complete((0, _renderer.default)(this.content()));
        this._toggleHideMenuCallback(false);
        this.callBase()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._dimensionChanged()
        }
    },
    _dimensionChanged: function() {
        delete this._menuWidth;
        this._renderPosition(this.option("menuVisible"), false)
    },
    _toggleShieldVisibility: function(visible) {
        this._$shield.toggleClass(INVISIBLE_STATE_CLASS, !visible)
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "width":
                this.callBase(args);
                this._dimensionChanged();
                break;
            case "contentOffset":
                this._dimensionChanged();
                break;
            case "menuVisible":
                this._renderPosition(args.value, true);
                break;
            case "menuPosition":
                this._renderPosition(this.option("menuVisible"), true);
                this._toggleMenuPositionClass();
                break;
            case "swipeEnabled":
                this._initSwipeHandlers();
                break;
            case "contentTemplate":
            case "menuTemplate":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    menuContent: function() {
        return (0, _element.getPublicElement)(this._$menu)
    },
    content: function() {
        return (0, _element.getPublicElement)(this._$container)
    },
    showMenu: function() {
        return this.toggleMenuVisibility(true)
    },
    hideMenu: function() {
        return this.toggleMenuVisibility(false)
    },
    toggleMenuVisibility: function(showing) {
        showing = void 0 === showing ? !this.option("menuVisible") : showing;
        this._whenAnimationComplete = new _deferred.Deferred;
        this.option("menuVisible", showing);
        return this._whenAnimationComplete.promise()
    }
});
(0, _component_registrator.default)("dxSlideOutView", SlideOutView);
var _default = SlideOutView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
