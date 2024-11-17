const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Kiểm tra xem các hàm có tồn tại hay không
console.log(authController);

// Đăng ký
router.post('/register', authController.register);

// Đăng nhập
router.post('/login', authController.login);

module.exports = router;
