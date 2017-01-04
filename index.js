var nargs = /\{([0-9a-zA-Z_]+)\}/g

module.exports = template

function template(string) {
    var args
    var opts

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else if (arguments.length === 3 && typeof arguments[1] === "object" &&
               typeof arguments[2] === "object") {
        args = arguments[1]
        opts = arguments[2]
    } else {
        args = new Array(arguments.length - 1)
        for (var i = 1; i < arguments.length; ++i) {
            args[i - 1] = arguments[i]
        }
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === "{" &&
            string[index + match.length] === "}") {
            return i
        } else {
            if (opts && opts.rejectNoMatch && !args.hasOwnProperty(i)) {
              throw new Error('No matching substitution available for the pattern');
            } else {
                result = args.hasOwnProperty(i) ? args[i] : null
                if (result === null || result === undefined) {
                  return ""
                }
            }

            return result
        }
    })
}
