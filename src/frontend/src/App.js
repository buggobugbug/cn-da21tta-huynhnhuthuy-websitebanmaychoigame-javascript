import React from 'react';
import Header from './components/Header'; // Đường dẫn đến Header.js
import Sidebar from './components/Sidebar'; // Đường dẫn đến Sidebar.js
import Carousel from './components/Carousel'; // Đảm bảo bạn tạo Component Carousel
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <div className="main-container" style={{ display: 'flex' }}>
          {/* Sidebar sẽ chiếm phần bên trái */}
          <Sidebar />

          {/* Phần chính bên phải */}
          <div className="content" style={{ flex: 1, padding: '20px' }}>
            {/* Carousel nằm ở đây */}
            <Carousel />
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
