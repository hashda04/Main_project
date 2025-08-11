// src/components/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [simulateSilentFailure, setSimulateSilentFailure] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (simulateSilentFailure) {
      console.log('Simulating silent failure: no backend call');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (!res.ok) {
        console.error('Contact form failed:', res.status);
      } else {
        console.log('Contact form submitted successfully');
      }
    } catch (err) {
      console.error('Contact form error:', err);
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
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
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
