/**
 * DevExtreme (core/templates/template_base.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.TemplateBase = exports.renderedCallbacks = void 0;
var _renderer = _interopRequireDefault(require("../renderer"));
var _dom_adapter = _interopRequireDefault(require("../dom_adapter"));
var _callbacks = _interopRequireDefault(require("../utils/callbacks"));
var _dom = require("../utils/dom");
var _visibility_change = require("../../events/visibility_change");
var _errors = _interopRequireDefault(require("../errors"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var renderedCallbacks = (0, _callbacks.default)({
    syncStrategy: true
});
exports.renderedCallbacks = renderedCallbacks;
var TemplateBase = function() {
    function TemplateBase() {}
    var _proto = TemplateBase.prototype;
    _proto.render = function(options) {
        options = options || {};
        var onRendered = options.onRendered;
        delete options.onRendered;
        var $result = this._renderCore(options);
        this._ensureResultInContainer($result, options.container);
        renderedCallbacks.fire($result, options.container);
        onRendered && onRendered();
        return $result
    };
    _proto._ensureResultInContainer = function($result, container) {
        if (!container) {
            return
        }
        var $container = (0, _renderer.default)(container);
        var resultInContainer = (0, _dom.contains)($container.get(0), $result.get(0));
        $container.append($result);
        if (resultInContainer) {
            return
        }
        var resultInBody = _dom_adapter.default.getBody().contains($container.get(0));
        if (!resultInBody) {
            return
        }(0, _visibility_change.triggerShownEvent)($result)
    };
    _proto._renderCore = function() {
        throw _errors.default.Error("E0001")
    };
    return TemplateBase
}();
exports.TemplateBase = TemplateBase;
