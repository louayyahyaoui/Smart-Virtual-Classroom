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
exports.VectorMapTitleSubtitle = exports.VectorMapTitle = exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.Source = exports.Size = exports.Shadow = exports.Projection = exports.Margin = exports.LoadingIndicator = exports.LegendTitleSubtitle = exports.LegendTitle = exports.Legend = exports.Layer = exports.Label = exports.Image = exports.Format = exports.Font = exports.Export = exports.ControlBar = exports.CommonAnnotationSettings = exports.Border = exports.Background = exports.AnnotationBorder = exports.Annotation = exports.VectorMap = void 0;
var vector_map_1 = require("devextreme/viz/vector_map");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var VectorMap = /** @class */ (function (_super) {
    __extends(VectorMap, _super);
    function VectorMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = vector_map_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show"];
        _this.independentEvents = ["onCenterChanged", "onClick", "onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onOptionChanged", "onSelectionChanged", "onTooltipHidden", "onTooltipShown", "onZoomFactorChanged"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator"
        };
        _this._expectedChildren = {
            annotation: { optionName: "annotations", isCollectionItem: true },
            background: { optionName: "background", isCollectionItem: false },
            commonAnnotationSettings: { optionName: "commonAnnotationSettings", isCollectionItem: false },
            controlBar: { optionName: "controlBar", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            layer: { optionName: "layers", isCollectionItem: true },
            legend: { optionName: "legends", isCollectionItem: true },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            projection: { optionName: "projection", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false },
            vectorMapTitle: { optionName: "title", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(VectorMap.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return VectorMap;
}(component_1.Component));
exports.VectorMap = VectorMap;
VectorMap.propTypes = {
    annotations: PropTypes.array,
    background: PropTypes.object,
    bounds: PropTypes.array,
    center: PropTypes.array,
    commonAnnotationSettings: PropTypes.object,
    controlBar: PropTypes.object,
    customizeAnnotation: PropTypes.func,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    layers: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    legends: PropTypes.array,
    loadingIndicator: PropTypes.object,
    maxZoomFactor: PropTypes.number,
    onCenterChanged: PropTypes.func,
    onClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onDisposing: PropTypes.func,
    onDrawn: PropTypes.func,
    onExported: PropTypes.func,
    onExporting: PropTypes.func,
    onFileSaving: PropTypes.func,
    onIncidentOccurred: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onSelectionChanged: PropTypes.func,
    onTooltipHidden: PropTypes.func,
    onTooltipShown: PropTypes.func,
    onZoomFactorChanged: PropTypes.func,
    panningEnabled: PropTypes.bool,
    pathModified: PropTypes.bool,
    projection: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([
            "equirectangular",
            "lambert",
            "mercator",
            "miller"
        ])
    ]),
    redrawOnResize: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
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
    touchEnabled: PropTypes.bool,
    wheelEnabled: PropTypes.bool,
    zoomFactor: PropTypes.number,
    zoomingEnabled: PropTypes.bool
};
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
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Background.OptionName = "background";
    return Background;
}(nested_option_1.default));
exports.Background = Background;
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
var ControlBar = /** @class */ (function (_super) {
    __extends(ControlBar, _super);
    function ControlBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlBar.OptionName = "controlBar";
    return ControlBar;
}(nested_option_1.default));
exports.ControlBar = ControlBar;
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
        font: { optionName: "font", isCollectionItem: false }
    };
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var Layer = /** @class */ (function (_super) {
    __extends(Layer, _super);
    function Layer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Layer.OptionName = "layers";
    Layer.IsCollectionItem = true;
    Layer.ExpectedChildren = {
        label: { optionName: "label", isCollectionItem: false }
    };
    return Layer;
}(nested_option_1.default));
exports.Layer = Layer;
var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Legend.OptionName = "legends";
    Legend.IsCollectionItem = true;
    Legend.ExpectedChildren = {
        annotationBorder: { optionName: "border", isCollectionItem: false },
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        legendTitle: { optionName: "title", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        source: { optionName: "source", isCollectionItem: false },
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
var Projection = /** @class */ (function (_super) {
    __extends(Projection, _super);
    function Projection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Projection.OptionName = "projection";
    return Projection;
}(nested_option_1.default));
exports.Projection = Projection;
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
var Source = /** @class */ (function (_super) {
    __extends(Source, _super);
    function Source() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Source.OptionName = "source";
    return Source;
}(nested_option_1.default));
exports.Source = Source;
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
var VectorMapTitle = /** @class */ (function (_super) {
    __extends(VectorMapTitle, _super);
    function VectorMapTitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VectorMapTitle.OptionName = "title";
    VectorMapTitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        margin: { optionName: "margin", isCollectionItem: false },
        subtitle: { optionName: "subtitle", isCollectionItem: false },
        vectorMapTitleSubtitle: { optionName: "subtitle", isCollectionItem: false }
    };
    return VectorMapTitle;
}(nested_option_1.default));
exports.VectorMapTitle = VectorMapTitle;
var VectorMapTitleSubtitle = /** @class */ (function (_super) {
    __extends(VectorMapTitleSubtitle, _super);
    function VectorMapTitleSubtitle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VectorMapTitleSubtitle.OptionName = "subtitle";
    VectorMapTitleSubtitle.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false }
    };
    return VectorMapTitleSubtitle;
}(nested_option_1.default));
exports.VectorMapTitleSubtitle = VectorMapTitleSubtitle;
exports.default = VectorMap;
