import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    Avatar,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                ten_dang_nhap: tenDangNhap,
                so_dien_thoai: soDienThoai,
                dia_chi: diaChi,
                mat_khau: matKhau,
            });

            if (response.data.message) {
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                    },
                    autoClose: 3000,
                });
                navigate("/login");
            } else {
                toast.error("Đăng ký thất bại!", {
                    style: {
                        backgroundColor: "#F44336",
                        color: "#fff",
                    },
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra!", {
                style: {
                    backgroundColor: "#F44336",
                    color: "#fff",
                },
                autoClose: 3000,
            });
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
                            <PersonAddIcon fontSize="large" />
                        </Avatar>
                    </Box>
                    <Typography variant="h5" align="center" gutterBottom>
                        Đăng Ký
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
                            label="Số điện thoại"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                            required
                        />
                        <TextField
                            label="Địa chỉ"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={diaChi}
                            onChange={(e) => setDiaChi(e.target.value)}
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
                            Đăng ký
                        </Button>
                    </form>

                    <Typography variant="body2" align="center">
                        Bạn đã có tài khoản?{' '}
                        <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
                            Đăng nhập
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Register;
