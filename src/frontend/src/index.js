import React from 'react';
import ReactDOM from 'react-dom/client'; // Import ReactDOM from 'react-dom/client'
import App from './App'; // Import ứng dụng của bạn

const root = ReactDOM.createRoot(document.getElementById('root')); // Tạo root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
