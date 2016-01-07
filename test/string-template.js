var test = require("tape")

var format = require("../index.js")

test("Named arguments are replaced", function (assert) {
    var result = format("Hello {name}, how are you?", { name: "Mark" })
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Named arguments at the start of strings are replaced",
    function (assert) {
        var result = format("{likes} people have liked this", {
            likes: 123
        })

        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Named arguments at the end of string are replaced",
    function (assert) {
        var result = format("Please respond by {date}", {
            date: "01/01/2015"
        })

        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple named arguments are replaced", function (assert) {
    var result = format("Hello {name}, you have {emails} new messages", {
        name: "Anna",
        emails: 5
    })

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing named arguments become 0 characters", function (assert) {
    var result = format("Hello{name}, how are you?", {})
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Named arguments can be escaped", function (assert) {
    var result = format("Hello {{name}}, how are you?", { name: "Mark" })
    assert.equal(result, "Hello {name}, how are you?")
    assert.end()
})

test("Array arguments are replaced", function (assert) {
    var result = format("Hello {0}, how are you?", ["Mark"])
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Array arguments at the start of strings are replaced",
    function (assert) {
        var result = format("{0} people have liked this", [123])

        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Array arguments at the end of string are replaced",
    function (assert) {
        var result = format("Please respond by {0}", ["01/01/2015"])

        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple array arguments are replaced", function (assert) {
    var result = format("Hello {0}, you have {1} new messages", [
        "Anna",
        5
    ])

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing array arguments become 0 characters", function (assert) {
    var result = format("Hello{0}, how are you?", [])
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Array arguments can be escaped", function (assert) {
    var result = format("Hello {{0}}, how are you?", ["Mark"])
    assert.equal(result, "Hello {0}, how are you?")
    assert.end()
})

test("Array keys are not accessible", function (assert) {
    var result = format("Function{splice}", [])
    assert.equal(result, "Function")
    assert.end()
})

test("Listed arguments are replaced", function (assert) {
    var result = format("Hello {0}, how are you?", "Mark")
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Listed arguments at the start of strings are replaced",
    function (assert) {
        var result = format("{0} people have liked this", 123)

        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Listed arguments at the end of string are replaced",
    function (assert) {
        var result = format("Please respond by {0}", "01/01/2015")

        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple listed arguments are replaced", function (assert) {
    var result = format("Hello {0}, you have {1} new messages",
        "Anna",
        5)

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing listed arguments become 0 characters", function (assert) {
    var result = format("Hello{1}, how are you?", "no")
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Listed arguments can be escaped", function (assert) {
    var result = format("Hello {{0}}, how are you?", "Mark")
    assert.equal(result, "Hello {0}, how are you?")
    assert.end()
})

test("Allow null data", function (assert) {
    var result = format("Hello{0}", null)
    assert.equal(result, "Hello")
    assert.end()
})

test("Allow undefined data", function (assert) {
    var result1 = format("Hello{0}")
    var result2 = format("Hello{0}", undefined)
    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.end()
})

test("Null keys become 0 characters", function (assert) {
    var result1 = format("Hello{name}", { name: null })
    var result2 = format("Hello{0}", [null])
    var result3 = format("Hello{0}{1}{2}", null, null, null)
    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.equal(result3, "Hello")
    assert.end()
})

test("Undefined keys become 0 characters", function (assert) {
    var result1 = format("Hello{firstName}{lastName}", { name: undefined })
    var result2 = format("Hello{0}{1}", [undefined])
    var result3 = format("Hello{0}{1}{2}", undefined, undefined)
    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.equal(result3, "Hello")
    assert.end()
})

test("Works across multline strings", function (assert) {
    var result1 = format("{zero}\n{one}\n{two}", {
        zero: "A",
        one: "B",
        two: "C"
    })
    var result2 = format("{0}\n{1}\n{2}", ["A", "B", "C"])
    var result3 = format("{0}\n{1}\n{2}", "A", "B", "C")
    assert.equal(result1, "A\nB\nC")
    assert.equal(result2, "A\nB\nC")
    assert.equal(result3, "A\nB\nC")
    assert.end()
})

test("Allow multiple references", function (assert) {
    var result1 = format("{a}{b}{c}\n{a}{b}{c}\n{a}{b}{c}", {
        a: "one",
        b: "two",
        c: "three"
    })
    var result2 = format("{0}{1}{2}\n{0}{1}{2}\n{0}{1}{2}", [
        "one",
        "two",
        "three"
    ])
    var result3 = format("{0}{1}{2}\n{0}{1}{2}\n{0}{1}{2}",
        "one",
        "two",
        "three")
    assert.equal(result1, "onetwothree\nonetwothree\nonetwothree")
    assert.equal(result2, "onetwothree\nonetwothree\nonetwothree")
    assert.equal(result3, "onetwothree\nonetwothree\nonetwothree")
    assert.end()
})

test("Template string without arguments", function (assert) {
    var result = format("Hello, how are you?")
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Template string with underscores", function (assert) {
    var result = format("Hello {FULL_NAME}, how are you?", {
        FULL_NAME: "James Bond"
    })
    assert.equal(result, "Hello James Bond, how are you?")
    assert.end()
})
