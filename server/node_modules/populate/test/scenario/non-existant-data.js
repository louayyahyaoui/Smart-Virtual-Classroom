// populate should not 'unrender' data when it's called multiple
// times with data that misses properties

var test = require("tape")
var html = require("unpack-html")

var bind = require("../../bind")

var template = "\
    <div>\
        <div data-bind='one'></div>\
        <div data-bind='two'></div>\
        <div data-bind='three.four'></div>\
        <div data-bind='three.five.six'></div>\
    </div>\
    "

test("populate does the correct thing with partial data"
    , function (assert) {
        var elem = html(template).root

        bind({}, elem)

        assert.deepEqual(correctText(elem), {
            one: ""
            , two: ""
            , three: {
                four: ""
                , five: {
                    six: ""
                }
            }
        })

        bind({
            one: "one1"
            , two: "two1"
            , three: {}
        }, elem)

        assert.deepEqual(correctText(elem), {
            one: "one1"
            , two: "two1"
            , three: {
                four: ""
                , five: {
                    six: ""
                }
            }
        })

        bind({
            three: {
                four: "four1"
            }
        }, elem)

        assert.deepEqual(correctText(elem), {
            one: "one1"
            , two: "two1"
            , three: {
                four: "four1"
                , five: {
                    six: ""
                }
            }
        })

        bind({
            one: "one2"
            , three: {
                five: {
                    six: "six1"
                }
            }
        }, elem)

        assert.deepEqual(correctText(elem), {
            one: "one2"
            , two: "two1"
            , three: {
                four: "four1"
                , five: {
                    six: "six1"
                }
            }
        })

        assert.end()
    })

function correctText(elem) {
    var children = elem.children

    return {
        one: children[0].textContent
        , two: children[1].textContent
        , three: {
            four: children[2].textContent
            , five: {
                six: children[3].textContent
            }
        }
    }
}
