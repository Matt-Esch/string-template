
# string-template

  A simple string template function based on named or indexed arguments

## Example

```js
var format = require("string-template")
var greeting

// Format using an object hash with keys matching [0-9a-zA-Z]+

greeting = format("Hello {name}, you have have {count} unread messages", {
    name: "Robert",
    count: 12
})
// greeting -> "Hello Robert, you have 12 unread messages"


// Format using a number indexed array

greeting = format("Hello {0}, you have {1} unread messages", ["Robert", 12])
// greeting -> "Hello Robert, you have 12 unread messages"


// Format using optional arguments

greeting = format("Hello {0}, you have {1} unread messages",
     "Robert",
     12)
// greeting -> "Hello Robert, you have 12 unread messages"


// Escape {} pairs by using double {{}}

var text = format("{{0}}")
// text -> "{0}"

```

## Installation

`npm install string-template`

## Contributors

 - Matt-Esch

## MIT Licenced