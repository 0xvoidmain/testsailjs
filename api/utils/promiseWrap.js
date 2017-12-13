module.exports = function() {
  const func = arguments[0];

  if (func === null || func === undefined) {
    throw new Error('The first argument must be function or object have .exec() function');
  }

  if (typeof func.exec === 'function') {
    return new Promise((resolve, reject) => {
      func.exec((err, result) => {
        if (err) {
          return reject(err);
        }

        return resolve(result);
      });
    });
  }

  if (typeof func != 'function') {
    throw new Error('The first argument must be function');
  }

  return new Promise((resolve, reject) => {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    args.push((err, result) => {
      if (err) {
        return reject(err);
      }
      return resolve(result);
    });

    func.apply(null, args);
  });
};