const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // Kiểm tra xem header có tồn tại không
    if (!authHeader) return res.status(403).json({ error: 'Token không được cung cấp!' });

    // Tách token từ header
    const token = authHeader.split(' ')[1]; // Bỏ từ "Bearer"

    if (!token) return res.status(403).json({ error: 'Token không hợp lệ!' });

    try {
        const decoded = jwt.verify(token, 'secretkey'); // Thay 'secretkey' bằng chuỗi bí mật của bạn
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};
