import React from 'react';
import './Header.css';
import { Box, Typography, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';
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

const Header = () => {
    const navigate = useNavigate();

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

    return (
        <Box className="header">
            <Box className="header-logo">
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
                    <InputBase placeholder="Tìm sản phẩm..." className="search-input" />
                </Box>

                <Box className="header-actions">
                    <Box className="action-item">
                        <AccountCircleIcon className="header-action-icon" />
                    </Box>
                    <Box
                        className="action-item"
                        onClick={() => navigate('/home/orders')}
                        style={{ cursor: 'pointer' }}
                    >
                        <ShoppingCartIcon className="header-action-icon" />
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Header;
