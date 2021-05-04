/**
 * DevExtreme (viz/tree_map/selection.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
var _node = _interopRequireDefault(require("./node"));
var _helpers = require("../core/helpers");
var _common = require("./common");
var _utils = require("../core/utils");
var _array = require("../../core/utils/array");
require("./api");
require("./states");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var proto = _tree_map.default.prototype;
var nodeProto = _node.default.prototype;
var MODE_NONE = 0;
var MODE_SINGLE = 1;
var MODE_MULTIPLE = 2;
var STATE_CODE = 2;
proto._eventsMap.onSelectionChanged = {
    name: "selectionChanged"
};
(0, _helpers.expand)(proto._handlers, "calculateAdditionalStates", function(states, options) {
    states[2] = options.selectionStyle ? (0, _common.buildRectAppearance)(options.selectionStyle) : {}
});
nodeProto.statesMap[2] = nodeProto.statesMap[3] = STATE_CODE;
nodeProto.additionalStates.push(2);
(0, _helpers.expand)(proto, "_onNodesCreated", function() {
    this._selectionList.length = 0
});
(0, _helpers.expand)(proto, "_extendProxyType", function(proto) {
    var that = this;
    proto.select = function(state) {
        that._selectNode(this._id, !!state)
    };
    proto.isSelected = function() {
        return (0, _array.inArray)(this._id, that._selectionList) >= 0
    };
    that._selectionList = []
});
_tree_map.default.addChange({
    code: "SELECTION_MODE",
    handler: function() {
        var that = this;
        var option = (0, _utils.normalizeEnum)(that._getOption("selectionMode", true));
        var selectionList = that._selectionList;
        var tmp;
        var mode = "none" === option ? MODE_NONE : "multiple" === option ? MODE_MULTIPLE : MODE_SINGLE;
        if (mode === MODE_SINGLE && selectionList.length > 1) {
            tmp = selectionList.pop();
            that.clearSelection();
            selectionList.push(tmp)
        } else {
            if (mode === MODE_NONE) {
                that.clearSelection()
            }
        }
        that._selectionMode = mode
    },
    isThemeDependent: true,
    isOptionChange: true,
    option: "selectionMode"
});
(0, _helpers.expand)(proto, "_applyTilesAppearance", function() {
    if (this._selectionList.length) {
        bringSelectedTilesToForeground(this._nodes, this._selectionList)
    }
});
var tileToFront = [leafToFront, groupToFront];

function bringSelectedTilesToForeground(nodes, selectionList) {
    var i;
    var ii = selectionList.length;
    var node;
    for (i = 0; i < ii; ++i) {
        node = nodes[selectionList[i]];
        tileToFront[Number(node.isNode())](node.tile)
    }
}

function leafToFront(content) {
    content.toForeground()
}

function groupToFront(content) {
    content.outer.toForeground();
    content.inner.toForeground()
}
proto._applySelectionState = function(index, state) {
    var node = this._nodes[index];
    node.setState(STATE_CODE, state);
    this._eventTrigger("selectionChanged", {
        node: node.proxy
    })
};
proto._selectNode = function(index, state) {
    var that = this;
    var selectionList;
    var k;
    var tmp;
    if (that._selectionMode !== MODE_NONE) {
        that._context.suspend();
        selectionList = that._selectionList;
        k = (0, _array.inArray)(index, selectionList);
        if (state && k === -1) {
            if (that._selectionMode === MODE_SINGLE) {
                if (selectionList.length) {
                    tmp = selectionList.pop();
                    that._applySelectionState(tmp, false)
                }
            }
            selectionList.push(index);
            that._applySelectionState(index, true)
        } else {
            if (!state && k >= 0) {
                selectionList.splice(k, 1);
                that._applySelectionState(index, false)
            }
        }
        that._context.resume()
    }
};
proto.clearSelection = function() {
    var that = this;
    var selectionList = that._selectionList;
    var i;
    var ii = selectionList.length;
    if (that._selectionMode !== MODE_NONE) {
        that._context.suspend();
        for (i = 0; i < ii; ++i) {
            that._applySelectionState(selectionList[i], false)
        }
        selectionList.length = 0;
        that._context.resume()
    }
};
