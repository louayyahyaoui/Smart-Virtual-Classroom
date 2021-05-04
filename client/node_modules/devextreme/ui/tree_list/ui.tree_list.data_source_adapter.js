/**
 * DevExtreme (ui/tree_list/ui.tree_list.data_source_adapter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _data = require("../../core/utils/data");
var _extend = require("../../core/utils/extend");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.utils"));
var _array_utils = require("../../data/array_utils");
var _array_store = _interopRequireDefault(require("../../data/array_store"));
var _query = _interopRequireDefault(require("../../data/query"));
var _uiGrid_core2 = _interopRequireDefault(require("../grid_core/ui.grid_core.data_source_adapter"));
var _deferred = require("../../core/utils/deferred");
var _store_helper = _interopRequireDefault(require("../../data/store_helper"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var queryByOptions = _store_helper.default.queryByOptions;
var DEFAULT_KEY_EXPRESSION = "id";
var isFullBranchFilterMode = function(that) {
    return "fullBranch" === that.option("filterMode")
};
var DataSourceAdapterTreeList = _uiGrid_core2.default.inherit(function() {
    var getChildKeys = function(that, keys) {
        var childKeys = [];
        keys.forEach(function(key) {
            var node = that.getNodeByKey(key);
            node && node.children.forEach(function(child) {
                childKeys.push(child.key)
            })
        });
        return childKeys
    };
    return {
        _createKeyGetter: function() {
            var keyExpr = this.getKeyExpr();
            return (0, _data.compileGetter)(keyExpr)
        },
        _createKeySetter: function() {
            var keyExpr = this.getKeyExpr();
            if ((0, _type.isFunction)(keyExpr)) {
                return keyExpr
            }
            return (0, _data.compileSetter)(keyExpr)
        },
        _createParentIdGetter: function() {
            return (0, _data.compileGetter)(this.option("parentIdExpr"))
        },
        createParentIdSetter: function() {
            var parentIdExpr = this.option("parentIdExpr");
            if ((0, _type.isFunction)(parentIdExpr)) {
                return parentIdExpr
            }
            return (0, _data.compileSetter)(parentIdExpr)
        },
        _createItemsGetter: function() {
            return (0, _data.compileGetter)(this.option("itemsExpr"))
        },
        _createHasItemsGetter: function() {
            var hasItemsExpr = this.option("hasItemsExpr");
            return hasItemsExpr && (0, _data.compileGetter)(hasItemsExpr)
        },
        _createHasItemsSetter: function() {
            var hasItemsExpr = this.option("hasItemsExpr");
            if ((0, _type.isFunction)(hasItemsExpr)) {
                return hasItemsExpr
            }
            return hasItemsExpr && (0, _data.compileSetter)(hasItemsExpr)
        },
        _updateIndexByKeyObject: function(items) {
            var that = this;
            that._indexByKey = {};
            (0, _iterator.each)(items, function(index, item) {
                that._indexByKey[item.key] = index
            })
        },
        _calculateHasItems: function(node, options) {
            var that = this;
            var parentIds = options.storeLoadOptions.parentIds;
            var hasItems;
            var isFullBranch = isFullBranchFilterMode(that);
            if (that._hasItemsGetter && (parentIds || !options.storeLoadOptions.filter || isFullBranch)) {
                hasItems = that._hasItemsGetter(node.data)
            }
            if (void 0 === hasItems) {
                if (!that._isChildrenLoaded[node.key] && options.remoteOperations.filtering && (parentIds || isFullBranch)) {
                    hasItems = true
                } else {
                    if (options.loadOptions.filter && !options.remoteOperations.filtering && isFullBranch) {
                        hasItems = node.children.length
                    } else {
                        hasItems = node.hasChildren
                    }
                }
            }
            return !!hasItems
        },
        _createVisibleItemsByNodes: function(nodes, options) {
            var that = this;
            var result = [];
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].visible) {
                    result.push(nodes[i])
                }
                if ((that.isRowExpanded(nodes[i].key, options) || !nodes[i].visible) && nodes[i].hasChildren && nodes[i].children.length) {
                    result = result.concat(that._createVisibleItemsByNodes(nodes[i].children, options))
                }
            }
            return result
        },
        _convertItemToNode: function(item, rootValue, nodeByKey) {
            var key = this._keyGetter(item);
            var parentId = this._parentIdGetter(item);
            parentId = (0, _type.isDefined)(parentId) ? parentId : rootValue;
            var parentNode = nodeByKey[parentId] = nodeByKey[parentId] || {
                key: parentId,
                children: []
            };
            var node = nodeByKey[key] = nodeByKey[key] || {
                key: key,
                children: []
            };
            node.data = item;
            node.parent = parentNode;
            return node
        },
        _createNodesByItems: function(items, visibleItems) {
            var that = this;
            var rootValue = that.option("rootValue");
            var visibleByKey = {};
            var nodeByKey = that._nodeByKey = {};
            var i;
            if (visibleItems) {
                for (i = 0; i < visibleItems.length; i++) {
                    visibleByKey[this._keyGetter(visibleItems[i])] = true
                }
            }
            for (i = 0; i < items.length; i++) {
                var node = that._convertItemToNode(items[i], rootValue, nodeByKey);
                if (void 0 === node.key) {
                    return
                }
                node.visible = !visibleItems || !!visibleByKey[node.key];
                if (node.parent) {
                    node.parent.children.push(node)
                }
            }
            var rootNode = nodeByKey[rootValue] || {
                key: rootValue,
                children: []
            };
            rootNode.level = -1;
            return rootNode
        },
        _convertDataToPlainStructure: function(data, parentId, result) {
            var key;
            if (this._itemsGetter && !data.isConverted) {
                result = result || [];
                for (var i = 0; i < data.length; i++) {
                    var item = (0, _array_utils.createObjectWithChanges)(data[i]);
                    key = this._keyGetter(item);
                    if (void 0 === key) {
                        key = result.length + 1;
                        this._keySetter(item, key)
                    }
                    this._parentIdSetter(item, void 0 === parentId ? this.option("rootValue") : parentId);
                    result.push(item);
                    var childItems = this._itemsGetter(item);
                    if (childItems && childItems.length) {
                        this._convertDataToPlainStructure(childItems, key, result);
                        var itemsExpr = this.option("itemsExpr");
                        if (!(0, _type.isFunction)(itemsExpr)) {
                            delete item[itemsExpr]
                        }
                    }
                }
                result.isConverted = true;
                return result
            }
            return data
        },
        _createIdFilter: function(field, keys) {
            var parentIdFilters = [];
            for (var i = 0; i < keys.length; i++) {
                parentIdFilters.push([field, "=", keys[i]])
            }
            return _uiGrid_core.default.combineFilters(parentIdFilters, "or")
        },
        _customizeRemoteOperations: function(options, operationTypes) {
            this.callBase.apply(this, arguments);
            options.remoteOperations.paging = false;
            var expandVisibleNodes = false;
            if (this.option("autoExpandAll")) {
                options.remoteOperations.sorting = false;
                options.remoteOperations.filtering = false;
                if ((!this._lastLoadOptions || operationTypes.filtering && !options.storeLoadOptions.filter) && !options.isCustomLoading) {
                    expandVisibleNodes = true
                }
            }
            if (!options.isCustomLoading) {
                this._isReload = this._isReload || operationTypes.reload;
                if (!options.cachedStoreData) {
                    this._isChildrenLoaded = {};
                    if (this._isReload) {
                        this._nodeByKey = {}
                    }
                }
                if (this.option("expandNodesOnFiltering") && (operationTypes.filtering || this._isReload && options.storeLoadOptions.filter)) {
                    if (options.storeLoadOptions.filter) {
                        expandVisibleNodes = true
                    } else {
                        options.collapseVisibleNodes = true
                    }
                }
            }
            options.expandVisibleNodes = expandVisibleNodes
        },
        _getParentIdsToLoad: function(parentIds) {
            var parentIdsToLoad = [];
            for (var i = 0; i < parentIds.length; i++) {
                var node = this.getNodeByKey(parentIds[i]);
                if (!node || node.hasChildren && !node.children.length) {
                    parentIdsToLoad.push(parentIds[i])
                }
            }
            return parentIdsToLoad
        },
        _handleDataLoading: function(options) {
            var rootValue = this.option("rootValue");
            var parentIdExpr = this.option("parentIdExpr");
            var parentIds = options.storeLoadOptions.parentIds;
            if (parentIds) {
                options.isCustomLoading = false
            }
            this.callBase.apply(this, arguments);
            if (options.remoteOperations.filtering && !options.isCustomLoading) {
                if (isFullBranchFilterMode(this) && options.cachedStoreData || !options.storeLoadOptions.filter) {
                    var expandedRowKeys = options.collapseVisibleNodes ? [] : this.option("expandedRowKeys");
                    parentIds = [rootValue].concat(expandedRowKeys).concat(parentIds || []);
                    var parentIdsToLoad = options.data ? this._getParentIdsToLoad(parentIds) : parentIds;
                    if (parentIdsToLoad.length) {
                        options.cachedPagingData = void 0;
                        options.data = void 0;
                        options.mergeStoreLoadData = true
                    }
                    options.storeLoadOptions.parentIds = parentIdsToLoad;
                    options.storeLoadOptions.filter = this._createIdFilter(parentIdExpr, parentIdsToLoad)
                }
            }
        },
        _generateInfoToLoad: function(data, needChildren) {
            var that = this;
            var key;
            var keyMap = {};
            var resultKeyMap = {};
            var resultKeys = [];
            var rootValue = that.option("rootValue");
            var i;
            for (i = 0; i < data.length; i++) {
                key = needChildren ? that._parentIdGetter(data[i]) : that._keyGetter(data[i]);
                keyMap[key] = true
            }
            for (i = 0; i < data.length; i++) {
                key = needChildren ? that._keyGetter(data[i]) : that._parentIdGetter(data[i]);
                var needToLoad = needChildren ? that.isRowExpanded(key) : key !== rootValue;
                if (!keyMap[key] && !resultKeyMap[key] && needToLoad) {
                    resultKeyMap[key] = true;
                    resultKeys.push(key)
                }
            }
            return {
                keyMap: resultKeyMap,
                keys: resultKeys
            }
        },
        _loadParentsOrChildren: function(data, options, needChildren) {
            var _this = this;
            var that = this;
            var filter;
            var needLocalFiltering;
            var _that$_generateInfoTo = that._generateInfoToLoad(data, needChildren),
                keys = _that$_generateInfoTo.keys,
                keyMap = _that$_generateInfoTo.keyMap;
            var d = new _deferred.Deferred;
            var isRemoteFiltering = options.remoteOperations.filtering;
            var maxFilterLengthInRequest = that.option("maxFilterLengthInRequest");
            var loadOptions = isRemoteFiltering ? options.storeLoadOptions : options.loadOptions;

            function concatLoadedData(loadedData) {
                if (isRemoteFiltering) {
                    that._cachedStoreData = that._cachedStoreData.concat(loadedData)
                }
                return data.concat(loadedData)
            }
            if (!keys.length) {
                return d.resolve(data)
            }
            var cachedNodes = keys.map(function(id) {
                return _this.getNodeByKey(id)
            }).filter(function(node) {
                return node && node.data
            });
            if (cachedNodes.length === keys.length) {
                if (needChildren) {
                    cachedNodes = cachedNodes.reduce(function(result, node) {
                        return result.concat(node.children)
                    }, [])
                }
                if (cachedNodes.length) {
                    return that._loadParentsOrChildren(concatLoadedData(cachedNodes.map(function(node) {
                        return node.data
                    })), options, needChildren)
                }
            }
            var keyExpr = needChildren ? that.option("parentIdExpr") : that.getKeyExpr();
            filter = that._createIdFilter(keyExpr, keys);
            var filterLength = encodeURI(JSON.stringify(filter)).length;
            if (filterLength > maxFilterLengthInRequest) {
                filter = function(itemData) {
                    return keyMap[that._keyGetter(itemData)]
                };
                needLocalFiltering = isRemoteFiltering
            }
            loadOptions = (0, _extend.extend)({}, loadOptions, {
                filter: !needLocalFiltering ? filter : null
            });
            var store = options.fullData ? new _array_store.default(options.fullData) : that._dataSource.store();
            that.loadFromStore(loadOptions, store).done(function(loadedData) {
                if (loadedData.length) {
                    if (needLocalFiltering) {
                        loadedData = (0, _query.default)(loadedData).filter(filter).toArray()
                    }
                    that._loadParentsOrChildren(concatLoadedData(loadedData), options, needChildren).done(d.resolve).fail(d.reject)
                } else {
                    d.resolve(data)
                }
            }).fail(d.reject);
            return d
        },
        _loadParents: function(data, options) {
            return this._loadParentsOrChildren(data, options)
        },
        _loadChildrenIfNeed: function(data, options) {
            if (isFullBranchFilterMode(this)) {
                return this._loadParentsOrChildren(data, options, true)
            }
            return (0, _deferred.when)(data)
        },
        _updateHasItemsMap: function(options) {
            var parentIds = options.storeLoadOptions.parentIds;
            if (parentIds) {
                for (var i = 0; i < parentIds.length; i++) {
                    this._isChildrenLoaded[parentIds[i]] = true
                }
            }
        },
        _getKeyInfo: function() {
            return {
                key: function() {
                    return "key"
                },
                keyOf: function(data) {
                    return data.key
                }
            }
        },
        _applyBatch: function(changes) {
            var _this2 = this;
            var baseChanges = [];
            changes.forEach(function(change) {
                if ("insert" === change.type) {
                    baseChanges = baseChanges.concat(_this2._applyInsert(change))
                } else {
                    if ("remove" === change.type) {
                        baseChanges = baseChanges.concat(_this2._applyRemove(change))
                    } else {
                        if ("update" === change.type) {
                            baseChanges.push({
                                type: change.type,
                                key: change.key,
                                data: {
                                    data: change.data
                                }
                            })
                        }
                    }
                }
            });
            this.callBase(baseChanges)
        },
        _setHasItems: function(node, value) {
            var hasItemsSetter = this._hasItemsSetter;
            node.hasChildren = value;
            if (hasItemsSetter && node.data) {
                hasItemsSetter(node.data, value)
            }
        },
        _applyInsert: function(change) {
            var that = this;
            var baseChanges = [];
            var parentId = that.parentKeyOf(change.data);
            var parentNode = that.getNodeByKey(parentId);
            if (parentNode) {
                var rootValue = that.option("rootValue");
                var node = that._convertItemToNode(change.data, rootValue, that._nodeByKey);
                node.hasChildren = false;
                node.level = parentNode.level + 1;
                node.visible = true;
                parentNode.children.push(node);
                that._isChildrenLoaded[node.key] = true;
                that._setHasItems(parentNode, true);
                if ((!parentNode.parent || that.isRowExpanded(parentNode.key)) && void 0 !== change.index) {
                    var index = that.items().indexOf(parentNode) + 1;
                    index += change.index >= 0 ? Math.min(change.index, parentNode.children.length) : parentNode.children.length;
                    baseChanges.push({
                        type: change.type,
                        data: node,
                        index: index
                    })
                }
            }
            return baseChanges
        },
        _applyRemove: function(change) {
            var baseChanges = [];
            var node = this.getNodeByKey(change.key);
            var parentNode = node && node.parent;
            if (parentNode) {
                var index = parentNode.children.indexOf(node);
                if (index >= 0) {
                    parentNode.children.splice(index, 1);
                    if (!parentNode.children.length) {
                        this._setHasItems(parentNode, false)
                    }
                    baseChanges.push(change);
                    baseChanges = baseChanges.concat(this.getChildNodeKeys(change.key).map(function(key) {
                        return {
                            type: change.type,
                            key: key
                        }
                    }))
                }
            }
            return baseChanges
        },
        _handleDataLoaded: function(options) {
            var data = options.data = this._convertDataToPlainStructure(options.data);
            if (!options.remoteOperations.filtering && options.loadOptions.filter) {
                options.fullData = queryByOptions((0, _query.default)(options.data), {
                    sort: options.loadOptions && options.loadOptions.sort
                }).toArray()
            }
            this._updateHasItemsMap(options);
            this.callBase(options);
            if (data.isConverted && this._cachedStoreData) {
                this._cachedStoreData.isConverted = true
            }
        },
        _fillNodes: function(nodes, options, expandedRowKeys, level) {
            var isFullBranch = isFullBranchFilterMode(this);
            level = level || 0;
            for (var i = 0; i < nodes.length; i++) {
                var node = nodes[i];
                var needToExpand = false;
                this._fillNodes(nodes[i].children, options, expandedRowKeys, level + 1);
                node.level = level;
                node.hasChildren = this._calculateHasItems(node, options);
                if (node.visible && node.hasChildren) {
                    if (isFullBranch) {
                        if (node.children.filter(function(node) {
                                return node.visible
                            }).length) {
                            needToExpand = true
                        } else {
                            if (node.children.length) {
                                _uiTree_list.default.foreachNodes(node.children, function(node) {
                                    node.visible = true
                                })
                            }
                        }
                    } else {
                        needToExpand = true
                    }
                    if (options.expandVisibleNodes && needToExpand) {
                        expandedRowKeys.push(node.key)
                    }
                }
                if (node.visible || node.hasChildren) {
                    node.parent.hasChildren = true
                }
            }
        },
        _processTreeStructure: function(options, visibleItems) {
            var data = options.data;
            var parentIds = options.storeLoadOptions.parentIds;
            var expandedRowKeys = [];
            if (parentIds && parentIds.length || this._isReload) {
                if (options.fullData && options.fullData.length > options.data.length) {
                    data = options.fullData;
                    visibleItems = visibleItems || options.data
                }
                this._rootNode = this._createNodesByItems(data, visibleItems);
                if (!this._rootNode) {
                    options.data = (new _deferred.Deferred).reject(_ui.default.Error("E1046", this.getKeyExpr()));
                    return
                }
                this._fillNodes(this._rootNode.children, options, expandedRowKeys);
                this._isNodesInitializing = true;
                if (options.collapseVisibleNodes || expandedRowKeys.length) {
                    this.option("expandedRowKeys", expandedRowKeys)
                }
                this._isReload = false;
                this.executeAction("onNodesInitialized", {
                    root: this._rootNode
                });
                this._isNodesInitializing = false
            }
            data = this._createVisibleItemsByNodes(this._rootNode.children, options);
            options.data = data;
            this._totalItemsCount = data.length
        },
        _handleDataLoadedCore: function(options) {
            var that = this;
            var data = options.data;
            var callBase = that.callBase;
            var filter = options.storeLoadOptions.filter || options.loadOptions.filter;
            var filterMode = that.option("filterMode");
            var visibleItems;
            var parentIds = options.storeLoadOptions.parentIds;
            var needLoadParents = filter && (!parentIds || !parentIds.length) && "standard" !== filterMode;
            if (!options.isCustomLoading) {
                if (needLoadParents) {
                    var d = options.data = new _deferred.Deferred;
                    if ("matchOnly" === filterMode) {
                        visibleItems = data
                    }
                    return that._loadParents(data, options).done(function(data) {
                        that._loadChildrenIfNeed(data, options).done(function(data) {
                            options.data = data;
                            that._processTreeStructure(options, visibleItems);
                            callBase.call(that, options);
                            d.resolve(options.data)
                        })
                    }).fail(d.reject)
                } else {
                    that._processTreeStructure(options)
                }
            }
            that.callBase(options)
        },
        _handlePush: function(changes) {
            var reshapeOnPush = this._dataSource._reshapeOnPush;
            var isNeedReshape = reshapeOnPush && !!changes.length;
            if (isNeedReshape) {
                this._isReload = true
            }
            this.callBase.apply(this, arguments)
        },
        init: function(dataSource, remoteOperations) {
            this.callBase.apply(this, arguments);
            var dataStructure = this.option("dataStructure");
            this._keyGetter = this._createKeyGetter();
            this._parentIdGetter = this._createParentIdGetter();
            this._hasItemsGetter = this._createHasItemsGetter();
            this._hasItemsSetter = this._createHasItemsSetter();
            if ("tree" === dataStructure) {
                this._itemsGetter = this._createItemsGetter();
                this._keySetter = this._createKeySetter();
                this._parentIdSetter = this.createParentIdSetter()
            }
            this._nodeByKey = {};
            this._isChildrenLoaded = {};
            this._totalItemsCount = 0;
            this.createAction("onNodesInitialized")
        },
        getKeyExpr: function() {
            var store = this.store();
            var key = store && store.key();
            var keyExpr = this.option("keyExpr");
            if ((0, _type.isDefined)(key) && (0, _type.isDefined)(keyExpr)) {
                if (!(0, _common.equalByValue)(key, keyExpr)) {
                    throw _ui.default.Error("E1044")
                }
            }
            return key || keyExpr || DEFAULT_KEY_EXPRESSION
        },
        keyOf: function(data) {
            return this._keyGetter && this._keyGetter(data)
        },
        parentKeyOf: function(data) {
            return this._parentIdGetter && this._parentIdGetter(data)
        },
        getRootNode: function() {
            return this._rootNode
        },
        totalItemsCount: function() {
            return this._totalItemsCount
        },
        isRowExpanded: function(key, cache) {
            if (cache) {
                var isExpandedByKey = cache.isExpandedByKey;
                if (!isExpandedByKey) {
                    isExpandedByKey = cache.isExpandedByKey = {};
                    this.option("expandedRowKeys").forEach(function(key) {
                        isExpandedByKey[key] = true
                    })
                }
                return !!isExpandedByKey[key]
            }
            var indexExpandedNodeKey = _uiGrid_core.default.getIndexByKey(key, this.option("expandedRowKeys"), null);
            return indexExpandedNodeKey >= 0
        },
        _changeRowExpandCore: function(key) {
            var expandedRowKeys = this.option("expandedRowKeys").slice();
            var indexExpandedNodeKey = _uiGrid_core.default.getIndexByKey(key, expandedRowKeys, null);
            if (indexExpandedNodeKey < 0) {
                expandedRowKeys.push(key)
            } else {
                expandedRowKeys.splice(indexExpandedNodeKey, 1)
            }
            this.option("expandedRowKeys", expandedRowKeys)
        },
        changeRowExpand: function(key) {
            this._changeRowExpandCore(key);
            return this._isNodesInitializing ? (new _deferred.Deferred).resolve() : this.load()
        },
        getNodeByKey: function(key) {
            if (this._nodeByKey) {
                return this._nodeByKey[key]
            }
        },
        getNodeLeafKeys: function() {
            var that = this;
            var result = [];
            var keys = that._rootNode ? [that._rootNode.key] : [];
            keys.forEach(function(key) {
                var node = that.getNodeByKey(key);
                node && _uiTree_list.default.foreachNodes([node], function(childNode) {
                    !childNode.children.length && result.push(childNode.key)
                })
            });
            return result
        },
        getChildNodeKeys: function(parentKey) {
            var node = this.getNodeByKey(parentKey);
            var childrenKeys = [];
            node && _uiTree_list.default.foreachNodes(node.children, function(childNode) {
                childrenKeys.push(childNode.key)
            });
            return childrenKeys
        },
        loadDescendants: function(keys, childrenOnly) {
            var that = this;
            var d = new _deferred.Deferred;
            var remoteOperations = that.remoteOperations();
            if ((0, _type.isDefined)(keys)) {
                keys = Array.isArray(keys) ? keys : [keys]
            } else {
                keys = that.getNodeLeafKeys()
            }
            if (!remoteOperations.filtering || !keys.length) {
                return d.resolve()
            }
            var loadOptions = that._dataSource._createStoreLoadOptions();
            loadOptions.parentIds = keys;
            that.load(loadOptions).done(function() {
                if (!childrenOnly) {
                    var childKeys = getChildKeys(that, keys);
                    if (childKeys.length) {
                        that.loadDescendants(childKeys, childrenOnly).done(d.resolve).fail(d.reject);
                        return
                    }
                }
                d.resolve()
            }).fail(d.reject);
            return d.promise()
        },
        forEachNode: function() {
            var nodes = [];
            var callback;
            if (1 === arguments.length) {
                callback = arguments[0];
                var rootNode = this.getRootNode();
                nodes = rootNode && rootNode.children || []
            } else {
                if (2 === arguments.length) {
                    callback = arguments[1];
                    nodes = arguments[0];
                    nodes = Array.isArray(nodes) ? nodes : [nodes]
                }
            }
            _uiTree_list.default.foreachNodes(nodes, callback)
        }
    }
}());
var _default = {
    extend: function(extender) {
        DataSourceAdapterTreeList = DataSourceAdapterTreeList.inherit(extender)
    },
    create: function(component) {
        return new DataSourceAdapterTreeList(component)
    }
};
exports.default = _default;
module.exports = exports.default;
