const nodemailer = require('nodemailer')
var config = require('./config/config')

module.exports = {
  async sendWelcomeEmail (user, ctx) {
    var mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.userMail,
        pass: config.passMail
      }
    })

    var mailOptions = {
      to: user.email,
      from: 'dojsys@gmail.com',
      subject: 'Welcome in divstuff.net',
      html: `
      <div>hello ${user.name}</div>
      <div>Welcome in the Divstuff App.</div>
        <div>Please find link to validate your email.
           ${ctx.request.headers.origin}/validateEmail?validateEmailToken=${user.validateEmailToken}
        </div>
    `
    }
    return mailer.sendMail(mailOptions)
  },
  sendForgetPassword (uniqueId, email, ctx) {
    var mailer = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.userMail,
        pass: config.passMail
      }
    })

    var mailOptions = {
      to: email,
      from: 'dojsys@gmail.com',
      subject: 'Forget Password - Divstuff app',
      html: `
      <div>hello</div>
      <div>Please find link to reset your password.
         ${ctx.request.headers.origin}/resetPassword?resetPasswordToken=${uniqueId}
      </div>
    `
    }
    mailer.sendMail(mailOptions, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('Mail sent to: ' + email)
      }
    })
  }
}
