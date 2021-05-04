"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchUtils = (function () {
    function SearchUtils() {
    }
    SearchUtils.binaryIndexOf = function (array, comparer, minIndex, maxIndex) {
        if (minIndex === void 0) { minIndex = 0; }
        if (maxIndex === void 0) { maxIndex = -2; }
        var findFromZeroPosition = minIndex === 0;
        if (maxIndex === -2)
            maxIndex = array.length - 1;
        while (minIndex <= maxIndex) {
            var currentIndex = (minIndex + ((maxIndex - minIndex) >> 1));
            var compare = comparer(array[currentIndex]);
            if (compare < 0)
                minIndex = currentIndex + 1;
            else if (compare > 0)
                maxIndex = currentIndex - 1;
            else
                return currentIndex;
        }
        return findFromZeroPosition ? ~minIndex : -1;
    };
    SearchUtils.normedBinaryIndexOf = function (array, comparer, minIndex, maxIndex) {
        if (minIndex === void 0) { minIndex = 0; }
        if (maxIndex === void 0) { maxIndex = -2; }
        var index = SearchUtils.binaryIndexOf(array, comparer, minIndex, maxIndex);
        return SearchUtils.binaryIndexNormalizator(index);
    };
    SearchUtils.binaryIndexNormalizator = function (index) {
        return index < 0 ? ~index - 1 : index;
    };
    SearchUtils.normedInterpolationIndexOf = function (array, getValue, toFind, lowIndex, highIndex) {
        if (lowIndex === void 0) { lowIndex = 0; }
        if (highIndex === void 0) { highIndex = -2; }
        if (highIndex === -2)
            highIndex = array.length - 1;
        var firstObject = array[Math.min(lowIndex, highIndex)];
        if (firstObject === undefined || toFind < getValue(firstObject))
            return -1;
        var lowValue = getValue(array[lowIndex]);
        var highValue = getValue(array[highIndex]);
        while (true) {
            if (toFind > lowValue && toFind < highValue) {
                var midIndex = lowIndex + Math.floor(((toFind - lowValue) * (highIndex - lowIndex)) / (highValue - lowValue));
                var midValue = getValue(array[midIndex]);
                if (toFind > midValue) {
                    lowIndex = midIndex + 1;
                    lowValue = getValue(array[lowIndex]);
                    if (toFind < lowValue)
                        return midIndex;
                }
                else if (toFind < midValue) {
                    highIndex = midIndex - 1;
                    highValue = getValue(array[highIndex]);
                }
                else
                    return midIndex;
            }
            else
                return toFind === lowValue ? lowIndex : highIndex;
        }
    };
    return SearchUtils;
}());
exports.SearchUtils = SearchUtils;
