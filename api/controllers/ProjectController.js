const A = require('../utils/asyncAction');
const P = require('../utils/promiseWrap');
const CONST = require('../../const');
const parsePopulate = require('../utils/parsePopulate');
const actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  create: A(async (req, res) => {
    req.check('name', 'Tên dự án không được để trống').notEmpty();
    req.check('detail', 'Mô tả dự án không được để trống').notEmpty();
    req.check('type', 'Dạng dự án chưa được chọn').isIn(['raiseFunding', 'idea', 'bds_sell', 'bds_buy', 'bds_thue', 'bds_doi', 'docu']);
    req.check('phoneNumber', 'Số điện thoại không đúng định dạng').optional().isMobilePhone('vi-VN');
    req.check('startDate', 'Thời gian bắt đầu dự án không đúng').isDate();
    req.check('raiseMoney', 'Số tiền kêu gọi phải lới hơn 0').optional().isFloat({min: 0});
    req.check('price', 'Số tiền phải lới hơn 0').optional().isFloat({min: 0});
    req.check('dienTich', 'Diện tích phải lới hơn 0').optional().isFloat({min: 0});

    req.check('endDate', 'Thời gian kết thúc dự án không đúng').isDate()
      .isAfter(new Date().toISOString())
      .withMessage('Thời gian kết thúc phải lớn hơn hiện tại');
    req.check('location', 'Định dạng vị trí không đúng').custom(value => {
      if (!Array.isArray(value)) {
        throw new Error('Định dạng vị trí không đúng');
      }
      if (value.length !== 2) {
        throw new Error('Định dạng vị trí không đúng');
      }

      if (typeof value[0] != 'number' || typeof value[1] != 'number') {
        throw new Error('Định dạng vị trí không đúng');
      }
      return true;
    })

    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty()) {
      return res.badRequest(validationResult.array());
    }

    const user = req.user;
    var { name, raiseMoney, category, detail, location, type,
      phoneNumber, startDate, endDate, thumbnail, images, huong, address,
      dienTich, price
    } = req.body || {};

    name = name.trim();
    detail = detail.trim();
    raiseMoney = parseFloat(raiseMoney) || 0;

    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      return res.badRequest([{ msg: 'Thời gian bắt đầu phải trước thời thời gian kết thúc' }]);
    }

    if (type === 'raiseFunding' || type === 'idea') {
      const findCateg = await Category.findOne({
        id: category
      });

      if (!findCateg) {
        return res.badRequest([{ msg: 'Chủ đề không tồn tại' }]);
      }
    }

    const project = await Project.create({
      owner: user.id,
      category: category,
      name: name,
      phoneNumber: phoneNumber,
      detail: detail,
      type: type,
      startDate: startDate,
      endDate: endDate,
      thumbnail: thumbnail,
      raiseMoney: raiseMoney,
      huong: huong,
      address: address,
      dienTich: dienTich,
      price: price,
      location: {
        type: 'Point',
        coordinates: location
      }
    });

    res.ok(project);
  }),
  follow: A(async (req, res) => {
    req.check('projectId', 'Id của project không đúng').exists().isMongoId();
    const validErrors = await req.getValidationResult();
    if (!validErrors.isEmpty()) {
      return res.badRequest(validErrors.array());
    }
    var { projectId } = req.body || {};
    const { id } = req.user;
    const project = await Project.findOneById(projectId);
    if (!project) {
      return res.badRequest([{ msg: 'Không tìm thấy dự án bạn muốn theo dõi' }]);
    }

    var followProject = await FollowProject.findOrCreate({
      user: id,
      project: project.id
    });

    await History.create({
      user: id,
      project: project.id,
      objectType: CONST.OBJECT_TYPE_PROJECT,
      action: CONST.ACTION_FOLLOW
    });

    await Notification.create({
      user: project.owner,
      fromUser: id,
      project: project.id,
      objectType: CONST.OBJECT_TYPE_PROJECT,
      action: CONST.ACTION_FOLLOW,
      read: false
    })

    res.ok(followProject);
  }),
  nearMe: A(async (req, res) => {
    const user = req.user;
    const where = actionUtil.parseCriteria(req);
    const limit = actionUtil.parseLimit(req);
    const skip = actionUtil.parseSkip(req);
    const sort = actionUtil.parseSort(req);
    const populate = parsePopulate(req);

    const location = where.location;
    const maxDistance = where.maxDistance;
    const minDistance = where.minDistance;

    delete where.location;
    delete where.maxDistance;
    delete where.minDistance;

    if (!location) {
      return res.badRequest([{ msg: 'Vui lòng cung cấp vị trí của bạn' }]);
    }

    const ProjectNative = await P(Project.native);

    const nearQuery = {
      $geometry: {
        type: "Point",
        coordinates: location
      }
    };

    if (maxDistance > 0) {
      nearQuery['$maxDistance'] = maxDistance;
    }

    if (minDistance >= 0) {
      nearQuery['$minDistance'] = minDistance;
    }

    const projectIds = (await ProjectNative.find(
      {
        location: {
          $near: nearQuery
        },
        ...where
      }, {
        _id: true
      })
      .limit(limit)
      .skip(skip)
      .toArray()
    ).map(e => e._id);

    const projects = await Project.find({ id: projectIds })
      .sort(sort)
      .populate(populate);

    res.ok(projects);
  })
}