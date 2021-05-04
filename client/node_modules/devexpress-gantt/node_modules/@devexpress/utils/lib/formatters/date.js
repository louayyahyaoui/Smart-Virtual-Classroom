"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var string_1 = require("../utils/map/string");
var string_2 = require("../utils/string");
var date_utils_1 = require("./date-utils");
var DateFormatter = (function () {
    function DateFormatter(options) {
        this.date = new Date(2000, 0, 1);
        this.mask = '';
        this.specifiers = {};
        this.spPositions = [];
        this.parserKeys = [];
        this.savedYear = -1;
        this.isYearParsed = false;
        this.parsedMonth = -1;
        this.knownSpecifiers = ['d', 'M', 'y', 'H', 'h', 'm', 's', 'f', 'F', 'g', 't'];
        this.replacers = {
            'd': this.replaceDay,
            'M': this.replaceMonth,
            'y': this.replaceYear,
            'H': this.replaceHours23,
            'h': this.replaceHours12,
            'm': this.replaceMinutes,
            's': this.replaceSeconds,
            'F': this.replaceMsTrimmed,
            'f': this.replaceMs,
            'g': this.replaceEra,
            't': this.replaceAmPm
        };
        this.parsers = {
            'd': this.parseDay,
            'M': this.parseMonth,
            'y': this.parseYear,
            'H': this.parseHours,
            'h': this.parseHours,
            'm': this.parseMinutes,
            's': this.parseSeconds,
            'F': this.parseMs,
            'f': this.parseMs,
            'g': this.parseEra,
            't': this.parseAmPm
        };
        this.options = options;
    }
    DateFormatter.prototype.setFormatString = function (mask) {
        if (mask.length === 2 && mask.charAt(0) === '%')
            mask = mask.charAt(1);
        var stringContainsDateSeparator = !!mask && (mask.indexOf(this.options.ds) !== -1);
        this.specifiers = {};
        this.spPositions = [];
        this.mask = '';
        var subt = 0;
        var startPos = 0;
        var skip = false;
        var backslash = false;
        var sp = '';
        var prevCh = '';
        for (var pos = 0; true; pos++) {
            var ch = mask.charAt(pos);
            if (ch === '') {
                if (sp.length > 0)
                    this.registerSpecifier(startPos, sp, stringContainsDateSeparator);
                break;
            }
            if (ch === '\\' && !backslash) {
                backslash = true;
                subt++;
            }
            else {
                if (!backslash && (ch === '\'' || ch === '"')) {
                    skip = !skip;
                    subt++;
                }
                else {
                    if (!skip) {
                        if (ch === '/')
                            ch = this.options.ds;
                        else if (ch === ':')
                            ch = this.options.ts;
                        else if (this.isKnownSpecifier(ch)) {
                            if (prevCh.length === 0)
                                prevCh = ch;
                            if (ch === prevCh)
                                sp += ch;
                            else {
                                if (sp.length > 0)
                                    this.registerSpecifier(startPos, sp, stringContainsDateSeparator);
                                sp = ch;
                                startPos = pos - subt;
                            }
                        }
                    }
                    this.mask += ch;
                }
                backslash = false;
            }
            prevCh = ch;
        }
        this.spPositions.reverse();
    };
    DateFormatter.prototype.format = function (date) {
        this.date = date;
        var result = this.mask;
        for (var _i = 0, _a = this.spPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            var sp = this.specifiers[pos];
            var replacerKey = sp.substr(0, 1);
            if (this.replacers[replacerKey])
                result = result.substr(0, pos) + this.replacers[replacerKey].call(this, sp.length) + result.substr(pos + sp.length);
        }
        return result;
    };
    DateFormatter.prototype.parse = function (str, rememberParserKeys) {
        var now = new Date();
        this.savedYear = now.getFullYear();
        this.isYearParsed = false;
        this.parsedMonth = -1;
        this.date = new Date(2000, 0, now.getDate());
        this.strToParse = str;
        this.catchNumbers(str);
        this.hasAmPm = false;
        for (var _i = 0, _a = this.spPositions; _i < _a.length; _i++) {
            var pos = _a[_i];
            var sp = this.specifiers[pos];
            var parserKey = sp.substr(0, 1);
            if (this.parsers[parserKey]) {
                if (rememberParserKeys)
                    this.parserKeys.push(parserKey);
                if (!this.parsers[parserKey].call(this, sp.length))
                    return false;
            }
        }
        if (this.hasAmPm) {
            if (!this.fixHours())
                return false;
        }
        if (!this.isYearParsed)
            this.date.setFullYear(this.savedYear);
        if (this.parsedMonth < 0)
            this.parsedMonth = now.getMonth();
        this.applyMonth();
        return this.date;
    };
    DateFormatter.prototype.hasYear = function () {
        return this.hasParserKey('y');
    };
    DateFormatter.prototype.hasMonth = function () {
        return this.hasParserKey('M');
    };
    DateFormatter.prototype.hasDay = function () {
        return this.hasParserKey('d');
    };
    DateFormatter.prototype.hasHours = function () {
        return this.hasParserKey('h') || this.hasParserKey('H');
    };
    DateFormatter.prototype.hasMinutes = function () {
        return this.hasParserKey('m');
    };
    DateFormatter.prototype.hasSeconds = function () {
        return this.hasParserKey('s');
    };
    DateFormatter.prototype.hasMilliseconds = function () {
        return this.hasParserKey('f') || this.hasParserKey('F');
    };
    DateFormatter.prototype.hasParserKey = function (key) {
        return this.parserKeys.indexOf(key) !== -1;
    };
    DateFormatter.expandPredefinedFormat = function (format, options) {
        switch (format) {
            case 'd':
                return options.shortDate;
            case 'D':
                return options.longDate;
            case 't':
                return options.shortTime;
            case 'T':
                return options.longTime;
            case 'g':
                return options.shortDate + ' ' + options.shortTime;
            case 'f':
                return options.longDate + ' ' + options.shortTime;
            case 'G':
                return options.shortDate + ' ' + options.longTime;
            case 'F':
            case 'U':
                return options.longDate + ' ' + options.longTime;
            case 'M':
            case 'm':
                return options.monthDay;
            case 'Y':
            case 'y':
                return options.yearMonth;
            case 'O':
            case 'o':
                return 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss.fffffff';
            case 'R':
            case 'r':
                return 'ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'';
            case 's':
                return 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss';
            case 'u':
                return 'yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'';
        }
        return format;
    };
    DateFormatter.prototype.applyMonth = function () {
        var trial;
        var day = this.date.getDate();
        while (true) {
            trial = new Date();
            trial.setTime(this.date.getTime());
            trial.setMonth(this.parsedMonth);
            if (trial.getMonth() === this.parsedMonth)
                break;
            --day;
            this.date.setDate(day);
        }
        date_utils_1.DateUtils.fixTimezoneGap(this.date, trial);
        this.date = trial;
    };
    DateFormatter.prototype.registerSpecifier = function (pos, sp, stringContainsDateSeparator) {
        if (this.options.ds.length > 1 && this.mask && !stringContainsDateSeparator) {
            var dateParts = this.mask.split(this.options.ds);
            if (dateParts) {
                if (dateParts.length > 0 && dateParts[dateParts.length - 1] === '')
                    dateParts.pop();
                pos += (dateParts.length - 1) * (this.options.ds.length - 1);
            }
        }
        this.spPositions.push(pos);
        this.specifiers[pos] = sp;
    };
    DateFormatter.prototype.replaceDay = function (length) {
        if (length < 3) {
            var value = this.date.getDate().toString();
            return length === 2 ? this.padLeft(value, 2) : value;
        }
        else if (length === 3)
            return this.options.abbrDayNames[this.date.getDay()];
        else
            return this.options.dayNames[this.date.getDay()];
    };
    DateFormatter.prototype.replaceMonth = function (length) {
        var value = 1 + this.date.getMonth();
        switch (length) {
            case 1:
                return value.toString();
            case 2:
                return this.padLeft(value.toString(), 2);
            case 3:
                return this.options.abbrMonthNames[value - 1];
            default:
                for (var i in this.specifiers) {
                    if (Object.prototype.hasOwnProperty.call(this.specifiers, i)) {
                        var spec = this.specifiers[i];
                        if (spec === 'd' || spec === 'dd')
                            return this.options.genMonthNames[value - 1];
                    }
                }
                return this.options.monthNames[value - 1];
        }
    };
    DateFormatter.prototype.replaceYear = function (length) {
        var value = this.date.getFullYear();
        if (length <= 2)
            value = value % 100;
        return this.padLeft(value.toString(), length);
    };
    DateFormatter.prototype.replaceHours23 = function (length) {
        var value = this.date.getHours().toString();
        return length > 1 ? this.padLeft(value, 2) : value;
    };
    DateFormatter.prototype.replaceHours12 = function (length) {
        var value = this.date.getHours() % 12;
        if (value === 0)
            value = 12;
        var strValue = value.toString();
        return length > 1 ? this.padLeft(strValue, 2) : strValue;
    };
    DateFormatter.prototype.replaceMinutes = function (length) {
        var value = this.date.getMinutes().toString();
        return length > 1 ? this.padLeft(value, 2) : value;
    };
    DateFormatter.prototype.replaceSeconds = function (length) {
        var value = this.date.getSeconds().toString();
        return length > 1 ? this.padLeft(value, 2) : value;
    };
    DateFormatter.prototype.replaceMsTrimmed = function (length) {
        return this.formatMs(length, true);
    };
    DateFormatter.prototype.replaceMs = function (length) {
        return this.formatMs(length, false);
    };
    DateFormatter.prototype.replaceEra = function (_length) {
        return 'A.D.';
    };
    DateFormatter.prototype.replaceAmPm = function (length) {
        var value = this.date.getHours() < 12 ? this.options.am : this.options.pm;
        return length < 2 ? value.charAt(0) : value;
    };
    DateFormatter.prototype.catchNumbers = function (str) {
        var _this = this;
        this.parseNumbers = [];
        var regex = /\d+/g;
        var match;
        while (true) {
            match = regex.exec(str);
            if (!match)
                break;
            this.parseNumbers.push(this.parseDecInt(match[0]));
        }
        var spCount = 0;
        var now = new Date();
        string_1.StringMapUtils.forEach(this.specifiers, function (sp) {
            if (typeof (sp) !== 'string' || !_this.isNumericSpecifier(sp))
                return;
            spCount++;
            if (_this.parseNumbers.length < spCount) {
                var defaultValue = 0;
                if (sp.charAt(0) === 'y')
                    defaultValue = now.getFullYear();
                _this.parseNumbers.push(defaultValue);
            }
        });
        var excess = this.parseNumbers.length - spCount;
        if (excess > 0)
            this.parseNumbers.splice(spCount, excess);
        this.currentParseNumber = this.parseNumbers.length - 1;
    };
    DateFormatter.prototype.popParseNumber = function () {
        return this.parseNumbers[this.currentParseNumber--];
    };
    DateFormatter.prototype.findAbbrMonth = function () {
        return this.findMonthCore(this.options.abbrMonthNames);
    };
    DateFormatter.prototype.findFullMonth = function () {
        return this.findMonthCore(this.options.genMonthNames);
    };
    DateFormatter.prototype.findMonthCore = function (monthNames) {
        var inputLower = this.strToParse.toLowerCase();
        for (var i = 0; i < monthNames.length; i++) {
            var monthName = monthNames[i].toLowerCase();
            if (monthName.length > 0 && inputLower.indexOf(monthName) > -1) {
                this.strToParse = this.strToParse.replace(new RegExp(monthName, 'gi'), string_2.StringUtils.repeat(' ', monthName.length));
                return 1 + i;
            }
        }
        return false;
    };
    DateFormatter.prototype.parseDay = function (length) {
        if (length < 3) {
            var value = this.popParseNumber();
            if (value < 1 || value > 31)
                return false;
            this.date.setDate(value);
        }
        return true;
    };
    DateFormatter.prototype.parseMonth = function (length) {
        var value;
        switch (length) {
            case 1:
            case 2:
                value = this.popParseNumber();
                break;
            case 3:
                value = this.findAbbrMonth();
                break;
            default:
                value = this.findFullMonth();
                break;
        }
        if (value === false || value < 1 || value > 12)
            return false;
        this.parsedMonth = value - 1;
        return true;
    };
    DateFormatter.prototype.parseYear = function (_length) {
        var value = this.popParseNumber();
        if (value > 9999)
            return false;
        if (value < 100)
            value = date_utils_1.DateUtils.expandTwoDigitYear(value, this.options);
        this.date.setFullYear(value);
        this.isYearParsed = true;
        return true;
    };
    DateFormatter.prototype.parseHours = function (_length) {
        var value = this.popParseNumber();
        if (value > 23)
            return false;
        this.date.setHours(value);
        return true;
    };
    DateFormatter.prototype.parseMinutes = function (_length) {
        var value = this.parseMinSecCore();
        if (value === -1)
            return false;
        this.date.setMinutes(value);
        return true;
    };
    DateFormatter.prototype.parseSeconds = function (_length) {
        var value = this.parseMinSecCore();
        if (value === -1)
            return false;
        this.date.setSeconds(value);
        return true;
    };
    DateFormatter.prototype.parseMs = function (length) {
        if (length > 3)
            length = 3;
        var thr = 1;
        for (var i = 0; i < length; i++)
            thr *= 10;
        thr -= 1;
        var value = this.popParseNumber();
        while (value > thr)
            value /= 10;
        this.date.setMilliseconds(Math.round(value));
        return true;
    };
    DateFormatter.prototype.parseEra = function (_length) {
        return true;
    };
    DateFormatter.prototype.parseAmPm = function (_length) {
        this.hasAmPm = this.options.am.length > 0 && this.options.pm.length > 0;
        return true;
    };
    DateFormatter.prototype.parseDecInt = function (str) {
        return parseInt(str, 10);
    };
    DateFormatter.prototype.padLeft = function (str, length) {
        while (str.length < length)
            str = '0' + str;
        return str;
    };
    DateFormatter.prototype.formatMs = function (length, trim) {
        var numVal = Math.floor(this.date.getMilliseconds() * Math.pow(10, length - 3));
        var value = this.padLeft(numVal.toString(), length);
        if (trim) {
            var pos = value.length - 1;
            var req = false;
            while (value.charAt(pos) === '0') {
                req = true;
                pos--;
            }
            if (req)
                value = value.substring(0, pos + 1);
        }
        return value;
    };
    DateFormatter.prototype.parseMinSecCore = function () {
        var value = this.popParseNumber();
        return value > 59 ? -1 : value;
    };
    DateFormatter.prototype.fixHours = function () {
        var state = this.getAmPmState(this.strToParse, false);
        if (!state)
            return true;
        var h = this.date.getHours();
        switch (state) {
            case 'P':
                if (h > 12)
                    return false;
                if (h < 12)
                    this.date.setHours(12 + h);
                break;
            case 'A':
                if (h === 12)
                    this.date.setHours(0);
        }
        return true;
    };
    DateFormatter.prototype.getAmPmState = function (str, skipCorrection) {
        var am = this.options.am.charAt(0).toLowerCase();
        var pm = this.options.pm.charAt(0).toLowerCase();
        var amMatches = new RegExp(am, 'gi').exec(str);
        var pmMatches = new RegExp(pm, 'gi').exec(str);
        var amCount = amMatches ? amMatches.length : 0;
        var pmCount = pmMatches ? pmMatches.length : 0;
        var hasAm = amCount > 0;
        var hasPm = pmCount > 0;
        if (hasAm !== hasPm && amCount < 2 && pmCount < 2)
            return hasAm ? 'A' : 'P';
        if (!skipCorrection) {
            str = str.replace(new RegExp(this.getDayMonthNameReplacePattern(), 'gi'), '');
            return this.getAmPmState(str, true);
        }
        return null;
    };
    DateFormatter.prototype.getDayMonthNameReplacePattern = function () {
        if (!this.dayMonthNameReplacePattern)
            return this.createDayMonthNameReplacePattern();
        return this.dayMonthNameReplacePattern;
    };
    DateFormatter.prototype.createDayMonthNameReplacePattern = function () {
        var parts = [];
        parts.push('(?:');
        parts.push(this.createReplacePattern(this.options.monthNames));
        parts.push(this.createReplacePattern(this.options.genMonthNames));
        parts.push(this.createReplacePattern(this.options.abbrMonthNames));
        parts.push(this.createReplacePattern(this.options.abbrDayNames));
        parts.push(this.createReplacePattern(this.options.dayNames));
        parts.push(')');
        return parts.join('');
    };
    DateFormatter.prototype.createReplacePattern = function (names) {
        return names && names.length > 0 ? '\\b' + names.join('\\b|\\b') + '\\b' : '';
    };
    DateFormatter.prototype.isNumericSpecifier = function (sp) {
        var ch = sp.charAt(0);
        return !(ch === 'g' || ch === 't' || ((ch === 'M' || ch === 'd') && sp.length > 2));
    };
    DateFormatter.prototype.isKnownSpecifier = function (sp) {
        sp = sp.charAt(0);
        return this.knownSpecifiers.indexOf(sp) !== -1;
    };
    return DateFormatter;
}());
exports.DateFormatter = DateFormatter;
