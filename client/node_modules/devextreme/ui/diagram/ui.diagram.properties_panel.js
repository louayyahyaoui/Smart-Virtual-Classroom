/**
 * DevExtreme (ui/diagram/ui.diagram.properties_panel.js)
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
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _tab_panel = _interopRequireDefault(require("../tab_panel"));
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.floating_panel"));
var _diagram = _interopRequireDefault(require("./diagram.commands_manager"));

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
var DIAGRAM_PROPERTIES_POPUP_WIDTH = 420;
var DIAGRAM_PROPERTIES_POPUP_HEIGHT = 340;
var DIAGRAM_PROPERTIES_POPUP_CLASS = "dx-diagram-properties-popup";
var DIAGRAM_PROPERTIES_POPUP_NOTABS_CLASS = "dx-diagram-properties-popup-notabs";
var DIAGRAM_PROPERTIES_PANEL_CLASS = "dx-diagram-properties-panel";
var DIAGRAM_PROPERTIES_PANEL_GROUP_TITLE_CLASS = "dx-diagram-properties-panel-group-title";
var DIAGRAM_PROPERTIES_PANEL_GROUP_TOOLBAR_CLASS = "dx-diagram-properties-panel-group-toolbar";
var DiagramPropertiesPanel = function(_DiagramFloatingPanel) {
    _inheritsLoose(DiagramPropertiesPanel, _DiagramFloatingPanel);

    function DiagramPropertiesPanel() {
        return _DiagramFloatingPanel.apply(this, arguments) || this
    }
    var _proto = DiagramPropertiesPanel.prototype;
    _proto._init = function() {
        _DiagramFloatingPanel.prototype._init.call(this);
        this._commandTabs = _diagram.default.getPropertyPanelCommandTabs(this.option("propertyTabs"));
        this._createOnCreateToolbar();
        this._createOnSelectedGroupChanged()
    };
    _proto._initMarkup = function() {
        this._toolbars = [];
        this._selectedToolbar = void 0;
        _DiagramFloatingPanel.prototype._initMarkup.call(this)
    };
    _proto._getPopupClass = function() {
        var className = DIAGRAM_PROPERTIES_POPUP_CLASS;
        if (!this._hasTabPanel()) {
            className += " " + DIAGRAM_PROPERTIES_POPUP_NOTABS_CLASS
        }
        return className
    };
    _proto._getPopupWidth = function() {
        return this.isMobileView() ? "100%" : DIAGRAM_PROPERTIES_POPUP_WIDTH
    };
    _proto._getPopupHeight = function() {
        return DIAGRAM_PROPERTIES_POPUP_HEIGHT
    };
    _proto._getPopupPosition = function() {
        var $parent = this.option("offsetParent");
        if (this.isMobileView()) {
            return {
                my: "left bottom",
                at: "left bottom",
                of: $parent
            }
        }
        return {
            my: "right bottom",
            at: "right bottom",
            of: $parent,
            offset: "-" + this.option("offsetX") + " -" + this.option("offsetY")
        }
    };
    _proto._getPopupAnimation = function() {
        var $parent = this.option("offsetParent");
        if (this.isMobileView()) {
            return {
                hide: this._getPopupSlideAnimationObject({
                    direction: "bottom",
                    from: {
                        position: {
                            my: "left bottom",
                            at: "left bottom",
                            of: $parent
                        }
                    },
                    to: {
                        position: {
                            my: "left top",
                            at: "left bottom",
                            of: $parent
                        }
                    }
                }),
                show: this._getPopupSlideAnimationObject({
                    direction: "top",
                    from: {
                        position: {
                            my: "left top",
                            at: "left bottom",
                            of: $parent
                        }
                    },
                    to: {
                        position: {
                            my: "left bottom",
                            at: "left bottom",
                            of: $parent
                        }
                    }
                })
            }
        }
        return _DiagramFloatingPanel.prototype._getPopupAnimation.call(this)
    };
    _proto._getPopupOptions = function() {
        return (0, _extend.extend)(_DiagramFloatingPanel.prototype._getPopupOptions.call(this), {
            showTitle: this.isMobileView(),
            showCloseButton: this.isMobileView()
        })
    };
    _proto._renderPopupContent = function($parent) {
        if (!this._commandTabs.length) {
            return
        }
        var $panel = (0, _renderer.default)("<div>").addClass(DIAGRAM_PROPERTIES_PANEL_CLASS).appendTo($parent);
        if (this._hasTabPanel()) {
            this._renderTabPanel($panel)
        } else {
            this._renderTabContent($panel, this._commandTabs[0], 0, true)
        }
    };
    _proto._hasTabPanel = function() {
        return this._commandTabs.length > 1
    };
    _proto._renderTabPanel = function($parent) {
        var _this = this;
        var $tabPanel = (0, _renderer.default)("<div>").appendTo($parent);
        this._tabPanel = this._createComponent($tabPanel, _tab_panel.default, {
            focusStateEnabled: false,
            dataSource: this._commandTabs,
            itemTemplate: function(data, index, $element) {
                _this._renderTabContent($element, data, index)
            },
            onSelectionChanged: function(e) {
                _this._onSelectedGroupChangedAction();
                _this._onPointerUpAction()
            },
            onContentReady: function(e) {
                _this._popup.option("height", e.component.$element().height() + _this._getVerticalPaddingsAndBorders());
                if (_this._firstScrollView) {
                    _this._scrollViewHeight = _this._firstScrollView.$element().outerHeight();
                    _this._firstScrollView.option("height", _this._scrollViewHeight)
                }
            }
        })
    };
    _proto._renderTabContent = function($parent, tab, index, isSingleTab) {
        var $scrollViewWrapper = (0, _renderer.default)("<div>").appendTo($parent);
        var scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default, {
            height: this._scrollViewHeight
        });
        this._renderTabInnerContent(scrollView.content(), tab, index);
        if (isSingleTab) {
            this._popup.option("height", scrollView.$element().height() + this._getVerticalPaddingsAndBorders())
        } else {
            this._firstScrollView = this._firstScrollView || scrollView
        }
    };
    _proto._renderTabInnerContent = function($parent, group, index) {
        var _this2 = this;
        if (group.groups) {
            group.groups.forEach(function(sg, si) {
                _this2._renderTabGroupContent($parent, index, sg.title, sg.commands)
            })
        } else {
            if (group.commands) {
                this._renderTabGroupContent($parent, index, void 0, group.commands)
            }
        }
    };
    _proto._renderTabGroupContent = function($parent, index, title, commands) {
        if (title) {
            (0, _renderer.default)("<div>").addClass(DIAGRAM_PROPERTIES_PANEL_GROUP_TITLE_CLASS).appendTo($parent).text(title)
        }
        var $toolbar = (0, _renderer.default)("<div>").addClass(DIAGRAM_PROPERTIES_PANEL_GROUP_TOOLBAR_CLASS).appendTo($parent);
        var args = {
            $parent: $toolbar,
            commands: commands
        };
        this._onCreateToolbarAction(args);
        if (!this._toolbars[index]) {
            this._toolbars[index] = []
        }
        this._toolbars[index].push(args.toolbar);
        this._selectedToolbar = args.toolbar
    };
    _proto.getActiveToolbars = function() {
        var index = this._tabPanel ? this._tabPanel.option("selectedIndex") : 0;
        return this._toolbars[index]
    };
    _proto._createOnCreateToolbar = function() {
        this._onCreateToolbarAction = this._createActionByOption("onCreateToolbar")
    };
    _proto._createOnSelectedGroupChanged = function() {
        this._onSelectedGroupChangedAction = this._createActionByOption("onSelectedGroupChanged")
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "onCreateToolbar":
                this._createOnCreateToolbar();
                break;
            case "onSelectedGroupChanged":
                this._createOnSelectedGroupChanged();
                break;
            case "propertyTabs":
                this._invalidate();
                break;
            default:
                _DiagramFloatingPanel.prototype._optionChanged.call(this, args)
        }
    };
    return DiagramPropertiesPanel
}(_uiDiagram.default);
var _default = DiagramPropertiesPanel;
exports.default = _default;
module.exports = exports.default;
