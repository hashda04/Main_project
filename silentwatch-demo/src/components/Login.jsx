// src/components/Login.jsx
import React, { useState } from 'react';

const Login = ({ watcher }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [simulateSilentFailure, setSimulateSilentFailure] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    watcher.log('login_attempt', { email });

    if (simulateSilentFailure) {
      // do nothing: simulate silent failure (button clicked but no backend call)
      console.log('Simulating silent failure: skipping network call');
      return;
    }

    try {
      // actual backend call
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!resp.ok) {
        watcher.log('login_failure', { email, status: resp.status });
      } else {
        watcher.log('login_success', { email });
      }
    } catch (err) {
      watcher.log('login_error', { email, error: err.message });
      console.error('Login fetch exception', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Login</h2>
      <form id="login-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Email</label>
          <input
            className="block border p-2 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            className="block border p-2 w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            data-watch-button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Login
          </button>
          <label className="text-sm">
            <input
              type="checkbox"
              checked={simulateSilentFailure}
              onChange={(e) => setSimulateSilentFailure(e.target.checked)}
              className="mr-1"
            />
            Simulate silent failure (no backend call)
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
