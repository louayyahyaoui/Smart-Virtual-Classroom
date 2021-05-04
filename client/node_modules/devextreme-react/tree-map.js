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
exports.TreeMapborder = exports.TooltipBorder = exports.Tooltip = exports.Title = exports.TileLabel = exports.Tile = exports.Subtitle = exports.Size = exports.Shadow = exports.SelectionStyle = exports.Margin = exports.LoadingIndicator = exports.Label = exports.HoverStyle = exports.GroupLabel = exports.Group = exports.Format = exports.Font = exports.Export = exports.Colorizer = exports.Border = exports.TreeMap = void 0;
var tree_map_1 = require("devextreme/viz/tree_map");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var TreeMap = /** @class */ (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = tree_map_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show"];
        _this.independentEvents = ["onClick", "onDisposing", "onDrawn", "onDrill", "onExported", "onExporting", "onFileSaving", "onHoverChanged", "onIncidentOccurred", "onInitialized", "onNodesInitialized", "onNodesRendering", "onOptionChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator"
        };
        _this._expectedChildren = {
            colorizer: { optionName: "colorizer", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            group: { optionName: "group", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            tile: { optionName: "tile", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(TreeMap.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return TreeMap;
}(component_1.Component));
exports.TreeMap = TreeMap;
TreeMap.propTypes = {
    childrenField: PropTypes.string,
    colorField: PropTypes.string,
    colorizer: PropTypes.object,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    group: PropTypes.object,
    hoverEnabled: PropTypes.bool,
    idField: PropTypes.string,
    interactWithGroup: PropTypes.bool,
    labelField: PropTypes.string,
    layoutAlgorithm: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.oneOf([
            "sliceanddice",
            "squarified",
            "strip"
        ])
    ]),
    layoutDirection: PropTypes.oneOf([
        "leftBottomRightTop",
        "leftTopRightBottom",
        "rightBottomLeftTop",
        "rightTopLeftBottom"
    ]),
    loadingIndicator: PropTypes.object,
    maxDepth: PropTypes.number,
    onClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onDisposing: PropTypes.func,
    onDrawn: PropTypes.func,
    onDrill: PropTypes.func,
    onExported: PropTypes.func,
    onExporting: PropTypes.func,
    onFileSaving: PropTypes.func,
    onHoverChanged: PropTypes.func,
    onIncidentOccurred: PropTypes.func,
    onInitialized: PropTypes.func,
    onNodesInitialized: PropTypes.func,
    onNodesRendering: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    parentField: PropTypes.string,
    pathModified: PropTypes.bool,
    redrawOnResize: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    selectionMode: PropTypes.oneOf([
        "multiple",
        "none",
        "single"
    ]),
    size: PropTypes.object,
    theme: PropTypes.oneOf([
        "generic.dark",
        "generic.light",
        "generic.contrast",
        "generic.carmine",
        "generic.darkmoon",
        "generic.darkviolet",
        "generic.greenmist",
        "generic.softblue",
        "material.blue.light",
        "material.lime.light",
        "material.orange.light",
        "material.purple.light",
        "material.teal.light"
    ]),
    tile: PropTypes.object,
    title: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    tooltip: PropTypes.object,
    valueField: PropTypes.string
};
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Border.OptionName = "border";
    return Border;
}(nested_option_1.default));
exports.Border = Border;
var Colorizer = /** @class */ (function (_super) {
    __extends(Colorizer, _super);
    function Colorizer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Colorizer.OptionName = "colorizer";
    return Colorizer;
}(nested_option_1.default));
exports.Colorizer = Colorizer;
var Export = /** @class */ (function (_super) {
    __extends(Export, _super);
    function Export() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Export.OptionName = "export";
    return Export;
}(nested_option_1.default));
exports.Export = Export;
var Font = /** @class */ (function (_super) {
    __extends(Font, _super);
    function Font() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Font.OptionName = "font";
    return Font;
}(nested_option_1.default));
exports.Font = Font;
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Format.OptionName = "format";
    return Format;
}(nested_option_1.default));
exports.Format = Format;
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Group.OptionName = "group";
    Group.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        groupLabel: { optionName: "label", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        treeMapborder: { optionName: "border", isCollectionItem: false }
    };
    return Group;
}(nested_option_1.default));
exports.Group = Group;
var GroupLabel = /** @class */ (function (_super) {
    __extends(GroupLabel, _super);
    function GroupLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupLabel.OptionName = "label";
    GroupLabel.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return GroupLabel;
}(nested_option_1.default));
exports.GroupLabel = GroupLabel;
var HoverStyle = /** @class */ (function (_super) {
    __extends(HoverStyle, _super);
    function HoverStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HoverStyle.OptionName = "hoverStyle";
    return HoverStyle;
}(nested_option_1.default));
exports.HoverStyle = HoverStyle;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var LoadingIndicator = /** @class */ (function (_super) {
    __extends(LoadingIndicator, _super);
    function LoadingIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadingIndicator.OptionName = "loadingIndicator";
    LoadingIndicator.DefaultsProps = {
        defaultShow: "show"
    };
    LoadingIndicator.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return LoadingIndicator;
}(nested_option_1.default));
exports.LoadingIndicator = LoadingIndicator;
var Margin = /** @class */ (function (_super) {
    __extends(Margin, _super);
    function Margin() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Margin.OptionName = "margin";
    return Margin;
}(nested_option_1.default));
exports.Margin = Margin;
var SelectionStyle = /** @class */ (function (_super) {
    __extends(SelectionStyle, _super);
    function SelectionStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionStyle.OptionName = "selectionStyle";
    return SelectionStyle;
}(nested_option_1.default));
exports.SelectionStyle = SelectionStyle;
var Shadow = /** @class */ (function (_super) {
    __extends(Shadow, _super);
    function Shadow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shadow.OptionName = "shadow";
    return Shadow;
}(nested_option_1.default));
exports.Shadow = Shadow;
var Size = /** @class */ (function (_super) {
    __extends(Size, _super);
    function Size() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Size.OptionName = "size";
    return Size;
}(nested_option_1.default));
exports.Size = Size;
var Subtitle = /** @class */ (function (_super) {
    __extends(Subtitle, _super);
    function Subtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Subtitle.OptionName = "subtitle";
    Subtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return Subtitle;
}(nested_option_1.default));
exports.Subtitle = Subtitle;
var Tile = /** @class */ (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tile.OptionName = "tile";
    Tile.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        tileLabel: { optionName: "label", isCollectionItem: false },
        treeMapborder: { optionName: "border", isCollectionItem: false }
    };
    return Tile;
}(nested_option_1.default));
exports.Tile = Tile;
var TileLabel = /** @class */ (function (_super) {
    __extends(TileLabel, _super);
    function TileLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TileLabel.OptionName = "label";
    TileLabel.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return TileLabel;
}(nested_option_1.default));
exports.TileLabel = TileLabel;
var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    function Title() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Title.OptionName = "title";
    Title.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return Title;
}(nested_option_1.default));
exports.Title = Title;
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.OptionName = "tooltip";
    Tooltip.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false },
        tooltipBorder: { optionName: "border", isCollectionItem: false }
    };
    Tooltip.TemplateProps = [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent",
            keyFn: "contentKeyFn"
        }];
    return Tooltip;
}(nested_option_1.default));
exports.Tooltip = Tooltip;
var TooltipBorder = /** @class */ (function (_super) {
    __extends(TooltipBorder, _super);
    function TooltipBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipBorder.OptionName = "border";
    return TooltipBorder;
}(nested_option_1.default));
exports.TooltipBorder = TooltipBorder;
var TreeMapborder = /** @class */ (function (_super) {
    __extends(TreeMapborder, _super);
    function TreeMapborder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TreeMapborder.OptionName = "border";
    return TreeMapborder;
}(nested_option_1.default));
exports.TreeMapborder = TreeMapborder;
exports.default = TreeMap;
