exports.createOrder = async (req, res) => {
    const { id_nguoi_dung } = req.body;

    try {
        // Lấy các mục trong giỏ hàng của người dùng
        const [cartItems] = await db.promise().query(
            'SELECT * FROM gio_hang WHERE id_nguoi_dung = ?',
            [id_nguoi_dung]
        );

        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'Giỏ hàng trống' });
        }

        // Tính tổng giá trị đơn hàng
        let tongGia = 0;
        cartItems.forEach(item => {
            tongGia += item.so_luong * 1000; // Thay 1000 bằng giá sản phẩm thật nếu có
        });

        // Tạo đơn hàng mới
        const [orderResult] = await db.promise().query(
            'INSERT INTO don_hang (id_nguoi_dung, tong_gia) VALUES (?, ?)',
            [id_nguoi_dung, tongGia]
        );

        const id_don_hang = orderResult.insertId;

        // Thêm chi tiết đơn hàng
        for (let item of cartItems) {
            await db.promise().query(
                'INSERT INTO chi_tiet_don_hang (id_don_hang, id_san_pham, so_luong, gia) VALUES (?, ?, ?, ?)',
                [id_don_hang, item.id_san_pham, item.so_luong, 1000] // Thay 1000 bằng giá sản phẩm thật nếu có
            );
        }

        // Xóa giỏ hàng sau khi tạo đơn hàng
        await db.promise().query('DELETE FROM gio_hang WHERE id_nguoi_dung = ?', [id_nguoi_dung]);

        res.json({ message: 'Tạo đơn hàng thành công', id_don_hang });
    } catch (err) {
        console.error('Lỗi khi tạo đơn hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

exports.getOrdersByUser = async (req, res) => {
    const { id_nguoi_dung } = req.params;

    try {
        const [orders] = await db.promise().query(
            'SELECT * FROM don_hang WHERE id_nguoi_dung = ?',
            [id_nguoi_dung]
        );

        res.json(orders);
    } catch (err) {
        console.error('Lỗi khi lấy danh sách đơn hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};
exports.updateOrderStatus = async (req, res) => {
    const { id_don_hang } = req.params;
    const { trang_thai } = req.body;

    try {
        const [result] = await db.promise().query(
            'UPDATE don_hang SET trang_thai = ? WHERE id = ?',
            [trang_thai, id_don_hang]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy đơn hàng cần cập nhật' });
        }

        res.json({ message: 'Cập nhật trạng thái đơn hàng thành công' });
    } catch (err) {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};
