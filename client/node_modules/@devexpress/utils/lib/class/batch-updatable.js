"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BatchUpdatableObject = (function () {
    function BatchUpdatableObject() {
        this.suspendUpdateCount = 0;
        this.occurredEvents = 0;
    }
    BatchUpdatableObject.prototype.beginUpdate = function () {
        if (this.suspendUpdateCount === 0)
            this.onUpdateLocked();
        if (this.suspendUpdateCount < 0)
            this.suspendUpdateCount--;
        else
            this.suspendUpdateCount++;
    };
    BatchUpdatableObject.prototype.endUpdate = function () {
        if (this.suspendUpdateCount < 0)
            this.suspendUpdateCount++;
        else if (this.suspendUpdateCount > 0)
            this.suspendUpdateCount--;
        if (!this.isUpdateLocked()) {
            var occurredEvents = this.occurredEvents;
            this.occurredEvents = 0;
            this.onUpdateUnlocked(occurredEvents);
        }
    };
    BatchUpdatableObject.prototype.suspendUpdate = function () {
        if (this.suspendUpdateCount > 0) {
            this.suspendUpdateCount *= -1;
            var occurredEvents = this.occurredEvents;
            this.occurredEvents = 0;
            this.onUpdateUnlocked(occurredEvents);
        }
    };
    BatchUpdatableObject.prototype.continueUpdate = function () {
        if (this.suspendUpdateCount < 0)
            this.suspendUpdateCount *= -1;
    };
    BatchUpdatableObject.prototype.isUpdateLocked = function () {
        return this.suspendUpdateCount > 0;
    };
    BatchUpdatableObject.prototype.onUpdateLocked = function () { };
    BatchUpdatableObject.prototype.registerOccurredEvent = function (eventMask) {
        this.occurredEvents |= eventMask;
    };
    BatchUpdatableObject.prototype.resetOccurredEvents = function () {
        this.occurredEvents = 0;
    };
    BatchUpdatableObject.prototype.isLocked = function () {
        return this.suspendUpdateCount !== 0;
    };
    return BatchUpdatableObject;
}());
exports.BatchUpdatableObject = BatchUpdatableObject;
var EmptyBatchUpdatableObject = (function () {
    function EmptyBatchUpdatableObject() {
    }
    EmptyBatchUpdatableObject.prototype.beginUpdate = function () { };
    EmptyBatchUpdatableObject.prototype.endUpdate = function () { };
    return EmptyBatchUpdatableObject;
}());
exports.EmptyBatchUpdatableObject = EmptyBatchUpdatableObject;
