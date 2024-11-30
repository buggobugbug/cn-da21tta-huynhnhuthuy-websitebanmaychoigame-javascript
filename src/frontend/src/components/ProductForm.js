// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';

const ProductForm = ({ onSubmit, existingProduct }) => {
    const [product, setProduct] = useState({
        ten_san_pham: '',
        gia: '',
        mo_ta: '',
        hinh_anh: '',
        so_luong: '',
        id_thuong_hieu: '',
    });

    // Nếu có sản phẩm đang sửa, điền dữ liệu vào form
    useEffect(() => {
        if (existingProduct) {
            setProduct({
                ten_san_pham: existingProduct.ten_san_pham,
                gia: existingProduct.gia,
                mo_ta: existingProduct.mo_ta,
                hinh_anh: existingProduct.hinh_anh,
                so_luong: existingProduct.so_luong,
                id_thuong_hieu: existingProduct.id_thuong_hieu,
            });
        }
    }, [existingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(product);
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h3>{existingProduct ? 'Edit Product' : 'Add Product'}</h3>
            <input
                type="text"
                name="ten_san_pham"
                value={product.ten_san_pham}
                onChange={handleChange}
                placeholder="Tên sản phẩm"
            />
            <input
                type="number"
                name="gia"
                value={product.gia}
                onChange={handleChange}
                placeholder="Giá"
            />
            <textarea
                name="mo_ta"
                value={product.mo_ta}
                onChange={handleChange}
                placeholder="Mô tả"
            />
            <input
                type="text"
                name="hinh_anh"
                value={product.hinh_anh}
                onChange={handleChange}
                placeholder="Link hình ảnh"
            />
            <input
                type="number"
                name="so_luong"
                value={product.so_luong}
                onChange={handleChange}
                placeholder="Số lượng"
            />
            <input
                type="number"
                name="id_thuong_hieu"
                value={product.id_thuong_hieu}
                onChange={handleChange}
                placeholder="ID Thương hiệu"
            />
            <button type="submit">{existingProduct ? 'Cập nhật' : 'Thêm mới'}</button>
        </form>
    );
};

export default ProductForm;
