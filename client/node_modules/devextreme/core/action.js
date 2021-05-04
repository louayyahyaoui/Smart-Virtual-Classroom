/**
 * DevExtreme (core/action.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("./renderer"));
var _window = require("./utils/window");
var _type = require("./utils/type");
var _iterator = require("./utils/iterator");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var Action = function() {
    function Action(action, config) {
        config = config || {};
        this._action = action;
        this._context = config.context || (0, _window.getWindow)();
        this._beforeExecute = config.beforeExecute;
        this._afterExecute = config.afterExecute;
        this._component = config.component;
        this._validatingTargetName = config.validatingTargetName;
        var excludeValidators = this._excludeValidators = {};
        if (config.excludeValidators) {
            for (var i = 0; i < config.excludeValidators.length; i++) {
                excludeValidators[config.excludeValidators[i]] = true
            }
        }
    }
    var _proto = Action.prototype;
    _proto.execute = function() {
        var e = {
            action: this._action,
            args: Array.prototype.slice.call(arguments),
            context: this._context,
            component: this._component,
            validatingTargetName: this._validatingTargetName,
            cancel: false,
            handled: false
        };
        var beforeExecute = this._beforeExecute;
        var afterExecute = this._afterExecute;
        var argsBag = e.args[0] || {};
        if (!this._validateAction(e)) {
            return
        }
        null === beforeExecute || void 0 === beforeExecute ? void 0 : beforeExecute.call(this._context, e);
        if (e.cancel) {
            return
        }
        var result = this._executeAction(e);
        if (argsBag.cancel) {
            return
        }
        null === afterExecute || void 0 === afterExecute ? void 0 : afterExecute.call(this._context, e);
        return result
    };
    _proto._validateAction = function(e) {
        var excludeValidators = this._excludeValidators;
        var executors = Action.executors;
        for (var name in executors) {
            if (!excludeValidators[name]) {
                var _executor$validate;
                var executor = executors[name];
                null === (_executor$validate = executor.validate) || void 0 === _executor$validate ? void 0 : _executor$validate.call(executor, e);
                if (e.cancel) {
                    return false
                }
            }
        }
        return true
    };
    _proto._executeAction = function(e) {
        var result;
        var executors = Action.executors;
        for (var name in executors) {
            var _executor$execute;
            var executor = executors[name];
            null === (_executor$execute = executor.execute) || void 0 === _executor$execute ? void 0 : _executor$execute.call(executor, e);
            if (e.handled) {
                result = e.result;
                break
            }
        }
        return result
    };
    Action.registerExecutor = function(name, executor) {
        if ((0, _type.isPlainObject)(name)) {
            (0, _iterator.each)(name, Action.registerExecutor);
            return
        }
        Action.executors[name] = executor
    };
    Action.unregisterExecutor = function() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }(0, _iterator.each)(args, function() {
            delete Action.executors[this]
        })
    };
    return Action
}();
exports.default = Action;
Action.executors = {};
var createValidatorByTargetElement = function(condition) {
    return function(e) {
        if (!e.args.length) {
            return
        }
        var args = e.args[0];
        var element = args[e.validatingTargetName] || args.element;
        if (element && condition((0, _renderer.default)(element))) {
            e.cancel = true
        }
    }
};
Action.registerExecutor({
    disabled: {
        validate: createValidatorByTargetElement(function($target) {
            return $target.is(".dx-state-disabled, .dx-state-disabled *")
        })
    },
    readOnly: {
        validate: createValidatorByTargetElement(function($target) {
            return $target.is(".dx-state-readonly, .dx-state-readonly *:not(.dx-state-independent)")
        })
    },
    undefined: {
        execute: function(e) {
            if (!e.action) {
                e.result = void 0;
                e.handled = true
            }
        }
    },
    func: {
        execute: function(e) {
            if ((0, _type.isFunction)(e.action)) {
                e.result = e.action.call(e.context, e.args[0]);
                e.handled = true
            }
        }
    }
});
module.exports = exports.default;
