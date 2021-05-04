/**
 * DevExtreme (integration/knockout/clean_node.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _element_data = require("../../core/element_data");
var _knockout = _interopRequireDefault(require("knockout"));
var _version = require("../../core/utils/version");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_knockout.default) {
    var originalKOCleanExternalData = _knockout.default.utils.domNodeDisposal.cleanExternalData;
    var patchCleanData = function() {
        (0, _element_data.afterCleanData)(function(nodes) {
            var i;
            for (i = 0; i < nodes.length; i++) {
                nodes[i].cleanedByJquery = true
            }
            for (i = 0; i < nodes.length; i++) {
                if (!nodes[i].cleanedByKo) {
                    _knockout.default.cleanNode(nodes[i])
                }
                delete nodes[i].cleanedByKo
            }
            for (i = 0; i < nodes.length; i++) {
                delete nodes[i].cleanedByJquery
            }
        });
        _knockout.default.utils.domNodeDisposal.cleanExternalData = function(node) {
            node.cleanedByKo = true;
            if (!node.cleanedByJquery) {
                (0, _element_data.cleanData)([node])
            }
        }
    };
    var restoreOriginCleanData = function() {
        (0, _element_data.afterCleanData)(function() {});
        _knockout.default.utils.domNodeDisposal.cleanExternalData = originalKOCleanExternalData
    };
    patchCleanData();
    _element_data.strategyChanging.add(function(strategy) {
        var isJQuery = !!strategy.fn;
        if (isJQuery && (0, _version.compare)(strategy.fn.jquery, [2, 0]) < 0) {
            restoreOriginCleanData()
        }
    })
}
