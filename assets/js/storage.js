// ============================================
// ECOPLENO - Gestión de LocalStorage
// ============================================

const Storage = {
  prefix: 'neuroflow_',

  get(key) {
    try {
      const data = localStorage.getItem(this.prefix + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Storage.get error:', e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Storage.set error:', e);
      return false;
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (e) {
      console.error('Storage.remove error:', e);
      return false;
    }
  },

  getArray(key) {
    return this.get(key) || [];
  },

  pushItem(key, item) {
    const arr = this.getArray(key);
    item.id = item.id || Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    item.createdAt = item.createdAt || new Date().toISOString();
    arr.push(item);
    this.set(key, arr);
    return item;
  },

  updateItem(key, id, updates) {
    const arr = this.getArray(key);
    const idx = arr.findIndex(i => i.id === id);
    if (idx === -1) return null;
    arr[idx] = { ...arr[idx], ...updates, updatedAt: new Date().toISOString() };
    this.set(key, arr);
    return arr[idx];
  },

  removeItem(key, id) {
    const arr = this.getArray(key);
    const filtered = arr.filter(i => i.id !== id);
    if (filtered.length === arr.length) return false;
    this.set(key, filtered);
    return true;
  },

  getItem(key, id) {
    const arr = this.getArray(key);
    return arr.find(i => i.id === id) || null;
  },

  clearAll() {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix));
    keys.forEach(k => localStorage.removeItem(k));
  }
};

// Exponer globalmente
window.Storage = Storage;
