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
exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.Size = exports.Shadow = exports.SelectionStyle = exports.Margin = exports.LoadingIndicator = exports.LegendTitleSubtitle = exports.LegendTitle = exports.LegendBorder = exports.Legend = exports.LabelBorder = exports.Label = exports.ItemBorder = exports.Item = exports.HoverStyle = exports.Hatching = exports.FunnelTitleSubtitle = exports.FunnelTitle = exports.Format = exports.Font = exports.Export = exports.Connector = exports.Border = exports.AdaptiveLayout = exports.Funnel = void 0;
var funnel_1 = require("devextreme/viz/funnel");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Funnel = /** @class */ (function (_super) {
    __extends(Funnel, _super);
    function Funnel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = funnel_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show"];
        _this.independentEvents = ["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onHoverChanged", "onIncidentOccurred", "onInitialized", "onItemClick", "onLegendClick", "onOptionChanged", "onSelectionChanged"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator"
        };
        _this._expectedChildren = {
            adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            funnelTitle: { optionName: "title", isCollectionItem: false },
            item: { optionName: "item", isCollectionItem: false },
            label: { optionName: "label", isCollectionItem: false },
            legend: { optionName: "legend", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            margin: { optionName: "margin", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(Funnel.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Funnel;
}(component_1.Component));
exports.Funnel = Funnel;
Funnel.propTypes = {
    adaptiveLayout: PropTypes.object,
    algorithm: PropTypes.oneOf([
        "dynamicHeight",
        "dynamicSlope"
    ]),
    argumentField: PropTypes.string,
    colorField: PropTypes.string,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    hoverEnabled: PropTypes.bool,
    inverted: PropTypes.bool,
    item: PropTypes.object,
    label: PropTypes.object,
    legend: PropTypes.object,
    loadingIndicator: PropTypes.object,
    margin: PropTypes.object,
    neckHeight: PropTypes.number,
    neckWidth: PropTypes.number,
    onDisposing: PropTypes.func,
    onDrawn: PropTypes.func,
    onExported: PropTypes.func,
    onExporting: PropTypes.func,
    onFileSaving: PropTypes.func,
    onHoverChanged: PropTypes.func,
    onIncidentOccurred: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onLegendClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    palette: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf([
            "Bright",
            "Harmony Light",
            "Ocean",
            "Pastel",
            "Soft",
            "Soft Pastel",
            "Vintage",
            "Violet",
            "Carmine",
            "Dark Moon",
            "Dark Violet",
            "Green Mist",
            "Soft Blue",
            "Material",
            "Office"
        ])
    ]),
    paletteExtensionMode: PropTypes.oneOf([
        "alternate",
        "blend",
        "extrapolate"
    ]),
    pathModified: PropTypes.bool,
    redrawOnResize: PropTypes.bool,
    resolveLabelOverlapping: PropTypes.oneOf([
        "hide",
        "none",
        "shift"
    ]),
    rtlEnabled: PropTypes.bool,
    selectionMode: PropTypes.oneOf([
        "multiple",
        "none",
        "single"
    ]),
    size: PropTypes.object,
    sortData: PropTypes.bool,
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
    title: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    tooltip: PropTypes.object,
    valueField: PropTypes.string
};
var AdaptiveLayout = /** @class */ (function (_super) {
    __extends(AdaptiveLayout, _super);
    function AdaptiveLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AdaptiveLayout.OptionName = "adaptiveLayout";
    return AdaptiveLayout;
}(nested_option_1.default));
exports.AdaptiveLayout = AdaptiveLayout;
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Border.OptionName = "border";
    return Border;
}(nested_option_1.default));
exports.Border = Border;
var Connector = /** @class */ (function (_super) {
    __extends(Connector, _super);
    function Connector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Connector.OptionName = "connector";
    return Connector;
}(nested_option_1.default));
exports.Connector = Connector;
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
var FunnelTitle = /** @class */ (function (_super) {
    __extends(FunnelTitle, _super);
    function FunnelTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunnelTitle.OptionName = "title";
    FunnelTitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        funnelTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return FunnelTitle;
}(nested_option_1.default));
exports.FunnelTitle = FunnelTitle;
var FunnelTitleSubtitle = /** @class */ (function (_super) {
    __extends(FunnelTitleSubtitle, _super);
    function FunnelTitleSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FunnelTitleSubtitle.OptionName = "subtitle";
    FunnelTitleSubtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return FunnelTitleSubtitle;
}(nested_option_1.default));
exports.FunnelTitleSubtitle = FunnelTitleSubtitle;
var Hatching = /** @class */ (function (_super) {
    __extends(Hatching, _super);
    function Hatching() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hatching.OptionName = "hatching";
    return Hatching;
}(nested_option_1.default));
exports.Hatching = Hatching;
var HoverStyle = /** @class */ (function (_super) {
    __extends(HoverStyle, _super);
    function HoverStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HoverStyle.OptionName = "hoverStyle";
    HoverStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        itemBorder: { optionName: "border", isCollectionItem: false }
    };
    return HoverStyle;
}(nested_option_1.default));
exports.HoverStyle = HoverStyle;
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "item";
    Item.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        itemBorder: { optionName: "border", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false }
    };
    return Item;
}(nested_option_1.default));
exports.Item = Item;
var ItemBorder = /** @class */ (function (_super) {
    __extends(ItemBorder, _super);
    function ItemBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemBorder.OptionName = "border";
    return ItemBorder;
}(nested_option_1.default));
exports.ItemBorder = ItemBorder;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    Label.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        connector: { optionName: "connector", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        labelBorder: { optionName: "border", isCollectionItem: false }
    };
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var LabelBorder = /** @class */ (function (_super) {
    __extends(LabelBorder, _super);
    function LabelBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LabelBorder.OptionName = "border";
    return LabelBorder;
}(nested_option_1.default));
exports.LabelBorder = LabelBorder;
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Legend.OptionName = "legend";
    Legend.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        legendBorder: { optionName: "border", isCollectionItem: false },
        legendTitle: { optionName: "title", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        title: { optionName: "title", isCollectionItem: false }
    };
    Legend.TemplateProps = [{
            tmplOption: "markerTemplate",
            render: "markerRender",
            component: "markerComponent",
            keyFn: "markerKeyFn"
        }];
    return Legend;
}(nested_option_1.default));
exports.Legend = Legend;
var LegendBorder = /** @class */ (function (_super) {
    __extends(LegendBorder, _super);
    function LegendBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegendBorder.OptionName = "border";
    return LegendBorder;
}(nested_option_1.default));
exports.LegendBorder = LegendBorder;
var LegendTitle = /** @class */ (function (_super) {
    __extends(LegendTitle, _super);
    function LegendTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegendTitle.OptionName = "title";
    LegendTitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        legendTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return LegendTitle;
}(nested_option_1.default));
exports.LegendTitle = LegendTitle;
var LegendTitleSubtitle = /** @class */ (function (_super) {
    __extends(LegendTitleSubtitle, _super);
    function LegendTitleSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LegendTitleSubtitle.OptionName = "subtitle";
    LegendTitleSubtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return LegendTitleSubtitle;
}(nested_option_1.default));
exports.LegendTitleSubtitle = LegendTitleSubtitle;
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
    SelectionStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        itemBorder: { optionName: "border", isCollectionItem: false }
    };
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
    return Subtitle;
}(nested_option_1.default));
exports.Subtitle = Subtitle;
var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    function Title() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Title.OptionName = "title";
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
exports.default = Funnel;
