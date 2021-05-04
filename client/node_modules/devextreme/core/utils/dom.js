/**
 * DevExtreme (core/utils/dom.js)
 * Version: 20.2.6
 * Build date: Tue Mar 16 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.createTextElementHiddenCopy = exports.contains = exports.clipboardText = exports.normalizeTemplateElement = exports.extractTemplateMarkup = exports.closestCommonParent = exports.clearSelection = exports.resetActiveElement = void 0;
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _type = require("./type");
var _window = require("./window");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    }
}
var window = (0, _window.getWindow)();
var resetActiveElement = function() {
    var activeElement = _dom_adapter.default.getActiveElement();
    var body = _dom_adapter.default.getBody();
    if (activeElement && activeElement !== body && activeElement.blur) {
        try {
            activeElement.blur()
        } catch (e) {
            body.blur()
        }
    }
};
exports.resetActiveElement = resetActiveElement;
var clearSelection = function() {
    var selection = window.getSelection();
    if (!selection) {
        return
    }
    if ("Caret" === selection.type) {
        return
    }
    if (selection.empty) {
        selection.empty()
    } else {
        if (selection.removeAllRanges) {
            try {
                selection.removeAllRanges()
            } catch (e) {}
        }
    }
};
exports.clearSelection = clearSelection;
var closestCommonParent = function(startTarget, endTarget) {
    var $startTarget = (0, _renderer.default)(startTarget);
    var $endTarget = (0, _renderer.default)(endTarget);
    if ($startTarget[0] === $endTarget[0]) {
        return $startTarget[0]
    }
    var $startParents = $startTarget.parents();
    var $endParents = $endTarget.parents();
    var startingParent = Math.min($startParents.length, $endParents.length);
    for (var i = -startingParent; i < 0; i++) {
        if ($startParents.get(i) === $endParents.get(i)) {
            return $startParents.get(i)
        }
    }
};
exports.closestCommonParent = closestCommonParent;
var extractTemplateMarkup = function(element) {
    element = (0, _renderer.default)(element);
    var templateTag = element.length && element.filter(function() {
        var $node = (0, _renderer.default)(this);
        return $node.is("script[type]") && $node.attr("type").indexOf("script") < 0
    });
    if (templateTag.length) {
        return templateTag.eq(0).html()
    } else {
        element = (0, _renderer.default)("<div>").append(element);
        return element.html()
    }
};
exports.extractTemplateMarkup = extractTemplateMarkup;
var normalizeTemplateElement = function normalizeTemplateElement(element) {
    var $element = (0, _type.isDefined)(element) && (element.nodeType || (0, _type.isRenderer)(element)) ? (0, _renderer.default)(element) : (0, _renderer.default)("<div>").html(element).contents();
    if (1 === $element.length) {
        if ($element.is("script")) {
            $element = normalizeTemplateElement($element.html().trim())
        } else {
            if ($element.is("table")) {
                $element = $element.children("tbody").contents()
            }
        }
    }
    return $element
};
exports.normalizeTemplateElement = normalizeTemplateElement;
var clipboardText = function(event, text) {
    var clipboard = event.originalEvent && event.originalEvent.clipboardData || window.clipboardData;
    if (1 === arguments.length) {
        return clipboard && clipboard.getData("Text")
    }
    clipboard && clipboard.setData("Text", text)
};
exports.clipboardText = clipboardText;
var contains = function contains(container, element) {
    if (!element) {
        return false
    }
    if (_dom_adapter.default.isTextNode(element)) {
        element = element.parentNode
    }
    if (_dom_adapter.default.isDocument(container)) {
        return container.documentElement.contains(element)
    }
    if ((0, _type.isWindow)(container)) {
        return contains(container.document, element)
    }
    return container.contains ? container.contains(element) : !!(element.compareDocumentPosition(container) & element.DOCUMENT_POSITION_CONTAINS)
};
exports.contains = contains;
var createTextElementHiddenCopy = function(element, text, options) {
    var elementStyles = window.getComputedStyle((0, _renderer.default)(element).get(0));
    var includePaddings = options && options.includePaddings;
    return (0, _renderer.default)("<div>").text(text).css({
        fontStyle: elementStyles.fontStyle,
        fontVariant: elementStyles.fontVariant,
        fontWeight: elementStyles.fontWeight,
        fontSize: elementStyles.fontSize,
        fontFamily: elementStyles.fontFamily,
        letterSpacing: elementStyles.letterSpacing,
        border: elementStyles.border,
        paddingTop: includePaddings ? elementStyles.paddingTop : "",
        paddingRight: includePaddings ? elementStyles.paddingRight : "",
        paddingBottom: includePaddings ? elementStyles.paddingBottom : "",
        paddingLeft: includePaddings ? elementStyles.paddingLeft : "",
        visibility: "hidden",
        whiteSpace: "pre",
        position: "absolute",
        "float": "left"
    })
};
exports.createTextElementHiddenCopy = createTextElementHiddenCopy;
