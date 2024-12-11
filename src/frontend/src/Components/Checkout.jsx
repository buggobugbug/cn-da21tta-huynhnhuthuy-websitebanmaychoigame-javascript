import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [error, setError] = useState(null);

    // Lấy dữ liệu từ localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    // Tính tổng tiền
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.gia * item.so_luong, 0);
    };

    const handleCheckout = async () => {
        const token = Cookies.get('accessToken');
        if (!token) {
            setError('Bạn cần đăng nhập để thực hiện thanh toán.');
            return;
        }

        if (!cartItems.length) {
            alert('Giỏ hàng trống. Không thể thanh toán.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dia_chi_giao_hang: `${fullName}, ${address}`,
                    phone_number: phoneNumber,
                    payment_method: paymentMethod,
                    cart_items: cartItems, // Truyền toàn bộ giỏ hàng
                    tong_tien: calculateTotalPrice(), // Tổng tiền đã tính
                }),
            });

            if (!response.ok) {
                throw new Error('Đặt hàng thất bại, vui lòng thử lại.');
            }

            const data = await response.json();
            alert('Đặt hàng thành công!');
            localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi đặt hàng thành công
            navigate('/home'); // Quay lại trang chủ
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Thông tin thanh toán</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                    <label htmlFor="fullName">Họ và tên</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Địa chỉ giao hàng</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Số điện thoại</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="COD">Thanh toán khi nhận hàng</option>
                        <option value="Online">Thanh toán trực tuyến</option>
                    </select>
                </div>

                <div className="cart-summary">
                    <p className="cart-total">
                        Tổng tiền: {calculateTotalPrice().toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                        })}
                    </p>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                    Thanh toán
                </button>
            </form>
        </div>
    );
};

export default Checkout;
