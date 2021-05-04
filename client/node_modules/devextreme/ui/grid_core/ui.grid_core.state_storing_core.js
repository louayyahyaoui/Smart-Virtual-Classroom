/**
 * DevExtreme (ui/grid_core/ui.grid_core.state_storing_core.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.StateStoringController = void 0;
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _window = require("../../core/utils/window");
var _uiGrid_core = _interopRequireDefault(require("./ui.grid_core.modules"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _browser = _interopRequireDefault(require("../../core/utils/browser"));
var _storage = require("../../core/utils/storage");
var _extend = require("../../core/utils/extend");
var _iterator = require("../../core/utils/iterator");
var _type = require("../../core/utils/type");
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
var parseDates = function parseDates(state) {
    if (!state) {
        return
    }(0, _iterator.each)(state, function(key, value) {
        if ((0, _type.isPlainObject)(value) || Array.isArray(value)) {
            parseDates(value)
        } else {
            if ("string" === typeof value) {
                var date = DATE_REGEX.exec(value);
                if (date) {
                    state[key] = new Date(Date.UTC(+date[1], +date[2] - 1, +date[3], +date[4], +date[5], +date[6]))
                }
            }
        }
    })
};
var StateStoringController = _uiGrid_core.default.ViewController.inherit(function() {
    var getStorage = function(options) {
        var storage = "sessionStorage" === options.type ? (0, _storage.sessionStorage)() : (0, _window.getWindow)().localStorage;
        if (!storage) {
            if ("file:" === (0, _window.getWindow)().location.protocol && _browser.default.msie) {
                throw new Error("E1038")
            } else {
                throw new Error("E1007")
            }
        }
        return storage
    };
    var getUniqueStorageKey = function(options) {
        return (0, _type.isDefined)(options.storageKey) ? options.storageKey : "storage"
    };
    return {
        _loadState: function() {
            var options = this.option("stateStoring");
            if ("custom" === options.type) {
                return options.customLoad && options.customLoad()
            }
            try {
                return JSON.parse(getStorage(options).getItem(getUniqueStorageKey(options)))
            } catch (e) {
                _ui.default.log(e.message)
            }
        },
        _saveState: function(state) {
            var options = this.option("stateStoring");
            if ("custom" === options.type) {
                options.customSave && options.customSave(state);
                return
            }
            try {
                getStorage(options).setItem(getUniqueStorageKey(options), JSON.stringify(state))
            } catch (e) {
                _ui.default.log(e.message)
            }
        },
        publicMethods: function() {
            return ["state"]
        },
        isEnabled: function() {
            return this.option("stateStoring.enabled")
        },
        init: function() {
            var that = this;
            that._state = {};
            that._isLoaded = false;
            that._isLoading = false;
            that._windowUnloadHandler = function() {
                if (void 0 !== that._savingTimeoutID) {
                    that._saveState(that.state())
                }
            };
            _events_engine.default.on((0, _window.getWindow)(), "unload", that._windowUnloadHandler);
            return that
        },
        isLoaded: function() {
            return this._isLoaded
        },
        isLoading: function() {
            return this._isLoading
        },
        load: function() {
            var _this = this;
            this._isLoading = true;
            var loadResult = (0, _deferred.fromPromise)(this._loadState());
            loadResult.always(function() {
                _this._isLoaded = true;
                _this._isLoading = false
            }).done(function(state) {
                _this.state(state)
            });
            return loadResult
        },
        state: function(_state) {
            var that = this;
            if (!arguments.length) {
                return (0, _extend.extend)(true, {}, that._state)
            } else {
                that._state = (0, _extend.extend)({}, _state);
                parseDates(that._state)
            }
        },
        save: function() {
            var that = this;
            clearTimeout(that._savingTimeoutID);
            that._savingTimeoutID = setTimeout(function() {
                that._saveState(that.state());
                that._savingTimeoutID = void 0
            }, that.option("stateStoring.savingTimeout"))
        },
        optionChanged: function(args) {
            var that = this;
            switch (args.name) {
                case "stateStoring":
                    if (that.isEnabled() && !that.isLoading()) {
                        that.load()
                    }
                    args.handled = true;
                    break;
                default:
                    that.callBase(args)
            }
        },
        dispose: function() {
            clearTimeout(this._savingTimeoutID);
            _events_engine.default.off((0, _window.getWindow)(), "unload", this._windowUnloadHandler)
        }
    }
}());
exports.StateStoringController = StateStoringController;
