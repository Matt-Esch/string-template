var template = require("./index")
var escape = require("js-string-escape")

var nargs = /\{(?:\[.+?\])?[0-9a-zA-Z]+(?:\[.+?\])?\}/g
var nargsCap = /\{(\[.+?\])?([0-9a-zA-Z]+)(\[.+?\])?\}/g
var brackets = /(^\[|\]$)/g

var replaceTemplate =
"    var args\n" +
"    var result\n" +
"    if (arguments.length === 1 && typeof arguments[0] === \"object\") {\n" +
"        args = arguments[0]\n" +
"    } else {\n" +
"        args = arguments" +
"    }\n\n" +
"    if (!args || !(\"hasOwnProperty\" in args)) {\n" +
"       args = {}\n" +
"    }\n\n" +
"    return {0}"

var literalTemplate = "\"{0}\""
var argTemplate = "(result = args.hasOwnProperty(\"{0}\") ? " +
    "args[\"{0}\"] : null, \n        " +
    "(result === null || result === undefined) ? \"\" : \"{1}\" + result + \"{2}\")"

module.exports = compile

function compile(string, inline) {
    var replacements = string.match(nargs)
    var interleave = string.split(nargs)
    var replace = []

    for (var i = 0; i < interleave.length; i++) {
        var current = interleave[i];
        var replacement = replacements[i];
        var escapeLeft = current.charAt(current.length - 1)
        var escapeRight = (interleave[i + 1] || "").charAt(0)
        var attachLeft = ""
        var attachRight = ""
        var fullReplacement = ""
        var subReplacement = ""

        if (replacement) {
            fullReplacement = replacement.substring(1, replacement.length - 1)
            subReplacement = replacement.replace(nargsCap, function (match, l, i, r, index) {
                if (l !== null && l !== undefined) {
                    attachLeft = l.replace(brackets, "")
                }
                if (r !== null && r !== undefined) {
                    attachRight = r.replace(brackets, "")
                }
                return i
            })
        }

        if (escapeLeft === "{" && escapeRight === "}") {
            replace.push(current + fullReplacement)
        } else {
            replace.push(current);
            if (subReplacement) {
                replace.push({
                    name: subReplacement,
                    attachLeft: attachLeft,
                    attachRight: attachRight
                })
            }
        }
    }

    var prev = [""]

    for (var j = 0; j < replace.length; j++) {
        var curr = replace[j]

        if (String(curr) === curr) {
            var top = prev[prev.length - 1]

            if (String(top) === top) {
                prev[prev.length - 1] = top + curr
            } else {
                prev.push(curr)
            }
        } else {
            prev.push(curr)
        }
    }

    replace = prev

    if (inline) {
        for (var k = 0; k < replace.length; k++) {
            var token = replace[k]

            if (String(token) === token) {
                replace[k] = template(literalTemplate, escape(token))
            } else {
                replace[k] = template(argTemplate,
                    escape(token.name),
                    escape(token.attachLeft),
                    escape(token.attachRight)
                )
            }
        }

        var replaceCode = replace.join(" +\n    ")
        var compiledSource = template(replaceTemplate, replaceCode)
        return new Function(compiledSource)
    }

    return function template() {
        var args

        if (arguments.length === 1 && typeof arguments[0] === "object") {
            args = arguments[0]
        } else {
            args = arguments
        }

        if (!args || !("hasOwnProperty" in args)) {
            args = {}
        }

        var result = []

        for (var i = 0; i < replace.length; i++) {
            if (i % 2 === 0) {
                result.push(replace[i])
            } else {
                var argName = replace[i].name
                var attachLeft = replace[i].attachLeft
                var attachRight = replace[i].attachRight
                var arg = args.hasOwnProperty(argName) ? args[argName] : null
                if (arg !== null && arg !== undefined) {
                    result.push(attachLeft + arg + attachRight)
                }
            }
        }

        return result.join("")
    }
}

function inlineConcat(token) {

}
