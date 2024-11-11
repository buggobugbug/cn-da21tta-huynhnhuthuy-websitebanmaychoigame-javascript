// Import các module cần thiết
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Khởi tạo ứng dụng Express
const app = express();

// Load biến môi trường từ file .env
dotenv.config();

// Middleware
app.use(cors()); // Sử dụng middleware cors để cho phép CORS
app.use(express.json()); // Để parse dữ liệu JSON từ body request

// Route mặc định
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Thiết lập cổng từ biến môi trường hoặc sử dụng cổng mặc định 4000
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
