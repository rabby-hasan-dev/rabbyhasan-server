import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com.',
    port: 587,
    // secure: config.NODE_ENV === 'production',
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: config.nodemailer_user_email,
      pass: config.nodemailer_user_app_pass,
    },
  });

  await transporter.sendMail({
    from: config.nodemailer_sender_email_address, // sender address
    to, // list of receivers
    subject: subject,
    text: '', // plain text body
    html, // html body
  });
};
