var bcrypt = require('bcrypt');

module.exports = {
	login: (req, res) => {
    var { email, password } = req.body;
    Manager.findOne({
      email: email
    })
    .exec((err, user) => {
      if (err || !user) {
        return res.send(406, {
          msg: 'Email or password is incorrect'
        });
      }
      else {
        bcrypt.compare(password, user.password, function (err, isPasswordMatch) {
          if (err || !isPasswordMatch) {
            return res.send(406, {
              msg: 'Email or password is incorrect'
            });
          }

          const token = jwt.issue({
            id : user.id,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber
          });

          user.token = token;

          return res.json(user);
        });
      }
    });
  }
};

