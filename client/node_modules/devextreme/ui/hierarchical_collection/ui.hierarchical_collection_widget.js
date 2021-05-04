/**
 * DevExtreme (ui/hierarchical_collection/ui.hierarchical_collection_widget.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _data = require("../../core/utils/data");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _icon = require("../../core/utils/icon");
var _ui = _interopRequireDefault(require("./ui.data_adapter"));
var _uiCollection_widget = _interopRequireDefault(require("../collection/ui.collection_widget.edit"));
var _bindable_template = require("../../core/templates/bindable_template");
var _type = require("../../core/utils/type");
var _common = require("../../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DISABLED_STATE_CLASS = "dx-state-disabled";
var HierarchicalCollectionWidget = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            keyExpr: "id",
            displayExpr: "text",
            selectedExpr: "selected",
            disabledExpr: "disabled",
            itemsExpr: "items",
            hoverStateEnabled: true,
            parentIdExpr: "parentId",
            expandedExpr: "expanded"
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return "desktop" === _devices.default.real().deviceType && !_devices.default.isSimulator()
            },
            options: {
                focusStateEnabled: true
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._initAccessors();
        this._initDataAdapter();
        this._initDynamicTemplates()
    },
    _initDataSource: function() {
        this.callBase();
        this._dataSource && this._dataSource.paginate(false)
    },
    _initDataAdapter: function() {
        var accessors = this._createDataAdapterAccessors();
        this._dataAdapter = new _ui.default((0, _extend.extend)({
            dataAccessors: {
                getters: accessors.getters,
                setters: accessors.setters
            },
            items: this.option("items")
        }, this._getDataAdapterOptions()))
    },
    _getDataAdapterOptions: _common.noop,
    _initDynamicTemplates: function() {
        var that = this;
        this._templateManager.addDefaultTemplates({
            item: new _bindable_template.BindableTemplate(function($container, itemData) {
                $container.html(itemData.html).append(this._getIconContainer(itemData)).append(this._getTextContainer(itemData)).append(this._getPopoutContainer(itemData));
                that._addContentClasses(itemData, $container.parent())
            }.bind(this), ["text", "html", "items", "icon"], this.option("integrationOptions.watchMethod"), {
                text: this._displayGetter,
                items: this._itemsGetter
            })
        })
    },
    _getIconContainer: function(itemData) {
        return itemData.icon ? (0, _icon.getImageContainer)(itemData.icon) : void 0
    },
    _getTextContainer: function(itemData) {
        return (0, _renderer.default)("<span>").text(itemData.text)
    },
    _getPopoutContainer: _common.noop,
    _addContentClasses: _common.noop,
    _initAccessors: function() {
        var that = this;
        (0, _iterator.each)(this._getAccessors(), function(_, accessor) {
            that._compileAccessor(accessor)
        });
        this._compileDisplayGetter()
    },
    _getAccessors: function() {
        return ["key", "selected", "items", "disabled", "parentId", "expanded"]
    },
    _getChildNodes: function(node) {
        var that = this;
        var arr = [];
        (0, _iterator.each)(node.internalFields.childrenKeys, function(_, key) {
            var childNode = that._dataAdapter.getNodeByKey(key);
            arr.push(childNode)
        });
        return arr
    },
    _hasChildren: function(node) {
        return node && node.internalFields.childrenKeys.length
    },
    _compileAccessor: function(optionName) {
        var getter = "_" + optionName + "Getter";
        var setter = "_" + optionName + "Setter";
        var optionExpr = this.option(optionName + "Expr");
        if (!optionExpr) {
            this[getter] = _common.noop;
            this[setter] = _common.noop;
            return
        } else {
            if ((0, _type.isFunction)(optionExpr)) {
                this[setter] = function(obj, value) {
                    obj[optionExpr()] = value
                };
                this[getter] = function(obj) {
                    return obj[optionExpr()]
                };
                return
            }
        }
        this[getter] = (0, _data.compileGetter)(optionExpr);
        this[setter] = (0, _data.compileSetter)(optionExpr)
    },
    _createDataAdapterAccessors: function() {
        var that = this;
        var accessors = {
            getters: {},
            setters: {}
        };
        (0, _iterator.each)(this._getAccessors(), function(_, accessor) {
            var getterName = "_" + accessor + "Getter";
            var setterName = "_" + accessor + "Setter";
            var newAccessor = "parentId" === accessor ? "parentKey" : accessor;
            accessors.getters[newAccessor] = that[getterName];
            accessors.setters[newAccessor] = that[setterName]
        });
        accessors.getters.display = !this._displayGetter ? function(itemData) {
            return itemData.text
        } : this._displayGetter;
        return accessors
    },
    _initMarkup: function() {
        this.callBase();
        this._addWidgetClass()
    },
    _addWidgetClass: function() {
        this._focusTarget().addClass(this._widgetClass())
    },
    _widgetClass: _common.noop,
    _renderItemFrame: function(index, itemData) {
        var $itemFrame = this.callBase.apply(this, arguments);
        $itemFrame.toggleClass(DISABLED_STATE_CLASS, !!this._disabledGetter(itemData));
        return $itemFrame
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "displayExpr":
            case "keyExpr":
                this._initAccessors();
                this._initDynamicTemplates();
                this.repaint();
                break;
            case "itemsExpr":
            case "selectedExpr":
            case "disabledExpr":
            case "expandedExpr":
            case "parentIdExpr":
                this._initAccessors();
                this._initDataAdapter();
                this.repaint();
                break;
            case "items":
                this._initDataAdapter();
                this.callBase(args);
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = HierarchicalCollectionWidget;
exports.default = _default;
module.exports = exports.default;
