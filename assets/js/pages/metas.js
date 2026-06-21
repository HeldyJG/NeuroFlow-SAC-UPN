// ============================================
// ECOPLENO - Módulo Seguimiento de Metas Académicas
// ============================================

const Metas = {
  tipoActual: 'semanales', // semanales | mensuales

  render() {
    return `
      <section role="region" aria-label="Seguimiento de Metas Académicas">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px">
          <div>
            <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">Metas Académicas</h1>
            <p style="color:var(--text-secondary);font-size:0.9rem">Establece objetivos y celebra cada logro</p>
          </div>
          <button class="btn btn-primary" id="btn-nueva-meta">+ Nueva meta</button>
        </div>

        <!-- TABS -->
        <div class="tabs" role="tablist" style="margin-bottom:24px">
          <button class="tab active" data-tipo="semanales" role="tab" aria-selected="true">📅 Semanales</button>
          <button class="tab" data-tipo="mensuales" role="tab" aria-selected="false">📆 Mensuales</button>
        </div>

        <!-- ESTADÍSTICAS -->
        <div id="metas-estadisticas" class="reveal">
          ${this.renderEstadisticas()}
        </div>

        <!-- LISTA -->
        <div id="metas-lista" class="reveal" style="margin-top:24px">
          ${this.renderLista()}
        </div>

        <!-- LOGROS -->
        <div style="margin-top:32px">
          <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">🏆 Logros y Recompensas</h2>
          <div id="metas-logros" class="reveal">
            ${this.renderLogros()}
          </div>
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    Utils.$('#btn-nueva-meta')?.addEventListener('click', () => this.openForm());

    Utils.$$('.tab[data-tipo]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.tipoActual = tab.dataset.tipo;
        Utils.$$('.tab[data-tipo]').forEach(t => {
          t.classList.toggle('active', t.dataset.tipo === this.tipoActual);
          t.setAttribute('aria-selected', t.dataset.tipo === this.tipoActual);
        });
        this.refresh();
      });
    });
  },

  refresh() {
    const lista = Utils.$('#metas-lista');
    const stats = Utils.$('#metas-estadisticas');
    if (lista) lista.innerHTML = this.renderLista();
    if (stats) stats.innerHTML = this.renderEstadisticas();
    this.bindListaEvents();
  },

  getMetas() {
    const type = this.tipoActual === 'semanales' ? 'semanal' : 'mensual';
    return Storage.getArray('metas').filter(m => m.tipo === type);
  },

  renderEstadisticas() {
    const metas = this.getMetas();
    const total = metas.length;
    const completadas = metas.filter(m => m.progreso >= 100).length;
    const enProgreso = total - completadas;
    const promedio = total > 0 ? Math.round(metas.reduce((sum, m) => sum + m.progreso, 0) / total) : 0;

    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px">
        <div class="card" style="text-align:center;padding:16px">
          <div style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">${total}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Total metas</div>
        </div>
        <div class="card" style="text-align:center;padding:16px">
          <div style="font-size:1.8rem;font-weight:700;color:#66BB6A">${completadas}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Completadas ✓</div>
        </div>
        <div class="card" style="text-align:center;padding:16px">
          <div style="font-size:1.8rem;font-weight:700;color:#FFA726">${enProgreso}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">En progreso</div>
        </div>
        <div class="card" style="text-align:center;padding:16px">
          <div style="font-size:1.8rem;font-weight:700;color:#42A5F5">${promedio}%</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Progreso promedio</div>
        </div>
      </div>
    `;
  },

  renderLista() {
    const metas = this.getMetas();

    if (metas.length === 0) {
      return `
        <div style="text-align:center;padding:64px 24px;background:var(--bg-surface);border-radius:16px">
          <div style="font-size:4rem;margin-bottom:16px">🎯</div>
          <h3 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:8px">
            No hay metas ${this.tipoActual}
          </h3>
          <p style="color:var(--text-secondary);margin-bottom:16px">Crea tu primera meta académica</p>
          <button class="btn btn-primary" id="btn-empty-meta">+ Crear meta</button>
        </div>
      `;
    }

    return `
      <div style="display:flex;flex-direction:column;gap:16px">
        ${metas.map(m => this.renderMetaCard(m)).join('')}
      </div>
    `;
  },

  renderMetaCard(m) {
    const dificultadColors = {
      facil: '#66BB6A',
      medio: '#FFA726',
      dificil: '#EF5350'
    };
    const dificultadLabels = {
      facil: 'Fácil',
      medio: 'Medio',
      dificil: 'Difícil'
    };
    const isComplete = m.progreso >= 100;

    return `
      <div class="card meta-card" data-id="${m.id}" style="border-left:4px solid ${isComplete ? '#4CAF50' : dificultadColors[m.dificultad] || '#42A5F5'}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px">
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
              <h3 style="font-weight:600;color:var(--text-primary);font-size:1.05rem">${Utils.escapeHtml(m.titulo)}</h3>
              <span class="badge" style="background:${dificultadColors[m.dificultad]}20;color:${dificultadColors[m.dificultad]}">
                ${dificultadLabels[m.dificultad] || 'Media'}
              </span>
              ${isComplete ? '<span class="badge badge-green">✅ Completada</span>' : ''}
            </div>
            ${m.descripcion ? `<p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">${Utils.escapeHtml(m.descripcion)}</p>` : ''}
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0">
            <button class="btn btn-sm btn-ghost btn-edit-meta" data-id="${m.id}" aria-label="Editar meta">✏️</button>
            <button class="btn btn-sm btn-ghost btn-delete-meta" data-id="${m.id}" aria-label="Eliminar meta" style="color:#EF5350">🗑️</button>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:12px">
          <div style="flex:1">
            <div class="progress-bar">
              <div class="progress-bar-fill ${isComplete ? 'complete' : ''}" style="width:${m.progreso}%"></div>
            </div>
          </div>
          <span style="font-weight:700;color:var(--heading-color-alt);font-size:0.9rem;min-width:45px;text-align:right">${m.progreso}%</span>
        </div>

        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:0.8rem;color:var(--text-muted)">
          <span>📅 ${Utils.formatDate(m.fechaLimite)}</span>
          ${!isComplete ? `
            <div style="display:flex;gap:4px">
              <button class="btn btn-sm btn-primary btn-avance-meta" data-id="${m.id}" data-accion="mas">+10%</button>
              <button class="btn btn-sm btn-outline btn-avance-meta" data-id="${m.id}" data-accion="menos">-10%</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },

  renderLogros() {
    const logros = Storage.getArray('logros');
    const completadas = Storage.getArray('metas').filter(m => m.progreso >= 100).length;

    const logrosDisponibles = [
      { id: 'l1', icon: '🌟', label: 'Primera meta', desc: 'Completa tu primera meta', condicion: completadas >= 1, unlocked: logros.includes('l1') },
      { id: 'l2', icon: '⭐', label: '3 Metas', desc: 'Completa 3 metas', condicion: completadas >= 3, unlocked: logros.includes('l2') },
      { id: 'l3', icon: '🏅', label: '5 Metas', desc: 'Completa 5 metas', condicion: completadas >= 5, unlocked: logros.includes('l3') },
      { id: 'l4', icon: '🏆', label: '10 Metas', desc: 'Completa 10 metas', condicion: completadas >= 10, unlocked: logros.includes('l4') },
      { id: 'l5', icon: '💪', label: 'Dedicación', desc: 'Completa 3 metas seguidas', condicion: false, unlocked: logros.includes('l5') }
    ];

    // Auto-unlock
    logrosDisponibles.forEach(l => {
      if (l.condicion && !l.unlocked) {
        const current = Storage.getArray('logros');
        if (!current.includes(l.id)) {
          current.push(l.id);
          Storage.set('logros', current);
          Toast.success(`🏆 Logro desbloqueado: ${l.label}`);
          l.unlocked = true;
        }
      }
    });

    return `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:12px">
        ${logrosDisponibles.map(l => `
          <div class="card" style="text-align:center;padding:16px;opacity:${l.unlocked ? '1' : '0.4'}">
            <div style="font-size:2.5rem;margin-bottom:8px">${l.unlocked ? l.icon : '🔒'}</div>
            <div style="font-weight:600;font-size:0.85rem;color:var(--text-primary)">${l.label}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">${l.desc}</div>
            ${l.unlocked ? '<div style="font-size:0.7rem;color:#4CAF50;margin-top:4px">✓ Desbloqueado</div>' : ''}
          </div>
        `).join('')}
      </div>
    `;
  },

  bindListaEvents() {
    Utils.$('#btn-empty-meta')?.addEventListener('click', () => this.openForm());

    // Avance
    Utils.$$('.btn-avance-meta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const accion = btn.dataset.accion;
        const meta = Storage.getItem('metas', id);
        if (!meta) return;

        let nuevoProgreso = meta.progreso + (accion === 'mas' ? 10 : -10);
        nuevoProgreso = Utils.clamp(nuevoProgreso, 0, 100);

        Storage.updateItem('metas', id, { progreso: nuevoProgreso });

        if (nuevoProgreso >= 100 && meta.progreso < 100) {
          Toast.success('🎉 ¡Meta completada!');
        } else {
          Toast.success(`Progreso: ${nuevoProgreso}%`);
        }

        this.refresh();
      });
    });

    // Edit
    Utils.$$('.btn-edit-meta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const meta = Storage.getItem('metas', btn.dataset.id);
        if (meta) this.openForm(meta);
      });
    });

    // Delete
    Utils.$$('.btn-delete-meta').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (confirm('¿Eliminar esta meta?')) {
          Storage.removeItem('metas', btn.dataset.id);
          Toast.success('Meta eliminada');
          this.refresh();
        }
      });
    });
  },

  openForm(editMeta = null) {
    const isEdit = !!editMeta;
    const m = editMeta || { titulo: '', descripcion: '', fechaLimite: '', tipo: this.tipoActual === 'semanales' ? 'semanal' : 'mensual', dificultad: 'medio', progreso: 0 };
    const today = new Date().toISOString().split('T')[0];

    Modal.open({
      title: isEdit ? 'Editar meta' : 'Nueva meta',
      content: `
        <form id="meta-form">
          <div class="form-group">
            <label class="form-label" for="meta-titulo">Nombre de la meta *</label>
            <input type="text" id="meta-titulo" name="titulo" class="form-input" value="${Utils.escapeHtml(m.titulo)}" placeholder="Ej: Terminar tareas a tiempo" required autofocus>
            <span class="form-error"></span>
          </div>
          <div class="form-group">
            <label class="form-label" for="meta-descripcion">Descripción</label>
            <textarea id="meta-descripcion" name="descripcion" class="form-textarea" placeholder="Describe la meta...">${Utils.escapeHtml(m.descripcion || '')}</textarea>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label" for="meta-fecha">Fecha límite *</label>
              <input type="date" id="meta-fecha" name="fechaLimite" class="form-input" value="${m.fechaLimite ? m.fechaLimite.slice(0,10) : today}" required>
              <span class="form-error"></span>
            </div>
            <div class="form-group">
              <label class="form-label" for="meta-dificultad">Dificultad</label>
              <select id="meta-dificultad" name="dificultad" class="form-select">
                <option value="facil" ${m.dificultad === 'facil' ? 'selected' : ''}>Fácil</option>
                <option value="medio" ${m.dificultad === 'medio' ? 'selected' : ''}>Medio</option>
                <option value="dificil" ${m.dificultad === 'dificil' ? 'selected' : ''}>Difícil</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="meta-progreso">Progreso inicial</label>
            <div style="display:flex;align-items:center;gap:12px">
              <input type="range" id="meta-progreso" name="progreso" class="form-input" min="0" max="100" value="${m.progreso}" style="flex:1;padding:0">
              <span id="meta-progreso-val" style="font-weight:700;color:var(--heading-color-alt);min-width:40px">${m.progreso}%</span>
            </div>
          </div>
          <input type="hidden" name="tipo" value="${m.tipo}">
          ${isEdit ? `<input type="hidden" name="id" value="${m.id}">` : ''}
          <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:16px">
            <button type="button" class="btn btn-ghost" id="btn-cancel-meta">Cancelar</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Guardar cambios' : 'Crear meta'}</button>
          </div>
        </form>
      `
    });

    const form = Utils.$('#meta-form');
    Utils.$('#btn-cancel-meta')?.addEventListener('click', () => Modal.close());

    // Range sync
    const range = Utils.$('#meta-progreso');
    const rangeVal = Utils.$('#meta-progreso-val');
    if (range && rangeVal) {
      range.addEventListener('input', () => { rangeVal.textContent = range.value + '%'; });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        titulo: form.titulo.value.trim(),
        descripcion: form.descripcion.value.trim(),
        fechaLimite: form.fechaLimite.value,
        dificultad: form.dificultad.value,
        progreso: parseInt(form.progreso.value) || 0,
        tipo: form.tipo.value
      };

      if (!data.titulo || data.titulo.length < 2) {
        Toast.error('El nombre de la meta es obligatorio');
        return;
      }
      if (!data.fechaLimite) {
        Toast.error('La fecha límite es obligatoria');
        return;
      }

      if (isEdit) {
        Storage.updateItem('metas', form.id.value, data);
        Toast.success('Meta actualizada');
      } else {
        Storage.pushItem('metas', data);
        Toast.success('Meta creada');
      }

      Modal.close();
      this.refresh();
    });
  }
};

window.Metas = Metas;
