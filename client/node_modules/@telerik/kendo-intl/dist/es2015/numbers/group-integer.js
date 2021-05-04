export default function groupInteger(number, start, end, options, info) {
    const symbols = info.numbers.symbols;
    const decimalIndex = number.indexOf(symbols.decimal);
    const groupSizes = options.groupSize.slice();
    let groupSize = groupSizes.shift();

    let integerEnd = decimalIndex !== -1 ? decimalIndex : end + 1;

    let integer = number.substring(start, integerEnd);
    let result = number;
    const integerLength = integer.length;

    if (integerLength >= groupSize) {
        let idx = integerLength;
        let parts = [];

        while (idx > -1) {
            let value = integer.substring(idx - groupSize, idx);
            if (value) {
                parts.push(value);
            }
            idx -= groupSize;
            let newGroupSize = groupSizes.shift();
            groupSize = newGroupSize !== undefined ? newGroupSize : groupSize;

            if (groupSize === 0) {
                value = integer.substring(0, idx);
                if (value) {
                    parts.push(value);
                }
                break;
            }
        }

        integer = parts.reverse().join(symbols.group);
        result = number.substring(0, start) + integer + number.substring(integerEnd);
    }

    return result;
}