const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../midleware/authMiddleware');

// Lấy giỏ hàng của người dùng
router.get('/:userId', verifyToken, cartController.getUserCart);

// Thêm sản phẩm vào giỏ hàng
router.post('/', verifyToken, cartController.addToCart);

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/:cartId', verifyToken, cartController.updateCart);

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:cartId', verifyToken, cartController.deleteCartItem);

module.exports = router;
