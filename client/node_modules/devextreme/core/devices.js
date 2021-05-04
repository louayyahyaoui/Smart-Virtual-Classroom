/**
 * DevExtreme (core/devices.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _window = require("./utils/window");
var _extend = require("./utils/extend");
var _type = require("./utils/type");
var _iterator = require("./utils/iterator");
var _errors = _interopRequireDefault(require("./errors"));
var _callbacks = _interopRequireDefault(require("./utils/callbacks"));
var _ready_callbacks = _interopRequireDefault(require("./utils/ready_callbacks"));
var _resize_callbacks = _interopRequireDefault(require("./utils/resize_callbacks"));
var _events_strategy = require("./events_strategy");
var _storage = require("./utils/storage");
var _view_port = require("./utils/view_port");
var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var navigator = (0, _window.getNavigator)();
var window = (0, _window.getWindow)();
var KNOWN_UA_TABLE = {
    iPhone: "iPhone",
    iPhone5: "iPhone",
    iPhone6: "iPhone",
    iPhone6plus: "iPhone",
    iPad: "iPad",
    iPadMini: "iPad Mini",
    androidPhone: "Android Mobile",
    androidTablet: "Android",
    msSurface: "Windows ARM Tablet PC",
    desktop: "desktop"
};
var DEFAULT_DEVICE = {
    deviceType: "desktop",
    platform: "generic",
    version: [],
    phone: false,
    tablet: false,
    android: false,
    ios: false,
    generic: true,
    grade: "A",
    mac: false
};
var uaParsers = {
    generic: function(userAgent) {
        var isPhone = /windows phone/i.test(userAgent) || userAgent.match(/WPDesktop/);
        var isTablet = !isPhone && /Windows(.*)arm(.*)Tablet PC/i.test(userAgent);
        var isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
        var isMac = /((intel|ppc) mac os x)/.test(userAgent.toLowerCase());
        if (!(isPhone || isTablet || isDesktop || isMac)) {
            return
        }
        return {
            deviceType: isPhone ? "phone" : isTablet ? "tablet" : "desktop",
            platform: "generic",
            version: [],
            grade: "A",
            mac: isMac
        }
    },
    ios: function(userAgent) {
        if (!/ip(hone|od|ad)/i.test(userAgent)) {
            return
        }
        var isPhone = /ip(hone|od)/i.test(userAgent);
        var matches = userAgent.match(/os (\d+)_(\d+)_?(\d+)?/i);
        var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
        var isIPhone4 = 480 === window.screen.height;
        var grade = isIPhone4 ? "B" : "A";
        return {
            deviceType: isPhone ? "phone" : "tablet",
            platform: "ios",
            version: version,
            grade: grade
        }
    },
    android: function(userAgent) {
        if (!/android|htc_|silk/i.test(userAgent)) {
            return
        }
        var isPhone = /mobile/i.test(userAgent);
        var matches = userAgent.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
        var version = matches ? [parseInt(matches[1], 10), parseInt(matches[2] || 0, 10), parseInt(matches[3] || 0, 10)] : [];
        var worseThan4_4 = version.length > 1 && (version[0] < 4 || 4 === version[0] && version[1] < 4);
        var grade = worseThan4_4 ? "B" : "A";
        return {
            deviceType: isPhone ? "phone" : "tablet",
            platform: "android",
            version: version,
            grade: grade
        }
    }
};
var Devices = function() {
    function Devices(options) {
        this._window = (null === options || void 0 === options ? void 0 : options.window) || window;
        this._realDevice = this._getDevice();
        this._currentDevice = void 0;
        this._currentOrientation = void 0;
        this._eventsStrategy = new _events_strategy.EventsStrategy(this);
        this.changed = (0, _callbacks.default)();
        if ((0, _window.hasWindow)()) {
            _ready_callbacks.default.add(this._recalculateOrientation.bind(this));
            _resize_callbacks.default.add(this._recalculateOrientation.bind(this))
        }
    }
    var _proto = Devices.prototype;
    _proto.current = function(deviceOrName) {
        if (deviceOrName) {
            this._currentDevice = this._getDevice(deviceOrName);
            this._forced = true;
            this.changed.fire();
            return
        }
        if (!this._currentDevice) {
            deviceOrName = void 0;
            try {
                deviceOrName = this._getDeviceOrNameFromWindowScope()
            } catch (e) {
                deviceOrName = this._getDeviceNameFromSessionStorage()
            } finally {
                if (!deviceOrName) {
                    deviceOrName = this._getDeviceNameFromSessionStorage()
                }
                if (deviceOrName) {
                    this._forced = true
                }
            }
            this._currentDevice = this._getDevice(deviceOrName)
        }
        return this._currentDevice
    };
    _proto.real = function(forceDevice) {
        return (0, _extend.extend)({}, this._realDevice)
    };
    _proto.orientation = function() {
        return this._currentOrientation
    };
    _proto.isForced = function() {
        return this._forced
    };
    _proto.isRippleEmulator = function() {
        return !!this._window.tinyHippos
    };
    _proto._getCssClasses = function(device) {
        var result = [];
        var realDevice = this._realDevice;
        device = device || this.current();
        if (device.deviceType) {
            result.push("dx-device-".concat(device.deviceType));
            if ("desktop" !== device.deviceType) {
                result.push("dx-device-mobile")
            }
        }
        result.push("dx-device-".concat(realDevice.platform));
        if (realDevice.version && realDevice.version.length) {
            result.push("dx-device-".concat(realDevice.platform, "-").concat(realDevice.version[0]))
        }
        if (this.isSimulator()) {
            result.push("dx-simulator")
        }
        if ((0, _config.default)().rtlEnabled) {
            result.push("dx-rtl")
        }
        return result
    };
    _proto.attachCssClasses = function(element, device) {
        this._deviceClasses = this._getCssClasses(device).join(" ");
        (0, _renderer.default)(element).addClass(this._deviceClasses)
    };
    _proto.detachCssClasses = function(element) {
        (0, _renderer.default)(element).removeClass(this._deviceClasses)
    };
    _proto.isSimulator = function() {
        try {
            return this._isSimulator || (0, _window.hasWindow)() && this._window.top !== this._window.self && this._window.top["dx-force-device"] || this.isRippleEmulator()
        } catch (e) {
            return false
        }
    };
    _proto.forceSimulator = function() {
        this._isSimulator = true
    };
    _proto._getDevice = function(deviceName) {
        if ("genericPhone" === deviceName) {
            deviceName = {
                deviceType: "phone",
                platform: "generic",
                generic: true
            }
        }
        if ((0, _type.isPlainObject)(deviceName)) {
            return this._fromConfig(deviceName)
        } else {
            var ua;
            if (deviceName) {
                ua = KNOWN_UA_TABLE[deviceName];
                if (!ua) {
                    throw _errors.default.Error("E0005")
                }
            } else {
                ua = navigator.userAgent
            }
            return this._fromUA(ua)
        }
    };
    _proto._getDeviceOrNameFromWindowScope = function() {
        var result;
        if ((0, _window.hasWindow)() && (this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"])) {
            result = this._window.top["dx-force-device-object"] || this._window.top["dx-force-device"]
        }
        return result
    };
    _proto._getDeviceNameFromSessionStorage = function() {
        var sessionStorage = (0, _storage.sessionStorage)();
        if (!sessionStorage) {
            return
        }
        var deviceOrName = sessionStorage.getItem("dx-force-device");
        try {
            return JSON.parse(deviceOrName)
        } catch (ex) {
            return deviceOrName
        }
    };
    _proto._fromConfig = function(config) {
        var result = (0, _extend.extend)({}, DEFAULT_DEVICE, this._currentDevice, config);
        var shortcuts = {
            phone: "phone" === result.deviceType,
            tablet: "tablet" === result.deviceType,
            android: "android" === result.platform,
            ios: "ios" === result.platform,
            generic: "generic" === result.platform
        };
        return (0, _extend.extend)(result, shortcuts)
    };
    _proto._fromUA = function(ua) {
        var config;
        (0, _iterator.each)(uaParsers, function(platform, parser) {
            config = parser(ua);
            return !config
        });
        if (config) {
            return this._fromConfig(config)
        }
        return DEFAULT_DEVICE
    };
    _proto._changeOrientation = function() {
        var $window = (0, _renderer.default)(this._window);
        var orientation = $window.height() > $window.width() ? "portrait" : "landscape";
        if (this._currentOrientation === orientation) {
            return
        }
        this._currentOrientation = orientation;
        this._eventsStrategy.fireEvent("orientationChanged", [{
            orientation: orientation
        }])
    };
    _proto._recalculateOrientation = function() {
        var windowWidth = (0, _renderer.default)(this._window).width();
        if (this._currentWidth === windowWidth) {
            return
        }
        this._currentWidth = windowWidth;
        this._changeOrientation()
    };
    _proto.on = function(eventName, eventHandler) {
        this._eventsStrategy.on(eventName, eventHandler);
        return this
    };
    _proto.off = function(eventName, eventHandler) {
        this._eventsStrategy.off(eventName, eventHandler);
        return this
    };
    return Devices
}();
var devices = new Devices;
_view_port.changeCallback.add(function(viewPort, prevViewport) {
    devices.detachCssClasses(prevViewport);
    devices.attachCssClasses(viewPort)
});
var _default = devices;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
