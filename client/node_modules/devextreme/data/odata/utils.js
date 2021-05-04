/**
 * DevExtreme (data/odata/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.escapeServiceOperationParams = exports.formatFunctionInvocationUrl = exports.generateExpand = exports.generateSelect = exports.convertPrimitiveValue = exports.keyConverters = exports.serializeKey = exports.serializeValue = exports.serializePropName = exports.EdmLiteral = exports.sendRequest = void 0;
var _class = _interopRequireDefault(require("../../core/class"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _guid = _interopRequireDefault(require("../../core/guid"));
var _common = require("../../core/utils/common");
var _deferred = require("../../core/utils/deferred");
var _errors = _interopRequireDefault(require("../errors"));
var _utils = _interopRequireDefault(require("../utils"));
var _string = require("../../core/utils/string");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function _typeof(obj) {
    "@babel/helpers - typeof";
    if ("function" === typeof Symbol && "symbol" === typeof Symbol.iterator) {
        _typeof = function(obj) {
            return typeof obj
        }
    } else {
        _typeof = function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
var GUID_REGEX = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
var VERBOSE_DATE_REGEX = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
var ISO8601_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;
var JSON_VERBOSE_MIME_TYPE = "application/json;odata=verbose";
var makeArray = function(value) {
    return "string" === (0, _type.type)(value) ? value.split() : value
};
var hasDot = function(x) {
    return /\./.test(x)
};
var pad = function(text, length, right) {
    text = String(text);
    while (text.length < length) {
        text = right ? "".concat(text, "0") : "0".concat(text)
    }
    return text
};
var formatISO8601 = function(date, skipZeroTime, skipTimezone) {
    var bag = [];
    var isZeroTime = function() {
        return date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1
    };
    var padLeft2 = function(text) {
        return pad(text, 2)
    };
    bag.push(date.getFullYear());
    bag.push("-");
    bag.push(padLeft2(date.getMonth() + 1));
    bag.push("-");
    bag.push(padLeft2(date.getDate()));
    if (!(skipZeroTime && isZeroTime())) {
        bag.push("T");
        bag.push(padLeft2(date.getHours()));
        bag.push(":");
        bag.push(padLeft2(date.getMinutes()));
        bag.push(":");
        bag.push(padLeft2(date.getSeconds()));
        if (date.getMilliseconds()) {
            bag.push(".");
            bag.push(pad(date.getMilliseconds(), 3))
        }
        if (!skipTimezone) {
            bag.push("Z")
        }
    }
    return bag.join("")
};
var parseISO8601 = function(isoString) {
    var result = new Date(60 * new Date(0).getTimezoneOffset() * 1e3);
    var chunks = isoString.replace("Z", "").split("T");
    var date = /(\d{4})-(\d{2})-(\d{2})/.exec(chunks[0]);
    var time = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(chunks[1]);
    result.setFullYear(Number(date[1]));
    result.setMonth(Number(date[2]) - 1);
    result.setDate(Number(date[3]));
    if (Array.isArray(time) && time.length) {
        result.setHours(Number(time[1]));
        result.setMinutes(Number(time[2]));
        result.setSeconds(Number(time[3]));
        var fractional = (time[4] || "").slice(0, 3);
        fractional = pad(fractional, 3, true);
        result.setMilliseconds(Number(fractional))
    }
    return result
};
var isAbsoluteUrl = function(url) {
    return /^(?:[a-z]+:)?\/\//i.test(url)
};
var stripParams = function(url) {
    var index = url.indexOf("?");
    if (index > -1) {
        return url.substr(0, index)
    }
    return url
};
var toAbsoluteUrl = function(basePath, relativePath) {
    var part;
    var baseParts = stripParams(basePath).split("/");
    var relativeParts = relativePath.split("/");
    baseParts.pop();
    while (relativeParts.length) {
        part = relativeParts.shift();
        if (".." === part) {
            baseParts.pop()
        } else {
            baseParts.push(part)
        }
    }
    return baseParts.join("/")
};
var param = function(params) {
    var result = [];
    for (var name in params) {
        result.push(name + "=" + params[name])
    }
    return result.join("&")
};
var ajaxOptionsForRequest = function(protocolVersion, request) {
    var _options$beforeSend;
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
    var formatPayload = function(payload) {
        return JSON.stringify(payload, function(key, value) {
            if (!(this[key] instanceof Date)) {
                return value
            }
            value = formatISO8601(this[key]);
            switch (protocolVersion) {
                case 2:
                    return value.substr(0, value.length - 1);
                case 3:
                case 4:
                    return value;
                default:
                    throw _errors.default.errors.Error("E4002")
            }
        })
    };
    request = (0, _extend.extend)({
        async: true,
        method: "get",
        url: "",
        params: {},
        payload: null,
        headers: {},
        timeout: 3e4
    }, request);
    null === (_options$beforeSend = options.beforeSend) || void 0 === _options$beforeSend ? void 0 : _options$beforeSend.call(options, request);
    var _request = request,
        async = _request.async, timeout = _request.timeout, headers = _request.headers;
    var _request2 = request,
        url = _request2.url,
        method = _request2.method;
    var jsonp = options.jsonp,
        withCredentials = options.withCredentials;
    method = (method || "get").toLowerCase();
    var isGet = "get" === method;
    var useJsonp = isGet && jsonp;
    var params = (0, _extend.extend)({}, request.params);
    var ajaxData = isGet ? params : formatPayload(request.payload);
    var qs = !isGet && param(params);
    var contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
    if (qs) {
        url += (url.indexOf("?") > -1 ? "&" : "?") + qs
    }
    if (useJsonp) {
        ajaxData.$format = "json"
    }
    return {
        url: url,
        data: ajaxData,
        dataType: useJsonp ? "jsonp" : "json",
        jsonp: useJsonp && "$callback",
        method: method,
        async: async,
        timeout: timeout,
        headers: headers,
        contentType: contentType,
        accepts: {
            json: [JSON_VERBOSE_MIME_TYPE, "text/plain"].join()
        },
        xhrFields: {
            withCredentials: withCredentials
        }
    }
};
var sendRequest = function sendRequest(protocolVersion, request, options) {
    var deserializeDates = options.deserializeDates,
        fieldTypes = options.fieldTypes,
        countOnly = options.countOnly,
        isPaged = options.isPaged;
    var d = new _deferred.Deferred;
    var ajaxOptions = ajaxOptionsForRequest(protocolVersion, request, options);
    _ajax.default.sendRequest(ajaxOptions).always(function(obj, textStatus) {
        var transformOptions = {
            deserializeDates: deserializeDates,
            fieldTypes: fieldTypes
        };
        var tuple = interpretJsonFormat(obj, textStatus, transformOptions, ajaxOptions);
        var error = tuple.error,
            data = tuple.data,
            count = tuple.count;
        var nextUrl = tuple.nextUrl;
        if (error) {
            if (error.message !== _utils.default.XHR_ERROR_UNLOAD) {
                d.reject(error)
            }
        } else {
            if (countOnly) {
                if (isFinite(count)) {
                    d.resolve(count)
                } else {
                    d.reject(new _errors.default.errors.Error("E4018"))
                }
            } else {
                if (nextUrl && !isPaged) {
                    if (!isAbsoluteUrl(nextUrl)) {
                        nextUrl = toAbsoluteUrl(ajaxOptions.url, nextUrl)
                    }
                    sendRequest(protocolVersion, {
                        url: nextUrl
                    }, options).fail(d.reject).done(function(nextData) {
                        return d.resolve(data.concat(nextData))
                    })
                } else {
                    var extra = isFinite(count) ? {
                        totalCount: count
                    } : void 0;
                    d.resolve(data, extra)
                }
            }
        }
    });
    return d.promise()
};
exports.sendRequest = sendRequest;
var formatDotNetError = function(errorObj) {
    var message;
    var currentError = errorObj;
    if ("message" in errorObj) {
        var _errorObj$message;
        message = (null === (_errorObj$message = errorObj.message) || void 0 === _errorObj$message ? void 0 : _errorObj$message.value) || errorObj.message
    }
    while (currentError = currentError.innererror || currentError.internalexception) {
        message = currentError.message;
        if (currentError.internalexception && message.indexOf("inner exception") === -1) {
            break
        }
    }
    return message
};
var errorFromResponse = function(obj, textStatus, ajaxOptions) {
    var _response, _response2, _response3, _response4;
    if ("nocontent" === textStatus) {
        return null
    }
    var message = "Unknown error";
    var response = obj;
    var httpStatus = 200;
    var errorData = {
        requestOptions: ajaxOptions
    };
    if ("success" !== textStatus) {
        var status = obj.status,
            responseText = obj.responseText;
        httpStatus = status;
        message = _utils.default.errorMessageFromXhr(obj, textStatus);
        try {
            response = JSON.parse(responseText)
        } catch (x) {}
    }
    var errorObj = (null === (_response = response) || void 0 === _response ? void 0 : _response.then) || (null === (_response2 = response) || void 0 === _response2 ? void 0 : _response2.error) || (null === (_response3 = response) || void 0 === _response3 ? void 0 : _response3["odata.error"]) || (null === (_response4 = response) || void 0 === _response4 ? void 0 : _response4["@odata.error"]);
    if (errorObj) {
        message = formatDotNetError(errorObj) || message;
        errorData.errorDetails = errorObj;
        if (200 === httpStatus) {
            httpStatus = 500
        }
        var customCode = Number(errorObj.code);
        if (isFinite(customCode) && customCode >= 400) {
            httpStatus = customCode
        }
    }
    if (httpStatus >= 400 || 0 === httpStatus) {
        errorData.httpStatus = httpStatus;
        return (0, _extend.extend)(Error(message), errorData)
    }
    return null
};
var interpretJsonFormat = function(obj, textStatus, transformOptions, ajaxOptions) {
    var error = errorFromResponse(obj, textStatus, ajaxOptions);
    if (error) {
        return {
            error: error
        }
    }
    if (!(0, _type.isPlainObject)(obj)) {
        return {
            data: obj
        }
    }
    var value = "d" in obj && (Array.isArray(obj.d) || (0, _type.isObject)(obj.d)) ? interpretVerboseJsonFormat(obj, textStatus) : interpretLightJsonFormat(obj, textStatus);
    transformTypes(value, transformOptions);
    return value
};
var interpretVerboseJsonFormat = function(_ref) {
    var _data$results;
    var data = _ref.d;
    if (!(0, _type.isDefined)(data)) {
        return {
            error: Error("Malformed or unsupported JSON response received")
        }
    }
    return {
        data: null !== (_data$results = data.results) && void 0 !== _data$results ? _data$results : data,
        nextUrl: data.__next,
        count: parseInt(data.__count, 10)
    }
};
var interpretLightJsonFormat = function(obj) {
    var _obj$value;
    return {
        data: null !== (_obj$value = obj.value) && void 0 !== _obj$value ? _obj$value : obj,
        nextUrl: obj["@odata.nextLink"],
        count: parseInt(obj["@odata.count"], 10)
    }
};
var EdmLiteral = _class.default.inherit({
    ctor: function(value) {
        this._value = value
    },
    valueOf: function() {
        return this._value
    }
});
exports.EdmLiteral = EdmLiteral;
var transformTypes = function transformTypes(obj) {
    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    (0, _iterator.each)(obj, function(key, value) {
        if (null !== value && "object" === _typeof(value)) {
            if ("results" in value) {
                obj[key] = value.results
            }
            transformTypes(obj[key], options)
        } else {
            if ("string" === typeof value) {
                var fieldTypes = options.fieldTypes,
                    deserializeDates = options.deserializeDates;
                var canBeGuid = !fieldTypes || "String" !== fieldTypes[key];
                if (canBeGuid && GUID_REGEX.test(value)) {
                    obj[key] = new _guid.default(value)
                }
                if (false !== deserializeDates) {
                    if (value.match(VERBOSE_DATE_REGEX)) {
                        var date = new Date(Number(RegExp.$1) + 60 * RegExp.$2 * 1e3);
                        obj[key] = new Date(date.valueOf() + 60 * date.getTimezoneOffset() * 1e3)
                    } else {
                        if (ISO8601_DATE_REGEX.test(value)) {
                            obj[key] = new Date(parseISO8601(obj[key]).valueOf())
                        }
                    }
                }
            }
        }
    })
};
var serializeDate = function(date) {
    return "datetime'".concat(formatISO8601(date, true, true), "'")
};
var serializeString = function(value) {
    return "'".concat(value.replace(/'/g, "''"), "'")
};
var serializePropName = function(propName) {
    return propName instanceof EdmLiteral ? propName.valueOf() : propName.replace(/\./g, "/")
};
exports.serializePropName = serializePropName;
var serializeValueV4 = function serializeValueV4(value) {
    if (value instanceof Date) {
        return formatISO8601(value, false, false)
    }
    if (value instanceof _guid.default) {
        return value.valueOf()
    }
    if (Array.isArray(value)) {
        return "[".concat(value.map(function(item) {
            return serializeValueV4(item)
        }).join(","), "]")
    }
    return serializeValueV2(value)
};
var serializeValueV2 = function(value) {
    if (value instanceof Date) {
        return serializeDate(value)
    }
    if (value instanceof _guid.default) {
        return "guid'".concat(value, "'")
    }
    if (value instanceof EdmLiteral) {
        return value.valueOf()
    }
    if ("string" === typeof value) {
        return serializeString(value)
    }
    return String(value)
};
var serializeValue = function(value, protocolVersion) {
    switch (protocolVersion) {
        case 2:
        case 3:
            return serializeValueV2(value);
        case 4:
            return serializeValueV4(value);
        default:
            throw _errors.default.errors.Error("E4002")
    }
};
exports.serializeValue = serializeValue;
var serializeKey = function(key, protocolVersion) {
    if ((0, _type.isPlainObject)(key)) {
        var parts = [];
        (0, _iterator.each)(key, function(k, v) {
            return parts.push("".concat(serializePropName(k), "=").concat(serializeValue(v, protocolVersion)))
        });
        return parts.join()
    }
    return serializeValue(key, protocolVersion)
};
exports.serializeKey = serializeKey;
var keyConverters = {
    String: function(value) {
        return "".concat(value)
    },
    Int32: function(value) {
        return Math.floor(value)
    },
    Int64: function(value) {
        return value instanceof EdmLiteral ? value : new EdmLiteral("".concat(value, "L"))
    },
    Guid: function(value) {
        return value instanceof _guid.default ? value : new _guid.default(value)
    },
    Boolean: function(value) {
        return !!value
    },
    Single: function(value) {
        return value instanceof EdmLiteral ? value : new EdmLiteral(value + "f")
    },
    Decimal: function(value) {
        return value instanceof EdmLiteral ? value : new EdmLiteral(value + "m")
    }
};
exports.keyConverters = keyConverters;
var convertPrimitiveValue = function(type, value) {
    if (null === value) {
        return null
    }
    var converter = keyConverters[type];
    if (!converter) {
        throw _errors.default.errors.Error("E4014", type)
    }
    return converter(value)
};
exports.convertPrimitiveValue = convertPrimitiveValue;
var generateSelect = function(oDataVersion, select) {
    if (!select) {
        return
    }
    return oDataVersion < 4 ? serializePropName(select.join()) : (0, _common.grep)(select, hasDot, true).join()
};
exports.generateSelect = generateSelect;
var formatCore = function formatCore(hash) {
    var result = "";
    var selectValue = [];
    var expandValue = [];
    (0, _iterator.each)(hash, function(key, value) {
        if (Array.isArray(value)) {
            [].push.apply(selectValue, value)
        }
        if ((0, _type.isPlainObject)(value)) {
            expandValue.push("".concat(key).concat(formatCore(value)))
        }
    });
    if (selectValue.length || expandValue.length) {
        result += "(";
        if (selectValue.length) {
            result += "$select=".concat((0, _iterator.map)(selectValue, serializePropName).join())
        }
        if (expandValue.length) {
            if (selectValue.length) {
                result += ";"
            }
            result += "$expand=".concat((0, _iterator.map)(expandValue, serializePropName).join())
        }
        result += ")"
    }
    return result
};
var format = function(hash) {
    var result = [];
    (0, _iterator.each)(hash, function(key, value) {
        return result.push("".concat(key).concat(formatCore(value)))
    });
    return result.join()
};
var parseCore = function parseCore(exprParts, root, stepper) {
    var result = stepper(root, exprParts.shift(), exprParts);
    if (false === result) {
        return
    }
    parseCore(exprParts, result, stepper)
};
var parseTree = function(exprs, root, stepper) {
    return (0, _iterator.each)(exprs, function(_, x) {
        return parseCore(x.split("."), root, stepper)
    })
};
var generatorV2 = function(expand, select) {
    var hash = {};
    if (expand) {
        (0, _iterator.each)(makeArray(expand), function() {
            hash[serializePropName(this)] = 1
        })
    }
    if (select) {
        (0, _iterator.each)(makeArray(select), function() {
            var path = this.split(".");
            if (path.length < 2) {
                return
            }
            path.pop();
            hash[serializePropName(path.join("."))] = 1
        })
    }
    return (0, _iterator.map)(hash, function(_, v) {
        return v
    }).join()
};
var generatorV4 = function(expand, select) {
    var hash = {};
    if (expand || select) {
        if (expand) {
            parseTree(makeArray(expand), hash, function(node, key, path) {
                node[key] = node[key] || {};
                return !path.length ? false : node[key]
            })
        }
        if (select) {
            parseTree((0, _common.grep)(makeArray(select), hasDot), hash, function(node, key, path) {
                if (!path.length) {
                    node[key] = node[key] || [];
                    node[key].push(key);
                    return false
                }
                return node[key] = node[key] || {}
            })
        }
        return format(hash)
    }
};
var generateExpand = function(oDataVersion, expand, select) {
    return oDataVersion < 4 ? generatorV2(expand, select) : generatorV4(expand, select)
};
exports.generateExpand = generateExpand;
var formatFunctionInvocationUrl = function(baseUrl, args) {
    return (0, _string.format)("{0}({1})", baseUrl, (0, _iterator.map)(args || {}, function(value, key) {
        return (0, _string.format)("{0}={1}", key, value)
    }).join(","))
};
exports.formatFunctionInvocationUrl = formatFunctionInvocationUrl;
var escapeServiceOperationParams = function(params, version) {
    if (!params) {
        return params
    }
    var result = {};
    (0, _iterator.each)(params, function(k, v) {
        result[k] = serializeValue(v, version)
    });
    return result
};
exports.escapeServiceOperationParams = escapeServiceOperationParams;
