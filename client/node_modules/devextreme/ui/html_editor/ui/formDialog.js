/**
 * DevExtreme (ui/html_editor/ui/formDialog.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _popup = _interopRequireDefault(require("../../popup"));
var _form = _interopRequireDefault(require("../../form"));
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _dom = require("../../../core/utils/dom");
var _deferred = require("../../../core/utils/deferred");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _browser = _interopRequireDefault(require("../../../core/utils/browser"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var getActiveElement = _dom_adapter.default.getActiveElement;
var DIALOG_CLASS = "dx-formdialog";
var FORM_CLASS = "dx-formdialog-form";
var FormDialog = function() {
    function FormDialog(editorInstance, popupConfig) {
        this._editorInstance = editorInstance;
        this._popupUserConfig = popupConfig;
        this._renderPopup()
    }
    var _proto = FormDialog.prototype;
    _proto._renderPopup = function() {
        var editorInstance = this._editorInstance;
        var $container = (0, _renderer.default)("<div>").addClass(DIALOG_CLASS).appendTo(editorInstance.$element());
        var popupConfig = this._getPopupConfig();
        return editorInstance._createComponent($container, _popup.default, popupConfig)
    };
    _proto._escKeyHandler = function() {
        this._popup.hide()
    };
    _proto._addEscapeHandler = function(e) {
        e.component.registerKeyHandler("escape", this._escKeyHandler.bind(this))
    };
    _proto._getPopupConfig = function() {
        var _this = this;
        return (0, _extend.extend)({
            onInitialized: function(e) {
                _this._popup = e.component;
                _this._popup.on("hiding", function() {
                    _this.deferred.reject()
                });
                _this._popup.on("shown", function() {
                    _this._form.focus()
                })
            },
            deferRendering: false,
            focusStateEnabled: false,
            showCloseButton: false,
            contentTemplate: function(contentElem) {
                var $formContainer = (0, _renderer.default)("<div>").appendTo(contentElem);
                _this._renderForm($formContainer, {
                    onEditorEnterKey: function(_ref) {
                        var component = _ref.component,
                            dataField = _ref.dataField,
                            event = _ref.event;
                        _this._updateEditorValue(component, dataField);
                        _this.hide(component.option("formData"), event)
                    },
                    customizeItem: function(item) {
                        if ("simple" === item.itemType) {
                            item.editorOptions = (0, _extend.extend)(true, {}, item.editorOptions, {
                                onInitialized: _this._addEscapeHandler.bind(_this)
                            })
                        }
                    }
                })
            },
            toolbarItems: [{
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: {
                    onInitialized: this._addEscapeHandler.bind(this),
                    text: _message.default.format("OK"),
                    onClick: function(_ref2) {
                        var event = _ref2.event;
                        _this.hide(_this._form.option("formData"), event)
                    }
                }
            }, {
                toolbar: "bottom",
                location: "after",
                widget: "dxButton",
                options: {
                    onInitialized: this._addEscapeHandler.bind(this),
                    text: _message.default.format("Cancel"),
                    onClick: function() {
                        _this._popup.hide()
                    }
                }
            }]
        }, this._popupUserConfig)
    };
    _proto._updateEditorValue = function(component, dataField) {
        if (_browser.default.msie && parseInt(_browser.default.version) <= 11) {
            var editor = component.getEditor(dataField);
            var activeElement = getActiveElement();
            if (editor.$element().find(activeElement).length) {
                (0, _dom.resetActiveElement)()
            }
        }
    };
    _proto._renderForm = function($container, options) {
        $container.addClass(FORM_CLASS);
        this._form = this._editorInstance._createComponent($container, _form.default, options)
    };
    _proto.show = function(formUserConfig) {
        if (this._popup.option("visible")) {
            return
        }
        this.deferred = new _deferred.Deferred;
        var formConfig = (0, _extend.extend)({}, formUserConfig);
        this._form.option(formConfig);
        this._popup.show();
        return this.deferred.promise()
    };
    _proto.hide = function(formData, event) {
        this.deferred.resolve(formData, event);
        this._popup.hide()
    };
    _proto.popupOption = function(optionName, optionValue) {
        return this._popup.option.apply(this._popup, arguments)
    };
    return FormDialog
}();
var _default = FormDialog;
exports.default = _default;
module.exports = exports.default;
