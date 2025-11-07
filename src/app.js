/**
 * src/app.js
 * Главный загрузчик системы
 */

document.addEventListener('DOMContentLoaded', () => {
  // Инициализация
  Settings.init();
  Desktop.render();
  StartMenu.init();
  Assistant.init();

  // Часы
  const updateClock = () => {
    const now = new Date();
    document.getElementById('clock').textContent = 
      now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  updateClock();
  setInterval(updateClock, 1000);

  // Кнопка настроек
  document.getElementById('settings-btn').onclick = () => {
    WindowManager.open('settings', 'Settings', 'src/apps/settings.html', 'settings.svg');
  };

  // Обработка команд от Assistant
  window.addEventListener('message', e => {
    if (e.data?.type === 'assistant') {
      Assistant.handle(e.data.cmd);
    }
  });

  // Закрытие меню при клике вне
  document.addEventListener('click', e => {
    const menu = document.getElementById('start-menu');
    const btn = document.getElementById('start-btn');
    if (menu && !menu.classList.contains('hidden') && 
        !btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add('hidden');
    }
  });
});
