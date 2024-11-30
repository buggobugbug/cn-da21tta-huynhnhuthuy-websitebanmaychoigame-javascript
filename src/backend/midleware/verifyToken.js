const jwt = require('jsonwebtoken');

// Middleware để xác thực token
exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: 'Token không được cung cấp!' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Token không hợp lệ!' });

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded; // Lưu thông tin người dùng vào request
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token không hợp lệ!' });
    }
};
