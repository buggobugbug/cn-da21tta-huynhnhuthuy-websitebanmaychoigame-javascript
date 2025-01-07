import pool from '../config/db.js';
import bcrypt from 'bcrypt';
// Lấy danh sách người dùng
export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query(
            'SELECT ma_nguoi_dung, ten_dang_nhap, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh FROM nguoidung WHERE ma_vai_tro = 2'
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng.' });
    }
};

// Thêm người dùng
export const addUser = async (req, res) => {
    const { ten_dang_nhap, mat_khau, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO nguoidung (ten_dang_nhap, mat_khau, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh, ma_vai_tro) VALUES (?, ?, ?, ?, ?, ?, ?, 2)',
            [ten_dang_nhap, mat_khau, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh]
        );
        res.status(201).json({ message: 'Thêm người dùng thành công!', ma_nguoi_dung: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi thêm người dùng.' });
    }
};

// Sửa thông tin người dùng
export const updateUser = async (req, res) => {
    const { ma_nguoi_dung } = req.params;
    const { ten_dang_nhap, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh } = req.body;
    try {
        await pool.query(
            'UPDATE nguoidung SET ten_dang_nhap = ?, so_dien_thoai = ?, dia_chi = ?, ho_ten = ?, gioi_tinh = ?, ngay_sinh = ? WHERE ma_nguoi_dung = ? AND ma_vai_tro = 2',
            [ten_dang_nhap, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh, ma_nguoi_dung]
        );
        res.json({ message: 'Cập nhật người dùng thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật người dùng.' });
    }
};

// Lấy thông tin người dùng
export const getUserById = async (req, res) => {
    const { ma_nguoi_dung } = req.params;
    try {
        const [rows] = await pool.query(
            'SELECT ma_nguoi_dung, ten_dang_nhap, so_dien_thoai, dia_chi, ho_ten, gioi_tinh, ngay_sinh FROM nguoidung WHERE ma_nguoi_dung = ? AND ma_vai_tro = 2',
            [ma_nguoi_dung]
        );
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy thông tin người dùng.' });
    }
};



export const deleteUser = async (req, res) => {
    const { ma_nguoi_dung } = req.params;
    try {
        await pool.query('DELETE FROM nguoidung WHERE ma_nguoi_dung = ? AND ma_vai_tro = 2', [ma_nguoi_dung]);
        res.json({ message: 'Xóa người dùng thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa người dùng.' });
    }
};

// đổi mật khẩu
export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id; // Lấy id người dùng từ middleware xác thực

    try {
        // Lấy mật khẩu hiện tại của người dùng từ cơ sở dữ liệu
        const [user] = await pool.execute('SELECT mat_khau FROM NguoiDung WHERE ma_nguoi_dung = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Người dùng không tồn tại!' });
        }

        // Kiểm tra mật khẩu hiện tại có đúng không
        const isMatch = await bcrypt.compare(currentPassword, user[0].mat_khau);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu hiện tại không đúng!' });
        }

        // Mã hóa mật khẩu mới
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu mới trong cơ sở dữ liệu
        await pool.execute('UPDATE NguoiDung SET mat_khau = ? WHERE ma_nguoi_dung = ?', [hashedPassword, userId]);

        res.status(200).json({ message: 'Đổi mật khẩu thành công!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
