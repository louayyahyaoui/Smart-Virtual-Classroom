/**
 * DevExtreme (viz/core/plaque.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Plaque = void 0;
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");

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

function _objectWithoutProperties(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
}
var math = Math;
var round = math.round;
var max = math.max;
var min = math.min;
var sin = math.sin;
var cos = math.cos;
var asin = math.asin;
var PI = math.PI;
var buildPath = function() {
    for (var _len = arguments.length, points = new Array(_len), _key = 0; _key < _len; _key++) {
        points[_key] = arguments[_key]
    }
    return points.join("")
};

function getArc(cornerRadius, xDirection, yDirection) {
    return "a ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(xDirection * cornerRadius, " ").concat(yDirection * cornerRadius)
}

function getAbsoluteArc(cornerRadius, x, y) {
    return "A ".concat(cornerRadius, " ").concat(cornerRadius, " 0 0 1 ").concat(x, " ").concat(y)
}

function rotateX(x, y, angle, x0, y0) {
    return (x - x0) * round(cos(angle)) + (y - y0) * round(sin(angle)) + x0
}

function rotateY(x, y, angle, x0, y0) {
    return -(x - x0) * round(sin(angle)) + (y - y0) * round(cos(angle)) + y0
}

function rotateSize(options, angle) {
    if (angle % 90 === 0 && angle % 180 !== 0) {
        return {
            width: options.height,
            height: options.width
        }
    }
    return options
}

function getCloudAngle(_ref, x, y, anchorX, anchorY) {
    var width = _ref.width,
        height = _ref.height;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);
    if (anchorX < xl && anchorY < yt || anchorX >= xl && anchorX <= xr && anchorY < yt) {
        return 270
    }
    if (anchorX > xr && anchorY > yb || anchorX >= xl && anchorX <= xr && anchorY > yb) {
        return 90
    } else {
        if (anchorX < xl && anchorY > yb || anchorX < xl && anchorY >= yt && anchorY <= yb) {
            return 180
        }
    }
    return 0
}

function getCloudPoints(_ref2, x, y, anchorX, anchorY, _ref3, bounded) {
    var width = _ref2.width,
        height = _ref2.height;
    var arrowWidth = _ref3.arrowWidth,
        _ref3$cornerRadius = _ref3.cornerRadius,
        cornerRadius = void 0 === _ref3$cornerRadius ? 0 : _ref3$cornerRadius;
    var halfArrowWidth = arrowWidth / 2;
    var halfWidth = width / 2;
    var halfHeight = height / 2;
    var xr = Math.ceil(x + halfWidth);
    var xl = Math.floor(x - halfWidth);
    var yt = Math.floor(y - halfHeight);
    var yb = Math.ceil(y + halfHeight);
    var leftTopCorner = [xl, yt];
    var rightTopCorner = [xr, yt];
    var rightBottomCorner = [xr, yb];
    var leftBottomCorner = [xl, yb];
    var arrowX = anchorX <= xl ? xl : xr <= anchorX ? xr : anchorX;
    var arrowY = anchorY <= yt ? yt : yb <= anchorY ? yb : anchorY;
    var arrowBaseBottom = min(arrowY + halfArrowWidth, yb);
    var arrowBaseTop = max(arrowY - halfArrowWidth, yt);
    var arrowBaseLeft = max(arrowX - halfArrowWidth, xl);
    cornerRadius = Math.min(width / 2, height / 2, cornerRadius);
    var points;
    leftTopCorner[1] += cornerRadius;
    rightTopCorner[0] -= cornerRadius;
    rightBottomCorner[1] -= cornerRadius;
    leftBottomCorner[0] += cornerRadius;
    if (!bounded || xl <= anchorX && anchorX <= xr && yt <= anchorY && anchorY <= yb) {
        points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), "L", rightTopCorner, getArc(cornerRadius, 1, 1), "L", rightBottomCorner, getArc(cornerRadius, -1, 1), "L", leftBottomCorner, getArc(cornerRadius, -1, -1))
    } else {
        if (anchorX > xr && anchorY < yt) {
            var arrowAngle = arrowWidth / cornerRadius || 0;
            var angle = PI / 4 + arrowAngle / 2;
            var endAngle = PI / 4 - arrowAngle / 2;
            var arrowEndPointX = rightTopCorner[0] + cos(endAngle) * cornerRadius;
            var arrowEndPointY = rightTopCorner[1] + (1 - sin(endAngle)) * cornerRadius;
            var arrowArc = buildPath("L", rightTopCorner, getArc(cornerRadius, cos(angle), 1 - sin(angle)), "L", [anchorX, anchorY, arrowEndPointX, arrowEndPointY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius));
            if (Math.abs(angle) > PI / 2) {
                arrowArc = buildPath("L", [arrowBaseLeft, yt, anchorX, anchorY, xr, arrowBaseBottom])
            }
            points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), arrowArc, "L", rightBottomCorner, getArc(cornerRadius, -1, 1), "L", leftBottomCorner, getArc(cornerRadius, -1, -1))
        } else {
            if (anchorX > xr && anchorY >= yt && anchorY <= yb) {
                var _arrowArc;
                if (arrowBaseTop >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
                    _arrowArc = buildPath(getArc(cornerRadius, 1, 1), "L", [xr, arrowBaseTop, anchorX, anchorY, xr, arrowBaseBottom], "L", rightBottomCorner, getArc(cornerRadius, -1, 1))
                } else {
                    if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightTopCorner[1] + cornerRadius && arrowBaseBottom <= rightBottomCorner[1]) {
                        var arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
                        var _angle = arrowWidthRest / cornerRadius;
                        var arrowBaseTopX = rightTopCorner[0] + cos(_angle) * cornerRadius;
                        var arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle)) * cornerRadius;
                        _arrowArc = buildPath(getArc(cornerRadius, cos(_angle), 1 - sin(_angle)), "L", [arrowBaseTopX, arrowBaseTopY, anchorX, anchorY, xr, arrowBaseBottom], "L", rightBottomCorner, getArc(cornerRadius, -1, 1))
                    } else {
                        if (arrowBaseTop < rightTopCorner[1] + cornerRadius && arrowBaseBottom < rightTopCorner[1] + cornerRadius) {
                            var _arrowWidthRest = rightTopCorner[1] + cornerRadius - arrowBaseTop;
                            var _arrowAngle = _arrowWidthRest / cornerRadius;
                            var _angle2 = _arrowAngle;
                            var _arrowBaseTopX = rightTopCorner[0] + cos(_angle2) * cornerRadius;
                            var _arrowBaseTopY = rightTopCorner[1] + (1 - sin(_angle2)) * cornerRadius;
                            var bottomAngle = Math.sin((rightTopCorner[1] + cornerRadius - arrowBaseBottom) / cornerRadius);
                            var arrowBaseBottomX = rightTopCorner[0] + cornerRadius * cos(bottomAngle);
                            var arrowBaseBottomY = rightTopCorner[1] + cornerRadius * (1 - sin(bottomAngle));
                            _arrowArc = buildPath(getArc(cornerRadius, cos(_angle2), 1 - sin(_angle2)), "L", [_arrowBaseTopX, _arrowBaseTopY, anchorX, anchorY, arrowBaseBottomX, arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightTopCorner[0] + cornerRadius, rightTopCorner[1] + cornerRadius), "L", rightBottomCorner, getArc(cornerRadius, -1, 1))
                        } else {
                            if (arrowBaseTop <= rightTopCorner[1] + cornerRadius && arrowBaseBottom >= rightBottomCorner[1]) {
                                var topAngle = asin((rightTopCorner[1] + cornerRadius - arrowBaseTop) / cornerRadius);
                                var _arrowBaseTopX2 = rightTopCorner[0] + cornerRadius * cos(topAngle);
                                var _arrowBaseTopY2 = rightTopCorner[1] + cornerRadius * (1 - sin(topAngle));
                                var _bottomAngle = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
                                var _arrowBaseBottomX = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle) - 1);
                                var _arrowBaseBottomY = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle);
                                _arrowArc = buildPath(getArc(cornerRadius, cos(topAngle), 1 - sin(topAngle)), "L", [_arrowBaseTopX2, _arrowBaseTopY2, anchorX, anchorY, _arrowBaseBottomX, _arrowBaseBottomY], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius))
                            } else {
                                if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseTop <= rightBottomCorner[1] && arrowBaseBottom > rightBottomCorner[1]) {
                                    var _bottomAngle2 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
                                    var _arrowBaseBottomX2 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle2) - 1);
                                    var _arrowBaseBottomY2 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle2);
                                    _arrowArc = buildPath(getArc(cornerRadius, 1, 1), "L", [xr, arrowBaseTop, anchorX, anchorY, _arrowBaseBottomX2, _arrowBaseBottomY2], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius))
                                } else {
                                    if (arrowBaseTop > rightTopCorner[1] + cornerRadius && arrowBaseBottom > rightBottomCorner[1]) {
                                        var _bottomAngle3 = asin((arrowBaseBottom - rightBottomCorner[1]) / cornerRadius);
                                        var _arrowBaseBottomX3 = rightBottomCorner[0] + cornerRadius * (cos(_bottomAngle3) - 1);
                                        var _arrowBaseBottomY3 = rightBottomCorner[1] + cornerRadius * sin(_bottomAngle3);
                                        var _topAngle = asin((arrowBaseTop - rightBottomCorner[1]) / cornerRadius);
                                        var _arrowBaseTopX3 = rightBottomCorner[0] + cornerRadius * (cos(_topAngle) - 1);
                                        var _arrowBaseTopY3 = rightBottomCorner[1] + cornerRadius * sin(_topAngle);
                                        _arrowArc = buildPath(getArc(cornerRadius, 1, 1), "L", rightBottomCorner, getArc(cornerRadius, cos(_topAngle) - 1, sin(_topAngle)), "L", [_arrowBaseTopX3, _arrowBaseTopY3, anchorX, anchorY, _arrowBaseBottomX3, _arrowBaseBottomY3], getAbsoluteArc(cornerRadius, rightBottomCorner[0] - cornerRadius, rightBottomCorner[1] + cornerRadius))
                                    }
                                }
                            }
                        }
                    }
                }
                points = buildPath(leftTopCorner, getArc(cornerRadius, 1, -1), "L", rightTopCorner, _arrowArc, "L", leftBottomCorner, getArc(cornerRadius, -1, -1))
            }
        }
    }
    return buildPath("M", points, "Z")
}
var Plaque = function() {
    function Plaque(options, widget, root, contentTemplate) {
        var bounded = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : true;
        var measureContent = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : function(_, g) {
            return g.getBBox()
        };
        var moveContentGroup = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : function(_, g, x, y) {
            return g.move(x, y)
        };
        this.widget = widget;
        this.options = options;
        this.root = root;
        this.contentTemplate = contentTemplate;
        this.bonded = bounded;
        this.measureContent = measureContent;
        this.moveContentGroup = moveContentGroup
    }
    var _proto = Plaque.prototype;
    _proto.draw = function(_ref4) {
        var _this = this;
        var anchorX = _ref4.x,
            anchorY = _ref4.y,
            _ref4$canvas = _ref4.canvas,
            canvas = void 0 === _ref4$canvas ? {} : _ref4$canvas,
            offsetX = _ref4.offsetX,
            offsetY = _ref4.offsetY,
            _ref4$offset = _ref4.offset,
            offset = void 0 === _ref4$offset ? 0 : _ref4$offset,
            restProps = _objectWithoutProperties(_ref4, ["x", "y", "canvas", "offsetX", "offsetY", "offset"]);
        var options = this.options;
        var x = options.x,
            y = options.y;
        var bounds = {
            xl: canvas.left,
            xr: canvas.width - canvas.right,
            width: canvas.width - canvas.right - canvas.left,
            yt: canvas.top,
            yb: canvas.height - canvas.bottom,
            height: canvas.height - canvas.bottom - canvas.top
        };
        if (!((0, _type.isDefined)(anchorX) && (0, _type.isDefined)(anchorY)) && !((0, _type.isDefined)(x) && (0, _type.isDefined)(y))) {
            return false
        }
        if ((0, _type.isDefined)(anchorX) && (anchorX < bounds.xl || bounds.xr < anchorX || anchorY < bounds.yt || bounds.yb < anchorY)) {
            return false
        }
        if (!this._root) {
            this._draw()
        }
        var shadowSettings = (0, _extend.extend)({
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
        }, options.shadow);
        var contentWidth = options.width > 0 ? options.width : null;
        var contentHeight = options.height > 0 ? options.height : null;
        var onRender = function() {
            var _this$_root;
            var bBox = _this._contentBBox = _this.measureContent(_this.widget, _this._contentGroup);
            var size = _this._size = {
                width: max(contentWidth, bBox.width) + 2 * options.paddingLeftRight,
                height: max(contentHeight, bBox.height) + 2 * options.paddingTopBottom,
                offset: offset
            };
            var xOff = shadowSettings.offsetX;
            var yOff = shadowSettings.offsetY;
            var blur = 2 * shadowSettings.blur + 1;
            var lm = max(blur - xOff, 0);
            var rm = max(blur + xOff, 0);
            var tm = max(blur - yOff, 0);
            var bm = max(blur + yOff, 0);
            _this.margins = {
                lm: lm,
                rm: rm,
                tm: tm,
                bm: bm
            };
            if (!(0, _type.isDefined)(x)) {
                if ((0, _type.isDefined)(offsetX)) {
                    x = anchorX + offsetX
                } else {
                    if (bounds.width < size.width) {
                        x = round(bounds.xl + bounds.width / 2)
                    } else {
                        x = min(max(anchorX, Math.ceil(bounds.xl + size.width / 2 + lm)), Math.floor(bounds.xr - size.width / 2 - rm))
                    }
                }
            } else {
                x += offsetX || 0;
                if (!(0, _type.isDefined)(anchorX)) {
                    anchorX = x
                }
            }
            if (!(0, _type.isDefined)(y)) {
                if ((0, _type.isDefined)(offsetY)) {
                    y = anchorY + offsetY
                } else {
                    var y_top = anchorY - options.arrowLength - size.height / 2 - offset;
                    var y_bottom = anchorY + options.arrowLength + size.height / 2 + offset;
                    if (bounds.height < size.height + options.arrowLength) {
                        y = round(bounds.yt + size.height / 2)
                    } else {
                        if (y_top - size.height / 2 - tm < bounds.yt) {
                            if (y_bottom + size.height / 2 + bm < bounds.yb) {
                                y = y_bottom;
                                anchorY += offset
                            } else {
                                y = round(bounds.yt + size.height / 2)
                            }
                        } else {
                            y = y_top;
                            anchorY -= offset
                        }
                    }
                }
            } else {
                y += offsetY || 0;
                if (!(0, _type.isDefined)(anchorY)) {
                    anchorY = y + size.height / 2
                }
            }
            _this.anchorX = anchorX;
            _this.anchorY = anchorY;
            _this.move(x, y);
            null === (_this$_root = _this._root) || void 0 === _this$_root ? void 0 : _this$_root.append(_this.root)
        };
        if (this.contentTemplate.render) {
            this.contentTemplate.render({
                model: options,
                container: this._contentGroup.element,
                onRendered: onRender
            })
        } else {
            return this.contentTemplate(_objectSpread({
                group: this._contentGroup,
                onRender: onRender
            }, restProps))
        }
        return true
    };
    _proto._draw = function() {
        var renderer = this.widget._renderer;
        var options = this.options;
        var shadowSettings = (0, _extend.extend)({
            x: "-50%",
            y: "-50%",
            width: "200%",
            height: "200%"
        }, options.shadow);
        var shadow = this._shadow = renderer.shadowFilter().attr(shadowSettings);
        var cloudSettings = {
            opacity: options.opacity,
            "stroke-width": 0,
            fill: options.color
        };
        var borderOptions = options.border || {};
        if (borderOptions.visible) {
            (0, _extend.extend)(cloudSettings, {
                "stroke-width": borderOptions.width,
                stroke: borderOptions.color,
                "stroke-opacity": borderOptions.opacity,
                dashStyle: borderOptions.dashStyle
            })
        }
        var group = this._root = renderer.g().append(this.root);
        if (options.type) {
            group.attr({
                "class": "dxc-".concat(options.type, "-annotation")
            })
        }
        var cloudGroup = renderer.g().attr({
            filter: shadow.id
        }).append(group);
        this._cloud = renderer.path([], "area").attr(cloudSettings).sharp().append(cloudGroup);
        this._contentGroup = renderer.g().append(group)
    };
    _proto.getBBox = function() {
        var size = this._size || {};
        var margins = this.margins || {};
        var rotationAngle = getCloudAngle(size, this.x, this.y, this.anchorX, this.anchorY);
        return {
            x: Math.floor(this.x - size.width / 2 - margins.lm),
            y: Math.floor(this.y - size.height / 2 - margins.tm - (270 === rotationAngle ? this.options.arrowLength : 0)),
            width: size.width + margins.lm + margins.rm,
            height: size.height + margins.tm + margins.bm + (90 === rotationAngle || 270 === rotationAngle ? this.options.arrowLength : 0)
        }
    };
    _proto.clear = function() {
        if (this._root) {
            this._root.remove();
            this._shadow.remove();
            this._root = null
        }
        return this
    };
    _proto.customizeCloud = function(attr) {
        if (this._cloud) {
            this._cloud.attr(attr)
        }
    };
    _proto.moveRoot = function(x, y) {
        if (this._root) {
            this._root.move(x, y)
        }
    };
    _proto.move = function(x, y) {
        x = round(x);
        y = round(y);
        this.x = x;
        this.y = y;
        var rotationAngle = getCloudAngle(this._size, x, y, this.anchorX, this.anchorY);
        var radRotationAngle = rotationAngle * PI / 180;
        this._cloud.attr({
            d: getCloudPoints(rotateSize(this._size, rotationAngle), x, y, rotateX(this.anchorX, this.anchorY, radRotationAngle, x, y), rotateY(this.anchorX, this.anchorY, radRotationAngle, x, y), this.options, this.bonded)
        }).rotate(rotationAngle, x, y);
        this.moveContentGroup(this.widget, this._contentGroup, x - this._contentBBox.x - this._contentBBox.width / 2, y - this._contentBBox.y - this._contentBBox.height / 2)
    };
    _proto.hitTest = function(x, y) {
        var _ref5 = this._size || {},
            width = _ref5.width,
            height = _ref5.height;
        return Math.abs(x - this.x) <= width / 2 && Math.abs(y - this.y) <= height / 2
    };
    return Plaque
}();
exports.Plaque = Plaque;
