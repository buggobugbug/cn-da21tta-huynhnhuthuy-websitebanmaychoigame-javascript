import React from 'react';
import { Box, List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';  
import './Sidebar.css';

const Sidebar = () => {
    return (
        <Drawer
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box sx={{ width: '100%' }}>
                <List>
                    {/* Trang chủ */}
                    <ListItem button component={Link} to="/" className="menu-item">
                        <HomeIcon sx={{ marginRight: 2 }} /> {/* Thêm icon */}
                        <ListItemText primary="Trang chủ" />
                    </ListItem>

                    {/* Danh mục sản phẩm */}
                    <ListItem button component={Link} to="/danh-muc" className="menu-item">
                        <CategoryIcon sx={{ marginRight: 2 }} /> {/* Thêm icon */}
                        <ListItemText primary="Hàng mới" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default Sidebar;
