// src/SilentWatch.js
console.log("✅ main.jsx is running");


class SilentWatch {
  constructor(config = {}) {
    this.observer = null;
    this.config = {
      workflows: ['login', 'contact', 'checkout'],
      debug: true, // change to false to silence logs
      ...config,
    };
  }

  init() {
    if (this.config.debug) {
      console.log('[SilentWatch] Initializing with config:', this.config);
    }
    this.observeDOM();
  }

  observeDOM() {
    const config = { childList: true, subtree: true };
    this.observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (this.config.debug) {
          console.log('[SilentWatch] DOM mutation observed:', mutation);
        }
      });
    });
    this.observer.observe(document.body, config);
  }

  start() {
    this.init();
  }

  stop() {
    this.observer?.disconnect();
    if (this.config.debug) {
      console.log('[SilentWatch] Stopped observing.');
    }
  }

  log(message) {
    if (this.config.debug) {
      console.log('[SilentWatch]', message);
    }
  }
}

export function createSilentWatch(config) {
  return new SilentWatch(config);
}
