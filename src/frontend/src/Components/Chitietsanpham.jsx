import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CartContext } from '../context/CartContext'; // Import CartContext
import './ChiTietSanPham.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Sử dụng navigate để điều hướng
    const { addToCart } = useContext(CartContext); // Lấy hàm addToCart từ context
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

    // Hàm thêm sản phẩm vào giỏ hàng và điều hướng
    const handleAddToCart = () => {
        if (product.so_luong > 0) {
            addToCart(product); // Gọi hàm thêm sản phẩm vào giỏ hàng từ context
            alert('Sản phẩm đã được thêm vào giỏ hàng!');
            navigate('/home/cart'); // Chuyển hướng đến trang giỏ hàng
        } else {
            alert('Sản phẩm này hiện đang hết hàng!');
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
        <div className="product-detail-page">
            <div className="product-detail-container">
                {/* Hình ảnh sản phẩm */}
                <div className="product-detail-image">
                    <img src={`http://localhost:5000${product.hinh_anh}`} alt={product.ten_san_pham} />
                </div>

                {/* Thông tin sản phẩm */}
                <div className="product-detail-info">
                    <h1 className="product-detail-title">{product.ten_san_pham}</h1>
                    <p className="product-detail-price">
                        {Math.trunc(product.gia).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                    </p>
                    <p className="product-detail-category">Danh mục: {getCategoryName(product.ma_danh_muc)}</p>

                    {product.so_luong > 0 ? (
                        <button className="product-detail-cart-btn" onClick={handleAddToCart}>
                            Thêm vào giỏ hàng
                        </button>
                    ) : (
                        <button className="product-detail-cart-btn disabled" disabled>
                            Tạm thời hết hàng
                        </button>
                    )}

                    <div className="product-detail-description">
                        <h2>Mô tả sản phẩm</h2>
                        <p>{product.mo_ta}</p>
                    </div>

                    <p className="product-detail-policy">
                        Sản phẩm được bảo hành chính hãng 12 tháng và hỗ trợ đổi trả trong vòng 7 ngày nếu phát hiện lỗi từ nhà sản xuất.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;