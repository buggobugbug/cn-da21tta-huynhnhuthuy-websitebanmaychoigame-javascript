// Middleware để kiểm tra quyền admin
exports.isAdmin = (req, res, next) => {
    if (req.user.vai_tro !== 'admin') {
        return res.status(403).json({ error: 'Bạn không có quyền truy cập!' });
    }
    next();
};
