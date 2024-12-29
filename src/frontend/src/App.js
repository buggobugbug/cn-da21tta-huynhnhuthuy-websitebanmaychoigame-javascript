import { Routes, Route, Outlet } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/admin/Dashboard';
import Products from './Components/admin/Products';
import AddProduct from './Components/admin/Addproducts';
import Home from './Components/Home';
import ChiTietSanPham from './Components/Chitietsanpham';
import Checkout from './Components/Checkout';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Cart from './Components/Cart';
import OrderDetails from './Components/OrderDetails';
import OrderDetailsPage from './Components/OrderDetailsPage';
import CartProvider from './context/CartContext'; // Context để quản lý giỏ hàng
import 'react-toastify/dist/ReactToastify.css';

// Layout với Header và Footer
const HomeLayout = () => (
  <>
    <Header />
    <div className="main-content">
      <Outlet />
    </div>
    <Footer />
  </>
);

function App() {
  return (
    <CartProvider>
      <div id="root">
        <Routes>
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="chitietsanpham/:id" element={<ChiTietSanPham />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<OrderDetails />} />
            <Route path="order/:orderId" element={<OrderDetailsPage />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="products" element={<AddProduct />} />
            <Route path="all-products" element={<Products />} />
          </Route>
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
