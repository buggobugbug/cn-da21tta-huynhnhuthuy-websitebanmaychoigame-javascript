const db = require('../config/db');
const bcrypt = require('bcrypt');


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


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { ho_ten, dia_chi, vai_tro, email, mat_khau } = req.body;

    console.log('Thông tin nhận được:', req.body);

    try {
        // Kiểm tra nếu email đã tồn tại
        if (email) {
            console.log('Kiểm tra email:', email);
            const [existingUser] = await db.promise().query('SELECT * FROM nguoi_dung WHERE email = ? AND id != ?', [email, id]);
            console.log('Kết quả kiểm tra email:', existingUser);

            if (existingUser.length > 0) {
                return res.status(400).json({ error: 'Email đã được sử dụng!' });
            }
        }

        let hashedPassword;
        if (mat_khau) {
            console.log('Mã hóa mật khẩu mới');
            hashedPassword = await bcrypt.hash(mat_khau, 10);
        }

        console.log('Cập nhật thông tin người dùng');
        const [result] = await db.promise().query(
            'UPDATE nguoi_dung SET ho_ten = ?, dia_chi = ?, vai_tro = ?, email = ?, mat_khau = ? WHERE id = ?',
            [ho_ten, dia_chi, vai_tro, email || null, hashedPassword || null, id]
        );

        console.log('Kết quả cập nhật:', result);
        res.json({ message: 'Cập nhật thông tin người dùng thành công' });
    } catch (err) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
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

