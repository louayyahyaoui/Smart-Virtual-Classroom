/**
 * DevExtreme (ui/tooltip/tooltip.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _extend = require("../../core/utils/extend");
var _popover = _interopRequireDefault(require("../popover"));
var _type = require("../../core/utils/type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var TOOLTIP_CLASS = "dx-tooltip";
var TOOLTIP_WRAPPER_CLASS = "dx-tooltip-wrapper";
var Tooltip = _popover.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            toolbarItems: [],
            showCloseButton: false,
            showTitle: false,
            title: null,
            titleTemplate: null,
            onTitleRendered: null,
            bottomTemplate: null,
            propagateOutsideClick: true
        })
    },
    _render: function() {
        this.$element().addClass(TOOLTIP_CLASS);
        this._wrapper().addClass(TOOLTIP_WRAPPER_CLASS);
        this.callBase()
    },
    _renderContent: function() {
        this.callBase();
        this._contentId = "dx-" + new _guid.default;
        this._$content.attr({
            id: this._contentId,
            role: "tooltip"
        });
        this._toggleAriaDescription(true)
    },
    _toggleAriaDescription: function(showing) {
        var $target = (0, _renderer.default)(this.option("target"));
        var label = showing ? this._contentId : void 0;
        if (!(0, _type.isWindow)($target.get(0))) {
            this.setAria("describedby", label, $target)
        }
    }
});
(0, _component_registrator.default)("dxTooltip", Tooltip);
var _default = Tooltip;
exports.default = _default;
module.exports = exports.default;
