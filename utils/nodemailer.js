require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.node_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.node_USER,
        pass: process.env.node_PASS,
    },
});

const sendOTPVerificationEmail = async ({ email, otp }, res) => {

    // Send emails to users 
    let mailoption = {
        from: process.env.node_USER,
        to: email,
        subject: "Verify your email",
        html: `<p>Enter <h2>${otp}</h2> in the app verify your email address and complete</p>`,
    };

    return transporter.sendMail(mailoption);
};

module.exports = {
    sendOTPVerificationEmail
}