/**
 * src/settings.js
 * Управление темой, обоями и пользовательскими фоновыми изображениями
 */
const Settings = {
  init() {
    // Тема
    const theme = Storage.get('theme', 'dark');
    this.setTheme(theme);

    // Обои
    const custom = Storage.get('customWallpaper');
    if (custom) {
      this.applyWallpaper(custom, true);
    } else {
      const saved = Storage.get('wallpaper', 'space.jpg');
      this.applyWallpaper(saved);
    }
  },

  setTheme(theme) {
    Storage.set('theme', theme);
    document.body.classList.toggle('light-theme', theme === 'light');
  },

  setWallpaper(name) {
    Storage.set('wallpaper', name);
    Storage.set('customWallpaper', null);
    this.applyWallpaper(name);
  },

  uploadWallpaper(input) {
    const file = input.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Выберите изображение.');
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      const dataUrl = e.target.result;
      Storage.set('customWallpaper', dataUrl);
      Storage.set('wallpaper', null);
      this.applyWallpaper(dataUrl, true);
    };
    reader.readAsDataURL(file);
  },

  applyWallpaper(src, isCustom = false) {
    const el = document.getElementById('wallpaper');
    if (!el) return;
    if (isCustom) {
      el.style.backgroundImage = `url('${src}')`;
    } else {
      el.style.backgroundImage = `url('assets/wallpapers/${src}')`;
    }
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
  }
};
