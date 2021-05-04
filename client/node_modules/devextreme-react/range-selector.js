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
exports.Width = exports.ValueErrorBar = exports.ValueAxis = exports.Value = exports.Url = exports.Title = exports.TickInterval = exports.Tick = exports.Subtitle = exports.SliderMarker = exports.SliderHandle = exports.Size = exports.Shutter = exports.SeriesTemplate = exports.SeriesBorder = exports.Series = exports.SelectionStyle = exports.ScaleLabel = exports.Scale = exports.Reduction = exports.PointSelectionStyle = exports.PointImage = exports.PointHoverStyle = exports.PointBorder = exports.Point = exports.MinRange = exports.MinorTickInterval = exports.MinorTick = exports.MaxRange = exports.MarkerLabel = exports.Marker = exports.Margin = exports.LoadingIndicator = exports.Length = exports.Label = exports.Indent = exports.Image = exports.HoverStyle = exports.Height = exports.Hatching = exports.Format = exports.Font = exports.Export = exports.DataPrepareSettings = exports.Connector = exports.CommonSeriesSettingsSelectionStyle = exports.CommonSeriesSettingsLabel = exports.CommonSeriesSettingsHoverStyle = exports.CommonSeriesSettings = exports.Chart = exports.BreakStyle = exports.Break = exports.Border = exports.Behavior = exports.BackgroundImage = exports.Background = exports.ArgumentFormat = exports.AggregationInterval = exports.Aggregation = exports.RangeSelector = void 0;
var range_selector_1 = require("devextreme/viz/range_selector");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var RangeSelector = /** @class */ (function (_super) {
    __extends(RangeSelector, _super);
    function RangeSelector() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = range_selector_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show", "value"];
        _this.independentEvents = ["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onOptionChanged", "onValueChanged"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator",
            defaultValue: "value"
        };
        _this._expectedChildren = {
            background: { optionName: "background", isCollectionItem: false },
            behavior: { optionName: "behavior", isCollectionItem: false },
            chart: { optionName: "chart", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            indent: { optionName: "indent", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            margin: { optionName: "margin", isCollectionItem: false },
            scale: { optionName: "scale", isCollectionItem: false },
            shutter: { optionName: "shutter", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            sliderHandle: { optionName: "sliderHandle", isCollectionItem: false },
            sliderMarker: { optionName: "sliderMarker", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            value: { optionName: "value", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(RangeSelector.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return RangeSelector;
}(component_1.Component));
exports.RangeSelector = RangeSelector;
RangeSelector.propTypes = {
    background: PropTypes.object,
    behavior: PropTypes.object,
    chart: PropTypes.object,
    containerBackgroundColor: PropTypes.string,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    dataSourceField: PropTypes.string,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    indent: PropTypes.object,
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
    onValueChanged: PropTypes.func,
    pathModified: PropTypes.bool,
    redrawOnResize: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    scale: PropTypes.object,
    selectedRangeColor: PropTypes.string,
    selectedRangeUpdateMode: PropTypes.oneOf([
        "auto",
        "keep",
        "reset",
        "shift"
    ]),
    shutter: PropTypes.object,
    size: PropTypes.object,
    sliderHandle: PropTypes.object,
    sliderMarker: PropTypes.object,
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
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};
var Aggregation = /** @class */ (function (_super) {
    __extends(Aggregation, _super);
    function Aggregation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Aggregation.OptionName = "aggregation";
    return Aggregation;
}(nested_option_1.default));
exports.Aggregation = Aggregation;
var AggregationInterval = /** @class */ (function (_super) {
    __extends(AggregationInterval, _super);
    function AggregationInterval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AggregationInterval.OptionName = "aggregationInterval";
    return AggregationInterval;
}(nested_option_1.default));
exports.AggregationInterval = AggregationInterval;
var ArgumentFormat = /** @class */ (function (_super) {
    __extends(ArgumentFormat, _super);
    function ArgumentFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArgumentFormat.OptionName = "argumentFormat";
    return ArgumentFormat;
}(nested_option_1.default));
exports.ArgumentFormat = ArgumentFormat;
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Background.OptionName = "background";
    Background.ExpectedChildren = {
        backgroundImage: { optionName: "image", isCollectionItem: false },
        image: { optionName: "image", isCollectionItem: false }
    };
    return Background;
}(nested_option_1.default));
exports.Background = Background;
var BackgroundImage = /** @class */ (function (_super) {
    __extends(BackgroundImage, _super);
    function BackgroundImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackgroundImage.OptionName = "image";
    return BackgroundImage;
}(nested_option_1.default));
exports.BackgroundImage = BackgroundImage;
var Behavior = /** @class */ (function (_super) {
    __extends(Behavior, _super);
    function Behavior() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Behavior.OptionName = "behavior";
    return Behavior;
}(nested_option_1.default));
exports.Behavior = Behavior;
var Border = /** @class */ (function (_super) {
    __extends(Border, _super);
    function Border() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Border.OptionName = "border";
    return Border;
}(nested_option_1.default));
exports.Border = Border;
var Break = /** @class */ (function (_super) {
    __extends(Break, _super);
    function Break() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Break.OptionName = "breaks";
    Break.IsCollectionItem = true;
    return Break;
}(nested_option_1.default));
exports.Break = Break;
var BreakStyle = /** @class */ (function (_super) {
    __extends(BreakStyle, _super);
    function BreakStyle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BreakStyle.OptionName = "breakStyle";
    return BreakStyle;
}(nested_option_1.default));
exports.BreakStyle = BreakStyle;
var Chart = /** @class */ (function (_super) {
    __extends(Chart, _super);
    function Chart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart.OptionName = "chart";
    Chart.ExpectedChildren = {
        commonSeriesSettings: { optionName: "commonSeriesSettings", isCollectionItem: false },
        dataPrepareSettings: { optionName: "dataPrepareSettings", isCollectionItem: false },
        series: { optionName: "series", isCollectionItem: true },
        seriesTemplate: { optionName: "seriesTemplate", isCollectionItem: false },
        valueAxis: { optionName: "valueAxis", isCollectionItem: false }
    };
    return Chart;
}(nested_option_1.default));
exports.Chart = Chart;
var CommonSeriesSettings = /** @class */ (function (_super) {
    __extends(CommonSeriesSettings, _super);
    function CommonSeriesSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommonSeriesSettings.OptionName = "commonSeriesSettings";
    CommonSeriesSettings.ExpectedChildren = {
        aggregation: { optionName: "aggregation", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        commonSeriesSettingsHoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        commonSeriesSettingsLabel: { optionName: "label", isCollectionItem: false },
        commonSeriesSettingsSelectionStyle: { optionName: "selectionStyle", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        point: { optionName: "point", isCollectionItem: false },
        reduction: { optionName: "reduction", isCollectionItem: false },
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
var Hatching = /** @class */ (function (_super) {
    __extends(Hatching, _super);
    function Hatching() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hatching.OptionName = "hatching";
    return Hatching;
}(nested_option_1.default));
exports.Hatching = Hatching;
var Height = /** @class */ (function (_super) {
    __extends(Height, _super);
    function Height() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Height.OptionName = "height";
    return Height;
}(nested_option_1.default));
exports.Height = Height;
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
var Indent = /** @class */ (function (_super) {
    __extends(Indent, _super);
    function Indent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Indent.OptionName = "indent";
    return Indent;
}(nested_option_1.default));
exports.Indent = Indent;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    return Label;
}(nested_option_1.default));
exports.Label = Label;
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
var Marker = /** @class */ (function (_super) {
    __extends(Marker, _super);
    function Marker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Marker.OptionName = "marker";
    Marker.ExpectedChildren = {
        label: { optionName: "label", isCollectionItem: false },
        markerLabel: { optionName: "label", isCollectionItem: false }
    };
    return Marker;
}(nested_option_1.default));
exports.Marker = Marker;
var MarkerLabel = /** @class */ (function (_super) {
    __extends(MarkerLabel, _super);
    function MarkerLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkerLabel.OptionName = "label";
    MarkerLabel.ExpectedChildren = {
        format: { optionName: "format", isCollectionItem: false }
    };
    return MarkerLabel;
}(nested_option_1.default));
exports.MarkerLabel = MarkerLabel;
var MaxRange = /** @class */ (function (_super) {
    __extends(MaxRange, _super);
    function MaxRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxRange.OptionName = "maxRange";
    return MaxRange;
}(nested_option_1.default));
exports.MaxRange = MaxRange;
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
var MinRange = /** @class */ (function (_super) {
    __extends(MinRange, _super);
    function MinRange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinRange.OptionName = "minRange";
    return MinRange;
}(nested_option_1.default));
exports.MinRange = MinRange;
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
        pointImage: { optionName: "image", isCollectionItem: false },
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
var PointImage = /** @class */ (function (_super) {
    __extends(PointImage, _super);
    function PointImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PointImage.OptionName = "image";
    PointImage.ExpectedChildren = {
        height: { optionName: "height", isCollectionItem: false },
        url: { optionName: "url", isCollectionItem: false },
        width: { optionName: "width", isCollectionItem: false }
    };
    return PointImage;
}(nested_option_1.default));
exports.PointImage = PointImage;
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
var Reduction = /** @class */ (function (_super) {
    __extends(Reduction, _super);
    function Reduction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Reduction.OptionName = "reduction";
    return Reduction;
}(nested_option_1.default));
exports.Reduction = Reduction;
var Scale = /** @class */ (function (_super) {
    __extends(Scale, _super);
    function Scale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scale.OptionName = "scale";
    Scale.ExpectedChildren = {
        aggregationInterval: { optionName: "aggregationInterval", isCollectionItem: false },
        break: { optionName: "breaks", isCollectionItem: true },
        breakStyle: { optionName: "breakStyle", isCollectionItem: false },
        label: { optionName: "label", isCollectionItem: false },
        marker: { optionName: "marker", isCollectionItem: false },
        maxRange: { optionName: "maxRange", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        minorTickInterval: { optionName: "minorTickInterval", isCollectionItem: false },
        minRange: { optionName: "minRange", isCollectionItem: false },
        scaleLabel: { optionName: "label", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false },
        tickInterval: { optionName: "tickInterval", isCollectionItem: false }
    };
    return Scale;
}(nested_option_1.default));
exports.Scale = Scale;
var ScaleLabel = /** @class */ (function (_super) {
    __extends(ScaleLabel, _super);
    function ScaleLabel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScaleLabel.OptionName = "label";
    ScaleLabel.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    };
    return ScaleLabel;
}(nested_option_1.default));
exports.ScaleLabel = ScaleLabel;
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
var Shutter = /** @class */ (function (_super) {
    __extends(Shutter, _super);
    function Shutter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Shutter.OptionName = "shutter";
    return Shutter;
}(nested_option_1.default));
exports.Shutter = Shutter;
var Size = /** @class */ (function (_super) {
    __extends(Size, _super);
    function Size() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Size.OptionName = "size";
    return Size;
}(nested_option_1.default));
exports.Size = Size;
var SliderHandle = /** @class */ (function (_super) {
    __extends(SliderHandle, _super);
    function SliderHandle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderHandle.OptionName = "sliderHandle";
    return SliderHandle;
}(nested_option_1.default));
exports.SliderHandle = SliderHandle;
var SliderMarker = /** @class */ (function (_super) {
    __extends(SliderMarker, _super);
    function SliderMarker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SliderMarker.OptionName = "sliderMarker";
    SliderMarker.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    };
    return SliderMarker;
}(nested_option_1.default));
exports.SliderMarker = SliderMarker;
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
    Title.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return Title;
}(nested_option_1.default));
exports.Title = Title;
var Url = /** @class */ (function (_super) {
    __extends(Url, _super);
    function Url() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Url.OptionName = "url";
    return Url;
}(nested_option_1.default));
exports.Url = Url;
var Value = /** @class */ (function (_super) {
    __extends(Value, _super);
    function Value() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Value.OptionName = "value";
    Value.DefaultsProps = {
        defaultEndValue: "endValue",
        defaultStartValue: "startValue"
    };
    Value.ExpectedChildren = {
        length: { optionName: "length", isCollectionItem: false }
    };
    return Value;
}(nested_option_1.default));
exports.Value = Value;
var ValueAxis = /** @class */ (function (_super) {
    __extends(ValueAxis, _super);
    function ValueAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueAxis.OptionName = "valueAxis";
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
var Width = /** @class */ (function (_super) {
    __extends(Width, _super);
    function Width() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Width.OptionName = "width";
    return Width;
}(nested_option_1.default));
exports.Width = Width;
exports.default = RangeSelector;
