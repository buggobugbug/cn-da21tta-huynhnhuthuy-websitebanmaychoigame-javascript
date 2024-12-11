import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './OrderDetails.css';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Bạn cần đăng nhập để xem danh sách đơn hàng.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Không thể tải danh sách đơn hàng.');
                }

                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div className="loading-message">Đang tải danh sách đơn hàng...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="order-list-container">
            <h2>Danh Sách Đơn Hàng</h2>
            {orders.length === 0 ? (
                <p>Không có đơn hàng nào.</p>
            ) : (
                <div className="order-list">
                    {orders.map((order) => (
                        <div key={order.ma_don_hang} className="order-item">
                            <p><strong>Mã đơn hàng:</strong> {order.ma_don_hang}</p>
                            <p><strong>Ngày tạo:</strong> {new Date(order.ngay_tao).toLocaleString()}</p>
                            <p><strong>Tổng tiền:</strong> {order.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            <p><strong>Trạng thái:</strong> {order.trang_thai}</p>
                            <button
                                className="view-details-btn"
                                onClick={() => navigate(`/home/order/${order.ma_don_hang}`)}
                            >
                                Xem chi tiết
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
