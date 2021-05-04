/**
 * DevExtreme (viz/sankey/layout.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _graph = _interopRequireDefault(require("./graph"));
var _data_validator = _interopRequireDefault(require("./data_validator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var _SPLINE_TENSION = .3;
var _ALIGNMENT_CENTER = "center";
var _ALIGNMENT_BOTTOM = "bottom";
var _ALIGNMENT_DEFAULT = _ALIGNMENT_CENTER;
var layout = {
    _weightPerPixel: null,
    _getCascadeIdx: function(nodeTitle, cascadesConfig) {
        var nodeInfo = cascadesConfig.filter(function(c) {
            return c.name === nodeTitle
        })[0];
        if (nodeInfo.outgoing.length > 0) {
            return nodeInfo.lp
        } else {
            return _graph.default.routines.maxOfArray(cascadesConfig.map(function(c) {
                return c.lp
            }))
        }
    },
    _getInWeightForNode: function(nodeTitle, links) {
        var w = 0;
        links.forEach(function(link) {
            if (link[1] === nodeTitle) {
                w += link[2]
            }
        });
        return w
    },
    _getOutWeightForNode: function(nodeTitle, links) {
        var w = 0;
        links.forEach(function(link) {
            if (link[0] === nodeTitle) {
                w += link[2]
            }
        });
        return w
    },
    _computeCascades: function(links) {
        var _this = this;
        var cascadesConfig = _graph.default.struct.computeLongestPaths(links);
        var maxCascade = _graph.default.routines.maxOfArray(cascadesConfig.map(function(c) {
            return c.lp
        }));
        var cascades = [];
        for (var i = 0; i < maxCascade + 1; i++) {
            cascades.push({})
        }
        links.forEach(function(link) {
            var cascade = cascades[_this._getCascadeIdx(link[0], cascadesConfig)];
            if (!cascade[link[0]]) {
                cascade[link[0]] = {
                    nodeTitle: link[0]
                }
            }
            cascade = cascades[_this._getCascadeIdx(link[1], cascadesConfig)];
            if (!cascade[link[1]]) {
                cascade[link[1]] = {
                    nodeTitle: link[1]
                }
            }
        });
        cascades.forEach(function(cascade) {
            Object.keys(cascade).forEach(function(nodeTitle) {
                var node = cascade[nodeTitle];
                node.inWeight = _this._getInWeightForNode(node.nodeTitle, links);
                node.outWeight = _this._getOutWeightForNode(node.nodeTitle, links);
                node.maxWeight = Math.max(node.inWeight, node.outWeight)
            })
        });
        return cascades
    },
    _getWeightForCascade: function(cascades, cascadeIdx) {
        var wMax = 0;
        var cascade = cascades[cascadeIdx];
        Object.keys(cascade).forEach(function(nodeTitle) {
            wMax += Math.max(cascade[nodeTitle].inWeight, cascade[nodeTitle].outWeight)
        });
        return wMax
    },
    _getMaxWeightThroughCascades: function(cascades) {
        var max = [];
        cascades.forEach(function(cascade) {
            var mW = 0;
            Object.keys(cascade).forEach(function(nodeTitle) {
                var node = cascade[nodeTitle];
                mW += Math.max(node.inWeight, node.outWeight)
            });
            max.push(mW)
        });
        return _graph.default.routines.maxOfArray(max)
    },
    _computeNodes: function(cascades, options) {
        var _this2 = this;
        var rects = [];
        var maxWeight = this._getMaxWeightThroughCascades(cascades);
        var maxNodeNum = _graph.default.routines.maxOfArray(cascades.map(function(nodesInCascade) {
            return Object.keys(nodesInCascade).length
        }));
        var nodePadding = options.nodePadding;
        var heightAvailable = options.height - nodePadding * (maxNodeNum - 1);
        if (heightAvailable < 0) {
            nodePadding = 0;
            heightAvailable = options.height - nodePadding * (maxNodeNum - 1)
        }
        this._weightPerPixel = maxWeight / heightAvailable;
        var cascadeIdx = 0;
        cascades.forEach(function(cascade) {
            var cascadeRects = [];
            var y = 0;
            var nodesInCascade = Object.keys(cascade).length;
            var cascadeHeight = _this2._getWeightForCascade(cascades, cascadeIdx) / _this2._weightPerPixel + nodePadding * (nodesInCascade - 1);
            var cascadeAlign = _ALIGNMENT_DEFAULT;
            if (Array.isArray(options.nodeAlign)) {
                cascadeAlign = cascadeIdx < options.nodeAlign.length ? options.nodeAlign[cascadeIdx] : _ALIGNMENT_DEFAULT
            } else {
                cascadeAlign = options.nodeAlign
            }
            if (cascadeAlign === _ALIGNMENT_BOTTOM) {
                y = options.height - cascadeHeight
            } else {
                if (cascadeAlign === _ALIGNMENT_CENTER) {
                    y = .5 * (options.height - cascadeHeight)
                }
            }
            y = Math.round(y);
            Object.keys(cascade).forEach(function(nodeTitle) {
                cascade[nodeTitle].sort = _this2._sort && Object.prototype.hasOwnProperty.call(_this2._sort, nodeTitle) ? _this2._sort[nodeTitle] : 1
            });
            Object.keys(cascade).sort(function(a, b) {
                return cascade[a].sort - cascade[b].sort
            }).forEach(function(nodeTitle) {
                var node = cascade[nodeTitle];
                var height = Math.floor(heightAvailable * node.maxWeight / maxWeight);
                var x = Math.round(cascadeIdx * options.width / (cascades.length - 1)) - (0 === cascadeIdx ? 0 : options.nodeWidth);
                var rect = {};
                rect._name = nodeTitle;
                rect.width = options.nodeWidth;
                rect.height = height;
                rect.x = x + options.x;
                rect.y = y + options.y;
                y += height + nodePadding;
                cascadeRects.push(rect)
            });
            cascadeIdx++;
            rects.push(cascadeRects)
        });
        return rects
    },
    _findRectByName: function(rects, name) {
        for (var c = 0; c < rects.length; c++) {
            for (var r = 0; r < rects[c].length; r++) {
                if (name === rects[c][r]._name) {
                    return rects[c][r]
                }
            }
        }
        return null
    },
    _findIndexByName: function(rects, nodeTitle) {
        var index = 0;
        for (var c = 0; c < rects.length; c++) {
            for (var r = 0; r < rects[c].length; r++) {
                if (nodeTitle === rects[c][r]._name) {
                    return index
                }
                index++
            }
        }
        return null
    },
    _computeLinks: function(links, rects, cascades) {
        var _this3 = this;
        var yOffsets = {};
        var paths = [];
        var result = [];
        cascades.forEach(function(cascade) {
            Object.keys(cascade).forEach(function(nodeTitle) {
                yOffsets[nodeTitle] = {
                    "in": 0,
                    out: 0
                }
            })
        });
        rects.forEach(function(rectsOfCascade) {
            rectsOfCascade.forEach(function(nodeRect) {
                var nodeTitle = nodeRect._name;
                var rectFrom = _this3._findRectByName(rects, nodeTitle);
                var linksFromNode = links.filter(function(link) {
                    return link[0] === nodeTitle
                });
                linksFromNode.forEach(function(link) {
                    link.sort = _this3._findIndexByName(rects, link[1])
                });
                linksFromNode.sort(function(a, b) {
                    return a.sort - b.sort
                }).forEach(function(link) {
                    var rectTo = _this3._findRectByName(rects, link[1]);
                    var height = Math.round(link[2] / _this3._weightPerPixel);
                    var yOffsetFrom = yOffsets[link[0]].out;
                    var yOffsetTo = yOffsets[link[1]].in;
                    var heightFrom = yOffsets[link[0]].out + height > rectFrom.height ? rectFrom.height - yOffsets[link[0]].out : height;
                    var heightTo = yOffsets[link[1]].in + height > rectTo.height ? rectTo.height - yOffsets[link[1]].in : height;
                    paths.push({
                        from: {
                            x: rectFrom.x,
                            y: rectFrom.y + yOffsetFrom,
                            width: rectFrom.width,
                            height: heightFrom,
                            node: rectFrom,
                            weight: link[2]
                        },
                        to: {
                            x: rectTo.x,
                            y: rectTo.y + yOffsetTo,
                            width: rectTo.width,
                            height: heightTo,
                            node: rectTo
                        }
                    });
                    yOffsets[link[0]].out += height;
                    yOffsets[link[1]].in += height
                })
            })
        });
        paths.forEach(function(link) {
            var path = {
                d: _this3._spline(link.from, link.to),
                _boundingRect: {
                    x: link.from.x + link.from.width,
                    y: Math.min(link.from.y, link.to.y),
                    width: link.to.x - (link.from.x + link.from.width),
                    height: Math.max(link.from.x + link.from.height, link.to.y + link.to.height) - Math.min(link.from.y, link.to.y)
                },
                _weight: link.from.weight,
                _from: link.from.node,
                _to: link.to.node
            };
            result.push(path)
        });
        this._fitAllNodesHeight(rects, paths);
        return result
    },
    _fitNodeHeight: function(nodeName, nodeRects, paths) {
        var targetRect = this._findRectByName(nodeRects, nodeName);
        var heightOfLinksSummaryIn = 0;
        var heightOfLinksSummaryOut = 0;
        paths.forEach(function(path) {
            if (path.from.node._name === nodeName) {
                heightOfLinksSummaryOut += path.from.height
            }
            if (path.to.node._name === nodeName) {
                heightOfLinksSummaryIn += path.to.height
            }
        });
        targetRect.height = Math.max(heightOfLinksSummaryIn, heightOfLinksSummaryOut)
    },
    _fitAllNodesHeight: function(nodeRects, paths) {
        for (var c = 0; c < nodeRects.length; c++) {
            for (var r = 0; r < nodeRects[c].length; r++) {
                this._fitNodeHeight(nodeRects[c][r]._name, nodeRects, paths)
            }
        }
    },
    _spline: function(rectLeft, rectRight) {
        var p_UpLeft = {
            x: rectLeft.x + rectLeft.width,
            y: rectLeft.y
        };
        var p_DownLeft = {
            x: rectLeft.x + rectLeft.width,
            y: rectLeft.y + rectLeft.height
        };
        var p_UpRight = {
            x: rectRight.x,
            y: rectRight.y
        };
        var p_DownRight = {
            x: rectRight.x,
            y: rectRight.y + rectRight.height
        };
        var curve_width = _SPLINE_TENSION * (p_UpRight.x - p_UpLeft.x);
        var result = "M ".concat(p_UpLeft.x, " ").concat(p_UpLeft.y, " C ").concat(p_UpLeft.x + curve_width, " ").concat(p_UpLeft.y, " ").concat(p_UpRight.x - curve_width, " ").concat(p_UpRight.y, " ").concat(p_UpRight.x, " ").concat(p_UpRight.y, " L ").concat(p_DownRight.x, " ").concat(p_DownRight.y, " C ").concat(p_DownRight.x - curve_width, " ").concat(p_DownRight.y, " ").concat(p_DownLeft.x + curve_width, " ").concat(p_DownLeft.y, " ").concat(p_DownLeft.x, " ").concat(p_DownLeft.y, " Z");
        return result
    },
    computeLayout: function(linksData, sortData, options, incidentOccurred) {
        this._sort = sortData;
        var result = {};
        var validateResult = _data_validator.default.validate(linksData, incidentOccurred);
        if (!validateResult) {
            result.cascades = this._computeCascades(linksData);
            result.nodes = this._computeNodes(result.cascades, {
                width: options.availableRect.width,
                height: options.availableRect.height,
                x: options.availableRect.x,
                y: options.availableRect.y,
                nodePadding: options.nodePadding,
                nodeWidth: options.nodeWidth,
                nodeAlign: options.nodeAlign
            });
            result.links = this._computeLinks(linksData, result.nodes, result.cascades)
        } else {
            result.error = validateResult
        }
        return result
    },
    overlap: function(box1, box2) {
        return !(box2.x > box1.x + box1.width || box2.x + box2.width < box1.x || box2.y >= box1.y + box1.height || box2.y + box2.height <= box1.y)
    }
};
var _default = layout;
exports.default = _default;
module.exports = exports.default;
