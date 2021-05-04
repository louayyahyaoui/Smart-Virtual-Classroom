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
exports.WholeRange = exports.VisualRange = exports.ValueErrorBar = exports.ValueAxis = exports.TooltipBorder = exports.Tooltip = exports.Title = exports.TickInterval = exports.Tick = exports.Subtitle = exports.StripStyleLabel = exports.StripStyle = exports.StripLabel = exports.Strip = exports.Size = exports.Shadow = exports.SeriesTemplate = exports.SeriesBorder = exports.Series = exports.SelectionStyle = exports.PolarChartTitleSubtitle = exports.PolarChartTitle = exports.PointSelectionStyle = exports.PointHoverStyle = exports.PointBorder = exports.Point = exports.MinVisualRangeLength = exports.MinorTickInterval = exports.MinorTick = exports.MinorGrid = exports.Margin = exports.LoadingIndicator = exports.Length = exports.LegendTitleSubtitle = exports.LegendTitle = exports.Legend = exports.Label = exports.Image = exports.HoverStyle = exports.Hatching = exports.Grid = exports.Format = exports.Font = exports.Export = exports.DataPrepareSettings = exports.ConstantLineStyleLabel = exports.ConstantLineStyle = exports.ConstantLineLabel = exports.ConstantLine = exports.Connector = exports.CommonSeriesSettingsSelectionStyle = exports.CommonSeriesSettingsLabel = exports.CommonSeriesSettingsHoverStyle = exports.CommonSeriesSettings = exports.CommonAxisSettingsTick = exports.CommonAxisSettingsMinorTick = exports.CommonAxisSettingsLabel = exports.CommonAxisSettings = exports.CommonAnnotationSettings = exports.Border = exports.AxisLabel = exports.ArgumentFormat = exports.ArgumentAxisTick = exports.ArgumentAxisMinorTick = exports.ArgumentAxis = exports.AnnotationBorder = exports.Annotation = exports.Animation = exports.AdaptiveLayout = exports.PolarChart = void 0;
var polar_chart_1 = require("devextreme/viz/polar_chart");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var PolarChart = /** @class */ (function (_super) {
    __extends(PolarChart, _super);
    function PolarChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = polar_chart_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show", "valueAxis", "valueAxis.visualRange"];
        _this.independentEvents = ["onArgumentAxisClick", "onDisposing", "onDone", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onLegendClick", "onOptionChanged", "onPointClick", "onPointHoverChanged", "onPointSelectionChanged", "onSeriesClick", "onSeriesHoverChanged", "onSeriesSelectionChanged", "onTooltipHidden", "onTooltipShown", "onZoomEnd", "onZoomStart"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator",
            defaultValueAxis: "valueAxis"
        };
        _this._expectedChildren = {
            adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
            animation: { optionName: "animation", isCollectionItem: false },
            annotation: { optionName: "annotations", isCollectionItem: true },
            argumentAxis: { optionName: "argumentAxis", isCollectionItem: false },
            commonAnnotationSettings: { optionName: "commonAnnotationSettings", isCollectionItem: false },
            commonAxisSettings: { optionName: "commonAxisSettings", isCollectionItem: false },
            commonSeriesSettings: { optionName: "commonSeriesSettings", isCollectionItem: false },
            dataPrepareSettings: { optionName: "dataPrepareSettings", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            legend: { optionName: "legend", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            margin: { optionName: "margin", isCollectionItem: false },
            polarChartTitle: { optionName: "title", isCollectionItem: false },
            series: { optionName: "series", isCollectionItem: true },
            seriesTemplate: { optionName: "seriesTemplate", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false },
            valueAxis: { optionName: "valueAxis", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(PolarChart.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return PolarChart;
}(component_1.Component));
exports.PolarChart = PolarChart;
PolarChart.propTypes = {
    adaptiveLayout: PropTypes.object,
    animation: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    annotations: PropTypes.array,
    argumentAxis: PropTypes.object,
    barGroupPadding: PropTypes.number,
    barGroupWidth: PropTypes.number,
    commonAnnotationSettings: PropTypes.object,
    commonAxisSettings: PropTypes.object,
    commonSeriesSettings: PropTypes.object,
    containerBackgroundColor: PropTypes.string,
    customizeAnnotation: PropTypes.func,
    customizeLabel: PropTypes.func,
    customizePoint: PropTypes.func,
    dataPrepareSettings: PropTypes.object,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    legend: PropTypes.object,
    loadingIndicator: PropTypes.object,
    margin: PropTypes.object,
    negativesAsZeroes: PropTypes.bool,
    onArgumentAxisClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
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
    onSeriesClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onSeriesHoverChanged: PropTypes.func,
    onSeriesSelectionChanged: PropTypes.func,
    onTooltipHidden: PropTypes.func,
    onTooltipShown: PropTypes.func,
    onZoomEnd: PropTypes.func,
    onZoomStart: PropTypes.func,
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
        "none"
    ]),
    rtlEnabled: PropTypes.bool,
    series: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    seriesSelectionMode: PropTypes.oneOf([
        "multiple",
        "single"
    ]),
    seriesTemplate: PropTypes.object,
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
    title: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    tooltip: PropTypes.object,
    useSpiderWeb: PropTypes.bool,
    valueAxis: PropTypes.object
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
var ArgumentAxis = /** @class */ (function (_super) {
    __extends(ArgumentAxis, _super);
    function ArgumentAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentAxis.OptionName = "argumentAxis";
    ArgumentAxis.ExpectedChildren = {
        argumentAxisMinorTick: { optionName: "minorTick", isCollectionItem: false },
        argumentAxisTick: { optionName: "tick", isCollectionItem: false },
        axisLabel: { optionName: "label", isCollectionItem: false },
        constantLine: { optionName: "constantLines", isCollectionItem: true },
        constantLineStyle: { optionName: "constantLineStyle", isCollectionItem: false },
        grid: { optionName: "grid", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        minorGrid: { optionName: "minorGrid", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        minorTickInterval: { optionName: "minorTickInterval", isCollectionItem: false },
        strip: { optionName: "strips", isCollectionItem: true },
        stripStyle: { optionName: "stripStyle", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false },
        tickInterval: { optionName: "tickInterval", isCollectionItem: false }
    };
    return ArgumentAxis;
}(nested_option_1.default));
exports.ArgumentAxis = ArgumentAxis;
var ArgumentAxisMinorTick = /** @class */ (function (_super) {
    __extends(ArgumentAxisMinorTick, _super);
    function ArgumentAxisMinorTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentAxisMinorTick.OptionName = "minorTick";
    return ArgumentAxisMinorTick;
}(nested_option_1.default));
exports.ArgumentAxisMinorTick = ArgumentAxisMinorTick;
var ArgumentAxisTick = /** @class */ (function (_super) {
    __extends(ArgumentAxisTick, _super);
    function ArgumentAxisTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentAxisTick.OptionName = "tick";
    return ArgumentAxisTick;
}(nested_option_1.default));
exports.ArgumentAxisTick = ArgumentAxisTick;
var ArgumentFormat = /** @class */ (function (_super) {
    __extends(ArgumentFormat, _super);
    function ArgumentFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentFormat.OptionName = "argumentFormat";
    return ArgumentFormat;
}(nested_option_1.default));
exports.ArgumentFormat = ArgumentFormat;
var AxisLabel = /** @class */ (function (_super) {
    __extends(AxisLabel, _super);
    function AxisLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisLabel.OptionName = "label";
    return AxisLabel;
}(nested_option_1.default));
exports.AxisLabel = AxisLabel;
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
var CommonAxisSettings = /** @class */ (function (_super) {
    __extends(CommonAxisSettings, _super);
    function CommonAxisSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonAxisSettings.OptionName = "commonAxisSettings";
    CommonAxisSettings.ExpectedChildren = {
        commonAxisSettingsLabel: { optionName: "label", isCollectionItem: false },
        commonAxisSettingsMinorTick: { optionName: "minorTick", isCollectionItem: false },
        commonAxisSettingsTick: { optionName: "tick", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false }
    };
    return CommonAxisSettings;
}(nested_option_1.default));
exports.CommonAxisSettings = CommonAxisSettings;
var CommonAxisSettingsLabel = /** @class */ (function (_super) {
    __extends(CommonAxisSettingsLabel, _super);
    function CommonAxisSettingsLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonAxisSettingsLabel.OptionName = "label";
    return CommonAxisSettingsLabel;
}(nested_option_1.default));
exports.CommonAxisSettingsLabel = CommonAxisSettingsLabel;
var CommonAxisSettingsMinorTick = /** @class */ (function (_super) {
    __extends(CommonAxisSettingsMinorTick, _super);
    function CommonAxisSettingsMinorTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonAxisSettingsMinorTick.OptionName = "minorTick";
    return CommonAxisSettingsMinorTick;
}(nested_option_1.default));
exports.CommonAxisSettingsMinorTick = CommonAxisSettingsMinorTick;
var CommonAxisSettingsTick = /** @class */ (function (_super) {
    __extends(CommonAxisSettingsTick, _super);
    function CommonAxisSettingsTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonAxisSettingsTick.OptionName = "tick";
    return CommonAxisSettingsTick;
}(nested_option_1.default));
exports.CommonAxisSettingsTick = CommonAxisSettingsTick;
var CommonSeriesSettings = /** @class */ (function (_super) {
    __extends(CommonSeriesSettings, _super);
    function CommonSeriesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSeriesSettings.OptionName = "commonSeriesSettings";
    CommonSeriesSettings.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        commonSeriesSettingsHoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        commonSeriesSettingsLabel: { optionName: "label", isCollectionItem: false },
        commonSeriesSettingsSelectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        point: { optionName: "point", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false },
        valueErrorBar: { optionName: "valueErrorBar", isCollectionItem: false }
    };
    return CommonSeriesSettings;
}(nested_option_1.default));
exports.CommonSeriesSettings = CommonSeriesSettings;
var CommonSeriesSettingsHoverStyle = /** @class */ (function (_super) {
    __extends(CommonSeriesSettingsHoverStyle, _super);
    function CommonSeriesSettingsHoverStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSeriesSettingsHoverStyle.OptionName = "hoverStyle";
    CommonSeriesSettingsHoverStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    };
    return CommonSeriesSettingsHoverStyle;
}(nested_option_1.default));
exports.CommonSeriesSettingsHoverStyle = CommonSeriesSettingsHoverStyle;
var CommonSeriesSettingsLabel = /** @class */ (function (_super) {
    __extends(CommonSeriesSettingsLabel, _super);
    function CommonSeriesSettingsLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSeriesSettingsLabel.OptionName = "label";
    CommonSeriesSettingsLabel.ExpectedChildren = {
        argumentFormat: { optionName: "argumentFormat", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        connector: { optionName: "connector", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    };
    return CommonSeriesSettingsLabel;
}(nested_option_1.default));
exports.CommonSeriesSettingsLabel = CommonSeriesSettingsLabel;
var CommonSeriesSettingsSelectionStyle = /** @class */ (function (_super) {
    __extends(CommonSeriesSettingsSelectionStyle, _super);
    function CommonSeriesSettingsSelectionStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSeriesSettingsSelectionStyle.OptionName = "selectionStyle";
    CommonSeriesSettingsSelectionStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hatching: { optionName: "hatching", isCollectionItem: false },
        seriesBorder: { optionName: "border", isCollectionItem: false }
    };
    return CommonSeriesSettingsSelectionStyle;
}(nested_option_1.default));
exports.CommonSeriesSettingsSelectionStyle = CommonSeriesSettingsSelectionStyle;
var Connector = /** @class */ (function (_super) {
    __extends(Connector, _super);
    function Connector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Connector.OptionName = "connector";
    return Connector;
}(nested_option_1.default));
exports.Connector = Connector;
var ConstantLine = /** @class */ (function (_super) {
    __extends(ConstantLine, _super);
    function ConstantLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstantLine.OptionName = "constantLines";
    ConstantLine.IsCollectionItem = true;
    return ConstantLine;
}(nested_option_1.default));
exports.ConstantLine = ConstantLine;
var ConstantLineLabel = /** @class */ (function (_super) {
    __extends(ConstantLineLabel, _super);
    function ConstantLineLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstantLineLabel.OptionName = "label";
    return ConstantLineLabel;
}(nested_option_1.default));
exports.ConstantLineLabel = ConstantLineLabel;
var ConstantLineStyle = /** @class */ (function (_super) {
    __extends(ConstantLineStyle, _super);
    function ConstantLineStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstantLineStyle.OptionName = "constantLineStyle";
    ConstantLineStyle.ExpectedChildren = {
        constantLineStyleLabel: { optionName: "label", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false }
    };
    return ConstantLineStyle;
}(nested_option_1.default));
exports.ConstantLineStyle = ConstantLineStyle;
var ConstantLineStyleLabel = /** @class */ (function (_super) {
    __extends(ConstantLineStyleLabel, _super);
    function ConstantLineStyleLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConstantLineStyleLabel.OptionName = "label";
    return ConstantLineStyleLabel;
}(nested_option_1.default));
exports.ConstantLineStyleLabel = ConstantLineStyleLabel;
var DataPrepareSettings = /** @class */ (function (_super) {
    __extends(DataPrepareSettings, _super);
    function DataPrepareSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataPrepareSettings.OptionName = "dataPrepareSettings";
    return DataPrepareSettings;
}(nested_option_1.default));
exports.DataPrepareSettings = DataPrepareSettings;
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
var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Grid.OptionName = "grid";
    return Grid;
}(nested_option_1.default));
exports.Grid = Grid;
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
var Length = /** @class */ (function (_super) {
    __extends(Length, _super);
    function Length() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Length.OptionName = "length";
    return Length;
}(nested_option_1.default));
exports.Length = Length;
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
var MinorGrid = /** @class */ (function (_super) {
    __extends(MinorGrid, _super);
    function MinorGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinorGrid.OptionName = "minorGrid";
    return MinorGrid;
}(nested_option_1.default));
exports.MinorGrid = MinorGrid;
var MinorTick = /** @class */ (function (_super) {
    __extends(MinorTick, _super);
    function MinorTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinorTick.OptionName = "minorTick";
    return MinorTick;
}(nested_option_1.default));
exports.MinorTick = MinorTick;
var MinorTickInterval = /** @class */ (function (_super) {
    __extends(MinorTickInterval, _super);
    function MinorTickInterval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinorTickInterval.OptionName = "minorTickInterval";
    return MinorTickInterval;
}(nested_option_1.default));
exports.MinorTickInterval = MinorTickInterval;
var MinVisualRangeLength = /** @class */ (function (_super) {
    __extends(MinVisualRangeLength, _super);
    function MinVisualRangeLength() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinVisualRangeLength.OptionName = "minVisualRangeLength";
    return MinVisualRangeLength;
}(nested_option_1.default));
exports.MinVisualRangeLength = MinVisualRangeLength;
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Point.OptionName = "point";
    Point.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false },
        pointHoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        pointSelectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        selectionStyle: { optionName: "selectionStyle", isCollectionItem: false }
    };
    return Point;
}(nested_option_1.default));
exports.Point = Point;
var PointBorder = /** @class */ (function (_super) {
    __extends(PointBorder, _super);
    function PointBorder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointBorder.OptionName = "border";
    return PointBorder;
}(nested_option_1.default));
exports.PointBorder = PointBorder;
var PointHoverStyle = /** @class */ (function (_super) {
    __extends(PointHoverStyle, _super);
    function PointHoverStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointHoverStyle.OptionName = "hoverStyle";
    PointHoverStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false }
    };
    return PointHoverStyle;
}(nested_option_1.default));
exports.PointHoverStyle = PointHoverStyle;
var PointSelectionStyle = /** @class */ (function (_super) {
    __extends(PointSelectionStyle, _super);
    function PointSelectionStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointSelectionStyle.OptionName = "selectionStyle";
    PointSelectionStyle.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        pointBorder: { optionName: "border", isCollectionItem: false }
    };
    return PointSelectionStyle;
}(nested_option_1.default));
exports.PointSelectionStyle = PointSelectionStyle;
var PolarChartTitle = /** @class */ (function (_super) {
    __extends(PolarChartTitle, _super);
    function PolarChartTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolarChartTitle.OptionName = "title";
    PolarChartTitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        polarChartTitleSubtitle: { optionName: "subtitle", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return PolarChartTitle;
}(nested_option_1.default));
exports.PolarChartTitle = PolarChartTitle;
var PolarChartTitleSubtitle = /** @class */ (function (_super) {
    __extends(PolarChartTitleSubtitle, _super);
    function PolarChartTitleSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolarChartTitleSubtitle.OptionName = "subtitle";
    PolarChartTitleSubtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return PolarChartTitleSubtitle;
}(nested_option_1.default));
exports.PolarChartTitleSubtitle = PolarChartTitleSubtitle;
var SelectionStyle = /** @class */ (function (_super) {
    __extends(SelectionStyle, _super);
    function SelectionStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectionStyle.OptionName = "selectionStyle";
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
var Strip = /** @class */ (function (_super) {
    __extends(Strip, _super);
    function Strip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Strip.OptionName = "strips";
    Strip.IsCollectionItem = true;
    return Strip;
}(nested_option_1.default));
exports.Strip = Strip;
var StripLabel = /** @class */ (function (_super) {
    __extends(StripLabel, _super);
    function StripLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripLabel.OptionName = "label";
    return StripLabel;
}(nested_option_1.default));
exports.StripLabel = StripLabel;
var StripStyle = /** @class */ (function (_super) {
    __extends(StripStyle, _super);
    function StripStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripStyle.OptionName = "stripStyle";
    StripStyle.ExpectedChildren = {
        label: { optionName: "label", isCollectionItem: false },
        stripStyleLabel: { optionName: "label", isCollectionItem: false }
    };
    return StripStyle;
}(nested_option_1.default));
exports.StripStyle = StripStyle;
var StripStyleLabel = /** @class */ (function (_super) {
    __extends(StripStyleLabel, _super);
    function StripStyleLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StripStyleLabel.OptionName = "label";
    return StripStyleLabel;
}(nested_option_1.default));
exports.StripStyleLabel = StripStyleLabel;
var Subtitle = /** @class */ (function (_super) {
    __extends(Subtitle, _super);
    function Subtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Subtitle.OptionName = "subtitle";
    return Subtitle;
}(nested_option_1.default));
exports.Subtitle = Subtitle;
var Tick = /** @class */ (function (_super) {
    __extends(Tick, _super);
    function Tick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tick.OptionName = "tick";
    return Tick;
}(nested_option_1.default));
exports.Tick = Tick;
var TickInterval = /** @class */ (function (_super) {
    __extends(TickInterval, _super);
    function TickInterval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TickInterval.OptionName = "tickInterval";
    return TickInterval;
}(nested_option_1.default));
exports.TickInterval = TickInterval;
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
var ValueAxis = /** @class */ (function (_super) {
    __extends(ValueAxis, _super);
    function ValueAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueAxis.OptionName = "valueAxis";
    ValueAxis.DefaultsProps = {
        defaultVisualRange: "visualRange"
    };
    ValueAxis.ExpectedChildren = {
        axisLabel: { optionName: "label", isCollectionItem: false },
        commonAxisSettingsTick: { optionName: "tick", isCollectionItem: false },
        constantLine: { optionName: "constantLines", isCollectionItem: true },
        label: { optionName: "label", isCollectionItem: false },
        minorTickInterval: { optionName: "minorTickInterval", isCollectionItem: false },
        minVisualRangeLength: { optionName: "minVisualRangeLength", isCollectionItem: false },
        strip: { optionName: "strips", isCollectionItem: true },
        tick: { optionName: "tick", isCollectionItem: false },
        tickInterval: { optionName: "tickInterval", isCollectionItem: false },
        visualRange: { optionName: "visualRange", isCollectionItem: false },
        wholeRange: { optionName: "wholeRange", isCollectionItem: false }
    };
    return ValueAxis;
}(nested_option_1.default));
exports.ValueAxis = ValueAxis;
var ValueErrorBar = /** @class */ (function (_super) {
    __extends(ValueErrorBar, _super);
    function ValueErrorBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueErrorBar.OptionName = "valueErrorBar";
    return ValueErrorBar;
}(nested_option_1.default));
exports.ValueErrorBar = ValueErrorBar;
var VisualRange = /** @class */ (function (_super) {
    __extends(VisualRange, _super);
    function VisualRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VisualRange.OptionName = "visualRange";
    VisualRange.DefaultsProps = {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    };
    VisualRange.ExpectedChildren = {
        length: { optionName: "length", isCollectionItem: false }
    };
    return VisualRange;
}(nested_option_1.default));
exports.VisualRange = VisualRange;
var WholeRange = /** @class */ (function (_super) {
    __extends(WholeRange, _super);
    function WholeRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WholeRange.OptionName = "wholeRange";
    WholeRange.DefaultsProps = {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    };
    return WholeRange;
}(nested_option_1.default));
exports.WholeRange = WholeRange;
exports.default = PolarChart;
