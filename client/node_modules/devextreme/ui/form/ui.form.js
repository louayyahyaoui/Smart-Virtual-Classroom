/**
 * DevExtreme (ui/form/ui.form.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _array = require("../../core/utils/array");
var _extend = require("../../core/utils/extend");
var _string = require("../../core/utils/string");
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _visibility_change = require("../../events/visibility_change");
var _element = require("../../core/element");
var _message = _interopRequireDefault(require("../../localization/message"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _editor = _interopRequireDefault(require("../editor/editor"));
var _window = require("../../core/utils/window");
var _validation_engine = _interopRequireDefault(require("../validation_engine"));
var _uiForm = _interopRequireDefault(require("./ui.form.items_runtime_info"));
var _tab_panel = _interopRequireDefault(require("../tab_panel"));
var _ui2 = _interopRequireDefault(require("../scroll_view/ui.scrollable"));
var _deferred = require("../../core/utils/deferred");
var _themes = require("../themes");
var _uiForm2 = _interopRequireDefault(require("./ui.form.item_options_actions"));
require("./ui.form.layout_manager");
var _uiForm4 = require("./ui.form.utils");
require("../validation_summary");
require("../validation_group");
var _constants = require("./constants");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var WIDGET_CLASS = "dx-widget";
var FOCUSED_STATE_CLASS = "dx-state-focused";
var ITEM_OPTIONS_FOR_VALIDATION_UPDATING = ["items", "isRequired", "validationRules", "visible"];
var Form = _ui.default.inherit({
    _init: function() {
        this.callBase();
        this._cachedColCountOptions = [];
        this._itemsRunTimeInfo = new _uiForm.default;
        this._groupsColCount = [];
        this._attachSyncSubscriptions()
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            formID: "dx-" + new _guid.default,
            formData: {},
            colCount: 1,
            screenByWidth: _window.defaultScreenFactorFunc,
            colCountByScreen: void 0,
            labelLocation: "left",
            readOnly: false,
            onFieldDataChanged: null,
            customizeItem: null,
            onEditorEnterKey: null,
            minColWidth: 200,
            alignItemLabels: true,
            alignItemLabelsInAllGroups: true,
            alignRootItemLabels: true,
            showColonAfterLabel: true,
            showRequiredMark: true,
            showOptionalMark: false,
            requiredMark: "*",
            optionalMark: _message.default.format("dxForm-optionalMark"),
            requiredMessage: _message.default.getFormatter("dxForm-requiredMessage"),
            showValidationSummary: false,
            items: void 0,
            scrollingEnabled: false,
            validationGroup: void 0,
            stylingMode: void 0
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                showColonAfterLabel: false,
                labelLocation: "top"
            }
        }])
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend.extend)(this._optionsByReference, {
            formData: true,
            validationGroup: true
        })
    },
    _getGroupColCount: function($element) {
        return parseInt($element.attr(_constants.GROUP_COL_COUNT_ATTR))
    },
    _createHiddenElement: function(rootLayoutManager) {
        this._$hiddenElement = (0, _renderer.default)("<div>").addClass(WIDGET_CLASS).addClass(_constants.HIDDEN_LABEL_CLASS).appendTo("body");
        var $hiddenLabel = rootLayoutManager._renderLabel({
            text: " ",
            location: this._labelLocation()
        }).appendTo(this._$hiddenElement);
        this._hiddenLabelText = $hiddenLabel.find("." + _constants.FIELD_ITEM_LABEL_TEXT_CLASS)[0]
    },
    _removeHiddenElement: function() {
        this._$hiddenElement.remove();
        this._hiddenLabelText = null
    },
    _getLabelWidthByText: function(text) {
        this._hiddenLabelText.innerHTML = text;
        return this._hiddenLabelText.offsetWidth
    },
    _getLabelsSelectorByCol: function(index, options) {
        options = options || {};
        var fieldItemClass = options.inOneColumn ? _constants.FIELD_ITEM_CLASS : _constants.FORM_FIELD_ITEM_COL_CLASS + index;
        var cssExcludeTabbedSelector = options.excludeTabbed ? ":not(." + _constants.FIELD_ITEM_TAB_CLASS + ")" : "";
        var childLabelContentSelector = "> ." + _constants.FIELD_ITEM_LABEL_CLASS + " > ." + _constants.FIELD_ITEM_LABEL_CONTENT_CLASS;
        return "." + fieldItemClass + cssExcludeTabbedSelector + childLabelContentSelector
    },
    _getLabelText: function(labelText) {
        var length = labelText.children.length;
        var child;
        var result = "";
        var i;
        for (i = 0; i < length; i++) {
            child = labelText.children[i];
            result += !(0, _string.isEmpty)(child.innerText) ? child.innerText : child.innerHTML
        }
        return result
    },
    _applyLabelsWidthByCol: function($container, index, options) {
        var $labelTexts = $container.find(this._getLabelsSelectorByCol(index, options));
        var $labelTextsLength = $labelTexts.length;
        var labelWidth;
        var i;
        var maxWidth = 0;
        for (i = 0; i < $labelTextsLength; i++) {
            labelWidth = this._getLabelWidthByText(this._getLabelText($labelTexts[i]));
            if (labelWidth > maxWidth) {
                maxWidth = labelWidth
            }
        }
        for (i = 0; i < $labelTextsLength; i++) {
            $labelTexts[i].style.width = maxWidth + "px"
        }
    },
    _applyLabelsWidth: function($container, excludeTabbed, inOneColumn, colCount) {
        colCount = inOneColumn ? 1 : colCount || this._getGroupColCount($container);
        var applyLabelsOptions = {
            excludeTabbed: excludeTabbed,
            inOneColumn: inOneColumn
        };
        var i;
        for (i = 0; i < colCount; i++) {
            this._applyLabelsWidthByCol($container, i, applyLabelsOptions)
        }
    },
    _getGroupElementsInColumn: function($container, columnIndex, colCount) {
        var cssColCountSelector = (0, _type.isDefined)(colCount) ? "." + _constants.GROUP_COL_COUNT_CLASS + colCount : "";
        var groupSelector = "." + _constants.FORM_FIELD_ITEM_COL_CLASS + columnIndex + " > ." + _constants.FIELD_ITEM_CONTENT_CLASS + " > ." + _constants.FORM_GROUP_CLASS + cssColCountSelector;
        return $container.find(groupSelector)
    },
    _applyLabelsWidthWithGroups: function($container, colCount, excludeTabbed) {
        if (true === this.option("alignRootItemLabels")) {
            this._alignRootSimpleItems($container, colCount, excludeTabbed)
        }
        var alignItemLabelsInAllGroups = this.option("alignItemLabelsInAllGroups");
        if (alignItemLabelsInAllGroups) {
            this._applyLabelsWidthWithNestedGroups($container, colCount, excludeTabbed)
        } else {
            var $groups = this.$element().find("." + _constants.FORM_GROUP_CLASS);
            var i;
            for (i = 0; i < $groups.length; i++) {
                this._applyLabelsWidth($groups.eq(i), excludeTabbed)
            }
        }
    },
    _alignRootSimpleItems: function($container, colCount, excludeTabbed) {
        var $rootSimpleItems = $container.find(".".concat(_constants.ROOT_SIMPLE_ITEM_CLASS));
        for (var colIndex = 0; colIndex < colCount; colIndex++) {
            this._applyLabelsWidthByCol($rootSimpleItems, colIndex, excludeTabbed)
        }
    },
    _applyLabelsWidthWithNestedGroups: function($container, colCount, excludeTabbed) {
        var applyLabelsOptions = {
            excludeTabbed: excludeTabbed
        };
        var colIndex;
        var groupsColIndex;
        var groupColIndex;
        var $groupsByCol;
        for (colIndex = 0; colIndex < colCount; colIndex++) {
            $groupsByCol = this._getGroupElementsInColumn($container, colIndex);
            this._applyLabelsWidthByCol($groupsByCol, 0, applyLabelsOptions);
            for (groupsColIndex = 0; groupsColIndex < this._groupsColCount.length; groupsColIndex++) {
                $groupsByCol = this._getGroupElementsInColumn($container, colIndex, this._groupsColCount[groupsColIndex]);
                var groupColCount = this._getGroupColCount($groupsByCol);
                for (groupColIndex = 1; groupColIndex < groupColCount; groupColIndex++) {
                    this._applyLabelsWidthByCol($groupsByCol, groupColIndex, applyLabelsOptions)
                }
            }
        }
    },
    _labelLocation: function() {
        return this.option("labelLocation")
    },
    _alignLabelsInColumn: function(_ref) {
        var layoutManager = _ref.layoutManager,
            inOneColumn = _ref.inOneColumn,
            $container = _ref.$container,
            excludeTabbed = _ref.excludeTabbed,
            items = _ref.items;
        if (!(0, _window.hasWindow)() || "top" === this._labelLocation()) {
            return
        }
        this._createHiddenElement(layoutManager);
        if (inOneColumn) {
            this._applyLabelsWidth($container, excludeTabbed, true)
        } else {
            if (this._checkGrouping(items)) {
                this._applyLabelsWidthWithGroups($container, layoutManager._getColCount(), excludeTabbed)
            } else {
                this._applyLabelsWidth($container, excludeTabbed, false, layoutManager._getColCount())
            }
        }
        this._removeHiddenElement()
    },
    _prepareFormData: function() {
        if (!(0, _type.isDefined)(this.option("formData"))) {
            this.option("formData", {})
        }
    },
    _initMarkup: function() {
        _validation_engine.default.addGroup(this._getValidationGroup());
        this._clearCachedInstances();
        this._prepareFormData();
        this.$element().addClass(_constants.FORM_CLASS);
        this.callBase();
        this.setAria("role", "form", this.$element());
        if (this.option("scrollingEnabled")) {
            this._renderScrollable()
        }
        this._renderLayout();
        this._renderValidationSummary();
        this._lastMarkupScreenFactor = this._targetScreenFactor || this._getCurrentScreenFactor()
    },
    _getCurrentScreenFactor: function() {
        return (0, _window.hasWindow)() ? (0, _window.getCurrentScreenFactor)(this.option("screenByWidth")) : "lg"
    },
    _clearCachedInstances: function() {
        this._itemsRunTimeInfo.clear();
        this._cachedLayoutManagers = []
    },
    _alignLabels: function(layoutManager, inOneColumn) {
        this._alignLabelsInColumn({
            $container: this.$element(),
            layoutManager: layoutManager,
            excludeTabbed: true,
            items: this.option("items"),
            inOneColumn: inOneColumn
        })
    },
    _clean: function() {
        this.callBase();
        this._groupsColCount = [];
        this._cachedColCountOptions = [];
        this._lastMarkupScreenFactor = void 0
    },
    _renderScrollable: function() {
        var useNativeScrolling = this.option("useNativeScrolling");
        this._scrollable = new _ui2.default(this.$element(), {
            useNative: !!useNativeScrolling,
            useSimulatedScrollbar: !useNativeScrolling,
            useKeyboard: false,
            direction: "both",
            bounceEnabled: false
        })
    },
    _getContent: function() {
        return this.option("scrollingEnabled") ? this._scrollable.$content() : this.$element()
    },
    _renderValidationSummary: function() {
        var $validationSummary = this.$element().find("." + _constants.FORM_VALIDATION_SUMMARY);
        if ($validationSummary.length > 0) {
            $validationSummary.remove()
        }
        if (this.option("showValidationSummary")) {
            var _$validationSummary = (0, _renderer.default)("<div>").addClass(_constants.FORM_VALIDATION_SUMMARY).appendTo(this._getContent());
            this._validationSummary = _$validationSummary.dxValidationSummary({
                validationGroup: this._getValidationGroup()
            }).dxValidationSummary("instance")
        }
    },
    _prepareItems: function(items, parentIsTabbedItem, currentPath, isTabs) {
        if (items) {
            var result = [];
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                var path = (0, _uiForm4.concatPaths)(currentPath, (0, _uiForm4.createItemPathByIndex)(i, isTabs));
                var guid = this._itemsRunTimeInfo.add({
                    item: item,
                    itemIndex: i,
                    path: path
                });
                if ((0, _type.isString)(item)) {
                    item = {
                        dataField: item
                    }
                }
                if ((0, _type.isObject)(item)) {
                    var itemCopy = (0, _extend.extend)({}, item);
                    itemCopy.guid = guid;
                    this._tryPrepareGroupItem(itemCopy);
                    this._tryPrepareTabbedItem(itemCopy, path);
                    this._tryPrepareItemTemplate(itemCopy);
                    if (parentIsTabbedItem) {
                        itemCopy.cssItemClass = _constants.FIELD_ITEM_TAB_CLASS
                    }
                    if (itemCopy.items) {
                        itemCopy.items = this._prepareItems(itemCopy.items, parentIsTabbedItem, path)
                    }
                    result.push(itemCopy)
                } else {
                    result.push(item)
                }
            }
            return result
        }
    },
    _tryPrepareGroupItem: function(item) {
        if ("group" === item.itemType) {
            item.alignItemLabels = (0, _common.ensureDefined)(item.alignItemLabels, true);
            if (item.template) {
                item.groupContentTemplate = this._getTemplate(item.template)
            }
            item.template = this._itemGroupTemplate.bind(this, item)
        }
    },
    _tryPrepareTabbedItem: function(item, path) {
        if ("tabbed" === item.itemType) {
            item.template = this._itemTabbedTemplate.bind(this, item);
            item.tabs = this._prepareItems(item.tabs, true, path, true)
        }
    },
    _tryPrepareItemTemplate: function(item) {
        if (item.template) {
            item.template = this._getTemplate(item.template)
        }
    },
    _checkGrouping: function(items) {
        if (items) {
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if ("group" === item.itemType) {
                    return true
                }
            }
        }
    },
    _renderLayout: function() {
        var that = this;
        var items = that.option("items");
        var $content = that._getContent();
        items = that._prepareItems(items);
        that._rootLayoutManager = that._renderLayoutManager(items, $content, {
            isRoot: true,
            colCount: that.option("colCount"),
            alignItemLabels: that.option("alignItemLabels"),
            screenByWidth: this.option("screenByWidth"),
            colCountByScreen: this.option("colCountByScreen"),
            onLayoutChanged: function(inOneColumn) {
                that._alignLabels.bind(that)(that._rootLayoutManager, inOneColumn)
            },
            onContentReady: function(e) {
                that._alignLabels(e.component, e.component.isSingleColumnMode())
            }
        })
    },
    _tryGetItemsForTemplate: function(item) {
        return item.items || []
    },
    _itemTabbedTemplate: function(item, e, $container) {
        var _this = this;
        var $tabPanel = (0, _renderer.default)("<div>").appendTo($container);
        var tabPanelOptions = (0, _extend.extend)({}, item.tabPanelOptions, {
            dataSource: item.tabs,
            onItemRendered: function(args) {
                return (0, _visibility_change.triggerShownEvent)(args.itemElement)
            },
            itemTemplate: function(itemData, e, container) {
                var $container = (0, _renderer.default)(container);
                var alignItemLabels = (0, _common.ensureDefined)(itemData.alignItemLabels, true);
                var layoutManager = _this._renderLayoutManager(_this._tryGetItemsForTemplate(itemData), $container, {
                    colCount: itemData.colCount,
                    alignItemLabels: alignItemLabels,
                    screenByWidth: _this.option("screenByWidth"),
                    colCountByScreen: itemData.colCountByScreen,
                    cssItemClass: itemData.cssItemClass,
                    onLayoutChanged: function(inOneColumn) {
                        _this._alignLabelsInColumn({
                            $container: $container,
                            layoutManager: layoutManager,
                            items: itemData.items,
                            inOneColumn: inOneColumn
                        })
                    }
                });
                if (_this._itemsRunTimeInfo) {
                    _this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(itemData.guid, {
                        layoutManager: layoutManager
                    })
                }
                if (alignItemLabels) {
                    _this._alignLabelsInColumn({
                        $container: $container,
                        layoutManager: layoutManager,
                        items: itemData.items,
                        inOneColumn: layoutManager.isSingleColumnMode()
                    })
                }
            }
        });
        var tryUpdateTabPanelInstance = function(items, instance) {
            if (Array.isArray(items)) {
                items.forEach(function(item) {
                    return _this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
                        widgetInstance: instance
                    })
                })
            }
        };
        var tabPanel = this._createComponent($tabPanel, _tab_panel.default, tabPanelOptions);
        (0, _renderer.default)($container).parent().addClass(_constants.FIELD_ITEM_CONTENT_HAS_TABS_CLASS);
        tabPanel.on("optionChanged", function(e) {
            if ("dataSource" === e.fullName) {
                tryUpdateTabPanelInstance(e.value, e.component)
            }
        });
        tryUpdateTabPanelInstance([{
            guid: item.guid
        }].concat(_toConsumableArray(item.tabs)), tabPanel)
    },
    _itemGroupTemplate: function(item, e, $container) {
        var $group = (0, _renderer.default)("<div>").toggleClass(_constants.FORM_GROUP_WITH_CAPTION_CLASS, (0, _type.isDefined)(item.caption) && item.caption.length).addClass(_constants.FORM_GROUP_CLASS).appendTo($container);
        (0, _renderer.default)($container).parent().addClass(_constants.FIELD_ITEM_CONTENT_HAS_GROUP_CLASS);
        var colCount;
        var layoutManager;
        if (item.caption) {
            (0, _renderer.default)("<span>").addClass(_constants.FORM_GROUP_CAPTION_CLASS).text(item.caption).appendTo($group)
        }
        var $groupContent = (0, _renderer.default)("<div>").addClass(_constants.FORM_GROUP_CONTENT_CLASS).appendTo($group);
        if (item.groupContentTemplate) {
            var data = {
                formData: this.option("formData"),
                component: this
            };
            item.groupContentTemplate.render({
                model: data,
                container: (0, _element.getPublicElement)($groupContent)
            })
        } else {
            layoutManager = this._renderLayoutManager(this._tryGetItemsForTemplate(item), $groupContent, {
                colCount: item.colCount,
                colCountByScreen: item.colCountByScreen,
                alignItemLabels: item.alignItemLabels,
                cssItemClass: item.cssItemClass
            });
            this._itemsRunTimeInfo && this._itemsRunTimeInfo.extendRunTimeItemInfoByKey(item.guid, {
                layoutManager: layoutManager
            });
            colCount = layoutManager._getColCount();
            if ((0, _array.inArray)(colCount, this._groupsColCount) === -1) {
                this._groupsColCount.push(colCount)
            }
            $group.addClass(_constants.GROUP_COL_COUNT_CLASS + colCount);
            $group.attr(_constants.GROUP_COL_COUNT_ATTR, colCount)
        }
    },
    _renderLayoutManager: function(items, $rootElement, options) {
        var $element = (0, _renderer.default)("<div>");
        var that = this;
        var config = that._getLayoutManagerConfig(items, options);
        var baseColCountByScreen = {
            lg: options.colCount,
            md: options.colCount,
            sm: options.colCount,
            xs: 1
        };
        that._cachedColCountOptions.push({
            colCountByScreen: (0, _extend.extend)(baseColCountByScreen, options.colCountByScreen)
        });
        $element.appendTo($rootElement);
        var instance = that._createComponent($element, "dxLayoutManager", config);
        instance.on("autoColCountChanged", function() {
            that._refresh()
        });
        that._cachedLayoutManagers.push(instance);
        return instance
    },
    _getValidationGroup: function() {
        return this.option("validationGroup") || this
    },
    _getLayoutManagerConfig: function(items, options) {
        var _this2 = this;
        var baseConfig = {
            form: this,
            isRoot: options.isRoot,
            validationGroup: this._getValidationGroup(),
            showRequiredMark: this.option("showRequiredMark"),
            showOptionalMark: this.option("showOptionalMark"),
            requiredMark: this.option("requiredMark"),
            optionalMark: this.option("optionalMark"),
            requiredMessage: this.option("requiredMessage"),
            screenByWidth: this.option("screenByWidth"),
            layoutData: this.option("formData"),
            labelLocation: this.option("labelLocation"),
            customizeItem: this.option("customizeItem"),
            minColWidth: this.option("minColWidth"),
            showColonAfterLabel: this.option("showColonAfterLabel"),
            onEditorEnterKey: this.option("onEditorEnterKey"),
            onFieldDataChanged: function(args) {
                if (!_this2._isDataUpdating) {
                    _this2._triggerOnFieldDataChanged(args)
                }
            },
            validationBoundary: this.option("scrollingEnabled") ? this.$element() : void 0
        };
        return (0, _extend.extend)(baseConfig, {
            items: items,
            onContentReady: function(args) {
                _this2._itemsRunTimeInfo.addItemsOrExtendFrom(args.component._itemsRunTimeInfo);
                options.onContentReady && options.onContentReady(args)
            },
            onDisposing: function(_ref2) {
                var component = _ref2.component;
                var nestedItemsRunTimeInfo = component.getItemsRunTimeInfo();
                _this2._itemsRunTimeInfo.removeItemsByItems(nestedItemsRunTimeInfo)
            },
            colCount: options.colCount,
            alignItemLabels: options.alignItemLabels,
            cssItemClass: options.cssItemClass,
            colCountByScreen: options.colCountByScreen,
            onLayoutChanged: options.onLayoutChanged,
            width: options.width
        })
    },
    _createComponent: function($element, type, config) {
        var that = this;
        config = config || {};
        that._extendConfig(config, {
            readOnly: that.option("readOnly")
        });
        return that.callBase($element, type, config)
    },
    _attachSyncSubscriptions: function() {
        var that = this;
        that.on("optionChanged", function(args) {
            var optionFullName = args.fullName;
            if ("formData" === optionFullName) {
                if (!(0, _type.isDefined)(args.value)) {
                    that._options.silent("formData", args.value = {})
                }
                that._triggerOnFieldDataChangedByDataSet(args.value)
            }
            if (that._cachedLayoutManagers.length) {
                (0, _iterator.each)(that._cachedLayoutManagers, function(index, layoutManager) {
                    if ("formData" === optionFullName) {
                        that._isDataUpdating = true;
                        layoutManager.option("layoutData", args.value);
                        that._isDataUpdating = false
                    }
                    if ("readOnly" === args.name || "disabled" === args.name) {
                        layoutManager.option(optionFullName, args.value)
                    }
                })
            }
        })
    },
    _optionChanged: function(args) {
        var rootNameOfComplexOption = this._getRootLevelOfExpectedComplexOption(args.fullName, ["formData", "items"]);
        if (rootNameOfComplexOption) {
            this._customHandlerOfComplexOption(args, rootNameOfComplexOption);
            return
        }
        switch (args.name) {
            case "formData":
                if (!this.option("items")) {
                    this._invalidate()
                } else {
                    if ((0, _type.isEmptyObject)(args.value)) {
                        this._resetValues()
                    }
                }
                break;
            case "items":
            case "colCount":
            case "onFieldDataChanged":
            case "onEditorEnterKey":
            case "labelLocation":
            case "alignItemLabels":
            case "showColonAfterLabel":
            case "customizeItem":
            case "alignItemLabelsInAllGroups":
            case "showRequiredMark":
            case "showOptionalMark":
            case "requiredMark":
            case "optionalMark":
            case "requiredMessage":
            case "scrollingEnabled":
            case "formID":
            case "colCountByScreen":
            case "screenByWidth":
            case "stylingMode":
                this._invalidate();
                break;
            case "showValidationSummary":
                this._renderValidationSummary();
                break;
            case "minColWidth":
                if ("auto" === this.option("colCount")) {
                    this._invalidate()
                }
                break;
            case "alignRootItemLabels":
            case "readOnly":
                break;
            case "width":
                this.callBase(args);
                this._rootLayoutManager.option(args.name, args.value);
                this._alignLabels(this._rootLayoutManager, this._rootLayoutManager.isSingleColumnMode());
                break;
            case "visible":
                this.callBase(args);
                if (args.value) {
                    (0, _visibility_change.triggerShownEvent)(this.$element())
                }
                break;
            case "validationGroup":
                _validation_engine.default.removeGroup(args.previousValue || this);
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    _getRootLevelOfExpectedComplexOption: function(fullOptionName, expectedRootNames) {
        var splitFullName = fullOptionName.split(".");
        var result;
        if (splitFullName.length > 1) {
            var i;
            var rootOptionName = splitFullName[0];
            for (i = 0; i < expectedRootNames.length; i++) {
                if (rootOptionName.search(expectedRootNames[i]) !== -1) {
                    result = expectedRootNames[i]
                }
            }
        }
        return result
    },
    _tryCreateItemOptionAction: function(optionName, item, value, previousValue, itemPath) {
        if ("tabs" === optionName) {
            this._itemsRunTimeInfo.removeItemsByPathStartWith("".concat(itemPath, ".tabs"));
            value = this._prepareItems(value, true, itemPath, true)
        }
        return (0, _uiForm2.default)(optionName, {
            item: item,
            value: value,
            previousValue: previousValue,
            itemsRunTimeInfo: this._itemsRunTimeInfo
        })
    },
    _tryExecuteItemOptionAction: function(action) {
        return action && action.tryExecute()
    },
    _updateValidationGroupAndSummaryIfNeeded: function(fullName) {
        var optionName = (0, _uiForm4.getOptionNameFromFullName)(fullName);
        if (ITEM_OPTIONS_FOR_VALIDATION_UPDATING.indexOf(optionName) > -1) {
            _validation_engine.default.addGroup(this._getValidationGroup());
            if (this.option("showValidationSummary")) {
                this._validationSummary && this._validationSummary._initGroupRegistration()
            }
        }
    },
    _setLayoutManagerItemOption: function(layoutManager, optionName, value, path) {
        var _this3 = this;
        if (this._updateLockCount > 0) {
            !layoutManager._updateLockCount && layoutManager.beginUpdate();
            var key = this._itemsRunTimeInfo.getKeyByPath(path);
            this.postponedOperations.add(key, function() {
                !layoutManager._disposed && layoutManager.endUpdate();
                return (new _deferred.Deferred).resolve()
            })
        }
        var contentReadyHandler = function contentReadyHandler(e) {
            e.component.off("contentReady", contentReadyHandler);
            if ((0, _uiForm4.isFullPathContainsTabs)(path)) {
                var tabPath = (0, _uiForm4.tryGetTabPath)(path);
                var tabLayoutManager = _this3._itemsRunTimeInfo.getGroupOrTabLayoutManagerByPath(tabPath);
                _this3._alignLabelsInColumn({
                    items: tabLayoutManager.option("items"),
                    layoutManager: tabLayoutManager,
                    $container: tabLayoutManager.$element(),
                    inOneColumn: tabLayoutManager.isSingleColumnMode()
                })
            } else {
                _this3._alignLabels(_this3._rootLayoutManager, _this3._rootLayoutManager.isSingleColumnMode())
            }
        };
        layoutManager.on("contentReady", contentReadyHandler);
        layoutManager.option(optionName, value);
        this._updateValidationGroupAndSummaryIfNeeded(optionName)
    },
    _tryChangeLayoutManagerItemOption: function(fullName, value) {
        var nameParts = fullName.split(".");
        var optionName = (0, _uiForm4.getOptionNameFromFullName)(fullName);
        if ("items" === optionName && nameParts.length > 1) {
            var itemPath = this._getItemPath(nameParts);
            var layoutManager = this._itemsRunTimeInfo.getGroupOrTabLayoutManagerByPath(itemPath);
            if (layoutManager) {
                this._itemsRunTimeInfo.removeItemsByItems(layoutManager.getItemsRunTimeInfo());
                var items = this._prepareItems(value, false, itemPath);
                this._setLayoutManagerItemOption(layoutManager, optionName, items, itemPath);
                return true
            }
        } else {
            if (nameParts.length > 2) {
                var endPartIndex = nameParts.length - 2;
                var _itemPath = this._getItemPath(nameParts.slice(0, endPartIndex));
                var _layoutManager = this._itemsRunTimeInfo.getGroupOrTabLayoutManagerByPath(_itemPath);
                if (_layoutManager) {
                    var fullOptionName = (0, _uiForm4.getFullOptionName)(nameParts[endPartIndex], optionName);
                    if ("editorType" === optionName) {
                        if (_layoutManager.option(fullOptionName) !== value) {
                            return false
                        }
                    }
                    if ("visible" === optionName) {
                        var formItems = this.option((0, _uiForm4.getFullOptionName)(_itemPath, "items"));
                        if (formItems && formItems.length) {
                            var layoutManagerItems = _layoutManager.option("items");
                            formItems.forEach(function(item, index) {
                                var layoutItem = layoutManagerItems[index];
                                layoutItem.visibleIndex = item.visibleIndex
                            })
                        }
                    }
                    this._setLayoutManagerItemOption(_layoutManager, fullOptionName, value, _itemPath);
                    return true
                }
            }
        }
        return false
    },
    _tryChangeLayoutManagerItemOptions: function(itemPath, options) {
        var _this4 = this;
        var result;
        this.beginUpdate();
        (0, _iterator.each)(options, function(optionName, optionValue) {
            result = _this4._tryChangeLayoutManagerItemOption((0, _uiForm4.getFullOptionName)(itemPath, optionName), optionValue);
            if (!result) {
                return false
            }
        });
        this.endUpdate();
        return result
    },
    _customHandlerOfComplexOption: function(args, rootOptionName) {
        var nameParts = args.fullName.split(".");
        var value = args.value;
        if ("items" === rootOptionName) {
            var itemPath = this._getItemPath(nameParts);
            var item = this.option(itemPath);
            var optionNameWithoutPath = args.fullName.replace(itemPath + ".", "");
            var simpleOptionName = optionNameWithoutPath.split(".")[0].replace(/\[\d+]/, "");
            var itemAction = this._tryCreateItemOptionAction(simpleOptionName, item, item[simpleOptionName], args.previousValue, itemPath);
            if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(args.fullName, value)) {
                if (item) {
                    this._changeItemOption(item, optionNameWithoutPath, value);
                    var items = this._generateItemsFromData(this.option("items"));
                    this.option("items", items)
                }
            }
        }
        if ("formData" === rootOptionName) {
            var dataField = nameParts.slice(1).join(".");
            var editor = this.getEditor(dataField);
            if (editor) {
                editor.option("value", value)
            } else {
                this._triggerOnFieldDataChanged({
                    dataField: dataField,
                    value: value
                })
            }
        }
    },
    _getItemPath: function(nameParts) {
        var itemPath = nameParts[0];
        var i;
        for (i = 1; i < nameParts.length; i++) {
            if (nameParts[i].search(/items\[\d+]|tabs\[\d+]/) !== -1) {
                itemPath += "." + nameParts[i]
            } else {
                break
            }
        }
        return itemPath
    },
    _triggerOnFieldDataChanged: function(args) {
        this._createActionByOption("onFieldDataChanged")(args)
    },
    _triggerOnFieldDataChangedByDataSet: function(data) {
        var that = this;
        if (data && (0, _type.isObject)(data)) {
            (0, _iterator.each)(data, function(dataField, value) {
                that._triggerOnFieldDataChanged({
                    dataField: dataField,
                    value: value
                })
            })
        }
    },
    _updateFieldValue: function(dataField, value) {
        if ((0, _type.isDefined)(this.option("formData"))) {
            var editor = this.getEditor(dataField);
            this.option("formData." + dataField, value);
            if (editor) {
                var editorValue = editor.option("value");
                if (editorValue !== value) {
                    editor.option("value", value)
                }
            }
        }
    },
    _generateItemsFromData: function(items) {
        var formData = this.option("formData");
        var result = [];
        if (!items && (0, _type.isDefined)(formData)) {
            (0, _iterator.each)(formData, function(dataField) {
                result.push({
                    dataField: dataField
                })
            })
        }
        if (items) {
            (0, _iterator.each)(items, function(index, item) {
                if ((0, _type.isObject)(item)) {
                    result.push(item)
                } else {
                    result.push({
                        dataField: item
                    })
                }
            })
        }
        return result
    },
    _getItemByField: function(field, items) {
        var that = this;
        var fieldParts = (0, _type.isObject)(field) ? field : that._getFieldParts(field);
        var fieldName = fieldParts.fieldName;
        var fieldPath = fieldParts.fieldPath;
        var resultItem;
        if (items.length) {
            (0, _iterator.each)(items, function(index, item) {
                var itemType = item.itemType;
                if (fieldPath.length) {
                    var path = fieldPath.slice();
                    item = that._getItemByFieldPath(path, fieldName, item)
                } else {
                    if ("group" === itemType && !(item.caption || item.name) || "tabbed" === itemType && !item.name) {
                        var subItemsField = that._getSubItemField(itemType);
                        item.items = that._generateItemsFromData(item.items);
                        item = that._getItemByField({
                            fieldName: fieldName,
                            fieldPath: fieldPath
                        }, item[subItemsField])
                    }
                }
                if ((0, _uiForm4.isExpectedItem)(item, fieldName)) {
                    resultItem = item;
                    return false
                }
            })
        }
        return resultItem
    },
    _getFieldParts: function(field) {
        var fieldSeparator = ".";
        var fieldName = field;
        var separatorIndex = fieldName.indexOf(fieldSeparator);
        var resultPath = [];
        while (separatorIndex !== -1) {
            resultPath.push(fieldName.substr(0, separatorIndex));
            fieldName = fieldName.substr(separatorIndex + 1);
            separatorIndex = fieldName.indexOf(fieldSeparator)
        }
        return {
            fieldName: fieldName,
            fieldPath: resultPath.reverse()
        }
    },
    _getItemByFieldPath: function(path, fieldName, item) {
        var that = this;
        var itemType = item.itemType;
        var subItemsField = that._getSubItemField(itemType);
        var isItemWithSubItems = "group" === itemType || "tabbed" === itemType || item.title;
        var result;
        do {
            if (isItemWithSubItems) {
                var name = item.name || item.caption || item.title;
                var isGroupWithName = (0, _type.isDefined)(name);
                var nameWithoutSpaces = (0, _uiForm4.getTextWithoutSpaces)(name);
                var pathNode = void 0;
                item[subItemsField] = that._generateItemsFromData(item[subItemsField]);
                if (isGroupWithName) {
                    pathNode = path.pop()
                }
                if (!path.length) {
                    result = that._getItemByField(fieldName, item[subItemsField]);
                    if (result) {
                        break
                    }
                }
                if (!isGroupWithName || isGroupWithName && nameWithoutSpaces === pathNode) {
                    if (path.length) {
                        result = that._searchItemInEverySubItem(path, fieldName, item[subItemsField])
                    }
                }
            } else {
                break
            }
        } while (path.length && !(0, _type.isDefined)(result));
        return result
    },
    _getSubItemField: function(itemType) {
        return "tabbed" === itemType ? "tabs" : "items"
    },
    _searchItemInEverySubItem: function(path, fieldName, items) {
        var that = this;
        var result;
        (0, _iterator.each)(items, function(index, groupItem) {
            result = that._getItemByFieldPath(path.slice(), fieldName, groupItem);
            if (result) {
                return false
            }
        });
        if (!result) {
            result = false
        }
        return result
    },
    _changeItemOption: function(item, option, value) {
        if ((0, _type.isObject)(item)) {
            item[option] = value
        }
    },
    _dimensionChanged: function() {
        var currentScreenFactor = this._getCurrentScreenFactor();
        if (this._lastMarkupScreenFactor !== currentScreenFactor) {
            if (this._isColCountChanged(this._lastMarkupScreenFactor, currentScreenFactor)) {
                this._targetScreenFactor = currentScreenFactor;
                this._refresh();
                this._targetScreenFactor = void 0
            }
            this._lastMarkupScreenFactor = currentScreenFactor
        }
    },
    _isColCountChanged: function(oldScreenSize, newScreenSize) {
        var isChanged = false;
        (0, _iterator.each)(this._cachedColCountOptions, function(index, item) {
            if (item.colCountByScreen[oldScreenSize] !== item.colCountByScreen[newScreenSize]) {
                isChanged = true;
                return false
            }
        });
        return isChanged
    },
    _refresh: function() {
        var editorSelector = "." + FOCUSED_STATE_CLASS + " input, ." + FOCUSED_STATE_CLASS + " textarea";
        _events_engine.default.trigger(this.$element().find(editorSelector), "change");
        this.callBase()
    },
    _resetValues: function() {
        this._itemsRunTimeInfo.each(function(_, itemRunTimeInfo) {
            if ((0, _type.isDefined)(itemRunTimeInfo.widgetInstance) && itemRunTimeInfo.widgetInstance instanceof _editor.default) {
                itemRunTimeInfo.widgetInstance.reset();
                itemRunTimeInfo.widgetInstance.option("isValid", true)
            }
        });
        _validation_engine.default.resetGroup(this._getValidationGroup())
    },
    _updateData: function(data, value, isComplexData) {
        var that = this;
        var _data = isComplexData ? value : data;
        if ((0, _type.isObject)(_data)) {
            (0, _iterator.each)(_data, function(dataField, fieldValue) {
                that._updateData(isComplexData ? data + "." + dataField : dataField, fieldValue, (0, _type.isObject)(fieldValue))
            })
        } else {
            if ((0, _type.isString)(data)) {
                that._updateFieldValue(data, value)
            }
        }
    },
    registerKeyHandler: function(key, handler) {
        this.callBase(key, handler);
        this._itemsRunTimeInfo.each(function(_, itemRunTimeInfo) {
            if ((0, _type.isDefined)(itemRunTimeInfo.widgetInstance)) {
                itemRunTimeInfo.widgetInstance.registerKeyHandler(key, handler)
            }
        })
    },
    _focusTarget: function() {
        return this.$element().find("." + _constants.FIELD_ITEM_CONTENT_CLASS + " [tabindex]").first()
    },
    _visibilityChanged: function(visible) {
        if (visible && _browser.default.msie) {
            this._refresh()
        }
    },
    _dispose: function() {
        _validation_engine.default.removeGroup(this._getValidationGroup());
        this.callBase()
    },
    resetValues: function() {
        this._resetValues()
    },
    updateData: function(data, value) {
        this._updateData(data, value)
    },
    getEditor: function(dataField) {
        return this._itemsRunTimeInfo.findWidgetInstanceByDataField(dataField) || this._itemsRunTimeInfo.findWidgetInstanceByName(dataField)
    },
    getButton: function(name) {
        return this._itemsRunTimeInfo.findWidgetInstanceByName(name)
    },
    updateDimensions: function() {
        var that = this;
        var deferred = new _deferred.Deferred;
        if (that._scrollable) {
            that._scrollable.update().done(function() {
                deferred.resolveWith(that)
            });
        } else {
            deferred.resolveWith(that)
        }
        return deferred.promise()
    },
    itemOption: function(id, option, value) {
        var _this5 = this;
        var items = this._generateItemsFromData(this.option("items"));
        var item = this._getItemByField(id, items);
        var path = (0, _uiForm4.getItemPath)(items, item);
        if (!item) {
            return
        }
        switch (arguments.length) {
            case 1:
                return item;
            case 3:
                var itemAction = this._tryCreateItemOptionAction(option, item, value, item[option], path);
                this._changeItemOption(item, option, value);
                var fullName = (0, _uiForm4.getFullOptionName)(path, option);
                if (!this._tryExecuteItemOptionAction(itemAction) && !this._tryChangeLayoutManagerItemOption(fullName, value)) {
                    this.option("items", items)
                }
                break;
            default:
                if ((0, _type.isObject)(option)) {
                    if (!this._tryChangeLayoutManagerItemOptions(path, option)) {
                        var allowUpdateItems;
                        (0, _iterator.each)(option, function(optionName, optionValue) {
                            var itemAction = _this5._tryCreateItemOptionAction(optionName, item, optionValue, item[optionName], path);
                            _this5._changeItemOption(item, optionName, optionValue);
                            if (!allowUpdateItems && !_this5._tryExecuteItemOptionAction(itemAction)) {
                                allowUpdateItems = true
                            }
                        });
                        allowUpdateItems && this.option("items", items)
                    }
                }
        }
    },
    validate: function() {
        return _validation_engine.default.validateGroup(this._getValidationGroup())
    },
    getItemID: function(name) {
        return "dx_" + this.option("formID") + "_" + (name || new _guid.default)
    },
    getTargetScreenFactor: function() {
        return this._targetScreenFactor
    }
});
(0, _component_registrator.default)("dxForm", Form);
var _default = Form;
exports.default = _default;
module.exports = exports.default;
