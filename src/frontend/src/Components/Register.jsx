import React, { useState } from "react";
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
    Alert,
    Collapse,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Register = () => {
    const [tenDangNhap, setTenDangNhap] = useState("");
    const [soDienThoai, setSoDienThoai] = useState("");
    const [diaChi, setDiaChi] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
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
                navigate("/login");
            } else {
                setErrorMessage("Đăng ký thất bại!");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Tên đăng nhập đã tồn tại, mời bạn nhập tên đăng nhập khác");
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

                    {/* Hiển thị thông báo lỗi */}
                    <Collapse in={!!errorMessage}>
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                            action={
                                <IconButton
                                    aria-label="close"
                                    size="small"
                                    onClick={() => setErrorMessage("")}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            {errorMessage}
                        </Alert>
                    </Collapse>

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
