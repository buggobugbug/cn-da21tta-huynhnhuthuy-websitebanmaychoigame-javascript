import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Thêm import js-cookie
import './css/addproducts.scss';

const AddProduct = () => {
    const [product, setProduct] = useState({
        ten_san_pham: '',
        mo_ta: '',
        gia: '',
        ma_danh_muc: '',
        so_luong: '', // Thêm trường so_luong
        hinh_anh: null // Đổi hinh_anh thành null (sẽ chứa file)
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    // Xử lý thay đổi cho file input
    const handleFileChange = (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            hinh_anh: e.target.files[0] // Lưu trữ tệp được chọn
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầu vào
        if (!product.ten_san_pham || !product.gia || !product.ma_danh_muc || !product.so_luong || !product.hinh_anh) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        // Tạo form data để gửi lên server
        const formData = new FormData();
        formData.append('ten_san_pham', product.ten_san_pham);
        formData.append('mo_ta', product.mo_ta);
        formData.append('gia', product.gia);
        formData.append('ma_danh_muc', product.ma_danh_muc);
        formData.append('so_luong', product.so_luong); // Thêm so_luong vào formData
        formData.append('hinh_anh', product.hinh_anh);

        const token = Cookies.get('accessToken'); // Lấy token từ cookie
        console.log(token);

        if (!token) {
            setError('Vui lòng đăng nhập lại');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Đặt header cho việc upload file
                    'Authorization': `Bearer ${token}`  // Sử dụng token từ cookie
                }
            });
            if (response.status === 201) {
                navigate('/dashboard/products');  // Chuyển hướng về trang quản lý sản phẩm
            }
        } catch (err) {
            console.error('Error adding product:', err);
            setError('Có lỗi xảy ra khi thêm sản phẩm.');
        }
    };

    return (
        <div>
            <h2>Thêm sản phẩm mới</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <label>Tên sản phẩm</label>
                    <input
                        type="text"
                        name="ten_san_pham"
                        value={product.ten_san_pham}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mô tả sản phẩm</label>
                    <textarea
                        name="mo_ta"
                        value={product.mo_ta}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Giá sản phẩm</label>
                    <input
                        type="number"
                        name="gia"
                        value={product.gia}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Mã danh mục</label>
                    <input
                        type="number"
                        name="ma_danh_muc"
                        value={product.ma_danh_muc}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Nhập số lượng */}
                <div className="form-group">
                    <label>Số lượng</label>
                    <input
                        type="number"
                        name="so_luong"
                        value={product.so_luong}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Chọn file hình ảnh */}
                <div className="form-group">
                    <label className="file-label" htmlFor="hinh_anh">Chọn hình ảnh</label>
                    <input
                        type="file"
                        id="hinh_anh"
                        name="hinh_anh"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                    {product.hinh_anh && <div className="file-name">Tệp: {product.hinh_anh.name}</div>}
                </div>

                <button type="submit">Thêm sản phẩm</button>
            </form>
        </div>
    );
};

export default AddProduct;
