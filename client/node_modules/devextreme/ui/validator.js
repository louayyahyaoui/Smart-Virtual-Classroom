/**
 * DevExtreme (ui/validator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _element_data = require("../core/element_data");
var _callbacks = _interopRequireDefault(require("../core/utils/callbacks"));
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
var _dom_component = _interopRequireDefault(require("../core/dom_component"));
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _validation_engine = _interopRequireDefault(require("./validation_engine"));
var _default_adapter = _interopRequireDefault(require("./validation/default_adapter"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _deferred = require("../core/utils/deferred");
var _guid = _interopRequireDefault(require("../core/guid"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var VALIDATOR_CLASS = "dx-validator";
var VALIDATION_STATUS_VALID = "valid";
var VALIDATION_STATUS_INVALID = "invalid";
var VALIDATION_STATUS_PENDING = "pending";
var Validator = _dom_component.default.inherit({
    _initOptions: function(options) {
        this.callBase.apply(this, arguments);
        this.option(_validation_engine.default.initValidationOptions(options))
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            validationRules: []
        })
    },
    _init: function() {
        this.callBase();
        this._initGroupRegistration();
        this.focused = (0, _callbacks.default)();
        this._initAdapter();
        this._validationInfo = {
            result: null,
            deferred: null,
            skipValidation: false
        }
    },
    _initGroupRegistration: function() {
        var group = this._findGroup();
        if (!this._groupWasInit) {
            this.on("disposing", function(args) {
                _validation_engine.default.removeRegisteredValidator(args.component._validationGroup, args.component)
            })
        }
        if (!this._groupWasInit || this._validationGroup !== group) {
            _validation_engine.default.removeRegisteredValidator(this._validationGroup, this);
            this._groupWasInit = true;
            this._validationGroup = group;
            _validation_engine.default.registerValidatorInGroup(group, this)
        }
    },
    _setOptionsByReference: function() {
        this.callBase();
        (0, _extend.extend)(this._optionsByReference, {
            validationGroup: true
        })
    },
    _initAdapter: function() {
        var _this = this;
        var element = this.$element()[0];
        var dxStandardEditor = (0, _element_data.data)(element, "dx-validation-target");
        var adapter = this.option("adapter");
        if (!adapter) {
            if (dxStandardEditor) {
                adapter = new _default_adapter.default(dxStandardEditor, this);
                adapter.validationRequestsCallbacks.push(function(args) {
                    if (_this._validationInfo.skipValidation) {
                        return
                    }
                    _this.validate(args)
                });
                this.option("adapter", adapter);
                return
            }
            throw _ui.default.Error("E0120")
        }
        var callbacks = adapter.validationRequestsCallbacks;
        if (callbacks) {
            callbacks.push(function(args) {
                _this.validate(args)
            })
        }
    },
    _toggleRTLDirection: function(isRtl) {
        var _this$option$editor$o, _this$option, _this$option$editor;
        var rtlEnabled = null !== (_this$option$editor$o = null === (_this$option = this.option("adapter")) || void 0 === _this$option ? void 0 : null === (_this$option$editor = _this$option.editor) || void 0 === _this$option$editor ? void 0 : _this$option$editor.option("rtlEnabled")) && void 0 !== _this$option$editor$o ? _this$option$editor$o : isRtl;
        this.callBase(rtlEnabled)
    },
    _initMarkup: function() {
        this.$element().addClass(VALIDATOR_CLASS);
        this.callBase()
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this._initGroupRegistration()
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "validationGroup":
                this._initGroupRegistration();
                return;
            case "validationRules":
                this._resetValidationRules();
                void 0 !== this.option("isValid") && this.validate();
                return;
            case "adapter":
                this._initAdapter();
                break;
            case "isValid":
            case "validationStatus":
                this.option(_validation_engine.default.synchronizeValidationOptions(args, this.option()));
                break;
            default:
                this.callBase(args)
        }
    },
    _getValidationRules: function() {
        var _this2 = this;
        if (!this._validationRules) {
            this._validationRules = (0, _iterator.map)(this.option("validationRules"), function(rule, index) {
                return (0, _extend.extend)({}, rule, {
                    validator: _this2,
                    index: index
                })
            })
        }
        return this._validationRules
    },
    _findGroup: function() {
        var $element = this.$element();
        return this.option("validationGroup") || _validation_engine.default.findGroup($element, this._modelByElement($element))
    },
    _resetValidationRules: function() {
        delete this._validationRules
    },
    validate: function(args) {
        var _this3 = this;
        var adapter = this.option("adapter");
        var name = this.option("name");
        var bypass = adapter.bypass && adapter.bypass();
        var value = args && void 0 !== args.value ? args.value : adapter.getValue();
        var currentError = adapter.getCurrentValidationError && adapter.getCurrentValidationError();
        var rules = this._getValidationRules();
        var currentResult = this._validationInfo && this._validationInfo.result;
        if (currentResult && currentResult.status === VALIDATION_STATUS_PENDING && currentResult.value === value) {
            return (0, _extend.extend)({}, currentResult)
        }
        var result;
        if (bypass) {
            result = {
                isValid: true,
                status: VALIDATION_STATUS_VALID
            }
        } else {
            if (currentError && currentError.editorSpecific) {
                currentError.validator = this;
                result = {
                    isValid: false,
                    status: VALIDATION_STATUS_INVALID,
                    brokenRule: currentError,
                    brokenRules: [currentError]
                }
            } else {
                result = _validation_engine.default.validate(value, rules, name)
            }
        }
        result.id = (new _guid.default).toString();
        this._applyValidationResult(result, adapter);
        result.complete && result.complete.then(function(res) {
            if (res.id === _this3._validationInfo.result.id) {
                _this3._applyValidationResult(res, adapter)
            }
        });
        return (0, _extend.extend)({}, this._validationInfo.result)
    },
    reset: function() {
        var adapter = this.option("adapter");
        var result = {
            id: null,
            isValid: true,
            brokenRule: null,
            brokenRules: null,
            pendingRules: null,
            status: VALIDATION_STATUS_VALID,
            complete: null
        };
        this._validationInfo.skipValidation = true;
        adapter.reset();
        this._validationInfo.skipValidation = false;
        this._resetValidationRules();
        this._applyValidationResult(result, adapter)
    },
    _updateValidationResult: function(result) {
        if (!this._validationInfo.result || this._validationInfo.result.id !== result.id) {
            var complete = this._validationInfo.deferred && this._validationInfo.result.complete;
            this._validationInfo.result = (0, _extend.extend)({}, result, {
                complete: complete
            })
        } else {
            for (var prop in result) {
                if ("id" !== prop && "complete" !== prop) {
                    this._validationInfo.result[prop] = result[prop]
                }
            }
        }
    },
    _applyValidationResult: function(result, adapter) {
        var validatedAction = this._createActionByOption("onValidated", {
            excludeValidators: ["readOnly"]
        });
        result.validator = this;
        this._updateValidationResult(result);
        adapter.applyValidationResults && adapter.applyValidationResults(this._validationInfo.result);
        this.option({
            validationStatus: this._validationInfo.result.status
        });
        if (this._validationInfo.result.status === VALIDATION_STATUS_PENDING) {
            if (!this._validationInfo.deferred) {
                this._validationInfo.deferred = new _deferred.Deferred;
                this._validationInfo.result.complete = this._validationInfo.deferred.promise()
            }
            this._eventsStrategy.fireEvent("validating", [this._validationInfo.result]);
            return
        }
        if (this._validationInfo.result.status !== VALIDATION_STATUS_PENDING) {
            validatedAction(result);
            if (this._validationInfo.deferred) {
                this._validationInfo.deferred.resolve(result);
                this._validationInfo.deferred = null
            }
        }
    },
    focus: function() {
        var adapter = this.option("adapter");
        adapter && adapter.focus && adapter.focus()
    },
    _useTemplates: function() {
        return false
    }
});
(0, _component_registrator.default)("dxValidator", Validator);
var _default = Validator;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
