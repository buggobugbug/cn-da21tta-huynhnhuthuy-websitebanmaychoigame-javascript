const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Thay bằng mật khẩu của bạn
    database: 'csdlbanmaychoigame',
});

db.connect((err) => {
    if (err) {
        console.error('Lỗi kết nối MySQL:', err); // Debug lỗi
        process.exit(1); // Thoát nếu kết nối thất bại
    }
    console.log('Kết nối MySQL thành công!');
});

module.exports = db;
