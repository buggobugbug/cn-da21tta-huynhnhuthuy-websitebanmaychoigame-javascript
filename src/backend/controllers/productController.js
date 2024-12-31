import pool from '../config/db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Cấu hình lưu trữ hình ảnh với multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const filename = Date.now() + fileExtension;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

// API Lấy tất cả sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        // Chỉ lấy sản phẩm chưa bị xóa (is_deleted = 0)
        const [rows] = await pool.query('SELECT * FROM SanPham WHERE is_deleted = 0');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Không có sản phẩm nào' });
        }
        res.json(rows);
    } catch (error) {
        console.error('Lỗi getAllProducts:', error); // In toàn bộ lỗi
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error: error.message });
    }
};

// API Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    const { ma_san_pham } = req.params;

    try {
        const [rows] = await pool.query('SELECT * FROM SanPham WHERE ma_san_pham = ? AND is_deleted = 0', [ma_san_pham]);
        if (rows.length > 0) {
            return res.json(rows[0]); // Trả về sản phẩm đầu tiên nếu tìm thấy
        } else {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
    } catch (error) {
        console.error('Lỗi getProductById:', error);
        res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error: error.message });
    }
};

// API Thêm sản phẩm
export const createProduct = [
    upload.single('hinh_anh'), // Xử lý tải lên hình ảnh
    async (req, res) => {
        if (!req.user || req.user.ma_vai_tro !== 1) {
            return res.status(403).json({ message: 'Không có quyền truy cập' });
        }

        const { ten_san_pham, mo_ta, gia, ma_danh_muc, so_luong } = req.body;
        const hinh_anh = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            await pool.query(
                `INSERT INTO SanPham (ten_san_pham, mo_ta, gia, ma_danh_muc, so_luong, hinh_anh, is_deleted) VALUES (?, ?, ?, ?, ?, ?, 0)`,
                [ten_san_pham, mo_ta, gia, ma_danh_muc, so_luong, hinh_anh]
            );
            res.status(201).json({ message: 'Sản phẩm đã được thêm thành công!' });
        } catch (error) {
            console.error('Error inserting product:', error);
            res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error });
        }
    }
];

// API Sửa sản phẩm
export const updateProduct = [
    upload.single('hinh_anh'),
    async (req, res) => {
        if (!req.user || req.user.ma_vai_tro !== 1) {
            return res.status(403).json({ message: 'Không có quyền truy cập' });
        }

        const { ma_san_pham } = req.params;
        const { ten_san_pham, mo_ta, gia, ma_danh_muc, so_luong } = req.body;
        let hinh_anh = req.body.hinh_anh; // Giữ hình ảnh cũ nếu không có file mới
        if (req.file) {
            hinh_anh = `/uploads/${req.file.filename}`;
        }

        try {
            const [result] = await pool.query(
                `UPDATE SanPham SET ten_san_pham = ?, mo_ta = ?, gia = ?, ma_danh_muc = ?, so_luong = ?, hinh_anh = ? WHERE ma_san_pham = ? AND is_deleted = 0`,
                [ten_san_pham, mo_ta, gia, ma_danh_muc, so_luong, hinh_anh, ma_san_pham]
            );

            if (result.affectedRows > 0) {
                res.json({ message: 'Sản phẩm đã được cập nhật thành công!' });
            } else {
                res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
            }
        } catch (error) {
            console.error('Lỗi updateProduct:', error);
            res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error: error.message });
        }
    }
];

// API Xóa sản phẩm (Soft Delete)
export const deleteProduct = async (req, res) => {
    const { ma_san_pham } = req.params;

    try {
        const [result] = await pool.query(
            'UPDATE SanPham SET is_deleted = 1 WHERE ma_san_pham = ?',
            [ma_san_pham]
        );

        if (result.affectedRows > 0) {
            res.json({ message: 'Sản phẩm đã được đánh dấu là đã xóa!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm.' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm.' });
    }
};
