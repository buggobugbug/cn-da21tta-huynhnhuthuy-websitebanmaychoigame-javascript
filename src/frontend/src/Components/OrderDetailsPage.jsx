import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './OrderDetailsPage.css';

const OrderDetailsPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Bạn cần đăng nhập để xem chi tiết đơn hàng.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Không thể tải chi tiết đơn hàng.');
                }

                const data = await response.json();
                setOrder(data.order);
                setProducts(data.products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) {
        return <div className="loading-message">Đang tải chi tiết đơn hàng...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="order-details-page">
            <h2>Chi Tiết Đơn Hàng</h2>
            {order && (
                <div className="order-summary">
                    <p><strong>Mã đơn hàng:</strong> {order.ma_don_hang}</p>
                    <p><strong>Ngày tạo:</strong> {new Date(order.ngay_tao).toLocaleString()}</p>
                    <p><strong>Tổng tiền:</strong> {order.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    <p><strong>Địa chỉ giao hàng:</strong> {order.dia_chi_giao_hang}</p>
                    <p><strong>Trạng thái:</strong> {order.trang_thai}</p>
                </div>
            )}
            <h3>Sản Phẩm</h3>
            {products && products.length > 0 ? (
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product.ma_san_pham} className="product-item">
                            <img
                                className="product-image"
                                src={`http://localhost:5000${product.hinh_anh}`}
                                alt={product.ten_san_pham}
                            />
                            <div className="product-info">
                                <p className="product-name">{product.ten_san_pham}</p>
                                <div className="product-details">
                                    <p>Số lượng: {product.so_luong}</p>
                                    <p>Thành tiền: {(product.gia * product.so_luong).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                </div>
                                <p className="product-price">{product.gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Không có sản phẩm nào trong đơn hàng.</p>
            )}
        </div>
    );

};

export default OrderDetailsPage;
