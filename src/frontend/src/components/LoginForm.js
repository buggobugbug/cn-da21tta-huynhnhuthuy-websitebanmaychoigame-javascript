import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                email,
                mat_khau: password,
            });

            // Lưu token vào localStorage
            localStorage.setItem('token', response.data.token);

            // Kiểm tra vai trò, nếu là admin thì chuyển hướng
            const { vai_tro } = response.data.user;
            if (vai_tro === 'admin') {
                navigate('/admin');
            } else {
                setErrorMessage('Bạn không có quyền truy cập admin!');
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.error || 'Lỗi đăng nhập!');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mật khẩu:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Đăng nhập</button>
            </form>
        </div>
    );
};

export default LoginForm;
