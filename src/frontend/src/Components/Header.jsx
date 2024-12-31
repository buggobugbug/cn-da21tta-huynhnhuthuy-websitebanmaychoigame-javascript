import React, { useContext, useState, useEffect } from 'react';
import './Header.css';
import { Box, Typography, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Cookies from 'js-cookie';

// Import các icon từ Material-UI
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import BackpackIcon from '@mui/icons-material/Backpack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AppsIcon from '@mui/icons-material/Apps';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import BuildIcon from '@mui/icons-material/Build';
import StarsIcon from '@mui/icons-material/Stars';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Header = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [maNguoiDung, setMaNguoiDung] = useState(null);

    const cartCount = cartItems.reduce((sum, item) => sum + item.so_luong, 0);

    const menuItems = [
        { id: 1, label: 'Nintendo', icon: <SportsEsportsIcon /> },
        { id: 2, label: 'Playstation', icon: <PlayCircleOutlineIcon /> },
        { id: 3, label: 'Gaming Gear', icon: <KeyboardIcon /> },
        { id: 4, label: 'Lifestyle', icon: <BackpackIcon /> },
        { id: 5, label: 'Trading Card', icon: <CreditCardIcon /> },
        { id: 6, label: 'Kotobukiya', icon: <AppsIcon /> },
        { id: 7, label: 'Hobby', icon: <CatchingPokemonIcon /> },
        { id: 8, label: 'Dụng cụ', icon: <BuildIcon /> },
        { id: 9, label: 'Dịch vụ', icon: <StarsIcon /> },
        { id: 10, label: 'Tin tức', icon: <ArticleIcon /> },
    ];

    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setMaNguoiDung(decodedToken.ma_nguoi_dung || null);
        }
    }, []);

    const handleAccountClick = () => {
        const maNguoiDung = Cookies.get('maNguoiDung'); // Lấy từ Cookies

        if (maNguoiDung) {
            navigate(`/home/user/${maNguoiDung}`);
        } else {
            alert('Bạn cần đăng nhập để xem thông tin tài khoản!');
            navigate('/login');
        }
    };


    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/home?search=${searchQuery}`);
        }
    };

    return (
        <Box className="header">
            <Box className="header-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                <Typography variant="h5" className="logo-title">
                    PLAY
                </Typography>
            </Box>

            <Box className="header-menu">
                {menuItems.map((item) => (
                    <Box key={item.id} className="header-menu-item">
                        {React.cloneElement(item.icon, { className: 'header-icon' })}
                        <Typography variant="body2" className="header-menu-label">
                            {item.label}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box className="header-right">
                <Box className="search-box">
                    <InputBase
                        placeholder="Tìm sản phẩm..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleSearch}
                    />
                </Box>

                <Box className="header-actions">
                    <Box className="action-item" onClick={handleAccountClick} style={{ cursor: 'pointer' }}>
                        <AccountCircleIcon className="header-action-icon" />
                    </Box>
                    <Box
                        className="action-item cart-icon"
                        onClick={() => navigate('/home/cart')}
                        style={{ cursor: 'pointer', position: 'relative' }}
                    >
                        <ShoppingCartIcon className="header-action-icon" />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Box>
                    <Box
                        className="action-item"
                        onClick={() => navigate('/home/orders')}
                        style={{ cursor: 'pointer' }}
                    >
                        <ListAltIcon className="header-action-icon" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
