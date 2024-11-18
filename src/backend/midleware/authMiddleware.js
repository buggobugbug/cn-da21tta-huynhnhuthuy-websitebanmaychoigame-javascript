const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ error: 'Token không được cung cấp!' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(403).json({ error: 'Token không hợp lệ!' });

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token không hợp lệ!' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.vai_tro !== 'admin') {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập!' });
    }
    next();
};
