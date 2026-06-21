// ============================================
// ECOPLENO - Módulo Recordatorios Personalizados
// ============================================

const Recordatorios = {
  filtroActual: 'todos', // todos | pendientes | completados

  categorias: [
    { id: 'medicamentos', label: 'Medicamentos', icon: '💊' },
    { id: 'tareas', label: 'Tareas', icon: '📝' },
    { id: 'examenes', label: 'Exámenes', icon: '📄' },
    { id: 'terapias', label: 'Terapias', icon: '🩺' }
  ],

  prioridades: [
    { id: 'alta', label: 'Alta', color: '#EF5350' },
    { id: 'media', label: 'Media', color: '#FFA726' },
    { id: 'baja', label: 'Baja', color: '#66BB6A' }
  ],

  render() {
    return `
      <section role="region" aria-label="Recordatorios Personalizados">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px">
          <div>
            <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">Recordatorios</h1>
            <p style="color:var(--text-secondary);font-size:0.9rem">Nunca olvides medicamentos, tareas o terapias</p>
          </div>
          <button class="btn btn-primary" id="btn-nuevo-recordatorio">+ Nuevo recordatorio</button>
        </div>

        <!-- FILTROS -->
        <div class="tabs" role="tablist" style="margin-bottom:24px">
          <button class="tab active" data-filtro="todos" role="tab" aria-selected="true">Todos</button>
          <button class="tab" data-filtro="pendientes" role="tab" aria-selected="false">Pendientes</button>
          <button class="tab" data-filtro="completados" role="tab" aria-selected="false">Completados</button>
        </div>

        <!-- LISTA -->
        <div id="recordatorios-lista" class="reveal">
          ${this.renderLista()}
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    Utils.$('#btn-nuevo-recordatorio')?.addEventListener('click', () => this.openForm());

    Utils.$$('.tab[data-filtro]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.filtroActual = tab.dataset.filtro;
        Utils.$$('.tab[data-filtro]').forEach(t => {
          t.classList.toggle('active', t.dataset.filtro === this.filtroActual);
          t.setAttribute('aria-selected', t.dataset.filtro === this.filtroActual);
        });
        this.refreshLista();
      });
    });
  },

  refreshLista() {
    const container = Utils.$('#recordatorios-lista');
    if (container) container.innerHTML = this.renderLista();
    this.bindListaEvents();
  },

  getRecordatorios() {
    let items = Storage.getArray('recordatorios');
    items.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    if (this.filtroActual === 'pendientes') return items.filter(r => !r.completado);
    if (this.filtroActual === 'completados') return items.filter(r => r.completado);
    return items;
  },

  renderLista() {
    const items = this.getRecordatorios();
    const pendientes = Storage.getArray('recordatorios').filter(r => !r.completado).length;
    const completados = Storage.getArray('recordatorios').filter(r => r.completado).length;

    if (items.length === 0) {
      return `
        <div style="text-align:center;padding:64px 24px;background:var(--bg-surface);border-radius:16px">
          <div style="font-size:4rem;margin-bottom:16px">✅</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:8px">
            ${this.filtroActual === 'completados' ? 'No hay recordatorios completados' : 'No hay recordatorios pendientes'}
          </h3>
          <p style="color:var(--text-secondary);margin-bottom:16px">
            ${this.filtroActual === 'todos' ? 'Crea tu primer recordatorio para empezar' : ''}
          </p>
          <button class="btn btn-primary" id="btn-empty-create">+ Crear recordatorio</button>
        </div>
      `;
    }

    return `
      <div style="display:flex;gap:16px;margin-bottom:16px;flex-wrap:wrap">
        <span style="font-size:0.9rem;color:var(--text-secondary)">Total: ${items.length}</span>
        <span style="font-size:0.9rem;color:#66BB6A">✓ Completados: ${completados}</span>
        <span style="font-size:0.9rem;color:#FFA726">○ Pendientes: ${pendientes}</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        ${items.map(r => this.renderRecordatorioCard(r)).join('')}
      </div>
    `;
  },

  renderRecordatorioCard(r) {
    const cat = this.categorias.find(c => c.id === r.categoria);
    const pri = this.prioridades.find(p => p.id === r.prioridad);

    return `
      <div class="card" style="display:flex;align-items:flex-start;gap:16px;padding:16px 20px;opacity:${r.completado ? '0.6' : '1'}">
        <button class="btn-check-recordatorio" data-id="${r.id}" style="flex-shrink:0;width:24px;height:24px;border-radius:50%;border:2px solid ${r.completado ? '#4CAF50' : '#E0E0E0'};background:${r.completado ? '#4CAF50' : 'transparent'};cursor:pointer;display:flex;align-items:center;justify-content:center;margin-top:2px;transition:all 0.2s" aria-label="${r.completado ? 'Marcar como pendiente' : 'Marcar como completado'}">
          ${r.completado ? '<span style="color:white;font-size:14px">✓</span>' : ''}
        </button>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span style="font-weight:600;color:var(--text-primary);${r.completado ? 'text-decoration:line-through' : ''}">${Utils.escapeHtml(r.titulo)}</span>
            ${pri ? `<span class="badge" style="background:${pri.color}20;color:${pri.color}">${pri.label}</span>` : ''}
            ${cat ? `<span class="badge badge-blue">${cat.icon} ${cat.label}</span>` : ''}
          </div>
          <div style="display:flex;gap:16px;font-size:0.8rem;color:var(--text-muted);flex-wrap:wrap">
            <span>📅 ${Utils.formatDate(r.fecha)}</span>
            ${r.hora ? `<span>⏰ ${r.hora}</span>` : ''}
          </div>
          ${r.descripcion ? `<p style="font-size:0.85rem;color:var(--text-secondary);margin-top:4px">${Utils.escapeHtml(r.descripcion)}</p>` : ''}
        </div>
        <div style="display:flex;gap:4px;flex-shrink:0">
          <button class="btn btn-sm btn-ghost btn-edit-recordatorio" data-id="${r.id}" aria-label="Editar recordatorio">✏️</button>
          <button class="btn btn-sm btn-ghost btn-delete-recordatorio" data-id="${r.id}" aria-label="Eliminar recordatorio" style="color:#EF5350">🗑️</button>
        </div>
      </div>
    `;
  },

  bindListaEvents() {
    Utils.$('#btn-empty-create')?.addEventListener('click', () => this.openForm());

    // Check
    Utils.$$('.btn-check-recordatorio').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const rec = Storage.getItem('recordatorios', id);
        if (rec) {
          Storage.updateItem('recordatorios', id, { completado: !rec.completado });
          Toast.success(rec.completado ? 'Recordatorio marcado como pendiente' : '¡Recordatorio completado! 🎉');
          this.refreshLista();
        }
      });
    });

    // Edit
    Utils.$$('.btn-edit-recordatorio').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const rec = Storage.getItem('recordatorios', id);
        if (rec) this.openForm(rec);
      });
    });

    // Delete
    Utils.$$('.btn-delete-recordatorio').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if (confirm('¿Eliminar este recordatorio?')) {
          Storage.removeItem('recordatorios', id);
          Toast.success('Recordatorio eliminado');
          this.refreshLista();
        }
      });
    });
  },

  openForm(editRecord = null) {
    const isEdit = !!editRecord;
    const r = editRecord || { titulo: '', fecha: '', hora: '', categoria: 'medicamentos', prioridad: 'media', descripcion: '' };
    const today = new Date().toISOString().split('T')[0];

    Modal.open({
      title: isEdit ? 'Editar recordatorio' : 'Nuevo recordatorio',
      content: `
        <form id="recordatorio-form">
          <div class="form-group">
            <label class="form-label" for="rec-titulo">Título *</label>
            <input type="text" id="rec-titulo" name="titulo" class="form-input" value="${Utils.escapeHtml(r.titulo)}" placeholder="Ej: Tomar medicamento" required autofocus>
            <span class="form-error"></span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label" for="rec-fecha">Fecha *</label>
              <input type="date" id="rec-fecha" name="fecha" class="form-input" value="${r.fecha ? r.fecha.slice(0,10) : today}" required>
              <span class="form-error"></span>
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-hora">Hora</label>
              <input type="time" id="rec-hora" name="hora" class="form-input" value="${r.hora || ''}">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label" for="rec-categoria">Categoría</label>
              <select id="rec-categoria" name="categoria" class="form-select">
                ${this.categorias.map(c => `
                  <option value="${c.id}" ${c.id === r.categoria ? 'selected' : ''}>${c.icon} ${c.label}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="rec-prioridad">Prioridad</label>
              <select id="rec-prioridad" name="prioridad" class="form-select">
                ${this.prioridades.map(p => `
                  <option value="${p.id}" ${p.id === r.prioridad ? 'selected' : ''}>${p.label}</option>
                `).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="rec-descripcion">Descripción</label>
            <textarea id="rec-descripcion" name="descripcion" class="form-textarea" placeholder="Notas adicionales...">${Utils.escapeHtml(r.descripcion || '')}</textarea>
          </div>
          ${isEdit ? `<input type="hidden" name="id" value="${r.id}">` : ''}
          <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:16px">
            <button type="button" class="btn btn-ghost" id="btn-cancel-rec">Cancelar</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Guardar cambios' : 'Crear recordatorio'}</button>
          </div>
        </form>
      `
    });

    const form = Utils.$('#recordatorio-form');
    Utils.$('#btn-cancel-rec')?.addEventListener('click', () => Modal.close());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        titulo: form.titulo.value.trim(),
        fecha: form.fecha.value,
        hora: form.hora.value,
        categoria: form.categoria.value,
        prioridad: form.prioridad.value,
        descripcion: form.descripcion.value.trim(),
        completado: isEdit ? editRecord.completado : false
      };

      const errors = {};
      if (!data.titulo || data.titulo.length < 2) errors.titulo = 'El título es obligatorio (mín 2 caracteres)';
      if (!data.fecha) errors.fecha = 'La fecha es obligatoria';

      if (Object.keys(errors).length > 0) {
        Utils.showFormErrors(form, errors);
        Toast.error('Corrige los errores');
        return;
      }

      if (isEdit) {
        Storage.updateItem('recordatorios', form.id.value, data);
        Toast.success('Recordatorio actualizado');
      } else {
        Storage.pushItem('recordatorios', data);
        Toast.success('Recordatorio creado');
      }

      Modal.close();
      this.refreshLista();
    });
  }
};

window.Recordatorios = Recordatorios;
