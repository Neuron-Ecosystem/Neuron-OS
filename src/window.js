const WindowManager = {
  windows: [],
  zIndex: 100,

  open(id, title, url, icon) {
    if (this.windows.find(w => w.id === id)) return this.focus(id);

    const win = {
      id,
      title,
      url,
      icon,
      element: null,
      minimized: false
    };

    const el = document.createElement('div');
    el.className = 'window';
    el.style.left = `${100 + this.windows.length * 30}px`;
    el.style.top = `${100 + this.windows.length * 30}px`;
    el.style.width = '800px';
    el.style.height = '600px';
    el.style.zIndex = this.zIndex++;

    el.innerHTML = `
      <div class="window-header">
        <img src="assets/icons/${icon}" alt="${title}">
        <span>${title}</span>
        <div class="window-controls">
          <div class="window-btn minimize" onclick="WindowManager.minimize('${id}')"></div>
          <div class="window-btn maximize"></div>
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
    this.makeResizable(el);
  },

  close(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win) return;
    win.element.style.animation = 'windowOpen 0.3s ease-out reverse';
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

  focus(id) {
    const win = this.windows.find(w => w.id === id);
    if (win) {
      win.element.style.zIndex = this.zIndex++;
    }
  },

  makeDraggable(el) {
    interact(el.querySelector('.window-header'))
      .draggable({
        listeners: {
          move(event) {
            const target = event.target.parentElement;
            const x = (parseFloat(target.style.left) || 0) + event.dx;
            const y = (parseFloat(target.style.top) || 0) + event.dy;
            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
          }
        }
      });
  },

  makeResizable(el) {
    interact(el)
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            let { x, y } = event.target.dataset;
            x = (parseFloat(x) || 0) + event.deltaRect.left;
            y = (parseFloat(y) || 0) + event.deltaRect.top;
            Object.assign(event.target.style, {
              width: `${event.rect.width}px`,
              height: `${event.rect.height}px`,
              left: `${x}px`,
              top: `${y}px`
            });
            Object.assign(event.target.dataset, { x, y });
          }
        }
      });
  },

  updateTaskbar() {
    const container = document.getElementById('taskbar-apps');
    container.innerHTML = this.windows
      .filter(w => !w.minimized)
      .map(w => `
        <button onclick="WindowManager.focus('${w.id}')" title="${w.title}">
          <img src="assets/icons/${w.icon}" width="20">
        </button>
      `).join('');
  }
};
