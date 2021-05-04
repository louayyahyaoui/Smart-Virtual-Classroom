/**
 * DevExtreme (ui/diagram/ui.diagram.js)
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
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _load_indicator = _interopRequireDefault(require("../load_indicator"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _data = require("../../core/utils/data");
var _position = _interopRequireDefault(require("../../animation/position"));
var _resize_callbacks = _interopRequireDefault(require("../../core/utils/resize_callbacks"));
var _diagram = require("./diagram.importer");
var _window = require("../../core/utils/window");
var _element = require("../../core/element");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _message = _interopRequireDefault(require("../../localization/message"));
var _number = _interopRequireDefault(require("../../localization/number"));
var zIndexPool = _interopRequireWildcard(require("../overlay/z_index"));
var _ui2 = _interopRequireDefault(require("../overlay/ui.overlay"));
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.toolbar"));
var _uiDiagram2 = _interopRequireDefault(require("./ui.diagram.main_toolbar"));
var _uiDiagram3 = _interopRequireDefault(require("./ui.diagram.history_toolbar"));
var _uiDiagram4 = _interopRequireDefault(require("./ui.diagram.view_toolbar"));
var _uiDiagram5 = _interopRequireDefault(require("./ui.diagram.properties_toolbar"));
var _uiDiagram6 = _interopRequireDefault(require("./ui.diagram.context_menu"));
var _uiDiagram7 = _interopRequireDefault(require("./ui.diagram.context_toolbox"));
var _uiDiagram8 = _interopRequireDefault(require("./ui.diagram.dialogs"));
var _uiDiagram9 = _interopRequireDefault(require("./ui.diagram.scroll_view"));
var _diagram2 = _interopRequireDefault(require("./diagram.toolbox_manager"));
var _uiDiagram10 = _interopRequireDefault(require("./ui.diagram.toolbox"));
var _uiDiagram11 = _interopRequireDefault(require("./ui.diagram.properties_panel"));
var _diagram3 = _interopRequireDefault(require("./diagram.options_update"));
var _uiDiagram12 = _interopRequireDefault(require("./ui.diagram.dialog_manager"));
var _diagram4 = _interopRequireDefault(require("./diagram.commands_manager"));
var _diagram5 = _interopRequireDefault(require("./diagram.nodes_option"));
var _diagram6 = _interopRequireDefault(require("./diagram.edges_option"));

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
var DIAGRAM_CLASS = "dx-diagram";
var DIAGRAM_FULLSCREEN_CLASS = "dx-diagram-fullscreen";
var DIAGRAM_TOOLBAR_WRAPPER_CLASS = DIAGRAM_CLASS + "-toolbar-wrapper";
var DIAGRAM_CONTENT_WRAPPER_CLASS = DIAGRAM_CLASS + "-content-wrapper";
var DIAGRAM_CONTENT_CLASS = DIAGRAM_CLASS + "-content";
var DIAGRAM_SCROLL_VIEW_CLASS = DIAGRAM_CLASS + "-scroll-view";
var DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS = DIAGRAM_CLASS + "-floating-toolbar-container";
var DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS = DIAGRAM_CLASS + "-properties-panel-toolbar-container";
var DIAGRAM_LOADING_INDICATOR_CLASS = DIAGRAM_CLASS + "-loading-indicator";
var DIAGRAM_FLOATING_PANEL_OFFSET = 12;
var DIAGRAM_DEFAULT_UNIT = "in";
var DIAGRAM_DEFAULT_ZOOMLEVEL = 1;
var DIAGRAM_DEFAULT_AUTOZOOM_MODE = "disabled";
var DIAGRAM_DEFAULT_PAGE_ORIENTATION = "portrait";
var DIAGRAM_DEFAULT_PAGE_COLOR = "#ffffff";
var DIAGRAM_MAX_MOBILE_WINDOW_WIDTH = 576;
var DIAGRAM_TOOLBOX_SHAPE_SPACING = 12;
var DIAGRAM_TOOLBOX_SHAPES_PER_ROW = 3;
var DIAGRAM_CONTEXT_TOOLBOX_SHAPE_SPACING = 12;
var DIAGRAM_CONTEXT_TOOLBOX_SHAPES_PER_ROW = 4;
var DIAGRAM_CONTEXT_TOOLBOX_DEFAULT_WIDTH = 152;
var DIAGRAM_NAMESPACE = "dxDiagramEvent";
var FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)("fullscreenchange", DIAGRAM_NAMESPACE);
var IE_FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)("msfullscreenchange", DIAGRAM_NAMESPACE);
var WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)("webkitfullscreenchange", DIAGRAM_NAMESPACE);
var MOZ_FULLSCREEN_CHANGE_EVENT_NAME = (0, _index.addNamespace)("mozfullscreenchange", DIAGRAM_NAMESPACE);
var Diagram = function(_Widget) {
    _inheritsLoose(Diagram, _Widget);

    function Diagram() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = Diagram.prototype;
    _proto._init = function() {
        this._updateDiagramLockCount = 0;
        this.toggleFullscreenLock = 0;
        this._browserResizeTimer = -1;
        this._toolbars = [];
        _Widget.prototype._init.call(this);
        this._initDiagram();
        this._createCustomCommand()
    };
    _proto._initMarkup = function() {
        var _this = this;
        _Widget.prototype._initMarkup.call(this);
        this._toolbars = [];
        delete this._isMobileScreenSize;
        var isServerSide = !(0, _window.hasWindow)();
        this.$element().addClass(DIAGRAM_CLASS);
        delete this._mainToolbar;
        if (this.option("mainToolbar.visible")) {
            this._renderMainToolbar()
        }
        var $contentWrapper = (0, _renderer.default)("<div>").addClass(DIAGRAM_CONTENT_WRAPPER_CLASS).appendTo(this.$element());
        delete this._historyToolbar;
        delete this._historyToolbarResizeCallback;
        if (this._isHistoryToolbarVisible()) {
            this._renderHistoryToolbar($contentWrapper)
        }
        delete this._propertiesToolbar;
        delete this._propertiesToolbarResizeCallback;
        if (this._isPropertiesPanelEnabled()) {
            this._renderPropertiesToolbar($contentWrapper)
        }
        delete this._viewToolbar;
        delete this._viewToolbarResizeCallback;
        if (this.option("viewToolbar.visible")) {
            this._renderViewToolbar($contentWrapper)
        }
        delete this._toolbox;
        delete this._toolboxResizeCallback;
        if (this._isToolboxEnabled()) {
            this._renderToolbox($contentWrapper)
        }
        delete this._propertiesPanel;
        delete this._propertiesPanelResizeCallback;
        if (this._isPropertiesPanelEnabled()) {
            this._renderPropertiesPanel($contentWrapper)
        }
        this._$content = (0, _renderer.default)("<div>").addClass(DIAGRAM_CONTENT_CLASS).appendTo($contentWrapper);
        delete this._contextMenu;
        if (this.option("contextMenu.enabled")) {
            this._renderContextMenu($contentWrapper)
        }
        delete this._contextToolbox;
        if (this.option("contextToolbox.enabled")) {
            this._renderContextToolbox($contentWrapper)
        }
        this._renderDialog($contentWrapper);
        if (!isServerSide) {
            var $scrollViewWrapper = (0, _renderer.default)("<div>").addClass(DIAGRAM_SCROLL_VIEW_CLASS).appendTo(this._$content);
            this._createComponent($scrollViewWrapper, _uiDiagram9.default, {
                onCreateDiagram: function(e) {
                    _this._diagramInstance.createDocument(e.$parent[0], e.scrollView)
                }
            })
        }
        if ((0, _window.hasWindow)()) {
            _resize_callbacks.default.add(function() {
                _this._killBrowserResizeTimer();
                _this._browserResizeTimer = setTimeout(function() {
                    return _this._processBrowserResize()
                }, 100)
            })
        }
        this._setCustomCommandChecked(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, this._isPropertiesPanelVisible());
        this._setCustomCommandChecked(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME, this._isToolboxVisible())
    };
    _proto._processBrowserResize = function() {
        this._isMobileScreenSize = void 0;
        this._processDiagramResize();
        this._killBrowserResizeTimer()
    };
    _proto._processDiagramResize = function() {
        if (this._historyToolbarResizeCallback) {
            this._historyToolbarResizeCallback.call(this)
        }
        if (this._propertiesToolbarResizeCallback) {
            this._propertiesToolbarResizeCallback.call(this)
        }
        if (this._propertiesPanelResizeCallback) {
            this._propertiesPanelResizeCallback.call(this)
        }
        if (this._viewToolbarResizeCallback) {
            this._viewToolbarResizeCallback.call(this)
        }
        if (this._toolboxResizeCallback) {
            this._toolboxResizeCallback.call(this)
        }
    };
    _proto._killBrowserResizeTimer = function() {
        if (this._browserResizeTimer > -1) {
            clearTimeout(this._browserResizeTimer)
        }
        this._browserResizeTimer = -1
    };
    _proto.isMobileScreenSize = function() {
        if (void 0 === this._isMobileScreenSize) {
            this._isMobileScreenSize = (0, _window.hasWindow)() && this.$element().outerWidth() < DIAGRAM_MAX_MOBILE_WINDOW_WIDTH
        }
        return this._isMobileScreenSize
    };
    _proto._captureFocus = function() {
        if (this._diagramInstance) {
            this._diagramInstance.captureFocus()
        }
    };
    _proto._captureFocusOnTimeout = function() {
        var _this2 = this;
        this._captureFocusTimeout = setTimeout(function() {
            _this2._captureFocus();
            delete _this2._captureFocusTimeout
        }, 100)
    };
    _proto._killCaptureFocusTimeout = function() {
        if (this._captureFocusTimeout) {
            clearTimeout(this._captureFocusTimeout);
            delete this._captureFocusTimeout
        }
    };
    _proto.notifyBarCommandExecuted = function() {
        this._captureFocusOnTimeout()
    };
    _proto._registerToolbar = function(component) {
        this._registerBar(component);
        this._toolbars.push(component)
    };
    _proto._registerBar = function(component) {
        component.bar.onChanged.add(this);
        this._diagramInstance.registerBar(component.bar)
    };
    _proto._getExcludeCommands = function() {
        var excludeCommands = [];
        if (!this._isToolboxEnabled()) {
            excludeCommands.push(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME)
        }
        if (!this._isPropertiesPanelEnabled()) {
            excludeCommands.push(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME)
        }
        return excludeCommands
    };
    _proto._getToolbarBaseOptions = function() {
        var _this3 = this;
        return {
            onContentReady: function(_ref) {
                var component = _ref.component;
                return _this3._registerToolbar(component)
            },
            onSubMenuVisibilityChanging: function(_ref2) {
                var component = _ref2.component;
                return _this3._diagramInstance.updateBarItemsState(component.bar)
            },
            onPointerUp: this._onPanelPointerUp.bind(this),
            "export": this.option("export"),
            container: this.$element(),
            excludeCommands: this._getExcludeCommands(),
            onInternalCommand: this._onInternalCommand.bind(this),
            onCustomCommand: this._onCustomCommand.bind(this),
            isMobileView: this.isMobileScreenSize()
        }
    };
    _proto._onInternalCommand = function(e) {
        switch (e.command) {
            case _diagram4.default.SHOW_TOOLBOX_COMMAND_NAME:
                if (this._toolbox) {
                    this._toolbox.toggle()
                }
                break;
            case _diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME:
                if (this._propertiesPanel) {
                    this._propertiesPanel.toggle()
                }
        }
    };
    _proto._onCustomCommand = function(e) {
        this._customCommandAction({
            name: e.name
        })
    };
    _proto._renderMainToolbar = function() {
        var $toolbarWrapper = (0, _renderer.default)("<div>").addClass(DIAGRAM_TOOLBAR_WRAPPER_CLASS).appendTo(this.$element());
        this._mainToolbar = this._createComponent($toolbarWrapper, _uiDiagram2.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
            commands: this.option("mainToolbar.commands"),
            skipAdjustSize: true
        }))
    };
    _proto._isHistoryToolbarVisible = function() {
        return this.option("historyToolbar.visible") && !this.isReadOnlyMode()
    };
    _proto._renderHistoryToolbar = function($parent) {
        var _this4 = this;
        var isServerSide = !(0, _window.hasWindow)();
        var $container = (0, _renderer.default)("<div>").addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
        this._historyToolbar = this._createComponent($container, _uiDiagram3.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
            commands: this.option("historyToolbar.commands"),
            locateInMenu: "never"
        }));
        this._updateHistoryToolbarPosition($container, $parent, isServerSide);
        this._historyToolbarResizeCallback = function() {
            _this4._historyToolbar.option("isMobileView", _this4.isMobileScreenSize())
        }
    };
    _proto._updateHistoryToolbarPosition = function($container, $parent, isServerSide) {
        if (isServerSide) {
            return
        }
        _position.default.setup($container, {
            my: "left top",
            at: "left top",
            of: $parent,
            offset: DIAGRAM_FLOATING_PANEL_OFFSET + " " + DIAGRAM_FLOATING_PANEL_OFFSET
        })
    };
    _proto._isToolboxEnabled = function() {
        return "disabled" !== this.option("toolbox.visibility") && !this.isReadOnlyMode()
    };
    _proto._isToolboxVisible = function() {
        return "visible" === this.option("toolbox.visibility") || "auto" === this.option("toolbox.visibility") && !this.isMobileScreenSize()
    };
    _proto._renderToolbox = function($parent) {
        var _this5 = this;
        var isServerSide = !(0, _window.hasWindow)();
        var $toolBox = (0, _renderer.default)("<div>").appendTo($parent);
        var bounds = this._getToolboxBounds($parent, isServerSide);
        this._toolbox = this._createComponent($toolBox, _uiDiagram10.default, {
            isMobileView: this.isMobileScreenSize(),
            isVisible: this._isToolboxVisible(),
            container: this.$element(),
            height: bounds.height,
            offsetParent: $parent,
            offsetX: bounds.offsetX,
            offsetY: bounds.offsetY,
            showSearch: this.option("toolbox.showSearch"),
            toolboxGroups: this._getToolboxGroups(),
            toolboxWidth: this.option("toolbox.width"),
            onShapeCategoryRendered: function(e) {
                if (isServerSide) {
                    return
                }
                _this5._diagramInstance.createToolbox(e.$element[0], "texts" === e.displayMode, e.shapes || e.category, {
                    shapeIconSpacing: DIAGRAM_TOOLBOX_SHAPE_SPACING,
                    shapeIconCountInRow: _this5.option("toolbox.shapeIconsPerRow"),
                    shapeIconAttributes: {
                        "data-toggle": e.dataToggle
                    }
                })
            },
            onFilterChanged: function(e) {
                if (isServerSide) {
                    return
                }
                _this5._diagramInstance.applyToolboxFilter(e.text, e.filteringToolboxes)
            },
            onVisibilityChanging: function(e) {
                if (isServerSide) {
                    return
                }
                _this5._setCustomCommandChecked(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME, e.visible);
                if (_this5._propertiesPanel) {
                    if (e.visible && _this5.isMobileScreenSize()) {
                        _this5._propertiesPanel.hide()
                    }
                }
                if (_this5._historyToolbar) {
                    if (e.visible && _this5.isMobileScreenSize()) {
                        _this5._historyToolbarZIndex = zIndexPool.create(_ui2.default.baseZIndex());
                        _this5._historyToolbar.$element().css("zIndex", _this5._historyToolbarZIndex);
                        _this5._historyToolbar.$element().css("boxShadow", "none")
                    }
                }
                if (_this5._viewToolbar) {
                    _this5._viewToolbar.$element().css("opacity", e.visible && _this5.isMobileScreenSize() ? "0" : "1");
                    _this5._viewToolbar.$element().css("pointerEvents", e.visible && _this5.isMobileScreenSize() ? "none" : "")
                }
            },
            onVisibilityChanged: function(e) {
                if (!e.visible && !_this5._textInputStarted) {
                    _this5._captureFocus()
                }
                if (!isServerSide) {
                    if (_this5._historyToolbar) {
                        if (!e.visible && _this5.isMobileScreenSize() && _this5._historyToolbarZIndex) {
                            zIndexPool.remove(_this5._historyToolbarZIndex);
                            _this5._historyToolbar.$element().css("zIndex", "");
                            _this5._historyToolbar.$element().css("boxShadow", "");
                            _this5._historyToolbarZIndex = void 0
                        }
                    }
                }
            },
            onPointerUp: this._onPanelPointerUp.bind(this)
        });
        this._toolboxResizeCallback = function() {
            var bounds = _this5._getToolboxBounds($parent, isServerSide);
            _this5._toolbox.option("height", bounds.height);
            var prevIsMobileView = _this5._toolbox.option("isMobileView");
            if (prevIsMobileView !== _this5.isMobileScreenSize()) {
                _this5._toolbox.option({
                    isMobileView: _this5.isMobileScreenSize(),
                    isVisible: _this5._isToolboxVisible()
                });
                _this5._setCustomCommandChecked(_diagram4.default.SHOW_TOOLBOX_COMMAND_NAME, _this5._isToolboxVisible())
            }
            _this5._toolbox.updateMaxHeight()
        }
    };
    _proto._getToolboxBounds = function($parent, isServerSide) {
        var result = {
            offsetX: DIAGRAM_FLOATING_PANEL_OFFSET,
            offsetY: DIAGRAM_FLOATING_PANEL_OFFSET,
            height: !isServerSide ? $parent.height() - 2 * DIAGRAM_FLOATING_PANEL_OFFSET : 0
        };
        if (this._historyToolbar && !isServerSide) {
            result.offsetY += this._historyToolbar.$element().outerHeight() + DIAGRAM_FLOATING_PANEL_OFFSET;
            result.height -= this._historyToolbar.$element().outerHeight() + DIAGRAM_FLOATING_PANEL_OFFSET
        }
        if (this._viewToolbar && !isServerSide) {
            result.height -= this._viewToolbar.$element().outerHeight() + this._getViewToolbarYOffset(isServerSide)
        }
        return result
    };
    _proto._renderViewToolbar = function($parent) {
        var _this6 = this;
        var isServerSide = !(0, _window.hasWindow)();
        var $container = (0, _renderer.default)("<div>").addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
        this._viewToolbar = this._createComponent($container, _uiDiagram4.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
            commands: this.option("viewToolbar.commands"),
            locateInMenu: "never"
        }));
        this._updateViewToolbarPosition($container, $parent, isServerSide);
        this._viewToolbarResizeCallback = function() {
            _this6._updateViewToolbarPosition($container, $parent, isServerSide)
        }
    };
    _proto._getViewToolbarYOffset = function(isServerSide) {
        if (isServerSide) {
            return
        }
        var result = DIAGRAM_FLOATING_PANEL_OFFSET;
        if (this._viewToolbar && this._propertiesToolbar) {
            result += (this._propertiesToolbar.$element().outerHeight() - this._viewToolbar.$element().outerHeight()) / 2
        }
        return result
    };
    _proto._updateViewToolbarPosition = function($container, $parent, isServerSide) {
        if (isServerSide) {
            return
        }
        _position.default.setup($container, {
            my: "left bottom",
            at: "left bottom",
            of: $parent,
            offset: DIAGRAM_FLOATING_PANEL_OFFSET + " -" + this._getViewToolbarYOffset(isServerSide)
        })
    };
    _proto._isPropertiesPanelEnabled = function() {
        return "disabled" !== this.option("propertiesPanel.visibility") && !this.isReadOnlyMode()
    };
    _proto._isPropertiesPanelVisible = function() {
        return "visible" === this.option("propertiesPanel.visibility")
    };
    _proto._renderPropertiesToolbar = function($parent) {
        var _this7 = this;
        var isServerSide = !(0, _window.hasWindow)();
        var $container = (0, _renderer.default)("<div>").addClass(DIAGRAM_FLOATING_TOOLBAR_CONTAINER_CLASS).addClass(DIAGRAM_PROPERTIES_PANEL_TOOLBAR_CONTAINER_CLASS).appendTo($parent);
        this._propertiesToolbar = this._createComponent($container, _uiDiagram5.default, (0, _extend.extend)(this._getToolbarBaseOptions(), {
            buttonStylingMode: "contained",
            buttonType: "default",
            locateInMenu: "never"
        }));
        this._updatePropertiesToolbarPosition($container, $parent, isServerSide);
        this._propertiesToolbarResizeCallback = function() {
            _this7._updatePropertiesToolbarPosition($container, $parent, isServerSide)
        }
    };
    _proto._updatePropertiesToolbarPosition = function($container, $parent, isServerSide) {
        if (isServerSide) {
            return
        }
        _position.default.setup($container, {
            my: "right bottom",
            at: "right bottom",
            of: $parent,
            offset: "-" + DIAGRAM_FLOATING_PANEL_OFFSET + " -" + DIAGRAM_FLOATING_PANEL_OFFSET
        })
    };
    _proto._renderPropertiesPanel = function($parent) {
        var _this8 = this;
        var isServerSide = !(0, _window.hasWindow)();
        var $propertiesPanel = (0, _renderer.default)("<div>").appendTo($parent);
        var offsetX = DIAGRAM_FLOATING_PANEL_OFFSET;
        var offsetY = 2 * DIAGRAM_FLOATING_PANEL_OFFSET + (!isServerSide ? this._propertiesToolbar.$element().outerHeight() : 0);
        this._propertiesPanel = this._createComponent($propertiesPanel, _uiDiagram11.default, {
            isMobileView: this.isMobileScreenSize(),
            isVisible: this._isPropertiesPanelVisible(),
            container: this.$element(),
            offsetParent: $parent,
            offsetX: offsetX,
            offsetY: offsetY,
            propertyTabs: this.option("propertiesPanel.tabs"),
            onCreateToolbar: function(e) {
                e.toolbar = _this8._createComponent(e.$parent, _uiDiagram.default, (0, _extend.extend)(_this8._getToolbarBaseOptions(), {
                    commands: e.commands,
                    locateInMenu: "never",
                    editorStylingMode: "outlined"
                }))
            },
            onVisibilityChanging: function(e) {
                if (isServerSide) {
                    return
                }
                _this8._updatePropertiesPanelGroupBars(e.component);
                _this8._setCustomCommandChecked(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, e.visible);
                if (_this8._toolbox) {
                    if (e.visible && _this8.isMobileScreenSize()) {
                        _this8._toolbox.hide()
                    }
                }
            },
            onVisibilityChanged: function(e) {
                if (!e.visible && !_this8._textInputStarted) {
                    _this8._captureFocus()
                }
            },
            onSelectedGroupChanged: function(_ref3) {
                var component = _ref3.component;
                return _this8._updatePropertiesPanelGroupBars(component)
            },
            onPointerUp: this._onPanelPointerUp.bind(this)
        });
        this._propertiesPanelResizeCallback = function() {
            var prevIsMobileView = _this8._propertiesPanel.option("isMobileView");
            if (prevIsMobileView !== _this8.isMobileScreenSize()) {
                _this8._propertiesPanel.option({
                    isMobileView: _this8.isMobileScreenSize(),
                    isVisible: _this8._isPropertiesPanelVisible()
                });
                _this8._setCustomCommandChecked(_diagram4.default.SHOW_PROPERTIES_PANEL_COMMAND_NAME, _this8._isPropertiesPanelVisible())
            }
        }
    };
    _proto._updatePropertiesPanelGroupBars = function(component) {
        var _this9 = this;
        component.getActiveToolbars().forEach(function(toolbar) {
            _this9._diagramInstance.updateBarItemsState(toolbar.bar)
        })
    };
    _proto._onPanelPointerUp = function() {
        this._captureFocusOnTimeout()
    };
    _proto._renderContextMenu = function($parent) {
        var _this10 = this;
        var $contextMenu = (0, _renderer.default)("<div>").appendTo($parent);
        this._contextMenu = this._createComponent($contextMenu, _uiDiagram6.default.DiagramContextMenuWrapper, {
            commands: this.option("contextMenu.commands"),
            onContentReady: function(_ref4) {
                var component = _ref4.component;
                return _this10._registerBar(component)
            },
            onVisibilityChanging: function(_ref5) {
                var component = _ref5.component;
                return _this10._diagramInstance.updateBarItemsState(component.bar)
            },
            onItemClick: function(itemData) {
                return _this10._onBeforeCommandExecuted(itemData.command)
            },
            "export": this.option("export"),
            excludeCommands: this._getExcludeCommands(),
            onInternalCommand: this._onInternalCommand.bind(this),
            onCustomCommand: this._onCustomCommand.bind(this)
        })
    };
    _proto._renderContextToolbox = function($parent) {
        var _this11 = this;
        var isServerSide = !(0, _window.hasWindow)();
        var category = this.option("contextToolbox.category");
        var displayMode = this.option("contextToolbox.displayMode");
        var shapes = this.option("contextToolbox.shapes");
        var $contextToolbox = (0, _renderer.default)("<div>").appendTo($parent);
        this._contextToolbox = this._createComponent($contextToolbox, _uiDiagram7.default, {
            toolboxWidth: this.option("contextToolbox.width"),
            onShown: function(e) {
                if (isServerSide) {
                    return
                }
                var $toolboxContainer = (0, _renderer.default)(e.$element);
                var isTextGroup = "texts" === displayMode;
                if (!shapes && !category && !isTextGroup) {
                    var group = _this11._getToolboxGroups().filter(function(g) {
                        return g.category === e.category
                    })[0];
                    if (group) {
                        isTextGroup = "texts" === group.displayMode
                    }
                }
                _this11._diagramInstance.createContextToolbox($toolboxContainer[0], isTextGroup, shapes || category || e.category, {
                    shapeIconSpacing: DIAGRAM_CONTEXT_TOOLBOX_SHAPE_SPACING,
                    shapeIconCountInRow: _this11.option("contextToolbox.shapeIconsPerRow")
                }, function(shapeType) {
                    e.callback(shapeType);
                    _this11._captureFocus();
                    e.hide()
                })
            }
        })
    };
    _proto._setCustomCommandChecked = function(command, checked) {
        this._toolbars.forEach(function(tb) {
            tb.setCommandChecked(command, checked)
        })
    };
    _proto._onBeforeCommandExecuted = function(command) {
        var dialogParameters = _uiDiagram12.default.getDialogParameters(command);
        if (dialogParameters) {
            this._showDialog(dialogParameters)
        }
        return !!dialogParameters
    };
    _proto._renderDialog = function($parent) {
        var $dialogElement = (0, _renderer.default)("<div>").appendTo($parent);
        this._dialogInstance = this._createComponent($dialogElement, _uiDiagram8.default, {})
    };
    _proto._showDialog = function(dialogParameters) {
        if (this._dialogInstance) {
            this._dialogInstance.option("onGetContent", dialogParameters.onGetContent);
            this._dialogInstance.option("onHidden", function() {
                this._captureFocus()
            }.bind(this));
            this._dialogInstance.option("command", this._diagramInstance.getCommand(dialogParameters.command));
            this._dialogInstance.option("title", dialogParameters.title);
            this._dialogInstance._show()
        }
    };
    _proto._showLoadingIndicator = function() {
        this._loadingIndicator = (0, _renderer.default)("<div>").addClass(DIAGRAM_LOADING_INDICATOR_CLASS);
        this._createComponent(this._loadingIndicator, _load_indicator.default, {});
        var $parent = this._$content || this.$element();
        $parent.append(this._loadingIndicator)
    };
    _proto._hideLoadingIndicator = function() {
        if (!this._loadingIndicator) {
            return
        }
        this._loadingIndicator.remove();
        this._loadingIndicator = null
    };
    _proto._initDiagram = function() {
        var _getDiagram = (0, _diagram.getDiagram)(),
            DiagramControl = _getDiagram.DiagramControl;
        this._diagramInstance = new DiagramControl;
        this._diagramInstance.onChanged = this._raiseDataChangeAction.bind(this);
        this._diagramInstance.onEdgeInserted = this._raiseEdgeInsertedAction.bind(this);
        this._diagramInstance.onEdgeUpdated = this._raiseEdgeUpdatedAction.bind(this);
        this._diagramInstance.onEdgeRemoved = this._raiseEdgeRemovedAction.bind(this);
        this._diagramInstance.onNodeInserted = this._raiseNodeInsertedAction.bind(this);
        this._diagramInstance.onNodeUpdated = this._raiseNodeUpdatedAction.bind(this);
        this._diagramInstance.onNodeRemoved = this._raiseNodeRemovedAction.bind(this);
        this._diagramInstance.onToolboxDragStart = this._raiseToolboxDragStart.bind(this);
        this._diagramInstance.onToolboxDragEnd = this._raiseToolboxDragEnd.bind(this);
        this._diagramInstance.onTextInputStart = this._raiseTextInputStart.bind(this);
        this._diagramInstance.onTextInputEnd = this._raiseTextInputEnd.bind(this);
        this._diagramInstance.onToggleFullscreen = this._onToggleFullScreen.bind(this);
        this._diagramInstance.onShowContextMenu = this._onShowContextMenu.bind(this);
        this._diagramInstance.onHideContextMenu = this._onHideContextMenu.bind(this);
        this._diagramInstance.onShowContextToolbox = this._onShowContextToolbox.bind(this);
        this._diagramInstance.onHideContextToolbox = this._onHideContextToolbox.bind(this);
        this._diagramInstance.onNativeAction.add({
            notifyItemClick: this._raiseItemClickAction.bind(this),
            notifyItemDblClick: this._raiseItemDblClickAction.bind(this),
            notifySelectionChanged: this._raiseSelectionChanged.bind(this)
        });
        this._diagramInstance.onRequestOperation = this._raiseRequestEditOperation.bind(this);
        this._updateEventSubscriptionMethods();
        this._updateDefaultItemProperties();
        this._updateEditingSettings();
        this._updateShapeTexts();
        this._updateUnitItems();
        this._updateFormatUnitsMethod();
        if (this.option("units") !== DIAGRAM_DEFAULT_UNIT) {
            this._updateUnitsState()
        }
        if (this.isReadOnlyMode()) {
            this._updateReadOnlyState()
        }
        if (this.option("pageSize")) {
            if (this.option("pageSize.items")) {
                this._updatePageSizeItemsState()
            }
            if (this.option("pageSize.width") && this.option("pageSize.height")) {
                this._updatePageSizeState()
            }
        }
        if (this.option("pageOrientation") !== DIAGRAM_DEFAULT_PAGE_ORIENTATION) {
            this._updatePageOrientationState()
        }
        if (this.option("pageColor") !== DIAGRAM_DEFAULT_PAGE_COLOR) {
            this._updatePageColorState()
        }
        if (this.option("viewUnits") !== DIAGRAM_DEFAULT_UNIT) {
            this._updateViewUnitsState()
        }
        if (!this.option("showGrid")) {
            this._updateShowGridState()
        }
        if (!this.option("snapToGrid")) {
            this._updateSnapToGridState()
        }
        if (this.option("gridSize")) {
            if (this.option("gridSize.items")) {
                this._updateGridSizeItemsState()
            }
            this._updateGridSizeState()
        }
        if (this.option("zoomLevel.items")) {
            this._updateZoomLevelItemsState()
        }
        if (this.option("simpleView")) {
            this._updateSimpleViewState()
        }
        if (this.option("zoomLevel") !== DIAGRAM_DEFAULT_ZOOMLEVEL) {
            this._updateZoomLevelState()
        }
        if (this.option("autoZoomMode") !== DIAGRAM_DEFAULT_AUTOZOOM_MODE) {
            this._updateAutoZoomState()
        }
        if (this.option("fullScreen")) {
            var window = (0, _window.getWindow)();
            if (window && window.self !== window.top) {
                this.option("fullScreen", false)
            } else {
                this._updateFullscreenState()
            }
        }
        this.optionsUpdateBar = new _diagram3.default(this);
        this._diagramInstance.registerBar(this.optionsUpdateBar);
        if ((0, _window.hasWindow)()) {
            this._diagramInstance.initMeasurer(this.$element()[0])
        }
        this._updateCustomShapes(this._getCustomShapes());
        this._refreshDataSources()
    };
    _proto._clean = function() {
        if (this._diagramInstance) {
            this._diagramInstance.cleanMarkup(function(element) {
                (0, _renderer.default)(element).empty()
            })
        }
        _Widget.prototype._clean.call(this)
    };
    _proto._dispose = function() {
        this._killCaptureFocusTimeout();
        _Widget.prototype._dispose.call(this);
        this._diagramInstance = void 0
    };
    _proto._executeDiagramCommand = function(command, parameter) {
        this._diagramInstance.getCommand(command).execute(parameter)
    };
    _proto.getNodeDataSource = function() {
        return this._nodesOption && this._nodesOption.getDataSource()
    };
    _proto.getEdgeDataSource = function() {
        return this._edgesOption && this._edgesOption.getDataSource()
    };
    _proto._refreshDataSources = function() {
        this._beginUpdateDiagram();
        this._refreshNodesDataSource();
        this._refreshEdgesDataSource();
        this._endUpdateDiagram()
    };
    _proto._refreshNodesDataSource = function() {
        if (this._nodesOption) {
            this._nodesOption._disposeDataSource();
            delete this._nodesOption
        }
        if (this.option("nodes.dataSource")) {
            this._nodesOption = new _diagram5.default(this);
            this._nodesOption.option("dataSource", this.option("nodes.dataSource"));
            this._nodesOption._refreshDataSource()
        }
    };
    _proto._refreshEdgesDataSource = function() {
        if (this._edgesOption) {
            this._edgesOption._disposeDataSource();
            delete this._edgesOption
        }
        if (this.option("edges.dataSource")) {
            this._edgesOption = new _diagram6.default(this);
            this._edgesOption.option("dataSource", this.option("edges.dataSource"));
            this._edgesOption._refreshDataSource()
        }
    };
    _proto._getDiagramData = function() {
        var value;
        var _getDiagram2 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram2.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.Export, function(data) {
            value = data
        });
        return value
    };
    _proto._setDiagramData = function(data, keepExistingItems) {
        var _getDiagram3 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram3.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.Import, {
            data: data,
            keepExistingItems: keepExistingItems
        })
    };
    _proto.isReadOnlyMode = function() {
        return this.option("readOnly") || this.option("disabled")
    };
    _proto._onDataSourceChanged = function() {
        this._bindDiagramData()
    };
    _proto._getChangesKeys = function(changes) {
        return changes.map(function(change) {
            return change.internalKey || change.key
        }).filter(function(key) {
            return !!key
        })
    };
    _proto._createOptionGetter = function(optionName) {
        var expr = this.option(optionName);
        return expr && (0, _data.compileGetter)(expr)
    };
    _proto._onRequestUpdateLayout = function(changes) {
        if (!this._requestLayoutUpdateAction) {
            this._createRequestLayoutUpdateAction()
        }
        var eventArgs = {
            changes: changes,
            allowed: false
        };
        this._requestLayoutUpdateAction(eventArgs);
        return eventArgs.allowed
    };
    _proto._createOptionSetter = function(optionName) {
        var expr = this.option(optionName);
        if ((0, _type.isFunction)(expr)) {
            return expr
        }
        return expr && (0, _data.compileSetter)(expr)
    };
    _proto._bindDiagramData = function() {
        if (this._updateDiagramLockCount || !this._isBindingMode()) {
            return
        }
        var _getDiagram4 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram4.DiagramCommand,
            ConnectorLineOption = _getDiagram4.ConnectorLineOption,
            ConnectorLineEnding = _getDiagram4.ConnectorLineEnding;
        var lineOptionGetter;
        var lineOptionSetter;
        var startLineEndingGetter;
        var startLineEndingSetter;
        var endLineEndingGetter;
        var endLineEndingSetter;
        var containerKeyGetter;
        var containerKeySetter;
        var data = {
            nodeDataSource: this._nodesOption && this._nodesOption.getItems(),
            edgeDataSource: this._edgesOption && this._edgesOption.getItems(),
            nodeDataImporter: {
                getKey: this._createOptionGetter("nodes.keyExpr"),
                setKey: this._createOptionSetter("nodes.keyExpr"),
                getCustomData: this._createOptionGetter("nodes.customDataExpr"),
                setCustomData: this._createOptionSetter("nodes.customDataExpr"),
                getLocked: this._createOptionGetter("nodes.lockedExpr"),
                setLocked: this._createOptionSetter("nodes.lockedExpr"),
                getStyle: this._createOptionGetter("nodes.styleExpr"),
                setStyle: this._createOptionSetter("nodes.styleExpr"),
                getStyleText: this._createOptionGetter("nodes.textStyleExpr"),
                setStyleText: this._createOptionSetter("nodes.textStyleExpr"),
                getZIndex: this._createOptionGetter("nodes.zIndexExpr"),
                setZIndex: this._createOptionSetter("nodes.zIndexExpr"),
                getType: this._createOptionGetter("nodes.typeExpr"),
                setType: this._createOptionSetter("nodes.typeExpr"),
                getText: this._createOptionGetter("nodes.textExpr"),
                setText: this._createOptionSetter("nodes.textExpr"),
                getImage: this._createOptionGetter("nodes.imageUrlExpr"),
                setImage: this._createOptionSetter("nodes.imageUrlExpr"),
                getLeft: this._createOptionGetter("nodes.leftExpr"),
                setLeft: this._createOptionSetter("nodes.leftExpr"),
                getTop: this._createOptionGetter("nodes.topExpr"),
                setTop: this._createOptionSetter("nodes.topExpr"),
                getWidth: this._createOptionGetter("nodes.widthExpr"),
                setWidth: this._createOptionSetter("nodes.widthExpr"),
                getHeight: this._createOptionGetter("nodes.heightExpr"),
                setHeight: this._createOptionSetter("nodes.heightExpr"),
                getParentKey: this._createOptionGetter("nodes.parentKeyExpr"),
                setParentKey: this._createOptionSetter("nodes.parentKeyExpr"),
                getItems: this._createOptionGetter("nodes.itemsExpr"),
                setItems: this._createOptionSetter("nodes.itemsExpr"),
                getContainerKey: containerKeyGetter = this._createOptionGetter("nodes.containerKeyExpr"),
                setContainerKey: containerKeySetter = this._createOptionSetter("nodes.containerKeyExpr"),
                getChildren: !containerKeyGetter && !containerKeySetter && this._createOptionGetter("nodes.containerChildrenExpr"),
                setChildren: !containerKeyGetter && !containerKeySetter && this._createOptionSetter("nodes.containerChildrenExpr")
            },
            edgeDataImporter: {
                getKey: this._createOptionGetter("edges.keyExpr"),
                setKey: this._createOptionSetter("edges.keyExpr"),
                getCustomData: this._createOptionGetter("edges.customDataExpr"),
                setCustomData: this._createOptionSetter("edges.customDataExpr"),
                getLocked: this._createOptionGetter("edges.lockedExpr"),
                setLocked: this._createOptionSetter("edges.lockedExpr"),
                getStyle: this._createOptionGetter("edges.styleExpr"),
                setStyle: this._createOptionSetter("edges.styleExpr"),
                getStyleText: this._createOptionGetter("edges.textStyleExpr"),
                setStyleText: this._createOptionSetter("edges.textStyleExpr"),
                getZIndex: this._createOptionGetter("edges.zIndexExpr"),
                setZIndex: this._createOptionSetter("edges.zIndexExpr"),
                getFrom: this._createOptionGetter("edges.fromExpr"),
                setFrom: this._createOptionSetter("edges.fromExpr"),
                getFromPointIndex: this._createOptionGetter("edges.fromPointIndexExpr"),
                setFromPointIndex: this._createOptionSetter("edges.fromPointIndexExpr"),
                getTo: this._createOptionGetter("edges.toExpr"),
                setTo: this._createOptionSetter("edges.toExpr"),
                getToPointIndex: this._createOptionGetter("edges.toPointIndexExpr"),
                setToPointIndex: this._createOptionSetter("edges.toPointIndexExpr"),
                getPoints: this._createOptionGetter("edges.pointsExpr"),
                setPoints: this._createOptionSetter("edges.pointsExpr"),
                getText: this._createOptionGetter("edges.textExpr"),
                setText: this._createOptionSetter("edges.textExpr"),
                getLineOption: (lineOptionGetter = this._createOptionGetter("edges.lineTypeExpr")) && function(obj) {
                    var lineType = lineOptionGetter(obj);
                    return this._getConnectorLineOption(lineType)
                }.bind(this),
                setLineOption: (lineOptionSetter = this._createOptionSetter("edges.lineTypeExpr")) && function(obj, value) {
                    switch (value) {
                        case ConnectorLineOption.Straight:
                            value = "straight";
                            break;
                        case ConnectorLineOption.Orthogonal:
                            value = "orthogonal"
                    }
                    lineOptionSetter(obj, value)
                }.bind(this),
                getStartLineEnding: (startLineEndingGetter = this._createOptionGetter("edges.fromLineEndExpr")) && function(obj) {
                    var lineEnd = startLineEndingGetter(obj);
                    return this._getConnectorLineEnding(lineEnd)
                }.bind(this),
                setStartLineEnding: (startLineEndingSetter = this._createOptionSetter("edges.fromLineEndExpr")) && function(obj, value) {
                    switch (value) {
                        case ConnectorLineEnding.Arrow:
                            value = "arrow";
                            break;
                        case ConnectorLineEnding.OutlinedTriangle:
                            value = "outlinedTriangle";
                            break;
                        case ConnectorLineEnding.FilledTriangle:
                            value = "filledTriangle";
                            break;
                        case ConnectorLineEnding.None:
                            value = "none"
                    }
                    startLineEndingSetter(obj, value)
                }.bind(this),
                getEndLineEnding: (endLineEndingGetter = this._createOptionGetter("edges.toLineEndExpr")) && function(obj) {
                    var lineEnd = endLineEndingGetter(obj);
                    return this._getConnectorLineEnding(lineEnd)
                }.bind(this),
                setEndLineEnding: (endLineEndingSetter = this._createOptionSetter("edges.toLineEndExpr")) && function(obj, value) {
                    switch (value) {
                        case ConnectorLineEnding.Arrow:
                            value = "arrow";
                            break;
                        case ConnectorLineEnding.OutlinedTriangle:
                            value = "outlinedTriangle";
                            break;
                        case ConnectorLineEnding.FilledTriangle:
                            value = "filledTriangle";
                            break;
                        case ConnectorLineEnding.None:
                            value = "none"
                    }
                    endLineEndingSetter(obj, value)
                }.bind(this)
            },
            layoutParameters: this._getDataBindingLayoutParameters()
        };
        this._executeDiagramCommand(DiagramCommand.BindDocument, data)
    };
    _proto._reloadContentByChanges = function(changes, isExternalChanges) {
        var keys = this._getChangesKeys(changes);
        var applyLayout = this._onRequestUpdateLayout(changes);
        this._reloadContent(keys, applyLayout, isExternalChanges)
    };
    _proto._reloadContent = function(itemKeys, applyLayout, isExternalChanges) {
        var _this12 = this;
        var getData = function() {
            var nodeDataSource;
            var edgeDataSource;
            if (_this12._nodesOption && isExternalChanges) {
                nodeDataSource = _this12._nodesOption.getItems()
            }
            if (_this12._edgesOption && isExternalChanges) {
                edgeDataSource = _this12._edgesOption.getItems()
            }
            return {
                nodeDataSource: nodeDataSource,
                edgeDataSource: edgeDataSource
            }
        };
        this._diagramInstance.reloadContent(itemKeys, getData, applyLayout && this._getDataBindingLayoutParameters(), isExternalChanges)
    };
    _proto._getConnectorLineOption = function(lineType) {
        var _getDiagram5 = (0, _diagram.getDiagram)(),
            ConnectorLineOption = _getDiagram5.ConnectorLineOption;
        switch (lineType) {
            case "straight":
                return ConnectorLineOption.Straight;
            default:
                return ConnectorLineOption.Orthogonal
        }
    };
    _proto._getConnectorLineEnding = function(lineEnd) {
        var _getDiagram6 = (0, _diagram.getDiagram)(),
            ConnectorLineEnding = _getDiagram6.ConnectorLineEnding;
        switch (lineEnd) {
            case "arrow":
                return ConnectorLineEnding.Arrow;
            case "outlinedTriangle":
                return ConnectorLineEnding.OutlinedTriangle;
            case "filledTriangle":
                return ConnectorLineEnding.FilledTriangle;
            default:
                return ConnectorLineEnding.None
        }
    };
    _proto._getDataBindingLayoutParameters = function() {
        var _getDiagram7 = (0, _diagram.getDiagram)(),
            DataLayoutType = _getDiagram7.DataLayoutType,
            DataLayoutOrientation = _getDiagram7.DataLayoutOrientation;
        var layoutParametersOption = this.option("nodes.autoLayout") || "off";
        var layoutType = layoutParametersOption.type || layoutParametersOption;
        var parameters = {};
        if ("off" !== layoutType && ("auto" !== layoutType || !this._hasNodePositionExprs())) {
            switch (layoutType) {
                case "tree":
                    parameters.type = DataLayoutType.Tree;
                    break;
                default:
                    parameters.type = DataLayoutType.Sugiyama
            }
            switch (layoutParametersOption.orientation) {
                case "vertical":
                    parameters.orientation = DataLayoutOrientation.Vertical;
                    break;
                case "horizontal":
                    parameters.orientation = DataLayoutOrientation.Horizontal
            }
            if (this.option("edges.fromPointIndexExpr") || this.option("edges.toPointIndexExpr")) {
                parameters.skipPointIndices = true
            }
        }
        parameters.autoSizeEnabled = !!this.option("nodes.autoSizeEnabled");
        return parameters
    };
    _proto._hasNodePositionExprs = function() {
        return this.option("nodes.topExpr") && this.option("nodes.leftExpr")
    };
    _proto._getAutoZoomValue = function(option) {
        var _getDiagram8 = (0, _diagram.getDiagram)(),
            AutoZoomMode = _getDiagram8.AutoZoomMode;
        switch (option) {
            case "fitContent":
                return AutoZoomMode.FitContent;
            case "fitWidth":
                return AutoZoomMode.FitToWidth;
            default:
                return AutoZoomMode.Disabled
        }
    };
    _proto._isBindingMode = function() {
        return this._nodesOption && this._nodesOption.hasItems() || this._edgesOption && this._nodesOption.hasItems()
    };
    _proto._beginUpdateDiagram = function() {
        this._updateDiagramLockCount++
    };
    _proto._endUpdateDiagram = function() {
        this._updateDiagramLockCount = Math.max(this._updateDiagramLockCount - 1, 0);
        if (!this._updateDiagramLockCount) {
            this._bindDiagramData()
        }
    };
    _proto._getCustomShapes = function() {
        return this.option("customShapes") || []
    };
    _proto._getToolboxGroups = function() {
        return _diagram2.default.getGroups(this.option("toolbox.groups"))
    };
    _proto._updateCustomShapes = function(customShapes, prevCustomShapes) {
        var _this13 = this;
        if (Array.isArray(prevCustomShapes)) {
            this._diagramInstance.removeCustomShapes(prevCustomShapes.map(function(s) {
                return s.type
            }))
        }
        if (Array.isArray(customShapes)) {
            this._diagramInstance.addCustomShapes(customShapes.map(function(s) {
                var templateOption = s.template || _this13.option("customShapeTemplate");
                var template = templateOption && _this13._getTemplate(templateOption);
                var toolboxTemplateOption = s.toolboxTemplate || _this13.option("customShapeToolboxTemplate");
                var toolboxTemplate = toolboxTemplateOption && _this13._getTemplate(toolboxTemplateOption);
                return {
                    category: s.category,
                    type: s.type,
                    baseType: s.baseType,
                    title: s.title,
                    svgUrl: s.backgroundImageUrl,
                    svgToolboxUrl: s.backgroundImageToolboxUrl,
                    svgLeft: s.backgroundImageLeft,
                    svgTop: s.backgroundImageTop,
                    svgWidth: s.backgroundImageWidth,
                    svgHeight: s.backgroundImageHeight,
                    defaultWidth: s.defaultWidth,
                    defaultHeight: s.defaultHeight,
                    toolboxWidthToHeightRatio: s.toolboxWidthToHeightRatio,
                    minWidth: s.minWidth,
                    minHeight: s.minHeight,
                    maxWidth: s.maxWidth,
                    maxHeight: s.maxHeight,
                    allowResize: s.allowResize,
                    defaultText: s.defaultText,
                    allowEditText: s.allowEditText,
                    textLeft: s.textLeft,
                    textTop: s.textTop,
                    textWidth: s.textWidth,
                    textHeight: s.textHeight,
                    defaultImageUrl: s.defaultImageUrl,
                    allowEditImage: s.allowEditImage,
                    imageLeft: s.imageLeft,
                    imageTop: s.imageTop,
                    imageWidth: s.imageWidth,
                    imageHeight: s.imageHeight,
                    connectionPoints: s.connectionPoints && s.connectionPoints.map(function(pt) {
                        return {
                            x: pt.x,
                            y: pt.y
                        }
                    }),
                    createTemplate: template && function(container, item) {
                        template.render({
                            model: _this13._nativeItemToDiagramItem(item),
                            container: (0, _element.getPublicElement)((0, _renderer.default)(container))
                        })
                    },
                    createToolboxTemplate: toolboxTemplate && function(container, item) {
                        toolboxTemplate.render({
                            model: _this13._nativeItemToDiagramItem(item),
                            container: (0, _element.getPublicElement)((0, _renderer.default)(container))
                        })
                    },
                    destroyTemplate: template && function(container) {
                        (0, _renderer.default)(container).empty()
                    },
                    templateLeft: s.templateLeft,
                    templateTop: s.templateTop,
                    templateWidth: s.templateWidth,
                    templateHeight: s.templateHeight,
                    keepRatioOnAutoSize: s.keepRatioOnAutoSize
                }
            }))
        }
    };
    _proto._onToggleFullScreen = function(fullScreen) {
        if (this.toggleFullscreenLock > 0) {
            return
        }
        this._changeNativeFullscreen(fullScreen);
        this.$element().toggleClass(DIAGRAM_FULLSCREEN_CLASS, fullScreen);
        this._diagramInstance.updateLayout(true);
        this._processDiagramResize();
        if (this._toolbox) {
            this._toolbox.repaint()
        }
        if (this._propertiesPanel) {
            this._propertiesPanel.repaint()
        }
    };
    _proto._changeNativeFullscreen = function(setModeOn) {
        var window = (0, _window.getWindow)();
        if (window.self === window.top || setModeOn === this._inNativeFullscreen()) {
            return
        }
        if (setModeOn) {
            this._subscribeFullscreenNativeChanged()
        } else {
            this._unsubscribeFullscreenNativeChanged()
        }
        this._setNativeFullscreen(setModeOn)
    };
    _proto._setNativeFullscreen = function(on) {
        var window = (0, _window.getWindow)();
        var document = window.self.document;
        var body = window.self.document.body;
        if (on) {
            if (body.requestFullscreen) {
                body.requestFullscreen()
            } else {
                if (body.mozRequestFullscreen) {
                    body.mozRequestFullscreen()
                } else {
                    if (body.webkitRequestFullscreen) {
                        body.webkitRequestFullscreen()
                    } else {
                        if (body.msRequestFullscreen) {
                            body.msRequestFullscreen()
                        }
                    }
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else {
                if (document.mozCancelFullscreen) {
                    document.mozCancelFullscreen()
                } else {
                    if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen()
                    } else {
                        if (document.msExitFullscreen) {
                            document.msExitFullscreen()
                        }
                    }
                }
            }
        }
    };
    _proto._inNativeFullscreen = function() {
        var document = (0, _window.getWindow)().document;
        var fullscreenElement = document.fullscreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
        var isInFullscreen = fullscreenElement === document.body || document.webkitIsFullscreen;
        return !!isInFullscreen
    };
    _proto._subscribeFullscreenNativeChanged = function() {
        var document = (0, _window.getWindow)().document;
        var handler = this._onNativeFullscreenChangeHandler.bind(this);
        _events_engine.default.on(document, FULLSCREEN_CHANGE_EVENT_NAME, handler);
        _events_engine.default.on(document, IE_FULLSCREEN_CHANGE_EVENT_NAME, handler);
        _events_engine.default.on(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME, handler);
        _events_engine.default.on(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME, handler)
    };
    _proto._unsubscribeFullscreenNativeChanged = function() {
        var document = (0, _window.getWindow)().document;
        _events_engine.default.off(document, FULLSCREEN_CHANGE_EVENT_NAME);
        _events_engine.default.off(document, IE_FULLSCREEN_CHANGE_EVENT_NAME);
        _events_engine.default.off(document, WEBKIT_FULLSCREEN_CHANGE_EVENT_NAME);
        _events_engine.default.off(document, MOZ_FULLSCREEN_CHANGE_EVENT_NAME)
    };
    _proto._onNativeFullscreenChangeHandler = function() {
        if (!this._inNativeFullscreen()) {
            this._unsubscribeFullscreenNativeChanged();
            this.option("fullScreen", false)
        }
    };
    _proto._executeDiagramFullscreenCommand = function(fullscreen) {
        var _getDiagram9 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram9.DiagramCommand;
        this.toggleFullscreenLock++;
        this._executeDiagramCommand(DiagramCommand.Fullscreen, fullscreen);
        this.toggleFullscreenLock--
    };
    _proto._onShowContextMenu = function(x, y, selection) {
        if (this._contextMenu) {
            this._contextMenu._show(x, y, selection)
        }
    };
    _proto._onHideContextMenu = function() {
        if (this._contextMenu) {
            this._contextMenu._hide()
        }
    };
    _proto._onShowContextToolbox = function(x, y, side, category, callback) {
        if (this._contextToolbox) {
            this._contextToolbox._show(x, y, side, category, callback)
        }
    };
    _proto._onHideContextToolbox = function() {
        if (this._contextToolbox) {
            this._contextToolbox._hide()
        }
    };
    _proto._getDiagramUnitValue = function(value) {
        var _getDiagram10 = (0, _diagram.getDiagram)(),
            DiagramUnit = _getDiagram10.DiagramUnit;
        switch (value) {
            case "in":
                return DiagramUnit.In;
            case "cm":
                return DiagramUnit.Cm;
            case "px":
                return DiagramUnit.Px;
            default:
                return DiagramUnit.In
        }
    };
    _proto._updateReadOnlyState = function() {
        var _getDiagram11 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram11.DiagramCommand;
        var readOnly = this.isReadOnlyMode();
        this._executeDiagramCommand(DiagramCommand.ToggleReadOnly, readOnly)
    };
    _proto._updateZoomLevelState = function() {
        var zoomLevel = this.option("zoomLevel.value");
        if (!zoomLevel) {
            zoomLevel = this.option("zoomLevel")
        }
        var _getDiagram12 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram12.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.ZoomLevel, zoomLevel)
    };
    _proto._updateZoomLevelItemsState = function() {
        var zoomLevelItems = this.option("zoomLevel.items");
        if (!Array.isArray(zoomLevelItems)) {
            return
        }
        var _getDiagram13 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram13.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.ZoomLevelItems, zoomLevelItems)
    };
    _proto._updateAutoZoomState = function() {
        var _getDiagram14 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram14.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.SwitchAutoZoom, this._getAutoZoomValue(this.option("autoZoomMode")))
    };
    _proto._updateSimpleViewState = function() {
        var _getDiagram15 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram15.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.ToggleSimpleView, this.option("simpleView"))
    };
    _proto._updateFullscreenState = function() {
        var fullscreen = this.option("fullScreen");
        this._executeDiagramFullscreenCommand(fullscreen);
        this._onToggleFullScreen(fullscreen)
    };
    _proto._updateShowGridState = function() {
        var _getDiagram16 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram16.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.ShowGrid, this.option("showGrid"))
    };
    _proto._updateSnapToGridState = function() {
        var _getDiagram17 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram17.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.SnapToGrid, this.option("snapToGrid"))
    };
    _proto._updateGridSizeState = function() {
        var gridSize = this.option("gridSize.value");
        if (!gridSize) {
            gridSize = this.option("gridSize")
        }
        var _getDiagram18 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram18.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.GridSize, gridSize)
    };
    _proto._updateGridSizeItemsState = function() {
        var gridSizeItems = this.option("gridSize.items");
        if (!Array.isArray(gridSizeItems)) {
            return
        }
        var _getDiagram19 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram19.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.GridSizeItems, gridSizeItems)
    };
    _proto._updateUnitItems = function() {
        var _getDiagram20 = (0, _diagram.getDiagram)(),
            DiagramLocalizationService = _getDiagram20.DiagramLocalizationService;
        var items = this._getUnitItems();
        if (this._unitItems !== items) {
            this._unitItems = items;
            DiagramLocalizationService.unitItems = items
        }
    };
    _proto._getUnitItems = function() {
        var _getDiagram21 = (0, _diagram.getDiagram)(),
            DiagramUnit = _getDiagram21.DiagramUnit;
        var items = {};
        items[DiagramUnit.In] = _message.default.format("dxDiagram-unitIn");
        items[DiagramUnit.Cm] = _message.default.format("dxDiagram-unitCm");
        items[DiagramUnit.Px] = _message.default.format("dxDiagram-unitPx");
        return items
    };
    _proto._updateFormatUnitsMethod = function() {
        var _getDiagram22 = (0, _diagram.getDiagram)(),
            DiagramLocalizationService = _getDiagram22.DiagramLocalizationService;
        DiagramLocalizationService.formatUnit = function(value) {
            return _number.default.format(value)
        }
    };
    _proto._updateViewUnitsState = function() {
        var _getDiagram23 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram23.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.ViewUnits, this._getDiagramUnitValue(this.option("viewUnits")))
    };
    _proto._updateUnitsState = function() {
        var _getDiagram24 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram24.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.Units, this._getDiagramUnitValue(this.option("units")))
    };
    _proto._updatePageSizeState = function() {
        var pageSize = this.option("pageSize");
        if (!pageSize || !pageSize.width || !pageSize.height) {
            return
        }
        var _getDiagram25 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram25.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.PageSize, pageSize)
    };
    _proto._updatePageSizeItemsState = function() {
        var pageSizeItems = this.option("pageSize.items");
        if (!Array.isArray(pageSizeItems)) {
            return
        }
        var _getDiagram26 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram26.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.PageSizeItems, pageSizeItems)
    };
    _proto._updatePageOrientationState = function() {
        var _getDiagram27 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram27.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.PageLandscape, "landscape" === this.option("pageOrientation"))
    };
    _proto._updatePageColorState = function() {
        var _getDiagram28 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram28.DiagramCommand;
        this._executeDiagramCommand(DiagramCommand.PageColor, this.option("pageColor"))
    };
    _proto._updateShapeTexts = function() {
        var _getDiagram29 = (0, _diagram.getDiagram)(),
            DiagramLocalizationService = _getDiagram29.DiagramLocalizationService;
        var texts = this._getShapeTexts();
        if (this._shapeTexts !== texts) {
            this._shapeTexts = texts;
            DiagramLocalizationService.shapeTexts = texts
        }
    };
    _proto._getShapeTexts = function() {
        var _getDiagram30 = (0, _diagram.getDiagram)(),
            ShapeTypes = _getDiagram30.ShapeTypes;
        var texts = {};
        texts[ShapeTypes.Text] = _message.default.format("dxDiagram-shapeText");
        texts[ShapeTypes.Rectangle] = _message.default.format("dxDiagram-shapeRectangle");
        texts[ShapeTypes.Ellipse] = _message.default.format("dxDiagram-shapeEllipse");
        texts[ShapeTypes.Cross] = _message.default.format("dxDiagram-shapeCross");
        texts[ShapeTypes.Triangle] = _message.default.format("dxDiagram-shapeTriangle");
        texts[ShapeTypes.Diamond] = _message.default.format("dxDiagram-shapeDiamond");
        texts[ShapeTypes.Heart] = _message.default.format("dxDiagram-shapeHeart");
        texts[ShapeTypes.Pentagon] = _message.default.format("dxDiagram-shapePentagon");
        texts[ShapeTypes.Hexagon] = _message.default.format("dxDiagram-shapeHexagon");
        texts[ShapeTypes.Octagon] = _message.default.format("dxDiagram-shapeOctagon");
        texts[ShapeTypes.Star] = _message.default.format("dxDiagram-shapeStar");
        texts[ShapeTypes.ArrowLeft] = _message.default.format("dxDiagram-shapeArrowLeft");
        texts[ShapeTypes.ArrowUp] = _message.default.format("dxDiagram-shapeArrowUp");
        texts[ShapeTypes.ArrowRight] = _message.default.format("dxDiagram-shapeArrowRight");
        texts[ShapeTypes.ArrowDown] = _message.default.format("dxDiagram-shapeArrowDown");
        texts[ShapeTypes.ArrowUpDown] = _message.default.format("dxDiagram-shapeArrowUpDown");
        texts[ShapeTypes.ArrowLeftRight] = _message.default.format("dxDiagram-shapeArrowLeftRight");
        texts[ShapeTypes.Process] = _message.default.format("dxDiagram-shapeProcess");
        texts[ShapeTypes.Decision] = _message.default.format("dxDiagram-shapeDecision");
        texts[ShapeTypes.Terminator] = _message.default.format("dxDiagram-shapeTerminator");
        texts[ShapeTypes.PredefinedProcess] = _message.default.format("dxDiagram-shapePredefinedProcess");
        texts[ShapeTypes.Document] = _message.default.format("dxDiagram-shapeDocument");
        texts[ShapeTypes.MultipleDocuments] = _message.default.format("dxDiagram-shapeMultipleDocuments");
        texts[ShapeTypes.ManualInput] = _message.default.format("dxDiagram-shapeManualInput");
        texts[ShapeTypes.Preparation] = _message.default.format("dxDiagram-shapePreparation");
        texts[ShapeTypes.Data] = _message.default.format("dxDiagram-shapeData");
        texts[ShapeTypes.Database] = _message.default.format("dxDiagram-shapeDatabase");
        texts[ShapeTypes.HardDisk] = _message.default.format("dxDiagram-shapeHardDisk");
        texts[ShapeTypes.InternalStorage] = _message.default.format("dxDiagram-shapeInternalStorage");
        texts[ShapeTypes.PaperTape] = _message.default.format("dxDiagram-shapePaperTape");
        texts[ShapeTypes.ManualOperation] = _message.default.format("dxDiagram-shapeManualOperation");
        texts[ShapeTypes.Delay] = _message.default.format("dxDiagram-shapeDelay");
        texts[ShapeTypes.StoredData] = _message.default.format("dxDiagram-shapeStoredData");
        texts[ShapeTypes.Display] = _message.default.format("dxDiagram-shapeDisplay");
        texts[ShapeTypes.Merge] = _message.default.format("dxDiagram-shapeMerge");
        texts[ShapeTypes.Connector] = _message.default.format("dxDiagram-shapeConnector");
        texts[ShapeTypes.Or] = _message.default.format("dxDiagram-shapeOr");
        texts[ShapeTypes.SummingJunction] = _message.default.format("dxDiagram-shapeSummingJunction");
        texts[ShapeTypes.Container] = _message.default.format("dxDiagram-shapeContainerDefaultText");
        texts[ShapeTypes.VerticalContainer] = _message.default.format("dxDiagram-shapeVerticalContainer");
        texts[ShapeTypes.HorizontalContainer] = _message.default.format("dxDiagram-shapeHorizontalContainer");
        texts[ShapeTypes.Card] = _message.default.format("dxDiagram-shapeCardDefaultText");
        texts[ShapeTypes.CardWithImageOnLeft] = _message.default.format("dxDiagram-shapeCardWithImageOnLeft");
        texts[ShapeTypes.CardWithImageOnTop] = _message.default.format("dxDiagram-shapeCardWithImageOnTop");
        texts[ShapeTypes.CardWithImageOnRight] = _message.default.format("dxDiagram-shapeCardWithImageOnRight");
        return texts
    };
    _proto._updateEventSubscriptionMethods = function() {
        var _getDiagram31 = (0, _diagram.getDiagram)(),
            RenderHelper = _getDiagram31.RenderHelper;
        RenderHelper.addEventListener = function(element, eventName, handler) {
            _events_engine.default.on(element, eventName, handler)
        };
        RenderHelper.removeEventListener = function(element, eventName, handler) {
            _events_engine.default.off(element, eventName, handler)
        }
    };
    _proto._updateDefaultItemProperties = function() {
        if (this.option("defaultItemProperties.style")) {
            this._diagramInstance.setInitialStyleProperties(this.option("defaultItemProperties.style"))
        }
        if (this.option("defaultItemProperties.textStyle")) {
            this._diagramInstance.setInitialTextStyleProperties(this.option("defaultItemProperties.textStyle"))
        }
        this._diagramInstance.setInitialConnectorProperties({
            lineOption: this._getConnectorLineOption(this.option("defaultItemProperties.connectorLineType")),
            startLineEnding: this._getConnectorLineEnding(this.option("defaultItemProperties.connectorLineStart")),
            endLineEnding: this._getConnectorLineEnding(this.option("defaultItemProperties.connectorLineEnd"))
        });
        this._diagramInstance.applyShapeSizeSettings({
            shapeMinWidth: this.option("defaultItemProperties.shapeMinWidth"),
            shapeMaxWidth: this.option("defaultItemProperties.shapeMaxWidth"),
            shapeMinHeight: this.option("defaultItemProperties.shapeMinHeight"),
            shapeMaxHeight: this.option("defaultItemProperties.shapeMaxHeight")
        })
    };
    _proto._updateEditingSettings = function() {
        this._diagramInstance.applyOperationSettings({
            addShape: this.option("editing.allowAddShape"),
            addShapeFromToolbox: this.option("editing.allowAddShape"),
            deleteShape: this.option("editing.allowDeleteShape"),
            deleteConnector: this.option("editing.allowDeleteConnector"),
            changeConnection: this.option("editing.allowChangeConnection"),
            changeConnectorPoints: this.option("editing.allowChangeConnectorPoints"),
            changeShapeText: this.option("editing.allowChangeShapeText"),
            changeConnectorText: this.option("editing.allowChangeConnectorText"),
            resizeShape: this.option("editing.allowResizeShape"),
            moveShape: this.option("editing.allowMoveShape")
        })
    };
    _proto.focus = function() {
        this._captureFocus()
    };
    _proto.export = function() {
        return this._getDiagramData()
    };
    _proto.exportTo = function(format, callback) {
        var command = this._getDiagramExportToCommand(format);
        this._executeDiagramCommand(command, callback)
    };
    _proto._getDiagramExportToCommand = function(format) {
        var _getDiagram32 = (0, _diagram.getDiagram)(),
            DiagramCommand = _getDiagram32.DiagramCommand;
        switch (format) {
            case "png":
                return DiagramCommand.ExportPng;
            case "jpg":
                return DiagramCommand.ExportJpg;
            default:
                return DiagramCommand.ExportSvg
        }
    };
    _proto.import = function(data, updateExistingItemsOnly) {
        this._setDiagramData(data, updateExistingItemsOnly);
        this._raiseDataChangeAction()
    };
    _proto.updateToolbox = function() {
        this._diagramInstance && this._diagramInstance.refreshToolbox();
        this._toolbox && this._toolbox.updateMaxHeight()
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            readOnly: false,
            zoomLevel: DIAGRAM_DEFAULT_ZOOMLEVEL,
            simpleView: false,
            autoZoomMode: DIAGRAM_DEFAULT_AUTOZOOM_MODE,
            fullScreen: false,
            showGrid: true,
            snapToGrid: true,
            units: DIAGRAM_DEFAULT_UNIT,
            viewUnits: DIAGRAM_DEFAULT_UNIT,
            pageOrientation: DIAGRAM_DEFAULT_PAGE_ORIENTATION,
            pageColor: DIAGRAM_DEFAULT_PAGE_COLOR,
            hasChanges: false,
            nodes: {
                dataSource: null,
                keyExpr: "id",
                customDataExpr: void 0,
                lockedExpr: void 0,
                styleExpr: void 0,
                textStyleExpr: void 0,
                zIndexExpr: void 0,
                typeExpr: "type",
                textExpr: "text",
                imageUrlExpr: void 0,
                parentKeyExpr: void 0,
                itemsExpr: void 0,
                leftExpr: void 0,
                topExpr: void 0,
                widthExpr: void 0,
                heightExpr: void 0,
                containerKeyExpr: void 0,
                containerChildrenExpr: "children",
                autoLayout: "auto",
                autoSizeEnabled: true
            },
            edges: {
                dataSource: null,
                keyExpr: "id",
                customDataExpr: void 0,
                lockedExpr: void 0,
                styleExpr: void 0,
                textStyleExpr: void 0,
                zIndexExpr: void 0,
                fromExpr: "from",
                fromPointIndexExpr: void 0,
                toExpr: "to",
                toPointIndexExpr: void 0,
                pointsExpr: void 0,
                textExpr: void 0,
                lineTypeExpr: void 0,
                fromLineEndExpr: void 0,
                toLineEndExpr: void 0
            },
            customShapes: [],
            toolbox: {
                visibility: "auto",
                shapeIconsPerRow: DIAGRAM_TOOLBOX_SHAPES_PER_ROW,
                showSearch: true
            },
            mainToolbar: {
                visible: false
            },
            historyToolbar: {
                visible: true
            },
            viewToolbar: {
                visible: true
            },
            contextMenu: {
                enabled: true
            },
            contextToolbox: {
                enabled: true,
                shapeIconsPerRow: DIAGRAM_CONTEXT_TOOLBOX_SHAPES_PER_ROW,
                width: DIAGRAM_CONTEXT_TOOLBOX_DEFAULT_WIDTH
            },
            propertiesPanel: {
                visibility: "auto"
            },
            defaultItemProperties: {
                connectorLineType: "orthogonal",
                connectorLineStart: "none",
                connectorLineEnd: "arrow"
            },
            editing: {
                allowAddShape: true,
                allowDeleteShape: true,
                allowDeleteConnector: true,
                allowChangeConnection: true,
                allowChangeConnectorPoints: true,
                allowChangeShapeText: true,
                allowChangeConnectorText: true,
                allowResizeShape: true,
                allowMoveShape: true
            },
            "export": {
                fileName: "Diagram",
                proxyUrl: void 0
            },
            onItemClick: null,
            onItemDblClick: null,
            onSelectionChanged: null,
            onRequestEditOperation: null,
            onRequestLayoutUpdate: null
        })
    };
    _proto._raiseDataChangeAction = function() {
        if (this._initialized) {
            this.option("hasChanges", true)
        }
    };
    _proto._raiseEdgeInsertedAction = function(data, callback, errorCallback) {
        if (this._edgesOption) {
            this._edgesOption.insert(data, callback, errorCallback)
        }
    };
    _proto._raiseEdgeUpdatedAction = function(key, data, callback, errorCallback) {
        if (this._edgesOption) {
            this._edgesOption.update(key, data, callback, errorCallback)
        }
    };
    _proto._raiseEdgeRemovedAction = function(key, data, callback, errorCallback) {
        if (this._edgesOption) {
            this._edgesOption.remove(key, data, callback, errorCallback)
        }
    };
    _proto._raiseNodeInsertedAction = function(data, callback, errorCallback) {
        if (this._nodesOption) {
            this._nodesOption.insert(data, callback, errorCallback)
        }
    };
    _proto._raiseNodeUpdatedAction = function(key, data, callback, errorCallback) {
        if (this._nodesOption) {
            this._nodesOption.update(key, data, callback, errorCallback)
        }
    };
    _proto._raiseNodeRemovedAction = function(key, data, callback, errorCallback) {
        if (this._nodesOption) {
            this._nodesOption.remove(key, data, callback, errorCallback)
        }
    };
    _proto._raiseToolboxDragStart = function() {
        if (this._toolbox) {
            this._toolbox._raiseToolboxDragStart();
            if (this.isMobileScreenSize()) {
                this._toolbox.hide();
                this._toolboxDragHidden = true
            }
        }
    };
    _proto._raiseToolboxDragEnd = function() {
        if (this._toolbox) {
            this._toolbox._raiseToolboxDragEnd();
            if (this._toolboxDragHidden) {
                this._toolbox.show();
                delete this._toolboxDragHidden
            }
        }
    };
    _proto._raiseTextInputStart = function() {
        this._textInputStarted = true;
        if (this._propertiesPanel) {
            if (this.isMobileScreenSize() && this._propertiesPanel.isVisible()) {
                this._propertiesPanel.hide();
                this._propertiesPanelTextInputHidden = true
            }
        }
        if (this._toolbox) {
            if (this.isMobileScreenSize() && this._toolbox.isVisible()) {
                this._toolbox.hide();
                this._toolboxTextInputHidden = true
            }
        }
    };
    _proto._raiseTextInputEnd = function() {
        if (this._propertiesPanel) {
            if (this._propertiesPanelTextInputHidden) {
                this._propertiesPanel.show();
                delete this._propertiesPanelTextInputHidden
            }
        }
        if (this._toolbox) {
            if (this._toolboxTextInputHidden) {
                this._toolbox.show();
                delete this._toolboxTextInputHidden
            }
        }
        this._textInputStarted = false
    };
    _proto._createItemClickAction = function() {
        this._itemClickAction = this._createActionByOption("onItemClick")
    };
    _proto._createItemDblClickAction = function() {
        this._itemDblClickAction = this._createActionByOption("onItemDblClick")
    };
    _proto._createSelectionChangedAction = function() {
        this._selectionChangedAction = this._createActionByOption("onSelectionChanged")
    };
    _proto._createRequestEditOperationAction = function() {
        this._requestEditOperationAction = this._createActionByOption("onRequestEditOperation")
    };
    _proto._createRequestLayoutUpdateAction = function() {
        this._requestLayoutUpdateAction = this._createActionByOption("onRequestLayoutUpdate")
    };
    _proto._createCustomCommand = function() {
        this._customCommandAction = this._createActionByOption("onCustomCommand")
    };
    _proto._raiseItemClickAction = function(nativeItem) {
        if (!this._itemClickAction) {
            this._createItemClickAction()
        }
        this._itemClickAction({
            item: this._nativeItemToDiagramItem(nativeItem)
        })
    };
    _proto._raiseItemDblClickAction = function(nativeItem) {
        if (!this._itemDblClickAction) {
            this._createItemDblClickAction()
        }
        this._itemDblClickAction({
            item: this._nativeItemToDiagramItem(nativeItem)
        })
    };
    _proto._raiseSelectionChanged = function(nativeItems) {
        if (!this._selectionChangedAction) {
            this._createSelectionChangedAction()
        }
        this._selectionChangedAction({
            items: nativeItems.map(this._nativeItemToDiagramItem.bind(this))
        })
    };
    _proto._raiseRequestEditOperation = function(operation, args) {
        if (!this._requestEditOperationAction) {
            this._createRequestEditOperationAction()
        }
        var eventArgs = this._getRequestEditOperationEventArgs(operation, args);
        this._requestEditOperationAction(eventArgs);
        args.allowed = eventArgs.allowed
    };
    _proto._getModelOperation = function(operation) {
        var _getDiagram33 = (0, _diagram.getDiagram)(),
            DiagramModelOperation = _getDiagram33.DiagramModelOperation;
        switch (operation) {
            case DiagramModelOperation.AddShape:
                return "addShape";
            case DiagramModelOperation.AddShapeFromToolbox:
                return "addShapeFromToolbox";
            case DiagramModelOperation.DeleteShape:
                return "deleteShape";
            case DiagramModelOperation.DeleteConnector:
                return "deleteConnector";
            case DiagramModelOperation.ChangeConnection:
                return "changeConnection";
            case DiagramModelOperation.ChangeConnectorPoints:
                return "changeConnectorPoints";
            case DiagramModelOperation.BeforeChangeShapeText:
                return "beforeChangeShapeText";
            case DiagramModelOperation.ChangeShapeText:
                return "changeShapeText";
            case DiagramModelOperation.BeforeChangeConnectorText:
                return "beforeChangeConnectorText";
            case DiagramModelOperation.ChangeConnectorText:
                return "changeConnectorText";
            case DiagramModelOperation.ResizeShape:
                return "resizeShape";
            case DiagramModelOperation.MoveShape:
                return "moveShape"
        }
    };
    _proto._getRequestEditOperationEventArgs = function(operation, args) {
        var _getDiagram34 = (0, _diagram.getDiagram)(),
            DiagramModelOperation = _getDiagram34.DiagramModelOperation,
            ConnectorPosition = _getDiagram34.ConnectorPosition;
        var eventArgs = {
            operation: this._getModelOperation(operation),
            allowed: args.allowed,
            updateUI: args.updateUI,
            reason: args.updateUI ? "checkUIElementAvailability" : "modelModification"
        };
        switch (operation) {
            case DiagramModelOperation.AddShape:
                eventArgs.args = {
                    shape: args.shape && this._nativeItemToDiagramItem(args.shape),
                    position: args.position && {
                        x: args.position.x,
                        y: args.position.y
                    }
                };
                break;
            case DiagramModelOperation.AddShapeFromToolbox:
                eventArgs.args = {
                    shapeType: args.shapeType
                };
                break;
            case DiagramModelOperation.DeleteShape:
                eventArgs.args = {
                    shape: args.shape && this._nativeItemToDiagramItem(args.shape)
                };
                break;
            case DiagramModelOperation.DeleteConnector:
                eventArgs.args = {
                    connector: args.connector && this._nativeItemToDiagramItem(args.connector)
                };
                break;
            case DiagramModelOperation.ChangeConnection:
                eventArgs.args = {
                    newShape: args.shape && this._nativeItemToDiagramItem(args.shape),
                    oldShape: args.oldShape && this._nativeItemToDiagramItem(args.oldShape),
                    connector: args.connector && this._nativeItemToDiagramItem(args.connector),
                    connectionPointIndex: args.connectionPointIndex,
                    connectorPosition: args.position === ConnectorPosition.Begin ? "start" : "end"
                };
                break;
            case DiagramModelOperation.ChangeConnectorPoints:
                eventArgs.args = {
                    connector: args.connector && this._nativeItemToDiagramItem(args.connector),
                    newPoints: args.points && args.points.map(function(pt) {
                        return {
                            x: pt.x,
                            y: pt.y
                        }
                    }),
                    oldPoints: args.oldPoints && args.oldPoints.map(function(pt) {
                        return {
                            x: pt.x,
                            y: pt.y
                        }
                    })
                };
                break;
            case DiagramModelOperation.BeforeChangeShapeText:
                eventArgs.args = {
                    shape: args.shape && this._nativeItemToDiagramItem(args.shape)
                };
                break;
            case DiagramModelOperation.ChangeShapeText:
                eventArgs.args = {
                    shape: args.shape && this._nativeItemToDiagramItem(args.shape),
                    text: args.text
                };
                break;
            case DiagramModelOperation.BeforeChangeConnectorText:
                eventArgs.args = {
                    connector: args.connector && this._nativeItemToDiagramItem(args.connector),
                    index: args.index
                };
                break;
            case DiagramModelOperation.ChangeConnectorText:
                eventArgs.args = {
                    connector: args.connector && this._nativeItemToDiagramItem(args.connector),
                    index: args.index,
                    text: args.text
                };
                break;
            case DiagramModelOperation.ResizeShape:
                eventArgs.args = {
                    shape: args.shape && this._nativeItemToDiagramItem(args.shape),
                    newSize: args.size && {
                        width: args.size.width,
                        height: args.size.height
                    },
                    oldSize: args.oldSize && {
                        width: args.oldSize.width,
                        height: args.oldSize.height
                    }
                };
                break;
            case DiagramModelOperation.MoveShape:
                eventArgs.args = {
                    shape: args.shape && this._nativeItemToDiagramItem(args.shape),
                    newPosition: args.position && {
                        x: args.position.x,
                        y: args.position.y
                    },
                    oldPosition: args.oldPosition && {
                        x: args.oldPosition.x,
                        y: args.oldPosition.y
                    }
                }
        }
        return eventArgs
    };
    _proto._nativeItemToDiagramItem = function(nativeItem) {
        var _getDiagram35 = (0, _diagram.getDiagram)(),
            NativeShape = _getDiagram35.NativeShape;
        var createMethod = nativeItem instanceof NativeShape ? this._nativeShapeToDiagramShape.bind(this) : this._nativeConnectorToDiagramConnector.bind(this);
        return (0, _extend.extend)({
            id: nativeItem.id,
            key: nativeItem.key,
            dataItem: void 0
        }, createMethod(nativeItem))
    };
    _proto._nativeShapeToDiagramShape = function(nativeShape) {
        return {
            dataItem: this._nodesOption && this._nodesOption.findItem(nativeShape.key),
            itemType: "shape",
            text: nativeShape.text,
            type: nativeShape.type,
            position: {
                x: nativeShape.position.x,
                y: nativeShape.position.y
            },
            size: {
                width: nativeShape.size.width,
                height: nativeShape.size.height
            },
            attachedConnectorIds: nativeShape.attachedConnectorIds,
            containerId: nativeShape.containerId,
            containerChildItemIds: nativeShape.containerChildItemIds,
            containerExpanded: nativeShape.containerExpanded
        }
    };
    _proto._nativeConnectorToDiagramConnector = function(nativeConnector) {
        return {
            dataItem: this._edgesOption && this._edgesOption.findItem(nativeConnector.key),
            itemType: "connector",
            texts: nativeConnector.texts,
            fromKey: nativeConnector.fromKey,
            toKey: nativeConnector.toKey,
            fromId: nativeConnector.fromId,
            fromPointIndex: nativeConnector.fromPointIndex,
            toId: nativeConnector.toId,
            toPointIndex: nativeConnector.toPointIndex,
            points: nativeConnector.points.map(function(pt) {
                return {
                    x: pt.x,
                    y: pt.y
                }
            })
        }
    };
    _proto.getItemByKey = function(key) {
        var nativeItem = this._diagramInstance && this._diagramInstance.getNativeItemByDataKey(key);
        return nativeItem && this._nativeItemToDiagramItem(nativeItem)
    };
    _proto.getItemById = function(id) {
        var nativeItem = this._diagramInstance && this._diagramInstance.getNativeItemByKey(id);
        return nativeItem && this._nativeItemToDiagramItem(nativeItem)
    };
    _proto._invalidateContextMenuCommands = function() {
        if (this._contextMenu) {
            this._contextMenu.option({
                commands: this.option("contextMenu.commands")
            })
        }
    };
    _proto._invalidatePropertiesPanelTabs = function() {
        if (this._propertiesPanel) {
            this._propertiesPanel.option({
                propertyTabs: this.option("propertiesPanel.tabs")
            })
        }
    };
    _proto._invalidateMainToolbarCommands = function() {
        if (this._mainToolbar) {
            this._mainToolbar.option({
                commands: this.option("mainToolbar.commands")
            })
        }
    };
    _proto._invalidateHistoryToolbarCommands = function() {
        if (this._historyToolbar) {
            this._historyToolbar.option({
                commands: this.option("historyToolbar.commands")
            })
        }
    };
    _proto._invalidateViewToolbarCommands = function() {
        if (this._viewToolbar) {
            this._viewToolbar.option({
                commands: this.option("viewToolbar.commands")
            })
        }
    };
    _proto._invalidateToolboxGroups = function() {
        if (this._toolbox) {
            this._toolbox.option({
                toolboxGroups: this._getToolboxGroups()
            })
        }
    };
    _proto._optionChanged = function(args) {
        if (this.optionsUpdateBar.isUpdateLocked()) {
            return
        }
        this.optionsUpdateBar.beginUpdate();
        try {
            this._optionChangedCore(args)
        } finally {
            this.optionsUpdateBar.endUpdate()
        }
    };
    _proto._optionChangedCore = function(args) {
        var _this14 = this;
        switch (args.name) {
            case "readOnly":
            case "disabled":
                this._updateReadOnlyState();
                this._invalidate();
                break;
            case "zoomLevel":
                if ("zoomLevel" === args.fullName || "zoomLevel.items" === args.fullName) {
                    this._updateZoomLevelItemsState()
                }
                if ("zoomLevel" === args.fullName || "zoomLevel.value" === args.fullName) {
                    this._updateZoomLevelState()
                }
                break;
            case "autoZoomMode":
                this._updateAutoZoomState();
                break;
            case "simpleView":
                this._updateSimpleViewState();
                break;
            case "fullScreen":
                this._updateFullscreenState();
                break;
            case "showGrid":
                this._updateShowGridState();
                break;
            case "snapToGrid":
                this._updateSnapToGridState();
                break;
            case "gridSize":
                if ("gridSize" === args.fullName || "gridSize.items" === args.fullName) {
                    this._updateGridSizeItemsState()
                }
                if ("gridSize" === args.fullName || "gridSize.value" === args.fullName) {
                    this._updateGridSizeState()
                }
                break;
            case "viewUnits":
                this._updateViewUnitsState();
                break;
            case "units":
                this._updateUnitsState();
                break;
            case "pageSize":
                if ("pageSize" === args.fullName || "pageSize.items" === args.fullName) {
                    this._updatePageSizeItemsState()
                }
                if ("pageSize" === args.fullName || "pageSize.width" === args.fullName || "pageSize.height" === args.fullName) {
                    this._updatePageSizeState()
                }
                break;
            case "pageOrientation":
                this._updatePageOrientationState();
                break;
            case "pageColor":
                this._updatePageColorState();
                break;
            case "nodes":
                if ("nodes.autoLayout" === args.fullName) {
                    this._refreshDataSources()
                } else {
                    this._refreshNodesDataSource()
                }
                break;
            case "edges":
                this._refreshEdgesDataSource();
                break;
            case "customShapes":
                this._updateCustomShapes(args.value, args.previousValue);
                this._invalidate();
                break;
            case "contextMenu":
                if ("contextMenu.commands" === args.fullName) {
                    this._invalidateContextMenuCommands()
                } else {
                    this._invalidate()
                }
                break;
            case "contextToolbox":
                this._invalidate();
                break;
            case "propertiesPanel":
                if ("propertiesPanel.tabs" === args.name) {
                    this._invalidatePropertiesPanelTabs()
                } else {
                    this._invalidate()
                }
                break;
            case "toolbox":
                if ("toolbox.groups" === args.fullName) {
                    this._invalidateToolboxGroups()
                } else {
                    this._invalidate()
                }
                break;
            case "mainToolbar":
                if ("mainToolbar.commands" === args.fullName) {
                    this._invalidateMainToolbarCommands()
                } else {
                    this._invalidate()
                }
                break;
            case "historyToolbar":
                if ("historyToolbar.commands" === args.fullName) {
                    this._invalidateHistoryToolbarCommands()
                } else {
                    this._invalidate()
                }
                break;
            case "viewToolbar":
                if ("viewToolbar.commands" === args.fullName) {
                    this._invalidateViewToolbarCommands()
                } else {
                    this._invalidate()
                }
                break;
            case "onItemClick":
                this._createItemClickAction();
                break;
            case "onItemDblClick":
                this._createItemDblClickAction();
                break;
            case "onSelectionChanged":
                this._createSelectionChangedAction();
                break;
            case "onRequestEditOperation":
                this._createRequestEditOperationAction();
                break;
            case "onRequestLayoutUpdate":
                this._createRequestLayoutUpdateAction();
                break;
            case "onCustomCommand":
                this._createCustomCommand();
                break;
            case "defaultItemProperties":
                this._updateDefaultItemProperties();
                break;
            case "editing":
                this._updateEditingSettings();
                break;
            case "export":
                this._toolbars.forEach(function(toolbar) {
                    toolbar.option("export", _this14.option("export"))
                });
                if (this._contextMenu) {
                    this._contextMenu.option("export", this.option("export"))
                }
                break;
            case "hasChanges":
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    return Diagram
}(_ui.default);
(0, _component_registrator.default)("dxDiagram", Diagram);
var _default = Diagram;
exports.default = _default;
module.exports = exports.default;
