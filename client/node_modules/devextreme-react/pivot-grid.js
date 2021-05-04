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
exports.Texts = exports.StateStoring = exports.Scrolling = exports.PivotGridTexts = exports.LoadPanel = exports.HeaderFilterTexts = exports.HeaderFilter = exports.FieldPanelTexts = exports.FieldPanel = exports.FieldChooserTexts = exports.FieldChooser = exports.Export = exports.PivotGrid = void 0;
var pivot_grid_1 = require("devextreme/ui/pivot_grid");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var PivotGrid = /** @class */ (function (_super) {
    __extends(PivotGrid, _super);
    function PivotGrid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = pivot_grid_1.default;
        _this.independentEvents = ["onCellClick", "onCellPrepared", "onContentReady", "onContextMenuPreparing", "onDisposing", "onExporting", "onInitialized", "onOptionChanged"];
        _this._expectedChildren = {
            export: { optionName: "export", isCollectionItem: false },
            fieldChooser: { optionName: "fieldChooser", isCollectionItem: false },
            fieldPanel: { optionName: "fieldPanel", isCollectionItem: false },
            headerFilter: { optionName: "headerFilter", isCollectionItem: false },
            loadPanel: { optionName: "loadPanel", isCollectionItem: false },
            pivotGridTexts: { optionName: "texts", isCollectionItem: false },
            scrolling: { optionName: "scrolling", isCollectionItem: false },
            stateStoring: { optionName: "stateStoring", isCollectionItem: false },
            texts: { optionName: "texts", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(PivotGrid.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return PivotGrid;
}(component_1.Component));
exports.PivotGrid = PivotGrid;
PivotGrid.propTypes = {
    allowExpandAll: PropTypes.bool,
    allowFiltering: PropTypes.bool,
    allowSorting: PropTypes.bool,
    allowSortingBySummary: PropTypes.bool,
    dataFieldArea: PropTypes.oneOf([
        "column",
        "row"
    ]),
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ]),
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    export: PropTypes.object,
    fieldChooser: PropTypes.object,
    fieldPanel: PropTypes.object,
    headerFilter: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hideEmptySummaryCells: PropTypes.bool,
    hint: PropTypes.string,
    loadPanel: PropTypes.object,
    onCellClick: PropTypes.func,
    onCellPrepared: PropTypes.func,
    onContentReady: PropTypes.func,
    onContextMenuPreparing: PropTypes.func,
    onDisposing: PropTypes.func,
    onExporting: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    rowHeaderLayout: PropTypes.oneOf([
        "standard",
        "tree"
    ]),
    rtlEnabled: PropTypes.bool,
    scrolling: PropTypes.object,
    showBorders: PropTypes.bool,
    showColumnGrandTotals: PropTypes.bool,
    showColumnTotals: PropTypes.bool,
    showRowGrandTotals: PropTypes.bool,
    showRowTotals: PropTypes.bool,
    showTotalsPrior: PropTypes.oneOf([
        "both",
        "columns",
        "none",
        "rows"
    ]),
    stateStoring: PropTypes.object,
    tabIndex: PropTypes.number,
    texts: PropTypes.object,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    wordWrapEnabled: PropTypes.bool
};
var Export = /** @class */ (function (_super) {
    __extends(Export, _super);
    function Export() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Export.OptionName = "export";
    return Export;
}(nested_option_1.default));
exports.Export = Export;
var FieldChooser = /** @class */ (function (_super) {
    __extends(FieldChooser, _super);
    function FieldChooser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldChooser.OptionName = "fieldChooser";
    FieldChooser.ExpectedChildren = {
        fieldChooserTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    };
    return FieldChooser;
}(nested_option_1.default));
exports.FieldChooser = FieldChooser;
var FieldChooserTexts = /** @class */ (function (_super) {
    __extends(FieldChooserTexts, _super);
    function FieldChooserTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldChooserTexts.OptionName = "texts";
    return FieldChooserTexts;
}(nested_option_1.default));
exports.FieldChooserTexts = FieldChooserTexts;
var FieldPanel = /** @class */ (function (_super) {
    __extends(FieldPanel, _super);
    function FieldPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldPanel.OptionName = "fieldPanel";
    FieldPanel.ExpectedChildren = {
        fieldPanelTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    };
    return FieldPanel;
}(nested_option_1.default));
exports.FieldPanel = FieldPanel;
var FieldPanelTexts = /** @class */ (function (_super) {
    __extends(FieldPanelTexts, _super);
    function FieldPanelTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldPanelTexts.OptionName = "texts";
    return FieldPanelTexts;
}(nested_option_1.default));
exports.FieldPanelTexts = FieldPanelTexts;
var HeaderFilter = /** @class */ (function (_super) {
    __extends(HeaderFilter, _super);
    function HeaderFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderFilter.OptionName = "headerFilter";
    HeaderFilter.ExpectedChildren = {
        headerFilterTexts: { optionName: "texts", isCollectionItem: false },
        texts: { optionName: "texts", isCollectionItem: false }
    };
    return HeaderFilter;
}(nested_option_1.default));
exports.HeaderFilter = HeaderFilter;
var HeaderFilterTexts = /** @class */ (function (_super) {
    __extends(HeaderFilterTexts, _super);
    function HeaderFilterTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HeaderFilterTexts.OptionName = "texts";
    return HeaderFilterTexts;
}(nested_option_1.default));
exports.HeaderFilterTexts = HeaderFilterTexts;
var LoadPanel = /** @class */ (function (_super) {
    __extends(LoadPanel, _super);
    function LoadPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoadPanel.OptionName = "loadPanel";
    return LoadPanel;
}(nested_option_1.default));
exports.LoadPanel = LoadPanel;
var PivotGridTexts = /** @class */ (function (_super) {
    __extends(PivotGridTexts, _super);
    function PivotGridTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PivotGridTexts.OptionName = "texts";
    return PivotGridTexts;
}(nested_option_1.default));
exports.PivotGridTexts = PivotGridTexts;
var Scrolling = /** @class */ (function (_super) {
    __extends(Scrolling, _super);
    function Scrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scrolling.OptionName = "scrolling";
    return Scrolling;
}(nested_option_1.default));
exports.Scrolling = Scrolling;
var StateStoring = /** @class */ (function (_super) {
    __extends(StateStoring, _super);
    function StateStoring() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StateStoring.OptionName = "stateStoring";
    return StateStoring;
}(nested_option_1.default));
exports.StateStoring = StateStoring;
var Texts = /** @class */ (function (_super) {
    __extends(Texts, _super);
    function Texts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Texts.OptionName = "texts";
    return Texts;
}(nested_option_1.default));
exports.Texts = Texts;
exports.default = PivotGrid;
