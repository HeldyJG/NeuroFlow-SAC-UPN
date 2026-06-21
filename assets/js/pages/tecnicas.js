// ============================================
// ECOPLENO - Módulo Técnicas de Estudio para TDAH
// ============================================

const Tecnicas = {
  pomodoroState: 'idle', // idle | work | break | longBreak
  pomodoroCycles: 0,
  selectedTecnica: null,

  render() {
    const favoritos = Storage.getArray('favoritos_tecnicas');

    return `
      <section role="region" aria-label="Técnicas de Estudio">
        <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt);margin-bottom:8px">Técnicas de Estudio</h1>
        <p style="color:var(--text-secondary);margin-bottom:24px">Métodos probados para mejorar la concentración y el rendimiento académico</p>

        <!-- TEMPORIZADOR POMODORO -->
        <div class="reveal" style="background:var(--bg-surface);border-radius:16px;padding:32px;margin-bottom:32px;box-shadow:var(--shadow-card)">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:24px">
            <span style="font-size:1.5rem">🍅</span>
            <h2 style="font-size:1.3rem;font-weight:600;color:var(--heading-color-alt)">Temporizador Pomodoro</h2>
          </div>
          <div style="text-align:center">
            <div class="timer-display" id="pomodoro-display">25:00</div>
            <div style="margin:16px auto;max-width:300px">
              <div class="progress-bar">
                <div class="progress-bar-fill" id="pomodoro-progress" style="width:0%"></div>
              </div>
            </div>
            <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
              <button class="btn btn-primary" id="pomodoro-start">▶ Iniciar</button>
              <button class="btn btn-outline" id="pomodoro-pause" style="display:none">⏸ Pausar</button>
              <button class="btn btn-ghost" id="pomodoro-reset">⟳ Reiniciar</button>
            </div>
            <div style="margin-top:12px;font-size:0.85rem;color:var(--text-muted)">
              Ciclos completados: <span id="pomodoro-cycles">0</span>
              <span id="pomodoro-phase" style="margin-left:12px;font-weight:600;color:var(--text-primary)">Listo para comenzar</span>
            </div>
          </div>
        </div>

        <!-- TÉCNICAS DE CONCENTRACIÓN -->
        <h2 style="font-size:1.3rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">Técnicas de Concentración</h2>
        <div class="grid-auto reveal" style="margin-bottom:32px">
          ${AppData.tecnicasEstudio.map(t => {
            const isFav = favoritos.includes(t.id);
            return `
              <div class="card card-interactive tecnica-card" data-id="${t.id}" style="position:relative">
                <button class="btn-fav-tecnica" data-id="${t.id}" aria-label="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}" style="position:absolute;top:12px;right:12px;background:none;border:none;font-size:1.3rem;cursor:pointer;transition:transform 0.2s;color:${isFav ? '#EF5350' : '#E0E0E0'}">
                  ${isFav ? '❤️' : '🤍'}
                </button>
                <div class="card-icon" style="background:${t.color}20;margin-bottom:12px;font-size:1.8rem">${t.icon}</div>
                <h3 style="font-weight:600;color:var(--text-primary);margin-bottom:8px">${t.title}</h3>
                <p style="color:var(--text-secondary);font-size:0.85rem;line-height:1.6">${t.description}</p>
                ${t.hasTimer ? '<span class="badge badge-green" style="margin-top:8px">⏱ Con temporizador</span>' : ''}
              </div>
            `;
          }).join('')}
        </div>

        <!-- CONSEJOS PRÁCTICOS -->
        <div class="reveal" style="background:linear-gradient(135deg,#E8F5E9,#C8E6C9);border-radius:16px;padding:32px;margin-bottom:32px">
          <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">💡 Consejos prácticos</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px">
            <div style="background:var(--bg-surface);border-radius:12px;padding:16px">
              <strong style="color:var(--heading-color-alt)">Ambiente de estudio:</strong>
              <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">Espacio ordenado, sin distracciones visuales ni auditivas. Música instrumental de fondo si ayuda.</p>
            </div>
            <div style="background:var(--bg-surface);border-radius:12px;padding:16px">
              <strong style="color:var(--heading-color-alt)">Rutina previa:</strong>
              <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">5 minutos de respiración o estiramientos antes de empezar a estudiar para preparar la mente.</p>
            </div>
            <div style="background:var(--bg-surface);border-radius:12px;padding:16px">
              <strong style="color:var(--heading-color-alt)">Refuerzo positivo:</strong>
              <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">Después de cada sesión, una pequeña recompensa: un sticker, 5 min de juego o su actividad favorita.</p>
            </div>
            <div style="background:var(--bg-surface);border-radius:12px;padding:16px">
              <strong style="color:var(--heading-color-alt)">Señales visuales:</strong>
              <p style="color:var(--text-secondary);font-size:0.85rem;margin-top:4px">Usa un semáforo de estudio: verde (concentrado), amarillo (casi distraído), rojo (descanso necesario).</p>
            </div>
          </div>
        </div>

        <!-- VIDEOS EDUCATIVOS -->
        <h2 style="font-size:1.3rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">🎬 Videos educativos</h2>
        <div class="grid-auto" style="margin-bottom:32px">
          <div class="card" style="padding:16px">
            <div style="background:var(--gray-100);border-radius:12px;height:180px;display:flex;align-items:center;justify-content:center;font-size:3rem;margin-bottom:12px">🎯</div>
            <h4 style="font-weight:600;color:var(--text-primary)">Técnicas de enfoque para niños</h4>
            <p style="font-size:0.85rem;color:var(--text-muted)">5:32 min</p>
          </div>
          <div class="card" style="padding:16px">
            <div style="background:var(--gray-100);border-radius:12px;height:180px;display:flex;align-items:center;justify-content:center;font-size:3rem;margin-bottom:12px">🧠</div>
            <h4 style="font-weight:600;color:var(--text-primary)">Cómo funciona el TDAH</h4>
            <p style="font-size:0.85rem;color:var(--text-muted)">8:15 min</p>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
    this.initPomodoro();
  },

  bindEvents() {
    // Favorites
    Utils.$$('.btn-fav-tecnica').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        let favs = Storage.getArray('favoritos_tecnicas');
        if (favs.includes(id)) {
          favs = favs.filter(f => f !== id);
          Toast.info('Eliminado de favoritos');
        } else {
          favs.push(id);
          Toast.success('Agregado a favoritos');
        }
        Storage.set('favoritos_tecnicas', favs);
        btn.style.color = favs.includes(id) ? '#EF5350' : '#E0E0E0';
        btn.textContent = favs.includes(id) ? '❤️' : '🤍';
      });
    });

    // Tecnica card click
    Utils.$$('.tecnica-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const tecnica = AppData.tecnicasEstudio.find(t => t.id === id);
        if (tecnica) {
          Modal.open({
            title: tecnica.title,
            content: `
              <div style="text-align:center">
                <div style="font-size:4rem;margin-bottom:16px">${tecnica.icon}</div>
                <p style="color:var(--text-secondary);line-height:1.7">${tecnica.description}</p>
                ${tecnica.hasTimer ? `
                  <button class="btn btn-primary" style="margin-top:16px" onclick="window.location.hash='tecnicas'">Ir al temporizador</button>
                ` : ''}
              </div>
            `
          });
        }
      });
    });
  },

  initPomodoro() {
    const display = Utils.$('#pomodoro-display');
    const progress = Utils.$('#pomodoro-progress');
    const startBtn = Utils.$('#pomodoro-start');
    const pauseBtn = Utils.$('#pomodoro-pause');
    const resetBtn = Utils.$('#pomodoro-reset');
    const cyclesEl = Utils.$('#pomodoro-cycles');
    const phaseEl = Utils.$('#pomodoro-phase');

    if (!display) return;

    const updateDisplay = (remaining, total) => {
      if (display) display.textContent = Timer.formatTime(remaining);
      if (progress) progress.style.width = Timer.getProgress() + '%';
    };

    const onComplete = () => {
      this.pomodoroCycles++;
      if (cyclesEl) cyclesEl.textContent = this.pomodoroCycles;

      if (this.pomodoroCycles % 4 === 0) {
        // Long break
        this.pomodoroState = 'longBreak';
        if (phaseEl) phaseEl.textContent = '🔋 Descanso largo (15 min)';
        Toast.info('¡Gran trabajo! Tómate un descanso largo de 15 minutos.');
        Timer.start({
          duration: Timer.presets.longBreak,
          onTick: updateDisplay,
          onComplete: () => {
            this.pomodoroState = 'idle';
            if (phaseEl) phaseEl.textContent = '✅ Ciclo completo! Listo para comenzar';
            if (startBtn) startBtn.textContent = '▶ Iniciar';
            if (pauseBtn) pauseBtn.style.display = 'none';
            Toast.success('¡Descanso completado! 🎉');
          }
        });
      } else {
        // Short break
        this.pomodoroState = 'break';
        if (phaseEl) phaseEl.textContent = '☕ Descanso corto (5 min)';
        Toast.info('¡Tiempo terminado! Tómate 5 minutos de descanso.');
        Timer.start({
          duration: Timer.presets.shortBreak,
          onTick: updateDisplay,
          onComplete: () => {
            this.pomodoroState = 'idle';
            if (phaseEl) phaseEl.textContent = '¡Descanso terminado! ¿Listo para otro ciclo?';
            if (startBtn) startBtn.textContent = '▶ Iniciar';
            if (pauseBtn) pauseBtn.style.display = 'none';
            Toast.success('¡Descanso terminado! Vamos de nuevo 💪');
          }
        });
      }
    };

    startBtn?.addEventListener('click', () => {
      if (this.pomodoroState === 'idle') {
        this.pomodoroState = 'work';
        if (phaseEl) phaseEl.textContent = '🎯 Enfoque total (25 min)';
        if (startBtn) startBtn.textContent = '⏳ Trabajando...';
        if (pauseBtn) pauseBtn.style.display = 'inline-flex';
        Timer.start({
          duration: Timer.presets.pomodoro,
          onTick: updateDisplay,
          onComplete
        });
      }
    });

    pauseBtn?.addEventListener('click', () => {
      if (Timer.isRunning()) {
        Timer.pause();
        if (startBtn) startBtn.textContent = '▶ Reanudar';
        if (phaseEl) phaseEl.textContent = '⏸ Pausado';
      } else {
        Timer.resume();
        if (startBtn) startBtn.textContent = '⏳ Trabajando...';
        if (phaseEl) phaseEl.textContent = this.pomodoroState === 'work' ? '🎯 Enfoque total' : '☕ Descanso';
      }
    });

    resetBtn?.addEventListener('click', () => {
      Timer.stop();
      this.pomodoroState = 'idle';
      if (display) display.textContent = '25:00';
      if (progress) progress.style.width = '0%';
      if (startBtn) startBtn.textContent = '▶ Iniciar';
      if (pauseBtn) pauseBtn.style.display = 'none';
      if (phaseEl) phaseEl.textContent = 'Listo para comenzar';
    });
  }
};

window.Tecnicas = Tecnicas;
