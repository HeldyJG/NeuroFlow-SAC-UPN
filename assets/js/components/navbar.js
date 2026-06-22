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
              <!-- Fondo circular -->
              <circle cx="18" cy="18" r="17" fill="#10B981" opacity="0.15"/>
              <!-- Cerebro SVG -->
              <path d="M18 7C15.5 7 13.5 8.5 12.8 10.6C11.2 10.8 10 12.1 10 13.7C10 14.3 10.2 14.9 10.5 15.4C9.6 16 9 17.1 9 18.3C9 19.8 9.9 21.1 11.2 21.7C11.3 23.5 12.8 25 14.7 25C15.1 25 15.5 24.9 15.8 24.8C16.4 25.5 17.2 26 18 26C18.8 26 19.6 25.5 20.2 24.8C20.5 24.9 20.9 25 21.3 25C23.2 25 24.7 23.5 24.8 21.7C26.1 21.1 27 19.8 27 18.3C27 17.1 26.4 16 25.5 15.4C25.8 14.9 26 14.3 26 13.7C26 12.1 24.8 10.8 23.2 10.6C22.5 8.5 20.5 7 18 7Z" fill="#10B981" opacity="0.9"/>
              <!-- Surcos del cerebro (líneas) -->
              <path d="M18 10C18 10 16 13 18 15C20 17 18 20 18 20" stroke="white" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>
              <path d="M14 14C14 14 15.5 15.5 14.5 17.5" stroke="white" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.7"/>
              <path d="M22 14C22 14 20.5 15.5 21.5 17.5" stroke="white" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.7"/>
            </svg>
            <span class="navbar-logo-text">NeuroFlow</span>
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
