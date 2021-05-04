"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberFormatter = (function () {
    function NumberFormatter(options) {
        this.positive = true;
        this.digits = [];
        this.pointPos = 0;
        this.spec = '';
        this.prec = -1;
        this.upper = true;
        this.custom = false;
        this.options = options;
    }
    NumberFormatter.prototype.format = function (format, value) {
        if (isNaN(value))
            return this.options.numNan;
        if (!isFinite(value)) {
            return value > 0 ?
                this.options.numPosInf :
                this.options.numNegInf;
        }
        this.fillFormatInfo(format);
        if (this.spec === 'X')
            return this.formatHex(value);
        this.fillDigitInfo(value);
        switch (this.spec) {
            case 'C':
                return this.formatCurrency();
            case 'D':
                return this.formatDecimal();
            case 'E':
                return this.formatExp();
            case 'F':
                return this.formatFixed();
            case 'G':
                return this.formatGeneral();
            case 'N':
                return this.formatNumber();
            case 'P':
                return this.formatPercent();
            default:
                if (this.custom)
                    return this.formatCustom(format);
                return '?';
        }
    };
    NumberFormatter.prototype.formatCurrency = function () {
        if (this.prec < 0)
            this.prec = this.options.currPrec;
        this.round(this.prec);
        var bag = [];
        if (this.positive) {
            switch (this.options.currPosPattern) {
                case 0:
                    bag.push(this.options.currency);
                    break;
                case 2:
                    bag.push(this.options.currency, ' ');
                    break;
            }
        }
        else {
            switch (this.options.currNegPattern) {
                case 0:
                    bag.push('(', this.options.currency);
                    break;
                case 1:
                    bag.push('-', this.options.currency);
                    break;
                case 2:
                    bag.push(this.options.currency, '-');
                    break;
                case 3:
                    bag.push(this.options.currency);
                    break;
                case 4:
                    bag.push('(');
                    break;
                case 5:
                case 8:
                    bag.push('-');
                    break;
                case 9:
                    bag.push('-', this.options.currency, ' ');
                    break;
                case 11:
                    bag.push(this.options.currency, ' ');
                    break;
                case 12:
                    bag.push(this.options.currency, ' -');
                    break;
                case 14:
                    bag.push('(', this.options.currency, ' ');
                    break;
                case 15:
                    bag.push('(');
                    break;
            }
        }
        this.appendGroupedInteger(bag, this.options.currGroups, this.options.currGroupSeparator);
        if (this.prec > 0) {
            bag.push(this.options.currDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        if (this.positive) {
            switch (this.options.currPosPattern) {
                case 1:
                    bag.push(this.options.currency);
                    break;
                case 3:
                    bag.push(' ', this.options.currency);
                    break;
            }
        }
        else {
            switch (this.options.currNegPattern) {
                case 0:
                case 14:
                    bag.push(')');
                    break;
                case 3:
                    bag.push('-');
                    break;
                case 4:
                    bag.push(this.options.currency, ')');
                    break;
                case 5:
                    bag.push(this.options.currency);
                    break;
                case 6:
                    bag.push('-', this.options.currency);
                    break;
                case 7:
                    bag.push(this.options.currency, '-');
                    break;
                case 8:
                    bag.push(' ', this.options.currency);
                    break;
                case 10:
                    bag.push(' ', this.options.currency, '-');
                    break;
                case 11:
                    bag.push('-');
                    break;
                case 13:
                    bag.push('- ', this.options.currency);
                    break;
                case 15:
                    bag.push(' ', this.options.currency, ')');
                    break;
            }
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatDecimal = function () {
        if (this.prec < this.pointPos)
            this.prec = this.pointPos;
        if (this.prec < 1)
            return '0';
        var bag = [];
        if (!this.positive)
            bag.push('-');
        this.appendDigits(bag, this.pointPos - this.prec, this.pointPos);
        return bag.join('');
    };
    NumberFormatter.prototype.formatExp = function () {
        if (this.prec < 0)
            this.prec = 6;
        this.round(1 - this.pointPos + this.prec);
        return this.formatExpCore(3);
    };
    NumberFormatter.prototype.formatExpCore = function (minExpDigits) {
        var bag = [];
        if (!this.positive)
            bag.push('-');
        this.appendDigits(bag, 0, 1);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, 1, 1 + this.prec);
        }
        bag.push(this.upper ? 'E' : 'e');
        var order = this.pointPos - 1;
        if (order >= 0)
            bag.push('+');
        else {
            bag.push('-');
            order = -order;
        }
        var orderStr = String(order);
        for (var i = orderStr.length; i < minExpDigits; i++)
            bag.push(0);
        bag.push(orderStr);
        return bag.join('');
    };
    NumberFormatter.prototype.formatFixed = function () {
        if (this.prec < 0)
            this.prec = this.options.numPrec;
        this.round(this.prec);
        var bag = [];
        if (!this.positive)
            bag.push('-');
        if (this.pointPos < 1)
            bag.push(0);
        else
            this.appendDigits(bag, 0, this.pointPos);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatGeneral = function () {
        var hasFrac = this.pointPos < this.digits.length;
        var allowExp;
        if (this.prec < 0) {
            allowExp = hasFrac;
            this.prec = hasFrac ? 15 : 10;
        }
        else {
            allowExp = true;
            if (this.prec < 1)
                this.prec = hasFrac ? 15 : 10;
            this.round(this.prec - this.pointPos);
        }
        if (allowExp) {
            if (this.pointPos > this.prec || this.pointPos <= -4) {
                this.prec = this.digits.length - 1;
                return this.formatExpCore(2);
            }
        }
        this.prec = Math.min(this.prec, Math.max(1, this.digits.length)) - this.pointPos;
        return this.formatFixed();
    };
    NumberFormatter.prototype.formatNumber = function () {
        if (this.prec < 0)
            this.prec = this.options.numPrec;
        this.round(this.prec);
        var bag = [];
        if (!this.positive) {
            switch (this.options.numNegPattern) {
                case 0:
                    bag.push('(');
                    break;
                case 1:
                    bag.push('-');
                    break;
                case 2:
                    bag.push('- ');
                    break;
            }
        }
        this.appendGroupedInteger(bag, this.options.numGroups, this.options.numGroupSeparator);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        if (!this.positive) {
            switch (this.options.numNegPattern) {
                case 0:
                    bag.push(')');
                    break;
                case 3:
                    bag.push('-');
                    break;
                case 4:
                    bag.push(' -');
                    break;
            }
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatPercent = function () {
        if (this.prec < 0)
            this.prec = this.options.numPrec;
        if (this.digits.length > 0)
            this.pointPos += 2;
        this.round(this.prec);
        var bag = [];
        if (!this.positive)
            bag.push('-');
        if (this.options.percentPattern === 2)
            bag.push('%');
        this.appendGroupedInteger(bag, this.options.numGroups, this.options.numGroupSeparator);
        if (this.prec > 0) {
            bag.push(this.options.numDecimalPoint);
            this.appendDigits(bag, this.pointPos, this.pointPos + this.prec);
        }
        switch (this.options.percentPattern) {
            case 0:
                bag.push(' %');
                break;
            case 1:
                bag.push('%');
                break;
        }
        return bag.join('');
    };
    NumberFormatter.prototype.formatHex = function (value) {
        var result = value.toString(16);
        if (result.indexOf('(') > -1)
            return result;
        result = this.upper ? result.toUpperCase() : result.toLowerCase();
        if (this.prec <= result.length)
            return result;
        var bag = [];
        for (var i = result.length; i < this.prec; i++)
            bag.push(0);
        bag.push(result);
        return bag.join('');
    };
    NumberFormatter.prototype.formatCustom = function (format) {
        var sectionList = NumberFormatter.getCustomFormatSections(format);
        var section = this.selectCustomFormatSection(sectionList);
        if (section === '')
            return this.positive ? '' : '-';
        var info = NumberFormatter.parseCustomFormatSection(section);
        var lists = this.createCustomFormatLists(info);
        if (sectionList.length > 2 && section !== sectionList[2]) {
            var zero = lists.i.concat(lists.f).join('').split('0').join('') === '';
            if (zero) {
                section = sectionList[2];
                info = NumberFormatter.parseCustomFormatSection(section);
                lists = this.createCustomFormatLists(info);
            }
        }
        return this.formatCustomCore(section, info, lists);
    };
    NumberFormatter.getCustomFormatSections = function (format) {
        var sections = [];
        var escaping = false;
        var quote = '';
        var length = 0;
        var prevPos = 0;
        for (var i = 0; i < format.length; i++) {
            var ch = format.charAt(i);
            if (!escaping && quote === '' && ch === ';') {
                sections.push(format.substr(prevPos, length));
                length = 0;
                prevPos = i + 1;
                if (sections.length > 2)
                    break;
            }
            else {
                if (escaping)
                    escaping = false;
                else if (ch === quote)
                    quote = quote === '' ? ch : '';
                else if (ch === '\\')
                    escaping = true;
                else if (ch === '\'' || ch === '"')
                    quote = ch;
                ++length;
            }
        }
        if (length > 0)
            sections.push(format.substr(prevPos, length));
        if (sections.length < 1)
            sections.push(format);
        return sections;
    };
    NumberFormatter.prototype.selectCustomFormatSection = function (sections) {
        if (!this.positive && sections.length > 1 && sections[1] !== '') {
            this.positive = true;
            return sections[1];
        }
        if (this.digits.length < 1 && sections.length > 2 && sections[2] !== '')
            return sections[2];
        return sections[0];
    };
    NumberFormatter.createCustomFormatInfo = function () {
        return {
            pointPos: -1,
            grouping: false,
            exp: false,
            expShowPlus: false,
            percent: false,
            scaling: 0,
            intDigits: 0,
            fracDigits: 0,
            expDigits: 0,
            intSharps: 0,
            fracSharps: 0,
            expSharps: 0
        };
    };
    NumberFormatter.parseCustomFormatSection = function (section) {
        var quote = '';
        var area = 'i';
        var canParseIntSharps = true;
        var result = NumberFormatter.createCustomFormatInfo();
        var groupSeparators = 0;
        for (var i = 0; i < section.length; i++) {
            var ch = section.charAt(i);
            if (ch === quote) {
                quote = '';
                continue;
            }
            if (quote !== '')
                continue;
            if (area === 'e' && ch !== '0' && ch !== '#') {
                area = result.pointPos < 0 ? 'i' : 'f';
                i--;
                continue;
            }
            switch (ch) {
                case '\\':
                    i++;
                    continue;
                case '\'':
                case '"':
                    quote = ch;
                    continue;
                case '#':
                case '0':
                    if (ch === '#') {
                        switch (area) {
                            case 'i':
                                if (canParseIntSharps)
                                    result.intSharps++;
                                break;
                            case 'f':
                                result.fracSharps++;
                                break;
                            case 'e':
                                result.expSharps++;
                                break;
                        }
                    }
                    else {
                        canParseIntSharps = false;
                        switch (area) {
                            case 'f':
                                result.fracSharps = 0;
                                break;
                            case 'e':
                                result.expSharps = 0;
                                break;
                        }
                    }
                    switch (area) {
                        case 'i':
                            result.intDigits++;
                            if (groupSeparators > 0)
                                result.grouping = true;
                            groupSeparators = 0;
                            break;
                        case 'f':
                            result.fracDigits++;
                            break;
                        case 'e':
                            result.expDigits++;
                            break;
                    }
                    break;
                case 'e':
                case 'E':
                    if (result.exp)
                        break;
                    result.exp = true;
                    area = 'e';
                    if (i < section.length - 1) {
                        var next = section.charAt(1 + i);
                        if (next === '+' || next === '-') {
                            if (next === '+')
                                result.expShowPlus = true;
                            i++;
                        }
                        else if (next !== '0' && next !== '#') {
                            result.exp = false;
                            if (result.pointPos < 0)
                                area = 'i';
                        }
                    }
                    break;
                case '.':
                    area = 'f';
                    if (result.pointPos < 0)
                        result.pointPos = i;
                    break;
                case '%':
                    result.percent = true;
                    break;
                case ',':
                    if (area === 'i' && result.intDigits > 0)
                        groupSeparators++;
                    break;
                default:
                    break;
            }
        }
        if (result.expDigits < 1)
            result.exp = false;
        else
            result.intSharps = 0;
        if (result.fracDigits < 1)
            result.pointPos = -1;
        result.scaling = 3 * groupSeparators;
        return result;
    };
    NumberFormatter.prototype.createCustomFormatLists = function (info) {
        var intList = [];
        var fracList = [];
        var expList = [];
        if (this.digits.length > 0) {
            if (info.percent)
                this.pointPos += 2;
            this.pointPos -= info.scaling;
        }
        var expPositive = true;
        if (info.exp && (info.intDigits > 0 || info.fracDigits > 0)) {
            var diff = 0;
            if (this.digits.length > 0) {
                this.round(info.intDigits + info.fracDigits - this.pointPos);
                diff -= this.pointPos - info.intDigits;
                this.pointPos = info.intDigits;
            }
            expPositive = diff <= 0;
            expList = String(diff < 0 ? -diff : diff).split('');
        }
        else
            this.round(info.fracDigits);
        if (this.digits.length < 1 || this.pointPos < 1)
            intList = [0];
        else
            this.appendDigits(intList, 0, this.pointPos);
        this.appendDigits(fracList, this.pointPos, this.digits.length);
        if (info.exp) {
            while (intList.length < info.intDigits)
                intList.unshift(0);
            while (expList.length < info.expDigits - info.expSharps)
                expList.unshift(0);
            if (expPositive && info.expShowPlus)
                expList.unshift('+');
            else if (!expPositive)
                expList.unshift('-');
        }
        else {
            while (intList.length < info.intDigits - info.intSharps)
                intList.unshift(0);
            if (info.intSharps >= info.intDigits) {
                var zero = true;
                for (var i = 0; i < intList.length; i++) {
                    if (intList[i] !== 0) {
                        zero = false;
                        break;
                    }
                }
                if (zero)
                    intList = [];
            }
        }
        while (fracList.length < info.fracDigits - info.fracSharps)
            fracList.push(0);
        return {
            i: intList,
            f: fracList,
            e: expList
        };
    };
    NumberFormatter.prototype.formatCustomCore = function (section, info, lists) {
        var intLen = 0;
        var total = 0;
        var groupIndex = 0;
        var counter = 0;
        var groupSize = 0;
        if (info.grouping && this.options.numGroups.length > 0) {
            intLen = lists.i.length;
            for (var i = 0; i < this.options.numGroups.length; i++) {
                if (total + this.options.numGroups[i] <= intLen) {
                    total += this.options.numGroups[i];
                    groupIndex = i;
                }
            }
            groupSize = this.options.numGroups[groupIndex];
            var fraction = intLen > total ? intLen - total : 0;
            if (groupSize === 0) {
                while (groupIndex >= 0 && this.options.numGroups[groupIndex] === 0)
                    groupIndex--;
                groupSize = fraction > 0 ? fraction : this.options.numGroups[groupIndex];
            }
            if (fraction === 0)
                counter = groupSize;
            else {
                groupIndex += Math.floor(fraction / groupSize);
                counter = fraction % groupSize;
                if (counter === 0)
                    counter = groupSize;
                else
                    groupIndex++;
            }
        }
        else
            info.grouping = false;
        var bag = [];
        var area = 'i';
        var intSharps = 0;
        var intListIndex = 0;
        var fracListIndex = 0;
        var savedCh = '';
        for (var i = 0; i < section.length; i++) {
            var ch = section.charAt(i);
            if (ch === savedCh) {
                savedCh = '';
                continue;
            }
            if (savedCh !== '') {
                bag.push(ch);
                continue;
            }
            switch (ch) {
                case '\\':
                    ++i;
                    if (i < section.length)
                        bag.push(section.charAt(i));
                    continue;
                case '\'':
                case '"':
                    savedCh = ch;
                    continue;
                case '#':
                case '0':
                    if (area === 'i') {
                        intSharps++;
                        if (ch === '0' || info.intDigits - intSharps < lists.i.length + intListIndex) {
                            while (info.intDigits - intSharps + intListIndex < lists.i.length) {
                                bag.push(lists.i[intListIndex].toString());
                                intListIndex++;
                                if (info.grouping && --intLen > 0 && --counter === 0) {
                                    bag.push(this.options.numGroupSeparator);
                                    if (--groupIndex < this.options.numGroups.length && groupIndex >= 0)
                                        groupSize = this.options.numGroups[groupIndex];
                                    counter = groupSize;
                                }
                            }
                        }
                    }
                    else if (area === 'f') {
                        if (fracListIndex < lists.f.length) {
                            bag.push(lists.f[fracListIndex].toString());
                            fracListIndex++;
                        }
                    }
                    break;
                case 'e':
                case 'E': {
                    if (lists.e == null || !info.exp) {
                        bag.push(ch);
                        break;
                    }
                    var q = i + 1;
                    for (; q < section.length; q++) {
                        if (q === i + 1 && (section.charAt(q) === '+' || section.charAt(q) === '-'))
                            continue;
                        if (section.charAt(q) === '0' || section.charAt(q) === '#')
                            continue;
                        break;
                    }
                    i = q - 1;
                    area = info.pointPos < 0 ? 'i' : 'f';
                    bag.push(ch);
                    bag = bag.concat(lists.e);
                    lists.e = null;
                    break;
                }
                case '.':
                    if (info.pointPos === i && lists.f.length > 0)
                        bag.push(this.options.numDecimalPoint);
                    area = 'f';
                    break;
                case ',':
                    break;
                default:
                    bag.push(ch);
                    break;
            }
        }
        if (!this.positive)
            bag.unshift('-');
        return bag.join('');
    };
    NumberFormatter.prototype.fillDigitInfo = function (value) {
        this.positive = true;
        if (value < 0) {
            value = -value;
            this.positive = false;
        }
        this.digits = [];
        this.pointPos = 0;
        if (value === 0 || !isFinite(value) || isNaN(value)) {
            this.pointPos = 1;
            return;
        }
        var list = String(value).split('e');
        var str = list[0];
        if (list.length > 1)
            this.pointPos = Number(list[1]);
        var frac = false;
        var decimalCount = 0;
        for (var i = 0; i < str.length; i++) {
            var ch = str.charAt(i);
            if (ch === '.')
                frac = true;
            else {
                if (frac)
                    decimalCount++;
                if (ch !== '0' || this.digits.length > 0)
                    this.digits.push(Number(ch));
            }
        }
        this.pointPos += this.digits.length - decimalCount;
    };
    NumberFormatter.prototype.fillFormatInfo = function (format) {
        this.upper = true;
        this.custom = false;
        this.prec = -1;
        var spec;
        if (format == null || format.length < 1)
            spec = 'G';
        else
            spec = format.charAt(0);
        if (spec >= 'a' && spec <= 'z') {
            spec = spec.toUpperCase();
            this.upper = false;
        }
        if (spec >= 'A' && spec <= 'Z') {
            if (format != null && format.length > 1) {
                var prec = Number(format.substr(1));
                if (!isNaN(prec))
                    this.prec = prec;
                else
                    this.custom = true;
            }
        }
        else
            this.custom = true;
        this.spec = this.custom ? '0' : spec;
    };
    NumberFormatter.prototype.round = function (shift) {
        var amount = this.digits.length - this.pointPos - shift;
        if (amount <= 0)
            return;
        var cutPos = this.pointPos + shift;
        if (cutPos < 0) {
            this.digits = [];
            this.pointPos = 0;
            return;
        }
        var digit = this.digits[cutPos];
        if (digit > 4) {
            for (var i = 0; i < amount; i++) {
                var index = cutPos - 1 - i;
                if (index < 0) {
                    this.digits.unshift(0);
                    this.pointPos++;
                    cutPos++;
                    index++;
                }
                digit = this.digits[index];
                if (digit < 9) {
                    this.digits[index] = 1 + digit;
                    break;
                }
                else {
                    this.digits[index] = 0;
                    amount++;
                }
            }
        }
        for (var i = cutPos - 1; i >= 0; i--) {
            if (this.digits[i] > 0)
                break;
            cutPos--;
        }
        this.digits.splice(cutPos, this.digits.length - cutPos);
    };
    NumberFormatter.prototype.appendGroupedInteger = function (list, groups, separator) {
        if (this.pointPos < 1) {
            list.push(0);
            return;
        }
        var total = 0;
        var groupIndex = 0;
        for (var i = 0; i < groups.length; i++) {
            if (total + groups[i] <= this.pointPos) {
                total += groups[i];
                groupIndex = i;
            }
            else
                break;
        }
        if (groups.length > 0 && total > 0) {
            var counter = void 0;
            var groupSize = groups[groupIndex];
            var fraction = this.pointPos > total ? this.pointPos - total : 0;
            if (groupSize === 0) {
                while (groupIndex >= 0 && groups[groupIndex] === 0)
                    groupIndex--;
                groupSize = fraction > 0 ? fraction : groups[groupIndex];
            }
            if (fraction === 0)
                counter = groupSize;
            else {
                groupIndex += Math.floor(fraction / groupSize);
                counter = fraction % groupSize;
                if (counter === 0)
                    counter = groupSize;
                else
                    groupIndex++;
            }
            var i = 0;
            while (true) {
                if (this.pointPos - i <= counter || counter === 0) {
                    this.appendDigits(list, i, this.pointPos);
                    break;
                }
                this.appendDigits(list, i, i + counter);
                list.push(separator);
                i += counter;
                groupIndex--;
                if (groupIndex < groups.length && groupIndex >= 0)
                    groupSize = groups[groupIndex];
                counter = groupSize;
            }
        }
        else
            this.appendDigits(list, 0, this.pointPos);
    };
    NumberFormatter.prototype.appendDigits = function (list, start, end) {
        for (var i = start; i < end; i++) {
            if (i < 0 || i >= this.digits.length)
                list.push(0);
            else
                list.push(this.digits[i]);
        }
    };
    return NumberFormatter;
}());
exports.NumberFormatter = NumberFormatter;
