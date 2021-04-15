var inspect = require("util").inspect
var console = require("console")
var union = require("interset/union")

var Render = require("./render")

module.exports = Hash

function Hash(mapping) {
    if (!isObject(mapping)) {
        throw new Error("populate/hash: mapping should be an object")
    }

    var definition = Object.keys(mapping).
        reduce(function (acc, key) {
            acc[key] = Render(mapping[key])
            return acc
        }, {})

    return render

    function render(data, elements) {
        if (!isObject(data)) {
            console.warn("render(data, elements)", data, elements)
            throw new Error("populate/hash: render(data, elements)" +
                " needs data to render")
        }

        if (!isObject(elements)) {
            console.warn("render(data, elements)", data, elements)
            throw new Error("populate/hash: render(data, elements)" +
                " needs elements to render")
        }

        // var keys = union(Object.keys(data), Object.keys(elements))
        var keys = Object.keys(data)

        keys.forEach(function (key) {
            var value = data[key]
            var elem = elements[key]
            var render = definition[key]

            if (!render) {
                return
            }

            render(value, elem, elements)
        })
    }
}

function isObject(x) {
    return typeof x === "object" && x !== null
}
