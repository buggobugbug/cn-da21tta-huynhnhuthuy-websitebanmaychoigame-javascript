import pool from '../config/db.js';

// Tạo đơn hàng
export const createOrder = async (req, res) => {
    const { dia_chi_giao_hang, payment_method, product_id, product_price, so_luong } = req.body;
    const userId = req.user.id;

    try {
        await pool.query('START TRANSACTION');

        const tong_tien = product_price * so_luong;

        // Thêm vào bảng DonHang
        const [orderResult] = await pool.query(
            `INSERT INTO DonHang (ma_nguoi_dung, dia_chi_giao_hang, tong_tien, trang_thai) VALUES (?, ?, ?, ?)`,
            [userId, dia_chi_giao_hang, tong_tien, 'Pending']
        );
        const orderId = orderResult.insertId;

        // Thêm vào bảng GioHang (nếu cần)
        const [cartResult] = await pool.query(
            `INSERT INTO GioHang (ma_don_hang) VALUES (?)`,
            [orderId]
        );
        const cartId = cartResult.insertId;

        // Thêm vào bảng SanPhamGioHang
        await pool.query(
            `INSERT INTO SanPhamGioHang (ma_gio_hang, ma_san_pham, so_luong) VALUES (?, ?, ?)`,
            [cartId, product_id, so_luong]
        );

        // Thêm vào bảng ThanhToan
        await pool.query(
            `INSERT INTO ThanhToan (ma_don_hang, ma_nguoi_dung, so_tien, trang_thai_thanh_toan) VALUES (?, ?, ?, ?)`,
            [orderId, userId, tong_tien, payment_method === 'COD' ? 'Pending' : 'Processing']
        );

        await pool.query('COMMIT');

        res.status(201).json({ message: 'Đặt hàng thành công!', orderId });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating order:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi đặt hàng.', error: error.message });
    }
};
// Lấy thông tin chi tiết đơn hàng
export const getOrderDetails = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;

    try {
        // Lấy thông tin đơn hàng
        const [orderDetails] = await pool.query(
            `SELECT * FROM DonHang WHERE ma_don_hang = ? AND ma_nguoi_dung = ?`,
            [orderId, userId]
        );

        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }

        // Lấy thông tin sản phẩm trong đơn hàng
        const [products] = await pool.query(
            `SELECT sp.ten_san_pham, sp.gia, spgh.so_luong 
             FROM SanPham sp
             INNER JOIN SanPhamGioHang spgh ON sp.ma_san_pham = spgh.ma_san_pham
             WHERE spgh.ma_gio_hang = ?`,
            [orderId]
        );

        res.status(200).json({
            order: orderDetails[0],
            products,
        });
    } catch (error) {
        console.error('Error while getting order details:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy thông tin đơn hàng.', error: error.message });
    }
};

// Xác nhận thanh toán
export const confirmPayment = async (req, res) => {
    const { orderId } = req.params;
    const userId = req.user.id;

    try {
        const [updateResult] = await pool.query(
            `UPDATE ThanhToan SET trang_thai = ? 
             WHERE ma_don_hang = ? AND ma_nguoi_dung = ?`,
            ['Completed', orderId, userId]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để cập nhật.' });
        }

        res.status(200).json({ message: 'Thanh toán thành công!' });
    } catch (error) {
        console.error('Error while confirming payment:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật thanh toán.', error: error.message });
    }
};
