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
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
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
    const { name, email, message } = req.body;
    
    // Call the updated sendEmail function
    const result = await sendEmail({ name, email, message });

    if (result.success) {
        res.status(200).json({ message: "Email sent successfully!" });
    } else {
        res.status(500).json({ message: "Error sending email.", error: result.error });
    }
});

const PORT = process.env.PORT || 5000;
connectDB();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
