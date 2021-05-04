/**
 * DevExtreme (viz/funnel/tracker.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugin = void 0;
var _funnel = _interopRequireDefault(require("./funnel"));
var _tracker = require("../components/tracker");
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DATA_KEY_BASE = "__funnel_data_";
var dataKeyModifier = 0;
var proto = _funnel.default.prototype;
proto._eventsMap.onItemClick = {
    name: "itemClick"
};
proto._eventsMap.onLegendClick = {
    name: "legendClick"
};
var getDataKey = function() {
    return DATA_KEY_BASE + dataKeyModifier++
};
var plugin = {
    name: "tracker",
    init: function() {
        var that = this;
        var dataKey = getDataKey();
        var getProxyData = function(e) {
            var rootOffset = that._renderer.getRootOffset();
            var x = Math.floor(e.pageX - rootOffset.left);
            var y = Math.floor(e.pageY - rootOffset.top);
            return that._hitTestTargets(x, y)
        };
        that._tracker = new _tracker.Tracker({
            widget: that,
            root: that._renderer.root,
            getData: function(e, tooltipData) {
                var target = e.target;
                var data = target[dataKey];
                if ((0, _type.isDefined)(data)) {
                    return data
                }
                var proxyData = getProxyData(e);
                if (tooltipData && proxyData && "inside-label" !== proxyData.type) {
                    return
                }
                return proxyData && proxyData.id
            },
            getNode: function(index) {
                return that._items[index]
            },
            click: function(e) {
                var proxyData = getProxyData(e.event);
                var dataType = proxyData && proxyData.type;
                var event = "legend" === dataType ? "legendClick" : "itemClick";
                that._eventTrigger(event, {
                    item: e.node,
                    event: e.event
                })
            }
        });
        this._dataKey = dataKey
    },
    dispose: function() {
        this._tracker.dispose()
    },
    extenders: {
        _change_TILING: function() {
            var dataKey = this._dataKey;
            this._items.forEach(function(item, index) {
                item.element.data(dataKey, index)
            })
        }
    }
};
exports.plugin = plugin;
