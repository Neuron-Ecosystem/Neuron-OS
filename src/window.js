/**
 * src/window.js
 * Управление окнами: открытие, закрытие, сворачивание, максимизация, перетаскивание
 * Полная поддержка анимаций, Dock, точек активности, символов кнопок
 */

const WindowManager = {
  windows: [],
  zIndex: 100,

  /**
   * Открыть новое окно
   */
  open(id, title, url, icon) {
    // Проверка на дубликат
    const existing = this.windows.find(w => w.id === id);
    if (existing) {
      this.focus(id);
      if (existing.minimized) this.minimize(id);
      return;
    }

    const win = {
      id,
      title,
      url,
      icon,
      element: null,
      minimized: false,
      maximized: false
    };

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
          <div class="window-btn minimize" onclick="WindowManager.minimize('${id}')">−</div>
          <div class="window-btn maximize" onclick="WindowManager.toggleMax('${id}')">Square</div>
          <div class="window-btn close" onclick="WindowManager.close('${id}')">X</div>
        </div>
      </div>
      <div class="window-content">
        <iframe src="${url}" frameborder="0" allowfullscreen></iframe>
      </div>
    `;

    document.getElementById('windows-container').appendChild(el);
    win.element = el;
    this.windows.push(win);

    this.updateTaskbar();
    this.makeDraggable(el);
    this.focus(id);
  },

  /**
   * Закрыть окно с анимацией
   */
  close(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win) return;

    win.element.classList.add('closing');
    setTimeout(() => {
      if (win.element && win.element.parentNode) {
        win.element.remove();
      }
      this.windows = this.windows.filter(w => w.id !== id);
      this.updateTaskbar();
    }, 350);
  },

  /**
   * Свернуть / развернуть окно
   */
  minimize(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win || win.maximized) return;

    if (win.minimized) {
      // Развернуть
      win.element.style.display = 'flex';
      win.minimized = false;
    } else {
      // Свернуть
      win.element.classList.add('minimizing');
      setTimeout(() => {
        win.element.style.display = 'none';
        win.element.classList.remove('minimizing');
        win.minimized = true;
      }, 450);
    }
    this.updateTaskbar();
  },

  /**
   * Максимизация / восстановление
   */
  toggleMax(id) {
    const win = this.windows.find(w => w.id === id);
    if (!win || win.minimized) return;

    const el = win.element;
    if (win.maximized) {
      // Восстановить
      const pos = JSON.parse(el.dataset.restore || '{}');
      el.style.left = pos.left || '200px';
      el.style.top = pos.top || '100px';
      el.style.width = pos.width || '860px';
      el.style.height = pos.height || '620px';
      el.style.borderRadius = '18px';
      el.classList.remove('maximized');
      win.maximized = false;
    } else {
      // Максимизировать
      el.dataset.restore = JSON.stringify({
        left: el.style.left,
        top: el.style.top,
        width: el.style.width,
        height: el.style.height
      });
      el.style.left = '0';
      el.style.top = '0';
      el.style.width = '100vw';
      el.style.height = '100vh';
      el.style.borderRadius = '0';
      el.classList.add('maximized');
      win.maximized = true;
    }
  },

  /**
   * Фокус на окно
   */
  focus(id) {
    const win = this.windows.find(w => w.id === id);
    if (win && win.element) {
      win.element.style.zIndex = this.zIndex++;
      // Убираем фокус с других
      this.windows.forEach(w => {
        if (w.id !== id && w.element) {
          w.element.style.zIndex = Math.max(100, parseInt(w.element.style.zIndex) - 1);
        }
      });
    }
  },

  /**
   * Перетаскивание заголовка
   */
  makeDraggable(el) {
    const header = el.querySelector('.window-header');
    if (!header) return;

    let isDragging = false;
    let startX, startY, startLeft, startTop;

    const onMouseDown = (e) => {
      if (e.target.closest('.window-btn')) return;
      if (el.classList.contains('maximized')) return;

      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseFloat(el.style.left) || 0;
      startTop = parseFloat(el.style.top) || 0;

      el.style.transition = 'none';
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      el.style.left = `${startLeft + dx}px`;
      el.style.top = `${startTop + dy}px`;
    };

    const onMouseUp = () => {
      isDragging = false;
      el.style.transition = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    header.addEventListener('mousedown', onMouseDown);
  },

  /**
   * Обновить панель задач (Dock)
   */
  updateTaskbar() {
    const container = document.getElementById('taskbar-apps');
    if (!container) return;

    container.innerHTML = this.windows
      .filter(w => !w.minimized)
      .map(w => {
        const isActive = w.element && w.element.style.display !== 'none';
        return `
          <button class="dock-icon ${isActive ? 'active' : ''}" 
                  onclick="WindowManager.focus('${w.id}'); if(${w.minimized}) WindowManager.minimize('${w.id}')" 
                  title="${w.title}">
            <img src="assets/icons/${w.icon}" width="36" alt="${w.title}">
            ${isActive ? '<div class="dock-dot"></div>' : ''}
          </button>
        `;
      })
      .join('');
  }
};
