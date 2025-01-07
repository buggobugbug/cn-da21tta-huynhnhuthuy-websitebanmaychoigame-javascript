import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, YouTube, Email } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer>
            <Box sx={{ backgroundColor: '#1a1a1a', color: '#fff', py: 4 }}>
                <Box sx={{ maxWidth: 1200, margin: '0 auto', px: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 3 }}>
                        {/* Cột 1: Về chúng tôi */}
                        <Box sx={{ flex: '1 1 300px', mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Về Play
                            </Typography>
                            <Typography variant="body2">
                                Play là nền tảng bán máy chơi game chính hãng, mang đến trải nghiệm tốt nhất. Chúng tôi
                                cung cấp sản phẩm chất lượng và dịch vụ hỗ trợ chuyên nghiệp.
                            </Typography>
                        </Box>

                        {/* Cột 2: Liên hệ */}
                        <Box sx={{ flex: '1 1 300px', mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Liên hệ
                            </Typography>
                            <Typography variant="body2">Email: support@play.com</Typography>
                            <Typography variant="body2">Hotline: 1900 123 456</Typography>
                            <Typography variant="body2">Địa chỉ: 123 Đường ABC, Quận 1, TP. Hồ Chí Minh</Typography>
                        </Box>

                        {/* Cột 3: Theo dõi chúng tôi */}
                        <Box sx={{ flex: '1 1 300px' }}>
                            <Typography variant="h6" gutterBottom>
                                Theo dõi chúng tôi
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#fff' }}>
                                    <Facebook />
                                </IconButton>
                                <IconButton href="https://twitter.com" target="_blank" sx={{ color: '#fff' }}>
                                    <Twitter />
                                </IconButton>
                                <IconButton href="https://instagram.com" target="_blank" sx={{ color: '#fff' }}>
                                    <Instagram />
                                </IconButton>
                                <IconButton href="https://youtube.com" target="_blank" sx={{ color: '#fff' }}>
                                    <YouTube />
                                </IconButton>
                                <IconButton href="mailto:support@play.com" sx={{ color: '#fff' }}>
                                    <Email />
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>

                    {/* Dòng bản quyền */}
                    <Box sx={{ textAlign: 'center', borderTop: '1px solid #444', pt: 2 }}>
                        <Typography variant="body2">&copy; 2024 Play. Tất cả quyền được bảo hộ.</Typography>
                    </Box>
                </Box>
            </Box>
        </footer>
    );
};

export default Footer;
