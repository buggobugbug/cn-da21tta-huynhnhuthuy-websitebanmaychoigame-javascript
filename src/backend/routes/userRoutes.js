const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, isAdmin } = require('../midleware/authMiddleware');

// Lấy danh sách người dùng (Admin Only)
router.get('/', verifyToken, isAdmin, userController.getAllUsers);

router.put('/:id', verifyToken, isAdmin, userController.updateUser);

// Xóa người dùng (Admin Only)
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

module.exports = router;
