import pool from '../config/db.js';

// Tạo đơn hàng
export const createOrder = async (req, res) => {
    const { dia_chi_giao_hang, payment_method, cart_items, tong_tien } = req.body;
    const userId = req.user.id;

    try {
        await pool.query('START TRANSACTION');

        // Thêm vào bảng DonHang
        const [orderResult] = await pool.query(
            `INSERT INTO DonHang (ma_nguoi_dung, dia_chi_giao_hang, tong_tien, trang_thai, ngay_tao, ngay_cap_nhat) 
            VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [userId, dia_chi_giao_hang, tong_tien, 'Pending']
        );
        const orderId = orderResult.insertId;

        // Thêm vào bảng GioHang
        const [cartResult] = await pool.query(
            `INSERT INTO GioHang (ma_don_hang, ngay_tao, ngay_cap_nhat) VALUES (?, NOW(), NOW())`,
            [orderId]
        );
        const cartId = cartResult.insertId;

        // Thêm từng sản phẩm vào bảng SanPhamGioHang
        for (const item of cart_items) {
            await pool.query(
                `INSERT INTO SanPhamGioHang (ma_gio_hang, ma_san_pham, so_luong) VALUES (?, ?, ?)`,
                [cartId, item.ma_san_pham, item.so_luong]
            );
        }

        // Thêm vào bảng ThanhToan
        await pool.query(
            `INSERT INTO ThanhToan (ma_don_hang, ma_nguoi_dung, so_tien, trang_thai_thanh_toan, ngay_tao) 
            VALUES (?, ?, ?, ?, NOW())`,
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
            `SELECT sp.ten_san_pham, sp.gia, sp.hinh_anh, spgh.so_luong 
     FROM SanPham sp
     INNER JOIN SanPhamGioHang spgh ON sp.ma_san_pham = spgh.ma_san_pham
     INNER JOIN GioHang gh ON gh.ma_gio_hang = spgh.ma_gio_hang
     WHERE gh.ma_don_hang = ?`,
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


// Lấy danh sách đơn hàng theo ma_nguoi_dung
export const getOrdersByUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const [orders] = await pool.query(
            `SELECT ma_don_hang, ngay_tao, tong_tien, dia_chi_giao_hang, trang_thai 
             FROM DonHang 
             WHERE ma_nguoi_dung = ? 
             ORDER BY ngay_tao DESC`,
            [userId]
        );

        if (orders.length === 0) {
            return res.status(404).json({ message: 'Không có đơn hàng nào.' });
        }

        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đơn hàng.', error: error.message });
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
