module.exports = function(obj, path) {
  if (typeof(obj) !== 'object' || typeof path !== 'string') {
    return obj;
  }

  var pathArr = path.split('.');

  for (var i = 0; i < pathArr.length; i++) {
    var p = pathArr[i];
    while (p[p.length - 1] === '\\') {
      p = p.slice(0, -1) + '.';
      p += pathArr[++i];
    }

    obj = obj.hasOwnProperty(p) ? obj[p] : null;
    if (obj === undefined) {
      break;
    }
  }
  return obj;
}
