// ============================================
// ECOPLENO - Componente Toast (Notificaciones)
// ============================================

const Toast = {
  show(message, type = 'success', duration = 4000) {
    const container = Utils.$('.toast-container') || this._createContainer();

    const icons = {
      success: '✅',
      error: '❌',
      info: 'ℹ️',
      warning: '⚠️'
    };

    const toast = Utils.createElement('div', {
      className: `toast toast-${type}`,
      role: 'alert',
      'aria-live': 'assertive'
    });

    toast.innerHTML = `
      <span>${icons[type] || 'ℹ️'}</span>
      <span style="flex:1">${Utils.escapeHtml(message)}</span>
      <button class="toast-close" aria-label="Cerrar notificación">&times;</button>
    `;

    container.appendChild(toast);

    const closeBtn = toast.querySelector('.toast-close');
    const remove = () => {
      toast.style.animation = 'slideOutRight 0.3s ease forwards';
      setTimeout(() => {
        if (toast.parentElement) toast.parentElement.removeChild(toast);
      }, 300);
    };

    closeBtn.addEventListener('click', remove);

    if (duration > 0) {
      setTimeout(remove, duration);
    }
  },

  success(message, duration) {
    this.show(message, 'success', duration);
  },

  error(message, duration) {
    this.show(message, 'error', duration);
  },

  info(message, duration) {
    this.show(message, 'info', duration);
  },

  warning(message, duration) {
    this.show(message, 'warning', duration);
  },

  _createContainer() {
    const container = Utils.createElement('div', { className: 'toast-container', 'aria-live': 'polite' });
    document.body.appendChild(container);
    return container;
  }
};

window.Toast = Toast;
