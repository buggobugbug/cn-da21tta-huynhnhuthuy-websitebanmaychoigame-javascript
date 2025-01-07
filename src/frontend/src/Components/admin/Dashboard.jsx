import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './css/dashboard.scss'; // Thêm đường dẫn CSS nếu cần

const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Kiểm tra token khi người dùng truy cập vào Dashboard
        const token = Cookies.get("accessToken");

        // Nếu không có token, chuyển hướng về login
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    const onLogout = () => {
        Cookies.remove("accessToken");
        navigate("/login");
    };

    return (
        <>
            <div className="sidebar">
                <Link to={`/`} style={{ textDecoration: 'none' }}>
                    <h2 className="text-white">Dashboard</h2>
                </Link>
                <ul>
                    <li onClick={() => navigate("/dashboard/products")}>
                        <a href="#">Thêm sản phẩm mới</a>
                    </li>
                    <li onClick={() => navigate("/dashboard/manufacturers")}>
                        <a href="#">Thương hiệu</a>
                    </li>
                    <li onClick={() => navigate("/dashboard/users")}>
                        <a href="#">Tài khoản</a>
                    </li>
                    <li onClick={() => navigate("/dashboard/all-products")}>
                        <a href="#">Tất cả sản phẩm</a>
                    </li>
                    <li onClick={() => navigate("/dashboard/manage-orders")}>
                        <a href="#">Quản lý đơn hàng</a> {/* Menu mới */}
                    </li>
                    <li onClick={() => navigate("/dashboard/statistics")}>
                        <a href="#">Thống kê</a> {/* Menu mới */}
                    </li>
                    <li onClick={onLogout}>
                        <a href="#">Đăng xuất</a>
                    </li>
                </ul>

            </div>

            <div className="main-content">
                <div className="admin-header">
                    {/* Có thể thêm tiêu đề quản trị tại đây */}
                </div>

                <section>
                    <div className="admin-content">
                        <div className="container-admin-content">
                            <Outlet /> {/* Vị trí render các route con */}
                        </div>
                    </div>
                </section>

                <div className="admin-footer"></div>
            </div>
        </>
    );
};

export default Dashboard;
