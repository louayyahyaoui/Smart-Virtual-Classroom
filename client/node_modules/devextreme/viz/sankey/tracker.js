/**
 * DevExtreme (viz/sankey/tracker.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugin = void 0;
var _sankey = _interopRequireDefault(require("./sankey"));
var _tracker = require("../components/tracker");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var proto = _sankey.default.prototype;
var DATA_KEY_BASE = "__sankey_data_";
var dataKeyModifier = 0;
proto._eventsMap.onNodeClick = {
    name: "nodeClick"
};
proto._eventsMap.onLinkClick = {
    name: "linkClick"
};
var getDataKey = function() {
    return DATA_KEY_BASE + dataKeyModifier++
};
var plugin = {
    name: "tracker",
    init: function() {
        var that = this;
        var dataKey = getDataKey();
        that._tracker = new _tracker.Tracker({
            widget: that,
            root: that._renderer.root,
            getData: function(e) {
                var target = e.target;
                return target[dataKey]
            },
            getNode: function(index) {
                if (index < that._nodes.length) {
                    return that._nodes[index]
                } else {
                    return that._links[index - that._nodes.length]
                }
            },
            click: function(e) {
                var eventName = this.getData(e.event) < that._nodes.length ? "nodeClick" : "linkClick";
                that._eventTrigger(eventName, {
                    target: e.node,
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
        _change_LINKS_DRAW: function() {
            var dataKey = this._dataKey;
            this._nodes.concat(this._links).forEach(function(item, index) {
                item.element.data(dataKey, index)
            })
        }
    }
};
exports.plugin = plugin;
