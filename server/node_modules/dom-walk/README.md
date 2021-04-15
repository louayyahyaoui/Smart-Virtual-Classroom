# dom-walk [![build status][1]][2]

iteratively walk a DOM node

## Example

``` js
var walk = require("dom-walk")

walk(document.body.childNodes, function (node) {
    console.log("node", node)
})
```

## Installation

`npm install dom-walk`

## Tests

`make test`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/dom-walk.png
  [2]: http://travis-ci.org/Raynos/dom-walk