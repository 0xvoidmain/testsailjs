const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
const A = require('../utils/asyncAction');
const parsePopulate = require('../utils/parsePopulate');
const CONST = require('../../const');

module.exports = {
  find: A(async (req, res) => {
    const user = req.user;
    const where = actionUtil.parseCriteria(req);
    const limit = actionUtil.parseLimit(req);
    const skip = actionUtil.parseSkip(req);
    const sort = actionUtil.parseSort(req);
    const populate = parsePopulate(req);

    where.user = user.id;

    const notifications = await Notification.find(where)
      .skip(skip)
      .limit(limit)
      .sort(sort || 'createdAt DESC')
      .populate(populate);

    res.ok(notifications);
  }),
  findOne: A(async (req, res) => {
    const user = req.user;
    const where = actionUtil.parseCriteria(req);
    const limit = actionUtil.parseLimit(req);
    const skip = actionUtil.parseSkip(req);
    const sort = actionUtil.parseSort(req);
    const populate = parsePopulate(req);

    where.user = user.id;

    const notification = await Notification.findOne(where)
      .skip(skip)
      .limit(limit)
      .sort(sort || 'createdAt DESC')
      .populate(populate);

    res.ok(notification);
  })
}