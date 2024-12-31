import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = Cookies.get('accessToken');
                const response = await axios.get('http://localhost:5000/api/products', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (error) {
                setError('Không thể tải danh sách sản phẩm.');
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (ma_san_pham) => {
        try {
            const token = Cookies.get('accessToken');
            await axios.delete(`http://localhost:5000/api/products/${ma_san_pham}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter((product) => product.ma_san_pham !== ma_san_pham));
        } catch (error) {
            setError('Không thể xóa sản phẩm.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Danh sách sản phẩm</h2>
            {error && <p className="text-danger">{error}</p>}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Mã sản phẩm</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Số lượng</th>
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
                            <td>{product.so_luong}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000${product.hinh_anh}`}
                                    alt={product.ten_san_pham}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>
                                <Link to={`/dashboard/products/edit/${product.ma_san_pham}`}>
                                    <EditIcon style={{ cursor: 'pointer', color: 'blue' }} />
                                </Link>
                            </td>
                            <td>
                                <DeleteIcon
                                    style={{ cursor: 'pointer', color: 'red' }}
                                    onClick={() => handleDelete(product.ma_san_pham)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Products;
