/**
 * DevExtreme (ui/drop_down_box.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _ui = _interopRequireDefault(require("./drop_down_editor/ui.drop_down_editor"));
var _ui2 = _interopRequireDefault(require("./editor/ui.data_expression"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _selectors = require("./widget/selectors");
var _deferred = require("../core/utils/deferred");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _extend = require("../core/utils/extend");
var _utils = require("../ui/overlay/utils");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _index = require("../events/utils/index");
var _short = require("../events/short");
var _devices = _interopRequireDefault(require("../core/devices"));
var _dom_adapter = _interopRequireDefault(require("../core/dom_adapter"));
var _element = require("../core/element");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getActiveElement = _dom_adapter.default.getActiveElement;
var DROP_DOWN_BOX_CLASS = "dx-dropdownbox";
var ANONYMOUS_TEMPLATE_NAME = "content";
var realDevice = _devices.default.real();
var DropDownBox = _ui.default.inherit({
    _supportedKeys: function() {
        return (0, _extend.extend)({}, this.callBase(), {
            tab: function(e) {
                if (!this.option("opened")) {
                    return
                }
                var $tabbableElements = this._getTabbableElements();
                var $focusableElement = e.shiftKey ? $tabbableElements.last() : $tabbableElements.first();
                $focusableElement && _events_engine.default.trigger($focusableElement, "focus");
                e.preventDefault()
            }
        })
    },
    _getTabbableElements: function() {
        return this._getElements().filter(_selectors.tabbable)
    },
    _getElements: function() {
        return (0, _renderer.default)(this.content()).find("*")
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            acceptCustomValue: false,
            contentTemplate: ANONYMOUS_TEMPLATE_NAME,
            openOnFieldClick: true,
            displayValueFormatter: function(value) {
                return Array.isArray(value) ? value.join(", ") : value
            },
            useHiddenSubmitElement: true
        })
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        this.callBase()
    },
    _initMarkup: function() {
        this._initDataExpressions();
        this.$element().addClass(DROP_DOWN_BOX_CLASS);
        this.callBase()
    },
    _setSubmitValue: function() {
        var value = this.option("value");
        var submitValue = this._shouldUseDisplayValue(value) ? this._displayGetter(value) : value;
        this._getSubmitElement().val(submitValue)
    },
    _shouldUseDisplayValue: function(value) {
        return "this" === this.option("valueExpr") && (0, _type.isObject)(value)
    },
    _renderInputValue: function() {
        var callBase = this.callBase.bind(this);
        var values = [];
        if (!this._dataSource) {
            callBase(values);
            return (new _deferred.Deferred).resolve()
        }
        var currentValue = this._getCurrentValue();
        var keys = (0, _common.ensureDefined)(currentValue, []);
        keys = Array.isArray(keys) ? keys : [keys];
        var itemLoadDeferreds = (0, _iterator.map)(keys, function(key) {
            return this._loadItem(key).always(function(item) {
                var displayValue = this._displayGetter(item);
                values.push((0, _common.ensureDefined)(displayValue, key))
            }.bind(this))
        }.bind(this));
        return _deferred.when.apply(this, itemLoadDeferreds).always(function() {
            this.option("displayValue", values);
            callBase(values.length && values)
        }.bind(this))
    },
    _loadItem: function(value) {
        var deferred = new _deferred.Deferred;
        var that = this;
        var selectedItem = (0, _common.grep)(this.option("items") || [], function(item) {
            return this._isValueEquals(this._valueGetter(item), value)
        }.bind(this))[0];
        if (void 0 !== selectedItem) {
            deferred.resolve(selectedItem)
        } else {
            this._loadValue(value).done(function(item) {
                deferred.resolve(item)
            }).fail(function(args) {
                if (that.option("acceptCustomValue")) {
                    deferred.resolve(value)
                } else {
                    deferred.reject()
                }
            })
        }
        return deferred.promise()
    },
    _popupElementTabHandler: function(e) {
        if ("tab" !== (0, _index.normalizeKeyName)(e)) {
            return
        }
        var $firstTabbable = this._getTabbableElements().first().get(0);
        var $lastTabbable = this._getTabbableElements().last().get(0);
        var $target = e.originalEvent.target;
        var moveBackward = !!($target === $firstTabbable && e.shift);
        var moveForward = !!($target === $lastTabbable && !e.shift);
        if (moveBackward || moveForward) {
            this.close();
            _events_engine.default.trigger(this._input(), "focus");
            if (moveBackward) {
                e.originalEvent.preventDefault()
            }
        }
    },
    _renderPopup: function(e) {
        var _this = this;
        this.callBase();
        if (this.option("focusStateEnabled")) {
            _short.keyboard.on(this.content(), null, function(e) {
                return _this._popupElementTabHandler(e)
            })
        }
    },
    _renderPopupContent: function() {
        if (this.option("contentTemplate") === ANONYMOUS_TEMPLATE_NAME) {
            return
        }
        var contentTemplate = this._getTemplateByOption("contentTemplate");
        if (!(contentTemplate && this.option("contentTemplate"))) {
            return
        }
        var $popupContent = this._popup.$content();
        var templateData = {
            value: this._fieldRenderData(),
            component: this
        };
        $popupContent.empty();
        contentTemplate.render({
            container: (0, _element.getPublicElement)($popupContent),
            model: templateData
        })
    },
    _canShowVirtualKeyboard: function() {
        return realDevice.mac
    },
    _isNestedElementActive: function() {
        var activeElement = getActiveElement();
        return activeElement && this._popup.$content().get(0).contains(activeElement)
    },
    _shouldCloseOnTargetScroll: function() {
        return "desktop" === realDevice.deviceType && this._canShowVirtualKeyboard() && this._isNestedElementActive()
    },
    _popupHiddenHandler: function() {
        this.callBase();
        this._popupPosition = void 0
    },
    _popupPositionedHandler: function(e) {
        this.callBase(e);
        this._popupPosition = e.position
    },
    _getDefaultPopupPosition: function(isRtlEnabled) {
        var _this$callBase = this.callBase(isRtlEnabled),
            my = _this$callBase.my,
            at = _this$callBase.at;
        return {
            my: my,
            at: at,
            offset: {
                v: -1
            },
            collision: "flipfit"
        }
    },
    _popupConfig: function() {
        var _this2 = this;
        var _this$option = this.option(),
            focusStateEnabled = _this$option.focusStateEnabled;
        return (0, _extend.extend)(this.callBase(), {
            tabIndex: -1,
            dragEnabled: false,
            focusStateEnabled: focusStateEnabled,
            contentTemplate: ANONYMOUS_TEMPLATE_NAME,
            closeOnTargetScroll: this._shouldCloseOnTargetScroll.bind(this),
            position: (0, _extend.extend)(this.option("popupPosition"), {
                of: this.$element()
            }),
            onKeyboardHandled: function(opts) {
                return _this2.option("focusStateEnabled") && _this2._popupElementTabHandler(opts)
            },
            maxHeight: function() {
                var _this$_popupPosition;
                var popupLocation = null === (_this$_popupPosition = this._popupPosition) || void 0 === _this$_popupPosition ? void 0 : _this$_popupPosition.v.location;
                return (0, _utils.getElementMaxHeightByWindow)(this.$element(), popupLocation)
            }.bind(this)
        })
    },
    _popupShownHandler: function() {
        this.callBase();
        var $firstElement = this._getTabbableElements().first();
        _events_engine.default.trigger($firstElement, "focus")
    },
    _setCollectionWidgetOption: _common.noop,
    _optionChanged: function(args) {
        this._dataExpressionOptionChanged(args);
        switch (args.name) {
            case "dataSource":
                this._renderInputValue();
                break;
            case "displayValue":
                this.option("text", args.value);
                break;
            case "displayExpr":
                this._renderValue();
                break;
            case "contentTemplate":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    }
}).include(_ui2.default);
(0, _component_registrator.default)("dxDropDownBox", DropDownBox);
var _default = DropDownBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
