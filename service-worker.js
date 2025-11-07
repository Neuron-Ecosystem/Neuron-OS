const CACHE = 'neuron-os-v1';
const FILES = [
  './',
  'index.html',
  'manifest.json',
  'styles/global.css',
  'styles/desktop.css',
  'styles/window.css',
  'styles/startmenu.css',
  'styles/theme.css',
  'src/app.js',
  'src/desktop.js',
  'src/window.js',
  'src/startmenu.js',
  'src/assistant.js',
  'src/synapse.js',
  'src/settings.js',
  'src/storage.js',
  'assets/wallpapers/default.jpg',
  'assets/logo.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
