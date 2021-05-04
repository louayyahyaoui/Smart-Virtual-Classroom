/*!
 * devextreme-react
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tooltip = exports.Route = exports.Marker = exports.Location = exports.Center = exports.ApiKey = exports.Map = void 0;
var map_1 = require("devextreme/ui/map");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = map_1.default;
        _this.subscribableOptions = ["center", "markers", "routes", "zoom"];
        _this.independentEvents = ["onClick", "onDisposing", "onInitialized", "onMarkerAdded", "onMarkerRemoved", "onOptionChanged", "onReady", "onRouteAdded", "onRouteRemoved"];
        _this._defaults = {
            defaultCenter: "center",
            defaultMarkers: "markers",
            defaultRoutes: "routes",
            defaultZoom: "zoom"
        };
        _this._expectedChildren = {
            apiKey: { optionName: "apiKey", isCollectionItem: false },
            center: { optionName: "center", isCollectionItem: false },
            marker: { optionName: "markers", isCollectionItem: true },
            route: { optionName: "routes", isCollectionItem: true }
        };
        return _this;
    }
    Object.defineProperty(Map.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Map;
}(component_1.Component));
exports.Map = Map;
Map.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    apiKey: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    autoAdjust: PropTypes.bool,
    center: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    controls: PropTypes.bool,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    markerIconSrc: PropTypes.string,
    markers: PropTypes.array,
    onClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onMarkerAdded: PropTypes.func,
    onMarkerRemoved: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onReady: PropTypes.func,
    onRouteAdded: PropTypes.func,
    onRouteRemoved: PropTypes.func,
    provider: PropTypes.oneOf([
        "bing",
        "google",
        "googleStatic"
    ]),
    routes: PropTypes.array,
    rtlEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    type: PropTypes.oneOf([
        "hybrid",
        "roadmap",
        "satellite"
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    zoom: PropTypes.number
};
var ApiKey = /** @class */ (function (_super) {
    __extends(ApiKey, _super);
    function ApiKey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ApiKey.OptionName = "apiKey";
    return ApiKey;
}(nested_option_1.default));
exports.ApiKey = ApiKey;
var Center = /** @class */ (function (_super) {
    __extends(Center, _super);
    function Center() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Center.OptionName = "center";
    return Center;
}(nested_option_1.default));
exports.Center = Center;
var Location = /** @class */ (function (_super) {
    __extends(Location, _super);
    function Location() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Location.OptionName = "location";
    return Location;
}(nested_option_1.default));
exports.Location = Location;
var Marker = /** @class */ (function (_super) {
    __extends(Marker, _super);
    function Marker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Marker.OptionName = "markers";
    Marker.IsCollectionItem = true;
    Marker.ExpectedChildren = {
        location: { optionName: "location", isCollectionItem: false },
        tooltip: { optionName: "tooltip", isCollectionItem: false }
    };
    return Marker;
}(nested_option_1.default));
exports.Marker = Marker;
var Route = /** @class */ (function (_super) {
    __extends(Route, _super);
    function Route() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Route.OptionName = "routes";
    Route.IsCollectionItem = true;
    Route.ExpectedChildren = {
        location: { optionName: "locations", isCollectionItem: true }
    };
    return Route;
}(nested_option_1.default));
exports.Route = Route;
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.OptionName = "tooltip";
    return Tooltip;
}(nested_option_1.default));
exports.Tooltip = Tooltip;
exports.default = Map;
