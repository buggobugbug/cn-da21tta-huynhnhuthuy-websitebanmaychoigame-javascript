const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Đăng ký người dùng mới
exports.register = async (req, res) => {
    const { mat_khau, email, vai_tro, ho_ten, dia_chi } = req.body;

    if (!mat_khau || !email || !vai_tro || !ho_ten || !dia_chi) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin!' });
    }

    try {
        // Kiểm tra nếu email đã tồn tại
        const [existingUser] = await db.promise().query('SELECT * FROM nguoi_dung WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Email đã tồn tại!' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(mat_khau, 10);

        // Chèn người dùng mới
        const newUser = {
            mat_khau: hashedPassword,
            email,
            vai_tro,
            ho_ten,
            dia_chi,
            trang_thai: true
        };

        const [result] = await db.promise().query('INSERT INTO nguoi_dung SET ?', newUser);
        res.status(201).json({ message: 'Đăng ký thành công!', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};

// Đăng nhập người dùng
// Đăng nhập người dùng
exports.login = async (req, res) => {
    const { email, mat_khau } = req.body;

    if (!email || !mat_khau) {
        return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin!' });
    }

    try {
        // Kiểm tra xem email có tồn tại không
        const [users] = await db.promise().query('SELECT * FROM nguoi_dung WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(400).json({ error: 'Email không tồn tại!' });
        }

        const user = users[0];

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
        if (!isMatch) {
            return res.status(400).json({ error: 'Mật khẩu không đúng!' });
        }

        // Tạo token JWT
        const token = jwt.sign({ id: user.id, vai_tro: user.vai_tro }, 'secretkey', { expiresIn: '1h' });

        res.json({ message: 'Đăng nhập thành công!', token });
    } catch (err) {
        console.error('Lỗi đăng nhập:', err);
        res.status(500).json({ error: 'Lỗi máy chủ' });
    }
};
