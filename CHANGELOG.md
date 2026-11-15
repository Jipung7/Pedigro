# Catatan Rilis Pedigro (Changelog)

Seluruh perubahan penting pada proyek Pedigro didokumentasikan di dalam berkas ini.
Format penulisan mengacu pada pedoman baku [Keep a Changelog](https://keepachangelog.com/id-ID/1.1.0/) dan proyek ini mematuhi standar [Semantic Versioning](https://semver.org/lang/id/).

---

## [1.0.0] - 2026-11-15

Rilis produksi resmi pertama (**General Availability**) dari platform **Pedigro**. Mentransformasikan prototipe penelitian menjadi aplikasi mandiri (*standalone*) luring total yang siap digunakan di lapangan kebun maupun komputer laboratorium pemuliaan.

### Ditambahkan (Added)
- **Modul Pemindai Kamera Fisik Riil (Live QR Viewfinder)**:
  - Integrasi video stream kamera belakang (`facingMode: 'environment'`) via `navigator.mediaDevices.getUserMedia`.
  - Jendela bidik reticle hijau, pendeteksian kode QR token `PLT-XXXXX` di bawah 1 detik.
  - Tombol kontrol lampu kilat (*torch/flashlight*) untuk pemindaian di bawah naungan kanopi daun atau cuaca mendung.
  - Umpan balik audio konfirmasi (*beep* 880Hz) dan getar haptik perangkat.
  - Mekanisme toleransi kegagalan (*graceful fallback*): opsi input manual dan pemilih sampel petak saat kamera fisik kotor oleh tanah.
- **Perekaman Koordinat Geolokasi Satelit (GPS Stamping)**:
  - Penangkapan otomatis lintang (*latitude*), bujur (*longitude*), ketinggian dpl (*altitude*), dan akurasi sensor via `navigator.geolocation`.
  - Persistensi koordinat secara atomik ke dalam IndexedDB untuk memenuhi akuntabilitas lokasi lahan uji multilokasi BUSS BPSB (UU No. 29/2000).
- **Anti-Mati Layar Lapangan (Screen Wake Lock)**:
  - Menerapkan W3C Screen Wake Lock API (`navigator.wakeLock`) pada Mode Lapangan agar layar smartphone petugas tidak meredup saat pengukuran tanaman.
  - Deteksi pemulihan otomatis (*auto-reacquire*) saat aplikasi beralih kembali dari latar belakang.
- **Kompresi Morfologi Seimbang (Smart Macro Compression)**:
  - Pipeline kompresi kanvas Full HD 1920x1080 pada kualitas JPEG 82% (~250–380 KB per foto).
  - Menghemat 92% kapasitas memori gawai namun tetap menjaga ketajaman trikoma daun, tekstur kulit buah, dan warna organ untuk bukti laporan resmi varietas.
- **Enjin Integritas Cadangan Kriptografis (SHA-256)**:
  - Ekspor seluruh basis data ke dalam wadah terverifikasi `.json` bertanda tangan digital SHA-256.
  - Fitur deteksi manipulasi (*tamper detection*) otomatis saat pemulihan: menolak impor jika ada 1 karakter yang diubah secara ilegal.
- **Manajemen Basis Data Pengguna**:
  - Tab *"Data & Cadangan"* di Mode Studio dengan tombol *Ekspor Cadangan*, *Pulihkan Data*, *Muat Data Latihan / Demo*, dan *Kosongkan Database*.
- **Konfigurasi Pembungkus Biner Native**:
  - Konfigurasi desktop Windows via Tauri v2 (`src-tauri/tauri.conf.json` & `Cargo.toml`) berdimensi jendela mandiri 1280x820 tanpa bilah peramban.
  - Konfigurasi mobile Android via Capacitor (`capacitor.config.json` & `AndroidManifest.xml`) dengan izin kamera, GPS, wake-lock, dan getar.
  - Kumpulan aset ikon multi-resolusi (`src-tauri/icons/`) dengan tema *Deep Forest Green* (`#162D22`).
- **Artefak Distribusi Portabel**:
  - Paket portabel mandiri `build/Pedigro-v1.0.0-Portable-Windows.zip` berukuran hanya 0.36 MB (360 KB).
  - Skrip peluncur satu-klik `Pedigro-Launcher.bat` yang otomatis membuka aplikasi dalam mode *Dedicated App Window*.
- **Pipeline CI/CD Cloud Build**:
  - Berkas GitHub Actions `.github/workflows/build-binaries.yml` untuk memicu kompilasi biner otomatis `Pedigro-Setup.exe` dan `Pedigro.apk` setiap kali tag rilis dibuat.

### Diubah (Changed)
- **Rebranding Menyeluruh**: Mengganti seluruh nama produk, manifes, basis data, dan dokumentasi dari *BreedFlow* menjadi identitas resmi **Pedigro**.
- **Eliminasi 100% Dependensi Jaringan (Zero CDN)**:
  - Menghapus ketergantungan pada `cdn.tailwindcss.com`, `unpkg.com/react`, `unpkg.com/react-dom`, dan `@babel/standalone`.
  - Seluruh pustaka inti disimpan lokal di dalam folder `src/assets/`.
  - Mengompilasi seluruh sintaks JSX ke standar ES2020 murni (`app.bundle.js`), memangkas *cold-start* menjadi < 0.2 detik.
- **Basis Data Awal Bersih (*Clean Slate by Default*)**: Aplikasi pertama kali dibuka dalam keadaan kosong (0 catatan) tanpa memaksa muatan data dummy.

### Keamanan (Security)
- **Penegakan Content Security Policy (CSP Level 3)**:
  - Menyematkan meta tag CSP `connect-src 'self' blob:` pada gerbang `index.html`.
  - Mengeliminasi fungsi rentan `eval()`, `dangerouslySetInnerHTML`, dan skrip eksternal.
- **Kerahasiaan Formula Varietas (Anti-Leak Guard)**:
  - Mengunci antarmuka *Field Scout* sehingga pekerja kebun hanya melihat kode acak buta `PLT-XXXXX` tanpa mengetahui nama tetua rahasia dan garis persilangan pemulia.

---

[1.0.0]: https://github.com/Jipung7/pedigro/releases/tag/v1.0.0
