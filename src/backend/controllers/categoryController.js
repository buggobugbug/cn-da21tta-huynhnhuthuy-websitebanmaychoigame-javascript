import pool from '../config/db.js';

// Lấy tất cả danh mục
export const getCategories = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM danhmucsanpham');
        res.json(rows);
    } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
        res.status(500).json({ message: 'Lỗi khi lấy danh mục.' });
    }
};

// Thêm danh mục
export const addCategory = async (req, res) => {
    const { ten_danh_muc } = req.body;

    if (!ten_danh_muc) {
        return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
    }

    try {
        const [result] = await pool.query('INSERT INTO danhmucsanpham (ten_danh_muc) VALUES (?)', [ten_danh_muc]);
        res.status(201).json({ message: 'Thêm danh mục thành công!', id: result.insertId });
    } catch (error) {
        console.error('Lỗi khi thêm danh mục:', error);
        res.status(500).json({ message: 'Lỗi khi thêm danh mục.' });
    }
};

// Sửa danh mục
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { ten_danh_muc } = req.body;

    if (!ten_danh_muc) {
        return res.status(400).json({ message: 'Tên danh mục là bắt buộc.' });
    }

    try {
        const [result] = await pool.query('UPDATE danhmucsanpham SET ten_danh_muc = ? WHERE ma_danh_muc = ?', [ten_danh_muc, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }
        res.json({ message: 'Cập nhật danh mục thành công!' });
    } catch (error) {
        console.error('Lỗi khi cập nhật danh mục:', error);
        res.status(500).json({ message: 'Lỗi khi cập nhật danh mục.' });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM danhmucsanpham WHERE ma_danh_muc = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy danh mục.' });
        }
        res.json({ message: 'Xóa danh mục thành công!' });
    } catch (error) {
        console.error('Lỗi khi xóa danh mục:', error);
        res.status(500).json({ message: 'Lỗi khi xóa danh mục.' });
    }
};
