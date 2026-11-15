# Pedigro — Sistem Pemuliaan & Uji Varietas Tanaman
**Platform Pemuliaan Mandiri (Offline-First, BrAPI v2.1 Aligned & Siap Uji BUSS)**  
**Versi**: 1.0.0 | **Pengembang**: Jipung (Lone Steed Studio) | **Lisensi**: MIT

> **Bahasa / Language**: [English](README.md) | **Bahasa Indonesia**

---

## 1. Ikhtisar Platform

**Pedigro** adalah perangkat lunak operasional pemuliaan tanaman (*plant breeding*) dan manajemen varietas yang dirancang khusus untuk bekerja secara mandiri tanpa ketergantungan internet (*100% offline air-gap*). Platform ini menjembatani aktivitas riset di laboratorium/kantor pemuliaan (*Mode Studio*) dengan aktivitas pencatatan fenotipe langsung di lahan pertanian (*Mode Lapangan*).

Pedigro dibangun dengan mematuhi standar internasional **Breeding API (BrAPI v2.1)**, panduan pengujian **UPOV TG Series**, dan ketentuan uji Baru, Unik, Seragam, Stabil (**BUSS**) untuk Perlindungan Varietas Tanaman sesuai amanat **UU No. 29 Tahun 2000**.

---

## 2. Fitur Unggulan

### A. Lapisan Fisik & Agronomi Kebun (Field Scout Engine)
- **Live Camera Barcode Scanner**: Mengintegrasikan sensor kamera belakang ponsel pintar untuk memindai kode QR fisik pada stiker ajir tanaman secara instan (< 1 detik) lengkap dengan tombol senter (*torch*), *beep audio* 880Hz, dan getar haptik.
- **Perekaman Koordinat GPS Satelit**: Menangkap titik lintang, bujur, ketinggian dpl, dan tingkat akurasi sensor secara atomik pada setiap lembar observasi tanaman untuk keabsahan hukum lokasi lahan uji multilokasi BUSS BPSB.
- **Screen Wake Lock**: Mengunci layar ponsel agar tidak meredup atau mati otomatis saat pemulia melakukan pengukuran morfologi menggunakan kedua tangan.
- **Smart Macro Compression**: Kompresi foto bukti organ tanaman ke resolusi Full HD 1920px kualitas 82% JPEG (~250–380 KB). Menghemat kapasitas memori hingga 92% namun tetap mempertahankan ketajaman trikoma dan tekstur daun untuk dokumen resmi varietas.

### B. Keamanan & Kerahasiaan Formula Varietas (Anti-Leak Guard)
- **Blind Field Scouting**: Petugas lapangan hanya melihat kode acak buta (`PLT-XXXXX`). Nama asli galur tetua, asal-usul plasma nutfah, dan silsilah persilangan disembunyikan secara kriptografis sehingga formula varietas aman dari kebocoran data.

### C. Arsitektur Mandiri Bebas Jaringan (Zero-CDN & Air-Gap)
- Seluruh pustaka (React 18, ReactDOM 18, dan Tailwind CSS) tertanam 100% lokal.
- Kode aplikasi telah dipra-kompilasi (*pre-compiled*) ke standar ES2020 murni, menghilangkan kebutuhan compiler runtime di peramban dan memangkas waktu buka awal (*cold-start*) menjadi < 0.2 detik.
- Mengunci Content Security Policy (CSP Level 3) ketat (`connect-src 'self' blob:`) yang mencegah transmisi data tanpa izin ke luar perangkat.

### D. Integritas Cadangan Kriptografis (SHA-256 Tamper-Proof)
- Setiap ekspor data cadangan dibungkus dalam wadah terverifikasi digital. Sistem secara otomatis menolak pemulihan berkas cadangan jika terjadi manipulasi data sekecil apa pun saat ditransfer antar-perangkat.

---

## 3. Struktur Direktori Proyek

```
Pedigro/
├── index.html                   <-- Gerbang mandiri aplikasi (CSP Level 3)
├── Pedigro-Launcher.bat         <-- Peluncur 1-klik Windows (Dedicated App Mode)
├── manifest.json                <-- PWA Manifest
├── package.json                 <-- Konfigurasi & skrip otomasi
├── sw.js                        <-- Service Worker offline cache v2
├── capacitor.config.json        <-- Konfigurasi shell Android Mobile
├── src-tauri/                   <-- Konfigurasi shell Windows Desktop (Tauri v2)
│   ├── tauri.conf.json
│   ├── Cargo.toml
│   └── src/main.rs
├── android/                     <-- Android native hardware manifest
│   └── app/src/main/AndroidManifest.xml
├── build/                       <-- Artefak distribusi biner
│   └── Pedigro-v1.0.0-Portable-Windows.zip (0.36 MB)
└── src/
    ├── assets/
    │   ├── css/tailwind.min.css         <-- Stylesheet lokal mandiri
    │   └── js/
    │       ├── react.production.min.js  <-- React 18 lokal
    │       ├── react-dom.production.min.js
    │       └── app.bundle.js            <-- Logika aplikasi ES2020
    └── data/
        └── dictionaries/                <-- Kamus sifat baku Cabai & Melon
```

---

## 4. Cara Menjalankan Aplikasi

### Opsi 1: Menjalankan di Komputer / Laptop Windows (Portabel)
1. Buka folder proyek atau ekstrak berkas `build/Pedigro-v1.0.0-Portable-Windows.zip`.
2. Klik ganda berkas **`Pedigro-Launcher.bat`**.
3. Aplikasi akan langsung terbuka dalam jendela mandiri (*Dedicated App Window*) tanpa bilah peramban web.
4. Anda dapat memutuskan seluruh koneksi internet (Wi-Fi/LAN); aplikasi tetap berjalan 100% normal.

### Opsi 2: Memasang di Smartphone Android (PWA / Mobile Scout)
1. Buka berkas `index.html` menggunakan peramban Google Chrome atau Microsoft Edge di ponsel Android Anda.
2. Ketuk ikon menu titik tiga di pojok kanan atas, lalu pilih **"Tambahkan ke Layar Utama" / "Install Aplikasi"**.
3. Ikon Pedigro akan muncul di daftar aplikasi ponsel Anda dan dapat diluncurkan secara layar penuh luring lengkap dengan fitur kamera fisik dan GPS satelit.

### Opsi 3: Kompilasi Biner Otomatis via Cloud (GitHub Actions)
Repositori ini telah dilengkapi berkas alur kerja otomatis `.github/workflows/build-binaries.yml`.
Saat Anda melakukan push tag versi ke GitHub:
```bash
git tag v1.0.0
git push origin v1.0.0
```
Server GitHub Actions akan secara otomatis mengompilasi biner installer Windows (`Pedigro-Setup.exe` via Tauri v2) dan paket Android (`Pedigro.apk` via Capacitor) dan melampirkannya di halaman GitHub Releases.

---

## 5. Penafian Hukum & Kepatuhan Regulasi

Pedigro adalah instrumen perangkat lunak operasional untuk mempermudah pencatatan, pengujian, dan tata kelola pemuliaan tanaman secara internal. Hak resmi Perlindungan Varietas Tanaman (PVT) serta peredaran benih komersial di wilayah Republik Indonesia tetap tunduk pada proses sertifikasi resmi dan uji BUSS oleh **Pusat Perlindungan Varietas Tanaman dan Perizinan Pertanian (PVTPP)** Kementerian Pertanian Republik Indonesia sesuai **Undang-Undang No. 29 Tahun 2000**.

---

## 6. Hak Cipta & Lisensi

Hak Cipta (c) 2026 **Jipung (Lone Steed Studio)**.  
Didistribusikan di bawah lisensi resmi **MIT License**. Lihat berkas [LICENSE](file:///c:/Users/MyBook%20Hype%20AMD/Documents/Project/Antigravity/App%20idea/AppIdea2/Pedigro/LICENSE) untuk ketentuan lengkap.
