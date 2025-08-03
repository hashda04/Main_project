// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

console.log('ENTRYPOINT: main.jsx loaded (enhanced fallback watcher)');

function createEnhancedSilentWatch(config = {}) {
  const {
    logEndpoint = 'http://127.0.0.1:5000/monitor/logs', // Full backend URL
    expectedSelectors = [],
    requestTimeoutMs = 5000,
    heartbeatIntervalMs = 30000
  } = config;

  function now() {
    return new Date().toISOString();
  }

  function enqueue(event) {
    fetch(logEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        events: [event],
        page: location.href,
        timestamp: now(),
      }),
      keepalive: true,
    }).catch(() => {});
    console.log('[Enhanced SilentWatch]', event);
  }

  // Public API
  const api = {
    log: (type, data = {}) => enqueue({ type, ...data, time: now() }),
  };

  // ---- Auto-detection features ----

  // 1. Console errors
  const originalConsoleError = console.error;
  console.error = function (...args) {
    enqueue({
      type: 'console_error',
      message: args.map(String).join(' '),
      time: now(),
    });
    originalConsoleError.apply(console, args);
  };

  // 2. Unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    enqueue({
      type: 'unhandled_promise_rejection',
      reason: e.reason,
      time: now(),
    });
  });

  // 3. Button click with no fetch follow-up
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, [data-watch-button]');
    if (!btn) return;

    const btnText = btn.innerText || btn.name || 'unknown';
    let resolved = false;
    const originalFetch = window.fetch;

    window.fetch = function (...args) {
      resolved = true;
      window.fetch = originalFetch;
      return originalFetch.apply(this, args);
    };

    setTimeout(() => {
      if (!resolved) {
        enqueue({
          type: 'button_click_no_followup',
          text: btnText,
          time: now(),
        });
      }
      window.fetch = originalFetch;
    }, 3000);
  });

  // 4. Missing DOM element detection (heartbeat)
  setInterval(() => {
    expectedSelectors.forEach((sel) => {
      if (!document.querySelector(sel)) {
        enqueue({
          type: 'missing_dom_element',
          selector: sel,
          time: now(),
        });
      }
    });
  }, heartbeatIntervalMs);

  return api;
}

// Initialize watcher
const watcher = createEnhancedSilentWatch({
  expectedSelectors: ['#login-form', '#contact-form', '#checkout-form'],
});
window.SilentWatch = watcher;
watcher.log('app_initialized_fallback', { message: 'enhanced fallback active' });

// Render app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App watcher={watcher} />
  </React.StrictMode>
);
