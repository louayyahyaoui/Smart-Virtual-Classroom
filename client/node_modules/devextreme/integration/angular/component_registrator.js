/**
 * DevExtreme (integration/angular/component_registrator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _angular = _interopRequireDefault(require("angular"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _config = _interopRequireDefault(require("../../core/config"));
var _component_registrator_callbacks = _interopRequireDefault(require("../../core/component_registrator_callbacks"));
var _class = _interopRequireDefault(require("../../core/class"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _array = require("../../core/utils/array");
var _locker = _interopRequireDefault(require("../../core/utils/locker"));
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _template = require("./template");
var _module = _interopRequireDefault(require("./module"));
var _uiCollection_widget = _interopRequireDefault(require("../../ui/collection/ui.collection_widget.edit"));
var _data = require("../../core/utils/data");
var _extend = require("../../core/utils/extend");
var _comparator = require("../../core/utils/comparator");
var _inflector = require("../../core/utils/inflector");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var ITEM_ALIAS_ATTRIBUTE_NAME = "dxItemAlias";
var SKIP_APPLY_ACTION_CATEGORIES = ["rendering"];
var NG_MODEL_OPTION = "value";
if (_angular.default) {
    var safeApply = function(func, scope) {
        if (scope.$root.$$phase) {
            return func(scope)
        } else {
            return scope.$apply(function() {
                return func(scope)
            })
        }
    };
    var getClassMethod = function getClassMethod(initClass, methodName) {
        var hasParentProperty = Object.prototype.hasOwnProperty.bind(initClass)("parent");
        var isES6Class = !hasParentProperty && initClass.parent;
        if (isES6Class) {
            var baseClass = Object.getPrototypeOf(initClass);
            return baseClass.prototype[methodName] ? function() {
                return baseClass.prototype[methodName]()
            } : getClassMethod(baseClass, methodName)
        } else {
            var method = initClass.parent.prototype[methodName];
            if (method) {
                return function() {
                    return method()
                }
            }
            if (!method || !initClass.parent.subclassOf) {
                return function() {
                    return
                }
            }
            return getClassMethod(initClass.parent, methodName)
        }
    };
    var ComponentBuilder = _class.default.inherit({
        ctor: function(options) {
            this._componentDisposing = (0, _callbacks.default)();
            this._optionChangedCallbacks = (0, _callbacks.default)();
            this._ngLocker = new _locker.default;
            this._scope = options.scope;
            this._$element = options.$element;
            this._$templates = options.$templates;
            this._componentClass = options.componentClass;
            this._parse = options.parse;
            this._compile = options.compile;
            this._itemAlias = options.itemAlias;
            this._transcludeFn = options.transcludeFn;
            this._digestCallbacks = options.dxDigestCallbacks;
            this._normalizeOptions(options.ngOptions);
            this._initComponentBindings();
            this._initComponent(this._scope);
            if (!options.ngOptions) {
                this._addOptionsStringWatcher(options.ngOptionsString)
            }
        },
        _addOptionsStringWatcher: function(optionsString) {
            var _this = this;
            var clearOptionsStringWatcher = this._scope.$watch(optionsString, function(newOptions) {
                if (!newOptions) {
                    return
                }
                clearOptionsStringWatcher();
                _this._normalizeOptions(newOptions);
                _this._initComponentBindings();
                _this._component.option(_this._evalOptions(_this._scope))
            });
            this._componentDisposing.add(clearOptionsStringWatcher)
        },
        _normalizeOptions: function(options) {
            var _this2 = this;
            this._ngOptions = (0, _extend.extendFromObject)({}, options);
            if (!options) {
                return
            }
            if (!Object.prototype.hasOwnProperty.call(options, "bindingOptions") && options.bindingOptions) {
                this._ngOptions.bindingOptions = options.bindingOptions
            }
            if (options.bindingOptions) {
                (0, _iterator.each)(options.bindingOptions, function(key, value) {
                    if ("string" === (0, _type.type)(value)) {
                        _this2._ngOptions.bindingOptions[key] = {
                            dataPath: value
                        }
                    }
                })
            }
        },
        _initComponent: function(scope) {
            this._component = new this._componentClass(this._$element, this._evalOptions(scope));
            this._component._isHidden = true;
            this._handleDigestPhase()
        },
        _handleDigestPhase: function() {
            var _this3 = this;
            var beginUpdate = function() {
                _this3._component.beginUpdate()
            };
            var endUpdate = function() {
                _this3._component.endUpdate()
            };
            this._digestCallbacks.begin.add(beginUpdate);
            this._digestCallbacks.end.add(endUpdate);
            this._componentDisposing.add(function() {
                _this3._digestCallbacks.begin.remove(beginUpdate);
                _this3._digestCallbacks.end.remove(endUpdate)
            })
        },
        _initComponentBindings: function() {
            var _this4 = this;
            var optionDependencies = {};
            if (!this._ngOptions.bindingOptions) {
                return
            }(0, _iterator.each)(this._ngOptions.bindingOptions, function(optionPath, value) {
                var separatorIndex = optionPath.search(/\[|\./);
                var optionForSubscribe = separatorIndex > -1 ? optionPath.substring(0, separatorIndex) : optionPath;
                var prevWatchMethod;
                var clearWatcher;
                var valuePath = value.dataPath;
                var deepWatch = true;
                var forcePlainWatchMethod = false;
                if (void 0 !== value.deep) {
                    forcePlainWatchMethod = deepWatch = !!value.deep
                }
                if (!optionDependencies[optionForSubscribe]) {
                    optionDependencies[optionForSubscribe] = {}
                }
                optionDependencies[optionForSubscribe][optionPath] = valuePath;
                var updateWatcher = function updateWatcher() {
                    var watchCallback = function(newValue, oldValue) {
                        if (_this4._ngLocker.locked(optionPath)) {
                            return
                        }
                        _this4._ngLocker.obtain(optionPath);
                        _this4._component.option(optionPath, newValue);
                        updateWatcher();
                        if ((0, _comparator.equals)(oldValue, newValue) && _this4._ngLocker.locked(optionPath)) {
                            _this4._ngLocker.release(optionPath)
                        }
                    };
                    var watchMethod = Array.isArray(_this4._scope.$eval(valuePath)) && !forcePlainWatchMethod ? "$watchCollection" : "$watch";
                    if (prevWatchMethod !== watchMethod) {
                        if (clearWatcher) {
                            clearWatcher()
                        }
                        clearWatcher = _this4._scope[watchMethod](valuePath, watchCallback, deepWatch);
                        prevWatchMethod = watchMethod
                    }
                };
                updateWatcher();
                _this4._componentDisposing.add(clearWatcher)
            });
            this._optionChangedCallbacks.add(function(args) {
                var optionName = args.name;
                var fullName = args.fullName;
                var component = args.component;
                if (_this4._ngLocker.locked(fullName)) {
                    _this4._ngLocker.release(fullName);
                    return
                }
                if (!optionDependencies || !optionDependencies[optionName]) {
                    return
                }
                var isActivePhase = _this4._scope.$root.$$phase;
                var obtainOption = function() {
                    _this4._ngLocker.obtain(fullName)
                };
                if (isActivePhase) {
                    _this4._digestCallbacks.begin.add(obtainOption)
                } else {
                    obtainOption()
                }
                safeApply(function() {
                    (0, _iterator.each)(optionDependencies[optionName], function(optionPath, valuePath) {
                        if (!_this4._optionsAreLinked(fullName, optionPath)) {
                            return
                        }
                        var value = component.option(optionPath);
                        _this4._parse(valuePath).assign(_this4._scope, value);
                        var scopeValue = _this4._parse(valuePath)(_this4._scope);
                        if (scopeValue !== value) {
                            args.component.option(optionPath, scopeValue)
                        }
                    })
                }, _this4._scope);
                var releaseOption = function releaseOption() {
                    if (_this4._ngLocker.locked(fullName)) {
                        _this4._ngLocker.release(fullName)
                    }
                    _this4._digestCallbacks.begin.remove(obtainOption);
                    _this4._digestCallbacks.end.remove(releaseOption)
                };
                if (isActivePhase) {
                    _this4._digestCallbacks.end.addPrioritized(releaseOption)
                } else {
                    releaseOption()
                }
            })
        },
        _optionsAreNested: function(optionPath1, optionPath2) {
            var parentSeparator = optionPath1[optionPath2.length];
            return 0 === optionPath1.indexOf(optionPath2) && ("." === parentSeparator || "[" === parentSeparator)
        },
        _optionsAreLinked: function(optionPath1, optionPath2) {
            if (optionPath1 === optionPath2) {
                return true
            }
            return optionPath1.length > optionPath2.length ? this._optionsAreNested(optionPath1, optionPath2) : this._optionsAreNested(optionPath2, optionPath1)
        },
        _compilerByTemplate: function(template) {
            var _this5 = this;
            var scopeItemsPath = this._getScopeItemsPath();
            return function(options) {
                var $resultMarkup = (0, _renderer.default)(template).clone();
                var dataIsScope = options.model && options.model.constructor === _this5._scope.$root.constructor;
                var templateScope = dataIsScope ? options.model : options.noModel ? _this5._scope : _this5._createScopeWithData(options);
                if (scopeItemsPath) {
                    _this5._synchronizeScopes(templateScope, scopeItemsPath, options.index)
                }
                $resultMarkup.appendTo(options.container);
                if (!options.noModel) {
                    _events_engine.default.on($resultMarkup, "$destroy", function() {
                        var destroyAlreadyCalled = !templateScope.$parent;
                        if (destroyAlreadyCalled) {
                            return
                        }
                        templateScope.$destroy()
                    })
                }
                var ngTemplate = _this5._compile($resultMarkup, _this5._transcludeFn);
                _this5._applyAsync(function(scope) {
                    ngTemplate(scope, null, {
                        parentBoundTranscludeFn: _this5._transcludeFn
                    })
                }, templateScope);
                return $resultMarkup
            }
        },
        _applyAsync: function(func, scope) {
            var _this6 = this;
            func(scope);
            if (!scope.$root.$$phase) {
                if (!this._renderingTimer) {
                    var clearRenderingTimer = function() {
                        clearTimeout(_this6._renderingTimer)
                    };
                    this._renderingTimer = setTimeout(function() {
                        scope.$apply();
                        _this6._renderingTimer = null;
                        _this6._componentDisposing.remove(clearRenderingTimer)
                    });
                    this._componentDisposing.add(clearRenderingTimer)
                }
            }
        },
        _getScopeItemsPath: function() {
            if (this._componentClass.subclassOf(_uiCollection_widget.default) && this._ngOptions.bindingOptions && this._ngOptions.bindingOptions.items) {
                return this._ngOptions.bindingOptions.items.dataPath
            }
        },
        _createScopeWithData: function(options) {
            var newScope = this._scope.$new();
            if (this._itemAlias) {
                newScope[this._itemAlias] = options.model
            }
            if ((0, _type.isDefined)(options.index)) {
                newScope.$index = options.index
            }
            return newScope
        },
        _synchronizeScopes: function(itemScope, parentPrefix, itemIndex) {
            if (this._itemAlias && "object" !== _typeof(itemScope[this._itemAlias])) {
                this._synchronizeScopeField({
                    parentScope: this._scope,
                    childScope: itemScope,
                    fieldPath: this._itemAlias,
                    parentPrefix: parentPrefix,
                    itemIndex: itemIndex
                })
            }
        },
        _synchronizeScopeField: function(args) {
            var parentScope = args.parentScope;
            var childScope = args.childScope;
            var fieldPath = args.fieldPath;
            var parentPrefix = args.parentPrefix;
            var itemIndex = args.itemIndex;
            var innerPathSuffix = fieldPath === this._itemAlias ? "" : "." + fieldPath;
            var collectionField = void 0 !== itemIndex;
            var optionOuterBag = [parentPrefix];
            if (collectionField) {
                if (!(0, _type.isNumeric)(itemIndex)) {
                    return
                }
                optionOuterBag.push("[", itemIndex, "]")
            }
            optionOuterBag.push(innerPathSuffix);
            var optionOuterPath = optionOuterBag.join("");
            var clearParentWatcher = parentScope.$watch(optionOuterPath, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    (0, _data.compileSetter)(fieldPath)(childScope, newValue)
                }
            });
            var clearItemWatcher = childScope.$watch(fieldPath, function(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (collectionField && !(0, _data.compileGetter)(parentPrefix)(parentScope)[itemIndex]) {
                        clearItemWatcher();
                        return
                    }(0, _data.compileSetter)(optionOuterPath)(parentScope, newValue)
                }
            });
            this._componentDisposing.add([clearParentWatcher, clearItemWatcher])
        },
        _evalOptions: function(scope) {
            var _this8 = this;
            var result = (0, _extend.extendFromObject)({}, this._ngOptions);
            delete result.bindingOptions;
            if (this._ngOptions.bindingOptions) {
                (0, _iterator.each)(this._ngOptions.bindingOptions, function(key, value) {
                    result[key] = scope.$eval(value.dataPath)
                })
            }
            result._optionChangedCallbacks = this._optionChangedCallbacks;
            result._disposingCallbacks = this._componentDisposing;
            result.onActionCreated = function(component, action, config) {
                if (config && (0, _array.inArray)(config.category, SKIP_APPLY_ACTION_CATEGORIES) > -1) {
                    return action
                }
                var wrappedAction = function() {
                    var _this7 = this;
                    var args = arguments;
                    if (!scope || !scope.$root || scope.$root.$$phase) {
                        return action.apply(this, args)
                    }
                    return safeApply(function() {
                        return action.apply(_this7, args)
                    }, scope)
                };
                return wrappedAction
            };
            result.beforeActionExecute = result.onActionCreated;
            result.nestedComponentOptions = function(component) {
                return {
                    templatesRenderAsynchronously: component.option("templatesRenderAsynchronously"),
                    forceApplyBindings: component.option("forceApplyBindings"),
                    modelByElement: component.option("modelByElement"),
                    onActionCreated: component.option("onActionCreated"),
                    beforeActionExecute: component.option("beforeActionExecute"),
                    nestedComponentOptions: component.option("nestedComponentOptions")
                }
            };
            result.templatesRenderAsynchronously = true;
            if ((0, _config.default)().wrapActionsBeforeExecute) {
                result.forceApplyBindings = function() {
                    safeApply(function() {}, scope)
                }
            }
            result.integrationOptions = {
                createTemplate: function(element) {
                    return new _template.NgTemplate(element, _this8._compilerByTemplate.bind(_this8))
                },
                watchMethod: function(fn, callback, options) {
                    options = options || {};
                    var immediateValue;
                    var skipCallback = options.skipImmediate;
                    var disposeWatcher = scope.$watch(function() {
                        var value = fn();
                        if (value instanceof Date) {
                            value = value.valueOf()
                        }
                        return value
                    }, function(newValue) {
                        var isSameValue = immediateValue === newValue;
                        if (!skipCallback && (!isSameValue || isSameValue && options.deep)) {
                            callback(newValue)
                        }
                        skipCallback = false
                    }, options.deep);
                    if (!skipCallback) {
                        immediateValue = fn();
                        callback(immediateValue)
                    }
                    if ((0, _config.default)().wrapActionsBeforeExecute) {
                        _this8._applyAsync(function() {}, scope)
                    }
                    return disposeWatcher
                },
                templates: {
                    "dx-polymorph-widget": {
                        render: function(options) {
                            var widgetName = options.model.widget;
                            if (!widgetName) {
                                return
                            }
                            var markup = (0, _renderer.default)("<div>").attr((0, _inflector.dasherize)(widgetName), "options").get(0);
                            var newScope = _this8._scope.$new();
                            newScope.options = options.model.options;
                            options.container.append(markup);
                            _this8._compile(markup)(newScope)
                        }
                    }
                }
            };
            result.modelByElement = function() {
                return scope
            };
            return result
        }
    });
    ComponentBuilder = ComponentBuilder.inherit({
        ctor: function(options) {
            this._componentName = options.componentName;
            this._ngModel = options.ngModel;
            this._ngModelController = options.ngModelController;
            this.callBase.apply(this, arguments)
        },
        _isNgModelRequired: function() {
            return (this._componentClass.subclassOf(_editor.default) || this._componentClass.prototype instanceof _editor.default) && this._ngModel
        },
        _initComponentBindings: function() {
            this.callBase.apply(this, arguments);
            this._initNgModelBinding()
        },
        _initNgModelBinding: function() {
            var _this9 = this;
            if (!this._isNgModelRequired()) {
                return
            }
            var clearNgModelWatcher = this._scope.$watch(this._ngModel, function(newValue, oldValue) {
                if (_this9._ngLocker.locked(NG_MODEL_OPTION)) {
                    return
                }
                if (newValue === oldValue) {
                    return
                }
                _this9._component.option(NG_MODEL_OPTION, newValue)
            });
            this._optionChangedCallbacks.add(function(args) {
                _this9._ngLocker.obtain(NG_MODEL_OPTION);
                try {
                    if (args.name !== NG_MODEL_OPTION) {
                        return
                    }
                    _this9._ngModelController.$setViewValue(args.value)
                } finally {
                    if (_this9._ngLocker.locked(NG_MODEL_OPTION)) {
                        _this9._ngLocker.release(NG_MODEL_OPTION)
                    }
                }
            });
            this._componentDisposing.add(clearNgModelWatcher)
        },
        _evalOptions: function() {
            if (!this._isNgModelRequired()) {
                return this.callBase.apply(this, arguments)
            }
            var result = this.callBase.apply(this, arguments);
            result[NG_MODEL_OPTION] = this._parse(this._ngModel)(this._scope);
            return result
        }
    });
    var registeredComponents = {};
    var registerComponentDirective = function(name) {
        var priority = "dxValidator" !== name ? 1 : 10;
        _module.default.directive(name, ["$compile", "$parse", "dxDigestCallbacks", function($compile, $parse, dxDigestCallbacks) {
            return {
                restrict: "A",
                require: "^?ngModel",
                priority: priority,
                compile: function($element) {
                    var componentClass = registeredComponents[name];
                    var useTemplates = componentClass.prototype._useTemplates ? componentClass.prototype._useTemplates() : getClassMethod(componentClass, "_useTemplates")();
                    var $content = useTemplates ? $element.contents().detach() : null;
                    return function(scope, $element, attrs, ngModelController, transcludeFn) {
                        $element.append($content);
                        safeApply(function() {
                            new ComponentBuilder({
                                componentClass: componentClass,
                                componentName: name,
                                compile: $compile,
                                parse: $parse,
                                $element: $element,
                                scope: scope,
                                ngOptionsString: attrs[name],
                                ngOptions: attrs[name] ? scope.$eval(attrs[name]) : {},
                                ngModel: attrs.ngModel,
                                ngModelController: ngModelController,
                                transcludeFn: transcludeFn,
                                itemAlias: attrs[ITEM_ALIAS_ATTRIBUTE_NAME],
                                dxDigestCallbacks: dxDigestCallbacks
                            })
                        }, scope)
                    }
                }
            }
        }])
    };
    _component_registrator_callbacks.default.add(function(name, componentClass) {
        if (!registeredComponents[name]) {
            registerComponentDirective(name)
        }
        registeredComponents[name] = componentClass
    })
}
