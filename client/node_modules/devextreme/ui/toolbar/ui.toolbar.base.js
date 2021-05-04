/**
 * DevExtreme (ui/toolbar/ui.toolbar.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _themes = require("../themes");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _array = require("../../core/utils/array");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _position = require("../../core/utils/position");
var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.async"));
var _promise = _interopRequireDefault(require("../../core/polyfills/promise"));
var _bindable_template = require("../../core/templates/bindable_template");
var _errors = _interopRequireDefault(require("../../core/errors"));
var _fx = _interopRequireDefault(require("../../animation/fx"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TOOLBAR_CLASS = "dx-toolbar";
var TOOLBAR_BEFORE_CLASS = "dx-toolbar-before";
var TOOLBAR_CENTER_CLASS = "dx-toolbar-center";
var TOOLBAR_AFTER_CLASS = "dx-toolbar-after";
var TOOLBAR_MINI_CLASS = "dx-toolbar-mini";
var TOOLBAR_ITEM_CLASS = "dx-toolbar-item";
var TOOLBAR_LABEL_CLASS = "dx-toolbar-label";
var TOOLBAR_BUTTON_CLASS = "dx-toolbar-button";
var TOOLBAR_ITEMS_CONTAINER_CLASS = "dx-toolbar-items-container";
var TOOLBAR_GROUP_CLASS = "dx-toolbar-group";
var TOOLBAR_COMPACT_CLASS = "dx-toolbar-compact";
var TOOLBAR_LABEL_SELECTOR = "." + TOOLBAR_LABEL_CLASS;
var TOOLBAR_MULTILINE_CLASS = "dx-toolbar-multiline";
var TEXT_BUTTON_MODE = "text";
var DEFAULT_BUTTON_TYPE = "default";
var TOOLBAR_ITEM_DATA_KEY = "dxToolbarItemDataKey";
var ToolbarBase = _uiCollection_widget.default.inherit({
    compactMode: false,
    ctor: function(element, options) {
        this._userOptions = options || {};
        this.callBase(element, options);
        if ("height" in this._userOptions) {
            _errors.default.log("W0001", this.NAME, "height", "20.1", "Functionality associated with this option is not intended for the Toolbar widget.")
        }
    },
    _getSynchronizableOptionsForCreateComponent: function() {
        return this.callBase().filter(function(item) {
            return "disabled" !== item
        })
    },
    _initTemplates: function() {
        this.callBase();
        var template = new _bindable_template.BindableTemplate(function($container, data, rawModel) {
            if ((0, _type.isPlainObject)(data)) {
                if (data.text) {
                    $container.text(data.text).wrapInner("<div>")
                }
                if (data.html) {
                    $container.html(data.html)
                }
                if ("dxButton" === data.widget) {
                    if (this.option("useFlatButtons")) {
                        data.options = data.options || {};
                        data.options.stylingMode = data.options.stylingMode || TEXT_BUTTON_MODE
                    }
                    if (this.option("useDefaultButtons")) {
                        data.options = data.options || {};
                        data.options.type = data.options.type || DEFAULT_BUTTON_TYPE
                    }
                }
            } else {
                $container.text(String(data))
            }
            this._getTemplate("dx-polymorph-widget").render({
                container: $container,
                model: rawModel,
                parent: this
            })
        }.bind(this), ["text", "html", "widget", "options"], this.option("integrationOptions.watchMethod"));
        this._templateManager.addDefaultTemplates({
            item: template,
            menuItem: template
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            renderAs: "topToolbar",
            grouped: false,
            useFlatButtons: false,
            useDefaultButtons: false,
            multiline: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                useFlatButtons: true
            }
        }])
    },
    _itemContainer: function() {
        return this._$toolbarItemsContainer.find(["." + TOOLBAR_BEFORE_CLASS, "." + TOOLBAR_CENTER_CLASS, "." + TOOLBAR_AFTER_CLASS].join(","))
    },
    _itemClass: function() {
        return TOOLBAR_ITEM_CLASS
    },
    _itemDataKey: function() {
        return TOOLBAR_ITEM_DATA_KEY
    },
    _buttonClass: function() {
        return TOOLBAR_BUTTON_CLASS
    },
    _dimensionChanged: function() {
        this._arrangeItems();
        this._applyCompactMode()
    },
    _initMarkup: function() {
        this._renderToolbar();
        this._renderSections();
        this.callBase();
        this.setAria("role", "toolbar")
    },
    _waitParentAnimationFinished: function() {
        var _this = this;
        var $element = this.$element();
        var timeout = 15;
        return new _promise.default(function(resolve) {
            var check = function() {
                var readyToResolve = true;
                $element.parents().each(function(_, parent) {
                    if (_fx.default.isAnimating((0, _renderer.default)(parent))) {
                        readyToResolve = false;
                        return false
                    }
                });
                if (readyToResolve) {
                    resolve()
                }
                return readyToResolve
            };
            var runCheck = function runCheck() {
                clearTimeout(_this._waitParentAnimationTimeout);
                _this._waitParentAnimationTimeout = setTimeout(function() {
                    return check() || runCheck()
                }, timeout)
            };
            runCheck()
        })
    },
    _render: function() {
        this.callBase();
        this._renderItemsAsync();
        if ((0, _themes.isMaterial)()) {
            _promise.default.all([this._waitParentAnimationFinished(), this._checkWebFontForLabelsLoaded()]).then(this._dimensionChanged.bind(this))
        }
    },
    _postProcessRenderItems: function() {
        this._arrangeItems()
    },
    _renderToolbar: function() {
        this.$element().addClass(TOOLBAR_CLASS).toggleClass(TOOLBAR_MULTILINE_CLASS, this.option("multiline"));
        this._$toolbarItemsContainer = (0, _renderer.default)("<div>").addClass(TOOLBAR_ITEMS_CONTAINER_CLASS).appendTo(this.$element())
    },
    _renderSections: function() {
        var $container = this._$toolbarItemsContainer;
        var that = this;
        (0, _iterator.each)(["before", "center", "after"], function() {
            var sectionClass = "dx-toolbar-" + this;
            var $section = $container.find("." + sectionClass);
            if (!$section.length) {
                that["_$" + this + "Section"] = $section = (0, _renderer.default)("<div>").addClass(sectionClass).appendTo($container)
            }
        })
    },
    _checkWebFontForLabelsLoaded: function() {
        var $labels = this.$element().find(TOOLBAR_LABEL_SELECTOR);
        var promises = [];
        $labels.each(function(_, label) {
            var text = (0, _renderer.default)(label).text();
            var fontWeight = (0, _renderer.default)(label).css("fontWeight");
            promises.push((0, _themes.waitWebFont)(text, fontWeight))
        });
        return _promise.default.all(promises)
    },
    _arrangeItems: function(elementWidth) {
        elementWidth = elementWidth || this.$element().width();
        this._$centerSection.css({
            margin: "0 auto",
            "float": "none"
        });
        var beforeRect = (0, _position.getBoundingRect)(this._$beforeSection.get(0));
        var afterRect = (0, _position.getBoundingRect)(this._$afterSection.get(0));
        this._alignCenterSection(beforeRect, afterRect, elementWidth);
        var $label = this._$toolbarItemsContainer.find(TOOLBAR_LABEL_SELECTOR).eq(0);
        var $section = $label.parent();
        if (!$label.length) {
            return
        }
        var labelOffset = beforeRect.width ? beforeRect.width : $label.position().left;
        var widthBeforeSection = $section.hasClass(TOOLBAR_BEFORE_CLASS) ? 0 : labelOffset;
        var widthAfterSection = $section.hasClass(TOOLBAR_AFTER_CLASS) ? 0 : afterRect.width;
        var elemsAtSectionWidth = 0;
        $section.children().not(TOOLBAR_LABEL_SELECTOR).each(function() {
            elemsAtSectionWidth += (0, _renderer.default)(this).outerWidth()
        });
        var freeSpace = elementWidth - elemsAtSectionWidth;
        var sectionMaxWidth = Math.max(freeSpace - widthBeforeSection - widthAfterSection, 0);
        if ($section.hasClass(TOOLBAR_BEFORE_CLASS)) {
            this._alignSection(this._$beforeSection, sectionMaxWidth)
        } else {
            var labelPaddings = $label.outerWidth() - $label.width();
            $label.css("maxWidth", sectionMaxWidth - labelPaddings)
        }
    },
    _alignCenterSection: function(beforeRect, afterRect, elementWidth) {
        this._alignSection(this._$centerSection, elementWidth - beforeRect.width - afterRect.width);
        var isRTL = this.option("rtlEnabled");
        var leftRect = isRTL ? afterRect : beforeRect;
        var rightRect = isRTL ? beforeRect : afterRect;
        var centerRect = (0, _position.getBoundingRect)(this._$centerSection.get(0));
        if (leftRect.right > centerRect.left || centerRect.right > rightRect.left) {
            this._$centerSection.css({
                marginLeft: leftRect.width,
                marginRight: rightRect.width,
                "float": leftRect.width > rightRect.width ? "none" : "right"
            })
        }
    },
    _alignSection: function($section, maxWidth) {
        var $labels = $section.find(TOOLBAR_LABEL_SELECTOR);
        var labels = $labels.toArray();
        maxWidth -= this._getCurrentLabelsPaddings(labels);
        var currentWidth = this._getCurrentLabelsWidth(labels);
        var difference = Math.abs(currentWidth - maxWidth);
        if (maxWidth < currentWidth) {
            labels = labels.reverse();
            this._alignSectionLabels(labels, difference, false)
        } else {
            this._alignSectionLabels(labels, difference, true)
        }
    },
    _alignSectionLabels: function(labels, difference, expanding) {
        var getRealLabelWidth = function(label) {
            return (0, _position.getBoundingRect)(label).width
        };
        for (var i = 0; i < labels.length; i++) {
            var $label = (0, _renderer.default)(labels[i]);
            var currentLabelWidth = Math.ceil(getRealLabelWidth(labels[i]));
            var labelMaxWidth = void 0;
            if (expanding) {
                $label.css("maxWidth", "inherit")
            }
            var possibleLabelWidth = Math.ceil(expanding ? getRealLabelWidth(labels[i]) : currentLabelWidth);
            if (possibleLabelWidth < difference) {
                labelMaxWidth = expanding ? possibleLabelWidth : 0;
                difference -= possibleLabelWidth
            } else {
                labelMaxWidth = expanding ? currentLabelWidth + difference : currentLabelWidth - difference;
                $label.css("maxWidth", labelMaxWidth);
                break
            }
            $label.css("maxWidth", labelMaxWidth)
        }
    },
    _applyCompactMode: function() {
        var $element = this.$element();
        $element.removeClass(TOOLBAR_COMPACT_CLASS);
        if (this.option("compactMode") && this._getSummaryItemsWidth(this.itemElements(), true) > $element.width()) {
            $element.addClass(TOOLBAR_COMPACT_CLASS)
        }
    },
    _getCurrentLabelsWidth: function(labels) {
        var width = 0;
        labels.forEach(function(label, index) {
            width += (0, _renderer.default)(label).outerWidth()
        });
        return width
    },
    _getCurrentLabelsPaddings: function(labels) {
        var padding = 0;
        labels.forEach(function(label, index) {
            padding += (0, _renderer.default)(label).outerWidth() - (0, _renderer.default)(label).width()
        });
        return padding
    },
    _renderItem: function(index, item, itemContainer, $after) {
        var location = item.location || "center";
        var container = itemContainer || this["_$" + location + "Section"];
        var itemHasText = !!(item.text || item.html);
        var itemElement = this.callBase(index, item, container, $after);
        itemElement.toggleClass(this._buttonClass(), !itemHasText).toggleClass(TOOLBAR_LABEL_CLASS, itemHasText).addClass(item.cssClass);
        return itemElement
    },
    _renderGroupedItems: function() {
        var that = this;
        (0, _iterator.each)(this.option("items"), function(groupIndex, group) {
            var groupItems = group.items;
            var $container = (0, _renderer.default)("<div>").addClass(TOOLBAR_GROUP_CLASS);
            var location = group.location || "center";
            if (!groupItems || !groupItems.length) {
                return
            }(0, _iterator.each)(groupItems, function(itemIndex, item) {
                that._renderItem(itemIndex, item, $container, null)
            });
            that._$toolbarItemsContainer.find(".dx-toolbar-" + location).append($container)
        })
    },
    _renderItems: function(items) {
        var grouped = this.option("grouped") && items.length && items[0].items;
        grouped ? this._renderGroupedItems() : this.callBase(items)
    },
    _getToolbarItems: function() {
        return this.option("items") || []
    },
    _renderContentImpl: function() {
        var items = this._getToolbarItems();
        this.$element().toggleClass(TOOLBAR_MINI_CLASS, 0 === items.length);
        if (this._renderedItemsCount) {
            this._renderItems(items.slice(this._renderedItemsCount))
        } else {
            this._renderItems(items)
        }
        this._applyCompactMode()
    },
    _renderEmptyMessage: _common.noop,
    _clean: function() {
        this._$toolbarItemsContainer.children().empty();
        this.$element().empty()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._arrangeItems()
        }
    },
    _isVisible: function() {
        return this.$element().width() > 0 && this.$element().height() > 0
    },
    _getIndexByItem: function(item) {
        return (0, _array.inArray)(item, this._getToolbarItems())
    },
    _itemOptionChanged: function(item, property, value) {
        this.callBase.apply(this, [item, property, value]);
        this._arrangeItems()
    },
    _optionChanged: function(args) {
        var name = args.name;
        switch (name) {
            case "width":
                this.callBase.apply(this, arguments);
                this._dimensionChanged();
                break;
            case "multiline":
                this.$element().toggleClass(TOOLBAR_MULTILINE_CLASS, args.value);
                break;
            case "renderAs":
            case "useFlatButtons":
            case "useDefaultButtons":
                this._invalidate();
                break;
            case "compactMode":
                this._applyCompactMode();
                break;
            case "grouped":
                break;
            default:
                this.callBase.apply(this, arguments)
        }
    },
    _dispose: function() {
        this.callBase();
        clearTimeout(this._waitParentAnimationTimeout)
    }
});
(0, _component_registrator.default)("dxToolbarBase", ToolbarBase);
var _default = ToolbarBase;
exports.default = _default;
module.exports = exports.default;
