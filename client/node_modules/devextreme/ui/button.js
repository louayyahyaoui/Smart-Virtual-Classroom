/**
 * DevExtreme (ui/button.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _utils = require("./widget/utils.ink_ripple");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _themes = require("./themes");
var _action = _interopRequireDefault(require("../core/action"));
var _validation_engine = _interopRequireDefault(require("./validation_engine"));
var _ui = _interopRequireDefault(require("./widget/ui.widget"));
var _short = require("../events/short");
var _extend = require("../core/utils/extend");
var _function_template = require("../core/templates/function_template");
var _icon = require("../core/utils/icon");
var _element = require("../core/element");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

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
var ANONYMOUS_TEMPLATE_NAME = "content";
var Button = function(_Widget) {
    _inheritsLoose(Button, _Widget);

    function Button() {
        var _this;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        _this = _Widget.call.apply(_Widget, [this].concat(args)) || this;
        _this._feedbackHideTimeout = 100;
        return _this
    }
    var _proto = Button.prototype;
    _proto._$content = function() {
        return this.$element().find(".dx-button-content")
    };
    _proto._$submitInput = function() {
        return this.$element().find(".dx-button-submit-input")
    };
    _proto._attachActiveEvents = function(active, inactive) {
        var $el = this._eventBindingTarget();
        var namespace = "inkRipple";
        var selector = this._activeStateUnit;
        _short.active.off($el, {
            namespace: namespace,
            selector: selector
        });
        _short.active.on($el, new _action.default(active), new _action.default(inactive, {
            excludeValidators: ["disabled", "readOnly"]
        }), {
            showTimeout: this._feedbackShowTimeout,
            hideTimeout: this._feedbackHideTimeout,
            selector: selector,
            namespace: namespace
        })
    };
    _proto._defaultOptionsRules = function() {
        return _Widget.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)((0, _themes.current)())
            },
            options: {
                useInkRipple: true
            }
        }])
    };
    _proto._executeClickAction = function(event) {
        this._clickAction({
            validationGroup: this._validationGroupConfig,
            event: event
        })
    };
    _proto._findGroup = function() {
        var $element = this.$element();
        var model = this._modelByElement($element);
        var _this$option = this.option(),
            validationGroup = _this$option.validationGroup;
        return validationGroup || _validation_engine.default.findGroup($element, model)
    };
    _proto._getContentData = function() {
        var _this$option2 = this.option(),
            icon = _this$option2.icon,
            text = _this$option2.text,
            type = _this$option2.type,
            _templateData = _this$option2._templateData;
        return (0, _extend.extend)({
            icon: "back" === type && !icon ? "back" : icon,
            text: text
        }, _templateData)
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
            hoverStateEnabled: true,
            onClick: null,
            type: "normal",
            text: "",
            icon: "",
            iconPosition: "left",
            validationGroup: void 0,
            activeStateEnabled: true,
            template: "content",
            useSubmitBehavior: false,
            useInkRipple: false,
            _templateData: {},
            stylingMode: "contained"
        })
    };
    _proto._getSubmitAction = function() {
        var _this2 = this;
        var needValidate = true;
        var validationStatus = "valid";
        return this._createAction(function(_ref) {
            var event = _ref.event;
            if (needValidate) {
                var validationGroup = _this2._validationGroupConfig;
                if (validationGroup) {
                    var _validationGroup$vali = validationGroup.validate(),
                        status = _validationGroup$vali.status,
                        complete = _validationGroup$vali.complete;
                    validationStatus = status;
                    if ("pending" === status) {
                        needValidate = false;
                        _this2.option("disabled", true);
                        complete.then(function(_ref2) {
                            var status = _ref2.status;
                            _this2.option("disabled", false);
                            validationStatus = status;
                            "valid" === validationStatus && _this2._submitInput().click();
                            needValidate = true
                        })
                    }
                }
            }
            "valid" !== validationStatus && event.preventDefault();
            event.stopPropagation()
        })
    };
    _proto._initMarkup = function() {
        this.$element().addClass("dx-button");
        this._renderType();
        this._renderStylingMode();
        this._renderInkRipple();
        this._renderClick();
        this._updateAriaLabel();
        _Widget.prototype._initMarkup.call(this);
        this._updateContent();
        this.setAria("role", "button")
    };
    _proto._getAnonymousTemplateName = function() {
        return ANONYMOUS_TEMPLATE_NAME
    };
    _proto._initTemplates = function() {
        var _this3 = this;
        this._templateManager.addDefaultTemplates({
            content: new _function_template.FunctionTemplate(function(_ref3) {
                var _ref3$model = _ref3.model,
                    model = void 0 === _ref3$model ? {} : _ref3$model,
                    container = _ref3.container;
                var text = model.text,
                    icon = model.icon;
                var _this3$option = _this3.option(),
                    iconPosition = _this3$option.iconPosition;
                var $icon = (0, _icon.getImageContainer)(icon);
                var $textContainer = text && (0, _renderer.default)("<span>").text(text).addClass("dx-button-text");
                var $container = (0, _renderer.default)(container);
                $container.append($textContainer);
                if ("left" === iconPosition) {
                    $container.prepend($icon)
                } else {
                    $icon.addClass("dx-icon-right");
                    $container.append($icon)
                }
            })
        });
        _Widget.prototype._initTemplates.call(this)
    };
    _proto._optionChanged = function(args) {
        var name = args.name,
            previousValue = args.previousValue;
        switch (name) {
            case "onClick":
                this._updateClick();
                break;
            case "icon":
            case "text":
                this._updateContent();
                this._updateAriaLabel();
                break;
            case "type":
                this._updateType(previousValue);
                this._updateContent();
                break;
            case "_templateData":
                break;
            case "template":
            case "iconPosition":
                this._updateContent();
                break;
            case "stylingMode":
                this._updateStylingMode();
                break;
            case "useSubmitBehavior":
                this._updateSubmitInput();
                break;
            case "useInkRipple":
                this._invalidate();
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    _proto._renderClick = function() {
        var _this4 = this;
        var $el = this.$element();
        _short.dxClick.off($el, {
            namespace: this.NAME
        });
        _short.dxClick.on($el, function(event) {
            return _this4._executeClickAction(event)
        }, {
            namespace: this.NAME
        });
        this._updateClick()
    };
    _proto._renderInkRipple = function() {
        var _this5 = this;
        var _this$option3 = this.option(),
            text = _this$option3.text,
            icon = _this$option3.icon,
            type = _this$option3.type,
            useInkRipple = _this$option3.useInkRipple;
        if (useInkRipple) {
            var isOnlyIconButton = !text && icon || "back" === type;
            var _inkRipple = (0, _utils.render)(isOnlyIconButton ? {
                waveSizeCoefficient: 1,
                useHoldAnimation: false,
                isCentered: true
            } : {});
            var changeWaveVisibility = function(event, visible) {
                var _this5$option = _this5.option(),
                    activeStateEnabled = _this5$option.activeStateEnabled,
                    useInkRipple = _this5$option.useInkRipple;
                if (useInkRipple && activeStateEnabled && !_this5._disposed) {
                    var config = {
                        element: _this5._$content(),
                        event: event
                    };
                    visible ? _inkRipple.showWave(config) : _inkRipple.hideWave(config)
                }
            };
            this._attachActiveEvents(function(_ref4) {
                var event = _ref4.event;
                return changeWaveVisibility(event, true)
            }, function(_ref5) {
                var event = _ref5.event;
                return changeWaveVisibility(event)
            })
        }
    };
    _proto._renderStylingMode = function() {
        var $element = this.$element();
        var _this$option4 = this.option(),
            stylingMode = _this$option4.stylingMode;
        if (["contained", "text", "outlined"].indexOf(stylingMode) === -1) {
            stylingMode = this._getDefaultOptions().stylingMode
        }
        $element.addClass("dx-button-mode-".concat(stylingMode))
    };
    _proto._renderSubmitInput = function() {
        var _this$option5 = this.option(),
            useSubmitBehavior = _this$option5.useSubmitBehavior;
        if (useSubmitBehavior) {
            var submitAction = this._getSubmitAction();
            var $content = this._$content();
            (0, _renderer.default)("<input>").attr("type", "submit").attr("tabindex", -1).addClass("dx-button-submit-input").appendTo($content);
            _short.click.on(this._$submitInput(), function(event) {
                return submitAction({
                    event: event
                })
            })
        }
    };
    _proto._renderType = function() {
        var _this$option6 = this.option(),
            type = _this$option6.type;
        var $element = this.$element();
        type && $element.addClass("dx-button-".concat(type))
    };
    _proto._submitInput = function() {
        return this._$submitInput().get(0)
    };
    _proto._supportedKeys = function() {
        var _this6 = this;
        var click = function(e) {
            e.preventDefault();
            _this6._executeClickAction(e)
        };
        return (0, _extend.extend)(_Widget.prototype._supportedKeys.call(this), {
            space: click,
            enter: click
        })
    };
    _proto._updateAriaLabel = function() {
        var ariaTarget = this._getAriaTarget();
        var _this$option7 = this.option(),
            icon = _this$option7.icon,
            text = _this$option7.text;
        if (!text) {
            if ("image" === (0, _icon.getImageSourceType)(icon)) {
                icon = icon.indexOf("base64") === -1 ? icon.replace(/.+\/([^.]+)\..+$/, "$1") : "Base64"
            }
            text = icon || ""
        }
        ariaTarget.attr("aria-label", text || null)
    };
    _proto._updateClick = function() {
        var _this7 = this;
        this._clickAction = this._createActionByOption("onClick", {
            excludeValidators: ["readOnly"],
            afterExecute: function() {
                var _this7$option = _this7.option(),
                    useSubmitBehavior = _this7$option.useSubmitBehavior;
                useSubmitBehavior && setTimeout(function() {
                    return _this7._submitInput().click()
                })
            }
        })
    };
    _proto._updateContent = function() {
        var $element = this.$element();
        var $content = this._$content();
        var data = this._getContentData();
        var _this$option8 = this.option(),
            template = _this$option8.template,
            iconPosition = _this$option8.iconPosition;
        var icon = data.icon,
            text = data.text;
        $content.length ? $content.empty() : $content = (0, _renderer.default)("<div>").addClass("dx-button-content").appendTo($element);
        $element.toggleClass("dx-button-has-icon", !!icon).toggleClass("dx-button-icon-right", !!icon && "left" !== iconPosition).toggleClass("dx-button-has-text", !!text);
        var $template = (0, _renderer.default)(this._getTemplateByOption("template").render({
            model: data,
            container: (0, _element.getPublicElement)($content),
            transclude: this._templateManager.anonymousTemplateName === template
        }));
        if ($template.hasClass("dx-template-wrapper")) {
            $template.addClass("dx-button-content");
            $content.replaceWith($template)
        }
        this._updateSubmitInput()
    };
    _proto._updateSubmitInput = function() {
        var _this$option9 = this.option(),
            useSubmitBehavior = _this$option9.useSubmitBehavior;
        var $submitInput = this._$submitInput();
        if (!useSubmitBehavior && $submitInput.length) {
            $submitInput.remove()
        } else {
            if (useSubmitBehavior && !$submitInput.length) {
                this._renderSubmitInput()
            }
        }
    };
    _proto._updateStylingMode = function() {
        var $element = this.$element();
        ["contained", "text", "outlined"].map(function(mode) {
            return "dx-button-mode-".concat(mode)
        }).forEach($element.removeClass.bind($element));
        this._renderStylingMode()
    };
    _proto._updateType = function(previous) {
        var $element = this.$element();
        [previous, "back", "danger", "default", "normal", "success"].map(function(type) {
            return "dx-button-".concat(type)
        }).forEach($element.removeClass.bind($element));
        this._renderType()
    };
    _createClass(Button, [{
        key: "_validationGroupConfig",
        get: function() {
            return _validation_engine.default.getGroupConfig(this._findGroup())
        }
    }]);
    return Button
}(_ui.default);
(0, _component_registrator.default)("dxButton", Button);
var _default = Button;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
