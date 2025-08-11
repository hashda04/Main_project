// src/components/Checkout.jsx
import React, { useState } from 'react';

const Checkout = () => {
  const [amount, setAmount] = useState(50);
  const [simulateSilentFailure, setSimulateSilentFailure] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (simulateSilentFailure) {
      console.log('Simulating silent failure: no backend call');
      return;
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      if (!res.ok) {
        console.error('Checkout failed:', res.status);
      } else {
        console.log('Checkout successful');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Checkout</h2>
      <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-sm">Amount</label>
          <input
            type="number"
            className="w-full border p-2 rounded"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            min={1}
          />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
            Pay ${amount}
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

export default Checkout;
