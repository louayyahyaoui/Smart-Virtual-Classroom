// populate should be able to render
// optional data

var test = require("tape")
var html = require("unpack-html")

var bind = require("../../bind")

var template = "\
    <div data-bind='foo.bar'></div>\
    "

test("populate can render optional data", function (assert) {
    var elements = html(template)
    bind({
        foo: {
            bar: "text"
        }
    }, elements)

    assert.equal(elements.root.textContent, "text")

    assert.end()
})

test("populate does not break when data is not present"
    , function (assert) {
        var elements = html(template)

        bind({
            bar: "this does not get rendered"
        }, elements)

        assert.ok(true)

        assert.end()
    })
