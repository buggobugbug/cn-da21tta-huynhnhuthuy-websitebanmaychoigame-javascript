import express from 'express';
import { getUsers, addUser, updateUser, deleteUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.get('/users', getUsers); // Lấy danh sách người dùng
router.post('/users', addUser); // Thêm người dùng
router.put('/users/:ma_nguoi_dung', updateUser); // Sửa người dùng
router.delete('/users/:ma_nguoi_dung', deleteUser); // Xóa người dùng
router.get('/users/:ma_nguoi_dung', getUserById); // Lấy thông tin người dùng

export default router;
