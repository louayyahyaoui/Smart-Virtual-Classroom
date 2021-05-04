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
exports.ValidationRule = exports.StringLengthRule = exports.RequiredRule = exports.RangeRule = exports.PatternRule = exports.NumericRule = exports.EmailRule = exports.CustomRule = exports.CompareRule = exports.AsyncRule = exports.Adapter = exports.Validator = void 0;
var validator_1 = require("devextreme/ui/validator");
var PropTypes = require("prop-types");
var extension_component_1 = require("./core/extension-component");
var nested_option_1 = require("./core/nested-option");
var Validator = /** @class */ (function (_super) {
    __extends(Validator, _super);
    function Validator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = validator_1.default;
        _this.independentEvents = ["onDisposing", "onInitialized", "onOptionChanged", "onValidated"];
        _this._expectedChildren = {
            adapter: { optionName: "adapter", isCollectionItem: false },
            AsyncRule: { optionName: "validationRules", isCollectionItem: true },
            CompareRule: { optionName: "validationRules", isCollectionItem: true },
            CustomRule: { optionName: "validationRules", isCollectionItem: true },
            EmailRule: { optionName: "validationRules", isCollectionItem: true },
            NumericRule: { optionName: "validationRules", isCollectionItem: true },
            PatternRule: { optionName: "validationRules", isCollectionItem: true },
            RangeRule: { optionName: "validationRules", isCollectionItem: true },
            RequiredRule: { optionName: "validationRules", isCollectionItem: true },
            StringLengthRule: { optionName: "validationRules", isCollectionItem: true },
            validationRule: { optionName: "validationRules", isCollectionItem: true }
        };
        return _this;
    }
    Object.defineProperty(Validator.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Validator;
}(extension_component_1.ExtensionComponent));
exports.Validator = Validator;
Validator.propTypes = {
    adapter: PropTypes.object,
    elementAttr: PropTypes.object,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    name: PropTypes.string,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onValidated: PropTypes.func,
    validationGroup: PropTypes.string,
    validationRules: PropTypes.array,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Adapter = /** @class */ (function (_super) {
    __extends(Adapter, _super);
    function Adapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Adapter.OptionName = "adapter";
    return Adapter;
}(nested_option_1.default));
exports.Adapter = Adapter;
var AsyncRule = /** @class */ (function (_super) {
    __extends(AsyncRule, _super);
    function AsyncRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AsyncRule.OptionName = "validationRules";
    AsyncRule.IsCollectionItem = true;
    AsyncRule.PredefinedProps = {
        type: "async"
    };
    return AsyncRule;
}(nested_option_1.default));
exports.AsyncRule = AsyncRule;
var CompareRule = /** @class */ (function (_super) {
    __extends(CompareRule, _super);
    function CompareRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CompareRule.OptionName = "validationRules";
    CompareRule.IsCollectionItem = true;
    CompareRule.PredefinedProps = {
        type: "compare"
    };
    return CompareRule;
}(nested_option_1.default));
exports.CompareRule = CompareRule;
var CustomRule = /** @class */ (function (_super) {
    __extends(CustomRule, _super);
    function CustomRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomRule.OptionName = "validationRules";
    CustomRule.IsCollectionItem = true;
    CustomRule.PredefinedProps = {
        type: "custom"
    };
    return CustomRule;
}(nested_option_1.default));
exports.CustomRule = CustomRule;
var EmailRule = /** @class */ (function (_super) {
    __extends(EmailRule, _super);
    function EmailRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailRule.OptionName = "validationRules";
    EmailRule.IsCollectionItem = true;
    EmailRule.PredefinedProps = {
        type: "email"
    };
    return EmailRule;
}(nested_option_1.default));
exports.EmailRule = EmailRule;
var NumericRule = /** @class */ (function (_super) {
    __extends(NumericRule, _super);
    function NumericRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumericRule.OptionName = "validationRules";
    NumericRule.IsCollectionItem = true;
    NumericRule.PredefinedProps = {
        type: "numeric"
    };
    return NumericRule;
}(nested_option_1.default));
exports.NumericRule = NumericRule;
var PatternRule = /** @class */ (function (_super) {
    __extends(PatternRule, _super);
    function PatternRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PatternRule.OptionName = "validationRules";
    PatternRule.IsCollectionItem = true;
    PatternRule.PredefinedProps = {
        type: "pattern"
    };
    return PatternRule;
}(nested_option_1.default));
exports.PatternRule = PatternRule;
var RangeRule = /** @class */ (function (_super) {
    __extends(RangeRule, _super);
    function RangeRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeRule.OptionName = "validationRules";
    RangeRule.IsCollectionItem = true;
    RangeRule.PredefinedProps = {
        type: "range"
    };
    return RangeRule;
}(nested_option_1.default));
exports.RangeRule = RangeRule;
var RequiredRule = /** @class */ (function (_super) {
    __extends(RequiredRule, _super);
    function RequiredRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RequiredRule.OptionName = "validationRules";
    RequiredRule.IsCollectionItem = true;
    RequiredRule.PredefinedProps = {
        type: "required"
    };
    return RequiredRule;
}(nested_option_1.default));
exports.RequiredRule = RequiredRule;
var StringLengthRule = /** @class */ (function (_super) {
    __extends(StringLengthRule, _super);
    function StringLengthRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringLengthRule.OptionName = "validationRules";
    StringLengthRule.IsCollectionItem = true;
    StringLengthRule.PredefinedProps = {
        type: "stringLength"
    };
    return StringLengthRule;
}(nested_option_1.default));
exports.StringLengthRule = StringLengthRule;
var ValidationRule = /** @class */ (function (_super) {
    __extends(ValidationRule, _super);
    function ValidationRule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValidationRule.OptionName = "validationRules";
    ValidationRule.IsCollectionItem = true;
    ValidationRule.PredefinedProps = {
        type: "required"
    };
    return ValidationRule;
}(nested_option_1.default));
exports.ValidationRule = ValidationRule;
exports.default = Validator;
