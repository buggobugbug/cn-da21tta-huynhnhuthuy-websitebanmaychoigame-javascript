import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import './ChiTietSanPham.css';

const ChiTietSanPham = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Bạn cần đăng nhập để xem chi tiết sản phẩm.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Không thể tải chi tiết sản phẩm.');
                }

                const data = await response.json();
                setProduct(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    // Hàm xác định tên danh mục
    const getCategoryName = (categoryId) => {
        switch (categoryId) {
            case 1:
                return 'Playstation';
            case 2:
                return 'Nintendo Switch';
            default:
                return 'Khác';
        }
    };

    if (loading) {
        return <div className="loading-message">Đang tải thông tin sản phẩm...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    if (!product) {
        return <div className="error-message">Sản phẩm không tồn tại.</div>;
    }

    return (
        <div className="product-detail">
            <div className="product-detail-container">
                {/* Hình ảnh sản phẩm */}
                <div className="product-image">
                    <img src={`http://localhost:5000${product.hinh_anh}`} alt={product.ten_san_pham} />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="product-info">
                    <h1 className="product-title">{product.ten_san_pham}</h1>
                    <p className="product-price">
                        {Math.trunc(product.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 })}
                    </p>

                    <p className="product-category">Danh mục: {getCategoryName(product.ma_danh_muc)}</p>

                    {/* Mô tả sản phẩm */}
                    <div>
                        <p className="product-description-title">Mô tả sản phẩm</p>
                        <p className="product-description">{product.mo_ta}</p>
                    </div>

                    {/* Đoạn văn bản chính sách */}
                    <p className="product-policy">
                        Sản phẩm được bảo hành chính hãng 12 tháng và hỗ trợ đổi trả trong vòng 7 ngày nếu phát hiện lỗi từ nhà sản xuất.
                    </p>

                    {/* Nút hành động */}
                    <div className="product-actions">
                        <button className="add-to-cart-btn">Thêm vào giỏ hàng</button>
                        <button
                            className="buy-now-btn"
                            onClick={() =>
                                navigate('/home/checkout', {
                                    state: {
                                        productId: product.ma_san_pham,
                                        productPrice: product.gia,
                                        productName: product.ten_san_pham,
                                    },
                                })
                            }
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChiTietSanPham;
