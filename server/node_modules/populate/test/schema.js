var test = require("tape")
var html = require("unpack-html")

var simpleTemplate = require("./templates/simple")
var nestedTemplate = require("./templates/nested")
var Render = require("../render")
var property = require("../property")

test("schema is a function", function (assert) {
    assert.equal(typeof Render, "function")
    assert.equal(typeof Render({}), "function")
    assert.end()
})

test("can populate data onto schema", function (assert) {
    var schema = Render({
        "img": "src"
        , "h1": "text"
        , "span": "text"
    })

    var elements = html(simpleTemplate)
    schema({
        "img": "http://google.com/"
        , "h1": "two"
        , "span": "three"
    }, elements)

    assert.equal(elements.img.src, "http://google.com/")
    assert.equal(elements.h1.textContent, "two")
    assert.equal(elements.span.textContent, "three")
    assert.end()
})

test("can populate nested data onto schema", function (assert) {
    var schema = Render({
        message: "text"
        , author: {
            name: "text"
            , imageUri: "src"
        }
    })

    var elements = html(nestedTemplate)
    schema({
        message: "hello world"
        , author: {
            name: "Jake"
            , imageUri: "http://google.com/foobar"
        }
    }, elements)

    assert.equal(elements.message.textContent, "hello world")
    assert.equal(elements.author.name.textContent, "Jake")
    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.end()
})

test("can do comma seperated", function (assert) {
    var schema = Render({
        author: {
            imageUri: "src, title"
        }
    })

    var elements = html(nestedTemplate)
    schema({
        author: {
            imageUri: "http://google.com/"
        }
    }, elements)

    assert.equal(elements.author.imageUri.src, "http://google.com/")
    assert.equal(elements.author.imageUri.title, "http://google.com/")
    assert.end()
})

test("can do arrays", function (assert) {
    var schema = Render({
        author: {
            imageUri: [
                function (value, elem) {
                    elem.src = "http://google.com/" + value
                }
                , property("textContent", "name")
            ]
        }
    })

    var elements = html(nestedTemplate)
    schema({
        author: {
            imageUri: "foobar"
        }
    }, elements)

    assert.equal(elements.author.imageUri.src, "http://google.com/foobar")
    assert.equal(elements.author.name.textContent, "foobar")
    assert.end()
})
