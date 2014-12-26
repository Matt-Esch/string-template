var test = require("tape")

var compile = require("../compile.js")

test("Named arguments are replaced", function (assert) {
    var template = compile("Hello {name}, how are you?")
    var result = template({ name: "Mark" })
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Named arguments at the start of strings are replaced",
    function (assert) {
        var template = compile("{likes} people have liked this")
        var result = template({
            likes: 123
        })

        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Named arguments at the end of string are replaced",
    function (assert) {
        var template = compile("Please respond by {date}")
        var result = template({
            date: "01/01/2015"
        })

        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple named arguments are replaced", function (assert) {
    var template = compile("Hello {name}, you have {emails} new messages")
    var result = template( {
        name: "Anna",
        emails: 5
    })

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing named arguments become 0 characters", function (assert) {
    var template = compile("Hello{name}, how are you?")
    var result = template({})
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Named arguments can be escaped", function (assert) {
    var template = compile("Hello {{name}}, how are you?")
    var result = template({ name: "Mark" })
    assert.equal(result, "Hello {name}, how are you?")
    assert.end()
})

test("Array arguments are replaced", function (assert) {
    var template = compile("Hello {0}, how are you?")
    var result = template(["Mark"])
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Array arguments at the start of strings are replaced",
    function (assert) {
        var template = compile("{0} people have liked this")
        var result = template([123])
        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Array arguments at the end of string are replaced",
    function (assert) {
        var template = compile("Please respond by {0}")
        var result = template(["01/01/2015"])
        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple array arguments are replaced", function (assert) {
    var template = compile("Hello {0}, you have {1} new messages")
    var result = template([
        "Anna",
        5
    ])

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing array arguments become 0 characters", function (assert) {
    var template = compile("Hello{0}, how are you?")
    var result = template([])
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Array arguments can be escaped", function (assert) {
    var template = compile("Hello {{0}}, how are you?")
    var result = template(["Mark"])
    assert.equal(result, "Hello {0}, how are you?")
    assert.end()
})

test("Array keys are not accessible", function (assert) {
    var template = compile("Function{splice}")
    var result = template([])
    assert.equal(result, "Function")
    assert.end()
})

test("Listed arguments are replaced", function (assert) {
    var template = compile("Hello {0}, how are you?")
    var result = template("Mark")
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Listed arguments at the start of strings are replaced",
    function (assert) {
        var template = compile("{0} people have liked this")
        var result = template(123)
        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Listed arguments at the end of string are replaced",
    function (assert) {
        var template = compile("Please respond by {0}")
        var result = template("01/01/2015")
        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple listed arguments are replaced", function (assert) {
    var template = compile("Hello {0}, you have {1} new messages")
    var result = template("Anna", 5)
    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing listed arguments become 0 characters", function (assert) {
    var template = compile("Hello{1}, how are you?")
    var result = template("no")
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Listed arguments can be escaped", function (assert) {
    var template = compile("Hello {{0}}, how are you?")
    var result = template("Mark")
    assert.equal(result, "Hello {0}, how are you?")
    assert.end()
})

test("Allow null data", function (assert) {
    var template = compile("Hello{0}")
    var result = template(null)
    assert.equal(result, "Hello")
    assert.end()
})

test("Allow undefined data", function (assert) {
    var template = compile("Hello{0}")
    var result1 = template()
    var result2 = template(undefined)
    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.end()
})

test("Null keys become 0 characters", function (assert) {
    var template1 = compile("Hello{name}")
    var result1 = template1({ name: null })

    var template2 = compile("Hello{0}")
    var result2 = template2([null])

    var template3 = compile("Hello{0}{1}{2}")
    var result3 = template3(null, null, null)

    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.equal(result3, "Hello")
    assert.end()
})

test("Undefined keys become 0 characters", function (assert) {
    var template1 = compile("Hello{firstName}{lastName}")
    var result1 = template1({ name: undefined })

    var template2 = compile("Hello{0}{1}")
    var result2 = template2([undefined])

    var template3 = compile("Hello{0}{1}{2}")
    var result3 = template3(undefined, undefined)

    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.equal(result3, "Hello")
    assert.end()
})

test("Works across multline strings", function (assert) {
    var template1 = compile("{zero}\n{one}\n{two}")
    var result1 = template1({
        zero: "A",
        one: "B",
        two: "C"
    })

    var template2 = compile("{0}\n{1}\n{2}")
    var result2 = template2(["A", "B", "C"])

    var template3 = compile("{0}\n{1}\n{2}")
    var result3 = template3("A", "B", "C")

    assert.equal(result1, "A\nB\nC")
    assert.equal(result2, "A\nB\nC")
    assert.equal(result3, "A\nB\nC")
    assert.end()
})

test("Allow multiple references", function (assert) {
    var template1 = compile("{a}{b}{c}\n{a}{b}{c}\n{a}{b}{c}")
    var result1 = template1({
        a: "one",
        b: "two",
        c: "three"
    })

    var template2 = compile("{0}{1}{2}\n{0}{1}{2}\n{0}{1}{2}")
    var result2 = template2([
        "one",
        "two",
        "three"
    ])

    var template3 = compile("{0}{1}{2}\n{0}{1}{2}\n{0}{1}{2}")
    var result3 = template3(
        "one",
        "two",
        "three")

    assert.equal(result1, "onetwothree\nonetwothree\nonetwothree")
    assert.equal(result2, "onetwothree\nonetwothree\nonetwothree")
    assert.equal(result3, "onetwothree\nonetwothree\nonetwothree")
    assert.end()
})

test("Attach strings to variables in template (with object)", function (assert) {
    var template1 = compile("Hello{[, ]name}!")
    var result1 = template1({
        name: "Mark"
    })

    var template2 = compile("Hello, {name[ San]}!")
    var result2 = template2({
        name: "Mark"
    })

    var template3 = compile("Hello{[, my name is ]name[ and I like JavaScript]}!")
    var result3 = template3({
        name: "Mark"
    })

    var template4 = compile("Hello{[, ]name}!")
    var result4 = template4({
        someotherkey: "Mark"
    })

    assert.equal(result1, "Hello, Mark!")
    assert.equal(result2, "Hello, Mark San!")
    assert.equal(result3, "Hello, my name is Mark and I like JavaScript!")
    assert.equal(result4, "Hello!")
    assert.end()
})

test("Attach strings to variables in template (with array)", function (assert) {
    var template1 = compile("Hello{[, ]0}!")
    var result1 = template1(["Mark"])

    var template2 = compile("Hello, {0[ San]}!")
    var result2 = template2(["Mark"])

    var template3 = compile("Hello{[, my name is ]0[ and I like JavaScript]}!")
    var result3 = template3(["Mark"])

    var template4 = compile("Hello{[, ]0}!")
    var result4 = template4([])

    assert.equal(result1, "Hello, Mark!")
    assert.equal(result2, "Hello, Mark San!")
    assert.equal(result3, "Hello, my name is Mark and I like JavaScript!")
    assert.equal(result4, "Hello!")
    assert.end()
})

test("Attach strings to variables in template (with list of arguments)", function (assert) {
    var template1 = compile("Hello{[, ]0}!")
    var result1 = template1("Mark")

    var template2 = compile("Hello, {0[ San]}!")
    var result2 = template2("Mark")

    var template3 = compile("Hello{[, my name is ]0[ and I like JavaScript]}!")
    var result3 = template3("Mark")

    var template4 = compile("Hello{[, ]0}!")
    var result4 = template4()

    assert.equal(result1, "Hello, Mark!")
    assert.equal(result2, "Hello, Mark San!")
    assert.equal(result3, "Hello, my name is Mark and I like JavaScript!")
    assert.equal(result4, "Hello!")
    assert.end()
})

test("Attach strings to multiple mixed variables in a template", function (assert) {
    var template1 = compile("Hello{[, ]name}! You have {msgCount} new messages.{[ There are ]issueCount[ new issues.]}")
    var result1 = template1({
        name: "Mark",
        msgCount: 3,
        issueCount: 7
    })
    assert.equal(result1, "Hello, Mark! You have 3 new messages. There are 7 new issues.")
    assert.end()
})

test("Allow square brackets inside an attached string", function (assert) {
    var template1 = compile("Hello{[, [ ]]0}!")
    var result1 = template1("Mark")
    assert.equal(result1, "Hello, [ ]Mark!")
    assert.end()
})
