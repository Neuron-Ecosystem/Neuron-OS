const Desktop = {
  icons: [
    { id: 'notes', name: 'Notes', icon: 'notes.svg', url: 'src/apps/notes.html' },
    { id: 'converter', name: 'Converter', icon: 'converter.svg', url: 'src/apps/converter.html' },
    { id: 'budget', name: 'Budget', icon: 'budget.svg', url: 'src/apps/budget.html' },
    { id: 'study', name: 'Study', icon: 'study.svg', url: 'src/apps/study.html' },
    { id: 'tools', name: 'Tools', icon: 'tools.svg', url: 'src/apps/tools.html' },
    { id: 'games', name: 'Games', icon: 'games.svg', url: 'src/apps/games.html' },
    { id: 'password', name: 'Password', icon: 'password.svg', url: 'src/apps/password.html' },
    { id: 'synapse', name: 'Synapse', icon: 'synapse.svg', url: 'src/apps/synapse.html' },
    { id: 'settings', name: 'Settings', icon: 'settings.svg', url: 'src/apps/settings.html' }
  ],

  render() {
    const container = document.getElementById('icons-container');
    container.innerHTML = this.icons.map(app => `
      <div class="desktop-icon" ondblclick="WindowManager.open('${app.id}', '${app.name}', '${app.url}', '${app.icon}')">
        <img src="assets/icons/${app.icon}" alt="${app.name}">
        <span>${app.name}</span>
      </div>
    `).join('');
  }
};
