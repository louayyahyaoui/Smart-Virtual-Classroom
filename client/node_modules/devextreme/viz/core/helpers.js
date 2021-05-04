/**
 * DevExtreme (viz/core/helpers.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.expand = expand;
exports.changes = changes;
exports.replaceInherit = void 0;
var _extend2 = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _common = require("../../core/utils/common");
var isServerSide = !(0, _window.hasWindow)();

function Flags() {
    this.reset()
}
Flags.prototype = {
    constructor: Flags,
    add: function(codes) {
        var i;
        var ii = codes.length;
        var flags = this._flags;
        for (i = 0; i < ii; ++i) {
            flags[codes[i]] = 1
        }
    },
    has: function(code) {
        return this._flags[code] > 0
    },
    count: function() {
        return Object.keys(this._flags).length
    },
    reset: function() {
        this._flags = {}
    }
};

function combineMaps(baseMap, thisMap) {
    return baseMap !== thisMap ? (0, _extend2.extend)({}, baseMap, thisMap) : (0, _extend2.extend)({}, baseMap)
}

function combineLists(baseList, thisList) {
    return baseList !== thisList ? baseList.concat(thisList) : baseList.slice()
}

function buildTotalChanges(proto) {
    proto._totalChangesOrder = proto._optionChangesOrder.concat(proto._layoutChangesOrder, proto._customChangesOrder)
}

function addChange(settings) {
    var proto = this.prototype;
    var code = settings.code;
    proto["_change_" + code] = settings.handler;
    if (settings.isThemeDependent) {
        proto._themeDependentChanges.push(code)
    }
    if (settings.option) {
        proto._optionChangesMap[settings.option] = code
    }(settings.isOptionChange ? proto._optionChangesOrder : proto._customChangesOrder).push(code);
    buildTotalChanges(proto)
}

function createChainExecutor() {
    var executeChain = function executeChain() {
        var i;
        var ii = executeChain._chain.length;
        var result;
        for (i = 0; i < ii; ++i) {
            result = executeChain._chain[i].apply(this, arguments)
        }
        return result
    };
    executeChain._chain = [];
    executeChain.add = function(item) {
        executeChain._chain.push(item)
    };
    executeChain.copy = function(executor) {
        executeChain._chain = executor._chain.slice()
    };
    return executeChain
}

function expand(target, name, expander) {
    var current = target[name];
    if (!current) {
        current = expander
    } else {
        if (!current.add) {
            current = createChainExecutor();
            current.add(target[name]);
            current.add(expander)
        } else {
            if (false === Object.prototype.hasOwnProperty.call(target, name)) {
                current = createChainExecutor();
                current.copy(target[name])
            }
            current.add(expander)
        }
    }
    target[name] = current
}

function addPlugin(plugin) {
    var proto = this.prototype;
    proto._plugins.push(plugin);
    plugin.fontFields && proto._fontFields.push.apply(proto._fontFields, plugin.fontFields);
    if (plugin.members) {
        (0, _extend2.extend)(this.prototype, plugin.members)
    }
    if (plugin.customize) {
        plugin.customize(this)
    }
    if (plugin.extenders) {
        Object.keys(plugin.extenders).forEach(function(key) {
            var func = plugin.extenders[key];
            expand(proto, key, func)
        }, this)
    }
}
var replaceInherit = isServerSide ? function(widget) {
    var _inherit = widget.inherit;
    widget.inherit = function() {
        var result = _inherit.apply(this, arguments);
        var proto = result.prototype;
        ["_plugins", "_eventsMap", "_initialChanges", "_themeDependentChanges", "_optionChangesMap", "_optionChangesOrder", "_layoutChangesOrder", "_customChangesOrder", "_totalChangesOrder"].forEach(function(key) {
            proto[key] = {}
        });
        result.addPlugin = _common.noop;
        return result
    };
    widget.addChange = _common.noop;
    widget.addPlugin = _common.noop
} : function(widget) {
    var _inherit = widget.inherit;
    widget.inherit = function() {
        var proto = this.prototype;
        var plugins = proto._plugins;
        var fontFields = proto._fontFields;
        var eventsMap = proto._eventsMap;
        var initialChanges = proto._initialChanges;
        var themeDependentChanges = proto._themeDependentChanges;
        var optionChangesMap = proto._optionChangesMap;
        var partialOptionChangesMap = proto._partialOptionChangesMap;
        var partialOptionChangesPath = proto._partialOptionChangesPath;
        var optionChangesOrder = proto._optionChangesOrder;
        var layoutChangesOrder = proto._layoutChangesOrder;
        var customChangesOrder = proto._customChangesOrder;
        var result = _inherit.apply(this, arguments);
        proto = result.prototype;
        proto._plugins = combineLists(plugins, proto._plugins);
        proto._fontFields = combineLists(fontFields, proto._fontFields);
        proto._eventsMap = combineMaps(eventsMap, proto._eventsMap);
        proto._initialChanges = combineLists(initialChanges, proto._initialChanges);
        proto._themeDependentChanges = combineLists(themeDependentChanges, proto._themeDependentChanges);
        proto._optionChangesMap = combineMaps(optionChangesMap, proto._optionChangesMap);
        proto._partialOptionChangesMap = combineMaps(partialOptionChangesMap, proto._partialOptionChangesMap);
        proto._partialOptionChangesPath = combineMaps(partialOptionChangesPath, proto._partialOptionChangesPath);
        proto._optionChangesOrder = combineLists(optionChangesOrder, proto._optionChangesOrder);
        proto._layoutChangesOrder = combineLists(layoutChangesOrder, proto._layoutChangesOrder);
        proto._customChangesOrder = combineLists(customChangesOrder, proto._customChangesOrder);
        buildTotalChanges(proto);
        result.addPlugin = addPlugin;
        return result
    };
    widget.prototype._plugins = [];
    widget.prototype._fontFields = [];
    widget.addChange = addChange;
    widget.addPlugin = addPlugin
};
exports.replaceInherit = replaceInherit;

function changes() {
    return new Flags
}
