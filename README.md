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
 components/        # Các component UI tái sử dụng
 hooks/             # Custom hooks (auth, lesson, chat, v.v)
 pages/             # Trang (nếu dùng Pages Router) hoặc layout (App Router)
 app/               # App Router (Next.js 13)
 styles/            # CSS/Tailwind config
 jotai/             # Chứa global state
 services/          # Chứa api endpoints, axios wrapper và các https request


🔑 Đăng nhập & OTP
Ứng dụng đăng nhập bằng OTP qua SMS.
Tính năng này phụ thuộc vào backend. Nếu backend đang tạm bỏ qua xác thực OTP (do dùng Vonage Free chỉ gửi được về số test đã xác minh), khi nhập số điện thoại bất kỳ ở frontend:
- Bước 1: Nhập số điện thoại (0785108900) std đã tạo sẵn → "Gửi mã OTP"
- Bước 2: Nhập mã OTP (có thể gõ bất kỳ 6 chữ số khi backend bỏ qua xác thực)
- Bước 3: Hệ thống sẽ tạo hoặc tìm tài khoản và đăng nhập
💡 Nếu muốn test OTP thật:
- Cần tạo tài khoản Vonage và cấu hình API key/secret trong backend
- Thêm số điện thoại của bạn vào danh sách đã xác minh trên Vonage

<img width="1278" height="1268" alt="image" src="https://github.com/user-attachments/assets/09e9fac2-8668-452f-b126-89b332566ef4" />
<img width="1269" height="1257" alt="image" src="https://github.com/user-attachments/assets/02def548-ffbe-41c1-bb7d-e7defed6a9c0" />


👥 Phân quyền giao diện
- Student: Xem bài học được giao, chỉnh sửa hồ sơ cá nhân, chat với giáo viên
<img width="1244" height="1163" alt="image" src="https://github.com/user-attachments/assets/926272d9-6483-45e4-a080-9246fe50b332" />
<img width="1278" height="1261" alt="image" src="https://github.com/user-attachments/assets/fa3e893f-f5ff-4366-9242-e24065b0ae3e" />
<img width="1235" height="1160" alt="image" src="https://github.com/user-attachments/assets/7c568343-af07-4306-b233-77bca8d625f6" />

- Instructor: Quản lý học sinh, quản lý bài học, chat với học sinh
<img width="1272" height="1268" alt="image" src="https://github.com/user-attachments/assets/c5c6567b-fd2c-4eee-a545-97eb9449c056" />
<img width="1278" height="1261" alt="image" src="https://github.com/user-attachments/assets/fa3e893f-f5ff-4366-9242-e24065b0ae3e" />
<img width="1277" height="1233" alt="image" src="https://github.com/user-attachments/assets/169b3c30-7eb4-4a00-b2af-af5ed7aaba3d" />
- Menu Sidebar và tính năng hiển thị tùy thuộc vào role trả về từ backend sau khi đăng nhập
<img width="253" height="414" alt="image" src="https://github.com/user-attachments/assets/50e808e1-6f99-4562-9307-efb804f59833" />
<img width="206" height="250" alt="image" src="https://github.com/user-attachments/assets/20ceb40f-e5bd-402e-a163-7bb10a8c345b" />

💬 Chức năng Chat
- Danh sách liên hệ (ContactList) hiển thị danh bạ (student/instructor tùy role)
- Khi chọn một liên hệ → mở ChatBox để nhắn tin realtime
- Chat phân biệt rõ màu tin nhắn gửi/nhận
<img width="1278" height="1261" alt="image" src="https://github.com/user-attachments/assets/e0d4b29e-cfec-49b0-a322-ca9607a632d2" />

🎯 Lưu ý khi phát triển
- Tất cả request API đọc base URL từ NEXT_PUBLIC_API_URL
- Luôn đăng nhập trước để lấy token lưu trong cookie/localStorage, token được đính kèm khi gọi API
- Các component chat, contact list, sidebar được viết tái sử dụng giữa các role để tránh lặp code


