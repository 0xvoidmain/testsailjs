/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var P = require('../api/utils/promiseWrap');
module.exports.bootstrap = async function(cb) {
  try {
    var ProjectNative = await P(Project.native);
    ProjectNative.createIndex({
      name: 'text',
      detail: 'text'
    });

    ProjectNative.createIndex({
      location: '2dsphere'
    });

    var count = await Category.count();
    if (count == 0) {
      await Category.createEach([{
        name: 'Blockchain'
      }, {
        name: 'IoT'
      }, {
        name: 'AI'
      }]);
    }

    cb();
  }
  catch (ex) {
    sails.log.error(ex);
  }
};
