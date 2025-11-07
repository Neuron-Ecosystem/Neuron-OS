document.addEventListener('DOMContentLoaded', () => {
  Settings.init();
  Desktop.render();
  StartMenu.init();
  Assistant.init();

  // Часы
  setInterval(() => {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }, 1000);

  // Настройки
  document.getElementById('settings-btn').onclick = () => {
    WindowManager.open('settings', 'Settings', 'src/apps/settings.html', 'settings.svg');
  };

  // Команды от Assistant
  window.addEventListener('message', e => {
    if (e.data?.type === 'assistant') Assistant.handle(e.data.cmd);
  });
});
