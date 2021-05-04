/**
 * DevExtreme (ui/map/provider.dynamic.google.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _common = require("../../core/utils/common");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _promise = _interopRequireDefault(require("../../core/polyfills/promise"));
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _provider = _interopRequireDefault(require("./provider.dynamic"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _color = _interopRequireDefault(require("../../color"));
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var GOOGLE_MAP_READY = "_googleScriptReady";
var GOOGLE_URL = "https://maps.googleapis.com/maps/api/js?callback=" + GOOGLE_MAP_READY;
var INFO_WINDOW_CLASS = "gm-style-iw";
var CustomMarker;
var initCustomMarkerClass = function() {
    CustomMarker = function(options) {
        this._position = options.position;
        this._offset = options.offset;
        this._$overlayContainer = (0, _renderer.default)("<div>").css({
            position: "absolute",
            display: "none",
            cursor: "pointer"
        }).append(options.html);
        this.setMap(options.map)
    };
    CustomMarker.prototype = new google.maps.OverlayView;
    CustomMarker.prototype.onAdd = function() {
        var $pane = (0, _renderer.default)(this.getPanes().overlayMouseTarget);
        $pane.append(this._$overlayContainer);
        this._clickListener = google.maps.event.addDomListener(this._$overlayContainer.get(0), "click", function(e) {
            google.maps.event.trigger(this, "click");
            e.preventDefault()
        }.bind(this));
        this.draw()
    };
    CustomMarker.prototype.onRemove = function() {
        google.maps.event.removeListener(this._clickListener);
        this._$overlayContainer.remove()
    };
    CustomMarker.prototype.draw = function() {
        var position = this.getProjection().fromLatLngToDivPixel(this._position);
        this._$overlayContainer.css({
            left: position.x + this._offset.left,
            top: position.y + this._offset.top,
            display: "block"
        })
    }
};
var googleMapsLoaded = function() {
    return window.google && window.google.maps
};
var googleMapsLoader;
var GoogleProvider = _provider.default.inherit({
    _mapType: function(type) {
        var mapTypes = {
            hybrid: google.maps.MapTypeId.HYBRID,
            roadmap: google.maps.MapTypeId.ROADMAP,
            satellite: google.maps.MapTypeId.SATELLITE
        };
        return mapTypes[type] || mapTypes.hybrid
    },
    _movementMode: function(type) {
        var movementTypes = {
            driving: google.maps.TravelMode.DRIVING,
            walking: google.maps.TravelMode.WALKING
        };
        return movementTypes[type] || movementTypes.driving
    },
    _resolveLocation: function(location) {
        return new _promise.default(function(resolve) {
            var latLng = this._getLatLng(location);
            if (latLng) {
                resolve(new google.maps.LatLng(latLng.lat, latLng.lng))
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
                resolve(new google.maps.LatLng(0, 0));
                return
            }
            var geocoder = new google.maps.Geocoder;
            geocoder.geocode({
                address: location
            }, function(results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    resolve(results[0].geometry.location)
                } else {
                    _ui.default.log("W1006", status);
                    resolve(new google.maps.LatLng(0, 0))
                }
            })
        })
    },
    _normalizeLocation: function(location) {
        return {
            lat: location.lat(),
            lng: location.lng()
        }
    },
    _normalizeLocationRect: function(locationRect) {
        return {
            northEast: this._normalizeLocation(locationRect.getNorthEast()),
            southWest: this._normalizeLocation(locationRect.getSouthWest())
        }
    },
    _loadImpl: function() {
        return new _promise.default(function(resolve) {
            if (googleMapsLoaded()) {
                resolve()
            } else {
                if (!googleMapsLoader) {
                    googleMapsLoader = this._loadMapScript()
                }
                googleMapsLoader.then(function() {
                    if (googleMapsLoaded()) {
                        resolve();
                        return
                    }
                    this._loadMapScript().then(resolve)
                }.bind(this))
            }
        }.bind(this)).then(function() {
            initCustomMarkerClass()
        })
    },
    _loadMapScript: function() {
        return new _promise.default(function(resolve) {
            var key = this._keyOption("google");
            window[GOOGLE_MAP_READY] = resolve;
            _ajax.default.sendRequest({
                url: GOOGLE_URL + (key ? "&key=" + key : ""),
                dataType: "script"
            })
        }.bind(this)).then(function() {
            try {
                delete window[GOOGLE_MAP_READY]
            } catch (e) {
                window[GOOGLE_MAP_READY] = void 0
            }
        })
    },
    _init: function() {
        return new _promise.default(function(resolve) {
            this._resolveLocation(this._option("center")).then(function(center) {
                var showDefaultUI = this._option("controls");
                this._map = new google.maps.Map(this._$container[0], {
                    zoom: this._option("zoom"),
                    center: center,
                    disableDefaultUI: !showDefaultUI
                });
                var listener = google.maps.event.addListener(this._map, "idle", function() {
                    resolve(listener)
                })
            }.bind(this))
        }.bind(this)).then(function(listener) {
            google.maps.event.removeListener(listener)
        })
    },
    _attachHandlers: function() {
        this._boundsChangeListener = google.maps.event.addListener(this._map, "bounds_changed", this._boundsChangeHandler.bind(this));
        this._clickListener = google.maps.event.addListener(this._map, "click", this._clickActionHandler.bind(this))
    },
    _boundsChangeHandler: function() {
        var bounds = this._map.getBounds();
        this._option("bounds", this._normalizeLocationRect(bounds));
        var center = this._map.getCenter();
        this._option("center", this._normalizeLocation(center));
        if (!this._preventZoomChangeEvent) {
            this._option("zoom", this._map.getZoom())
        }
    },
    _clickActionHandler: function(e) {
        this._fireClickAction({
            location: this._normalizeLocation(e.latLng)
        })
    },
    updateDimensions: function() {
        var center = this._option("center");
        google.maps.event.trigger(this._map, "resize");
        this._option("center", center);
        return this.updateCenter()
    },
    updateMapType: function() {
        this._map.setMapTypeId(this._mapType(this._option("type")));
        return _promise.default.resolve()
    },
    updateBounds: function() {
        return _promise.default.all([this._resolveLocation(this._option("bounds.northEast")), this._resolveLocation(this._option("bounds.southWest"))]).then(function(result) {
            var bounds = new google.maps.LatLngBounds;
            bounds.extend(result[0]);
            bounds.extend(result[1]);
            this._map.fitBounds(bounds)
        }.bind(this))
    },
    updateCenter: function() {
        return this._resolveLocation(this._option("center")).then(function(center) {
            this._map.setCenter(center);
            this._option("center", this._normalizeLocation(center))
        }.bind(this))
    },
    updateZoom: function() {
        this._map.setZoom(this._option("zoom"));
        return _promise.default.resolve()
    },
    updateControls: function() {
        var showDefaultUI = this._option("controls");
        this._map.setOptions({
            disableDefaultUI: !showDefaultUI
        });
        return _promise.default.resolve()
    },
    isEventsCanceled: function(e) {
        var gestureHandling = this._map && this._map.get("gestureHandling");
        var isInfoWindowContent = (0, _renderer.default)(e.target).closest(".".concat(INFO_WINDOW_CLASS)).length > 0;
        if (isInfoWindowContent || "desktop" !== _devices.default.real().deviceType && "cooperative" === gestureHandling) {
            return false
        }
        return this.callBase()
    },
    _renderMarker: function(options) {
        return this._resolveLocation(options.location).then(function(location) {
            var marker;
            if (options.html) {
                marker = new CustomMarker({
                    map: this._map,
                    position: location,
                    html: options.html,
                    offset: (0, _extend.extend)({
                        top: 0,
                        left: 0
                    }, options.htmlOffset)
                })
            } else {
                marker = new google.maps.Marker({
                    position: location,
                    map: this._map,
                    icon: options.iconSrc || this._option("markerIconSrc")
                })
            }
            var infoWindow = this._renderTooltip(marker, options.tooltip);
            var listener;
            if (options.onClick || options.tooltip) {
                var markerClickAction = this._mapWidget._createAction(options.onClick || _common.noop);
                var markerNormalizedLocation = this._normalizeLocation(location);
                listener = google.maps.event.addListener(marker, "click", function() {
                    markerClickAction({
                        location: markerNormalizedLocation
                    });
                    if (infoWindow) {
                        infoWindow.open(this._map, marker)
                    }
                }.bind(this))
            }
            return {
                location: location,
                marker: marker,
                listener: listener
            }
        }.bind(this))
    },
    _renderTooltip: function(marker, options) {
        if (!options) {
            return
        }
        options = this._parseTooltipOptions(options);
        var infoWindow = new google.maps.InfoWindow({
            content: options.text
        });
        if (options.visible) {
            infoWindow.open(this._map, marker)
        }
        return infoWindow
    },
    _destroyMarker: function(marker) {
        marker.marker.setMap(null);
        if (marker.listener) {
            google.maps.event.removeListener(marker.listener)
        }
    },
    _renderRoute: function(options) {
        return _promise.default.all((0, _iterator.map)(options.locations, function(point) {
            return this._resolveLocation(point)
        }.bind(this))).then(function(locations) {
            return new _promise.default(function(resolve) {
                var origin = locations.shift();
                var destination = locations.pop();
                var waypoints = (0, _iterator.map)(locations, function(location) {
                    return {
                        location: location,
                        stopover: true
                    }
                });
                var request = {
                    origin: origin,
                    destination: destination,
                    waypoints: waypoints,
                    optimizeWaypoints: true,
                    travelMode: this._movementMode(options.mode)
                };
                (new google.maps.DirectionsService).route(request, function(response, status) {
                    if (status === google.maps.DirectionsStatus.OK) {
                        var color = new _color.default(options.color || this._defaultRouteColor()).toHex();
                        var directionOptions = {
                            directions: response,
                            map: this._map,
                            suppressMarkers: true,
                            preserveViewport: true,
                            polylineOptions: {
                                strokeWeight: options.weight || this._defaultRouteWeight(),
                                strokeOpacity: options.opacity || this._defaultRouteOpacity(),
                                strokeColor: color
                            }
                        };
                        var route = new google.maps.DirectionsRenderer(directionOptions);
                        var bounds = response.routes[0].bounds;
                        resolve({
                            instance: route,
                            northEast: bounds.getNorthEast(),
                            southWest: bounds.getSouthWest()
                        })
                    } else {
                        _ui.default.log("W1006", status);
                        resolve({
                            instance: new google.maps.DirectionsRenderer({})
                        })
                    }
                }.bind(this))
            }.bind(this))
        }.bind(this))
    },
    _destroyRoute: function(routeObject) {
        routeObject.instance.setMap(null)
    },
    _fitBounds: function() {
        this._updateBounds();
        if (this._bounds && this._option("autoAdjust")) {
            var zoomBeforeFitting = this._map.getZoom();
            this._preventZoomChangeEvent = true;
            this._map.fitBounds(this._bounds);
            this._boundsChangeHandler();
            var zoomAfterFitting = this._map.getZoom();
            if (zoomBeforeFitting < zoomAfterFitting) {
                this._map.setZoom(zoomBeforeFitting)
            } else {
                this._option("zoom", zoomAfterFitting)
            }
            delete this._preventZoomChangeEvent
        }
        return _promise.default.resolve()
    },
    _extendBounds: function(location) {
        if (this._bounds) {
            this._bounds.extend(location)
        } else {
            this._bounds = new google.maps.LatLngBounds;
            this._bounds.extend(location)
        }
    },
    clean: function() {
        if (this._map) {
            google.maps.event.removeListener(this._boundsChangeListener);
            google.maps.event.removeListener(this._clickListener);
            this._clearMarkers();
            this._clearRoutes();
            delete this._map;
            this._$container.empty()
        }
        return _promise.default.resolve()
    }
});
var _default = GoogleProvider;
exports.default = _default;
module.exports = exports.default;
