const nodemailer = require("nodemailer");

exports.sendmail = (req, res) => {

  const {email, text} = req.body;

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_NAME,
      pass: process.env.SMTP_PASSWORD
    }
  });

  const data = {
    from: process.env.SMTP_NAME,
    to: process.env.ADMIN_MAIL,
    subject: `Mail from user ${email}`,
    html: `<p>${text}</p>`
  }

  transporter.sendMail(data, (error, result) => {
    if (error) return res.status(400).json(error);
    res.json(result);
  });
};





