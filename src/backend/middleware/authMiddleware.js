import jwt from 'jsonwebtoken';
import { promisify } from 'util';



// Middleware xác thực token
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Tách lấy token từ header
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Giải mã token và kiểm tra
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào req để dùng sau
        next(); // Tiếp tục với các middleware khác hoặc route handler
    } catch (error) {
        console.error('Token error:', error.message); // Debug lỗi
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Middleware kiểm tra vai trò admin
export const isAdmin = (req, res, next) => {
    const { ma_vai_tro } = req.user;
    if (ma_vai_tro !== 1) { // Kiểm tra nếu không phải admin
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Cho phép tiếp tục nếu là admin
};
