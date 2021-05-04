/**
 * DevExtreme (ui/scheduler/rendering_strategies/ui.scheduler.appointments.strategy.horizontal_month.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiSchedulerAppointmentsStrategy = _interopRequireDefault(require("./ui.scheduler.appointments.strategy.horizontal_month_line"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
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

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    if ("undefined" === typeof Symbol || !(Symbol.iterator in Object(arr))) {
        return
    }
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = void 0;
    try {
        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i) {
                break
            }
        }
    } catch (err) {
        _d = true;
        _e = err
    } finally {
        try {
            if (!_n && null != _i.return) {
                _i.return()
            }
        } finally {
            if (_d) {
                throw _e
            }
        }
    }
    return _arr
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
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
var MONTH_APPOINTMENT_HEIGHT_RATIO = .6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;
var HorizontalMonthRenderingStrategy = function(_HorizontalMonthLineA) {
    _inheritsLoose(HorizontalMonthRenderingStrategy, _HorizontalMonthLineA);

    function HorizontalMonthRenderingStrategy() {
        return _HorizontalMonthLineA.apply(this, arguments) || this
    }
    var _proto = HorizontalMonthRenderingStrategy.prototype;
    _proto._getLeftPosition = function(settings) {
        var fullWeekAppointmentWidth = this._getFullWeekAppointmentWidth(settings.groupIndex);
        var result = this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth);
        if ("vertical" === this.instance._groupOrientation) {
            result += this.instance.fire("getWorkSpaceDateTableOffset")
        }
        return result
    };
    _proto._getChunkCount = function(fullChunksWidth, firstChunkWidth, weekWidth) {
        var rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
        return Math.ceil(rawFullChunksWidth / weekWidth)
    };
    _proto._getChunkWidths = function(geometry) {
        var firstChunkWidth = geometry.reducedWidth;
        var fullChunksWidth = Math.round(geometry.sourceAppointmentWidth);
        var widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
        return [geometry.reducedWidth, Math.round(geometry.sourceAppointmentWidth), widthWithoutFirstChunk]
    };
    _proto._getTailChunkSettings = function(withoutFirstChunkWidth, weekWidth, leftPosition) {
        var tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
        var rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
        var tailChunkLeftPosition = this._isRtl() ? rtlPosition : leftPosition;
        return [tailChunkWidth, tailChunkLeftPosition]
    };
    _proto._getAppointmentParts = function(geometry, settings) {
        var result = [];
        var _this$_getChunkWidths = this._getChunkWidths(geometry),
            _this$_getChunkWidths2 = _slicedToArray(_this$_getChunkWidths, 3),
            firstChunkWidth = _this$_getChunkWidths2[0],
            fullChunksWidth = _this$_getChunkWidths2[1],
            withoutFirstChunkWidth = _this$_getChunkWidths2[2];
        var leftPosition = this._getLeftPosition(settings);
        var weekWidth = Math.round(this._getFullWeekAppointmentWidth(settings.groupIndex));
        var hasTailChunk = this.instance.fire("getEndViewDate") > settings.info.appointment.endDate;
        var chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth);
        var _this$_getTailChunkSe = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition),
            _this$_getTailChunkSe2 = _slicedToArray(_this$_getTailChunkSe, 2),
            tailChunkWidth = _this$_getTailChunkSe2[0],
            tailChunkLeftPosition = _this$_getTailChunkSe2[1];
        for (var chunkIndex = 1; chunkIndex < chunkCount; chunkIndex++) {
            var topPosition = settings.top + this.getDefaultCellHeight() * chunkIndex;
            var isTailChunk = hasTailChunk && chunkIndex === chunkCount - 1;
            result.push(_objectSpread(_objectSpread({}, settings), {
                top: topPosition,
                left: isTailChunk ? tailChunkLeftPosition : leftPosition,
                height: geometry.height,
                width: isTailChunk ? tailChunkWidth : weekWidth,
                appointmentReduced: isTailChunk ? "tail" : "body",
                rowIndex: ++settings.rowIndex,
                cellIndex: 0
            }))
        }
        var groupDeltaWidth = this._getGroupDeltaWidth(settings.groupIndex);
        result.forEach(function(item) {
            item.left = Math.max(item.left + groupDeltaWidth, 0);
            item.width = Math.max(item.width - groupDeltaWidth, 0)
        });
        return result
    };
    _proto._getGroupDeltaWidth = function(groupIndex) {
        var result = 0;
        var workspace = this.instance.getWorkSpace();
        if (workspace.isRenovatedRender()) {
            var viewDataProvider = workspace.viewDataProvider;
            var cellCountDelta = viewDataProvider.getGroupCellCountDelta(groupIndex);
            result = cellCountDelta * workspace.getCellWidth()
        }
        return result
    };
    _proto._calculateMultiWeekAppointmentLeftOffset = function(max, width) {
        return this._isRtl() ? max : max - width
    };
    _proto._getFullWeekAppointmentWidth = function(groupIndex) {
        this._maxFullWeekAppointmentWidth = this.instance.fire("getFullWeekAppointmentWidth", {
            groupIndex: groupIndex
        });
        return this._maxFullWeekAppointmentWidth
    };
    _proto._getAppointmentDefaultHeight = function() {
        return this._getAppointmentHeightByTheme()
    };
    _proto._getAppointmentMinHeight = function() {
        return this._getAppointmentDefaultHeight()
    };
    _proto._columnCondition = function(a, b) {
        var conditions = this._getConditions(a, b);
        return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition
    };
    _proto.createTaskPositionMap = function(items) {
        return _HorizontalMonthLineA.prototype.createTaskPositionMap.call(this, items, true)
    };
    _proto._getSortedPositions = function(map) {
        return _HorizontalMonthLineA.prototype._getSortedPositions.call(this, map, true)
    };
    _proto._getDefaultRatio = function() {
        return MONTH_APPOINTMENT_HEIGHT_RATIO
    };
    _proto._getOffsets = function() {
        return {
            unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
            auto: MONTH_APPOINTMENT_MAX_OFFSET
        }
    };
    _proto.getDropDownAppointmentWidth = function(intervalCount) {
        if (this.instance.fire("isAdaptive")) {
            return this.getDropDownButtonAdaptiveSize()
        }
        var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
        return this.getDefaultCellWidth() - offset
    };
    _proto.needCorrectAppointmentDates = function() {
        return false
    };
    _proto._needVerticalGroupBounds = function() {
        return false
    };
    _proto._needHorizontalGroupBounds = function() {
        return true
    };
    return HorizontalMonthRenderingStrategy
}(_uiSchedulerAppointmentsStrategy.default);
var _default = HorizontalMonthRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
