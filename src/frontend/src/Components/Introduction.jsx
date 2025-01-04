import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Introduction.css';

const Introduction = () => {
    const navigate = useNavigate();

    const handleNavigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="launch-container">
            <div className="launch-content">
                <h1 className="brand-name">WebGame Portal</h1>
                <h2 className="launch-title">Launching soon!</h2>
                <p className="launch-description">
                    Chúng tôi mang đến cho bạn website mua bán máy chơi game uy tín và tốt nhất cho bạn!
                </p>
                <button className="notify-btn" onClick={handleNavigateToLogin}>
                    Đến trang đăng nhập
                </button>
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Introduction;
