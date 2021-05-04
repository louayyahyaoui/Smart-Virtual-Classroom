/**
* DevExtreme (viz/vector_map.d.ts)
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
    PaletteType
} from './palette';

import {
    template
} from '../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import {
    event
} from '../events/index';

import {
    BaseLegend,
    BaseLegendItem
} from './common';

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font,
    BaseWidgetAnnotationConfig
} from './core/base_widget';

import {
    VectorMapProjectionConfig
} from './vector_map/projection';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface MapLayer {
    /**
     * Deselects all layer elements.
     */
    clearSelection(): void;
    /**
     * The type of the layer elements.
     */
    elementType?: string;
    /**
     * Returns the DataSource instance.
     */
    getDataSource(): DataSource;
    /**
     * Gets all layer elements.
     */
    getElements(): Array<MapLayerElement>;
    /**
     * The layer index in the layers array.
     */
    index?: number;
    /**
     * The name of the layer.
     */
    name?: string;
    /**
     * The layer type. Can be 'area', 'line' or 'marker'.
     */
    type?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface MapLayerElement {
    /**
     * Applies the layer element settings and updates element appearance.
     */
    applySettings(settings: any): void;
    /**
     * Gets the value of an attribute.
     */
    attribute(name: string): any;
    /**
     * Sets the value of an attribute.
     */
    attribute(name: string, value: any): void;
    /**
     * Gets the layer element coordinates.
     */
    coordinates(): any;
    /**
     * The parent layer of the layer element.
     */
    layer?: any;
    /**
     * Gets the selection state of the layer element.
     */
    selected(): boolean;
    /**
     * Sets the selection state of the layer element.
     */
    selected(state: boolean): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface VectorMapLegendItem extends BaseLegendItem {
    /**
     * The color of the legend item's marker.
     */
    color?: string;
    /**
     * The end value of the group that the legend item indicates.
     */
    end?: number;
    /**
     * The diameter of the legend item's marker in pixels.
     */
    size?: number;
    /**
     * The start value of the group that the legend item indicates.
     */
    start?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxVectorMapOptions extends BaseWidgetOptions<dxVectorMap> {
    /**
     * Specifies the properties for the map background.
     */
    background?: { borderColor?: string, color?: string };
    /**
     * Specifies the positioning of a map in geographical coordinates.
     */
    bounds?: Array<number>;
    /**
     * Specifies the geographical coordinates of the center for a map.
     */
    center?: Array<number>;
    /**
     * Configures the control bar.
     */
    controlBar?: { borderColor?: string, color?: string, enabled?: boolean, horizontalAlignment?: 'center' | 'left' | 'right', margin?: number, opacity?: number, verticalAlignment?: 'bottom' | 'top' };
    /**
     * Specifies properties for VectorMap UI component layers.
     */
    layers?: Array<{ borderColor?: string, borderWidth?: number, color?: string, colorGroupingField?: string, colorGroups?: Array<number>, customize?: ((elements: Array<MapLayerElement>) => any), dataField?: string, dataSource?: any | DataSource | DataSourceOptions | string, elementType?: 'bubble' | 'dot' | 'image' | 'pie', hoverEnabled?: boolean, hoveredBorderColor?: string, hoveredBorderWidth?: number, hoveredColor?: string, label?: { dataField?: string, enabled?: boolean, font?: Font }, maxSize?: number, minSize?: number, name?: string, opacity?: number, palette?: Array<string> | PaletteType, paletteSize?: number, selectedBorderColor?: string, selectedBorderWidth?: number, selectedColor?: string, selectionMode?: 'multiple' | 'none' | 'single', size?: number, sizeGroupingField?: string, sizeGroups?: Array<number>, type?: 'area' | 'line' | 'marker' }> | { borderColor?: string, borderWidth?: number, color?: string, colorGroupingField?: string, colorGroups?: Array<number>, customize?: ((elements: Array<MapLayerElement>) => any), dataField?: string, dataSource?: any | DataSource | DataSourceOptions | string, elementType?: 'bubble' | 'dot' | 'image' | 'pie', hoverEnabled?: boolean, hoveredBorderColor?: string, hoveredBorderWidth?: number, hoveredColor?: string, label?: { dataField?: string, enabled?: boolean, font?: Font }, maxSize?: number, minSize?: number, name?: string, opacity?: number, palette?: Array<string> | PaletteType, paletteSize?: number, selectedBorderColor?: string, selectedBorderWidth?: number, selectedColor?: string, selectionMode?: 'multiple' | 'none' | 'single', size?: number, sizeGroupingField?: string, sizeGroups?: Array<number>, type?: 'area' | 'line' | 'marker' };
    /**
     * Configures map legends.
     */
    legends?: Array<dxVectorMapLegends>;
    /**
     * Specifies a map's maximum zoom factor.
     */
    maxZoomFactor?: number;
    /**
     * A function that is executed each time the center coordinates are changed.
     */
    onCenterChanged?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, center?: Array<number> }) => any);
    /**
     * A function that is executed when any location on the map is clicked or tapped.
     */
    onClick?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, event?: event, target?: MapLayerElement }) => any) | string;
    /**
     * A function that is executed when a layer element is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, target?: MapLayerElement }) => any);
    /**
     * A function that is executed when a tooltip becomes hidden.
     */
    onTooltipHidden?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, target?: MapLayerElement | dxVectorMapAnnotationConfig | any }) => any);
    /**
     * A function that is executed when a tooltip appears.
     */
    onTooltipShown?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, target?: MapLayerElement | dxVectorMapAnnotationConfig | any }) => any);
    /**
     * A function that is executed each time the zoom factor is changed.
     */
    onZoomFactorChanged?: ((e: { component?: dxVectorMap, element?: dxElement, model?: any, zoomFactor?: number }) => any);
    /**
     * Disables the panning capability.
     */
    panningEnabled?: boolean;
    /**
     * Specifies the map projection.
     */
    projection?: 'equirectangular' | 'lambert' | 'mercator' | 'miller' | VectorMapProjectionConfig | string | any;
    /**
     * Configures tooltips.
     */
    tooltip?: dxVectorMapTooltip;
    /**
     * Specifies whether the map should respond to touch gestures.
     */
    touchEnabled?: boolean;
    /**
     * Specifies whether or not the map should respond when a user rolls the mouse wheel.
     */
    wheelEnabled?: boolean;
    /**
     * Specifies a number that is used to zoom a map initially.
     */
    zoomFactor?: number;
    /**
     * Disables the zooming capability.
     */
    zoomingEnabled?: boolean;
    /**
     * Specifies settings common for all annotations in the VectorMap.
     */
    commonAnnotationSettings?: dxVectorMapCommonAnnotationConfig;
    /**
     * Specifies the annotation collection.
     */
    annotations?: Array<dxVectorMapAnnotationConfig | any>;
    /**
     * 
     */
    customizeAnnotation?: ((annotation: dxVectorMapAnnotationConfig | any) => dxVectorMapAnnotationConfig);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxVectorMapAnnotationConfig extends dxVectorMapCommonAnnotationConfig {
    /**
     * Specifies the annotation's name.
     */
    name?: string;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxVectorMapCommonAnnotationConfig extends BaseWidgetAnnotationConfig {
    /**
     * Positions the annotation's center at specified geographic coordinates: [longitude, latitude].
     */
    coordinates?: Array<number>;
    /**
     * 
     */
    customizeTooltip?: ((annotation: dxVectorMapAnnotationConfig | any) => any);
    /**
     * 
     */
    template?: template | ((annotation: dxVectorMapAnnotationConfig | any, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * 
     */
    tooltipTemplate?: template | ((annotation: dxVectorMapAnnotationConfig | any, element: dxElement) => string | Element | JQuery);
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxVectorMapLegends extends BaseLegend {
    /**
     * Specifies text for a hint that appears when a user hovers the mouse pointer over the text of a legend item.
     */
    customizeHint?: ((itemInfo: { start?: number, end?: number, index?: number, color?: string, size?: number }) => string);
    /**
     * Allows you to change the order and visibility of legend items.
     */
    customizeItems?: ((items: Array<VectorMapLegendItem>) => Array<VectorMapLegendItem>);
    /**
     * Specifies text for legend items.
     */
    customizeText?: ((itemInfo: { start?: number, end?: number, index?: number, color?: string, size?: number }) => string);
    /**
     * Specifies the legend items' font properties.
     */
    font?: Font;
    /**
     * Specifies the color of item markers in the legend. The specified color applied only when the legend uses 'size' source.
     */
    markerColor?: string;
    /**
     * Specifies the shape of item markers.
     */
    markerShape?: 'circle' | 'square';
    /**
     * Specifies the marker's size in a legend item in pixels.
     */
    markerSize?: number;
    /**
     * Specifies an SVG element that serves as a custom legend item marker.
     */
    markerTemplate?: template | ((legendItem: VectorMapLegendItem, element: SVGGElement) => string | SVGElement | JQuery);
    /**
     * Specifies the source of data for the legend.
     */
    source?: { grouping?: string, layer?: string };
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxVectorMapTooltip extends BaseWidgetTooltip {
    /**
     * Specifies a custom template for a tooltip.
     */
    contentTemplate?: template | ((info: MapLayerElement, element: dxElement) => string | Element | JQuery);
    /**
     * Specifies text and appearance of a set of tooltips.
     */
    customizeTooltip?: ((info: MapLayerElement) => any);
}
/**
 * The VectorMap is a UI component that visualizes geographical locations. This UI component represents a geographical map that contains areas and markers. Areas embody continents and countries. Markers flag specific points on the map, for example, towns, cities or capitals.
 */
export default class dxVectorMap extends BaseWidget {
    constructor(element: Element, options?: dxVectorMapOptions)
    constructor(element: JQuery, options?: dxVectorMapOptions)
    /**
     * Gets the current map center coordinates.
     */
    center(): Array<number>;
    /**
     * Sets the map center coordinates.
     */
    center(centerCoordinates: Array<number>): void;
    /**
     * Deselects all the selected area and markers on a map at once. The areas and markers are displayed in their initial style after.
     */
    clearSelection(): void;
    /**
     * Converts client area coordinates into map coordinates.
     * @deprecated Use convertToGeo instead.
     */
    convertCoordinates(x: number, y: number): Array<number>;
    /**
     * Converts coordinates from pixels to the dataSource coordinate system.
     */
    convertToGeo(x: number, y: number): Array<number>;
    /**
     * Converts coordinates from the dataSource coordinate system to pixels.
     */
    convertToXY(longitude: number, latitude: number): Array<number>;
    /**
     * Gets a layer with a specific index.
     */
    getLayerByIndex(index: number): MapLayer;
    /**
     * Gets a layer with a specific name.
     */
    getLayerByName(name: string): MapLayer;
    /**
     * Gets all layers.
     */
    getLayers(): Array<MapLayer>;
    /**
     * Gets the current map viewport coordinates.
     */
    viewport(): Array<number>;
    /**
     * Sets the map viewport coordinates.
     */
    viewport(viewportCoordinates: Array<number>): void;
    /**
     * Gets the current zoom factor value.
     */
    zoomFactor(): number;
    /**
     * Sets the zoom factor value.
     */
    zoomFactor(zoomFactor: number): void;
}

declare global {
interface JQuery {
    dxVectorMap(): JQuery;
    dxVectorMap(options: "instance"): dxVectorMap;
    dxVectorMap(options: string): any;
    dxVectorMap(options: string, ...params: any[]): any;
    dxVectorMap(options: dxVectorMapOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxVectorMapOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxVectorMapOptions;
