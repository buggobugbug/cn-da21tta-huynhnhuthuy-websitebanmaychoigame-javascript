import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import { fileURLToPath } from 'url'; // Import fileURLToPath từ module 'url'
import { dirname } from 'path';   // Import dirname từ module 'path'
import path from 'path';  // Import module path

const __filename = fileURLToPath(import.meta.url); // Chuyển đổi import.meta.url thành đường dẫn file
const __dirname = dirname(__filename); // Lấy thư mục chứa file hiện tại

const app = express();

// Config env
dotenv.config();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',  // Địa chỉ của frontend
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true  // Cho phép gửi cookie
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Lắng nghe tại port
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
