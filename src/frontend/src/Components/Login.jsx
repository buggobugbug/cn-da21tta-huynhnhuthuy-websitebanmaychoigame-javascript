import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Avatar,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                ten_dang_nhap: tenDangNhap,
                mat_khau: matKhau,
            });

            if (response.data.success && response.data.token) {
                const { token, user } = response.data;
                Cookies.set("accessToken", token, { expires: 7 });
                Cookies.set("maNguoiDung", user.ma_nguoi_dung, { expires: 7 });
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

                if (user.ma_vai_tro === 1) {
                    navigate("/dashboard");
                } else if (user.ma_vai_tro === 2) {
                    navigate("/home");
                } else {
                    toast.error("Không xác định quyền người dùng");
                }
            } else {
                toast.error("Đăng nhập thất bại!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra!");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{ backgroundColor: "#f5f5f5" }}
        >
            <Card sx={{ width: 400, padding: 4, boxShadow: 3 }}>
                <CardContent>
                    <Box display="flex" justifyContent="center" mb={2}>
                        <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
                            <LockIcon fontSize="large" />
                        </Avatar>
                    </Box>
                    <Typography variant="h5" align="center" gutterBottom>
                        Đăng Nhập
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Tên đăng nhập"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={tenDangNhap}
                            onChange={(e) => setTenDangNhap(e.target.value)}
                            required
                        />
                        <TextField
                            label="Mật khẩu"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={matKhau}
                            onChange={(e) => setMatKhau(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                    </form>

                    <Typography variant="body2" align="center">
                        Bạn chưa có tài khoản?{' '}
                        <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
                            Đăng ký
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;
