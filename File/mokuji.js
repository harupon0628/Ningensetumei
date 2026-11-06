document.addEventListener('DOMContentLoaded', () => {
  // 要素の取得
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerNav = document.getElementById('drawerNav');
  const navOverlay = document.getElementById('navOverlay');
  
  const infoMenuBtn = document.getElementById('infoMenuBtn');
  const infoModal = document.getElementById('infoModal');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // メニューの開閉切り替え処理
  function toggleMenu() {
    hamburgerBtn.classList.toggle('is-active');
    drawerNav.classList.toggle('is-active');
    navOverlay.classList.toggle('is-active');
  }

  function closeMenu() {
    hamburgerBtn.classList.remove('is-active');
    drawerNav.classList.remove('is-active');
    navOverlay.classList.remove('is-active');
  }

  hamburgerBtn.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', closeMenu);

  // 情報モーダル（ポップアップ）表示処理
  function openInfoModal() {
    closeMenu(); // メニューを閉じる
    updateEnvInfo(); // 環境情報を取得・表示
    infoModal.classList.add('is-active');
    infoModal.setAttribute('aria-hidden', 'false');
  }

  function closeInfoModal() {
    infoModal.classList.remove('is-active');
    infoModal.setAttribute('aria-hidden', 'true');
  }

  infoMenuBtn.addEventListener('click', openInfoModal);
  modalOverlay.addEventListener('click', closeInfoModal);
  modalCloseBtn.addEventListener('click', closeInfoModal);

  // ブラウザ・OS・端末情報の解析関数
  function updateEnvInfo() {
    const ua = navigator.userAgent;

    // 1. 現在日時
    const now = new Date();
    const timeStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    document.getElementById('infoTime').textContent = timeStr;

    // 2. ブラウザ判定
    let browser = '不明';
    if (ua.indexOf('Chrome') > -1 && ua.indexOf('Edg') === -1) browser = 'Google Chrome';
    else if (ua.indexOf('Safari') > -1 && ua.indexOf('Chrome') === -1) browser = 'Safari';
    else if (ua.indexOf('Edg') > -1) browser = 'Microsoft Edge';
    else if (ua.indexOf('Firefox') > -1) browser = 'Mozilla Firefox';
    document.getElementById('infoBrowser').textContent = browser;

    // 3. OS & バージョン & 端末名 判定
    let os = '不明';
    let osVer = '不明';
    let device = 'PC / 不明';

    if (ua.indexOf('Win') > -1) {
      os = 'Windows';
      if (ua.indexOf('Windows NT 10.0') > -1) osVer = '10 / 11';
      else if (ua.indexOf('Windows NT 6.3') > -1) osVer = '8.1';
      else if (ua.indexOf('Windows NT 6.1') > -1) osVer = '7';
      device = 'Windows PC';
    } else if (ua.indexOf('Mac OS X') > -1 && ua.indexOf('iPhone') === -1 && ua.indexOf('iPad') === -1) {
      os = 'macOS';
      const match = ua.match(/Mac OS X (\d+[._]\d+[._]?\d*)/);
      if (match) osVer = match[1].replace(/_/g, '.');
      device = 'Mac';
    } else if (ua.indexOf('iPhone') > -1) {
      os = 'iOS';
      const match = ua.match(/OS (\d+[._]\d+[._]?\d*)/);
      if (match) osVer = match[1].replace(/_/g, '.');
      device = 'iPhone';
    } else if (ua.indexOf('iPad') > -1 || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      os = 'iPadOS';
      const match = ua.match(/OS (\d+[._]\d+[._]?\d*)/);
      if (match) osVer = match[1].replace(/_/g, '.');
      device = 'iPad';
    } else if (ua.indexOf('Android') > -1) {
      os = 'Android';
      const match = ua.match(/Android\s([0-9.]+)/);
      if (match) osVer = match[1];
      
      // Android端末名の検出試行
      const deviceMatch = ua.match(/\(([^;]+);[^;]+;\s([^)]+)\)/);
      if (deviceMatch && deviceMatch[2]) {
        device = deviceMatch[2].split(' Build')[0];
      } else {
        device = 'Android Device';
      }
    }

    document.getElementById('infoOS').textContent = os;
    document.getElementById('infoOSVer').textContent = osVer;
    document.getElementById('infoDevice').textContent = device;
  }
});
