const Settings = {
  init() {
    const theme = Storage.get('theme', 'dark');
    document.body.classList.toggle('light-theme', theme === 'light');
    const wallpaper = Storage.get('wallpaper', 'default.jpg');
    document.getElementById('wallpaper').src = `assets/wallpapers/${wallpaper}`;
  },
  setTheme(theme) {
    Storage.set('theme', theme);
    document.body.classList.toggle('light-theme', theme === 'light');
  },
  setWallpaper(name) {
    Storage.set('wallpaper', name);
    document.getElementById('wallpaper').src = `assets/wallpapers/${name}`;
  }
};
