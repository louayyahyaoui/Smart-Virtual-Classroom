/**
 * DevExtreme (ui/list/ui.list.edit.decorator.reorder.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _extend = require("../../core/utils/extend");
var _index = require("../../events/utils/index");
var _uiListEdit = require("./ui.list.edit.decorator_registry");
var _uiListEdit2 = _interopRequireDefault(require("./ui.list.edit.decorator"));
var _sortable = _interopRequireDefault(require("../sortable"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var REORDER_HANDLE_CONTAINER_CLASS = "dx-list-reorder-handle-container";
var REORDER_HANDLE_CLASS = "dx-list-reorder-handle";
var REORDERING_ITEM_GHOST_CLASS = "dx-list-item-ghost-reordering";
var STATE_HOVER_CLASS = "dx-state-hover";
(0, _uiListEdit.register)("reorder", "default", _uiListEdit2.default.inherit({
    _init: function() {
        var list = this._list;
        this._groupedEnabled = this._list.option("grouped");
        this._lockedDrag = false;
        var filter = this._groupedEnabled ? "> .dx-list-group > .dx-list-group-body > .dx-list-item" : "> .dx-list-item";
        this._sortable = list._createComponent(list._scrollView.content(), _sortable.default, (0, _extend.extend)({
            component: list,
            contentTemplate: null,
            allowReordering: false,
            filter: filter,
            container: list.$element(),
            dragDirection: list.option("itemDragging.group") ? "both" : "vertical",
            handle: ".".concat(REORDER_HANDLE_CLASS),
            dragTemplate: this._dragTemplate,
            onDragStart: this._dragStartHandler.bind(this),
            onDragChange: this._dragChangeHandler.bind(this),
            onReorder: this._reorderHandler.bind(this)
        }, list.option("itemDragging")))
    },
    afterRender: function() {
        this._sortable.update()
    },
    _dragTemplate: function(e) {
        return (0, _renderer.default)(e.itemElement).clone().width((0, _renderer.default)(e.itemElement).width()).addClass(REORDERING_ITEM_GHOST_CLASS).addClass(STATE_HOVER_CLASS)
    },
    _dragStartHandler: function(e) {
        if (this._lockedDrag) {
            e.cancel = true;
            return
        }
    },
    _dragChangeHandler: function(e) {
        if (this._groupedEnabled && !this._sameParent(e.fromIndex, e.toIndex)) {
            e.cancel = true;
            return
        }
    },
    _sameParent: function(fromIndex, toIndex) {
        var $dragging = this._list.getItemElementByFlatIndex(fromIndex);
        var $over = this._list.getItemElementByFlatIndex(toIndex);
        return $over.parent().get(0) === $dragging.parent().get(0)
    },
    _reorderHandler: function(e) {
        var $targetElement = this._list.getItemElementByFlatIndex(e.toIndex);
        this._list.reorderItem((0, _renderer.default)(e.itemElement), $targetElement)
    },
    afterBag: function(config) {
        var _this = this;
        var $handle = (0, _renderer.default)("<div>").addClass(REORDER_HANDLE_CLASS);
        _events_engine.default.on($handle, "dxpointerdown", function(e) {
            _this._lockedDrag = !(0, _index.isMouseEvent)(e)
        });
        _events_engine.default.on($handle, "dxhold", {
            timeout: 30
        }, function(e) {
            e.cancel = true;
            _this._lockedDrag = false
        });
        config.$container.addClass(REORDER_HANDLE_CONTAINER_CLASS).append($handle)
    }
}));
