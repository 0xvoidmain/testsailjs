/**
 * Managers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    platform: 'string',
    deviceId: 'string',
    user: {
      model: 'User',
      index: true
    }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,
};

