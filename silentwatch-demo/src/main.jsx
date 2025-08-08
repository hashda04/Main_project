// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ✅ Import the local SilentWatch class
import { createSilentWatch } from './SilentWatch';

// ✅ Create and configure the watcher
const watcher = createSilentWatch({
  workflows: ['login', 'contact', 'checkout'],
  debug: true, // turn on logging
});

console.log('🟢 SilentWatch: init script running');

// ✅ Start watching
watcher.start();

// ✅ Custom log
watcher.log('SilentWatch has started watching...');

// ✅ Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App watcher={watcher} />
  </React.StrictMode>
);
