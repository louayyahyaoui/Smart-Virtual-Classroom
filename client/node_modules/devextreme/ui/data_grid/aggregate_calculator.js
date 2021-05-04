/**
 * DevExtreme (ui/data_grid/aggregate_calculator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _data = require("../../core/utils/data");
var _type = require("../../core/utils/type");
var _errors = _interopRequireDefault(require("../../data/errors"));
var _utils = _interopRequireDefault(require("../../data/utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function depthFirstSearch(i, depth, root, callback) {
    var j = 0;
    if (i < depth) {
        for (; j < root.items.length; j++) {
            depthFirstSearch(i + 1, depth, root.items[j], callback)
        }
    }
    if (i === depth) {
        callback(root)
    }
}

function map(array, callback) {
    var i;
    if ("map" in array) {
        return array.map(callback)
    }
    var result = new Array(array.length);
    for (i in array) {
        result[i] = callback(array[i], i)
    }
    return result
}

function isEmpty(x) {
    return x !== x || "" === x || null === x || void 0 === x
}

function isCount(aggregator) {
    return aggregator === _utils.default.aggregators.count
}

function normalizeAggregate(aggregate) {
    var selector = (0, _data.compileGetter)(aggregate.selector);
    var skipEmptyValues = "skipEmptyValues" in aggregate ? aggregate.skipEmptyValues : true;
    var aggregator = aggregate.aggregator;
    if ("string" === typeof aggregator) {
        aggregator = _utils.default.aggregators[aggregator];
        if (!aggregator) {
            throw _errors.default.errors.Error("E4001", aggregate.aggregator)
        }
    }
    return {
        selector: selector,
        aggregator: aggregator,
        skipEmptyValues: skipEmptyValues
    }
}
var _default = _class.default.inherit({
    ctor: function(options) {
        this._data = options.data;
        this._groupLevel = options.groupLevel || 0;
        this._totalAggregates = map(options.totalAggregates || [], normalizeAggregate);
        this._groupAggregates = map(options.groupAggregates || [], normalizeAggregate);
        this._totals = []
    },
    calculate: function() {
        if (this._totalAggregates.length) {
            this._calculateTotals(0, {
                items: this._data
            })
        }
        if (this._groupAggregates.length && this._groupLevel > 0) {
            this._calculateGroups({
                items: this._data
            })
        }
    },
    totalAggregates: function() {
        return this._totals
    },
    _aggregate: function(aggregates, data, container) {
        var length = data.items ? data.items.length : 0;
        for (var i = 0; i < aggregates.length; i++) {
            if (isCount(aggregates[i].aggregator)) {
                container[i] = (container[i] || 0) + length;
                continue
            }
            for (var j = 0; j < length; j++) {
                this._accumulate(i, aggregates[i], container, data.items[j])
            }
        }
    },
    _calculateTotals: function(level, data) {
        if (0 === level) {
            this._totals = this._seed(this._totalAggregates)
        }
        if (level === this._groupLevel) {
            this._aggregate(this._totalAggregates, data, this._totals)
        } else {
            for (var i = 0; i < data.items.length; i++) {
                this._calculateTotals(level + 1, data.items[i])
            }
        }
        if (0 === level) {
            this._totals = this._finalize(this._totalAggregates, this._totals)
        }
    },
    _calculateGroups: function(root) {
        var maxLevel = this._groupLevel;
        var currentLevel = maxLevel + 1;
        var seedFn = this._seed.bind(this, this._groupAggregates);
        var stepFn = this._aggregate.bind(this, this._groupAggregates);
        var finalizeFn = this._finalize.bind(this, this._groupAggregates);

        function aggregator(node) {
            node.aggregates = seedFn(currentLevel - 1);
            if (currentLevel === maxLevel) {
                stepFn(node, node.aggregates)
            } else {
                depthFirstSearch(currentLevel, maxLevel, node, function(innerNode) {
                    stepFn(innerNode, node.aggregates)
                })
            }
            node.aggregates = finalizeFn(node.aggregates)
        }
        while (--currentLevel > 0) {
            depthFirstSearch(0, currentLevel, root, aggregator)
        }
    },
    _seed: function(aggregates, groupIndex) {
        return map(aggregates, function(aggregate) {
            var aggregator = aggregate.aggregator;
            var seed = "seed" in aggregator ? (0, _type.isFunction)(aggregator.seed) ? aggregator.seed(groupIndex) : aggregator.seed : NaN;
            return seed
        })
    },
    _accumulate: function(aggregateIndex, aggregate, results, item) {
        var value = aggregate.selector(item);
        var aggregator = aggregate.aggregator;
        var skipEmptyValues = aggregate.skipEmptyValues;
        if (skipEmptyValues && isEmpty(value)) {
            return
        }
        if (results[aggregateIndex] !== results[aggregateIndex]) {
            results[aggregateIndex] = value
        } else {
            results[aggregateIndex] = aggregator.step(results[aggregateIndex], value)
        }
    },
    _finalize: function(aggregates, results) {
        return map(aggregates, function(aggregate, index) {
            var fin = aggregate.aggregator.finalize;
            return fin ? fin(results[index]) : results[index]
        })
    }
});
exports.default = _default;
module.exports = exports.default;
