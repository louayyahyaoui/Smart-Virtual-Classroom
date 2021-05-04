/**
 * DevExtreme (data/odata/store.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _type = require("../../core/utils/type");
var _config = _interopRequireDefault(require("../../core/config"));
var _utils = require("./utils");
var _proxy_url_formatter = _interopRequireDefault(require("../proxy_url_formatter"));
var _errors = _interopRequireDefault(require("../errors"));
var _query = _interopRequireDefault(require("../query"));
var _abstract_store = _interopRequireDefault(require("../abstract_store"));
var _request_dispatcher = _interopRequireDefault(require("./request_dispatcher"));
var _deferred = require("../../core/utils/deferred");
require("./query_adapter");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var ANONYMOUS_KEY_NAME = "5d46402c-7899-4ea9-bd81-8b73c47c7683";
var expandKeyType = function(key, keyType) {
    return _defineProperty({}, key, keyType)
};
var mergeFieldTypesWithKeyType = function(fieldTypes, keyType) {
    var result = {};
    for (var field in fieldTypes) {
        result[field] = fieldTypes[field]
    }
    for (var keyName in keyType) {
        if (keyName in result) {
            if (result[keyName] !== keyType[keyName]) {
                _errors.default.errors.log("W4001", keyName)
            }
        } else {
            result[keyName] = keyType[keyName]
        }
    }
    return result
};
var ODataStore = _abstract_store.default.inherit({
    ctor: function(options) {
        this.callBase(options);
        this._requestDispatcher = new _request_dispatcher.default(options);
        var key = this.key();
        var fieldTypes = options.fieldTypes;
        var keyType = options.keyType;
        if (keyType) {
            var keyTypeIsString = "string" === typeof keyType;
            if (!key) {
                key = keyTypeIsString ? ANONYMOUS_KEY_NAME : Object.keys(keyType);
                this._legacyAnonymousKey = key
            }
            if (keyTypeIsString) {
                keyType = expandKeyType(key, keyType)
            }
            fieldTypes = mergeFieldTypesWithKeyType(fieldTypes, keyType)
        }
        this._fieldTypes = fieldTypes || {};
        if (2 === this.version()) {
            this._updateMethod = "MERGE"
        } else {
            this._updateMethod = "PATCH"
        }
    },
    _customLoadOptions: function() {
        return ["expand", "customQueryParams"]
    },
    _byKeyImpl: function(key, extraOptions) {
        var params = {};
        if (extraOptions) {
            params.$expand = (0, _utils.generateExpand)(this.version(), extraOptions.expand, extraOptions.select) || void 0;
            params.$select = (0, _utils.generateSelect)(this.version(), extraOptions.select) || void 0
        }
        return this._requestDispatcher.sendRequest(this._byKeyUrl(key), "GET", params)
    },
    createQuery: function(loadOptions) {
        var _loadOptions$urlOverr;
        var url;
        var queryOptions = {
            adapter: "odata",
            beforeSend: this._requestDispatcher.beforeSend,
            errorHandler: this._errorHandler,
            jsonp: this._requestDispatcher.jsonp,
            version: this._requestDispatcher.version,
            withCredentials: this._requestDispatcher._withCredentials,
            expand: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.expand,
            requireTotalCount: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.requireTotalCount,
            deserializeDates: this._requestDispatcher._deserializeDates,
            fieldTypes: this._fieldTypes
        };
        url = null !== (_loadOptions$urlOverr = null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.urlOverride) && void 0 !== _loadOptions$urlOverr ? _loadOptions$urlOverr : this._requestDispatcher.url;
        if ((0, _type.isDefined)(this._requestDispatcher.filterToLower)) {
            queryOptions.filterToLower = this._requestDispatcher.filterToLower
        }
        if (null !== loadOptions && void 0 !== loadOptions && loadOptions.customQueryParams) {
            var params = (0, _utils.escapeServiceOperationParams)(null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.customQueryParams, this.version());
            if (4 === this.version()) {
                url = (0, _utils.formatFunctionInvocationUrl)(url, params)
            } else {
                queryOptions.params = params
            }
        }
        return (0, _query.default)(url, queryOptions)
    },
    _insertImpl: function(values) {
        var _this = this;
        this._requireKey();
        var d = new _deferred.Deferred;
        (0, _deferred.when)(this._requestDispatcher.sendRequest(this._requestDispatcher.url, "POST", null, values)).done(function(serverResponse) {
            return d.resolve(serverResponse && !(0, _config.default)().useLegacyStoreResult ? serverResponse : values, _this.keyOf(serverResponse))
        }).fail(d.reject);
        return d.promise()
    },
    _updateImpl: function(key, values) {
        var d = new _deferred.Deferred;
        (0, _deferred.when)(this._requestDispatcher.sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done(function(serverResponse) {
            return (0, _config.default)().useLegacyStoreResult ? d.resolve(key, values) : d.resolve(serverResponse || values, key)
        }).fail(d.reject);
        return d.promise()
    },
    _removeImpl: function(key) {
        var d = new _deferred.Deferred;
        (0, _deferred.when)(this._requestDispatcher.sendRequest(this._byKeyUrl(key), "DELETE")).done(function() {
            return d.resolve(key)
        }).fail(d.reject);
        return d.promise()
    },
    _convertKey: function(value) {
        var result = value;
        var fieldTypes = this._fieldTypes;
        var key = this.key() || this._legacyAnonymousKey;
        if (Array.isArray(key)) {
            result = {};
            for (var i = 0; i < key.length; i++) {
                var keyName = key[i];
                result[keyName] = (0, _utils.convertPrimitiveValue)(fieldTypes[keyName], value[keyName])
            }
        } else {
            if (fieldTypes[key]) {
                result = (0, _utils.convertPrimitiveValue)(fieldTypes[key], value)
            }
        }
        return result
    },
    _byKeyUrl: function(value, useOriginalHost) {
        var baseUrl = useOriginalHost ? _proxy_url_formatter.default.formatLocalUrl(this._requestDispatcher.url) : this._requestDispatcher.url;
        var convertedKey = this._convertKey(value);
        return "".concat(baseUrl, "(").concat(encodeURIComponent((0, _utils.serializeKey)(convertedKey, this.version())), ")")
    },
    version: function() {
        return this._requestDispatcher.version
    }
}, "odata");
var _default = ODataStore;
exports.default = _default;
module.exports = exports.default;
module.exports.default = module.exports;
