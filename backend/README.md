# Backend PSB Pondok Pesantren

REST API untuk sistem Penerimaan Santri Baru (PSB) jenjang SMP dan SMA.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** JWT + Bcrypt
- **Upload:** Multer
- **Export:** ExcelJS

## Instalasi

```bash
# Install dependency
npm install

# Setup environment
cp .env.example .env  # lalu sesuaikan nilai di dalamnya

# Inisialisasi database
npx prisma migrate dev --name init
npx prisma generate

# Seed admin pertama
npm run seed

# Jalankan server
npm run dev
```

## Environment Variables

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `APP_PORT` | Port server | `5000` |
| `APP_ENV` | Environment (`development`/`production`) | `development` |
| `DATABASE_URL` | Koneksi PostgreSQL | - |
| `JWT_SECRET` | Secret key JWT | - |
| `JWT_EXPIRES_in` | Masa berlaku token | `1d` |
| `MAX_FILE_SIZE` | Batas upload (bytes) | `5242880` (5MB) |
| `UPLOAD_DOCUMENT_PATH` | Folder dokumen | `uploads/documents` |
| `UPLOAD_PAYMENT_PATH` | Folder bukti bayar | `uploads/payments` |
| `CORS_ORIGIN` | Origin yang diizinkan | `http://localhost:3000` |

## Akun Admin Awal

```
Email    : admin@pondok.sch.id
Password : admin123
```

**Wajib ganti password** untuk production.

## Endpoint API

### Publik (Tanpa Login)

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/registrations` | Submit pendaftaran |
| `GET` | `/api/registrations/check-status` | Cek status pendaftaran |

### Admin (Perlu Login)

| Method | Endpoint | Fungsi |
|--------|----------|--------|
| `POST` | `/api/admin/login` | Login admin |
| `GET` | `/api/admin/registrations` | Daftar semua pendaftar |
| `GET` | `/api/admin/registrations/:id` | Detail pendaftar |
| `PUT` | `/api/admin/registrations/:id/status` | Ubah status pendaftaran |
| `PUT` | `/api/admin/documents/:id/verify` | Verifikasi dokumen |
| `GET` | `/api/admin/documents/:id/download` | Download dokumen |
| `PUT` | `/api/admin/payments/:id/verify` | Verifikasi pembayaran |
| `GET` | `/api/admin/export/registrations` | Export ke Excel |

## Contoh Request

### Submit Pendaftaran

```bash
curl -X POST http://localhost:5000/api/registrations \
  -F "registration_level=SMP" \
  -F "full_name=Muhammad Alif" \
  -F "birth_place=Bandung" \
  -F "birth_date=2012-05-10" \
  -F "gender=Laki-laki" \
  -F "child_order=1" \
  -F "nisn=1234567890" \
  -F "entry_class=Kelas 7" \
  -F "previous_school=SD Negeri 1" \
  -F "father_name=Budi" \
  -F "father_job=Wiraswasta" \
  -F "father_birth_place=Garut" \
  -F "father_birth_date=1980-01-01" \
  -F "father_phone=08123456789" \
  -F "mother_name=Siti" \
  -F "mother_job=IRT" \
  -F "mother_birth_place=Tasik" \
  -F "mother_birth_date=1985-01-01" \
  -F "mother_phone=08198765432" \
  -F "sender_account_name=Budi" \
  -F "transfer_date=2026-06-01" \
  -F "kartu_keluarga=@kk.pdf" \
  -F "kartu_nisn=@nisn.pdf" \
  -F "akta_kelahiran=@akta.pdf" \
  -F "ktp_orang_tua=@ktp.pdf" \
  -F "transkrip_nilai=@nilai.pdf" \
  -F "ijazah=@ijazah.pdf" \
  -F "payment_proof=@bukti.jpg"
```

### Cek Status

```bash
curl "http://localhost:5000/api/registrations/check-status?registration_number=PSB-2026-0001&access_code=A7K92L"
```

### Login Admin

```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pondok.sch.id","password":"admin123"}'
```

## Status Pendaftaran

| Status | Keterangan |
|--------|------------|
| `MENUNGGU_VERIFIKASI` | Baru dikirim, belum diperiksa |
| `BERKAS_KURANG` | Ada dokumen yang perlu diperbaiki |
| `MENUNGGU_PEMBAYARAN` | Data oke, menunggu bayar |
| `PEMBAYARAN_TERVERIFIKASI` | Pembayaran valid |
| `DITERIMA` | Diterima sebagai santri |
| `DITOLAK` | Tidak diterima |

## Struktur Folder

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Seed admin awal
├── src/
│   ├── config/prisma.js   # Prisma client
│   ├── controllers/       # Business logic
│   ├── middleware/         # Auth, upload, rate limit, error
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   └── app.js             # Express app
├── uploads/               # File upload (gitignored)
├── .env                   # Environment variables
└── server.js              # Entry point
```

## Keamanan

- Password admin di-hash dengan bcrypt
- JWT untuk autentikasi admin
- Rate limiting (50 req/15min publik, 10 req/15min login)
- CORS restricted ke origin tertentu
- Upload dibatasi 5MB, hanya PDF/JPG/PNG
- Dokumen hanya bisa diakses admin (production)
- Input sanitized untuk cegah XSS
- Prisma error handling untuk response yang jelas

## Development

```bash
npm run dev              # Jalankan dengan nodemon
npm run prisma:studio    # Buka Prisma Studio
npm run prisma:migrate   # Jalankan migration
npm run seed             # Seed admin
```
