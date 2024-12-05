import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';


export const register = async (req, res) => {
    const { ten_dang_nhap, mat_khau, so_dien_thoai, dia_chi, ma_vai_tro } = req.body;

    // Nếu không có vai trò trong yêu cầu, mặc định sẽ là 2 (người dùng bình thường)
    const role = ma_vai_tro || 2;

    try {
        // Kiểm tra tên đăng nhập đã tồn tại chưa
        const [existingUser] = await pool.execute('SELECT * FROM NguoiDung WHERE ten_dang_nhap = ?', [ten_dang_nhap]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại!' });
        }

        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(mat_khau, 10);

        // Lưu người dùng mới vào cơ sở dữ liệu
        await pool.execute(
            'INSERT INTO NguoiDung (ten_dang_nhap , mat_khau, so_dien_thoai, dia_chi, ma_vai_tro) VALUES (?, ?, ?, ?, ?)',
            [ten_dang_nhap, hashedPassword, so_dien_thoai, dia_chi, role]
        );

        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



export const login = async (req, res) => {
    const { ten_dang_nhap, mat_khau } = req.body;

    try {

        const [user] = await pool.execute('SELECT * FROM NguoiDung WHERE ten_dang_nhap = ?', [ten_dang_nhap]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại!' });
        }


        const isMatch = await bcrypt.compare(mat_khau, user[0].mat_khau);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mật khẩu không đúng!' });
        }


        const token = jwt.sign(
            { id: user[0].ma_nguoi_dung, ten_dang_nhap: user[0].ten_dang_nhap, ma_vai_tro: user[0].ma_vai_tro },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );



        res.status(200).json({
            message: 'Đăng nhập thành công!',
            token,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
