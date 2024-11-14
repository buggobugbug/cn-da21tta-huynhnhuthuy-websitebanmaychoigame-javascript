import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar/Navbar';
import Homepage from './pages/Trangchu/Homepage';
import ProductPage from './pages/Sanpham/Product';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sanpham" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
