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
exports.Texts = exports.PivotGridFieldChooserTexts = exports.HeaderFilterTexts = exports.HeaderFilter = exports.PivotGridFieldChooser = void 0;
var pivot_grid_field_chooser_1 = require("devextreme/ui/pivot_grid_field_chooser");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var PivotGridFieldChooser = /** @class */ (function (_super) {
    __extends(PivotGridFieldChooser, _super);
    function PivotGridFieldChooser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = pivot_grid_field_chooser_1.default;
        _this.independentEvents = ["onContentReady", "onContextMenuPreparing", "onDisposing", "onInitialized", "onOptionChanged"];
        _this._expectedChildren = {
            headerFilter: { optionName: "headerFilter", isCollectionItem: false },
            pivotGridFieldChooserTexts: { optionName: "texts", isCollectionItem: false },
            texts: { optionName: "texts", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(PivotGridFieldChooser.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return PivotGridFieldChooser;
}(component_1.Component));
exports.PivotGridFieldChooser = PivotGridFieldChooser;
PivotGridFieldChooser.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowSearch: PropTypes.bool,
    applyChangesMode: PropTypes.oneOf([
        "instantly",
        "onDemand"
    ]),
    dataSource: PropTypes.object,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    headerFilter: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    layout: PropTypes.oneOf([
        0,
        1,
        2
    ]),
    onContentReady: PropTypes.func,
    onContextMenuPreparing: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    searchTimeout: PropTypes.number,
    state: PropTypes.object,
    tabIndex: PropTypes.number,
    texts: PropTypes.object,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
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
var PivotGridFieldChooserTexts = /** @class */ (function (_super) {
    __extends(PivotGridFieldChooserTexts, _super);
    function PivotGridFieldChooserTexts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PivotGridFieldChooserTexts.OptionName = "texts";
    return PivotGridFieldChooserTexts;
}(nested_option_1.default));
exports.PivotGridFieldChooserTexts = PivotGridFieldChooserTexts;
var Texts = /** @class */ (function (_super) {
    __extends(Texts, _super);
    function Texts() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Texts.OptionName = "texts";
    return Texts;
}(nested_option_1.default));
exports.Texts = Texts;
exports.default = PivotGridFieldChooser;
