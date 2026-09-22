# ChickenCek — Aplikasi Kelola Pesanan Ayam Potong

Full-stack app: **React (Vite + Tailwind)** di frontend, **Node.js/Express**
di backend, dengan autentikasi login dan penyimpanan data pesanan/stok.

## Struktur folder

```
chickencek-app/
├── backend/              # API server
│   ├── server.js         # entry point
│   ├── db.js             # baca/tulis db.json
│   ├── db.json           # "database" berbasis file (ganti dgn DB asli utk produksi)
│   ├── middleware/auth.js
│   └── routes/
│       ├── auth.js       # POST /api/auth/login, /logout
│       ├── products.js   # GET /api/products
│       └── orders.js     # GET/POST /api/orders, GET /api/orders/stats
│
└── frontend/             # Aplikasi React
    └── src/
        ├── pages/
        │   ├── Login.jsx
        │   ├── Dashboard.jsx        # Beranda
        │   ├── InputPesanan.jsx     # Input Pesanan Baru
        │   ├── DaftarProduk.jsx     # Daftar Produk
        │   └── StrukSukses.jsx      # Pesanan Berhasil Disimpan
        ├── components/   # BottomNav, StatCard, OrderRow
        ├── context/AppContext.jsx   # state login & data terakhir
        └── api/client.js            # semua pemanggilan ke backend
```

## Cara menjalankan

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

Server akan jalan di `http://localhost:4000`.

### 2. Frontend

Buka terminal baru:

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Buka `http://localhost:5173` di browser.

### Akun untuk login (data contoh)

- Email: `asep@chickencek.id`
- Password: `12345678`

## Yang sudah berfungsi nyata

- Login memanggil API dan menyimpan token sesi (bukan sekadar tampilan).
- Menyimpan pesanan benar-benar mengurangi stok dan menyimpan ke `db.json`
  (data tidak hilang saat server di-restart).
- Nomor pesanan (`CK-xxxxxx`) dibuat otomatis dan berurutan.
- Statistik "Pesanan hari ini" & "Sisa Ayam" dihitung dari data pesanan asli.

## Yang perlu disesuaikan sebelum dipakai produksi

1. **Ganti `db.json` dengan database sungguhan** (PostgreSQL/MySQL/MongoDB).
   Semua query terpusat di `backend/db.js` dan file-file di `routes/`, jadi
   penggantian tidak perlu menyentuh banyak tempat.
2. **Hash password** (misal dengan `bcrypt`) — saat ini password dibandingkan
   sebagai teks biasa untuk kesederhanaan prototipe.
3. **Ganti token sesi in-memory dengan JWT** (`jsonwebtoken`) atau session
   store seperti Redis, supaya sesi tidak hilang setiap kali server restart
   dan bisa berjalan di banyak instance server.
4. **Deploy**: frontend bisa di-deploy ke Vercel/Netlify (`npm run build`
   menghasilkan folder `dist/`), backend ke Railway/Render/VPS. Jangan lupa
   ubah `VITE_API_URL` di `.env` frontend ke URL backend produksi.
5. Tambahkan validasi input yang lebih ketat & rate limiting di backend.

## Kustomisasi tampilan

Semua warna, radius, dan tipografi diatur lewat `tailwind.config.js` di
folder `frontend`, jadi mengubah identitas visual toko (warna, nama,
logo) tinggal ubah di satu tempat.
