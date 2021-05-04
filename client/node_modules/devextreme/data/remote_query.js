/**
 * DevExtreme (data/remote_query.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _query_adapters = _interopRequireDefault(require("./query_adapters"));
var _errors = _interopRequireDefault(require("./errors"));
var _iterator = require("../core/utils/iterator");
var _type = require("../core/utils/type");
var _deferred = require("../core/utils/deferred");
var _array_query = _interopRequireDefault(require("./array_query"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var remoteQueryImpl = function remoteQueryImpl(url, queryOptions, tasks) {
    tasks = tasks || [];
    queryOptions = queryOptions || {};
    var createTask = function(name, args) {
        return {
            name: name,
            args: args
        }
    };
    var exec = function(executorTask) {
        var d = new _deferred.Deferred;
        var _adapterFactory;
        var _adapter;
        var _taskQueue;
        var _currentTask;
        var _mergedSortArgs;
        var rejectWithNotify = function(error) {
            var handler = queryOptions.errorHandler;
            if (handler) {
                handler(error)
            }
            _errors.default._errorHandler(error);
            d.reject(error)
        };

        function mergeSortTask(task) {
            switch (task.name) {
                case "sortBy":
                    _mergedSortArgs = [task.args];
                    return true;
                case "thenBy":
                    if (!_mergedSortArgs) {
                        throw _errors.default.errors.Error("E4004")
                    }
                    _mergedSortArgs.push(task.args);
                    return true
            }
            return false
        }

        function unmergeSortTasks() {
            var head = _taskQueue[0];
            var unmergedTasks = [];
            if (head && "multiSort" === head.name) {
                _taskQueue.shift();
                (0, _iterator.each)(head.args[0], function() {
                    unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this))
                })
            }
            _taskQueue = unmergedTasks.concat(_taskQueue)
        }
        try {
            _adapterFactory = queryOptions.adapter;
            if (!(0, _type.isFunction)(_adapterFactory)) {
                _adapterFactory = _query_adapters.default[_adapterFactory]
            }
            _adapter = _adapterFactory(queryOptions);
            _taskQueue = [].concat(tasks).concat(executorTask);
            var optimize = _adapter.optimize;
            if (optimize) {
                optimize(_taskQueue)
            }
            while (_taskQueue.length) {
                _currentTask = _taskQueue[0];
                if (!mergeSortTask(_currentTask)) {
                    if (_mergedSortArgs) {
                        _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
                        _mergedSortArgs = null;
                        continue
                    }
                    if ("enumerate" !== String(_currentTask.name)) {
                        if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
                            break
                        }
                    }
                }
                _taskQueue.shift()
            }
            unmergeSortTasks();
            _adapter.exec(url).done(function(result, extra) {
                if (!_taskQueue.length) {
                    d.resolve(result, extra)
                } else {
                    var clientChain = (0, _array_query.default)(result, {
                        errorHandler: queryOptions.errorHandler
                    });
                    (0, _iterator.each)(_taskQueue, function() {
                        clientChain = clientChain[this.name].apply(clientChain, this.args)
                    });
                    clientChain.done(d.resolve).fail(d.reject)
                }
            }).fail(rejectWithNotify)
        } catch (x) {
            rejectWithNotify(x)
        }
        return d.promise()
    };
    var query = {};
    (0, _iterator.each)(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
        var name = String(this);
        query[name] = function() {
            return remoteQueryImpl(url, queryOptions, tasks.concat(createTask(name, arguments)))
        }
    });
    (0, _iterator.each)(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
        var name = String(this);
        query[name] = function() {
            return exec.call(this, createTask(name, arguments))
        }
    });
    return query
};
var _default = remoteQueryImpl;
exports.default = _default;
module.exports = exports.default;
