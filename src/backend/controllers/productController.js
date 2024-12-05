import db from '../config/db.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Cấu hình lưu trữ hình ảnh với multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/products/';
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
        const result = await db.query('SELECT * FROM SanPham');
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách sản phẩm', error });
    }
};

// API Lấy sản phẩm theo ID
export const getProductById = async (req, res) => {
    const { ma_san_pham } = req.params;

    try {
        const result = await db.query('SELECT * FROM SanPham WHERE ma_san_pham = ?', [ma_san_pham]);
        if (result.length > 0) {
            res.json(result[0]); // Trả về sản phẩm đầu tiên nếu tìm thấy
        } else {
            res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy sản phẩm', error });
    }
};


// API Thêm sản phẩm
export const createProduct = [
    upload.single('hinh_anh'), // Xử lý tải lên hình ảnh
    async (req, res) => {
        // Kiểm tra quyền Admin (verifyToken đã được gọi ở đâu đó trước đó)
        if (!req.user || req.user.ma_vai_tro !== 1) {
            return res.status(403).json({ message: 'Không có quyền truy cập' });
        }

        const { ten_san_pham, mo_ta, gia, ma_danh_muc } = req.body;
        const hinh_anh = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const result = await db.query(
                `INSERT INTO SanPham (ten_san_pham, mo_ta, gia, ma_danh_muc, hinh_anh) VALUES (?, ?, ?, ?, ?)`,
                [ten_san_pham, mo_ta, gia, ma_danh_muc, hinh_anh]
            );
            res.status(201).json({ message: 'Sản phẩm đã được thêm thành công!' });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error });
        }
    }
];

// API Sửa sản phẩm
export const updateProduct = async (req, res) => {
    // Kiểm tra quyền Admin
    if (!req.user || req.user.ma_vai_tro !== 1) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    const { ma_san_pham, ten_san_pham, mo_ta, gia, ma_danh_muc } = req.body;
    let hinh_anh = req.body.hinh_anh;

    // Nếu có tệp hình ảnh mới, xử lý việc tải lên
    if (req.file) {
        hinh_anh = `/uploads/${req.file.filename}`;
    }

    try {
        const result = await db.query(
            `UPDATE SanPham SET ten_san_pham = ?, mo_ta = ?, gia = ?, ma_danh_muc = ?, hinh_anh = ? WHERE ma_san_pham = ?`,
            [ten_san_pham, mo_ta, gia, ma_danh_muc, hinh_anh, ma_san_pham]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Sản phẩm đã được cập nhật thành công!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật sản phẩm', error });
    }
};

// API Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    // Kiểm tra quyền Admin
    if (!req.user || req.user.ma_vai_tro !== 1) {
        return res.status(403).json({ message: 'Không có quyền truy cập' });
    }

    const { ma_san_pham } = req.params;

    try {
        const result = await db.query(
            `DELETE FROM SanPham WHERE ma_san_pham = ?`,
            [ma_san_pham]
        );
        if (result.affectedRows > 0) {
            res.json({ message: 'Sản phẩm đã được xóa thành công!' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi xóa sản phẩm', error });
    }
};
