var test = require("tape")

var format = require("../index.js")
var compile = require("../compile.js")

var modes = [
    { name: "format", render: format },
    {
        name: "compiled",
        render: function (string, args) {
            return compile(string)(args)
        }
    },
    {
        name: "inline",
        render: function (string, args) {
            return compile(string, true)(args)
        }
    }
]

for (var i = 0; i < modes.length; i++) {
    (function (mode) {
        test(mode.name + " accepts objects without a prototype", {
            skip: typeof Object.create !== "function"
        }, function (assert) {
            var args = Object.create(null)
            args.name = "Ada"
            args.count = 0
            args.flag = false
            args.nullable = null
            args.undefinedValue = undefined

            var result = mode.render(
                "{name}|{count}|{flag}|{missing}|{nullable}|{undefinedValue}", args)

            assert.equal(result, "Ada|0|false|||")
            assert.end()
        })

        test(mode.name + " accepts hasOwnProperty as data", function (assert) {
            assert.doesNotThrow(function () {
                var result = mode.render("{name}|{hasOwnProperty}", {
                    name: "Ada",
                    hasOwnProperty: "data"
                })

                assert.equal(result, "Ada|data")
            })
            assert.end()
        })

        test(mode.name + " accepts a null hasOwnProperty value", function (assert) {
            assert.doesNotThrow(function () {
                var result = mode.render("{name}|{hasOwnProperty}", {
                    name: "Ada",
                    hasOwnProperty: null
                })

                assert.equal(result, "Ada|")
            })
            assert.end()
        })

        test(mode.name + " ignores overridden property checks", function (assert) {
            function Args() {}
            Args.prototype.inherited = "hidden"
            var args = new Args()
            var calls = 0
            args.name = "Ada"
            args.hasOwnProperty = function () {
                calls++
                return true
            }

            assert.equal(mode.render("{name}|{inherited}", args), "Ada|")
            assert.equal(calls, 0)
            assert.end()
        })
    })(modes[i])
}
