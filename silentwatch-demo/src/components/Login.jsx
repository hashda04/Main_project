// src/components/Login.jsx
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [simulateSilentFailure, setSimulateSilentFailure] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (simulateSilentFailure) {
      console.log('Simulating silent failure: skipping network call');
      return;
    }

    try {
      const resp = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!resp.ok) {
        console.error('Login failed:', resp.status);
      } else {
        console.log('Login successful');
      }
    } catch (err) {
      console.error('Login error:', err);
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
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Login
          </button>
          <label className="text-sm">
            <input
              type="checkbox"
              checked={simulateSilentFailure}
              onChange={(e) => setSimulateSilentFailure(e.target.checked)}
              className="mr-1"
            />
            Simulate silent failure
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
