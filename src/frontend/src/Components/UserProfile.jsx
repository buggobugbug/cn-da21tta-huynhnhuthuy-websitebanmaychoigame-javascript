import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Grid,
    TextField,
    Button,
    RadioGroup,
    FormControlLabel,
    Radio,
    Alert,
} from '@mui/material';

const UserProfile = () => {
    const { ma_nguoi_dung } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get('accessToken');
                if (!token) {
                    navigate('/login'); // Chuyển hướng về trang đăng nhập nếu không có token
                    return;
                }

                const response = await axios.get(`http://localhost:5000/api/users/${ma_nguoi_dung}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
                setFormData(response.data);
            } catch (err) {
                setError('Không thể tải thông tin người dùng.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [ma_nguoi_dung, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async () => {
        try {
            const token = Cookies.get('accessToken');
            await axios.put(`http://localhost:5000/api/users/${ma_nguoi_dung}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Cập nhật thông tin thành công!');
            setEditing(false);
        } catch (err) {
            setError('Không thể cập nhật thông tin.');
        }
    };

    const handleLogout = () => {
        Cookies.remove('accessToken'); // Xóa token khỏi cookie
        navigate('/login'); // Chuyển hướng về trang đăng nhập
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: 400, p: 3, boxShadow: 3 }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Thông Tin Tài Khoản
                </Typography>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Họ Tên"
                                name="ho_ten"
                                value={formData.ho_ten || ''}
                                onChange={handleInputChange}
                                fullWidth
                                disabled={!editing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Ngày sinh"
                                name="ngay_sinh"
                                type="date"
                                value={formData.ngay_sinh || ''}
                                onChange={handleInputChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                disabled={!editing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Giới tính</Typography>
                            <RadioGroup
                                row
                                name="gioi_tinh"
                                value={formData.gioi_tinh || ''}
                                onChange={handleInputChange}
                                disabled={!editing}
                            >
                                <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Số điện thoại"
                                name="so_dien_thoai"
                                value={formData.so_dien_thoai || ''}
                                onChange={handleInputChange}
                                fullWidth
                                disabled={!editing}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Địa chỉ"
                                name="dia_chi"
                                value={formData.dia_chi || ''}
                                onChange={handleInputChange}
                                fullWidth
                                disabled={!editing}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
                <Box mt={2} display="flex" justifyContent="space-between">
                    {editing ? (
                        <>
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Lưu
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => setEditing(false)}>
                                Hủy
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" onClick={() => setEditing(true)}>
                            Chỉnh sửa
                        </Button>
                    )}
                    <Button variant="outlined" color="error" onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default UserProfile;
