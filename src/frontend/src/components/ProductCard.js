// src/components/ProductCard.js
import React from 'react';

const ProductCard = ({ product, onDelete, onEdit }) => {
    return (
        <div className="product-card">
            <img src={product.hinh_anh} alt={product.ten_san_pham} />
            <div className="product-info">
                <h3>{product.ten_san_pham}</h3>
                <p>{product.mo_ta}</p>
                <p><strong>Giá:</strong> {product.gia} VND</p>
                <p><strong>Số lượng:</strong> {product.so_luong}</p>
            </div>
            <div className="product-actions">
                <button onClick={onEdit}>Sửa</button>
                <button onClick={onDelete}>Xóa</button>
            </div>
        </div>
    );
};

export default ProductCard;
