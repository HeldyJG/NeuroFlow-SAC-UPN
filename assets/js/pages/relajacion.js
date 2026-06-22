// ============================================
// ECOPLENO - Módulo Ejercicios de Relajación
// ============================================

const Relajacion = {
  breathingState: 'idle',
  breathingInterval: null,
  selectedSound: null,
  meditationTimer: null,

  render() {
    const registroHoy = this.getRegistroHoy();

    return `
      <section role="region" aria-label="Ejercicios de Relajación">
        <h1 data-parallax="" style="font-size:1.8rem;font-weight:700;color:var(--heading-color-alt);margin-bottom:8px">Ejercicios de Relajación</h1>
        <p style="color:var(--text-secondary);margin-bottom:24px">Herramientas para reducir el estrés y la ansiedad en familia</p>

        <div style="display:grid;grid-template-columns:1fr;gap:24px">
          <!-- RESPIRACIÓN GUIADA -->
          <div class="reveal" style="background:var(--bg-surface);border-radius:16px;padding:32px;box-shadow:var(--shadow-card)">
            <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">🌬️ Respiración Guiada</h2>
            <div style="text-align:center">
              <div class="breathing-circle" id="breathing-circle"></div>
              <p id="breathing-text" style="font-size:1.2rem;font-weight:600;color:var(--text-primary);margin:16px 0">Presiona "Iniciar" para comenzar</p>
              <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
                <button class="btn btn-primary" id="breathing-start">🌬️ Iniciar</button>
                <button class="btn btn-outline" id="breathing-stop" style="display:none">⏹ Detener</button>
              </div>
            </div>
          </div>

          <!-- MEDITACIÓN -->
          <div class="reveal" style="background:var(--bg-surface);border-radius:16px;padding:32px;box-shadow:var(--shadow-card)">
            <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">🧘 Meditación</h2>
            <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">
              <button class="btn btn-outline btn-sm med-time-btn" data-minutes="5">5 min</button>
              <button class="btn btn-outline btn-sm med-time-btn" data-minutes="10">10 min</button>
              <button class="btn btn-outline btn-sm med-time-btn" data-minutes="15">15 min</button>
            </div>
            <div style="text-align:center">
              <div class="timer-display" id="meditation-display" style="font-size:3rem">00:00</div>
              <div style="margin:12px auto;max-width:300px">
                <div class="progress-bar">
                  <div class="progress-bar-fill" id="meditation-progress" style="width:0%"></div>
                </div>
              </div>
              <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap">
                <button class="btn btn-primary" id="meditation-start">🧘 Iniciar</button>
                <button class="btn btn-outline" id="meditation-stop" style="display:none">⏹ Detener</button>
              </div>
            </div>
          </div>

          <!-- SONIDOS AMBIENTALES -->
          <div class="reveal" style="background:var(--bg-surface);border-radius:16px;padding:32px;box-shadow:var(--shadow-card)">
            <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">🎵 Sonidos Ambientales</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(80px,1fr));gap:12px">
              ${AppData.sonidosAmbientales.map(s => `
                <button class="sonido-btn" data-id="${s.id}" style="background:${s.color}15;border:2px solid ${this.selectedSound === s.id ? s.color : 'transparent'};border-radius:12px;padding:16px 8px;text-align:center;cursor:pointer;transition:all 0.2s">
                  <div style="font-size:2rem">${s.icon}</div>
                  <div style="font-size:0.75rem;color:var(--text-secondary);margin-top:4px">${s.name}</div>
                </button>
              `).join('')}
            </div>
            <div style="margin-top:16px;text-align:center">
              <p id="sonido-status" style="font-size:0.9rem;color:var(--text-muted)">Selecciona un sonido para reproducir</p>
            </div>
          </div>

          <!-- REGISTRO EMOCIONAL -->
          <div class="reveal" style="background:var(--bg-surface);border-radius:16px;padding:32px;box-shadow:var(--shadow-card)">
            <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">📝 Registro Emocional</h2>
            <form id="emocion-form">
              <p style="color:var(--text-secondary);margin-bottom:12px">¿Cómo se siente tu hijo hoy?</p>
              <div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;margin-bottom:16px">
                ${[
                  { emoji: '😊', label: 'Feliz', id: 'feliz' },
                  { emoji: '😌', label: 'Tranquilo', id: 'tranquilo' },
                  { emoji: '😰', label: 'Ansioso', id: 'ansioso' },
                  { emoji: '😴', label: 'Cansado', id: 'cansado' },
                  { emoji: '😤', label: 'Irritable', id: 'irritable' },
                  { emoji: '😢', label: 'Triste', id: 'triste' }
                ].map(e => `
                  <button type="button" class="emotion-btn ${registroHoy && registroHoy.emocion === e.id ? 'selected' : ''}" data-emocion="${e.id}" aria-label="${e.label}">
                    ${e.emoji}
                  </button>
                `).join('')}
              </div>
              <input type="hidden" name="emocion" id="emocion-seleccionada" value="${registroHoy ? registroHoy.emocion : ''}">
              <div class="form-group">
                <label class="form-label" for="emocion-nota">Nota (opcional)</label>
                <textarea id="emocion-nota" name="nota" class="form-textarea" placeholder="¿Algo que quieras registrar? Ej: Hoy tuvo un buen día en la escuela">${registroHoy ? Utils.escapeHtml(registroHoy.nota || '') : ''}</textarea>
              </div>
              <button type="submit" class="btn btn-primary">${registroHoy ? 'Actualizar registro' : 'Guardar registro'}</button>
            </form>
          </div>

          <!-- HISTORIAL EMOCIONAL -->
          <div style="background:var(--bg-surface);border-radius:16px;padding:32px;box-shadow:var(--shadow-card)">
            <h2 style="font-size:1.2rem;font-weight:600;color:var(--heading-color-alt);margin-bottom:16px">📊 Historial Emocional</h2>
            <div id="historial-emocional">
              ${this.renderHistorial()}
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Respiración guiada
    Utils.$('#breathing-start')?.addEventListener('click', () => this.startBreathing());
    Utils.$('#breathing-stop')?.addEventListener('click', () => this.stopBreathing());

    // Meditación
    Utils.$$('.med-time-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const mins = parseInt(btn.dataset.minutes);
        this.startMeditation(mins);
      });
    });
    Utils.$('#meditation-stop')?.addEventListener('click', () => this.stopMeditation());

    // Sonidos
    Utils.$$('.sonido-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        this.toggleSound(id);
      });
    });

    // Emociones
    Utils.$$('.emotion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        Utils.$$('.emotion-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        Utils.$('#emocion-seleccionada').value = btn.dataset.emocion;
      });
    });

    // Form emocion
    Utils.$('#emocion-form')?.addEventListener('submit', (e) => {
      e.preventDefault();
      const emocion = Utils.$('#emocion-seleccionada').value;
      if (!emocion) {
        Toast.warning('Selecciona una emoción');
        return;
      }
      const nota = Utils.$('#emocion-nota').value.trim();
      const registro = {
        emocion,
        nota,
        fecha: new Date().toISOString()
      };

      // Check if already registered today
      const registros = Storage.getArray('registro_emocional');
      const today = new Date().toDateString();
      const existingIdx = registros.findIndex(r => new Date(r.fecha).toDateString() === today);
      if (existingIdx >= 0) {
        Storage.updateItem('registro_emocional', registros[existingIdx].id, registro);
        Toast.success('Registro emocional actualizado');
      } else {
        Storage.pushItem('registro_emocional', registro);
        Toast.success('Emoción registrada');
      }

      // Refresh historial
      const hist = Utils.$('#historial-emocional');
      if (hist) hist.innerHTML = this.renderHistorial();
    });
  },

  // === RESPIRACIÓN GUIADA ===
  startBreathing() {
    if (this.breathingInterval) return;

    this.breathingState = 'inhale';
    const circle = Utils.$('#breathing-circle');
    const text = Utils.$('#breathing-text');
    const startBtn = Utils.$('#breathing-start');
    const stopBtn = Utils.$('#breathing-stop');

    if (startBtn) startBtn.style.display = 'none';
    if (stopBtn) stopBtn.style.display = 'inline-flex';

    const phases = [
      { state: 'inhale', duration: 4000, text: 'Inhala... 🌬️' },
      { state: 'hold', duration: 2000, text: 'Mantén... 💨' },
      { state: 'exhale', duration: 4000, text: 'Exhala... 🌊' },
      { state: 'hold', duration: 2000, text: 'Espera... 🧘' }
    ];

    let phaseIdx = 0;
    this.breathingInterval = setInterval(() => {
      const phase = phases[phaseIdx];
      if (circle) {
        circle.className = 'breathing-circle';
        if (phase.state === 'inhale') circle.classList.add('inhale');
        else if (phase.state === 'exhale') circle.classList.add('exhale');
        else circle.classList.add('hold');
      }
      if (text) text.textContent = phase.text;
      phaseIdx = (phaseIdx + 1) % phases.length;
    }, 4000);

    // Start first phase immediately
    const first = phases[0];
    if (circle) { circle.className = 'breathing-circle'; circle.classList.add('inhale'); }
    if (text) text.textContent = first.text;
  },

  stopBreathing() {
    if (this.breathingInterval) {
      clearInterval(this.breathingInterval);
      this.breathingInterval = null;
    }

    const circle = Utils.$('#breathing-circle');
    const text = Utils.$('#breathing-text');
    if (circle) circle.className = 'breathing-circle';
    if (text) text.textContent = 'Presiona "Iniciar" para comenzar';

    const startBtn = Utils.$('#breathing-start');
    const stopBtn = Utils.$('#breathing-stop');
    if (startBtn) startBtn.style.display = 'inline-flex';
    if (stopBtn) stopBtn.style.display = 'none';
  },

  // === MEDITACIÓN ===
  startMeditation(minutes) {
    const display = Utils.$('#meditation-display');
    const progress = Utils.$('#meditation-progress');
    const startBtn = Utils.$('#meditation-start');
    const stopBtn = Utils.$('#meditation-stop');

    if (startBtn) startBtn.style.display = 'none';
    if (stopBtn) stopBtn.style.display = 'inline-flex';

    if (this.meditationTimer) Timer.stop();

    const duration = minutes * 60;
    Timer.start({
      duration,
      onTick: (remaining, total) => {
        if (display) display.textContent = Timer.formatTime(remaining);
        if (progress) progress.style.width = `${((total - remaining) / total) * 100}%`;
      },
      onComplete: () => {
        if (display) display.textContent = '00:00';
        if (progress) progress.style.width = '100%';
        if (startBtn) startBtn.style.display = 'inline-flex';
        if (stopBtn) stopBtn.style.display = 'none';
        Toast.success('🧘 Meditación completada');
      },
      type: 'meditation'
    });

    Toast.info(`Meditación de ${minutes} minutos iniciada`);
  },

  stopMeditation() {
    Timer.stop();
    const display = Utils.$('#meditation-display');
    const progress = Utils.$('#meditation-progress');
    const startBtn = Utils.$('#meditation-start');
    const stopBtn = Utils.$('#meditation-stop');

    if (display) display.textContent = '00:00';
    if (progress) progress.style.width = '0%';
    if (startBtn) startBtn.style.display = 'inline-flex';
    if (stopBtn) stopBtn.style.display = 'none';
  },

  // === SONIDOS ===
  toggleSound(id) {
    if (this.selectedSound === id) {
      // Detener sonido actual
      this.stopCurrentSound();
      this.selectedSound = null;
    } else {
      // Detener el anterior si había uno
      this.stopCurrentSound();
      this.selectedSound = id;
      this.playAmbientSound(id);
    }

    const status = Utils.$('#sonido-status');
    if (status) {
      const sonido = AppData.sonidosAmbientales.find(s => s.id === this.selectedSound);
      status.textContent = this.selectedSound
        ? `🔊 Reproduciendo: ${sonido.name} ${sonido.icon}`
        : '🔇 Sonido detenido';
    }

    // Update UI
    Utils.$$('.sonido-btn').forEach(btn => {
      const isSelected = btn.dataset.id === this.selectedSound;
      const sonido = AppData.sonidosAmbientales.find(s => s.id === btn.dataset.id);
      btn.style.borderColor = isSelected ? (sonido ? sonido.color : 'transparent') : 'transparent';
      btn.style.background = isSelected ? `${sonido ? sonido.color : ''}25` : `${sonido ? sonido.color : ''}15`;
    });
  },

  stopCurrentSound() {
    if (this._soundNodes) {
      this._soundNodes.forEach(n => {
        try { n.stop ? n.stop() : n.disconnect(); } catch(e) {}
      });
      this._soundNodes = [];
    }
    if (this._soundGain) {
      try { this._soundGain.disconnect(); } catch(e) {}
      this._soundGain = null;
    }
    if (this._soundLFOs) {
      this._soundLFOs.forEach(n => { try { n.stop(); } catch(e) {} });
      this._soundLFOs = [];
    }
  },

  getAudioContext() {
    if (!this._audioCtx || this._audioCtx.state === 'closed') {
      this._audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this._audioCtx.state === 'suspended') {
      this._audioCtx.resume();
    }
    return this._audioCtx;
  },

  playAmbientSound(id) {
    const ctx = this.getAudioContext();
    this._soundNodes = [];
    this._soundLFOs = [];

    // Master gain con fade-in suave
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5);
    master.connect(ctx.destination);
    this._soundGain = master;

    switch(id) {
      case 's1': this._buildRain(ctx, master); break;
      case 's2': this._buildForest(ctx, master); break;
      case 's3': this._buildOcean(ctx, master); break;
      case 's4': this._buildNight(ctx, master); break;
      case 's5': this._buildWind(ctx, master); break;
      case 's6': this._buildFire(ctx, master); break;
    }
  },

  // 🌧️ Lluvia: ruido blanco filtrado con variación
  _buildRain(ctx, master) {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 0.6;

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'highpass';
    filter2.frequency.value = 600;

    source.connect(filter);
    filter.connect(filter2);
    filter2.connect(master);
    source.start();
    this._soundNodes.push(source);

    // Gotas ocasionales
    const dropInterval = setInterval(() => {
      if (!this._soundGain) { clearInterval(dropInterval); return; }
      const drop = ctx.createOscillator();
      const dropGain = ctx.createGain();
      drop.frequency.value = 1200 + Math.random() * 800;
      dropGain.gain.setValueAtTime(0.08, ctx.currentTime);
      dropGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      drop.connect(dropGain);
      dropGain.connect(master);
      drop.start();
      drop.stop(ctx.currentTime + 0.12);
    }, 120 + Math.random() * 200);
    this._soundNodes.push({ stop: () => clearInterval(dropInterval) });
  },

  // 🌲 Bosque: ruido grave + pájaros ocasionales
  _buildForest(ctx, master) {
    const bufferSize = ctx.sampleRate * 3;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    source.connect(filter);
    filter.connect(master);
    source.start();
    this._soundNodes.push(source);

    // Pájaros sintéticos
    const birdInterval = setInterval(() => {
      if (!this._soundGain) { clearInterval(birdInterval); return; }
      const bird = ctx.createOscillator();
      const birdGain = ctx.createGain();
      bird.type = 'sine';
      const baseFreq = 1800 + Math.random() * 1200;
      bird.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      bird.frequency.linearRampToValueAtTime(baseFreq * 1.3, ctx.currentTime + 0.1);
      bird.frequency.linearRampToValueAtTime(baseFreq, ctx.currentTime + 0.2);
      birdGain.gain.setValueAtTime(0, ctx.currentTime);
      birdGain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.05);
      birdGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      bird.connect(birdGain);
      birdGain.connect(master);
      bird.start();
      bird.stop(ctx.currentTime + 0.3);
    }, 1500 + Math.random() * 3000);
    this._soundNodes.push({ stop: () => clearInterval(birdInterval) });
  },

  // 🌊 Mar: ruido con efecto de olas (LFO)
  _buildOcean(ctx, master) {
    const bufferSize = ctx.sampleRate * 4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 700;
    filter.Q.value = 0.4;

    // LFO para simular olas
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.18; // ~1 ola cada 5s
    lfoGain.gain.value = 0.5;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const waveGain = ctx.createGain();
    waveGain.gain.value = 0.9;

    source.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(master);
    lfo.start();
    source.start();
    this._soundNodes.push(source);
    this._soundLFOs.push(lfo);
  },

  // 🌙 Noche: grave + grillos
  _buildNight(ctx, master) {
    // Fondo suave grave
    const bufSize = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const filt = ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 180;

    const lowGain = ctx.createGain();
    lowGain.gain.value = 0.3;

    src.connect(filt);
    filt.connect(lowGain);
    lowGain.connect(master);
    src.start();
    this._soundNodes.push(src);

    // Grillos: pulsos repetitivos
    let cricketT = ctx.currentTime;
    const chirp = () => {
      if (!this._soundGain) return;
      for (let p = 0; p < 3; p++) {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 4200 + Math.random() * 400;
        const t = cricketT + p * 0.04;
        g.gain.setValueAtTime(0.03, t);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
        osc.connect(g);
        g.connect(master);
        osc.start(t);
        osc.stop(t + 0.04);
      }
      cricketT += 0.45 + Math.random() * 0.3;
    };
    const cricketInterval = setInterval(() => {
      if (!this._soundGain) { clearInterval(cricketInterval); return; }
      chirp();
    }, 450);
    chirp();
    this._soundNodes.push({ stop: () => clearInterval(cricketInterval) });
  },

  // 🍃 Viento: ruido con sweep de frecuencia
  _buildWind(ctx, master) {
    const bufSize = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    filter.Q.value = 1.2;

    // LFO para variación de viento
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 400;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const g = ctx.createGain();
    g.gain.value = 0.8;

    src.connect(filter);
    filter.connect(g);
    g.connect(master);
    lfo.start();
    src.start();
    this._soundNodes.push(src);
    this._soundLFOs.push(lfo);
  },

  // 🔥 Fuego: ruido filtrado cálido + chisporroteos
  _buildFire(ctx, master) {
    const bufSize = ctx.sampleRate * 3;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;

    const g = ctx.createGain();
    g.gain.value = 0.6;

    src.connect(filter);
    filter.connect(g);
    g.connect(master);
    src.start();
    this._soundNodes.push(src);

    // Chisporroteos aleatorios
    const crackleInterval = setInterval(() => {
      if (!this._soundGain) { clearInterval(crackleInterval); return; }
      const crackleBuf = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
      const cd = crackleBuf.getChannelData(0);
      for (let i = 0; i < cd.length; i++) cd[i] = (Math.random() * 2 - 1) * (1 - i / cd.length);
      const crackSrc = ctx.createBufferSource();
      crackSrc.buffer = crackleBuf;
      const crackGain = ctx.createGain();
      crackGain.gain.value = 0.2 + Math.random() * 0.3;
      crackSrc.connect(crackGain);
      crackGain.connect(master);
      crackSrc.start();
    }, 300 + Math.random() * 700);
    this._soundNodes.push({ stop: () => clearInterval(crackleInterval) });
  },

  // === REGISTRO EMOCIONAL ===
  getRegistroHoy() {
    const registros = Storage.getArray('registro_emocional');
    const today = new Date().toDateString();
    return registros.find(r => new Date(r.fecha).toDateString() === today) || null;
  },

  renderHistorial() {
    const registros = Storage.getArray('registro_emocional');
    const emocionesMap = {
      feliz: '😊', tranquilo: '😌', ansioso: '😰', cansado: '😴', irritable: '😤', triste: '😢'
    };
    const emocionesLabel = {
      feliz: 'Feliz', tranquilo: 'Tranquilo', ansioso: 'Ansioso', cansado: 'Cansado', irritable: 'Irritable', triste: 'Triste'
    };

    if (registros.length === 0) {
      return `<p style="color:var(--text-muted);text-align:center;padding:24px">Aún no hay registros emocionales. ¡Comienza hoy!</p>`;
    }

    // Show last 7
    const last7 = registros.slice(-7).reverse();

    // Count emociones
    const counts = {};
    registros.forEach(r => { counts[r.emocion] = (counts[r.emocion] || 0) + 1; });

    return `
      <div style="margin-bottom:16px">
        <strong style="color:var(--text-primary)">Resumen semanal</strong>
      </div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">
        ${Object.entries(emocionesMap).map(([key, emoji]) => `
          <div style="text-align:center;padding:8px 12px;background:var(--gray-100);border-radius:8px;flex:1;min-width:60px">
            <div style="font-size:1.5rem">${emoji}</div>
            <div style="font-size:0.75rem;color:var(--text-secondary)">${counts[key] || 0}</div>
          </div>
        `).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        ${last7.map(r => {
          const emoji = emocionesMap[r.emocion] || '❓';
          const label = emocionesLabel[r.emocion] || r.emocion;
          return `
            <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:var(--gray-50);border-radius:8px">
              <span style="font-size:1.5rem">${emoji}</span>
              <span style="font-weight:500;color:var(--text-primary);flex:1">${label}</span>
              <span style="font-size:0.8rem;color:var(--text-muted)">${Utils.formatDate(r.fecha)}</span>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
};

window.Relajacion = Relajacion;
