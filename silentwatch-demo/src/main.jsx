// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

import { createSilentWatch } from 'silent-watch'; // <-- linked package

console.log('main.jsx running');

const watcher = createSilentWatch({
  debug: true,
  backendUrl: 'http://localhost:4001/log', // your express backend
});

watcher.start();
watcher.log('SilentWatch initialized from demo main.jsx');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
