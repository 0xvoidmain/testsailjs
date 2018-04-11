const axios = require('axios');
const bcrypt = require('bcrypt');
const P = require('../utils/promiseWrap');
const A = require('../utils/asyncAction');
const phone = require('phone');
const parsePopulate = require('../utils/parsePopulate');

module.exports = {
  register: A(async (req, res) => {
    req.check('email', 'Email không đúng định dạng').optional().isEmail();
    req.check('phoneNumber', 'Số điện thoại không đúng định dạng').optional().isMobilePhone('vi-VN');
    req.check('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({min: 6});

    const validErrors = await req.getValidationResult();

    if (!validErrors.isEmpty()) {
      return res.badRequest(validErrors.array());
    }
    var {email = '', phoneNumber = '', password, name, platform, deviceId, language = 'en'} = req.body || {};
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    phoneNumber = phone(phoneNumber, 'VN')[0];

    if (!email && !phoneNumber) {
      if (language === 'vi')
        return res.badRequest([{msg: 'Thông tin đăng ký không đúng. Vui lòng nhập email hoặc số điện thoại'}]);
      else return res.badRequest([{msg: 'Invalid login information. Please enter email or telephone number'}]);
    }

    if (email) {
      let findUser = await User.findOne({
        email
      });
      if (findUser) {
        if (language === 'vi')
          return res.badRequest([{msg: 'Email đã được sử dụng'}]);
        else return res.badRequest([{msg: 'Email has been used'}]);
      }
    }

    if (phoneNumber) {
      let findUser = await User.findOne({
        phoneNumber
      });
      if (findUser) {
        if (language === 'vi')
          return res.badRequest([{msg: 'Số điện thoại đã được sử dụng'}]);
        else return res.badRequest([{msg: 'Phone number has been used'}])

      }
    }


    const salt = await P(bcrypt.genSalt, 10);
    const hash = await P(bcrypt.hash, password, salt);
    const uuid = jwt.issue({email: email});

    var newUserData = {
      password: hash,
      name: name,
      uuid: uuid
    }

    if (email) {
      newUserData.email = email;
    }

    if (phoneNumber) {
      newUserData.phoneNumber = phoneNumber;
    }

    const user = await User.create(newUserData);

    if (platform && deviceId) {
      user.devices.add({
        platform: platform,
        deviceId: deviceId
      });
      await user.save();
    }

    const token = jwt.issue({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.token = token;
    if (user.email) {
      if (language === 'vi')
        sendgrid.sendRegisterEmail(user.email, user.name, sails.config.web.domain + '/active-email?uuid=' + uuid)
      else
        sendgrid.sendRegisterEmailEN(user.email, user.name, sails.config.web.domain + '/active-email?uuid=' + uuid);
    }

    res.ok(user);
  }),
  login: A(async (req, res) => {
    var {email = '', phoneNumber = '', deviceId, platform, password, language = 'en'} = req.body || {};
    email = email.trim();
    phoneNumber = phoneNumber.trim();
    phoneNumber = phone(phoneNumber, 'VN')[0];
    var user = null;
    if (email) {
      user = await User.findOne({
        email
      });
      if (!user) {
        if (language === 'vi') return res.badRequest([{msg: 'Email hoặc mật khẩu không đúng'}]);
        else return res.badRequest([{msg: 'Email or password is incorrect'}])
      }

      var isPasswordMatch = await P(bcrypt.compare, password, user.password);

      if (!isPasswordMatch) {
        if (language === 'vi') return res.badRequest([{msg: 'Email hoặc mật khẩu không đúng'}]);
        else return res.badRequest([{msg: 'Email or password is incorrect'}])
      }
    }

    if (phoneNumber) {
      user = await User.findOne({
        phoneNumber
      });
      if (!user) {
        if (language === 'vi')
          return res.badRequest([{msg: 'Số điện thoại hoặc mật khẩu không đúng'}]);
        else return res.badRequest([{msg: 'Phone number or password incorrect'}]);
      }

      var isPasswordMatch = await P(bcrypt.compare, password, user.password);

      if (!isPasswordMatch) {
        if (language === 'vi')
          return res.badRequest([{msg: 'Số điện thoại hoặc mật khẩu không đúng'}]);
        else return res.badRequest([{msg: 'Phone number or password incorrect'}]);
      }
    }

    if (platform && deviceId) {
      user.devices.add({
        platform: platform,
        deviceId: deviceId
      });
      await user.save();
    }

    if (user) {
      const token = jwt.issue({
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber
      });

      user.token = token;

      return res.ok(user);
    }
    else {
      if (language == 'vi')
        return res.badRequest([{msg: 'Thông tin đăng nhập không đúng'}]);
      else return res.badRequest([{msg: 'Login information is incorrect'}])
    }
  }),
  loginWithFacebook: A(async (req, res) => {
    const {facebookToken, platform, deviceId, language = 'en'} = req.body;
    if (!facebookToken) {
      if (language === 'vi')
        return res.badRequest([{msg: 'Server không nhận được facebook token'}]);
      else return res.badRequest([{msg: 'Server does not receive facebook token'}])
    }
    const {id, name = '', email = ''} = await facebook.getUserByToken(facebookToken);


    var user = null;

    var user = await User.findOne({
      facebookId: id
    });

    if (!user) {
      user = await User.findOne({
        email: email
      });

      if (user) {
        if (language === 'vi')
          return res.badRequest([{msg: 'Tài khoản Facebook của bạn sử dụng email đã tồn tại trong hệ thống'}]);
        else return res.badRequest([{msg: 'Your Facebook account uses an email that already exists in your system'}])
      }

      user = await User.create({
        facebookId: id,
        name: name,
        notSetPassword: true,
        email: email
      });
    }

    if (platform && deviceId) {
      user.devices.add({
        platform: platform,
        deviceId: deviceId
      });
      await user.save();
    }


    const token = jwt.issue({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    user.token = token;

    res.ok(user);
  }),
  logout: A(async (req, res) => {
    var {id} = req.user;
    const {platform, deviceId} = req.body;

    await UserDevice.destroy({
      user: id,
      platform: platform,
      deviceId: deviceId
    });

    res.ok({
      logout: true
    });
  }),
  verify: A(async (req, res) => {
    var {uuid = ''} = req.query || {};

    if (!uuid) {
      return res.badRequest([{msg: 'Đường link đã quá hạn'}]);
    }

    try {
      var verifyEmailToken = await P(jwt.verify, uuid);
    }
    catch (ex) {
      return res.badRequest([{msg: 'Đường link không đúng hoặc đã quá hạn'}]);
    }
    var email = verifyEmailToken.email;
    var user = await User.findOne({
      email
    });

    if (!user) {
      return res.badRequest([{msg: 'Đường link không đúng hoặc đã quá hạn'}]);
    }

    await User.update({
      id: user.id
    }, {
      isVerifyEmail: true
    });

    res.ok(user);
  }),
  token: (req, res) => {
    const user = req.user;

    const token = jwt.issue({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber
    });

    res.ok({
      id: user.id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: token
    });
  },
  forgotPassword: A(async (req, res) => {
    var {email = '', language = 'en'} = req.body || {};

    email = email.trim();
    const uuid = jwt.issue({email: email});

    var user = await User.findOne({
      email: email
    });

    if (!user) {
      if (language === 'vi')
        return res.badRequest([{msg: 'Email này không tồn tại'}]);
      else return res.badRequest([{msg: 'This email does not exist'}]);
    }

    await User.update({
      email: email
    }, {
      uuid: uuid
    });

    if (user.email) {
      if (language === 'vi')
        sendgrid.sendForgotPassword(user.email, user.name, sails.config.web.domain + '/reset-password?uuid=' + uuid);
      else sendgrid.sendForgotPasswordEN(user.email, user.name, sails.config.web.domain + '/reset-password?uuid=' + uuid)
    }

    res.ok({
      message: language === 'vi' ? 'Vui lòng kiểm tra email để tiếp tục' : 'Please check email to continue'
    });
  }),
  update: A(async (req, res) => {
    req.check('name', 'Tên không được để trống').isLength({min: 1});

    var validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty()) {
      return res.badRequest(validationResult.array());
    }

    const user = req.user;
    var {email, name, phoneNumber, avatar, text1, text2, text3, text4} = req.body || {};

    await User.update({
      id: user.id
    }, {
      name,
      phoneNumber,
      email,
      avatar,
      text1,
      text2,
      text3,
      text4
    });

    res.ok({
      id: user.id,
      name: name
    });
  }),
  changePassword: A(async (req, res) => {
    req.check('newPassword', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({min: 6});
    req.check('oldPassword', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({min: 6});

    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty()) {
      return res.badRequest(validationResult.array());
    }

    const {oldPassword, newPassword, language = 'en'} = req.body || {};
    const {id} = req.user;

    const user = await User.findOne({
      id: id
    });

    var isPasswordMatch = await P(bcrypt.compare, oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.badRequest([{msg: language === 'vi' ? 'Mật khẩu cũ không đúng' : 'Old password is incorrect'}]);
    }

    const salt = await P(bcrypt.genSalt, 10);
    const hash = await P(bcrypt.hash, newPassword, salt);

    await User.update({
      id: id
    }, {
      password: hash
    });

    res.ok({
      id: id
    });
  }),
  resetPassword: A(async (req, res) => {
    req.check('password1', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({min: 6});
    req.check('password2', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({min: 6});

    const validationResult = await req.getValidationResult();
    if (!validationResult.isEmpty()) {
      return res.badRequest(validationResult.array());
    }

    const {password1, password2, uuid} = req.body || {};
    if (password1 != password2) {
      return res.badRequest([{msg: 'Hai mật khẩu không giống nhau'}]);
    }

    const salt = await P(bcrypt.genSalt, 10);
    const hash = await P(bcrypt.hash, password1, salt);

    if (!uuid) {
      return res.badRequest([{msg: 'Đường link đã quá hạn'}]);
    }
    try {
      var verifyEmailToken = await P(jwt.verify, uuid);
    }
    catch (ex) {
      return res.badRequest([{msg: 'Đường link không đúng hoặc đã quá hạn'}]);
    }

    var email = verifyEmailToken.email;
    var user = await User.findOne({
      email
    });

    if (!user) {
      return res.badRequest([{msg: 'Đường link không đúng hoặc đã quá hạn'}]);
    }

    await User.update({
      id: user.id
    }, {
      password: hash
    });

    res.ok(user);
  }),
  me: A(async (req, res) => {
    var user = req.user;
    const populate = parsePopulate(req);
    const myInfo = await User.findOne({
      id: user.id
    }).populate(populate);

    res.ok(myInfo);
  })
}
