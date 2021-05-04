/**
 * DevExtreme (ui/grid_core/ui.grid_core.filter_builder.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _extend = require("../../core/utils/extend");
var _filter_builder = _interopRequireDefault(require("./../filter_builder"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _scroll_view = _interopRequireDefault(require("./../scroll_view"));
var _popup = _interopRequireDefault(require("./../popup"));
var _accessibility = require("../shared/accessibility");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var FilterBuilderView = _uiGrid_core.default.View.inherit({
    _renderCore: function() {
        this._updatePopupOptions()
    },
    _updatePopupOptions: function() {
        if (this.option("filterBuilderPopup.visible")) {
            this._initPopup()
        } else {
            if (this._filterBuilderPopup) {
                this._filterBuilderPopup.hide()
            }
        }
    },
    _disposePopup: function() {
        if (this._filterBuilderPopup) {
            this._filterBuilderPopup.dispose();
            this._filterBuilderPopup = void 0
        }
        if (this._filterBuilder) {
            this._filterBuilder.dispose();
            this._filterBuilder = void 0
        }
    },
    _initPopup: function() {
        var that = this;
        that._disposePopup();
        that._filterBuilderPopup = that._createComponent(that.element(), _popup.default, (0, _extend.extend)({
            title: _message.default.format("dxDataGrid-filterBuilderPopupTitle"),
            contentTemplate: function($contentElement) {
                return that._getPopupContentTemplate($contentElement)
            },
            onOptionChanged: function(args) {
                if ("visible" === args.name) {
                    that.option("filterBuilderPopup.visible", args.value)
                }
            },
            toolbarItems: that._getPopupToolbarItems()
        }, that.option("filterBuilderPopup"), {
            onHidden: function(e) {
                (0, _accessibility.restoreFocus)(that);
                that._disposePopup()
            }
        }))
    },
    _getPopupContentTemplate: function(contentElement) {
        var $contentElement = (0, _renderer.default)(contentElement);
        var $filterBuilderContainer = (0, _renderer.default)("<div>").appendTo((0, _renderer.default)(contentElement));
        this._filterBuilder = this._createComponent($filterBuilderContainer, _filter_builder.default, (0, _extend.extend)({
            value: this.option("filterValue"),
            fields: this.getController("columns").getFilteringColumns()
        }, this.option("filterBuilder"), {
            customOperations: this.getController("filterSync").getCustomFilterOperations()
        }));
        this._createComponent($contentElement, _scroll_view.default, {
            direction: "both"
        })
    },
    _getPopupToolbarItems: function() {
        var that = this;
        return [{
            toolbar: "bottom",
            location: "after",
            widget: "dxButton",
            options: {
                text: _message.default.format("OK"),
                onClick: function(e) {
                    var filter = that._filterBuilder.option("value");
                    that.option("filterValue", filter);
                    that._filterBuilderPopup.hide()
                }
            }
        }, {
            toolbar: "bottom",
            location: "after",
            widget: "dxButton",
            options: {
                text: _message.default.format("Cancel"),
                onClick: function(e) {
                    that._filterBuilderPopup.hide()
                }
            }
        }]
    },
    optionChanged: function(args) {
        switch (args.name) {
            case "filterBuilder":
            case "filterBuilderPopup":
                this._invalidate();
                args.handled = true;
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = {
    defaultOptions: function() {
        return {
            filterBuilder: {
                groupOperationDescriptions: {
                    and: _message.default.format("dxFilterBuilder-and"),
                    or: _message.default.format("dxFilterBuilder-or"),
                    notAnd: _message.default.format("dxFilterBuilder-notAnd"),
                    notOr: _message.default.format("dxFilterBuilder-notOr")
                },
                filterOperationDescriptions: {
                    between: _message.default.format("dxFilterBuilder-filterOperationBetween"),
                    equal: _message.default.format("dxFilterBuilder-filterOperationEquals"),
                    notEqual: _message.default.format("dxFilterBuilder-filterOperationNotEquals"),
                    lessThan: _message.default.format("dxFilterBuilder-filterOperationLess"),
                    lessThanOrEqual: _message.default.format("dxFilterBuilder-filterOperationLessOrEquals"),
                    greaterThan: _message.default.format("dxFilterBuilder-filterOperationGreater"),
                    greaterThanOrEqual: _message.default.format("dxFilterBuilder-filterOperationGreaterOrEquals"),
                    startsWith: _message.default.format("dxFilterBuilder-filterOperationStartsWith"),
                    contains: _message.default.format("dxFilterBuilder-filterOperationContains"),
                    notContains: _message.default.format("dxFilterBuilder-filterOperationNotContains"),
                    endsWith: _message.default.format("dxFilterBuilder-filterOperationEndsWith"),
                    isBlank: _message.default.format("dxFilterBuilder-filterOperationIsBlank"),
                    isNotBlank: _message.default.format("dxFilterBuilder-filterOperationIsNotBlank")
                }
            },
            filterBuilderPopup: {}
        }
    },
    views: {
        filterBuilderView: FilterBuilderView
    }
};
exports.default = _default;
module.exports = exports.default;
