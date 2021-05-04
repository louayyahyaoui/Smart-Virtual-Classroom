/**
 * DevExtreme (data/data_source/data_source.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.DataSource = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _utils = _interopRequireDefault(require("../utils"));
var _array_utils = require("../array_utils");
var _custom_store = _interopRequireDefault(require("../custom_store"));
var _events_strategy = require("../../core/events_strategy");
var _errors = _interopRequireDefault(require("../errors"));
var _array = require("../../core/utils/array");
var _queue = require("../../core/utils/queue");
var _deferred = require("../../core/utils/deferred");
var _operation_manager = _interopRequireDefault(require("./operation_manager"));
var _utils2 = require("./utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DataSource = _class.default.inherit({
    ctor: function(options) {
        var _options$reshapeOnPus, _this = this;
        options = (0, _utils2.normalizeDataSourceOptions)(options);
        this._eventsStrategy = new _events_strategy.EventsStrategy(this, {
            syncStrategy: true
        });
        this._store = options.store;
        this._changedTime = 0;
        var needThrottling = 0 !== options.pushAggregationTimeout;
        if (needThrottling) {
            var throttlingTimeout = void 0 === options.pushAggregationTimeout ? function() {
                return 5 * _this._changedTime
            } : options.pushAggregationTimeout;
            var pushDeferred;
            var throttlingPushHandler = _utils.default.throttleChanges(function(changes) {
                pushDeferred.resolve();
                pushDeferred.done(function() {
                    return _this._onPush(changes)
                });
                pushDeferred = void 0
            }, throttlingTimeout);
            this._onPushHandler = function(args) {
                _this._aggregationTimeoutId = throttlingPushHandler(args.changes);
                if (!pushDeferred) {
                    pushDeferred = new _deferred.Deferred
                }
                args.waitFor.push(pushDeferred.promise())
            };
            this._store.on("beforePush", this._onPushHandler)
        } else {
            this._onPushHandler = function(changes) {
                return _this._onPush(changes)
            };
            this._store.on("push", this._onPushHandler)
        }
        this._storeLoadOptions = this._extractLoadOptions(options);
        this._mapFunc = options.map;
        this._postProcessFunc = options.postProcess;
        this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
        this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
        this._loadingCount = 0;
        this._loadQueue = this._createLoadQueue();
        this._searchValue = "searchValue" in options ? options.searchValue : null;
        this._searchOperation = options.searchOperation || "contains";
        this._searchExpr = options.searchExpr;
        this._paginate = options.paginate;
        this._reshapeOnPush = null !== (_options$reshapeOnPus = options.reshapeOnPush) && void 0 !== _options$reshapeOnPus ? _options$reshapeOnPus : false;
        (0, _iterator.each)(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], function(_, optionName) {
            if (optionName in options) {
                _this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName])
            }
        });
        this._operationManager = new _operation_manager.default;
        this._init()
    },
    _init: function() {
        this._items = [];
        this._userData = {};
        this._totalCount = -1;
        this._isLoaded = false;
        if (!(0, _type.isDefined)(this._paginate)) {
            this._paginate = !this.group()
        }
        this._isLastPage = !this._paginate
    },
    dispose: function() {
        var _this$_delayedLoadTas;
        this._store.off("beforePush", this._onPushHandler);
        this._store.off("push", this._onPushHandler);
        this._eventsStrategy.dispose();
        clearTimeout(this._aggregationTimeoutId);
        delete this._store;
        null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas ? void 0 : _this$_delayedLoadTas.abort();
        this._operationManager.cancelAll();
        this._disposed = true
    },
    _extractLoadOptions: function(options) {
        var result = {};
        var names = ["sort", "filter", "select", "group", "requireTotalCount"];
        var customNames = this._store._customLoadOptions();
        if (customNames) {
            names = names.concat(customNames)
        }(0, _iterator.each)(names, function() {
            result[this] = options[this]
        });
        return result
    },
    loadOptions: function() {
        return this._storeLoadOptions
    },
    items: function() {
        return this._items
    },
    pageIndex: function(newIndex) {
        if (!(0, _type.isNumeric)(newIndex)) {
            return this._pageIndex
        }
        this._pageIndex = newIndex;
        this._isLastPage = !this._paginate
    },
    paginate: function(value) {
        if (!(0, _type.isBoolean)(value)) {
            return this._paginate
        }
        if (this._paginate !== value) {
            this._paginate = value;
            this.pageIndex(0)
        }
    },
    pageSize: function(value) {
        if (!(0, _type.isNumeric)(value)) {
            return this._pageSize
        }
        this._pageSize = value
    },
    isLastPage: function() {
        return this._isLastPage
    },
    generateStoreLoadOptionAccessor: function(optionName) {
        var _this2 = this;
        return function(args) {
            var normalizedArgs = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(args);
            if (void 0 === normalizedArgs) {
                return _this2._storeLoadOptions[optionName]
            }
            _this2._storeLoadOptions[optionName] = normalizedArgs
        }
    },
    sort: function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        return this.generateStoreLoadOptionAccessor("sort")(args)
    },
    filter: function() {
        var newFilter = (0, _utils2.normalizeStoreLoadOptionAccessorArguments)(arguments);
        if (void 0 === newFilter) {
            return this._storeLoadOptions.filter
        }
        this._storeLoadOptions.filter = newFilter;
        this.pageIndex(0)
    },
    group: function() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2]
        }
        return this.generateStoreLoadOptionAccessor("group")(args)
    },
    select: function() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3]
        }
        return this.generateStoreLoadOptionAccessor("select")(args)
    },
    requireTotalCount: function(value) {
        if (!(0, _type.isBoolean)(value)) {
            return this._storeLoadOptions.requireTotalCount
        }
        this._storeLoadOptions.requireTotalCount = value
    },
    searchValue: function(value) {
        if (arguments.length < 1) {
            return this._searchValue
        }
        this._searchValue = value;
        this.pageIndex(0)
    },
    searchOperation: function(op) {
        if (!(0, _type.isString)(op)) {
            return this._searchOperation
        }
        this._searchOperation = op;
        this.pageIndex(0)
    },
    searchExpr: function(expr) {
        var argc = arguments.length;
        if (0 === argc) {
            return this._searchExpr
        }
        if (argc > 1) {
            expr = [].slice.call(arguments)
        }
        this._searchExpr = expr;
        this.pageIndex(0)
    },
    store: function() {
        return this._store
    },
    key: function() {
        var _this$_store;
        return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key()
    },
    totalCount: function() {
        return this._totalCount
    },
    isLoaded: function() {
        return this._isLoaded
    },
    isLoading: function() {
        return this._loadingCount > 0
    },
    beginLoading: function() {
        this._changeLoadingCount(1)
    },
    endLoading: function() {
        this._changeLoadingCount(-1)
    },
    _createLoadQueue: function() {
        return (0, _queue.create)()
    },
    _changeLoadingCount: function(increment) {
        var oldLoading = this.isLoading();
        this._loadingCount += increment;
        var newLoading = this.isLoading();
        if (oldLoading ^ newLoading) {
            this._eventsStrategy.fireEvent("loadingChanged", [newLoading])
        }
    },
    _scheduleLoadCallbacks: function(deferred) {
        var _this3 = this;
        this.beginLoading();
        deferred.always(function() {
            _this3.endLoading()
        })
    },
    _scheduleFailCallbacks: function(deferred) {
        var _this4 = this;
        deferred.fail(function() {
            for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4]
            }
            if (args[0] === _utils2.CANCELED_TOKEN) {
                return
            }
            _this4._eventsStrategy.fireEvent("loadError", args)
        })
    },
    _fireChanged: function(args) {
        var date = new Date;
        this._eventsStrategy.fireEvent("changed", args);
        this._changedTime = new Date - date
    },
    _scheduleChangedCallbacks: function(deferred) {
        var _this5 = this;
        deferred.done(function() {
            return _this5._fireChanged()
        })
    },
    loadSingle: function(propName, propValue) {
        var _this6 = this;
        var d = new _deferred.Deferred;
        var key = this.key();
        var store = this._store;
        var options = this._createStoreLoadOptions();
        var handleDone = function(data) {
            if (!(0, _type.isDefined)(data) || (0, _array.isEmpty)(data)) {
                d.reject(new _errors.default.errors.Error("E4009"))
            } else {
                if (!Array.isArray(data)) {
                    data = [data]
                }
                d.resolve(_this6._applyMapFunction(data)[0])
            }
        };
        this._scheduleFailCallbacks(d);
        if (arguments.length < 2) {
            propValue = propName;
            propName = key
        }
        delete options.skip;
        delete options.group;
        delete options.refresh;
        delete options.pageIndex;
        delete options.searchString;
        var shouldForceByKey = function() {
            return store instanceof _custom_store.default && !store._byKeyViaLoad()
        };
        (function() {
            if (propName === key || shouldForceByKey()) {
                return store.byKey(propValue, options)
            }
            options.take = 1;
            options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
            return store.load(options)
        })().fail(d.reject).done(handleDone);
        return d.promise()
    },
    load: function() {
        var _this7 = this;
        var d = new _deferred.Deferred;
        var loadTask = function() {
            if (_this7._disposed) {
                return
            }
            if (!(0, _utils2.isPending)(d)) {
                return
            }
            return _this7._loadFromStore(loadOperation, d)
        };
        this._scheduleLoadCallbacks(d);
        this._scheduleFailCallbacks(d);
        this._scheduleChangedCallbacks(d);
        var loadOperation = this._createLoadOperation(d);
        this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
        this._loadQueue.add(function() {
            if ("number" === typeof loadOperation.delay) {
                _this7._delayedLoadTask = (0, _common.executeAsync)(loadTask, loadOperation.delay)
            } else {
                loadTask()
            }
            return d.promise()
        });
        return d.promise({
            operationId: loadOperation.operationId
        })
    },
    _onPush: function(changes) {
        var _this8 = this;
        if (this._reshapeOnPush) {
            this.load()
        } else {
            this._eventsStrategy.fireEvent("changing", [{
                changes: changes
            }]);
            var group = this.group();
            var items = this.items();
            var groupLevel = 0;
            var dataSourceChanges = this.paginate() || group ? changes.filter(function(item) {
                return "update" === item.type
            }) : changes;
            if (group) {
                groupLevel = Array.isArray(group) ? group.length : 1
            }
            if (this._mapFunc) {
                dataSourceChanges.forEach(function(item) {
                    if ("insert" === item.type) {
                        item.data = _this8._mapFunc(item.data)
                    }
                })
            }(0, _array_utils.applyBatch)({
                keyInfo: this.store(),
                data: items,
                changes: dataSourceChanges,
                groupCount: groupLevel,
                useInsertIndex: true
            });
            this._fireChanged([{
                changes: changes
            }])
        }
    },
    _createLoadOperation: function(deferred) {
        var _this9 = this;
        var operationId = this._operationManager.add(deferred);
        var storeLoadOptions = this._createStoreLoadOptions();
        deferred.always(function() {
            return _this9._operationManager.remove(operationId)
        });
        return {
            operationId: operationId,
            storeLoadOptions: storeLoadOptions
        }
    },
    reload: function() {
        var store = this.store();
        if (store instanceof _custom_store.default) {
            store.clearRawDataCache()
        }
        this._init();
        return this.load()
    },
    cancel: function(operationId) {
        return this._operationManager.cancel(operationId)
    },
    cancelAll: function() {
        return this._operationManager.cancelAll()
    },
    _addSearchOptions: function(storeLoadOptions) {
        if (this._disposed) {
            return
        }
        if (this.store()._useDefaultSearch) {
            this._addSearchFilter(storeLoadOptions)
        } else {
            storeLoadOptions.searchOperation = this._searchOperation;
            storeLoadOptions.searchValue = this._searchValue;
            storeLoadOptions.searchExpr = this._searchExpr
        }
    },
    _createStoreLoadOptions: function() {
        var result = (0, _extend.extend)({}, this._storeLoadOptions);
        this._addSearchOptions(result);
        if (this._paginate) {
            if (this._pageSize) {
                result.skip = this._pageIndex * this._pageSize;
                result.take = this._pageSize
            }
        }
        result.userData = this._userData;
        return result
    },
    _addSearchFilter: function(storeLoadOptions) {
        var value = this._searchValue;
        var op = this._searchOperation;
        var selector = this._searchExpr;
        var searchFilter = [];
        if (!value) {
            return
        }
        if (!selector) {
            selector = "this"
        }
        if (!Array.isArray(selector)) {
            selector = [selector]
        }(0, _iterator.each)(selector, function(i, item) {
            if (searchFilter.length) {
                searchFilter.push("or")
            }
            searchFilter.push([item, op, value])
        });
        if (storeLoadOptions.filter) {
            storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter]
        } else {
            storeLoadOptions.filter = searchFilter
        }
    },
    _loadFromStore: function(loadOptions, pendingDeferred) {
        var _this10 = this;
        var handleSuccess = function(data, extra) {
            if (_this10._disposed) {
                return
            }
            if (!(0, _utils2.isPending)(pendingDeferred)) {
                return
            }
            var loadResult = (0, _extend.extend)((0, _utils2.normalizeLoadResult)(data, extra), loadOptions);
            _this10._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
            (0, _deferred.when)(loadResult.data).done(function(data) {
                loadResult.data = data;
                _this10._processStoreLoadResult(loadResult, pendingDeferred)
            }).fail(pendingDeferred.reject)
        };
        if (loadOptions.data) {
            return (new _deferred.Deferred).resolve(loadOptions.data).done(handleSuccess)
        }
        return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject)
    },
    _processStoreLoadResult: function(loadResult, pendingDeferred) {
        var _this11 = this;
        var data = loadResult.data;
        var extra = loadResult.extra;
        var storeLoadOptions = loadResult.storeLoadOptions;
        var resolvePendingDeferred = function() {
            _this11._isLoaded = true;
            _this11._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
            return pendingDeferred.resolve(data, extra)
        };
        var proceedLoadingTotalCount = function() {
            _this11.store().totalCount(storeLoadOptions).done(function(count) {
                extra.totalCount = count;
                resolvePendingDeferred()
            }).fail(pendingDeferred.reject)
        };
        if (this._disposed) {
            return
        }
        data = this._applyPostProcessFunction(this._applyMapFunction(data));
        if (!(0, _type.isPlainObject)(extra)) {
            extra = {}
        }
        this._items = data;
        if (!data.length || !this._paginate || this._pageSize && data.length < this._pageSize) {
            this._isLastPage = true
        }
        if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
            proceedLoadingTotalCount()
        } else {
            resolvePendingDeferred()
        }
    },
    _applyMapFunction: function(data) {
        if (this._mapFunc) {
            return (0, _utils2.mapDataRespectingGrouping)(data, this._mapFunc, this.group())
        }
        return data
    },
    _applyPostProcessFunction: function(data) {
        if (this._postProcessFunc) {
            return this._postProcessFunc(data)
        }
        return data
    },
    on: function(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    },
    off: function(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    }
});
exports.DataSource = DataSource;
