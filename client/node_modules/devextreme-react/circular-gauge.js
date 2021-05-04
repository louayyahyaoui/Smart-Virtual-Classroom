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
exports.ValueIndicator = exports.Tooltip = exports.Title = exports.Tick = exports.Text = exports.SubvalueIndicator = exports.Subtitle = exports.Size = exports.Shadow = exports.Scale = exports.RangeContainer = exports.Range = exports.MinorTick = exports.Margin = exports.LoadingIndicator = exports.Label = exports.Geometry = exports.Format = exports.Font = exports.Export = exports.Border = exports.Animation = exports.CircularGauge = void 0;
var circular_gauge_1 = require("devextreme/viz/circular_gauge");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var CircularGauge = /** @class */ (function (_super) {
    __extends(CircularGauge, _super);
    function CircularGauge() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = circular_gauge_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show", "subvalues", "value"];
        _this.independentEvents = ["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onOptionChanged", "onTooltipHidden", "onTooltipShown"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator",
            defaultSubvalues: "subvalues",
            defaultValue: "value"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            geometry: { optionName: "geometry", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            margin: { optionName: "margin", isCollectionItem: false },
            rangeContainer: { optionName: "rangeContainer", isCollectionItem: false },
            scale: { optionName: "scale", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            subvalueIndicator: { optionName: "subvalueIndicator", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false },
            valueIndicator: { optionName: "valueIndicator", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(CircularGauge.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return CircularGauge;
}(component_1.Component));
exports.CircularGauge = CircularGauge;
CircularGauge.propTypes = {
    animation: PropTypes.object,
    containerBackgroundColor: PropTypes.string,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    geometry: PropTypes.object,
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
    pathModified: PropTypes.bool,
    rangeContainer: PropTypes.object,
    redrawOnResize: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    scale: PropTypes.object,
    size: PropTypes.object,
    subvalueIndicator: PropTypes.object,
    subvalues: PropTypes.array,
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
    value: PropTypes.number,
    valueIndicator: PropTypes.object
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
var MinorTick = /** @class */ (function (_super) {
    __extends(MinorTick, _super);
    function MinorTick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinorTick.OptionName = "minorTick";
    return MinorTick;
}(nested_option_1.default));
exports.MinorTick = MinorTick;
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Range.OptionName = "ranges";
    Range.IsCollectionItem = true;
    return Range;
}(nested_option_1.default));
exports.Range = Range;
var RangeContainer = /** @class */ (function (_super) {
    __extends(RangeContainer, _super);
    function RangeContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeContainer.OptionName = "rangeContainer";
    RangeContainer.ExpectedChildren = {
        range: { optionName: "ranges", isCollectionItem: true }
    };
    return RangeContainer;
}(nested_option_1.default));
exports.RangeContainer = RangeContainer;
var Scale = /** @class */ (function (_super) {
    __extends(Scale, _super);
    function Scale() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scale.OptionName = "scale";
    Scale.ExpectedChildren = {
        label: { optionName: "label", isCollectionItem: false },
        minorTick: { optionName: "minorTick", isCollectionItem: false },
        tick: { optionName: "tick", isCollectionItem: false }
    };
    return Scale;
}(nested_option_1.default));
exports.Scale = Scale;
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
var SubvalueIndicator = /** @class */ (function (_super) {
    __extends(SubvalueIndicator, _super);
    function SubvalueIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubvalueIndicator.OptionName = "subvalueIndicator";
    SubvalueIndicator.ExpectedChildren = {
        text: { optionName: "text", isCollectionItem: false }
    };
    return SubvalueIndicator;
}(nested_option_1.default));
exports.SubvalueIndicator = SubvalueIndicator;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Text.OptionName = "text";
    Text.ExpectedChildren = {
        font: { optionName: "font", isCollectionItem: false },
        format: { optionName: "format", isCollectionItem: false }
    };
    return Text;
}(nested_option_1.default));
exports.Text = Text;
var Tick = /** @class */ (function (_super) {
    __extends(Tick, _super);
    function Tick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tick.OptionName = "tick";
    return Tick;
}(nested_option_1.default));
exports.Tick = Tick;
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
        shadow: { optionName: "shadow", isCollectionItem: false }
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
var ValueIndicator = /** @class */ (function (_super) {
    __extends(ValueIndicator, _super);
    function ValueIndicator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueIndicator.OptionName = "valueIndicator";
    return ValueIndicator;
}(nested_option_1.default));
exports.ValueIndicator = ValueIndicator;
exports.default = CircularGauge;
