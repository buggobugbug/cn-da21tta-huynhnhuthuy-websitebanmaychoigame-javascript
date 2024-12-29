import React, { useContext, useState } from 'react';
import './Header.css';
import { Box, Typography, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

// Import các icon từ Material-UI
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import BackPackIcon from '@mui/icons-material/Backpack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AppsIcon from '@mui/icons-material/Apps';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Header = () => {
    const navigate = useNavigate();
    const { cartItems } = useContext(CartContext); // Lấy số lượng giỏ hàng từ context
    const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm

    const cartCount = cartItems.reduce((sum, item) => sum + item.so_luong, 0);

    const menuItems = [
        { id: 1, label: 'Nintendo', icon: <SportsEsportsIcon /> },
        { id: 2, label: 'Playstation', icon: <PlayCircleFilledIcon /> },
        { id: 3, label: 'Gaming Gear', icon: <KeyboardIcon /> },
        { id: 4, label: 'Lifestyle', icon: <BackPackIcon /> },
        { id: 5, label: 'Trading Card', icon: <CreditCardIcon /> },
        { id: 6, label: 'Kotobukiya', icon: <AppsIcon /> },
        { id: 7, label: 'Hobby', icon: <AppsIcon /> },
        { id: 8, label: 'Pokemon', icon: <CatchingPokemonIcon /> },
        { id: 9, label: 'Dụng cụ', icon: <BuildIcon /> },
        { id: 10, label: 'Dịch vụ', icon: <StarIcon /> },
        { id: 11, label: 'Tin tức', icon: <ArticleIcon /> },
    ];

    // Hàm xử lý tìm kiếm
    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/home?search=${searchQuery}`); // Điều hướng đến trang Home với từ khóa tìm kiếm
        }
    };

    return (
        <Box className="header">
            {/* Logo */}
            <Box className="header-logo" onClick={() => navigate('/home')} style={{ cursor: 'pointer' }}>
                <Typography variant="h5" className="logo-title">
                    PLAY
                </Typography>
            </Box>

            {/* Menu */}
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

            {/* Right Actions */}
            <Box className="header-right">
                <Box className="search-box">
                    <InputBase
                        placeholder="Tìm sản phẩm..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={handleSearch} // Thực hiện tìm kiếm khi nhấn Enter
                    />
                </Box>

                <Box className="header-actions">
                    <Box className="action-item">
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
