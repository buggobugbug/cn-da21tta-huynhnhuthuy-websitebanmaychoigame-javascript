import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/admin/Dashboard';
import Products from './Components/admin/Products';
import AddProduct from './Components/admin/Addproducts';
import Home from './Components/Home'; // Trang Home
import ChiTietSanPham from './Components/Chitietsanpham';
import Header from './Components/Header'; // Import Header
import Footer from './Components/Footer'; // Import Footer
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div id="root">
      {/* Header */}
      <Header />

      {/* Nội dung chính */}
      <div className="main-content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<AddProduct />} />
            <Route path="all-products" element={<Products />} />
          </Route>
          <Route path="/home/chitietsanpham/:id" element={<ChiTietSanPham />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

