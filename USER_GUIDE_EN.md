# OFFICIAL USER MANUAL: PEDIGRO v1.0.0
## Standalone Plant Breeding & Variety Trial Management System
**Author**: Jipung (Lone Steed Studio) | **License**: MIT  
**Standards Compliance**: BrAPI v2.1, UPOV TG Guidelines, UU PVT No. 29/2000

---

## TABLE OF CONTENTS
1. [Chapter 1: Device Setup & Launching Pedigro](#chapter-1-device-setup--launching-pedigro)
2. [Chapter 2: Studio Mode Operations (Office / Lab Planning)](#chapter-2-studio-mode-operations-office--lab-planning)
3. [Chapter 3: Field Scout Mode Operations (Plot Observation & Phenotyping)](#chapter-3-field-scout-mode-operations-plot-observation--phenotyping)
4. [Chapter 4: Multi-Trait Selection & DUS/BUSS Trial Reporting](#chapter-4-multi-trait-selection--dusbuss-trial-reporting)
5. [Chapter 5: Cryptographic Backup, Restore & Multi-Device Synchronization](#chapter-5-cryptographic-backup-restore--multi-device-synchronization)
6. [Chapter 6: Field Troubleshooting](#chapter-6-field-troubleshooting)

---

## Chapter 1: Device Setup & Launching Pedigro

Pedigro operates **100% offline** with zero dependency on internet connectivity, external servers, or subscription accounts.

### A. Windows PC / Field Laptop
1. Extract `Pedigro-v1.0.0-Portable-Windows.zip` to your chosen directory (or directly onto a field USB flash drive).
2. **Double-click `Pedigro-Launcher.bat`**.
3. Pedigro opens in a dedicated window (1280x820) powered by Microsoft Edge WebView2 without address bars or browser tabs.
4. *Alternative*: Double-click `index.html` directly with Microsoft Edge or Google Chrome.

### B. Android Smartphones & Tablets
1. Open `index.html` in Google Chrome on your Android mobile device.
2. Tap the three-dot menu in Chrome (top right) -> Select **"Add to Home Screen"** or **"Install App"**.
3. Pedigro installs to your launcher with a custom Deep Forest Green icon (`#162D22`).
4. Launching the app opens in fullscreen mode with direct hardware access to the rear camera, flashlight, and GPS sensor.

---

## Chapter 2: Studio Mode Operations (Office / Lab Planning)

Studio Mode is designed for Plant Breeders to manage germplasm banks, plan crossing projects, and generate physical barcode stake labels.

### 1. Germplasm Registration (Plasma Nutfah Bank)
- Navigate to the **Bank Plasma Nutfah** tab.
- Click **"+ Tambah Indukan Baru"**.
- Enter line attributes:
  - *Line / Variety Name*: e.g. "Cabai Rawit Hiyung Asli".
  - *BrAPI Accession Number*: e.g. "ACC-CHL-001".
  - *Parent Role*: [Betina] (Seed Parent / Female) or [Jantan] (Pollen Donor / Male).
  - *Key Traits*: e.g. "Anthracnose resistance, Brix 11.5, high capsaicin".
- Data saves permanently in the local `PedigroDB` database.

### 2. Planning Crossings & Pedigree Generation
- Navigate to the **Studio Persilangan** tab.
- Click **"Buat Persilangan Baru"**.
- Select the Female Parent (P1) and Male Parent (P2).
- Set project code (e.g. `CRS-2026-CHL-F1`) and target generation (`F1`, `F2`, etc.).
- The system automatically plots an interactive lineage graph (*Pedigree Tree*) to track parental traits.

### 3. Printing QR Plot Stake Labels
- In the crossing details panel, open **"Cetak Stiker Ajir Petak"**.
- The system generates randomized plot tokens (`PLT-XXXXX`) rendered with high-contrast QR code canvas elements.
- Click **"Cetak Lembar Stiker"** to print waterproof plot tags for bamboo or wooden field stakes.

---

## Chapter 3: Field Scout Mode Operations (Plot Observation & Phenotyping)

Field Scout Mode is tailored for one-thumb touch navigation under bright outdoor sunlight with high contrast.

### 1. Entering Field Scout Mode
- In the top right corner, tap **"Mode Lapangan"** (smartphone icon).
- The green **"Layar Aktif"** indicator illuminates, confirming that the *Screen Wake Lock* is engaged so your display will not sleep while measuring plants.

### 2. Scanning Physical Plot QR Tags
- Approach the plant plot stake.
- Tap **"Buka Kamera Ajir"**.
- Point the camera at the QR sticker:
  - In shaded canopies or overcast weather, tap the **Flashlight / Senter** button to toggle the rear LED torch.
  - Upon detection, an 880Hz audio tone sounds and the device vibrates.
  - The viewfinder closes and loads the corresponding plot form.
- *Fallback*: If the camera lens is muddy, tap *"Input Manual Token"* to type the code manually (e.g. `PLT-CHL-001`).

### 3. Scoring UPOV Standard Traits
- Use quick sliders or tap buttons to record observations:
  - *Brix Sweetness*: 8.0 to 18.0 scale.
  - *Fruit Weight*: Numeric weight in grams.
  - *Pest / Disease Resistance*: 1 (Highly Susceptible) to 5 (Immune / Highly Resistant).

### 4. Smart Macro Botanical Photography
- Tap **"Ambil Foto Morfologi Tanaman"**.
- Photograph diagnostic organs (calyx, leaf venation, fruit netting).
- Automatically compressed to **Full HD 1920x1080 at 82% JPEG (~300 KB)**:
  - Conserves 92% storage memory compared to uncompressed camera photos.
  - Botanical trichomes and fine morphological structures remain razor-sharp for official DUS examination documentation.

### 5. GPS Tagging & Saving
- Confirm satellite lock coordinates at the top of the form (e.g. `-7.284192, 112.795312 (Acc: 3.2m)`).
- Tap **"Simpan Observasi Petak"**.
- All scores, Full HD photos, and GPS stamps commit atomically to `PedigroDB`.

---

## Chapter 4: Multi-Trait Selection & DUS/BUSS Trial Reporting

### 1. Multi-Trait Selection Index Matrix
- Navigate to the **Matriks Seleksi** tab in Studio Mode.
- Adjust trait priority weights using sliders:
  - Disease Resistance Weight (e.g. 40%)
  - Yield Potential Weight (e.g. 30%)
  - Quality / Brix Weight (e.g. 30%)
- Normalized linear matrix algorithms compute rank scores in real-time.

### 2. DUS / BUSS Official Certification Reports
- Navigate to the **Laporan Uji BUSS** tab.
- Select the candidate variety.
- System automatically compiles standard BPSB / DUS examination sheets:
  - Lineage pedigree, phenotypic means, coefficient of variation (CV), morphological photos, and verifiable GPS coordinates.
- Click **"Cetak / Ekspor PDF"** to print submission documents.

---

## Chapter 5: Cryptographic Backup, Restore & Multi-Device Synchronization

Pedigro includes a digital signature engine based on SHA-256 to ensure data integrity when moving data across devices via USB or local storage.

### 1. Exporting Verified Backup
1. Go to the **Data & Cadangan** tab in Studio Mode.
2. Click **"Ekspor Cadangan (.json)"**.
3. A self-verifying container signed with a SHA-256 hash downloads as `pedigro_backup_v1.0.0_[Timestamp].json`.

### 2. Importing & Verifying on Another Device
1. Open Pedigro on the target device.
2. Go to **Data & Cadangan** and click **"Pilih Berkas Cadangan (.json)"**.
3. Pedigro recomputes the SHA-256 hash of the payload:
   - **If valid**: Data restores completely with confirmation summary.
   - **If tampered or corrupt**: System alerts a security warning and **aborts import** to preserve variety data integrity.

---

## Chapter 6: Field Troubleshooting

| Issue | Cause | Solution |
|---|---|---|
| **Camera viewfinder is dark or fails to start** | Camera permission was declined by the OS/browser. | In Android Settings -> Apps -> Chrome/Edge -> Permissions -> Allow Camera. Or use the manual token entry fallback button. |
| **GPS status stuck on "Mencari Satelit"** | Under dense shade netting, greenhouse steel frames, or thick tree canopies. | Proceed to save normally. Pedigro does not block saving and records the last known coordinates with local timestamp. |
| **Phone screen turns off during field measuring** | Android Extreme Battery Saver mode is overriding Wake Lock. | Disable battery saver while in the field so the Screen Wake Lock remains active. |
| **Backup .json rejected during restore** | File was opened and modified with a text editor (Word/Notepad). | Use original, untampered export files directly generated by Pedigro. |

---

*Copyright (c) 2026 Jipung (Lone Steed Studio). Pedigro — Plant Breeding Platform.*
