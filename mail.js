require('dotenv').config()
const nodemailer = require('nodemailer')
const mailgun = require('nodemailer-mailgun-transport')

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API,
    domain: process.env.MAILGUN_DOMAIN,
  },
}

const transporter = nodemailer.createTransport(mailgun(auth))

const sendMail = (name, email, text, callback) => {
  const mailOptions = {
    from: `${name} <${email}>`,
    to: process.env.MY_EMAIL,
    subject: `Portfolio Contact Me Submission From ${name}`,
    text,
  }

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      callback(error, null)
    } else {
      callback(null, data)
    }
  })
}

module.exports = sendMail
