const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// Thiết lập lưu trữ hình ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/'; // Thư mục lưu trữ file
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // Tạo thư mục nếu chưa có
        }
        cb(null, uploadPath); // Lưu vào thư mục này
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); // Lấy đuôi file
        const fileName = Date.now() + ext; // Đặt tên file là thời gian hiện tại + đuôi file
        cb(null, fileName); // Tên file lưu
    }
});

const upload = multer({ storage: storage });

// Lấy danh sách tất cả sản phẩm
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM san_pham', (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
        res.json(results);
    });
};

// Lấy sản phẩm theo ID
exports.getProductById = (req, res) => {
    const { id } = req.params; // Lấy ID từ tham số route

    db.query('SELECT * FROM san_pham WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Lỗi máy chủ' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại!' });
        }

        res.json(results[0]); // Trả về sản phẩm theo ID
    });
};

// Thêm sản phẩm mới
exports.createProduct = [
    upload.single('hinh_anh'), // Sử dụng multer để xử lý file tải lên (hình ảnh)
    (req, res) => {
        const { ten_san_pham, gia, mo_ta, so_luong, id_thuong_hieu } = req.body;
        const hinh_anh = req.file ? req.file.filename : null; // Lấy tên file ảnh từ req.file (được xử lý bởi multer)

        if (!ten_san_pham || !gia || !so_luong || !id_thuong_hieu) {
            return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin sản phẩm!' });
        }

        // Xây dựng đường dẫn hình ảnh hoàn chỉnh
        const imageUrl = hinh_anh ? `${req.protocol}://${req.get('host')}/uploads/${hinh_anh}` : null;

        const newProduct = {
            ten_san_pham,
            gia,
            mo_ta,
            hinh_anh: imageUrl, // Lưu đường dẫn ảnh
            so_luong,
            id_thuong_hieu
        };

        db.query('INSERT INTO san_pham SET ?', newProduct, (err, result) => {
            if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
            res.status(201).json({
                message: 'Sản phẩm đã được thêm thành công',
                productId: result.insertId,
                product: { ...newProduct, id: result.insertId } // Trả lại thông tin sản phẩm đã được thêm, bao gồm đường dẫn hình ảnh
            });
        });
    }
];

// Cập nhật sản phẩm
exports.updateProduct = [
    upload.single('hinh_anh'), // Xử lý tải lên hình ảnh
    (req, res) => {
        const { id } = req.params;
        const { ten_san_pham, gia, mo_ta, so_luong, id_thuong_hieu } = req.body;
        const hinh_anh = req.file ? req.file.filename : null; // Lấy tên file hình ảnh từ multer nếu có

        const updatedProduct = {
            ten_san_pham, 
            gia, 
            mo_ta, 
            so_luong, 
            id_thuong_hieu,
            ...(hinh_anh && { hinh_anh }) // Nếu có hình ảnh mới, cập nhật
        };

        db.query('UPDATE san_pham SET ? WHERE id = ?', [updatedProduct, id], (err, result) => {
            if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
            res.status(200).json({
                message: 'Cập nhật sản phẩm thành công'
            });
        });
    }
];

// Xóa sản phẩm
exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM san_pham WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Lỗi máy chủ' });
        res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
    });
};
