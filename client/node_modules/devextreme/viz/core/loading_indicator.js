/**
 * DevExtreme (viz/core/loading_indicator.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.plugin = exports.LoadingIndicator = void 0;
var _utils = require("./utils");
var STATE_HIDDEN = 0;
var STATE_SHOWN = 1;
var ANIMATION_EASING = "linear";
var ANIMATION_DURATION = 400;
var LOADING_INDICATOR_READY = "loadingIndicatorReady";
var LoadingIndicator = function(parameters) {
    var that = this;
    var renderer = parameters.renderer;
    that._group = renderer.g().attr({
        "class": "dx-loading-indicator"
    }).linkOn(renderer.root, {
        name: "loading-indicator",
        after: "peripheral"
    });
    that._rect = renderer.rect().attr({
        opacity: 0
    }).append(that._group);
    that._text = renderer.text().attr({
        align: "center"
    }).append(that._group);
    that._createStates(parameters.eventTrigger, that._group, renderer.root, parameters.notify)
};
exports.LoadingIndicator = LoadingIndicator;
LoadingIndicator.prototype = {
    constructor: LoadingIndicator,
    _createStates: function(eventTrigger, group, root, notify) {
        var that = this;
        that._states = [{
            opacity: 0,
            start: function() {
                notify(false)
            },
            complete: function() {
                group.linkRemove();
                root.css({
                    "pointer-events": ""
                });
                eventTrigger(LOADING_INDICATOR_READY)
            }
        }, {
            opacity: .85,
            start: function() {
                group.linkAppend();
                root.css({
                    "pointer-events": "none"
                });
                notify(true)
            },
            complete: function() {
                eventTrigger(LOADING_INDICATOR_READY)
            }
        }];
        that._state = STATE_HIDDEN
    },
    setSize: function(size) {
        var width = size.width;
        var height = size.height;
        this._rect.attr({
            width: width,
            height: height
        });
        this._text.attr({
            x: width / 2,
            y: height / 2
        })
    },
    setOptions: function(options) {
        this._rect.attr({
            fill: options.backgroundColor
        });
        this._text.css((0, _utils.patchFontOptions)(options.font)).attr({
            text: options.text,
            "class": options.cssClass
        });
        this[options.show ? "show" : "hide"]()
    },
    dispose: function() {
        var that = this;
        that._group.linkRemove().linkOff();
        that._group = that._rect = that._text = that._states = null
    },
    _transit: function(stateId) {
        var that = this;
        var state;
        if (that._state !== stateId) {
            that._state = stateId;
            that._isHiding = false;
            state = that._states[stateId];
            that._rect.stopAnimation().animate({
                opacity: state.opacity
            }, {
                complete: state.complete,
                easing: ANIMATION_EASING,
                duration: ANIMATION_DURATION,
                unstoppable: true
            });
            that._noHiding = true;
            state.start();
            that._noHiding = false
        }
    },
    show: function() {
        this._transit(STATE_SHOWN)
    },
    hide: function() {
        this._transit(STATE_HIDDEN)
    },
    scheduleHiding: function() {
        if (!this._noHiding) {
            this._isHiding = true
        }
    },
    fulfillHiding: function() {
        if (this._isHiding) {
            this.hide()
        }
    }
};
var plugin = {
    name: "loading_indicator",
    init: function() {
        var that = this;
        that._loadingIndicator = new LoadingIndicator({
            eventTrigger: that._eventTrigger,
            renderer: that._renderer,
            notify: notify
        });
        that._scheduleLoadingIndicatorHiding();

        function notify(state) {
            that._skipLoadingIndicatorOptions = true;
            that.option("loadingIndicator", {
                show: state
            });
            that._skipLoadingIndicatorOptions = false;
            if (state) {
                that._stopCurrentHandling()
            }
        }
    },
    dispose: function() {
        this._loadingIndicator.dispose();
        this._loadingIndicator = null
    },
    members: {
        _scheduleLoadingIndicatorHiding: function() {
            this._loadingIndicator.scheduleHiding()
        },
        _fulfillLoadingIndicatorHiding: function() {
            this._loadingIndicator.fulfillHiding()
        },
        showLoadingIndicator: function() {
            this._loadingIndicator.show()
        },
        hideLoadingIndicator: function() {
            this._loadingIndicator.hide()
        },
        _onBeginUpdate: function() {
            if (!this._optionChangedLocker) {
                this._scheduleLoadingIndicatorHiding()
            }
        }
    },
    extenders: {
        _dataSourceLoadingChangedHandler: function(isLoading) {
            if (isLoading && (this._options.silent("loadingIndicator") || {}).enabled) {
                this._loadingIndicator.show()
            }
        },
        _setContentSize: function() {
            this._loadingIndicator.setSize(this._canvas)
        },
        endUpdate: function() {
            if (this._initialized && this._dataIsReady()) {
                this._fulfillLoadingIndicatorHiding()
            }
        }
    },
    customize: function(constructor) {
        var proto = constructor.prototype;
        if (proto._dataSourceChangedHandler) {
            var _dataSourceChangedHandler = proto._dataSourceChangedHandler;
            proto._dataSourceChangedHandler = function() {
                this._scheduleLoadingIndicatorHiding();
                _dataSourceChangedHandler.apply(this, arguments)
            }
        }
        constructor.addChange({
            code: "LOADING_INDICATOR",
            handler: function() {
                if (!this._skipLoadingIndicatorOptions) {
                    this._loadingIndicator.setOptions(this._getOption("loadingIndicator"))
                }
                this._scheduleLoadingIndicatorHiding()
            },
            isThemeDependent: true,
            option: "loadingIndicator",
            isOptionChange: true
        });
        proto._eventsMap.onLoadingIndicatorReady = {
            name: "loadingIndicatorReady"
        };
        var _drawn = proto._drawn;
        proto._drawn = function() {
            _drawn.apply(this, arguments);
            if (this._dataIsReady()) {
                this._fulfillLoadingIndicatorHiding()
            }
        }
    },
    fontFields: ["loadingIndicator.font"]
};
exports.plugin = plugin;
