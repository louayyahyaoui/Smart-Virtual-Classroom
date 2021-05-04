/**
 * DevExtreme (ui/tree_list/ui.tree_list.state_storing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _extend = require("../../core/utils/extend");
var _uiGrid_core = _interopRequireDefault(require("../grid_core/ui.grid_core.state_storing"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var origApplyState = _uiGrid_core.default.extenders.controllers.stateStoring.applyState;
_uiTree_list.default.registerModule("stateStoring", (0, _extend.extend)(true, {}, _uiGrid_core.default, {
    extenders: {
        controllers: {
            stateStoring: {
                applyState: function(state) {
                    origApplyState.apply(this, arguments);
                    if (Object.prototype.hasOwnProperty.call(state, "expandedRowKeys")) {
                        this.option("expandedRowKeys", state.expandedRowKeys && state.expandedRowKeys.slice())
                    }
                }
            },
            data: {
                getUserState: function() {
                    var state = this.callBase.apply(this, arguments);
                    if (!this.option("autoExpandAll")) {
                        state.expandedRowKeys = this.option("expandedRowKeys")
                    }
                    return state
                }
            }
        }
    }
}));
