var slice = Array.prototype.slice

var TEMPL_OPEN  = "{";
var TEMPL_CLOSE = "}";
var nargs = /\{([0-9a-zA-Z]+)\}/g



function isSpecialRegExpChar( c ) {
  return "\^$.|?*+()[]{}".indexOf( c ) != -1;
}


function escapeForRegExp( str ) {
  var l = str.length;
  var result = "";
  for( var i=0; i<l; i++ ) {
    result += ( isSpecialRegExpChar( str[i] ) ? "\\" : "" ) + str[i];
  }
  return result;
}


function setOpenCloseTags( op, cl ) {
  if( op == cl ) {
    console.log( "ERROR: In setOpenCloseTags, open and close tags must be different to each other." );
    return;
  }
  TEMPL_OPEN  = op;
  TEMPL_CLOSE = cl;

  var op_RegExp, cl_RegExp;
  op_RegExp = escapeForRegExp( op );
  cl_RegExp = escapeForRegExp( cl );

  nargs = new RegExp( op_RegExp+"([0-9a-zA-Z]+)"+cl_RegExp, "g" );
}


function process(string) {
    var args;

    if (arguments.length === 2 && typeof arguments[1] === "object") {
        args = arguments[1]
    } else {
        args = slice.call(arguments, 1)
    }

    if (!args || !args.hasOwnProperty) {
        args = {}
    }

    return string.replace(nargs, function replaceArg(match, i, index) {
        var result

        if (string[index - 1] === TEMPL_OPEN &&
            string[index + match.length] === TEMPL_CLOSE) {
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


//---

module.exports.setOpenCloseTags = setOpenCloseTags;
module.exports.process = process;
