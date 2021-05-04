"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Metrics = (function () {
    function Metrics() {
    }
    Metrics.euclideanDistance = function (a, b) {
        var xDist = a.x - b.x;
        var yDist = a.y - b.y;
        return Math.sqrt(xDist * xDist + yDist * yDist);
    };
    Metrics.manhattanDistance = function (a, b) {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    };
    return Metrics;
}());
exports.Metrics = Metrics;
