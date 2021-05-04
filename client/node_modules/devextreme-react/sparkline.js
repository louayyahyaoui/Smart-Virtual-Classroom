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
exports.Tooltip = exports.Size = exports.Shadow = exports.Margin = exports.Format = exports.Font = exports.Border = exports.Sparkline = void 0;
var sparkline_1 = require("devextreme/viz/sparkline");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Sparkline = /** @class */ (function (_super) {
    __extends(Sparkline, _super);
    function Sparkline() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = sparkline_1.default;
        _this.independentEvents = ["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onOptionChanged", "onTooltipHidden", "onTooltipShown"];
        _this._expectedChildren = {
            margin: { optionName: "margin", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(Sparkline.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Sparkline;
}(component_1.Component));
exports.Sparkline = Sparkline;
Sparkline.propTypes = {
    argumentField: PropTypes.string,
    barNegativeColor: PropTypes.string,
    barPositiveColor: PropTypes.string,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    firstLastColor: PropTypes.string,
    ignoreEmptyPoints: PropTypes.bool,
    lineColor: PropTypes.string,
    lineWidth: PropTypes.number,
    lossColor: PropTypes.string,
    margin: PropTypes.object,
    maxColor: PropTypes.string,
    maxValue: PropTypes.number,
    minColor: PropTypes.string,
    minValue: PropTypes.number,
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
    pointColor: PropTypes.string,
    pointSize: PropTypes.number,
    pointSymbol: PropTypes.oneOf([
        "circle",
        "cross",
        "polygon",
        "square",
        "triangle"
    ]),
    rtlEnabled: PropTypes.bool,
    showFirstLast: PropTypes.bool,
    showMinMax: PropTypes.bool,
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
    tooltip: PropTypes.object,
    type: PropTypes.oneOf([
        "area",
        "bar",
        "line",
        "spline",
        "splinearea",
        "steparea",
        "stepline",
        "winloss"
    ]),
    valueField: PropTypes.string,
    winColor: PropTypes.string,
    winlossThreshold: PropTypes.number
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
exports.default = Sparkline;
