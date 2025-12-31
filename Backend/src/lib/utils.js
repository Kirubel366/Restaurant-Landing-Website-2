import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Resend with your API Key
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ name, email, message }) => {
    try {
        const { data, error } = await resend.emails.send({
            // Note: Until you verify a domain, you MUST use 'onboarding@resend.dev'
            from: 'Restaurant <contact@blazemail.ai>', 
            to: ['kirubeld.21@gmail.com'], // Your inbox
            reply_to: email, // The customer's email
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                    <h2>New Message from ${name}</h2>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #f9f9f9; padding: 15px;">${message}</p>
                </div>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Connection Error:", err.message);
        return { success: false, error: err.message };
    }
};