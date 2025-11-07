const Assistant = {
  init() {
    document.getElementById('assistant-btn').onclick = () => this.open();
  },

  open() {
    WindowManager.open('assistant', 'Neuron Assistant', 'src/apps/assistant.html', 'synapse.svg');
  },

  handle(cmd) {
    cmd = cmd.trim().toLowerCase();
    if (cmd.startsWith('/open ')) {
      const name = cmd.slice(6);
      const app = Desktop.apps.find(a => a.name.toLowerCase().includes(name));
      if (app) WindowManager.open(app.id, app.name, app.url, app.icon);
    } else if (cmd === '/theme dark') {
      Settings.setTheme('dark');
    } else if (cmd === '/theme light') {
      Settings.setTheme('light');
    } else if (cmd === '/help') {
      alert(`Доступные команды:\n/open notes\n/open converter\n/theme dark\n/theme light\n/help`);
    }
  }
};
