import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Replace with the correct host for your email service or server
      service: "gmail", // Replace with your actual service (e.g., "gmail" for Gmail)
      port: 587, // Replace with your actual port (587 is a common value for SMTP)
      secure: true, // Replace with your actual secure value (true/false)
      auth: {
        user: "dirapp2023@gmail.com", // Replace with your actual email address
        pass: "iwek rxvj dmmu raxp", // Replace with your actual email password, Go to your Google Account settings, find the Security section, enable two factor authentication, and generate an App Password (on bottom in two factor authetincation section). Use this generated password in your Node.js code.
      },
    });

    await transporter.sendMail({
      from: "dirapp2023@gmail.com",
      to: email,
      subject: subject,
      text: text,
      // html: '<h1> hello world </h1>',
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent!");
    console.error(error);
    return error;
  }
};

export default sendEmail;



//------ if not use module (use commonjs) ------//

// const nodemailer = require("nodemailer");

// module.exports = async (email, subject, text) => {
// 	try {
// 		const transporter = nodemailer.createTransport({
// 			host: process.env.HOST,
// 			service: process.env.SERVICE,
// 			port: Number(process.env.EMAIL_PORT),
// 			secure: Boolean(process.env.SECURE),
// 			auth: {
// 				user: process.env.USER,
// 				pass: process.env.PASS,
// 			},
// 		});

// 		await transporter.sendMail({
// 			from: process.env.USER,
// 			to: email,
// 			subject: subject,
// 			text: text,
// 		});
// 		console.log("email sent successfully");
// 	} catch (error) {
// 		console.log("email not sent!");
// 		console.log(error);
// 		return error;
// 	}
// };