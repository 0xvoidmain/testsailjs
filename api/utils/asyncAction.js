const deep = require('deep-obj');

function getErrorMessage(err) {
  try {
    var ia = deep.get(err, 'invalidAttributes2') || {};
    var key = Object.keys(ia)[0];
    var msg = (deep.get(ia, `${key}[0].message`) || '').split('\n')[0];

    if (msg) {
      msg = key + ': ' + msg;
    }
    else {
      msg = deep.get(err, 'response.data.details') ||
        deep.get(err, 'response.data.msg') ||
        deep.get(err, 'response.data.message') ||
        deep.get(err, 'message') ||
        deep.get(err, 'msg') ||
        deep.get(err, 'errmsg') ||'';
    }

    if (!msg && !msg.trim()) {
      msg = err.toString();
    }

    return msg;
  }
  catch (ex) {
    return 'Error';
  }
}

module.exports = (asyncFunc) => {
  return async (req, res) => {
    try {
      await asyncFunc(req, res);
    }
    catch (ex) {
      if (Array.isArray(ex)) {
        res.serverError(ex);
      }
      else {
        var msg = getErrorMessage(ex);
        res.serverError([{msg: msg}]);
      }
    }
  }
}