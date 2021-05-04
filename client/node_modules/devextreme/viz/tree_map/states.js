/**
 * DevExtreme (viz/tree_map/states.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _tree_map = _interopRequireDefault(require("./tree_map.base"));
var _node = _interopRequireDefault(require("./node"));
var _common = require("../../core/utils/common");
var _extend2 = require("../../core/utils/extend");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var proto = _tree_map.default.prototype;
var nodeProto = _node.default.prototype;
var handlers = proto._handlers;
var _calculateState = handlers.calculateState;
var _buildState = nodeProto._buildState;
handlers.calculateState = function(options) {
    var states = {
        0: _calculateState(options)
    };
    handlers.calculateAdditionalStates(states, options);
    return states
};
handlers.calculateAdditionalStates = _common.noop;
nodeProto.code = 0;
nodeProto.statesMap = {
    0: 0
};
nodeProto.additionalStates = [];
nodeProto._buildState = function(state, extra) {
    var states = {
        0: _buildState(state[0], extra)
    };
    if (this.additionalStates.length) {
        buildAdditionalStates(states, states[0], state, this.additionalStates)
    }
    return states
};
nodeProto._getState = function() {
    return this.state[this.statesMap[this.code]]
};
nodeProto.setState = function(code, state) {
    if (state) {
        this.code |= code
    } else {
        this.code &= ~code
    }
    this.ctx.change(["TILES"])
};

function buildAdditionalStates(states, base, source, list) {
    var i;
    var ii = list.length;
    for (i = 0; i < ii; ++i) {
        states[list[i]] = (0, _extend2.extend)({}, base, source[list[i]])
    }
}
