var html = require("unpack-html")
var bind = require("../bind")
var document = require("global/document")
var fold = require("reducers/fold")

var template = require("./templates/complex.html")

// Generate an object of DOM element references to populate
// You can use something other then unpack-html!
var elements = html(template)

fold(bind(elements, {
    someText: "this is some text"
    , someLink: "http://google.com"
    , nested: {
        value: "you can render nested things"
    }
    , name: [
        "one"
        , "two"
        , "three"
    ]
}, {
    // Custom logic. Mappings are just functions, do anything
    // you want!
    name: function (value, elem) {
        var tmpl = elem.firstElementChild
        elem.removeChild(tmpl)

        value.forEach(function (text) {
            var clone = tmpl.cloneNode(true)
            clone.textContent = text
            elem.appendChild(clone)
        })
    }
}))

document.body.appendChild(elements.root)
