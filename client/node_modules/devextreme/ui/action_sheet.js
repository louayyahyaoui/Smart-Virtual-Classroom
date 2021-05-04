/**
 * DevExtreme (ui/action_sheet.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _window = require("../core/utils/window");
var _common = require("../core/utils/common");
var _message = _interopRequireDefault(require("../localization/message"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _button = _interopRequireDefault(require("./button"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));
var _popup = _interopRequireDefault(require("./popup"));
var _popover = _interopRequireDefault(require("./popover"));
var _bindable_template = require("../core/templates/bindable_template");
var _deferred = require("../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var ACTION_SHEET_CLASS = "dx-actionsheet";
var ACTION_SHEET_CONTAINER_CLASS = "dx-actionsheet-container";
var ACTION_SHEET_POPUP_WRAPPER_CLASS = "dx-actionsheet-popup-wrapper";
var ACTION_SHEET_POPOVER_WRAPPER_CLASS = "dx-actionsheet-popover-wrapper";
var ACTION_SHEET_CANCEL_BUTTON_CLASS = "dx-actionsheet-cancel";
var ACTION_SHEET_ITEM_CLASS = "dx-actionsheet-item";
var ACTION_SHEET_ITEM_DATA_KEY = "dxActionSheetItemData";
var ACTION_SHEET_WITHOUT_TITLE_CLASS = "dx-actionsheet-without-title";
var ActionSheet = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            usePopover: false,
            target: null,
            title: "",
            showTitle: true,
            showCancelButton: true,
            cancelText: _message.default.format("Cancel"),
            onCancelClick: null,
            visible: false,
            noDataText: "",
            focusStateEnabled: false,
            selectionByClick: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios",
                tablet: true
            },
            options: {
                usePopover: true
            }
        }])
    },
    _initTemplates: function() {
        this.callBase();
        this._templateManager.addDefaultTemplates({
            item: new _bindable_template.BindableTemplate(function($container, data) {
                var button = new _button.default((0, _renderer.default)("<div>"), (0, _extend.extend)({
                    onClick: data && data.click
                }, data));
                $container.append(button.$element())
            }, ["disabled", "icon", "text", "type", "onClick", "click"], this.option("integrationOptions.watchMethod"))
        })
    },
    _itemContainer: function() {
        return this._$itemContainer
    },
    _itemClass: function() {
        return ACTION_SHEET_ITEM_CLASS
    },
    _itemDataKey: function() {
        return ACTION_SHEET_ITEM_DATA_KEY
    },
    _toggleVisibility: _common.noop,
    _renderDimensions: _common.noop,
    _initMarkup: function() {
        this.callBase();
        this.$element().addClass(ACTION_SHEET_CLASS);
        this._createItemContainer()
    },
    _render: function() {
        this._renderPopup()
    },
    _createItemContainer: function() {
        this._$itemContainer = (0, _renderer.default)("<div>").addClass(ACTION_SHEET_CONTAINER_CLASS);
        this._renderDisabled()
    },
    _renderDisabled: function() {
        this._$itemContainer.toggleClass("dx-state-disabled", this.option("disabled"))
    },
    _renderPopup: function() {
        this._$popup = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._isPopoverMode() ? this._createPopover() : this._createPopup();
        this._renderPopupTitle();
        this._mapPopupOption("visible")
    },
    _mapPopupOption: function(optionName) {
        this._popup && this._popup.option(optionName, this.option(optionName))
    },
    _isPopoverMode: function() {
        return this.option("usePopover") && this.option("target")
    },
    _renderPopupTitle: function() {
        this._mapPopupOption("showTitle");
        this._popup && this._popup._wrapper().toggleClass(ACTION_SHEET_WITHOUT_TITLE_CLASS, !this.option("showTitle"))
    },
    _clean: function() {
        if (this._$popup) {
            this._$popup.remove()
        }
        this.callBase()
    },
    _overlayConfig: function() {
        return {
            onInitialized: function(args) {
                this._popup = args.component
            }.bind(this),
            disabled: false,
            showTitle: true,
            title: this.option("title"),
            deferRendering: !window.angular,
            onContentReady: this._popupContentReadyAction.bind(this),
            onHidden: this.hide.bind(this)
        }
    },
    _createPopover: function() {
        this._createComponent(this._$popup, _popover.default, (0, _extend.extend)(this._overlayConfig(), {
            width: this.option("width") || 200,
            height: this.option("height") || "auto",
            target: this.option("target")
        }));
        this._popup._wrapper().addClass(ACTION_SHEET_POPOVER_WRAPPER_CLASS)
    },
    _createPopup: function() {
        this._createComponent(this._$popup, _popup.default, (0, _extend.extend)(this._overlayConfig(), {
            dragEnabled: false,
            width: this.option("width") || "100%",
            height: this.option("height") || "auto",
            showCloseButton: false,
            position: {
                my: "bottom",
                at: "bottom",
                of: window
            },
            animation: {
                show: {
                    type: "slide",
                    duration: 400,
                    from: {
                        position: {
                            my: "top",
                            at: "bottom",
                            of: window
                        }
                    },
                    to: {
                        position: {
                            my: "bottom",
                            at: "bottom",
                            of: window
                        }
                    }
                },
                hide: {
                    type: "slide",
                    duration: 400,
                    from: {
                        position: {
                            my: "bottom",
                            at: "bottom",
                            of: window
                        }
                    },
                    to: {
                        position: {
                            my: "top",
                            at: "bottom",
                            of: window
                        }
                    }
                }
            }
        }));
        this._popup._wrapper().addClass(ACTION_SHEET_POPUP_WRAPPER_CLASS)
    },
    _popupContentReadyAction: function() {
        this._popup.$content().append(this._$itemContainer);
        this._attachClickEvent();
        this._attachHoldEvent();
        this._prepareContent();
        this._renderContent();
        this._renderCancelButton()
    },
    _renderCancelButton: function() {
        if (this._isPopoverMode()) {
            return
        }
        if (this._$cancelButton) {
            this._$cancelButton.remove()
        }
        if (this.option("showCancelButton")) {
            var cancelClickAction = this._createActionByOption("onCancelClick") || _common.noop;
            var that = this;
            this._$cancelButton = (0, _renderer.default)("<div>").addClass(ACTION_SHEET_CANCEL_BUTTON_CLASS).appendTo(this._popup && this._popup.$content());
            this._createComponent(this._$cancelButton, _button.default, {
                disabled: false,
                text: this.option("cancelText"),
                onClick: function(e) {
                    var hidingArgs = {
                        event: e,
                        cancel: false
                    };
                    cancelClickAction(hidingArgs);
                    if (!hidingArgs.cancel) {
                        that.hide()
                    }
                },
                integrationOptions: {}
            })
        }
    },
    _attachItemClickEvent: _common.noop,
    _itemClickHandler: function(e) {
        this.callBase(e);
        if (!(0, _renderer.default)(e.target).is(".dx-state-disabled, .dx-state-disabled *")) {
            this.hide()
        }
    },
    _itemHoldHandler: function(e) {
        this.callBase(e);
        if (!(0, _renderer.default)(e.target).is(".dx-state-disabled, .dx-state-disabled *")) {
            this.hide()
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "width":
            case "height":
            case "visible":
            case "title":
                this._mapPopupOption(args.name);
                break;
            case "disabled":
                this._renderDisabled();
                break;
            case "showTitle":
                this._renderPopupTitle();
                break;
            case "showCancelButton":
            case "onCancelClick":
            case "cancelText":
                this._renderCancelButton();
                break;
            case "target":
            case "usePopover":
            case "items":
                this._invalidate();
                break;
            default:
                this.callBase(args)
        }
    },
    toggle: function(showing) {
        var that = this;
        var d = new _deferred.Deferred;
        that._popup.toggle(showing).done(function() {
            that.option("visible", showing);
            d.resolveWith(that)
        });
        return d.promise()
    },
    show: function() {
        return this.toggle(true)
    },
    hide: function() {
        return this.toggle(false)
    }
});
(0, _component_registrator.default)("dxActionSheet", ActionSheet);
var _default = ActionSheet;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
