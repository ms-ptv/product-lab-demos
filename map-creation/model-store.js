/* Speicher für hochgeladene Modelle: IndexedDB im Browser (nichts verlässt den Rechner).
   Eintrag: {id, name, line, created, stats, city}. Die Liste lädt nur Metadaten, nicht die Geometrie. */
window.ModelStore = (() => {
  const DB = 'route-visualization', STORE = 'models';
  const open = () => new Promise((ok, fail) => {
    const rq = indexedDB.open(DB, 1);
    rq.onupgradeneeded = () => rq.result.createObjectStore(STORE, {keyPath: 'id'});
    rq.onsuccess = () => ok(rq.result);
    rq.onerror = () => fail(rq.error);
  });
  const run = async (mode, fn) => {
    const db = await open();
    return new Promise((ok, fail) => {
      const tx = db.transaction(STORE, mode), res = fn(tx.objectStore(STORE));
      tx.oncomplete = () => { db.close(); ok(res.result); };
      tx.onerror = tx.onabort = () => { db.close(); fail(tx.error || new Error('Storage failed')); };
    });
  };
  const newId = () => 'm-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  return {
    get: id => run('readonly', s => s.get(id)),
    put: rec => { rec.id = rec.id || newId(); return run('readwrite', s => s.put(rec)).then(() => rec.id); },
    remove: id => run('readwrite', s => s.delete(id)),
    async list(){
      const db = await open();
      return new Promise((ok, fail) => {
        const out = [], rq = db.transaction(STORE).objectStore(STORE).openCursor();
        rq.onsuccess = () => {
          const c = rq.result;
          if(c){ const {city, ...meta} = c.value; out.push(meta); c.continue(); } else { db.close(); ok(out.sort((a, b) => b.created - a.created)); }
        };
        rq.onerror = () => { db.close(); fail(rq.error); };
      });
    },
  };
})();
