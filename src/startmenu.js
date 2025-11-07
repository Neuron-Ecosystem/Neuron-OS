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

    this.render();
    search.oninput = () => this.filter(search.value);
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
    document.querySelectorAll('.start-app').forEach(app => {
      app.style.display = app.textContent.toLowerCase().includes(query.toLowerCase()) ? 'flex' : 'none';
    });
  }
};
