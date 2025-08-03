// silent-watch-lite/src/index.js

function now() {
  return new Date().toISOString();
}

export default function createSilentWatch(config = {}) {
  const {
    logEndpoint = '/monitor/logs',
    heartbeatIntervalMs = 30000,
    requestTimeoutMs = 5000,
    expectedSelectors = [],
    flushIntervalMs = 5000,
    maxBatchSize = 20,
  } = config;

  let queue = [];
  let isFlushing = false;

  function enqueue(event) {
    queue.push(event);
    if (queue.length >= maxBatchSize) {
      flush();
    }
  }

  async function flush() {
    if (isFlushing || queue.length === 0) return;
    isFlushing = true;
    const payload = queue.splice(0, queue.length);
    try {
      await fetch(logEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: payload,
          page: location.href,
          timestamp: now(),
        }),
        keepalive: true,
      });
    } catch (err) {
      console.warn('SilentWatch send failed', err);
      queue = payload.concat(queue); // retry later
    } finally {
      isFlushing = false;
    }
  }

  // Wrap console errors
  {
    const originalConsoleError = console.error;
    console.error = function (...args) {
      enqueue({
        type: 'console_error',
        message: args.map(String).join(' '),
        time: now(),
      });
      originalConsoleError.apply(console, args);
    };
    window.addEventListener('unhandledrejection', (e) => {
      enqueue({
        type: 'unhandled_promise_rejection',
        reason: e.reason,
        time: now(),
      });
    });
    window.addEventListener('error', (e) => {
      enqueue({
        type: 'js_error',
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        time: now(),
      });
    });
  }

  // Intercept fetch
  if (window.fetch) {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      const url = args[0];
      const method = (args[1] && args[1].method) || 'GET';
      const start = Date.now();
      let resolved = false;

      const timeoutId = setTimeout(() => {
        if (!resolved) {
          enqueue({
            type: 'fetch_timeout',
            url: String(url),
            method,
            duration: Date.now() - start,
            threshold: requestTimeoutMs,
            time: now(),
          });
        }
      }, requestTimeoutMs);

      return originalFetch.apply(this, args)
        .then((res) => {
          resolved = true;
          clearTimeout(timeoutId);
          if (!res.ok) {
            enqueue({
              type: 'fetch_error_status',
              url: String(url),
              method,
              status: res.status,
              duration: Date.now() - start,
              time: now(),
            });
          }
          return res;
        })
        .catch((err) => {
          resolved = true;
          clearTimeout(timeoutId);
          enqueue({
            type: 'fetch_exception',
            url: String(url),
            method,
            message: err.message || String(err),
            duration: Date.now() - start,
            time: now(),
          });
          throw err;
        });
    };
  }

  // Button click no-followup detection
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, [data-watch-button]');
    if (!btn) return;
    const btnText = btn.innerText || btn.name || 'unknown';
    let resolved = false;

    const originalFetch = window.fetch;
    function tempFetch(...args) {
      resolved = true;
      window.fetch = originalFetch;
      return originalFetch.apply(this, args);
    }
    window.fetch = tempFetch;

    setTimeout(() => {
      if (!resolved) {
        enqueue({
          type: 'button_click_no_followup',
          text: btnText,
          time: now(),
          note: 'No network activity shortly after click',
        });
      }
      window.fetch = originalFetch;
    }, 3000);
  });

  // Heartbeat + expected selector checks
  setInterval(() => {
    enqueue({
      type: 'heartbeat',
      time: now(),
      viewport: { w: window.innerWidth, h: window.innerHeight },
      userAgent: navigator.userAgent,
    });
    expectedSelectors.forEach((sel) => {
      if (!document.querySelector(sel)) {
        enqueue({
          type: 'missing_dom_element',
          selector: sel,
          time: now(),
          note: 'Expected element not found',
        });
      }
    });
  }, heartbeatIntervalMs);

  // Periodic flush and beforeunload
  setInterval(flush, flushIntervalMs);
  window.addEventListener('beforeunload', flush);

  return {
    log: (type, data = {}) => enqueue({ type, ...data, time: now() }),
    flush,
  };
}
