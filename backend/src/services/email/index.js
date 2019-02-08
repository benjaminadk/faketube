const nodemailer = require('nodemailer')
const { NODE_ENV, MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } = process.env

const devOptions = {
  host: MAILTRAP_HOST,
  port: MAILTRAP_PORT,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS
  }
}

const transport = nodemailer.createTransport(devOptions)

module.exports = {
  transport
}
