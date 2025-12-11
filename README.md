# Skill Lane Library Management System

ระบบจัดการห้องสมุด (Library Management System) สำหรับการยืม-คืนหนังสือ พัฒนาด้วย React, TypeScript และ Vite

## 🚀 เทคโนโลจีที่ใช้

- **React 19.2.0** - JavaScript Library สำหรับสร้าง UI
- **TypeScript 5.9.3** - JavaScript with Type Safety
- **Vite 7.2.4** - Build Tool และ Development Server
- **React Router DOM 7.10.1** - Client-side Routing
- **Axios 1.13.2** - HTTP Client สำหรับเรียก API
- **React Hot Toast 2.6.0** - Toast Notifications

## 📋 ความสามารถของระบบ

### Authentication

- 🔐 ระบบ Login/Register
- 🔑 JWT Token Authentication
- 👤 User Session Management

### Book Management

- 📚 ดูรายการหนังสือทั้งหมด
- 🔍 ค้นหาหนังสือ
- ➕ เพิ่มหนังสือใหม่ (ชื่อ, ผู้แต่ง, ISBN, ปีที่พิมพ์, จำนวนเล่ม, รูปปกหนังสือ)
- ✏️ แก้ไขข้อมูลหนังสือ
- 📖 ดูรายละเอียดหนังสือ
- 📸 Upload รูปปกหนังสือ

### Borrow & Return System

- 📤 ยืมหนังสือ (แสดงปุ่มเมื่อ availableQuantity > 0 และ isBorrowed = false)
- 📥 คืนหนังสือ (แสดงปุ่มเมื่อ isBorrowed = true)
- 📊 แสดงจำนวนหนังสือคงเหลือแบบ real-time

## 📦 การติดตั้ง

### ข้อกำหนดเบื้องต้น

- Node.js (เวอร์ชัน 16 ขึ้นไป)
- npm หรือ yarn
- Backend API Server (รันที่ port 3100)

### ขั้นตอนการติดตั้ง

1. Clone repository
   \`\`\`bash
   git clone <repository-url>
   cd skill-lane-web
   \`\`\`

2. ติดตั้ง dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. ตั้งค่า Environment Variables
   \`\`\`bash
   cp .env.example .env
   \`\`\`

4. รัน Development Server
   \`\`\`bash
   npm run dev
   \`\`\`

เว็บจะเปิดที่ \`http://localhost:3100\`

## 🛠️ คำสั่งที่ใช้งาน

\`\`\`bash

# รัน Development Server

npm run dev

# Build สำหรับ Production

npm run build

# Preview Production Build

npm run preview

# Lint Code

npm run lint
\`\`\`

## 📁 โครงสร้างโปรเจค

\`\`\`
src/
├── api/
│ └── axios.ts # Axios instance และ interceptors
├── assets/ # Static assets
├── pages/
│ ├── login/ # หน้า Login
│ ├── register/ # หน้า Register
│ ├── home/ # หน้ารายการหนังสือ
│ └── book/
│ ├── create/ # หน้าสร้างหนังสือ
│ ├── edit/ # หน้าแก้ไขหนังสือ
│ └── detail/ # หน้ารายละเอียดหนังสือ
├── types/
│ └── book.ts # TypeScript Types/Interfaces
├── App.tsx # Main App Component
├── main.tsx # Entry Point
└── index.css # Global Styles
\`\`\`

## 🔌 API Endpoints

ระบบเชื่อมต่อกับ Backend API ผ่าน endpoints ต่อไปนี้:

### Authentication

- \`POST /login\` - เข้าสู่ระบบ
- \`POST /register\` - สมัครสมาชิก

### Books

- \`GET /book\` - ดึงรายการหนังสือทั้งหมด (รองรับ query parameter \`?search=\`)
- \`GET /book/:id\` - ดึงรายละเอียดหนังสือ
- \`POST /book\` - สร้างหนังสือใหม่
- \`PATCH /book/:id\` - แก้ไขข้อมูลหนังสือ
- \`POST /book/upload\` - อัพโหลดรูปปกหนังสือ

### Borrow & Return

- \`POST /book/borrow\` - ยืมหนังสือ
- \`POST /book/:borrowId/return\` - คืนหนังสือ

## 🎨 Features พิเศษ

- ✨ UI/UX สวยงามด้วย Gradient Design
- 📱 Responsive Design
- 🎯 Type Safety ด้วย TypeScript
- 🔄 Real-time State Management
- 🖼️ Image Preview ก่อน Upload
- 🎨 Modern CSS Layout (Flexbox, Grid)
- 🔔 Toast Notifications สำหรับ User Feedback
- 🔐 Protected Routes ด้วย JWT

## 📝 การใช้งานระบบ

1. **เข้าสู่ระบบ** - ใช้ username และ password
2. **ดูรายการหนังสือ** - หน้า Home จะแสดงหนังสือทั้งหมดในระบบ
3. **ค้นหาหนังสือ** - ใช้ช่องค้นหาด้านบน
4. **เพิ่มหนังสือ** - กดปุ่ม "สร้างหนังสือใหม่"
5. **ยืมหนังสือ** - กดปุ่ม "ยืม" บน Card หนังสือ (ถ้ามีหนังสือว่าง)
6. **คืนหนังสือ** - กดปุ่ม "คืน" บน Card หนังสือ (ถ้ายืมอยู่)
7. **แก้ไขหนังสือ** - เข้าหน้ารายละเอียดแล้วกดปุ่ม "แก้ไข"

## 🔧 การตั้งค่า Backend API

โปรเจคนี้ต้องการ Backend API ที่รันอยู่ที่ \`http://localhost:3100\`

ตัวอย่างการตั้งค่า:
\`\`\`typescript
// src/api/axios.ts
const axiosInstance = axios.create({
baseURL: process.env.VITE_API_URL || 'http://localhost:3100',
headers: {
'Content-Type': 'application/json',
},
});
\`\`\`

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
EOF
