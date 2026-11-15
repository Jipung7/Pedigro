# PANDUAN PENGGUNA RESMI: PEDIGRO v1.0.0
## Sistem Pemuliaan & Uji Varietas Tanaman Mandiri
**Pengembang**: Jipung (Lone Steed Studio) | **Lisensi**: MIT  
**Kepatuhan Standar**: BrAPI v2.1, UPOV TG Series, UU PVT No. 29/2000

> **Bahasa / Language**: **Bahasa Indonesia** | [English](USER_GUIDE_EN.md)

---

## DAFTAR ISI
1. [Bab 1: Persiapan Perangkat & Cara Menjalankan](#bab-1-persiapan-perangkat--cara-menjalankan)
2. [Bab 2: Panduan Operasional Mode Studio (Laboratorium/Kantor)](#bab-2-panduan-operasional-mode-studio-laboratoriumkantor)
3. [Bab 3: Panduan Operasional Mode Lapangan (Kebun/Scouting)](#bab-3-panduan-operasional-mode-lapangan-kebunscouting)
4. [Bab 4: Analisis Seleksi Multi-Sifat & Cetak Laporan BUSS BPSB](#bab-4-analisis-seleksi-multi-sifat--cetak-laporan-buss-bpsb)
5. [Bab 5: Manajemen Data, Cadangan Kriptografis & Pemindahan Antar-Gawai](#bab-5-manajemen-data-cadangan-kriptografis--pemindahan-antar-gawai)
6. [Bab 6: Pemecahan Masalah di Kebun (Troubleshooting)](#bab-6-pemecahan-masalah-di-kebun-troubleshooting)

---

## Bab 1: Persiapan Perangkat & Cara Menjalankan

Pedigro dirancang agar dapat beroperasi **100% luring (*offline*)** tanpa memerlukan kuota data, sinyal seluler, maupun akun langganan server.

### A. Pengoperasian di Komputer / Laptop Windows
1. Ekstrak berkas `Pedigro-v1.0.0-Portable-Windows.zip` ke folder kerja Anda (misal di `D:\Pedigro\` atau langsung di USB Flashdisk kebun).
2. **Klik ganda berkas `Pedigro-Launcher.bat`**.
3. Aplikasi akan langsung terbuka dalam jendela mandiri (*Dedicated App Window*) beresolusi 1280x820 tanpa bilah menu peramban.
4. *Alternatif*: Anda juga dapat membuka berkas `index.html` secara langsung menggunakan peramban Microsoft Edge atau Google Chrome.

### B. Pengoperasian di Ponsel Pintar / Tablet Android
1. Buka berkas `index.html` di browser Chrome pada ponsel Anda (atau transfer folder Pedigro ke memori ponsel).
2. Ketuk ikon menu titik tiga di kanan atas layar Chrome, lalu pilih **"Tambahkan ke Layar Utama" (*Add to Home Screen*)** atau **"Install Aplikasi"**.
3. Ikon resmi Pedigro berlatar hijau tua (*Deep Forest Green*) akan muncul di menu aplikasi ponsel.
4. Buka aplikasi melalui ikon tersebut: Pedigro kini berjalan secara layar penuh (*fullscreen*) layaknya aplikasi Android native.

---

## Bab 2: Panduan Operasional Mode Studio (Laboratorium/Kantor)

Mode Studio digunakan oleh Pemulia Tanaman (*Plant Breeder*) untuk merencanakan persilangan, mengelola koleksi genetik, dan mencetak stiker penanda tanaman.

### 1. Registrasi Plasma Nutfah (Bank Plasma Nutfah)
- Masuk ke tab **Bank Plasma Nutfah**.
- Klik tombol **"+ Tambah Indukan Baru"**.
- Masukkan informasi varietas:
  - *Nama Varietas / Galur*: Misal "Cabai Rawit Hiyung Asli".
  - *Nomor Aksesi BrAPI*: Misal "ACC-CHL-001".
  - *Peran Kelamin*: [Betina] (Induk Penerima Serbuk) atau [Jantan] (Pemberi Polen).
  - *Spesifikasi Sifat Unggul*: Misal "Tahan antraknosa, brix 11.5, pedas tinggi".
- Data tersimpan secara persisten di basis data lokal `PedigroDB`.

### 2. Pembuatan Proyek Persilangan Baru (Studio Persilangan)
- Masuk ke tab **Studio Persilangan**.
- Klik tombol **"Buat Persilangan Baru"**.
- Pilih Tetua Betina (P1) dan Tetua Jantan (P2) dari koleksi plasma nutfah yang telah didaftarkan.
- Tetapkan kode proyek persilangan (misal `CRS-2026-CHL-F1`) dan target generasi seleksi (`F1`, `F2`, dsb.).
- Sistem otomatis menghasilkan pohon silsilah visual (*Pedigree Tree*) untuk melacak alur genetik tetua.

### 3. Pencetakan Stiker Ajir Fisik Berkode QR (Tagging Generation)
- Pada detail proyek persilangan, buka panel **"Cetak Stiker Ajir Petak"**.
- Sistem akan mengenerasi nomor petak individu (`PLT-XXXXX`) lengkap dengan kode QR kanvas resolusi tinggi.
- Klik tombol **"Cetak Lembar Stiker"** untuk mencetak label pada kertas stiker tahan air, lalu tempelkan stiker pada tiang ajir bambu di kebun riset.

---

## Bab 3: Panduan Operasional Mode Lapangan (Kebun/Scouting)

Mode Lapangan dirancang khusus untuk kenyamanan satu jempol (*one-thumb touch*) di bawah terik matahari kebun dengan kontras tinggi.

### 1. Masuk ke Mode Lapangan
- Pada pojok kanan atas antarmuka, ketuk tombol **"Mode Lapangan"** (ikon smartphone).
- Indikator **"Layar Aktif"** berwarna hijau akan menyala di pojok kanan atas, menandakan *Screen Wake Lock* telah aktif sehingga layar ponsel tidak akan mati otomatis saat Anda mengamati tanaman.

### 2. Pemindaian Stiker Ajir Fisik
- Dekati tiang ajir tanaman yang akan diamati.
- Ketuk tombol **"Buka Kamera Ajir"**.
- Arahkan kamera belakang ke stiker kode QR:
  - Jika cuaca mendung atau berada di bawah naungan daun lebat, ketuk ikon **Senter (*Flashlight*)** untuk menyalakan lampu kilat kamera.
  - Ketika kode QR terdeteksi, sistem akan membunyikan umpan balik suara (*beep* pendek) dan ponsel bergetar.
  - Jendela kamera otomatis tertutup dan formulir observasi tanaman terkait langsung terbuka.
- *Opsi Cadangan*: Jika kamera kotor terkena lumpur, ketuk tombol *"Input Manual Token"* dan ketikkan kode (misal `PLT-CHL-001`).

### 3. Skoring Karakter Morfologi Sesuai Standar UPOV
- Geser slider atau ketuk angka untuk memberi nilai karakter fenotipe baku:
  - *Tingkat Kemanisan (Brix)*: Skala 8.0 s/d 18.0.
  - *Bobot Buah*: Input angka dalam gram.
  - *Skor Ketahanan Hama/Penyakit*: Skala UPOV 1 (Sangat Rentan) hingga 5 (Sangat Tahan/Imun).

### 4. Perekaman Foto Organ Tanaman (Smart Macro Full HD)
- Ketuk tombol **"Ambil Foto Morfologi Tanaman"**.
- Arahkan kamera ke organ pembeda (daun, bunga, atau potongan buah).
- Foto otomatis dikompresi ke resolusi **Full HD 1920x1080 kualitas 82%** (~300 KB):
  - Menghemat 92% memori HP dibanding foto biasa (tidak membuat HP lemot).
  - Guratan urat daun, bulu halus (trikoma), dan tekstur buah **tetap tajam sempurna** untuk bukti resmi laporan BUSS.

### 5. Stempel Koordinat GPS & Penyimpanan Data
- Indikator GPS di bagian atas formulir akan menampilkan status lokasi Anda (misal: `-7.284192, 112.795312 (Akurasi: 3.2m)`).
- Ketuk tombol besar **"Simpan Observasi Petak"**.
- Data observasi, skor sifat, foto Full HD, dan koordinat satelit langsung tersimpan secara aman ke dalam memori ponsel (`PedigroDB`).

---

## Bab 4: Analisis Seleksi Multi-Sifat & Cetak Laporan BUSS BPSB

Setelah selesai mencatat di kebun, pemulia dapat kembali ke Mode Studio di komputer kantor untuk mengevaluasi galur terbaik.

### 1. Pembobotan Indeks Seleksi Multi-Sifat (*Multi-Trait Selection*)
- Buka tab **Matriks Seleksi**.
- Tentukan bobot prioritas pemuliaan menggunakan slider:
  - Bobot Ketahanan Penyakit (misal: 40%)
  - Bobot Potensi Hasil / Bobot Buah (misal: 30%)
  - Bobot Kualitas Rasa / Kemanisan Brix (misal: 30%)
- Sistem otomatis menghitung peringkat varietas terbaik menggunakan algoritma matriks linier ternormalisasi secara instan tanpa nilai bias.

### 2. Ekspor Dokumen Resmi BUSS BPSB
- Buka tab **Laporan Uji BUSS**.
- Pilih varietas calon rilis.
- Sistem secara otomatis menyusun lembar laporan pengujian varietas sesuai format resmi Balai Pengawasan dan Sertifikasi Benih (BPSB):
  - Memuat data silsilah tetua, data agronomi, koefisien keragaman (CV), foto morfologi pembeda, serta stempel koordinat GPS lokasi kebun uji.
- Klik tombol **"Cetak / Ekspor PDF"** untuk mencetak berkas pendaftaran varietas ke dinas pertanian atau kementerian.

---

## Bab 5: Manajemen Data, Cadangan Kriptografis & Pemindahan Antar-Gawai

Pedigro menyediakan sistem cadangan mandiri (*self-contained backup*) berbasis tanda tangan digital SHA-256 untuk memindahkan data antar-komputer atau antar-ponsel dengan aman.

### 1. Mengekspor Cadangan Data (*Export Backup*)
1. Buka tab **Data & Cadangan** di Mode Studio.
2. Klik tombol **"Ekspor Cadangan (.json)"**.
3. Sistem akan menghitung sidik jari kriptografis (SHA-256) dari seluruh koleksi plasma nutfah dan catatan observasi Anda, lalu mengunduh berkas dengan nama:  
   `pedigro_backup_v1.0.0_[Tanggal-Waktu].json`
4. Simpan berkas ini di flashdisk, hard disk eksternal, atau kirimkan via kabel data.

### 2. Memulihkan Data di Gawai Lain (*Import & Verify Backup*)
1. Buka Pedigro di komputer atau ponsel target.
2. Buka tab **Data & Cadangan**, lalu klik **"Pilih Berkas Cadangan (.json)"**.
3. Pilih berkas cadangan Anda:
   - Pedigro akan secara otomatis menghitung ulang sidik jari SHA-256 dari isi berkas.
   - **Jika berkas valid**: Muncul konfirmasi jumlah indukan dan observasi, lalu data berhasil dipulihkan secara utuh 100%.
   - **Jika berkas pernah diedit/rusak**: Sistem memunculkan peringatan keamanan keras dan **menolak memproses berkas** demi menjaga kemurnian data pemuliaan Anda.

### 3. Mengosongkan Basis Data / Memulai Lembar Baru
- Untuk menghapus seluruh data pengujian lama dan memulai musim tanam baru dengan database bersih (*clean slate*), klik tombol **"Kosongkan Seluruh Data"** pada tab Data & Cadangan.
- Untuk menguji fitur menggunakan contoh data latihan cabai dan melon, klik tombol **"Muat Data Latihan / Demo"**.

---

## Bab 6: Pemecahan Masalah di Kebun (Troubleshooting)

| Kendala Lapangan | Penyebab Kemungkinan | Solusi Cepat |
|---|---|---|
| **Kamera pemindai tidak muncul / gelap** | Izin kamera diblokir oleh peramban atau ponsel. | Buka Pengaturan Ponsel -> Aplikasi -> Izin -> Berikan izin Kamera pada peramban Chrome/Edge. Jika tetap tidak bisa, gunakan opsi *"Input Manual Token"* pada layar scanner. |
| **Sinyal GPS berstatus "Mencari Satelit" terlalu lama** | Berada di bawah paranet tebal, kanopi rapat, atau greenhouse rangka baja tertutup. | Tetap lakukan pencatatan dan klik *"Simpan Observasi Petak"*. Sistem tidak memblokir tombol simpan dan akan mencatat waktu lokal serta koordinat perkiraan terakhir. |
| **Layar ponsel tetap mati sendiri di kebun** | Mode hemat baterai ekstrem (*Extreme Battery Saver*) aktif pada ponsel Android. | Nonaktifkan mode hemat baterai pada Android saat sedang melakukan scouting di kebun agar fitur *Screen Wake Lock* dapat bekerja maksimal. |
| **Aplikasi terasa lambat saat memotret** | Menggunakan kamera pihak ketiga beresolusi 108 MP RAW. | Gunakan penangkap foto bawaan aplikasi Pedigro yang otomatis menerapkan *Smart Macro Compression* (resolusi Full HD, ~300 KB). |
| **Berkas cadangan .json ditolak saat pemulihan** | Berkas pernah dibuka dan diubah menggunakan aplikasi editor teks (Notepad/Word) sehingga sidik jari SHA-256 rusak. | Gunakan berkas asli hasil ekspor langsung dari Pedigro tanpa mengubah isi teks di dalamnya. |

---

*Hak Cipta (c) 2026 Jipung (Lone Steed Studio). Pedigro — Solusi Mandiri Pemulia Tanaman Indonesia.*
