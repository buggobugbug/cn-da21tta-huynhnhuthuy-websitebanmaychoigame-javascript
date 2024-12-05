import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import User from '../Images/User.png';

function Register() {
    const [tenDangNhap, setTenDangNhap] = useState("");  // Tên đăng nhập
    const [soDienThoai, setSoDienThoai] = useState(""); // Số điện thoại
    const [diaChi, setDiaChi] = useState("");  // Địa chỉ
    const [matKhau, setMatKhau] = useState("");  // Mật khẩu
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                ten_dang_nhap: tenDangNhap,
                so_dien_thoai: soDienThoai,
                dia_chi: diaChi,
                mat_khau: matKhau,
            });
            console.log(response.data);  // Kiểm tra dữ liệu trả về

            // Kiểm tra xem phản hồi có chứa message
            if (response.data.message) {
                toast.success(response.data.message, {
                    style: {
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                    },
                    autoClose: 3000,
                });
                navigate("/login");
            } else {
                toast.error("Registration failed", {
                    style: {
                        backgroundColor: '#F44336',
                        color: '#fff',
                    },
                    autoClose: 3000,
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong", {
                style: {
                    backgroundColor: '#F44336',
                    color: '#fff',
                },
                autoClose: 3000,
            });
        }
    };



    return (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 py-3 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-20 w-auto" src={User} alt="User" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register User</h2>
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
                                onChange={(e) => setTenDangNhap(e.target.value)}
                                type="text"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="soDienThoai" className="block text-sm font-medium leading-6 text-gray-900">Phone number</label>
                        <div className="mt-2">
                            <input
                                id="soDienThoai"
                                name="soDienThoai"
                                value={soDienThoai}
                                onChange={(e) => setSoDienThoai(e.target.value)}
                                type="tel"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="diaChi" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
                        <div className="mt-2">
                            <input
                                id="diaChi"
                                name="diaChi"
                                value={diaChi}
                                onChange={(e) => setDiaChi(e.target.value)}
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
                                onChange={(e) => setMatKhau(e.target.value)}
                                type="password"
                                autoComplete="off"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
