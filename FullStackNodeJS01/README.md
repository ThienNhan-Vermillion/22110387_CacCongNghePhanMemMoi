# Full Stack NodeJS - Hệ thống quản lý sản phẩm

Dự án Full Stack sử dụng Node.js (Express) cho backend và React cho frontend, với chức năng quản lý sản phẩm, lazy loading và phân trang.

## 🚀 Tính năng chính

### Backend (Express.js)
- ✅ API RESTful cho quản lý sản phẩm (CRUD)
- ✅ Phân trang và lazy loading
- ✅ Tìm kiếm sản phẩm theo tên/mô tả
- ✅ Lọc sản phẩm theo danh mục
- ✅ Hệ thống đánh giá sản phẩm
- ✅ Authentication với JWT
- ✅ MongoDB với Mongoose ODM

### Frontend (React.js)
- ✅ Giao diện hiện đại và responsive
- ✅ Lazy loading sản phẩm khi scroll
- ✅ Tìm kiếm và lọc sản phẩm
- ✅ Chi tiết sản phẩm với đánh giá
- ✅ Hệ thống đánh giá sản phẩm
- ✅ Trang chủ với sản phẩm nổi bật

## 📁 Cấu trúc dự án

```
FullStackNodeJS01/
├── ExpressJS01/                 # Backend
│   ├── src/
│   │   ├── config/             # Cấu hình database
│   │   ├── controllers/        # Controllers
│   │   ├── middleware/         # Middleware
│   │   ├── models/            # Mongoose models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── scripts/           # Seed data scripts
│   │   └── server.js          # Entry point
│   └── package.json
├── ReactJS01/                  # Frontend
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── product/       # Product components
│   │   │   ├── common/        # Common components
│   │   │   └── layout/        # Layout components
│   │   ├── pages/             # Page components
│   │   ├── styles/            # Global styles
│   │   └── utils/             # Utilities
│   └── package.json
└── README.md
```

## 🛠️ Cài đặt và chạy dự án

### 1. Cài đặt Backend (Express.js)

```bash
cd ExpressJS01
npm install
```

Tạo file `.env` trong thư mục `ExpressJS01`:
```env
MONGODB_URI=mongodb://localhost:27017/fullstack_nodejs
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
PORT=8080
```

Chạy seed data để tạo sản phẩm mẫu:
```bash
npm run seed
```

Chạy server:
```bash
npm run dev
```

Backend sẽ chạy tại: `http://localhost:8080`

### 2. Cài đặt Frontend (React.js)

```bash
cd ReactJS01
npm install
```

Chạy development server:
```bash
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

## 📚 API Endpoints

### Public APIs (không cần authentication)
- `GET /api/products` - Lấy danh sách sản phẩm (có phân trang)
- `GET /api/products/featured` - Lấy sản phẩm nổi bật
- `GET /api/products/category/:category` - Lấy sản phẩm theo danh mục
- `GET /api/products/search` - Tìm kiếm sản phẩm
- `GET /api/products/categories` - Lấy danh sách danh mục
- `GET /api/products/:id` - Lấy chi tiết sản phẩm

### Protected APIs (cần authentication)
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm
- `POST /api/products/:id/reviews` - Thêm đánh giá sản phẩm

### Query Parameters cho phân trang
- `page` - Trang hiện tại (mặc định: 1)
- `limit` - Số sản phẩm mỗi trang (mặc định: 10)
- `category` - Lọc theo danh mục
- `search` - Tìm kiếm theo từ khóa

## 🎨 Tính năng Frontend

### Trang chủ
- Hero section với call-to-action
- Sản phẩm nổi bật
- Các tính năng nổi bật

### Trang sản phẩm
- Lazy loading khi scroll xuống cuối trang
- Tìm kiếm theo tên sản phẩm
- Lọc theo danh mục
- Hiển thị grid responsive

### Chi tiết sản phẩm
- Thông tin chi tiết sản phẩm
- Hệ thống đánh giá và bình luận
- Form đánh giá sản phẩm

## 🔧 Công nghệ sử dụng

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt (mã hóa mật khẩu)

### Frontend
- React.js
- React Router
- CSS3 (Flexbox, Grid)
- Ant Design Icons

## 📱 Responsive Design

Giao diện được thiết kế responsive, tương thích với:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (dưới 768px)

## 🚀 Tính năng nâng cao

### Lazy Loading
- Tự động load thêm sản phẩm khi scroll đến cuối trang
- Loading indicator khi đang tải
- Tối ưu hiệu suất với infinite scroll

### Tìm kiếm thông minh
- Tìm kiếm theo tên và mô tả sản phẩm
- Highlight kết quả tìm kiếm
- Debounce để tối ưu performance

### Hệ thống đánh giá
- Đánh giá từ 1-5 sao
- Bình luận chi tiết
- Tính điểm trung bình tự động
- Hiển thị số lượng đánh giá

## 📝 Ghi chú

- Đảm bảo MongoDB đang chạy trước khi start backend
- Cần có tài khoản để đánh giá sản phẩm
- Dữ liệu sản phẩm mẫu sẽ được tạo tự động khi chạy seed script
- API sử dụng format response chuẩn với EC (Error Code), EM (Error Message), DT (Data)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request để cải thiện dự án.

## 📄 License

MIT License

