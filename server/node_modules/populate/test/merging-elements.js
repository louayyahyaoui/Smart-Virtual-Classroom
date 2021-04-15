var test = require("tape")
var html = require("unpack-html")

var template = require("./templates/merging-bind")
var bind = require("../bind")

test("bind does not clobber elements", function (assert) {
    var elements = html(template)

    bind({
        value: 42
    }, elements)

    assert.equal(elements.value.tagName, "SPAN")
    assert.equal(elements._value.tagName, "DIV")

    assert.end()
})
