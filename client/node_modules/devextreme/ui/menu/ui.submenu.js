/**
 * DevExtreme (ui/menu/ui.submenu.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _common = require("../../core/utils/common");
var _element = require("../../core/element");
var _position = _interopRequireDefault(require("../../animation/position"));
var _extend = require("../../core/utils/extend");
var _context_menu = _interopRequireDefault(require("../context_menu"));

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
var DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS = "dx-context-menu-content-delimiter";
var DX_SUBMENU_CLASS = "dx-submenu";
var Submenu = function(_ContextMenu) {
    _inheritsLoose(Submenu, _ContextMenu);

    function Submenu() {
        return _ContextMenu.apply(this, arguments) || this
    }
    var _proto = Submenu.prototype;
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_ContextMenu.prototype._getDefaultOptions.call(this), {
            orientation: "horizontal",
            tabIndex: null,
            onHoverStart: _common.noop
        })
    };
    _proto._initDataAdapter = function() {
        this._dataAdapter = this.option("_dataAdapter");
        if (!this._dataAdapter) {
            _ContextMenu.prototype._initDataAdapter.call(this)
        }
    };
    _proto._renderContentImpl = function() {
        this._renderContextMenuOverlay();
        _ContextMenu.prototype._renderContentImpl.call(this);
        var node = this._dataAdapter.getNodeByKey(this.option("_parentKey"));
        node && this._renderItems(this._getChildNodes(node));
        this._renderDelimiter()
    };
    _proto._renderDelimiter = function() {
        this.$contentDelimiter = (0, _renderer.default)("<div>").appendTo(this._itemContainer()).addClass(DX_CONTEXT_MENU_CONTENT_DELIMITER_CLASS)
    };
    _proto._getOverlayOptions = function() {
        return (0, _extend.extend)(_ContextMenu.prototype._getOverlayOptions.call(this), {
            onPositioned: this._overlayPositionedActionHandler.bind(this)
        })
    };
    _proto._overlayPositionedActionHandler = function(arg) {
        this._showDelimiter(arg)
    };
    _proto._hoverEndHandler = function(e) {
        _ContextMenu.prototype._hoverEndHandler.call(this, e);
        this._toggleFocusClass(false, e.currentTarget)
    };
    _proto._isMenuHorizontal = function() {
        return "horizontal" === this.option("orientation")
    };
    _proto._hoverStartHandler = function(e) {
        var hoverStartAction = this.option("onHoverStart");
        hoverStartAction(e);
        _ContextMenu.prototype._hoverStartHandler.call(this, e);
        this._toggleFocusClass(true, e.currentTarget)
    };
    _proto._drawSubmenu = function($rootItem) {
        this._actions.onShowing({
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        });
        _ContextMenu.prototype._drawSubmenu.call(this, $rootItem);
        this._actions.onShown({
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        })
    };
    _proto._hideSubmenu = function($rootItem) {
        this._actions.onHiding({
            cancel: true,
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        });
        _ContextMenu.prototype._hideSubmenu.call(this, $rootItem);
        this._actions.onHidden({
            rootItem: (0, _element.getPublicElement)($rootItem),
            submenu: this
        })
    };
    _proto._showDelimiter = function(arg) {
        if (!this.$contentDelimiter) {
            return
        }
        var $submenu = this._itemContainer().children(".".concat(DX_SUBMENU_CLASS)).eq(0);
        var $rootItem = this.option("position").of;
        var position = {
            of: $submenu
        };
        var containerOffset = arg.position;
        var vLocation = containerOffset.v.location;
        var hLocation = containerOffset.h.location;
        var rootOffset = $rootItem.offset();
        var offsetLeft = Math.round(rootOffset.left);
        var offsetTop = Math.round(rootOffset.top);
        var rootWidth = $rootItem.width();
        var rootHeight = $rootItem.height();
        var submenuWidth = $submenu.width();
        var submenuHeight = $submenu.height();
        this.$contentDelimiter.css("display", "block");
        this.$contentDelimiter.width(this._isMenuHorizontal() ? rootWidth < submenuWidth ? rootWidth - 2 : submenuWidth : 2);
        this.$contentDelimiter.height(this._isMenuHorizontal() ? 2 : rootHeight < submenuHeight ? rootHeight - 2 : submenuHeight);
        if (this._isMenuHorizontal()) {
            if (vLocation > offsetTop) {
                if (Math.round(hLocation) === offsetLeft) {
                    position.offset = "1 -1";
                    position.at = position.my = "left top"
                } else {
                    position.offset = "-1 -1";
                    position.at = position.my = "right top"
                }
            } else {
                this.$contentDelimiter.height(5);
                if (Math.round(hLocation) === offsetLeft) {
                    position.offset = "1 4";
                    position.at = position.my = "left bottom"
                } else {
                    position.offset = "-1 2";
                    position.at = position.my = "right bottom"
                }
            }
        } else {
            if (hLocation > offsetLeft) {
                if (Math.round(vLocation) === offsetTop) {
                    position.offset = "-1 1";
                    position.at = position.my = "left top"
                } else {
                    position.offset = "-1 -1";
                    position.at = position.my = "left bottom"
                }
            } else {
                if (Math.round(vLocation) === offsetTop) {
                    position.offset = "1 1";
                    position.at = position.my = "right top"
                } else {
                    position.offset = "1 -1";
                    position.at = position.my = "right bottom"
                }
            }
        }
        _position.default.setup(this.$contentDelimiter, position)
    };
    _proto._getContextMenuPosition = function() {
        return this.option("position")
    };
    _proto.isOverlayVisible = function() {
        return this._overlay.option("visible")
    };
    _proto.getOverlayContent = function() {
        return this._overlay.$content()
    };
    return Submenu
}(_context_menu.default);
var _default = Submenu;
exports.default = _default;
module.exports = exports.default;
