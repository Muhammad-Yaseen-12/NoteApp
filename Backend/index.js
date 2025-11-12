import express from 'express';
import cors from 'cors';
const app = express();
import 'dotenv/config';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import notesRoutes from './src/routes/notesRoutes.js';
import dbConnect from './src/config/db.js';
import cookieParser from 'cookie-parser';
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser());
dbConnect();
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', notesRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});