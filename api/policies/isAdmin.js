/**
 * isSuperAdmin
 *
 * @description :: Policy to check if user is authorized with JSON web token
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Policies
 */

var CONST = require('../../const');
module.exports = function (req, res, next) {
  if (!req.user || req.user.role < CONST.ROLE_ADMIN) {
    return res.json(401, { msg: 'You dont have permission' });
  }

  next();
};