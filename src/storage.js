const Storage = {
  get(key, def) {
    try {
      return JSON.parse(localStorage.getItem(`neuron_${key}`)) || def;
    } catch { return def; }
  },
  set(key, val) {
    localStorage.setItem(`neuron_${key}`, JSON.stringify(val));
  }
};
