const Storage = {
  get(key, def) {
    try {
      const val = localStorage.getItem(`neuron_${key}`);
      return val ? JSON.parse(val) : def;
    } catch { return def; }
  },
  set(key, val) {
    localStorage.setItem(`neuron_${key}`, JSON.stringify(val));
  }
};
