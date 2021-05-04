/**
 * DevExtreme (renovation/viz/core/renderers/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.applyGraphicProps = exports.convertAlignmentToAnchor = exports.textsAreEqual = exports.getLineHeight = exports.getItemLineHeight = exports.setTextNodeAttribute = exports.getTextWidth = exports.parseMultiline = exports.parseHTML = exports.removeExtraAttrs = exports.getElementBBox = exports.compensateSegments = exports.combinePathParam = exports.buildPathSegments = exports.extend = exports.getFuncIri = exports.getNextDefsSvgId = void 0;
var _type = require("../../../../core/utils/type");
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _utils = require("../../../../viz/core/utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && Symbol.iterator in Object(iter)) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
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
var KEY_FONT_SIZE = "font-size";
var NONE = "none";
var DEFAULT_FONT_SIZE = 12;
var SHARPING_CORRECTION = .5;
var getNextDefsSvgId = function() {
    var numDefsSvgElements = 1;
    return function() {
        return "DevExpress_".concat(numDefsSvgElements++)
    }
}();
exports.getNextDefsSvgId = getNextDefsSvgId;
var getFuncIri = function(id, pathModified) {
    return null !== id ? "url(".concat(pathModified ? window.location.href.split("#")[0] : "", "#").concat(id, ")") : id
};
exports.getFuncIri = getFuncIri;
var extend = function(target, source) {
    target = _objectSpread(_objectSpread({}, target), source);
    return target
};
exports.extend = extend;

function buildSegments(points, buildSimpleSegment, close) {
    var i;
    var ii;
    var list = [];
    if (Array.isArray(points[0])) {
        for (i = 0, ii = points.length; i < ii; ++i) {
            buildSimpleSegment(points[i], close, list)
        }
    } else {
        buildSimpleSegment(points, close, list)
    }
    return list
}

function buildSimpleLineSegment(points, close, list) {
    var i = 0;
    var k0 = list.length;
    var k = k0;
    var ii = (points || []).length;
    if (ii) {
        if (void 0 !== points[0].x) {
            var arrPoints = points;
            for (; i < ii;) {
                list[k++] = ["L", arrPoints[i].x, arrPoints[i++].y]
            }
        } else {
            var _arrPoints = points;
            for (; i < ii;) {
                list[k++] = ["L", _arrPoints[i++], _arrPoints[i++]]
            }
        }
        list[k0][0] = "M"
    } else {
        list[k] = ["M", 0, 0]
    }
    close && list.push(["Z"]);
    return list
}

function buildSimpleCurveSegment(points, close, list) {
    var i;
    var k = list.length;
    var ii = (points || []).length;
    if (ii) {
        if (void 0 !== points[0]) {
            var arrPoints = points;
            list[k++] = ["M", arrPoints[0].x, arrPoints[0].y];
            for (i = 1; i < ii;) {
                list[k++] = ["C", arrPoints[i].x, arrPoints[i++].y, arrPoints[i].x, arrPoints[i++].y, arrPoints[i].x, arrPoints[i++].y]
            }
        } else {
            var _arrPoints2 = points;
            list[k++] = ["M", _arrPoints2[0], _arrPoints2[1]];
            for (i = 2; i < ii;) {
                list[k++] = ["C", _arrPoints2[i++], _arrPoints2[i++], _arrPoints2[i++], _arrPoints2[i++], _arrPoints2[i++], _arrPoints2[i++]]
            }
        }
    } else {
        list[k] = ["M", 0, 0]
    }
    close && list.push(["Z"]);
    return list
}

function buildLineSegments(points, close) {
    return buildSegments(points, buildSimpleLineSegment, close)
}

function buildCurveSegments(points, close) {
    return buildSegments(points, buildSimpleCurveSegment, close)
}
var buildPathSegments = function(points, type) {
    var list = [
        ["M", 0, 0]
    ];
    if ("line" === type) {
        list = buildLineSegments(points, false)
    } else {
        if ("area" === type) {
            list = buildLineSegments(points, true)
        } else {
            if ("bezier" === type) {
                list = buildCurveSegments(points, false)
            } else {
                if ("bezierarea" === type) {
                    list = buildCurveSegments(points, true)
                }
            }
        }
    }
    return list
};
exports.buildPathSegments = buildPathSegments;
var combinePathParam = function(segments) {
    var d = [];
    var ii = segments.length;
    var segment;
    for (var i = 0; i < ii; ++i) {
        segment = segments[i];
        for (var j = 0, jj = segment.length; j < jj; ++j) {
            d.push(segment[j])
        }
    }
    return d.join(" ")
};
exports.combinePathParam = combinePathParam;

function prepareConstSegment(constSeg, type) {
    var x = constSeg[constSeg.length - 2];
    var y = constSeg[constSeg.length - 1];
    if ("line" === type || "area" === type) {
        constSeg[0] = "L"
    } else {
        if ("bezier" === type || "bezierarea" === type) {
            constSeg[0] = "C";
            constSeg[1] = x;
            constSeg[3] = x;
            constSeg[5] = x;
            constSeg[2] = y;
            constSeg[4] = y;
            constSeg[6] = y
        }
    }
}

function makeEqualLineSegments(short, long, type) {
    var constSeg = _toConsumableArray(short[short.length - 1]);
    var i = short.length;
    prepareConstSegment(constSeg, type);
    for (; i < long.length; i++) {
        short[i] = _toConsumableArray(constSeg)
    }
}

function makeEqualAreaSegments(short, long, type) {
    var i;
    var head;
    var shortLength = short.length;
    var longLength = long.length;
    var constsSeg1;
    var constsSeg2;
    if ((shortLength - 1) % 2 === 0 && (longLength - 1) % 2 === 0) {
        i = (shortLength - 1) / 2 - 1;
        head = short.slice(0, i + 1);
        constsSeg1 = _toConsumableArray(head[head.length - 1]);
        constsSeg2 = _toConsumableArray(short.slice(i + 1)[0]);
        prepareConstSegment(constsSeg1, type);
        prepareConstSegment(constsSeg2, type);
        for (var j = i; j < (longLength - 1) / 2 - 1; j++) {
            short.splice(j + 1, 0, constsSeg1);
            short.splice(j + 3, 0, constsSeg2)
        }
    }
}
var compensateSegments = function(oldSegments, newSegments, type) {
    var oldLength = oldSegments.length;
    var newLength = newSegments.length;
    var originalNewSegments = [];
    var makeEqualSegments = type.indexOf("area") !== -1 ? makeEqualAreaSegments : makeEqualLineSegments;
    if (0 === oldLength) {
        for (var i = 0; i < newLength; i++) {
            oldSegments.push(_toConsumableArray(newSegments[i]))
        }
    } else {
        if (oldLength < newLength) {
            makeEqualSegments(oldSegments, newSegments, type)
        } else {
            if (oldLength > newLength) {
                originalNewSegments = _toConsumableArray(newSegments);
                makeEqualSegments(newSegments, oldSegments, type)
            }
        }
    }
    return originalNewSegments
};
exports.compensateSegments = compensateSegments;
var getElementBBox = function(element) {
    var bBox = new SVGRect(0, 0, 0, 0);
    if (void 0 !== element) {
        bBox = element.getBBox()
    } else {
        if (void 0 !== element) {
            var el = element;
            bBox = new SVGRect(0, 0, el.offsetWidth, el.offsetHeight)
        }
    }
    return bBox
};
exports.getElementBBox = getElementBBox;

function maxLengthFontSize(fontSize1, fontSize2) {
    var height1 = fontSize1 || DEFAULT_FONT_SIZE;
    var height2 = fontSize2 || DEFAULT_FONT_SIZE;
    return height1 > height2 ? height1 : height2
}

function orderHtmlTree(list, line, node, parentStyle, parentClassName) {
    var style;
    var realStyle = node.style;
    if ((0, _type.isDefined)(node.wholeText)) {
        list.push({
            value: node.wholeText,
            style: parentStyle,
            className: parentClassName,
            line: line,
            height: parseFloat(parentStyle.fontSize) || 0
        })
    } else {
        if ("BR" === node.tagName) {
            ++line
        } else {
            if (_dom_adapter.default.isElementNode(node)) {
                style = extend(style = {}, parentStyle);
                switch (node.tagName) {
                    case "B":
                    case "STRONG":
                        style.fontWeight = "bold";
                        break;
                    case "I":
                    case "EM":
                        style.fontStyle = "italic";
                        break;
                    case "U":
                        style.textDecoration = "underline"
                }
                realStyle.color && (style.fill = realStyle.color);
                realStyle.fontSize && (style.fontSize = realStyle.fontSize);
                realStyle.fontStyle && (style.fontStyle = realStyle.fontStyle);
                realStyle.fontWeight && (style.fontWeight = realStyle.fontWeight);
                realStyle.textDecoration && (style.textDecoration = realStyle.textDecoration);
                for (var i = 0, nodes = node.childNodes, ii = nodes.length; i < ii; ++i) {
                    line = orderHtmlTree(list, line, nodes[i], style, node.className || parentClassName)
                }
            }
        }
    }
    return line
}

function adjustLineHeights(items) {
    var currentItem = items[0];
    var item;
    for (var i = 1, ii = items.length; i < ii; ++i) {
        item = items[i];
        if (item.line === currentItem.line) {
            currentItem.height = maxLengthFontSize(currentItem.height, item.height);
            currentItem.inherits = currentItem.inherits || 0 === item.height;
            item.height = NaN
        } else {
            currentItem = item
        }
    }
}
var removeExtraAttrs = function(html) {
    var findTagAttrs = /(?:(<[a-z0-9]+\s*))([\s\S]*?)(>|\/>)/gi;
    var findStyleAndClassAttrs = /(style|class)\s*=\s*(["'])(?:(?!\2).)*\2\s?/gi;
    return html.replace(findTagAttrs, function(_, p1, p2, p3) {
        var _p;
        p2 = ((null === (_p = p2) || void 0 === _p ? void 0 : _p.match(findStyleAndClassAttrs)) || []).map(function(str) {
            return str
        }).join(" ");
        return p1 + p2 + p3
    })
};
exports.removeExtraAttrs = removeExtraAttrs;
var parseHTML = function(text) {
    var items = [];
    var div = _dom_adapter.default.createElement("div");
    div.innerHTML = text.replace(/\r/g, "").replace(/\n/g, "<br/>");
    orderHtmlTree(items, 0, div, {}, "");
    adjustLineHeights(items);
    return items
};
exports.parseHTML = parseHTML;
var parseMultiline = function(text) {
    var texts = text.replace(/\r/g, "").split(/\n/g);
    var items = [];
    for (var i = 0; i < texts.length; i++) {
        items.push({
            value: texts[i].trim(),
            height: 0,
            line: i
        })
    }
    return items
};
exports.parseMultiline = parseMultiline;
var getTextWidth = function(text) {
    var tspan = text.tspan,
        value = text.value;
    return value.length && tspan ? tspan.getSubStringLength(0, value.length) : 0
};
exports.getTextWidth = getTextWidth;
var setTextNodeAttribute = function(item, name, value) {
    var _item$tspan, _item$stroke;
    null === (_item$tspan = item.tspan) || void 0 === _item$tspan ? void 0 : _item$tspan.setAttribute(name, value);
    null === (_item$stroke = item.stroke) || void 0 === _item$stroke ? void 0 : _item$stroke.setAttribute(name, value)
};
exports.setTextNodeAttribute = setTextNodeAttribute;
var getItemLineHeight = function(item, defaultValue) {
    return item.inherits ? maxLengthFontSize(item.height, defaultValue) : item.height || defaultValue
};
exports.getItemLineHeight = getItemLineHeight;
var getLineHeight = function(styles) {
    return styles && !isNaN(parseFloat(styles[KEY_FONT_SIZE])) ? parseFloat(styles[KEY_FONT_SIZE]) : DEFAULT_FONT_SIZE
};
exports.getLineHeight = getLineHeight;
var textsAreEqual = function(newItems, renderedItems) {
    if (!renderedItems || renderedItems.length !== newItems.length) {
        return false
    }
    return renderedItems.every(function(item, index) {
        return item.value === newItems[index].value
    })
};
exports.textsAreEqual = textsAreEqual;
var convertAlignmentToAnchor = function(value) {
    var rtl = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
    return value ? {
        left: rtl ? "end" : "start",
        center: "middle",
        right: rtl ? "start" : "end"
    } [value] : void 0
};
exports.convertAlignmentToAnchor = convertAlignmentToAnchor;

function applyTransformation(element, props, x, y) {
    var rotate = props.rotate,
        rotateX = props.rotateX,
        rotateY = props.rotateY,
        scaleX = props.scaleX,
        scaleY = props.scaleY,
        sharp = props.sharp,
        sharpDirection = props.sharpDirection,
        strokeWidth = props.strokeWidth,
        translateX = props.translateX,
        translateY = props.translateY;
    var transformations = [];
    var transDir = "backward" === sharpDirection ? -1 : 1;
    var strokeOdd = (strokeWidth || 0) % 2;
    var correctionX = strokeOdd && ("h" === sharp || true === sharp) ? SHARPING_CORRECTION * transDir : 0;
    var correctionY = strokeOdd && ("v" === sharp || true === sharp) ? SHARPING_CORRECTION * transDir : 0;
    if (translateX || translateY || correctionX || correctionY) {
        transformations.push("translate(".concat((translateX || 0) + correctionX, ",").concat((translateY || 0) + correctionY, ")"))
    }
    if (rotate) {
        transformations.push("rotate(".concat(rotate, ",").concat(rotateX || x || 0, ",").concat(rotateY || y || 0, ")"))
    }
    var scaleXDefined = (0, _type.isDefined)(scaleX);
    var scaleYDefined = (0, _type.isDefined)(scaleY);
    if (scaleXDefined || scaleYDefined) {
        transformations.push("scale(".concat(scaleXDefined ? scaleX : 1, ",").concat(scaleYDefined ? scaleY : 1, ")"))
    }
    if (transformations.length) {
        element.setAttribute("transform", transformations.join(" "))
    }
}

function applyDashStyle(element, props) {
    var dashStyle = props.dashStyle,
        strokeWidth = props.strokeWidth;
    var recalculateDashStyle = (0, _type.isDefined)(dashStyle) || (0, _type.isDefined)(strokeWidth);
    if (recalculateDashStyle && (0, _type.isDefined)(dashStyle)) {
        var value = dashStyle || "";
        var sw = strokeWidth || 1;
        var key = "stroke-dasharray";
        value = null === value ? "" : (0, _utils.normalizeEnum)(value);
        if ("" === value || "solid" === value || value === NONE) {
            element.removeAttribute(key)
        } else {
            var dashArray = [];
            dashArray = value.replace(/longdash/g, "8,3,").replace(/dash/g, "4,3,").replace(/dot/g, "1,3,").replace(/,$/, "").split(",");
            var i = dashArray.length;
            while (i--) {
                dashArray[i] = parseInt(dashArray[i], 10) * sw
            }
            element.setAttribute(key, dashArray.join(","))
        }
    }
}
var applyGraphicProps = function(element, props, x, y) {
    applyDashStyle(element, props);
    applyTransformation(element, props, x, y)
};
exports.applyGraphicProps = applyGraphicProps;
