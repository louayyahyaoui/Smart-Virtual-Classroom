/**
* DevExtreme (ui/map.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import '../jquery_augmentation';

import {
    dxElement
} from '../core/element';

import {
    event
} from '../events/index';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface MapLocation {
    /**
     * The latitude location of the UI component.
     */
    lat?: number;
    /**
     * The longitude location of the UI component.
     */
    lng?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxMapOptions extends WidgetOptions<dxMap> {
    /**
     * Keys to authenticate the component within map providers.
     */
    apiKey?: string | { bing?: string, google?: string, googleStatic?: string };
    /**
     * Specifies whether the UI component automatically adjusts center and zoom property values when adding a new marker or route, or if a new UI component contains markers or routes by default.
     */
    autoAdjust?: boolean;
    /**
     * An object, a string, or an array specifying which part of the map is displayed at the UI component's center using coordinates. The UI component can change this value if autoAdjust is enabled.
     */
    center?: any | string | Array<number>;
    /**
     * Specifies whether or not map UI component controls are available.
     */
    controls?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies the UI component's height.
     */
    height?: number | string | (() => number | string);
    /**
     * A key used to authenticate the application within the required map provider.
     * @deprecated Use the apiKey option instead.
     */
    key?: string | { bing?: string, google?: string, googleStatic?: string };
    /**
     * A URL pointing to the custom icon to be used for map markers.
     */
    markerIconSrc?: string;
    /**
     * An array of markers displayed on a map.
     */
    markers?: Array<{ iconSrc?: string, location?: any | string | Array<number>, onClick?: Function, tooltip?: string | { isShown?: boolean, text?: string } }>;
    /**
     * A function that is executed when any location on the map is clicked or tapped.
     */
    onClick?: ((e: { component?: dxMap, element?: dxElement, model?: any, location?: any, event?: event }) => any) | string;
    /**
     * A function that is executed when a marker is created on the map.
     */
    onMarkerAdded?: ((e: { component?: dxMap, element?: dxElement, model?: any, options?: any, originalMarker?: any }) => any);
    /**
     * A function that is executed when a marker is removed from the map.
     */
    onMarkerRemoved?: ((e: { component?: dxMap, element?: dxElement, model?: any, options?: any }) => any);
    /**
     * A function that is executed when the map is ready.
     */
    onReady?: ((e: { component?: dxMap, element?: dxElement, model?: any, originalMap?: any }) => any);
    /**
     * A function that is executed when a route is created on the map.
     */
    onRouteAdded?: ((e: { component?: dxMap, element?: dxElement, model?: any, options?: any, originalRoute?: any }) => any);
    /**
     * A function that is executed when a route is removed from the map.
     */
    onRouteRemoved?: ((e: { component?: dxMap, element?: dxElement, model?: any, options?: any }) => any);
    /**
     * The name of the current map data provider.
     */
    provider?: 'bing' | 'google' | 'googleStatic';
    /**
     * An array of routes shown on the map.
     */
    routes?: Array<{ color?: string, locations?: Array<any>, mode?: 'driving' | 'walking', opacity?: number, weight?: number }>;
    /**
     * The type of a map to display.
     */
    type?: 'hybrid' | 'roadmap' | 'satellite';
    /**
     * Specifies the UI component's width.
     */
    width?: number | string | (() => number | string);
    /**
     * The map's zoom level. The UI component can change this value if autoAdjust is enabled.
     */
    zoom?: number;
}
/**
 * The Map is an interactive UI component that displays a geographic map with markers and routes.
 */
export default class dxMap extends Widget {
    constructor(element: Element, options?: dxMapOptions)
    constructor(element: JQuery, options?: dxMapOptions)
    /**
     * Adds a marker to the map.
     */
    addMarker(markerOptions: any | Array<any>): Promise<any> & JQueryPromise<any>;
    /**
     * Adds a route to the map.
     */
    addRoute(options: any | Array<any>): Promise<any> & JQueryPromise<any>;
    /**
     * Removes a marker from the map.
     */
    removeMarker(marker: any | number | Array<any>): Promise<void> & JQueryPromise<void>;
    /**
     * Removes a route from the map.
     */
    removeRoute(route: any | number | Array<any>): Promise<void> & JQueryPromise<void>;
}

declare global {
interface JQuery {
    dxMap(): JQuery;
    dxMap(options: "instance"): dxMap;
    dxMap(options: string): any;
    dxMap(options: string, ...params: any[]): any;
    dxMap(options: dxMapOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxMapOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxMapOptions;
