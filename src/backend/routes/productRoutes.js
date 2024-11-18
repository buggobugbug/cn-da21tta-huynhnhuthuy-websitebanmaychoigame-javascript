const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../midleware/authMiddleware');

// Lấy danh sách tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Thêm sản phẩm mới (chỉ Admin)
router.post('/', verifyToken, isAdmin, productController.createProduct);

// Cập nhật sản phẩm (chỉ Admin)
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// Xóa sản phẩm (chỉ Admin)
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
