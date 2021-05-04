/**
 * DevExtreme (ui/diagram/ui.diagram.toolbar.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _toolbar = _interopRequireDefault(require("../toolbar"));
var _context_menu = _interopRequireDefault(require("../context_menu"));
var _diagram = _interopRequireDefault(require("./diagram.bar"));
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.panel"));
var _uiDiagram2 = _interopRequireDefault(require("./ui.diagram.menu_helper"));
var _diagram2 = require("./diagram.importer");
require("../select_box");
require("../color_box");
require("../check_box");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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
var ACTIVE_FORMAT_CLASS = "dx-format-active";
var DIAGRAM_TOOLBAR_CLASS = "dx-diagram-toolbar";
var DIAGRAM_TOOLBAR_SEPARATOR_CLASS = "dx-diagram-toolbar-separator";
var DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS = "dx-diagram-toolbar-menu-separator";
var DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS = "dx-diagram-mobile-toolbar-color-box-opened";
var DiagramToolbar = function(_DiagramPanel) {
    _inheritsLoose(DiagramToolbar, _DiagramPanel);

    function DiagramToolbar() {
        return _DiagramPanel.apply(this, arguments) || this
    }
    var _proto = DiagramToolbar.prototype;
    _proto._init = function() {
        this._commands = [];
        this._itemHelpers = {};
        this._commandContextMenus = {};
        this._contextMenuList = [];
        this._valueConverters = {};
        this.bar = new DiagramToolbarBar(this);
        this._createOnInternalCommand();
        this._createOnCustomCommand();
        this._createOnSubMenuVisibilityChangingAction();
        _DiagramPanel.prototype._init.call(this)
    };
    _proto._initMarkup = function() {
        _DiagramPanel.prototype._initMarkup.call(this);
        var isServerSide = !(0, _window.hasWindow)();
        if (!this.option("skipAdjustSize") && !isServerSide) {
            this.$element().width("")
        }
        this._commands = this._getCommands();
        this._itemHelpers = {};
        this._commandContextMenus = {};
        this._contextMenuList = [];
        var $toolbar = this._createMainElement();
        this._renderToolbar($toolbar);
        if (!this.option("skipAdjustSize") && !isServerSide) {
            var $toolbarContent = this.$element().find(".dx-toolbar-before");
            this.$element().width($toolbarContent.width())
        }
    };
    _proto._createMainElement = function() {
        return (0, _renderer.default)("<div>").addClass(DIAGRAM_TOOLBAR_CLASS).appendTo(this._$element)
    };
    _proto._getCommands = function() {
        return this.option("commands") || []
    };
    _proto._renderToolbar = function($toolbar) {
        var beforeCommands = this._commands.filter(function(command) {
            return ["after", "center"].indexOf(command.position) === -1
        });
        var centerCommands = this._commands.filter(function(command) {
            return "center" === command.position
        });
        var afterCommands = this._commands.filter(function(command) {
            return "after" === command.position
        });
        var dataSource = [].concat(this._prepareToolbarItems(beforeCommands, "before", this._executeCommand)).concat(this._prepareToolbarItems(centerCommands, "center", this._executeCommand)).concat(this._prepareToolbarItems(afterCommands, "after", this._executeCommand));
        this._toolbarInstance = this._createComponent($toolbar, _toolbar.default, {
            dataSource: dataSource
        })
    };
    _proto._prepareToolbarItems = function(items, location, actionHandler) {
        var _this = this;
        return items.map(function(item) {
            return (0, _extend.extend)(true, {
                location: location,
                locateInMenu: _this.option("locateInMenu")
            }, _this._createItem(item, location, actionHandler), _this._createItemOptions(item), _this._createItemActionOptions(item, actionHandler))
        })
    };
    _proto._createItem = function(item, location, actionHandler) {
        var _this2 = this;
        if (item.getCommandValue || item.getEditorValue || item.getEditorDisplayValue) {
            this._valueConverters[item.command] = {
                getCommandValue: item.getCommandValue,
                getEditorValue: item.getEditorValue,
                getEditorDisplayValue: item.getEditorDisplayValue
            }
        }
        if ("separator" === item.widget) {
            return {
                template: function(data, index, element) {
                    (0, _renderer.default)(element).addClass(DIAGRAM_TOOLBAR_SEPARATOR_CLASS)
                },
                menuItemTemplate: function(data, index, element) {
                    (0, _renderer.default)(element).addClass(DIAGRAM_TOOLBAR_MENU_SEPARATOR_CLASS)
                }
            }
        }
        return {
            widget: item.widget || "dxButton",
            cssClass: item.cssClass,
            options: {
                stylingMode: this.option("buttonStylingMode"),
                type: this.option("buttonType"),
                text: item.text,
                hint: item.hint,
                icon: item.icon || item.iconUnchecked || item.iconChecked,
                iconChecked: item.iconChecked,
                iconUnchecked: item.iconUnchecked,
                onInitialized: function(e) {
                    return _this2._onItemInitialized(e.component, item)
                },
                onContentReady: function(e) {
                    return _this2._onItemContentReady(e.component, item, actionHandler)
                }
            }
        }
    };
    _proto._createItemOptions = function(_ref) {
        var widget = _ref.widget,
            command = _ref.command,
            items = _ref.items,
            valueExpr = _ref.valueExpr,
            displayExpr = _ref.displayExpr,
            showText = _ref.showText,
            hint = _ref.hint,
            icon = _ref.icon;
        if ("dxSelectBox" === widget) {
            return this._createSelectBoxItemOptions(command, hint, items, valueExpr, displayExpr)
        } else {
            if ("dxTextBox" === widget) {
                return this._createTextBoxItemOptions(command, hint)
            } else {
                if ("dxColorBox" === widget) {
                    return this._createColorBoxItemOptions(command, hint, icon)
                } else {
                    if (!widget || "dxButton" === widget) {
                        return {
                            showText: showText || "inMenu"
                        }
                    }
                }
            }
        }
    };
    _proto._createSelectBoxItemOptions = function(command, hint, items, valueExpr, displayExpr) {
        var options = this._createTextEditorItemOptions(hint);
        options = (0, _extend.extend)(true, options, {
            options: {
                dataSource: items,
                displayExpr: displayExpr || "text",
                valueExpr: valueExpr || "value",
                dropDownOptions: {
                    container: this.option("container")
                }
            }
        });
        var isSelectButton = items && items.every(function(i) {
            return void 0 !== i.icon
        });
        if (isSelectButton) {
            options = (0, _extend.extend)(true, options, {
                options: {
                    fieldTemplate: function(data, container) {
                        (0, _renderer.default)("<i>").addClass(data && data.icon).appendTo(container);
                        (0, _renderer.default)("<div>").dxTextBox({
                            readOnly: true,
                            stylingMode: "outlined"
                        }).appendTo(container)
                    },
                    itemTemplate: function(data, index, container) {
                        (0, _renderer.default)(container).attr("title", data.hint);
                        return '<i class="'.concat(data.icon, '"></i>')
                    }
                }
            })
        }
        return options
    };
    _proto._createTextBoxItemOptions = function(command, hint) {
        var _this3 = this;
        var options = this._createTextEditorItemOptions(hint);
        options = (0, _extend.extend)(true, options, {
            options: {
                readOnly: true,
                focusStateEnabled: false,
                hoverStateEnabled: false,
                buttons: [{
                    name: "dropDown",
                    location: "after",
                    options: {
                        icon: "spindown",
                        disabled: false,
                        stylingMode: "text",
                        onClick: function(e) {
                            var contextMenu = _this3._commandContextMenus[command];
                            if (contextMenu) {
                                _this3._toggleContextMenu(contextMenu)
                            }
                        }
                    }
                }]
            }
        });
        return options
    };
    _proto._createColorBoxItemOptions = function(command, hint, icon) {
        var _this4 = this;
        var options = this._createTextEditorItemOptions(hint);
        if (icon) {
            options = (0, _extend.extend)(true, options, {
                options: {
                    openOnFieldClick: true,
                    fieldTemplate: function(data, container) {
                        (0, _renderer.default)("<i>").addClass(icon).css("borderBottomColor", data).appendTo(container);
                        (0, _renderer.default)("<div>").dxTextBox({
                            readOnly: true,
                            stylingMode: "outlined"
                        }).appendTo(container)
                    }
                }
            })
        }
        options = (0, _extend.extend)(true, options, {
            options: {
                dropDownOptions: {
                    container: this.option("container")
                },
                onOpened: function() {
                    if (_this4.option("isMobileView")) {
                        (0, _renderer.default)("body").addClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS)
                    }
                },
                onClosed: function() {
                    (0, _renderer.default)("body").removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS)
                }
            }
        });
        return options
    };
    _proto._createTextEditorItemOptions = function(hint) {
        return {
            options: {
                stylingMode: this.option("editorStylingMode"),
                hint: hint
            }
        }
    };
    _proto._createItemActionOptions = function(item, handler) {
        var _this5 = this;
        switch (item.widget) {
            case "dxSelectBox":
            case "dxColorBox":
            case "dxCheckBox":
                return {
                    options: {
                        onValueChanged: function(e) {
                            var parameter = _uiDiagram2.default.getItemCommandParameter(_this5, item, e.component.option("value"));
                            handler.call(_this5, item.command, item.name, parameter)
                        }
                    }
                };
            case "dxTextBox":
                return {};
            default:
                return {
                    options: {
                        onClick: function(e) {
                            if (!item.items) {
                                var parameter = _uiDiagram2.default.getItemCommandParameter(_this5, item);
                                handler.call(_this5, item.command, item.name, parameter)
                            } else {
                                var contextMenu = e.component._contextMenu;
                                if (contextMenu) {
                                    _this5._toggleContextMenu(contextMenu)
                                }
                            }
                        }
                    }
                }
        }
    };
    _proto._toggleContextMenu = function(contextMenu) {
        this._contextMenuList.forEach(function(cm) {
            if (contextMenu !== cm) {
                cm.hide()
            }
        });
        contextMenu.toggle()
    };
    _proto._onItemInitialized = function(widget, item) {
        this._addItemHelper(item.command, new DiagramToolbarItemHelper(widget))
    };
    _proto._onItemContentReady = function(widget, item, actionHandler) {
        var _this6 = this;
        var _getDiagram = (0, _diagram2.getDiagram)(),
            Browser = _getDiagram.Browser;
        if (("dxButton" === widget.NAME || "dxTextBox" === widget.NAME) && item.items) {
            var $menuContainer = (0, _renderer.default)("<div>").appendTo(this.$element());
            widget._contextMenu = this._createComponent($menuContainer, _context_menu.default, {
                items: item.items,
                target: widget.$element(),
                cssClass: _uiDiagram2.default.getContextMenuCssClass(),
                showEvent: "",
                closeOnOutsideClick: function(e) {
                    return !Browser.TouchUI && 0 === (0, _renderer.default)(e.target).closest(widget._contextMenu._dropDownButtonElement).length
                },
                focusStateEnabled: false,
                position: {
                    at: "left bottom"
                },
                itemTemplate: function(itemData, itemIndex, itemElement) {
                    _uiDiagram2.default.getContextMenuItemTemplate(this, itemData, itemIndex, itemElement)
                },
                onItemClick: function(_ref2) {
                    var component = _ref2.component,
                        itemData = _ref2.itemData;
                    _uiDiagram2.default.onContextMenuItemClick(_this6, itemData, actionHandler.bind(_this6));
                    if (!itemData.items || !itemData.items.length) {
                        component.hide()
                    }
                },
                onShowing: function(e) {
                    if (_this6._showingSubMenu) {
                        return
                    }
                    _this6._showingSubMenu = e.component;
                    _this6._onSubMenuVisibilityChangingAction({
                        visible: true,
                        component: _this6
                    });
                    e.component.option("items", e.component.option("items"));
                    delete _this6._showingSubMenu
                },
                onInitialized: function(_ref3) {
                    var component = _ref3.component;
                    return _this6._onContextMenuInitialized(component, item, widget)
                },
                onDisposing: function(_ref4) {
                    var component = _ref4.component;
                    return _this6._onContextMenuDisposing(component, item)
                }
            });
            if (!Browser.TouchUI) {
                widget._contextMenu._dropDownButtonElement = widget.$element();
                if ("dxTextBox" === widget.NAME) {
                    widget._contextMenu._dropDownButtonElement = widget.getButton("dropDown").element()
                }
            }
        }
    };
    _proto._onContextMenuInitialized = function(widget, item, rootWidget) {
        this._contextMenuList.push(widget);
        if (item.command) {
            this._commandContextMenus[item.command] = widget
        }
        this._addContextMenuHelper(item, widget, [], rootWidget)
    };
    _proto._addItemHelper = function(command, helper) {
        if (void 0 !== command) {
            if (this._itemHelpers[command]) {
                throw new Error("Toolbar cannot contain duplicated commands.")
            }
            this._itemHelpers[command] = helper
        }
    };
    _proto._addContextMenuHelper = function(item, widget, indexPath, rootWidget) {
        var _this7 = this;
        if (item.items) {
            item.items.forEach(function(subItem, index) {
                var itemIndexPath = indexPath.concat(index);
                _this7._addItemHelper(subItem.command, new DiagramToolbarSubItemHelper(widget, itemIndexPath, subItem.command, rootWidget));
                _this7._addContextMenuHelper(subItem, widget, itemIndexPath, rootWidget)
            })
        }
    };
    _proto._onContextMenuDisposing = function(widget, item) {
        this._contextMenuList.splice(this._contextMenuList.indexOf(widget), 1);
        delete this._commandContextMenus[item.command]
    };
    _proto._executeCommand = function(command, name, value) {
        if (this._updateLocked) {
            return
        }
        if ("number" === typeof command) {
            var valueConverter = this._valueConverters[command];
            if (valueConverter && valueConverter.getCommandValue) {
                value = valueConverter.getCommandValue(value)
            }
            this.bar.raiseBarCommandExecuted(command, value)
        } else {
            if ("string" === typeof command) {
                this._onInternalCommandAction({
                    command: command
                })
            }
        }
        if (void 0 !== name) {
            this._onCustomCommandAction({
                name: name
            })
        }
    };
    _proto._createOnInternalCommand = function() {
        this._onInternalCommandAction = this._createActionByOption("onInternalCommand")
    };
    _proto._createOnCustomCommand = function() {
        this._onCustomCommandAction = this._createActionByOption("onCustomCommand")
    };
    _proto._setItemEnabled = function(command, enabled) {
        if (command in this._itemHelpers) {
            var helper = this._itemHelpers[command];
            if (helper.canUpdate(this._showingSubMenu)) {
                helper.setEnabled(enabled)
            }
        }
    };
    _proto._setEnabled = function(enabled) {
        this._toolbarInstance.option("disabled", !enabled);
        this._contextMenuList.forEach(function(contextMenu) {
            contextMenu.option("disabled", !enabled)
        })
    };
    _proto._setItemValue = function(command, value) {
        try {
            this._updateLocked = true;
            if (command in this._itemHelpers) {
                var helper = this._itemHelpers[command];
                if (helper.canUpdate(this._showingSubMenu)) {
                    var valueConverter = this._valueConverters[command];
                    if (valueConverter && valueConverter.getEditorValue) {
                        value = valueConverter.getEditorValue(value)
                    }
                    var displayValue;
                    if (valueConverter && valueConverter.getEditorDisplayValue) {
                        displayValue = valueConverter.getEditorDisplayValue(value)
                    }
                    var contextMenu = this._commandContextMenus[command];
                    helper.setValue(value, displayValue, contextMenu, contextMenu && command)
                }
            }
        } finally {
            this._updateLocked = false
        }
    };
    _proto._setItemSubItems = function(command, items) {
        this._updateLocked = true;
        if (command in this._itemHelpers) {
            var helper = this._itemHelpers[command];
            if (helper.canUpdate(this._showingSubMenu)) {
                var contextMenu = this._commandContextMenus[command];
                helper.setItems(items, contextMenu, contextMenu && command)
            }
        }
        this._updateLocked = false
    };
    _proto._createOnSubMenuVisibilityChangingAction = function() {
        this._onSubMenuVisibilityChangingAction = this._createActionByOption("onSubMenuVisibilityChanging")
    };
    _proto._optionChanged = function(args) {
        switch (args.name) {
            case "isMobileView":
                (0, _renderer.default)("body").removeClass(DIAGRAM_MOBILE_TOOLBAR_COLOR_BOX_OPENED_CLASS);
                this._invalidate();
                break;
            case "onSubMenuVisibilityChanging":
                this._createOnSubMenuVisibilityChangingAction();
                break;
            case "onInternalCommand":
                this._createOnInternalCommand();
                break;
            case "onCustomCommand":
                this._createOnCustomCommand();
                break;
            case "container":
            case "commands":
                this._invalidate();
                break;
            case "export":
                break;
            default:
                _DiagramPanel.prototype._optionChanged.call(this, args)
        }
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_DiagramPanel.prototype._getDefaultOptions.call(this), {
            isMobileView: false,
            "export": {
                fileName: "Diagram",
                proxyUrl: void 0
            },
            locateInMenu: "auto",
            buttonStylingMode: "text",
            buttonType: "normal",
            editorStylingMode: "filled",
            skipAdjustSize: false
        })
    };
    _proto.setCommandChecked = function(command, checked) {
        this._setItemValue(command, checked)
    };
    _proto.setCommandEnabled = function(command, enabled) {
        this._setItemEnabled(command, enabled)
    };
    return DiagramToolbar
}(_uiDiagram.default);
var DiagramToolbarBar = function(_DiagramBar) {
    _inheritsLoose(DiagramToolbarBar, _DiagramBar);

    function DiagramToolbarBar() {
        return _DiagramBar.apply(this, arguments) || this
    }
    var _proto2 = DiagramToolbarBar.prototype;
    _proto2.getCommandKeys = function() {
        return this._getKeys(this._owner._commands)
    };
    _proto2.setItemValue = function(key, value) {
        this._owner._setItemValue(key, value)
    };
    _proto2.setItemEnabled = function(key, enabled) {
        this._owner._setItemEnabled(key, enabled)
    };
    _proto2.setEnabled = function(enabled) {
        this._owner._setEnabled(enabled)
    };
    _proto2.setItemSubItems = function(key, items) {
        this._owner._setItemSubItems(key, items)
    };
    return DiagramToolbarBar
}(_diagram.default);
var DiagramToolbarItemHelper = function() {
    function DiagramToolbarItemHelper(widget) {
        this._widget = widget
    }
    var _proto3 = DiagramToolbarItemHelper.prototype;
    _proto3.canUpdate = function(showingSubMenu) {
        return void 0 === showingSubMenu
    };
    _proto3.setEnabled = function(enabled) {
        this._widget.option("disabled", !enabled)
    };
    _proto3.setValue = function(value, displayValue, contextMenu, rootCommandKey) {
        if ("value" in this._widget.option()) {
            this._updateEditorValue(value, displayValue)
        } else {
            if (void 0 !== value) {
                this._updateButtonValue(value)
            }
        }
        if (contextMenu) {
            this._updateContextMenuItemValue(contextMenu, "", rootCommandKey, value)
        }
    };
    _proto3.setItems = function(items, contextMenu, rootCommandKey) {
        if (contextMenu) {
            this._updateContextMenuItems(contextMenu, "", rootCommandKey, items)
        } else {
            this._updateEditorItems(items)
        }
    };
    _proto3._updateContextMenuItems = function(contextMenu, itemOptionText, rootCommandKey, items) {
        _uiDiagram2.default.updateContextMenuItems(contextMenu, itemOptionText, rootCommandKey, items)
    };
    _proto3._updateEditorItems = function(items) {
        if ("items" in this._widget.option()) {
            this._widget.option("items", items.map(function(item) {
                return {
                    value: _uiDiagram2.default.getItemValue(item),
                    text: item.text
                }
            }))
        }
    };
    _proto3._updateEditorValue = function(value, displayValue) {
        this._widget.option("value", value);
        if (!this._widget.option("selectedItem") && displayValue) {
            this._widget.option("value", displayValue)
        }
    };
    _proto3._updateButtonValue = function(value) {
        if (this._widget.option("iconChecked") && this._widget.option("iconUnchecked")) {
            this._widget.option("icon", value ? this._widget.option("iconChecked") : this._widget.option("iconUnchecked"))
        } else {
            this._widget.$element().toggleClass(ACTIVE_FORMAT_CLASS, value)
        }
    };
    _proto3._updateContextMenuItemValue = function(contextMenu, itemOptionText, rootCommandKey, value) {
        _uiDiagram2.default.updateContextMenuItemValue(contextMenu, itemOptionText, rootCommandKey, value)
    };
    return DiagramToolbarItemHelper
}();
var DiagramToolbarSubItemHelper = function(_DiagramToolbarItemHe) {
    _inheritsLoose(DiagramToolbarSubItemHelper, _DiagramToolbarItemHe);

    function DiagramToolbarSubItemHelper(widget, indexPath, rootCommandKey, rootWidget) {
        var _this8;
        _this8 = _DiagramToolbarItemHe.call(this, widget) || this;
        _this8._indexPath = indexPath;
        _this8._rootCommandKey = rootCommandKey;
        _this8._rootWidget = rootWidget;
        return _this8
    }
    var _proto4 = DiagramToolbarSubItemHelper.prototype;
    _proto4.canUpdate = function(showingSubMenu) {
        return _DiagramToolbarItemHe.prototype.canUpdate.call(this, showingSubMenu) || showingSubMenu === this._widget
    };
    _proto4.setEnabled = function(enabled) {
        this._widget.option(this._getItemOptionText() + "disabled", !enabled);
        var rootEnabled = this._hasEnabledCommandItems(this._widget.option("items"));
        this._rootWidget.option("disabled", !rootEnabled)
    };
    _proto4._hasEnabledCommandItems = function(items) {
        var _this9 = this;
        if (items) {
            return items.some(function(item) {
                return void 0 !== item.command && !item.disabled || _this9._hasEnabledCommandItems(item.items)
            })
        }
        return false
    };
    _proto4.setValue = function(value) {
        this._updateContextMenuItemValue(this._widget, this._getItemOptionText(), this._rootCommandKey, value)
    };
    _proto4.setItems = function(items) {
        this._updateContextMenuItems(this._widget, this._getItemOptionText(), this._rootCommandKey, items)
    };
    _proto4._getItemOptionText = function() {
        return _uiDiagram2.default.getItemOptionText(this._widget, this._indexPath)
    };
    return DiagramToolbarSubItemHelper
}(DiagramToolbarItemHelper);
var _default = DiagramToolbar;
exports.default = _default;
module.exports = exports.default;
