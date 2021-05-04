"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var point_1 = require("./point");
var vector_1 = require("./vector");
var segment_1 = require("./segment");
var polygonal_chain_1 = require("./polygonal-chain");
var Polygon = (function (_super) {
    tslib_1.__extends(Polygon, _super);
    function Polygon() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Polygon.prototype, "numEdges", {
        get: function () {
            return this.points.length;
        },
        enumerable: true,
        configurable: true
    });
    Polygon.fromRectangle = function (rect) {
        var right = rect.x + rect.width;
        var bottom = rect.y + rect.height;
        return new Polygon([
            new point_1.Point(rect.x, rect.y),
            new point_1.Point(right, rect.y),
            new point_1.Point(right, bottom),
            new point_1.Point(rect.x, bottom)
        ]);
    };
    Polygon.prototype.getEdge = function (edgeIndex) {
        return new segment_1.Segment(this.points[edgeIndex], this.points[(edgeIndex + 1) % this.numEdges]);
    };
    Polygon.collision = function (a, b) {
        var edgeCountA = a.numEdges;
        var edgeCountB = b.numEdges;
        var intersect = false;
        for (var edgeIndex = 0; edgeIndex < edgeCountA + edgeCountB; edgeIndex++) {
            var edge = edgeIndex < edgeCountA ? a.getEdge(edgeIndex) : b.getEdge(edgeIndex - edgeCountA);
            var edgeVector = vector_1.Vector.fromSegment(edge);
            var axis = new vector_1.Vector(-edgeVector.y, edgeVector.x).normalize();
            var projectionA = a.projection(axis);
            var projectionB = b.projection(axis);
            var intersectionOfProjection = projectionA.minValue < projectionB.minValue ?
                projectionB.minValue - projectionA.maxValue :
                projectionA.minValue - projectionB.maxValue;
            if (intersectionOfProjection > 0)
                return CollisionResult.None;
            if (intersectionOfProjection < 0)
                intersect = true;
        }
        return intersect ? CollisionResult.Intersect : CollisionResult.Contact;
    };
    return Polygon;
}(polygonal_chain_1.PolygonalChain));
exports.Polygon = Polygon;
var CollisionResult;
(function (CollisionResult) {
    CollisionResult[CollisionResult["None"] = 0] = "None";
    CollisionResult[CollisionResult["Intersect"] = 1] = "Intersect";
    CollisionResult[CollisionResult["Contact"] = 2] = "Contact";
})(CollisionResult = exports.CollisionResult || (exports.CollisionResult = {}));
