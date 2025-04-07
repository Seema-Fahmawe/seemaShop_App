import nodemailer from "nodemailer";
async function sendEmail(to, subject, html) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${process.env.email}`,
      pass: `${process.env.email_password}`,
    },
  });

  const info = await transporter.sendMail({
    from: `"seema shop" <${process.env.email}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
}

export default sendEmail;
