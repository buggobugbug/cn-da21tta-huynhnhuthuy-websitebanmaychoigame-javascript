import express from 'express';
import { verifyToken, isAdmin } from '../middleware/authMiddleware.js';  // Đảm bảo rằng bạn có middleware kiểm tra token và quyền admin
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

// Middleware để kiểm tra quyền Admin
router.use(verifyToken); // Kiểm tra người dùng đã đăng nhập hay chưa

// Routes cho quản lý sản phẩm
router.post('/add', verifyToken ,isAdmin, createProduct);   // Thêm sản phẩm (chỉ admin)
router.get('/', getAllProducts);                  // Lấy tất cả sản phẩm (cho cả admin và user)
router.get('/:id', getProductById);            // Lấy sản phẩm theo id (cho cả admin và user)
router.put('/:id', isAdmin, updateProduct);    // Sửa sản phẩm (chỉ admin)
router.delete('/:id', isAdmin, deleteProduct); // Xóa sản phẩm (chỉ admin)

export default router;
