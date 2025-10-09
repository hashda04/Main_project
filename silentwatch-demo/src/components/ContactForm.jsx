import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // ❌ Bad: no validation
    setTimeout(async () => {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, message }),
        });
        alert('Message sent!');
      } catch {
        // ❌ Silently ignored
      }
    }, 100);
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
          />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea
            className="w-full border p-2 rounded"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
