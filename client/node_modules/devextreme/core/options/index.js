/**
 * DevExtreme (core/options/index.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Options = void 0;
var _type = require("../utils/type");
var _common = require("../utils/common");
var _option_manager = require("./option_manager");
var _object = require("../utils/object");
var _utils = require("./utils");
var _extend = require("../utils/extend");

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}
var Options = function() {
    function Options(options, defaultOptions, optionsByReference, deprecatedOptions) {
        var _this = this;
        this._deprecatedCallback;
        this._startChangeCallback;
        this._endChangeCallback;
        this._default = defaultOptions;
        this._deprecated = deprecatedOptions;
        this._deprecatedNames = [];
        this._initDeprecatedNames();
        this._optionManager = new _option_manager.OptionManager(options, optionsByReference);
        this._optionManager.onRelevantNamesPrepared(function(options, name, value, silent) {
            return _this._setRelevantNames(options, name, value, silent)
        });
        this._cachedOptions = {};
        this._rules = []
    }
    var _proto = Options.prototype;
    _proto._initDeprecatedNames = function() {
        for (var optionName in this._deprecated) {
            this._deprecatedNames.push(optionName)
        }
    };
    _proto._getByRules = function(rules) {
        rules = Array.isArray(rules) ? this._rules.concat(rules) : this._rules;
        return (0, _utils.convertRulesToOptions)(rules)
    };
    _proto._notifyDeprecated = function(option) {
        var info = this._deprecated[option];
        if (info) {
            this._deprecatedCallback(option, info)
        }
    };
    _proto._setRelevantNames = function(options, name, value, silent) {
        if (name) {
            var normalizedName = this._normalizeName(name, silent);
            if (normalizedName && normalizedName !== name) {
                this._setField(options, normalizedName, value);
                this._clearField(options, name)
            }
        }
    };
    _proto._setField = function(options, fullName, value) {
        var fieldName = "";
        var fieldObject = null;
        do {
            fieldName = fieldName ? ".".concat(fieldName) : "";
            fieldName = (0, _utils.getFieldName)(fullName) + fieldName;
            fullName = (0, _utils.getParentName)(fullName);
            fieldObject = fullName ? this._optionManager.get(options, fullName, false) : options
        } while (!fieldObject);
        fieldObject[fieldName] = value
    };
    _proto._clearField = function(options, name) {
        delete options[name];
        var previousFieldName = (0, _utils.getParentName)(name);
        var fieldObject = previousFieldName ? this._optionManager.get(options, previousFieldName, false) : options;
        if (fieldObject) {
            delete fieldObject[(0, _utils.getFieldName)(name)]
        }
    };
    _proto._normalizeName = function(name, silent) {
        if (this._deprecatedNames.length && name) {
            for (var i = 0; i < this._deprecatedNames.length; i++) {
                if (this._deprecatedNames[i] === name) {
                    var deprecate = this._deprecated[name];
                    if (deprecate) {
                        !silent && this._notifyDeprecated(name);
                        return deprecate.alias || name
                    }
                }
            }
        }
        return name
    };
    _proto.addRules = function(rules) {
        this._rules = rules.concat(this._rules)
    };
    _proto.applyRules = function(rules) {
        var options = this._getByRules(rules);
        this.silent(options)
    };
    _proto.dispose = function() {
        this._deprecatedCallback = _common.noop;
        this._startChangeCallback = _common.noop;
        this._endChangeCallback = _common.noop;
        this._optionManager.dispose()
    };
    _proto.onChanging = function(callBack) {
        this._optionManager.onChanging(callBack)
    };
    _proto.onChanged = function(callBack) {
        this._optionManager.onChanged(callBack)
    };
    _proto.onDeprecated = function(callBack) {
        this._deprecatedCallback = callBack
    };
    _proto.onStartChange = function(callBack) {
        this._startChangeCallback = callBack
    };
    _proto.onEndChange = function(callBack) {
        this._endChangeCallback = callBack
    };
    _proto.isInitial = function(name) {
        var value = this.silent(name);
        var initialValue = this.initial(name);
        var areFunctions = (0, _type.isFunction)(value) && (0, _type.isFunction)(initialValue);
        return areFunctions ? value.toString() === initialValue.toString() : (0, _common.equalByValue)(value, initialValue)
    };
    _proto.initial = function(name) {
        return (0, _utils.getNestedOptionValue)(this._initial, name)
    };
    _proto.option = function(options, value) {
        var isGetter = arguments.length < 2 && "object" !== (0, _type.type)(options);
        if (isGetter) {
            return this._optionManager.get(void 0, this._normalizeName(options))
        } else {
            this._startChangeCallback();
            try {
                this._optionManager.set(options, value)
            } finally {
                this._endChangeCallback()
            }
        }
    };
    _proto.silent = function(options, value) {
        var isGetter = arguments.length < 2 && "object" !== (0, _type.type)(options);
        if (isGetter) {
            return this._optionManager.get(void 0, options, void 0, true)
        } else {
            this._optionManager.set(options, value, void 0, true)
        }
    };
    _proto.reset = function(name) {
        var _this2 = this;
        if (name) {
            var fullPath = name.replace(/\[([^\]])\]/g, ".$1").split(".");
            var value = fullPath.reduce(function(value, field) {
                return value ? value[field] : _this2.initial(field)
            }, null);
            var defaultValue = (0, _type.isObject)(value) ? (0, _object.clone)(value) : value;
            this._optionManager.set(name, defaultValue, false)
        }
    };
    _proto.getAliasesByName = function(name) {
        var _this3 = this;
        return Object.keys(this._deprecated).filter(function(aliasName) {
            return name === _this3._deprecated[aliasName].alias
        })
    };
    _proto.isDeprecated = function(name) {
        return Object.prototype.hasOwnProperty.call(this._deprecated, name)
    };
    _proto.cache = function(name, options) {
        var isGetter = arguments.length < 2;
        if (isGetter) {
            return this._cachedOptions[name]
        } else {
            this._cachedOptions[name] = (0, _extend.extend)(this._cachedOptions[name], options)
        }
    };
    _createClass(Options, [{
        key: "_initial",
        get: function() {
            if (!this._initialOptions) {
                var rulesOptions = this._getByRules(this.silent("defaultOptionsRules"));
                this._initialOptions = this._default;
                this._optionManager._setByReference(this._initialOptions, rulesOptions)
            }
            return this._initialOptions
        },
        set: function(value) {
            this._initialOptions = value
        }
    }]);
    return Options
}();
exports.Options = Options;
