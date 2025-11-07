const StartMenu = {
  init() {
    const btn = document.getElementById('start-btn');
    const menu = document.getElementById('start-menu');
    const search = document.getElementById('start-search');

    btn.onclick = () => menu.classList.toggle('hidden');
    document.addEventListener('click', e => {
      if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
      }
    });

    this.renderApps();
    search.oninput = () => this.filterApps(search.value);
  },

  renderApps() {
    const container = document.getElementById('start-apps');
    container.innerHTML = Desktop.icons.map(app => `
      <div class="start-app" onclick="WindowManager.open('${app.id}', '${app.name}', '${app.url}', '${app.icon}'); document.getElementById('start-menu').classList.add('hidden')">
        <img src="assets/icons/${app.icon}" alt="${app.name}">
        <span>${app.name}</span>
      </div>
    `).join('');
  },

  filterApps(query) {
    const apps = document.querySelectorAll('.start-app');
    apps.forEach(app => {
      const text = app.textContent.toLowerCase();
      app.style.display = text.includes(query.toLowerCase()) ? 'flex' : 'none';
    });
  }
};
