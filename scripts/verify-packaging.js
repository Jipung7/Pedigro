const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const report = {
  timestamp: new Date().toISOString(),
  phase: 'TAHAP 3 PRODUKSI: PEMBUNGKUSAN NATIVE SHELL (DESKTOP & MOBILE)',
  checks: {},
  passed: true,
  failures: []
};

function check(name, condition, errorMsg) {
  report.checks[name] = !!condition;
  if (!condition) {
    report.passed = false;
    report.failures.push(errorMsg || `Check failed: ${name}`);
  }
}

// 1. Desktop Tauri v2 configuration
const tauriConfPath = path.join(rootDir, 'src-tauri/tauri.conf.json');
check('tauriConfExists', fs.existsSync(tauriConfPath));
if (fs.existsSync(tauriConfPath)) {
  const conf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf8'));
  check('tauriProductNameIsPedigro', conf.productName === 'Pedigro');
  check('tauriIdentifierMatches', conf.identifier === 'com.lonesteed.pedigro');
  check('tauriWindowResolution1280x820', conf.app.windows[0].width === 1280 && conf.app.windows[0].height === 820);
  check('tauriStrictCspPresent', conf.app.security.csp.includes("connect-src 'self' blob:"));
}

const cargoPath = path.join(rootDir, 'src-tauri/Cargo.toml');
check('cargoTomlExists', fs.existsSync(cargoPath));
if (fs.existsSync(cargoPath)) {
  const cargo = fs.readFileSync(cargoPath, 'utf8');
  check('cargoHasPedigroName', cargo.includes('name = "pedigro"'));
  check('cargoHasTauriDependency', cargo.includes('tauri ='));
}

const mainRsPath = path.join(rootDir, 'src-tauri/src/main.rs');
check('mainRsExists', fs.existsSync(mainRsPath));

// 2. Mobile Capacitor configuration
const capConfPath = path.join(rootDir, 'capacitor.config.json');
check('capacitorConfigExists', fs.existsSync(capConfPath));
if (fs.existsSync(capConfPath)) {
  const cap = JSON.parse(fs.readFileSync(capConfPath, 'utf8'));
  check('capAppIdMatches', cap.appId === 'com.lonesteed.pedigro');
  check('capAppNameIsPedigro', cap.appName === 'Pedigro');
  check('capBgColorDeepForestGreen', cap.backgroundColor === '#162D22');
}

const manifestPath = path.join(rootDir, 'android/app/src/main/AndroidManifest.xml');
check('androidManifestExists', fs.existsSync(manifestPath));
if (fs.existsSync(manifestPath)) {
  const xml = fs.readFileSync(manifestPath, 'utf8');
  check('hasCameraPermission', xml.includes('android.permission.CAMERA'));
  check('hasGpsPermission', xml.includes('android.permission.ACCESS_FINE_LOCATION'));
  check('hasWakeLockPermission', xml.includes('android.permission.WAKE_LOCK'));
  check('hasVibratePermission', xml.includes('android.permission.VIBRATE'));
}

// 3. Icons
const iconPath = path.join(rootDir, 'src-tauri/icons/icon.png');
check('iconsGenerated', fs.existsSync(iconPath) && fs.statSync(iconPath).size > 0);

// 4. Zero Emojis in configs
const configFiles = [tauriConfPath, cargoPath, mainRsPath, capConfPath, manifestPath];
let emojiCount = 0;
const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
for (const f of configFiles) {
  if (fs.existsSync(f)) {
    const content = fs.readFileSync(f, 'utf8');
    const matches = content.match(emojiRegex);
    if (matches) emojiCount += matches.length;
  }
}
check('zeroDecorativeEmojis', emojiCount === 0, `Found ${emojiCount} emojis in packaging configs`);

console.log(JSON.stringify(report, null, 2));
if (!report.passed) process.exit(1);
