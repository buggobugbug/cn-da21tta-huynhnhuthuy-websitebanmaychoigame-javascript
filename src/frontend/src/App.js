import { Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/admin/Dashboard';
import Products from './Components/admin/Products';
import AddProduct from './Components/admin/Addproducts';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="products" element={<AddProduct />} />
          <Route path="all-products" element={<Products />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
