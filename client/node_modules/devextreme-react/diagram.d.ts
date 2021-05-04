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

/// <reference types="react" />
import dxDiagram, { IOptions } from "devextreme/ui/diagram";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface IDiagramOptions extends IOptions, IHtmlOptions {
    customShapeRender?: (...params: any) => React.ReactNode;
    customShapeComponent?: React.ComponentType<any>;
    customShapeKeyFn?: (data: any) => string;
    customShapeToolboxRender?: (...params: any) => React.ReactNode;
    customShapeToolboxComponent?: React.ComponentType<any>;
    customShapeToolboxKeyFn?: (data: any) => string;
}
declare class Diagram extends BaseComponent<IDiagramOptions> {
    get instance(): dxDiagram;
    protected _WidgetClass: typeof dxDiagram;
    protected independentEvents: string[];
    protected _expectedChildren: {
        contextMenu: {
            optionName: string;
            isCollectionItem: boolean;
        };
        contextToolbox: {
            optionName: string;
            isCollectionItem: boolean;
        };
        customShape: {
            optionName: string;
            isCollectionItem: boolean;
        };
        defaultItemProperties: {
            optionName: string;
            isCollectionItem: boolean;
        };
        edges: {
            optionName: string;
            isCollectionItem: boolean;
        };
        editing: {
            optionName: string;
            isCollectionItem: boolean;
        };
        export: {
            optionName: string;
            isCollectionItem: boolean;
        };
        gridSize: {
            optionName: string;
            isCollectionItem: boolean;
        };
        historyToolbar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        mainToolbar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        nodes: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pageSize: {
            optionName: string;
            isCollectionItem: boolean;
        };
        propertiesPanel: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolbox: {
            optionName: string;
            isCollectionItem: boolean;
        };
        viewToolbar: {
            optionName: string;
            isCollectionItem: boolean;
        };
        zoomLevel: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IAutoLayoutProps {
    orientation?: any;
    type?: any;
}
declare class AutoLayout extends NestedOption<IAutoLayoutProps> {
    static OptionName: string;
}
interface ICommandProps {
    icon?: any;
    items?: any;
    name?: any;
    text?: any;
}
declare class Command extends NestedOption<ICommandProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface ICommandItemProps {
    icon?: any;
    items?: any;
    name?: any;
    text?: any;
}
declare class CommandItem extends NestedOption<ICommandItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IConnectionPointProps {
    x?: any;
    y?: any;
}
declare class ConnectionPoint extends NestedOption<IConnectionPointProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IContextMenuProps {
    commands?: any;
    enabled?: any;
}
declare class ContextMenu extends NestedOption<IContextMenuProps> {
    static OptionName: string;
    static ExpectedChildren: {
        command: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IContextToolboxProps {
    category?: any;
    displayMode?: any;
    enabled?: any;
    shapeIconsPerRow?: any;
    shapes?: any;
    width?: any;
}
declare class ContextToolbox extends NestedOption<IContextToolboxProps> {
    static OptionName: string;
}
interface ICustomShapeProps {
    allowEditImage?: any;
    allowEditText?: any;
    allowResize?: any;
    backgroundImageHeight?: any;
    backgroundImageLeft?: any;
    backgroundImageToolboxUrl?: any;
    backgroundImageTop?: any;
    backgroundImageUrl?: any;
    backgroundImageWidth?: any;
    baseType?: any;
    category?: any;
    connectionPoints?: {
        x?: any;
        y?: any;
    }[];
    defaultHeight?: any;
    defaultImageUrl?: any;
    defaultText?: any;
    defaultWidth?: any;
    imageHeight?: any;
    imageLeft?: any;
    imageTop?: any;
    imageWidth?: any;
    keepRatioOnAutoSize?: any;
    maxHeight?: any;
    maxWidth?: any;
    minHeight?: any;
    minWidth?: any;
    template?: any;
    templateHeight?: any;
    templateLeft?: any;
    templateTop?: any;
    templateWidth?: any;
    textHeight?: any;
    textLeft?: any;
    textTop?: any;
    textWidth?: any;
    title?: any;
    toolboxTemplate?: any;
    toolboxWidthToHeightRatio?: any;
    type?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
    toolboxRender?: (...params: any) => React.ReactNode;
    toolboxComponent?: React.ComponentType<any>;
    toolboxKeyFn?: (data: any) => string;
}
declare class CustomShape extends NestedOption<ICustomShapeProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        connectionPoint: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IDefaultItemPropertiesProps {
    connectorLineEnd?: any;
    connectorLineStart?: any;
    connectorLineType?: any;
    shapeMaxHeight?: any;
    shapeMaxWidth?: any;
    shapeMinHeight?: any;
    shapeMinWidth?: any;
    style?: any;
    textStyle?: any;
}
declare class DefaultItemProperties extends NestedOption<IDefaultItemPropertiesProps> {
    static OptionName: string;
}
interface IEdgesProps {
    customDataExpr?: any;
    dataSource?: any;
    fromExpr?: any;
    fromLineEndExpr?: any;
    fromPointIndexExpr?: any;
    keyExpr?: any;
    lineTypeExpr?: any;
    lockedExpr?: any;
    pointsExpr?: any;
    styleExpr?: any;
    textExpr?: any;
    textStyleExpr?: any;
    toExpr?: any;
    toLineEndExpr?: any;
    toPointIndexExpr?: any;
    zIndexExpr?: any;
}
declare class Edges extends NestedOption<IEdgesProps> {
    static OptionName: string;
}
interface IEditingProps {
    allowAddShape?: any;
    allowChangeConnection?: any;
    allowChangeConnectorPoints?: any;
    allowChangeConnectorText?: any;
    allowChangeShapeText?: any;
    allowDeleteConnector?: any;
    allowDeleteShape?: any;
    allowMoveShape?: any;
    allowResizeShape?: any;
}
declare class Editing extends NestedOption<IEditingProps> {
    static OptionName: string;
}
interface IExportProps {
    fileName?: any;
    proxyUrl?: any;
}
declare class Export extends NestedOption<IExportProps> {
    static OptionName: string;
}
interface IGridSizeProps {
    items?: any;
    value?: any;
}
declare class GridSize extends NestedOption<IGridSizeProps> {
    static OptionName: string;
}
interface IGroupProps {
    commands?: any;
    title?: any;
    category?: any;
    displayMode?: any;
    expanded?: any;
    shapes?: any;
}
declare class Group extends NestedOption<IGroupProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IHistoryToolbarProps {
    commands?: any;
    visible?: any;
}
declare class HistoryToolbar extends NestedOption<IHistoryToolbarProps> {
    static OptionName: string;
    static ExpectedChildren: {
        command: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IItemProps {
    icon?: any;
    items?: any;
    name?: any;
    text?: any;
    height?: any;
    width?: any;
}
declare class Item extends NestedOption<IItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IMainToolbarProps {
    commands?: any;
    visible?: any;
}
declare class MainToolbar extends NestedOption<IMainToolbarProps> {
    static OptionName: string;
    static ExpectedChildren: {
        command: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface INodesProps {
    autoLayout?: {
        orientation?: any;
        type?: any;
    };
    autoSizeEnabled?: any;
    containerChildrenExpr?: any;
    containerKeyExpr?: any;
    customDataExpr?: any;
    dataSource?: any;
    heightExpr?: any;
    imageUrlExpr?: any;
    itemsExpr?: any;
    keyExpr?: any;
    leftExpr?: any;
    lockedExpr?: any;
    parentKeyExpr?: any;
    styleExpr?: any;
    textExpr?: any;
    textStyleExpr?: any;
    topExpr?: any;
    typeExpr?: any;
    widthExpr?: any;
    zIndexExpr?: any;
}
declare class Nodes extends NestedOption<INodesProps> {
    static OptionName: string;
    static ExpectedChildren: {
        autoLayout: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPageSizeProps {
    height?: any;
    items?: {
        height?: any;
        text?: any;
        width?: any;
    }[];
    width?: any;
}
declare class PageSize extends NestedOption<IPageSizeProps> {
    static OptionName: string;
    static ExpectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
        pageSizeItem: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IPageSizeItemProps {
    height?: any;
    text?: any;
    width?: any;
}
declare class PageSizeItem extends NestedOption<IPageSizeItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IPropertiesPanelProps {
    tabs?: {
        commands?: any;
        groups?: {
            commands?: any;
            title?: any;
        }[];
        title?: any;
    }[];
    visibility?: any;
}
declare class PropertiesPanel extends NestedOption<IPropertiesPanelProps> {
    static OptionName: string;
    static ExpectedChildren: {
        tab: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITabProps {
    commands?: any;
    groups?: {
        commands?: any;
        title?: any;
    }[];
    title?: any;
}
declare class Tab extends NestedOption<ITabProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        command: {
            optionName: string;
            isCollectionItem: boolean;
        };
        group: {
            optionName: string;
            isCollectionItem: boolean;
        };
        tabGroup: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface ITabGroupProps {
    commands?: any;
    title?: any;
}
declare class TabGroup extends NestedOption<ITabGroupProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static ExpectedChildren: {
        command: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IToolboxProps {
    groups?: {
        category?: any;
        displayMode?: any;
        expanded?: any;
        shapes?: any;
        title?: any;
    }[];
    shapeIconsPerRow?: any;
    showSearch?: any;
    visibility?: any;
    width?: any;
}
declare class Toolbox extends NestedOption<IToolboxProps> {
    static OptionName: string;
    static ExpectedChildren: {
        group: {
            optionName: string;
            isCollectionItem: boolean;
        };
        toolboxGroup: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IToolboxGroupProps {
    category?: any;
    displayMode?: any;
    expanded?: any;
    shapes?: any;
    title?: any;
}
declare class ToolboxGroup extends NestedOption<IToolboxGroupProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
}
interface IViewToolbarProps {
    commands?: any;
    visible?: any;
}
declare class ViewToolbar extends NestedOption<IViewToolbarProps> {
    static OptionName: string;
    static ExpectedChildren: {
        command: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
}
interface IZoomLevelProps {
    items?: any;
    value?: any;
}
declare class ZoomLevel extends NestedOption<IZoomLevelProps> {
    static OptionName: string;
}
export default Diagram;
export { Diagram, IDiagramOptions, AutoLayout, IAutoLayoutProps, Command, ICommandProps, CommandItem, ICommandItemProps, ConnectionPoint, IConnectionPointProps, ContextMenu, IContextMenuProps, ContextToolbox, IContextToolboxProps, CustomShape, ICustomShapeProps, DefaultItemProperties, IDefaultItemPropertiesProps, Edges, IEdgesProps, Editing, IEditingProps, Export, IExportProps, GridSize, IGridSizeProps, Group, IGroupProps, HistoryToolbar, IHistoryToolbarProps, Item, IItemProps, MainToolbar, IMainToolbarProps, Nodes, INodesProps, PageSize, IPageSizeProps, PageSizeItem, IPageSizeItemProps, PropertiesPanel, IPropertiesPanelProps, Tab, ITabProps, TabGroup, ITabGroupProps, Toolbox, IToolboxProps, ToolboxGroup, IToolboxGroupProps, ViewToolbar, IViewToolbarProps, ZoomLevel, IZoomLevelProps };
