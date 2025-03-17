import transporter from "../config/mail.js";

export const sendEmail = async (to, subject, template, context) => {
  try {
    const mailOptions = {
      from: process.env.MAIL_USER,
      to,
      subject,
      template,
      context,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    throw error;
  }
};
