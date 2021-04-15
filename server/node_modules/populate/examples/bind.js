var bind = require("../bind")
var html = require("unpack-html")
var document = require("global/document")
var fold = require("reducers/fold")

var template = require("./templates/bind.html")
var elements = html(template)

fold(bind(elements, {
    text: "some (binding) text goes in span!"
    , link: "http://google.com"
}))

document.body.appendChild(elements.root)
