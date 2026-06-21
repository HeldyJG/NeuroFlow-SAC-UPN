// ============================================
// NeuroFlow - Aplicación Principal (Router SPA)
// ============================================

const App = {
  currentRoute: 'inicio',

  routes: {
    inicio: { title: 'Inicio - NeuroFlow', module: Inicio },
    calendario: { title: 'Calendario Inteligente - NeuroFlow', module: Calendario },
    recordatorios: { title: 'Recordatorios - NeuroFlow', module: Recordatorios },
    tecnicas: { title: 'Técnicas de Estudio - NeuroFlow', module: Tecnicas },
    recursos: { title: 'Recursos Educativos - NeuroFlow', module: Recursos },
    relajacion: { title: 'Ejercicios de Relajación - NeuroFlow', module: Relajacion },
    especialistas: { title: 'Directorio de Especialistas - NeuroFlow', module: Especialistas },
    metas: { title: 'Seguimiento de Metas - NeuroFlow', module: Metas },
    tienda: { title: 'Tienda de Productos - NeuroFlow', module: Tienda }
  },

  init() {
    // Init dark mode before rendering
    this.initTheme();

    // Render layout
    this.renderLayout();

    // Init router
    this.router();

    // Listen for hash changes
    window.addEventListener('hashchange', () => this.router());

    // Listen for page load
    window.addEventListener('load', () => {
      // Set initial route
      if (!window.location.hash) {
        window.location.hash = 'inicio';
      }
    });

    // Init scroll-to-top button
    this.initScrollToTop();

    // Init parallax effect
    this.initParallax();

    // Init reveal on scroll
    this.initReveal();

    console.log('� NeuroFlow inicializado correctamente');
  },

  initTheme() {
    const saved = Storage.get('theme');
    if (saved) {
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      }
    }
  },

  toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    // Add transition class temporarily
    html.classList.add('theme-transitioning');
    setTimeout(() => html.classList.remove('theme-transitioning'), 400);

    if (isDark) {
      html.classList.remove('dark');
      Storage.set('theme', 'light');
    } else {
      html.classList.add('dark');
      Storage.set('theme', 'dark');
    }

    // Update navbar toggle button icon
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      btn.textContent = isDark ? '🌙' : '☀️';
      btn.setAttribute('aria-label', isDark ? 'Activar modo oscuro' : 'Activar modo claro');
      btn.setAttribute('title', isDark ? 'Modo oscuro' : 'Modo claro');
    }
  },

  renderLayout() {
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = `
      <div class="app-container">
        <a href="#inicio" class="skip-to-content" id="skip-link">Ir al contenido principal</a>

        <div id="navbar-container"></div>

        <main class="main-content" id="main-content" role="main">
          <div id="page-content"></div>
        </main>

        <footer class="footer" role="contentinfo">
          <div style="max-width:1280px;margin:0 auto;padding:0 24px">
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;margin-bottom:32px">
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
                  <svg width="28" height="28" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" fill="#4CAF50" opacity="0.2"/>
                    <circle cx="18" cy="18" r="12" fill="#4CAF50" opacity="0.4"/>
                    <circle cx="18" cy="18" r="8" fill="#4CAF50"/>
                    <path d="M18 10v16M10 18h16" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
                  </svg>
                  <span style="font-family:'Poppins',sans-serif;font-weight:700;font-size:1.2rem;color:white">NeuroFlow</span>
                </div>
                <p style="font-size:0.85rem;color:#9E9E9E;line-height:1.6">Apoyando a familias con niños con TDAH. Juntos en cada paso del camino.</p>
              </div>
              <div>
                <h4 style="color:white;font-weight:600;margin-bottom:12px;font-size:0.95rem">Plataforma</h4>
                <ul style="list-style:none;display:flex;flex-direction:column;gap:8px">
                  ${Navbar.links.map(l => `
                    <li><a href="#${l.id}" style="font-size:0.85rem;color:#BDBDBD;text-decoration:none">${l.label}</a></li>
                  `).join('')}
                </ul>
              </div>
              <div>
                <h4 style="color:white;font-weight:600;margin-bottom:12px;font-size:0.95rem">Contacto</h4>
                <ul style="list-style:none;display:flex;flex-direction:column;gap:8px;font-size:0.85rem;color:#BDBDBD">
                  <li>📧 contacto@neuroflow.com</li>
                  <li>📞 +52 55 1234 5678</li>
                  <li>🌐 www.neuroflow.com</li>
                </ul>
              </div>
              <div>
                <h4 style="color:white;font-weight:600;margin-bottom:12px;font-size:0.95rem">Síguenos</h4>
                <div style="display:flex;gap:12px;font-size:1.5rem">
                  <span style="cursor:pointer" aria-label="Facebook">📘</span>
                  <span style="cursor:pointer" aria-label="Instagram">📸</span>
                  <span style="cursor:pointer" aria-label="Twitter">🐦</span>
                  <span style="cursor:pointer" aria-label="YouTube">▶️</span>
                </div>
                <p style="font-size:0.8rem;color:#6B7280;margin-top:12px">#NeuroFlow #TDAH #Familia</p>
              </div>
            </div>
            <div style="border-top:1px solid #1F2937;padding-top:16px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:0.8rem;color:#6B7280">
              <span>&copy; ${new Date().getFullYear()} NeuroFlow. Todos los derechos reservados.</span>
              <span>Hecho con 💚 para las familias</span>
            </div>
          </div>
        </footer>

        <!-- Scroll to top button -->
        <button class="scroll-to-top" id="scroll-to-top-btn" aria-label="Volver al inicio" title="Volver arriba">↑</button>
      </div>
    `;
  },

  router() {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    const route = this.routes[hash];

    if (!route) {
      window.location.hash = 'inicio';
      return;
    }

    this.currentRoute = hash;
    document.title = route.title;

    // Render navbar
    Navbar.currentRoute = hash;
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
      navbarContainer.innerHTML = Navbar.render();
      Navbar.init();
    }

    // Render page content
    const pageContent = document.getElementById('page-content');
    if (pageContent && route.module) {
      pageContent.innerHTML = route.module.render();

      // Observe new reveal elements
      this.observeReveal();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Init the module
      if (typeof route.module.init === 'function') {
        // Small delay to ensure DOM is ready
        setTimeout(() => route.module.init(), 50);
      }
    }

    // Focus management
    const skipLink = document.getElementById('skip-link');
    if (skipLink && hash !== 'inicio') {
      setTimeout(() => {
        const main = document.getElementById('main-content');
        if (main) main.focus();
      }, 100);
    }
  },

  initScrollToTop() {
    const btn = document.getElementById('scroll-to-top-btn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      const main = document.getElementById('main-content');
      if (main) main.focus();
    });
  },

  initParallax() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.warn('[NeuroFlow] prefers-reduced-motion:', prefersReduced);
    if (prefersReduced) return;

    let ticking = false;

    const update = () => {
      const vh = window.innerHeight;

      document.querySelectorAll('[data-parallax]').forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < vh && rect.bottom > 0;
        if (!isVisible) return;
        const progress = 1 - (rect.bottom / (vh + rect.height));
        const offset = Math.max(-12, Math.min(12, (progress - 0.5) * 24));
        el.style.transform = `translateY(${offset}px)`;
      });

      const heroCarousel = document.querySelector('.hero-carousel');
      if (heroCarousel) {
        const rect = heroCarousel.getBoundingClientRect();
        const isVisible = rect.top < vh && rect.bottom > 0;
        if (isVisible) {
          const progress = 1 - (rect.bottom / (vh + rect.height));
          const offset = Math.max(-60, Math.min(60, (progress - 0.5) * 120));
          heroCarousel.querySelectorAll('.hero-slide-parallax').forEach(layer => {
            layer.style.transform = `translateY(${offset}px)`;
          });
        }
      }
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });

    update();
  },

  initReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    this._revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this._revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    this.observeReveal();
  },

  observeReveal() {
    if (!this._revealObserver) return;
    document.querySelectorAll('.reveal:not(.observed)').forEach(el => {
      el.classList.add('observed');
      this._revealObserver.observe(el);
    });
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
