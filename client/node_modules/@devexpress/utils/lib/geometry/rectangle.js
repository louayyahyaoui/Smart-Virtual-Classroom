"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var flag_1 = require("../class/flag");
var algorithms_1 = require("../intervals/algorithms");
var fixed_1 = require("../intervals/fixed");
var point_1 = require("./point");
var size_1 = require("./size");
var Rectangle = (function () {
    function Rectangle(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rectangle.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rectangle.prototype, "center", {
        get: function () {
            return Rectangle.center(this);
        },
        enumerable: true,
        configurable: true
    });
    Rectangle.prototype.createRectangle = function () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.createSize = function () {
        return new size_1.Size(this.width, this.height);
    };
    Rectangle.prototype.createPosition = function () {
        return new point_1.Point(this.x, this.y);
    };
    Rectangle.prototype.createVerticalInterval = function () {
        return new fixed_1.FixedInterval(this.y, this.height);
    };
    Rectangle.prototype.createHorizontalInterval = function () {
        return new fixed_1.FixedInterval(this.x, this.width);
    };
    Rectangle.fromGeometry = function (point, size) {
        return new Rectangle(point.x, point.y, size.width, size.height);
    };
    Rectangle.fromPoints = function (pointA, pointB) {
        var x = Math.min(pointA.x, pointB.x);
        var y = Math.min(pointA.y, pointB.y);
        var width = Math.abs(pointA.x - pointB.x);
        var height = Math.abs(pointA.y - pointB.y);
        return new Rectangle(x, y, width, height);
    };
    Rectangle.fromPositions = function (x1, y1, x2, y2) {
        var x = Math.min(x1, x2);
        var y = Math.min(y1, y2);
        var width = Math.abs(x2 - x1);
        var height = Math.abs(y2 - y1);
        return new Rectangle(x, y, width, height);
    };
    Rectangle.fromCenter = function (center, minRadius) {
        return new Rectangle(center.x - minRadius, center.y - minRadius, minRadius * 2, minRadius * 2);
    };
    Rectangle.prototype.isCollapsed = function () {
        return this.width === 0 || this.height === 0;
    };
    Rectangle.prototype.isEmpty = function () {
        return this.x === 0 && this.y === 0 &&
            this.width === 0 && this.height === 0;
    };
    Rectangle.prototype.toString = function () {
        return JSON.stringify(this);
    };
    Rectangle.prototype.setPosition = function (pos) {
        this.x = pos.x;
        this.y = pos.y;
        return this;
    };
    Rectangle.prototype.setSize = function (size) {
        this.width = size.width;
        this.height = size.height;
        return this;
    };
    Rectangle.prototype.setGeomerty = function (rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.width = rect.width;
        this.height = rect.height;
        return this;
    };
    Rectangle.prototype.moveRectangle = function (offsetX, offsetY) {
        this.x += offsetX;
        this.y += offsetY;
        return this;
    };
    Rectangle.prototype.moveRectangleByPoint = function (offset) {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    };
    Rectangle.prototype.resize = function (deltaX, deltaY) {
        this.width += deltaX;
        this.height += deltaY;
        return this;
    };
    Rectangle.prototype.nonNegativeSize = function () {
        if (this.width < 0)
            this.width = 0;
        if (this.height < 0)
            this.height = 0;
        return this;
    };
    Rectangle.prototype.multiply = function (multiplierX, multiplierY) {
        this.x *= multiplierX;
        this.y *= multiplierY;
        this.width *= multiplierX;
        this.height *= multiplierY;
        return this;
    };
    Rectangle.prototype.equals = function (obj) {
        return Rectangle.equals(this, obj);
    };
    Rectangle.prototype.clone = function () {
        var rect = new Rectangle(0, 0, 0, 0);
        rect.copyFrom(this);
        return rect;
    };
    Rectangle.prototype.copyFrom = function (obj) {
        this.x = obj.x;
        this.y = obj.y;
        this.width = obj.width;
        this.height = obj.height;
    };
    Rectangle.prototype.containsPoint = function (point) {
        return Rectangle.containsPoint(this, point);
    };
    Rectangle.prototype.containsRectangle = function (rectangle) {
        return this.x <= rectangle.x &&
            this.right >= rectangle.right &&
            this.y <= rectangle.y &&
            this.bottom >= rectangle.bottom;
    };
    Rectangle.prototype.inflate = function (deltaX, deltaY) {
        if (deltaY === void 0) { deltaY = deltaX; }
        this.x -= deltaX;
        this.y -= deltaY;
        this.width += deltaX * 2;
        this.height += deltaY * 2;
        return this;
    };
    Rectangle.prototype.applyOffsetsInside = function (offsets) {
        this.x += offsets.left;
        this.y += offsets.top;
        this.width -= offsets.left + offsets.right;
        this.height -= offsets.top + offsets.bottom;
        return this;
    };
    Rectangle.prototype.applyNormalizedOffsetsInside = function (offsets) {
        var left = Math.max(0, offsets.left);
        var right = Math.max(0, offsets.right);
        var horSum = left + right;
        if (horSum !== 0) {
            if (horSum <= this.width) {
                this.x += left;
                this.width -= horSum;
            }
            else {
                this.x += this.width * (left / horSum);
                this.width = 0;
            }
        }
        var top = Math.max(0, offsets.top);
        var bottom = Math.max(0, offsets.bottom);
        var vertSum = top + bottom;
        if (vertSum !== 0) {
            if (vertSum <= this.height) {
                this.y += top;
                this.height -= vertSum;
            }
            else {
                this.y += this.height * (top / vertSum);
                this.height = 0;
            }
        }
        return this;
    };
    Rectangle.prototype.applyOffsetsOutside = function (offsets) {
        this.x -= offsets.left;
        this.y -= offsets.top;
        this.width += offsets.left + offsets.right;
        this.height += offsets.top + offsets.bottom;
        return this;
    };
    Rectangle.prototype.applyConverter = function (converter) {
        this.x = converter(this.x);
        this.y = converter(this.y);
        this.width = converter(this.width);
        this.height = converter(this.height);
        return this;
    };
    Rectangle.getHorizIntersection = function (objA, objB) {
        return algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.x, objA.width), new fixed_1.FixedInterval(objB.x, objB.width));
    };
    Rectangle.getVertIntersection = function (objA, objB) {
        return algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.y, objA.height), new fixed_1.FixedInterval(objB.y, objB.height));
    };
    Rectangle.getIntersection = function (objA, objB) {
        var horInters = algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.x, objA.width), new fixed_1.FixedInterval(objB.x, objB.width));
        if (!horInters)
            return null;
        var vertInters = algorithms_1.IntervalAlgorithms.getIntersection(new fixed_1.FixedInterval(objA.y, objA.height), new fixed_1.FixedInterval(objB.y, objB.height));
        if (!vertInters)
            return null;
        return new Rectangle(horInters.start, vertInters.start, horInters.length, vertInters.length);
    };
    Rectangle.getHorNonCollapsedIntersection = function (objA, objB) {
        var inters = Rectangle.getHorizIntersection(objA, objB);
        return inters && !inters.isCollapsed() ? inters : null;
    };
    Rectangle.getVertNonCollapsedIntersection = function (objA, objB) {
        var inters = Rectangle.getVertIntersection(objA, objB);
        return inters && !inters.isCollapsed() ? inters : null;
    };
    Rectangle.getNonCollapsedIntersection = function (objA, objB) {
        var inters = Rectangle.getIntersection(objA, objB);
        return inters && !inters.isCollapsed() ? inters : null;
    };
    Rectangle.areIntersected = function (rectA, rectB) {
        return !(rectA.x > rectB.x + rectB.width || rectB.x > rectA.x + rectA.width) &&
            !(rectA.y > rectB.y + rectB.height || rectB.y > rectA.y + rectA.height);
    };
    Rectangle.union = function (rectA, rectB) {
        var right = Math.max(rectA.x + rectA.width, rectB.x + rectB.width);
        var bottom = Math.max(rectA.y + rectA.height, rectB.y + rectB.height);
        var x = Math.min(rectA.x, rectB.x);
        var y = Math.min(rectA.y, rectB.y);
        return new Rectangle(x, y, right - x, bottom - y);
    };
    Rectangle.equals = function (a, b) {
        return a.x === b.x &&
            a.y === b.y &&
            a.width === b.width &&
            a.height === b.height;
    };
    Rectangle.center = function (rect) {
        return new point_1.Point(rect.x + rect.width / 2, rect.y + rect.height / 2);
    };
    Rectangle.containsPoint = function (rect, point) {
        var right = rect.x + rect.width;
        var bottom = rect.y + rect.height;
        return point.y >= rect.y && bottom >= point.y &&
            point.x >= rect.x && right >= point.x;
    };
    return Rectangle;
}());
exports.Rectangle = Rectangle;
var HitTestDeviation;
(function (HitTestDeviation) {
    HitTestDeviation[HitTestDeviation["None"] = 0] = "None";
    HitTestDeviation[HitTestDeviation["Top"] = 1] = "Top";
    HitTestDeviation[HitTestDeviation["Bottom"] = 2] = "Bottom";
    HitTestDeviation[HitTestDeviation["Left"] = 4] = "Left";
    HitTestDeviation[HitTestDeviation["Right"] = 8] = "Right";
})(HitTestDeviation = exports.HitTestDeviation || (exports.HitTestDeviation = {}));
var RectangleDeviation = (function () {
    function RectangleDeviation(initRectangle, initPoint) {
        this.initRectangle = initRectangle;
        this.initPoint = initPoint;
        this.deviation = new flag_1.Flag(HitTestDeviation.None);
    }
    RectangleDeviation.prototype.calcDeviation = function () {
        if (this.initPoint.x < this.initRectangle.x)
            this.deviation.set(HitTestDeviation.Left, true);
        else if (this.initPoint.x > this.initRectangle.right)
            this.deviation.set(HitTestDeviation.Right, true);
        if (this.initPoint.y < this.initRectangle.y)
            this.deviation.set(HitTestDeviation.Top, true);
        else if (this.initPoint.y > this.initRectangle.bottom)
            this.deviation.set(HitTestDeviation.Bottom, true);
        return this;
    };
    RectangleDeviation.prototype.calcAdditionalParams = function () {
        this.insidePoint = this.initPoint.clone();
        this.offsetToInside = new point_1.Point(0, 0);
        if (this.deviation.get(HitTestDeviation.Left)) {
            this.insidePoint.x = this.initRectangle.x;
            this.offsetToInside.x = this.insidePoint.x - this.initPoint.x;
        }
        else if (this.deviation.get(HitTestDeviation.Right)) {
            this.insidePoint.x = this.initRectangle.right;
            this.offsetToInside.x = this.initPoint.x - this.insidePoint.x;
        }
        if (this.deviation.get(HitTestDeviation.Top)) {
            this.insidePoint.y = this.initRectangle.y;
            this.offsetToInside.y = this.insidePoint.y - this.initPoint.y;
        }
        else if (this.deviation.get(HitTestDeviation.Bottom)) {
            this.insidePoint.y = this.initRectangle.bottom;
            this.offsetToInside.y = this.initPoint.y - this.insidePoint.y;
        }
        return this;
    };
    return RectangleDeviation;
}());
exports.RectangleDeviation = RectangleDeviation;
