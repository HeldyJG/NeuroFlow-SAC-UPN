// ============================================
// ECOPLENO - Módulo Inicio (Dashboard Principal)
// ============================================

const Inicio = {
  heroSlides: [
    {
      gradient: 'linear-gradient(135deg, #1B5E20 0%, #388E3C 30%, #4CAF50 100%)',
      overlayColor: 'rgba(27,94,32,0.72)',
      badge: '🌱 Comunidad TDAH',
      title: 'Juntos en el camino del TDAH',
      text: 'NeuroFlow te brinda herramientas digitales, recursos educativos y apoyo emocional para ayudar a tu hijo a desarrollar todo su potencial.',
      cta: { href: '#calendario', label: 'Comenzar ahora', class: 'btn-primary' },
      cta2: { href: '#recursos', label: 'Explorar recursos', class: 'btn-outline-light' },
      titleColor: 'white',
      textColor: 'rgba(255,255,255,0.9)'
    },
    {
      gradient: 'linear-gradient(135deg, #0D47A1 0%, #1565C0 30%, #1E88E5 100%)',
      overlayColor: 'rgba(13,71,161,0.72)',
      badge: '📅 Organización diaria',
      title: 'Organiza su rutina diaria',
      text: 'Con nuestro calendario inteligente y recordatorios personalizados, nunca más olvidarás una terapia, medicamento o actividad escolar.',
      cta: { href: '#calendario', label: 'Ver calendario', class: 'btn-primary' },
      cta2: { href: '#recordatorios', label: 'Crear recordatorio', class: 'btn-outline-light' },
      titleColor: 'white',
      textColor: 'rgba(255,255,255,0.9)'
    },
    {
      gradient: 'linear-gradient(135deg, #4A148C 0%, #6A1B9A 30%, #8E24AA 100%)',
      overlayColor: 'rgba(74,20,140,0.72)',
      badge: '📚 Aprendizaje efectivo',
      title: 'Técnicas de estudio efectivas',
      text: 'Pomodoro, mapas mentales, método Cornell y más. Técnicas probadas para mejorar la concentración y el aprendizaje de tu hijo.',
      cta: { href: '#tecnicas', label: 'Explorar técnicas', class: 'btn-primary' },
      cta2: { href: '#recursos', label: 'Recursos educativos', class: 'btn-outline-light' },
      titleColor: 'white',
      textColor: 'rgba(255,255,255,0.9)'
    },
    {
      gradient: 'linear-gradient(135deg, #E65100 0%, #EF6C00 30%, #FF8F00 100%)',
      overlayColor: 'rgba(230,81,0,0.72)',
      badge: '🧘 Bienestar familiar',
      title: 'Relajación y bienestar',
      text: 'Ejercicios de respiración guiada, meditación, sonidos ambientales y registro emocional para reducir la ansiedad en toda la familia.',
      cta: { href: '#relajacion', label: 'Relajarse ahora', class: 'btn-primary' },
      cta2: { href: '#metas', label: 'Ver progreso', class: 'btn-outline-light' },
      titleColor: 'white',
      textColor: 'rgba(255,255,255,0.9)'
    },
    {
      gradient: 'linear-gradient(135deg, #1A237E 0%, #283593 30%, #3949AB 100%)',
      overlayColor: 'rgba(26,35,126,0.72)',
      badge: '👨‍⚕️ Red de especialistas',
      title: 'Conecta con especialistas',
      text: 'Directorio de psicólogos, psiquiatras, neuropediatras y terapeutas especializados en TDAH infantil. El apoyo profesional que necesitas.',
      cta: { href: '#especialistas', label: 'Buscar especialista', class: 'btn-primary' },
      cta2: { href: '#tienda', label: 'Tienda de productos', class: 'btn-outline-light' },
      titleColor: 'white',
      textColor: 'rgba(255,255,255,0.9)'
    }
  ],

  render() {
    const consejo = AppData.getConsejoDelDia();
    const totalEventos = Storage.getArray('eventos').length;
    const totalRecordatorios = Storage.getArray('recordatorios').length;
    const completados = Storage.getArray('recordatorios').filter(r => r.completado).length;

    const slideImages = [
      { file: 'juntos.png',       alt: 'Familia unida caminando junta' },
      { file: 'horario.png',      alt: 'Horario y organización de rutina' },
      { file: 'tecnicas.jpg',     alt: 'Técnicas de estudio efectivas' },
      { file: 'relajacion.jpg',   alt: 'Relajación y bienestar familiar' },
      { file: 'especialistas.jpg',alt: 'Directorio de especialistas TDAH' }
    ];

    return `
      <section class="pb-12" role="region" aria-label="Inicio">

        <!-- HERO CARRUSEL -->
        <div class="hero-carousel" role="region" aria-label="Carrusel principal" aria-roledescription="carousel">
          <div class="hero-carousel-track" id="hero-carousel-track">
            ${this.heroSlides.map((slide, idx) => `
              <div class="hero-slide" style="background:${slide.gradient}" role="group" aria-roledescription="slide" aria-label="Slide ${idx + 1} de ${this.heroSlides.length}">

                <!-- Imagen (desktop: lado derecho | móvil: fondo completo) -->
                ${slideImages[idx] ? `
                <div class="hero-slide-img-wrapper" style="--_slide-color:${slide.overlayColor}" aria-hidden="true">
                  <img src="assets/images/inicio/${slideImages[idx].file}" alt="${slideImages[idx].alt}" loading="${idx === 0 ? 'eager' : 'lazy'}">
                </div>` : ''}

                <!-- Contenido -->
                <div class="hero-slide-content">
                  <span class="hero-slide-badge">${slide.badge}</span>
                  <h1 style="color:${slide.titleColor}">${slide.title}</h1>
                  <p style="color:${slide.textColor}">${slide.text}</p>
                  <div class="hero-cta-group" style="display:flex;flex-wrap:wrap;gap:12px">
                    <a href="${slide.cta.href}" class="btn ${slide.cta.class} btn-lg">${slide.cta.label}</a>
                    <a href="${slide.cta2.href}" class="btn ${slide.cta2.class} btn-lg">${slide.cta2.label}</a>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>

          <button class="hero-carousel-btn hero-carousel-btn-prev" id="hero-carousel-prev" aria-label="Slide anterior">&#8249;</button>
          <button class="hero-carousel-btn hero-carousel-btn-next" id="hero-carousel-next" aria-label="Slide siguiente">&#8250;</button>
          <div class="hero-carousel-progress" aria-hidden="true">
            <div class="hero-carousel-progress-bar" id="hero-carousel-progress-bar"></div>
          </div>
          <div class="hero-carousel-counter" id="hero-carousel-counter" aria-hidden="true">01 / ${String(this.heroSlides.length).padStart(2, '0')}</div>
          <div class="hero-carousel-dots" id="hero-carousel-dots" role="tablist" aria-label="Slides">
            ${this.heroSlides.map((_, idx) => `
              <button class="hero-carousel-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" role="tab" aria-selected="${idx === 0}" aria-label="Ir al slide ${idx + 1}"></button>
            `).join('')}
          </div>
        </div>

        <!-- BANNER INFORMATIVO -->
        <div class="info-banner reveal">
          <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
            <span style="font-size:24px">💡</span>
            <span style="font-weight:500;color:var(--text-primary)">Consejo del día:</span>
            <span style="color:var(--text-secondary);flex:1">${Utils.escapeHtml(consejo)}</span>
          </div>
        </div>

        <!-- BENEFICIOS -->
        <section class="reveal" style="margin-bottom:48px" aria-label="Beneficios">
          <h2 style="font-size:1.8rem;font-weight:700;margin-bottom:8px">¿Por qué NeuroFlow?</h2>
          <p style="color:var(--text-muted);margin-bottom:24px">Herramientas diseñadas específicamente para familias con TDAH</p>
          <div class="grid-auto">
            ${AppData.beneficios.map(b => `
              <div class="card card-interactive">
                <div class="card-icon" style="background:rgba(76,175,80,0.1);margin-bottom:16px;font-size:2rem">${b.icon}</div>
                <h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">${b.title}</h3>
                <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.6">${b.description}</p>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- ESTADÍSTICAS -->
        <section class="stats-section reveal" aria-label="Estadísticas">
          <h2 style="font-size:1.5rem;font-weight:700;color:var(--heading-color);text-align:center;margin-bottom:32px">NeuroFlow en cifras</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:24px;text-align:center">
            ${AppData.estadisticas.map(e => `
              <div>
                <div class="stat-number" data-target="${e.number}">0</div>
                <span style="color:var(--text-muted);font-size:0.9rem">${e.label}</span>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- TESTIMONIOS -->
        <section class="reveal" style="margin-bottom:48px" aria-label="Testimonios">
          <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:24px">Lo que dicen las familias</h2>
          <div class="carousel" style="position:relative">
            <div class="carousel-track" id="testimonios-track">
              ${AppData.testimonios.map(t => `
                <div class="carousel-slide">
                  <div class="card" style="text-align:center;max-width:600px;margin:0 auto">
                    <div style="font-size:3rem;margin-bottom:12px;opacity:0.3">"</div>
                    <p style="font-style:italic;color:var(--text-secondary);line-height:1.7;margin-bottom:16px">"${Utils.escapeHtml(t.text)}"</p>
                    <div style="font-weight:600;color:var(--heading-color)">${Utils.escapeHtml(t.name)}</div>
                    <div style="font-size:0.85rem;color:var(--text-muted)">${Utils.escapeHtml(t.role)}</div>
                    <div class="rating-stars" style="justify-content:center;margin-top:8px">
                      ${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
            <button class="carousel-btn carousel-btn-prev" aria-label="Testimonio anterior">‹</button>
            <button class="carousel-btn carousel-btn-next" aria-label="Testimonio siguiente">›</button>
            <div class="carousel-dots" id="testimonios-dots"></div>
          </div>
        </section>

        <!-- ACCESOS RÁPIDOS -->
        <section class="reveal" style="margin-bottom:48px" aria-label="Accesos rápidos">
          <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:24px">Accesos rápidos</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:16px">
            ${Navbar.links.filter(l => l.id !== 'inicio').map(l => `
              <a href="#${l.id}" class="card card-interactive" style="text-align:center;padding:24px 16px;text-decoration:none;color:inherit">
                <div style="font-size:2.5rem;margin-bottom:8px">${l.icon}</div>
                <div style="font-weight:600;font-size:0.9rem;color:var(--heading-color)">${l.label}</div>
              </a>
            `).join('')}
          </div>
        </section>

        <!-- FAQ -->
        <section class="reveal" style="margin-bottom:48px" aria-label="Preguntas frecuentes">
          <h2 style="font-size:1.5rem;font-weight:700;margin-bottom:24px">Preguntas frecuentes</h2>
          <div id="faq-container">
            ${AppData.faqs.map((faq, idx) => `
              <div class="accordion-item">
                <button class="accordion-header" aria-expanded="false" aria-controls="faq-${idx}">
                  <span style="color:var(--text-primary)">${Utils.escapeHtml(faq.q)}</span>
                  <span class="accordion-icon">▼</span>
                </button>
                <div class="accordion-body" id="faq-${idx}" role="region">
                  <div class="accordion-body-inner">${Utils.escapeHtml(faq.r)}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- CTA FINAL -->
        <section class="reveal reveal-delay-4" style="background:linear-gradient(135deg,#1B5E20,#388E3C);border-radius:24px;padding:48px 32px;text-align:center;color:white">
          <h2 style="font-size:1.8rem;font-weight:700;color:white;margin-bottom:12px">Comienza hoy con NeuroFlow</h2>
          <p style="font-size:1.05rem;opacity:0.9;margin-bottom:24px;max-width:500px;margin-left:auto;margin-right:auto;color:rgba(255,255,255,0.9)">
            Regístrate para recibir consejos semanales y recursos exclusivos para familias con TDAH
          </p>
          <form id="suscripcion-form" style="max-width:480px;margin:0 auto;display:flex;gap:12px;flex-wrap:wrap;justify-content:center">
            <input type="email" name="email" placeholder="Tu correo electrónico" class="form-input" style="flex:1;min-width:200px;background:rgba(255,255,255,0.95)" required aria-label="Correo electrónico">
            <button type="submit" class="btn" style="background:white;color:#1B5E20;font-weight:700">Suscribirme</button>
          </form>
          <p style="font-size:0.8rem;opacity:0.7;margin-top:12px;color:rgba(255,255,255,0.7)">Sin spam. Puedes cancelar en cualquier momento.</p>
        </section>

      </section>
    `;
  },

  init() {
    this.initHeroCarousel();
    this.animateStats();
    this.initCarousel();
    this.initAccordion();
    this.initSuscripcion();
    this.initScrollAnimations();
  },

  initHeroCarousel() {
    const track = Utils.$('#hero-carousel-track');
    const dots = Utils.$('#hero-carousel-dots');
    const prev = Utils.$('#hero-carousel-prev');
    const next = Utils.$('#hero-carousel-next');
    const progressBar = Utils.$('#hero-carousel-progress-bar');
    const counter = Utils.$('#hero-carousel-counter');
    if (!track) return;

    const slides = track.querySelectorAll('.hero-slide');
    let current = 0;
    let autoSlide = null;
    let progressAnim = null;
    const totalSlides = slides.length;

    const activateContent = (idx) => {
      slides.forEach((s, i) => s.classList.toggle('slide-active', i === idx));
    };

    const updateSlide = (idx) => {
      current = idx;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll('.hero-carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
      if (counter) {
        counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
      }
      activateContent(idx);
    };

    const startProgress = () => {
      if (progressAnim) cancelAnimationFrame(progressAnim);
      if (!progressBar) return;
      progressBar.style.width = '0%';
      const start = performance.now();
      const duration = 5000;
      const tick = (now) => {
        const elapsed = now - start;
        const pct = Math.min(elapsed / duration * 100, 100);
        progressBar.style.width = `${pct}%`;
        if (pct < 100) progressAnim = requestAnimationFrame(tick);
      };
      progressAnim = requestAnimationFrame(tick);
    };

    const startAutoSlide = () => {
      if (autoSlide) clearInterval(autoSlide);
      startProgress();
      autoSlide = setInterval(() => {
        updateSlide((current + 1) % slides.length);
        startProgress();
      }, 5000);
    };

    // Activate first slide
    activateContent(0);

    // Dots
    dots.querySelectorAll('.hero-carousel-dot').forEach((dot) => {
      dot.addEventListener('click', () => {
        updateSlide(parseInt(dot.dataset.index));
        startAutoSlide();
      });
    });

    // Arrows
    prev?.addEventListener('click', () => {
      updateSlide(current > 0 ? current - 1 : slides.length - 1);
      startAutoSlide();
    });

    next?.addEventListener('click', () => {
      updateSlide((current + 1) % slides.length);
      startAutoSlide();
    });

    // Pause on hover
    const container = track.closest('.hero-carousel');
    container?.addEventListener('mouseenter', () => {
      if (autoSlide) clearInterval(autoSlide);
    });
    container?.addEventListener('mouseleave', startAutoSlide);

    // Touch support
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        updateSlide(diff > 0 ? (current + 1) % slides.length : (current > 0 ? current - 1 : slides.length - 1));
        startAutoSlide();
      }
    }, { passive: true });

    // Arrow key support
    container?.setAttribute('tabindex', '0');
    container?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        updateSlide(current > 0 ? current - 1 : slides.length - 1);
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        updateSlide((current + 1) % slides.length);
        startAutoSlide();
      }
    });

    startAutoSlide();
  },

  animateStats() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          Utils.animateNumber(el, target);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    Utils.$$('.stat-number').forEach(el => observer.observe(el));
  },

  initCarousel() {
    const track = Utils.$('#testimonios-track');
    const dots = Utils.$('#testimonios-dots');
    if (!track || !dots) return;

    const slides = track.querySelectorAll('.carousel-slide');
    let current = 0;

    // Dots
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Testimonio ${i + 1}`);
      dot.addEventListener('click', () => this.goToSlide(track, dots, slides, i));
      dots.appendChild(dot);
    });

    // Buttons
    const prev = Utils.$('.carousel-btn-prev');
    const next = Utils.$('.carousel-btn-next');

    const updateSlide = (idx) => {
      current = idx;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === current);
      });
    };

    prev.addEventListener('click', () => {
      updateSlide(current > 0 ? current - 1 : slides.length - 1);
    });

    next.addEventListener('click', () => {
      updateSlide(current < slides.length - 1 ? current + 1 : 0);
    });

    // Auto slide
    let autoSlide = setInterval(() => {
      updateSlide((current + 1) % slides.length);
    }, 6000);

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
      autoSlide = setInterval(() => {
        updateSlide((current + 1) % slides.length);
      }, 6000);
    });

    // Touch support
    let startX = 0;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        updateSlide(diff > 0 ? (current + 1) % slides.length : (current > 0 ? current - 1 : slides.length - 1));
      }
    }, { passive: true });
  },

  goToSlide(track, dots, slides, idx) {
    track.style.transform = `translateX(-${idx * 100}%)`;
    dots.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
  },

  initAccordion() {
    Utils.$$('.accordion-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.accordion-item');
        const isActive = item.classList.contains('active');

        // Close all
        Utils.$$('.accordion-item').forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-header')?.setAttribute('aria-expanded', 'false');
        });

        if (!isActive) {
          item.classList.add('active');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  },

  initSuscripcion() {
    const form = Utils.$('#suscripcion-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = form.querySelector('[name="email"]').value.trim();
      const error = Utils.validateEmail(email);

      if (error) {
        Toast.error(error);
        return;
      }

      const subs = Storage.getArray('suscripciones');
      subs.push({ email, date: new Date().toISOString() });
      Storage.set('suscripciones', subs);

      Toast.success('¡Gracias por suscribirte! Recibirás nuestros consejos semanales.');
      form.reset();
    });
  },

  initScrollAnimations() {
    Utils.observeElements('.animate-on-scroll');
  }
};

window.Inicio = Inicio;
