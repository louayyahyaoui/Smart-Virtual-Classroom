/**
 * DevExtreme (events/drag.js)
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
exports.drop = exports.leave = exports.enter = exports.end = exports.start = exports.move = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _element_data = require("../core/element_data");
var _array = require("../core/utils/array");
var iteratorUtils = _interopRequireWildcard(require("../core/utils/iterator"));
var _dom = require("../core/utils/dom");
var _event_registrator = _interopRequireDefault(require("./core/event_registrator"));
var _index = require("./utils/index");
var _emitter = _interopRequireDefault(require("./gesture/emitter.gesture"));
var _emitter_registrator = _interopRequireDefault(require("./core/emitter_registrator"));

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

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DRAG_START_EVENT = "dxdragstart";
exports.start = DRAG_START_EVENT;
var DRAG_EVENT = "dxdrag";
exports.move = DRAG_EVENT;
var DRAG_END_EVENT = "dxdragend";
exports.end = DRAG_END_EVENT;
var DRAG_ENTER_EVENT = "dxdragenter";
exports.enter = DRAG_ENTER_EVENT;
var DRAG_LEAVE_EVENT = "dxdragleave";
exports.leave = DRAG_LEAVE_EVENT;
var DROP_EVENT = "dxdrop";
exports.drop = DROP_EVENT;
var DX_DRAG_EVENTS_COUNT_KEY = "dxDragEventsCount";
var knownDropTargets = [];
var knownDropTargetSelectors = [];
var knownDropTargetConfigs = [];
var dropTargetRegistration = {
    setup: function(element, data) {
        var knownDropTarget = (0, _array.inArray)(element, knownDropTargets) !== -1;
        if (!knownDropTarget) {
            knownDropTargets.push(element);
            knownDropTargetSelectors.push([]);
            knownDropTargetConfigs.push(data || {})
        }
    },
    add: function(element, handleObj) {
        var index = (0, _array.inArray)(element, knownDropTargets);
        this.updateEventsCounter(element, handleObj.type, 1);
        var selector = handleObj.selector;
        if ((0, _array.inArray)(selector, knownDropTargetSelectors[index]) === -1) {
            knownDropTargetSelectors[index].push(selector)
        }
    },
    updateEventsCounter: function(element, event, value) {
        if ([DRAG_ENTER_EVENT, DRAG_LEAVE_EVENT, DROP_EVENT].indexOf(event) > -1) {
            var eventsCount = (0, _element_data.data)(element, DX_DRAG_EVENTS_COUNT_KEY) || 0;
            (0, _element_data.data)(element, DX_DRAG_EVENTS_COUNT_KEY, Math.max(0, eventsCount + value))
        }
    },
    remove: function(element, handleObj) {
        this.updateEventsCounter(element, handleObj.type, -1)
    },
    teardown: function(element) {
        var handlersCount = (0, _element_data.data)(element, DX_DRAG_EVENTS_COUNT_KEY);
        if (!handlersCount) {
            var index = (0, _array.inArray)(element, knownDropTargets);
            knownDropTargets.splice(index, 1);
            knownDropTargetSelectors.splice(index, 1);
            knownDropTargetConfigs.splice(index, 1);
            (0, _element_data.removeData)(element, DX_DRAG_EVENTS_COUNT_KEY)
        }
    }
};
(0, _event_registrator.default)(DRAG_ENTER_EVENT, dropTargetRegistration);
(0, _event_registrator.default)(DRAG_LEAVE_EVENT, dropTargetRegistration);
(0, _event_registrator.default)(DROP_EVENT, dropTargetRegistration);
var getItemDelegatedTargets = function($element) {
    var dropTargetIndex = (0, _array.inArray)($element.get(0), knownDropTargets);
    var dropTargetSelectors = knownDropTargetSelectors[dropTargetIndex].filter(function(selector) {
        return selector
    });
    var $delegatedTargets = $element.find(dropTargetSelectors.join(", "));
    if ((0, _array.inArray)(void 0, knownDropTargetSelectors[dropTargetIndex]) !== -1) {
        $delegatedTargets = $delegatedTargets.add($element)
    }
    return $delegatedTargets
};
var getItemConfig = function($element) {
    var dropTargetIndex = (0, _array.inArray)($element.get(0), knownDropTargets);
    return knownDropTargetConfigs[dropTargetIndex]
};
var getItemPosition = function(dropTargetConfig, $element) {
    if (dropTargetConfig.itemPositionFunc) {
        return dropTargetConfig.itemPositionFunc($element)
    } else {
        return $element.offset()
    }
};
var getItemSize = function(dropTargetConfig, $element) {
    if (dropTargetConfig.itemSizeFunc) {
        return dropTargetConfig.itemSizeFunc($element)
    }
    return {
        width: $element.get(0).getBoundingClientRect().width,
        height: $element.get(0).getBoundingClientRect().height
    }
};
var DragEmitter = _emitter.default.inherit({
    ctor: function(element) {
        this.callBase(element);
        this.direction = "both"
    },
    _init: function(e) {
        this._initEvent = e
    },
    _start: function(e) {
        e = this._fireEvent(DRAG_START_EVENT, this._initEvent);
        this._maxLeftOffset = e.maxLeftOffset;
        this._maxRightOffset = e.maxRightOffset;
        this._maxTopOffset = e.maxTopOffset;
        this._maxBottomOffset = e.maxBottomOffset;
        var dropTargets = (0, _array.wrapToArray)(e.targetElements || (null === e.targetElements ? [] : knownDropTargets));
        this._dropTargets = iteratorUtils.map(dropTargets, function(element) {
            return (0, _renderer.default)(element).get(0)
        })
    },
    _move: function(e) {
        var eventData = (0, _index.eventData)(e);
        var dragOffset = this._calculateOffset(eventData);
        e = this._fireEvent(DRAG_EVENT, e, {
            offset: dragOffset
        });
        this._processDropTargets(e);
        if (!e._cancelPreventDefault) {
            e.preventDefault()
        }
    },
    _calculateOffset: function(eventData) {
        return {
            x: this._calculateXOffset(eventData),
            y: this._calculateYOffset(eventData)
        }
    },
    _calculateXOffset: function(eventData) {
        if ("vertical" !== this.direction) {
            var offset = eventData.x - this._startEventData.x;
            return this._fitOffset(offset, this._maxLeftOffset, this._maxRightOffset)
        }
        return 0
    },
    _calculateYOffset: function(eventData) {
        if ("horizontal" !== this.direction) {
            var offset = eventData.y - this._startEventData.y;
            return this._fitOffset(offset, this._maxTopOffset, this._maxBottomOffset)
        }
        return 0
    },
    _fitOffset: function(offset, minOffset, maxOffset) {
        if (null != minOffset) {
            offset = Math.max(offset, -minOffset)
        }
        if (null != maxOffset) {
            offset = Math.min(offset, maxOffset)
        }
        return offset
    },
    _processDropTargets: function(e) {
        var target = this._findDropTarget(e);
        var sameTarget = target === this._currentDropTarget;
        if (!sameTarget) {
            this._fireDropTargetEvent(e, DRAG_LEAVE_EVENT);
            this._currentDropTarget = target;
            this._fireDropTargetEvent(e, DRAG_ENTER_EVENT)
        }
    },
    _fireDropTargetEvent: function(event, eventName) {
        if (!this._currentDropTarget) {
            return
        }
        var eventData = {
            type: eventName,
            originalEvent: event,
            draggingElement: this._$element.get(0),
            target: this._currentDropTarget
        };
        (0, _index.fireEvent)(eventData)
    },
    _findDropTarget: function(e) {
        var that = this;
        var result;
        iteratorUtils.each(knownDropTargets, function(_, target) {
            if (!that._checkDropTargetActive(target)) {
                return
            }
            var $target = (0, _renderer.default)(target);
            iteratorUtils.each(getItemDelegatedTargets($target), function(_, delegatedTarget) {
                var $delegatedTarget = (0, _renderer.default)(delegatedTarget);
                if (that._checkDropTarget(getItemConfig($target), $delegatedTarget, (0, _renderer.default)(result), e)) {
                    result = delegatedTarget
                }
            })
        });
        return result
    },
    _checkDropTargetActive: function(target) {
        var active = false;
        iteratorUtils.each(this._dropTargets, function(_, activeTarget) {
            active = active || activeTarget === target || (0, _dom.contains)(activeTarget, target);
            return !active
        });
        return active
    },
    _checkDropTarget: function(config, $target, $prevTarget, e) {
        var isDraggingElement = $target.get(0) === (0, _renderer.default)(e.target).get(0);
        if (isDraggingElement) {
            return false
        }
        var targetPosition = getItemPosition(config, $target);
        if (e.pageX < targetPosition.left) {
            return false
        }
        if (e.pageY < targetPosition.top) {
            return false
        }
        var targetSize = getItemSize(config, $target);
        if (e.pageX > targetPosition.left + targetSize.width) {
            return false
        }
        if (e.pageY > targetPosition.top + targetSize.height) {
            return false
        }
        if ($prevTarget.length && $prevTarget.closest($target).length) {
            return false
        }
        if (config.checkDropTarget && !config.checkDropTarget($target, e)) {
            return false
        }
        return $target
    },
    _end: function(e) {
        var eventData = (0, _index.eventData)(e);
        this._fireEvent(DRAG_END_EVENT, e, {
            offset: this._calculateOffset(eventData)
        });
        this._fireDropTargetEvent(e, DROP_EVENT);
        delete this._currentDropTarget
    }
});
(0, _emitter_registrator.default)({
    emitter: DragEmitter,
    events: [DRAG_START_EVENT, DRAG_EVENT, DRAG_END_EVENT]
});
