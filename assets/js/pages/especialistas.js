// ============================================
// ECOPLENO - Módulo Directorio de Especialistas
// ============================================

const Especialistas = {
  filtroEspecialidad: 'todos',

  especialidades: [
    { id: 'todos', label: 'Todos', icon: '👥' },
    { id: 'Psicóloga Infantil', label: 'Psicólogos', icon: '🧠' },
    { id: 'Psiquiatra Infantil', label: 'Psiquiatras', icon: '💊' },
    { id: 'Neuropediatra', label: 'Neuropediatras', icon: '🔬' },
    { id: 'Terapeuta Ocupacional', label: 'Terapeutas', icon: '🤲' },
    { id: 'Psicólogo Clínico', label: 'Psicólogos Clínicos', icon: '💬' },
    { id: 'Terapeuta de Lenguaje', label: 'Terapeutas de Lenguaje', icon: '🗣️' }
  ],

  render() {
    return `
      <section role="region" aria-label="Directorio de Especialistas">
        <div style="margin-bottom:24px">
          <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">Directorio de Especialistas</h1>
          <p style="color:var(--text-secondary);font-size:0.9rem">Conecta con profesionales expertos en TDAH infantil</p>
        </div>

        <!-- BUSCADOR -->
        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px;position:relative">
            <input type="text" id="buscador-especialistas" class="form-input" placeholder="Buscar por nombre o especialidad..." aria-label="Buscar especialistas" style="padding-left:40px">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted)">🔍</span>
          </div>
        </div>

        <!-- FILTROS -->
        <div class="tabs" role="tablist" style="margin-bottom:24px;flex-wrap:wrap;overflow:visible">
          ${this.especialidades.map(e => `
            <button class="tab ${e.id === 'todos' ? 'active' : ''}" data-especialidad="${e.id}" role="tab" aria-selected="${e.id === 'todos'}">
              ${e.icon} ${e.label}
            </button>
          `).join('')}
        </div>

        <!-- GRID -->
        <div id="especialistas-grid" class="reveal" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px">
          ${this.renderGrid('todos', '')}
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    Utils.$$('.tab[data-especialidad]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.filtroEspecialidad = tab.dataset.especialidad;
        Utils.$$('.tab[data-especialidad]').forEach(t => {
          t.classList.toggle('active', t.dataset.especialidad === this.filtroEspecialidad);
          t.setAttribute('aria-selected', t.dataset.especialidad === this.filtroEspecialidad);
        });
        this.updateGrid();
      });
    });

    const search = Utils.$('#buscador-especialistas');
    if (search) {
      search.addEventListener('input', Utils.debounce(() => {
        this.updateGrid(search.value);
      }, 300));
    }
  },

  updateGrid(query = '') {
    const grid = Utils.$('#especialistas-grid');
    if (grid) grid.innerHTML = this.renderGrid(this.filtroEspecialidad, query);
    this.bindCardEvents();
  },

  renderGrid(especialidad, query) {
    let especialistas = AppData.especialistas;

    if (especialidad !== 'todos') {
      especialistas = especialistas.filter(e => e.especialidad === especialidad);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      especialistas = especialistas.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.especialidad.toLowerCase().includes(q) ||
        e.ubicacion.toLowerCase().includes(q)
      );
    }

    if (especialistas.length === 0) {
      return `
        <div style="grid-column:1/-1;text-align:center;padding:64px 24px">
          <div style="font-size:4rem;margin-bottom:16px">🔍</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px">No encontramos especialistas</h3>
          <p style="color:var(--text-muted)">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      `;
    }

    return especialistas.map(e => {
      const initial = e.name.charAt(0);
      const colors = ['#4CAF50','#42A5F5','#FFA726','#AB47BC','#EF5350','#26A69A'];
      const colorIdx = especialistas.indexOf(e) % colors.length;

      return `
        <div class="card card-interactive especialista-card" data-id="${e.id}" style="cursor:pointer">
          <div style="display:flex;gap:16px;align-items:center;margin-bottom:12px">
            <div style="width:64px;height:64px;border-radius:50%;background:${colors[colorIdx]}20;display:flex;align-items:center;justify-content:center;font-size:1.8rem;font-weight:700;color:${colors[colorIdx]};flex-shrink:0">
              ${initial}
            </div>
            <div style="flex:1;min-width:0">
              <h3 style="font-weight:600;color:var(--text-primary);margin-bottom:2px">${Utils.escapeHtml(e.name)}</h3>
              <span class="badge badge-blue">${e.especialidad}</span>
            </div>
          </div>
          <div style="display:flex;gap:6px;margin-bottom:8px;color:#FFA726;font-size:0.9rem">
            ${'★'.repeat(Math.floor(e.rating))}${e.rating % 1 >= 0.5 ? '½' : ''}
            <span style="color:var(--text-muted);font-weight:400">(${e.reviews} reseñas)</span>
          </div>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:4px">📍 ${Utils.escapeHtml(e.ubicacion)}</p>
          <p style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:12px">🕐 ${e.horario}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <button class="btn btn-sm btn-primary btn-contactar" data-id="${e.id}">📞 Contactar</button>
            <button class="btn btn-sm btn-outline btn-ver-perfil" data-id="${e.id}">Ver perfil</button>
          </div>
        </div>
      `;
    }).join('');
  },

  bindCardEvents() {
    Utils.$$('.btn-ver-perfil').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const esp = AppData.especialistas.find(e => e.id === id);
        if (esp) this.showProfile(esp);
      });
    });

    Utils.$$('.btn-contactar').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const esp = AppData.especialistas.find(e => e.id === id);
        if (esp) this.showContact(esp);
      });
    });

    Utils.$$('.especialista-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const esp = AppData.especialistas.find(e => e.id === id);
        if (esp) this.showProfile(esp);
      });
    });
  },

  showProfile(esp) {
    Modal.open({
      title: esp.name,
      size: 'lg',
      content: `
        <div style="text-align:center;margin-bottom:24px">
          <div style="width:80px;height:80px;border-radius:50%;background:var(--gray-100);display:flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:700;color:var(--heading-color-alt);margin:0 auto 12px">
            ${esp.name.charAt(0)}
          </div>
          <h3 style="font-size:1.3rem;font-weight:600;color:var(--heading-color-alt)">${Utils.escapeHtml(esp.name)}</h3>
          <span class="badge badge-blue" style="font-size:0.9rem;padding:4px 12px">${esp.especialidad}</span>
          <div style="margin-top:8px;color:#FFA726">
            ${'★'.repeat(Math.floor(esp.rating))} ${esp.rating} (${esp.reviews} reseñas)
          </div>
        </div>
        <div style="margin-bottom:16px">
          <p style="color:var(--text-secondary);line-height:1.7">${esp.descripcion}</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
          <div style="background:var(--gray-100);border-radius:8px;padding:12px">
            <div style="font-size:0.8rem;color:var(--text-muted)">Ubicación</div>
            <div style="font-weight:500;color:var(--text-primary)">${Utils.escapeHtml(esp.ubicacion)}</div>
          </div>
          <div style="background:var(--gray-100);border-radius:8px;padding:12px">
            <div style="font-size:0.8rem;color:var(--text-muted)">Horario</div>
            <div style="font-weight:500;color:var(--text-primary)">${esp.horario}</div>
          </div>
          <div style="background:var(--gray-100);border-radius:8px;padding:12px">
            <div style="font-size:0.8rem;color:var(--text-muted)">Consultas desde</div>
            <div style="font-weight:500;color:var(--text-primary)">${esp.precio}</div>
          </div>
        </div>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a href="tel:${esp.telefono}" class="btn btn-primary" style="flex:1">📞 ${esp.telefono}</a>
          <a href="mailto:${esp.email}" class="btn btn-outline" style="flex:1">✉️ Enviar email</a>
        </div>
      `
    });
  },

  showContact(esp) {
    Modal.open({
      title: 'Contactar',
      content: `
        <div style="text-align:center;margin-bottom:20px">
          <div style="font-size:3rem;margin-bottom:8px">📞</div>
          <h3 style="font-weight:600;color:var(--heading-color-alt)">${Utils.escapeHtml(esp.name)}</h3>
          <p style="color:var(--text-secondary)">${esp.especialidad}</p>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px">
          <a href="tel:${esp.telefono}" class="btn btn-primary btn-lg" style="justify-content:center">
            📞 Llamar: ${esp.telefono}
          </a>
          <a href="mailto:${esp.email}" class="btn btn-outline btn-lg" style="justify-content:center">
            ✉️ Enviar email
          </a>
          <a href="https://wa.me/52${esp.telefono.replace(/[^0-9]/g,'').slice(-10)}" target="_blank" class="btn" style="background:#25D366;color:white;justify-content:center" rel="noopener">
            💬 WhatsApp
          </a>
          <button class="btn btn-ghost" onclick="Modal.close()">Cerrar</button>
        </div>
      `
    });
  }
};

window.Especialistas = Especialistas;
