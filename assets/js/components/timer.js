// ============================================
// ECOPLENO - Componente Temporizador (Pomodoro & Relajación)
// ============================================

const Timer = {
  _interval: null,
  _remaining: 0,
  _total: 0,
  _running: false,
  _onTick: null,
  _onComplete: null,
  _type: 'pomodoro', // pomodoro | meditation | breathing

  start(config = {}) {
    this.stop();

    const {
      duration = 25 * 60,
      onTick = null,
      onComplete = null,
      type = 'pomodoro'
    } = config;

    this._remaining = duration;
    this._total = duration;
    this._running = true;
    this._onTick = onTick;
    this._onComplete = onComplete;
    this._type = type;

    if (onTick) onTick(this._remaining, this._total);

    this._interval = setInterval(() => {
      this._remaining--;
      if (this._onTick) this._onTick(this._remaining, this._total);
      if (this._remaining <= 0) {
        this.stop();
        if (this._onComplete) this._onComplete();
      }
    }, 1000);
  },

  pause() {
    if (!this._running) return;
    this._running = false;
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  },

  resume() {
    if (this._running || this._remaining <= 0) return;
    this._running = true;
    this._interval = setInterval(() => {
      this._remaining--;
      if (this._onTick) this._onTick(this._remaining, this._total);
      if (this._remaining <= 0) {
        this.stop();
        if (this._onComplete) this._onComplete();
      }
    }, 1000);
  },

  stop() {
    this._running = false;
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  },

  reset() {
    this.stop();
    this._remaining = this._total;
    if (this._onTick) this._onTick(this._remaining, this._total);
  },

  getRemaining() {
    return this._remaining;
  },

  isRunning() {
    return this._running;
  },

  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  getProgress() {
    if (this._total === 0) return 0;
    return ((this._total - this._remaining) / this._total) * 100;
  },

  // Presets
  presets: {
    pomodoro: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
    meditation: 10 * 60,
    breathing: 5 * 60
  }
};

window.Timer = Timer;
