import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Lấy giỏ hàng từ localStorage khi khởi tạo
        return JSON.parse(localStorage.getItem('cart')) || [];
    });

    useEffect(() => {
        // Lưu giỏ hàng vào localStorage mỗi khi cartItems thay đổi
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // Thêm sản phẩm vào giỏ hàng
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingProduct = prevItems.find((item) => item.ma_san_pham === product.ma_san_pham);
            if (existingProduct) {
                return prevItems.map((item) =>
                    item.ma_san_pham === product.ma_san_pham
                        ? { ...item, so_luong: item.so_luong + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, so_luong: 1 }];
            }
        });
    };

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    const updateQuantity = (productId, newQuantity) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.ma_san_pham === productId
                    ? { ...item, so_luong: Math.max(newQuantity, 1) }
                    : item
            )
        );
    };

    // Xóa sản phẩm khỏi giỏ hàng
    const removeItem = (productId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.ma_san_pham !== productId));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
