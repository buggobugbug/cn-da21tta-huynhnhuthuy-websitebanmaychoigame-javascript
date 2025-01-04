import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const OrderDetails = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = Cookies.get('accessToken');
            if (!token) {
                setError('Bạn cần đăng nhập để xem danh sách đơn hàng.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/api/orders', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Không thể tải danh sách đơn hàng.');
                }

                const data = await response.json();
                setOrders(data.orders);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Đang tải danh sách đơn hàng...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <TableContainer component={Paper}>
            <h2 style={{ textAlign: 'center', margin: '20px 0' }}>Danh Sách Đơn Hàng</h2>
            {orders.length === 0 ? (
                <p style={{ textAlign: 'center' }}>Không có đơn hàng nào.</p>
            ) : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Mã đơn hàng</strong></TableCell>
                            <TableCell><strong>Tên người dùng</strong></TableCell>
                            <TableCell><strong>Địa chỉ</strong></TableCell>
                            <TableCell><strong>Số điện thoại</strong></TableCell>
                            <TableCell><strong>Ngày tạo</strong></TableCell>
                            <TableCell><strong>Tổng tiền</strong></TableCell>
                            <TableCell><strong>Trạng thái</strong></TableCell>
                            <TableCell><strong>Hành động</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order.ma_don_hang}>
                                <TableCell>{order.ma_don_hang}</TableCell>
                                <TableCell>{order.ho_ten || 'Ẩn danh'}</TableCell>
                                <TableCell>{order.dia_chi_giao_hang}</TableCell>
                                <TableCell>{order.so_dien_thoai || 'Chưa cập nhật'}</TableCell>
                                <TableCell>
                                    {new Date(order.ngay_tao).toLocaleString('vi-VN')}
                                </TableCell>
                                <TableCell>
                                    {Number(order.tong_tien).toLocaleString('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                        minimumFractionDigits: 0, // Không hiển thị số thập phân nếu không cần
                                    })}
                                </TableCell>

                                <TableCell>{order.trang_thai}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => navigate(`/home/order/${order.ma_don_hang}`)}
                                    >
                                        Xem chi tiết
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </TableContainer>
    );
};

export default OrderDetails;
