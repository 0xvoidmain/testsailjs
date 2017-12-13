/**
 * Managers.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    owner: {
      model: 'User',
      index: true
    },
    category: {
      model: 'Category'
    },
    name: {
      type: 'string',
      required: true
    },
    phoneNumber: {
      type: 'string'
    },
    detail: {
      type: 'string',
      defaultsTo: ''
    },
    location: {
      type: 'json',
    },
    type: {
      type: 'string',
      enum: ['raiseFunding', 'idea'],
      index: true
    },
    startDate: {
      type: 'date'
    },
    endDate: {
      type: 'date'
    },
    thumbnail: {
      type: 'string'
    },
    status: {
      type: 'string',
      enum: ['pending','running', 'stoped', 'rejected','deleted'],
      defaultsTo: 'running',
      index: true
    }
  },
  autoCreatedAt: true,
  autoUpdatedAt: true,
};

