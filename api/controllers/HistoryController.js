const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
const A = require('../utils/asyncAction');
const CONST = require('../../const');
const parsePopulate = require('../utils/parsePopulate');

module.exports = {
  find: A(async (req, res) => {
    const user = req.user;
    const where = actionUtil.parseCriteria(req);
    const limit = actionUtil.parseLimit(req);
    const skip = actionUtil.parseSkip(req);
    const sort = actionUtil.parseSort(req);
    const populate = parsePopulate(req);

    where.user = user.id;

    const histories = await History.find(where)
      .skip(skip)
      .limit(limit)
      .sort(sort || 'createdAt DESC')
      .populate(populate);

    res.ok(histories);
  }),
  findOne: A(async (req, res) => {
    const user = req.user;
    const where = actionUtil.parseCriteria(req);
    const limit = actionUtil.parseLimit(req);
    const skip = actionUtil.parseSkip(req);
    const sort = actionUtil.parseSort(req);
    const populate = parsePopulate(req);

    where.user = user.id;

    const history = await History.findOne(where)
      .skip(skip)
      .limit(limit)
      .sort(sort || 'createdAt DESC')
      .populate(populate);

    res.ok(history);
  })
}