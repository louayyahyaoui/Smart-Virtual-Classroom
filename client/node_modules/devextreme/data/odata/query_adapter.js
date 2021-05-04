/**
 * DevExtreme (data/odata/query_adapter.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.odata = void 0;
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _config = _interopRequireDefault(require("../../core/config"));
var _extend = require("../../core/utils/extend");
var _query_adapters = _interopRequireDefault(require("../query_adapters"));
var _utils = require("./utils");
var _errors = _interopRequireDefault(require("../errors"));
var _utils2 = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var DEFAULT_PROTOCOL_VERSION = 2;
var STRING_FUNCTIONS = ["contains", "notcontains", "startswith", "endswith"];
var compileCriteria = function() {
    var protocolVersion;
    var forceLowerCase;
    var fieldTypes;
    var createBinaryOperationFormatter = function(op) {
        return function(prop, val) {
            return "".concat(prop, " ").concat(op, " ").concat(val)
        }
    };
    var createStringFuncFormatter = function(op, reverse) {
        return function(prop, val) {
            var bag = [op, "("];
            if (forceLowerCase) {
                prop = prop.indexOf("tolower(") === -1 ? "tolower(".concat(prop, ")") : prop;
                val = val.toLowerCase()
            }
            if (reverse) {
                bag.push(val, ",", prop)
            } else {
                bag.push(prop, ",", val)
            }
            bag.push(")");
            return bag.join("")
        }
    };
    var isStringFunction = function(name) {
        return STRING_FUNCTIONS.some(function(funcName) {
            return funcName === name
        })
    };
    var formatters = {
        "=": createBinaryOperationFormatter("eq"),
        "<>": createBinaryOperationFormatter("ne"),
        ">": createBinaryOperationFormatter("gt"),
        ">=": createBinaryOperationFormatter("ge"),
        "<": createBinaryOperationFormatter("lt"),
        "<=": createBinaryOperationFormatter("le"),
        startswith: createStringFuncFormatter("startswith"),
        endswith: createStringFuncFormatter("endswith")
    };
    var formattersV2 = (0, _extend.extend)({}, formatters, {
        contains: createStringFuncFormatter("substringof", true),
        notcontains: createStringFuncFormatter("not substringof", true)
    });
    var formattersV4 = (0, _extend.extend)({}, formatters, {
        contains: createStringFuncFormatter("contains"),
        notcontains: createStringFuncFormatter("not contains")
    });
    var compileBinary = function(criteria) {
        var _fieldTypes;
        criteria = _utils2.default.normalizeBinaryCriterion(criteria);
        var op = criteria[1];
        var fieldName = criteria[0];
        var fieldType = fieldTypes && fieldTypes[fieldName];
        if (fieldType && isStringFunction(op) && "String" !== fieldType) {
            throw new _errors.default.errors.Error("E4024", op, fieldName, fieldType)
        }
        var formatters = 4 === protocolVersion ? formattersV4 : formattersV2;
        var formatter = formatters[op.toLowerCase()];
        if (!formatter) {
            throw _errors.default.errors.Error("E4003", op)
        }
        var value = criteria[2];
        if (null !== (_fieldTypes = fieldTypes) && void 0 !== _fieldTypes && _fieldTypes[fieldName]) {
            value = (0, _utils.convertPrimitiveValue)(fieldTypes[fieldName], value)
        }
        return formatter((0, _utils.serializePropName)(fieldName), (0, _utils.serializeValue)(value, protocolVersion))
    };
    var compileUnary = function(criteria) {
        var op = criteria[0];
        var crit = compileCore(criteria[1]);
        if ("!" === op) {
            return "not (".concat(crit, ")")
        }
        throw _errors.default.errors.Error("E4003", op)
    };
    var compileGroup = function(criteria) {
        var bag = [];
        var groupOperator;
        var nextGroupOperator;
        (0, _iterator.each)(criteria, function(index, criterion) {
            if (Array.isArray(criterion)) {
                if (bag.length > 1 && groupOperator !== nextGroupOperator) {
                    throw new _errors.default.errors.Error("E4019")
                }
                bag.push("(".concat(compileCore(criterion), ")"));
                groupOperator = nextGroupOperator;
                nextGroupOperator = "and"
            } else {
                nextGroupOperator = _utils2.default.isConjunctiveOperator(this) ? "and" : "or"
            }
        });
        return bag.join(" ".concat(groupOperator, " "))
    };
    var compileCore = function(criteria) {
        if (Array.isArray(criteria[0])) {
            return compileGroup(criteria)
        }
        if (_utils2.default.isUnaryOperation(criteria)) {
            return compileUnary(criteria)
        }
        return compileBinary(criteria)
    };
    return function(criteria, version, types, filterToLower) {
        fieldTypes = types;
        forceLowerCase = null !== filterToLower && void 0 !== filterToLower ? filterToLower : (0, _config.default)().oDataFilterToLower;
        protocolVersion = version;
        return compileCore(criteria)
    }
}();
var createODataQueryAdapter = function(queryOptions) {
    var _sorting = [];
    var _criteria = [];
    var _expand = queryOptions.expand;
    var _select;
    var _skip;
    var _take;
    var _countQuery;
    var _oDataVersion = queryOptions.version || DEFAULT_PROTOCOL_VERSION;
    var hasSlice = function() {
        return _skip || void 0 !== _take
    };
    var hasFunction = function hasFunction(criterion) {
        for (var i = 0; i < criterion.length; i++) {
            if ((0, _type.isFunction)(criterion[i])) {
                return true
            }
            if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
                return true
            }
        }
        return false
    };
    var requestData = function() {
        var result = {};
        if (!_countQuery) {
            if (_sorting.length) {
                result.$orderby = _sorting.join(",")
            }
            if (_skip) {
                result.$skip = _skip
            }
            if (void 0 !== _take) {
                result.$top = _take
            }
            result.$select = (0, _utils.generateSelect)(_oDataVersion, _select) || void 0;
            result.$expand = (0, _utils.generateExpand)(_oDataVersion, _expand, _select) || void 0
        }
        if (_criteria.length) {
            var criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
            var fieldTypes = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.fieldTypes;
            var filterToLower = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.filterToLower;
            result.$filter = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower)
        }
        if (_countQuery) {
            result.$top = 0
        }
        if (queryOptions.requireTotalCount || _countQuery) {
            if (4 !== _oDataVersion) {
                result.$inlinecount = "allpages"
            } else {
                result.$count = "true"
            }
        }
        return result
    };
    var tryLiftSelect = function(tasks) {
        var selectIndex = -1;
        for (var i = 0; i < tasks.length; i++) {
            if ("select" === tasks[i].name) {
                selectIndex = i;
                break
            }
        }
        if (selectIndex < 0 || !(0, _type.isFunction)(tasks[selectIndex].args[0])) {
            return
        }
        var nextTask = tasks[1 + selectIndex];
        if (!nextTask || "slice" !== nextTask.name) {
            return
        }
        tasks[1 + selectIndex] = tasks[selectIndex];
        tasks[selectIndex] = nextTask
    };
    return {
        optimize: tryLiftSelect,
        exec: function(url) {
            return (0, _utils.sendRequest)(_oDataVersion, {
                url: url,
                params: (0, _extend.extend)(requestData(), null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.params)
            }, {
                beforeSend: queryOptions.beforeSend,
                jsonp: queryOptions.jsonp,
                withCredentials: queryOptions.withCredentials,
                countOnly: _countQuery,
                deserializeDates: queryOptions.deserializeDates,
                fieldTypes: queryOptions.fieldTypes,
                isPaged: isFinite(_take)
            })
        },
        multiSort: function(args) {
            var rules;
            if (hasSlice()) {
                return false
            }
            for (var i = 0; i < args.length; i++) {
                var getter = args[i][0];
                var desc = !!args[i][1];
                var rule = void 0;
                if ("string" !== typeof getter) {
                    return false
                }
                rule = (0, _utils.serializePropName)(getter);
                if (desc) {
                    rule += " desc"
                }
                rules = rules || [];
                rules.push(rule)
            }
            _sorting = rules
        },
        slice: function(skipCount, takeCount) {
            if (hasSlice()) {
                return false
            }
            _skip = skipCount;
            _take = takeCount
        },
        filter: function(criterion) {
            if (hasSlice()) {
                return false
            }
            if (!Array.isArray(criterion)) {
                criterion = [].slice.call(arguments)
            }
            if (hasFunction(criterion)) {
                return false
            }
            if (_criteria.length) {
                _criteria.push("and")
            }
            _criteria.push(criterion)
        },
        select: function(expr) {
            if (_select || (0, _type.isFunction)(expr)) {
                return false
            }
            if (!Array.isArray(expr)) {
                expr = [].slice.call(arguments)
            }
            _select = expr
        },
        count: function() {
            return _countQuery = true
        }
    }
};
_query_adapters.default.odata = createODataQueryAdapter;
var odata = createODataQueryAdapter;
exports.odata = odata;
