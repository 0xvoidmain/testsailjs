/**
 * Managers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    name: {
      type: 'string',
      defaultsTo: ''
    },
    facebookId: {
      type: 'string',
      index: true,
      unique: true
    },
    email: {
      type: 'string',
      index: true,
      unique: true
    },
    isVerifyEmail: {
      type: 'boolean',
      defaultsTo: false
    },
    isVerifyPhoneNumber: {
      type: 'boolean',
      defaultsTo: false
    },
    phoneNumber: {
      type: 'string',
      index: true,
      unique: true
    },
    notSetPassword: {
      type: 'boolean',
      defaultsTo: false
    },
    password: {
      type: 'string',
      minLength: 6
    },
    avatar: {
      type: 'string'
    },
    uuid: {
      type: 'string'
    },
    projects: {
      collection: 'Project',
      via: 'owner'
    },
    devices: {
      collection: 'UserDevice',
      via: 'user'
    },
    text1: {
      type: 'string'
    },
    text2: {
      type: 'string'
    },
    text3: {
      type: 'string'
    },
    text4: {
      type: 'string'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.uuid;
      return obj;
    }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,
};

