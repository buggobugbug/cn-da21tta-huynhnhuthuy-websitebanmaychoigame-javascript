import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Select,
    MenuItem,
    Typography,
    Box,
    CircularProgress,
    Alert,
    TextField,
    Pagination,
} from '@mui/material';
import Cookies from 'js-cookie';

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Fetch orders with filters, search, and pagination
    const fetchOrders = async () => {
        setLoading(true);
        const token = Cookies.get('accessToken');
        const limit = 10; // Số lượng đơn hàng mỗi trang

        try {
            const response = await fetch(
                `http://localhost:5000/api/orders/admin/orders?page=${page}&limit=${limit}&search=${search}&status=${status}&startDate=${startDate}&endDate=${endDate}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (!response.ok) {
                throw new Error('Không thể tải danh sách đơn hàng.');
            }

            const data = await response.json();
            setOrders(data.orders);
            setTotalPages(Math.ceil(data.total / limit));
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [page, search, status, startDate, endDate]);

    const handleStatusChange = async (orderId, newStatus) => {
        const token = Cookies.get('accessToken');

        try {
            const response = await fetch(`http://localhost:5000/api/orders/admin/orders/${orderId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ trang_thai: newStatus }),
            });

            if (!response.ok) {
                throw new Error('Không thể cập nhật trạng thái đơn hàng.');
            }

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.ma_don_hang === orderId ? { ...order, trang_thai: newStatus } : order
                )
            );
            alert('Cập nhật trạng thái thành công!');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        const token = Cookies.get('accessToken');

        try {
            const response = await fetch(`http://localhost:5000/api/orders/admin/orders/${orderId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Không thể xóa đơn hàng.');
            }

            setOrders((prevOrders) => prevOrders.filter((order) => order.ma_don_hang !== orderId));
            alert('Đơn hàng đã được xóa thành công.');
        } catch (error) {
            alert(error.message);
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Quản Lý Đơn Hàng
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                <TextField
                    label="Tìm kiếm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                    size="small"
                />
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    size="small"
                    displayEmpty
                    sx={{ width: 200 }}
                >
                    <MenuItem value="">Tất cả trạng thái</MenuItem>
                    <MenuItem value="Đang chờ xử lý">Đang chờ xử lý</MenuItem>
                    <MenuItem value="Đã xử lý">Đã xử lý</MenuItem>
                    <MenuItem value="Đã giao">Đã giao</MenuItem>
                    <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                </Select>
                <TextField
                    type="date"
                    label="Từ ngày"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
                <TextField
                    type="date"
                    label="Đến ngày"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Mã đơn hàng</TableCell>
                            <TableCell>Khách hàng</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Ngày tạo</TableCell>
                            <TableCell>Tổng tiền</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.ma_don_hang}>
                                <TableCell>{order.ma_don_hang}</TableCell>
                                <TableCell>{order.ho_ten}</TableCell>
                                <TableCell>{order.so_dien_thoai}</TableCell>
                                <TableCell>{order.dia_chi_giao_hang}</TableCell>
                                <TableCell>{new Date(order.ngay_tao).toLocaleString('vi-VN')}</TableCell>
                                <TableCell>
                                    {order.tong_tien.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={order.trang_thai}
                                        onChange={(e) => handleStatusChange(order.ma_don_hang, e.target.value)}
                                        sx={{ width: '150px' }}
                                    >
                                        <MenuItem value="Đang chờ xử lý">Đang chờ xử lý</MenuItem>
                                        <MenuItem value="Đã xử lý">Đã xử lý</MenuItem>
                                        <MenuItem value="Đã giao">Đã giao</MenuItem>
                                        <MenuItem value="Đã hủy">Đã hủy</MenuItem>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDeleteOrder(order.ma_don_hang)}
                                    >
                                        Xóa
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    color="primary"
                />
            </Box>
        </Box>
    );
};

export default ManageOrders;
