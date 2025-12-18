# 🛍️ Product Recommendation System

Sistem Rekomendasi Produk menggunakan **Weighted Score Algorithm** - Proyek Akhir Mata Kuliah Logika Pemrograman

## 📋 Deskripsi

Aplikasi web berbasis Node.js yang mengimplementasikan sistem rekomendasi produk menggunakan algoritma weighted score. Aplikasi ini menggabungkan konsep Object-Oriented Programming (OOP), algoritma matematis, Sequelize ORM, dan EJS templating.

## 🎯 Fitur Utama

### 1. **Object-Oriented Programming (OOP)**
- `ProductBase` class sebagai base class dengan properti dan method dasar
- `RecommendedProduct` class dengan inheritance dari ProductBase
- Implementasi polymorphism pada method `getInfo()`

### 2. **Algoritma Matematis (Weighted Score)**
Formula: `Score = (w₁ × normalized_rating) + (w₂ × normalized_popularity) + (w₃ × normalized_price)`

Komponen:
- **Rating**: Skor rating produk (0-5)
- **Popularity**: Jumlah view/popularitas produk
- **Price**: Harga produk (semakin murah semakin baik)

Normalisasi menggunakan **Min-Max Normalization**:
```
normalized_value = (value - min) / (max - min)
```

### 3. **Sequelize ORM**
- Relasi One-to-Many antara Category dan Product
- CRUD lengkap untuk Product model
- Auto-sync database dengan seed data

### 4. **Promise/Async-Await**
- Semua operasi database menggunakan async/await
- Error handling dengan try-catch
- Asynchronous data fetching dan processing

### 5. **EJS Frontend**
- Template inheritance dengan `layout.ejs`
- 3+ halaman: Home, Products, Recommendations
- Dynamic rendering dengan Bootstrap 5

## 🚀 Instalasi & Cara Menjalankan

### Prerequisites
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. **Clone repository**
```bash
git clone <repository-url>
cd product-recommendation-system
```

2. **Install dependencies**
```bash
npm install
```

3. **Buat file .env**
```bash
PORT=3000
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
```

4. **Jalankan aplikasi**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

5. **Akses aplikasi**
- Home: http://localhost:3000
- Products: http://localhost:3000/products
- Recommendations: http://localhost:3000/recommendations

## 📁 Struktur Project

```
product-recommendation-system/
├── config/
│   └── database.js              # Konfigurasi Sequelize
├── models/
│   ├── Category.js              # Model Category
│   ├── Product.js               # Model Product
│   ├── index.js                 # Setup & sync database
│   └── classes/
│       ├── ProductBase.js       # Base class (OOP)
│       └── RecommendedProduct.js # Extended class (Inheritance)
├── controllers/
│   ├── productController.js     # CRUD operations
│   └── recommendationController.js # Recommendation logic
├── routes/
│   ├── index.js                 # Home routes
│   ├── productRoutes.js         # Product routes
│   └── recommendationRoutes.js  # Recommendation routes
├── views/
│   ├── layouts/main.ejs         # Layout template
│   ├── home.ejs                 # Homepage
│   ├── products/                # Product views
│   └── recommendations/         # Recommendation views
├── utils/
│   └── algorithm.js             # Weighted score algorithm
├── public/
│   ├── css/style.css            # Custom styles
│   └── js/main.js               # Frontend JavaScript
├── .env                         # Environment variables
├── package.json                 # Dependencies
├── app.js                       # Entry point
└── README.md                    # Documentation
```

## 🎓 Pemenuhan Requirement

### CPMK-1: Algoritma Matematis (50%)
✅ **Weighted Score Algorithm** di `utils/algorithm.js`
- Min-Max Normalization
- Weighted scoring dengan bobot dinamis
- Sorting berdasarkan recommendation score

✅ **OOP Implementation**
- 2 class: `ProductBase` dan `RecommendedProduct`
- Inheritance: RecommendedProduct extends ProductBase
- Polymorphism: Override method `getInfo()`

### CPMK-2: Teknologi Modern (50%)
✅ **Promise/Async-Await**
- Semua database queries menggunakan async/await
- Error handling dengan try-catch
- Asynchronous data processing

✅ **Sequelize ORM**
- 2 tabel dengan relasi: Category (1) → Product (Many)
- CRUD lengkap untuk Product model
- Auto-sync dan seed data

✅ **EJS Frontend**
- Template inheritance dengan `layouts/main.ejs`
- 3+ halaman: Home, Products List, Product Form, Recommendations
- Dynamic data rendering

## 📊 Contoh Penggunaan

### 1. Mengelola Produk
- Tambah produk baru dengan kategori, harga, rating, dll
- Edit informasi produk
- Hapus produk
- Lihat daftar semua produk

### 2. Melihat Rekomendasi
- Sistem otomatis menghitung skor untuk setiap produk
- Filter berdasarkan kategori
- Sesuaikan bobot (rating, popularity, price)
- Produk diurutkan dari skor tertinggi ke terendah

### 3. Memahami Algoritma
Contoh perhitungan:
```
Produk A:
- Rating: 4.5/5 (normalized: 0.90)
- Views: 150 (normalized: 0.75)
- Price: Rp 500.000 (normalized: 0.80, inverse)

Bobot: Rating=0.4, Popularity=0.3, Price=0.3

Score = (0.4 × 0.90) + (0.3 × 0.75) + (0.3 × 0.80)
      = 0.36 + 0.225 + 0.24
      = 0.825 (82.5%)
```

## 🔧 Dependencies

```json
{
  "express": "^4.18.2",
  "ejs": "^3.1.9",
  "sequelize": "^6.35.0",
  "sqlite3": "^5.1.6",
  "dotenv": "^16.3.1",
  "body-parser": "^1.20.2",
  "method-override": "^3.0.0"
}
```

## 📝 Database Schema (ERD)

```
┌──────────────┐         ┌──────────────┐
│  Category    │         │   Product    │
├──────────────┤         ├──────────────┤
│ id (PK)      │───1:N───│ id (PK)      │
│ name         │         │ name         │
│ description  │         │ description  │
│ createdAt    │         │ price        │
│ updatedAt    │         │ rating       │
└──────────────┘         │ viewCount    │
                         │ stock        │
                         │ categoryId(FK)│
                         │ createdAt    │
                         │ updatedAt    │
                         └──────────────┘
```

## 👨‍💻 Author

- **Muhammad Rafif (2510312020)**
- **Nyoman Gede Sendy Andriana (2510312001)**
- **Bima Tirta Gilang Utomo (2510312002)**
- Mata Kuliah: Logika Pemrograman
- Dosen: Yulizar Widiatama, Bach.Tech.Mgt(Hons), M.Eng

## 📄 License

MIT License - Free to use for educational purposes

## 🙏 Acknowledgments

- Bootstrap 5 untuk UI framework
- Sequelize untuk ORM
- Express.js untuk web framework
- EJS untuk templating engine

---

**Catatan:** Proyek ini dibuat untuk memenuhi tugas akhir mata kuliah Logika Pemrograman sebagai pengganti UAS.
