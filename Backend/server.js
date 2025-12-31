import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import settingsRoutes from './routes/settings.js';
import {connectDB} from "./src/lib/db.js"
import { sendEmail } from "./src/lib/utils.js";
import menuItemRoutes from "./src/routes/menuItemRoutes.js";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import settingsRoutes from "./src/routes/settingsRoutes.js";

dotenv.config();

const app = express();
app.use(cors({
    // Fallback to the string if the ENV isn't loading correctly for a second
    origin: process.env.FRONTEND_URL || "https://restaurant-landing-website-2.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Welcome Home!")
});

app.use("/api/menuitems", menuItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/settings", settingsRoutes);

app.post("/api/sendemail", async (req, res) => {
    try {
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const result = await sendEmail({
            from: process.env.EMAIL_USER, // Gmail requires 'from' to be the authenticated user
            to: "kirubeld.21@gmail.com",
            replyTo: email, // Put the user's email here so you can reply to them
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });

        if (result.success) {
            return res.status(200).json({ message: "Email sent successfully!" });
        } else {
            // Log the actual error to Render logs
            console.error("Email Result Error:", result.error);
            return res.status(500).json({ message: "Error sending email." });
        }
    } catch (error) {
        console.error("Route Crash Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
