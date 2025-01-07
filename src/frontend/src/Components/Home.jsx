import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Carousel from './Carousel';
import { Button, Box, Typography, Select, MenuItem, Pagination, Grid } from '@mui/material';
import './Home.css';

const Home = () => {
    const [products, setProducts] = useState([]); // All products from the API
    const [filteredProducts, setFilteredProducts] = useState([]); // Products after filtering
    const [categories, setCategories] = useState([]); // Categories for filtering
    const [selectedCategory, setSelectedCategory] = useState(''); // Current selected category
    const [selectedPriceRange, setSelectedPriceRange] = useState([0, 50000000]); // Current price range filter
    const [error, setError] = useState(null); // Error message
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const productsPerPage = 6; // Number of products per page

    const location = useLocation();
    const searchQuery = new URLSearchParams(location.search).get('search'); // Search term from URL
    const categoryQuery = new URLSearchParams(location.search).get('category'); // Category term from URL
    const navigate = useNavigate();

    // Fetch products and categories when component mounts
    useEffect(() => {
        const fetchProductsAndCategories = async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Bạn cần đăng nhập để xem sản phẩm.');
                return;
            }

            try {
                const [productResponse, categoryResponse] = await Promise.all([
                    fetch('http://localhost:5000/api/products', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }),
                    fetch('http://localhost:5000/api/categories', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }),
                ]);

                if (!productResponse.ok || !categoryResponse.ok) {
                    throw new Error('Không thể tải danh sách sản phẩm hoặc danh mục.');
                }

                const productsData = await productResponse.json();
                const categoriesData = await categoryResponse.json();

                setProducts(productsData);
                setFilteredProducts(productsData);
                setCategories(categoriesData);

                // Tự động lọc theo danh mục khi có tham số category từ URL
                if (categoryQuery) {
                    const matchingCategory = categoriesData.find(
                        (cat) => cat.ten_danh_muc.toLowerCase() === categoryQuery.toLowerCase()
                    );
                    if (matchingCategory) {
                        setSelectedCategory(matchingCategory.ma_danh_muc);
                    }
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProductsAndCategories();
    }, [categoryQuery]);

    // Apply filters when selectedCategory, selectedPriceRange, or searchQuery changes
    useEffect(() => {
        filterProducts();
    }, [selectedPriceRange, selectedCategory, searchQuery, products]);

    const filterProducts = () => {
        const filtered = products.filter((product) => {
            const matchesSearch = searchQuery
                ? product.ten_san_pham.toLowerCase().includes(searchQuery.toLowerCase())
                : true;
            const matchesCategory = selectedCategory
                ? product.ma_danh_muc === selectedCategory
                : true;
            const matchesPrice =
                product.gia >= selectedPriceRange[0] && product.gia <= selectedPriceRange[1];

            return matchesSearch && matchesCategory && matchesPrice;
        });

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePriceRangeClick = (range) => {
        setSelectedPriceRange(range);
    };

    // Get current products for the current page
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    return (
        <div className="home">
            <div className="home-container">
                <main className="home-content">
                    <Carousel />

                    {/* Filters */}
                    <Box sx={{ mb: 3 }}>
                        

                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                            {/* Filter by category */}
                            <Select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                displayEmpty
                                sx={{ width: 200, fontSize: '0.9rem', height: '2.5rem' }} // Width cố định cho Select
                            >
                                <MenuItem value="">
                                    <em>Chọn thể loại</em>
                                </MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.ma_danh_muc} value={category.ma_danh_muc}>
                                        {category.ten_danh_muc}
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Filter by price range */}
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                                {[
                                    { label: '0 - 10 triệu VND', range: [0, 10000000] },
                                    { label: '10 - 20 triệu VND', range: [10000000, 20000000] },
                                    { label: '20 - 50 triệu VND', range: [20000000, 50000000] },
                                    { label: 'Tất cả', range: [0, 50000000] },
                                ].map((price, index) => (
                                    <Button
                                        key={index}
                                        size="small"
                                        variant="outlined"
                                        onClick={() => handlePriceRangeClick(price.range)}
                                        sx={{ width: 150 }} // Width cố định cho Button
                                    >
                                        {price.label}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Box>

                    {/* Products */}
                    <section className="products-section">
                        {error ? (
                            <p className="error-message">{error}</p>
                        ) : (
                            <>
                                <Grid container spacing={2}>
                                    {currentProducts.map((product) => (
                                        <Grid item xs={10} md={4} key={product.ma_san_pham}>
                                            <div
                                                className="product-card"
                                                onClick={() =>
                                                    navigate(`/home/chitietsanpham/${product.ma_san_pham}`)
                                                }
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
                                        </Grid>
                                    ))}
                                </Grid>

                                {/* Pagination */}
                                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                                    <Pagination
                                        count={Math.ceil(filteredProducts.length / productsPerPage)}
                                        page={currentPage}
                                        onChange={(event, value) => setCurrentPage(value)}
                                        color="primary"
                                    />
                                </Box>
                            </>
                        )}
                    </section>
                </main>
            </div>
        </div>
    );
};

export default Home;
