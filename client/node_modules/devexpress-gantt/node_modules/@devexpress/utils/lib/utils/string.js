"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = (function () {
    function StringUtils() {
    }
    StringUtils.isAlpha = function (ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    };
    StringUtils.isDigit = function (ch) {
        return ch >= '0' && ch <= '9';
    };
    StringUtils.stringHashCode = function (str) {
        var hash = 0;
        if (str.length === 0)
            return hash;
        var strLen = str.length;
        for (var i = 0; i < strLen; i++) {
            hash = ((hash << 5) - hash) + str.charCodeAt(i);
            hash |= 0;
        }
        return hash;
    };
    StringUtils.endsAt = function (str, template) {
        var strInd = str.length - 1;
        var tmplInd = template.length - 1;
        var strStartInd = strInd - tmplInd;
        if (strStartInd < 0)
            return false;
        for (; strInd >= strStartInd; strInd--, tmplInd--) {
            if (str[strInd] !== template[tmplInd])
                return false;
        }
        return true;
    };
    StringUtils.startsAt = function (str, template) {
        return str.substr(0, template.length) === template;
    };
    StringUtils.stringInLowerCase = function (str) {
        return str.toLowerCase() === str;
    };
    StringUtils.stringInUpperCase = function (str) {
        return str.toUpperCase() === str;
    };
    StringUtils.atLeastOneSymbolInUpperCase = function (str) {
        for (var i = 0, char = void 0; char = str[i]; i++) {
            if (StringUtils.stringInUpperCase(char) && !StringUtils.stringInLowerCase(char))
                return true;
        }
        return false;
    };
    StringUtils.getSymbolFromEnd = function (text, posFromEnd) {
        return text[text.length - posFromEnd];
    };
    StringUtils.trim = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("(^[" + joinedChars + "]*)|([" + joinedChars + "]*$)", 'g'), '');
        }
    };
    StringUtils.trimStart = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, true, false);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("^[" + joinedChars + "]*", 'g'), '');
        }
    };
    StringUtils.trimEnd = function (str, trimChars) {
        if (trimChars === undefined)
            return StringUtils.trimInternal(str, false, true);
        else {
            var joinedChars = trimChars.join('');
            return str.replace(new RegExp("[" + joinedChars + "]*$", 'g'), '');
        }
    };
    StringUtils.getDecimalSeparator = function () {
        return (1.1).toLocaleString().substr(1, 1);
    };
    StringUtils.repeat = function (str, count) {
        return new Array(count <= 0 ? 0 : count + 1).join(str);
    };
    StringUtils.isNullOrEmpty = function (str) {
        return !str || !str.length;
    };
    StringUtils.padLeft = function (str, totalWidth, paddingChar) {
        return StringUtils.repeat(paddingChar, Math.max(0, totalWidth - str.length)) + str;
    };
    StringUtils.trimInternal = function (source, trimStart, trimEnd) {
        var len = source.length;
        if (!len)
            return source;
        if (len < 0xBABA1) {
            var result = source;
            if (trimStart)
                result = result.replace(/^\s+/, '');
            if (trimEnd)
                result = result.replace(/\s+$/, '');
            return result;
        }
        else {
            var start = 0;
            if (trimEnd) {
                while (len > 0 && /\s/.test(source[len - 1]))
                    len--;
            }
            if (trimStart && len > 0) {
                while (start < len && /\s/.test(source[start]))
                    start++;
            }
            return source.substring(start, len);
        }
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
