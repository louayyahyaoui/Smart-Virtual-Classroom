/**
 * DevExtreme (viz/core/layout.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _utils = require("./utils");
var _min = Math.min;
var _max = Math.max;
var _round = Math.round;
var ALIGN_START = 0;
var ALIGN_MIDDLE = 1;
var ALIGN_END = 2;
var horizontalAlignmentMap = {
    left: ALIGN_START,
    center: ALIGN_MIDDLE,
    right: ALIGN_END
};
var verticalAlignmentMap = {
    top: ALIGN_START,
    center: ALIGN_MIDDLE,
    bottom: ALIGN_END
};
var sideMap = {
    horizontal: 0,
    vertical: 1
};
var slicersMap = {};
var BBOX_CEIL_CORRECTION = 2;
slicersMap[ALIGN_START] = function(a, b, size) {
    return [a, _min(b, a + size)]
};
slicersMap[ALIGN_MIDDLE] = function(a, b, size) {
    return [_max(a, (a + b - size) / 2), _min(b, (a + b + size) / 2)]
};
slicersMap[ALIGN_END] = function(a, b, size) {
    return [_max(a, b - size), b]
};

function pickValue(value, map, defaultValue) {
    var val = (0, _utils.normalizeEnum)(value);
    return val in map ? map[val] : defaultValue
}

function normalizeLayoutOptions(options) {
    var side = pickValue(options.side, sideMap, 1);
    var alignment = [pickValue(options.horizontalAlignment, horizontalAlignmentMap, ALIGN_MIDDLE), pickValue(options.verticalAlignment, verticalAlignmentMap, ALIGN_START)];
    return {
        side: side,
        primary: bringToEdge(alignment[side]),
        secondary: alignment[1 - side],
        weak: options.weak,
        priority: options.priority || 0,
        header: options.header,
        position: options.position
    }
}

function bringToEdge(primary) {
    return primary < 2 ? 0 : 2
}

function getConjugateSide(side) {
    return 1 - side
}

function getSlice(alignment, a, b, size) {
    return slicersMap[alignment](a, b, size)
}

function getShrink(alignment, size) {
    return (alignment > 0 ? -1 : 1) * size
}

function processForward(item, rect, minSize) {
    var side = item.side;
    var size = item.element.measure([rect[2] - rect[0], rect[3] - rect[1]]);
    var minSide = "indside" === item.position ? 0 : minSize[side];
    var isValid = size[side] < rect[2 + side] - rect[side] - minSide;
    if (isValid) {
        if ("inside" !== item.position) {
            rect[item.primary + side] += getShrink(item.primary, size[side])
        }
        item.size = size
    }
    return isValid
}

function processRectBackward(item, rect, alignmentRect) {
    var primarySide = item.side;
    var secondarySide = getConjugateSide(primarySide);
    var itemRect = [];
    var secondary = getSlice(item.secondary, alignmentRect[secondarySide], alignmentRect[2 + secondarySide], item.size[secondarySide]);
    itemRect[primarySide] = _round(itemRect[2 + primarySide] = rect[item.primary + primarySide] + ("inside" === item.position ? getShrink(item.primary, item.size[primarySide]) : 0));
    itemRect[item.primary + primarySide] = _round(rect[item.primary + primarySide] - getShrink(item.primary, item.size[primarySide]));
    if ("inside" !== item.position) {
        rect[item.primary + primarySide] = itemRect[item.primary + primarySide]
    }
    itemRect[secondarySide] = _round(secondary[0]);
    itemRect[2 + secondarySide] = _round(secondary[1]);
    return itemRect
}

function processBackward(item, rect, alignmentRect, fitRect, size, targetRect) {
    var itemRect = processRectBackward(item, rect, alignmentRect);
    var itemFitRect = processRectBackward(item, fitRect, fitRect);
    if (size[item.side] > 0) {
        size[item.side] -= item.size[item.side];
        targetRect[item.primary + item.side] = itemRect[item.primary + item.side];
        item.element.freeSpace()
    } else {
        item.element.move(itemRect, itemFitRect)
    }
}

function Layout() {
    this._targets = []
}
Layout.prototype = {
    constructor: Layout,
    dispose: function() {
        this._targets = null
    },
    add: function(target) {
        this._targets.push(target)
    },
    forward: function(targetRect, minSize) {
        var rect = targetRect.slice();
        var targets = createTargets(this._targets);
        var i;
        var ii = targets.length;
        var cache = [];
        for (i = 0; i < ii; ++i) {
            if (processForward(targets[i], rect, minSize)) {
                cache.push(targets[i])
            } else {
                targets[i].element.freeSpace()
            }
        }
        this._cache = cache.reverse();
        return rect
    },
    backward: function(targetRect, alignmentRect) {
        var size = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [0, 0];
        var backwardRect = targetRect.slice();
        var fitRect = targetRect.slice();
        var targets = this._cache;
        var targetSide = 0;
        var target;
        var i;
        var ii = targets.length;
        for (i = 0; i < ii; ++i) {
            target = targets[i];
            if (target.side !== targetSide) {
                backwardRect = targetRect.slice()
            }
            processBackward(target, backwardRect, alignmentRect, fitRect, size, targetRect);
            targetSide = target.side
        }
        return size
    }
};

function createTargets(targets) {
    var i;
    var ii = targets.length;
    var collection = [];
    var layout;
    for (i = 0; i < ii; ++i) {
        layout = targets[i].layoutOptions();
        if (layout) {
            layout = normalizeLayoutOptions(layout);
            layout.element = targets[i];
            collection.push(layout)
        }
    }
    collection.sort(function(a, b) {
        return b.side - a.side || a.priority - b.priority
    });
    collection = processWeakItems(collection);
    return collection
}

function processWeakItems(collection) {
    var weakItem = collection.filter(function(item) {
        return true === item.weak
    })[0];
    var headerItem;
    if (weakItem) {
        headerItem = collection.filter(function(item) {
            return weakItem.primary === item.primary && item.side === weakItem.side && item !== weakItem
        })[0]
    }
    if (weakItem && headerItem) {
        return [makeHeader(headerItem, weakItem)].concat(collection.filter(function(item) {
            return !(item === headerItem || item === weakItem)
        }))
    }
    return collection
}

function processBackwardHeaderRect(element, rect) {
    var rectCopy = rect.slice();
    var itemRect = processRectBackward(element, rectCopy, rectCopy);
    itemRect[element.side] = rect[element.side];
    itemRect[2 + element.side] = rect[2 + element.side];
    return itemRect
}

function makeHeader(header, weakElement) {
    var side = header.side;
    var primary = header.primary;
    var secondary = header.secondary;
    return {
        side: side,
        primary: primary,
        secondary: secondary,
        priority: 0,
        element: {
            measure: function(targetSize) {
                var result = targetSize.slice();
                var weakSize = weakElement.element.measure(targetSize.slice());
                targetSize[primary] -= weakSize[primary];
                var headerSize = header.element.measure(targetSize.slice());
                result[side] = weakSize[side] = headerSize[side] = Math.max(headerSize[side], weakSize[side]);
                weakElement.size = weakSize;
                header.size = headerSize;
                return result
            },
            move: function(rect, fitRect) {
                if (fitRect[2] - fitRect[0] < header.size[0] + weakElement.size[0] - BBOX_CEIL_CORRECTION) {
                    this.freeSpace();
                    return
                }
                var weakRect = processBackwardHeaderRect(weakElement, fitRect, fitRect);
                fitRect[2 + weakElement.primary] = weakRect[weakElement.primary];
                var headerFitReact = processBackwardHeaderRect(header, fitRect, fitRect);
                if (fitRect[2 + weakElement.primary] < rect[2 + weakElement.primary] && header.size[header.primary] > rect[2 + header.primary] - rect[header.primary]) {
                    rect[2 + weakElement.primary] = fitRect[2 + weakElement.primary]
                }
                var headerRect = processBackwardHeaderRect(header, rect, rect);
                if (headerRect[2 + weakElement.primary] > fitRect[2 + weakElement.primary]) {
                    rect[2 + weakElement.primary] = fitRect[2 + weakElement.primary];
                    headerRect = processBackwardHeaderRect(header, rect, rect)
                }
                weakElement.element.move(weakRect);
                header.element.move(headerRect, headerFitReact)
            },
            freeSpace: function() {
                header.element.freeSpace();
                weakElement.element.freeSpace()
            }
        }
    }
}
var _default = Layout;
exports.default = _default;
module.exports = exports.default;
