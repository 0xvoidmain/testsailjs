/**
 * Managers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');
var CONST = require('../../const');
module.exports = {
  attributes: {
    name: {
      type: 'string',
      defaultsTo: ''
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    role: {
      type: 'integer',
      enum: [CONST.ROLE_SUPER_ADMIN, CONST.ROLE_ADMIN],
      defaultsTo: CONST.ROLE_ADMIN
    },
    phoneNumber: {
      type: 'string',
      defaultsTo: ''
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,

  beforeValidate: function(values, cb) {
    if (!values.password) {
      delete values.password;
    }

    cb();
  },

  beforeCreate: function (values, cb) {
    if (values.email) {
      values.email = values.email.toLowerCase();
    }
    bcrypt.genSalt(10, function (err, salt) {
      if(err) return next(err);
      bcrypt.hash(values.password, salt, function (err, hash) {
        if (err) {
          return cb(err, hash);
        }
        values.password = hash;
        cb();
      });
    });
  },

  beforeUpdate: function (values, cb) {
    if (values.email) {
      values.email = values.email.toLowerCase();
    }
    if (values.password) {
      bcrypt.genSalt(10, function (err, salt) {
        if(err) return next(err);
        bcrypt.hash(values.password, salt, function (err, hash) {
          if (err) {
            return cb(err, hash);
          }
          values.password = hash;
          cb();
        });
      });
    }
    else {
      cb();
    }
  }
};

