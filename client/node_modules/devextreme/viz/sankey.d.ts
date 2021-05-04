/**
* DevExtreme (viz/sankey.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement
} from '../core/element';

import {
    PaletteType,
    PaletteExtensionModeType
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

import BaseWidget, {
    BaseWidgetOptions,
    BaseWidgetTooltip,
    Font
} from './core/base_widget';

import { HatchingDirectionType } from './common';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSankeyOptions extends BaseWidgetOptions<dxSankey> {
    /**
     * Specifies adaptive layout properties.
     */
    adaptiveLayout?: { height?: number, keepLabels?: boolean, width?: number };
    /**
     * Aligns node columns vertically.
     */
    alignment?: 'bottom' | 'center' | 'top' | Array<'bottom' | 'center' | 'top'>;
    /**
     * Binds the UI component to data.
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * Specifies whether nodes and links change their style when they are hovered over or pressed.
     */
    hoverEnabled?: boolean;
    /**
     * Configures sankey nodes' labels.
     */
    label?: { border?: { color?: string, visible?: boolean, width?: number }, customizeText?: ((itemInfo: dxSankeyNode) => string), font?: Font, horizontalOffset?: number, overlappingBehavior?: 'ellipsis' | 'hide' | 'none', shadow?: { blur?: number, color?: string, offsetX?: number, offsetY?: number, opacity?: number }, useNodeColors?: boolean, verticalOffset?: number, visible?: boolean };
    /**
     * Configures sankey links' appearance.
     */
    link?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, colorMode?: 'none' | 'source' | 'target' | 'gradient', hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number }, opacity?: number }, opacity?: number };
    /**
     * Configures sankey nodes' appearance.
     */
    node?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, hoverStyle?: { border?: { color?: string, visible?: boolean, width?: number }, color?: string, hatching?: { direction?: HatchingDirectionType, opacity?: number, step?: number, width?: number }, opacity?: number }, opacity?: number, padding?: number, width?: number };
    /**
     * A function that is executed when a sankey link is clicked or tapped.
     */
    onLinkClick?: ((e: { component?: dxSankey, element?: dxElement, model?: any, event?: event, target?: dxSankeyLink }) => any) | string;
    /**
     * A function that is executed after the pointer enters or leaves a sankey link.
     */
    onLinkHoverChanged?: ((e: { component?: dxSankey, element?: dxElement, model?: any, target?: dxSankeyLink }) => any);
    /**
     * A function that is executed when a sankey node is clicked or tapped.
     */
    onNodeClick?: ((e: { component?: dxSankey, element?: dxElement, model?: any, event?: event, target?: dxSankeyNode }) => any) | string;
    /**
     * A function that is executed after the pointer enters or leaves a sankey node.
     */
    onNodeHoverChanged?: ((e: { component?: dxSankey, element?: dxElement, model?: any, target?: dxSankeyNode }) => any);
    /**
     * Sets the palette to be used to colorize sankey nodes.
     */
    palette?: Array<string> | PaletteType;
    /**
     * Specifies how to extend the palette when it contains less colors than the number of sankey nodes.
     */
    paletteExtensionMode?: PaletteExtensionModeType;
    /**
     * Specifies nodes' sorting order in their columns.
     */
    sortData?: any;
    /**
     * Specifies which data source field provides links' source nodes.
     */
    sourceField?: string;
    /**
     * Specifies which data source field provides links' target nodes.
     */
    targetField?: string;
    /**
     * Configures tooltips - small pop-up rectangles that display information about a data-visualizing UI component element being pressed or hovered over with the mouse pointer.
     */
    tooltip?: dxSankeyTooltip;
    /**
     * Specifies which data source field provides links' weights.
     */
    weightField?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSankeyTooltip extends BaseWidgetTooltip {
    /**
     * Customizes link tooltips' appearance.
     */
    customizeLinkTooltip?: ((info: { source?: string, target?: string, weight?: number }) => any);
    /**
     * Customizes node tooltips' appearance.
     */
    customizeNodeTooltip?: ((info: { title?: string, label?: string, weightIn?: number, weightOut?: number }) => any);
    /**
     * Enables tooltips.
     */
    enabled?: boolean;
    /**
     * Specifies a custom template for a link's tooltip.
     */
    linkTooltipTemplate?: template | ((info: { source?: string, target?: string, weight?: number }, element: dxElement) => string | Element | JQuery);
    /**
     * Specifies a custom template for a node's tooltip.
     */
    nodeTooltipTemplate?: template | ((info: { label?: string, weightIn?: number, weightOut?: number }, element: dxElement) => string | Element | JQuery);
}
/**
 * The Sankey is a UI component that visualizes the flow magnitude between value sets. The values being connected are called nodes; the connections - links. The higher the flow magnitude, the wider the link is.
 */
export default class dxSankey extends BaseWidget {
    constructor(element: Element, options?: dxSankeyOptions)
    constructor(element: JQuery, options?: dxSankeyOptions)
    /**
     * Gets all sankey links.
     */
    getAllLinks(): Array<dxSankeyLink>;
    /**
     * Gets all sankey nodes.
     */
    getAllNodes(): Array<dxSankeyNode>;
    getDataSource(): DataSource;
    /**
     * Hides all UI component tooltips.
     */
    hideTooltip(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSankeyConnectionInfoObject {
    /**
     * The title of the link's source node.
     */
    source?: string;
    /**
     * The title of the link's target node.
     */
    target?: string;
    /**
     * The link's weight.
     */
    weight?: number;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSankeyLink {
    /**
     * An object that describes the connection.
     */
    connection?: dxSankeyConnectionInfoObject;
    /**
     * Hides the sankey link's tooltip.
     */
    hideTooltip(): void;
    /**
     * Changes the sankey link's hover state.
     */
    hover(state: boolean): void;
    /**
     * Indicates whether the sankey link is in the hover state.
     */
    isHovered(): boolean;
    /**
     * Shows the sankey link's tooltip.
     */
    showTooltip(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxSankeyNode {
    /**
     * Hides the sankey node's tooltip.
     */
    hideTooltip(): void;
    /**
     * Changes the sankey node's hover state.
     */
    hover(state: boolean): void;
    /**
     * Indicates whether the sankey node is in the hover state.
     */
    isHovered(): boolean;
    /**
     * The node's label.
     */
    label?: string;
    /**
     * The node's incoming links.
     */
    linksIn?: Array<any>;
    /**
     * The node's outgoing links.
     */
    linksOut?: Array<any>;
    /**
     * Shows the sankey node's tooltip.
     */
    showTooltip(): void;
    /**
     * The node's label.
     * @deprecated Use label instead.
     */
    title?: string;
}

declare global {
interface JQuery {
    dxSankey(): JQuery;
    dxSankey(options: "instance"): dxSankey;
    dxSankey(options: string): any;
    dxSankey(options: string, ...params: any[]): any;
    dxSankey(options: dxSankeyOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxSankeyOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxSankeyOptions;