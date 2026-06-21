// ============================================
// NeuroFlow - Componente Navbar
// ============================================

const Navbar = {
  currentRoute: 'inicio',

  links: [
    { id: 'inicio', label: 'Inicio', icon: '🏠' },
    { id: 'calendario', label: 'Calendario', icon: '📅' },
    { id: 'recordatorios', label: 'Recordatorios', icon: '⏰' },
    { id: 'tecnicas', label: 'Técnicas', icon: '📚' },
    { id: 'recursos', label: 'Recursos', icon: '📖' },
    { id: 'relajacion', label: 'Relajación', icon: '🧘' },
    { id: 'especialistas', label: 'Especialistas', icon: '👨‍⚕️' },
    { id: 'metas', label: 'Metas', icon: '🎯' },
    { id: 'tienda', label: 'Tienda', icon: '🛒' }
  ],

  render() {
    const cartItems = Storage.getArray('carrito');
    const cartCount = cartItems.reduce((sum, item) => sum + (item.cantidad || 1), 0);

    return `
      <header class="navbar" role="banner">
        <nav class="navbar-container" role="navigation" aria-label="Navegación principal">
          <a href="#inicio" class="navbar-logo" aria-label="NeuroFlow - Ir al inicio">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="18" cy="18" r="16" fill="#4CAF50" opacity="0.2"/>
              <circle cx="18" cy="18" r="12" fill="#4CAF50" opacity="0.4"/>
              <circle cx="18" cy="18" r="8" fill="#4CAF50"/>
              <path d="M18 10v16M10 18h16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            NeuroFlow
          </a>

          <ul class="navbar-links" role="menubar">
            ${this.links.map(link => `
              <li role="none">
                <button class="navbar-link ${link.id === this.currentRoute ? 'active' : ''}"
                        data-route="${link.id}"
                        role="menuitem"
                        aria-current="${link.id === this.currentRoute ? 'page' : 'false'}">
                  ${link.label}
                </button>
              </li>
            `).join('')}
          </ul>

          <div style="display:flex;align-items:center;gap:6px">
            <button class="theme-toggle" id="theme-toggle-btn"
                    aria-label="${document.documentElement.classList.contains('dark') ? 'Activar modo claro' : 'Activar modo oscuro'}"
                    title="${document.documentElement.classList.contains('dark') ? 'Modo claro' : 'Modo oscuro'}">
              ${document.documentElement.classList.contains('dark') ? '☀️' : '🌙'}
            </button>
            <button class="navbar-toggle" aria-label="Abrir menú de navegación" aria-expanded="false">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>

        <div class="mobile-menu" role="dialog" aria-label="Menú de navegación móvil">
          <ul class="mobile-menu-list">
            ${this.links.map(link => `
              <li>
                <button class="mobile-menu-link ${link.id === this.currentRoute ? 'active' : ''}"
                        data-route="${link.id}">
                  <span style="margin-right:8px">${link.icon}</span>
                  ${link.label}
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
      </header>
    `;
  },

  init() {
    this.bindEvents();
    this.updateActiveLink();
    this.handleScroll();
  },

  bindEvents() {
    // Desktop nav clicks
    Utils.$$('.navbar-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const route = btn.dataset.route;
        this.navigate(route);
        // Close mobile menu if open
        this.closeMobileMenu();
      });
    });

    // Mobile nav clicks
    Utils.$$('.mobile-menu-link').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const route = btn.dataset.route;
        this.navigate(route);
        this.closeMobileMenu();
      });
    });

    // Toggle mobile menu
    const toggle = Utils.$('.navbar-toggle');
    if (toggle) {
      toggle.addEventListener('click', () => {
        this.toggleMobileMenu();
      });
    }

    // Theme toggle
    const themeBtn = Utils.$('#theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        if (typeof App !== 'undefined' && App.toggleTheme) {
          App.toggleTheme();
        }
      });
    }

    // Close mobile menu on overlay click
    const mobileMenu = Utils.$('.mobile-menu');
    if (mobileMenu) {
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) this.closeMobileMenu();
      });
    }
  },

  navigate(route) {
    window.location.hash = route;
  },

  updateActiveLink() {
    this.currentRoute = window.location.hash.replace('#', '') || 'inicio';
    Utils.$$('.navbar-link').forEach(btn => {
      const isActive = btn.dataset.route === this.currentRoute;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
    Utils.$$('.mobile-menu-link').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.route === this.currentRoute);
    });
  },

  toggleMobileMenu() {
    const menu = Utils.$('.mobile-menu');
    const toggle = Utils.$('.navbar-toggle');
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  },

  closeMobileMenu() {
    const menu = Utils.$('.mobile-menu');
    const toggle = Utils.$('.navbar-toggle');
    menu.classList.remove('open');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  },

  handleScroll() {
    const navbar = Utils.$('.navbar');
    if (!navbar) return;
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }
};

window.Navbar = Navbar;
