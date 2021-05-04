/**
 * DevExtreme (ui/widget/utils.ink_ripple.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.showWave = showWave;
exports.hideWave = hideWave;
exports.render = exports.initConfig = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var INKRIPPLE_CLASS = "dx-inkripple";
var INKRIPPLE_WAVE_CLASS = "dx-inkripple-wave";
var INKRIPPLE_SHOWING_CLASS = "dx-inkripple-showing";
var INKRIPPLE_HIDING_CLASS = "dx-inkripple-hiding";
var DEFAULT_WAVE_SIZE_COEFFICIENT = 2;
var MAX_WAVE_SIZE = 4e3;
var ANIMATION_DURATION = 300;
var HOLD_ANIMATION_DURATION = 1e3;
var DEFAULT_WAVE_INDEX = 0;
var initConfig = function() {
    var config = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    var useHoldAnimation = config.useHoldAnimation,
        waveSizeCoefficient = config.waveSizeCoefficient,
        isCentered = config.isCentered,
        wavesNumber = config.wavesNumber;
    return {
        waveSizeCoefficient: waveSizeCoefficient || DEFAULT_WAVE_SIZE_COEFFICIENT,
        isCentered: isCentered || false,
        wavesNumber: wavesNumber || 1,
        durations: getDurations(null !== useHoldAnimation && void 0 !== useHoldAnimation ? useHoldAnimation : true)
    }
};
exports.initConfig = initConfig;
var render = function(args) {
    var config = initConfig(args);
    return {
        showWave: showWave.bind(this, config),
        hideWave: hideWave.bind(this, config)
    }
};
exports.render = render;
var getInkRipple = function(element) {
    var result = element.children("." + INKRIPPLE_CLASS);
    if (0 === result.length) {
        result = (0, _renderer.default)("<div>").addClass(INKRIPPLE_CLASS).appendTo(element)
    }
    return result
};
var getWaves = function(element, wavesNumber) {
    var inkRipple = getInkRipple((0, _renderer.default)(element));
    var result = inkRipple.children("." + INKRIPPLE_WAVE_CLASS).toArray();
    for (var i = result.length; i < wavesNumber; i++) {
        var $currentWave = (0, _renderer.default)("<div>").appendTo(inkRipple).addClass(INKRIPPLE_WAVE_CLASS);
        result.push($currentWave[0])
    }
    return (0, _renderer.default)(result)
};
var getWaveStyleConfig = function(args, config) {
    var element = (0, _renderer.default)(config.element);
    var elementWidth = element.outerWidth();
    var elementHeight = element.outerHeight();
    var elementDiagonal = parseInt(Math.sqrt(elementWidth * elementWidth + elementHeight * elementHeight));
    var waveSize = Math.min(MAX_WAVE_SIZE, parseInt(elementDiagonal * args.waveSizeCoefficient));
    var left;
    var top;
    if (args.isCentered) {
        left = (elementWidth - waveSize) / 2;
        top = (elementHeight - waveSize) / 2
    } else {
        var event = config.event;
        var position = element.offset();
        var x = event.pageX - position.left;
        var y = event.pageY - position.top;
        left = x - waveSize / 2;
        top = y - waveSize / 2
    }
    return {
        left: left,
        top: top,
        height: waveSize,
        width: waveSize
    }
};

function showWave(args, config) {
    var $wave = getWaves(config.element, args.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
    args.hidingTimeout && clearTimeout(args.hidingTimeout);
    hideSelectedWave($wave);
    $wave.css(getWaveStyleConfig(args, config));
    args.showingTimeout = setTimeout(showingWaveHandler.bind(this, args, $wave), 0)
}

function showingWaveHandler(args, $wave) {
    var durationCss = args.durations.showingScale + "ms";
    $wave.addClass(INKRIPPLE_SHOWING_CLASS).css("transitionDuration", durationCss)
}

function getDurations(useHoldAnimation) {
    return {
        showingScale: useHoldAnimation ? HOLD_ANIMATION_DURATION : ANIMATION_DURATION,
        hidingScale: ANIMATION_DURATION,
        hidingOpacity: ANIMATION_DURATION
    }
}

function hideSelectedWave($wave) {
    $wave.removeClass(INKRIPPLE_HIDING_CLASS).css("transitionDuration", "")
}

function hideWave(args, config) {
    args.showingTimeout && clearTimeout(args.showingTimeout);
    var $wave = getWaves(config.element, config.wavesNumber).eq(config.wave || DEFAULT_WAVE_INDEX);
    var durations = args.durations;
    var durationCss = durations.hidingScale + "ms, " + durations.hidingOpacity + "ms";
    $wave.addClass(INKRIPPLE_HIDING_CLASS).removeClass(INKRIPPLE_SHOWING_CLASS).css("transitionDuration", durationCss);
    var animationDuration = Math.max(durations.hidingScale, durations.hidingOpacity);
    args.hidingTimeout = setTimeout(hideSelectedWave.bind(this, $wave), animationDuration)
}
