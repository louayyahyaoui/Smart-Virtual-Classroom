var extend = require("xtend")

module.exports = DeepMerge

function DeepMerge(merger) {
    return deepmerge

    function deepmerge(target, source, key) {
        if (Array.isArray(source) && Array.isArray(target)) {
            return merger(target, source, key)
        } else if (isObject(source) && isObject(target)) {
            var result = extend({}, target)
            Object.keys(source).forEach(merge)
            return result
        } else {
            return merger(target, source, key)
        }

        function merge(key) {
            var sourceValue = source[key]
            var targetValue = target[key]

            if (!(key in target)) {
                if (isObject(sourceValue)) {
                    result[key] = deepmerge({}, sourceValue, key)
                } else {
                    result[key] = sourceValue
                }
            } else {
                result[key] = deepmerge(targetValue, sourceValue, key)
            }
        }
    }
}

function isObject(x) {
    return typeof x === "object" && x !== null
}
