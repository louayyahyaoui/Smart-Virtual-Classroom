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
exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.SmallValuesGrouping = exports.Size = exports.Shadow = exports.SeriesTemplate = exports.SeriesBorder = exports.Series = exports.SelectionStyle = exports.PieChartTitleSubtitle = exports.PieChartTitle = exports.Margin = exports.LoadingIndicator = exports.LegendTitleSubtitle = exports.LegendTitle = exports.Legend = exports.Label = exports.Image = exports.HoverStyle = exports.Hatching = exports.Format = exports.Font = exports.Export = exports.Connector = exports.CommonSeriesSettings = exports.CommonAnnotationSettings = exports.Border = exports.ArgumentFormat = exports.AnnotationBorder = exports.Annotation = exports.Animation = exports.AdaptiveLayout = exports.PieChart = void 0;
var pie_chart_1 = require("devextreme/viz/pie_chart");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var PieChart = /** @class */ (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = pie_chart_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show"];
        _this.independentEvents = ["onDisposing", "onDone", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onLegendClick", "onOptionChanged", "onPointClick", "onPointHoverChanged", "onPointSelectionChanged", "onTooltipHidden", "onTooltipShown"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator"
        };
        _this._expectedChildren = {
            adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
            animation: { optionName: "animation", isCollectionItem: false },
            annotation: { optionName: "annotations", isCollectionItem: true },
            commonAnnotationSettings: { optionName: "commonAnnotationSettings", isCollectionItem: false },
            commonSeriesSettings: { optionName: "commonSeriesSettings", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            legend: { optionName: "legend", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            margin: { optionName: "margin", isCollectionItem: false },
            pieChartTitle: { optionName: "title", isCollectionItem: false },
            series: { optionName: "series", isCollectionItem: true },
            seriesTemplate: { optionName: "seriesTemplate", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "centerTemplate",
                render: "centerRender",
                component: "centerComponent",
                keyFn: "centerKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(PieChart.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return PieChart;
}(component_1.Component));
exports.PieChart = PieChart;
PieChart.propTypes = {
    adaptiveLayout: PropTypes.object,
    animation: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    annotations: PropTypes.array,
    commonAnnotationSettings: PropTypes.object,
    commonSeriesSettings: PropTypes.object,
    customizeAnnotation: PropTypes.func,
    customizeLabel: PropTypes.func,
    customizePoint: PropTypes.func,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    diameter: PropTypes.number,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    innerRadius: PropTypes.number,
    legend: PropTypes.object,
    loadingIndicator: PropTypes.object,
    margin: PropTypes.object,
    minDiameter: PropTypes.number,
    onDisposing: PropTypes.func,
    onDone: PropTypes.func,
    onDrawn: PropTypes.func,
    onExported: PropTypes.func,
    onExporting: PropTypes.func,
    onFileSaving: PropTypes.func,
    onIncidentOccurred: PropTypes.func,
    onInitialized: PropTypes.func,
    onLegendClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onOptionChanged: PropTypes.func,
    onPointClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onPointHoverChanged: PropTypes.func,
    onPointSelectionChanged: PropTypes.func,
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
    pointSelectionMode: PropTypes.oneOf([
        "multiple",
        "single"
    ]),
    redrawOnResize: PropTypes.bool,
    resolveLabelOverlapping: PropTypes.oneOf([
        "hide",
        "none",
        "shift"
    ]),
    rtlEnabled: PropTypes.bool,
    segmentsDirection: PropTypes.oneOf([
        "anticlockwise",
        "clockwise"
    ]),
    series: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    seriesTemplate: PropTypes.object,
    size: PropTypes.object,
    sizeGroup: PropTypes.string,
    startAngle: PropTypes.number,
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
    type: PropTypes.oneOf([
        "donut",
        "doughnut",
        "pie"
    ])
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
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.OptionName = "animation";
    return Animation;
}(nested_option_1.default));
exports.Animation = Animation;
var Annotation = /** @class */ (function (_super) {
    __extends(Annotation, _super);
    function Annotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Annotation.OptionName = "annotations";
    Annotation.IsCollectionItem = true;
    Annotation.ExpectedChildren = {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false }
    };
    Annotation.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }, {
            tmplOption: "tooltipTemplate",
            render: "tooltipRender",
            component: "tooltipComponent",
            keyFn: "tooltipKeyFn"
        }];
    return Annotation;
}(nested_option_1.default));
exports.Annotation = Annotation;
var AnnotationBorder = /** @class */ (function (_super) {
    __extends(AnnotationBorder, _super);
    function AnnotationBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AnnotationBorder.OptionName = "border";
    return AnnotationBorder;
}(nested_option_1.default));
exports.AnnotationBorder = AnnotationBorder;
var ArgumentFormat = /** @class */ (function (_super) {
    __extends(ArgumentFormat, _super);
    function ArgumentFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentFormat.OptionName = "argumentFormat";
    return ArgumentFormat;
}(nested_option_1.default));
exports.ArgumentFormat = ArgumentFormat;
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Border.OptionName = "border";
    return Border;
}(nested_option_1.default));
exports.Border = Border;
var CommonAnnotationSettings = /** @class */ (function (_super) {
    __extends(CommonAnnotationSettings, _super);
    function CommonAnnotationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonAnnotationSettings.OptionName = "commonAnnotationSettings";
    CommonAnnotationSettings.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }, {
            tmplOption: "tooltipTemplate",
            render: "tooltipRender",
            component: "tooltipComponent",
            keyFn: "tooltipKeyFn"
        }];
    return CommonAnnotationSettings;
}(nested_option_1.default));
exports.CommonAnnotationSettings = CommonAnnotationSettings;
var CommonSeriesSettings = /** @class */ (function (_super) {
    __extends(CommonSeriesSettings, _super);
    function CommonSeriesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSeriesSettings.OptionName = "commonSeriesSettings";
    CommonSeriesSettings.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false },
        smallValuesGrouping: { optionName: "smallValuesGrouping", isCollectionItem: false }
    };
    return CommonSeriesSettings;
}(nested_option_1.default));
exports.CommonSeriesSettings = CommonSeriesSettings;
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
        seriesBorder: { optionName: "border", isCollectionItem: false }
    };
    return HoverStyle;
}(nested_option_1.default));
exports.HoverStyle = HoverStyle;
var Image = /** @class */ (function (_super) {
    __extends(Image, _super);
    function Image() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Image.OptionName = "image";
    return Image;
}(nested_option_1.default));
exports.Image = Image;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    Label.ExpectedChildren = {
        argumentFormat: { optionName: "argumentFormat", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        connector: { optionName: "connector", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
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
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
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
var PieChartTitle = /** @class */ (function (_super) {
    __extends(PieChartTitle, _super);
    function PieChartTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieChartTitle.OptionName = "title";
    PieChartTitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        pieChartTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return PieChartTitle;
}(nested_option_1.default));
exports.PieChartTitle = PieChartTitle;
var PieChartTitleSubtitle = /** @class */ (function (_super) {
    __extends(PieChartTitleSubtitle, _super);
    function PieChartTitleSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieChartTitleSubtitle.OptionName = "subtitle";
    PieChartTitleSubtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return PieChartTitleSubtitle;
}(nested_option_1.default));
exports.PieChartTitleSubtitle = PieChartTitleSubtitle;
var SelectionStyle = /** @class */ (function (_super) {
    __extends(SelectionStyle, _super);
    function SelectionStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionStyle.OptionName = "selectionStyle";
    SelectionStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    };
    return SelectionStyle;
}(nested_option_1.default));
exports.SelectionStyle = SelectionStyle;
var Series = /** @class */ (function (_super) {
    __extends(Series, _super);
    function Series() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Series.OptionName = "series";
    Series.IsCollectionItem = true;
    return Series;
}(nested_option_1.default));
exports.Series = Series;
var SeriesBorder = /** @class */ (function (_super) {
    __extends(SeriesBorder, _super);
    function SeriesBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesBorder.OptionName = "border";
    return SeriesBorder;
}(nested_option_1.default));
exports.SeriesBorder = SeriesBorder;
var SeriesTemplate = /** @class */ (function (_super) {
    __extends(SeriesTemplate, _super);
    function SeriesTemplate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SeriesTemplate.OptionName = "seriesTemplate";
    return SeriesTemplate;
}(nested_option_1.default));
exports.SeriesTemplate = SeriesTemplate;
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
var SmallValuesGrouping = /** @class */ (function (_super) {
    __extends(SmallValuesGrouping, _super);
    function SmallValuesGrouping() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SmallValuesGrouping.OptionName = "smallValuesGrouping";
    return SmallValuesGrouping;
}(nested_option_1.default));
exports.SmallValuesGrouping = SmallValuesGrouping;
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
        argumentFormat: { optionName: "argumentFormat", isCollectionItem: false },
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
exports.default = PieChart;
