// ============================================
// ECOPLENO - Componente Modal
// ============================================

const Modal = {
  open(config = {}) {
    const {
      title = '',
      content = '',
      onClose = null,
      size = 'md'
    } = config;

    this.close();

    const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

    const overlay = Utils.createElement('div', {
      className: 'modal-overlay open',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': title || 'Diálogo'
    });

    const modalContent = Utils.createElement('div', {
      className: `modal-content ${sizes[size] || sizes.md}`
    });

    modalContent.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${title}</h2>
        <button class="modal-close" aria-label="Cerrar diálogo">&times;</button>
      </div>
      <div class="modal-body">
        ${content}
      </div>
    `;

    overlay.appendChild(modalContent);
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Focus trap - focus first focusable element
    const firstFocusable = modalContent.querySelector('input, select, textarea, button, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) setTimeout(() => firstFocusable.focus(), 100);

    // Close handlers
    const closeBtn = modalContent.querySelector('.modal-close');
    const closeHandler = () => {
      this.close();
      if (onClose) onClose();
    };

    closeBtn.addEventListener('click', closeHandler);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeHandler();
    });

    document.addEventListener('keydown', this._keyHandler = (e) => {
      if (e.key === 'Escape') closeHandler();
      if (e.key === 'Tab') {
        const focusable = modalContent.querySelectorAll('input, select, textarea, button, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    this._overlay = overlay;
  },

  close() {
    if (this._overlay) {
      this._overlay.classList.remove('open');
      document.body.removeChild(this._overlay);
      this._overlay = null;
      document.body.style.overflow = '';
    }
    if (this._keyHandler) {
      document.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
  },

  setContent(html) {
    const body = this._overlay?.querySelector('.modal-body');
    if (body) body.innerHTML = html;
  }
};

window.Modal = Modal;
