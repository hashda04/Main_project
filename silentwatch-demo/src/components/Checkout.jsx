import React from 'react';

const Checkout = () => {
  const handleCheckout = () => {
    // Fails silently: user expects network activity but none triggered
    console.log('Checkout clicked, but no fetch or API call.');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button id="checkout" onClick={handleCheckout}>Pay Now</button>
    </div>
  );
};

export default Checkout;