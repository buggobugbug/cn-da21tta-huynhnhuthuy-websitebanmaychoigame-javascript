import pool from '../config/db.js';

// Tạo đơn hàng
export const createOrder = async (req, res) => {
    const { dia_chi_giao_hang, payment_method, cart_items, tong_tien } = req.body;
    const userId = req.user.id;

    try {
        await pool.query('START TRANSACTION');

        // Thêm vào bảng DonHang với trạng thái "Đang chờ xử lý"
        const [orderResult] = await pool.query(
            `INSERT INTO DonHang (ma_nguoi_dung, dia_chi_giao_hang, tong_tien, trang_thai, ngay_tao, ngay_cap_nhat) 
            VALUES (?, ?, ?, ?, NOW(), NOW())`,
            [userId, dia_chi_giao_hang, tong_tien, 'Đang chờ xử lý']
        );
        const orderId = orderResult.insertId;

        // Thêm vào bảng GioHang
        const [cartResult] = await pool.query(
            `INSERT INTO GioHang (ma_don_hang, ngay_tao, ngay_cap_nhat) VALUES (?, NOW(), NOW())`,
            [orderId]
        );
        const cartId = cartResult.insertId;

        // Xử lý từng sản phẩm trong giỏ hàng
        for (const item of cart_items) {
            // Kiểm tra số lượng sản phẩm
            const [product] = await pool.query(
                `SELECT so_luong, ten_san_pham FROM SanPham WHERE ma_san_pham = ?`,
                [item.ma_san_pham]
            );

            if (!product.length || product[0].so_luong < item.so_luong) {
                return res.status(400).json({
                    error: true,
                    message: `Số lượng sản phẩm "${product[0]?.ten_san_pham}" không đủ. Vui lòng liên hệ chăm sóc khách hàng để được tư vấn thêm`,
                });
            }

            // Thêm sản phẩm vào bảng SanPhamGioHang
            await pool.query(
                `INSERT INTO SanPhamGioHang (ma_gio_hang, ma_san_pham, so_luong) VALUES (?, ?, ?)`,
                [cartId, item.ma_san_pham, item.so_luong]
            );

            // Trừ số lượng sản phẩm trong bảng SanPham
            await pool.query(
                `UPDATE SanPham SET so_luong = so_luong - ? WHERE ma_san_pham = ?`,
                [item.so_luong, item.ma_san_pham]
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
        // Lấy thông tin đơn hàng và người dùng
        const [orderDetails] = await pool.query(
            `SELECT dh.ma_don_hang, dh.ngay_tao, dh.tong_tien, dh.dia_chi_giao_hang, dh.trang_thai,
                    nd.ho_ten, nd.so_dien_thoai
             FROM DonHang dh
             INNER JOIN NguoiDung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
             WHERE dh.ma_don_hang = ? AND dh.ma_nguoi_dung = ?`,
            [orderId, userId]
        );

        if (orderDetails.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng.' });
        }

        // Lấy danh sách sản phẩm trong đơn hàng
        const [products] = await pool.query(
            `SELECT sp.ma_san_pham, sp.ten_san_pham, sp.gia, sp.hinh_anh, spgh.so_luong
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
            `SELECT dh.ma_don_hang, dh.ngay_tao, dh.tong_tien, dh.dia_chi_giao_hang, dh.trang_thai, 
                    nd.ho_ten, nd.so_dien_thoai 
             FROM DonHang dh
             INNER JOIN NguoiDung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
             WHERE dh.ma_nguoi_dung = ? 
             ORDER BY dh.ngay_tao DESC`,
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


// cho admin


// Lấy danh sách đơn hàng cho admin
export const getOrdersForAdmin = async (req, res) => {
    const userRole = req.user.ma_vai_tro;

    if (userRole !== 1) {
        return res.status(403).json({ message: 'Access denied. Only admins can view orders.' });
    }

    const { page = 1, limit = 10, search = '', status = '', startDate = '', endDate = '' } = req.query;
    const offset = (page - 1) * limit;

    try {
        let query = `
            SELECT dh.ma_don_hang, dh.ngay_tao, dh.tong_tien, dh.dia_chi_giao_hang, dh.trang_thai, 
                   nd.ho_ten, nd.so_dien_thoai
            FROM DonHang dh
            INNER JOIN NguoiDung nd ON dh.ma_nguoi_dung = nd.ma_nguoi_dung
            WHERE nd.ma_vai_tro = 2
        `;
        const params = [];

        if (search) {
            query += ` AND (dh.ma_don_hang LIKE ? OR nd.ho_ten LIKE ? OR nd.so_dien_thoai LIKE ?)`;
            params.push(`%${search}%`, `%${search}%`, `%${search}%`);
        }

        if (status) {
            query += ` AND dh.trang_thai = ?`;
            params.push(status);
        }

        if (startDate && endDate) {
            query += ` AND dh.ngay_tao BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        }

        query += ` ORDER BY dh.ngay_tao DESC LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));

        const [orders] = await pool.query(query, params);

        const [[{ total }]] = await pool.query(
            `SELECT COUNT(*) as total FROM (${query}) as temp`,
            params
        );

        res.status(200).json({ orders, total });
    } catch (error) {
        console.error('Error fetching orders for admin:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi lấy danh sách đơn hàng.', error: error.message });
    }
};



// Cập nhật trạng thái đơn hàng
export const updateOrderStatus = async (req, res) => {
    const userRole = req.user.ma_vai_tro;
    const { orderId } = req.params;
    const { trang_thai } = req.body;

    if (userRole !== 1) {
        return res.status(403).json({ message: 'Access denied. Only admins can update orders.' });
    }

    try {
        const [updateResult] = await pool.query(
            `UPDATE DonHang 
             SET trang_thai = ?, ngay_cap_nhat = NOW()
             WHERE ma_don_hang = ?`,
            [trang_thai, orderId]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để cập nhật.' });
        }

        res.status(200).json({ message: 'Cập nhật trạng thái đơn hàng thành công!' });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.', error: error.message });
    }
};

// Xóa đơn hàng
export const deleteOrder = async (req, res) => {
    const userRole = req.user.ma_vai_tro;
    const { orderId } = req.params;

    if (userRole !== 1) {
        return res.status(403).json({ message: 'Access denied. Only admins can delete orders.' });
    }

    try {
        const [deleteResult] = await pool.query(
            `DELETE FROM DonHang WHERE ma_don_hang = ?`,
            [orderId]
        );

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: 'Không tìm thấy đơn hàng để xóa.' });
        }

        res.status(200).json({ message: 'Đơn hàng đã được xóa thành công!' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra khi xóa đơn hàng.', error: error.message });
    }
};


