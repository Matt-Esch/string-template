var slice = Array.prototype.slice

var custom = require('./custom');

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

    var config = custom.config();

    return string.replace(config.nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === config.opTag &&
            string[index + match.length] === config.clTag) {
            return i
        } else {
            result = args.hasOwnProperty(i) ? args[i] : null
            if (result === null || result === undefined) {
                return ""
            }

            return result
        }
    })
}
