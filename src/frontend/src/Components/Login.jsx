import React, { useState } from "react";
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
    Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const Login = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message trước khi gửi request

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
                    setErrorMessage("Không xác định quyền người dùng");
                }
            } else {
                setErrorMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Tên đăng nhập hoặc mật khẩu của bạn không đúng");
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

                    {errorMessage && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

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
                        Bạn chưa có tài khoản?{" "}
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
