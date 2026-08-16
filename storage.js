/* Panthers storage adapter.
   Provides window.storage with the same shape the app expects.
   - If config.js has Supabase details, data is SHARED between all coaches.
   - If not, it falls back to this device only, so the app still works.        */

(function () {
  var cfg = window.PANTHERS_CONFIG || {};
  var live = !!(cfg.supabaseUrl && cfg.supabaseKey);

  function headers() {
    return {
      "apikey": cfg.supabaseKey,
      "Authorization": "Bearer " + cfg.supabaseKey,
      "Content-Type": "application/json"
    };
  }

  function localGet(key) {
    var v = localStorage.getItem("panthers:" + key);
    if (v === null) throw new Error("not found");
    return { key: key, value: v, shared: false };
  }

  window.storage = {
    get: async function (key) {
      if (!live) return localGet(key);
      try {
        var r = await fetch(cfg.supabaseUrl + "/rest/v1/panthers_kv?key=eq." +
          encodeURIComponent(key) + "&select=value", { headers: headers() });
        if (!r.ok) throw new Error("http " + r.status);
        var rows = await r.json();
        if (!rows.length) throw new Error("not found");
        // keep a local copy so the app still opens with no signal at the pitch
        try { localStorage.setItem("panthers:" + key, rows[0].value); } catch (e) {}
        return { key: key, value: rows[0].value, shared: true };
      } catch (e) {
        return localGet(key); // offline — use the last copy we saw
      }
    },

    set: async function (key, value) {
      try { localStorage.setItem("panthers:" + key, value); } catch (e) {}
      if (!live) return { key: key, value: value, shared: false };
      var r = await fetch(cfg.supabaseUrl + "/rest/v1/panthers_kv", {
        method: "POST",
        headers: Object.assign(headers(), { "Prefer": "resolution=merge-duplicates" }),
        body: JSON.stringify({ key: key, value: value })
      });
      if (!r.ok) throw new Error("save failed: " + r.status);
      return { key: key, value: value, shared: true };
    },

    delete: async function (key) {
      localStorage.removeItem("panthers:" + key);
      if (!live) return { key: key, deleted: true, shared: false };
      await fetch(cfg.supabaseUrl + "/rest/v1/panthers_kv?key=eq." +
        encodeURIComponent(key), { method: "DELETE", headers: headers() });
      return { key: key, deleted: true, shared: true };
    }
  };

  window.PANTHERS_SHARED = live;
})();
