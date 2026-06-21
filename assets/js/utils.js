// ============================================
// ECOPLENO - Utilidades generales
// ============================================

const Utils = {
  // === FECHAS ===
  formatDate(dateStr, options = {}) {
    const date = new Date(dateStr);
    const opts = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };
    return date.toLocaleDateString('es-ES', opts);
  },

  formatDateShort(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short'
    });
  },

  formatTime(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  formatDateTime(dateStr) {
    return `${this.formatDate(dateStr)} - ${this.formatTime(dateStr)}`;
  },

  isToday(dateStr) {
    const d = new Date(dateStr);
    const today = new Date();
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  },

  isSameDay(d1, d2) {
    const a = new Date(d1);
    const b = new Date(d2);
    return a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear();
  },

  getWeekNumber(date) {
    const d = new Date(date);
    d.setHours(0,0,0,0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  },

  getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  },

  getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  },

  getMonthName(month) {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  },

  getDayName(day) {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[day];
  },

  getDayShortName(day) {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[day];
  },

  // === DOM ===
  $(selector, context = document) {
    return context.querySelector(selector);
  },

  $$(selector, context = document) {
    return [...context.querySelectorAll(selector)];
  },

  createElement(tag, attrs = {}, children = []) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'className') {
        el.className = value;
      } else if (key === 'innerHTML') {
        el.innerHTML = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([k, v]) => el.dataset[k] = v);
      } else if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'style' && typeof value === 'object') {
        Object.entries(value).forEach(([k, v]) => el.style[k] = v);
      } else {
        el.setAttribute(key, value);
      }
    });
    children.forEach(child => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child instanceof Node) el.appendChild(child);
    });
    return el;
  },

  emptyElement(el) {
    while (el.firstChild) el.removeChild(el.firstChild);
  },

  // === VALIDACIONES ===
  validateRequired(value, fieldName) {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} es obligatorio`;
    }
    return null;
  },

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return 'Correo electrónico inválido';
    return null;
  },

  validateMinLength(value, min, fieldName) {
    if (value.length < min) {
      return `${fieldName} debe tener al menos ${min} caracteres`;
    }
    return null;
  },

  showFormErrors(formEl, errors) {
    this.$$('.form-error', formEl).forEach(el => el.textContent = '');
    this.$$('.error', formEl).forEach(el => el.classList.remove('error'));

    Object.entries(errors).forEach(([field, msg]) => {
      if (!msg) return;
      const input = this.$(`[name="${field}"]`, formEl);
      if (input) {
        input.classList.add('error');
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.textContent = msg;
      }
    });
  },

  clearForm(formEl) {
    this.$$('input, select, textarea', formEl).forEach(el => {
      if (el.type === 'checkbox' || el.type === 'radio') {
        el.checked = false;
      } else {
        el.value = '';
      }
      el.classList.remove('error');
    });
    this.$$('.form-error', formEl).forEach(el => el.textContent = '');
  },

  // === ID GENERATION ===
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  },

  // === DEBOUNCE ===
  debounce(fn, delay = 300) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  },

  // === CLAMP ===
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },

  // === TRUNCATE ===
  truncate(str, maxLen = 100) {
    if (str.length <= maxLen) return str;
    return str.substring(0, maxLen) + '...';
  },

  // === ESC HTML ===
  escapeHtml(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  // === ANIMACIONES ===
  animateNumber(el, target, duration = 1500) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  },

  // === OBSERVADOR DE INTERSECCIÓN ===
  observeElements(selector, className = 'visible') {
    const elements = this.$$(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  }
};

window.Utils = Utils;
