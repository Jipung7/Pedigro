# Pedigro — Plant Breeding & Variety Management Platform
**Self-Contained, Offline-First, BrAPI v2.1 Aligned & DUS/BUSS Trial-Ready**  
**Version**: 1.0.0 | **Author**: Jipung (Lone Steed Studio) | **License**: MIT

> **Language**: **English** | [Bahasa Indonesia](README_ID.md)

---

## 1. Overview

**Pedigro** is an offline-first operational software platform engineered for plant breeders, seed producers, university agricultural researchers, and field scouts. It seamlessly bridges indoor laboratory planning (*Studio Mode*) with real-time field phenotyping under harsh, disconnected agricultural conditions (*Field Scout Mode*).

Pedigro complies with the **Breeding API (BrAPI v2.1)** standard, **UPOV TG Guidelines** for Distinctness, Uniformity, and Stability (DUS), and Indonesian Plant Variety Protection regulations (**UU No. 29 Tahun 2000 / UU PVT**).

---

## 2. Key Capabilities

### A. Field Hardware & Agronomic Engine
- **Live Camera Barcode Scanner**: Connects directly to the smartphone rear camera (`facingMode: 'environment'`) to scan physical plot stake QR codes (`PLT-XXXXX`) in under 1 second. Features flashlight/torch control for shaded plant canopies, 880Hz audio confirmation beep, and haptic vibration feedback.
- **Satellite GPS Coordinate Stamping**: Captures precise latitude, longitude, altitude (MSL), and accuracy metrics atomically on every plant observation record via `navigator.geolocation` for legally verifiable multi-environment trial locations.
- **Screen Wake Lock**: Uses the W3C Screen Wake Lock API (`navigator.wakeLock`) in Field Mode so the device display stays active while breeders measure plants with both hands.
- **Smart Macro Compression**: Compresses botanical organ photos to Full HD 1920x1080 at 82% JPEG quality (~250–380 KB). Saves over 90% device memory while preserving 100% of diagnostic trichomes, leaf venation, and fruit net textures required by official DUS examination boards.

### B. Genetic Privacy & Trade Secret Protection (Anti-Leak Guard)
- **Blind Field Scouting**: Field workers only see randomized blind tokens (`PLT-XXXXX`). Original parentage identities, crossing formulas, and germplasm origins remain cryptographically shielded from unauthorized field inspection.

### C. Self-Contained Air-Gap Architecture (Zero-CDN)
- 100% of core runtime libraries (React 18, ReactDOM 18, and Tailwind CSS) are stored locally within the application bundle.
- Pre-compiled ES2020 JavaScript eliminates in-browser runtime compilers, reducing cold-start launch times to **< 0.2 seconds**.
- Strict Content Security Policy (CSP Level 3: `connect-src 'self' blob:`) guarantees zero data leakage to external networks.

### D. Cryptographic Tamper-Proof Backup (SHA-256)
- Exported database archives are encapsulated in self-verifying containers signed with digital SHA-256 checksums. The import engine automatically detects and rejects modified or corrupted backup files.

---

## 3. Project Directory Structure

```
Pedigro/
├── index.html                   <-- Standalone gateway (CSP Level 3)
├── Pedigro-Launcher.bat         <-- One-click Windows native window launcher
├── manifest.json                <-- PWA Manifest
├── package.json                 <-- Build scripts & project configuration
├── sw.js                        <-- Service Worker offline cache v2
├── capacitor.config.json        <-- Android Mobile Shell configuration
├── src-tauri/                   <-- Windows Desktop Shell configuration (Tauri v2)
│   ├── tauri.conf.json
│   ├── Cargo.toml
│   └── src/main.rs
├── android/                     <-- Android native hardware manifest
│   └── app/src/main/AndroidManifest.xml
├── build/                       <-- Binary distribution artifacts
│   └── Pedigro-v1.0.0-Portable-Windows.zip (0.36 MB)
└── src/
    ├── assets/
    │   ├── css/tailwind.min.css         <-- Local standalone stylesheet
    │   └── js/
    │       ├── react.production.min.js  <-- Local React 18
    │       ├── react-dom.production.min.js
    │       └── app.bundle.js            <-- Pre-compiled ES2020 application
    └── data/
        └── dictionaries/                <-- Standard trait dictionaries (Chili & Melon)
```

---

## 4. Quick Start & Execution

### Option 1: Running on Windows PC / Laptop (Portable Standalone)
1. Extract `build/Pedigro-v1.0.0-Portable-Windows.zip` or open the project folder.
2. Double-click **`Pedigro-Launcher.bat`**.
3. Pedigro opens in a dedicated application window without browser URL bars or tabs.
4. Operates 100% offline with zero internet access required.

### Option 2: Installing on Android Devices (PWA Mobile Scout)
1. Open `index.html` using Google Chrome or Microsoft Edge on your Android smartphone.
2. Tap the three-dot browser menu and select **"Add to Home Screen" / "Install App"**.
3. Pedigro installs to your app drawer and launches in fullscreen standalone mode with full camera and GPS sensor access.

### Option 3: Automated Cloud Compilation via GitHub Actions
This repository includes a multiplatform CI/CD workflow at `.github/workflows/build-binaries.yml`.
When you push a version tag:
```bash
git tag v1.0.0
git push origin v1.0.0
```
GitHub Actions automatically builds native installers:
- **`Pedigro-Setup.exe`** (Tauri v2 NSIS Installer, ~8-11 MB)
- **`Pedigro.apk`** (Capacitor Android Release Package, ~9-14 MB)  
and attaches them to your GitHub Releases page.

---

## 5. Regulatory Disclaimer

Pedigro is an operational tool for internal plant breeding, variety tracking, and trial phenotyping. Formal Plant Variety Protection (PVP / PBR) rights and commercial seed certification remain subject to official DUS examination by designated national authorities (such as PVTPP Ministry of Agriculture Republic of Indonesia under Law No. 29/2000, CPVO in the European Union, or USDA PVPO in the United States).

---

## 6. License & Attribution

Copyright (c) 2026 **Jipung (Lone Steed Studio)**.  
Released under the **MIT License**. See [LICENSE](LICENSE) for details.
