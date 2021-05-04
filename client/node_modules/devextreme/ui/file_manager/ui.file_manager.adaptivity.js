/**
 * DevExtreme (ui/file_manager/ui.file_manager.adaptivity.js)
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
var _type = require("../../core/utils/type");
var _window = require("../../core/utils/window");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _ui2 = _interopRequireDefault(require("../drawer/ui.drawer"));
var _splitter = _interopRequireDefault(require("../splitter"));

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
var window = (0, _window.getWindow)();
var ADAPTIVE_STATE_SCREEN_WIDTH = 573;
var FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS = "dx-filemanager-adaptivity-drawer-panel";
var DRAWER_PANEL_CONTENT_INITIAL = "dx-drawer-panel-content-initial";
var DRAWER_PANEL_CONTENT_ADAPTIVE = "dx-drawer-panel-content-adaptive";
var FileManagerAdaptivityControl = function(_Widget) {
    _inheritsLoose(FileManagerAdaptivityControl, _Widget);

    function FileManagerAdaptivityControl() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = FileManagerAdaptivityControl.prototype;
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this._initActions();
        this._isInAdaptiveState = false;
        var $drawer = (0, _renderer.default)("<div>").appendTo(this.$element());
        (0, _renderer.default)("<div>").addClass(FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS).appendTo($drawer);
        this._drawer = this._createComponent($drawer, _ui2.default);
        this._drawer.option({
            opened: true,
            template: this._createDrawerTemplate.bind(this)
        });
        (0, _renderer.default)(this._drawer.content()).addClass(DRAWER_PANEL_CONTENT_INITIAL);
        var $drawerContent = $drawer.find(".".concat(FILE_MANAGER_ADAPTIVITY_DRAWER_PANEL_CLASS)).first();
        var contentRenderer = this.option("contentTemplate");
        if ((0, _type.isFunction)(contentRenderer)) {
            contentRenderer($drawerContent)
        }
        this._updateDrawerMaxSize()
    };
    _proto._createDrawerTemplate = function(container) {
        this.option("drawerTemplate")(container);
        this._splitter = this._createComponent("<div>", _splitter.default, {
            container: this.$element(),
            leftElement: (0, _renderer.default)(this._drawer.content()),
            rightElement: (0, _renderer.default)(this._drawer.viewContent()),
            onApplyPanelSize: this._onApplyPanelSize.bind(this),
            onActiveStateChanged: this._onActiveStateChanged.bind(this)
        });
        this._splitter.$element().appendTo(container);
        this._splitter.disableSplitterCalculation(true)
    };
    _proto._render = function() {
        _Widget.prototype._render.call(this);
        this._checkAdaptiveState()
    };
    _proto._onApplyPanelSize = function(e) {
        if (!(0, _window.hasWindow)()) {
            return
        }
        if (!this._splitter.isSplitterMoved()) {
            this._setDrawerWidth("");
            return
        }(0, _renderer.default)(this._drawer.content()).removeClass(DRAWER_PANEL_CONTENT_INITIAL);
        this._setDrawerWidth(e.leftPanelWidth)
    };
    _proto._onActiveStateChanged = function(_ref) {
        var isActive = _ref.isActive;
        this._splitter.disableSplitterCalculation(!isActive);
        !isActive && this._splitter.$element().css("left", "auto")
    };
    _proto._setDrawerWidth = function(width) {
        (0, _renderer.default)(this._drawer.content()).css("width", width);
        this._updateDrawerMaxSize();
        this._drawer.resizeViewContent()
    };
    _proto._updateDrawerMaxSize = function() {
        this._drawer.option("maxSize", this._drawer.getRealPanelWidth())
    };
    _proto._dimensionChanged = function(dimension) {
        if (!dimension || "height" !== dimension) {
            this._checkAdaptiveState()
        }
    };
    _proto._checkAdaptiveState = function() {
        var oldState = this._isInAdaptiveState;
        this._isInAdaptiveState = this._isSmallScreen();
        if (oldState !== this._isInAdaptiveState) {
            this.toggleDrawer(!this._isInAdaptiveState, true);
            (0, _renderer.default)(this._drawer.content()).toggleClass(DRAWER_PANEL_CONTENT_ADAPTIVE, this._isInAdaptiveState);
            this._raiseAdaptiveStateChanged(this._isInAdaptiveState)
        }
        if (this._isInAdaptiveState && this._isDrawerOpened()) {
            this._updateDrawerMaxSize()
        }
    };
    _proto._isSmallScreen = function() {
        return (0, _renderer.default)(window).width() <= ADAPTIVE_STATE_SCREEN_WIDTH
    };
    _proto._isDrawerOpened = function() {
        return this._drawer.option("opened")
    };
    _proto._initActions = function() {
        this._actions = {
            onAdaptiveStateChanged: this._createActionByOption("onAdaptiveStateChanged")
        }
    };
    _proto._raiseAdaptiveStateChanged = function(enabled) {
        this._actions.onAdaptiveStateChanged({
            enabled: enabled
        })
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            drawerTemplate: null,
            contentTemplate: null,
            onAdaptiveStateChanged: null
        })
    };
    _proto._optionChanged = function(args) {
        var name = args.name;
        switch (name) {
            case "drawerTemplate":
            case "contentTemplate":
                this.repaint();
                break;
            case "onAdaptiveStateChanged":
                this._actions[name] = this._createActionByOption(name);
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto.isInAdaptiveState = function() {
        return this._isInAdaptiveState
    };
    _proto.toggleDrawer = function(showing, skipAnimation) {
        this._updateDrawerMaxSize();
        this._drawer.option("animationEnabled", !skipAnimation);
        this._drawer.toggle(showing);
        var isSplitterActive = this._isDrawerOpened() && !this.isInAdaptiveState();
        this._splitter.toggleDisabled(!isSplitterActive)
    };
    return FileManagerAdaptivityControl
}(_ui.default);
var _default = FileManagerAdaptivityControl;
exports.default = _default;
module.exports = exports.default;
