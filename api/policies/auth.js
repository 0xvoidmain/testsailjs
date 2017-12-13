/**
 * auth
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

module.exports = function (req, res, next) {

  const token = req.query.token || req.get('Authorization');

  if (token) {
    if (req.query.token) {
      delete req.query.token;
    }
    jwt.verify(token, function (err, user) {
      if (err) return res.json(401, { msg: 'Invalid Token!' });
      req.token = token;
      req.user = user;
      next();
    });
  } else {
    return res.json(401, { msg: 'No Authorization token was found' });
  }
};