const db = require('../config/db');

// Lấy danh sách tất cả sản phẩm
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM san_pham', (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
        res.json(results);
    });
};

// Thêm sản phẩm mới
exports.createProduct = (req, res) => {
    const { ten_san_pham, gia, mo_ta, hinh_anh, so_luong, id_thuong_hieu } = req.body;

    if (!ten_san_pham || !gia || !so_luong || !id_thuong_hieu) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm!' });
    }

    const newProduct = { ten_san_pham, gia, mo_ta, hinh_anh, so_luong, id_thuong_hieu };
    db.query('INSERT INTO san_pham SET ?', newProduct, (err, result) => {
        if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
        res.status(201).json({ message: 'Sản phẩm đã được thêm thành công', productId: result.insertId });
    });
};

// Cập nhật sản phẩm
exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { ten_san_pham, gia, mo_ta, hinh_anh, so_luong, id_thuong_hieu } = req.body;

    db.query(
        'UPDATE san_pham SET ten_san_pham = ?, gia = ?, mo_ta = ?, hinh_anh = ?, so_luong = ?, id_thuong_hieu = ? WHERE id = ?',
        [ten_san_pham, gia, mo_ta, hinh_anh, so_luong, id_thuong_hieu, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
            res.json({ message: 'Cập nhật sản phẩm thành công' });
        }
    );
};

// Xóa sản phẩm
exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM san_pham WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
        res.json({ message: 'Xóa sản phẩm thành công' });
    });
};
