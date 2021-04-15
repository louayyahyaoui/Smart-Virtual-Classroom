# populate

[![dependency status][3]][4]

[![browser support][5]][6]

Populate DOM elements with data

Populate has two APIs you can use. Either the `Schema` api or the
`bind` API. The `Schema` api allows you define a schema representation
of how you will populate a group of DOM elements with data.

The `bind` API allows you to embed the `Schema` into the DOM as
`data-bind` attributes and uses the `Schema` API internally

## Schema example

The idea is that you take a pair of data and DOM elements and
    apply a mapping from the data onto the DOM.

```html
<div id="my-template">
    <span data-marker="text"></span>
    <a data-marker="link"> some link! </a>
</div>
```

```js
var Schema = require("populate/render")
var unpack = require("unpack-element")

var populate = Schema({
    text: "textContent"
    , link: "href"
})

var elements = unpack(document.getElementById("my-template").cloneNode(true))

populate({
    text: "some text goes in span!"
    , link: "http://google.com"
}, elements)

document.body.appendChild(elements.root)
```

The above mapping placed the link into the `<a>`'s href property
    and placed the text into the `<span>`'s textContent.

## bind example

The idea with bind is that you just bind data onto a root Element
and it will go and parse out all of the `data-bind` attributes

```html
<div id="my-template">
    <span data-bind="text"></span>
    <a data-bind="href:link"> some link! </a>
</div>
```

```js
var bind = require("populate/bind")

var rootElem = document.getElementById("my-template").cloneNode(true)

bind({
    text: "some text goes in span!"
    , link: "http://google.com"
}, elements)

document.body.appendChild(rootElem)
```

## Complex Example

The format of an object of elements allows you to populate
    multiple elements from a single object of data.

It also works cleanly with the result of [`unpack-html`][1].
    However using [`unpack-html`][1] is completely optional.
    Feel free to get references to your DOM elements however
    you want!

```html
<!-- ./template.html -->
<div>
    <div data-bind="someText"></div>
    <div>
        <a data-bind="href:someLink, text:someText"></a>
    </div>
    <div>
        <textarea data-bind="value:nested.value"></textarea>
    </div>
    <ul data-marker="name">
        <li>I'm a nested template or something</li>
    </ul>
</div>
```

```js
var html = require("unpack-html")
var bind = require("populate/bind")

var template = require("./template.html")

// Generate an object of DOM element references to populate
// You can use something other then unpack-html!
var elements = html(template)
var data = {
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
}

bind(data, elements, {
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
})

document.body.appendChild(elements.root)
```

## Advantages

 - uses functions and recursions so is both modular and
    composable
 - optionally use data binding in your template
 - Works nicely with reducibles

## Installation

`npm install populate`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://github.com/Raynos/unpack-html
  [3]: http://david-dm.org/Colingo/populate.png
  [4]: http://david-dm.org/Colingo/populate
  [5]: http://ci.testling.com/Colingo/populate.png
  [6]: http://ci.testling.com/Colingo/populate
