/**
 * DevExtreme (viz/vector_map/projection.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "projection", {
    enumerable: true,
    get: function() {
        return _projection.projection
    }
});
var _projection = require("./projection.main");
var _min = Math.min;
var _max = Math.max;
var _sin = Math.sin;
var _asin = Math.asin;
var _tan = Math.tan;
var _atan = Math.atan;
var _exp = Math.exp;
var _log = Math.log;
var PI = Math.PI;
var PI_DIV_4 = PI / 4;
var GEO_LON_BOUND = 180;
var GEO_LAT_BOUND = 90;
var RADIANS = PI / 180;
var MERCATOR_LAT_BOUND = (2 * _atan(_exp(PI)) - PI / 2) / RADIANS;
var MILLER_LAT_BOUND = (2.5 * _atan(_exp(.8 * PI)) - .625 * PI) / RADIANS;

function clamp(value, threshold) {
    return _max(_min(value, +threshold), -threshold)
}
_projection.projection.add("mercator", (0, _projection.projection)({
    aspectRatio: 1,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, _log(_tan(PI_DIV_4 + clamp(coordinates[1], MERCATOR_LAT_BOUND) * RADIANS / 2)) / PI]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, (2 * _atan(_exp(coordinates[1] * PI)) - PI / 2) / RADIANS]
    }
}));
_projection.projection.add("equirectangular", (0, _projection.projection)({
    aspectRatio: 2,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, coordinates[1] / GEO_LAT_BOUND]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, coordinates[1] * GEO_LAT_BOUND]
    }
}));
_projection.projection.add("lambert", (0, _projection.projection)({
    aspectRatio: 2,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, _sin(clamp(coordinates[1], GEO_LAT_BOUND) * RADIANS)]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, _asin(clamp(coordinates[1], 1)) / RADIANS]
    }
}));
_projection.projection.add("miller", (0, _projection.projection)({
    aspectRatio: 1,
    to: function(coordinates) {
        return [coordinates[0] / GEO_LON_BOUND, 1.25 * _log(_tan(PI_DIV_4 + clamp(coordinates[1], MILLER_LAT_BOUND) * RADIANS * .4)) / PI]
    },
    from: function(coordinates) {
        return [coordinates[0] * GEO_LON_BOUND, (2.5 * _atan(_exp(.8 * coordinates[1] * PI)) - .625 * PI) / RADIANS]
    }
}));
