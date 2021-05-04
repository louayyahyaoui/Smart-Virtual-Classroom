/**
 * DevExtreme (core/dom_component.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _config = _interopRequireDefault(require("./config"));
var _errors = _interopRequireDefault(require("./errors"));
var _resize_callbacks = _interopRequireDefault(require("../core/utils/resize_callbacks"));
var _component = _interopRequireDefault(require("./component"));
var _template_manager = require("./template_manager");
var _public_component = require("./utils/public_component");
var _element_data = require("./element_data");
var _iterator = require("./utils/iterator");
var _extend = require("./utils/extend");
var _element = require("../core/element");
var _common = require("./utils/common");
var _array = require("./utils/array");
var _type = require("./utils/type");
var _window = require("../core/utils/window");
var _short = require("../events/short");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var abstract = _component.default.abstract;
var DOMComponent = _component.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            width: void 0,
            height: void 0,
            rtlEnabled: (0, _config.default)().rtlEnabled,
            elementAttr: {},
            disabled: false,
            integrationOptions: {}
        }, this._useTemplates() ? _template_manager.TemplateManager.createDefaultOptions() : {})
    },
    ctor: function(element, options) {
        this._customClass = null;
        this._createElement(element);
        (0, _public_component.attachInstanceToElement)(this._$element, this, this._dispose);
        this.callBase(options)
    },
    _createElement: function(element) {
        this._$element = (0, _renderer.default)(element)
    },
    _getSynchronizableOptionsForCreateComponent: function() {
        return ["rtlEnabled", "disabled", "templatesRenderAsynchronously"]
    },
    _visibilityChanged: abstract,
    _dimensionChanged: abstract,
    _init: function() {
        this.callBase();
        this._attachWindowResizeCallback();
        this._initTemplateManager()
    },
    _setOptionsByDevice: function(instanceCustomRules) {
        this.callBase([].concat(this.constructor._classCustomRules || [], instanceCustomRules || []))
    },
    _isInitialOptionValue: function(name) {
        var isCustomOption = this.constructor._classCustomRules && Object.prototype.hasOwnProperty.call(this._convertRulesToOptions(this.constructor._classCustomRules), name);
        return !isCustomOption && this.callBase(name)
    },
    _attachWindowResizeCallback: function() {
        if (this._isDimensionChangeSupported()) {
            var windowResizeCallBack = this._windowResizeCallBack = this._dimensionChanged.bind(this);
            _resize_callbacks.default.add(windowResizeCallBack)
        }
    },
    _isDimensionChangeSupported: function() {
        return this._dimensionChanged !== abstract
    },
    _renderComponent: function() {
        this._initMarkup();
        (0, _window.hasWindow)() && this._render()
    },
    _initMarkup: function() {
        var _ref = this.option() || {},
            rtlEnabled = _ref.rtlEnabled;
        this._renderElementAttributes();
        this._toggleRTLDirection(rtlEnabled);
        this._renderVisibilityChange();
        this._renderDimensions()
    },
    _render: function() {
        this._attachVisibilityChangeHandlers()
    },
    _renderElementAttributes: function() {
        var _ref2 = this.option() || {},
            elementAttr = _ref2.elementAttr;
        var attributes = (0, _extend.extend)({}, elementAttr);
        var classNames = attributes.class;
        delete attributes.class;
        this.$element().attr(attributes).removeClass(this._customClass).addClass(classNames);
        this._customClass = classNames
    },
    _renderVisibilityChange: function() {
        if (this._isDimensionChangeSupported()) {
            this._attachDimensionChangeHandlers()
        }
        if (this._isVisibilityChangeSupported()) {
            var $element = this.$element();
            $element.addClass("dx-visibility-change-handler")
        }
    },
    _renderDimensions: function() {
        var $element = this.$element();
        var element = $element.get(0);
        var width = this._getOptionValue("width", element);
        var height = this._getOptionValue("height", element);
        if (this._isCssUpdateRequired(element, height, width)) {
            $element.css({
                width: null === width ? "" : width,
                height: null === height ? "" : height
            })
        }
    },
    _isCssUpdateRequired: function(element, height, width) {
        return !!((0, _type.isDefined)(width) || (0, _type.isDefined)(height) || element.style.width || element.style.height)
    },
    _attachDimensionChangeHandlers: function() {
        var _this = this;
        var $el = this.$element();
        var namespace = "".concat(this.NAME, "VisibilityChange");
        _short.resize.off($el, {
            namespace: namespace
        });
        _short.resize.on($el, function() {
            return _this._dimensionChanged()
        }, {
            namespace: namespace
        })
    },
    _attachVisibilityChangeHandlers: function() {
        var _this2 = this;
        if (this._isVisibilityChangeSupported()) {
            var $el = this.$element();
            var namespace = "".concat(this.NAME, "VisibilityChange");
            this._isHidden = !this._isVisible();
            _short.visibility.off($el, {
                namespace: namespace
            });
            _short.visibility.on($el, function() {
                return _this2._checkVisibilityChanged("shown")
            }, function() {
                return _this2._checkVisibilityChanged("hiding")
            }, {
                namespace: namespace
            })
        }
    },
    _isVisible: function() {
        var $element = this.$element();
        return $element.is(":visible")
    },
    _checkVisibilityChanged: function(action) {
        var isVisible = this._isVisible();
        if (isVisible) {
            if ("hiding" === action && !this._isHidden) {
                this._visibilityChanged(false);
                this._isHidden = true
            } else {
                if ("shown" === action && this._isHidden) {
                    this._isHidden = false;
                    this._visibilityChanged(true)
                }
            }
        }
    },
    _isVisibilityChangeSupported: function() {
        return this._visibilityChanged !== abstract && (0, _window.hasWindow)()
    },
    _clean: _common.noop,
    _modelByElement: function() {
        var _this$option = this.option(),
            modelByElement = _this$option.modelByElement;
        var $element = this.$element();
        return modelByElement ? modelByElement($element) : void 0
    },
    _invalidate: function() {
        if (this._isUpdateAllowed()) {
            throw _errors.default.Error("E0007")
        }
        this._requireRefresh = true
    },
    _refresh: function() {
        this._clean();
        this._renderComponent()
    },
    _dispose: function() {
        this._templateManager && this._templateManager.dispose();
        this.callBase();
        this._clean();
        this._detachWindowResizeCallback()
    },
    _detachWindowResizeCallback: function() {
        if (this._isDimensionChangeSupported()) {
            _resize_callbacks.default.remove(this._windowResizeCallBack)
        }
    },
    _toggleRTLDirection: function(rtl) {
        var $element = this.$element();
        $element.toggleClass("dx-rtl", rtl)
    },
    _createComponent: function(element, component) {
        var _this3 = this;
        var config = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        var synchronizableOptions = (0, _common.grep)(this._getSynchronizableOptionsForCreateComponent(), function(value) {
            return !(value in config)
        });
        var _this$option2 = this.option(),
            integrationOptions = _this$option2.integrationOptions;
        var _this$option3 = this.option(),
            nestedComponentOptions = _this$option3.nestedComponentOptions;
        nestedComponentOptions = nestedComponentOptions || _common.noop;
        var nestedComponentConfig = (0, _extend.extend)({
            integrationOptions: integrationOptions
        }, nestedComponentOptions(this));
        synchronizableOptions.forEach(function(optionName) {
            return nestedComponentConfig[optionName] = _this3.option(optionName)
        });
        this._extendConfig(config, nestedComponentConfig);
        var instance = void 0;
        if ((0, _type.isString)(component)) {
            var $element = (0, _renderer.default)(element)[component](config);
            instance = $element[component]("instance")
        } else {
            if (element) {
                instance = component.getInstance(element);
                if (instance) {
                    instance.option(config)
                } else {
                    instance = new component(element, config)
                }
            }
        }
        if (instance) {
            var optionChangedHandler = function(_ref3) {
                var name = _ref3.name,
                    value = _ref3.value;
                if ((0, _array.inArray)(name, synchronizableOptions) >= 0) {
                    instance.option(name, value)
                }
            };
            this.on("optionChanged", optionChangedHandler);
            instance.on("disposing", function() {
                return _this3.off("optionChanged", optionChangedHandler)
            })
        }
        return instance
    },
    _extendConfig: function(config, extendConfig) {
        (0, _iterator.each)(extendConfig, function(key, value) {
            !Object.prototype.hasOwnProperty.call(config, key) && (config[key] = value)
        })
    },
    _defaultActionConfig: function() {
        var $element = this.$element();
        var context = this._modelByElement($element);
        return (0, _extend.extend)(this.callBase(), {
            context: context
        })
    },
    _defaultActionArgs: function() {
        var $element = this.$element();
        var model = this._modelByElement($element);
        var element = this.element();
        return (0, _extend.extend)(this.callBase(), {
            element: element,
            model: model
        })
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "width":
            case "height":
                this._renderDimensions();
                break;
            case "rtlEnabled":
                this._invalidate();
                break;
            case "elementAttr":
                this._renderElementAttributes();
                break;
            case "disabled":
            case "integrationOptions":
                break;
            default:
                this.callBase(args)
        }
    },
    _removeAttributes: function(element) {
        var attrs = element.attributes;
        for (var i = attrs.length - 1; i >= 0; i--) {
            var attr = attrs[i];
            if (attr) {
                var name = attr.name;
                if (!name.indexOf("aria-") || name.indexOf("dx-") !== -1 || "role" === name || "style" === name || "tabindex" === name) {
                    element.removeAttribute(name)
                }
            }
        }
    },
    _removeClasses: function(element) {
        element.className = element.className.split(" ").filter(function(cssClass) {
            return 0 !== cssClass.lastIndexOf("dx-", 0)
        }).join(" ")
    },
    _updateDOMComponent: function(renderRequired) {
        if (renderRequired) {
            this._renderComponent()
        } else {
            if (this._requireRefresh) {
                this._requireRefresh = false;
                this._refresh()
            }
        }
    },
    endUpdate: function() {
        var renderRequired = this._isInitializingRequired();
        this.callBase();
        this._isUpdateAllowed() && this._updateDOMComponent(renderRequired)
    },
    $element: function() {
        return this._$element
    },
    element: function() {
        var $element = this.$element();
        return (0, _element.getPublicElement)($element)
    },
    dispose: function() {
        var element = this.$element().get(0);
        (0, _element_data.cleanDataRecursive)(element, true);
        element.textContent = "";
        this._removeAttributes(element);
        this._removeClasses(element)
    },
    resetOption: function(optionName) {
        this.callBase(optionName);
        if ("width" === optionName || "height" === optionName) {
            var initialOption = this.initialOption(optionName);
            !(0, _type.isDefined)(initialOption) && this.$element().css(optionName, "")
        }
    },
    _getAnonymousTemplateName: function() {
        return
    },
    _initTemplateManager: function() {
        if (this._templateManager || !this._useTemplates()) {
            return
        }
        var _this$option4 = this.option(),
            _this$option4$integra = _this$option4.integrationOptions,
            integrationOptions = void 0 === _this$option4$integra ? {} : _this$option4$integra;
        var createTemplate = integrationOptions.createTemplate;
        this._templateManager = new _template_manager.TemplateManager(createTemplate, this._getAnonymousTemplateName());
        this._initTemplates()
    },
    _initTemplates: function() {
        var _this4 = this;
        var _this$_templateManage = this._templateManager.extractTemplates(this.$element()),
            templates = _this$_templateManage.templates,
            anonymousTemplateMeta = _this$_templateManage.anonymousTemplateMeta;
        var anonymousTemplate = this.option("integrationOptions.templates.".concat(anonymousTemplateMeta.name));
        templates.forEach(function(_ref4) {
            var name = _ref4.name,
                template = _ref4.template;
            _this4._options.silent("integrationOptions.templates.".concat(name), template)
        });
        if (anonymousTemplateMeta.name && !anonymousTemplate) {
            this._options.silent("integrationOptions.templates.".concat(anonymousTemplateMeta.name), anonymousTemplateMeta.template);
            this._options.silent("_hasAnonymousTemplateContent", true)
        }
    },
    _getTemplateByOption: function(optionName) {
        return this._getTemplate(this.option(optionName))
    },
    _getTemplate: function(templateSource) {
        var templates = this.option("integrationOptions.templates");
        var isAsyncTemplate = this.option("templatesRenderAsynchronously");
        var skipTemplates = this.option("integrationOptions.skipTemplates");
        return this._templateManager.getTemplate(templateSource, templates, {
            isAsyncTemplate: isAsyncTemplate,
            skipTemplates: skipTemplates
        }, this)
    },
    _saveTemplate: function(name, template) {
        this._setOptionWithoutOptionChange("integrationOptions.templates." + name, this._templateManager._createTemplate(template))
    },
    _useTemplates: function() {
        return true
    }
});
DOMComponent.getInstance = function(element) {
    return (0, _public_component.getInstanceByElement)((0, _renderer.default)(element), this)
};
DOMComponent.defaultOptions = function(rule) {
    this._classCustomRules = this._classCustomRules || [];
    this._classCustomRules.push(rule)
};
var _default = DOMComponent;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
