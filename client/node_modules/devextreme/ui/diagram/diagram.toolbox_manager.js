/**
 * DevExtreme (ui/diagram/diagram.toolbox_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _message = _interopRequireDefault(require("../../localization/message"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DiagramToolboxManager = {
    getDefaultGroups: function() {
        return this._groups || (this._groups = {
            general: {
                category: "general",
                title: _message.default.format("dxDiagram-categoryGeneral")
            },
            flowchart: {
                category: "flowchart",
                title: _message.default.format("dxDiagram-categoryFlowchart")
            },
            orgChart: {
                category: "orgChart",
                title: _message.default.format("dxDiagram-categoryOrgChart")
            },
            containers: {
                category: "containers",
                title: _message.default.format("dxDiagram-categoryContainers")
            },
            custom: {
                category: "custom",
                title: _message.default.format("dxDiagram-categoryCustom")
            }
        })
    },
    getGroups: function(groups) {
        var defaultGroups = this.getDefaultGroups();
        if (groups) {
            return groups.map(function(g) {
                if ("string" === typeof g) {
                    return {
                        category: g,
                        title: defaultGroups[g] && defaultGroups[g].title || g
                    }
                }
                return g
            }).filter(function(g) {
                return g
            })
        }
        return [defaultGroups.general, defaultGroups.flowchart, defaultGroups.orgChart, defaultGroups.containers]
    }
};
var _default = DiagramToolboxManager;
exports.default = _default;
module.exports = exports.default;
