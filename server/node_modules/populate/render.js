module.exports = Render

var Hash = require("./hash")
var Multiple = require("./multiple")
var Property = require("./property")

function Render(mapping) {
    if (Array.isArray(mapping)) {
        return Multiple(mapping)
    } else if (typeof mapping === "object" && mapping !== null) {
        return Hash(mapping)
    } else if (typeof mapping === "string") {
        return Property(mapping)
    } else if (typeof mapping === "function") {
        return mapping
    } else {
        throw new Error("populate/render: mapping should be something")
    }
}
