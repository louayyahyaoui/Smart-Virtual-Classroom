/**
 * DevExtreme (animation/presets/presets.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.PresetCollection = exports.presets = void 0;
var _component = _interopRequireDefault(require("../../core/component"));
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _devices = _interopRequireDefault(require("../../core/devices"));
var _fx = _interopRequireDefault(require("../fx"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var directionPostfixes = {
    forward: " dx-forward",
    backward: " dx-backward",
    none: " dx-no-direction",
    undefined: " dx-no-direction"
};
var optionPrefix = "preset_";
var AnimationPresetCollection = _component.default.inherit({
    ctor: function() {
        this.callBase.apply(this, arguments);
        this._registeredPresets = [];
        this.resetToDefaults()
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            defaultAnimationDuration: 400,
            defaultAnimationDelay: 0,
            defaultStaggerAnimationDuration: 300,
            defaultStaggerAnimationDelay: 40,
            defaultStaggerAnimationStartDelay: 500
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function(_device) {
                return _device.phone
            },
            options: {
                defaultStaggerAnimationDuration: 350,
                defaultStaggerAnimationDelay: 50,
                defaultStaggerAnimationStartDelay: 0
            }
        }, {
            device: function() {
                return _devices.default.current().android || _devices.default.real.android
            },
            options: {
                defaultAnimationDelay: 100
            }
        }])
    },
    _getPresetOptionName: function(animationName) {
        return optionPrefix + animationName
    },
    _createAndroidSlideAnimationConfig: function(throughOpacity, widthMultiplier) {
        var that = this;
        var createBaseConfig = function(configModifier) {
            return {
                type: "slide",
                delay: void 0 === configModifier.delay ? that.option("defaultAnimationDelay") : configModifier.delay,
                duration: void 0 === configModifier.duration ? that.option("defaultAnimationDuration") : configModifier.duration
            }
        };
        return {
            enter: function($element, configModifier) {
                var width = $element.parent().width() * widthMultiplier;
                var direction = configModifier.direction;
                var config = createBaseConfig(configModifier);
                config.to = {
                    left: 0,
                    opacity: 1
                };
                if ("forward" === direction) {
                    config.from = {
                        left: width,
                        opacity: throughOpacity
                    }
                } else {
                    if ("backward" === direction) {
                        config.from = {
                            left: -width,
                            opacity: throughOpacity
                        }
                    } else {
                        config.from = {
                            left: 0,
                            opacity: 0
                        }
                    }
                }
                return _fx.default.createAnimation($element, config)
            },
            leave: function($element, configModifier) {
                var width = $element.parent().width() * widthMultiplier;
                var direction = configModifier.direction;
                var config = createBaseConfig(configModifier);
                config.from = {
                    left: 0,
                    opacity: 1
                };
                if ("forward" === direction) {
                    config.to = {
                        left: -width,
                        opacity: throughOpacity
                    }
                } else {
                    if ("backward" === direction) {
                        config.to = {
                            left: width,
                            opacity: throughOpacity
                        }
                    } else {
                        config.to = {
                            left: 0,
                            opacity: 0
                        }
                    }
                }
                return _fx.default.createAnimation($element, config)
            }
        }
    },
    _createOpenDoorConfig: function() {
        var that = this;
        var createBaseConfig = function(configModifier) {
            return {
                type: "css",
                extraCssClasses: "dx-opendoor-animation",
                delay: void 0 === configModifier.delay ? that.option("defaultAnimationDelay") : configModifier.delay,
                duration: void 0 === configModifier.duration ? that.option("defaultAnimationDuration") : configModifier.duration
            }
        };
        return {
            enter: function($element, configModifier) {
                var direction = configModifier.direction;
                var config = createBaseConfig(configModifier);
                config.delay = "none" === direction ? config.delay : config.duration;
                config.from = "dx-enter dx-opendoor-animation" + directionPostfixes[direction];
                config.to = "dx-enter-active";
                return _fx.default.createAnimation($element, config)
            },
            leave: function($element, configModifier) {
                var direction = configModifier.direction;
                var config = createBaseConfig(configModifier);
                config.from = "dx-leave dx-opendoor-animation" + directionPostfixes[direction];
                config.to = "dx-leave-active";
                return _fx.default.createAnimation($element, config)
            }
        }
    },
    _createWinPopConfig: function() {
        var that = this;
        var baseConfig = {
            type: "css",
            extraCssClasses: "dx-win-pop-animation",
            duration: that.option("defaultAnimationDuration")
        };
        return {
            enter: function($element, configModifier) {
                var config = baseConfig;
                var direction = configModifier.direction;
                config.delay = "none" === direction ? that.option("defaultAnimationDelay") : that.option("defaultAnimationDuration") / 2;
                config.from = "dx-enter dx-win-pop-animation" + directionPostfixes[direction];
                config.to = "dx-enter-active";
                return _fx.default.createAnimation($element, config)
            },
            leave: function($element, configModifier) {
                var config = baseConfig;
                var direction = configModifier.direction;
                config.delay = that.option("defaultAnimationDelay");
                config.from = "dx-leave dx-win-pop-animation" + directionPostfixes[direction];
                config.to = "dx-leave-active";
                return _fx.default.createAnimation($element, config)
            }
        }
    },
    resetToDefaults: function() {
        this.clear();
        this.registerDefaultPresets();
        this.applyChanges()
    },
    clear: function(name) {
        var that = this;
        var newRegisteredPresets = [];
        (0, _iterator.each)(this._registeredPresets, function(index, preset) {
            if (!name || name === preset.name) {
                that.option(that._getPresetOptionName(preset.name), void 0)
            } else {
                newRegisteredPresets.push(preset)
            }
        });
        this._registeredPresets = newRegisteredPresets;
        this.applyChanges()
    },
    registerPreset: function(name, config) {
        this._registeredPresets.push({
            name: name,
            config: config
        })
    },
    applyChanges: function() {
        var that = this;
        var customRules = [];
        (0, _iterator.each)(this._registeredPresets, function(index, preset) {
            var rule = {
                device: preset.config.device,
                options: {}
            };
            rule.options[that._getPresetOptionName(preset.name)] = preset.config.animation;
            customRules.push(rule)
        });
        this._setOptionsByDevice(customRules)
    },
    getPreset: function(name) {
        var result = name;
        while ("string" === typeof result) {
            result = this.option(this._getPresetOptionName(result))
        }
        return result
    },
    registerDefaultPresets: function() {
        this.registerPreset("pop", {
            animation: {
                extraCssClasses: "dx-android-pop-animation",
                delay: this.option("defaultAnimationDelay"),
                duration: this.option("defaultAnimationDuration")
            }
        });
        this.registerPreset("openDoor", {
            animation: this._createOpenDoorConfig()
        });
        this.registerPreset("win-pop", {
            animation: this._createWinPopConfig()
        });
        this.registerPreset("fade", {
            animation: {
                extraCssClasses: "dx-fade-animation",
                delay: this.option("defaultAnimationDelay"),
                duration: this.option("defaultAnimationDuration")
            }
        });
        this.registerPreset("slide", {
            device: function() {
                return _devices.default.current().android || _devices.default.real.android
            },
            animation: this._createAndroidSlideAnimationConfig(1, 1)
        });
        this.registerPreset("slide", {
            device: function() {
                return !_devices.default.current().android && !_devices.default.real.android
            },
            animation: {
                extraCssClasses: "dx-slide-animation",
                delay: this.option("defaultAnimationDelay"),
                duration: this.option("defaultAnimationDuration")
            }
        });
        this.registerPreset("ios7-slide", {
            animation: {
                extraCssClasses: "dx-ios7-slide-animation",
                delay: this.option("defaultAnimationDelay"),
                duration: this.option("defaultAnimationDuration")
            }
        });
        this.registerPreset("overflow", {
            animation: {
                extraCssClasses: "dx-overflow-animation",
                delay: this.option("defaultAnimationDelay"),
                duration: this.option("defaultAnimationDuration")
            }
        });
        this.registerPreset("ios7-toolbar", {
            device: function() {
                return !_devices.default.current().android && !_devices.default.real.android
            },
            animation: {
                extraCssClasses: "dx-ios7-toolbar-animation",
                delay: this.option("defaultAnimationDelay"),
                duration: this.option("defaultAnimationDuration")
            }
        });
        this.registerPreset("ios7-toolbar", {
            device: function() {
                return _devices.default.current().android || _devices.default.real.android
            },
            animation: this._createAndroidSlideAnimationConfig(0, .4)
        });
        this.registerPreset("stagger-fade", {
            animation: {
                extraCssClasses: "dx-fade-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-slide", {
            animation: {
                extraCssClasses: "dx-slide-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-fade-slide", {
            animation: {
                extraCssClasses: "dx-fade-slide-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-drop", {
            animation: {
                extraCssClasses: "dx-drop-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-fade-drop", {
            animation: {
                extraCssClasses: "dx-fade-drop-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-fade-rise", {
            animation: {
                extraCssClasses: "dx-fade-rise-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-3d-drop", {
            animation: {
                extraCssClasses: "dx-3d-drop-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        });
        this.registerPreset("stagger-fade-zoom", {
            animation: {
                extraCssClasses: "dx-fade-zoom-animation",
                staggerDelay: this.option("defaultStaggerAnimationDelay"),
                duration: this.option("defaultStaggerAnimationDuration"),
                delay: this.option("defaultStaggerAnimationStartDelay")
            }
        })
    }
});
exports.PresetCollection = AnimationPresetCollection;
var animationPresets = new AnimationPresetCollection;
exports.presets = animationPresets;
