"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DelayedActionManager = (function () {
    function DelayedActionManager(action) {
        this.action = action;
        this.reset();
    }
    Object.defineProperty(DelayedActionManager.prototype, "actionExecuted", {
        get: function () {
            return this.actionTimeoutId === null;
        },
        enumerable: true,
        configurable: true
    });
    DelayedActionManager.prototype.reset = function () {
        this.actionTimeout = undefined;
        this.actionTimeoutId = undefined;
        this.actionStartTime = undefined;
    };
    DelayedActionManager.prototype.start = function (timeout) {
        var _this = this;
        this.actionTimeout = timeout;
        this.actionTimeoutId = setTimeout(function () { return _this.executeAction(); }, this.actionTimeout);
        this.actionStartTime = Date.now();
    };
    DelayedActionManager.prototype.executeIfTimerExpired = function () {
        if (Date.now() - this.actionStartTime > this.actionTimeout)
            this.executeAction();
    };
    DelayedActionManager.prototype.executeAction = function () {
        if (!this.actionExecuted) {
            this.action();
            this.stop();
        }
    };
    DelayedActionManager.prototype.stop = function () {
        clearTimeout(this.actionTimeoutId);
        this.actionTimeoutId = null;
    };
    return DelayedActionManager;
}());
exports.DelayedActionManager = DelayedActionManager;
