/**
 * DevExtreme (ui/map/provider.dynamic.bing.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _common = require("../../core/utils/common");
var _window = require("../../core/utils/window");
var _promise = _interopRequireDefault(require("../../core/polyfills/promise"));
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _iterator = require("../../core/utils/iterator");
var _provider = _interopRequireDefault(require("./provider.dynamic"));
var _color = _interopRequireDefault(require("../../color"));
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var BING_MAP_READY = "_bingScriptReady";
var BING_URL_V8 = "https://www.bing.com/api/maps/mapcontrol?callback=" + BING_MAP_READY;
var INFOBOX_V_OFFSET_V8 = 13;
var BING_CREDENTIALS = "AhuxC0dQ1DBTNo8L-H9ToVMQStmizZzBJdraTSgCzDSWPsA1Qd8uIvFSflzxdaLH";
var MIN_LOCATION_RECT_LENGTH = 1e-16;
var msMapsLoaded = function() {
    return window.Microsoft && window.Microsoft.Maps
};
var msMapsLoader;
var BingProvider = _provider.default.inherit({
    _mapType: function(type) {
        var mapTypes = {
            roadmap: Microsoft.Maps.MapTypeId.road,
            hybrid: Microsoft.Maps.MapTypeId.aerial,
            satellite: Microsoft.Maps.MapTypeId.aerial
        };
        return mapTypes[type] || mapTypes.road
    },
    _movementMode: function(type) {
        var movementTypes = {
            driving: Microsoft.Maps.Directions.RouteMode.driving,
            walking: Microsoft.Maps.Directions.RouteMode.walking
        };
        return movementTypes[type] || movementTypes.driving
    },
    _resolveLocation: function(location) {
        return new _promise.default(function(resolve) {
            var latLng = this._getLatLng(location);
            if (latLng) {
                resolve(new Microsoft.Maps.Location(latLng.lat, latLng.lng))
            } else {
                this._geocodeLocation(location).then(function(geocodedLocation) {
                    resolve(geocodedLocation)
                })
            }
        }.bind(this))
    },
    _geocodedLocations: {},
    _geocodeLocationImpl: function(location) {
        return new _promise.default(function(resolve) {
            if (!(0, _type.isDefined)(location)) {
                resolve(new Microsoft.Maps.Location(0, 0));
                return
            }
            var searchManager = new Microsoft.Maps.Search.SearchManager(this._map);
            var searchRequest = {
                where: location,
                count: 1,
                callback: function(searchResponse) {
                    var result = searchResponse.results[0];
                    if (result) {
                        var boundsBox = searchResponse.results[0].location;
                        resolve(new Microsoft.Maps.Location(boundsBox.latitude, boundsBox.longitude))
                    } else {
                        resolve(new Microsoft.Maps.Location(0, 0))
                    }
                }
            };
            searchManager.geocode(searchRequest)
        }.bind(this))
    },
    _normalizeLocation: function(location) {
        return {
            lat: location.latitude,
            lng: location.longitude
        }
    },
    _normalizeLocationRect: function(locationRect) {
        var northWest = this._normalizeLocation(locationRect.getNorthwest());
        var southEast = this._normalizeLocation(locationRect.getSoutheast());
        return {
            northEast: {
                lat: northWest.lat,
                lng: southEast.lng
            },
            southWest: {
                lat: southEast.lat,
                lng: northWest.lng
            }
        }
    },
    _loadImpl: function() {
        return new _promise.default(function(resolve) {
            if (msMapsLoaded()) {
                resolve()
            } else {
                if (!msMapsLoader) {
                    msMapsLoader = this._loadMapScript()
                }
                msMapsLoader.then(function() {
                    if (msMapsLoaded()) {
                        resolve();
                        return
                    }
                    this._loadMapScript().then(resolve)
                }.bind(this))
            }
        }.bind(this)).then(function() {
            return _promise.default.all([new _promise.default(function(resolve) {
                Microsoft.Maps.loadModule("Microsoft.Maps.Search", {
                    callback: resolve
                })
            }), new _promise.default(function(resolve) {
                Microsoft.Maps.loadModule("Microsoft.Maps.Directions", {
                    callback: resolve
                })
            })])
        })
    },
    _loadMapScript: function() {
        return new _promise.default(function(resolve) {
            window[BING_MAP_READY] = resolve;
            _ajax.default.sendRequest({
                url: BING_URL_V8,
                dataType: "script"
            })
        }).then(function() {
            try {
                delete window[BING_MAP_READY]
            } catch (e) {
                window[BING_MAP_READY] = void 0
            }
        })
    },
    _init: function() {
        this._createMap();
        return _promise.default.resolve()
    },
    _createMap: function() {
        var controls = this._option("controls");
        this._map = new Microsoft.Maps.Map(this._$container[0], {
            credentials: this._keyOption("bing") || BING_CREDENTIALS,
            zoom: this._option("zoom"),
            showDashboard: controls,
            showMapTypeSelector: controls,
            showScalebar: controls
        })
    },
    _attachHandlers: function() {
        this._providerViewChangeHandler = Microsoft.Maps.Events.addHandler(this._map, "viewchange", this._viewChangeHandler.bind(this));
        this._providerClickHandler = Microsoft.Maps.Events.addHandler(this._map, "click", this._clickActionHandler.bind(this))
    },
    _viewChangeHandler: function() {
        var bounds = this._map.getBounds();
        this._option("bounds", this._normalizeLocationRect(bounds));
        var center = this._map.getCenter();
        this._option("center", this._normalizeLocation(center));
        if (!this._preventZoomChangeEvent) {
            this._option("zoom", this._map.getZoom())
        }
    },
    _clickActionHandler: function(e) {
        if ("map" === e.targetType) {
            this._fireClickAction({
                location: this._normalizeLocation(e.location)
            })
        }
    },
    updateDimensions: function() {
        var $container = this._$container;
        this._map.setOptions({
            width: $container.width(),
            height: $container.height()
        });
        return _promise.default.resolve()
    },
    updateMapType: function() {
        var type = this._option("type");
        var labelOverlay = Microsoft.Maps.LabelOverlay;
        this._map.setView({
            animate: false,
            mapTypeId: this._mapType(type),
            labelOverlay: "satellite" === type ? labelOverlay.hidden : labelOverlay.visible
        });
        return _promise.default.resolve()
    },
    updateBounds: function() {
        return _promise.default.all([this._resolveLocation(this._option("bounds.northEast")), this._resolveLocation(this._option("bounds.southWest"))]).then(function(result) {
            var bounds = new Microsoft.Maps.LocationRect.fromLocations(result[0], result[1]);
            this._map.setView({
                animate: false,
                bounds: bounds
            })
        }.bind(this))
    },
    updateCenter: function() {
        return this._resolveLocation(this._option("center")).then(function(center) {
            this._map.setView({
                animate: false,
                center: center
            })
        }.bind(this))
    },
    updateZoom: function() {
        this._map.setView({
            animate: false,
            zoom: this._option("zoom")
        });
        return _promise.default.resolve()
    },
    updateControls: function() {
        this.clean();
        return this.render.apply(this, arguments)
    },
    _renderMarker: function(options) {
        return this._resolveLocation(options.location).then(function(location) {
            var pushpinOptions = {
                icon: options.iconSrc || this._option("markerIconSrc")
            };
            if (options.html) {
                (0, _extend.extend)(pushpinOptions, {
                    htmlContent: options.html,
                    width: null,
                    height: null
                });
                var htmlOffset = options.htmlOffset;
                if (htmlOffset) {
                    pushpinOptions.anchor = new Microsoft.Maps.Point((-htmlOffset.left), (-htmlOffset.top))
                }
            }
            var pushpin = new Microsoft.Maps.Pushpin(location, pushpinOptions);
            this._map.entities.push(pushpin);
            var infobox = this._renderTooltip(location, options.tooltip);
            var handler;
            if (options.onClick || options.tooltip) {
                var markerClickAction = this._mapWidget._createAction(options.onClick || _common.noop);
                var markerNormalizedLocation = this._normalizeLocation(location);
                handler = Microsoft.Maps.Events.addHandler(pushpin, "click", function() {
                    markerClickAction({
                        location: markerNormalizedLocation
                    });
                    if (infobox) {
                        infobox.setOptions({
                            visible: true
                        })
                    }
                })
            }
            return {
                location: location,
                marker: pushpin,
                infobox: infobox,
                handler: handler
            }
        }.bind(this))
    },
    _renderTooltip: function(location, options) {
        if (!options) {
            return
        }
        options = this._parseTooltipOptions(options);
        var infobox = new Microsoft.Maps.Infobox(location, {
            description: options.text,
            offset: new Microsoft.Maps.Point(0, INFOBOX_V_OFFSET_V8),
            visible: options.visible
        });
        infobox.setMap(this._map);
        return infobox
    },
    _destroyMarker: function(marker) {
        this._map.entities.remove(marker.marker);
        if (marker.infobox) {
            marker.infobox.setMap(null)
        }
        if (marker.handler) {
            Microsoft.Maps.Events.removeHandler(marker.handler)
        }
    },
    _renderRoute: function(options) {
        return _promise.default.all((0, _iterator.map)(options.locations, function(point) {
            return this._resolveLocation(point)
        }.bind(this))).then(function(locations) {
            return new _promise.default(function(resolve) {
                var direction = new Microsoft.Maps.Directions.DirectionsManager(this._map);
                var color = new _color.default(options.color || this._defaultRouteColor()).toHex();
                var routeColor = new Microsoft.Maps.Color.fromHex(color);
                routeColor.a = 255 * (options.opacity || this._defaultRouteOpacity());
                direction.setRenderOptions({
                    autoUpdateMapView: false,
                    displayRouteSelector: false,
                    waypointPushpinOptions: {
                        visible: false
                    },
                    drivingPolylineOptions: {
                        strokeColor: routeColor,
                        strokeThickness: options.weight || this._defaultRouteWeight()
                    },
                    walkingPolylineOptions: {
                        strokeColor: routeColor,
                        strokeThickness: options.weight || this._defaultRouteWeight()
                    }
                });
                direction.setRequestOptions({
                    routeMode: this._movementMode(options.mode),
                    routeDraggable: false
                });
                (0, _iterator.each)(locations, function(_, location) {
                    var waypoint = new Microsoft.Maps.Directions.Waypoint({
                        location: location
                    });
                    direction.addWaypoint(waypoint)
                });
                var directionHandlers = [];
                directionHandlers.push(Microsoft.Maps.Events.addHandler(direction, "directionsUpdated", function(args) {
                    while (directionHandlers.length) {
                        Microsoft.Maps.Events.removeHandler(directionHandlers.pop())
                    }
                    var routeSummary = args.routeSummary[0];
                    resolve({
                        instance: direction,
                        northEast: routeSummary.northEast,
                        southWest: routeSummary.southWest
                    })
                }));
                directionHandlers.push(Microsoft.Maps.Events.addHandler(direction, "directionsError", function(args) {
                    while (directionHandlers.length) {
                        Microsoft.Maps.Events.removeHandler(directionHandlers.pop())
                    }
                    var status = "RouteResponseCode: " + args.responseCode + " - " + args.message;
                    _ui.default.log("W1006", status);
                    resolve({
                        instance: direction
                    })
                }));
                direction.calculateDirections()
            }.bind(this))
        }.bind(this))
    },
    _destroyRoute: function(routeObject) {
        routeObject.instance.dispose()
    },
    _fitBounds: function() {
        this._updateBounds();
        if (this._bounds && this._option("autoAdjust")) {
            var zoomBeforeFitting = this._map.getZoom();
            this._preventZoomChangeEvent = true;
            var bounds = this._bounds.clone();
            bounds.height = 1.1 * bounds.height;
            bounds.width = 1.1 * bounds.width;
            this._map.setView({
                animate: false,
                bounds: bounds,
                zoom: zoomBeforeFitting
            });
            var zoomAfterFitting = this._map.getZoom();
            if (zoomBeforeFitting < zoomAfterFitting) {
                this._map.setView({
                    animate: false,
                    zoom: zoomBeforeFitting
                })
            } else {
                this._option("zoom", zoomAfterFitting)
            }
            delete this._preventZoomChangeEvent
        }
        return _promise.default.resolve()
    },
    _extendBounds: function(location) {
        if (this._bounds) {
            this._bounds = new Microsoft.Maps.LocationRect.fromLocations(this._bounds.getNorthwest(), this._bounds.getSoutheast(), location)
        } else {
            this._bounds = new Microsoft.Maps.LocationRect(location, MIN_LOCATION_RECT_LENGTH, MIN_LOCATION_RECT_LENGTH)
        }
    },
    clean: function() {
        if (this._map) {
            Microsoft.Maps.Events.removeHandler(this._providerViewChangeHandler);
            Microsoft.Maps.Events.removeHandler(this._providerClickHandler);
            this._clearMarkers();
            this._clearRoutes();
            this._map.dispose()
        }
        return _promise.default.resolve()
    }
});
var _default = BingProvider;
exports.default = _default;
module.exports = exports.default;
