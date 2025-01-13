import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditProduct = () => {
    const { ma_san_pham } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        ten_san_pham: '',
        mo_ta: '',
        gia: '',
        ma_danh_muc: '',
        so_luong: '',
        hinh_anh: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = Cookies.get('accessToken');
                const response = await axios.get(`http://localhost:5000/api/products/${ma_san_pham}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProduct(response.data);
            } catch (err) {
                setError('Không thể tải thông tin sản phẩm.');
            }
        };

        fetchProduct();
    }, [ma_san_pham]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const handleFileChange = (e) => {
        setProduct({ ...product, hinh_anh: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const token = Cookies.get('accessToken');
            const formData = new FormData();
    
            formData.append('ten_san_pham', product.ten_san_pham || '');
            formData.append('mo_ta', product.mo_ta || '');
            formData.append('gia', product.gia || '');
            formData.append('ma_danh_muc', product.ma_danh_muc || '');
            formData.append('so_luong', product.so_luong || '');
    
            // Chỉ thêm ảnh mới nếu người dùng chọn file mới
            if (product.hinh_anh instanceof File) {
                formData.append('hinh_anh', product.hinh_anh);
            } else {
                formData.append('hinh_anh_cu', product.hinh_anh); // Gửi tên ảnh cũ
            }
    
            await axios.put(`http://localhost:5000/api/products/${ma_san_pham}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            alert('Cập nhật sản phẩm thành công!');
            navigate('/dashboard/all-products');
        } catch (err) {
            console.error('Lỗi khi gửi dữ liệu:', err);
            setError('Lỗi khi cập nhật sản phẩm.');
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Chỉnh sửa sản phẩm</h2>
            {error && <p className="text-danger">{error}</p>}
            <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ten_san_pham"
                        value={product.ten_san_pham || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea
                        className="form-control"
                        name="mo_ta"
                        rows="3"
                        value={product.mo_ta || ''}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input
                        type="number"
                        className="form-control"
                        name="gia"
                        value={product.gia || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Danh mục</label>
                    <input
                        type="text"
                        className="form-control"
                        name="ma_danh_muc"
                        value={product.ma_danh_muc || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Số lượng</label>
                    <input
                        type="number"
                        className="form-control"
                        name="so_luong"
                        value={product.so_luong || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hình ảnh</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {typeof product.hinh_anh === 'string' && (
                        <img
                            src={`http://localhost:5000${product.hinh_anh}`}
                            alt="Hình ảnh sản phẩm"
                            className="img-thumbnail mt-2"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    )}
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                        Cập nhật sản phẩm
                    </button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/dashboard/all-products')}
                    >
                        Hủy bỏ
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProduct;
