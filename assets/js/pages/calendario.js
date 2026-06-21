// ============================================
// ECOPLENO - Módulo Calendario Inteligente
// ============================================

const Calendario = {
  currentDate: new Date(),
  currentView: 'month', // day | week | month

  categorias: [
    { id: 'escuela', label: 'Escuela', color: '#4CAF50' },
    { id: 'terapia', label: 'Terapia', color: '#42A5F5' },
    { id: 'familia', label: 'Familia', color: '#FFA726' },
    { id: 'medico', label: 'Médico', color: '#EF5350' },
    { id: 'otros', label: 'Otros', color: '#AB47BC' }
  ],

  render() {
    return `
      <section role="region" aria-label="Calendario Inteligente">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:24px">
          <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt)">Calendario Inteligente</h1>
          <button class="btn btn-primary" id="btn-nuevo-evento">+ Nuevo evento</button>
        </div>

        <!-- VISTAS -->
        <div class="tabs" role="tablist" aria-label="Vistas del calendario" style="margin-bottom:24px">
          ${['day','week','month'].map(v => `
            <button class="tab ${v === this.currentView ? 'active' : ''}" data-view="${v}" role="tab" aria-selected="${v === this.currentView}">
              ${v === 'day' ? 'Día' : v === 'week' ? 'Semana' : 'Mes'}
            </button>
          `).join('')}
          <div style="margin-left:auto;display:flex;gap:8px;align-items:center">
            <button class="btn btn-sm btn-ghost" id="cal-prev" aria-label="Anterior">‹</button>
            <span id="cal-title" style="font-weight:600;color:var(--text-primary);min-width:180px;text-align:center">${this.getTitle()}</span>
            <button class="btn btn-sm btn-ghost" id="cal-next" aria-label="Siguiente">›</button>
            <button class="btn btn-sm btn-outline" id="cal-today">Hoy</button>
          </div>
        </div>

        <!-- CONTENEDOR DEL CALENDARIO -->
        <div id="cal-content" class="reveal" style="background:var(--bg-surface);border-radius:16px;box-shadow:var(--shadow-card);padding:24px;overflow-x:auto">
          ${this.renderView()}
        </div>

        <!-- LEYENDA -->
        <div class="reveal" style="display:flex;flex-wrap:wrap;gap:16px;margin-top:16px;padding:12px 16px;background:var(--bg-surface);border-radius:12px">
          <span style="font-weight:600;color:var(--text-secondary);font-size:0.85rem">Categorías:</span>
          ${this.categorias.map(c => `
            <span style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary)">
              <span class="category-dot" style="background:${c.color}"></span>
              ${c.label}
            </span>
          `).join('')}
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    Utils.$('#btn-nuevo-evento')?.addEventListener('click', () => this.openEventForm());

    Utils.$$('.tab[data-view]').forEach(tab => {
      tab.addEventListener('click', () => {
        this.currentView = tab.dataset.view;
        Utils.$$('.tab[data-view]').forEach(t => {
          t.classList.toggle('active', t.dataset.view === this.currentView);
          t.setAttribute('aria-selected', t.dataset.view === this.currentView);
        });
        this.refresh();
      });
    });

    Utils.$('#cal-prev')?.addEventListener('click', () => this.navigate(-1));
    Utils.$('#cal-next')?.addEventListener('click', () => this.navigate(1));
    Utils.$('#cal-today')?.addEventListener('click', () => {
      this.currentDate = new Date();
      this.refresh();
    });
  },

  navigate(dir) {
    if (this.currentView === 'day') {
      this.currentDate.setDate(this.currentDate.getDate() + dir);
    } else if (this.currentView === 'week') {
      this.currentDate.setDate(this.currentDate.getDate() + (dir * 7));
    } else {
      this.currentDate.setMonth(this.currentDate.getMonth() + dir);
    }
    this.refresh();
  },

  refresh() {
    const content = Utils.$('#cal-content');
    const title = Utils.$('#cal-title');
    if (content) content.innerHTML = this.renderView();
    if (title) title.textContent = this.getTitle();
    this.bindViewEvents();
  },

  getTitle() {
    const d = this.currentDate;
    if (this.currentView === 'day') {
      return `${Utils.getDayName(d.getDay())}, ${d.getDate()} de ${Utils.getMonthName(d.getMonth())}`;
    } else if (this.currentView === 'week') {
      const start = new Date(d);
      start.setDate(d.getDate() - d.getDay());
      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      return `${start.getDate()} - ${end.getDate()} de ${Utils.getMonthName(d.getMonth())}`;
    }
    return `${Utils.getMonthName(d.getMonth())} ${d.getFullYear()}`;
  },

  renderView() {
    if (this.currentView === 'day') return this.renderDayView();
    if (this.currentView === 'week') return this.renderWeekView();
    return this.renderMonthView();
  },

  renderDayView() {
    const events = this.getEventsForDate(this.currentDate);
    const d = this.currentDate;
    const horas = Array.from({length: 14}, (_, i) => i + 7);

    return `
      <div>
        <h3 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">
          ${Utils.getDayName(d.getDay())}, ${d.getDate()} de ${Utils.getMonthName(d.getMonth())}
        </h3>
        <div style="display:flex;flex-direction:column;gap:2px">
          ${horas.map(h => {
            const timeStr = `${String(h).padStart(2,'0')}:00`;
            const hourEvents = events.filter(e => {
              const eh = new Date(e.fecha);
              return eh.getHours() === h;
            });
            return `
              <div style="display:flex;gap:12px;padding:8px;border-bottom:1px solid var(--border-light);min-height:48px">
                <span style="width:60px;font-size:0.8rem;color:var(--text-muted);flex-shrink:0;padding-top:4px">${timeStr}</span>
                <div style="flex:1;display:flex;flex-wrap:wrap;gap:4px">
                  ${hourEvents.map(e => `
                    <div class="calendar-event" style="background:${this.getCategoryColor(e.categoria)};padding:4px 8px;border-radius:6px;color:white;cursor:pointer;font-size:0.8rem" data-id="${e.id}">
                      ${e.titulo}
                    </div>
                  `).join('')}
                  ${hourEvents.length === 0 ? '<span style="color:var(--text-muted);font-size:0.8rem">—</span>' : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        ${events.length === 0 ? '<p style="text-align:center;color:var(--text-muted);padding:32px 0">No hay eventos para este día</p>' : ''}
      </div>
    `;
  },

  renderWeekView() {
    const d = new Date(this.currentDate);
    d.setDate(d.getDate() - d.getDay());
    const days = Array.from({length: 7}, (_, i) => {
      const date = new Date(d);
      date.setDate(d.getDate() + i);
      return date;
    });
    const horas = Array.from({length: 12}, (_, i) => i + 7);

    return `
      <div style="overflow-x:auto">
        <div class="weekly-view" style="min-width:700px">
          <div class="weekly-header">
            <div class="weekly-header-cell"></div>
            ${days.map(day => `
              <div class="weekly-header-cell ${Utils.isSameDay(day, new Date()) ? 'today' : ''}">
                <div>${Utils.getDayShortName(day.getDay())}</div>
                <div style="font-size:1.1rem">${day.getDate()}</div>
              </div>
            `).join('')}
          </div>
          <div class="weekly-body">
            ${horas.map(h => `
              <div class="weekly-hour">${String(h).padStart(2,'0')}:00</div>
              ${days.map(day => {
                const events = this.getEventsForDate(day).filter(e => {
                  const eh = new Date(e.fecha);
                  return eh.getHours() === h;
                });
                return `
                  <div class="weekly-cell">
                    ${events.map(e => `
                      <div class="calendar-event" style="background:${this.getCategoryColor(e.categoria)};cursor:pointer" data-id="${e.id}">${e.titulo}</div>
                    `).join('')}
                  </div>
                `;
              }).join('')}
            `).join('')}
          </div>
        </div>
      </div>
    `;
  },

  renderMonthView() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const daysInMonth = Utils.getDaysInMonth(year, month);
    const firstDay = Utils.getFirstDayOfMonth(year, month);
    const today = new Date();

    const days = Array.from({length: 42}, (_, i) => {
      const dayNum = i - firstDay + 1;
      const date = new Date(year, month, dayNum);
      return {
        day: dayNum,
        date: date,
        isCurrentMonth: dayNum > 0 && dayNum <= daysInMonth,
        isToday: Utils.isSameDay(date, today)
      };
    });

    return `
      <div class="calendar-grid">
        ${['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'].map(d => `
          <div class="calendar-cell-header">${d}</div>
        `).join('')}
        ${days.map(d => {
          const events = d.isCurrentMonth ? this.getEventsForDate(d.date) : [];
          return `
            <div class="calendar-cell ${d.isToday ? 'today' : ''} ${!d.isCurrentMonth ? 'other-month' : ''}" style="${d.isCurrentMonth ? 'cursor:pointer' : ''}" data-date="${d.date.toISOString()}">
              ${d.isCurrentMonth ? `
                <div class="calendar-day-number">${d.day}</div>
                ${events.slice(0, 3).map(e => `
                  <div class="calendar-event" style="background:${this.getCategoryColor(e.categoria)}" data-id="${e.id}" title="${Utils.escapeHtml(e.titulo)}">${Utils.escapeHtml(e.titulo)}</div>
                `).join('')}
                ${events.length > 3 ? `<span style="font-size:11px;color:var(--text-muted)">+${events.length - 3} más</span>` : ''}
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
  },

  getEventsForDate(date) {
    const events = Storage.getArray('eventos');
    return events.filter(e => Utils.isSameDay(new Date(e.fecha), date));
  },

  getCategoryColor(catId) {
    const cat = this.categorias.find(c => c.id === catId);
    return cat ? cat.color : '#9E9E9E';
  },

  openEventForm(eventToEdit = null) {
    const isEdit = !!eventToEdit;
    const e = eventToEdit || { titulo: '', fecha: '', hora: '', categoria: 'escuela', descripcion: '' };

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const timeStr = today.toTimeString().slice(0, 5);

    Modal.open({
      title: isEdit ? 'Editar evento' : 'Nuevo evento',
      content: `
        <form id="evento-form">
          <div class="form-group">
            <label class="form-label" for="ev-titulo">Título del evento *</label>
            <input type="text" id="ev-titulo" name="titulo" class="form-input" value="${Utils.escapeHtml(e.titulo)}" placeholder="Ej: Terapia ocupacional" required autofocus>
            <span class="form-error"></span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label" for="ev-fecha">Fecha *</label>
              <input type="date" id="ev-fecha" name="fecha" class="form-input" value="${e.fecha ? e.fecha.slice(0,10) : dateStr}" required>
              <span class="form-error"></span>
            </div>
            <div class="form-group">
              <label class="form-label" for="ev-hora">Hora</label>
              <input type="time" id="ev-hora" name="hora" class="form-input" value="${e.hora || ''}">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label" for="ev-categoria">Categoría *</label>
            <select id="ev-categoria" name="categoria" class="form-select">
              ${this.categorias.map(c => `
                <option value="${c.id}" ${c.id === e.categoria ? 'selected' : ''}>${c.label}</option>
              `).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="ev-descripcion">Descripción</label>
            <textarea id="ev-descripcion" name="descripcion" class="form-textarea" placeholder="Detalles adicionales...">${Utils.escapeHtml(e.descripcion || '')}</textarea>
          </div>
          ${isEdit ? `<input type="hidden" name="id" value="${e.id}">` : ''}
          <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:16px">
            <button type="button" class="btn btn-ghost" id="btn-cancel-evento">Cancelar</button>
            <button type="submit" class="btn btn-primary">${isEdit ? 'Guardar cambios' : 'Crear evento'}</button>
          </div>
        </form>
      `,
      onClose: () => {}
    });

    const form = Utils.$('#evento-form');
    Utils.$('#btn-cancel-evento')?.addEventListener('click', () => Modal.close());

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {
        titulo: form.titulo.value.trim(),
        fecha: form.fecha.value,
        hora: form.hora.value,
        categoria: form.categoria.value,
        descripcion: form.descripcion.value.trim()
      };

      // Validations
      const errors = {};
      if (!data.titulo || data.titulo.length < 2) errors.titulo = 'El título es obligatorio (mín 2 caracteres)';
      if (!data.fecha) errors.fecha = 'La fecha es obligatoria';

      if (Object.keys(errors).length > 0) {
        Utils.showFormErrors(form, errors);
        Toast.error('Corrige los errores antes de continuar');
        return;
      }

      const fechaHora = data.fecha + (data.hora ? `T${data.hora}:00` : 'T00:00:00');

      if (isEdit) {
        Storage.updateItem('eventos', form.id.value, {
          ...data,
          fecha: fechaHora
        });
        Toast.success('Evento actualizado');
      } else {
        Storage.pushItem('eventos', {
          ...data,
          fecha: fechaHora
        });
        Toast.success('Evento creado');
      }

      Modal.close();
      this.refresh();
    });
  },

  bindViewEvents() {
    Utils.$$('.calendar-event').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = el.dataset.id;
        const event = Storage.getItem('eventos', id);
        if (event) this.showEventDetail(event);
      });
    });

    // Click on day cell to create event
    Utils.$$('.calendar-cell').forEach(el => {
      el.addEventListener('click', () => {
        const dateStr = el.dataset.date;
        if (!dateStr) return;
        this.currentDate = new Date(dateStr);
        const today = new Date();
        const dateVal = new Date(dateStr).toISOString().split('T')[0];
        const timeVal = today.toTimeString().slice(0, 5);

        Modal.open({
          title: 'Nuevo evento',
          content: `
            <form id="evento-form-quick">
              <div class="form-group">
                <label class="form-label" for="evq-titulo">Título del evento *</label>
                <input type="text" id="evq-titulo" name="titulo" class="form-input" placeholder="Ej: Terapia ocupacional" required autofocus>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
                <div class="form-group">
                  <label class="form-label" for="evq-fecha">Fecha</label>
                  <input type="date" id="evq-fecha" name="fecha" class="form-input" value="${dateVal}">
                </div>
                <div class="form-group">
                  <label class="form-label" for="evq-hora">Hora</label>
                  <input type="time" id="evq-hora" name="hora" class="form-input" value="${timeVal}">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label" for="evq-categoria">Categoría</label>
                <select id="evq-categoria" name="categoria" class="form-select">
                  ${this.categorias.map(c => `<option value="${c.id}">${c.label}</option>`).join('')}
                </select>
              </div>
              <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:16px">
                <button type="button" class="btn btn-ghost" id="btn-cancel-quick">Cancelar</button>
                <button type="submit" class="btn btn-primary">Crear</button>
              </div>
            </form>
          `
        });

        const qForm = Utils.$('#evento-form-quick');
        Utils.$('#btn-cancel-quick')?.addEventListener('click', () => Modal.close());

        qForm?.addEventListener('submit', (ev) => {
          ev.preventDefault();
          const data = {
            titulo: qForm.titulo.value.trim(),
            fecha: qForm.fecha.value + 'T' + (qForm.hora.value || '00:00') + ':00',
            hora: qForm.hora.value || '',
            categoria: qForm.categoria.value,
            descripcion: ''
          };

          if (!data.titulo) {
            Toast.error('El título es obligatorio');
            return;
          }

          Storage.pushItem('eventos', data);
          Toast.success('Evento creado');
          Modal.close();
          this.refresh();
        });
      });
    });
  },

  showEventDetail(event) {
    const cat = this.categorias.find(c => c.id === event.categoria);

    Modal.open({
      title: 'Detalle del evento',
      content: `
        <div style="text-align:center;margin-bottom:16px">
          <div style="width:64px;height:64px;border-radius:50%;background:${cat ? cat.color : '#9E9E9E'};margin:0 auto 12px;display:flex;align-items:center;justify-content:center;color:white;font-size:1.5rem;font-weight:700">${event.titulo.charAt(0).toUpperCase()}</div>
          <h3 style="font-size:1.3rem;font-weight:600;color:var(--heading-color-alt)">${Utils.escapeHtml(event.titulo)}</h3>
          <span class="badge badge-${cat ? cat.id : 'green'}">${cat ? cat.label : 'General'}</span>
        </div>
        <div style="margin-bottom:16px">
          <div style="display:flex;gap:8px;margin-bottom:8px">
            <span style="color:var(--text-muted)">📅</span>
            <span>${Utils.formatDate(event.fecha)}</span>
          </div>
          ${event.hora ? `
            <div style="display:flex;gap:8px">
              <span style="color:var(--text-muted)">⏰</span>
              <span>${event.hora}</span>
            </div>
          ` : ''}
        </div>
        ${event.descripcion ? `
          <div style="margin-bottom:16px">
            <div style="font-weight:600;color:var(--text-secondary);margin-bottom:4px">Descripción:</div>
            <p style="color:var(--text-secondary);font-size:0.9rem">${Utils.escapeHtml(event.descripcion)}</p>
          </div>
        ` : ''}
        <div style="display:flex;gap:12px;margin-top:16px">
          <button class="btn btn-outline" id="btn-edit-evento" style="flex:1">Editar</button>
          <button class="btn btn-danger" id="btn-delete-evento" style="flex:1">Eliminar</button>
        </div>
      `
    });

    Utils.$('#btn-edit-evento')?.addEventListener('click', () => {
      Modal.close();
      setTimeout(() => this.openEventForm(event), 300);
    });

    Utils.$('#btn-delete-evento')?.addEventListener('click', () => {
      if (confirm('¿Estás seguro de eliminar este evento?')) {
        Storage.removeItem('eventos', event.id);
        Toast.success('Evento eliminado');
        Modal.close();
        this.refresh();
      }
    });
  }
};

window.Calendario = Calendario;
