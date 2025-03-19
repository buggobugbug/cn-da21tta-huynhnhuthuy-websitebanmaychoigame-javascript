# Hướng Dẫn Cài Đặt Môi Trường & Khởi Chạy Dự Án Website Bán Máy Chơi Game với csdl xampp (dễ hơn sp với mgdb và sử dụng docker)
Chạy ứng dụng bạn chỉ cần pull code (giải nén tệp zip) sau đó cài đặt tất cả các ứng dụng cần thiết, truy cập vào từng thư mục (BE, FE) sau đó chạy lệnh npm i, sau khi cài xong, bạn chạy lệnh npm start cho BE và cả FE, ứng dụng sẽ hoạt động (csdl trong xampp phải import vào nhé). Thắc mắc gmail: pinsherlock1412@gmail.com 
## 1. Cài Đặt Môi Trường

### 1.1 Cài Đặt Node.js
Node.js là một môi trường chạy JavaScript phía server, cần thiết để chạy React.js và backend.
- Tải Node.js từ trang chủ: https://nodejs.org/
- Cài đặt và kiểm tra phiên bản:
  ```sh
  node -v
  npm -v
  ```

### 1.2 Cài Đặt React.js
React.js là thư viện frontend chính của dự án.
- Cài đặt Create React App bằng npm:
  ```sh
  npm install -g create-react-app
  ```
- Tạo một dự án React mới:
  ```sh
  npx create-react-app my-app
  cd my-app
  npm start
  ```

### 1.3 Cài Đặt XAMPP
XAMPP là phần mềm tích hợp Apache, MySQL, PHP giúp chạy cơ sở dữ liệu MySQL.
- Tải về từ: https://www.apachefriends.org/download.html
- Cài đặt và mở **XAMPP Control Panel**, sau đó Start **Apache** và **MySQL**.

### 1.4 Cài Đặt VS Code
VS Code là trình soạn thảo code chính của dự án.
- Tải về từ: https://code.visualstudio.com/
- Cài đặt các extension hữu ích:
  - ESLint
  - Prettier - Code formatter
  - Reactjs code snippets

## 2. Nhập Cơ Sở Dữ Liệu vào XAMPP (MySQL)
- Mở **XAMPP Control Panel**, chọn **Admin** để vào **phpMyAdmin**.
- Tạo một database mới (ví dụ: `gaming_store`).
- Nhập tệp SQL vào database:
  1. Chọn database `gaming_store`.
  2. Chuyển đến tab **Import**.
  3. Chọn tệp `.sql` từ máy tính và nhấn **Go**.

## 3. Cài Đặt Dự Án
### 3.1 Cài Đặt Backend (Node.js + Express)
```sh
cd backend
npm install
npm start
```

### 3.2 Cài Đặt Frontend (React.js)
```sh
cd frontend
npm install
npm start
```

## 4. Mô Tả Website Bán Máy Chơi Game

Website bao gồm hai phần chính: **Giao diện người dùng (User)** và **Trang quản trị (Admin)**.

### 4.1 Giao Diện Người Dùng
- Xem danh sách sản phẩm.
- Xem chi tiết sản phẩm.
- Thêm sản phẩm vào giỏ hàng.
- Xem giỏ hàng.
- Thanh toán đơn hàng.

### 4.2 Trang Quản Trị (Admin)
- Quản lý sản phẩm (Thêm/Sửa/Xóa).
- Quản lý đơn hàng (Xác nhận/trạng thái giao hàng).
- Quản lý người dùng.
- Thống kê doanh thu và số lượng đơn hàng.

## 5. Chạy Dự Án
Sau khi hoàn thành cài đặt môi trường, mở VS Code và thực hiện các bước sau:
```sh
cd backend
npm install
npm start
```
Mở một terminal mới:
```sh
cd frontend
npm install
npm start
```
Website sẽ chạy trên `http://localhost:3000/` (Frontend) và `http://localhost:5000/` (Backend).

Setup Guide & Running the Gaming Console E-commerce Website
1. Environment Setup
1.1 Install Node.js
Node.js is a server-side JavaScript runtime, required for running React.js and the backend.

Download Node.js from: https://nodejs.org/
Install and check the version:
sh
Copy
Edit
node -v
npm -v
1.2 Install React.js
React.js is the main frontend library for the project.

Install Create React App via npm:
sh
Copy
Edit
npm install -g create-react-app
Create a new React project:
sh
Copy
Edit
npx create-react-app my-app
cd my-app
npm start
1.3 Install XAMPP
XAMPP is a software package including Apache, MySQL, and PHP, essential for running the database.

Download from: https://www.apachefriends.org/download.html
Install and open XAMPP Control Panel, then Start Apache and MySQL.
1.4 Install VS Code
VS Code is the recommended code editor for the project.

Download from: https://code.visualstudio.com/
Install useful extensions:
ESLint
Prettier - Code formatter
React.js code snippets
2. Import Database into XAMPP (MySQL)
Open XAMPP Control Panel, click Admin to access phpMyAdmin.
Create a new database (e.g., gaming_store).
Import the SQL file into the database:
Select gaming_store database.
Go to the Import tab.
Choose the .sql file from your computer and click Go.
3. Project Installation
3.1 Backend Setup (Node.js + Express)
sh
Copy
Edit
cd backend
npm install
npm start
3.2 Frontend Setup (React.js)
sh
Copy
Edit
cd frontend
npm install
npm start
4. Website Description
The website consists of two main parts: User Interface (UI) and Admin Panel.

4.1 User Interface (UI)
View product list.
View product details.
Add products to the cart.
View cart.
Checkout and make payments.
4.2 Admin Panel
Manage products (Add/Edit/Delete).
Manage orders (Confirm/update order status).
Manage users.
View sales reports and statistics.
5. Running the Project
After setting up the environment, open VS Code and follow these steps:

sh
Copy
Edit
cd backend
npm install
npm start
Open a new terminal:

sh
Copy
Edit
cd frontend
npm install
npm start
The website will be available at http://localhost:3000/ (Frontend) and http://localhost:5000/ (Backend).

6. Feature Summary Table
Feature	User Interface (UI)	Admin Panel
View Products	✅	✅
View Product Details	✅	✅
Add to Cart	✅	❌
View Cart	✅	❌
Checkout & Payment	✅	❌
Manage Products	❌	✅
Manage Orders	❌	✅
Manage Users	❌	✅
Sales Reports & Statistics	❌	✅
