import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, updateQuantity, removeItem } = useContext(CartContext);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.gia * item.so_luong, 0);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">Giỏ Hàng Của Bạn</h2>
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
                                            onClick={() => updateQuantity(item.ma_san_pham, item.so_luong - 1, item.so_luong_toi_da)}
                                            disabled={item.so_luong <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.so_luong}</span>
                                        <button
                                            className="quantity-btn"
                                            onClick={() => updateQuantity(item.ma_san_pham, item.so_luong + 1, item.so_luong_toi_da)}
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
