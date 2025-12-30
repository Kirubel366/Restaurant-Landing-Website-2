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
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send("Welcome Home!")
});

app.use("/api/menuitems", menuItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/settings", settingsRoutes);

app.post("/api/sendemail", async (req, res) => {
    const { name, email, message } = req.body
    if (!name || !email || !message) {
        return res.status(400).json({ message: "All fields are required!" })
    }

    const result = await sendEmail({
        from: email,
        to: "kirubeld.21@gmail.com",
        subject: `New Contact Form Submission from ${name}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `,
    })

    if (result.success) {
        res.status(200).json({ message: "Email sent successfully!" })
    } else {
        res.status(500).json({ message: "Error sending email." })
    }
})

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
