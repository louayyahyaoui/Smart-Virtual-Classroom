/**
 * DevExtreme (ui/tree_view/ui.tree_view.base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _click = require("../../events/click");
var _common = require("../../core/utils/common");
var _window = require("../../core/utils/window");
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _element = require("../../core/element");
var _check_box = _interopRequireDefault(require("../check_box"));
var _ui = _interopRequireDefault(require("../hierarchical_collection/ui.hierarchical_collection_widget"));
var _index = require("../../events/utils/index");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _double_click = require("../../events/double_click");
var _fx = _interopRequireDefault(require("../../animation/fx"));
var _ui2 = _interopRequireDefault(require("../scroll_view/ui.scrollable"));
var _load_indicator = _interopRequireDefault(require("../load_indicator"));
var _deferred = require("../../core/utils/deferred");
var _ui3 = _interopRequireDefault(require("../widget/ui.errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var WIDGET_CLASS = "dx-treeview";
var NODE_CLASS = "".concat(WIDGET_CLASS, "-node");
var NODE_CONTAINER_CLASS = "".concat(NODE_CLASS, "-container");
var NODE_LOAD_INDICATOR_CLASS = "".concat(NODE_CLASS, "-loadindicator");
var OPENED_NODE_CONTAINER_CLASS = "".concat(NODE_CLASS, "-container-opened");
var IS_LEAF = "".concat(NODE_CLASS, "-is-leaf");
var ITEM_CLASS = "".concat(WIDGET_CLASS, "-item");
var ITEM_WITH_CHECKBOX_CLASS = "".concat(ITEM_CLASS, "-with-checkbox");
var ITEM_WITHOUT_CHECKBOX_CLASS = "".concat(ITEM_CLASS, "-without-checkbox");
var ITEM_DATA_KEY = "".concat(ITEM_CLASS, "-data");
var TOGGLE_ITEM_VISIBILITY_CLASS = "".concat(WIDGET_CLASS, "-toggle-item-visibility");
var LOAD_INDICATOR_CLASS = "".concat(WIDGET_CLASS, "-loadindicator");
var LOAD_INDICATOR_WRAPPER_CLASS = "".concat(WIDGET_CLASS, "-loadindicator-wrapper");
var TOGGLE_ITEM_VISIBILITY_OPENED_CLASS = "".concat(WIDGET_CLASS, "-toggle-item-visibility-opened");
var SELECT_ALL_ITEM_CLASS = "".concat(WIDGET_CLASS, "-select-all-item");
var INVISIBLE_STATE_CLASS = "dx-state-invisible";
var DISABLED_STATE_CLASS = "dx-state-disabled";
var SELECTED_ITEM_CLASS = "dx-state-selected";
var EXPAND_EVENT_NAMESPACE = "dxTreeView_expand";
var DATA_ITEM_ID = "data-item-id";
var TreeViewBase = _ui.default.inherit({
    _supportedKeys: function(e) {
        var _this = this;
        var click = function(e) {
            var $itemElement = (0, _renderer.default)(_this.option("focusedElement"));
            if (!$itemElement.length) {
                return
            }
            e.target = $itemElement;
            e.currentTarget = $itemElement;
            _this._itemClickHandler(e, $itemElement.children("." + ITEM_CLASS));
            var expandEventName = _this._getEventNameByOption(_this.option("expandEvent"));
            var expandByClick = expandEventName === (0, _index.addNamespace)(_click.name, EXPAND_EVENT_NAMESPACE);
            if (expandByClick) {
                _this._expandEventHandler(e)
            }
        };
        var select = function(e) {
            e.preventDefault();
            _this._changeCheckBoxState((0, _renderer.default)(_this.option("focusedElement")))
        };
        var toggleExpandedNestedItems = function(state, e) {
            if (!this.option("expandAllEnabled")) {
                return
            }
            e.preventDefault();
            var $rootElement = (0, _renderer.default)(this.option("focusedElement"));
            if (!$rootElement.length) {
                return
            }
            var rootItem = this._getItemData($rootElement.find(".".concat(ITEM_CLASS)));
            this._toggleExpandedNestedItems([rootItem], state)
        };
        return (0, _extend.extend)(this.callBase(), {
            enter: this._showCheckboxes() ? select : click,
            space: this._showCheckboxes() ? select : click,
            asterisk: toggleExpandedNestedItems.bind(this, true),
            minus: toggleExpandedNestedItems.bind(this, false)
        })
    },
    _changeCheckBoxState: function($element) {
        var checkboxInstance = this._getCheckBoxInstance($element);
        var currentState = checkboxInstance.option("value");
        if (!checkboxInstance.option("disabled")) {
            this._updateItemSelection(!currentState, $element.find("." + ITEM_CLASS).get(0), true, $element)
        }
    },
    _toggleExpandedNestedItems: function(items, state) {
        if (!items) {
            return
        }
        for (var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            var node = this._dataAdapter.getNodeByItem(item);
            this._toggleExpandedState(node, state);
            this._toggleExpandedNestedItems(item.items, state)
        }
    },
    _getNodeElement: function(node, cache) {
        var key = this._encodeString(node.internalFields.key);
        if (cache) {
            if (!cache.$nodeByKey) {
                cache.$nodeByKey = {};
                this.$element().find(".".concat(NODE_CLASS)).each(function() {
                    var $node = (0, _renderer.default)(this);
                    var key = $node.attr(DATA_ITEM_ID);
                    cache.$nodeByKey[key] = $node
                })
            }
            return cache.$nodeByKey[key] || (0, _renderer.default)()
        }
        var element = this.$element().get(0).querySelector("[".concat(DATA_ITEM_ID, '="').concat(key, '"]'));
        return (0, _renderer.default)(element)
    },
    _activeStateUnit: "." + ITEM_CLASS,
    _widgetClass: function() {
        return WIDGET_CLASS
    },
    _getDefaultOptions: function() {
        var defaultOptions = (0, _extend.extend)(this.callBase(), {
            animationEnabled: true,
            dataStructure: "tree",
            deferRendering: true,
            expandAllEnabled: false,
            hasItemsExpr: "hasItems",
            selectNodesRecursive: true,
            expandNodesRecursive: true,
            showCheckBoxesMode: "none",
            selectAllText: _message.default.format("dxList-selectAll"),
            onItemSelectionChanged: null,
            onItemExpanded: null,
            onItemCollapsed: null,
            scrollDirection: "vertical",
            virtualModeEnabled: false,
            rootValue: 0,
            focusStateEnabled: false,
            selectionMode: "multiple",
            expandEvent: "dblclick",
            selectByClick: false,
            createChildren: null,
            onSelectAllValueChanged: null
        });
        return (0, _extend.extend)(true, defaultOptions, {
            integrationOptions: {
                useDeferUpdateForTemplates: false
            }
        })
    },
    _initSelectedItems: _common.noop,
    _syncSelectionOptions: _common.asyncNoop,
    _fireSelectionChanged: function() {
        var selectionChangePromise = this._selectionChangePromise;
        (0, _deferred.when)(selectionChangePromise).done(function() {
            this._createActionByOption("onSelectionChanged", {
                excludeValidators: ["disabled", "readOnly"]
            })()
        }.bind(this))
    },
    _createSelectAllValueChangedAction: function() {
        this._selectAllValueChangedAction = this._createActionByOption("onSelectAllValueChanged", {
            excludeValidators: ["disabled", "readOnly"]
        })
    },
    _fireSelectAllValueChanged: function(value) {
        this._selectAllValueChangedAction({
            value: value
        })
    },
    _checkBoxModeChange: function(value, previousValue) {
        if ("none" === previousValue || "none" === value) {
            this.repaint();
            return
        }
        var selectAllExists = this._$selectAllItem && this._$selectAllItem.length;
        switch (value) {
            case "selectAll":
                !selectAllExists && this._renderSelectAllItem();
                break;
            case "normal":
                if (selectAllExists) {
                    this._$selectAllItem.remove();
                    delete this._$selectAllItem
                }
        }
    },
    _removeSelection: function() {
        var that = this;
        (0, _iterator.each)(this._dataAdapter.getFullData(), function(_, node) {
            if (!that._hasChildren(node)) {
                return
            }
            that._dataAdapter.toggleSelection(node.internalFields.key, false, true)
        })
    },
    _optionChanged: function(args) {
        var name = args.name,
            value = args.value,
            previousValue = args.previousValue;
        switch (name) {
            case "selectAllText":
                if (this._$selectAllItem) {
                    this._$selectAllItem.dxCheckBox("instance").option("text", value)
                }
                break;
            case "showCheckBoxesMode":
                this._checkBoxModeChange(value, previousValue);
                break;
            case "scrollDirection":
                this._scrollableContainer.option("direction", value);
                break;
            case "items":
                delete this._$selectAllItem;
                this.callBase(args);
                break;
            case "dataSource":
                this.callBase(args);
                this._initDataAdapter();
                this._filter = {};
                break;
            case "hasItemsExpr":
                this._initAccessors();
                this.repaint();
                break;
            case "expandEvent":
                this._initExpandEvent();
                break;
            case "deferRendering":
            case "dataStructure":
            case "rootValue":
            case "createChildren":
            case "expandNodesRecursive":
            case "onItemSelectionChanged":
            case "onItemExpanded":
            case "onItemCollapsed":
            case "expandAllEnabled":
            case "animationEnabled":
            case "virtualModeEnabled":
            case "selectByClick":
                break;
            case "selectionMode":
                this._initDataAdapter();
                this.callBase(args);
                break;
            case "onSelectAllValueChanged":
                this._createSelectAllValueChangedAction();
                break;
            case "selectNodesRecursive":
                this._dataAdapter.setOption("recursiveSelection", args.value);
                this.repaint();
                break;
            default:
                this.callBase(args)
        }
    },
    _initDataSource: function() {
        if (this._useCustomChildrenLoader()) {
            this._loadChildrenByCustomLoader(null).done(function(newItems) {
                if (newItems && newItems.length) {
                    this.option("items", newItems)
                }
            }.bind(this))
        } else {
            this.callBase();
            this._isVirtualMode() && this._initVirtualMode()
        }
    },
    _initVirtualMode: function() {
        var filter = this._filter;
        if (!filter.custom) {
            filter.custom = this._dataSource.filter()
        }
        if (!filter.internal) {
            filter.internal = [this.option("parentIdExpr"), this.option("rootValue")]
        }
    },
    _useCustomChildrenLoader: function() {
        return (0, _type.isFunction)(this.option("createChildren")) && this._isDataStructurePlain()
    },
    _loadChildrenByCustomLoader: function(parentNode) {
        var invocationResult = this.option("createChildren").call(this, parentNode);
        if (Array.isArray(invocationResult)) {
            return (new _deferred.Deferred).resolve(invocationResult).promise()
        }
        if (invocationResult && (0, _type.isFunction)(invocationResult.then)) {
            return (0, _deferred.fromPromise)(invocationResult)
        }
        return (new _deferred.Deferred).resolve([]).promise()
    },
    _combineFilter: function() {
        if (!this._filter.custom || !this._filter.custom.length) {
            return this._filter.internal
        }
        return [this._filter.custom, this._filter.internal]
    },
    _dataSourceLoadErrorHandler: function() {
        this._renderEmptyMessage()
    },
    _init: function() {
        this._filter = {};
        this.callBase();
        this._initStoreChangeHandlers()
    },
    _dataSourceChangedHandler: function(newItems) {
        var items = this.option("items");
        if (this._initialized && this._isVirtualMode() && items.length) {
            return
        }
        this.option("items", newItems)
    },
    _removeTreeViewLoadIndicator: function() {
        if (!this._treeViewLoadIndicator) {
            return
        }
        this._treeViewLoadIndicator.remove();
        this._treeViewLoadIndicator = null
    },
    _createTreeViewLoadIndicator: function() {
        this._treeViewLoadIndicator = (0, _renderer.default)("<div>").addClass(LOAD_INDICATOR_CLASS);
        this._createComponent(this._treeViewLoadIndicator, _load_indicator.default, {});
        return this._treeViewLoadIndicator
    },
    _dataSourceLoadingChangedHandler: function(isLoading) {
        var resultFilter;
        if (this._isVirtualMode()) {
            resultFilter = this._combineFilter();
            this._dataSource.filter(resultFilter)
        }
        if (isLoading && !this._dataSource.isLoaded()) {
            this.option("items", []);
            var $wrapper = (0, _renderer.default)("<div>").addClass(LOAD_INDICATOR_WRAPPER_CLASS);
            this._createTreeViewLoadIndicator().appendTo($wrapper);
            this.itemsContainer().append($wrapper);
            if (this._isVirtualMode() && this._dataSource.filter() !== resultFilter) {
                this._dataSource.filter([])
            }
        } else {
            this._removeTreeViewLoadIndicator()
        }
    },
    _initStoreChangeHandlers: function() {
        var _this2 = this;
        if ("plain" !== this.option("dataStructure")) {
            return
        }
        this._dataSource && this._dataSource.store().on("inserted", function(newItem) {
            _this2.option().items = _this2.option("items").concat(newItem);
            _this2._dataAdapter.addItem(newItem);
            if (!_this2._dataAdapter.isFiltered(newItem)) {
                return
            }
            _this2._updateLevel(_this2._parentIdGetter(newItem))
        }).on("removed", function(removedKey) {
            var node = _this2._dataAdapter.getNodeByKey(removedKey);
            if ((0, _type.isDefined)(node)) {
                _this2.option("items")[_this2._dataAdapter.getIndexByKey(node.internalFields.key)] = 0;
                _this2._markChildrenItemsToRemove(node);
                _this2._removeItems();
                _this2._dataAdapter.removeItem(removedKey);
                _this2._updateLevel(_this2._parentIdGetter(node))
            }
        })
    },
    _markChildrenItemsToRemove: function(node) {
        var _this3 = this;
        var keys = node.internalFields.childrenKeys;
        (0, _iterator.each)(keys, function(_, key) {
            _this3.option("items")[_this3._dataAdapter.getIndexByKey(key)] = 0;
            _this3._markChildrenItemsToRemove(_this3._dataAdapter.getNodeByKey(key))
        })
    },
    _removeItems: function() {
        var _this4 = this;
        var items = (0, _extend.extend)(true, [], this.option("items"));
        var counter = 0;
        (0, _iterator.each)(items, function(index, item) {
            if (!item) {
                _this4.option("items").splice(index - counter, 1);
                counter++
            }
        })
    },
    _updateLevel: function(parentId) {
        var $container = this._getContainerByParentKey(parentId);
        this._renderItems($container, this._dataAdapter.getChildrenNodes(parentId))
    },
    _getOldContainer: function($itemElement) {
        if ($itemElement.length) {
            return $itemElement.children(".".concat(NODE_CONTAINER_CLASS))
        }
        if (this._scrollableContainer) {
            return this._scrollableContainer.$content().children()
        }
        return (0, _renderer.default)()
    },
    _getContainerByParentKey: function(parentId) {
        var node = this._dataAdapter.getNodeByKey(parentId);
        var $itemElement = node ? this._getNodeElement(node) : [];
        this._getOldContainer($itemElement).remove();
        var $container = this._renderNodeContainer($itemElement);
        if (this._isRootLevel(parentId)) {
            if (!this._scrollableContainer) {
                this._renderScrollableContainer()
            }
            this._scrollableContainer.$content().append($container)
        }
        return $container
    },
    _isRootLevel: function(parentId) {
        return parentId === this.option("rootValue")
    },
    _getAccessors: function() {
        var accessors = this.callBase();
        accessors.push("hasItems");
        return accessors
    },
    _getDataAdapterOptions: function() {
        return {
            rootValue: this.option("rootValue"),
            multipleSelection: !this._isSingleSelection(),
            recursiveSelection: this._isRecursiveSelection(),
            recursiveExpansion: this.option("expandNodesRecursive"),
            selectionRequired: this.option("selectionRequired"),
            dataType: this.option("dataStructure"),
            sort: this._dataSource && this._dataSource.sort()
        }
    },
    _initMarkup: function() {
        this._renderScrollableContainer();
        this._renderEmptyMessage(this._dataAdapter.getRootNodes());
        this.callBase();
        this.setAria("role", "tree")
    },
    _renderContentImpl: function() {
        var $nodeContainer = this._renderNodeContainer();
        this._scrollableContainer.$content().append($nodeContainer);
        if (!this.option("items") || !this.option("items").length) {
            return
        }
        this._renderItems($nodeContainer, this._dataAdapter.getRootNodes());
        this._initExpandEvent();
        if (this._selectAllEnabled()) {
            this._createSelectAllValueChangedAction();
            this._renderSelectAllItem($nodeContainer)
        }
    },
    _isVirtualMode: function() {
        return this.option("virtualModeEnabled") && this._isDataStructurePlain() && !!this.option("dataSource")
    },
    _isDataStructurePlain: function() {
        return "plain" === this.option("dataStructure")
    },
    _fireContentReadyAction: function() {
        var dataSource = this.getDataSource();
        var skipContentReadyAction = dataSource && !dataSource.isLoaded();
        if (this._scrollableContainer && (0, _window.hasWindow)()) {
            this._scrollableContainer.update()
        }
        if (!skipContentReadyAction) {
            this.callBase()
        }
        if (this._scrollableContainer && (0, _window.hasWindow)()) {
            this._scrollableContainer.update()
        }
    },
    _renderScrollableContainer: function() {
        this._scrollableContainer = this._createComponent((0, _renderer.default)("<div>").appendTo(this.$element()), _ui2.default, {
            direction: this.option("scrollDirection"),
            useKeyboard: false
        })
    },
    _renderNodeContainer: function($parent) {
        var $container = (0, _renderer.default)("<ul>").addClass(NODE_CONTAINER_CLASS);
        this.setAria("role", "group", $container);
        if ($parent && $parent.length) {
            var itemData = this._getItemData($parent.children("." + ITEM_CLASS));
            if (this._expandedGetter(itemData)) {
                $container.addClass(OPENED_NODE_CONTAINER_CLASS)
            }
            $container.appendTo($parent)
        }
        return $container
    },
    _createDOMElement: function($nodeContainer, node) {
        var $node = (0, _renderer.default)("<li>").addClass(NODE_CLASS).attr(DATA_ITEM_ID, this._encodeString(node.internalFields.key)).prependTo($nodeContainer);
        this.setAria({
            role: "treeitem",
            label: this._displayGetter(node.internalFields.item) || "",
            expanded: node.internalFields.expanded || false,
            level: this._getLevel($nodeContainer)
        }, $node);
        return $node
    },
    _getLevel: function($nodeContainer) {
        var parent = $nodeContainer.parent();
        return parent.hasClass("dx-scrollable-content") ? 1 : parseInt(parent.attr("aria-level")) + 1
    },
    _showCheckboxes: function() {
        return "none" !== this.option("showCheckBoxesMode")
    },
    _selectAllEnabled: function() {
        return "selectAll" === this.option("showCheckBoxesMode") && !this._isSingleSelection()
    },
    _renderItems: function($nodeContainer, nodes) {
        var length = nodes.length - 1;
        for (var i = length; i >= 0; i--) {
            this._renderItem(i, nodes[i], $nodeContainer)
        }
        this._renderedItemsCount += nodes.length
    },
    _renderItem: function(nodeIndex, node, $nodeContainer) {
        var $node = this._createDOMElement($nodeContainer, node);
        var nodeData = node.internalFields;
        var showCheckBox = this._showCheckboxes();
        $node.addClass(showCheckBox ? ITEM_WITH_CHECKBOX_CLASS : ITEM_WITHOUT_CHECKBOX_CLASS);
        $node.toggleClass(INVISIBLE_STATE_CLASS, false === nodeData.item.visible);
        showCheckBox && this._renderCheckBox($node, node);
        this.setAria("selected", nodeData.selected, $node);
        this._toggleSelectedClass($node, nodeData.selected);
        this.callBase(this._renderedItemsCount + nodeIndex, nodeData.item, $node);
        if (false !== nodeData.item.visible) {
            this._renderChildren($node, node)
        }
    },
    _setAriaSelected: function() {},
    _renderChildren: function($node, node) {
        var _this5 = this;
        if (!this._hasChildren(node)) {
            this._addLeafClass($node);
            return
        }
        this._renderToggleItemVisibilityIcon($node, node);
        if (this.option("deferRendering") && !node.internalFields.expanded) {
            return
        }
        this._loadSublevel(node).done(function(childNodes) {
            _this5._renderSublevel($node, _this5._getActualNode(node), childNodes)
        })
    },
    _getActualNode: function(cachedNode) {
        return this._dataAdapter.getNodeByKey(cachedNode.internalFields.key)
    },
    _hasChildren: function(node) {
        if (this._isVirtualMode() || this._useCustomChildrenLoader()) {
            return false !== this._hasItemsGetter(node.internalFields.item)
        }
        return this.callBase(node)
    },
    _loadSublevel: function(node) {
        var _this6 = this;
        var deferred = new _deferred.Deferred;
        var childrenNodes = this._getChildNodes(node);
        if (childrenNodes.length) {
            deferred.resolve(childrenNodes)
        } else {
            this._loadNestedItems(node).done(function(items) {
                deferred.resolve(_this6._dataAdapter.getNodesByItems(items))
            })
        }
        return deferred.promise()
    },
    _renderSublevel: function($node, node, childNodes) {
        var $nestedNodeContainer = this._renderNodeContainer($node, node);
        var childNodesByChildrenKeys = childNodes.filter(function(childNode) {
            return node.internalFields.childrenKeys.indexOf(childNode.internalFields.key) !== -1
        });
        this._renderItems($nestedNodeContainer, childNodesByChildrenKeys);
        if (childNodesByChildrenKeys.length && !node.internalFields.selected) {
            var firstChild = childNodesByChildrenKeys[0];
            this._updateParentsState(firstChild, this._getNodeElement(firstChild))
        }
        this._normalizeIconState($node, childNodesByChildrenKeys.length);
        if (node.internalFields.expanded) {
            $nestedNodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS)
        }
    },
    _executeItemRenderAction: function(itemIndex, itemData, itemElement) {
        var node = this._getNode(itemElement);
        this._getItemRenderAction()({
            itemElement: itemElement,
            itemIndex: itemIndex,
            itemData: itemData,
            node: this._dataAdapter.getPublicNode(node)
        })
    },
    _addLeafClass: function($node) {
        $node.addClass(IS_LEAF)
    },
    _expandEventHandler: function(e) {
        var $nodeElement = (0, _renderer.default)(e.currentTarget.parentNode);
        if (!$nodeElement.hasClass(IS_LEAF)) {
            this._toggleExpandedState(e.currentTarget, void 0, e)
        }
    },
    _initExpandEvent: function() {
        var expandedEventName = this._getEventNameByOption(this.option("expandEvent"));
        var $itemsContainer = this._itemContainer();
        var itemSelector = this._itemSelector();
        _events_engine.default.off($itemsContainer, "." + EXPAND_EVENT_NAMESPACE, itemSelector);
        _events_engine.default.on($itemsContainer, expandedEventName, itemSelector, this._expandEventHandler.bind(this))
    },
    _getEventNameByOption: function(name) {
        var event = "click" === name ? _click.name : _double_click.name;
        return (0, _index.addNamespace)(event, EXPAND_EVENT_NAMESPACE)
    },
    _getNode: function(identifier) {
        if (!(0, _type.isDefined)(identifier)) {
            return null
        }
        if (identifier.internalFields) {
            return identifier
        }
        if ((0, _type.isPrimitive)(identifier)) {
            return this._dataAdapter.getNodeByKey(identifier)
        }
        var itemElement = (0, _renderer.default)(identifier).get(0);
        if (!itemElement) {
            return null
        }
        if (_dom_adapter.default.isElementNode(itemElement)) {
            return this._getNodeByElement(itemElement)
        }
        return this._dataAdapter.getNodeByItem(itemElement)
    },
    _getNodeByElement: function(itemElement) {
        var $node = (0, _renderer.default)(itemElement).closest("." + NODE_CLASS);
        var key = this._decodeString($node.attr(DATA_ITEM_ID));
        return this._dataAdapter.getNodeByKey(key)
    },
    _toggleExpandedState: function(itemElement, state, e) {
        var node = this._getNode(itemElement);
        if (!node) {
            return (new _deferred.Deferred).reject().promise()
        }
        if (node.internalFields.disabled) {
            return (new _deferred.Deferred).reject().promise()
        }
        var currentState = node.internalFields.expanded;
        if (currentState === state) {
            return (new _deferred.Deferred).resolve().promise()
        }
        if (this._hasChildren(node)) {
            var $node = this._getNodeElement(node);
            if ($node.find(".".concat(NODE_LOAD_INDICATOR_CLASS, ":not(.").concat(INVISIBLE_STATE_CLASS, ")")).length) {
                return (new _deferred.Deferred).reject().promise()
            }
            this._createLoadIndicator($node)
        }
        if (!(0, _type.isDefined)(state)) {
            state = !currentState
        }
        this._dataAdapter.toggleExpansion(node.internalFields.key, state);
        return this._updateExpandedItemsUI(node, state, e)
    },
    _createLoadIndicator: function($node) {
        var $icon = $node.children("." + TOGGLE_ITEM_VISIBILITY_CLASS);
        var $nodeContainer = $node.children(".".concat(NODE_CONTAINER_CLASS));
        if ($icon.hasClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS) || $nodeContainer.not(":empty").length) {
            return
        }
        this._createComponent((0, _renderer.default)("<div>").addClass(NODE_LOAD_INDICATOR_CLASS), _load_indicator.default, {}).$element().appendTo($node);
        $icon.hide()
    },
    _renderToggleItemVisibilityIcon: function($node, node) {
        var $icon = (0, _renderer.default)("<div>").addClass(TOGGLE_ITEM_VISIBILITY_CLASS).appendTo($node);
        if (node.internalFields.expanded) {
            $icon.addClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS);
            $node.parent().addClass(OPENED_NODE_CONTAINER_CLASS)
        }
        if (node.internalFields.disabled) {
            $icon.addClass(DISABLED_STATE_CLASS)
        }
        this._renderToggleItemVisibilityIconClick($icon, node)
    },
    _renderToggleItemVisibilityIconClick: function($icon, node) {
        var _this7 = this;
        var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
        _events_engine.default.off($icon, eventName);
        _events_engine.default.on($icon, eventName, function(e) {
            _this7._toggleExpandedState(node.internalFields.key, void 0, e)
        })
    },
    _updateExpandedItemsUI: function(node, state, e) {
        var $node = this._getNodeElement(node);
        var isHiddenNode = !$node.length || state && $node.is(":hidden");
        if (this.option("expandNodesRecursive") && isHiddenNode) {
            var parentNode = this._getNode(node.internalFields.parentKey);
            if (parentNode) {
                this._updateExpandedItemsUI(parentNode, state, e)
            }
        }
        var $icon = $node.children("." + TOGGLE_ITEM_VISIBILITY_CLASS);
        var $nodeContainer = $node.children(".".concat(NODE_CONTAINER_CLASS));
        $icon.toggleClass(TOGGLE_ITEM_VISIBILITY_OPENED_CLASS, state);
        var nodeContainerExists = $nodeContainer.length > 0;
        var completionCallback = new _deferred.Deferred;
        if (!state || nodeContainerExists && !$nodeContainer.is(":empty")) {
            this._animateNodeContainer(node, state, e, completionCallback);
            return completionCallback.promise()
        }
        if (0 === node.internalFields.childrenKeys.length && (this._isVirtualMode() || this._useCustomChildrenLoader())) {
            this._loadNestedItemsWithUpdate(node, state, e, completionCallback);
            return completionCallback.promise()
        }
        this._renderSublevel($node, node, this._getChildNodes(node));
        this._fireContentReadyAction();
        this._animateNodeContainer(node, state, e, completionCallback);
        return completionCallback.promise()
    },
    _loadNestedItemsWithUpdate: function(node, state, e, completionCallback) {
        var _this8 = this;
        var $node = this._getNodeElement(node);
        this._loadNestedItems(node).done(function(items) {
            var actualNodeData = _this8._getActualNode(node);
            _this8._renderSublevel($node, actualNodeData, _this8._dataAdapter.getNodesByItems(items));
            if (!items || !items.length) {
                return
            }
            _this8._fireContentReadyAction();
            _this8._animateNodeContainer(actualNodeData, state, e, completionCallback)
        })
    },
    _loadNestedItems: function(node) {
        var _this9 = this;
        if (this._useCustomChildrenLoader()) {
            var publicNode = this._dataAdapter.getPublicNode(node);
            return this._loadChildrenByCustomLoader(publicNode).done(function(newItems) {
                if (!_this9._areNodesExists(newItems)) {
                    _this9._appendItems(newItems)
                }
            })
        }
        if (!this._isVirtualMode()) {
            return (new _deferred.Deferred).resolve([]).promise()
        }
        this._filter.internal = [this.option("parentIdExpr"), node.internalFields.key];
        this._dataSource.filter(this._combineFilter());
        return this._dataSource.load().done(function(newItems) {
            if (!_this9._areNodesExists(newItems)) {
                _this9._appendItems(newItems)
            }
        })
    },
    _areNodesExists: function(newItems, items) {
        var keyOfRootItem = this.keyOf(newItems[0]);
        var fullData = this._dataAdapter.getFullData();
        return !!this._dataAdapter.getNodeByKey(keyOfRootItem, fullData)
    },
    _appendItems: function(newItems) {
        this.option().items = this.option("items").concat(newItems);
        this._initDataAdapter()
    },
    _animateNodeContainer: function(node, state, e, completionCallback) {
        var $node = this._getNodeElement(node);
        var $nodeContainer = $node.children(".".concat(NODE_CONTAINER_CLASS));
        if (node && completionCallback && 0 === $nodeContainer.length) {
            completionCallback.resolve()
        }
        $nodeContainer.addClass(OPENED_NODE_CONTAINER_CLASS);
        var nodeHeight = $nodeContainer.height();
        _fx.default.stop($nodeContainer, true);
        _fx.default.animate($nodeContainer, {
            type: "custom",
            duration: this.option("animationEnabled") ? 400 : 0,
            from: {
                maxHeight: state ? 0 : nodeHeight
            },
            to: {
                maxHeight: state ? nodeHeight : 0
            },
            complete: function() {
                $nodeContainer.css("maxHeight", "none");
                $nodeContainer.toggleClass(OPENED_NODE_CONTAINER_CLASS, state);
                this.setAria("expanded", state, $node);
                this._scrollableContainer.update();
                this._fireExpandedStateUpdatedEvent(state, node, e);
                if (completionCallback) {
                    completionCallback.resolve()
                }
            }.bind(this)
        })
    },
    _fireExpandedStateUpdatedEvent: function(isExpanded, node, e) {
        if (!this._hasChildren(node)) {
            return
        }
        var optionName = isExpanded ? "onItemExpanded" : "onItemCollapsed";
        if ((0, _type.isDefined)(e)) {
            this._itemDXEventHandler(e, optionName, {
                node: this._dataAdapter.getPublicNode(node)
            })
        } else {
            var target = this._getNodeElement(node);
            this._itemEventHandler(target, optionName, {
                event: e,
                node: this._dataAdapter.getPublicNode(node)
            })
        }
    },
    _normalizeIconState: function($node, hasNewItems) {
        var $loadIndicator = $node.find(".".concat(NODE_LOAD_INDICATOR_CLASS));
        $loadIndicator.length && _load_indicator.default.getInstance($loadIndicator).option("visible", false);
        if (hasNewItems) {
            var $icon = $node.find("." + TOGGLE_ITEM_VISIBILITY_CLASS);
            $icon.show();
            return
        }
        $node.find("." + TOGGLE_ITEM_VISIBILITY_CLASS).removeClass(TOGGLE_ITEM_VISIBILITY_CLASS);
        $node.addClass(IS_LEAF)
    },
    _emptyMessageContainer: function() {
        return this._scrollableContainer ? this._scrollableContainer.content() : this.callBase()
    },
    _renderContent: function() {
        var items = this.option("items");
        if (items && items.length) {
            this._contentAlreadyRendered = true
        }
        this.callBase()
    },
    _renderSelectAllItem: function($container) {
        $container = $container || this.$element().find(".".concat(NODE_CONTAINER_CLASS)).first();
        this._$selectAllItem = (0, _renderer.default)("<div>").addClass(SELECT_ALL_ITEM_CLASS);
        var value = this._dataAdapter.isAllSelected();
        this._createComponent(this._$selectAllItem, _check_box.default, {
            value: value,
            text: this.option("selectAllText"),
            onValueChanged: function(args) {
                this._toggleSelectAll(args);
                this._fireSelectAllValueChanged(args.value)
            }.bind(this)
        });
        this._toggleSelectedClass(this._$selectAllItem, value);
        $container.before(this._$selectAllItem)
    },
    _toggleSelectAll: function(args) {
        this._dataAdapter.toggleSelectAll(args.value);
        this._updateItemsUI();
        this._fireSelectionChanged()
    },
    _renderCheckBox: function($node, node) {
        var $checkbox = (0, _renderer.default)("<div>").appendTo($node);
        this._createComponent($checkbox, _check_box.default, {
            value: node.internalFields.selected,
            onValueChanged: this._changeCheckboxValue.bind(this),
            focusStateEnabled: false,
            disabled: this._disabledGetter(node)
        })
    },
    _toggleSelectedClass: function($node, value) {
        $node.toggleClass(SELECTED_ITEM_CLASS, !!value)
    },
    _toggleNodeDisabledState: function(node, state) {
        var $node = this._getNodeElement(node);
        var $item = $node.find("." + ITEM_CLASS).eq(0);
        this._dataAdapter.toggleNodeDisabledState(node.internalFields.key, state);
        $item.toggleClass(DISABLED_STATE_CLASS, !!state);
        if (this._showCheckboxes()) {
            var checkbox = this._getCheckBoxInstance($node);
            checkbox.option("disabled", !!state)
        }
    },
    _itemOptionChanged: function(item, property, value) {
        var node = this._dataAdapter.getNodeByItem(item);
        if (property === this.option("disabledExpr")) {
            this._toggleNodeDisabledState(node, value)
        }
    },
    _changeCheckboxValue: function(e) {
        var $node = (0, _renderer.default)(e.element).parent("." + NODE_CLASS);
        var $item = $node.children("." + ITEM_CLASS);
        var item = this._getItemData($item);
        var node = this._getNodeByElement($item);
        var value = e.value;
        if (node && node.internalFields.selected === value) {
            return
        }
        this._updateItemSelection(value, item, e.event)
    },
    _isSingleSelection: function() {
        return "single" === this.option("selectionMode")
    },
    _isRecursiveSelection: function() {
        return this.option("selectNodesRecursive") && "single" !== this.option("selectionMode")
    },
    _isLastSelectedBranch: function(publicNode, selectedNodesKeys, deep) {
        var keyIndex = selectedNodesKeys.indexOf(publicNode.key);
        if (keyIndex >= 0) {
            selectedNodesKeys.splice(keyIndex, 1)
        }
        if (deep) {
            (0, _iterator.each)(publicNode.children, function(_, childNode) {
                this._isLastSelectedBranch(childNode, selectedNodesKeys, true)
            }.bind(this))
        }
        if (publicNode.parent) {
            this._isLastSelectedBranch(publicNode.parent, selectedNodesKeys)
        }
        return 0 === selectedNodesKeys.length
    },
    _isLastRequired: function(node) {
        var selectionRequired = this.option("selectionRequired");
        var isSingleMode = this._isSingleSelection();
        var selectedNodesKeys = this.getSelectedNodeKeys();
        if (!selectionRequired) {
            return
        }
        if (isSingleMode) {
            return 1 === selectedNodesKeys.length
        } else {
            return this._isLastSelectedBranch(node.internalFields.publicNode, selectedNodesKeys.slice(), true)
        }
    },
    _updateItemSelection: function(value, itemElement, dxEvent) {
        var _this10 = this;
        var node = this._getNode(itemElement);
        if (!node) {
            return false
        }
        if (node.internalFields.selected === value) {
            return true
        }
        if (!value && this._isLastRequired(node)) {
            if (this._showCheckboxes()) {
                var $node = this._getNodeElement(node);
                var checkbox = this._getCheckBoxInstance($node);
                checkbox && checkbox.option("value", true)
            }
            return false
        }
        var selectedNodesKeys = this.getSelectedNodeKeys();
        if (this._isSingleSelection() && value) {
            (0, _iterator.each)(selectedNodesKeys, function(index, nodeKey) {
                _this10.unselectItem(nodeKey)
            })
        }
        this._dataAdapter.toggleSelection(node.internalFields.key, value);
        this._updateItemsUI();
        var initiator = dxEvent || this._findItemElementByItem(node.internalFields.item);
        var handler = dxEvent ? this._itemDXEventHandler : this._itemEventHandler;
        handler.call(this, initiator, "onItemSelectionChanged", {
            node: this._dataAdapter.getPublicNode(node),
            itemData: node.internalFields.item
        });
        this._fireSelectionChanged();
        return true
    },
    _getCheckBoxInstance: function($node) {
        return $node.children(".dx-checkbox").dxCheckBox("instance")
    },
    _updateItemsUI: function() {
        var _this11 = this;
        var cache = {};
        (0, _iterator.each)(this._dataAdapter.getData(), function(_, node) {
            var $node = _this11._getNodeElement(node, cache);
            var nodeSelection = node.internalFields.selected;
            if (!$node.length) {
                return
            }
            _this11._toggleSelectedClass($node, nodeSelection);
            _this11.setAria("selected", nodeSelection, $node);
            if (_this11._showCheckboxes()) {
                var checkbox = _this11._getCheckBoxInstance($node);
                checkbox.option("value", nodeSelection)
            }
        });
        if (this._selectAllEnabled()) {
            this._$selectAllItem.dxCheckBox("instance").option("value", this._dataAdapter.isAllSelected())
        }
    },
    _updateParentsState: function(node, $node) {
        if (!$node) {
            return
        }
        var parentNode = this._dataAdapter.getNodeByKey(node.internalFields.parentKey);
        var $parentNode = (0, _renderer.default)($node.parents("." + NODE_CLASS)[0]);
        if (this._showCheckboxes()) {
            var parentValue = parentNode.internalFields.selected;
            this._getCheckBoxInstance($parentNode).option("value", parentValue);
            this._toggleSelectedClass($parentNode, parentValue)
        }
        if (parentNode.internalFields.parentKey !== this.option("rootValue")) {
            this._updateParentsState(parentNode, $parentNode)
        }
    },
    _itemEventHandlerImpl: function(initiator, action, actionArgs) {
        var $itemElement = (0, _renderer.default)(initiator).closest("." + NODE_CLASS).children("." + ITEM_CLASS);
        return action((0, _extend.extend)(this._extendActionArgs($itemElement), actionArgs))
    },
    _itemContextMenuHandler: function(e) {
        this._createEventHandler("onItemContextMenu", e)
    },
    _itemHoldHandler: function(e) {
        this._createEventHandler("onItemHold", e)
    },
    _createEventHandler: function(eventName, e) {
        var node = this._getNodeByElement(e.currentTarget);
        this._itemDXEventHandler(e, eventName, {
            node: this._dataAdapter.getPublicNode(node)
        })
    },
    _itemClass: function() {
        return ITEM_CLASS
    },
    _itemDataKey: function() {
        return ITEM_DATA_KEY
    },
    _attachClickEvent: function() {
        var clickSelector = "." + this._itemClass();
        var pointerDownSelector = "." + NODE_CLASS + ", ." + SELECT_ALL_ITEM_CLASS;
        var eventName = (0, _index.addNamespace)(_click.name, this.NAME);
        var pointerDownEvent = (0, _index.addNamespace)(_pointer.default.down, this.NAME);
        var $itemContainer = this._itemContainer();
        var that = this;
        _events_engine.default.off($itemContainer, eventName, clickSelector);
        _events_engine.default.off($itemContainer, pointerDownEvent, pointerDownSelector);
        _events_engine.default.on($itemContainer, eventName, clickSelector, function(e) {
            that._itemClickHandler(e, (0, _renderer.default)(this))
        });
        _events_engine.default.on($itemContainer, pointerDownEvent, pointerDownSelector, function(e) {
            that._itemPointerDownHandler(e)
        })
    },
    _itemClickHandler: function(e, $item) {
        var itemData = this._getItemData($item);
        var node = this._getNodeByElement($item);
        this._itemDXEventHandler(e, "onItemClick", {
            node: this._dataAdapter.getPublicNode(node)
        });
        if (this.option("selectByClick") && !e.isDefaultPrevented()) {
            this._updateItemSelection(!node.internalFields.selected, itemData, e)
        }
    },
    _updateSelectionToFirstItem: function($items, startIndex) {
        var itemIndex = startIndex;
        while (itemIndex >= 0) {
            var $item = (0, _renderer.default)($items[itemIndex]);
            this._updateItemSelection(true, $item.find("." + ITEM_CLASS).get(0));
            itemIndex--
        }
    },
    _updateSelectionToLastItem: function($items, startIndex) {
        var length = $items.length;
        var itemIndex = startIndex;
        while (itemIndex < length) {
            var $item = (0, _renderer.default)($items[itemIndex]);
            this._updateItemSelection(true, $item.find("." + ITEM_CLASS).get(0));
            itemIndex++
        }
    },
    _focusInHandler: function(e) {
        var _this12 = this;
        this._updateFocusState(e, true);
        if (this.option("focusedElement")) {
            clearTimeout(this._setFocusedItemTimeout);
            this._setFocusedItemTimeout = setTimeout(function() {
                _this12._setFocusedItem((0, _renderer.default)(_this12.option("focusedElement")))
            });
            return
        }
        var $activeItem = this._getActiveItem();
        this.option("focusedElement", (0, _element.getPublicElement)($activeItem.closest("." + NODE_CLASS)))
    },
    _setFocusedItem: function($target) {
        if (!$target || !$target.length) {
            return
        }
        if (!$target.children().hasClass(DISABLED_STATE_CLASS)) {
            this.callBase($target)
        }
    },
    _itemPointerDownHandler: function(e) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        var $target = (0, _renderer.default)(e.target).closest("." + NODE_CLASS + ", ." + SELECT_ALL_ITEM_CLASS);
        if (!$target.length) {
            return
        }
        var itemElement = $target.hasClass(DISABLED_STATE_CLASS) ? null : $target;
        this.option("focusedElement", (0, _element.getPublicElement)(itemElement))
    },
    _findNonDisabledNodes: function($nodes) {
        return $nodes.not(function() {
            return (0, _renderer.default)(this).children("." + ITEM_CLASS).hasClass(DISABLED_STATE_CLASS)
        })
    },
    _moveFocus: function(location, e) {
        var FOCUS_UP = "up";
        var FOCUS_DOWN = "down";
        var FOCUS_FIRST = "first";
        var FOCUS_LAST = "last";
        var FOCUS_LEFT = this.option("rtlEnabled") ? "right" : "left";
        var FOCUS_RIGHT = this.option("rtlEnabled") ? "left" : "right";
        this.$element().find(".".concat(NODE_CONTAINER_CLASS)).each(function() {
            _fx.default.stop(this, true)
        });
        var $items = this._findNonDisabledNodes(this._nodeElements());
        if (!$items || !$items.length) {
            return
        }
        switch (location) {
            case FOCUS_UP:
                var $prevItem = this._prevItem($items);
                this.option("focusedElement", (0, _element.getPublicElement)($prevItem));
                var prevItemElement = this._getNodeItemElement($prevItem);
                this._scrollableContainer.scrollToElement(prevItemElement);
                if (e.shiftKey && this._showCheckboxes()) {
                    this._updateItemSelection(true, prevItemElement)
                }
                break;
            case FOCUS_DOWN:
                var $nextItem = this._nextItem($items);
                this.option("focusedElement", (0, _element.getPublicElement)($nextItem));
                var nextItemElement = this._getNodeItemElement($nextItem);
                this._scrollableContainer.scrollToElement(nextItemElement);
                if (e.shiftKey && this._showCheckboxes()) {
                    this._updateItemSelection(true, nextItemElement)
                }
                break;
            case FOCUS_FIRST:
                var $firstItem = $items.first();
                if (e.shiftKey && this._showCheckboxes()) {
                    this._updateSelectionToFirstItem($items, $items.index(this._prevItem($items)))
                }
                this.option("focusedElement", (0, _element.getPublicElement)($firstItem));
                this._scrollableContainer.scrollToElement(this._getNodeItemElement($firstItem));
                break;
            case FOCUS_LAST:
                var $lastItem = $items.last();
                if (e.shiftKey && this._showCheckboxes()) {
                    this._updateSelectionToLastItem($items, $items.index(this._nextItem($items)))
                }
                this.option("focusedElement", (0, _element.getPublicElement)($lastItem));
                this._scrollableContainer.scrollToElement(this._getNodeItemElement($lastItem));
                break;
            case FOCUS_RIGHT:
                this._expandFocusedContainer();
                break;
            case FOCUS_LEFT:
                this._collapseFocusedContainer();
                break;
            default:
                this.callBase.apply(this, arguments);
                return
        }
    },
    _getNodeItemElement: function($node) {
        return $node.find("." + ITEM_CLASS).get(0)
    },
    _nodeElements: function() {
        return this.$element().find("." + NODE_CLASS).not(":hidden")
    },
    _expandFocusedContainer: function() {
        var $focusedNode = (0, _renderer.default)(this.option("focusedElement"));
        if (!$focusedNode.length || $focusedNode.hasClass(IS_LEAF)) {
            return
        }
        var $node = $focusedNode.find(".".concat(NODE_CONTAINER_CLASS)).eq(0);
        if ($node.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
            var $nextItem = this._nextItem(this._findNonDisabledNodes(this._nodeElements()));
            this.option("focusedElement", (0, _element.getPublicElement)($nextItem));
            this._scrollableContainer.scrollToElement(this._getNodeItemElement($nextItem));
            return
        }
        var node = this._getNodeByElement($focusedNode.children("." + ITEM_CLASS));
        this._toggleExpandedState(node, true)
    },
    _getClosestNonDisabledNode: function($node) {
        do {
            $node = $node.parent().closest("." + NODE_CLASS)
        } while ($node.children(".dx-treeview-item.dx-state-disabled").length);
        return $node
    },
    _collapseFocusedContainer: function() {
        var $focusedNode = (0, _renderer.default)(this.option("focusedElement"));
        if (!$focusedNode.length) {
            return
        }
        var nodeElement = $focusedNode.find(".".concat(NODE_CONTAINER_CLASS)).eq(0);
        if (!$focusedNode.hasClass(IS_LEAF) && nodeElement.hasClass(OPENED_NODE_CONTAINER_CLASS)) {
            var node = this._getNodeByElement($focusedNode.children("." + ITEM_CLASS));
            this._toggleExpandedState(node, false)
        } else {
            var collapsedNode = this._getClosestNonDisabledNode($focusedNode);
            collapsedNode.length && this.option("focusedElement", (0, _element.getPublicElement)(collapsedNode));
            this._scrollableContainer.scrollToElement(this._getNodeItemElement(collapsedNode))
        }
    },
    _encodeString: function(value) {
        return (0, _type.isString)(value) ? encodeURI(value) : value
    },
    _decodeString: function(value) {
        return (0, _type.isString)(value) ? decodeURI(value) : value
    },
    updateDimensions: function() {
        var _this13 = this;
        var deferred = new _deferred.Deferred;
        if (this._scrollableContainer) {
            this._scrollableContainer.update().done(function() {
                deferred.resolveWith(_this13)
            })
        } else {
            deferred.resolveWith(this)
        }
        return deferred.promise()
    },
    selectItem: function(itemElement) {
        return this._updateItemSelection(true, itemElement)
    },
    unselectItem: function(itemElement) {
        return this._updateItemSelection(false, itemElement)
    },
    expandItem: function(itemElement) {
        return this._toggleExpandedState(itemElement, true)
    },
    collapseItem: function(itemElement) {
        return this._toggleExpandedState(itemElement, false)
    },
    getNodes: function() {
        return this._dataAdapter.getTreeNodes()
    },
    getSelectedNodes: function() {
        var _this14 = this;
        return this.getSelectedNodeKeys().map(function(key) {
            var node = _this14._dataAdapter.getNodeByKey(key);
            return _this14._dataAdapter.getPublicNode(node)
        })
    },
    getSelectedNodesKeys: function() {
        _ui3.default.log("W0002", "dxTreeView", "getSelectedNodesKeys", "20.1", "Use the 'getSelectedNodeKeys' method instead");
        return this.getSelectedNodeKeys()
    },
    getSelectedNodeKeys: function() {
        return this._dataAdapter.getSelectedNodesKeys()
    },
    selectAll: function() {
        if (this._selectAllEnabled()) {
            this._$selectAllItem.dxCheckBox("instance").option("value", true)
        } else {
            this._toggleSelectAll({
                value: true
            })
        }
    },
    unselectAll: function() {
        if (this._selectAllEnabled()) {
            this._$selectAllItem.dxCheckBox("instance").option("value", false)
        } else {
            this._toggleSelectAll({
                value: false
            })
        }
    },
    expandAll: function() {
        var dataAdapter = this._dataAdapter;
        (0, _iterator.each)(dataAdapter.getData(), function(_, node) {
            return dataAdapter.toggleExpansion(node.internalFields.key, true)
        });
        this.repaint()
    },
    collapseAll: function() {
        (0, _iterator.each)(this._dataAdapter.getExpandedNodesKeys(), function(_, key) {
            this._toggleExpandedState(key, false)
        }.bind(this))
    },
    scrollToItem: function(keyOrItemOrElement) {
        var _this15 = this;
        var node = this._getNode(keyOrItemOrElement);
        if (!node) {
            return (new _deferred.Deferred).reject().promise()
        }
        var nodeKeysToExpand = [];
        var parentNode = node.internalFields.publicNode.parent;
        while (null != parentNode) {
            if (!parentNode.expanded) {
                nodeKeysToExpand.push(parentNode.key)
            }
            parentNode = parentNode.parent
        }
        var scrollCallback = new _deferred.Deferred;
        this._expandNodes(nodeKeysToExpand.reverse()).always(function() {
            var $element = _this15._getNodeElement(node);
            if ($element && $element.length) {
                _this15._scrollableContainer.scrollToElementTopLeft($element);
                scrollCallback.resolve()
            } else {
                scrollCallback.reject()
            }
        });
        return scrollCallback.promise()
    },
    _expandNodes: function(keysToExpand) {
        var _this16 = this;
        if (!keysToExpand || 0 === keysToExpand.length) {
            return (new _deferred.Deferred).resolve().promise()
        }
        var resultCallback = new _deferred.Deferred;
        var callbacksByNodes = keysToExpand.map(function(key) {
            return _this16.expandItem(key)
        });
        _deferred.when.apply(_renderer.default, callbacksByNodes).done(function() {
            return resultCallback.resolve()
        }).fail(function() {
            return resultCallback.reject()
        });
        return resultCallback.promise()
    },
    _dispose: function() {
        this.callBase();
        clearTimeout(this._setFocusedItemTimeout)
    }
});
var _default = TreeViewBase;
exports.default = _default;
module.exports = exports.default;
