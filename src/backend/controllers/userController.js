const db = require('../config/db');

exports.getAllUsers = (req, res) => {
    db.query('SELECT * FROM nguoi_dung', (err, results) => {
        if (err) {
            console.error('Lỗi truy vấn:', err); // Debug lỗi
            return res.status(500).json({ error: 'Không thể lấy danh sách người dùng!' });
        }
        res.json(results);
    });
};


exports.getUserById = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ!' });
    }

    db.query('SELECT * FROM nguoi_dung WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn:', err); // Debug lỗi
            return res.status(500).json({ error: 'Không thể lấy thông tin người dùng!' });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: 'Người dùng không tồn tại!' });
        }

        res.json(result[0]);
    });
};


exports.updateUser = (req, res) => {
    const { id } = req.params;
    const { ho_ten, dia_chi, trang_thai } = req.body;

    if (!id || !ho_ten || !dia_chi || trang_thai === undefined) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin!' });
    }

    db.query(
        'UPDATE nguoi_dung SET ho_ten = ?, dia_chi = ?, trang_thai = ? WHERE id = ?',
        [ho_ten, dia_chi, trang_thai, id],
        (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn:', err); // Debug lỗi
                return res.status(500).json({ error: 'Không thể cập nhật người dùng!' });
            }

            res.json({ message: 'Cập nhật người dùng thành công!' });
        }
    );
};

exports.deleteUser = (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ!' });
    }

    db.query('DELETE FROM nguoi_dung WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Lỗi truy vấn:', err); // Debug lỗi
            return res.status(500).json({ error: 'Không thể xóa người dùng!' });
        }

        res.json({ message: 'Xóa người dùng thành công!' });
    });
};

