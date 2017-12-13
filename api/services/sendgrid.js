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
      text: `Chào ${name}, Cám ơn bạn đã đăng ký tài khoản trên Cohober.vn. Để hoàn tất quá trình đăng ký, bạn vui lòng truy cập đường dẫn sau: ${link}. Xem cảm ơn bạn.`,
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
      text: `Chào ${name}, Cám ơn bạn đã sử dụng Cohober.vn. Để khôi phục mật khẩu truy cập, bạn vui lòng truy cập đường dẫn sau để tiếp tục: ${link}. Xem cảm ơn bạn.`,
      html: `<div>
        <p>Chào ${name},</p>
        <p>Cám ơn bạn đã sử dụng Cohober.vn. Để khôi phục mật khẩu truy cập, bạn vui lòng truy cập đường dẫn sau để tiếp tục:</p>
        <a href="${link}">${link}</a>
        <p>Xin cảm ơn</p>
      </div>`,
    };
    return sgMail.send(msg);
  }
}