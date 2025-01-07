import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    TextField,
    Button,
    Box,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Grid,
} from '@mui/material';
import './css/addproducts.scss';

const AddProduct = () => {
    const [product, setProduct] = useState({
        ten_san_pham: '',
        mo_ta: '',
        gia: '',
        ma_danh_muc: '',
        so_luong: '',
        hinh_anh: null,
    });
    const [categories, setCategories] = useState([]); // Lưu danh sách danh mục
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Lấy danh mục từ API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const token = Cookies.get('accessToken');
                if (!token) {
                    setError('Bạn cần đăng nhập.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/categories', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setCategories(response.data);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Không thể tải danh mục.');
            }
        };

        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setProduct((prevProduct) => ({
            ...prevProduct,
            hinh_anh: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.ten_san_pham || !product.gia || !product.ma_danh_muc || !product.so_luong || !product.hinh_anh) {
            setError('Vui lòng điền đầy đủ thông tin');
            return;
        }

        const formData = new FormData();
        formData.append('ten_san_pham', product.ten_san_pham);
        formData.append('mo_ta', product.mo_ta);
        formData.append('gia', product.gia);
        formData.append('ma_danh_muc', product.ma_danh_muc);
        formData.append('so_luong', product.so_luong);
        formData.append('hinh_anh', product.hinh_anh);

        const token = Cookies.get('accessToken');

        if (!token) {
            setError('Vui lòng đăng nhập lại');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/products/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                toast.success('Thêm sản phẩm thành công!', {
                    position: 'top-right',
                });
                navigate('/dashboard/all-products');
            }
        } catch (err) {
            console.error('Error adding product:', err);
            setError('Có lỗi xảy ra khi thêm sản phẩm.');
            toast.error('Thêm sản phẩm thất bại.', {
                position: 'top-right',
            });
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto', p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: '#fff' }}>
            <Typography variant="h5" align="center" gutterBottom>
                Thêm sản phẩm mới
            </Typography>
            {error && <Typography color="error" gutterBottom>{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Tên sản phẩm"
                            name="ten_san_pham"
                            value={product.ten_san_pham}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mô tả sản phẩm"
                            name="mo_ta"
                            value={product.mo_ta}
                            onChange={handleChange}
                            required
                            multiline
                            rows={4}
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Giá sản phẩm"
                            name="gia"
                            type="number"
                            value={product.gia}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" required>
                            <InputLabel id="category-label">Danh mục</InputLabel>
                            <Select
                                labelId="category-label"
                                name="ma_danh_muc"
                                value={product.ma_danh_muc}
                                onChange={handleChange}
                                label="Danh mục"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category.ma_danh_muc} value={category.ma_danh_muc}>
                                        {category.ten_danh_muc}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số lượng"
                            name="so_luong"
                            type="number"
                            value={product.so_luong}
                            onChange={handleChange}
                            required
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            variant="outlined"
                            component="label"
                            fullWidth
                        >
                            Chọn hình ảnh
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                                required
                            />
                        </Button>
                        {product.hinh_anh && <Typography variant="body2" sx={{ mt: 1 }}>Tệp: {product.hinh_anh.name}</Typography>}
                    </Grid>

                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Thêm sản phẩm
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddProduct;
