/**
 * DevExtreme (viz/sankey/graph.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var WHITE = "white";
var GRAY = "gray";
var BLACK = "black";
var routines = {
    maxOfArray: function(arr, callback) {
        var m = 0;
        var callback_function = function(v) {
            return v
        };
        if (callback) {
            callback_function = callback
        }
        for (var i = 0; i < arr.length; i++) {
            if (callback_function(arr[i]) > m) {
                m = callback_function(arr[i])
            }
        }
        return m
    }
};
var getVertices = function(links) {
    var vert = [];
    links.forEach(function(link) {
        if (vert.indexOf(link[0]) === -1) {
            vert.push(link[0])
        }
        if (vert.indexOf(link[1]) === -1) {
            vert.push(link[1])
        }
    });
    return vert
};
var getAdjacentVertices = function(links, vertex) {
    var avert = [];
    links.forEach(function(link) {
        if (link[0] === vertex && avert.indexOf(link[1]) === -1) {
            avert.push(link[1])
        }
    });
    return avert
};
var getReverseAdjacentVertices = function(links, vertex) {
    var avert = [];
    links.forEach(function(link) {
        if (link[1] === vertex && avert.indexOf(link[0]) === -1) {
            avert.push(link[0])
        }
    });
    return avert
};
var struct = {
    _hasCycle: false,
    _sortedList: [],
    hasCycle: function(links) {
        var _this = this;
        this._hasCycle = false;
        this._sortedList = [];
        var vertices = {};
        var allVertices = getVertices(links);
        allVertices.forEach(function(vertex) {
            vertices[vertex] = {
                color: WHITE
            }
        });
        allVertices.forEach(function(vertex) {
            if (vertices[vertex].color === WHITE) {
                _this._depthFirstSearch(links, vertices, vertex)
            }
        });
        this._sortedList.reverse();
        return this._hasCycle
    },
    _depthFirstSearch: function(links, vertices, vertex) {
        vertices[vertex].color = GRAY;
        var averts = getAdjacentVertices(links, vertex);
        for (var a = 0; a < averts.length; a++) {
            if (vertices[averts[a]].color === WHITE) {
                this._depthFirstSearch(links, vertices, averts[a])
            } else {
                if (vertices[averts[a]].color === GRAY) {
                    this._hasCycle = true
                }
            }
        }
        this._sortedList.push({
            name: vertex,
            lp: null,
            incoming: getReverseAdjacentVertices(links, vertex),
            outgoing: getAdjacentVertices(links, vertex)
        });
        vertices[vertex].color = BLACK
    },
    computeLongestPaths: function(links) {
        var sortedVertices = this._sortedList;
        sortedVertices.forEach(function(vertex) {
            var averts = getReverseAdjacentVertices(links, vertex.name);
            if (0 === averts.length) {
                vertex.lp = 0
            } else {
                var maxLP = [];
                averts.forEach(function(adjacentVertex) {
                    maxLP.push(sortedVertices.filter(function(sv) {
                        return sv.name === adjacentVertex
                    })[0].lp)
                });
                vertex.lp = routines.maxOfArray(maxLP) + 1
            }
        });
        return this._sortedList
    }
};
var _default = {
    struct: struct,
    routines: routines,
    getVertices: getVertices,
    getAdjacentVertices: getAdjacentVertices,
    getReverseAdjacentVertices: getReverseAdjacentVertices
};
exports.default = _default;
module.exports = exports.default;
