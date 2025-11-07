/**
 * src/desktop.js
 * Рендеринг иконок на рабочем столе
 */

const Desktop = {
  apps: [
    { id: 'notes', name: 'Notes', icon: 'notes.svg', url: 'src/apps/notes.html' },
    { id: 'converter', name: 'Converter', icon: 'converter.svg', url: 'src/apps/converter.html' },
    { id: 'budget', name: 'Budget', icon: 'budget.svg', url: 'src/apps/budget.html' },
    { id: 'tools', name: 'Tools', icon: 'tools.svg', url: 'src/apps/tools.html' },
    { id: 'games', name: 'Games', icon: 'games.svg', url: 'src/apps/games.html' },
    { id: 'synapse', name: 'Synapse', icon: 'synapse.svg', url: 'src/apps/synapse.html' }
  ],

  render() {
    const container = document.getElementById('icons-container');
    container.innerHTML = this.apps.map(app => `
      <div class="desktop-icon" ondblclick="WindowManager.open('${app.id}', '${app.name}', '${app.url}', '${app.icon}')">
        <img src="assets/icons/${app.icon}" alt="${app.name}" loading="lazy">
        <span>${app.name}</span>
      </div>
    `).join('');
  }
};
