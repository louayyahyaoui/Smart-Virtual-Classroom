/**
 * DevExtreme (ui/html_editor/modules/toolbar.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _toolbar = _interopRequireDefault(require("../../toolbar"));
require("../../select_box");
require("../../color_box/color_view");
require("../../number_box");
var _widget_collector = _interopRequireDefault(require("./widget_collector"));
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
var _message = _interopRequireDefault(require("../../../localization/message"));
var _inflector = require("../../../core/utils/inflector");
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _index = require("../../../events/utils/index");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
var ToolbarModule = {};
if (_devextremeQuill.default) {
    var BaseModule = _devextremeQuill.default.import("core/module");
    var TOOLBAR_WRAPPER_CLASS = "dx-htmleditor-toolbar-wrapper";
    var TOOLBAR_CLASS = "dx-htmleditor-toolbar";
    var TOOLBAR_FORMAT_WIDGET_CLASS = "dx-htmleditor-toolbar-format";
    var TOOLBAR_SEPARATOR_CLASS = "dx-htmleditor-toolbar-separator";
    var TOOLBAR_MENU_SEPARATOR_CLASS = "dx-htmleditor-toolbar-menu-separator";
    var ACTIVE_FORMAT_CLASS = "dx-format-active";
    var BOX_ITEM_CONTENT_CLASS = "dx-box-item-content";
    var ICON_CLASS = "dx-icon";
    var SELECTION_CHANGE_EVENT = "selection-change";
    var DIALOG_COLOR_CAPTION = "dxHtmlEditor-dialogColorCaption";
    var DIALOG_BACKGROUND_CAPTION = "dxHtmlEditor-dialogBackgroundCaption";
    var DIALOG_LINK_CAPTION = "dxHtmlEditor-dialogLinkCaption";
    var DIALOG_LINK_FIELD_URL = "dxHtmlEditor-dialogLinkUrlField";
    var DIALOG_LINK_FIELD_TEXT = "dxHtmlEditor-dialogLinkTextField";
    var DIALOG_LINK_FIELD_TARGET = "dxHtmlEditor-dialogLinkTargetField";
    var DIALOG_LINK_FIELD_TARGET_CLASS = "dx-formdialog-field-target";
    var DIALOG_IMAGE_CAPTION = "dxHtmlEditor-dialogImageCaption";
    var DIALOG_IMAGE_FIELD_URL = "dxHtmlEditor-dialogImageUrlField";
    var DIALOG_IMAGE_FIELD_ALT = "dxHtmlEditor-dialogImageAltField";
    var DIALOG_IMAGE_FIELD_WIDTH = "dxHtmlEditor-dialogImageWidthField";
    var DIALOG_IMAGE_FIELD_HEIGHT = "dxHtmlEditor-dialogImageHeightField";
    var DIALOG_TABLE_FIELD_COLUMNS = "dxHtmlEditor-dialogInsertTableRowsField";
    var DIALOG_TABLE_FIELD_ROWS = "dxHtmlEditor-dialogInsertTableColumnsField";
    var DIALOG_TABLE_CAPTION = "dxHtmlEditor-dialogInsertTableCaption";
    var TABLE_OPERATIONS = ["insertTable", "insertRowAbove", "insertRowBelow", "insertColumnLeft", "insertColumnRight", "deleteColumn", "deleteRow", "deleteTable"];
    var USER_ACTION = "user";
    var SILENT_ACTION = "silent";
    var HEADING_TEXT = _message.default.format("dxHtmlEditor-heading");
    var NORMAL_TEXT = _message.default.format("dxHtmlEditor-normalText");
    ToolbarModule = function(_BaseModule) {
        _inheritsLoose(ToolbarModule, _BaseModule);

        function ToolbarModule(quill, options) {
            var _this;
            _this = _BaseModule.call(this, quill, options) || this;
            _this._editorInstance = options.editorInstance;
            _this._toolbarWidgets = new _widget_collector.default;
            _this._formatHandlers = _this._getFormatHandlers();
            if ((0, _type.isDefined)(options.items)) {
                _this._addCallbacks();
                _this._renderToolbar();
                _this.quill.on("editor-change", function(eventName) {
                    var isSelectionChanged = eventName === SELECTION_CHANGE_EVENT;
                    _this._updateToolbar(isSelectionChanged)
                })
            }
            return _this
        }
        var _proto = ToolbarModule.prototype;
        _proto._applyFormat = function(formatArgs, event) {
            var _this$quill;
            this._editorInstance._saveValueChangeEvent(event);
            (_this$quill = this.quill).format.apply(_this$quill, _toConsumableArray(formatArgs))
        };
        _proto._addCallbacks = function() {
            this._editorInstance.addCleanCallback(this.clean.bind(this));
            this._editorInstance.addContentInitializedCallback(this.updateHistoryWidgets.bind(this))
        };
        _proto._updateToolbar = function(isSelectionChanged) {
            this.updateFormatWidgets(isSelectionChanged);
            this.updateHistoryWidgets();
            this.updateTableWidgets()
        };
        _proto._getDefaultClickHandler = function(formatName) {
            var _this2 = this;
            return function(_ref) {
                var event = _ref.event;
                var formats = _this2.quill.getFormat();
                var value = formats[formatName];
                var newValue = !((0, _type.isBoolean)(value) ? value : (0, _type.isDefined)(value));
                _this2._applyFormat([formatName, newValue, USER_ACTION], event);
                _this2._updateFormatWidget(formatName, newValue, formats)
            }
        };
        _proto._updateFormatWidget = function(formatName, isApplied, formats) {
            var widget = this._toolbarWidgets.getByName(formatName);
            if (!widget) {
                return
            }
            if (isApplied) {
                this._markActiveFormatWidget(formatName, widget, formats)
            } else {
                this._resetFormatWidget(formatName, widget);
                if (Object.prototype.hasOwnProperty.call(formatName)) {
                    delete formats[formatName]
                }
            }
            this._toggleClearFormatting(isApplied || !(0, _type.isEmptyObject)(formats))
        };
        _proto._getFormatHandlers = function() {
            var _this3 = this;
            return {
                clear: function(_ref2) {
                    var event = _ref2.event;
                    var range = _this3.quill.getSelection();
                    if (range) {
                        _this3._editorInstance._saveValueChangeEvent(event);
                        _this3.quill.removeFormat(range);
                        _this3.updateFormatWidgets()
                    }
                },
                link: this._prepareLinkHandler(),
                image: this._prepareImageHandler(),
                color: this._prepareColorClickHandler("color"),
                background: this._prepareColorClickHandler("background"),
                orderedList: this._prepareShortcutHandler("list", "ordered"),
                bulletList: this._prepareShortcutHandler("list", "bullet"),
                alignLeft: this._prepareShortcutHandler("align", "left"),
                alignCenter: this._prepareShortcutHandler("align", "center"),
                alignRight: this._prepareShortcutHandler("align", "right"),
                alignJustify: this._prepareShortcutHandler("align", "justify"),
                codeBlock: this._getDefaultClickHandler("code-block"),
                undo: function(_ref3) {
                    var event = _ref3.event;
                    _this3._editorInstance._saveValueChangeEvent(event);
                    _this3.quill.history.undo()
                },
                redo: function(_ref4) {
                    var event = _ref4.event;
                    _this3._editorInstance._saveValueChangeEvent(event);
                    _this3.quill.history.redo()
                },
                increaseIndent: function(_ref5) {
                    var event = _ref5.event;
                    _this3._applyFormat(["indent", "+1", USER_ACTION], event)
                },
                decreaseIndent: function(_ref6) {
                    var event = _ref6.event;
                    _this3._applyFormat(["indent", "-1", USER_ACTION], event)
                },
                superscript: this._prepareShortcutHandler("script", "super"),
                subscript: this._prepareShortcutHandler("script", "sub"),
                insertTable: this._prepareInsertTableHandler(),
                insertRowAbove: this._getTableOperationHandler("insertRowAbove"),
                insertRowBelow: this._getTableOperationHandler("insertRowBelow"),
                insertColumnLeft: this._getTableOperationHandler("insertColumnLeft"),
                insertColumnRight: this._getTableOperationHandler("insertColumnRight"),
                deleteColumn: this._getTableOperationHandler("deleteColumn"),
                deleteRow: this._getTableOperationHandler("deleteRow"),
                deleteTable: this._getTableOperationHandler("deleteTable")
            }
        };
        _proto._prepareShortcutHandler = function(formatName, shortcutValue) {
            var _this4 = this;
            return function(_ref7) {
                var event = _ref7.event;
                var formats = _this4.quill.getFormat();
                var value = formats[formatName] === shortcutValue ? false : shortcutValue;
                _this4._applyFormat([formatName, value, USER_ACTION], event);
                _this4.updateFormatWidgets(true)
            }
        };
        _proto._prepareLinkHandler = function() {
            var _this5 = this;
            return function() {
                _this5.quill.focus();
                var selection = _this5.quill.getSelection();
                var hasEmbedContent = _this5._hasEmbedContent(selection);
                var formats = selection ? _this5.quill.getFormat() : {};
                var formData = {
                    href: formats.link || "",
                    text: selection && !hasEmbedContent ? _this5.quill.getText(selection) : "",
                    target: Object.prototype.hasOwnProperty.call(formats, "target") ? !!formats.target : true
                };
                _this5._editorInstance.formDialogOption("title", _message.default.format(DIALOG_LINK_CAPTION));
                var promise = _this5._editorInstance.showFormDialog({
                    formData: formData,
                    items: _this5._getLinkFormItems(selection)
                });
                promise.done(function(formData, event) {
                    if (selection && !hasEmbedContent) {
                        var text = formData.text || formData.href;
                        var index = selection.index,
                            length = selection.length;
                        formData.text = void 0;
                        _this5._editorInstance._saveValueChangeEvent(event);
                        length && _this5.quill.deleteText(index, length, SILENT_ACTION);
                        _this5.quill.insertText(index, text, "link", formData, USER_ACTION);
                        _this5.quill.setSelection(index + text.length, 0, USER_ACTION)
                    } else {
                        formData.text = !selection && !formData.text ? formData.href : formData.text;
                        _this5._applyFormat(["link", formData, USER_ACTION], event)
                    }
                });
                promise.fail(function() {
                    _this5.quill.focus()
                })
            }
        };
        _proto._hasEmbedContent = function(selection) {
            return !!selection && this.quill.getText(selection).trim().length < selection.length
        };
        _proto._getLinkFormItems = function(selection) {
            return [{
                dataField: "href",
                label: {
                    text: _message.default.format(DIALOG_LINK_FIELD_URL)
                }
            }, {
                dataField: "text",
                label: {
                    text: _message.default.format(DIALOG_LINK_FIELD_TEXT)
                },
                visible: !this._hasEmbedContent(selection)
            }, {
                dataField: "target",
                editorType: "dxCheckBox",
                editorOptions: {
                    text: _message.default.format(DIALOG_LINK_FIELD_TARGET)
                },
                cssClass: DIALOG_LINK_FIELD_TARGET_CLASS,
                label: {
                    visible: false
                }
            }]
        };
        _proto._prepareImageHandler = function() {
            var _this6 = this;
            return function() {
                var formData = _this6.quill.getFormat();
                var isUpdateDialog = Object.prototype.hasOwnProperty.call(formData, "imageSrc");
                var defaultIndex = _this6._defaultPasteIndex;
                if (isUpdateDialog) {
                    var _this6$quill$getForma = _this6.quill.getFormat(defaultIndex - 1, 1),
                        imageSrc = _this6$quill$getForma.imageSrc;
                    formData.src = formData.imageSrc;
                    delete formData.imageSrc;
                    if (!imageSrc || 0 === defaultIndex) {
                        _this6.quill.setSelection(defaultIndex + 1, 0, SILENT_ACTION)
                    }
                }
                var formatIndex = _this6._embedFormatIndex;
                _this6._editorInstance.formDialogOption("title", _message.default.format(DIALOG_IMAGE_CAPTION));
                var promise = _this6._editorInstance.showFormDialog({
                    formData: formData,
                    items: _this6._imageFormItems
                });
                promise.done(function(formData, event) {
                    var index = defaultIndex;
                    _this6._editorInstance._saveValueChangeEvent(event);
                    if (isUpdateDialog) {
                        index = formatIndex;
                        _this6.quill.deleteText(index, 1, SILENT_ACTION)
                    }
                    _this6.quill.insertEmbed(index, "extendedImage", formData, USER_ACTION);
                    _this6.quill.setSelection(index + 1, 0, USER_ACTION)
                }).always(function() {
                    _this6.quill.focus()
                })
            }
        };
        _proto._prepareInsertTableHandler = function() {
            var _this7 = this;
            return function() {
                var formats = _this7.quill.getFormat();
                var isTableFocused = Object.prototype.hasOwnProperty.call(formats, "table");
                var formData = {
                    rows: 1,
                    columns: 1
                };
                if (isTableFocused) {
                    _this7.quill.focus();
                    return
                }
                _this7._editorInstance.formDialogOption("title", _message.default.format(DIALOG_TABLE_CAPTION));
                var promise = _this7._editorInstance.showFormDialog({
                    formData: formData,
                    items: _this7._insertTableFormItems
                });
                promise.done(function(formData, event) {
                    _this7.quill.focus();
                    var table = _this7.quill.getModule("table");
                    if (table) {
                        _this7._editorInstance._saveValueChangeEvent(event);
                        var columns = formData.columns,
                            rows = formData.rows;
                        table.insertTable(columns, rows)
                    }
                }).always(function() {
                    _this7.quill.focus()
                })
            }
        };
        _proto._getTableOperationHandler = function(operationName) {
            var _this8 = this;
            for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                rest[_key - 1] = arguments[_key]
            }
            return function() {
                var table = _this8.quill.getModule("table");
                if (!table) {
                    return
                }
                _this8.quill.focus();
                return table[operationName].apply(table, rest)
            }
        };
        _proto._renderToolbar = function() {
            var _this9 = this;
            var container = this.options.container || this._getContainer();
            this._$toolbar = (0, _renderer.default)("<div>").addClass(TOOLBAR_CLASS).appendTo(container);
            this._$toolbarContainer = (0, _renderer.default)(container).addClass(TOOLBAR_WRAPPER_CLASS);
            _events_engine.default.on(this._$toolbarContainer, (0, _index.addNamespace)("mousedown", this._editorInstance.NAME), function(e) {
                e.preventDefault()
            });
            this.toolbarInstance = this._editorInstance._createComponent(this._$toolbar, _toolbar.default, this.toolbarConfig);
            this._editorInstance.on("optionChanged", function(_ref8) {
                var name = _ref8.name;
                if ("readOnly" === name || "disabled" === name) {
                    _this9.toolbarInstance.option("disabled", _this9.isInteractionDisabled)
                }
            })
        };
        _proto.isMultilineMode = function() {
            var _this$options$multili;
            return null !== (_this$options$multili = this.options.multiline) && void 0 !== _this$options$multili ? _this$options$multili : true
        };
        _proto.clean = function() {
            this._toolbarWidgets.clear();
            if (this._$toolbarContainer) {
                this._$toolbarContainer.empty().removeClass(TOOLBAR_WRAPPER_CLASS)
            }
        };
        _proto.repaint = function() {
            this.toolbarInstance && this.toolbarInstance.repaint()
        };
        _proto._getContainer = function() {
            var $container = (0, _renderer.default)("<div>");
            this._editorInstance.$element().prepend($container);
            return $container
        };
        _proto._prepareToolbarItems = function() {
            var _this10 = this;
            var resultItems = [];
            (0, _iterator.each)(this.options.items, function(index, item) {
                var newItem;
                if ((0, _type.isObject)(item)) {
                    newItem = _this10._handleObjectItem(item)
                } else {
                    if ((0, _type.isString)(item)) {
                        var buttonItemConfig = _this10._prepareButtonItemConfig(item);
                        newItem = _this10._getToolbarItem(buttonItemConfig)
                    }
                }
                if (newItem) {
                    resultItems.push(newItem)
                }
            });
            return resultItems
        };
        _proto._handleObjectItem = function(item) {
            if (item.formatName && item.formatValues && this._isAcceptableItem(item.widget, "dxSelectBox")) {
                var selectItemConfig = this._prepareSelectItemConfig(item);
                return this._getToolbarItem(selectItemConfig)
            } else {
                if (item.formatName && this._isAcceptableItem(item.widget, "dxButton")) {
                    var defaultButtonItemConfig = this._prepareButtonItemConfig(item.formatName);
                    var buttonItemConfig = (0, _extend.extend)(true, defaultButtonItemConfig, item);
                    return this._getToolbarItem(buttonItemConfig)
                } else {
                    return this._getToolbarItem(item)
                }
            }
        };
        _proto._isAcceptableItem = function(widget, acceptableWidgetName) {
            return !widget || widget === acceptableWidgetName
        };
        _proto._prepareButtonItemConfig = function(formatName) {
            var iconName = "clear" === formatName ? "clearformat" : formatName;
            var buttonText = (0, _inflector.titleize)(formatName);
            return {
                widget: "dxButton",
                formatName: formatName,
                options: {
                    hint: buttonText,
                    text: buttonText,
                    icon: iconName.toLowerCase(),
                    onClick: this._formatHandlers[formatName] || this._getDefaultClickHandler(formatName),
                    stylingMode: "text"
                },
                showText: "inMenu"
            }
        };
        _proto._prepareSelectItemConfig = function(item) {
            var _this11 = this;
            return (0, _extend.extend)(true, {
                widget: "dxSelectBox",
                formatName: item.formatName,
                options: {
                    stylingMode: "filled",
                    dataSource: item.formatValues,
                    placeholder: (0, _inflector.titleize)(item.formatName),
                    onValueChanged: function(e) {
                        if (!_this11._isReset) {
                            _this11._applyFormat([item.formatName, e.value, USER_ACTION], e.event);
                            _this11._setValueSilent(e.component, e.value)
                        }
                    }
                }
            }, item)
        };
        _proto._prepareColorClickHandler = function(formatName) {
            var _this12 = this;
            return function() {
                var formData = _this12.quill.getFormat();
                var caption = "color" === formatName ? DIALOG_COLOR_CAPTION : DIALOG_BACKGROUND_CAPTION;
                _this12._editorInstance.formDialogOption("title", _message.default.format(caption));
                var promise = _this12._editorInstance.showFormDialog({
                    formData: formData,
                    items: [{
                        dataField: formatName,
                        editorType: "dxColorView",
                        editorOptions: {
                            onContentReady: function(e) {
                                (0, _renderer.default)(e.element).closest(".".concat(BOX_ITEM_CONTENT_CLASS)).css("flexBasis", "auto")
                            },
                            focusStateEnabled: false
                        },
                        label: {
                            visible: false
                        }
                    }]
                });
                promise.done(function(formData, event) {
                    _this12._applyFormat([formatName, formData[formatName], USER_ACTION], event)
                });
                promise.fail(function() {
                    _this12.quill.focus()
                })
            }
        };
        _proto._getToolbarItem = function(item) {
            var _this13 = this;
            var baseItem = {
                options: {
                    onInitialized: function(e) {
                        if (item.formatName) {
                            e.component.$element().addClass(TOOLBAR_FORMAT_WIDGET_CLASS);
                            e.component.$element().toggleClass("dx-".concat(item.formatName.toLowerCase(), "-format"), !!item.formatName);
                            _this13._toolbarWidgets.add(item.formatName, e.component)
                        }
                    }
                }
            };
            var multilineItem = this.isMultilineMode() ? {
                location: "before",
                locateInMenu: "never"
            } : {};
            return (0, _extend.extend)(true, {
                location: "before",
                locateInMenu: "auto"
            }, this._getDefaultConfig(item.formatName), item, baseItem, multilineItem)
        };
        _proto._getDefaultItemsConfig = function() {
            return {
                header: {
                    options: {
                        displayExpr: function(item) {
                            var isHeaderValue = (0, _type.isDefined)(item) && false !== item;
                            return isHeaderValue ? "".concat(HEADING_TEXT, " ").concat(item) : NORMAL_TEXT
                        }
                    }
                },
                clear: {
                    options: {
                        disabled: true
                    }
                },
                undo: {
                    options: {
                        disabled: true
                    }
                },
                redo: {
                    options: {
                        disabled: true
                    }
                },
                insertRowAbove: {
                    options: {
                        disabled: true
                    }
                },
                insertRowBelow: {
                    options: {
                        disabled: true
                    }
                },
                insertColumnLeft: {
                    options: {
                        disabled: true
                    }
                },
                insertColumnRight: {
                    options: {
                        disabled: true
                    }
                },
                deleteRow: {
                    options: {
                        disabled: true
                    }
                },
                deleteColumn: {
                    options: {
                        disabled: true
                    }
                },
                deleteTable: {
                    options: {
                        disabled: true
                    }
                },
                separator: {
                    template: function(data, index, element) {
                        (0, _renderer.default)(element).addClass(TOOLBAR_SEPARATOR_CLASS)
                    },
                    menuItemTemplate: function(data, index, element) {
                        (0, _renderer.default)(element).addClass(TOOLBAR_MENU_SEPARATOR_CLASS)
                    }
                }
            }
        };
        _proto._getDefaultConfig = function(formatName) {
            return this._getDefaultItemsConfig()[formatName]
        };
        _proto.updateHistoryWidgets = function() {
            var historyModule = this.quill.history;
            if (!historyModule) {
                return
            }
            var _historyModule$stack = historyModule.stack,
                undoOps = _historyModule$stack.undo,
                redoOps = _historyModule$stack.redo;
            this._updateManipulationWidget(this._toolbarWidgets.getByName("undo"), Boolean(undoOps.length));
            this._updateManipulationWidget(this._toolbarWidgets.getByName("redo"), Boolean(redoOps.length))
        };
        _proto.updateTableWidgets = function() {
            var _this$quill$getFormat, _this14 = this;
            var table = this.quill.getModule("table");
            if (!table) {
                return
            }
            var selection = this.quill.getSelection();
            var isTableOperationsEnabled = selection && Boolean(null === (_this$quill$getFormat = this.quill.getFormat(selection)) || void 0 === _this$quill$getFormat ? void 0 : _this$quill$getFormat.table);
            TABLE_OPERATIONS.forEach(function(operationName) {
                var isInsertTable = "insertTable" === operationName;
                var widget = _this14._toolbarWidgets.getByName(operationName);
                _this14._updateManipulationWidget(widget, isInsertTable ? !isTableOperationsEnabled : isTableOperationsEnabled)
            })
        };
        _proto._updateManipulationWidget = function(widget, isOperationEnabled) {
            if (!widget) {
                return
            }
            widget.option("disabled", !isOperationEnabled)
        };
        _proto.updateFormatWidgets = function(isResetRequired) {
            var selection = this.quill.getSelection();
            if (!selection) {
                return
            }
            var formats = this.quill.getFormat(selection);
            var hasFormats = !(0, _type.isEmptyObject)(formats);
            if (!hasFormats || isResetRequired) {
                this._resetFormatWidgets()
            }
            for (var formatName in formats) {
                var widgetName = this._getFormatWidgetName(formatName, formats);
                var formatWidget = this._toolbarWidgets.getByName(widgetName) || this._toolbarWidgets.getByName(formatName);
                if (!formatWidget) {
                    continue
                }
                this._markActiveFormatWidget(formatName, formatWidget, formats)
            }
            this._toggleClearFormatting(hasFormats || selection.length > 1)
        };
        _proto._markActiveFormatWidget = function(name, widget, formats) {
            if (this._isColorFormat(name)) {
                this._updateColorWidget(name, formats[name])
            }
            if ("value" in widget.option()) {
                this._setValueSilent(widget, formats[name])
            } else {
                widget.$element().addClass(ACTIVE_FORMAT_CLASS)
            }
        };
        _proto._toggleClearFormatting = function(hasFormats) {
            var clearWidget = this._toolbarWidgets.getByName("clear");
            if (clearWidget) {
                clearWidget.option("disabled", !hasFormats)
            }
        };
        _proto._isColorFormat = function(formatName) {
            return "color" === formatName || "background" === formatName
        };
        _proto._updateColorWidget = function(formatName, color) {
            var formatWidget = this._toolbarWidgets.getByName(formatName);
            if (!formatWidget) {
                return
            }
            formatWidget.$element().find(".".concat(ICON_CLASS)).css("borderBottomColor", color || "transparent")
        };
        _proto._getFormatWidgetName = function(formatName, formats) {
            var widgetName;
            switch (formatName) {
                case "align":
                    widgetName = formatName + (0, _inflector.titleize)(formats[formatName]);
                    break;
                case "list":
                    widgetName = formats[formatName] + (0, _inflector.titleize)(formatName);
                    break;
                case "code-block":
                    widgetName = "codeBlock";
                    break;
                case "script":
                    widgetName = formats[formatName] + formatName;
                    break;
                case "imageSrc":
                    widgetName = "image";
                    break;
                default:
                    widgetName = formatName
            }
            return widgetName
        };
        _proto._setValueSilent = function(widget, value) {
            this._isReset = true;
            widget.option("value", value);
            this._isReset = false
        };
        _proto._resetFormatWidgets = function() {
            var _this15 = this;
            this._toolbarWidgets.each(function(name, widget) {
                _this15._resetFormatWidget(name, widget)
            })
        };
        _proto._resetFormatWidget = function(name, widget) {
            widget.$element().removeClass(ACTIVE_FORMAT_CLASS);
            if (this._isColorFormat(name)) {
                this._updateColorWidget(name)
            }
            if ("clear" === name) {
                widget.option("disabled", true)
            }
            if ("dxSelectBox" === widget.NAME) {
                this._setValueSilent(widget, null)
            }
        };
        _proto.addClickHandler = function(formatName, handler) {
            this._formatHandlers[formatName] = handler;
            var formatWidget = this._toolbarWidgets.getByName(formatName);
            if (formatWidget && "dxButton" === formatWidget.NAME) {
                formatWidget.option("onClick", handler)
            }
        };
        _createClass(ToolbarModule, [{
            key: "_insertTableFormItems",
            get: function() {
                return [{
                    dataField: "columns",
                    editorType: "dxNumberBox",
                    editorOptions: {
                        min: 1
                    },
                    label: {
                        text: _message.default.format(DIALOG_TABLE_FIELD_COLUMNS)
                    }
                }, {
                    dataField: "rows",
                    editorType: "dxNumberBox",
                    editorOptions: {
                        min: 1
                    },
                    label: {
                        text: _message.default.format(DIALOG_TABLE_FIELD_ROWS)
                    }
                }]
            }
        }, {
            key: "_embedFormatIndex",
            get: function() {
                var selection = this.quill.getSelection();
                if (selection) {
                    if (selection.length) {
                        return selection.index
                    } else {
                        return selection.index - 1
                    }
                } else {
                    return this.quill.getLength()
                }
            }
        }, {
            key: "_defaultPasteIndex",
            get: function() {
                var _selection$index;
                var selection = this.quill.getSelection();
                return null !== (_selection$index = null === selection || void 0 === selection ? void 0 : selection.index) && void 0 !== _selection$index ? _selection$index : this.quill.getLength()
            }
        }, {
            key: "_imageFormItems",
            get: function() {
                return [{
                    dataField: "src",
                    label: {
                        text: _message.default.format(DIALOG_IMAGE_FIELD_URL)
                    }
                }, {
                    dataField: "width",
                    label: {
                        text: _message.default.format(DIALOG_IMAGE_FIELD_WIDTH)
                    }
                }, {
                    dataField: "height",
                    label: {
                        text: _message.default.format(DIALOG_IMAGE_FIELD_HEIGHT)
                    }
                }, {
                    dataField: "alt",
                    label: {
                        text: _message.default.format(DIALOG_IMAGE_FIELD_ALT)
                    }
                }]
            }
        }, {
            key: "toolbarConfig",
            get: function() {
                return {
                    dataSource: this._prepareToolbarItems(),
                    disabled: this.isInteractionDisabled,
                    menuContainer: this._$toolbarContainer,
                    multiline: this.isMultilineMode()
                }
            }
        }, {
            key: "isInteractionDisabled",
            get: function() {
                return this._editorInstance.option("readOnly") || this._editorInstance.option("disabled")
            }
        }]);
        return ToolbarModule
    }(BaseModule)
}
var _default = ToolbarModule;
exports.default = _default;
module.exports = exports.default;
