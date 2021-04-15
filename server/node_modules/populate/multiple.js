var Render = require("./render")

module.exports = Multiple

function Multiple(arr) {
    if (!Array.isArray(arr)) {
        throw new Error("populate/multiple: arr should be an array")
    }

    arr = arr.map(Render)

    return render

    function render(value, elem, elements) {
        arr.forEach(function (f) {
            f(value, elem, elements)
        })
    }
}
