import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newProduct, setNewProduct] = useState({
        ten_san_pham: '',
        gia: '',
        mo_ta: '',
        hinh_anh: null,
        so_luong: '',
        id_thuong_hieu: ''
    });
    const [imagePreview, setImagePreview] = useState(null); // Dùng để xem trước ảnh
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    // Lấy danh sách sản phẩm
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/products', { headers });
            setProducts(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu sản phẩm', error);
        }
    };

    // Gọi hàm fetch khi component load
    useEffect(() => {
        fetchProducts();
    }, []); // Tải lại khi component render lần đầu

    // Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Xử lý thay đổi khi chọn file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewProduct({ ...newProduct, hinh_anh: file });
        setImagePreview(URL.createObjectURL(file)); // Hiển thị hình ảnh trước khi tải lên
    };

    // Xử lý thay đổi thông tin sản phẩm
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Thêm sản phẩm mới
    const handleAddProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ten_san_pham', newProduct.ten_san_pham);
        formData.append('gia', newProduct.gia);
        formData.append('mo_ta', newProduct.mo_ta);
        formData.append('so_luong', newProduct.so_luong);
        formData.append('id_thuong_hieu', newProduct.id_thuong_hieu);
        formData.append('hinh_anh', newProduct.hinh_anh);

        try {
            await axios.post('http://localhost:3000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`
                }
            });

            // Sau khi thêm sản phẩm, gọi lại hàm fetch để làm mới danh sách sản phẩm
            fetchProducts();
            setNewProduct({
                ten_san_pham: '',
                gia: '',
                mo_ta: '',
                hinh_anh: null,
                so_luong: '',
                id_thuong_hieu: ''
            });
            setImagePreview(null);
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm', error);
        }
    };

    // Xử lý xóa sản phẩm
    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            // Sau khi xóa sản phẩm, gọi lại hàm fetch để làm mới danh sách sản phẩm
            fetchProducts();
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm', error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard Admin</h2>
            <button onClick={handleLogout}>Đăng xuất</button>

            <h3>Thêm sản phẩm mới</h3>
            <form onSubmit={handleAddProduct}>
                <div>
                    <label>Tên sản phẩm</label>
                    <input
                        type="text"
                        name="ten_san_pham"
                        value={newProduct.ten_san_pham}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Giá</label>
                    <input
                        type="text"
                        name="gia"
                        value={newProduct.gia}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Mô tả</label>
                    <textarea
                        name="mo_ta"
                        value={newProduct.mo_ta}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Số lượng</label>
                    <input
                        type="text"
                        name="so_luong"
                        value={newProduct.so_luong}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Thương hiệu</label>
                    <input
                        type="text"
                        name="id_thuong_hieu"
                        value={newProduct.id_thuong_hieu}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Hình ảnh</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                </div>
                <button type="submit">Thêm sản phẩm</button>
            </form>

            <h3>Danh sách sản phẩm</h3>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Giá</th>
                            <th>Mô tả</th>
                            <th>Số lượng</th>
                            <th>Thương hiệu</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.ten_san_pham}</td>
                                <td>{product.gia}</td>
                                <td>{product.mo_ta}</td>
                                <td>{product.so_luong}</td>
                                <td>{product.id_thuong_hieu}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/${product.hinh_anh}`}
                                        alt=""
                                        style={{ width: '50px', height: '50px' }}
                                    />
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteProduct(product.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
