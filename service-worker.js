const CACHE = 'neuron-os-v4';
const FILES = [
  './', 'index.html', 'manifest.json',
  'styles/global.css', 'styles/desktop.css', 'styles/window.css',
  'styles/startmenu.css', 'styles/dock.css', 'styles/theme.css',
  'src/app.js', 'src/desktop.js', 'src/window.js', 'src/startmenu.js',
  'src/assistant.js', 'src/settings.js', 'src/storage.js',
  'assets/logo.svg',
  'assets/wallpapers/space.jpg',
  'assets/wallpapers/nature.jpg',
  'assets/wallpapers/city.jpg',
  'assets/wallpapers/abstract.jpg',
  'assets/wallpapers/minimal.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
