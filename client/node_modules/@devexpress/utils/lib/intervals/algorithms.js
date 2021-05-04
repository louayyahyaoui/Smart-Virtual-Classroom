"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = require("../utils/list");
var search_1 = require("../utils/search");
var fixed_1 = require("./fixed");
var collector_1 = require("./sparse/collector");
var IntervalAlgorithms = (function () {
    function IntervalAlgorithms() {
    }
    IntervalAlgorithms.oneConstainsOtherArraysOfInterval = function (mergedIntervalsA, intervalsB) {
        var shouldBeContais = list_1.ListUtils.deepCopy(intervalsB);
        var currenInterval = shouldBeContais.pop();
        while (currenInterval) {
            if (!list_1.ListUtils.unsafeAnyOf(mergedIntervalsA, function (mergedInterval) { return mergedInterval.containsInterval(currenInterval); }))
                return false;
            currenInterval = shouldBeContais.pop();
        }
        return true;
    };
    IntervalAlgorithms.getIntersection = function (intervalA, intervalB) {
        return IntervalAlgorithms.getIntersectionTemplate(intervalA, intervalB, intervalA);
    };
    IntervalAlgorithms.getIntersectionTemplate = function (intervalA, intervalB, template) {
        var start = Math.max(intervalA.start, intervalB.start);
        var end = Math.min(intervalA.end, intervalB.end);
        if (start > end)
            return null;
        return template.makeByStartEnd(start, end);
    };
    IntervalAlgorithms.getIntersectionNonNullLength = function (intervalA, intervalB) {
        return IntervalAlgorithms.getIntersectionNonNullLengthTemplate(intervalA, intervalB, intervalA);
    };
    IntervalAlgorithms.getIntersectionNonNullLengthTemplate = function (intervalA, intervalB, template) {
        var inters = IntervalAlgorithms.getIntersectionTemplate(intervalA, intervalB, template);
        return inters && inters.length ? inters : null;
    };
    IntervalAlgorithms.getIntersectionsTwoArraysOfInterval = function (intervalsA, intervalsB) {
        return IntervalAlgorithms.getIntersectionsTwoArraysOfIntervalTemplate(intervalsA, intervalsB, intervalsA[0]);
    };
    IntervalAlgorithms.getIntersectionsTwoArraysOfIntervalTemplate = function (intervalsA, intervalsB, template) {
        var result = [];
        var lengthIntervalsA = intervalsA.length;
        var lengthIntervalsB = intervalsB.length;
        var intervalsAIndex = 0;
        var intervalsBIndex = 0;
        var currAInterval = intervalsA[intervalsAIndex];
        var currBInterval = intervalsB[intervalsBIndex];
        var currResultInterval = null;
        while (intervalsAIndex < lengthIntervalsA && intervalsBIndex < lengthIntervalsB) {
            var intersection = IntervalAlgorithms.getIntersectionTemplate(currAInterval, currBInterval, template);
            if (intersection) {
                if (currResultInterval && currResultInterval.end === intersection.start)
                    currResultInterval.length += intersection.length;
                else {
                    currResultInterval = intersection;
                    result.push(currResultInterval);
                }
            }
            if (currAInterval.end < currBInterval.end) {
                intervalsAIndex++;
                currAInterval = intervalsA[intervalsAIndex];
            }
            else {
                intervalsBIndex++;
                currBInterval = intervalsB[intervalsBIndex];
            }
        }
        return result;
    };
    IntervalAlgorithms.getAffectedObjects = function (objects, intervals, getFirstIndex, conflictResolver) {
        if (getFirstIndex === void 0) { getFirstIndex = function (start) {
            return search_1.SearchUtils.normedInterpolationIndexOf(objects, function (obj) { return obj.interval.start; }, start);
        }; }
        if (conflictResolver === void 0) { conflictResolver = function (objectInterval, touchingIntervalLength, touchPoint) {
            return objectInterval.start === touchPoint && touchingIntervalLength === 0;
        }; }
        return IntervalAlgorithms.getAffectedObjectsTemplate(objects, intervals, intervals[0], getFirstIndex, conflictResolver);
    };
    IntervalAlgorithms.getAffectedObjectsTemplate = function (objects, intervals, template, getFirstIndex, conflictResolver) {
        if (getFirstIndex === void 0) { getFirstIndex = function (start) {
            return search_1.SearchUtils.normedInterpolationIndexOf(objects, function (obj) { return obj.interval.start; }, start);
        }; }
        if (conflictResolver === void 0) { conflictResolver = function (objectInterval, touchingIntervalLength, touchPoint) {
            return objectInterval.start === touchPoint && touchingIntervalLength === 0;
        }; }
        var collector = new collector_1.SparseIntervalsCollector(template);
        for (var _i = 0, intervals_1 = intervals; _i < intervals_1.length; _i++) {
            var interval = intervals_1[_i];
            var ind = Math.max(0, getFirstIndex(interval.start, objects));
            for (var obj = void 0; obj = objects[ind]; ind++) {
                var objInterval = obj.interval;
                if (objInterval.start > interval.end)
                    break;
                var intersection = IntervalAlgorithms.getIntersectionTemplate(objInterval, interval, template);
                if (intersection && (intersection.length || conflictResolver(objInterval, interval.length, intersection.start)))
                    collector.add(ind);
            }
        }
        return collector.getIntervals();
    };
    IntervalAlgorithms.handleAffectedObjects = function (objects, intervals, callback, getFirstIndex) {
        if (getFirstIndex === void 0) { getFirstIndex = function (start) {
            return search_1.SearchUtils.normedInterpolationIndexOf(objects, function (obj) { return obj.interval.start; }, start);
        }; }
        var template = new fixed_1.FixedInterval(0, 0);
        for (var _i = 0, intervals_2 = intervals; _i < intervals_2.length; _i++) {
            var interval = intervals_2[_i];
            var ind = Math.max(0, getFirstIndex(interval.start, objects));
            for (var obj = void 0; obj = objects[ind]; ind++) {
                var objInterval = obj.interval;
                if (objInterval.start > interval.end)
                    break;
                var intersection = IntervalAlgorithms.getIntersectionTemplate(objInterval, interval, template);
                if (intersection)
                    callback(obj, ind, interval, intersection);
            }
        }
    };
    IntervalAlgorithms.getMergedIntervals = function (intervals, needSort) {
        return IntervalAlgorithms.getMergedIntervalsTemplate(intervals, needSort, intervals[0]);
    };
    IntervalAlgorithms.getMergedIntervalsTemplate = function (intervals, needSort, template) {
        if (intervals.length < 2)
            return intervals.length > 0 ? [template.makeByStartLength(intervals[0].start, intervals[0].length)] : [];
        var sortedIntervals = needSort ?
            [].concat(intervals).sort(function (a, b) { return a.start - b.start; }) :
            intervals;
        var result = [];
        for (var i = 0, interval = void 0; interval = sortedIntervals[i];) {
            var minBound = interval.start;
            var maxBound = interval.end;
            for (++i; (interval = sortedIntervals[i]) !== undefined && (interval.start <= maxBound); i++) {
                if (interval.end > maxBound)
                    maxBound = interval.end;
            }
            result.push(template.makeByStartEnd(minBound, maxBound));
        }
        return result;
    };
    IntervalAlgorithms.reflectIntervals = function (intervals, bounds) {
        return IntervalAlgorithms.reflectIntervalsTemplate(intervals, bounds, bounds);
    };
    IntervalAlgorithms.reflectIntervalsTemplate = function (intervals, bounds, template) {
        if (!intervals.length)
            return [template.makeByStartLength(bounds.start, bounds.length)];
        var lastIntervalEnd = list_1.ListUtils.last(intervals).end;
        var result = list_1.ListUtils.reducedMap(intervals, function (curr, i) {
            return IntervalAlgorithms.getIntersectionNonNullLengthTemplate(template.makeByStartEnd(intervals[i - 1].end, curr.start), bounds, template);
        }, 1);
        if (bounds.start < intervals[0].start)
            result.unshift(template.makeByStartEnd(bounds.start, intervals[0].start));
        if (bounds.end > lastIntervalEnd)
            result.push(template.makeByStartEnd(lastIntervalEnd, bounds.end));
        return result;
    };
    IntervalAlgorithms.reflectionOfPointOnInterval = function (value, valInterval, targetInterval) {
        return (value - valInterval.start) / valInterval.length * targetInterval.length + targetInterval.start;
    };
    return IntervalAlgorithms;
}());
exports.IntervalAlgorithms = IntervalAlgorithms;
