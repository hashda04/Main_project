// src/components/Checkout.jsx
import React, { useState } from 'react';
import useSilentWatch from '../hooks/useSilentWatch';

const Checkout = () => {
  const watcher = useSilentWatch();
  const [amount, setAmount] = useState(50);
  const [simulateSilentFailure, setSimulateSilentFailure] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    watcher?.log('checkout_started', { amount });

    if (simulateSilentFailure) {
      watcher?.log('checkout_silent_skipped', { amount });
      return; // no backend call
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      if (!res.ok) {
        watcher?.log('checkout_failure', { amount, status: res.status });
      } else {
        watcher?.log('checkout_success', { amount });
      }
    } catch (err) {
      watcher?.log('checkout_error', { amount, error: err.message });
      console.error('Checkout error', err);
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
          <button data-watch-button type="submit" className="px-4 py-2 bg-purple-600 text-white rounded">
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
