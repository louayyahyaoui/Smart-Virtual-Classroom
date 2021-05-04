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
exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.Size = exports.Shadow = exports.Margin = exports.LoadingIndicator = exports.LegendTitleSubtitle = exports.LegendTitle = exports.LegendBorder = exports.Legend = exports.Label = exports.ItemTextFormat = exports.Geometry = exports.Format = exports.Font = exports.Export = exports.Border = exports.BarGaugeTitleSubtitle = exports.BarGaugeTitle = exports.Animation = exports.BarGauge = void 0;
var bar_gauge_1 = require("devextreme/viz/bar_gauge");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var BarGauge = /** @class */ (function (_super) {
    __extends(BarGauge, _super);
    function BarGauge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = bar_gauge_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show", "values"];
        _this.independentEvents = ["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onOptionChanged", "onTooltipHidden", "onTooltipShown"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator",
            defaultValues: "values"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            barGaugeTitle: { optionName: "title", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            geometry: { optionName: "geometry", isCollectionItem: false },
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
    Object.defineProperty(BarGauge.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return BarGauge;
}(component_1.Component));
exports.BarGauge = BarGauge;
BarGauge.propTypes = {
    animation: PropTypes.object,
    backgroundColor: PropTypes.string,
    barSpacing: PropTypes.number,
    baseValue: PropTypes.number,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    endValue: PropTypes.number,
    export: PropTypes.object,
    geometry: PropTypes.object,
    label: PropTypes.object,
    legend: PropTypes.object,
    loadingIndicator: PropTypes.object,
    margin: PropTypes.object,
    onDisposing: PropTypes.func,
    onDrawn: PropTypes.func,
    onExported: PropTypes.func,
    onExporting: PropTypes.func,
    onFileSaving: PropTypes.func,
    onIncidentOccurred: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onTooltipHidden: PropTypes.func,
    onTooltipShown: PropTypes.func,
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
    relativeInnerRadius: PropTypes.number,
    resolveLabelOverlapping: PropTypes.oneOf([
        "hide",
        "none"
    ]),
    rtlEnabled: PropTypes.bool,
    size: PropTypes.object,
    startValue: PropTypes.number,
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
    values: PropTypes.array
};
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.OptionName = "animation";
    return Animation;
}(nested_option_1.default));
exports.Animation = Animation;
var BarGaugeTitle = /** @class */ (function (_super) {
    __extends(BarGaugeTitle, _super);
    function BarGaugeTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarGaugeTitle.OptionName = "title";
    BarGaugeTitle.ExpectedChildren = {
        barGaugeTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return BarGaugeTitle;
}(nested_option_1.default));
exports.BarGaugeTitle = BarGaugeTitle;
var BarGaugeTitleSubtitle = /** @class */ (function (_super) {
    __extends(BarGaugeTitleSubtitle, _super);
    function BarGaugeTitleSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BarGaugeTitleSubtitle.OptionName = "subtitle";
    BarGaugeTitleSubtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return BarGaugeTitleSubtitle;
}(nested_option_1.default));
exports.BarGaugeTitleSubtitle = BarGaugeTitleSubtitle;
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Border.OptionName = "border";
    return Border;
}(nested_option_1.default));
exports.Border = Border;
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
var Geometry = /** @class */ (function (_super) {
    __extends(Geometry, _super);
    function Geometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Geometry.OptionName = "geometry";
    return Geometry;
}(nested_option_1.default));
exports.Geometry = Geometry;
var ItemTextFormat = /** @class */ (function (_super) {
    __extends(ItemTextFormat, _super);
    function ItemTextFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ItemTextFormat.OptionName = "itemTextFormat";
    return ItemTextFormat;
}(nested_option_1.default));
exports.ItemTextFormat = ItemTextFormat;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    Label.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    };
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Legend.OptionName = "legend";
    Legend.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        itemTextFormat: { optionName: "itemTextFormat", isCollectionItem: false },
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
exports.default = BarGauge;
