"use strinct";

module.exports = function (stringName, obj) {
    var ignoreLength;
    if (obj && obj.hasOwnProperty('ignoreLessThanLength')) {
        ignoreLength = obj.ignoreLessThanLength;
    }

    if (stringName) {
        var arrString = stringName.trim().split(' '),
            result = [];

        for (var i = 0; i < arrString.length; i++) {
            if (!(ignoreLength && arrString[i].length <= ignoreLength)) {
                var first = arrString[i];
                result.push(first[0].toUpperCase() + first.substring(1).toLowerCase());
            }
            else {
                result.push(arrString[i]);
            }
        }
        result = result.join(' ');
        return result.trim();
    }
    else {
        return '';
    }
};