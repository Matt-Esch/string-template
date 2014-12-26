var nargs = /\{(\[.+?\])?([0-9a-zA-Z]+)(\[.+?\])?\}/g
var brackets = /(^\[|\]$)/g
var slice = Array.prototype.slice

module.exports = template

function template(string) {
    var args

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, l, i, r, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }
            if (l) {
                l = l.replace(brackets, "")
                result = l + result
            }
            if (r) {
                r = r.replace(brackets, "")
                result = result + r
            }

            return result
        }
    })
}
