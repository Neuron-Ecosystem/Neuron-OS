const Assistant = {
  init() {
    document.getElementById('assistant-btn').onclick = () => this.open();
  },

  open() {
    WindowManager.open('assistant', 'Neuron Assistant', 'src/apps/synapse.html', 'synapse.svg');
  },

  handleCommand(cmd) {
    cmd = cmd.trim().toLowerCase();
    if (cmd.startsWith('/open ')) {
      const app = cmd.slice(6);
      const found = Desktop.icons.find(a => a.name.toLowerCase().includes(app));
      if (found) WindowManager.open(found.id, found.name, found.url, found.icon);
    } else if (cmd === '/theme dark') {
      Settings.setTheme('dark');
    } else if (cmd === '/theme light') {
      Settings.setTheme('light');
    } else if (cmd === '/help') {
      alert(`/open notes\n/open converter\n/theme dark\n/help`);
    }
  }
};
