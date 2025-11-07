// Инициализация
document.addEventListener('DOMContentLoaded', () => {
  Settings.init();
  Desktop.render();
  StartMenu.init();
  Assistant.init();

  // Часы
  setInterval(() => {
    const now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  }, 1000);
});
