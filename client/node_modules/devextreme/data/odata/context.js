/**
 * DevExtreme (data/odata/context.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _errors = _interopRequireDefault(require("../errors"));
var _store = _interopRequireDefault(require("./store"));
var _request_dispatcher = _interopRequireDefault(require("./request_dispatcher"));
var _utils = require("./utils");
var _deferred = require("../../core/utils/deferred");
require("./query_adapter");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var ODataContext = _class.default.inherit({
    ctor: function(options) {
        var _this = this;
        this._requestDispatcher = new _request_dispatcher.default(options);
        this._errorHandler = options.errorHandler;
        (0, _iterator.each)(options.entities || [], function(entityAlias, entityOptions) {
            _this[entityAlias] = new _store.default((0, _extend.extend)({}, options, {
                url: "".concat(_this._requestDispatcher.url, "/").concat(encodeURIComponent(entityOptions.name || entityAlias))
            }, entityOptions))
        })
    },
    get: function(operationName, params) {
        return this.invoke(operationName, params, "GET")
    },
    invoke: function(operationName) {
        var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
        var httpMethod = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "POST";
        httpMethod = httpMethod.toLowerCase();
        var d = new _deferred.Deferred;
        var url = "".concat(this._requestDispatcher.url, "/").concat(encodeURIComponent(operationName));
        var payload;
        if (4 === this.version()) {
            if ("get" === httpMethod) {
                url = (0, _utils.formatFunctionInvocationUrl)(url, (0, _utils.escapeServiceOperationParams)(params, this.version()));
                params = null
            } else {
                if ("post" === httpMethod) {
                    payload = params;
                    params = null
                }
            }
        }(0, _deferred.when)(this._requestDispatcher.sendRequest(url, httpMethod, (0, _utils.escapeServiceOperationParams)(params, this.version()), payload)).done(function(r) {
            if ((0, _type.isPlainObject)(r) && operationName in r) {
                r = r[operationName]
            }
            d.resolve(r)
        }).fail(this._errorHandler).fail(_errors.default._errorHandler).fail(d.reject);
        return d.promise()
    },
    objectLink: function(entityAlias, key) {
        var store = this[entityAlias];
        if (!store) {
            throw _errors.default.errors.Error("E4015", entityAlias)
        }
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        return {
            __metadata: {
                uri: store._byKeyUrl(key, true)
            }
        }
    },
    version: function() {
        return this._requestDispatcher.version
    }
});
var _default = ODataContext;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
