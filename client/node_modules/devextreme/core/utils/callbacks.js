/**
 * DevExtreme (core/utils/callbacks.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var Callback = function(options) {
    this._options = options || {};
    this._list = [];
    this._queue = [];
    this._firing = false;
    this._fired = false;
    this._firingIndexes = []
};
Callback.prototype._fireCore = function(context, args) {
    var firingIndexes = this._firingIndexes;
    var list = this._list;
    var stopOnFalse = this._options.stopOnFalse;
    var step = firingIndexes.length;
    for (firingIndexes[step] = 0; firingIndexes[step] < list.length; firingIndexes[step]++) {
        var result = list[firingIndexes[step]].apply(context, args);
        if (false === result && stopOnFalse) {
            break
        }
    }
    firingIndexes.pop()
};
Callback.prototype.add = function(fn) {
    if ("function" === typeof fn && (!this._options.unique || !this.has(fn))) {
        this._list.push(fn)
    }
    return this
};
Callback.prototype.remove = function(fn) {
    var list = this._list;
    var firingIndexes = this._firingIndexes;
    var index = list.indexOf(fn);
    if (index > -1) {
        list.splice(index, 1);
        if (this._firing && firingIndexes.length) {
            for (var step = 0; step < firingIndexes.length; step++) {
                if (index <= firingIndexes[step]) {
                    firingIndexes[step]--
                }
            }
        }
    }
    return this
};
Callback.prototype.has = function(fn) {
    var list = this._list;
    return fn ? list.indexOf(fn) > -1 : !!list.length
};
Callback.prototype.empty = function(fn) {
    this._list = [];
    return this
};
Callback.prototype.fireWith = function(context, args) {
    var queue = this._queue;
    args = args || [];
    args = args.slice ? args.slice() : args;
    if (this._options.syncStrategy) {
        this._firing = true;
        this._fireCore(context, args)
    } else {
        queue.push([context, args]);
        if (this._firing) {
            return
        }
        this._firing = true;
        while (queue.length) {
            var memory = queue.shift();
            this._fireCore(memory[0], memory[1])
        }
    }
    this._firing = false;
    this._fired = true;
    return this
};
Callback.prototype.fire = function() {
    this.fireWith(this, arguments)
};
Callback.prototype.fired = function() {
    return this._fired
};
var Callbacks = function(options) {
    return new Callback(options)
};
var _default = Callbacks;
exports.default = _default;
module.exports = exports.default;
