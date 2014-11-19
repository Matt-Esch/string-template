

var opTag = "{";
var clTag = "}";
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
  opTag = op;
  clTag = cl;

  var op_RegExp, cl_RegExp;
  op_RegExp = escapeForRegExp( op );
  cl_RegExp = escapeForRegExp( cl );

  nargs = new RegExp( op_RegExp+"([0-9a-zA-Z]+)"+cl_RegExp, "g" );
}


module.exports.config = function() {
  return {
    opTag: opTag,
    clTag: clTag,
    nargs: nargs
  }
}
module.exports.setOpenCloseTags = setOpenCloseTags;
