/**
 * DevExtreme (ui/form/ui.form.item_options_actions.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiForm = _interopRequireDefault(require("./ui.form.item_option_action"));
var _element_data = require("../../core/element_data");
var _extend = require("../../core/utils/extend");
var _uiForm2 = require("./ui.form.utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var WidgetOptionItemOptionAction = function(_ItemOptionAction) {
    _inheritsLoose(WidgetOptionItemOptionAction, _ItemOptionAction);

    function WidgetOptionItemOptionAction() {
        return _ItemOptionAction.apply(this, arguments) || this
    }
    var _proto = WidgetOptionItemOptionAction.prototype;
    _proto.tryExecute = function() {
        var value = this._options.value;
        var instance = this.findInstance();
        if (instance) {
            instance.option(value);
            return true
        }
        return false
    };
    return WidgetOptionItemOptionAction
}(_uiForm.default);
var TabOptionItemOptionAction = function(_ItemOptionAction2) {
    _inheritsLoose(TabOptionItemOptionAction, _ItemOptionAction2);

    function TabOptionItemOptionAction() {
        return _ItemOptionAction2.apply(this, arguments) || this
    }
    var _proto2 = TabOptionItemOptionAction.prototype;
    _proto2.tryExecute = function() {
        var tabPanel = this.findInstance();
        if (tabPanel) {
            var _this$_options = this._options,
                optionName = _this$_options.optionName,
                item = _this$_options.item,
                value = _this$_options.value;
            var itemIndex = this._itemsRunTimeInfo.findItemIndexByItem(item);
            if (itemIndex >= 0) {
                tabPanel.option((0, _uiForm2.getFullOptionName)("items[".concat(itemIndex, "]"), optionName), value);
                return true
            }
        }
        return false
    };
    return TabOptionItemOptionAction
}(_uiForm.default);
var TabsOptionItemOptionAction = function(_ItemOptionAction3) {
    _inheritsLoose(TabsOptionItemOptionAction, _ItemOptionAction3);

    function TabsOptionItemOptionAction() {
        return _ItemOptionAction3.apply(this, arguments) || this
    }
    var _proto3 = TabsOptionItemOptionAction.prototype;
    _proto3.tryExecute = function() {
        var tabPanel = this.findInstance();
        if (tabPanel) {
            var value = this._options.value;
            tabPanel.option("dataSource", value);
            return true
        }
        return false
    };
    return TabsOptionItemOptionAction
}(_uiForm.default);
var ValidationRulesItemOptionAction = function(_ItemOptionAction4) {
    _inheritsLoose(ValidationRulesItemOptionAction, _ItemOptionAction4);

    function ValidationRulesItemOptionAction() {
        return _ItemOptionAction4.apply(this, arguments) || this
    }
    var _proto4 = ValidationRulesItemOptionAction.prototype;
    _proto4.tryExecute = function() {
        var item = this._options.item;
        var instance = this.findInstance();
        var validator = instance && (0, _element_data.data)(instance.$element()[0], "dxValidator");
        if (validator && item) {
            var filterRequired = function(item) {
                return "required" === item.type
            };
            var oldContainsRequired = (validator.option("validationRules") || []).some(filterRequired);
            var newContainsRequired = (item.validationRules || []).some(filterRequired);
            if (!oldContainsRequired && !newContainsRequired || oldContainsRequired && newContainsRequired) {
                validator.option("validationRules", item.validationRules);
                return true
            }
        }
        return false
    };
    return ValidationRulesItemOptionAction
}(_uiForm.default);
var CssClassItemOptionAction = function(_ItemOptionAction5) {
    _inheritsLoose(CssClassItemOptionAction, _ItemOptionAction5);

    function CssClassItemOptionAction() {
        return _ItemOptionAction5.apply(this, arguments) || this
    }
    var _proto5 = CssClassItemOptionAction.prototype;
    _proto5.tryExecute = function() {
        var $itemContainer = this.findItemContainer();
        var _this$_options2 = this._options,
            previousValue = _this$_options2.previousValue,
            value = _this$_options2.value;
        if ($itemContainer) {
            $itemContainer.removeClass(previousValue).addClass(value);
            return true
        }
        return false
    };
    return CssClassItemOptionAction
}(_uiForm.default);
var tryCreateItemOptionAction = function(optionName, itemActionOptions) {
    switch (optionName) {
        case "editorOptions":
        case "buttonOptions":
            return new WidgetOptionItemOptionAction(itemActionOptions);
        case "validationRules":
            return new ValidationRulesItemOptionAction(itemActionOptions);
        case "cssClass":
            return new CssClassItemOptionAction(itemActionOptions);
        case "badge":
        case "disabled":
        case "icon":
        case "template":
        case "tabTemplate":
        case "title":
            return new TabOptionItemOptionAction((0, _extend.extend)(itemActionOptions, {
                optionName: optionName
            }));
        case "tabs":
            return new TabsOptionItemOptionAction(itemActionOptions);
        default:
            return null
    }
};
var _default = tryCreateItemOptionAction;
exports.default = _default;
module.exports = exports.default;
