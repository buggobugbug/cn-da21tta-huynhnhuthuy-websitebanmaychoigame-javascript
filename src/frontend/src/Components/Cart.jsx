import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);

    // Lấy giỏ hàng từ localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const updateQuantity = (productId, newQuantity) => {
        const updatedCart = cartItems.map((item) =>
            item.ma_san_pham === productId
                ? { ...item, so_luong: Math.max(newQuantity, 1) } // Đảm bảo số lượng không nhỏ hơn 1
                : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const removeItem = (productId) => {
        const updatedCart = cartItems.filter((item) => item.ma_san_pham !== productId);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.gia * item.so_luong, 0);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">GIỎ HÀNG CỦA BẠN</h2>

            <div className="cart-content">
                <div className="cart-items">
                    {cartItems.length === 0 ? (
                        <p>Giỏ hàng của bạn đang trống.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div className="cart-item" key={item.ma_san_pham}>
                                <img
                                    className="cart-item-image"
                                    src={`http://localhost:5000${item.hinh_anh}`}
                                    alt={item.ten_san_pham}
                                />
                                <div className="cart-item-info">
                                    <p className="cart-item-title">{item.ten_san_pham}</p>
                                    <p className="cart-item-price">
                                        {item.gia.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </p>
                                    <div className="cart-item-quantity">
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.ma_san_pham, item.so_luong - 1)}
                                            disabled={item.so_luong <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.so_luong}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.ma_san_pham, item.so_luong + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <p className="cart-item-total">
                                    Thành tiền: {(item.gia * item.so_luong).toLocaleString('vi-VN')} đ
                                </p>
                                <button
                                    className="cart-item-remove"
                                    onClick={() => removeItem(item.ma_san_pham)}
                                >
                                    🗑
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="cart-summary">
                    <h3>Thông tin đơn hàng</h3>
                    <p className="cart-total">
                        Tổng tiền: {calculateTotalPrice().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                    <button className="checkout-btn" onClick={() => navigate('/home/checkout')}>
                        THANH TOÁN
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
