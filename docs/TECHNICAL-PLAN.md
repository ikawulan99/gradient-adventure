# Gradient Adventure — Rancangan Teknis Final

## Konfigurasi
- Frontend: HTML5, CSS3, JavaScript ES Modules
- Visual game: Three.js, gaya 2.5D
- Hosting: GitHub Pages
- Backend: Firebase Realtime Database
- Target: 40 siswa per sesi kelas
- Aplikasi terpisah: `student.html` dan `teacher.html`

## Batasan arsitektur
GitHub Pages hanya menyajikan aset statis. Operasi tepercaya (validasi jawaban, pemberian skor final, pembuatan sesi, hak guru) harus dilakukan melalui backend tepercaya, misalnya Cloud Functions for Firebase. Firebase Realtime Database menjadi satu-satunya database aplikasi.

## Rancangan node database
```text
/users/{uid}
/classes/{classId}
/classCodes/{code}
/sessions/{sessionId}
/sessions/{sessionId}/players/{uid}
/sessions/{sessionId}/control
/sessions/{sessionId}/presence/{uid}
/sessions/{sessionId}/progress/{uid}
/questionBank/{world}/{questionId}
/results/{sessionId}/{uid}
```

## Prinsip keamanan
1. Aktifkan Firebase Authentication sebelum akses data siswa/guru dibuka.
2. Gunakan custom claims atau profil peran yang ditulis hanya oleh backend tepercaya untuk membedakan guru dan siswa.
3. Jangan menyimpan `correctAnswer` di jalur yang dapat dibaca klien siswa.
4. Jangan mengizinkan klien menulis skor final atau mengubah peran.
5. Terapkan validasi tipe, rentang nilai, kepemilikan kelas, dan sesi aktif dalam Database Rules/backend.
6. Mulai dengan rules default-deny. Jangan menerbitkan database dengan `.read: true` atau `.write: true`.
7. Gunakan `/.info/connected` dan `onDisconnect()` untuk indikator koneksi/presence, dengan aturan akses yang sesuai.

## Sinkronisasi multiplayer
- Posisi avatar dikirim dengan pembatasan frekuensi dan hanya saat perubahan bermakna.
- Presence dipisahkan dari data progres belajar.
- Jawaban dan progres misi disimpan sebagai event/data terstruktur, bukan dicampur dengan stream posisi.
- Target 40 pemain harus diuji dengan simulasi beban sebelum penggunaan kelas.

## Tahapan
### Tahap 1 — Infrastruktur
Repository, halaman awal, halaman siswa/guru, Firebase project, konfigurasi SDK, database rules tertutup, dan uji koneksi.

### Tahap 2 — Identitas dan kelas
Authentication, role guru/siswa, pembuatan kelas, kode kelas, bergabung ke sesi, dan aturan akses.

### Tahap 3 — Multiplayer
Lobby, avatar 2.5D, presence, posisi pemain, dan kontrol guru realtime.

### Tahap 4 — Game pembelajaran
Graph Mountain, lalu Coordinate Island dan Equation City.

### Tahap 5 — Evaluasi
Final Boss, scoring tepercaya, dashboard analitik, laporan, dan pengujian kelas.
