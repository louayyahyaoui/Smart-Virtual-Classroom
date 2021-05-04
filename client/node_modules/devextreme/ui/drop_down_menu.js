/**
 * DevExtreme (ui/drop_down_menu.js)
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
var _devices = _interopRequireDefault(require("../core/devices"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _extend = require("../core/utils/extend");
var _ui = _interopRequireDefault(require("./widget/ui.widget"));
var _button = _interopRequireDefault(require("./button"));
var _popover = _interopRequireDefault(require("./popover"));
var _data_helper = _interopRequireDefault(require("../data_helper"));
var _list = _interopRequireDefault(require("./list"));
var _themes = require("./themes");
var _child_default_template = require("../core/templates/child_default_template");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var DROP_DOWN_MENU_CLASS = "dx-dropdownmenu";
var DROP_DOWN_MENU_POPUP_CLASS = "dx-dropdownmenu-popup";
var DROP_DOWN_MENU_POPUP_WRAPPER_CLASS = "dx-dropdownmenu-popup-wrapper";
var DROP_DOWN_MENU_LIST_CLASS = "dx-dropdownmenu-list";
var DROP_DOWN_MENU_BUTTON_CLASS = "dx-dropdownmenu-button";
var POPUP_OPTION_MAP = {
    popupWidth: "width",
    popupHeight: "height",
    popupMaxHeight: "maxHeight",
    popupAutoResizeEnabled: "autoResizeEnabled"
};
var BUTTON_OPTION_MAP = {
    buttonIcon: "icon",
    buttonText: "text",
    buttonWidth: "width",
    buttonHeight: "height",
    buttonTemplate: "template"
};
var DropDownMenu = _ui.default.inherit({
    _supportedKeys: function() {
        var extension = {};
        if (!this.option("opened") || !this._list.option("focusedElement")) {
            extension = this._button._supportedKeys()
        }
        return (0, _extend.extend)(this.callBase(), extension, {
            tab: function() {
                this._popup && this._popup.hide()
            }
        })
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            items: [],
            onItemClick: null,
            dataSource: null,
            itemTemplate: "item",
            buttonText: "",
            buttonIcon: "overflow",
            buttonWidth: void 0,
            buttonHeight: void 0,
            buttonTemplate: "content",
            onButtonClick: null,
            usePopover: false,
            popupWidth: "auto",
            popupHeight: "auto",
            activeStateEnabled: true,
            hoverStateEnabled: true,
            opened: false,
            selectionMode: "none",
            selectedItemKeys: [],
            deferRendering: false,
            popupPosition: {
                my: "top center",
                at: "bottom center",
                collision: "fit flip",
                offset: {
                    v: 1
                }
            },
            popupAnimation: void 0,
            onItemRendered: null,
            menuWidget: _list.default,
            popupMaxHeight: void 0,
            closeOnClick: true,
            useInkRipple: false,
            container: void 0,
            popupAutoResizeEnabled: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "ios"
            },
            options: {
                usePopover: true
            }
        }, {
            device: {
                platform: "generic"
            },
            options: {
                popupPosition: {
                    offset: {
                        v: 4
                    }
                }
            }
        }, {
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }, {
            device: {
                platform: "android"
            },
            options: {
                popupPosition: {
                    my: "top " + (this.option("rtlEnabled") ? "left" : "right"),
                    at: "top " + (this.option("rtlEnabled") ? "left" : "right"),
                    collision: "flipfit"
                },
                popupAnimation: {
                    show: {
                        type: "pop",
                        duration: 200,
                        from: {
                            scale: 0
                        },
                        to: {
                            scale: 1
                        }
                    },
                    hide: {
                        type: "pop",
                        duration: 200,
                        from: {
                            scale: 1
                        },
                        to: {
                            scale: 0
                        }
                    }
                }
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                useInkRipple: true
            }
        }])
    },
    _initOptions: function(options) {
        if ("android" === _devices.default.current().platform) {
            if (!options.popupPosition) {
                options.popupPosition = {
                    at: (options.usePopover ? "bottom " : "top ") + (options.rtlEnabled ? "left" : "right")
                }
            }
        }
        this.callBase(options)
    },
    _dataSourceOptions: function() {
        return {
            paginate: false
        }
    },
    _init: function() {
        this.callBase();
        this.$element().addClass(DROP_DOWN_MENU_CLASS);
        this._initDataSource();
        this._initItemClickAction();
        this._initButtonClickAction()
    },
    _initItemClickAction: function() {
        this._itemClickAction = this._createActionByOption("onItemClick")
    },
    _initButtonClickAction: function() {
        this._buttonClickAction = this._createActionByOption("onButtonClick")
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates({
            content: new _child_default_template.ChildDefaultTemplate("content")
        });
        this.callBase()
    },
    _initMarkup: function() {
        this._renderButton();
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this.setAria({
            role: "menubar",
            haspopup: true,
            expanded: this.option("opened")
        })
    },
    _renderContentImpl: function() {
        if (this.option("opened")) {
            this._renderPopup()
        }
    },
    _clean: function() {
        this._cleanFocusState();
        if (this._popup) {
            this._popup.$element().remove();
            delete this._$popup
        }
    },
    _renderButton: function() {
        var $button = this.$element().addClass(DROP_DOWN_MENU_BUTTON_CLASS);
        var config = this._buttonOptions();
        this._button = this._createComponent($button, _button.default, config)
    },
    _toggleActiveState: function($element, value, e) {
        this._button._toggleActiveState($element, value, e)
    },
    _buttonOptions: function() {
        return {
            text: this.option("buttonText"),
            icon: this.option("buttonIcon"),
            width: this.option("buttonWidth"),
            height: this.option("buttonHeight"),
            useInkRipple: this.option("useInkRipple"),
            template: this.option("buttonTemplate"),
            focusStateEnabled: false,
            onClick: function(e) {
                this.option("opened", !this.option("opened"));
                this._buttonClickAction(e)
            }.bind(this)
        }
    },
    _toggleMenuVisibility: function(opened) {
        var state = void 0 === opened ? !this._popup.option("visible") : opened;
        if (opened) {
            this._renderPopup()
        }
        this._popup.toggle(state);
        this.setAria("expanded", state)
    },
    _renderPopup: function() {
        if (this._$popup) {
            return
        }
        var $popup = this._$popup = (0, _renderer.default)("<div>").appendTo(this.$element());
        var config = this._popupOptions();
        this._popup = this._createComponent($popup, _popover.default, config)
    },
    _popupOptions: function() {
        var usePopup = !this.option("usePopover");
        return {
            onInitialized: function(args) {
                args.component._wrapper().addClass(DROP_DOWN_MENU_POPUP_WRAPPER_CLASS).toggleClass(DROP_DOWN_MENU_POPUP_CLASS, usePopup)
            },
            visible: this.option("opened"),
            deferRendering: false,
            contentTemplate: function(contentElement) {
                this._renderList(contentElement)
            }.bind(this),
            position: this.option("popupPosition"),
            animation: this.option("popupAnimation"),
            onOptionChanged: function(args) {
                if ("visible" === args.name) {
                    this.option("opened", args.value)
                }
            }.bind(this),
            target: this.$element(),
            height: this.option("popupHeight"),
            width: this.option("popupWidth"),
            maxHeight: this.option("popupMaxHeight"),
            container: this.option("container"),
            autoResizeEnabled: this.option("popupAutoResizeEnabled")
        }
    },
    _renderList: function(contentElement) {
        var $content = (0, _renderer.default)(contentElement);
        var listConfig = this._listOptions();
        $content.addClass(DROP_DOWN_MENU_LIST_CLASS);
        this._list = this._createComponent($content, this.option("menuWidget"), listConfig);
        this._list._getAriaTarget = function() {
            return this.$element()
        }.bind(this);
        this._setListDataSource();
        var listMaxHeight = .5 * (0, _renderer.default)(window).height();
        if ($content.height() > listMaxHeight) {
            $content.height(listMaxHeight)
        }
    },
    _listOptions: function() {
        return {
            pageLoadMode: "scrollBottom",
            indicateLoading: false,
            noDataText: "",
            selectionMode: this.option("selectionMode"),
            selectedItemKeys: this.option("selectedItemKeys"),
            itemTemplate: this.option("itemTemplate"),
            onItemClick: function(e) {
                if (this.option("closeOnClick")) {
                    this.option("opened", false)
                }
                this._itemClickAction(e)
            }.bind(this),
            tabIndex: -1,
            focusStateEnabled: this.option("focusStateEnabled"),
            activeStateEnabled: this.option("activeStateEnabled"),
            onItemRendered: this.option("onItemRendered"),
            _itemAttributes: {
                role: "menuitem"
            }
        }
    },
    _setListDataSource: function() {
        if (this._list) {
            this._list.option("dataSource", this._dataSource || this.option("items"))
        }
        delete this._deferRendering
    },
    _getKeyboardListeners: function() {
        return this.callBase().concat([this._list])
    },
    _toggleVisibility: function(visible) {
        this.callBase(visible);
        this._button.option("visible", visible)
    },
    _optionChanged: function(args) {
        var name = args.name;
        var value = args.value;
        switch (name) {
            case "items":
            case "dataSource":
                if (this.option("deferRendering") && !this.option("opened")) {
                    this._deferRendering = true
                } else {
                    this._refreshDataSource();
                    this._setListDataSource()
                }
                break;
            case "itemTemplate":
                if (this._list) {
                    this._list.option(name, this._getTemplate(value))
                }
                break;
            case "onItemClick":
                this._initItemClickAction();
                break;
            case "onButtonClick":
                this._buttonClickAction();
                break;
            case "buttonIcon":
            case "buttonText":
            case "buttonWidth":
            case "buttonHeight":
            case "buttonTemplate":
                this._button.option(BUTTON_OPTION_MAP[name], value);
                this._renderPopup();
                break;
            case "popupWidth":
            case "popupHeight":
            case "popupMaxHeight":
            case "popupAutoResizeEnabled":
                this._popup.option(POPUP_OPTION_MAP[name], value);
                break;
            case "usePopover":
            case "menuWidget":
            case "useInkRipple":
                this._invalidate();
                break;
            case "focusStateEnabled":
            case "activeStateEnabled":
                if (this._list) {
                    this._list.option(name, value)
                }
                this.callBase(args);
                break;
            case "selectionMode":
            case "selectedItemKeys":
            case "onItemRendered":
                if (this._list) {
                    this._list.option(name, value)
                }
                break;
            case "opened":
                if (this._deferRendering) {
                    this._refreshDataSource();
                    this._setListDataSource()
                }
                this._toggleMenuVisibility(value);
                break;
            case "deferRendering":
            case "popupPosition":
            case "closeOnClick":
                break;
            case "container":
                this._popup && this._popup.option(args.name, args.value);
                break;
            default:
                this.callBase(args)
        }
    },
    open: function() {
        this.option("opened", true)
    },
    close: function() {
        this.option("opened", false)
    }
}).include(_data_helper.default);
(0, _component_registrator.default)("dxDropDownMenu", DropDownMenu);
var _default = DropDownMenu;
exports.default = _default;
module.exports = exports.default;
