/**
 * DevExtreme (ui/load_panel.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _common = require("../core/utils/common");
var _message = _interopRequireDefault(require("../localization/message"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _load_indicator = _interopRequireDefault(require("./load_indicator"));
var _overlay = _interopRequireDefault(require("./overlay"));
var _deferred = require("../core/utils/deferred");
var _themes = require("./themes");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var LOADPANEL_CLASS = "dx-loadpanel";
var LOADPANEL_WRAPPER_CLASS = "dx-loadpanel-wrapper";
var LOADPANEL_INDICATOR_CLASS = "dx-loadpanel-indicator";
var LOADPANEL_MESSAGE_CLASS = "dx-loadpanel-message";
var LOADPANEL_CONTENT_CLASS = "dx-loadpanel-content";
var LOADPANEL_CONTENT_WRAPPER_CLASS = "dx-loadpanel-content-wrapper";
var LOADPANEL_PANE_HIDDEN_CLASS = "dx-loadpanel-pane-hidden";
var LoadPanel = _overlay.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)(this.callBase(), {
            escape: _common.noop
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            message: _message.default.format("Loading"),
            width: 222,
            height: 90,
            animation: null,
            showIndicator: true,
            indicatorSrc: "",
            showPane: true,
            delay: 0,
            templatesRenderAsynchronously: false,
            hideTopOverlayHandler: null,
            resizeEnabled: false,
            focusStateEnabled: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "generic"
            },
            options: {
                shadingColor: "transparent"
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                message: "",
                width: 60,
                height: 60,
                maxHeight: 60,
                maxWidth: 60
            }
        }])
    },
    _init: function() {
        this.callBase.apply(this, arguments)
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(LOADPANEL_CLASS);
        this._wrapper().addClass(LOADPANEL_WRAPPER_CLASS)
    },
    _renderContentImpl: function() {
        this.callBase();
        this.$content().addClass(LOADPANEL_CONTENT_CLASS);
        this._$contentWrapper = (0, _renderer.default)("<div>").addClass(LOADPANEL_CONTENT_WRAPPER_CLASS);
        this._$contentWrapper.appendTo(this._$content);
        this._togglePaneVisible();
        this._cleanPreviousContent();
        this._renderLoadIndicator();
        this._renderMessage()
    },
    _show: function() {
        var delay = this.option("delay");
        if (!delay) {
            return this.callBase()
        }
        var deferred = new _deferred.Deferred;
        var callBase = this.callBase.bind(this);
        this._clearShowTimeout();
        this._showTimeout = setTimeout(function() {
            callBase().done(function() {
                deferred.resolve()
            })
        }, delay);
        return deferred.promise()
    },
    _hide: function() {
        this._clearShowTimeout();
        return this.callBase()
    },
    _clearShowTimeout: function() {
        clearTimeout(this._showTimeout)
    },
    _renderMessage: function() {
        if (!this._$contentWrapper) {
            return
        }
        var message = this.option("message");
        if (!message) {
            return
        }
        var $message = (0, _renderer.default)("<div>").addClass(LOADPANEL_MESSAGE_CLASS).text(message);
        this._$contentWrapper.append($message)
    },
    _renderLoadIndicator: function() {
        if (!this._$contentWrapper || !this.option("showIndicator")) {
            return
        }
        if (!this._$indicator) {
            this._$indicator = (0, _renderer.default)("<div>").addClass(LOADPANEL_INDICATOR_CLASS).appendTo(this._$contentWrapper)
        }
        this._createComponent(this._$indicator, _load_indicator.default, {
            indicatorSrc: this.option("indicatorSrc")
        })
    },
    _cleanPreviousContent: function() {
        this.$content().find("." + LOADPANEL_MESSAGE_CLASS).remove();
        this.$content().find("." + LOADPANEL_INDICATOR_CLASS).remove();
        delete this._$indicator
    },
    _togglePaneVisible: function() {
        this.$content().toggleClass(LOADPANEL_PANE_HIDDEN_CLASS, !this.option("showPane"))
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "delay":
                break;
            case "message":
            case "showIndicator":
                this._cleanPreviousContent();
                this._renderLoadIndicator();
                this._renderMessage();
                break;
            case "showPane":
                this._togglePaneVisible();
                break;
            case "indicatorSrc":
                this._renderLoadIndicator();
                break;
            default:
                this.callBase(args)
        }
    },
    _dispose: function() {
        this._clearShowTimeout();
        this.callBase()
    }
});
(0, _component_registrator.default)("dxLoadPanel", LoadPanel);
var _default = LoadPanel;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
