const db = require('../config/db');

// Lấy giỏ hàng của người dùng
exports.getUserCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const [cartItems] = await db.promise().query(
            'SELECT * FROM gio_hang WHERE id_nguoi_dung = ?',
            [userId]
        );

        if (cartItems.length === 0) {
            return res.status(404).json({ message: 'Giỏ hàng trống' });
        }

        res.json(cartItems);
    } catch (err) {
        console.error('Lỗi khi lấy giỏ hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

exports.addToCart = async (req, res) => {
    const { id_nguoi_dung, so_luong } = req.body;

    console.log('Thông tin nhận được:', req.body);

    // Kiểm tra dữ liệu đầu vào
    if (!id_nguoi_dung || !so_luong) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin!' });
    }

    try {
        // Kiểm tra nếu giỏ hàng đã có mục cho người dùng này
        const [existingCart] = await db.promise().query(
            'SELECT * FROM gio_hang WHERE id_nguoi_dung = ?',
            [id_nguoi_dung]
        );

        if (existingCart.length > 0) {
            // Nếu đã có mục, cập nhật số lượng và ngày cập nhật
            await db.promise().query(
                'UPDATE gio_hang SET so_luong = so_luong + ?, ngay_cap_nhat = NOW() WHERE id_nguoi_dung = ?',
                [so_luong, id_nguoi_dung]
            );
            return res.json({ message: 'Cập nhật giỏ hàng thành công' });
        }

        // Nếu chưa có, thêm mới
        const [result] = await db.promise().query(
            'INSERT INTO gio_hang (id_nguoi_dung, so_luong, ngay_cap_nhat) VALUES (?, ?, NOW())',
            [id_nguoi_dung, so_luong]
        );

        res.json({ message: 'Thêm vào giỏ hàng thành công', cartId: result.insertId });
    } catch (err) {
        console.error('Lỗi khi thêm vào giỏ hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

exports.updateCart = async (req, res) => {
    const { cartId } = req.params;
    const { so_luong } = req.body;

    if (!so_luong) {
        return res.status(400).json({ error: 'Vui lòng cung cấp số lượng!' });
    }

    try {
        const [result] = await db.promise().query(
            'UPDATE gio_hang SET so_luong = ?, ngay_cap_nhat = NOW() WHERE id = ?',
            [so_luong, cartId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy giỏ hàng cần cập nhật' });
        }

        res.json({ message: 'Cập nhật giỏ hàng thành công' });
    } catch (err) {
        console.error('Lỗi khi cập nhật giỏ hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};


exports.deleteCartItem = async (req, res) => {
    const { cartId } = req.params;

    try {
        const [result] = await db.promise().query('DELETE FROM gio_hang WHERE id = ?', [cartId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy mục cần xóa' });
        }

        res.json({ message: 'Xóa sản phẩm khỏi giỏ hàng thành công' });
    } catch (err) {
        console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};
