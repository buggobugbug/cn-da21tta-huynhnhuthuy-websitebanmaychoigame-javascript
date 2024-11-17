const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { verifyToken, isAdmin } = require('../midleware/authMiddleware');

// Lấy danh sách tất cả sản phẩm
router.get('/', productController.getAllProducts);

// Lấy sản phẩm theo ID
router.get('/:id', productController.getProductById);

// Thêm sản phẩm (Chỉ Admin)
router.post('/', verifyToken, isAdmin, productController.createProduct);

// Cập nhật sản phẩm (Chỉ Admin)
router.put('/:id', verifyToken, isAdmin, productController.updateProduct);

// Xóa sản phẩm (Chỉ Admin)
router.delete('/:id', verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
