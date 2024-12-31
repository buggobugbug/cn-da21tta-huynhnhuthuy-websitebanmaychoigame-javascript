import pool from '../config/db.js';

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