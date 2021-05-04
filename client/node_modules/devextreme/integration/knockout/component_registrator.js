/**
 * DevExtreme (integration/knockout/component_registrator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _knockout = _interopRequireDefault(require("knockout"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _type = require("../../core/utils/type");
var _component_registrator_callbacks = _interopRequireDefault(require("../../core/component_registrator_callbacks"));
var _ui = _interopRequireDefault(require("../../ui/widget/ui.widget"));
var _template = require("./template");
var _editor = _interopRequireDefault(require("../../ui/editor/editor"));
var _locker = _interopRequireDefault(require("../../core/utils/locker"));
var _utils = require("./utils");
var _config = _interopRequireDefault(require("../../core/config"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
if (_knockout.default) {
    var LOCKS_DATA_KEY = "dxKoLocks";
    var CREATED_WITH_KO_DATA_KEY = "dxKoCreation";
    var editorsBindingHandlers = [];
    var registerComponentKoBinding = function(componentName, componentClass) {
        if (componentClass.subclassOf(_editor.default)) {
            editorsBindingHandlers.push(componentName)
        }
        _knockout.default.bindingHandlers[componentName] = {
            init: function(domNode, valueAccessor) {
                var $element = (0, _renderer.default)(domNode);
                var optionChangedCallbacks = (0, _callbacks.default)();
                var optionsByReference = {};
                var component;
                var knockoutConfig = (0, _config.default)().knockout;
                var isBindingPropertyPredicateName = knockoutConfig && knockoutConfig.isBindingPropertyPredicateName;
                var isBindingPropertyPredicate;
                var ctorOptions = {
                    onInitializing: function() {
                        optionsByReference = this._getOptionsByReference();
                        _knockout.default.computed(function() {
                            var model = _knockout.default.unwrap(valueAccessor());
                            if (component) {
                                component.beginUpdate()
                            }
                            isBindingPropertyPredicate = isBindingPropertyPredicateName && model && model[isBindingPropertyPredicateName];
                            unwrapModel(model);
                            if (component) {
                                component.endUpdate()
                            }
                        }, null, {
                            disposeWhenNodeIsRemoved: domNode
                        });
                        component = this
                    },
                    modelByElement: function($element) {
                        if ($element.length) {
                            var node = (0, _utils.getClosestNodeWithContext)($element.get(0));
                            return _knockout.default.dataFor(node)
                        }
                    },
                    nestedComponentOptions: function(component) {
                        return {
                            modelByElement: component.option("modelByElement"),
                            nestedComponentOptions: component.option("nestedComponentOptions")
                        }
                    },
                    _optionChangedCallbacks: optionChangedCallbacks,
                    integrationOptions: {
                        watchMethod: function(fn, callback, options) {
                            options = options || {};
                            var skipCallback = options.skipImmediate;
                            var watcher = _knockout.default.computed(function() {
                                var newValue = _knockout.default.unwrap(fn());
                                if (!skipCallback) {
                                    callback(newValue)
                                }
                                skipCallback = false
                            });
                            return function() {
                                watcher.dispose()
                            }
                        },
                        templates: {
                            "dx-polymorph-widget": {
                                render: function(options) {
                                    var widgetName = _knockout.default.utils.unwrapObservable(options.model.widget);
                                    if (!widgetName) {
                                        return
                                    }
                                    var markup = (0, _renderer.default)("<div>").attr("data-bind", widgetName + ": options").get(0);
                                    (0, _renderer.default)(options.container).append(markup);
                                    _knockout.default.applyBindings(options.model, markup)
                                }
                            }
                        },
                        createTemplate: function(element) {
                            return new _template.KoTemplate(element)
                        }
                    }
                };
                var optionNameToModelMap = {};
                var applyModelValueToOption = function(optionName, modelValue, unwrap) {
                    var locks = $element.data(LOCKS_DATA_KEY);
                    var optionValue = unwrap ? _knockout.default.unwrap(modelValue) : modelValue;
                    if (_knockout.default.isWriteableObservable(modelValue)) {
                        optionNameToModelMap[optionName] = modelValue
                    }
                    if (component) {
                        if (locks.locked(optionName)) {
                            return
                        }
                        locks.obtain(optionName);
                        try {
                            if (_knockout.default.ignoreDependencies) {
                                _knockout.default.ignoreDependencies(component.option, component, [optionName, optionValue])
                            } else {
                                component.option(optionName, optionValue)
                            }
                        } finally {
                            locks.release(optionName)
                        }
                    } else {
                        ctorOptions[optionName] = optionValue
                    }
                };
                var handleOptionChanged = function(args) {
                    var optionName = args.fullName;
                    var optionValue = args.value;
                    if (!(optionName in optionNameToModelMap)) {
                        return
                    }
                    var $element = this._$element;
                    var locks = $element.data(LOCKS_DATA_KEY);
                    if (locks.locked(optionName)) {
                        return
                    }
                    locks.obtain(optionName);
                    try {
                        optionNameToModelMap[optionName](optionValue)
                    } finally {
                        locks.release(optionName)
                    }
                };
                var createComponent = function() {
                    optionChangedCallbacks.add(handleOptionChanged);
                    $element.data(CREATED_WITH_KO_DATA_KEY, true).data(LOCKS_DATA_KEY, new _locker.default);
                    new componentClass($element, ctorOptions);
                    ctorOptions = null
                };
                var unwrapModelValue = function(currentModel, propertyName, propertyPath) {
                    if (propertyPath === isBindingPropertyPredicateName) {
                        return
                    }
                    if (!isBindingPropertyPredicate || isBindingPropertyPredicate(propertyPath, propertyName, currentModel)) {
                        var unwrappedPropertyValue;
                        _knockout.default.computed(function() {
                            var propertyValue = currentModel[propertyName];
                            applyModelValueToOption(propertyPath, propertyValue, true);
                            unwrappedPropertyValue = _knockout.default.unwrap(propertyValue)
                        }, null, {
                            disposeWhenNodeIsRemoved: domNode
                        });
                        if ((0, _type.isPlainObject)(unwrappedPropertyValue)) {
                            if (!optionsByReference[propertyPath]) {
                                unwrapModel(unwrappedPropertyValue, propertyPath)
                            }
                        }
                    } else {
                        applyModelValueToOption(propertyPath, currentModel[propertyName], false)
                    }
                };

                function unwrapModel(model, propertyPath) {
                    for (var propertyName in model) {
                        if (Object.prototype.hasOwnProperty.call(model, propertyName)) {
                            unwrapModelValue(model, propertyName, propertyPath ? [propertyPath, propertyName].join(".") : propertyName)
                        }
                    }
                }
                createComponent();
                return {
                    controlsDescendantBindings: componentClass.subclassOf(_ui.default)
                }
            }
        };
        if ("dxValidator" === componentName) {
            _knockout.default.bindingHandlers.dxValidator.after = editorsBindingHandlers
        }
    };
    _component_registrator_callbacks.default.add(function(name, componentClass) {
        registerComponentKoBinding(name, componentClass)
    })
}
