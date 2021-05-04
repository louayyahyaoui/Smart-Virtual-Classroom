/**
 * DevExtreme (events/transform.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
exports.rotateend = exports.rotate = exports.rotatestart = exports.pinchend = exports.pinch = exports.pinchstart = exports.zoomend = exports.zoom = exports.zoomstart = exports.translateend = exports.translate = exports.translatestart = exports.transformend = exports.transform = exports.transformstart = void 0;
var _math = require("../core/utils/math");
var iteratorUtils = _interopRequireWildcard(require("../core/utils/iterator"));
var _index = require("./utils/index");
var _emitter = _interopRequireDefault(require("./core/emitter"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _getRequireWildcardCache() {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cache = new WeakMap;
    _getRequireWildcardCache = function() {
        return cache
    };
    return cache
}

function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            "default": obj
        }
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}
var DX_PREFIX = "dx";
var TRANSFORM = "transform";
var TRANSLATE = "translate";
var PINCH = "pinch";
var ROTATE = "rotate";
var START_POSTFIX = "start";
var UPDATE_POSTFIX = "";
var END_POSTFIX = "end";
var eventAliases = [];
var addAlias = function(eventName, eventArgs) {
    eventAliases.push({
        name: eventName,
        args: eventArgs
    })
};
addAlias(TRANSFORM, {
    scale: true,
    deltaScale: true,
    rotation: true,
    deltaRotation: true,
    translation: true,
    deltaTranslation: true
});
addAlias(TRANSLATE, {
    translation: true,
    deltaTranslation: true
});
addAlias(PINCH, {
    scale: true,
    deltaScale: true
});
addAlias(ROTATE, {
    rotation: true,
    deltaRotation: true
});
var getVector = function(first, second) {
    return {
        x: second.pageX - first.pageX,
        y: -second.pageY + first.pageY,
        centerX: .5 * (second.pageX + first.pageX),
        centerY: .5 * (second.pageY + first.pageY)
    }
};
var getEventVector = function(e) {
    var pointers = e.pointers;
    return getVector(pointers[0], pointers[1])
};
var getDistance = function(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y)
};
var getScale = function(firstVector, secondVector) {
    return getDistance(firstVector) / getDistance(secondVector)
};
var getRotation = function(firstVector, secondVector) {
    var scalarProduct = firstVector.x * secondVector.x + firstVector.y * secondVector.y;
    var distanceProduct = getDistance(firstVector) * getDistance(secondVector);
    if (0 === distanceProduct) {
        return 0
    }
    var sign = (0, _math.sign)(firstVector.x * secondVector.y - secondVector.x * firstVector.y);
    var angle = Math.acos((0, _math.fitIntoRange)(scalarProduct / distanceProduct, -1, 1));
    return sign * angle
};
var getTranslation = function(firstVector, secondVector) {
    return {
        x: firstVector.centerX - secondVector.centerX,
        y: firstVector.centerY - secondVector.centerY
    }
};
var TransformEmitter = _emitter.default.inherit({
    validatePointers: function(e) {
        return (0, _index.hasTouches)(e) > 1
    },
    start: function(e) {
        this._accept(e);
        var startVector = getEventVector(e);
        this._startVector = startVector;
        this._prevVector = startVector;
        this._fireEventAliases(START_POSTFIX, e)
    },
    move: function(e) {
        var currentVector = getEventVector(e);
        var eventArgs = this._getEventArgs(currentVector);
        this._fireEventAliases(UPDATE_POSTFIX, e, eventArgs);
        this._prevVector = currentVector
    },
    end: function(e) {
        var eventArgs = this._getEventArgs(this._prevVector);
        this._fireEventAliases(END_POSTFIX, e, eventArgs)
    },
    _getEventArgs: function(vector) {
        return {
            scale: getScale(vector, this._startVector),
            deltaScale: getScale(vector, this._prevVector),
            rotation: getRotation(vector, this._startVector),
            deltaRotation: getRotation(vector, this._prevVector),
            translation: getTranslation(vector, this._startVector),
            deltaTranslation: getTranslation(vector, this._prevVector)
        }
    },
    _fireEventAliases: function(eventPostfix, originalEvent, eventArgs) {
        eventArgs = eventArgs || {};
        iteratorUtils.each(eventAliases, function(_, eventAlias) {
            var args = {};
            iteratorUtils.each(eventAlias.args, function(name) {
                if (name in eventArgs) {
                    args[name] = eventArgs[name]
                }
            });
            this._fireEvent(DX_PREFIX + eventAlias.name + eventPostfix, originalEvent, args)
        }.bind(this))
    }
});
var eventNames = eventAliases.reduce(function(result, eventAlias) {
    [START_POSTFIX, UPDATE_POSTFIX, END_POSTFIX].forEach(function(eventPostfix) {
        result.push(DX_PREFIX + eventAlias.name + eventPostfix)
    });
    return result
}, []);
(0, _emitter_registrator.default)({
    emitter: TransformEmitter,
    events: eventNames
});
var exportNames = {};
iteratorUtils.each(eventNames, function(_, eventName) {
    exportNames[eventName.substring(DX_PREFIX.length)] = eventName
});
var transformstart = exportNames.transformstart,
    transform = exportNames.transform,
    transformend = exportNames.transformend,
    translatestart = exportNames.translatestart,
    translate = exportNames.translate,
    translateend = exportNames.translateend,
    zoomstart = exportNames.zoomstart,
    zoom = exportNames.zoom,
    zoomend = exportNames.zoomend,
    pinchstart = exportNames.pinchstart,
    pinch = exportNames.pinch,
    pinchend = exportNames.pinchend,
    rotatestart = exportNames.rotatestart,
    rotate = exportNames.rotate,
    rotateend = exportNames.rotateend;
exports.rotateend = rotateend;
exports.rotate = rotate;
exports.rotatestart = rotatestart;
exports.pinchend = pinchend;
exports.pinch = pinch;
exports.pinchstart = pinchstart;
exports.zoomend = zoomend;
exports.zoom = zoom;
exports.zoomstart = zoomstart;
exports.translateend = translateend;
exports.translate = translate;
exports.translatestart = translatestart;
exports.transformend = transformend;
exports.transform = transform;
exports.transformstart = transformstart;
