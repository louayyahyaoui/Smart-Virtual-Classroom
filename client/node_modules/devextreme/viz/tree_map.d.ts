/**
* DevExtreme (viz/tree_map.d.ts)
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
    Font,
    WordWrapType,
    VizTextOverflowType,
} from './core/base_widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeMapOptions extends BaseWidgetOptions<dxTreeMap> {
    /**
     * Specifies the name of the data source field that provides nested items for a group. Applies to hierarchical data sources only.
     */
    childrenField?: string;
    /**
     * Specifies the name of the data source field that provides colors for tiles.
     */
    colorField?: string;
    /**
     * Manages the color settings.
     */
    colorizer?: { colorCodeField?: string, colorizeGroups?: boolean, palette?: Array<string> | PaletteType, paletteExtensionMode?: PaletteExtensionModeType, range?: Array<number>, type?: 'discrete' | 'gradient' | 'none' | 'range' };
    /**
     * Binds the UI component to data.
     */
    dataSource?: Array<any> | DataSource | DataSourceOptions | string;
    /**
     * Configures groups.
     */
    group?: { border?: { color?: string, width?: number }, color?: string, headerHeight?: number, hoverEnabled?: boolean, hoverStyle?: { border?: { color?: string, width?: number }, color?: string }, label?: { font?: Font, textOverflow?: VizTextOverflowType, visible?: boolean }, selectionStyle?: { border?: { color?: string, width?: number }, color?: string } };
    /**
     * Specifies whether tiles and groups change their style when a user pauses on them.
     */
    hoverEnabled?: boolean;
    /**
     * Specifies the name of the data source field that provides IDs for items. Applies to plain data sources only.
     */
    idField?: string;
    /**
     * Specifies whether the user will interact with a single tile or its group.
     */
    interactWithGroup?: boolean;
    /**
     * Specifies the name of the data source field that provides texts for tile and group labels.
     */
    labelField?: string;
    /**
     * Specifies the layout algorithm.
     */
    layoutAlgorithm?: 'sliceanddice' | 'squarified' | 'strip' | ((e: { rect?: Array<number>, sum?: number, items?: Array<any> }) => any);
    /**
     * Specifies the direction in which the items will be laid out.
     */
    layoutDirection?: 'leftBottomRightTop' | 'leftTopRightBottom' | 'rightBottomLeftTop' | 'rightTopLeftBottom';
    /**
     * Specifies how many hierarchical levels must be visualized.
     */
    maxDepth?: number;
    /**
     * A function that is executed when a node is clicked or tapped.
     */
    onClick?: ((e: { component?: dxTreeMap, element?: dxElement, model?: any, event?: event, node?: dxTreeMapNode }) => any) | string;
    /**
     * A function that is executed when a user drills up or down.
     */
    onDrill?: ((e: { component?: dxTreeMap, element?: dxElement, model?: any, node?: dxTreeMapNode }) => any);
    /**
     * A function that is executed after the pointer enters or leaves a node.
     */
    onHoverChanged?: ((e: { component?: dxTreeMap, element?: dxElement, model?: any, node?: dxTreeMapNode }) => any);
    /**
     * A function that is executed only once, after the nodes are initialized.
     */
    onNodesInitialized?: ((e: { component?: dxTreeMap, element?: dxElement, model?: any, root?: dxTreeMapNode }) => any);
    /**
     * A function that is executed before the nodes are displayed and each time the collection of active nodes is changed.
     */
    onNodesRendering?: ((e: { component?: dxTreeMap, element?: dxElement, model?: any, node?: dxTreeMapNode }) => any);
    /**
     * A function that is executed when a node is selected or selection is canceled.
     */
    onSelectionChanged?: ((e: { component?: dxTreeMap, element?: dxElement, model?: any, node?: dxTreeMapNode }) => any);
    /**
     * Specifies the name of the data source field that provides parent IDs for items. Applies to plain data sources only.
     */
    parentField?: string;
    /**
     * Specifies whether a single or multiple nodes can be in the selected state simultaneously.
     */
    selectionMode?: 'multiple' | 'none' | 'single';
    /**
     * Configures tiles.
     */
    tile?: { border?: { color?: string, width?: number }, color?: string, hoverStyle?: { border?: { color?: string, width?: number }, color?: string }, label?: { font?: Font, textOverflow?: VizTextOverflowType, visible?: boolean, wordWrap?: WordWrapType }, selectionStyle?: { border?: { color?: string, width?: number }, color?: string } };
    /**
     * Configures tooltips - small pop-up rectangles that display information about a data-visualizing UI component element being pressed or hovered over with the mouse pointer.
     */
    tooltip?: dxTreeMapTooltip;
    /**
     * Specifies the name of the data source field that provides values for tiles.
     */
    valueField?: string;
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeMapTooltip extends BaseWidgetTooltip {
    /**
     * Specifies a custom template for a tooltip.
     */
    contentTemplate?: template | ((info: { value?: number, valueText?: string, node?: dxTreeMapNode }, element: dxElement) => string | Element | JQuery);
    /**
     * Allows you to change tooltip appearance.
     */
    customizeTooltip?: ((info: { value?: number, valueText?: string, node?: dxTreeMapNode }) => any);
}
/**
 * The TreeMap is a UI component that displays hierarchical data by using nested rectangles.
 */
export default class dxTreeMap extends BaseWidget {
    constructor(element: Element, options?: dxTreeMapOptions)
    constructor(element: JQuery, options?: dxTreeMapOptions)
    /**
     * Deselects all nodes in the UI component.
     */
    clearSelection(): void;
    /**
     * Drills one level up.
     */
    drillUp(): void;
    /**
     * Gets the current node.
     */
    getCurrentNode(): dxTreeMapNode;
    getDataSource(): DataSource;
    /**
     * Gets the root node.
     */
    getRootNode(): dxTreeMapNode;
    /**
     * Hides the tooltip.
     */
    hideTooltip(): void;
    /**
     * Resets the drill down level.
     */
    resetDrillDown(): void;
}

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxTreeMapNode {
    /**
     * Customizes the node.
     */
    customize(options: any): void;
    /**
     * The object from the data source visualized by the node.
     */
    data?: any;
    /**
     * Drills down into the node.
     */
    drillDown(): void;
    /**
     * Returns all nodes nested in the current node.
     */
    getAllChildren(): Array<dxTreeMapNode>;
    /**
     * Returns all descendant nodes.
     */
    getAllNodes(): Array<dxTreeMapNode>;
    /**
     * Gets a specific node from a collection of direct descendants.
     */
    getChild(index: number): dxTreeMapNode;
    /**
     * Indicates how many direct descendants the current node has.
     */
    getChildrenCount(): number;
    /**
     * Returns the parent node of the current node.
     */
    getParent(): dxTreeMapNode;
    /**
     * The index of the current node in the array of all nodes on the same level.
     */
    index?: number;
    /**
     * Indicates whether the current node is active.
     */
    isActive(): boolean;
    /**
     * Indicates whether the node is in the hover state or not.
     */
    isHovered(): boolean;
    /**
     * Indicates whether the node is visualized by a tile or a group of tiles.
     */
    isLeaf(): boolean;
    /**
     * Indicates whether the node is selected or not.
     */
    isSelected(): boolean;
    /**
     * Returns the label of the node.
     */
    label(): string;
    /**
     * Sets the label to the node.
     */
    label(label: string): void;
    /**
     * The level that the current node occupies in the hierarchy of nodes.
     */
    level?: number;
    /**
     * Reverts the appearance of the node to the initial state.
     */
    resetCustomization(): void;
    /**
     * Sets the selection state of a node.
     */
    select(state: boolean): void;
    /**
     * Shows the tooltip.
     */
    showTooltip(): void;
    /**
     * Gets the raw value of the node.
     */
    value(): number;
}

declare global {
interface JQuery {
    dxTreeMap(): JQuery;
    dxTreeMap(options: "instance"): dxTreeMap;
    dxTreeMap(options: string): any;
    dxTreeMap(options: string, ...params: any[]): any;
    dxTreeMap(options: dxTreeMapOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxTreeMapOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxTreeMapOptions;
