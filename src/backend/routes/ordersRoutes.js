import express from 'express';
import { createOrder, getOrderDetails, confirmPayment, getOrdersByUser, getOrdersForAdmin, updateOrderStatus, deleteOrder } from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tạo đơn hàng
router.post('/', verifyToken, createOrder);

// Lấy thông tin chi tiết đơn hàng
router.get('/:orderId', verifyToken, getOrderDetails);

// Xác nhận thanh toán
router.put('/payment/:orderId', verifyToken, confirmPayment);

router.get('/', verifyToken, getOrdersByUser);

router.get('/admin/orders', verifyToken, isAdmin, getOrdersForAdmin);

// Cập nhật trạng thái đơn hàng
router.put('/admin/orders/:orderId', verifyToken, isAdmin, updateOrderStatus);

// Xóa đơn hàng
router.delete('/admin/orders/:orderId', verifyToken, isAdmin, deleteOrder);


export default router;
