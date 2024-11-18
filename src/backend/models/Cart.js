const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

// Các API cho giỏ hàng
router.get('/:userId', verifyToken, cartController.getUserCart);
router.post('/', verifyToken, cartController.addToCart);
router.put('/:cartId', verifyToken, cartController.updateCart);
router.delete('/:cartId', verifyToken, cartController.deleteCartItem);

module.exports = router;
