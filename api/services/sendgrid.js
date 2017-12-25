const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(sails.config.sendgrid.apiKey);

module.exports = {
  sendEmail: function(to, subject, text, html) {
    const msg = {
      to: to,
      from: 'no-reply@cohober.vn',
      subject: subject,
      text: text,
      html: html,
    };
    return sgMail.send(msg);
  },
  sendRegisterEmail: function(to, name, link) {
    const msg = {
      to: to,
      from: 'noreply@cohober.vn',
      subject: 'Xác nhận email đăng ký Cohober.vn',
      text: `Chào ${name}, Cám ơn bạn đã đăng ký tài khoản trên Cohober.vn. Để hoàn tất quá trình đăng ký, bạn vui lòng truy cập đường dẫn sau: ${link}. Xin cảm ơn bạn.`,
      html: `<div>
        <p>Chào ${name},</p>
        <p>Cám ơn bạn đã đăng ký tài khoản trên Cohober.vn. Để hoàn tất quá trình đăng ký, bạn vui lòng truy cập đường dẫn sau:</p>
        <a href="${link}">${link}</a>
        <p>Xin cảm ơn</p>
      </div>`,
    };
    return sgMail.send(msg);
  },
  sendForgotPassword: function(to, name, link) {
    const msg = {
      to: to,
      from: 'noreply@cohober.vn',
      subject: 'Khôi phục mật khẩu truy cập Cohober.vn',
      text: `Chào ${name}, Cám ơn bạn đã sử dụng Cohober.vn. Để khôi phục mật khẩu truy cập, bạn vui lòng truy cập đường dẫn sau để tiếp tục: ${link}. Xin cảm ơn bạn.`,
      html: `<div>
        <p>Chào ${name},</p>
        <p>Cám ơn bạn đã sử dụng Cohober.vn. Để khôi phục mật khẩu truy cập, bạn vui lòng truy cập đường dẫn sau để tiếp tục:</p>
        <a href="${link}">${link}</a>
        <p>Xin cảm ơn</p>
      </div>`,
    };
    return sgMail.send(msg);
  },
  sendRegisterEmailEN: function(to, name, link) {
    const msg = {
      to: to,
      from: 'noreply@cohober.vn',
      subject: 'Confirmation email registration for Cohober.vn',
      text: `Dear ${name}, Thank you for signing up for Cohober.vn. To complete the registration process, please visit the following link: ${link}. Thank you.`,
      html: `<div>
        <p>Dear ${name},</p>
        <p>Thank you for signing up for Cohober.vn. To complete the registration process, please visit the following link:</p>
        <a href="${link}">${link}</a>
        <p>Thank you</p>
      </div>`,
    };
    return sgMail.send(msg);
  },
  sendForgotPasswordEN: function(to, name, link) {
    const msg = {
      to: to,
      from: 'noreply@cohober.vn',
      subject: 'Recover password access Cohober.vn',
      text: `Dear ${name}, Thank you for using Cohober.vn. To recover your password, please visit the following link to proceed: ${link}. Thank you.`,
      html: `<div>
        <p>Dear ${name},</p>
        <p>Thank you for using Cohober.vn. To recover your password, please visit the following link to proceed:</p>
        <a href="${link}">${link}</a>
        <p>Thank you</p>
      </div>`,
    };
    return sgMail.send(msg);
  },
}
