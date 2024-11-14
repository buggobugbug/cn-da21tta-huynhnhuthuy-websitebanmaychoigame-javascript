import React from 'react';
import { AppBar, Toolbar, Box, IconButton, InputBase, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import './Navbar.css';
import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <>
      {/* Phần thông báo Freeship trên cùng */}
      <div className="top-banner">
        Freeship từ hai đơn trở lên với <strong>FREESHIP EXTRA</strong>
      </div>

      {/* Navbar chính */}
      <AppBar position="static" className="navbar">
        <Toolbar className="toolbar">
          {/* Logo với hình ảnh */}
          <Box className="logo-section">
            <Link to="/" className="logo">
              {/* Đặt ảnh logo ở đây */}
              <img src={logo} alt="Logo" className="logo-image" />
            </Link>
          </Box>

          {/* Thanh tìm kiếm */}
          <div className="search-bar">
            <InputBase
              placeholder="Tìm kiếm sản phẩm ..."
              className="search-input"
            />
            <IconButton className="search-icon">
              <SearchIcon />
            </IconButton>
          </div>

          {/* Account và Cart */}
          <Box className="actions">
            <Box className="icon-with-text">
              <IconButton className="icon-button">
                <HomeIcon fontSize="large" />
              </IconButton>
              <span className="icon-text">Trang chủ</span>
            </Box>
            <Box className="icon-with-text">
              <IconButton className="icon-button">
                <AccountCircleIcon fontSize="large" />
              </IconButton>
              <span className="icon-text">Tài khoản</span>
            </Box>
            <Box className="icon-with-text">
              <IconButton className="icon-button">
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </IconButton>
              <span className="icon-text">Giỏ hàng</span>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
