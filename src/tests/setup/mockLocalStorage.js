beforeEach(() => {
  window.localStorage = (function() {
    let store = {};

    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value;
      },
      clear() {
        store = {};
      }
    };
  })();
});
