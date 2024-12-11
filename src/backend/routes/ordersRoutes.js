import express from 'express';
import { createOrder, getOrderDetails, confirmPayment, getOrdersByUser } from '../controllers/orderController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tạo đơn hàng
router.post('/', verifyToken, createOrder);

// Lấy thông tin chi tiết đơn hàng
router.get('/:orderId', verifyToken, getOrderDetails);

// Xác nhận thanh toán
router.put('/payment/:orderId', verifyToken, confirmPayment);

router.get('/', verifyToken, getOrdersByUser);


export default router;
