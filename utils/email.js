import nodemailer from "nodemailer";

const sendEmail = async (options) => {
  ///1)Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USERNAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  ///3)Send actual email
  await transporter.sendMail({
    from: "Abdul Aziz <abdulazi@mymail.io>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};

export default sendEmail;
