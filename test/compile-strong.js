var test = require("tape")

var compile = require("../compile.js")

test("Named arguments are replaced", function (assert) {
    var template = compile("Hello {name}, how are you?", true)
    var result = template({ name: "Mark" })
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Named arguments at the start of strings are replaced",
    function (assert) {
        var template = compile("{likes} people have liked this", true)
        var result = template({
            likes: 123
        })

        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Named arguments at the end of string are replaced",
    function (assert) {
        var template = compile("Please respond by {date}", true)
        var result = template({
            date: "01/01/2015"
        })

        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple named arguments are replaced", function (assert) {
    var template = compile("Hello {name}, you have {emails} new messages", true)
    var result = template( {
        name: "Anna",
        emails: 5
    })

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing named arguments become 0 characters", function (assert) {
    var template = compile("Hello{name}, how are you?", true)
    var result = template({})
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Named arguments can be escaped", function (assert) {
    var template = compile("Hello {{name}}, how are you?", true)
    var result = template({ name: "Mark" })
    assert.equal(result, "Hello {name}, how are you?")
    assert.end()
})

test("Array arguments are replaced", function (assert) {
    var template = compile("Hello {0}, how are you?", true)
    var result = template(["Mark"])
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Array arguments at the start of strings are replaced",
    function (assert) {
        var template = compile("{0} people have liked this", true)
        var result = template([123])
        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Array arguments at the end of string are replaced",
    function (assert) {
        var template = compile("Please respond by {0}", true)
        var result = template(["01/01/2015"])
        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple array arguments are replaced", function (assert) {
    var template = compile("Hello {0}, you have {1} new messages", true)
    var result = template([
        "Anna",
        5
    ])

    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing array arguments become 0 characters", function (assert) {
    var template = compile("Hello{0}, how are you?", true)
    var result = template([])
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Array arguments can be escaped", function (assert) {
    var template = compile("Hello {{0}}, how are you?", true)
    var result = template(["Mark"])
    assert.equal(result, "Hello {0}, how are you?")
    assert.end()
})

test("Array keys are not accessible", function (assert) {
    var template = compile("Function{splice}", true)
    var result = template([])
    assert.equal(result, "Function")
    assert.end()
})

test("Listed arguments are replaced", function (assert) {
    var template = compile("Hello {0}, how are you?", true)
    var result = template("Mark")
    assert.equal(result, "Hello Mark, how are you?")
    assert.end()
})

test("Supports quotes", function (assert) {
    var template = compile("Hello \"{0}, how are you?", true)
    var result = template("Mark")
    assert.equal(result, "Hello \"Mark, how are you?")
    assert.end()
})

test("Supports \r", function (assert) {
    var template = compile("Hello \r{0}, how are you?", true)
    var result = template("Mark")
    assert.equal(result, "Hello \rMark, how are you?")
    assert.end()
})

test("Supports \u2028", function (assert) {
    var template = compile("Hello \u2028{0}, how are you?", true)
    var result = template("Mark")
    assert.equal(result, "Hello \u2028Mark, how are you?")
    assert.end()
})

test("Supports \u2029", function (assert) {
    var template = compile("Hello \u2029{0}, how are you?", true)
    var result = template("Mark")
    assert.equal(result, "Hello \u2029Mark, how are you?")
    assert.end()
})

test("Listed arguments at the start of strings are replaced",
    function (assert) {
        var template = compile("{0} people have liked this", true)
        var result = template(123)
        assert.equal(result, "123 people have liked this")
        assert.end()
    })

test("Listed arguments at the end of string are replaced",
    function (assert) {
        var template = compile("Please respond by {0}", true)
        var result = template("01/01/2015")
        assert.equal(result, "Please respond by 01/01/2015")
        assert.end()
    })

test("Multiple listed arguments are replaced", function (assert) {
    var template = compile("Hello {0}, you have {1} new messages", true)
    var result = template("Anna", 5)
    assert.equal(result, "Hello Anna, you have 5 new messages")
    assert.end()
})

test("Missing listed arguments become 0 characters", function (assert) {
    var template = compile("Hello{1}, how are you?", true)
    var result = template("no")
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Listed arguments can be escaped", function (assert) {
    var template = compile("Hello {{0}}, how are you?", true)
    var result = template( "Mark")
    assert.equal(result, "Hello {0}, how are you?")
    assert.end()
})

test("Allow null data", function (assert) {
    var template = compile("Hello{0}", true)
    var result = template(null)
    assert.equal(result, "Hello")
    assert.end()
})

test("Allow undefined data", function (assert) {
    var template = compile("Hello{0}", true)
    var result1 = template()
    var result2 = template(undefined)
    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.end()
})

test("Null keys become 0 characters", function (assert) {
    var template1 = compile("Hello{name}", true)
    var result1 = template1({ name: null })

    var template2 = compile("Hello{0}", true)
    var result2 = template2([null])

    var template3 = compile("Hello{0}{1}{2}", true)
    var result3 = template3(null, null, null)

    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.equal(result3, "Hello")
    assert.end()
})

test("Undefined keys become 0 characters", function (assert) {
    var template1 = compile("Hello{firstName}{lastName}", true)
    var result1 = template1({ name: undefined })

    var template2 = compile("Hello{0}{1}", true)
    var result2 = template2([undefined])

    var template3 = compile("Hello{0}{1}{2}", true)
    var result3 = template3(undefined, undefined)

    assert.equal(result1, "Hello")
    assert.equal(result2, "Hello")
    assert.equal(result3, "Hello")
    assert.end()
})

test("Works across multline strings", function (assert) {
    var template1 = compile("{zero}\n{one}\n{two}", true)
    var result1 = template1({
        zero: "A",
        one: "B",
        two: "C"
    })

    var template2 = compile("{0}\n{1}\n{2}", true)
    var result2 = template2(["A", "B", "C"])

    var template3 = compile("{0}\n{1}\n{2}", true)
    var result3 = template3("A", "B", "C")

    assert.equal(result1, "A\nB\nC")
    assert.equal(result2, "A\nB\nC")
    assert.equal(result3, "A\nB\nC")
    assert.end()
})

test("Allow multiple references", function (assert) {
    var template1 = compile("{a}{b}{c}\n{a}{b}{c}\n{a}{b}{c}", true)
    var result1 = template1({
        a: "one",
        b: "two",
        c: "three"
    })

    var template2 = compile("{0}{1}{2}\n{0}{1}{2}\n{0}{1}{2}", true)
    var result2 = template2([
        "one",
        "two",
        "three"
    ])

    var template3 = compile("{0}{1}{2}\n{0}{1}{2}\n{0}{1}{2}", true)
    var result3 = template3(
        "one",
        "two",
        "three")

    assert.equal(result1, "onetwothree\nonetwothree\nonetwothree")
    assert.equal(result2, "onetwothree\nonetwothree\nonetwothree")
    assert.equal(result3, "onetwothree\nonetwothree\nonetwothree")
    assert.end()
})

test("Template string without arguments", function (assert) {
    var template = compile("Hello, how are you?", true)
    var result = template()
    assert.equal(result, "Hello, how are you?")
    assert.end()
})

test("Template should reference nested properties", function (assert) {
    var template = compile("Hello {profile.username}")
    var result = template({profile: {username: "doe"}})
    assert.equal(result, "Hello doe")
    assert.end()
})

test("Template should reference nested array values using index", function (assert) {
    var template = compile("Hello {profile.0}, you are {profile.1} years old")
    var result = template({profile:['Doe',18]})
    assert.equal(result, "Hello Doe, you are 18 years old")
    assert.end()
})