import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  

export default transporter;

//Transporter is used to send emails
//nodemailer is a module for Node.js applications to allow easy as cake email sending
