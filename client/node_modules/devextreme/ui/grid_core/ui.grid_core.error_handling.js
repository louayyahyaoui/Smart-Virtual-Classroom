/**
 * DevExtreme (ui/grid_core/ui.grid_core.error_handling.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _click = require("../../events/click");
var _iterator = require("../../core/utils/iterator");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ERROR_ROW_CLASS = "dx-error-row";
var ERROR_MESSAGE_CLASS = "dx-error-message";
var ERROR_CLOSEBUTTON_CLASS = "dx-closebutton";
var ACTION_CLASS = "action";
var ErrorHandlingController = _uiGrid_core.default.ViewController.inherit({
    init: function() {
        var that = this;
        that._columnHeadersView = that.getView("columnHeadersView");
        that._rowsView = that.getView("rowsView")
    },
    _createErrorRow: function(error, $tableElements) {
        var that = this;
        var $errorRow;
        var $closeButton;
        var $errorMessage = this._renderErrorMessage(error);
        if ($tableElements) {
            $errorRow = (0, _renderer.default)("<tr>").addClass(ERROR_ROW_CLASS);
            $closeButton = (0, _renderer.default)("<div>").addClass(ERROR_CLOSEBUTTON_CLASS).addClass(that.addWidgetPrefix(ACTION_CLASS));
            _events_engine.default.on($closeButton, _click.name, that.createAction(function(args) {
                var e = args.event;
                var $errorRow;
                var errorRowIndex = (0, _renderer.default)(e.currentTarget).closest("." + ERROR_ROW_CLASS).index();
                e.stopPropagation();
                (0, _iterator.each)($tableElements, function(_, tableElement) {
                    $errorRow = (0, _renderer.default)(tableElement).children("tbody").children("tr").eq(errorRowIndex);
                    that.removeErrorRow($errorRow)
                });
                that.getController("resizing") && that.getController("resizing").fireContentReadyAction()
            }));
            (0, _renderer.default)("<td>").attr({
                colSpan: that.getController("columns").getVisibleColumns().length,
                role: "presentation"
            }).prepend($closeButton).append($errorMessage).appendTo($errorRow);
            return $errorRow
        }
        return $errorMessage
    },
    _renderErrorMessage: function(error) {
        var message = error.url ? error.message.replace(error.url, "") : error.message || error;
        var $message = (0, _renderer.default)("<div>").addClass(ERROR_MESSAGE_CLASS).text(message);
        if (error.url) {
            (0, _renderer.default)("<a>").attr("href", error.url).text(error.url).appendTo($message)
        }
        return $message
    },
    renderErrorRow: function(error, rowIndex, $popupContent) {
        var that = this;
        var $errorMessageElement;
        var $firstErrorRow;
        if ($popupContent) {
            $popupContent.find("." + ERROR_MESSAGE_CLASS).remove();
            $errorMessageElement = that._createErrorRow(error);
            $popupContent.prepend($errorMessageElement);
            return $errorMessageElement
        }
        var viewElement = rowIndex >= 0 || !that._columnHeadersView.isVisible() ? that._rowsView : that._columnHeadersView;
        var $tableElements = $popupContent || viewElement.getTableElements();
        (0, _iterator.each)($tableElements, function(_, tableElement) {
            $errorMessageElement = that._createErrorRow(error, $tableElements);
            $firstErrorRow = $firstErrorRow || $errorMessageElement;
            if (rowIndex >= 0) {
                var $row = viewElement._getRowElements((0, _renderer.default)(tableElement)).eq(rowIndex);
                that.removeErrorRow($row.next());
                $errorMessageElement.insertAfter($row)
            } else {
                var $tbody = (0, _renderer.default)(tableElement).children("tbody");
                var rowElements = $tbody.children("tr");
                if (that._columnHeadersView.isVisible()) {
                    that.removeErrorRow(rowElements.last());
                    (0, _renderer.default)(tableElement).append($errorMessageElement)
                } else {
                    that.removeErrorRow(rowElements.first());
                    $tbody.first().prepend($errorMessageElement)
                }
            }
        });
        if (!$popupContent) {
            var resizingController = that.getController("resizing");
            resizingController && resizingController.fireContentReadyAction()
        }
        return $firstErrorRow
    },
    removeErrorRow: function($row) {
        if (!$row) {
            var $columnHeaders = this._columnHeadersView && this._columnHeadersView.element();
            $row = $columnHeaders && $columnHeaders.find("." + ERROR_ROW_CLASS);
            if (!$row || !$row.length) {
                var $rowsViewElement = this._rowsView.element();
                $row = $rowsViewElement && $rowsViewElement.find("." + ERROR_ROW_CLASS)
            }
        }
        $row && $row.hasClass(ERROR_ROW_CLASS) && $row.remove()
    },
    optionChanged: function(args) {
        var that = this;
        switch (args.name) {
            case "errorRowEnabled":
                args.handled = true;
                break;
            default:
                that.callBase(args)
        }
    }
});
var _default = {
    defaultOptions: function() {
        return {
            errorRowEnabled: true
        }
    },
    controllers: {
        errorHandling: ErrorHandlingController
    },
    extenders: {
        controllers: {
            data: {
                init: function() {
                    var that = this;
                    var errorHandlingController = that.getController("errorHandling");
                    that.callBase();
                    that.dataErrorOccurred.add(function(error, $popupContent) {
                        if (that.option("errorRowEnabled")) {
                            errorHandlingController.renderErrorRow(error, void 0, $popupContent)
                        }
                    });
                    that.changed.add(function(e) {
                        if (e && "loadError" === e.changeType) {
                            return
                        }
                        var errorHandlingController = that.getController("errorHandling");
                        var editingController = that.getController("editing");
                        if (editingController && !editingController.hasChanges()) {
                            errorHandlingController && errorHandlingController.removeErrorRow()
                        }
                    })
                }
            }
        }
    }
};
exports.default = _default;
module.exports = exports.default;
