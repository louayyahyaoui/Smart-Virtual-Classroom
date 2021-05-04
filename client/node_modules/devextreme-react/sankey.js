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
exports.TooltipBorder = exports.Tooltip = exports.Title = exports.Subtitle = exports.Size = exports.Shadow = exports.Sankeyborder = exports.Node = exports.Margin = exports.LoadingIndicator = exports.Link = exports.Label = exports.HoverStyle = exports.Hatching = exports.Format = exports.Font = exports.Export = exports.Border = exports.AdaptiveLayout = exports.Sankey = void 0;
var sankey_1 = require("devextreme/viz/sankey");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Sankey = /** @class */ (function (_super) {
    __extends(Sankey, _super);
    function Sankey() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = sankey_1.default;
        _this.subscribableOptions = ["loadingIndicator", "loadingIndicator.show"];
        _this.independentEvents = ["onDisposing", "onDrawn", "onExported", "onExporting", "onFileSaving", "onIncidentOccurred", "onInitialized", "onLinkClick", "onLinkHoverChanged", "onNodeClick", "onNodeHoverChanged", "onOptionChanged"];
        _this._defaults = {
            defaultLoadingIndicator: "loadingIndicator"
        };
        _this._expectedChildren = {
            adaptiveLayout: { optionName: "adaptiveLayout", isCollectionItem: false },
            export: { optionName: "export", isCollectionItem: false },
            label: { optionName: "label", isCollectionItem: false },
            link: { optionName: "link", isCollectionItem: false },
            loadingIndicator: { optionName: "loadingIndicator", isCollectionItem: false },
            margin: { optionName: "margin", isCollectionItem: false },
            node: { optionName: "node", isCollectionItem: false },
            size: { optionName: "size", isCollectionItem: false },
            title: { optionName: "title", isCollectionItem: false },
            tooltip: { optionName: "tooltip", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(Sankey.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Sankey;
}(component_1.Component));
exports.Sankey = Sankey;
Sankey.propTypes = {
    adaptiveLayout: PropTypes.object,
    alignment: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.oneOf([
            "bottom",
            "center",
            "top"
        ])
    ]),
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    hoverEnabled: PropTypes.bool,
    label: PropTypes.object,
    link: PropTypes.object,
    loadingIndicator: PropTypes.object,
    margin: PropTypes.object,
    node: PropTypes.object,
    onDisposing: PropTypes.func,
    onDrawn: PropTypes.func,
    onExported: PropTypes.func,
    onExporting: PropTypes.func,
    onFileSaving: PropTypes.func,
    onIncidentOccurred: PropTypes.func,
    onInitialized: PropTypes.func,
    onLinkClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onLinkHoverChanged: PropTypes.func,
    onNodeClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onNodeHoverChanged: PropTypes.func,
    onOptionChanged: PropTypes.func,
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
    rtlEnabled: PropTypes.bool,
    size: PropTypes.object,
    sortData: PropTypes.object,
    sourceField: PropTypes.string,
    targetField: PropTypes.string,
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
    weightField: PropTypes.string
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
    return HoverStyle;
}(nested_option_1.default));
exports.HoverStyle = HoverStyle;
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Label.OptionName = "label";
    Label.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        font: { optionName: "font", isCollectionItem: false },
        sankeyborder: { optionName: "border", isCollectionItem: false },
        shadow: { optionName: "shadow", isCollectionItem: false }
    };
    return Label;
}(nested_option_1.default));
exports.Label = Label;
var Link = /** @class */ (function (_super) {
    __extends(Link, _super);
    function Link() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Link.OptionName = "link";
    Link.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        sankeyborder: { optionName: "border", isCollectionItem: false }
    };
    return Link;
}(nested_option_1.default));
exports.Link = Link;
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
var Node = /** @class */ (function (_super) {
    __extends(Node, _super);
    function Node() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Node.OptionName = "node";
    Node.ExpectedChildren = {
        border: { optionName: "border", isCollectionItem: false },
        hoverStyle: { optionName: "hoverStyle", isCollectionItem: false },
        sankeyborder: { optionName: "border", isCollectionItem: false }
    };
    return Node;
}(nested_option_1.default));
exports.Node = Node;
var Sankeyborder = /** @class */ (function (_super) {
    __extends(Sankeyborder, _super);
    function Sankeyborder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Sankeyborder.OptionName = "border";
    return Sankeyborder;
}(nested_option_1.default));
exports.Sankeyborder = Sankeyborder;
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
            tmplOption: "linkTooltipTemplate",
            render: "linkTooltipRender",
            component: "linkTooltipComponent",
            keyFn: "linkTooltipKeyFn"
        }, {
            tmplOption: "nodeTooltipTemplate",
            render: "nodeTooltipRender",
            component: "nodeTooltipComponent",
            keyFn: "nodeTooltipKeyFn"
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
exports.default = Sankey;
