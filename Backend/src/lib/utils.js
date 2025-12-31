import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();

export const sendEmail = async ({ to, subject, html, replyTo }) => {
    // 1. Create transporter manually (Avoid 'service: gmail')
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 2525,
        secure: false, // true for 465, false for 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        // Helpful for cloud deployments to prevent handshake timeouts
        tls: {
            rejectUnauthorized: false
        }
    });

    try {
        // 2. Wrap in a Promise to handle the async nature of Nodemailer
        return await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: `"Restaurant Contact" <${process.env.EMAIL_USER}>`,
                to,
                replyTo, // The customer's email
                subject,
                html,
            }, (err, info) => {
                if (err) {
                    console.error("Nodemailer Error:", err.message);
                    resolve({ success: false, error: err.message });
                } else {
                    console.log("Email sent successfully:", info.response);
                    resolve({ success: true });
                }
            });
        });
    } catch (error) {
        console.error("Transporter Catch Error:", error.message);
        return { success: false, error: error.message };
    }
};