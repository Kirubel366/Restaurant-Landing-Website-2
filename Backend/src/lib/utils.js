import nodemailer from "nodemailer"
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

export const sendEmail = async ({ from, to, subject, html, bcc }) => {
    try {
        await transporter.sendMail({ from, to, bcc, subject, html })
        return { success: true }
    } catch (error) {
        console.error("Error sending email:", error.message)
        return { success: false, error }
    }
}