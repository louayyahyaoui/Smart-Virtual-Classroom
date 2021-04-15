var get = require("dotty").get

module.exports = Property

function Property(property, name) {
    if (typeof property !== "string") {
        throw new Error("populate/property: property should be a string")
    }

    var properties = property.
        split(",").
        map(function (prop) {
            return prop === "text" ? "textContent" : prop
        }).
        map(function (prop) {
            return prop.trim()
        })

    return render

    function render(value, elem, elements) {
        if (name) {
            elem = get(elements, name)
        }

        elem && properties.forEach(function (prop) {
            elem[prop] = value
        })
    }
}
