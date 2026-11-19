# Gradient Adventure — Phase 2 (Authentication foundation)

## Fitur pada versi ini
- `index.html`: halaman utama dan indikator koneksi Realtime Database.
- `student.html`: form kode kelas/nama tampilan dan login siswa anonim.
- `teacher.html`: form login email/password dan dashboard dengan pemeriksaan hak akses.
- `js/firebase-config.js`: konfigurasi Firebase Web App (dipertahankan dari berkas Phase 1).
- `js/app.js`: inisialisasi Firebase App, Authentication, Realtime Database, dan status koneksi.
- `js/student.js`: autentikasi anonim siswa.
- `js/teacher.js`: autentikasi email/password dan verifikasi custom claim guru.
- `database.rules.json`: tetap default-deny.

## Pengaturan Firebase yang wajib dilakukan
Di Firebase Console > Authentication > Sign-in method:
1. Aktifkan **Anonymous** untuk siswa.
2. Aktifkan **Email/Password** untuk guru.
3. Buat akun guru melalui proses administrasi yang Anda kendalikan.

### Hak akses guru
Login email/password saja tidak otomatis membuktikan bahwa pengguna adalah guru. Dashboard memeriksa custom claim dari token Firebase:
- `role: "teacher"`, atau
- `isTeacher: true`, atau
- `admin: true`.

Tetapkan claim tersebut hanya melalui lingkungan backend tepercaya menggunakan Firebase Admin SDK. Jangan pernah menaruh service-account key di repository atau browser. Setelah claim ditetapkan, guru perlu login ulang agar token baru diterbitkan.

## Catatan penting tentang Realtime Database
Aturan `database.rules.json` sengaja tetap menolak seluruh operasi baca/tulis. Ini mencegah data kelas dan siswa terbuka sebelum desain keamanan final diterapkan. Aplikasi memeriksa status koneksi database, tetapi belum menulis profil siswa, memvalidasi kode kelas, atau membuat sesi. Bagian tersebut memerlukan Database Rules dan/atau backend tepercaya (misalnya Cloud Functions) sesuai rancangan teknis.

## Menjalankan lokal
Karena menggunakan JavaScript ES Modules, jalankan melalui web server lokal:
```bash
python -m http.server 8000
```
Buka `http://localhost:8000`.

## GitHub Pages
Unggah isi folder `gradient-adventure-phase1` ke root repository `gradient-adventure`, lalu aktifkan Settings > Pages > Deploy from a branch.

## Keamanan
- Jangan mengubah database rules menjadi `.read: true` atau `.write: true`.
- Jangan menyimpan password guru di kode.
- Firebase Web config memang berada di frontend; keamanan data harus ditegakkan melalui Authentication, Rules, dan backend tepercaya.
- Fitur multiplayer, validasi kode kelas, kontrol sesi, dan penyimpanan progres belum termasuk dalam versi ini.
