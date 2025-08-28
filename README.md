# 🎨 Hệ thống Quản Lý Lớp Học – Frontend

Frontend được xây dựng bằng **Next.js 13 (App Router)**, **TypeScript**, **TailwindCSS** và kết nối API với backend Node.js/Firebase.

---

## 📦 Yêu cầu môi trường
- Node.js >= 16
- npm hoặc yarn
- Đã chạy sẵn backend của dự án  và backend đang lắng nghe ở cổng cấu hình

---

## ⚙️ Cài đặt và chạy dự án

1. **Clone repository**
   ```bash
   git clone <link-repo>
   cd <thư-mục-frontend>


- Cài đặt dependencies
npm install
# hoặc
yarn install

- Chạy dự án
npm run dev
# hoặc
yarn dev


- Mặc định ứng dụng chạy ở http://localhost:3000

📋 Cấu trúc thư mục chính
src/
 ├─ components/        # Các component UI tái sử dụng
 ├─ hooks/             # Custom hooks (auth, lesson, chat, v.v)
 ├─ pages/             # Trang (nếu dùng Pages Router) hoặc layout (App Router)
 ├─ app/               # App Router (Next.js 13)
 ├─ styles/            # CSS/Tailwind config


🔑 Đăng nhập & OTP
Ứng dụng đăng nhập bằng OTP qua SMS.
Tính năng này phụ thuộc vào backend. Nếu backend đang tạm bỏ qua xác thực OTP (do dùng Vonage Free chỉ gửi được về số test đã xác minh), khi nhập số điện thoại bất kỳ ở frontend:
- Bước 1: Nhập số điện thoại → "Gửi mã OTP" (backend sẽ bỏ qua gửi OTP thật nếu đang ở chế độ test)
- Bước 2: Nhập mã OTP (có thể gõ bất kỳ 6 chữ số khi backend bỏ qua xác thực)
- Bước 3: Hệ thống sẽ tạo hoặc tìm tài khoản và đăng nhập
💡 Nếu muốn test OTP thật:
- Cần tạo tài khoản Vonage và cấu hình API key/secret trong backend
- Thêm số điện thoại của bạn vào danh sách đã xác minh trên Vonage

👥 Phân quyền giao diện
- Student: Xem bài học được giao, chỉnh sửa hồ sơ cá nhân, chat với giáo viên
- Instructor: Quản lý học sinh, quản lý bài học, chat với học sinh
- Menu Sidebar và tính năng hiển thị tùy thuộc vào role trả về từ backend sau khi đăng nhập

💬 Chức năng Chat
- Danh sách liên hệ (ContactList) hiển thị danh bạ (student/instructor tùy role)
- Khi chọn một liên hệ → mở ChatBox để nhắn tin realtime
- Chat phân biệt rõ màu tin nhắn gửi/nhận

🎯 Lưu ý khi phát triển
- Tất cả request API đọc base URL từ NEXT_PUBLIC_API_URL
- Luôn đăng nhập trước để lấy token lưu trong cookie/localStorage, token được đính kèm khi gọi API
- Các component chat, contact list, sidebar được viết tái sử dụng giữa các role để tránh lặp code


