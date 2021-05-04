"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var browser_1 = require("../browser");
var AttrUtils = (function () {
    function AttrUtils() {
    }
    AttrUtils.setElementAttribute = function (obj, attrName, value) {
        if (obj.setAttribute) {
            if (browser_1.Browser.IE && browser_1.Browser.MajorVersion >= 11 && attrName.toLowerCase() === 'src')
                obj.setAttribute(attrName, '');
            obj.setAttribute(attrName, value);
        }
    };
    AttrUtils.setStyleAttribute = function (obj, attrName, value) {
        if (obj.setProperty)
            obj.setProperty(attrName, value, '');
    };
    AttrUtils.getElementAttribute = function (obj, attrName) {
        return obj.getAttribute(attrName);
    };
    AttrUtils.getStyleAttribute = function (obj, attrName) {
        if (obj.getPropertyValue) {
            if (browser_1.Browser.Firefox) {
                try {
                    return obj.getPropertyValue(attrName);
                }
                catch (e) {
                    return obj[attrName];
                }
            }
            return obj.getPropertyValue(attrName);
        }
        return null;
    };
    AttrUtils.removeElementAttribute = function (obj, attrName) {
        if (obj.removeAttribute)
            obj.removeAttribute(attrName);
    };
    AttrUtils.removeStyleAttribute = function (obj, attrName) {
        if (obj.removeProperty)
            obj.removeProperty(attrName);
    };
    AttrUtils.changeElementStyleAttribute = function (obj, attrName, newValue) {
        AttrUtils.saveStyleAttributeInElement(obj, attrName);
        AttrUtils.setStyleAttribute(obj.style, attrName, newValue);
    };
    AttrUtils.restoreElementStyleAttribute = function (obj, attrName) {
        var savedAttrName = "saved" + attrName;
        var style = obj.style;
        if (AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getElementAttribute(obj, savedAttrName);
            if (oldValue === AttrUtils.emptyObject || oldValue === null)
                AttrUtils.removeStyleAttribute(style, attrName);
            else
                AttrUtils.setStyleAttribute(style, attrName, oldValue);
            AttrUtils.removeElementAttribute(obj, savedAttrName);
            return true;
        }
        return false;
    };
    AttrUtils.saveStyleAttributeInElement = function (obj, attrName) {
        var savedAttrName = "saved" + attrName;
        var style = obj.style;
        if (!AttrUtils.isExistsAttributeInElement(obj, savedAttrName)) {
            var oldValue = AttrUtils.getStyleAttribute(style, attrName);
            AttrUtils.setElementAttribute(obj, savedAttrName, AttrUtils.isAttributeExists(oldValue) ? oldValue : AttrUtils.emptyObject);
        }
    };
    AttrUtils.isExistsAttributeInElement = function (obj, attrName) {
        var value = AttrUtils.getElementAttribute(obj, attrName);
        return AttrUtils.isAttributeExists(value);
    };
    AttrUtils.isAttributeExists = function (attrValue) {
        return attrValue !== null && attrValue !== '';
    };
    AttrUtils.emptyObject = 'DxEmptyValue';
    return AttrUtils;
}());
exports.AttrUtils = AttrUtils;
