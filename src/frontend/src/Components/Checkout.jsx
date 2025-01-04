import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Card,
    CardContent,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Divider,
    Avatar,
    Alert,
    Snackbar,
} from '@mui/material';

const Checkout = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(false);

    // Lấy dữ liệu từ localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    // Tính tổng tiền
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.gia * item.so_luong, 0);
    };

    const handleCheckout = async () => {
        const token = Cookies.get('accessToken');
        if (!token) {
            setError('Bạn cần đăng nhập để thực hiện thanh toán.');
            return;
        }

        if (!fullName || !address || !phoneNumber) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (!cartItems.length) {
            setError('Giỏ hàng trống. Không thể thanh toán.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    dia_chi_giao_hang: `${fullName}, ${address}`,
                    phone_number: phoneNumber,
                    payment_method: paymentMethod,
                    cart_items: cartItems,
                    tong_tien: calculateTotalPrice(),
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Đặt hàng thất bại, vui lòng thử lại.');
                return;
            }

            setSuccessMessage(true);
            localStorage.removeItem('cart');
            setTimeout(() => navigate('/home/orders'), 2000);
        } catch (error) {
            setError('Không thể kết nối với máy chủ. Vui lòng thử lại.');
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Thông tin thanh toán
            </Typography>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            <Snackbar
                open={successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage(false)}
                message="Đặt hàng thành công!"
            />
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Box component="form" noValidate autoComplete="off">
                                <TextField
                                    label="Họ và tên"
                                    fullWidth
                                    margin="normal"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Địa chỉ giao hàng"
                                    fullWidth
                                    margin="normal"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                                <TextField
                                    label="Số điện thoại"
                                    fullWidth
                                    margin="normal"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Phương thức thanh toán</InputLabel>
                                    <Select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    >
                                        <MenuItem value="COD">Thanh toán khi nhận hàng</MenuItem>
                                        <MenuItem value="Online">Thanh toán trực tuyến</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Đơn hàng của bạn
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {cartItems.map((item) => (
                                <Box
                                    key={item.ma_san_pham}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        mb: 2,
                                    }}
                                >
                                    <Avatar
                                        src={`http://localhost:5000${item.hinh_anh}`}
                                        alt={item.ten_san_pham}
                                        sx={{ width: 48, height: 48, mr: 2 }}
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" noWrap>
                                            {item.ten_san_pham}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            Số lượng: {item.so_luong}
                                        </Typography>
                                    </Box>
                                    <Typography variant="body2">
                                        {item.gia.toLocaleString('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </Typography>
                                </Box>
                            ))}
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                                <Typography>
                                    Tổng cộng:{' '}
                                    {calculateTotalPrice().toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={handleCheckout}
                    >
                        Thanh toán
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Checkout;
