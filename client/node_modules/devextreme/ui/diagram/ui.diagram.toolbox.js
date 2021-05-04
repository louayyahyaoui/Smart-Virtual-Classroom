/**
 * DevExtreme (ui/diagram/ui.diagram.toolbox.js)
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
var _deferred = require("../../core/utils/deferred");
var _message = _interopRequireDefault(require("../../localization/message"));
var _text_box = _interopRequireDefault(require("../text_box"));
var _accordion = _interopRequireDefault(require("../accordion"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _diagram = require("./diagram.importer");
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.floating_panel"));

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
var DIAGRAM_TOOLBOX_MIN_HEIGHT = 130;
var DIAGRAM_TOOLBOX_POPUP_CLASS = "dx-diagram-toolbox-popup";
var DIAGRAM_TOOLBOX_PANEL_CLASS = "dx-diagram-toolbox-panel";
var DIAGRAM_TOOLBOX_INPUT_CONTAINER_CLASS = "dx-diagram-toolbox-input-container";
var DIAGRAM_TOOLBOX_INPUT_CLASS = "dx-diagram-toolbox-input";
var DIAGRAM_TOOLTIP_DATATOGGLE = "shape-toolbox-tooltip";
var DIAGRAM_SKIP_GESTURE_CLASS = "dx-skip-gesture-event";
var DiagramToolbox = function(_DiagramFloatingPanel) {
    _inheritsLoose(DiagramToolbox, _DiagramFloatingPanel);

    function DiagramToolbox() {
        return _DiagramFloatingPanel.apply(this, arguments) || this
    }
    var _proto = DiagramToolbox.prototype;
    _proto._init = function() {
        _DiagramFloatingPanel.prototype._init.call(this);
        this._toolboxes = [];
        this._filterText = "";
        this._createOnShapeCategoryRenderedAction();
        this._createOnFilterChangedAction()
    };
    _proto._getPopupClass = function() {
        return DIAGRAM_TOOLBOX_POPUP_CLASS
    };
    _proto._getPopupHeight = function() {
        return this.isMobileView() ? "100%" : _DiagramFloatingPanel.prototype._getPopupHeight.call(this)
    };
    _proto._getPopupMaxHeight = function() {
        return this.isMobileView() ? "100%" : _DiagramFloatingPanel.prototype._getPopupMaxHeight.call(this)
    };
    _proto._getPopupMinHeight = function() {
        return DIAGRAM_TOOLBOX_MIN_HEIGHT
    };
    _proto._getPopupPosition = function() {
        var $parent = this.option("offsetParent");
        var position = {
            my: "left top",
            at: "left top",
            of: $parent
        };
        if (!this.isMobileView()) {
            return (0, _extend.extend)(position, {
                offset: this.option("offsetX") + " " + this.option("offsetY")
            })
        }
        return position
    };
    _proto._getPopupAnimation = function() {
        var $parent = this.option("offsetParent");
        if (this.isMobileView()) {
            return {
                hide: this._getPopupSlideAnimationObject({
                    direction: "left",
                    from: {
                        position: {
                            my: "left top",
                            at: "left top",
                            of: $parent
                        }
                    },
                    to: {
                        position: {
                            my: "right top",
                            at: "left top",
                            of: $parent
                        }
                    }
                }),
                show: this._getPopupSlideAnimationObject({
                    direction: "right",
                    from: {
                        position: {
                            my: "right top",
                            at: "left top",
                            of: $parent
                        }
                    },
                    to: {
                        position: {
                            my: "left top",
                            at: "left top",
                            of: $parent
                        }
                    }
                })
            }
        }
        return _DiagramFloatingPanel.prototype._getPopupAnimation.call(this)
    };
    _proto._getPopupOptions = function() {
        var options = _DiagramFloatingPanel.prototype._getPopupOptions.call(this);
        if (!this.isMobileView()) {
            return (0, _extend.extend)(options, {
                showTitle: true,
                toolbarItems: [{
                    widget: "dxButton",
                    location: "center",
                    options: {
                        activeStateEnabled: false,
                        focusStateEnabled: false,
                        hoverStateEnabled: false,
                        icon: "diagram-toolbox-drag",
                        stylingMode: "outlined",
                        type: "normal"
                    }
                }]
            })
        }
        return options
    };
    _proto._renderPopupContent = function($parent) {
        var panelHeight = "100%";
        if (this.option("showSearch")) {
            var $inputContainer = (0, _renderer.default)("<div>").addClass(DIAGRAM_TOOLBOX_INPUT_CONTAINER_CLASS).appendTo($parent);
            this._updateElementWidth($inputContainer);
            this._renderSearchInput($inputContainer);
            if ((0, _window.hasWindow)()) {
                panelHeight = "calc(100% - " + this._searchInput.$element().height() + "px)"
            }
        }
        var $panel = (0, _renderer.default)("<div>").addClass(DIAGRAM_TOOLBOX_PANEL_CLASS).appendTo($parent).height(panelHeight);
        this._updateElementWidth($panel);
        this._renderScrollView($panel)
    };
    _proto._updateElementWidth = function($element) {
        if (void 0 !== this.option("toolboxWidth")) {
            $element.css("width", this.option("toolboxWidth"))
        }
    };
    _proto.updateMaxHeight = function() {
        if (this.isMobileView()) {
            return
        }
        var maxHeight = 6;
        if (this._popup) {
            var $title = this._getPopupTitle();
            maxHeight += $title.outerHeight()
        }
        if (this._accordion) {
            maxHeight += this._accordion.$element().outerHeight()
        }
        if (this._searchInput) {
            maxHeight += this._searchInput.$element().outerHeight()
        }
        this.option("maxHeight", maxHeight)
    };
    _proto._renderSearchInput = function($parent) {
        var _this = this;
        var $input = (0, _renderer.default)("<div>").addClass(DIAGRAM_TOOLBOX_INPUT_CLASS).appendTo($parent);
        this._searchInput = this._createComponent($input, _text_box.default, {
            stylingMode: "outlined",
            placeholder: _message.default.format("dxDiagram-uiSearch"),
            onValueChanged: function(data) {
                _this._onInputChanged(data.value)
            },
            valueChangeEvent: "keyup",
            buttons: [{
                name: "search",
                location: "after",
                options: {
                    activeStateEnabled: false,
                    focusStateEnabled: false,
                    hoverStateEnabled: false,
                    icon: "search",
                    stylingMode: "outlined",
                    type: "normal",
                    onClick: function() {
                        _this._searchInput.focus()
                    }
                }
            }]
        })
    };
    _proto._renderScrollView = function($parent) {
        var $scrollViewWrapper = (0, _renderer.default)("<div>").appendTo($parent);
        this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default);
        var $accordion = (0, _renderer.default)("<div>").appendTo(this._scrollView.content());
        this._updateElementWidth($accordion);
        this._renderAccordion($accordion)
    };
    _proto._getAccordionDataSource = function() {
        var _this2 = this;
        var result = [];
        var toolboxGroups = this.option("toolboxGroups");
        for (var i = 0; i < toolboxGroups.length; i++) {
            var category = toolboxGroups[i].category;
            var title = toolboxGroups[i].title;
            var groupObj = {
                category: category,
                title: title || category,
                expanded: toolboxGroups[i].expanded,
                displayMode: toolboxGroups[i].displayMode,
                shapes: toolboxGroups[i].shapes,
                onTemplate: function(widget, $element, data) {
                    var $toolboxElement = (0, _renderer.default)($element);
                    _this2._onShapeCategoryRenderedAction({
                        category: data.category,
                        displayMode: data.displayMode,
                        dataToggle: DIAGRAM_TOOLTIP_DATATOGGLE,
                        shapes: data.shapes,
                        $element: $toolboxElement
                    });
                    _this2._toolboxes.push($toolboxElement);
                    if ("" !== _this2._filterText) {
                        _this2._onFilterChangedAction({
                            text: _this2._filterText,
                            filteringToolboxes: _this2._toolboxes.length - 1
                        })
                    }
                    _this2._createTooltips($toolboxElement.find('[data-toggle="' + DIAGRAM_TOOLTIP_DATATOGGLE + '"]'))
                }
            };
            result.push(groupObj)
        }
        return result
    };
    _proto._createTooltips = function(targets) {
        var _this3 = this;
        var _getDiagram = (0, _diagram.getDiagram)(),
            Browser = _getDiagram.Browser;
        if (Browser.TouchUI) {
            return
        }
        var $container = this.$element();
        targets.each(function(index, element) {
            var $target = (0, _renderer.default)(element);
            var title = $target.attr("title");
            if (title) {
                var $tooltip = (0, _renderer.default)("<div>").html(title).appendTo($container);
                _this3._createComponent($tooltip, _tooltip.default, {
                    target: $target.get(0),
                    showEvent: "mouseenter",
                    hideEvent: "mouseleave",
                    position: "top",
                    animation: {
                        show: {
                            type: "fade",
                            from: 0,
                            to: 1,
                            delay: 500
                        },
                        hide: {
                            type: "fade",
                            from: 1,
                            to: 0,
                            delay: 100
                        }
                    }
                })
            }
        })
    };
    _proto._renderAccordion = function($container) {
        var _this4 = this;
        var data = this._getAccordionDataSource();
        this._accordion = this._createComponent($container, _accordion.default, {
            multiple: true,
            animationDuration: 0,
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            collapsible: true,
            displayExpr: "title",
            dataSource: data,
            disabled: this.option("disabled"),
            itemTemplate: function(data, index, $element) {
                data.onTemplate(_this4, $element, data)
            },
            onSelectionChanged: function(e) {
                _this4._updateScrollAnimateSubscription(e.component)
            },
            onContentReady: function(e) {
                for (var i = 0; i < data.length; i++) {
                    if (false === data[i].expanded) {
                        e.component.collapseItem(i)
                    } else {
                        if (true === data[i].expanded) {
                            e.component.expandItem(i)
                        }
                    }
                }
                _this4._updateScrollAnimateSubscription(e.component)
            }
        })
    };
    _proto._updateScrollAnimateSubscription = function(component) {
        var _this5 = this;
        component._deferredAnimate = new _deferred.Deferred;
        component._deferredAnimate.done(function() {
            _this5.updateMaxHeight();
            _this5._scrollView.update();
            _this5._updateScrollAnimateSubscription(component)
        })
    };
    _proto._raiseToolboxDragStart = function() {
        this._scrollView.$element().addClass(DIAGRAM_SKIP_GESTURE_CLASS)
    };
    _proto._raiseToolboxDragEnd = function() {
        this._scrollView.$element().removeClass(DIAGRAM_SKIP_GESTURE_CLASS)
    };
    _proto._onInputChanged = function(text) {
        var _this6 = this;
        this._filterText = text;
        this._onFilterChangedAction({
            text: this._filterText,
            filteringToolboxes: this._toolboxes.map(function($element, index) {
                return index
            })
        });
        this._toolboxes.forEach(function($element) {
            var $tooltipContainer = (0, _renderer.default)($element);
            _this6._createTooltips($tooltipContainer.find('[data-toggle="' + DIAGRAM_TOOLTIP_DATATOGGLE + '"]'))
        });
        this.updateMaxHeight();
        this._scrollView.update()
    };
    _proto._createOnShapeCategoryRenderedAction = function() {
        this._onShapeCategoryRenderedAction = this._createActionByOption("onShapeCategoryRendered")
    };
    _proto._createOnFilterChangedAction = function() {
        this._onFilterChangedAction = this._createActionByOption("onFilterChanged")
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "onShapeCategoryRendered":
                this._createOnShapeCategoryRenderedAction();
                break;
            case "onFilterChanged":
                this._createOnFilterChangedAction();
                break;
            case "showSearch":
            case "toolboxWidth":
                this._invalidate();
                break;
            case "toolboxGroups":
                this._accordion.option("dataSource", this._getAccordionDataSource());
                break;
            default:
                _DiagramFloatingPanel.prototype._optionChanged.call(this, args)
        }
    };
    return DiagramToolbox
}(_uiDiagram.default);
var _default = DiagramToolbox;
exports.default = _default;
module.exports = exports.default;
