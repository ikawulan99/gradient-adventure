# Gradient Adventure — Phase 1

Kerangka awal aplikasi Gradient Adventure.

## Isi
- `index.html`: halaman utama
- `student.html`: kerangka halaman siswa
- `teacher.html`: kerangka dashboard guru
- `css/main.css`: gaya antarmuka
- `js/firebase-config.js`: tempat konfigurasi Firebase Web App
- `js/app.js`: pemeriksaan koneksi Firebase
- `database.rules.json`: aturan awal default-deny
- `docs/TECHNICAL-PLAN.md`: rancangan teknis

## Menjalankan
Karena menggunakan JavaScript ES Modules, jalankan melalui web server lokal (bukan membuka file HTML langsung). Contoh:
`python -m http.server 8000`
Lalu buka `http://localhost:8000`.

## Menghubungkan Firebase
1. Buat Firebase Project.
2. Buat Realtime Database.
3. Tambahkan aplikasi Web di Project settings.
4. Salin konfigurasi Web App ke `js/firebase-config.js`.
5. Pertahankan database rules default-deny sampai Authentication dan aturan peran siap.
6. Jangan menambahkan service-account key atau private key ke repository.

## GitHub Pages
Unggah isi folder ini ke repository GitHub. Aktifkan Settings > Pages > Deploy from a branch, pilih branch utama dan folder root.

Catatan: halaman saat ini adalah scaffold Tahap 1, belum merupakan game multiplayer yang selesai.
