import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api';

const Manufacturers = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editId, setEditId] = useState(null);

    // Lấy danh mục từ backend
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/categories`);
            setCategories(response.data);
        } catch (error) {
            toast.error('Lỗi khi tải danh mục!');
        }
    };

    // Thêm hoặc cập nhật danh mục
    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        if (!categoryName.trim()) {
            toast.error('Tên danh mục không được để trống!');
            return;
        }

        try {
            if (editId) {
                // Cập nhật danh mục
                await axios.put(`${API_BASE_URL}/categories/${editId}`, { ten_danh_muc: categoryName });
                toast.success('Cập nhật danh mục thành công!');
            } else {
                // Thêm danh mục mới
                await axios.post(`${API_BASE_URL}/categories`, { ten_danh_muc: categoryName });
                toast.success('Thêm danh mục thành công!');
            }
            setCategoryName('');
            setEditId(null);
            fetchCategories(); // Tải lại danh sách
        } catch (error) {
            toast.error('Lỗi khi thêm/cập nhật danh mục!');
        }
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
            try {
                await axios.delete(`${API_BASE_URL}/categories/${id}`);
                toast.success('Xóa danh mục thành công!');
                fetchCategories(); // Tải lại danh sách
            } catch (error) {
                toast.error('Lỗi khi xóa danh mục!');
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Quản lý danh mục</h2>
            <form onSubmit={handleAddOrUpdate}>
                <div className="mb-3">
                    <label htmlFor="categoryName" className="form-label">Tên danh mục</label>
                    <input
                        type="text"
                        className="form-control"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editId ? 'Cập nhật' : 'Thêm'}
                </button>
            </form>

            <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên danh mục</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.ma_danh_muc}>
                            <td>{category.ma_danh_muc}</td>
                            <td>{category.ten_danh_muc}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => {
                                        setEditId(category.ma_danh_muc);
                                        setCategoryName(category.ten_danh_muc);
                                    }}
                                >
                                    Sửa
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(category.ma_danh_muc)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manufacturers;
