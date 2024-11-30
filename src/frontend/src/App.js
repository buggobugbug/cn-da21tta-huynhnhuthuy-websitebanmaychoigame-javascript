import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm'; // Component trang đăng nhập
import AdminDashboard from './components/AdminDashboard'; // Component Dashboard cho admin
import ProductForm from './components/ProductForm'; // Form để thêm và sửa sản phẩm
import './App.css';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token')); // Lấy token từ localStorage

  // Hàm xử lý đăng nhập
  const handleLogin = (token) => {
    setAuthToken(token); // Lưu token vào state
    localStorage.setItem('token', token); // Lưu token vào localStorage để sử dụng lại khi reload
  };

  // Kiểm tra nếu đã đăng nhập (có token)
  const isAuthenticated = !!authToken;

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route cho trang đăng nhập */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <LoginForm onLogin={handleLogin} />} />

          {/* Route cho Dashboard của admin */}
          <Route path="/admin" element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />} />

          {/* Route để thêm và sửa sản phẩm */}
          <Route path="/admin/product/:id" element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />} />
          <Route path="/admin/product" element={isAuthenticated ? <ProductForm /> : <Navigate to="/login" />} />

          {/* Route mặc định cho trang chính (nếu có) */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/admin" /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
