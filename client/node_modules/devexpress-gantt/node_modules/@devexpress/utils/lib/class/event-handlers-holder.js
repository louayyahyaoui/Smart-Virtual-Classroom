"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var touch_1 = require("../utils/touch");
var DomEventHandler = (function () {
    function DomEventHandler(element, eventName, handler, options) {
        if (options === void 0) { options = true; }
        this.element = element;
        this.eventName = eventName;
        this.handler = handler;
        this.options = options;
    }
    return DomEventHandler;
}());
var DomEventHandlersHolder = (function () {
    function DomEventHandlersHolder() {
        this.handlers = [];
    }
    DomEventHandlersHolder.prototype.addListener = function (element, eventName, handler, options) {
        if (options === void 0) { options = true; }
        this.handlers.push(new DomEventHandler(element, eventName, handler, options));
        element.addEventListener(eventName, handler, options);
    };
    DomEventHandlersHolder.prototype.addListenerToWindow = function (eventName, handler, options) {
        if (options === void 0) { options = true; }
        this.handlers.push(new DomEventHandler(window, eventName, handler, options));
        window.addEventListener(eventName, handler, options);
    };
    DomEventHandlersHolder.prototype.addListenerToDocument = function (eventName, handler, options) {
        if (options === void 0) { options = true; }
        var attachingAllowed = touch_1.TouchUtils.onEventAttachingToDocument(eventName, handler);
        if (attachingAllowed) {
            this.handlers.push(new DomEventHandler(document, eventName, handler, options));
            document.addEventListener(eventName, handler, options);
        }
    };
    DomEventHandlersHolder.prototype.removeAllListeners = function () {
        this.handlers.forEach(function (evtHandler) { return evtHandler.element.removeEventListener(evtHandler.eventName, evtHandler.handler, evtHandler.options); });
        this.handlers = [];
    };
    return DomEventHandlersHolder;
}());
exports.DomEventHandlersHolder = DomEventHandlersHolder;
