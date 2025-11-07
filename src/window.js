const WindowManager = {
  windows: [],
  zIndex: 100,

  open(id, title, url, icon) {
    if (this.windows.find(w => w.id === id)) return this.focus(id);

    const win = { id, title, url, icon, element: null, minimized: false, maximized: false };
    const el = document.createElement('div');
    el.className = 'window';
    el.style.left = `${120 + this.windows.length * 40}px`;
    el.style.top = `${120 + this.windows.length * 40}px`;
    el.style.width = '860px';
    el.style.height = '620px';
    el.style.zIndex = this.zIndex++;

    el.innerHTML = `
      <div class="window-header">
        <img src="assets/icons/${icon}" alt="${title}">
        <span>${title}</span>
        <div class="window-controls">
          <div class="window-btn minimize" onclick="WindowManager.minimize('${id}')"></div>
          <div class="window-btn maximize" onclick="WindowManager.toggleMax('${id}')"></div>
          <div class="window-btn close" onclick="WindowManager.close('${id}')"></div>
        </div>
      </div>
      <div class="window-content">
        <iframe src="${url}" frameborder="0"></iframe>
      </div>
    `;

    document.getElementById('windows-container').appendChild(el);
    win.element = el;
    this.windows.push(win);
    this.updateTaskbar();
    this.makeDraggable(el);
  },

  close(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win) return;
    win.element.style.animation = 'windowOpen 0.3s reverse';
    setTimeout(() => {
      win.element.remove();
      this.windows = this.windows.filter(w => w.id !== id);
      this.updateTaskbar();
    }, 300);
  },

  minimize(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win) return;
    win.element.style.display = win.element.style.display === 'none' ? 'flex' : 'none';
    win.minimized = !win.minimized;
    this.updateTaskbar();
  },

  toggleMax(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win) return;
    win.maximized = !win.maximized;
    const el = win.element;
    if (win.maximized) {
      el.dataset.pos = JSON.stringify({ left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height });
      Object.assign(el.style, { left: '0', top: '0', width: '100vw', height: '100vh', borderRadius: '0' });
    } else {
      const pos = JSON.parse(el.dataset.pos || '{}');
      Object.assign(el.style, { left: pos.left || '200px', top: pos.top || '100px', width: pos.width || '860px', height: pos.height || '620px', borderRadius: '18px' });
    }
  },

  focus(id) {
    const win = this.windows.find(w => w.id === id);
    if (win) win.element.style.zIndex = this.zIndex++;
  },

  makeDraggable(el) {
    interact(el.querySelector('.window-header'))
      .draggable({
        listeners: {
          move(e) {
            const target = e.target.parentElement;
            if (target.style.borderRadius === '0px') return;
            const x = (parseFloat(target.style.left) || 0) + e.dx;
            const y = (parseFloat(target.style.top) || 0) + e.dy;
            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
          }
        }
      });
  },

  updateTaskbar() {
    const container = document.getElementById('taskbar-apps');
    container.innerHTML = this.windows
      .filter(w => !w.minimized)
      .map(w => `
        <button class="glow-btn" onclick="WindowManager.focus('${w.id}')" title="${w.title}">
          <img src="assets/icons/${w.icon}" width="20">
        </button>
      `).join('');
  }
};
