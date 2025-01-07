-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 07, 2025 at 08:11 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `csdlbanmaychoigame`
--

-- --------------------------------------------------------

--
-- Table structure for table `danhmucsanpham`
--

CREATE TABLE `danhmucsanpham` (
  `ma_danh_muc` int(11) NOT NULL,
  `ten_danh_muc` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhmucsanpham`
--

INSERT INTO `danhmucsanpham` (`ma_danh_muc`, `ten_danh_muc`) VALUES
(1, 'Playstation'),
(4, 'Gaming gear'),
(5, 'Xbox'),
(6, 'Móc khóa'),
(7, 'Nintendo'),
(8, 'Lifestyle'),
(9, 'Trading Card');

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `ma_don_hang` int(11) NOT NULL,
  `ma_nguoi_dung` int(11) DEFAULT NULL,
  `ngay_dat` timestamp NOT NULL DEFAULT current_timestamp(),
  `tong_tien` decimal(10,2) NOT NULL,
  `dia_chi_giao_hang` text DEFAULT NULL,
  `trang_thai` varchar(50) DEFAULT 'Pending',
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`ma_don_hang`, `ma_nguoi_dung`, `ngay_dat`, `tong_tien`, `dia_chi_giao_hang`, `trang_thai`, `ngay_tao`, `ngay_cap_nhat`) VALUES
(29, 30, '2025-01-05 21:15:41', 12000000.00, 'Nhựt Huy, Trà Vinh', 'Đã xử lý', '2025-01-05 21:15:41', '2025-01-07 15:19:49');

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `ma_gio_hang` int(11) NOT NULL,
  `ma_don_hang` int(11) DEFAULT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `giohang`
--

INSERT INTO `giohang` (`ma_gio_hang`, `ma_don_hang`, `ngay_tao`, `ngay_cap_nhat`) VALUES
(29, 29, '2025-01-05 21:15:41', '2025-01-05 21:15:41');

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `ma_nguoi_dung` int(11) NOT NULL,
  `ten_dang_nhap` varchar(100) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `so_dien_thoai` varchar(20) DEFAULT NULL,
  `dia_chi` text DEFAULT NULL,
  `ma_vai_tro` int(11) DEFAULT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `ho_ten` varchar(255) DEFAULT NULL,
  `gioi_tinh` enum('Nam','Nữ','Khác') DEFAULT 'Khác',
  `ngay_sinh` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`ma_nguoi_dung`, `ten_dang_nhap`, `mat_khau`, `so_dien_thoai`, `dia_chi`, `ma_vai_tro`, `ngay_tao`, `ngay_cap_nhat`, `ho_ten`, `gioi_tinh`, `ngay_sinh`) VALUES
(30, 'user1', '$2b$10$oS1Z5QFd7oTcgev1DuUd9ulI5c2f8cCdxtZhuQNkqkrwvwG8Vw8j6', '0363507788', 'Cầu Ngang, Trà Vinh', 2, '2024-12-06 04:00:08', '2025-01-07 16:17:34', 'Huỳnh Nhựt Huy', 'Nam', '2003-12-23'),
(31, 'admin', '$2b$10$FNDRwroUYqIA7LaUWFMLzOMh462rYMVP8myxBE45YhuXSzElstq8W', '0363507787', 'Trà Vinh', 1, '2024-12-06 04:08:12', '2024-12-06 04:08:12', NULL, 'Khác', NULL),
(33, 'user2', '$2b$10$sILI9EpRf5nhM81ImLtjUOLg.mCUBPKAbytj9RpR8FADnZ1p3XfrK', '0363507787', 'Trà Vinh', 2, '2025-01-01 20:56:02', '2025-01-01 20:56:50', 'Nhựt Huy 1', 'Nam', '2003-12-23');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `ma_san_pham` int(11) NOT NULL,
  `ten_san_pham` varchar(255) NOT NULL,
  `mo_ta` text DEFAULT NULL,
  `gia` decimal(10,2) NOT NULL,
  `ma_danh_muc` int(11) DEFAULT NULL,
  `hinh_anh` varchar(255) DEFAULT NULL,
  `so_luong` int(11) NOT NULL,
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp(),
  `ngay_cap_nhat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_deleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`ma_san_pham`, `ten_san_pham`, `mo_ta`, `gia`, `ma_danh_muc`, `hinh_anh`, `so_luong`, `ngay_tao`, `ngay_cap_nhat`, `is_deleted`) VALUES
(10, 'PS5 SLIM CHÍNH HÃNG SONY VIỆT NAM - MÁY CHƠI GAME PLAYSTATION 5 SLIM STANDARD EDITION', 'Việc mua PS5 Slim sẽ không còn khó khăn nữa khi bạn lựa chọn đến với nShop. Sản phẩm PlayStation 5 Slim Standard Edition có bán tại Play Shop nhỏ hơn 30%, nhẹ hơn 18% so với PS5 Fat đời trước thực sự là một cải tiến đáng giá. Thế hệ máy chơi game mới nhất của Sony với hàng loạt công nghệ hiện đại được tích hơp bên trong chắc chắn nó sẽ mang lại cho bạn một trải nghiệm game đỉnh cao.', 12000000.00, 1, '/uploads/1735846515479.jpg', 8, '2024-12-09 05:15:08', '2025-01-05 21:15:41', 0),
(11, 'PS5 PRO GIÁ RẺ - MÁY CHƠI GAME SONY PLAYSTATION 5 PRO CẤU HÌNH MẠNH NHẤT', 'Sản phẩm PlayStation 5 Pro - PS5 Pro có bán tại Play Shop là bước tiến cuối cùng dòng máy PS5, đạt tới đỉnh cao về sức mạnh. Thế hệ máy chơi game mới nhất của Sony với hàng loạt công nghệ hiện đại được tích hơp bên trong chắc chắn nó sẽ mang lại cho bạn một trải nghiệm game tốt nhất từ trước đến giờ. ', 20490000.00, 1, '/uploads/1735479892357.jpg', 10, '2024-12-09 05:47:59', '2024-12-29 13:44:52', 0),
(12, 'ps5', 'oke', 12000.00, 1, '/uploads/1733723445917.jpg', 10, '2024-12-09 05:50:45', '2025-01-07 17:26:20', 1),
(13, 'ps5', 'oke', 12000.00, 1, '/uploads/1733723474005.jpg', 1, '2024-12-09 05:51:14', '2025-01-07 17:26:21', 1),
(14, 'ps5 limited', 'oke', 12000.00, 1, '/uploads/1733723492765.jpg', 1, '2024-12-09 05:51:32', '2025-01-07 17:26:22', 1),
(15, 'ps5 api', 'oke', 12000.00, 1, '/uploads/1733723498220.jpg', 1, '2024-12-09 05:51:38', '2024-12-29 14:10:07', 1),
(16, 'ps5 test', 'oke', 12000.00, 1, '/uploads/1733723502515.jpg', 1, '2024-12-09 05:51:42', '2025-01-07 17:26:26', 1),
(17, 'PS5 SPECIAL SLIM CHÍNH HÃNG SONY VIỆT NAM - MÁY CHƠI GAME PLAYSTATION 5 SLIM STANDARD EDITION ', 'Giá rẻ đảm bảo luôn có hàng, không yêu cầu điều kiện: Khác với những cửa hàng khác chỉ quảng cáo để lôi khách về cửa hàng. Tại Play Shop những gì bạn đọc là những gì bạn có thể thấy tại nShop. Giá đăng là giá bán, không bắt buộc phải mua kèm với game hay phụ kiện khác mới bán.', 20000000.00, 1, '/uploads/1735481739695.jpg', 1, '2024-12-29 14:15:39', '2024-12-29 14:15:39', 0),
(18, 'PS5 SPECIAL SLIM CHÍNH HÃNG SONY VIỆT NAM - MÁY CHƠI GAME PLAYSTATION 5 SLIM STANDARD EDITION ', 'Giá rẻ đảm bảo luôn có hàng, không yêu cầu điều kiện: Khác với những cửa hàng khác chỉ quảng cáo để lôi khách về cửa hàng. Tại Play Shop những gì bạn đọc là những gì bạn có thể thấy tại nShop. Giá đăng là giá bán, không bắt buộc phải mua kèm với game hay phụ kiện khác mới bán.', 20000000.00, 1, '/uploads/1735481750230.jpg', 1, '2024-12-29 14:15:50', '2025-01-07 17:26:33', 1),
(19, 'MÁY PLAYSTATION 5 SLIM DIGITAL 30TH ANNIVERSARY LIMITED EDITION', 'Máy chơi game PS5® Digital Edition phiên bản giới hạn, bộ điều khiển không dây DualSense phiên bản giới hạn, Vỏ máy dành cho ổ đĩa phiên bản giới hạn, giá đỡ dọc phiên bản giới hạn, đầu nối cáp mang phong cách tay cầm PlayStation nguyên bản ,4 dây buộc cáp hình dạng nút bấm PlayStation, nhãn dán PlayStation, Poster PlayStation phiên bản giới hạn (1 trong 30 thiết kế ngẫu nhiên),Kẹp giấy PlayStation', 18190000.00, 1, '/uploads/1735482250719.jpg', 10, '2024-12-29 14:24:10', '2024-12-29 14:24:10', 0),
(20, 'MÁY PLAYSTATION 5 SLIM DIGITAL 30TH ANNIVERSARY LIMITED EDITION', 'Máy chơi game PS5® Digital Edition phiên bản giới hạn, bộ điều khiển không dây DualSense phiên bản giới hạn, Vỏ máy dành cho ổ đĩa phiên bản giới hạn, giá đỡ dọc phiên bản giới hạn, đầu nối cáp mang phong cách tay cầm PlayStation nguyên bản ,4 dây buộc cáp hình dạng nút bấm PlayStation, nhãn dán PlayStation, Poster PlayStation phiên bản giới hạn (1 trong 30 thiết kế ngẫu nhiên),Kẹp giấy PlayStation', 18190000.00, 1, '/uploads/1735482375536.jpg', 10, '2024-12-29 14:26:15', '2025-01-07 17:26:28', 1),
(21, 'BÀN PHÍM CƠ AKKO 3098S MATCHA RED BEAN CREAM YELLOW PRO', 'Bàn phím cơ có dây AKKO 3098S Matcha Red Bean Cream Yellow Pro đang bán ở nShop gây ấn tượng mạnh mẽ với thiết kế lấy cảm hứng từ sự kết hợp tinh tế giữa matcha và đậu đỏ. Tông màu xanh matcha tươi mát hòa quyện cùng những điểm nhấn đỏ rực rỡ không chỉ mang lại vẻ ngoài độc đáo, bắt mắt mà còn tạo cảm giác thư giãn và thích thú khi nhìn ngắm.\r\n\r\nKhông chỉ có ngoại hình đẹp mắt, AKKO 3098S Matcha Red Bean còn sở hữu layout 98 phím gọn gàng nhưng vẫn đầy đủ chức năng, bao gồm cả Numpad. Với ASA profile mang lại cảm giác gõ phím thoải mái và mượt mà, cùng mức giá hợp lí. Chiếc bàn phím này là lựa chọn lý tưởng cho mọi đối tượng. Từ những bạn mới làm quen với bàn phím cơ đến những game thủ và dân chuyên thích trải nghiệm, thích mod phím.', 990000.00, 4, '/uploads/1736270594267.jpg', 10, '2025-01-07 17:23:14', '2025-01-07 17:23:14', 0),
(22, 'BÀN PHÍM CƠ AKKO 5108S HONKAI IMPACT 3RD STYGIAN NYMPH - RGB / HOTSWAP / AKKO SWITCH CRYSTAL', 'Bàn phím cơ AKKO 5108S Honkai Impact 3rd Stygian Nymph có bán ở nShop sở hữu thiết kế đẹp mắt, phối màu đỏ xanh trên nền trắng với hình ảnh họa tiết của battlesuit Stygian Nymph trong tựa game Honkai Impact 3rd nổi tiếng của miHoYo. Phím cơ này có đầy đủ các phím chức năng lẫn Numpad, đặc biệt là với mức giá vô cùng phải chăng, chắc chắn là một trong lựa chọn tốt nhất cho những người chơi phổ thông hoặc những ai mới bắt đầu tìm hiểu về mechkey.', 2660000.00, 4, '/uploads/1736270989779.jpg', 10, '2025-01-07 17:29:36', '2025-01-07 17:29:49', 0),
(23, 'BÀN PHÍM CƠ CÓ DÂY ZIFRIEND ZT82 WHITE HOT SWAP', 'Bàn phím cơ có dây Zifriend ZT82 White Hot Swap có bán ở nShop là sự kết hợp hoàn hảo giữa hiệu suất và phong cách. Được trang bị công nghệ anti-ghosting, bàn phím đảm bảo nhận diện chính xác mọi thao tác, ngay cả trong những giờ chơi game căng thẳng nhất. Kết nối có dây Plug and Play giúp việc cài đặt trở nên dễ dàng, trong khi các phím chức năng Fn tăng cường hiệu suất làm việc.', 1180000.00, 4, '/uploads/1736271076212.jpg', 10, '2025-01-07 17:31:16', '2025-01-07 17:31:16', 0),
(24, 'BÀN PHÍM CƠ AKKO 3098 NEON - RGB / AKKO CREAM YELLOW PRO / PBT DOUBLE-SHOT', 'Bàn phím cơ AKKO 3098 NEON có bán ở nShop sở hữu thiết kế đẹp mắt, với màu sắc chủ đạo dựa theo đèn neon đặc trưng City Pop thập niên 80 độc đáo. Phím cơ này có đủ các phím chức năng cần thiết lẫn Numpad, đặc biệt là với mức giá vô cùng phải chăng, chắc chắn là một trong lựa chọn tốt nhất cho những người chơi phổ thông hoặc những ai mới bắt đầu tìm hiểu về phím cơ.', 990000.00, 4, '/uploads/1736271182868.jpg', 1, '2025-01-07 17:33:02', '2025-01-07 17:33:02', 0),
(25, 'BÀN PHÍM CƠ AKKO 3087 RF WORLD TOUR TOKYO - DUAL-MODE / AKKO SWITCH V3 CREAM BLUE', 'Bàn phím cơ AKKO 3087 RF World Tour Tokyo có bán ở nShop sở hữu thiết kế đẹp mắt, phối màu nhã nhặn, họa tiết Nhật độc đáo, vô cùng nhỏ gọn nhưng vẫn đầy đủ các phím tính năng cần thiết, đặc biệt là với mức giá vô cùng phải chăng, chắc chắn là một trong lựa chọn tốt nhất cho những người chơi phổ thông hoặc những ai mới bắt đầu tìm hiểu về phím cơ.', 1699000.00, 4, '/uploads/1736271573621.jpg', 10, '2025-01-07 17:39:33', '2025-01-07 17:39:33', 0),
(26, 'BÀN PHÍM CƠ AKKO 5098B WASTELAND SURVIVAL RGB HOT SWAP AKKO V3 PIANO PRO', 'Bàn phím cơ AKKO 5098B Wasteland Survival RGB Hot Swap Akko V3 Piano Pro đang bán tại PlayShop kết hợp giữa công nghệ và thẩm mỹ, lấy cảm hứng từ hành trình vũ trụ đầy cảm xúc của Stellar Cat. Sản phẩm không chỉ mang đến một câu chuyện thú vị mà còn thể hiện cá tính mạnh mẽ qua thiết kế độc đáo.\r\n\r\nChiếc bàn phím nổi bật với màn hình LCD 1.47 inch tích hợp, hệ thống LED RGB rực rỡ và khả năng hot swap với Akko V3 Piano Pro Switch, mang lại trải nghiệm gõ tuyệt vời và tùy biến dễ dàng. Cùng với dung lượng pin lớn, núm xoay và các phím chức năng tiện lợi, AKKO 5098B Wasteland Survival không chỉ là công cụ hỗ trợ chơi game mà còn là điểm nhấn thẩm mỹ trên bàn làm việc của bạn.', 2890000.00, 4, '/uploads/1736271679262.jpg', 1, '2025-01-07 17:41:19', '2025-01-07 17:41:19', 0),
(27, 'TÚI BAO TỬ POKEMON PIKACHU POKE BALL', 'Túi bao tử Pokemon Pikachu Poke Ball có bán tại nShop có kiểu dáng năng động, trẻ trung. Túi đeo in hình Pikachu sắc nét và đẹp mắt, có nhiều bản màu khác nhau cho bạn lựa chọn theo sở thích của mình. Kèm ví đựng tiền hình quả cầu Pokeball đáng yêu, có thể tháo rời.\r\n\r\nDây đai điều chỉnh được độ dài, cài bằng khóa bấm, vừa có thể đeo chéo hoặc đeo quanh thắt lưng. Ngăn chính cài khóa kéo an toàn và rộng rãi để giữ những vật dụng cần thiết hàng ngày của bạn khi di chuyển', 380000.00, 8, '/uploads/1736272476052.jpg', 10, '2025-01-07 17:54:36', '2025-01-07 17:54:36', 0),
(28, 'MÓC KHÓA DORAEMON SÁNG ĐÈN', 'móc khóa doraemon', 180000.00, 6, '/uploads/1736272591390.jpg', 10, '2025-01-07 17:56:31', '2025-01-07 17:56:31', 0),
(29, 'MÓC KHÓA DORAEMON GIẢI TRÍ', 'móc khóa', 99000.00, 6, '/uploads/1736272630717.jpg', 10, '2025-01-07 17:57:10', '2025-01-07 17:57:10', 0),
(30, 'MÓC KHÓA KIMETSU NO YAIBA', 'móc khóa', 180000.00, 6, '/uploads/1736272663101.jpg', 10, '2025-01-07 17:57:43', '2025-01-07 17:57:43', 0),
(31, 'NINTENDO SWITCH OLED MODEL NEON SET - NÂNG CẤP MỚI, CHƠI GAME ĐÃ HƠN', 'Nintendo Switch OLED Model Neon Set trình làng với những cải tiến mới hướng đến nâng cao trải nghiệm cho người chơi. Máy không chỉ được trang bị màn hình tốt hơn, lớn hơn, mà còn có thiết kế lại kiểu dáng chân dựng, loa, thêm tính năng cho Dock... Máy Nintendo Switch đã tốt, Nintendo Switch OLED Model còn tốt hơn.', 7290000.00, 7, '/uploads/1736272734558.jpg', 10, '2025-01-07 17:58:54', '2025-01-07 17:58:54', 0),
(32, 'NINTENDO SWITCH LITE YELLOW GIÁ RẺ - MÀU VÀNG NỔI BẬT & THỜI THƯỢNG', 'Hệ máy dành cho game thủ thích di chuyển! Nintendo Switch Lite là một thành viên nhỏ gọn, nhẹ nhàng gia nhập vào gia đình Nintendo Switch. Nó sở hữu thiết kế nguyên khối chắc chắn và đặc biệt phù hợp với kiểu chơi cầm tay, vì vậy bạn có thể ngay lập tức thưởng thức các tựa game mình thích bất kỳ lúc nào mình muốn.', 4490000.00, 7, '/uploads/1736272792518.jpg', 10, '2025-01-07 17:59:52', '2025-01-07 17:59:52', 0),
(33, 'CARDDASS MOBILE SUIT GUNDAM THE WITCH FROM MERCURY CARD COLLECTION SD VER.', 'Thẻ bài Carddass Mobile Suit Gundam the Witch From Mercury Card Collection SD Ver. bán tại nShop dựa trên các mẫu Gundam và nhân vật trong series phim hoạt hình nổi tiếng cùng tên. Phiên bản SD với tạo hình chibi lùn lùn đầu to thân nhỏ, chân tay ngắn cực dễ thương và độc đáo. Tổng cộng 30 thẻ có thể sưu tầm được, gồm những nhân vật chính trong anime như Suletta, Miorine cùng các mẫu Gundam như Aerial, Darilbalde, Pharact ... \r\n\r\nThẻ bài được làm bằng nhựa chất lượng cao và hiệu ứng lấp lánh sẽ là sự bổ sung đáng giá vào bộ sưu tập của các fan Gundam. Thích hợp để sưu tầm, trưng bày, trang trí góc học tập hoặc làm quà tặng. Đừng bỏ lỡ nhé!', 120000.00, 9, '/uploads/1736273036022.jpg', 500, '2025-01-07 18:03:56', '2025-01-07 18:03:56', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sanphamgiohang`
--

CREATE TABLE `sanphamgiohang` (
  `ma_san_pham_gio_hang` int(11) NOT NULL,
  `ma_gio_hang` int(11) DEFAULT NULL,
  `ma_san_pham` int(11) DEFAULT NULL,
  `so_luong` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sanphamgiohang`
--

INSERT INTO `sanphamgiohang` (`ma_san_pham_gio_hang`, `ma_gio_hang`, `ma_san_pham`, `so_luong`) VALUES
(29, 29, 10, 1);

-- --------------------------------------------------------

--
-- Table structure for table `thanhtoan`
--

CREATE TABLE `thanhtoan` (
  `ma_thanh_toan` int(11) NOT NULL,
  `ma_don_hang` int(11) DEFAULT NULL,
  `ma_nguoi_dung` int(11) DEFAULT NULL,
  `so_tien` decimal(10,2) NOT NULL,
  `trang_thai_thanh_toan` varchar(50) DEFAULT 'Pending',
  `ngay_tao` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `thanhtoan`
--

INSERT INTO `thanhtoan` (`ma_thanh_toan`, `ma_don_hang`, `ma_nguoi_dung`, `so_tien`, `trang_thai_thanh_toan`, `ngay_tao`) VALUES
(16, 29, 30, 12000000.00, 'Pending', '2025-01-05 21:15:41');

-- --------------------------------------------------------

--
-- Table structure for table `vaitro`
--

CREATE TABLE `vaitro` (
  `ma_vai_tro` int(11) NOT NULL,
  `ten_vai_tro` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vaitro`
--

INSERT INTO `vaitro` (`ma_vai_tro`, `ten_vai_tro`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `vanchuyen`
--

CREATE TABLE `vanchuyen` (
  `ma_van_chuyen` int(11) NOT NULL,
  `ten_van_chuyen` varchar(100) NOT NULL,
  `gia` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `danhmucsanpham`
--
ALTER TABLE `danhmucsanpham`
  ADD PRIMARY KEY (`ma_danh_muc`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`ma_don_hang`),
  ADD KEY `ma_nguoi_dung` (`ma_nguoi_dung`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`ma_gio_hang`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`ma_nguoi_dung`),
  ADD UNIQUE KEY `ten_dang_nhap` (`ten_dang_nhap`),
  ADD KEY `ma_vai_tro` (`ma_vai_tro`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`ma_san_pham`),
  ADD KEY `ma_danh_muc` (`ma_danh_muc`);

--
-- Indexes for table `sanphamgiohang`
--
ALTER TABLE `sanphamgiohang`
  ADD PRIMARY KEY (`ma_san_pham_gio_hang`),
  ADD KEY `ma_gio_hang` (`ma_gio_hang`),
  ADD KEY `ma_san_pham` (`ma_san_pham`);

--
-- Indexes for table `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD PRIMARY KEY (`ma_thanh_toan`),
  ADD KEY `ma_don_hang` (`ma_don_hang`),
  ADD KEY `ma_nguoi_dung` (`ma_nguoi_dung`);

--
-- Indexes for table `vaitro`
--
ALTER TABLE `vaitro`
  ADD PRIMARY KEY (`ma_vai_tro`);

--
-- Indexes for table `vanchuyen`
--
ALTER TABLE `vanchuyen`
  ADD PRIMARY KEY (`ma_van_chuyen`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `danhmucsanpham`
--
ALTER TABLE `danhmucsanpham`
  MODIFY `ma_danh_muc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `ma_don_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `ma_gio_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `ma_nguoi_dung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `ma_san_pham` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `sanphamgiohang`
--
ALTER TABLE `sanphamgiohang`
  MODIFY `ma_san_pham_gio_hang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `thanhtoan`
--
ALTER TABLE `thanhtoan`
  MODIFY `ma_thanh_toan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `vaitro`
--
ALTER TABLE `vaitro`
  MODIFY `ma_vai_tro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `vanchuyen`
--
ALTER TABLE `vanchuyen`
  MODIFY `ma_van_chuyen` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoidung` (`ma_nguoi_dung`);

--
-- Constraints for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`ma_vai_tro`) REFERENCES `vaitro` (`ma_vai_tro`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`ma_danh_muc`) REFERENCES `danhmucsanpham` (`ma_danh_muc`);

--
-- Constraints for table `sanphamgiohang`
--
ALTER TABLE `sanphamgiohang`
  ADD CONSTRAINT `sanphamgiohang_ibfk_1` FOREIGN KEY (`ma_gio_hang`) REFERENCES `giohang` (`ma_gio_hang`),
  ADD CONSTRAINT `sanphamgiohang_ibfk_2` FOREIGN KEY (`ma_san_pham`) REFERENCES `sanpham` (`ma_san_pham`);

--
-- Constraints for table `thanhtoan`
--
ALTER TABLE `thanhtoan`
  ADD CONSTRAINT `thanhtoan_ibfk_1` FOREIGN KEY (`ma_don_hang`) REFERENCES `donhang` (`ma_don_hang`),
  ADD CONSTRAINT `thanhtoan_ibfk_2` FOREIGN KEY (`ma_nguoi_dung`) REFERENCES `nguoidung` (`ma_nguoi_dung`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
