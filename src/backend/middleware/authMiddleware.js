import jwt from 'jsonwebtoken';
import { promisify } from 'util';


// Middleware xác thực token
export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Lấy token từ header
    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {
        // Giải mã token và kiểm tra
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded; // Lưu thông tin user vào req để dùng sau

        // Kiểm tra xem dữ liệu đã được giải mã có hợp lệ không
        if (!req.user || !req.user.ma_vai_tro) {
            return res.status(403).json({ message: 'Invalid token data.' });
        }

        next(); // Tiếp tục với các middleware khác hoặc route handler
    } catch (error) {
        console.error('Token error:', error); // Để debug lỗi
        res.status(403).json({ message: 'Invalid token.' });
    }
};

// Middleware kiểm tra vai trò admin
export const isAdmin = (req, res, next) => {
    console.log(req.user);  // Kiểm tra thông tin user
    const { ma_vai_tro } = req.user;
    if (ma_vai_tro !== 1) { // Kiểm tra nếu không phải admin
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Cho phép tiếp tục nếu là admin
};
