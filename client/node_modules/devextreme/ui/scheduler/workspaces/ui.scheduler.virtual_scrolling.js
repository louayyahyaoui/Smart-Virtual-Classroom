/**
 * DevExtreme (ui/scheduler/workspaces/ui.scheduler.virtual_scrolling.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));
var _window = require("../../../core/utils/window");
var _index = require("../../../events/utils/index");

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

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else {
            if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                })
            }
        }
    }
    return target
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
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
var ROW_HEIGHT = 50;
var CELL_WIDTH = 150;
var MIN_SCROLL_OFFSET = 10;
var VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT = 15;
var DOCUMENT_SCROLL_EVENT_NAMESPACE = (0, _index.addNamespace)("scroll", "dxSchedulerVirtualScrolling");
var scrollingTypes = {
    vertical: "vertical",
    horizontal: "horizontal",
    both: "both"
};
var DefaultScrollingType = scrollingTypes.vertical;
var VirtualScrollingDispatcher = function() {
    function VirtualScrollingDispatcher(workspace) {
        this._workspace = workspace;
        this._rowHeight = ROW_HEIGHT;
        this._cellWidth = CELL_WIDTH;
        this._renderer = new Renderer(this.workspace);
        this._createVirtualScrolling();
        this._attachScrollableEvents()
    }
    var _proto = VirtualScrollingDispatcher.prototype;
    _proto.calculateCoordinatesByDataAndPosition = function(cellData, position, date) {
        var workSpace = this._workspace;
        var rowIndex = position.rowIndex,
            columnIndex = position.columnIndex;
        var startDate = cellData.startDate,
            endDate = cellData.endDate,
            allDay = cellData.allDay;
        var timeToScroll = date.getTime();
        var cellStartTime = startDate.getTime();
        var cellEndTime = endDate.getTime();
        var scrollInCell = allDay ? 0 : (timeToScroll - cellStartTime) / (cellEndTime - cellStartTime);
        var cellWidth = workSpace.getCellWidth();
        var top = (rowIndex + scrollInCell) * this.rowHeight;
        var left = cellWidth * columnIndex;
        if (workSpace.option("rtlEnabled")) {
            left = workSpace.getScrollableOuterWidth() - left
        }
        return {
            top: top,
            left: left
        }
    };
    _proto.dispose = function() {
        if (this._onScrollHandler) {
            _events_engine.default.off(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler)
        }
    };
    _proto._createVirtualScrolling = function() {
        if (this.verticalScrollingAllowed) {
            this.verticalVirtualScrolling = new VerticalVirtualScrolling({
                workspace: this.workspace,
                viewportHeight: this.viewportHeight,
                rowHeight: this.rowHeight
            })
        }
        if (this.horizontalScrollingAllowed) {
            this.horizontalVirtualScrolling = new HorizontalVirtualScrolling({
                workspace: this.workspace,
                viewportWidth: this.viewportWidth,
                cellWidth: this.cellWidth
            })
        }
    };
    _proto._attachScrollableEvents = function() {
        if (this.height || this.width) {
            this._attachScrollableScroll()
        }
        if (!this.height || !this.width) {
            this._attachWindowScroll()
        }
    };
    _proto._attachScrollableScroll = function() {
        var _this = this;
        var scrollable = this.workspace.getScrollable();
        var currentOnScroll = scrollable.option("onScroll");
        scrollable.option("onScroll", function(e) {
            null === currentOnScroll || void 0 === currentOnScroll ? void 0 : currentOnScroll.apply(scrollable, [e]);
            _this._process(null === e || void 0 === e ? void 0 : e.scrollOffset)
        })
    };
    _proto._attachWindowScroll = function() {
        var _this2 = this;
        var window = (0, _window.getWindow)();
        this._onScrollHandler = this.workspace._createAction(function() {
            var scrollX = window.scrollX,
                scrollY = window.scrollY;
            if (scrollX >= _this2.minScrollOffset || scrollY >= _this2.minScrollOffset) {
                _this2._process({
                    left: scrollX,
                    top: scrollY
                })
            }
        });
        _events_engine.default.on(this.document, DOCUMENT_SCROLL_EVENT_NAMESPACE, this._onScrollHandler)
    };
    _proto._process = function(scrollPosition) {
        if (scrollPosition) {
            var _this$verticalVirtual, _this$horizontalVirtu;
            var left = scrollPosition.left,
                top = scrollPosition.top;
            null === (_this$verticalVirtual = this.verticalVirtualScrolling) || void 0 === _this$verticalVirtual ? void 0 : _this$verticalVirtual.updateState(top);
            null === (_this$horizontalVirtu = this.horizontalVirtualScrolling) || void 0 === _this$horizontalVirtu ? void 0 : _this$horizontalVirtu.updateState(left);
            this.renderer.updateRender()
        }
    };
    _proto.updateDimensions = function() {
        var cellHeight = this.workspace.getCellHeight(false);
        var cellWidth = this.workspace.getCellWidth();
        var needUpdate = cellHeight !== this.rowHeight || cellWidth !== this.cellWidth;
        if (needUpdate) {
            this.rowHeight = cellHeight;
            this.cellWidth = cellWidth;
            this._createVirtualScrolling();
            this.renderer._renderDateTable()
        }
    };
    _createClass(VirtualScrollingDispatcher, [{
        key: "workspace",
        get: function() {
            return this._workspace
        }
    }, {
        key: "renderer",
        get: function() {
            return this._renderer
        }
    }, {
        key: "isVirtualScrolling",
        get: function() {
            return this.workspace.isVirtualScrolling()
        }
    }, {
        key: "minScrollOffset",
        get: function() {
            return MIN_SCROLL_OFFSET
        }
    }, {
        key: "verticalVirtualScrolling",
        get: function() {
            return this._verticalVirtualScrolling
        },
        set: function(value) {
            this._verticalVirtualScrolling = value
        }
    }, {
        key: "horizontalVirtualScrolling",
        get: function() {
            return this._horizontalVirtualScrolling
        },
        set: function(value) {
            this._horizontalVirtualScrolling = value
        }
    }, {
        key: "document",
        get: function() {
            return _dom_adapter.default.getDocument()
        }
    }, {
        key: "height",
        get: function() {
            return this.workspace.invoke("getOption", "height")
        }
    }, {
        key: "width",
        get: function() {
            return this.workspace.invoke("getOption", "width")
        }
    }, {
        key: "rowHeight",
        get: function() {
            return this._rowHeight
        },
        set: function(value) {
            this._rowHeight = value
        }
    }, {
        key: "viewportHeight",
        get: function() {
            return this.height ? this.workspace.$element().height() : (0, _window.getWindow)().innerHeight
        }
    }, {
        key: "cellWidth",
        get: function() {
            return this._cellWidth
        },
        set: function(value) {
            this._cellWidth = value
        }
    }, {
        key: "viewportWidth",
        get: function() {
            return this.width ? this.workspace.$element().width() : (0, _window.getWindow)().innerWidth
        }
    }, {
        key: "topVirtualRowsCount",
        get: function() {
            return this.verticalScrollingState.virtualItemCountBefore > 0 ? 1 : 0
        }
    }, {
        key: "scrollingState",
        get: function() {
            var _this$verticalVirtual2, _this$horizontalVirtu2;
            return {
                vertical: null === (_this$verticalVirtual2 = this.verticalVirtualScrolling) || void 0 === _this$verticalVirtual2 ? void 0 : _this$verticalVirtual2.state,
                horizontal: null === (_this$horizontalVirtu2 = this.horizontalVirtualScrolling) || void 0 === _this$horizontalVirtu2 ? void 0 : _this$horizontalVirtu2.state
            }
        }
    }, {
        key: "verticalScrollingState",
        get: function() {
            return this.scrollingState.vertical
        }
    }, {
        key: "horizontalScrollingState",
        get: function() {
            return this.scrollingState.horizontal
        }
    }, {
        key: "renderState",
        get: function() {
            var _this$verticalVirtual3, _this$horizontalVirtu3;
            var verticalRenderState = (null === (_this$verticalVirtual3 = this.verticalVirtualScrolling) || void 0 === _this$verticalVirtual3 ? void 0 : _this$verticalVirtual3.getRenderState()) || {};
            var horizontalRenderState = (null === (_this$horizontalVirtu3 = this.horizontalVirtualScrolling) || void 0 === _this$horizontalVirtu3 ? void 0 : _this$horizontalVirtu3.getRenderState()) || {};
            return _objectSpread(_objectSpread({}, verticalRenderState), horizontalRenderState)
        }
    }, {
        key: "scrollingType",
        get: function() {
            return this.workspace.option("scrolling.type") || DefaultScrollingType
        }
    }, {
        key: "verticalScrollingAllowed",
        get: function() {
            return this.scrollingType === scrollingTypes.vertical || this.scrollingType === scrollingTypes.both
        }
    }, {
        key: "horizontalScrollingAllowed",
        get: function() {
            return this.scrollingType === scrollingTypes.horizontal || this.scrollingType === scrollingTypes.both
        }
    }]);
    return VirtualScrollingDispatcher
}();
exports.default = VirtualScrollingDispatcher;
var VirtualScrollingBase = function() {
    function VirtualScrollingBase(options) {
        this._workspace = options.workspace;
        this._state = this.defaultState;
        this._viewportSize = options.viewportSize;
        this._itemSize = options.itemSize;
        this.updateState(0)
    }
    var _proto2 = VirtualScrollingBase.prototype;
    _proto2.needUpdateState = function(position) {
        var _this$state = this.state,
            prevPosition = _this$state.prevPosition,
            startIndex = _this$state.startIndex;
        var isFirstInitialization = startIndex < 0;
        if (!isFirstInitialization && (0 === position || position === this.maxScrollPosition)) {
            return true
        }
        var currentPosition = prevPosition;
        var currentItemsCount = Math.floor(currentPosition / this.itemSize);
        var itemsCount = Math.floor(position / this.itemSize);
        var isStartIndexChanged = Math.abs(currentItemsCount - itemsCount) >= this.outlineCount;
        return isFirstInitialization || isStartIndexChanged
    };
    _proto2._correctPosition = function(position) {
        if (position < 0) {
            return 0
        }
        return Math.min(position, this.maxScrollPosition)
    };
    _proto2.updateState = function(position) {
        position = this._correctPosition(position);
        if (!this.needUpdateState(position)) {
            return false
        }
        var itemsInfoBefore = this._calcItemInfoBefore(position);
        var itemsDeltaBefore = this._calcItemDeltaBefore(itemsInfoBefore);
        var _this$_calcItemInfoAf = this._calcItemInfoAfter(itemsDeltaBefore),
            outlineCountAfter = _this$_calcItemInfoAf.outlineCountAfter,
            virtualItemCountAfter = _this$_calcItemInfoAf.virtualItemCountAfter,
            itemCountWithAfter = _this$_calcItemInfoAf.itemCountWithAfter;
        var virtualItemCountBefore = itemsInfoBefore.virtualItemCountBefore,
            outlineCountBefore = itemsInfoBefore.outlineCountBefore;
        var itemCount = outlineCountBefore + itemCountWithAfter + outlineCountAfter;
        var itemCountAfter = Math.floor(position / this.itemSize);
        this.state.prevPosition = itemCountAfter * this.itemSize;
        this.state.startIndex = itemCountAfter - outlineCountBefore;
        this.state.virtualItemCountBefore = virtualItemCountBefore;
        this.state.outlineCountBefore = outlineCountBefore;
        this.state.itemCount = itemCount;
        this.state.outlineCountAfter = outlineCountAfter;
        this.state.virtualItemCountAfter = virtualItemCountAfter;
        this._updateStateCore();
        return true
    };
    _proto2._calcItemInfoBefore = function(position) {
        var virtualItemCountBefore = Math.floor(position / this.itemSize);
        var outlineCountBefore = Math.min(virtualItemCountBefore, this.outlineCount);
        virtualItemCountBefore -= outlineCountBefore;
        return {
            virtualItemCountBefore: virtualItemCountBefore,
            outlineCountBefore: outlineCountBefore
        }
    };
    _proto2._calcItemDeltaBefore = function(itemInfoBefore) {
        var virtualItemCountBefore = itemInfoBefore.virtualItemCountBefore,
            outlineCountBefore = itemInfoBefore.outlineCountBefore;
        var totalItemCount = this.getTotalItemCount();
        return totalItemCount - virtualItemCountBefore - outlineCountBefore
    };
    _proto2.getTotalItemCount = function() {
        throw "getTotalItemCount method should be implemented"
    };
    _proto2.getRenderState = function() {
        throw "getRenderState method should be implemented"
    };
    _proto2._calcItemInfoAfter = function(itemsDeltaBefore) {
        var itemCountWithAfter = itemsDeltaBefore >= this.pageSize ? this.pageSize : itemsDeltaBefore;
        var virtualItemCountAfter = itemsDeltaBefore - itemCountWithAfter;
        var outlineCountAfter = virtualItemCountAfter > 0 ? Math.min(virtualItemCountAfter, this.outlineCount) : 0;
        if (virtualItemCountAfter > 0) {
            virtualItemCountAfter -= outlineCountAfter
        }
        return {
            virtualItemCountAfter: virtualItemCountAfter,
            outlineCountAfter: outlineCountAfter,
            itemCountWithAfter: itemCountWithAfter
        }
    };
    _proto2._updateStateCore = function() {
        var state = this.state;
        var virtualItemCountBefore = state.virtualItemCountBefore;
        var virtualItemCountAfter = state.virtualItemCountAfter;
        var outlineCountBefore = state.outlineCountBefore;
        var outlineCountAfter = state.outlineCountAfter;
        var prevVirtualItemSizeBefore = state.virtualItemSizeBefore;
        var prevVirtualItemSizeAfter = state.virtualItemSizeAfter;
        var prevOutlineSizeBefore = state.outlineSizeBefore;
        var prevOutlineSizeAfter = state.outlineSizeAfter;
        var virtualItemSizeBefore = this.itemSize * virtualItemCountBefore;
        var virtualItemSizeAfter = this.itemSize * virtualItemCountAfter;
        var outlineSizeBefore = this.itemSize * outlineCountBefore;
        var outlineSizeAfter = this.itemSize * outlineCountAfter;
        var prevVirtualSizeBefore = prevVirtualItemSizeBefore + prevOutlineSizeBefore;
        var virtualSizeBefore = virtualItemSizeBefore + outlineSizeBefore;
        var prevVirtualSizeAfter = prevVirtualItemSizeAfter + prevOutlineSizeAfter;
        var virtualSizeAfter = virtualItemSizeAfter + outlineSizeAfter;
        var isAppend = prevVirtualSizeBefore < virtualSizeBefore;
        var isPrepend = prevVirtualSizeAfter < virtualSizeAfter;
        var needAddItems = isAppend || isPrepend;
        if (needAddItems) {
            state.virtualItemSizeBefore = virtualItemSizeBefore;
            state.virtualItemSizeAfter = virtualItemSizeAfter
        }
    };
    _createClass(VirtualScrollingBase, [{
        key: "viewportSize",
        get: function() {
            return this._viewportSize
        }
    }, {
        key: "itemSize",
        get: function() {
            return this._itemSize
        }
    }, {
        key: "state",
        get: function() {
            return this._state
        },
        set: function(value) {
            this._state = value
        }
    }, {
        key: "startIndex",
        get: function() {
            return this.state.startIndex
        }
    }, {
        key: "pageSize",
        get: function() {
            return Math.ceil(this.viewportSize / this.itemSize)
        }
    }, {
        key: "outlineCount",
        get: function() {
            return Math.floor(this.pageSize / 2)
        }
    }, {
        key: "workspace",
        get: function() {
            return this._workspace
        }
    }, {
        key: "groupCount",
        get: function() {
            return this.workspace._getGroupCount()
        }
    }, {
        key: "isVerticalGrouping",
        get: function() {
            return this.workspace._isVerticalGroupedWorkSpace()
        }
    }, {
        key: "defaultState",
        get: function() {
            return {
                prevPosition: 0,
                startIndex: -1,
                itemCount: 0,
                virtualItemCountBefore: 0,
                virtualItemCountAfter: 0,
                outlineCountBefore: 0,
                outlineCountAfter: 0,
                virtualItemSizeBefore: 0,
                virtualItemSizeAfter: 0,
                outlineSizeBefore: 0,
                outlineSizeAfter: 0
            }
        }
    }, {
        key: "maxScrollPosition",
        get: function() {
            return this.getTotalItemCount() * this.itemSize - this.viewportSize
        }
    }]);
    return VirtualScrollingBase
}();
var VerticalVirtualScrolling = function(_VirtualScrollingBase) {
    _inheritsLoose(VerticalVirtualScrolling, _VirtualScrollingBase);

    function VerticalVirtualScrolling(options) {
        return _VirtualScrollingBase.call(this, {
            workspace: options.workspace,
            viewportSize: options.viewportHeight,
            itemSize: options.rowHeight
        }) || this
    }
    var _proto3 = VerticalVirtualScrolling.prototype;
    _proto3.getTotalItemCount = function() {
        return this.workspace._getTotalRowCount(this.groupCount, this.isVerticalGrouping)
    };
    _proto3.getRenderState = function() {
        return {
            topVirtualRowHeight: this.state.virtualItemSizeBefore,
            bottomVirtualRowHeight: this.state.virtualItemSizeAfter,
            startRowIndex: this.state.startIndex,
            rowCount: this.state.itemCount,
            startIndex: this.state.startIndex
        }
    };
    _createClass(VerticalVirtualScrolling, [{
        key: "prevTopPosition",
        get: function() {
            return this.state.prevPosition
        }
    }, {
        key: "rowCount",
        get: function() {
            return this.state.itemCount
        }
    }, {
        key: "topVirtualRowCount",
        get: function() {
            return this.state.virtualItemCountBefore
        }
    }, {
        key: "bottomVirtualRowCount",
        get: function() {
            return this.state.virtualItemCountAfter
        }
    }]);
    return VerticalVirtualScrolling
}(VirtualScrollingBase);
var HorizontalVirtualScrolling = function(_VirtualScrollingBase2) {
    _inheritsLoose(HorizontalVirtualScrolling, _VirtualScrollingBase2);

    function HorizontalVirtualScrolling(options) {
        return _VirtualScrollingBase2.call(this, {
            workspace: options.workspace,
            viewportSize: options.viewportWidth,
            itemSize: options.cellWidth
        }) || this
    }
    var _proto4 = HorizontalVirtualScrolling.prototype;
    _proto4.getTotalItemCount = function() {
        return this.workspace._getTotalCellCount(this.groupCount, this.isVerticalGrouping)
    };
    _proto4.getRenderState = function() {
        return {
            leftVirtualCellWidth: this.state.virtualItemSizeBefore,
            rightVirtualCellWidth: this.state.virtualItemSizeAfter,
            startCellIndex: this.state.startIndex,
            cellCount: this.state.itemCount,
            cellWidth: this.state.itemSize
        }
    };
    return HorizontalVirtualScrolling
}(VirtualScrollingBase);
var Renderer = function() {
    function Renderer(workspace) {
        this._workspace = workspace;
        this._renderAppointmentTimeout = null
    }
    var _proto5 = Renderer.prototype;
    _proto5.getRenderTimeout = function() {
        return VIRTUAL_APPOINTMENTS_RENDER_TIMEOUT
    };
    _proto5.updateRender = function() {
        this._renderDateTable();
        this._renderAppointments()
    };
    _proto5._renderDateTable = function() {
        this.workspace.renderRWorkspace(false)
    };
    _proto5._renderAppointments = function() {
        var _this3 = this;
        var renderTimeout = this.getRenderTimeout();
        if (renderTimeout >= 0) {
            clearTimeout(this._renderAppointmentTimeout);
            this._renderAppointmentTimeout = setTimeout(function() {
                return _this3.workspace.updateAppointments()
            }, renderTimeout)
        } else {
            this.workspace.updateAppointments()
        }
    };
    _createClass(Renderer, [{
        key: "workspace",
        get: function() {
            return this._workspace
        }
    }]);
    return Renderer
}();
module.exports = exports.default;
