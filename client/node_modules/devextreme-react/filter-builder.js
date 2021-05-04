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
exports.Lookup = exports.GroupOperationDescriptions = exports.Format = exports.FilterOperationDescriptions = exports.Field = exports.CustomOperation = exports.FilterBuilder = void 0;
var filter_builder_1 = require("devextreme/ui/filter_builder");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var FilterBuilder = /** @class */ (function (_super) {
    __extends(FilterBuilder, _super);
    function FilterBuilder() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = filter_builder_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onEditorPrepared", "onEditorPreparing", "onInitialized", "onOptionChanged", "onValueChanged"];
        _this._defaults = {
            defaultValue: "value"
        };
        _this._expectedChildren = {
            customOperation: { optionName: "customOperations", isCollectionItem: true },
            field: { optionName: "fields", isCollectionItem: true },
            filterOperationDescriptions: { optionName: "filterOperationDescriptions", isCollectionItem: false },
            groupOperationDescriptions: { optionName: "groupOperationDescriptions", isCollectionItem: false }
        };
        return _this;
    }
    Object.defineProperty(FilterBuilder.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return FilterBuilder;
}(component_1.Component));
exports.FilterBuilder = FilterBuilder;
FilterBuilder.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    allowHierarchicalFields: PropTypes.bool,
    customOperations: PropTypes.array,
    disabled: PropTypes.bool,
    elementAttr: PropTypes.object,
    fields: PropTypes.array,
    filterOperationDescriptions: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    groupOperationDescriptions: PropTypes.object,
    groupOperations: PropTypes.array,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    maxGroupLevel: PropTypes.number,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onEditorPrepared: PropTypes.func,
    onEditorPreparing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onValueChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func,
        PropTypes.string
    ]),
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var CustomOperation = /** @class */ (function (_super) {
    __extends(CustomOperation, _super);
    function CustomOperation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomOperation.OptionName = "customOperations";
    CustomOperation.IsCollectionItem = true;
    CustomOperation.TemplateProps = [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent",
            keyFn: "editorKeyFn"
        }];
    return CustomOperation;
}(nested_option_1.default));
exports.CustomOperation = CustomOperation;
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.OptionName = "fields";
    Field.IsCollectionItem = true;
    Field.ExpectedChildren = {
        format: { optionName: "format", isCollectionItem: false },
        lookup: { optionName: "lookup", isCollectionItem: false }
    };
    Field.TemplateProps = [{
            tmplOption: "editorTemplate",
            render: "editorRender",
            component: "editorComponent",
            keyFn: "editorKeyFn"
        }];
    return Field;
}(nested_option_1.default));
exports.Field = Field;
var FilterOperationDescriptions = /** @class */ (function (_super) {
    __extends(FilterOperationDescriptions, _super);
    function FilterOperationDescriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FilterOperationDescriptions.OptionName = "filterOperationDescriptions";
    return FilterOperationDescriptions;
}(nested_option_1.default));
exports.FilterOperationDescriptions = FilterOperationDescriptions;
var Format = /** @class */ (function (_super) {
    __extends(Format, _super);
    function Format() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Format.OptionName = "format";
    return Format;
}(nested_option_1.default));
exports.Format = Format;
var GroupOperationDescriptions = /** @class */ (function (_super) {
    __extends(GroupOperationDescriptions, _super);
    function GroupOperationDescriptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupOperationDescriptions.OptionName = "groupOperationDescriptions";
    return GroupOperationDescriptions;
}(nested_option_1.default));
exports.GroupOperationDescriptions = GroupOperationDescriptions;
var Lookup = /** @class */ (function (_super) {
    __extends(Lookup, _super);
    function Lookup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Lookup.OptionName = "lookup";
    return Lookup;
}(nested_option_1.default));
exports.Lookup = Lookup;
exports.default = FilterBuilder;
