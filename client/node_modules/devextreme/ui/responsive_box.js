/**
 * DevExtreme (ui/responsive_box.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
var _window = require("../core/utils/window");
var _iterator = require("../core/utils/iterator");
var _extend = require("../core/utils/extend");
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _box = _interopRequireDefault(require("./box"));
var _uiCollection_widget = _interopRequireDefault(require("./collection/ui.collection_widget.edit"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var RESPONSIVE_BOX_CLASS = "dx-responsivebox";
var SCREEN_SIZE_CLASS_PREFIX = RESPONSIVE_BOX_CLASS + "-screen-";
var BOX_ITEM_CLASS = "dx-box-item";
var BOX_ITEM_DATA_KEY = "dxBoxItemData";
var HD_SCREEN_WIDTH = 1920;
var ResponsiveBox = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            rows: [],
            cols: [],
            screenByWidth: null,
            singleColumnScreen: "",
            height: "100%",
            width: "100%",
            activeStateEnabled: false,
            focusStateEnabled: false,
            onItemStateChanged: void 0,
            onLayoutChanged: null,
            currentScreenFactor: void 0,
            _layoutStrategy: void 0
        })
    },
    _init: function() {
        if (!this.option("screenByWidth")) {
            this._options.silent("screenByWidth", _window.defaultScreenFactorFunc)
        }
        this.callBase();
        this._initLayoutChangedAction()
    },
    _initLayoutChangedAction: function() {
        this._layoutChangedAction = this._createActionByOption("onLayoutChanged", {
            excludeValidators: ["disabled", "readonly"]
        })
    },
    _itemClass: function() {
        return BOX_ITEM_CLASS
    },
    _itemDataKey: function() {
        return BOX_ITEM_DATA_KEY
    },
    _initMarkup: function() {
        this.callBase();
        this.$element().addClass(RESPONSIVE_BOX_CLASS);
        this._updateRootBox()
    },
    _updateRootBox: function() {
        clearTimeout(this._updateTimer);
        this._updateTimer = setTimeout(function() {
            if (this._$root) {
                _events_engine.default.triggerHandler(this._$root, "dxupdate")
            }
        }.bind(this))
    },
    _renderItems: function() {
        this._setScreenSize();
        this._screenItems = this._itemsByScreen();
        this._prepareGrid();
        this._spreadItems();
        this._layoutItems();
        this._linkNodeToItem()
    },
    _itemOptionChanged: function(item) {
        var $item = this._findItemElementByItem(item);
        if (!$item.length) {
            return
        }
        this._refreshItem($item, item);
        this._clearItemNodeTemplates();
        this._update(true)
    },
    _setScreenSize: function() {
        var currentScreen = this._getCurrentScreen();
        this._removeScreenSizeClass();
        this.$element().addClass(SCREEN_SIZE_CLASS_PREFIX + currentScreen);
        this.option("currentScreenFactor", currentScreen)
    },
    _removeScreenSizeClass: function() {
        var currentScreenFactor = this.option("currentScreenFactor");
        currentScreenFactor && this.$element().removeClass(SCREEN_SIZE_CLASS_PREFIX + currentScreenFactor)
    },
    _prepareGrid: function() {
        var grid = this._grid = [];
        this._prepareRowsAndCols();
        (0, _iterator.each)(this._rows, function() {
            var row = [];
            grid.push(row);
            (0, _iterator.each)(this._cols, function() {
                row.push(this._createEmptyCell())
            }.bind(this))
        }.bind(this))
    },
    getSingleColumnRows: function() {
        var rows = this.option("rows");
        var screenItemsLength = this._screenItems.length;
        if (rows.length) {
            var filteredRows = this._filterByScreen(rows);
            var result = [];
            for (var i = 0; i < screenItemsLength; i++) {
                var sizeConfig = this._defaultSizeConfig();
                if (i < filteredRows.length && (0, _type.isDefined)(filteredRows[i].shrink)) {
                    sizeConfig.shrink = filteredRows[i].shrink
                }
                result.push(sizeConfig)
            }
            return result
        } else {
            return this._defaultSizeConfig(screenItemsLength)
        }
    },
    _prepareRowsAndCols: function() {
        if (this._isSingleColumnScreen()) {
            this._prepareSingleColumnScreenItems();
            this._rows = this.getSingleColumnRows();
            this._cols = this._defaultSizeConfig(1)
        } else {
            this._rows = this._sizesByScreen(this.option("rows"));
            this._cols = this._sizesByScreen(this.option("cols"))
        }
    },
    _isSingleColumnScreen: function() {
        return this._screenRegExp().test(this.option("singleColumnScreen")) || !this.option("rows").length || !this.option("cols").length
    },
    _prepareSingleColumnScreenItems: function() {
        this._screenItems.sort(function(item1, item2) {
            return item1.location.row - item2.location.row || item1.location.col - item2.location.col
        });
        (0, _iterator.each)(this._screenItems, function(index, item) {
            (0, _extend.extend)(item.location, {
                row: index,
                col: 0,
                rowspan: 1,
                colspan: 1
            })
        })
    },
    _sizesByScreen: function(sizeConfigs) {
        return (0, _iterator.map)(this._filterByScreen(sizeConfigs), function(sizeConfig) {
            return (0, _extend.extend)(this._defaultSizeConfig(), sizeConfig)
        }.bind(this))
    },
    _createDefaultSizeConfig: function() {
        return {
            ratio: 1,
            baseSize: 0,
            minSize: 0,
            maxSize: 0
        }
    },
    _defaultSizeConfig: function(size) {
        var defaultSizeConfig = this._createDefaultSizeConfig();
        if (!arguments.length) {
            return defaultSizeConfig
        }
        var result = [];
        for (var i = 0; i < size; i++) {
            result.push(defaultSizeConfig)
        }
        return result
    },
    _filterByScreen: function(items) {
        var screenRegExp = this._screenRegExp();
        return (0, _common.grep)(items, function(item) {
            return !item.screen || screenRegExp.test(item.screen)
        })
    },
    _screenRegExp: function() {
        var screen = this._getCurrentScreen();
        return new RegExp("(^|\\s)" + screen + "($|\\s)", "i")
    },
    _getCurrentScreen: function() {
        var width = this._screenWidth();
        return this.option("screenByWidth")(width)
    },
    _screenWidth: function() {
        return (0, _window.hasWindow)() ? (0, _renderer.default)(window).width() : HD_SCREEN_WIDTH
    },
    _createEmptyCell: function() {
        return {
            item: {},
            location: {
                colspan: 1,
                rowspan: 1
            }
        }
    },
    _spreadItems: function() {
        (0, _iterator.each)(this._screenItems, function(_, itemInfo) {
            var location = itemInfo.location || {};
            var itemCol = location.col;
            var itemRow = location.row;
            var row = this._grid[itemRow];
            var itemCell = row && row[itemCol];
            this._occupyCells(itemCell, itemInfo)
        }.bind(this))
    },
    _itemsByScreen: function() {
        var _this = this;
        return this.option("items").reduce(function(result, item) {
            var locations = item.location || {};
            locations = (0, _type.isPlainObject)(locations) ? [locations] : locations;
            _this._filterByScreen(locations).forEach(function(location) {
                result.push({
                    item: item,
                    location: (0, _extend.extend)({
                        rowspan: 1,
                        colspan: 1
                    }, location)
                })
            });
            return result
        }, [])
    },
    _occupyCells: function(itemCell, itemInfo) {
        if (!itemCell || this._isItemCellOccupied(itemCell, itemInfo)) {
            return
        }(0, _extend.extend)(itemCell, itemInfo);
        this._markSpanningCell(itemCell)
    },
    _isItemCellOccupied: function(itemCell, itemInfo) {
        if (!(0, _type.isEmptyObject)(itemCell.item)) {
            return true
        }
        var result = false;
        this._loopOverSpanning(itemInfo.location, function(cell) {
            result = result || !(0, _type.isEmptyObject)(cell.item)
        });
        return result
    },
    _loopOverSpanning: function(location, callback) {
        var rowEnd = location.row + location.rowspan - 1;
        var colEnd = location.col + location.colspan - 1;
        var boundRowEnd = Math.min(rowEnd, this._rows.length - 1);
        var boundColEnd = Math.min(colEnd, this._cols.length - 1);
        location.rowspan -= rowEnd - boundRowEnd;
        location.colspan -= colEnd - boundColEnd;
        for (var rowIndex = location.row; rowIndex <= boundRowEnd; rowIndex++) {
            for (var colIndex = location.col; colIndex <= boundColEnd; colIndex++) {
                if (rowIndex !== location.row || colIndex !== location.col) {
                    callback(this._grid[rowIndex][colIndex])
                }
            }
        }
    },
    _markSpanningCell: function(itemCell) {
        this._loopOverSpanning(itemCell.location, function(cell) {
            (0, _extend.extend)(cell, {
                item: itemCell.item,
                spanningCell: itemCell
            })
        })
    },
    _linkNodeToItem: function() {
        (0, _iterator.each)(this._itemElements(), function(_, itemNode) {
            var $item = (0, _renderer.default)(itemNode);
            var item = $item.data(BOX_ITEM_DATA_KEY);
            if (!item.box) {
                item.node = $item.children()
            }
        })
    },
    _layoutItems: function() {
        var rowsCount = this._grid.length;
        var colsCount = rowsCount && this._grid[0].length;
        if (!rowsCount && !colsCount) {
            return
        }
        var result = this._layoutBlock({
            direction: "col",
            row: {
                start: 0,
                end: rowsCount - 1
            },
            col: {
                start: 0,
                end: colsCount - 1
            }
        });
        var rootBox = this._prepareBoxConfig(result.box || {
            direction: "row",
            items: [(0, _extend.extend)(result, {
                ratio: 1
            })]
        });
        (0, _extend.extend)(rootBox, this._rootBoxConfig(rootBox.items));
        this._$root = (0, _renderer.default)("<div>").appendTo(this._itemContainer());
        this._createComponent(this._$root, _box.default, rootBox)
    },
    _rootBoxConfig: function(items) {
        var rootItems = (0, _iterator.each)(items, function(index, item) {
            this._needApplyAutoBaseSize(item) && (0, _extend.extend)(item, {
                baseSize: "auto"
            })
        }.bind(this));
        return (0, _extend.extend)({
            width: "100%",
            height: "100%",
            items: rootItems,
            itemTemplate: this._getTemplateByOption("itemTemplate"),
            itemHoldTimeout: this.option("itemHoldTimeout"),
            onItemHold: this._createActionByOption("onItemHold"),
            onItemClick: this._createActionByOption("onItemClick"),
            onItemContextMenu: this._createActionByOption("onItemContextMenu"),
            onItemRendered: this._createActionByOption("onItemRendered")
        }, {
            _layoutStrategy: this.option("_layoutStrategy")
        })
    },
    _needApplyAutoBaseSize: function(item) {
        return !item.baseSize && (!item.minSize || "auto" === item.minSize) && (!item.maxSize || "auto" === item.maxSize)
    },
    _prepareBoxConfig: function(config) {
        return (0, _extend.extend)(config || {}, {
            crossAlign: "stretch",
            onItemStateChanged: this.option("onItemStateChanged")
        })
    },
    _layoutBlock: function(options) {
        if (this._isSingleItem(options)) {
            return this._itemByCell(options.row.start, options.col.start)
        }
        return this._layoutDirection(options)
    },
    _isSingleItem: function(options) {
        var firstCellLocation = this._grid[options.row.start][options.col.start].location;
        var isItemRowSpanned = options.row.end - options.row.start === firstCellLocation.rowspan - 1;
        var isItemColSpanned = options.col.end - options.col.start === firstCellLocation.colspan - 1;
        return isItemRowSpanned && isItemColSpanned
    },
    _itemByCell: function(rowIndex, colIndex) {
        var itemCell = this._grid[rowIndex][colIndex];
        return itemCell.spanningCell ? null : itemCell.item
    },
    _layoutDirection: function(options) {
        var items = [];
        var direction = options.direction;
        var crossDirection = this._crossDirection(direction);
        var block;
        while (block = this._nextBlock(options)) {
            if (this._isBlockIndivisible(options.prevBlockOptions, block)) {
                throw _ui.default.Error("E1025")
            }
            var item = this._layoutBlock({
                direction: crossDirection,
                row: block.row,
                col: block.col,
                prevBlockOptions: options
            });
            if (item) {
                (0, _extend.extend)(item, this._blockSize(block, crossDirection));
                items.push(item)
            }
            options[crossDirection].start = block[crossDirection].end + 1
        }
        return {
            box: this._prepareBoxConfig({
                direction: direction,
                items: items
            })
        }
    },
    _isBlockIndivisible: function(options, block) {
        return options && options.col.start === block.col.start && options.col.end === block.col.end && options.row.start === block.row.start && options.row.end === block.row.end
    },
    _crossDirection: function(direction) {
        return "col" === direction ? "row" : "col"
    },
    _nextBlock: function(options) {
        var direction = options.direction;
        var crossDirection = this._crossDirection(direction);
        var startIndex = options[direction].start;
        var endIndex = options[direction].end;
        var crossStartIndex = options[crossDirection].start;
        if (crossStartIndex > options[crossDirection].end) {
            return null
        }
        var crossSpan = 1;
        for (var crossIndex = crossStartIndex; crossIndex < crossStartIndex + crossSpan; crossIndex++) {
            var lineCrossSpan = 1;
            for (var index = startIndex; index <= endIndex; index++) {
                var cell = this._cellByDirection(direction, index, crossIndex);
                lineCrossSpan = Math.max(lineCrossSpan, cell.location[crossDirection + "span"])
            }
            var lineCrossEndIndex = crossIndex + lineCrossSpan;
            var crossEndIndex = crossStartIndex + crossSpan;
            if (lineCrossEndIndex > crossEndIndex) {
                crossSpan += lineCrossEndIndex - crossEndIndex
            }
        }
        var result = {};
        result[direction] = {
            start: startIndex,
            end: endIndex
        };
        result[crossDirection] = {
            start: crossStartIndex,
            end: crossStartIndex + crossSpan - 1
        };
        return result
    },
    _cellByDirection: function(direction, index, crossIndex) {
        return "col" === direction ? this._grid[crossIndex][index] : this._grid[index][crossIndex]
    },
    _blockSize: function(block, direction) {
        var defaultMinSize = "row" === direction ? "auto" : 0;
        var sizeConfigs = "row" === direction ? this._rows : this._cols;
        var result = (0, _extend.extend)(this._createDefaultSizeConfig(), {
            ratio: 0
        });
        for (var index = block[direction].start; index <= block[direction].end; index++) {
            var sizeConfig = sizeConfigs[index];
            result.ratio += sizeConfig.ratio;
            result.baseSize += sizeConfig.baseSize;
            result.minSize += sizeConfig.minSize;
            result.maxSize += sizeConfig.maxSize;
            if ((0, _type.isDefined)(sizeConfig.shrink)) {
                result.shrink = sizeConfig.shrink
            }
        }
        result.minSize = result.minSize ? result.minSize : defaultMinSize;
        result.maxSize = result.maxSize ? result.maxSize : "auto";
        this._isSingleColumnScreen() && (result.baseSize = "auto");
        return result
    },
    _update: function(forceRemoveRoot) {
        var $existingRoot = this._$root;
        this._renderItems();
        if ($existingRoot) {
            if (forceRemoveRoot) {
                $existingRoot.remove()
            } else {
                $existingRoot.detach();
                this._saveAssistantRoot($existingRoot)
            }
        }
        this._layoutChangedAction();
        this._updateRootBox()
    },
    _saveAssistantRoot: function($root) {
        this._assistantRoots = this._assistantRoots || [];
        this._assistantRoots.push($root)
    },
    _dispose: function() {
        clearTimeout(this._updateTimer);
        this._clearItemNodeTemplates();
        this._cleanUnusedRoots();
        this.callBase.apply(this, arguments)
    },
    _cleanUnusedRoots: function() {
        if (!this._assistantRoots) {
            return
        }(0, _iterator.each)(this._assistantRoots, function(_, item) {
            (0, _renderer.default)(item).remove()
        })
    },
    _clearItemNodeTemplates: function() {
        (0, _iterator.each)(this.option("items"), function() {
            delete this.node
        })
    },
    _toggleVisibility: function(visible) {
        this.callBase(visible);
        if (visible) {
            this._updateRootBox()
        }
    },
    _attachClickEvent: _common.noop,
    _optionChanged: function(args) {
        switch (args.name) {
            case "rows":
            case "cols":
            case "screenByWidth":
            case "_layoutStrategy":
            case "singleColumnScreen":
                this._clearItemNodeTemplates();
                this._invalidate();
                break;
            case "width":
            case "height":
                this.callBase(args);
                this._update();
                break;
            case "onLayoutChanged":
                this._initLayoutChangedAction();
                break;
            case "itemTemplate":
                this._clearItemNodeTemplates();
                this.callBase(args);
                break;
            case "currentScreenFactor":
                break;
            default:
                this.callBase(args)
        }
    },
    _dimensionChanged: function() {
        if (this._getCurrentScreen() !== this.option("currentScreenFactor")) {
            this._update()
        }
    },
    repaint: function() {
        this._update()
    }
});
(0, _component_registrator.default)("dxResponsiveBox", ResponsiveBox);
var _default = ResponsiveBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
