/**
* DevExtreme (ui/diagram.d.ts)
* Version: 20.2.6
* Build date: Tue Mar 16 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    dxElement, dxSVGElement
} from '../core/element';

import {
    template
} from '../core/templates/template';

import DataSource, {
    DataSourceOptions
} from '../data/data_source';

import Widget, {
    WidgetOptions
} from './widget/ui.widget';

/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramOptions extends WidgetOptions<dxDiagram> {
    /**
     * Specifies how the Diagram UI component automatically zooms the work area.
     */
    autoZoomMode?: 'fitContent' | 'fitWidth' | 'disabled';
    /**
     * Configures the context menu's settings.
     */
    contextMenu?: { commands?: Array<'separator'|'exportSvg'|'exportPng'|'exportJpg'|'undo'|'redo'|'cut'|'copy'|'paste'|'selectAll'|'delete'|'fontName'|'fontSize'|'bold'|'italic'|'underline'|'fontColor'|'lineColor'|'fillColor'|'textAlignLeft'|'textAlignCenter'|'textAlignRight'|'lock'|'unlock'|'sendToBack'|'bringToFront'|'insertShapeImage'|'editShapeImage'|'deleteShapeImage'|'connectorLineType'|'connectorLineStart'|'connectorLineEnd'|'layoutTreeTopToBottom'|'layoutTreeBottomToTop'|'layoutTreeLeftToRight'|'layoutTreeRightToLeft'|'layoutLayeredTopToBottom'|'layoutLayeredBottomToTop'|'layoutLayeredLeftToRight'|'layoutLayeredRightToLeft'|'fullScreen'|'zoomLevel'|'showGrid'|'snapToGrid'|'gridSize'|'units'|'pageSize'|'pageOrientation'|'pageColor'|'simpleView'|'toolbox'>, enabled?: boolean };
    /**
     * Configures the context toolbox's settings.
     */
    contextToolbox?: { category?: 'general' | 'flowchart' | 'orgChart' | 'containers' | 'custom' | string, displayMode?: 'icons' | 'texts', enabled?: boolean, shapes?: Array<'text' | 'rectangle' | 'ellipse' | 'cross' | 'triangle' | 'diamond' | 'heart' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'arrowLeft' | 'arrowTop' | 'arrowRight' | 'arrowBottom' | 'arrowNorthSouth' | 'arrowEastWest' | 'process' | 'decision' | 'terminator' | 'predefinedProcess' | 'document' | 'multipleDocuments' | 'manualInput' | 'preparation' | 'data' | 'database' | 'hardDisk' | 'internalStorage' | 'paperTape' | 'manualOperation' | 'delay' | 'storedData' | 'display' | 'merge' | 'connector' | 'or' | 'summingJunction' | 'verticalContainer' | 'horizontalContainer' | 'cardWithImageOnLeft' | 'cardWithImageOnTop' | 'cardWithImageOnRight'> | Array<string> };
    /**
     * A function that is executed after a custom command item was clicked and allows you to implement the custom command's logic.
     */
    onCustomCommand?: ((e: { component?: dxDiagram, element?: dxElement, name?: string }) => any);
    /**
     * Specifies a custom template for shapes.
     */
    customShapeTemplate?: template | ((container: dxSVGElement, data: { item?: dxDiagramShape }) => any);
    /**
     * Specifies a custom template for shapes in the toolbox.
     */
    customShapeToolboxTemplate?: template | ((container: dxSVGElement, data: { item?: dxDiagramShape }) => any);
    /**
     * Provide access to an array of custom shapes.
     */
    customShapes?: Array<{ allowEditImage?: boolean, allowEditText?: boolean, allowResize?: boolean, backgroundImageHeight?: number, backgroundImageLeft?: number, backgroundImageTop?: number, backgroundImageUrl?: string, backgroundImageToolboxUrl?: string, backgroundImageWidth?: number, baseType?: 'text' | 'rectangle' | 'ellipse' | 'cross' | 'triangle' | 'diamond' | 'heart' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'arrowLeft' | 'arrowTop' | 'arrowRight' | 'arrowBottom' | 'arrowNorthSouth' | 'arrowEastWest' | 'process' | 'decision' | 'terminator' | 'predefinedProcess' | 'document' | 'multipleDocuments' | 'manualInput' | 'preparation' | 'data' | 'database' | 'hardDisk' | 'internalStorage' | 'paperTape' | 'manualOperation' | 'delay' | 'storedData' | 'display' | 'merge' | 'connector' | 'or' | 'summingJunction' | 'verticalContainer' | 'horizontalContainer' | 'cardWithImageOnLeft' | 'cardWithImageOnTop' | 'cardWithImageOnRight' | string, category?: string, connectionPoints?: Array<{ x?: number, y?: number }>, defaultHeight?: number, defaultImageUrl?: string, defaultText?: string, defaultWidth?: number, imageHeight?: number, imageLeft?: number, imageTop?: number, imageWidth?: number, maxHeight?: number, maxWidth?: number, minHeight?: number, minWidth?: number, template?: template | ((container: dxSVGElement, data: { item?: dxDiagramShape }) => any), templateHeight?: number, templateLeft?: number, templateTop?: number, templateWidth?: number, textHeight?: number, textLeft?: number, textTop?: number, textWidth?: number, title?: string, type?: string, keepRatioOnAutoSize?: boolean }>;
    /**
     * Configures default item properties.
     */
    defaultItemProperties?: { style?: Object, textStyle?: Object, connectorLineType?: 'straight' | 'orthogonal', connectorLineStart?: 'none' | 'arrow' | 'outlinedTriangle' | 'filledTriangle', connectorLineEnd?: 'none' | 'arrow' | 'outlinedTriangle' | 'filledTriangle', shapeMinWidth?: number, shapeMaxWidth?: number, shapeMinHeight?: number, shapeMaxHeight?: number };
    /**
     * Specifies which editing operations a user can perform.
     */
    editing?: { allowAddShape?: boolean, allowDeleteShape?: boolean, allowDeleteConnector?: boolean, allowChangeConnection?: boolean, allowChangeConnectorPoints?: boolean, allowChangeConnectorText?: boolean, allowChangeShapeText?: boolean, allowResizeShape?: boolean, allowMoveShape?: boolean };
    /**
     * Allows you to bind the collection of diagram edges to a data source. For more information, see the Data Binding section.
     */
    edges?: { dataSource?: Array<any> | DataSource | DataSourceOptions, fromExpr?: string | ((data: any) => any), fromLineEndExpr?: string | ((data: any) => any), fromPointIndexExpr?: string | ((data: any) => any), keyExpr?: string | ((data: any) => any), lineTypeExpr?: string | ((data: any) => any), lockedExpr?: string | ((data: any) => any), pointsExpr?: string | ((data: any) => any), styleExpr?: string | ((data: any) => any), textExpr?: string | ((data: any) => any), textStyleExpr?: string | ((data: any) => any), toExpr?: string | ((data: any) => any), toLineEndExpr?: string | ((data: any) => any), toPointIndexExpr?: string | ((data: any) => any), zIndexExpr?: string | ((data: any) => any) };
    /**
     * Configures export settings.
     */
    export?: { fileName?: string, proxyUrl?: string };
    /**
     * Specifies whether or not to display the UI component in full-screen mode.
     */
    fullScreen?: boolean;
    /**
     * Specifies the grid pitch.
     */
    gridSize?: number | { items?: Array<number>, value?: number };
    /**
     * Allows you to bind the collection of diagram nodes to a data source. For more information, see the Data Binding section.
     */
    nodes?: { autoLayout?: 'off' | 'tree' | 'layered' | { orientation?: 'vertical' | 'horizontal', type?: 'off' | 'tree' | 'layered' }, autoSizeEnabled?: boolean, containerChildrenExpr?: string | ((data: any) => any), containerKeyExpr?: string | ((data: any) => any), dataSource?: Array<any> | DataSource | DataSourceOptions, heightExpr?: string | ((data: any) => any), imageUrlExpr?: string | ((data: any) => any), itemsExpr?: string | ((data: any) => any), keyExpr?: string | ((data: any) => any), leftExpr?: string | ((data: any) => any), lockedExpr?: string | ((data: any) => any), parentKeyExpr?: string | ((data: any) => any), styleExpr?: string | ((data: any) => any), textExpr?: string | ((data: any) => any), textStyleExpr?: string | ((data: any) => any), topExpr?: string | ((data: any) => any), typeExpr?: string | ((data: any) => any), widthExpr?: string | ((data: any) => any), zIndexExpr?: string | ((data: any) => any) };
    /**
     * Indicates whether diagram content has been changed.
     */
    hasChanges?: boolean;
    /**
     * A function that is executed after a shape or connector is clicked.
     */
    onItemClick?: ((e: { component?: dxDiagram, element?: dxElement, model?: any, item?: dxDiagramItem }) => any);
    /**
     * A function that is executed after a shape or connector is double-clicked.
     */
    onItemDblClick?: ((e: { component?: dxDiagram, element?: dxElement, model?: any, item?: dxDiagramItem }) => any);
    /**
     * A function that is executed after the selection is changed in the Diagram.
     */
    onSelectionChanged?: ((e: { component?: dxDiagram, element?: dxElement, model?: any, items?: Array<dxDiagramItem> }) => any);
    /**
     * A function that allows you to prohibit an edit operation at run time.
     */
    onRequestEditOperation?: ((e: { component?: dxDiagram, element?: dxElement, model?: any, operation?: 'addShape' | 'addShapeFromToolbox' | 'deleteShape' | 'deleteConnector' | 'changeConnection' | 'changeConnectorPoints', args?: dxDiagramAddShapeArgs|dxDiagramAddShapeFromToolboxArgs|dxDiagramDeleteShapeArgs|dxDiagramDeleteConnectorArgs|dxDiagramChangeConnectionArgs|dxDiagramChangeConnectorPointsArgs|dxDiagramBeforeChangeShapeTextArgs|dxDiagramChangeShapeTextArgs|dxDiagramBeforeChangeConnectorTextArgs|dxDiagramChangeConnectorTextArgs|dxDiagramResizeShapeArgs|dxDiagramMoveShapeArgs, reason?: 'checkUIElementAvailability' | 'modelModification', allowed?: boolean }) => any);
    /**
     * A function that is executed after diagram data is reloaded and allows you to specify whether or not the UI component should update the diagram layout.
     */
    onRequestLayoutUpdate?: ((e: { component?: dxDiagram, element?: dxElement, model?: any, changes?: any[], allowed?: boolean }) => any);
    /**
     * Specifies the color of a diagram page.
     */
    pageColor?: string;
    /**
     * Specifies the page orientation.
     */
    pageOrientation?: 'portrait' | 'landscape';
    /**
     * Specifies a size of pages.
     */
    pageSize?: { height?: number, items?: Array<{ height?: number, text?: string, width?: number }>, width?: number };
    /**
     * Configures the Properties panel settings.
     */
    propertiesPanel?: { tabs?: Array<{ commands?: Array<'separator'|'exportSvg'|'exportPng'|'exportJpg'|'undo'|'redo'|'cut'|'copy'|'paste'|'selectAll'|'delete'|'fontName'|'fontSize'|'bold'|'italic'|'underline'|'fontColor'|'lineColor'|'fillColor'|'textAlignLeft'|'textAlignCenter'|'textAlignRight'|'lock'|'unlock'|'sendToBack'|'bringToFront'|'insertShapeImage'|'editShapeImage'|'deleteShapeImage'|'connectorLineType'|'connectorLineStart'|'connectorLineEnd'|'layoutTreeTopToBottom'|'layoutTreeBottomToTop'|'layoutTreeLeftToRight'|'layoutTreeRightToLeft'|'layoutLayeredTopToBottom'|'layoutLayeredBottomToTop'|'layoutLayeredLeftToRight'|'layoutLayeredRightToLeft'|'fullScreen'|'zoomLevel'|'showGrid'|'snapToGrid'|'gridSize'|'units'|'pageSize'|'pageOrientation'|'pageColor'|'simpleView'|'toolbox'> }>, visibility?: 'auto' | 'visible' | 'collapsed' | 'disabled' };
    /**
     * Specifies whether the diagram is read-only.
     */
    readOnly?: boolean;
    /**
     * Specifies whether grid lines are visible.
     */
    showGrid?: boolean;
    /**
     * Switch the Diagram UI component to simple view mode.
     */
    simpleView?: boolean;
    /**
     * Specifies whether diagram elements should snap to grid lines.
     */
    snapToGrid?: boolean;
    /**
     * Configures the main toolbar settings.
     */
    mainToolbar?: { commands?: Array<'separator'|'exportSvg'|'exportPng'|'exportJpg'|'undo'|'redo'|'cut'|'copy'|'paste'|'selectAll'|'delete'|'fontName'|'fontSize'|'bold'|'italic'|'underline'|'fontColor'|'lineColor'|'fillColor'|'textAlignLeft'|'textAlignCenter'|'textAlignRight'|'lock'|'unlock'|'sendToBack'|'bringToFront'|'insertShapeImage'|'editShapeImage'|'deleteShapeImage'|'connectorLineType'|'connectorLineStart'|'connectorLineEnd'|'layoutTreeTopToBottom'|'layoutTreeBottomToTop'|'layoutTreeLeftToRight'|'layoutTreeRightToLeft'|'layoutLayeredTopToBottom'|'layoutLayeredBottomToTop'|'layoutLayeredLeftToRight'|'layoutLayeredRightToLeft'|'fullScreen'|'zoomLevel'|'showGrid'|'snapToGrid'|'gridSize'|'units'|'pageSize'|'pageOrientation'|'pageColor'|'simpleView'|'toolbox'>, visible?: boolean };
    /**
     * Configures the history toolbar's settings.
     */
    historyToolbar?: { commands?: Array<'separator'|'exportSvg'|'exportPng'|'exportJpg'|'undo'|'redo'|'cut'|'copy'|'paste'|'selectAll'|'delete'|'fontName'|'fontSize'|'bold'|'italic'|'underline'|'fontColor'|'lineColor'|'fillColor'|'textAlignLeft'|'textAlignCenter'|'textAlignRight'|'lock'|'unlock'|'sendToBack'|'bringToFront'|'insertShapeImage'|'editShapeImage'|'deleteShapeImage'|'connectorLineType'|'connectorLineStart'|'connectorLineEnd'|'layoutTreeTopToBottom'|'layoutTreeBottomToTop'|'layoutTreeLeftToRight'|'layoutTreeRightToLeft'|'layoutLayeredTopToBottom'|'layoutLayeredBottomToTop'|'layoutLayeredLeftToRight'|'layoutLayeredRightToLeft'|'fullScreen'|'zoomLevel'|'showGrid'|'snapToGrid'|'gridSize'|'units'|'pageSize'|'pageOrientation'|'pageColor'|'simpleView'|'toolbox'>, visible?: boolean };
    /**
     * Configures the view toolbar settings.
     */
    viewToolbar?: { commands?: Array<'separator'|'exportSvg'|'exportPng'|'exportJpg'|'undo'|'redo'|'cut'|'copy'|'paste'|'selectAll'|'delete'|'fontName'|'fontSize'|'bold'|'italic'|'underline'|'fontColor'|'lineColor'|'fillColor'|'textAlignLeft'|'textAlignCenter'|'textAlignRight'|'lock'|'unlock'|'sendToBack'|'bringToFront'|'insertShapeImage'|'editShapeImage'|'deleteShapeImage'|'connectorLineType'|'connectorLineStart'|'connectorLineEnd'|'layoutTreeTopToBottom'|'layoutTreeBottomToTop'|'layoutTreeLeftToRight'|'layoutTreeRightToLeft'|'layoutLayeredTopToBottom'|'layoutLayeredBottomToTop'|'layoutLayeredLeftToRight'|'layoutLayeredRightToLeft'|'fullScreen'|'zoomLevel'|'showGrid'|'snapToGrid'|'gridSize'|'units'|'pageSize'|'pageOrientation'|'pageColor'|'simpleView'|'toolbox'>, visible?: boolean };
    /**
     * Configures the toolbox settings.
     */
    toolbox?: { groups?: Array<{ category?: 'general' | 'flowchart' | 'orgChart' | 'containers' | 'custom' | string, displayMode?: 'icons' | 'texts', expanded?: boolean, shapes?: Array<'text' | 'rectangle' | 'ellipse' | 'cross' | 'triangle' | 'diamond' | 'heart' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'arrowLeft' | 'arrowTop' | 'arrowRight' | 'arrowBottom' | 'arrowNorthSouth' | 'arrowEastWest' | 'process' | 'decision' | 'terminator' | 'predefinedProcess' | 'document' | 'multipleDocuments' | 'manualInput' | 'preparation' | 'data' | 'database' | 'hardDisk' | 'internalStorage' | 'paperTape' | 'manualOperation' | 'delay' | 'storedData' | 'display' | 'merge' | 'connector' | 'or' | 'summingJunction' | 'verticalContainer' | 'horizontalContainer' | 'cardWithImageOnLeft' | 'cardWithImageOnTop' | 'cardWithImageOnRight'> | Array<string>, title?: string }> | Array<'general' | 'flowchart' | 'orgChart' | 'containers' | 'custom'>, visibility?: 'auto' | 'visible' | 'collapsed' | 'disabled' };
    /**
     * Specifies the measurement unit for size properties.
     */
    units?: 'in' | 'cm' | 'px';
    /**
     * Specifies the measurement unit that is displayed in user interface elements.
     */
    viewUnits?: 'in' | 'cm' | 'px';
    /**
     * Specifies the zoom level.
     */
    zoomLevel?: number | { items?: Array<number>, value?: number };
}
/**
 * The Diagram UI component provides a visual interface to help you design new and modify existing diagrams.
 */
export default class dxDiagram extends Widget {
    constructor(element: Element, options?: dxDiagramOptions)
    constructor(element: JQuery, options?: dxDiagramOptions)
    /**
     * Gets the DataSource instance.
     */
    getNodeDataSource(): DataSource;
    /**
     * Returns the DataSource instance.
     */
    getEdgeDataSource(): DataSource;
    /**
     * Returns a shape or connector object specified by its key.
     */
    getItemByKey(key: Object): dxDiagramItem;
    /**
     * Returns a shape or connector object specified by its internal identifier.
     */
    getItemById(id: string): dxDiagramItem;
    /**
     * Exports the diagram data to a JSON object.
     */
    export(): string;
    /**
     * Exports the diagram to an image format.
     */
    exportTo(format: 'svg' | 'png' | 'jpg', callback: Function): void;
    /**
     * Imports the diagram data.
     */
    import(data: string, updateExistingItemsOnly?: boolean): void;
    /**
     * Updates the diagram toolboxes.
     */
    updateToolbox(): void;
}

/**
 * An object that provides information about a connector in the Diagram UI component.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramConnector extends dxDiagramItem {
    /**
     * Specifies the connector's start node key.
     */
    fromKey?: any;
    /**
     * Gets the connector's start node identifier.
     */
    fromId?: string;
    /**
     * The index of a shape connection point where the connector starts.
     */
    fromPointIndex?: number;
    /**
     * Gets the connector's key points.
     */
    points?: Array<Object>;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * Specifies the connector's text.
     */
    texts?: Array<string>;
    /**
     * Specifies the connector's end node key.
     */
    toKey?: any;
    /**
     * Gets the connector's end node identifier.
     */
    toId?: string;
    /**
     * The index of the shape connection point where the connector ends.
     */
    toPointIndex?: number;
}

/**
 * An object that provides information about an item (shape or connector) in the Diagram UI component.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramItem {
    /**
     * Returns the data item that is bound to the diagram item.
     */
    dataItem?: any;
    /**
     * Specifies the item's internal identifier.
     */
    id?: string;
    /**
     * Gets the item's key from a data source.
     */
    key?: Object;
    /**
     * Returns the type of the item.
     */
    itemType?: 'shape' | 'connector';
}

/**
 * An object that provides information about a shape in the Diagram UI component.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramShape extends dxDiagramItem {
    /**
     * Specifies the shape's text.
     */
    text?: string;
    /**
     * Specifies the shape type. The built-in shape types are shown in the Shape Types section.
     */
    type?: 'text' | 'rectangle' | 'ellipse' | 'cross' | 'triangle' | 'diamond' | 'heart' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'arrowLeft' | 'arrowTop' | 'arrowRight' | 'arrowBottom' | 'arrowNorthSouth' | 'arrowEastWest' | 'process' | 'decision' | 'terminator' | 'predefinedProcess' | 'document' | 'multipleDocuments' | 'manualInput' | 'preparation' | 'data' | 'database' | 'hardDisk' | 'internalStorage' | 'paperTape' | 'manualOperation' | 'delay' | 'storedData' | 'display' | 'merge' | 'connector' | 'or' | 'summingJunction' | 'verticalContainer' | 'horizontalContainer' | 'cardWithImageOnLeft' | 'cardWithImageOnTop' | 'cardWithImageOnRight' | string;
    /**
     * Specifies the shape position (x- and y-coordinates) in units.
     */
    position?: Object;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * Specifies the shape size in in units.
     */
    size?: Object;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * Gets an array of attached connector identifiers.
     */
    attachedConnectorIds?: string[];
    /**
     * Gets the identifier of the container that stores the shape.
     */
    containerId?: string;
    /**
     * Gets identifiers of shapes stored in the container.
     */
    containerChildItemIds?: Array<String>;
    /**
     * Gets whether the container is expanded.
     */
    containerExpanded?: boolean;
}

/**
 * An object that provides information about a custom command in the Diagram UI component.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramCustomCommand {
    /**
     * Specifies the custom command's identifier.
     */
    name?: string;
    /**
     * Specifies the custom command's text and tooltip text.
     */
    text?: string;
    /**
     * Specifies the custom command's icon.
     */
    icon?: string;
    /**
     * Lists command sub items.
     */
    items?: Array<dxDiagramCustomCommand>;
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramAddShapeArgs {
    /**
     * The processed shape.
     */
    shape?: dxDiagramShape;
    /**
     * A position where the shape is being added.
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    position?: Object;
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
    /**
     * 
     * Warning! This type is used for internal purposes. Do not import it directly.
     */
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramAddShapeFromToolboxArgs {
  /**
   * The type of the processed shape.
   */
  shapeType?: 'text' | 'rectangle' | 'ellipse' | 'cross' | 'triangle' | 'diamond' | 'heart' | 'pentagon' | 'hexagon' | 'octagon' | 'star' | 'arrowLeft' | 'arrowTop' | 'arrowRight' | 'arrowBottom' | 'arrowNorthSouth' | 'arrowEastWest' | 'process' | 'decision' | 'terminator' | 'predefinedProcess' | 'document' | 'multipleDocuments' | 'manualInput' | 'preparation' | 'data' | 'database' | 'hardDisk' | 'internalStorage' | 'paperTape' | 'manualOperation' | 'delay' | 'storedData' | 'display' | 'merge' | 'connector' | 'or' | 'summingJunction' | 'verticalContainer' | 'horizontalContainer' | 'cardWithImageOnLeft' | 'cardWithImageOnTop' | 'cardWithImageOnRight' | string;
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramDeleteShapeArgs {
  /**
   * The processed shape.
   */
  shape?: dxDiagramShape;
}

/**
 * Contains information about the processed connector.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramDeleteConnectorArgs {
  /**
   * The processed connector.
   */
  connector?: dxDiagramConnector;
}

/**
 * Contains information about the processed connection.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramChangeConnectionArgs {
  /**
   * The new connected shape.
   */
  newShape?: dxDiagramShape;
  /**
   * The previous connected shape.
   */
  oldShape?: dxDiagramShape;
  /**
   * The processed connector.
   */
  connector?: dxDiagramConnector;
  /**
   * The index of the processed point in the shape's connection point collection.
   */
  connectionPointIndex?: number;
  /**
   * The position of the connector in the processed point.
   */
  connectorPosition?: 'start' | 'end';
}

/**
 * Contains information about the processed connector.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramChangeConnectorPointsArgs {
  /**
   * The processed connector.
   */
  connector?: dxDiagramConnector;
  /**
   * The array of new connection points.
   * Warning! This type is used for internal purposes. Do not import it directly.
   */
   newPoints?: Array<Object>;
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
  /**
   * The array of previous connection points.
   * Warning! This type is used for internal purposes. Do not import it directly.
   */
   oldPoints?: Array<Object>;
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramBeforeChangeShapeTextArgs {
  /**
   * The processed shape.
   */
  shape?: dxDiagramShape;
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramChangeShapeTextArgs {
  /**
   * The processed shape.
   */
  shape?: dxDiagramShape;
  /**
   * The new shape text.
   */
  text?: string;
}

/**
 * Contains information about the processed connector.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramBeforeChangeConnectorTextArgs {
  /**
   * The processed connector.
   */
  connector?: dxDiagramConnector;
  /**
   * The index of the processed text in the connector's texts collection.
   */
  index?: number;
}

/**
 * Contains information about the processed connector.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramChangeConnectorTextArgs {
  /**
   * The processed connector.
   */
  connector?: dxDiagramConnector;
  /**
   * The index of the processed text in the connector's texts collection.
   */
  index?: number;
  /**
   * The new connector text.
   */
  text?: string;
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramResizeShapeArgs {
  /**
   * The processed shape.
   */
  shape?: dxDiagramShape;
  /**
   * The new shape size.
   * Warning! This type is used for internal purposes. Do not import it directly.
   */
   newSize?: Object;
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
  /**
   * The previous shape size.
   * Warning! This type is used for internal purposes. Do not import it directly.
   */
   oldSize?: Object;
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
}

/**
 * Contains information about the processed shape.
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export interface dxDiagramMoveShapeArgs {
  /**
   * The processed shape.
   */
  shape?: dxDiagramShape;
  /**
   * The new shape position (x- and y-coordinates) specified in units.
   * Warning! This type is used for internal purposes. Do not import it directly.
   */
   newSize?: Object;
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
  /**
   * The previous shape position (x- and y-coordinates) specified in units.
   * Warning! This type is used for internal purposes. Do not import it directly.
   */
   oldSize?: Object;
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
   /**
    * 
    * Warning! This type is used for internal purposes. Do not import it directly.
    */
}

declare global {
interface JQuery {
    dxDiagram(): JQuery;
    dxDiagram(options: "instance"): dxDiagram;
    dxDiagram(options: string): any;
    dxDiagram(options: string, ...params: any[]): any;
    dxDiagram(options: dxDiagramOptions): JQuery;
}
}
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type Options = dxDiagramOptions;

/** @deprecated use Options instead */
/**
 * Warning! This type is used for internal purposes. Do not import it directly.
 */
export type IOptions = dxDiagramOptions;
