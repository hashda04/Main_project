import React, { useState } from 'react';

const Checkout = () => {
  const [amount, setAmount] = useState(50);
  const [processing, setProcessing] = useState(false);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setProcessing(true);

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      // ❌ Bug: assuming payment succeeded even if backend failed
      setTimeout(() => {
        setProcessing(false);
        alert('Payment successful!');
      }, 500);

    } catch {
      // ❌ No visible error or message to the user
      setProcessing(false);
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
        <button
          disabled={processing}
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded"
        >
          {processing ? 'Processing...' : `Pay $${amount}`}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
