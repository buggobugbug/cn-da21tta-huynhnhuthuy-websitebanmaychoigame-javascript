import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Carousel from './Carousel';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation(); // Lấy thông tin URL hiện tại
    const searchQuery = new URLSearchParams(location.search).get('search'); // Lấy từ khóa tìm kiếm từ query string
    const navigate = useNavigate(); // Sử dụng điều hướng để mở trang chi tiết

    useEffect(() => {
        const fetchProducts = async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Bạn cần đăng nhập để xem sản phẩm.');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Không thể tải danh sách sản phẩm.');
                }

                const data = await response.json();

                // Lọc sản phẩm nếu có từ khóa tìm kiếm
                const filteredProducts = searchQuery
                    ? data.filter((product) =>
                        product.ten_san_pham.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    : data;

                setProducts(filteredProducts);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProducts();
    }, [searchQuery]); 

    return (
        <div className="home">
            <div className="home-container">
                <main className="home-content">
                    {/* Slider */}
                    <Carousel />

                    {/* Sản phẩm */}
                    <section className="products-section">
                        <h2 className="section-title">Tất cả sản phẩm</h2>
                        {error ? (
                            <p className="error-message">{error}</p>
                        ) : (
                            <div className="product-grid">
                                {products.map((product) => (
                                    <div
                                        key={product.ma_san_pham}
                                        className="product-card"
                                        onClick={() => navigate(`/home/chitietsanpham/${product.ma_san_pham}`)}
                                    >
                                        <img
                                            src={`http://localhost:5000${product.hinh_anh}`}
                                            alt={product.ten_san_pham}
                                            className="product-image"
                                        />
                                        <div className="product-info">
                                            <h3 className="product-title">{product.ten_san_pham}</h3>
                                            <p className="product-price">
                                                {Math.trunc(product.gia).toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;
