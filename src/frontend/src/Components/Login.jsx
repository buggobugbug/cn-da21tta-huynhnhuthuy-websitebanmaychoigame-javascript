import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from '../Images/User.png';
import Cookies from 'js-cookie';


function Login() {
    const [tenDangNhap, setTenDangNhap] = useState(""); // Tên đăng nhập
    const [matKhau, setMatKhau] = useState(""); // Mật khẩu
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                ten_dang_nhap: tenDangNhap, // Gửi ten_dang_nhap thay vì email
                mat_khau: matKhau,  // Gửi mat_khau thay vì password
            });

            // Kiểm tra nếu message trả về là "Đăng nhập thành công!"
            if (response.data.message === "Đăng nhập thành công!" && response.data.token) {
                toast.success(response.data.message);
                console.log('Login successful:', response.data); // Log thông tin thành công
                
                Cookies.set("accessToken", response.data.token, { expires: 7 });

                axios.defaults.headers.common["Authorization"] = `Bearer ${Cookies.get("accessToken")}`

                const { ma_vai_tro } = response.data.user; // Lấy ma_vai_tro từ user trả về

                console.log(response.data);


                if (ma_vai_tro === 1) {
                    navigate("/dashboard"); // Chuyển hướng đến dashboard cho Admin
                } else if (ma_vai_tro === 2) {
                    navigate("/home"); // Chuyển hướng đến home cho User thường
                } else {
                    toast.error("Không xác định quyền người dùng");
                }
            } else {
                toast.error("Login failed");
                console.log('Login failed:', response.data); // Log thông tin lỗi
            }
        } catch (error) {
            console.log(error); // Log lỗi nếu có sự cố khi gửi yêu cầu
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 py-3 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src={User} alt="User" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="tenDangNhap" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                        <div className="mt-2">
                            <input
                                id="tenDangNhap"
                                name="tenDangNhap"
                                value={tenDangNhap}
                                onChange={(e) => setTenDangNhap(e.target.value)} // Thay đổi từ email thành tenDangNhap
                                type="text"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="matKhau" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input
                                id="matKhau"
                                name="matKhau"
                                value={matKhau}
                                onChange={(e) => setMatKhau(e.target.value)} // Thay đổi từ password thành matKhau
                                type="password"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
