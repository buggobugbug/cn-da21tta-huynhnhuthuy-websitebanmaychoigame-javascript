import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, TextField, Button } from '@mui/material';
import dayjs from 'dayjs';

const Statistics = () => {
    const [stats, setStats] = useState({ users: 0, products: 0, orders: 0, revenue: 0 });
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(dayjs().subtract(7, 'day').format('YYYY-MM-DD')); // Mặc định là 7 ngày trước
    const [endDate, setEndDate] = useState(dayjs().format('YYYY-MM-DD')); // Hôm nay

    const fetchStatistics = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/statistics?startDate=${startDate}&endDate=${endDate}`);
            if (!response.ok) throw new Error('Failed to fetch statistics');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchStatistics();
    }, [startDate, endDate]); // Gọi lại API khi thay đổi ngày

    const handleFilter = () => {
        fetchStatistics();
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Thống Kê</Typography>
            {error && <Typography color="error">{error}</Typography>}

            {/* Bộ lọc theo ngày */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField
                    label="Từ ngày"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Đến ngày"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <Button variant="contained" onClick={handleFilter}>
                    Lọc
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Tổng số người dùng</Typography>
                            <Typography variant="h4">{stats.users}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Tổng số sản phẩm</Typography>
                            <Typography variant="h4">{stats.products}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Tổng số đơn hàng</Typography>
                            <Typography variant="h4">{stats.orders}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Doanh thu</Typography>
                            <Typography variant="h4">
                                {Math.trunc(stats.revenue).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                            </Typography>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Statistics;
