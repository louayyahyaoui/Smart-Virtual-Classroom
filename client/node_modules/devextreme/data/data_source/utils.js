/**
 * DevExtreme (data/data_source/utils.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.normalizeDataSourceOptions = exports.normalizeLoadResult = exports.mapDataRespectingGrouping = exports.normalizeStoreLoadOptionAccessorArguments = exports.isPending = exports.CANCELED_TOKEN = void 0;
var _ajax = _interopRequireDefault(require("../../core/utils/ajax"));
var _abstract_store = _interopRequireDefault(require("../abstract_store"));
var _array_store = _interopRequireDefault(require("../array_store"));
var _iterator = require("../../core/utils/iterator");
var _custom_store = _interopRequireDefault(require("../custom_store"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}

function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}

function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else {
            if (Object.getOwnPropertyDescriptors) {
                Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
            } else {
                ownKeys(Object(source)).forEach(function(key) {
                    Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
                })
            }
        }
    }
    return target
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

function _objectWithoutProperties(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
}
var CANCELED_TOKEN = "canceled";
exports.CANCELED_TOKEN = CANCELED_TOKEN;
var isPending = function(deferred) {
    return "pending" === deferred.state()
};
exports.isPending = isPending;
var normalizeStoreLoadOptionAccessorArguments = function(originalArguments) {
    switch (originalArguments.length) {
        case 0:
            return;
        case 1:
            return originalArguments[0]
    }
    return [].slice.call(originalArguments)
};
exports.normalizeStoreLoadOptionAccessorArguments = normalizeStoreLoadOptionAccessorArguments;
var mapGroup = function(group, level, mapper) {
    return (0, _iterator.map)(group, function(item) {
        var restItem = (item.items, _objectWithoutProperties(item, ["items"]));
        return _objectSpread(_objectSpread({}, restItem), {}, {
            items: mapRecursive(item.items, level - 1, mapper)
        })
    })
};
var mapRecursive = function(items, level, mapper) {
    if (!Array.isArray(items)) {
        return items
    }
    return level ? mapGroup(items, level, mapper) : (0, _iterator.map)(items, mapper)
};
var mapDataRespectingGrouping = function(items, mapper, groupInfo) {
    var level = groupInfo ? _utils.default.normalizeSortingInfo(groupInfo).length : 0;
    return mapRecursive(items, level, mapper)
};
exports.mapDataRespectingGrouping = mapDataRespectingGrouping;
var normalizeLoadResult = function(data, extra) {
    var _data;
    if (null !== (_data = data) && void 0 !== _data && _data.data) {
        extra = data;
        data = data.data
    }
    if (!Array.isArray(data)) {
        data = [data]
    }
    return {
        data: data,
        extra: extra
    }
};
exports.normalizeLoadResult = normalizeLoadResult;
var createCustomStoreFromLoadFunc = function(options) {
    var storeConfig = {};
    (0, _iterator.each)(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
        storeConfig[this] = options[this];
        delete options[this]
    });
    return new _custom_store.default(storeConfig)
};
var createStoreFromConfig = function(storeConfig) {
    var alias = storeConfig.type;
    delete storeConfig.type;
    return _abstract_store.default.create(alias, storeConfig)
};
var createCustomStoreFromUrl = function(url, normalizationOptions) {
    return new _custom_store.default({
        load: function() {
            return _ajax.default.sendRequest({
                url: url,
                dataType: "json"
            })
        },
        loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
    })
};
var normalizeDataSourceOptions = function(options, normalizationOptions) {
    var store;
    if ("string" === typeof options) {
        options = {
            paginate: false,
            store: createCustomStoreFromUrl(options, normalizationOptions)
        }
    }
    if (void 0 === options) {
        options = []
    }
    if (Array.isArray(options) || options instanceof _abstract_store.default) {
        options = {
            store: options
        }
    } else {
        options = (0, _extend.extend)({}, options)
    }
    if (void 0 === options.store) {
        options.store = []
    }
    store = options.store;
    if ("load" in options) {
        store = createCustomStoreFromLoadFunc(options)
    } else {
        if (Array.isArray(store)) {
            store = new _array_store.default(store)
        } else {
            if ((0, _type.isPlainObject)(store)) {
                store = createStoreFromConfig((0, _extend.extend)({}, store))
            }
        }
    }
    options.store = store;
    return options
};
exports.normalizeDataSourceOptions = normalizeDataSourceOptions;
