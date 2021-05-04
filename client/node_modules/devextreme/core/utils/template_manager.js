/**
 * DevExtreme (core/utils/template_manager.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.acquireTemplate = exports.acquireIntegrationTemplate = exports.defaultCreateElement = exports.templateKey = exports.validateTemplateSource = exports.getNormalizedTemplateArgs = exports.addOneRenderedCall = exports.suitableTemplatesByName = exports.findTemplates = void 0;
var _config = _interopRequireDefault(require("../config"));
var _devices = _interopRequireDefault(require("../devices"));
var _errors = _interopRequireDefault(require("../errors"));
var _renderer = _interopRequireDefault(require("../renderer"));
var _child_default_template = require("../templates/child_default_template");
var _empty_template = require("../templates/empty_template");
var _template = require("../templates/template");
var _template_base = require("../templates/template_base");
var _array = require("./array");
var _common = require("./common");
var _dom = require("./dom");
var _extend = require("./extend");
var _type = require("./type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var findTemplates = function(element, name) {
    var optionsAttributeName = "data-options";
    var templates = (0, _renderer.default)(element).contents().filter("[".concat(optionsAttributeName, '*="').concat(name, '"]'));
    return [].slice.call(templates).map(function(element) {
        var optionsString = (0, _renderer.default)(element).attr(optionsAttributeName) || "";
        return {
            element: element,
            options: (0, _config.default)().optionsParser(optionsString)[name]
        }
    }).filter(function(template) {
        return !!template.options
    })
};
exports.findTemplates = findTemplates;
var suitableTemplatesByName = function(rawTemplates) {
    var templatesMap = (0, _array.groupBy)(rawTemplates, function(template) {
        return template.options.name
    });
    if (templatesMap[void 0]) {
        throw _errors.default.Error("E0023")
    }
    var result = {};
    Object.keys(templatesMap).forEach(function(name) {
        var _findBestMatches$;
        var suitableTemplate = null === (_findBestMatches$ = (0, _common.findBestMatches)(_devices.default.current(), templatesMap[name], function(template) {
            return template.options
        })[0]) || void 0 === _findBestMatches$ ? void 0 : _findBestMatches$.element;
        if (suitableTemplate) {
            result[name] = suitableTemplate
        }
    });
    return result
};
exports.suitableTemplatesByName = suitableTemplatesByName;
var addOneRenderedCall = function(template) {
    var _render = template.render.bind(template);
    return (0, _extend.extend)({}, template, {
        render: function(options) {
            var templateResult = _render(options);
            options && options.onRendered && options.onRendered();
            return templateResult
        }
    })
};
exports.addOneRenderedCall = addOneRenderedCall;
var getNormalizedTemplateArgs = function(options) {
    var args = [];
    if ("model" in options) {
        args.push(options.model)
    }
    if ("index" in options) {
        args.push(options.index)
    }
    args.push(options.container);
    return args
};
exports.getNormalizedTemplateArgs = getNormalizedTemplateArgs;
var validateTemplateSource = function(templateSource) {
    return "string" === typeof templateSource ? (0, _dom.normalizeTemplateElement)(templateSource) : templateSource
};
exports.validateTemplateSource = validateTemplateSource;
var templateKey = function(templateSource) {
    return (0, _type.isRenderer)(templateSource) && templateSource[0] || templateSource
};
exports.templateKey = templateKey;
var defaultCreateElement = function(element) {
    return new _template.Template(element)
};
exports.defaultCreateElement = defaultCreateElement;
var acquireIntegrationTemplate = function(templateSource, templates, isAsyncTemplate, skipTemplates) {
    var integrationTemplate = null;
    if (!skipTemplates || skipTemplates.indexOf(templateSource) === -1) {
        integrationTemplate = templates[templateSource];
        if (integrationTemplate && !(integrationTemplate instanceof _template_base.TemplateBase) && !isAsyncTemplate) {
            integrationTemplate = addOneRenderedCall(integrationTemplate)
        }
    }
    return integrationTemplate
};
exports.acquireIntegrationTemplate = acquireIntegrationTemplate;
var acquireTemplate = function(templateSource, createTemplate, templates, isAsyncTemplate, skipTemplates, defaultTemplates) {
    if (null == templateSource) {
        return new _empty_template.EmptyTemplate
    }
    if (templateSource instanceof _child_default_template.ChildDefaultTemplate) {
        return defaultTemplates[templateSource.name]
    }
    if (templateSource instanceof _template_base.TemplateBase) {
        return templateSource
    }
    if ((0, _type.isFunction)(templateSource.render) && !(0, _type.isRenderer)(templateSource)) {
        return isAsyncTemplate ? templateSource : addOneRenderedCall(templateSource)
    }
    if (templateSource.nodeType || (0, _type.isRenderer)(templateSource)) {
        return createTemplate((0, _renderer.default)(templateSource))
    }
    return acquireIntegrationTemplate(templateSource, templates, isAsyncTemplate, skipTemplates) || defaultTemplates[templateSource] || createTemplate(templateSource)
};
exports.acquireTemplate = acquireTemplate;
