/**
 * src/startmenu.js
 * Меню Пуск
 */

const StartMenu = {
  init() {
    const btn = document.getElementById('start-btn');
    const menu = document.getElementById('start-menu');
    const search = document.getElementById('start-search');

    btn.onclick = () => menu.classList.toggle('hidden');

    this.render();
    search.oninput = () => this.filter(search.value);
    search.focus();
  },

  render() {
    const container = document.getElementById('start-apps');
    container.innerHTML = Desktop.apps.map(app => `
      <div class="start-app" onclick="WindowManager.open('${app.id}', '${app.name}', '${app.url}', '${app.icon}'); document.getElementById('start-menu').classList.add('hidden')">
        <img src="assets/icons/${app.icon}" alt="${app.name}">
        <span>${app.name}</span>
      </div>
    `).join('');
  },

  filter(query) {
    const lower = query.toLowerCase();
    document.querySelectorAll('.start-app').forEach(app => {
      const text = app.textContent.toLowerCase();
      app.style.display = text.includes(lower) ? 'flex' : 'none';
    });
  }
};
