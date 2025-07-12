import nodemailer from 'nodemailer';
export const NodemailerConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(NodemailerConfig);

export default transporter;
