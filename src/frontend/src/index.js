import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Bao bọc toàn bộ ứng dụng với BrowserRouter
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter> {/* Bao bọc App bằng BrowserRouter */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
