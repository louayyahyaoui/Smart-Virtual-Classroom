/**
 * DevExtreme (ui/map/provider.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _promise = _interopRequireDefault(require("../../core/polyfills/promise"));
var _class = _interopRequireDefault(require("../../core/class"));
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _index = require("../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _class.default.abstract;
var Provider = _class.default.inherit({
    _defaultRouteWeight: function() {
        return 5
    },
    _defaultRouteOpacity: function() {
        return .5
    },
    _defaultRouteColor: function() {
        return "#0000FF"
    },
    ctor: function(map, $container) {
        this._mapWidget = map;
        this._$container = $container
    },
    render: function(markerOptions, routeOptions) {
        return this._renderImpl().then(function() {
            return _promise.default.all([this._applyFunctionIfNeeded("addMarkers", markerOptions), this._applyFunctionIfNeeded("addRoutes", routeOptions)]).then(function() {
                return true
            })
        }.bind(this))
    },
    _renderImpl: abstract,
    updateDimensions: abstract,
    updateMapType: abstract,
    updateBounds: abstract,
    updateCenter: abstract,
    updateZoom: abstract,
    updateControls: abstract,
    updateMarkers: function(markerOptionsToRemove, markerOptionsToAdd) {
        return new _promise.default(function(resolve) {
            return this._applyFunctionIfNeeded("removeMarkers", markerOptionsToRemove).then(function(removeValue) {
                this._applyFunctionIfNeeded("addMarkers", markerOptionsToAdd).then(function(addValue) {
                    resolve(addValue ? addValue : removeValue)
                })
            }.bind(this))
        }.bind(this))
    },
    addMarkers: abstract,
    removeMarkers: abstract,
    adjustViewport: abstract,
    updateRoutes: function(routeOptionsToRemove, routeOptionsToAdd) {
        return new _promise.default(function(resolve) {
            return this._applyFunctionIfNeeded("removeRoutes", routeOptionsToRemove).then(function(removeValue) {
                this._applyFunctionIfNeeded("addRoutes", routeOptionsToAdd).then(function(addValue) {
                    resolve(addValue ? addValue : removeValue)
                })
            }.bind(this))
        }.bind(this))
    },
    addRoutes: abstract,
    removeRoutes: abstract,
    clean: abstract,
    map: function() {
        return this._map
    },
    isEventsCanceled: function() {
        return false
    },
    _option: function(name, value) {
        if (void 0 === value) {
            return this._mapWidget.option(name)
        }
        this._mapWidget.setOptionSilent(name, value)
    },
    _keyOption: function(providerName) {
        var key = this._option("apiKey");
        return void 0 === key[providerName] ? key : key[providerName]
    },
    _parseTooltipOptions: function(option) {
        return {
            text: option.text || option,
            visible: option.isShown || false
        }
    },
    _getLatLng: function(location) {
        if ("string" === typeof location) {
            var coords = (0, _iterator.map)(location.split(","), function(item) {
                return item.trim()
            });
            var numericRegex = /^[-+]?[0-9]*\.?[0-9]*$/;
            if (2 === coords.length && coords[0].match(numericRegex) && coords[1].match(numericRegex)) {
                return {
                    lat: parseFloat(coords[0]),
                    lng: parseFloat(coords[1])
                }
            }
        } else {
            if (Array.isArray(location) && 2 === location.length) {
                return {
                    lat: location[0],
                    lng: location[1]
                }
            } else {
                if ((0, _type.isPlainObject)(location) && (0, _type.isNumeric)(location.lat) && (0, _type.isNumeric)(location.lng)) {
                    return location
                }
            }
        }
        return null
    },
    _areBoundsSet: function() {
        return this._option("bounds.northEast") && this._option("bounds.southWest")
    },
    _addEventNamespace: function(name) {
        return (0, _index.addNamespace)(name, this._mapWidget.NAME)
    },
    _applyFunctionIfNeeded: function(fnName, array) {
        if (!array.length) {
            return _promise.default.resolve()
        }
        return this[fnName](array)
    },
    _fireAction: function(name, actionArguments) {
        this._mapWidget._createActionByOption(name)(actionArguments)
    },
    _fireClickAction: function(actionArguments) {
        this._fireAction("onClick", actionArguments)
    },
    _fireMarkerAddedAction: function(actionArguments) {
        this._fireAction("onMarkerAdded", actionArguments)
    },
    _fireMarkerRemovedAction: function(actionArguments) {
        this._fireAction("onMarkerRemoved", actionArguments)
    },
    _fireRouteAddedAction: function(actionArguments) {
        this._fireAction("onRouteAdded", actionArguments)
    },
    _fireRouteRemovedAction: function(actionArguments) {
        this._fireAction("onRouteRemoved", actionArguments)
    }
});
var _default = Provider;
exports.default = _default;
module.exports = exports.default;
