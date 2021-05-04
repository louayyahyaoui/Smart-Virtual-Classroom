"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var DateTimeFieldFormatter = (function () {
    function DateTimeFieldFormatter(options) {
        this.AMPMKeyword = 'am/pm';
        this.options = options;
    }
    DateTimeFieldFormatter.prototype.format = function (date, formatString) {
        this.date = date;
        this.formatString = formatString;
        this.result = '';
        var index = 0;
        var formatLength = this.formatString.length;
        while (index < formatLength)
            index += this.formatNext(index);
        return this.result;
    };
    DateTimeFieldFormatter.prototype.formatNext = function (index) {
        var ch = this.formatString[index];
        var formattingItem = this.tryCreateFormattingItem(ch);
        if (formattingItem)
            return this.processAsFormattingItem(index, formattingItem);
        if (this.isKeyword(this.AMPMKeyword, index))
            return this.processAsAMPMKeyword();
        if (ch === '\'')
            return this.processAsEmbedText(index);
        return this.processAsSingleCharacter(index);
    };
    DateTimeFieldFormatter.prototype.isKeyword = function (keyword, index) {
        if (keyword.length > (this.formatString.length - index))
            return false;
        var substring = this.formatString.substr(index, keyword.length);
        return keyword.toLowerCase() === substring.toLowerCase();
    };
    DateTimeFieldFormatter.prototype.processAsAMPMKeyword = function () {
        var result = (this.date.getHours() - 12) >= 0 ? this.options.pm : this.options.am;
        this.result += result;
        return this.AMPMKeyword.length;
    };
    DateTimeFieldFormatter.prototype.processAsEmbedText = function (index) {
        var startTextIndex = index + 1;
        if (startTextIndex >= (this.formatString.length - 1))
            return 1;
        var textLength = this.getCharacterSequenceLength(this.formatString[index], startTextIndex, this.charsAreNotEqual);
        if ((textLength + startTextIndex) === this.formatString.length) {
            this.result += '\'';
            return 1;
        }
        this.result += this.formatString.substr(startTextIndex, textLength);
        return textLength + 2;
    };
    DateTimeFieldFormatter.prototype.processAsSingleCharacter = function (index) {
        this.result += this.formatString[index];
        return 1;
    };
    DateTimeFieldFormatter.prototype.processAsFormattingItem = function (index, formattingItem) {
        var sequenceLength = this.getCharacterSequenceLength(this.formatString[index], index, this.charsAreEqual);
        var patternLength = formattingItem.getAvailablePatternLength(sequenceLength);
        var result = formattingItem.format(this.date, patternLength);
        this.result += result;
        return Math.min(sequenceLength, patternLength);
    };
    DateTimeFieldFormatter.prototype.getCharacterSequenceLength = function (ch, index, predicate) {
        var length = this.formatString.length;
        var nextCharIndex = index + 1;
        while (nextCharIndex < length && predicate(ch, this.formatString[nextCharIndex]))
            nextCharIndex++;
        return nextCharIndex - index;
    };
    DateTimeFieldFormatter.prototype.tryCreateFormattingItem = function (formattingChar) {
        switch (formattingChar) {
            case 'h':
                return new Hour12FormattingItem(this.options);
            case 'H':
                return new Hour24FormattingItem(this.options);
            case 'm':
                return new MinuteFormattingItem(this.options);
            case 'S':
            case 's':
                return new SecondFormattingItem(this.options);
            case 'Y':
            case 'y':
                return new YearFormattingItem(this.options);
            case 'M':
                return new MonthFormattingItem(this.options);
            case 'D':
            case 'd':
                return new DayFormattingItem(this.options);
        }
        return null;
    };
    DateTimeFieldFormatter.prototype.charsAreEqual = function (ch1, ch2) {
        return ch1 === ch2;
    };
    DateTimeFieldFormatter.prototype.charsAreNotEqual = function (ch1, ch2) {
        return ch1 !== ch2;
    };
    return DateTimeFieldFormatter;
}());
exports.DateTimeFieldFormatter = DateTimeFieldFormatter;
var DateTimeFormattingItem = (function () {
    function DateTimeFormattingItem(options) {
        this.options = options;
    }
    DateTimeFormattingItem.prototype.getAvailablePatternLength = function (patternLength) {
        var count = this.patternsLength.length;
        for (var i = 0; i < count; i++) {
            if (this.patternsLength[i] >= patternLength)
                return this.patternsLength[i];
        }
        return this.patternsLength[count - 1];
    };
    return DateTimeFormattingItem;
}());
var NumericFormattingItem = (function (_super) {
    tslib_1.__extends(NumericFormattingItem, _super);
    function NumericFormattingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patternsLength = [1, 2];
        return _this;
    }
    NumericFormattingItem.prototype.formatCore = function (value, patternLength) {
        var result = '' + value;
        if (patternLength === 2 && result.length === 1)
            return '0' + result;
        return result;
    };
    return NumericFormattingItem;
}(DateTimeFormattingItem));
var CombinedFormattingItem = (function (_super) {
    tslib_1.__extends(CombinedFormattingItem, _super);
    function CombinedFormattingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patternsLength = [1, 2, 3, 4];
        return _this;
    }
    CombinedFormattingItem.prototype.format = function (date, patternLength) {
        if (patternLength <= 2)
            return this.formatCore(this.getNumericValue(date), patternLength);
        if (patternLength === 3)
            return this.getAbbreviatedName(date);
        return this.getFullName(date);
    };
    return CombinedFormattingItem;
}(NumericFormattingItem));
var Hour24FormattingItem = (function (_super) {
    tslib_1.__extends(Hour24FormattingItem, _super);
    function Hour24FormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hour24FormattingItem.prototype.format = function (date, patternLength) {
        return this.formatCore(date.getHours(), patternLength);
    };
    return Hour24FormattingItem;
}(NumericFormattingItem));
var Hour12FormattingItem = (function (_super) {
    tslib_1.__extends(Hour12FormattingItem, _super);
    function Hour12FormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hour12FormattingItem.prototype.format = function (date, patternLength) {
        var hour = date.getHours() % 12;
        if (hour === 0)
            hour = 12;
        return this.formatCore(hour, patternLength);
    };
    return Hour12FormattingItem;
}(NumericFormattingItem));
var MinuteFormattingItem = (function (_super) {
    tslib_1.__extends(MinuteFormattingItem, _super);
    function MinuteFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinuteFormattingItem.prototype.format = function (date, patternLength) {
        return this.formatCore(date.getMinutes(), patternLength);
    };
    return MinuteFormattingItem;
}(NumericFormattingItem));
var SecondFormattingItem = (function (_super) {
    tslib_1.__extends(SecondFormattingItem, _super);
    function SecondFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecondFormattingItem.prototype.format = function (date, patternLength) {
        return this.formatCore(date.getSeconds(), patternLength);
    };
    return SecondFormattingItem;
}(NumericFormattingItem));
var DayFormattingItem = (function (_super) {
    tslib_1.__extends(DayFormattingItem, _super);
    function DayFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DayFormattingItem.prototype.getAbbreviatedName = function (date) {
        return this.options.abbrDayNames[this.getDayOfWeek(date)];
    };
    DayFormattingItem.prototype.getFullName = function (date) {
        return this.options.dayNames[this.getDayOfWeek(date)];
    };
    DayFormattingItem.prototype.getNumericValue = function (date) {
        return date.getDate();
    };
    DayFormattingItem.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    return DayFormattingItem;
}(CombinedFormattingItem));
var MonthFormattingItem = (function (_super) {
    tslib_1.__extends(MonthFormattingItem, _super);
    function MonthFormattingItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MonthFormattingItem.prototype.getAbbreviatedName = function (date) {
        return this.options.abbrMonthNames[date.getMonth()];
    };
    MonthFormattingItem.prototype.getFullName = function (date) {
        return this.options.monthNames[date.getMonth()];
    };
    MonthFormattingItem.prototype.getNumericValue = function (date) {
        return date.getMonth() + 1;
    };
    return MonthFormattingItem;
}(CombinedFormattingItem));
var YearFormattingItem = (function (_super) {
    tslib_1.__extends(YearFormattingItem, _super);
    function YearFormattingItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.patternsLength = [2, 4];
        return _this;
    }
    YearFormattingItem.prototype.format = function (date, patternLength) {
        var year = date.getFullYear();
        if (patternLength === 2 && year > 99) {
            var shortYear = year % 100;
            var result = '' + shortYear;
            if (result.length === 1)
                return '0' + result;
            return result;
        }
        return '' + year;
    };
    return YearFormattingItem;
}(DateTimeFormattingItem));
