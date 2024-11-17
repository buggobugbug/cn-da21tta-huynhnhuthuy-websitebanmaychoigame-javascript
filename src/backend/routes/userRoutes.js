const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Lấy tất cả người dùng
router.get('/', userController.getAllUsers);

// Lấy người dùng theo ID
router.get('/:id', userController.getUserById);

// Cập nhật người dùng
router.put('/:id', userController.updateUser);

// Xóa người dùng
router.delete('/:id', userController.deleteUser);

module.exports = router;
