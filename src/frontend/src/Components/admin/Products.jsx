import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';  // Import js-cookie để lấy token từ cookie

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Lấy danh sách sản phẩm từ API
        const fetchProducts = async () => {
            try {
                // Lấy token từ cookie
                const token = Cookies.get('accessToken');

                const response = await axios.get('http://localhost:5000/api/products', {
                    withCredentials: true,  // Đảm bảo gửi cookie
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Gửi token trong header
                        'Content-Type': 'application/json',
                    },
                });
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Có lỗi xảy ra khi tải sản phẩm.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (ma_san_pham) => {
        try {
            // Lấy token từ cookie
            const token = Cookies.get('accessToken');

            await axios.delete(`http://localhost:5000/api/products/${ma_san_pham}`, {
                withCredentials: true, // Gửi cookie khi xóa sản phẩm
                headers: {
                    'Authorization': `Bearer ${token}`,  // Gửi token trong header
                },
            });
            setProducts(products.filter(product => product.ma_san_pham !== ma_san_pham));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Sản phẩm</h2>
            {loading && <p>Đang tải sản phẩm...</p>}
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Hình ảnh</th>
                        <th>Chỉnh sửa</th>
                        <th>Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.ma_san_pham}>
                            <td>{product.ma_san_pham}</td>
                            <td>{product.ten_san_pham}</td>
                            <td>{product.gia}</td>
                            <td>{product.ma_danh_muc}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000${product.hinh_anh}`}
                                    alt={product.ten_san_pham}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>
                                <button>
                                    <Link to={`/dashboard/products/edit/${product.ma_san_pham}`}>Chỉnh sửa</Link>
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(product.ma_san_pham)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
