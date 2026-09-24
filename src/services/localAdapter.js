// Development fallback when Firebase is not configured: stores documents in
// localStorage so the full flow (forms → admin dashboard) can be exercised.
const key = (col) => `sayemans:dev:${col}`;

export const localDb = {
  add(col, data) {
    const list = this.list(col);
    const doc = { id: crypto.randomUUID(), ...data, createdAt: new Date().toISOString() };
    list.unshift(doc);
    localStorage.setItem(key(col), JSON.stringify(list.slice(0, 500)));
    return doc;
  },
  list(col) {
    try {
      return JSON.parse(localStorage.getItem(key(col)) || '[]');
    } catch {
      return [];
    }
  },
  update(col, id, patch) {
    const list = this.list(col).map((d) => (d.id === id ? { ...d, ...patch } : d));
    localStorage.setItem(key(col), JSON.stringify(list));
  },
};
