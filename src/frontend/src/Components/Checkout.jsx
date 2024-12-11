import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { productId, productPrice } = location.state || {};

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    const handleCheckout = async () => {
        const token = Cookies.get('accessToken');
        if (!token) {
            setError('Bạn cần đăng nhập để thực hiện thanh toán.');
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
                    payment_method: paymentMethod,
                    product_id: productId,
                    product_price: productPrice,
                    so_luong: quantity,
                }),
            });

            if (!response.ok) {
                throw new Error('Đặt hàng thất bại, vui lòng thử lại.');
            }

            const data = await response.json();
            alert('Đặt hàng thành công!');
            navigate('/home');
        } catch (error) {
            console.error('Error during checkout:', error.message);
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

                <div className="form-group">
                    <label htmlFor="quantity">Số lượng</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                        required
                    />
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                    Thanh toán
                </button>
            </form>
        </div>
    );
};

export default Checkout;
