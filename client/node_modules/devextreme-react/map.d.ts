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

import dxMap, { IOptions } from "devextreme/ui/map";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IMapOptions extends IOptions, IHtmlOptions {
    defaultCenter?: any;
    defaultMarkers?: any;
    defaultRoutes?: any;
    defaultZoom?: any;
    onCenterChange?: (value: any) => void;
    onMarkersChange?: (value: any) => void;
    onRoutesChange?: (value: any) => void;
    onZoomChange?: (value: any) => void;
}
declare class Map extends BaseComponent<IMapOptions> {
    get instance(): dxMap;
    protected _WidgetClass: typeof dxMap;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultCenter: string;
        defaultMarkers: string;
        defaultRoutes: string;
        defaultZoom: string;
    };
    protected _expectedChildren: {
        apiKey: {
            optionName: string;
            isCollectionItem: boolean;
        };
        center: {
            optionName: string;
            isCollectionItem: boolean;
        };
        marker: {
            optionName: string;
            isCollectionItem: boolean;
        };
        route: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IApiKeyProps {
    bing?: any;
    google?: any;
    googleStatic?: any;
}
declare class ApiKey extends NestedOption<IApiKeyProps> {
    static OptionName: string;
}
interface ICenterProps {
    lat?: any;
    lng?: any;
}
declare class Center extends NestedOption<ICenterProps> {
    static OptionName: string;
}
interface ILocationProps {
    lat?: any;
    lng?: any;
}
declare class Location extends NestedOption<ILocationProps> {
    static OptionName: string;
}
interface IMarkerProps {
    iconSrc?: any;
    location?: {
        lat?: any;
        lng?: any;
    }[];
    onClick?: any;
    tooltip?: {
        isShown?: any;
        text?: any;
    };
}
declare class Marker extends NestedOption<IMarkerProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        location: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tooltip: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IRouteProps {
    color?: any;
    locations?: {
        lat?: any;
        lng?: any;
    }[];
    mode?: any;
    opacity?: any;
    weight?: any;
}
declare class Route extends NestedOption<IRouteProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        location: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITooltipProps {
    isShown?: any;
    text?: any;
}
declare class Tooltip extends NestedOption<ITooltipProps> {
    static OptionName: string;
}
export default Map;
export { Map, IMapOptions, ApiKey, IApiKeyProps, Center, ICenterProps, Location, ILocationProps, Marker, IMarkerProps, Route, IRouteProps, Tooltip, ITooltipProps };
