// src/App.jsx

import React from 'react';
import Login from './components/Login';
import ContactForm from './components/ContactForm';
import Checkout from './components/Checkout';

const App = () => {
  return (
    <div className="app min-h-screen bg-gray-50 p-6 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Silent Failure Test App
      </h1>
      
      <div className="max-w-2xl mx-auto space-y-10">
        <section className="p-6 bg-white rounded-lg shadow">
          <Login />
        </section>

        <section className="p-6 bg-white rounded-lg shadow">
          <ContactForm />
        </section>

        <section className="p-6 bg-white rounded-lg shadow">
          <Checkout />
        </section>
      </div>
    </div>
  );
};

export default App;
