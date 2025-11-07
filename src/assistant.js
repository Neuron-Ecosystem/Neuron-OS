/**
 * src/assistant.js
 * Обработчик команд из окна Assistant
 */
const Assistant = {
  init() {
    document.getElementById('assistant-btn').onclick = () => this.open();
  },

  open() {
    WindowManager.open('assistant', 'Neuron Assistant', 'src/apps/assistant.html', 'synapse.svg');
  },

  handle(cmd) {
    cmd = cmd.trim().toLowerCase();
    const chat = parent.document.getElementById('chat');
    if (!chat) return;

    const addMsg = (html) => {
      chat.insertAdjacentHTML('beforeend', `<div class="msg ai">${html}</div>`);
      chat.scrollTop = chat.scrollHeight;
    };

    if (cmd === '/help') {
      addMsg(`
        Доступные команды:<br>
        • /open [app] — открыть приложение<br>
        • /settings — открыть настройки<br>
        • /clear — очистить чат<br>
        • /about — о Neuron OS<br>
        • /theme dark / light — сменить тему
      `);
    } else if (cmd === '/clear') {
      chat.innerHTML = '';
    } else if (cmd === '/about') {
      addMsg('Neuron OS — веб-операционная система в браузере. v2.0');
    } else if (cmd === '/settings') {
      WindowManager.open('settings', 'Settings', 'src/apps/settings.html', 'settings.svg');
    } else if (cmd.startsWith('/open ')) {
      const name = cmd.slice(6);
      const app = Desktop.apps.find(a => a.name.toLowerCase().includes(name));
      if (app) WindowManager.open(app.id, app.name, app.url, app.icon);
    } else if (cmd === '/theme dark') {
      Settings.setTheme('dark');
    } else if (cmd === '/theme light') {
      Settings.setTheme('light');
    }
  }
};
