import pool from '../config/db.js';

// API lấy số liệu thống kê
export const getStatistics = async (req, res) => {
    try {
        // Truy vấn tổng số người dùng
        const [[usersCount]] = await pool.query(
            'SELECT COUNT(*) AS count FROM NguoiDung WHERE ma_vai_tro = 2'
        );

        // Truy vấn tổng số sản phẩm
        const [[productsCount]] = await pool.query(
            'SELECT COUNT(*) AS count FROM SanPham WHERE is_deleted = 0'
        );

        // Truy vấn tổng số đơn hàng
        const [[ordersCount]] = await pool.query(
            'SELECT COUNT(*) AS count FROM DonHang'
        );

        // Truy vấn tổng doanh thu với trạng thái "Đã xử lý" hoặc "Đã giao"
        const [[revenue]] = await pool.query(`
            SELECT SUM(tong_tien) AS total 
            FROM DonHang 
            WHERE trang_thai IN ('Đã xử lý', 'Đã giao')
        `);

        // Trả về kết quả thống kê
        res.status(200).json({
            users: usersCount.count,
            products: productsCount.count,
            orders: ordersCount.count,
            revenue: revenue.total || 0, // Nếu không có doanh thu, trả về 0
        });
    } catch (error) {
        console.error('Error fetching statistics:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy số liệu thống kê.', error });
    }
};
