// src/components/ContactForm.jsx
import React, { useState } from 'react';
import useSilentWatch from '../hooks/useSilentWatch';

const ContactForm = () => {
  const watcher = useSilentWatch();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [simulateSilentFailure, setSimulateSilentFailure] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    watcher?.log('contact_submit_attempt', { name });

    if (simulateSilentFailure) {
      watcher?.log('contact_submit_silent_skipped', { name });
      return; // simulate silent failure: no network call
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      if (!res.ok) {
        watcher?.log('contact_submit_failure', { name, status: res.status });
      } else {
        watcher?.log('contact_submit_success', { name });
      }
    } catch (err) {
      watcher?.log('contact_submit_error', { name, error: err.message });
      console.error('ContactForm error', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Contact</h2>
      <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea
            className="w-full border p-2 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="flex items-center gap-4">
          <button data-watch-button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
            Send
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

export default ContactForm;
