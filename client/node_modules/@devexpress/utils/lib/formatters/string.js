"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var date_1 = require("./date");
var date_utils_1 = require("./date-utils");
var StringFormatter = (function () {
    function StringFormatter(dateFormatter, numberFormatter) {
        this.activeDateFormat = null;
        this.dateFormatter = dateFormatter;
        this.numberFormatter = numberFormatter;
    }
    StringFormatter.prototype.format = function (pattern) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var bag = [];
        var pos = 0;
        var savedPos = 0;
        while (pos < pattern.length) {
            var ch = pattern.charAt(pos);
            pos++;
            if (ch === '{') {
                bag.push(pattern.substr(savedPos, pos - savedPos - 1));
                if (pattern.charAt(pos) === '{') {
                    savedPos = pos;
                    pos++;
                    continue;
                }
                var spec = this.parseSpec(pattern, pos);
                pos = spec.pos;
                var arg = args[spec.index];
                var argString = void 0;
                if (arg == null)
                    argString = '';
                else if (typeof arg === 'number')
                    argString = this.numberFormatter.format(spec.format, arg);
                else if (arg instanceof Date) {
                    if (spec.format !== this.activeDateFormat) {
                        this.activeDateFormat = spec.format;
                        if (spec.format === '')
                            spec.format = 'G';
                        if (spec.format.length === 1)
                            spec.format = date_1.DateFormatter.expandPredefinedFormat(spec.format, this.dateFormatter.options);
                        this.dateFormatter.setFormatString(spec.format);
                    }
                    if (this.activeDateFormat === 'U')
                        arg = date_utils_1.DateUtils.toUtcTime(arg);
                    argString = this.dateFormatter.format(arg);
                }
                else {
                    argString = String(arg);
                    if (spec.format !== '' && argString.length > 0) {
                        var num = Number(argString.replace(',', '.'));
                        if (!isNaN(num))
                            argString = this.numberFormatter.format(spec.format, num);
                    }
                }
                var padLen = spec.width - argString.length;
                if (padLen > 0) {
                    if (spec.left)
                        bag.push(argString);
                    for (var i = 0; i < padLen; i++)
                        bag.push(' ');
                    if (!spec.left)
                        bag.push(argString);
                }
                else
                    bag.push(argString);
                savedPos = pos;
            }
            else if (ch === '}' && pos < pattern.length && pattern.charAt(pos) === '}') {
                bag.push(pattern.substr(savedPos, pos - savedPos - 1));
                savedPos = pos;
                pos++;
            }
            else if (ch === '}')
                return '';
        }
        if (savedPos < pattern.length)
            bag.push(pattern.substr(savedPos));
        return bag.join('');
    };
    StringFormatter.prototype.parseSpec = function (format, pos) {
        var result = {
            index: -1,
            left: false,
            width: 0,
            format: '',
            pos: 0
        };
        var savedPos;
        var ch;
        savedPos = pos;
        while (true) {
            ch = format.charAt(pos);
            if (ch < '0' || ch > '9')
                break;
            pos++;
        }
        if (pos > savedPos)
            result.index = Number(format.substr(savedPos, pos - savedPos));
        if (format.charAt(pos) === ',') {
            pos++;
            while (true) {
                ch = format.charAt(pos);
                if (ch !== ' ' && ch !== '\t')
                    break;
                pos++;
            }
            result.left = format.charAt(pos) === '-';
            if (result.left)
                pos++;
            savedPos = pos;
            while (true) {
                ch = format.charAt(pos);
                if (ch < '0' || ch > '9')
                    break;
                pos++;
            }
            if (pos > savedPos)
                result.width = Number(format.substr(savedPos, pos - savedPos));
        }
        if (format.charAt(pos) === ':') {
            pos++;
            savedPos = pos;
            while (format.charAt(pos) !== '}')
                pos++;
            result.format = format.substr(savedPos, pos - savedPos);
        }
        pos++;
        result.pos = pos;
        return result;
    };
    return StringFormatter;
}());
exports.StringFormatter = StringFormatter;
