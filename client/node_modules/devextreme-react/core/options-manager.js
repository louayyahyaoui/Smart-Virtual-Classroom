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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionsManager = void 0;
var comparer_1 = require("./configuration/comparer");
var tree_1 = require("./configuration/tree");
var utils_1 = require("./configuration/utils");
var helpers_1 = require("./helpers");
var OptionsManager = /** @class */ (function () {
    function OptionsManager(templatesManager) {
        this.guards = {};
        this.isUpdating = false;
        this.templatesManager = templatesManager;
        this.onOptionChanged = this.onOptionChanged.bind(this);
        this.wrapOptionValue = this.wrapOptionValue.bind(this);
    }
    OptionsManager.prototype.setInstance = function (instance, config, subscribableOptions, independentEvents) {
        this.instance = instance;
        this.currentConfig = config;
        this.subscribableOptions = new Set(subscribableOptions);
        this.independentEvents = new Set(independentEvents);
    };
    OptionsManager.prototype.getInitialOptions = function (rootNode) {
        var _this = this;
        var config = tree_1.buildConfig(rootNode, false);
        Object.keys(config.templates).forEach(function (key) {
            _this.templatesManager.add(key, config.templates[key]);
        });
        var options = {};
        Object.keys(config.options).forEach(function (key) {
            options[key] = _this.wrapOptionValue(key, config.options[key]);
        });
        if (this.templatesManager.templatesCount > 0) {
            options.integrationOptions = {
                templates: this.templatesManager.templates,
            };
        }
        return options;
    };
    OptionsManager.prototype.update = function (config) {
        var _this = this;
        var changes = comparer_1.getChanges(config, this.currentConfig);
        if (!changes.options && !changes.templates && !changes.removedOptions.length) {
            return;
        }
        this.instance.beginUpdate();
        this.isUpdating = true;
        changes.removedOptions.forEach(function (optionName) {
            _this.resetOption(optionName);
        });
        Object.keys(changes.templates).forEach(function (key) {
            _this.templatesManager.add(key, changes.templates[key]);
        });
        if (this.templatesManager.templatesCount > 0) {
            this.setValue('integrationOptions', {
                templates: this.templatesManager.templates,
            });
        }
        Object.keys(changes.options).forEach(function (key) {
            _this.setValue(key, changes.options[key]);
        });
        this.isUpdating = false;
        this.instance.endUpdate();
        this.currentConfig = config;
    };
    OptionsManager.prototype.onOptionChanged = function (e) {
        var _this = this;
        if (this.isUpdating) {
            return;
        }
        var valueDescriptor = tree_1.findValue(this.currentConfig, e.fullName.split('.'));
        if (!valueDescriptor || valueDescriptor.value !== e.value) {
            this.callOptionChangeHandler(e.fullName, e.value);
        }
        valueDescriptor = tree_1.findValue(this.currentConfig, e.fullName.split('.'));
        if (!valueDescriptor) {
            return;
        }
        var value = valueDescriptor.value, type = valueDescriptor.type;
        if (type === tree_1.ValueType.Complex) {
            Object.keys(value).forEach(function (key) {
                if (value[key] === e.value[key]) {
                    return;
                }
                _this.setGuard(utils_1.mergeNameParts(e.fullName, key), value[key]);
            });
        }
        else {
            if (value === e.value) {
                return;
            }
            this.setGuard(e.fullName, value);
        }
    };
    OptionsManager.prototype.dispose = function () {
        var _this = this;
        Object.keys(this.guards).forEach(function (optionName) {
            window.clearTimeout(_this.guards[optionName]);
            delete _this.guards[optionName];
        });
    };
    OptionsManager.prototype.isOptionSubscribable = function (optionName) {
        return this.subscribableOptions.has(optionName);
    };
    OptionsManager.prototype.isIndependentEvent = function (optionName) {
        return this.independentEvents.has(optionName);
    };
    OptionsManager.prototype.callOptionChangeHandler = function (optionName, optionValue) {
        if (!this.isOptionSubscribable(optionName)) {
            return;
        }
        var parts = optionName.split('.');
        var propName = parts[parts.length - 1];
        if (propName.startsWith('on')) {
            return;
        }
        var eventName = "on" + helpers_1.capitalizeFirstLetter(propName) + "Change";
        parts[parts.length - 1] = eventName;
        var changeEvent = tree_1.findValue(this.currentConfig, parts);
        if (!changeEvent) {
            return;
        }
        if (typeof changeEvent.value !== 'function') {
            throw new Error("Invalid value for the " + eventName + " property.\n                " + eventName + " must be a function.");
        }
        changeEvent.value(optionValue);
    };
    OptionsManager.prototype.wrapOptionValue = function (name, value) {
        var _this = this;
        if (name.substr(0, 2) === 'on' && typeof value === 'function') {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (!_this.isUpdating || _this.isIndependentEvent(name)) {
                    value.apply(void 0, args);
                }
            };
        }
        return value;
    };
    OptionsManager.prototype.setGuard = function (optionName, optionValue) {
        var _this = this;
        if (this.guards[optionName] !== undefined) {
            return;
        }
        var guardId = window.setTimeout(function () {
            _this.setValue(optionName, optionValue);
            window.clearTimeout(guardId);
            delete _this.guards[optionName];
        });
        this.guards[optionName] = guardId;
    };
    OptionsManager.prototype.resetOption = function (name) {
        this.instance.resetOption(name);
    };
    OptionsManager.prototype.setValue = function (name, value) {
        if (this.guards[name]) {
            window.clearTimeout(this.guards[name]);
            delete this.guards[name];
        }
        this.instance.option(name, this.wrapOptionValue(name, value));
    };
    return OptionsManager;
}());
exports.OptionsManager = OptionsManager;
