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
    raiseMoney: {
      type: 'float',
      defaultsTo: 0
    },
    type: {
      type: 'string',
      enum: ['raiseFunding', 'idea', 'bds_sell', 'bds_buy', 'bds_thue', 'bds_doi', 'docu'],
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
    images: [{
      type: 'string'
    }],

    //bat dong san
    huong: 'string',
    address: 'string',
    dienTich: 'float',

    price: 'float',

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