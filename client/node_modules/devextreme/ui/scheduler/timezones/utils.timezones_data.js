/**
 * DevExtreme (ui/scheduler/timezones/utils.timezones_data.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _query = _interopRequireDefault(require("../../../data/query"));
var _errors = _interopRequireDefault(require("../../../core/errors"));
var _timezones_data = _interopRequireDefault(require("./timezones_data"));
var _math = require("../../../core/utils/math");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var timeZoneDataUtils = {
    _timeZones: _timezones_data.default.zones,
    getDisplayedTimeZones: function(timestamp) {
        var _this = this;
        var timeZones = this._timeZones.map(function(timezone) {
            var offset = _this.getUtcOffset(timezone.offsets, timezone.offsetIndices, timezone.untils, timestamp);
            var title = "(GMT ".concat(_this.formatOffset(offset), ") ").concat(_this.formatId(timezone.id));
            return {
                offset: offset,
                title: title,
                id: timezone.id
            }
        });
        return (0, _query.default)(timeZones).sortBy("offset").toArray()
    },
    formatOffset: function(offset) {
        var hours = Math.floor(offset);
        var minutesInDecimal = offset - hours;
        var signString = (0, _math.sign)(offset) >= 0 ? "+" : "-";
        var hoursString = "0".concat(Math.abs(hours)).slice(-2);
        var minutesString = minutesInDecimal > 0 ? ":".concat(60 * minutesInDecimal) : ":00";
        return signString + hoursString + minutesString
    },
    formatId: function(id) {
        return id.split("/").join(" - ").split("_").join(" ")
    },
    getTimezoneById: function(id) {
        var result;
        var i = 0;
        var tzList = this._timeZones;
        if (id) {
            while (!result) {
                if (!tzList[i]) {
                    _errors.default.log("W0009", id);
                    return
                }
                var currentId = tzList[i].id;
                if (currentId === id) {
                    result = tzList[i]
                }
                i++
            }
        }
        return result
    },
    getTimeZoneOffsetById: function(id, timestamp) {
        var tz = this.getTimezoneById(id);
        if (tz) {
            return this.getUtcOffset(tz.offsets, tz.offsetIndices, tz.untils, timestamp)
        }
        return
    },
    getTimeZoneDeclarationTuple: function(id, year) {
        var tz = this.getTimezoneById(id);
        if (tz) {
            return this.getTimeZoneDeclarationTupleCore(tz.offsets, tz.offsetIndices, tz.untils, year)
        }
        return []
    },
    getTimeZoneDeclarationTupleCore: function(offsets, offsetIndices, untils, year) {
        var tupleResult = [];
        var offsetIndicesList = offsetIndices.split("");
        var offsetsList = offsets.split("|").map(function(value) {
            return parseInt(value)
        });
        var untilsList = untils.split("|").map(function(until) {
            if ("Infinity" === until) {
                return null
            }
            return 1e3 * parseInt(until, 36)
        });
        var currentDate = 0;
        for (var i = 0, listLength = untilsList.length; i < listLength; i++) {
            currentDate += untilsList[i];
            if (new Date(currentDate).getFullYear() === year) {
                var offset = offsetsList[Number(offsetIndicesList[i + 1])];
                tupleResult.push({
                    date: currentDate,
                    offset: -offset / 60
                })
            }
            if (new Date(currentDate).getFullYear() > year) {
                break
            }
        }
        return tupleResult
    },
    getUtcOffset: function(offsets, offsetIndices, untils, dateTimeStamp) {
        var index = 0;
        var offsetIndicesList = offsetIndices.split("");
        var offsetsList = offsets.split("|");
        var untilsList = untils.split("|").map(function(until) {
            if ("Infinity" === until) {
                return null
            }
            return 1e3 * parseInt(until, 36)
        });
        var currentUntil = 0;
        for (var i = 0, listLength = untilsList.length; i < listLength; i++) {
            currentUntil += untilsList[i];
            if (dateTimeStamp >= currentUntil) {
                index = i;
                continue
            } else {
                break
            }
        }
        if (untilsList[index + 1]) {
            index++
        }
        var offset = Number(offsetsList[Number(offsetIndicesList[index])]);
        return -offset / 60 || offset
    }
};
var _default = timeZoneDataUtils;
exports.default = _default;
module.exports = exports.default;
