const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.join(__dirname, '..');
const buildDir = path.join(rootDir, 'build');
const stageDir = path.join(buildDir, 'Pedigro-v1.0.0-Portable');
const zipFile = path.join(buildDir, 'Pedigro-v1.0.0-Portable-Windows.zip');

console.log('Building Pedigro v1.0.0 Portable Distribution Package...');

// Clean and recreate stage directory
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
if (fs.existsSync(zipFile)) {
  fs.rmSync(zipFile, { force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

// List of essential standalone files
const filesToCopy = [
  'index.html',
  'manifest.json',
  'sw.js',
  'Pedigro-Launcher.bat',
  'src/assets/css/tailwind.min.css',
  'src/assets/js/react.production.min.js',
  'src/assets/js/react-dom.production.min.js',
  'src/assets/js/app.bundle.js',
  'src/data/dictionaries/traits_chili.json',
  'src/data/dictionaries/traits_melon.json'
];

for (const rel of filesToCopy) {
  const src = path.join(rootDir, rel);
  const dest = path.join(stageDir, rel);
  const parent = path.dirname(dest);
  if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
  fs.copyFileSync(src, dest);
}

console.log(`Copied ${filesToCopy.length} core standalone files to stage directory.`);

// Add a quick README for the portable bundle
const portableReadme = `# PEDIGRO v1.0.0 (PORTABLE STANDALONE)
Sistem Pemuliaan & Uji Varietas Tanaman (BrAPI v2.1 Aligned)
Pengembang: Jipung (Lone Steed Studio)
Lisensi: MIT

CARA MENJALANKAN DI LAPTOP / KOMPUTER:
1. Klik ganda berkas "Pedigro-Launcher.bat" untuk membuka aplikasi dalam mode jendela mandiri (tanpa browser URL bar).
2. Atau klik ganda berkas "index.html" menggunakan peramban apa pun (Microsoft Edge, Google Chrome, dll).
3. Aplikasi berjalan 100% luring (offline) tanpa perlu koneksi internet.

CARA MEMASANG DI SMARTPHONE ANDROID:
1. Salin folder ini atau buka berkas index.html melalui browser Chrome di ponsel.
2. Ketuk menu titik tiga (titik 3 di kanan atas) -> Pilih "Tambahkan ke Layar Utama" (Add to Home Screen).
3. Aplikasi akan otomatis terpasang sebagai aplikasi layar penuh dengan dukungan kamera fisik dan GPS satelit.
`;

fs.writeFileSync(path.join(stageDir, 'PANDUAN_PORTABLE.txt'), portableReadme, 'utf8');

// Compress using .NET ZipFile to avoid headless Write-Progress issues
console.log('Compressing to Pedigro-v1.0.0-Portable-Windows.zip via .NET ZipFile...');
const normalizedStage = stageDir.replace(/\\/g, '/');
const normalizedZip = zipFile.replace(/\\/g, '/');
const psCommand = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${normalizedStage}', '${normalizedZip}')"`;

execSync(psCommand);

const stats = fs.statSync(zipFile);
const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`Successfully created: ${zipFile} (${sizeMb} MB)`);

if (stats.size > 15 * 1024 * 1024) {
  console.error('ERROR: Package exceeds 15 MB threshold!');
  process.exit(1);
} else {
  console.log(`PASSED: Package size is well below 15 MB threshold (${sizeMb} MB).`);
}
