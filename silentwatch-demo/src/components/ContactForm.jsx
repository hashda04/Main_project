import React, { useState } from 'react';

const ContactForm = () => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Silent: no success message, no backend call
    console.log('Contact form submitted, but no DOM update or fetch.');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Us</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <button id="submit-form" type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;