const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ to, subject, html }) =>
  transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  });

module.exports = { sendMail };

