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
exports.ZoomLevel = exports.ViewToolbar = exports.ToolboxGroup = exports.Toolbox = exports.TabGroup = exports.Tab = exports.PropertiesPanel = exports.PageSizeItem = exports.PageSize = exports.Nodes = exports.MainToolbar = exports.Item = exports.HistoryToolbar = exports.Group = exports.GridSize = exports.Export = exports.Editing = exports.Edges = exports.DefaultItemProperties = exports.CustomShape = exports.ContextToolbox = exports.ContextMenu = exports.ConnectionPoint = exports.CommandItem = exports.Command = exports.AutoLayout = exports.Diagram = void 0;
var diagram_1 = require("devextreme/ui/diagram");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Diagram = /** @class */ (function (_super) {
    __extends(Diagram, _super);
    function Diagram() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = diagram_1.default;
        _this.independentEvents = ["onContentReady", "onCustomCommand", "onDisposing", "onInitialized", "onItemClick", "onItemDblClick", "onOptionChanged", "onRequestEditOperation", "onRequestLayoutUpdate", "onSelectionChanged"];
        _this._expectedChildren = {
            contextMenu: { optionName: "contextMenu", isCollectionItem: false },
            contextToolbox: { optionName: "contextToolbox", isCollectionItem: false },
            customShape: { optionName: "customShapes", isCollectionItem: true },
            defaultItemProperties: { optionName: "defaultItemProperties", isCollectionItem: false },
            edges: { optionName: "edges", isCollectionItem: false },
            editing: { optionName: "editing", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            gridSize: { optionName: "gridSize", isCollectionItem: false },
            historyToolbar: { optionName: "historyToolbar", isCollectionItem: false },
            mainToolbar: { optionName: "mainToolbar", isCollectionItem: false },
            nodes: { optionName: "nodes", isCollectionItem: false },
            pageSize: { optionName: "pageSize", isCollectionItem: false },
            propertiesPanel: { optionName: "propertiesPanel", isCollectionItem: false },
            toolbox: { optionName: "toolbox", isCollectionItem: false },
            viewToolbar: { optionName: "viewToolbar", isCollectionItem: false },
            zoomLevel: { optionName: "zoomLevel", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "customShapeTemplate",
                render: "customShapeRender",
                component: "customShapeComponent",
                keyFn: "customShapeKeyFn"
            }, {
                tmplOption: "customShapeToolboxTemplate",
                render: "customShapeToolboxRender",
                component: "customShapeToolboxComponent",
                keyFn: "customShapeToolboxKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Diagram.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Diagram;
}(component_1.Component));
exports.Diagram = Diagram;
Diagram.propTypes = {
    autoZoomMode: PropTypes.oneOf([
        "fitContent",
        "fitWidth",
        "disabled"
    ]),
    contextMenu: PropTypes.object,
    contextToolbox: PropTypes.object,
    customShapes: PropTypes.array,
    defaultItemProperties: PropTypes.object,
    disabled: PropTypes.bool,
    edges: PropTypes.object,
    editing: PropTypes.object,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    fullScreen: PropTypes.bool,
    gridSize: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]),
    hasChanges: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    historyToolbar: PropTypes.object,
    mainToolbar: PropTypes.object,
    nodes: PropTypes.object,
    onContentReady: PropTypes.func,
    onCustomCommand: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.func,
    onItemDblClick: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onRequestEditOperation: PropTypes.func,
    onRequestLayoutUpdate: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    pageColor: PropTypes.string,
    pageOrientation: PropTypes.oneOf([
        "portrait",
        "landscape"
    ]),
    pageSize: PropTypes.object,
    propertiesPanel: PropTypes.object,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    showGrid: PropTypes.bool,
    simpleView: PropTypes.bool,
    snapToGrid: PropTypes.bool,
    toolbox: PropTypes.object,
    units: PropTypes.oneOf([
        "in",
        "cm",
        "px"
    ]),
    viewToolbar: PropTypes.object,
    viewUnits: PropTypes.oneOf([
        "in",
        "cm",
        "px"
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    zoomLevel: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ])
};
var AutoLayout = /** @class */ (function (_super) {
    __extends(AutoLayout, _super);
    function AutoLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AutoLayout.OptionName = "autoLayout";
    return AutoLayout;
}(nested_option_1.default));
exports.AutoLayout = AutoLayout;
var Command = /** @class */ (function (_super) {
    __extends(Command, _super);
    function Command() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Command.OptionName = "commands";
    Command.IsCollectionItem = true;
    return Command;
}(nested_option_1.default));
exports.Command = Command;
var CommandItem = /** @class */ (function (_super) {
    __extends(CommandItem, _super);
    function CommandItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandItem.OptionName = "items";
    CommandItem.IsCollectionItem = true;
    return CommandItem;
}(nested_option_1.default));
exports.CommandItem = CommandItem;
var ConnectionPoint = /** @class */ (function (_super) {
    __extends(ConnectionPoint, _super);
    function ConnectionPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConnectionPoint.OptionName = "connectionPoints";
    ConnectionPoint.IsCollectionItem = true;
    return ConnectionPoint;
}(nested_option_1.default));
exports.ConnectionPoint = ConnectionPoint;
var ContextMenu = /** @class */ (function (_super) {
    __extends(ContextMenu, _super);
    function ContextMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextMenu.OptionName = "contextMenu";
    ContextMenu.ExpectedChildren = {
        command: { optionName: "commands", isCollectionItem: true }
    };
    return ContextMenu;
}(nested_option_1.default));
exports.ContextMenu = ContextMenu;
var ContextToolbox = /** @class */ (function (_super) {
    __extends(ContextToolbox, _super);
    function ContextToolbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContextToolbox.OptionName = "contextToolbox";
    return ContextToolbox;
}(nested_option_1.default));
exports.ContextToolbox = ContextToolbox;
var CustomShape = /** @class */ (function (_super) {
    __extends(CustomShape, _super);
    function CustomShape() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomShape.OptionName = "customShapes";
    CustomShape.IsCollectionItem = true;
    CustomShape.ExpectedChildren = {
        connectionPoint: { optionName: "connectionPoints", isCollectionItem: true }
    };
    CustomShape.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }, {
            tmplOption: "toolboxTemplate",
            render: "toolboxRender",
            component: "toolboxComponent",
            keyFn: "toolboxKeyFn"
        }];
    return CustomShape;
}(nested_option_1.default));
exports.CustomShape = CustomShape;
var DefaultItemProperties = /** @class */ (function (_super) {
    __extends(DefaultItemProperties, _super);
    function DefaultItemProperties() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultItemProperties.OptionName = "defaultItemProperties";
    return DefaultItemProperties;
}(nested_option_1.default));
exports.DefaultItemProperties = DefaultItemProperties;
var Edges = /** @class */ (function (_super) {
    __extends(Edges, _super);
    function Edges() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Edges.OptionName = "edges";
    return Edges;
}(nested_option_1.default));
exports.Edges = Edges;
var Editing = /** @class */ (function (_super) {
    __extends(Editing, _super);
    function Editing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Editing.OptionName = "editing";
    return Editing;
}(nested_option_1.default));
exports.Editing = Editing;
var Export = /** @class */ (function (_super) {
    __extends(Export, _super);
    function Export() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Export.OptionName = "export";
    return Export;
}(nested_option_1.default));
exports.Export = Export;
var GridSize = /** @class */ (function (_super) {
    __extends(GridSize, _super);
    function GridSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GridSize.OptionName = "gridSize";
    return GridSize;
}(nested_option_1.default));
exports.GridSize = GridSize;
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.OptionName = "groups";
    Group.IsCollectionItem = true;
    return Group;
}(nested_option_1.default));
exports.Group = Group;
var HistoryToolbar = /** @class */ (function (_super) {
    __extends(HistoryToolbar, _super);
    function HistoryToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HistoryToolbar.OptionName = "historyToolbar";
    HistoryToolbar.ExpectedChildren = {
        command: { optionName: "commands", isCollectionItem: true }
    };
    return HistoryToolbar;
}(nested_option_1.default));
exports.HistoryToolbar = HistoryToolbar;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    return Item;
}(nested_option_1.default));
exports.Item = Item;
var MainToolbar = /** @class */ (function (_super) {
    __extends(MainToolbar, _super);
    function MainToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MainToolbar.OptionName = "mainToolbar";
    MainToolbar.ExpectedChildren = {
        command: { optionName: "commands", isCollectionItem: true }
    };
    return MainToolbar;
}(nested_option_1.default));
exports.MainToolbar = MainToolbar;
var Nodes = /** @class */ (function (_super) {
    __extends(Nodes, _super);
    function Nodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Nodes.OptionName = "nodes";
    Nodes.ExpectedChildren = {
        autoLayout: { optionName: "autoLayout", isCollectionItem: false }
    };
    return Nodes;
}(nested_option_1.default));
exports.Nodes = Nodes;
var PageSize = /** @class */ (function (_super) {
    __extends(PageSize, _super);
    function PageSize() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageSize.OptionName = "pageSize";
    PageSize.ExpectedChildren = {
        item: { optionName: "items", isCollectionItem: true },
        pageSizeItem: { optionName: "items", isCollectionItem: true }
    };
    return PageSize;
}(nested_option_1.default));
exports.PageSize = PageSize;
var PageSizeItem = /** @class */ (function (_super) {
    __extends(PageSizeItem, _super);
    function PageSizeItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PageSizeItem.OptionName = "items";
    PageSizeItem.IsCollectionItem = true;
    return PageSizeItem;
}(nested_option_1.default));
exports.PageSizeItem = PageSizeItem;
var PropertiesPanel = /** @class */ (function (_super) {
    __extends(PropertiesPanel, _super);
    function PropertiesPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PropertiesPanel.OptionName = "propertiesPanel";
    PropertiesPanel.ExpectedChildren = {
        tab: { optionName: "tabs", isCollectionItem: true }
    };
    return PropertiesPanel;
}(nested_option_1.default));
exports.PropertiesPanel = PropertiesPanel;
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tab.OptionName = "tabs";
    Tab.IsCollectionItem = true;
    Tab.ExpectedChildren = {
        command: { optionName: "commands", isCollectionItem: true },
        group: { optionName: "groups", isCollectionItem: true },
        tabGroup: { optionName: "groups", isCollectionItem: true }
    };
    return Tab;
}(nested_option_1.default));
exports.Tab = Tab;
var TabGroup = /** @class */ (function (_super) {
    __extends(TabGroup, _super);
    function TabGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TabGroup.OptionName = "groups";
    TabGroup.IsCollectionItem = true;
    TabGroup.ExpectedChildren = {
        command: { optionName: "commands", isCollectionItem: true }
    };
    return TabGroup;
}(nested_option_1.default));
exports.TabGroup = TabGroup;
var Toolbox = /** @class */ (function (_super) {
    __extends(Toolbox, _super);
    function Toolbox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Toolbox.OptionName = "toolbox";
    Toolbox.ExpectedChildren = {
        group: { optionName: "groups", isCollectionItem: true },
        toolboxGroup: { optionName: "groups", isCollectionItem: true }
    };
    return Toolbox;
}(nested_option_1.default));
exports.Toolbox = Toolbox;
var ToolboxGroup = /** @class */ (function (_super) {
    __extends(ToolboxGroup, _super);
    function ToolboxGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolboxGroup.OptionName = "groups";
    ToolboxGroup.IsCollectionItem = true;
    return ToolboxGroup;
}(nested_option_1.default));
exports.ToolboxGroup = ToolboxGroup;
var ViewToolbar = /** @class */ (function (_super) {
    __extends(ViewToolbar, _super);
    function ViewToolbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ViewToolbar.OptionName = "viewToolbar";
    ViewToolbar.ExpectedChildren = {
        command: { optionName: "commands", isCollectionItem: true }
    };
    return ViewToolbar;
}(nested_option_1.default));
exports.ViewToolbar = ViewToolbar;
var ZoomLevel = /** @class */ (function (_super) {
    __extends(ZoomLevel, _super);
    function ZoomLevel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZoomLevel.OptionName = "zoomLevel";
    return ZoomLevel;
}(nested_option_1.default));
exports.ZoomLevel = ZoomLevel;
exports.default = Diagram;
