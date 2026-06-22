// ============================================
// ECOPLENO - Módulo Recursos Educativos
// ============================================

const Recursos = {
  filtroTipo: 'todos',

  tipos: [
    { id: 'todos', label: 'Todos', icon: '📚' },
    { id: 'guia', label: 'Guías', icon: '📖' },
    { id: 'pdf', label: 'PDFs', icon: '📄' },
    { id: 'video', label: 'Videos', icon: '🎬' },
    { id: 'actividad', label: 'Actividades', icon: '✏️' }
  ],

  render() {
    return `
      <section role="region" aria-label="Recursos Educativos">
        <div style="margin-bottom:24px">
          <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">Recursos Educativos</h1>
          <p style="color:var(--text-secondary);font-size:0.9rem">Materiales diseñados para apoyar el aprendizaje y desarrollo de tu hijo</p>
        </div>

        <!-- BUSCADOR -->
        <div style="display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap">
          <div style="flex:1;min-width:200px;position:relative">
            <input type="text" id="buscador-recursos" class="form-input" placeholder="Buscar recursos..." aria-label="Buscar recursos" style="padding-left:40px">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted)">🔍</span>
          </div>
        </div>

        <!-- FILTROS TIPO -->
        <div class="tabs" role="tablist" style="margin-bottom:24px;flex-wrap:wrap">
          ${this.tipos.map(t => `
            <button class="tab ${t.id === 'todos' ? 'active' : ''}" data-tipo="${t.id}" role="tab" aria-selected="${t.id === 'todos'}">
              ${t.icon} ${t.label}
            </button>
          `).join('')}
        </div>

        <!-- GRID RECURSOS -->
        <div id="recursos-grid" class="grid-auto reveal">
          ${this.renderGrid('todos', '')}
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
    this.bindCardEvents();
  },

  bindEvents() {
    // Filtros tipo
    Utils.$$('.tab[data-tipo]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.filtroTipo = tab.dataset.tipo;
        Utils.$$('.tab[data-tipo]').forEach(t => {
          t.classList.toggle('active', t.dataset.tipo === this.filtroTipo);
          t.setAttribute('aria-selected', t.dataset.tipo === this.filtroTipo);
        });
        this.updateGrid();
      });
    });

    // Buscador
    const search = Utils.$('#buscador-recursos');
    if (search) {
      search.addEventListener('input', Utils.debounce(() => {
        this.updateGrid(search.value);
      }, 300));
    }
  },

  updateGrid(query = '') {
    const grid = Utils.$('#recursos-grid');
    if (grid) grid.innerHTML = this.renderGrid(this.filtroTipo, query);
    this.bindCardEvents();
  },

  renderGrid(tipo, query) {
    let recursos = AppData.recursos;

    if (tipo !== 'todos') {
      recursos = recursos.filter(r => r.type === tipo);
    }

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      recursos = recursos.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    }

    if (recursos.length === 0) {
      return `
        <div style="grid-column:1/-1;text-align:center;padding:64px 24px">
          <div style="font-size:4rem;margin-bottom:16px">🔍</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:var(--text-secondary);margin-bottom:8px">No encontramos resultados</h3>
          <p style="color:var(--text-muted)">Intenta con otros términos de búsqueda</p>
        </div>
      `;
    }

    return recursos.map(r => `
      <div class="card card-interactive recurso-card" data-id="${r.id}" style="cursor:pointer">
        <div style="display:flex;gap:16px;align-items:flex-start">
          <div style="font-size:2.5rem;flex-shrink:0">${r.image}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px">
              <h3 style="font-weight:600;color:var(--text-primary);font-size:1rem">${Utils.escapeHtml(r.title)}</h3>
              <span class="badge badge-blue">${r.typeLabel}</span>
            </div>
            <p style="color:var(--text-secondary);font-size:0.85rem;line-height:1.5">${Utils.truncate(r.description, 100)}</p>
            <div style="display:flex;align-items:center;gap:8px;margin-top:8px">
              <span style="font-size:0.8rem;color:var(--text-muted)">📂 ${r.category}</span>
              <span class="badge badge-green">${r.typeLabel}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  bindCardEvents() {
    Utils.$$('.recurso-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const recurso = AppData.recursos.find(r => r.id === id);
        if (recurso) this.showDetail(recurso);
      });
    });
  },

  showDetail(recurso) {
    Modal.open({
      title: recurso.title,
      size: 'lg',
      content: `
        <div style="text-align:center;margin-bottom:24px">
          <div style="font-size:4rem;margin-bottom:12px">${recurso.image}</div>
          <span class="badge badge-blue" style="font-size:0.9rem;padding:4px 12px">${recurso.typeLabel}</span>
          <span class="badge badge-green" style="font-size:0.9rem;padding:4px 12px">${recurso.category}</span>
        </div>
        <p style="color:var(--text-secondary);line-height:1.7;margin-bottom:24px">${recurso.description}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <a href="${recurso.url}" class="btn btn-primary" ${recurso.url === '#' ? 'onclick="event.preventDefault();Toast.info(\'Recurso disponible próximamente\')"' : 'target="_blank"'}>
            ${recurso.type === 'video' ? '▶ Ver video' : '📥 Descargar recurso'}
          </a>
          <button class="btn btn-outline" onclick="Modal.close()">Cerrar</button>
        </div>
      `
    });
  }
};

window.Recursos = Recursos;
